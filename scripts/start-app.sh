#!/bin/bash
cd /var/www/admin-frontend
npm run build
pm2 serve build/ 3030 --name "FrontTester" --spa