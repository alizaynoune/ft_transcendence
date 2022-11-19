FROM debian:buster

RUN mkdir -p /app
COPY ./ /app
RUN apt update && apt upgrade -y && apt install -y \
    curl
    
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | sh

RUN apt update && apt install -y nodejs
RUN echo "npm i && npm run build && npm start" > /start.sh
WORKDIR /app

CMD [ "sh", "/start.sh" ]