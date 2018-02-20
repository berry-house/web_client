FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install --global nodemon
RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "start", "null", $DATABASE_HOST, $DATABASE_USER, $DATABASE_PASSWORD, PORT, DATABASE_NAME ]
