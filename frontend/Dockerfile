FROM node:carbon
# Build variables
ARG TF_VAR_sentry_dsn
ARG TF_VAR_algolia_app_id
ARG TF_VAR_algolia_index
ARG ALGOLIA_SEARCH_KEY
ARG GTM_ID
ARG HOST

# Add workspace directories
RUN mkdir -p /usr/src/app && \
    mkdir -p /usr/src/app/types && \
    mkdir -p /usr/src/app/types/build && \
    mkdir -p /usr/src/app/tokenizer && \
    mkdir -p /usr/src/app/tokenizer/build && \
    mkdir -p /usr/src/app/theme-variables && \
    mkdir -p /usr/src/app/theme-variables/build && \
    mkdir -p /usr/src/app/frontend && \
    mkdir -p /usr/src/app/frontend/build

WORKDIR /usr/src/app

# Add root workspace files
COPY ./yarn.lock ./package.json ./tsconfig.json ./
# Add types
COPY ./types/package.json types
COPY ./types/build types/build
# Add tokenizer
COPY ./tokenizer/package.json tokenizer
COPY ./tokenizer/build tokenizer/build
# Add theme-variables
COPY ./theme-variables/package.json theme-variables
COPY ./theme-variables/build theme-variables/build
# Add frontend
COPY ./frontend/package.json ./frontend/tsconfig.json ./frontend/typings.d.ts ./frontend/next.config.js ./frontend/server.ts ./frontend/run-server.sh frontend/
COPY ./frontend/build frontend/build
COPY ./frontend/static frontend/static

# Environment variables
ENV NODE_ENV=production
ENV TF_VAR_sentry_dsn=${TF_VAR_sentry_dsn}
ENV TF_VAR_algolia_app_id=${TF_VAR_algolia_app_id}
ENV TF_VAR_algolia_index=${TF_VAR_algolia_index}
ENV ALGOLIA_SEARCH_KEY=${ALGOLIA_SEARCH_KEY}
ENV GTM_ID=${GTM_ID}
ENV HOST=${HOST}

# Install dependencies and link workspaces
RUN yarn --frozen-lockfile --production

WORKDIR /usr/src/app/frontend

# Expose frontend port
EXPOSE 3000
# Start frontend in production
CMD ["yarn", "start"]

