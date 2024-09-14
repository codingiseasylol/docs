rsync -av -e 'ssh' ./public ./routes ./utils package.json server.js config.js nginx.conf --exclude 'node_modules' --exclude 'package-lock.json' --exclude '.env' user@46.101.132.192:~/docs/ \
&& ssh user@46.101.132.192 'source /home/user/.nvm/nvm.sh && /home/user/.nvm/versions/node/v22.8.0/bin/pm2 reload /home/docs/server.js --name "docs"'

