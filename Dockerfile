FROM node:17

WORKDIR /app

COPY /package.json .

COPY /package-lock.json .

RUN npm install

COPY /public /app/public

COPY /views /app/views

COPY app.js .

COPY test.js .

EXPOSE 3000

#https://www.datanovia.com/en/lessons/docker-compose-wait-for-container-using-wait-tool/docker-compose-wait-for-mysql-container-to-be-ready/
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait

RUN chmod +x /wait

CMD /wait && npm start