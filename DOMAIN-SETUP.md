# 🌐 Setup de dominio: coinbase-token.xyz

Ya tienes el dominio. Solo necesitas apuntarlo a tu VPS.

---

## 📍 DNS Configuration

En tu registrar (donde compraste el dominio), configura estos records:

```
Tipo    Nombre    Valor              TTL
A       @         82.180.162.78      3600
A       www       82.180.162.78      3600
```

**@** = el dominio raíz (coinbase-token.xyz)
**www** = con www (www.coinbase-token.xyz)

---

## 🔧 Nginx Setup en el VPS

### 1. Instalar Nginx

```bash
sudo apt update
sudo apt install -y nginx
```

### 2. Crear configuración

```bash
sudo nano /etc/nginx/sites-available/sovereign-ai
```

Pega esto:

```nginx
server {
    listen 80;
    server_name coinbase-token.xyz www.coinbase-token.xyz;

    # Frontend (Next.js en puerto 3000)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # API de agentes (puerto 3001)
    location /api/agents {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3. Activar configuración

```bash
# Crear symlink
sudo ln -s /etc/nginx/sites-available/sovereign-ai /etc/nginx/sites-enabled/

# Borrar default (opcional)
sudo rm /etc/nginx/sites-enabled/default

# Verificar config
sudo nginx -t

# Reload
sudo systemctl reload nginx
```

---

## 🔒 SSL (HTTPS) - GRATIS con Let's Encrypt

### 1. Instalar Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Obtener certificado

```bash
sudo certbot --nginx -d coinbase-token.xyz -d www.coinbase-token.xyz
```

**Sigue las instrucciones:**
- Email (para renovaciones)
- Acepta terms
- Redirect HTTP a HTTPS? → **Yes**

### 3. Renovación automática

```bash
# Verificar que el timer esté activo
sudo systemctl status certbot.timer

# Si no está activo:
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

Los certificados se renuevan automáticamente cada 90 días.

---

## ✅ Verificación

1. **Espera 5-10 minutos** para que el DNS se propague

2. **Verifica DNS:**
   ```bash
   dig coinbase-token.xyz +short
   # Debe retornar: 82.180.162.78
   ```

3. **Verifica HTTP:**
   ```bash
   curl -I http://coinbase-token.xyz
   # Debe retornar 200 o redirect a HTTPS
   ```

4. **Verifica HTTPS:**
   Abre en navegador: https://coinbase-token.xyz

---

## 🔥 URLs finales

- **Landing:** https://coinbase-token.xyz
- **Dashboard:** https://coinbase-token.xyz/dashboard
- **API:** https://coinbase-token.xyz/api/agents/health

---

## 🆘 Troubleshooting

### DNS no resuelve
- Espera más tiempo (puede tardar hasta 24hrs, pero usualmente 10min)
- Verifica que los records A estén correctos
- Usa https://dnschecker.org para verificar propagación

### Nginx error
```bash
# Ver logs
sudo tail -f /var/log/nginx/error.log

# Verificar sintaxis
sudo nginx -t

# Reiniciar
sudo systemctl restart nginx
```

### SSL error
```bash
# Re-ejecutar certbot
sudo certbot --nginx -d coinbase-token.xyz -d www.coinbase-token.xyz --force-renewal
```

### Frontend no carga
```bash
# Verificar que Next.js esté corriendo
pm2 status

# Si no está corriendo:
cd ~/sovereign-ai/frontend
pm2 start npm --name sovereign-frontend -- start
```

---

**Listo. En 10 minutos tu dominio apunta al VPS con HTTPS.** 🔒
