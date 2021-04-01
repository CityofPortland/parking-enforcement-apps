FROM node:14 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .

# Copy in our conf with permit-lookup added as alias for index
COPY nginx-default.conf /etc/nginx/conf.d/default.conf