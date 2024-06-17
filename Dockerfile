# Build stage
FROM node:lts as build-stage

# Set the working directory
WORKDIR /nuxtapp

COPY package*.json ./
COPY pnpm-lock.yaml ./


# Set build arguments and environment variables
ARG NUXT_PUBLIC_API
ENV NUXT_PUBLIC_API=${NUXT_PUBLIC_API}

# Install dependencies and build the application
RUN npm install -g pnpm
RUN pnpm install

COPY . . 

RUN pnpm build

# Production stage
FROM node:lts as prod-stage

# Set the working directory
WORKDIR /nuxtapp

# Copy the built output from the build stage
COPY --from=build-stage /nuxtapp/.output/ ./.output/

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD [ "node", ".output/server/index.mjs" ]
