import express from 'express';
import dotenv from 'dotenv';
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Setup viem client para leer el contrato
const publicClient = createPublicClient({
  chain: base,
  transport: http(process.env.RPC_URL || 'https://mainnet.base.org'),
});

const CONTRACT_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'tokensOfOwner',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'agentActivated',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
];

// Storage in-memory para los agentes (en producción usa Redis/DB)
const agentSessions = new Map();

/**
 * Verifica si una wallet es holder
 */
async function isHolder(walletAddress) {
  try {
    const tokens = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'tokensOfOwner',
      args: [walletAddress],
    });

    return tokens.length > 0 ? tokens : null;
  } catch (error) {
    console.error('Error checking holder:', error);
    return null;
  }
}

/**
 * Inicializa un agente para un holder
 */
function initializeAgent(tokenId, walletAddress) {
  const agentId = `agent-${tokenId}`;

  if (!agentSessions.has(agentId)) {
    agentSessions.set(agentId, {
      tokenId,
      owner: walletAddress,
      createdAt: Date.now(),
      status: 'active',
      tasks: [],
      conversationHistory: [],
    });

    console.log(`✅ Agent ${agentId} initialized for ${walletAddress}`);
  }

  return agentSessions.get(agentId);
}

/**
 * Llama a Ollama API para generar respuesta con fallback automático
 */
async function callOllama(messages, model = 'qwen2.5:32b', retryWithFallback = true) {
  const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
  const fallbackModel = process.env.OLLAMA_FALLBACK_MODEL || 'llama3.2';

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000); // 60s timeout

    const response = await fetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        stream: false,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.message.content;
  } catch (error) {
    console.error(`Error calling Ollama with model ${model}:`, error.message);

    // Si falla y tenemos un fallback, intentar con modelo más ligero
    if (retryWithFallback && model !== fallbackModel) {
      console.log(`⚠️ Retrying with fallback model: ${fallbackModel}`);
      return await callOllama(messages, fallbackModel, false);
    }

    throw error;
  }
}

/**
 * Ejecuta una task del agente usando Ollama
 */
async function executeAgentTask(agentId, task, userMessage) {
  const agent = agentSessions.get(agentId);
  if (!agent) return { error: 'Agent not found' };

  // Construir contexto del agente
  const systemPrompt = `You are Agent #${agent.tokenId}, a personal AI assistant for your NFT holder. You are sovereign, privacy-focused, and always working in your owner's best interest. Task type: ${task}`;

  // Construir mensajes para Ollama
  const messages = [
    { role: 'system', content: systemPrompt },
    ...agent.conversationHistory,
    { role: 'user', content: userMessage },
  ];

  try {
    // Llamar a Ollama
    const aiResponse = await callOllama(messages, process.env.OLLAMA_MODEL || 'qwen2.5:32b');

    const response = {
      agentId,
      task,
      response: aiResponse,
      timestamp: Date.now(),
    };

    // Guardar en historial
    agent.conversationHistory.push(
      { role: 'user', content: userMessage },
      { role: 'assistant', content: aiResponse }
    );

    // Limitar historial a últimos 20 mensajes
    if (agent.conversationHistory.length > 20) {
      agent.conversationHistory = agent.conversationHistory.slice(-20);
    }

    agent.tasks.push({ task, userMessage, response: aiResponse, timestamp: response.timestamp });

    return response;
  } catch (error) {
    return {
      agentId,
      task,
      error: 'Failed to get AI response',
      details: error.message,
      timestamp: Date.now(),
    };
  }
}

// ========== ENDPOINTS ==========

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    agents: agentSessions.size,
    uptime: process.uptime(),
  });
});

/**
 * Verificar si una wallet es holder y obtener sus agentes
 */
app.post('/verify-holder', async (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ error: 'Wallet address required' });
  }

  const tokens = await isHolder(walletAddress);

  if (!tokens) {
    return res.status(403).json({ error: 'Not a holder' });
  }

  // Inicializar agentes para cada token
  const agents = tokens.map((tokenId) => {
    return initializeAgent(Number(tokenId), walletAddress);
  });

  res.json({
    holder: true,
    tokens: tokens.map(Number),
    agents: agents.map((a) => ({
      agentId: `agent-${a.tokenId}`,
      tokenId: a.tokenId,
      status: a.status,
    })),
  });
});

/**
 * Ejecutar task en un agente específico
 */
app.post('/agent/:agentId/task', async (req, res) => {
  const { agentId } = req.params;
  const { task, message, walletAddress } = req.body;

  // Verificar que el caller sea el owner
  const agent = agentSessions.get(agentId);
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }

  if (agent.owner.toLowerCase() !== walletAddress.toLowerCase()) {
    return res.status(403).json({ error: 'Not the agent owner' });
  }

  const result = await executeAgentTask(agentId, task, message);
  res.json(result);
});

/**
 * Obtener estado de un agente
 */
app.get('/agent/:agentId', (req, res) => {
  const { agentId } = req.params;
  const agent = agentSessions.get(agentId);

  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }

  res.json({
    agentId,
    tokenId: agent.tokenId,
    owner: agent.owner,
    status: agent.status,
    uptime: Date.now() - agent.createdAt,
    totalTasks: agent.tasks.length,
    recentTasks: agent.tasks.slice(-5),
  });
});

/**
 * Listar todos los agentes activos
 */
app.get('/agents', (req, res) => {
  const agents = Array.from(agentSessions.values()).map((agent) => ({
    agentId: `agent-${agent.tokenId}`,
    tokenId: agent.tokenId,
    status: agent.status,
    uptime: Date.now() - agent.createdAt,
    totalTasks: agent.tasks.length,
  }));

  res.json({ total: agents.length, agents });
});

// Start server
app.listen(PORT, () => {
  console.log(`🤖 Sovereign AI Agent Server running on port ${PORT}`);
  console.log(`📡 Contract: ${CONTRACT_ADDRESS}`);
  console.log(`🔗 RPC: ${process.env.RPC_URL || 'https://mainnet.base.org'}`);
});
