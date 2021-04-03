FROM node:15.12.0

ENV HOME=/home

COPY package.json package-lock.json $HOME/app/

WORKDIR $HOME/app

RUN npm install --silent --progress=false

COPY . $HOME/app

CMD ["npm", "start"]
