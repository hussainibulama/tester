#!/bin/bash
rm -rf /var/www/admin-frontend
cd /var/www/admin-frontend
rm -rf node_modules public script src  build
npm install