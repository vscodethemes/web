FROM node:carbon
# Build variables
ARG TF_VAR_sentry_dsn
ARG TF_VAR_algolia_app_id
ARG TF_VAR_algolia_index
ARG ALGOLIA_SEARCH_KEY
ARG GTM_ID
# Create app directories
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/frontend
RUN mkdir -p /usr/src/app/frontend/build
RUN mkdir -p /usr/src/app/types
RUN mkdir -p /usr/src/app/types/build
RUN mkdir -p /usr/src/app/tokenizer
RUN mkdir -p /usr/src/app/tokenizer/build
WORKDIR /usr/src/app
# Add root workspace files
ADD ./yarn.lock . 
ADD ./package.json .
ADD ./tsconfig.json .
# Add types
ADD ./types/package.json types
ADD ./types/build types/build
# Add tokenizer
ADD ./tokenizer/package.json tokenizer
ADD ./tokenizer/build tokenizer/build
# Add theme-variables
ADD ./theme-variables/package.json theme-variables
ADD ./theme-variables/build theme-variables/build
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
ENV TF_VAR_sentry_dsn=${TF_VAR_sentry_dsn}
ENV TF_VAR_algolia_app_id=${TF_VAR_algolia_app_id}
ENV TF_VAR_algolia_index=${TF_VAR_algolia_index}
ENV ALGOLIA_SEARCH_KEY=${ALGOLIA_SEARCH_KEY}
ENV GTM_ID=${GTM_ID}
# Install dependencies and link workspaces
RUN yarn --frozen-lockfile --production
# Move to frontend directory
WORKDIR /usr/src/app/frontend
# Expose frontend port
EXPOSE 3000
# Start frontend in production
CMD ["yarn", "start"]

