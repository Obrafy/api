FROM node:current-bullseye

WORKDIR /app/

RUN npm install -g @nestjs/cli@8.2.5

COPY .docker/ .docker/

RUN chmod +x .docker/entrypoint.sh