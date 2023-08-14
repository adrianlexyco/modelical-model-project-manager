FROM node:14

RUN yarn global add ts-node

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

COPY . .

RUN yarn install

EXPOSE 3001

CMD ["ts-node", "app/app.ts"]
