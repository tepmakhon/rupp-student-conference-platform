FROM node:22-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y openssl

COPY package*.json ./

RUN npm ci

COPY . .

RUN DATABASE_URL=postgresql://build:build@localhost:5432/build npx prisma generate

RUN npm run build

CMD ["npm", "start"]