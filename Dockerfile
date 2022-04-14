FROM node:current-bullseye

WORKDIR /app/

RUN mkdir /script/

RUN curl https://raw.githubusercontent.com/eficode/wait-for/v2.1.3/wait-for -o /app/wait-for.sh && \
    chmod +x /app/wait-for.sh

RUN npm install -g @nestjs/cli@8.2.5

COPY .docker/ .docker/

RUN chmod +x .docker/entrypoint.sh
