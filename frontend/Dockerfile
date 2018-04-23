FROM node:carbon
# Build variables
ARG ALGOLIA_SEARCH_KEY
ARG ALGOLIA_APP_ID
ARG GTM_ID
ARG SENTRY_DSN
# Create app directories
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/frontend
RUN mkdir -p /usr/src/app/frontend/build
RUN mkdir -p /usr/src/app/types
RUN mkdir -p /usr/src/app/types/build
WORKDIR /usr/src/app
# Add root workspace files
ADD ./yarn.lock . 
ADD ./package.json .
ADD ./tsconfig.json .
# Add types
ADD ./types/package.json types
ADD ./types/build types/build
# Add frontend
ADD ./frontend/package.json frontend
ADD ./frontend/tsconfig.json frontend
ADD ./frontend/typings.d.ts frontend
ADD ./frontend/build frontend/build
ADD ./frontend/static frontend/static
ADD ./frontend/next.config.js frontend
ADD ./frontend/server.ts frontend
ADD ./frontend/run-server.sh frontend
# Environment variables
ENV NODE_ENV=production
ENV ALGOLIA_SEARCH_KEY=${ALGOLIA_SEARCH_KEY}
ENV ALGOLIA_APP_ID=${ALGOLIA_APP_ID}
ENV GTM_ID=${GTM_ID}
ENV SENTRY_DSN=${SENTRY_DSN}
# Install dependencies and link workspaces
RUN yarn --frozen-lockfile --production
# Move to frontend directory
WORKDIR /usr/src/app/frontend
# Expose frontend port
EXPOSE 3000
# Start frontend in production
CMD ["yarn", "start"]

