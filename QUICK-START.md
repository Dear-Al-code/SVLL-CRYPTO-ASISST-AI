# ⚡ QUICK START - 2 HORAS HASTA EL LANZAMIENTO

**Para el que quiere lanzar YA.**

---

## ⏱️ Timeline

- **30 min:** API keys + deploy contrato
- **20 min:** Metadata + IPFS
- **30 min:** Frontend + backend
- **20 min:** Dominio + SSL
- **20 min:** Testing + launch

**Total: 2 horas**

---

## 🔥 Paso 1: API Keys (10 min)

### Privy
1. https://dashboard.privy.io → Sign up
2. Create app → Copy App ID
3. Guarda en notepad

### Pinata
1. https://pinata.cloud → Sign up
2. https://app.pinata.cloud/keys → New Key
3. Guarda API Key + Secret

### BaseScan (opcional)
1. https://basescan.org → Sign up
2. https://basescan.org/myapikey → Create
3. Guarda API key

---

## 🔥 Paso 2: Deploy Contrato (20 min)

```bash
cd ~/sovereign-ai/contract
npm install

# Crear .env
cat > .env << EOF
PRIVATE_KEY=TU_PRIVATE_KEY_AQUI
BASESCAN_API_KEY=TU_BASESCAN_KEY_AQUI
BASE_URI=ipfs://PLACEHOLDER/
EOF

# Deploy a mainnet
npm run deploy:mainnet
```

**⚠️ GUARDA EL CONTRACT ADDRESS**

Ejemplo: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1`

---

## 🔥 Paso 3: Metadata (20 min)

```bash
cd ~/sovereign-ai/metadata
npm install

# Crear .env
cat > .env << EOF
PINATA_API_KEY=tu_key
PINATA_SECRET_KEY=tu_secret
EOF

# Generar JSONs
npm run generate

# Subir a IPFS
npm run upload
```

**⚠️ GUARDA EL CID**

Ejemplo: `QmX5h7j8k9mL2pN3qR4sT6uV8wY1zA`

### Actualizar Base URI

```bash
cd ~/sovereign-ai/contract

# Crear script
cat > scripts/update-uri.js << 'EOF'
const hre = require("hardhat");
async function main() {
  const contract = await hre.ethers.getContractAt(
    "SovereignAI",
    "TU_CONTRACT_ADDRESS_AQUI"
  );
  const tx = await contract.setBaseURI("ipfs://TU_CID_AQUI/");
  await tx.wait();
  console.log("✅ Updated");
}
main().catch(console.error);
EOF

# Edita con tus valores
nano scripts/update-uri.js

# Ejecuta
npx hardhat run scripts/update-uri.js --network base-mainnet
```

---

## 🔥 Paso 4: Frontend (15 min)

```bash
cd ~/sovereign-ai/frontend
npm install

# Crear .env.local
cat > .env.local << EOF
NEXT_PUBLIC_PRIVY_APP_ID=tu_privy_app_id
NEXT_PUBLIC_CONTRACT_ADDRESS=0xTU_CONTRACT_ADDRESS
NEXT_PUBLIC_CHAIN_ID=8453
EOF

# Build
npm run build

# Start con PM2
npm install -g pm2
pm2 start npm --name sovereign-frontend -- start
pm2 save
```

---

## 🔥 Paso 5: Backend Agentes (15 min)

```bash
cd ~/sovereign-ai/ai-agent
npm install

# Crear .env
cat > .env << EOF
PORT=3001
CONTRACT_ADDRESS=0xTU_CONTRACT_ADDRESS
RPC_URL=https://mainnet.base.org
CHAIN_ID=8453
EOF

# Start
pm2 start npm --name sovereign-agents -- start
pm2 save
```

---

## 🔥 Paso 6: Dominio + SSL (20 min)

### DNS (en tu registrar)

```
A    @      82.180.162.78
A    www    82.180.162.78
```

### Nginx

```bash
sudo apt update
sudo apt install -y nginx

sudo nano /etc/nginx/sites-available/sovereign-ai
```

Pega:

```nginx
server {
    listen 80;
    server_name coinbase-token.xyz www.coinbase-token.xyz;

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
```

Activa:

```bash
sudo ln -s /etc/nginx/sites-available/sovereign-ai /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### SSL

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d coinbase-token.xyz -d www.coinbase-token.xyz
```

---

## 🔥 Paso 7: Testing (10 min)

```bash
# Verificar que todo esté corriendo
pm2 status

# Verificar frontend
curl -I https://coinbase-token.xyz

# Verificar backend
curl https://coinbase-token.xyz/api/agents/health

# Verificar contrato en BaseScan
# https://basescan.org/address/TU_CONTRACT_ADDRESS
```

---

## 🔥 Paso 8: LAUNCH (10 min)

### Farcaster

```
🔴⚫️⚪️ SOVEREIGN AI

100 NFTs en @base
Cada uno = agente IA personal 24/7

✓ Self-sovereign
✓ Privacy-first
✓ Exit guaranteed

Mint: 0.008 ETH
🔗 coinbase-token.xyz
```

### Twitter

```
Lancé algo diferente:

100 NFTs donde cada uno te da acceso a un agente IA que corre 24/7.

No es arte. Es infraestructura.

Desplegado en @base
Mint: 0.008 ETH

https://coinbase-token.xyz
```

---

## ✅ Checklist final

- [ ] Contract deployado y verificado
- [ ] Metadata en IPFS
- [ ] Base URI actualizado
- [ ] Frontend corriendo
- [ ] Backend corriendo
- [ ] Dominio apuntando con SSL
- [ ] Todo testeado
- [ ] Posts preparados
- [ ] Wallet lista para recibir fondos

---

## 🎯 GO TIME

Cuando estés listo, publica los posts y **monitorea en tiempo real:**

```bash
# Ver ventas en BaseScan
https://basescan.org/address/TU_CONTRACT_ADDRESS#events

# Ver logs
pm2 logs

# Ver holders
curl https://coinbase-token.xyz/api/agents/agents
```

---

**VAMOS CABRÓN. 2 HORAS Y ESTÁS LIVE.** 🚀
