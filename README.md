# 🔴⚫️⚪️ SOVEREIGN AI

**100 NFTs. Each one = your personal AI agent 24/7.**

Self-sovereign. Privacy-first. Exit guaranteed.

---

## 🇬🇧 English

### 🎯 The Concept

An environment where:
- **The user IS the environment** (self-sovereign)
- **AI works FOR you** (local-first, edge compute)
- **Privacy by design** (zero-knowledge)
- **Encrypted data, you hold the keys**
- **Guaranteed exit** (export everything, leave whenever you want)

---

### 📦 Project Structure

```
sovereign-ai/
├── contract/          # ERC-721 smart contract on Base
├── frontend/          # Landing page + Dashboard (Next.js + Privy)
├── ai-agent/          # Backend server for AI agents
├── metadata/          # NFT metadata generator + IPFS uploader
└── README.md          # This file
```

---

### 🚀 Quick Start

#### 1. Deploy the smart contract

```bash
cd contract
npm install
cp .env.example .env
# Edit .env with your PRIVATE_KEY and BASESCAN_API_KEY

# Deploy to testnet first (for testing)
npm run deploy:testnet

# When ready, deploy to mainnet
npm run deploy:mainnet
```

**IMPORTANT:** Save the contract address returned.

---

#### 2. Generate and upload metadata

```bash
cd ../metadata
npm install
cp .env.example .env
# Edit .env with your Pinata keys

# Generate JSONs
npm run generate

# Upload to IPFS
npm run upload
```

**IMPORTANT:** Save the CID returned. You need it for the contract.

---

#### 3. Update the contract with Base URI

If you already deployed the contract, you can update the Base URI:

```bash
cd ../contract
# Using Hardhat console or a script, call setBaseURI() with your CID
# Format: ipfs://YOUR_CID_HERE/
```

Or redeploy the contract with the correct Base URI in the constructor.

---

#### 4. Deploy the frontend

```bash
cd ../frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with:
# - NEXT_PUBLIC_PRIVY_APP_ID (from https://dashboard.privy.io)
# - NEXT_PUBLIC_CONTRACT_ADDRESS (the one you deployed)
# - NEXT_PUBLIC_CHAIN_ID (8453 for Base Mainnet)

# For development
npm run dev

# For production
npm run build
npm start
```

Frontend runs on `http://localhost:3000`

---

#### 5. Run the AI agents server

```bash
cd ../ai-agent
npm install
cp .env.example .env
# Edit .env with:
# - CONTRACT_ADDRESS
# - ANTHROPIC_API_KEY or OPENAI_API_KEY

npm start
```

Server runs on `http://localhost:3001`

---

### 🔧 API Configuration

#### Privy (Auth + Wallet)
1. Go to https://dashboard.privy.io
2. Create an app
3. Copy the App ID
4. Put it in `frontend/.env.local`

#### Pinata (IPFS)
1. Go to https://pinata.cloud
2. Create account
3. Generate API keys at https://app.pinata.cloud/keys
4. Put them in `metadata/.env`

#### BaseScan (Contract verification)
1. Go to https://basescan.org
2. Create account
3. Generate API key at https://basescan.org/myapikey
4. Put it in `contract/.env`

---

### 💰 Estimated Costs

#### To deploy (one-time):
- Contract deployment on Base: ~$10-20 USD in ETH
- Pinata (IPFS hosting): Free (up to 1GB)
- .xyz domain: ~$1-2 USD/year

#### To run (monthly):
- VPS (this server): You already have it
- Privy: Free (up to 1000 users)
- Claude/OpenAI API: Depends on usage (~$20-50/month for 100 basic agents)

**Total to launch: ~$30 USD**

---

### 📈 Revenue Projection

- 100 NFTs x 0.008 ETH (~$15 USD) = **$1,500 USD (~25k MXN)**
- Gas fees on Base: ~$1-2 total
- **Net profit: ~$1,480 USD (~24k MXN)**

---

### 🎨 Branding

**Colors:**
- Red: `#FF0000`
- Black: `#000000`
- White: `#FFFFFF`

**Style:**
- Minimalist
- .xyz vibes
- Startup tech
- AI-first

---

### 🔐 Security

**NEVER** commit these files with secrets:
- `contract/.env`
- `frontend/.env.local`
- `ai-agent/.env`
- `metadata/.env`

All have `.env.example` that you can use as template.

---

### 📝 Post-launch Roadmap

#### Phase 1: MVP (First week)
- [x] Smart contract deployed
- [x] Landing page live
- [x] Metadata on IPFS
- [ ] First 10 NFTs minted

#### Phase 2: Functional agents (Week 2-4)
- [ ] Full integration with Claude API
- [ ] Dashboard with real-time chat
- [ ] Automated task system
- [ ] Basic analytics

#### Phase 3: Community (Month 2)
- [ ] Private channel on Farcaster
- [ ] Automated daily alpha
- [ ] Revenue share for holders
- [ ] Referral program

#### Phase 4: Scaling (Month 3+)
- [ ] New collections
- [ ] Secondary marketplace
- [ ] Public API for devs
- [ ] Mobile app

---

### 🤝 Tech Stack

- **Blockchain:** Base (Coinbase L2)
- **Smart Contracts:** Solidity + Hardhat
- **Frontend:** Next.js 14 + React + Tailwind
- **Auth:** Privy (wallet + social login)
- **Backend:** Node.js + Express
- **AI:** Claude (Anthropic) / GPT (OpenAI)
- **Storage:** IPFS (via Pinata)
- **Hosting:** Own VPS (82.180.162.78)

---

### 📞 Support

If something doesn't work, check:
1. That all API keys are configured
2. That the contract address is correct
3. That you have ETH on Base for gas
4. The logs in the console

---

### 🔥 LAUNCH

#### Pre-launch checklist:

- [ ] Contract deployed and verified on BaseScan
- [ ] Metadata uploaded to IPFS
- [ ] Frontend deployed and accessible
- [ ] Agent server running
- [ ] .xyz domain pointing to VPS
- [ ] Tweet/post on Farcaster prepared
- [ ] Wallet ready to receive funds

#### Launch day:

1. Post on Farcaster with the link
2. Tweet on X
3. Share in Base/Coinbase groups
4. Monitor sales in real-time
5. Answer questions in real-time
6. When you sell the first 10, celebrate and share
7. When you sell 50, make another post
8. Sold out = mega celebration

---

### 🎯 Goal

**Sell 100 NFTs in 48-72 hours.**

If you achieve it = **24k MXN in the bank** + foundation to scale.

**TODAY GOD WINS** 🔥

---

## 🇪🇸 Español

### 🎯 El concepto

Un entorno donde:
- **El usuario ES el entorno** (self-sovereign)
- **La IA trabaja PARA ti** (local-first, edge compute)
- **Privacidad por diseño** (zero-knowledge)
- **Datos encriptados, tú tienes las llaves**
- **Exit garantizado** (exportas todo, te vas cuando quieras)

---

### 📦 Estructura del proyecto

```
sovereign-ai/
├── contract/          # Smart contract ERC-721 en Base
├── frontend/          # Landing page + Dashboard (Next.js + Privy)
├── ai-agent/          # Backend server para los agentes IA
├── metadata/          # Generador de metadata NFT + IPFS uploader
└── README.md          # Este archivo
```

---

### 🚀 Quick Start

#### 1. Deploy el smart contract

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

#### 2. Genera y sube metadata

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

#### 3. Actualiza el contrato con el Base URI

Si ya deployaste el contrato, puedes actualizar el Base URI:

```bash
cd ../contract
# Usando Hardhat console o un script, llama a setBaseURI() con tu CID
# Formato: ipfs://TU_CID_AQUI/
```

O redeploya el contrato con el Base URI correcto en el constructor.

---

#### 4. Deploy el frontend

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

#### 5. Corre el servidor de agentes IA

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

### 🔧 Configuración de APIs

#### Privy (Auth + Wallet)
1. Ve a https://dashboard.privy.io
2. Crea una app
3. Copia el App ID
4. Ponlo en `frontend/.env.local`

#### Pinata (IPFS)
1. Ve a https://pinata.cloud
2. Crea cuenta
3. Genera API keys en https://app.pinata.cloud/keys
4. Ponlas en `metadata/.env`

#### BaseScan (Verificación de contrato)
1. Ve a https://basescan.org
2. Crea cuenta
3. Genera API key en https://basescan.org/myapikey
4. Ponla en `contract/.env`

---

### 💰 Costos estimados

#### Para deployar (one-time):
- Deploy de contrato en Base: ~$10-20 USD en ETH
- Pinata (IPFS hosting): Gratis (hasta 1GB)
- Dominio .xyz: ~$1-2 USD/año

#### Para correr (mensual):
- VPS (este servidor): Ya lo tienes
- Privy: Gratis (hasta 1000 users)
- Claude/OpenAI API: Depende del uso (~$20-50/mes para 100 agentes básicos)

**Total para lanzar: ~$30 USD**

---

### 📈 Proyección de ingresos

- 100 NFTs x 0.008 ETH (~$15 USD) = **$1,500 USD (~25k MXN)**
- Fees de gas en Base: ~$1-2 total
- **Ganancia neta: ~$1,480 USD (~24k MXN)**

---

### 🎨 Branding

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

### 🔐 Seguridad

**NUNCA** commitees estos archivos con secrets:
- `contract/.env`
- `frontend/.env.local`
- `ai-agent/.env`
- `metadata/.env`

Todos tienen `.env.example` que puedes usar como template.

---

### 📝 Roadmap post-launch

#### Fase 1: MVP (Primera semana)
- [x] Smart contract deployado
- [x] Landing page live
- [x] Metadata en IPFS
- [ ] Primeros 10 NFTs minteados

#### Fase 2: Agentes funcionales (Semana 2-4)
- [ ] Integración completa con Claude API
- [ ] Dashboard con chat real-time
- [ ] Sistema de tareas automatizadas
- [ ] Analytics básicos

#### Fase 3: Comunidad (Mes 2)
- [ ] Canal privado en Farcaster
- [ ] Alpha diaria automatizada
- [ ] Revenue share para holders
- [ ] Referral program

#### Fase 4: Escalamiento (Mes 3+)
- [ ] Nuevas colecciones
- [ ] Marketplace secundario
- [ ] API pública para devs
- [ ] Mobile app

---

### 🤝 Stack tecnológico

- **Blockchain:** Base (L2 de Coinbase)
- **Smart Contracts:** Solidity + Hardhat
- **Frontend:** Next.js 14 + React + Tailwind
- **Auth:** Privy (wallet + social login)
- **Backend:** Node.js + Express
- **IA:** Claude (Anthropic) / GPT (OpenAI)
- **Storage:** IPFS (via Pinata)
- **Hosting:** VPS propio (82.180.162.78)

---

### 📞 Support

Si algo no jala, revisa:
1. Que todas las API keys estén configuradas
2. Que el contract address sea correcto
3. Que tengas ETH en Base para gas
4. Los logs en la consola

---

### 🔥 LANZAMIENTO

#### Pre-launch checklist:

- [ ] Contract deployado y verificado en BaseScan
- [ ] Metadata subida a IPFS
- [ ] Frontend deployado y accesible
- [ ] Servidor de agentes corriendo
- [ ] Dominio .xyz apuntando al VPS
- [ ] Tweet/post en Farcaster preparado
- [ ] Wallet lista para recibir los fondos

#### Launch day:

1. Post en Farcaster con el link
2. Tweet en X
3. Share en grupos de Base/Coinbase
4. Monitor sales en tiempo real
5. Responde preguntas en tiempo real
6. Cuando vendas los primeros 10, celebra y comparte
7. Cuando vendas 50, haz otro post
8. Sold out = mega celebración

---

### 🎯 Objetivo

**Vender 100 NFTs en 48-72 horas.**

Si lo logras = **24k MXN en el banco** + fundación para escalar.

**HOY GANA DIOS** 🔥

---

Built with 🔴 by [tu nombre/alias]
