FROM debian:buster

RUN mkdir -p /app

COPY ./ /app
RUN apt update && apt upgrade -y && apt install -y \
    curl

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | sh

RUN apt install -y nodejs 

RUN npm install -g @nestjs/cli
RUN npm install -g yarn
RUN npm install -g prisma

RUN echo "prisma db pull && prisma generate && yarn && yarn start:dev" > /start.sh

WORKDIR /app

RUN mkdir -p data

CMD ["sh", "/start.sh"]