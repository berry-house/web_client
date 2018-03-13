FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app/

RUN npm install --global nodemon
RUN npm install

# Bundle app source
COPY app /usr/src/app/app
COPY node_modules /usr/src/app/node_modules

CMD npm start null $DATABASE_HOST $DATABASE_USER $DATABASE_PASSWORD $DATABASE_PORT $DATABASE_NAME
