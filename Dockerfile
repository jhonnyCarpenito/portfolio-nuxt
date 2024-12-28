# Etapa 1: Construcción
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production
RUN npm install pm2 -g

COPY --from=builder /app/.output .output

ENV NITRO_PORT=80
ENV HOST=0.0.0.0

EXPOSE 80

CMD ["pm2-runtime", "start", ".output/server/index.mjs"]