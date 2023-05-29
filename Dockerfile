FROM node:16.14.2
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV JWT_SECRET=olABjHpk5V2fh7o9IUBNFkOgidVCsd3ZtmqkVnKBL8fvRZk 
COPY . . 
EXPOSE 3000
ENTRYPOINT npm start