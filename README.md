# 🔴⚫️⚪️ SOVEREIGN AI

**100 NFTs. Cada uno = tu agente IA personal 24/7.**

Self-sovereign. Privacy-first. Exit guaranteed.

---

## 🎯 El concepto

Un entorno donde:
- **El usuario ES el entorno** (self-sovereign)
- **La IA trabaja PARA ti** (local-first, edge compute)
- **Privacidad por diseño** (zero-knowledge)
- **Datos encriptados, tú tienes las llaves**
- **Exit garantizado** (exportas todo, te vas cuando quieras)

---

## 📦 Estructura del proyecto

```
sovereign-ai/
├── contract/          # Smart contract ERC-721 en Base
├── frontend/          # Landing page + Dashboard (Next.js + Privy)
├── ai-agent/          # Backend server para los agentes IA
├── metadata/          # Generador de metadata NFT + IPFS uploader
└── README.md          # Este archivo
```

---

## 🚀 Quick Start

### 1. Deploy el smart contract

```bash
cd contract
npm install
cp .env.example .env
# Edita .env con tu PRIVATE_KEY y BASESCAN_API_KEY

# Deploy a testnet primero (para probar)
npm run deploy:testnet

# Cuando estés listo, deploy a mainnet
npm run deploy:mainnet
```

**IMPORTANTE:** Guarda el contract address que te retorna.

---

### 2. Genera y sube metadata

```bash
cd ../metadata
npm install
cp .env.example .env
# Edita .env con tus Pinata keys

# Genera los JSON
npm run generate

# Sube a IPFS
npm run upload
```

**IMPORTANTE:** Guarda el CID que te retorna. Lo necesitas para el contrato.

---

### 3. Actualiza el contrato con el Base URI

Si ya deployaste el contrato, puedes actualizar el Base URI:

```bash
cd ../contract
# Usando Hardhat console o un script, llama a setBaseURI() con tu CID
# Formato: ipfs://TU_CID_AQUI/
```

O redeploya el contrato con el Base URI correcto en el constructor.

---

### 4. Deploy el frontend

```bash
cd ../frontend
npm install
cp .env.local.example .env.local
# Edita .env.local con:
# - NEXT_PUBLIC_PRIVY_APP_ID (de https://dashboard.privy.io)
# - NEXT_PUBLIC_CONTRACT_ADDRESS (el que deployaste)
# - NEXT_PUBLIC_CHAIN_ID (8453 para Base Mainnet)

# Para desarrollo
npm run dev

# Para producción
npm run build
npm start
```

El frontend corre en `http://localhost:3000`

---

### 5. Corre el servidor de agentes IA

```bash
cd ../ai-agent
npm install
cp .env.example .env
# Edita .env con:
# - CONTRACT_ADDRESS
# - ANTHROPIC_API_KEY o OPENAI_API_KEY

npm start
```

El servidor corre en `http://localhost:3001`

---

## 🔧 Configuración de APIs

### Privy (Auth + Wallet)
1. Ve a https://dashboard.privy.io
2. Crea una app
3. Copia el App ID
4. Ponlo en `frontend/.env.local`

### Pinata (IPFS)
1. Ve a https://pinata.cloud
2. Crea cuenta
3. Genera API keys en https://app.pinata.cloud/keys
4. Ponlas en `metadata/.env`

### BaseScan (Verificación de contrato)
1. Ve a https://basescan.org
2. Crea cuenta
3. Genera API key en https://basescan.org/myapikey
4. Ponla en `contract/.env`

---

## 💰 Costos estimados

### Para deployar (one-time):
- Deploy de contrato en Base: ~$10-20 USD en ETH
- Pinata (IPFS hosting): Gratis (hasta 1GB)
- Dominio .xyz: ~$1-2 USD/año

### Para correr (mensual):
- VPS (este servidor): Ya lo tienes
- Privy: Gratis (hasta 1000 users)
- Claude/OpenAI API: Depende del uso (~$20-50/mes para 100 agentes básicos)

**Total para lanzar: ~$30 USD**

---

## 📈 Proyección de ingresos

- 100 NFTs x 0.008 ETH (~$15 USD) = **$1,500 USD (~25k MXN)**
- Fees de gas en Base: ~$1-2 total
- **Ganancia neta: ~$1,480 USD (~24k MXN)**

---

## 🎨 Branding

**Colores:**
- Rojo: `#FF0000`
- Negro: `#000000`
- Blanco: `#FFFFFF`

**Estilo:**
- Minimalista
- .xyz vibes
- Startup tech
- IA-first

---

## 🔐 Seguridad

**NUNCA** commitees estos archivos con secrets:
- `contract/.env`
- `frontend/.env.local`
- `ai-agent/.env`
- `metadata/.env`

Todos tienen `.env.example` que puedes usar como template.

---

## 📝 Roadmap post-launch

### Fase 1: MVP (Primera semana)
- [x] Smart contract deployado
- [x] Landing page live
- [x] Metadata en IPFS
- [ ] Primeros 10 NFTs minteados

### Fase 2: Agentes funcionales (Semana 2-4)
- [ ] Integración completa con Claude API
- [ ] Dashboard con chat real-time
- [ ] Sistema de tareas automatizadas
- [ ] Analytics básicos

### Fase 3: Comunidad (Mes 2)
- [ ] Canal privado en Farcaster
- [ ] Alpha diaria automatizada
- [ ] Revenue share para holders
- [ ] Referral program

### Fase 4: Escalamiento (Mes 3+)
- [ ] Nuevas colecciones
- [ ] Marketplace secundario
- [ ] API pública para devs
- [ ] Mobile app

---

## 🤝 Stack tecnológico

- **Blockchain:** Base (L2 de Coinbase)
- **Smart Contracts:** Solidity + Hardhat
- **Frontend:** Next.js 14 + React + Tailwind
- **Auth:** Privy (wallet + social login)
- **Backend:** Node.js + Express
- **IA:** Claude (Anthropic) / GPT (OpenAI)
- **Storage:** IPFS (via Pinata)
- **Hosting:** VPS propio (82.180.162.78)

---

## 📞 Support

Si algo no jala, revisa:
1. Que todas las API keys estén configuradas
2. Que el contract address sea correcto
3. Que tengas ETH en Base para gas
4. Los logs en la consola

---

## 🔥 LANZAMIENTO

### Pre-launch checklist:

- [ ] Contract deployado y verificado en BaseScan
- [ ] Metadata subida a IPFS
- [ ] Frontend deployado y accesible
- [ ] Servidor de agentes corriendo
- [ ] Dominio .xyz apuntando al VPS
- [ ] Tweet/post en Farcaster preparado
- [ ] Wallet lista para recibir los fondos

### Launch day:

1. Post en Farcaster con el link
2. Tweet en X
3. Share en grupos de Base/Coinbase
4. Monitor sales en tiempo real
5. Responde preguntas en tiempo real
6. Cuando vendas los primeros 10, celebra y comparte
7. Cuando vendas 50, haz otro post
8. Sold out = mega celebración

---

## 🎯 Objetivo

**Vender 100 NFTs en 48-72 horas.**

Si lo logras = **24k MXN en el banco** + fundación para escalar.

**HOY GANA DIOS** 🔥

---

Built with 🔴 by [tu nombre/alias]
