# Sovereign AI - Domain Configuration

## Available Domains

1. **coinbase-token.store** (Primary - Store/Marketplace vibe)
2. **coinbase-token.com** (Professional - Main)
3. **coinbase-token.xyz** (Web3/Crypto native)
4. **coinbase-token.online** (Always accessible)

## Recommended Setup

### Primary Domain: `coinbase-token.xyz`
- **Why:** .xyz is crypto/web3 native, trendy, perfect for NFT projects
- **Use:** Main landing page + minting

### Secondary Domains:
- `coinbase-token.com` → Redirect to .xyz (professional backup)
- `coinbase-token.store` → Redirect to .xyz (marketplace SEO)
- `coinbase-token.online` → Redirect to .xyz (accessibility)

## DNS Configuration

Point all domains to your VPS: `82.180.162.78`

### A Records (for each domain):
```
Type: A
Name: @
Value: 82.180.162.78
TTL: 3600
```

```
Type: A
Name: www
Value: 82.180.162.78
TTL: 3600
```

## Nginx Configuration

```nginx
# Main site - coinbase-token.xyz
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
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}

# Redirect other domains to .xyz
server {
    listen 80;
    server_name coinbase-token.com www.coinbase-token.com
                coinbase-token.store www.coinbase-token.store
                coinbase-token.online www.coinbase-token.online;

    return 301 https://coinbase-token.xyz$request_uri;
}
```

## SSL Setup (Let's Encrypt)

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL for all domains
sudo certbot --nginx -d coinbase-token.xyz -d www.coinbase-token.xyz \
    -d coinbase-token.com -d www.coinbase-token.com \
    -d coinbase-token.store -d www.coinbase-token.store \
    -d coinbase-token.online -d www.coinbase-token.online
```

## Update Frontend Config

Update `frontend/.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=https://coinbase-token.xyz
```

## Marketing URLs

- **Main:** https://coinbase-token.xyz
- **Professional:** https://coinbase-token.com (redirects)
- **Store:** https://coinbase-token.store (redirects)
- **Backup:** https://coinbase-token.online (redirects)

## SEO Strategy

All domains point to same content but .xyz is canonical:
```html
<link rel="canonical" href="https://coinbase-token.xyz" />
```

This prevents duplicate content issues and consolidates SEO power to one domain.
