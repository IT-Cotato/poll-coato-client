# 1단계: 빌드
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# 2단계: 실행 (정적 파일 서빙)
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --only=production
RUN npm install vite

COPY --from=builder /app/dist ./dist

EXPOSE 4173

CMD ["npm", "run", "preview"] 