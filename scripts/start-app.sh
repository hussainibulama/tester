#!/bin/bash
cd /var/www/admin-frontend
sudo npm run build
sudo pm2 restart FrontTester
#pm2 serve build/ 3030 --name "FrontTester" --spa