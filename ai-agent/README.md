# Sovereign AI Agent Server

Servidor backend que corre los agentes IA para cada holder.

## Setup

1. Instala dependencias:
```bash
npm install
```

2. Crea `.env` (usa `.env.example` como template):
```bash
cp .env.example .env
```

3. Edita `.env` con tus valores

4. Corre el servidor:
```bash
npm start
```

## Endpoints

### GET `/health`
Health check del servidor

### POST `/verify-holder`
Verifica si una wallet es holder y retorna sus agentes
```json
{
  "walletAddress": "0x..."
}
```

### POST `/agent/:agentId/task`
Ejecuta una task en un agente específico
```json
{
  "task": "research",
  "message": "Latest crypto news",
  "walletAddress": "0x..."
}
```

### GET `/agent/:agentId`
Obtiene el estado de un agente

### GET `/agents`
Lista todos los agentes activos

## TODO

- [ ] Integrar Claude API para respuestas reales
- [ ] Agregar persistencia (Redis/PostgreSQL)
- [ ] Implementar rate limiting
- [ ] Agregar autenticación con JWT
- [ ] WebSocket para comunicación real-time
- [ ] Sistema de tareas programadas (cron jobs)
