FROM node:16.14.2

WORKDIR /app

COPY . .

ENV JWT_SECRET=olABjHpk5V2fh7o9IUBNFkOgidVCsd3ZtmqkVnKBL8fvRZk 
ENV DATABASE_URL=postgres://postgres:root@postgres:5432/hublocal

RUN npm install

ENTRYPOINT npm start

EXPOSE 3000