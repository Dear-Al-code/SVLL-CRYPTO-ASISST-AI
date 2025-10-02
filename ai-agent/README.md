# Sovereign AI Agent Server (Ollama)

Backend server for AI agents using **Ollama** for local inference.

---

## 🇬🇧 English

### Setup

#### 1. Install Ollama

```bash
# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Start service
ollama serve
```

#### 2. Download models

```bash
# Primary model (recommended)
ollama pull qwen2.5:32b

# Fallback model (lighter, used if qwen2.5 fails)
ollama pull llama3.2
```

#### 3. Install dependencies

```bash
npm install
cp .env.example .env
# Edit .env with CONTRACT_ADDRESS and Ollama config
```

#### 4. Start server

```bash
npm start
```

### Ollama Configuration

In `.env`:
```bash
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:32b
OLLAMA_FALLBACK_MODEL=llama3.2
```

### Models:

- **Primary**: `qwen2.5:32b` - High performance, 32B parameters
- **Fallback**: `llama3.2` - Lightweight, 3B parameters (used automatically if primary fails)

**The server uses automatic fallback**: if qwen2.5 crashes or takes too long, it automatically retries with llama3.2

### Endpoints

#### `GET /health`
Server health check

#### `POST /verify-holder`
Verify wallet ownership and get agent IDs
```json
{
  "walletAddress": "0x..."
}
```

#### `POST /agent/:agentId/task`
Execute AI task on specific agent
```json
{
  "task": "chat",
  "message": "Your question here",
  "walletAddress": "0x..."
}
```

#### `GET /agent/:agentId`
Get agent status

#### `GET /agents`
List active agents

### Troubleshooting

```bash
# Check Ollama
curl http://localhost:11434/api/tags

# List installed models
ollama list

# Server logs
npm run dev
```

---

## 🇪🇸 Español

### Configuración

#### 1. Instalar Ollama

```bash
# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Iniciar servicio
ollama serve
```

#### 2. Descargar modelos

```bash
# Modelo principal (recomendado)
ollama pull qwen2.5:32b

# Modelo de fallback (más ligero, se usa si qwen2.5 falla)
ollama pull llama3.2
```

#### 3. Instalar dependencias

```bash
npm install
cp .env.example .env
# Edita .env con CONTRACT_ADDRESS y configuración de Ollama
```

#### 4. Iniciar servidor

```bash
npm start
```

### Configuración Ollama

En `.env`:
```bash
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:32b
OLLAMA_FALLBACK_MODEL=llama3.2
```

### Modelos:

- **Principal**: `qwen2.5:32b` - Alto rendimiento, 32B parámetros
- **Fallback**: `llama3.2` - Ligero, 3B parámetros (se usa automáticamente si el principal falla)

**El servidor usa fallback automático**: si qwen2.5 crashea o demora mucho, automáticamente intenta con llama3.2

### Endpoints

#### `GET /health`
Health check del servidor

#### `POST /verify-holder`
Verificar propiedad de wallet y obtener IDs de agentes
```json
{
  "walletAddress": "0x..."
}
```

#### `POST /agent/:agentId/task`
Ejecutar tarea de IA en agente específico
```json
{
  "task": "chat",
  "message": "Tu pregunta aquí",
  "walletAddress": "0x..."
}
```

#### `GET /agent/:agentId`
Obtener estado del agente

#### `GET /agents`
Listar agentes activos

### Troubleshooting

```bash
# Verificar Ollama
curl http://localhost:11434/api/tags

# Ver modelos instalados
ollama list

# Logs del servidor
npm run dev
```
