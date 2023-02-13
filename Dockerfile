FROM node:18-alpine3.16

WORKDIR /NoteApp

COPY package.json .

COPY package-lock.json .

RUN npm install 

COPY . .

EXPOSE 5173
EXPOSE 3010

CMD ["npm","run","dev"]