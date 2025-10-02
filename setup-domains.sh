#!/bin/bash

# Sovereign AI - Domain Setup Script
# Run with: bash setup-domains.sh

echo "🌐 Setting up domains for Sovereign AI..."

# 1. Install Nginx if not installed
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    sudo apt update
    sudo apt install -y nginx
fi

# 2. Copy Nginx config
echo "📝 Installing Nginx configuration..."
sudo cp nginx-config.conf /etc/nginx/sites-available/sovereign-ai

# 3. Enable site
echo "🔗 Enabling site..."
sudo ln -sf /etc/nginx/sites-available/sovereign-ai /etc/nginx/sites-enabled/

# 4. Remove default site
sudo rm -f /etc/nginx/sites-enabled/default

# 5. Test Nginx config
echo "✅ Testing Nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    # 6. Restart Nginx
    echo "🔄 Restarting Nginx..."
    sudo systemctl restart nginx
    sudo systemctl enable nginx

    echo ""
    echo "✅ Nginx configured successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Point your domains DNS to this server IP:"
    echo "   82.180.162.78"
    echo ""
    echo "2. Wait for DNS propagation (5-30 minutes)"
    echo ""
    echo "3. Install SSL certificates:"
    echo "   sudo apt install certbot python3-certbot-nginx"
    echo "   sudo certbot --nginx -d coinbase-token.xyz -d www.coinbase-token.xyz \\"
    echo "       -d coinbase-token.com -d www.coinbase-token.com \\"
    echo "       -d coinbase-token.store -d www.coinbase-token.store \\"
    echo "       -d coinbase-token.online -d www.coinbase-token.online"
    echo ""
    echo "4. Start PM2 processes:"
    echo "   cd /home/vergasec/sovereign-ai"
    echo "   pm2 start ecosystem.config.js"
    echo "   pm2 save"
    echo "   pm2 startup"
else
    echo "❌ Nginx configuration test failed!"
    echo "Please check the configuration file."
fi
