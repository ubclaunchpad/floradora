FROM node:18

WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 8080
WORKDIR /app/dist
CMD ["node", "Backend.js"]

