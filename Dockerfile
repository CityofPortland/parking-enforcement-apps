FROM node:14 AS builder
# In case we want to test with a different mode or environment variables
ARG MODE=production
# Create directory under root to build from
WORKDIR /app
# Add package install files and run install separately to help with rebuild caching
ADD package*.json ./
RUN npm install
# Add all other files into this directory
ADD . .
# Use Vue CLI to build our application
RUN npx vue-cli-service build --mode ${MODE}

FROM nginx
# Switch to a directory and use as starting directory for following commands and entrypoint
WORKDIR /usr/share/nginx/html
# Clean any existing files from the directory
RUN rm -rf ./*
# Copy built application from previous stage
COPY --from=builder /app/dist .
# Copy in our NGINX configuration file(s)
COPY ./nginx/ /etc/nginx/conf.d/