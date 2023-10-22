FROM node:alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


CMD ["node", "dist/bin/www"]
