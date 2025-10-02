# Sovereign AI Agent Server (Ollama)

Servidor backend que corre los agentes IA usando **Ollama** para inferencia local.

## Setup

### 1. Instalar Ollama

```bash
# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Iniciar servicio
ollama serve
```

### 2. Descargar modelos

```bash
# Modelo principal (recomendado)
ollama pull qwen2.5:32b

# Modelo de fallback (más ligero, se usa si qwen2.5 falla)
ollama pull llama3.2
```

### 3. Instalar dependencias

```bash
npm install
cp .env.example .env
# Edita .env con CONTRACT_ADDRESS y configuración de Ollama
```

### 4. Iniciar servidor

```bash
npm start
```

## Configuración Ollama

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

## Endpoints

### `GET /health`
Health check del servidor

### `POST /verify-holder`
```json
{
  "walletAddress": "0x..."
}
```

### `POST /agent/:agentId/task`
```json
{
  "task": "chat",
  "message": "Tu pregunta aquí",
  "walletAddress": "0x..."
}
```

### `GET /agent/:agentId`
Estado del agente

### `GET /agents`
Lista agentes activos

## Troubleshooting

```bash
# Verificar Ollama
curl http://localhost:11434/api/tags

# Ver modelos instalados
ollama list

# Logs del servidor
npm run dev
```
