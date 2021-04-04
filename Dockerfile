# In case we want to test with a different mode or environment variables
ARG MODE=production

FROM node:14 AS builder
# Create directory under root to build from
WORKDIR /app
# Place files into this directory
ADD . .
# Use NPM to build our application
RUN npm install && \
    npm run build --mode ${MODE}

FROM nginx
# Switch to directory and use as starting directory for entrypoint
WORKDIR /usr/share/nginx/html
# Clean any existing files from the directory
RUN rm -rf ./*
# Copy built application from previous stage
COPY --from=builder /app/dist .
# Copy in our conf with permit-lookup added as alias for index
COPY ./nginx/ /etc/nginx/conf.d/