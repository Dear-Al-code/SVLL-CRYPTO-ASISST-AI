# 🚀 GUÍA DE DEPLOYMENT - SOVEREIGN AI

**Paso por paso para lanzar tu NFT drop en las próximas 48 horas.**

---

## ✅ Pre-requisitos

Antes de empezar, asegúrate de tener:

1. **Wallet con fondos:**
   - ~$30 USD en ETH en **Base Mainnet**
   - Si no tienes, compra ETH en Coinbase y usa el bridge a Base

2. **API Keys:**
   - Privy App ID (https://dashboard.privy.io)
   - Pinata API keys (https://pinata.cloud)
   - BaseScan API key (https://basescan.org) - opcional pero recomendado

3. **Dominio (opcional pero recomendado):**
   - Compra un .xyz en Namecheap (~$1-2/año)
   - Apunta el DNS a tu VPS: 82.180.162.78

---

## 📅 TIMELINE - 48 HORAS

### **DÍA 0 (HOY) - 6 horas**

#### Hora 1-2: Setup de APIs

```bash
# 1. Privy
# - Ve a https://dashboard.privy.io
# - Sign up con Google/GitHub
# - Crea nueva app
# - Copia App ID
# - Guárdalo para después

# 2. Pinata
# - Ve a https://pinata.cloud
# - Sign up
# - Ve a API Keys: https://app.pinata.cloud/keys
# - Crea nueva key
# - Guarda API Key y Secret

# 3. BaseScan (opcional)
# - Ve a https://basescan.org
# - Sign up
# - Ve a https://basescan.org/myapikey
# - Crea API key
# - Guárdala
```

#### Hora 2-3: Deploy del smart contract

```bash
cd ~/sovereign-ai/contract

# Instalar dependencias
npm install

# Configurar .env
cp .env.example .env
nano .env

# Agrega:
# PRIVATE_KEY=tu_private_key_de_metamask
# BASESCAN_API_KEY=tu_basescan_key
# BASE_URI=ipfs://PLACEHOLDER/  # Lo actualizamos después

# TESTNET primero (para probar)
npm run deploy:testnet

# Si todo jala, MAINNET
npm run deploy:mainnet

# ⚠️ GUARDA EL CONTRACT ADDRESS QUE TE DA
```

**Expected output:**
```
✅ SovereignAI deployed to: 0xABC123...
🔗 View on BaseScan: https://basescan.org/address/0xABC123...
```

#### Hora 3-4: Metadata + IPFS

```bash
cd ~/sovereign-ai/metadata

npm install

# Generar JSONs
npm run generate

# Configurar Pinata
cp .env.example .env
nano .env
# Agrega tus Pinata keys

# Subir a IPFS
npm run upload

# ⚠️ GUARDA EL CID QUE TE DA
# Ejemplo: QmX5h7j8k9...
```

**Actualizar Base URI en el contrato:**

```bash
cd ~/sovereign-ai/contract

# Crea un script rápido para actualizar
cat > scripts/update-uri.js << 'EOF'
const hre = require("hardhat");

async function main() {
  const contractAddress = "TU_CONTRACT_ADDRESS_AQUI";
  const newBaseURI = "ipfs://TU_CID_AQUI/";

  const contract = await hre.ethers.getContractAt("SovereignAI", contractAddress);

  console.log("Updating Base URI to:", newBaseURI);
  const tx = await contract.setBaseURI(newBaseURI);
  await tx.wait();

  console.log("✅ Base URI updated!");
}

main().catch(console.error);
EOF

# Edita el script con tus valores
nano scripts/update-uri.js

# Ejecuta
npx hardhat run scripts/update-uri.js --network base-mainnet
```

#### Hora 4-6: Frontend

```bash
cd ~/sovereign-ai/frontend

npm install

# Configurar .env.local
cp .env.local.example .env.local
nano .env.local

# Agrega:
# NEXT_PUBLIC_PRIVY_APP_ID=tu_privy_app_id
# NEXT_PUBLIC_CONTRACT_ADDRESS=0xTU_CONTRACT_ADDRESS
# NEXT_PUBLIC_CHAIN_ID=8453

# Build
npm run build

# Instalar PM2 para mantener el proceso corriendo
npm install -g pm2

# Start con PM2
pm2 start npm --name "sovereign-frontend" -- start
pm2 save
pm2 startup
```

Tu frontend está en: `http://82.180.162.78:3000`

---

### **DÍA 1 (MAÑANA) - 8 horas**

#### Hora 1-2: Servidor de agentes IA

```bash
cd ~/sovereign-ai/ai-agent

npm install

cp .env.example .env
nano .env

# Agrega:
# PORT=3001
# CONTRACT_ADDRESS=0xTU_CONTRACT_ADDRESS
# RPC_URL=https://mainnet.base.org
# ANTHROPIC_API_KEY=tu_claude_key (si lo tienes)

# Start con PM2
pm2 start npm --name "sovereign-agents" -- start
pm2 save
```

#### Hora 2-3: Setup de dominio (si compraste)

```bash
# En tu registrar (Namecheap/GoDaddy/etc):
# A record: @ -> 82.180.162.78
# A record: www -> 82.180.162.78

# Instalar Nginx
sudo apt update
sudo apt install -y nginx

# Configurar reverse proxy
sudo nano /etc/nginx/sites-available/sovereign-ai

# Pega esto:
server {
    listen 80;
    server_name tu-dominio.xyz www.tu-dominio.xyz;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/agents {
        proxy_pass http://localhost:3001;
    }
}

# Activar
sudo ln -s /etc/nginx/sites-available/sovereign-ai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL con Let's Encrypt (gratis)
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.xyz -d www.tu-dominio.xyz
```

#### Hora 3-8: Marketing + Launch

**Farcaster:**
```
🔴⚫️⚪️ SOVEREIGN AI

100 NFTs. Cada uno = tu agente IA personal 24/7.

✓ Self-sovereign
✓ Privacy-first
✓ Exit guaranteed

Desplegado en @base
Mint: 0.008 ETH

🔗 tu-dominio.xyz

No roadmap. No promises. Solo utility pura.
```

**Twitter/X:**
```
Thread 🧵

1/ Lancé algo que nadie ha hecho:

100 NFTs donde cada uno te da acceso a un agente IA que corre 24/7.

No es arte. Es infraestructura.

2/ Cada holder obtiene:
- 1 agente IA personal corriendo en infra privada
- Acceso a dashboard para controlarlo
- Comunidad exclusiva
- Privacidad por diseño
- Exit garantizado

3/ Por qué Base?
- Fees casi gratis
- Preview access
- Ecosistema Coinbase
- L2 con futuro

4/ Mint: 0.008 ETH
Supply: 100
Link: tu-dominio.xyz

No FOMO. Solo utility.
```

**Telegram/Discord de Base:**
- Busca grupos: "Base NFT", "Base Builders", etc.
- Share tu link (sin spam)
- Explica el concepto

---

## 🔥 POST-LAUNCH

### Monitoreo

```bash
# Ver logs del frontend
pm2 logs sovereign-frontend

# Ver logs del backend
pm2 logs sovereign-agents

# Ver status
pm2 status

# Restart si algo falla
pm2 restart all
```

### Cuando vendas los primeros NFTs

1. **Activa los agentes:**
   - Los holders aparecerán automáticamente en el backend
   - Verifica que sus agentes estén corriendo

2. **Comunícate con los holders:**
   - Mándales mensaje con acceso a dashboard
   - Invítalos a la comunidad

3. **Share el progreso:**
   - "10/100 vendidos 🔥"
   - "50% sold out 🚀"
   - "SOLD OUT 💯"

---

## 🆘 Troubleshooting

### Frontend no carga
```bash
pm2 logs sovereign-frontend
# Revisa errores
# Verifica que .env.local esté bien
```

### Mint no funciona
- Revisa que el contract address sea correcto
- Verifica que el usuario tenga ETH en Base
- Checa BaseScan para ver si hay errores

### Agentes no responden
```bash
pm2 logs sovereign-agents
# Verifica que el CONTRACT_ADDRESS sea correcto
# Checa que el RPC_URL esté funcionando
```

---

## 📊 Métricas a trackear

### Durante el mint:
- Total minteado (visible en la landing)
- Transacciones en BaseScan
- Holders únicos
- ETH recibido

### Post-mint:
- Agentes activos
- Tasks ejecutadas
- Retention de holders
- Engagement en comunidad

---

## 💸 Withdraw de fondos

```bash
cd ~/sovereign-ai/contract

# Script para retirar
cat > scripts/withdraw.js << 'EOF'
const hre = require("hardhat");

async function main() {
  const contractAddress = "TU_CONTRACT_ADDRESS";
  const contract = await hre.ethers.getContractAt("SovereignAI", contractAddress);

  console.log("Withdrawing funds...");
  const tx = await contract.withdraw();
  await tx.wait();

  console.log("✅ Funds withdrawn!");
}

main().catch(console.error);
EOF

nano scripts/withdraw.js  # Edita con tu address

npx hardhat run scripts/withdraw.js --network base-mainnet
```

Los fondos van a la wallet del owner (la que deployó el contrato).

---

## 🎯 Success Metrics

**Mínimo viable:**
- 20 NFTs vendidos en 48hrs = ~$300 USD (~5k MXN)

**Target:**
- 50 NFTs vendidos en 72hrs = ~$750 USD (~12k MXN)

**Moonshot:**
- 100 NFTs (sold out) en 1 semana = $1,500 USD (~25k MXN)

---

## ✨ Tips finales

1. **No te duermas en los laureles:**
   - Responde a cada holder
   - Mantén engagement alto
   - Share progress constantemente

2. **Itera rápido:**
   - Si algo no jala, arréglalo en minutos
   - Los primeros días son críticos

3. **Build in public:**
   - Comparte el journey
   - La gente ama ver el proceso

4. **No te rindas:**
   - Si no vendes todo en 48hrs, está bien
   - Ajusta precio, messaging, o estrategia
   - Lo importante es empezar

---

**VAMOS CABRÓN, A HACERTE RICO** 🔴⚫️⚪️
