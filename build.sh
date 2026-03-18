#!/bin/bash
export DATABASE_URL="file:/var/www/sin-education-system/prisma/dev.db"
export NEXT_PUBLIC_APP_URL="https://splus-sin.com"
cd /var/www/sin-education-system
npx prisma generate
npx prisma db push
npm run build
