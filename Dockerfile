# The backend uses native modules so use this Dockerfile to 
# build and deploy to AWS Lambda.
#   $ source tasks/docker-build-workspace.sh
#   $ source tasks/docker-run-workspace.sh

FROM node:carbon

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get dist-upgrade -y && \
    apt-get -y autoremove && \
    apt-get clean

# Install dependencies
RUN apt-get install -y \
    zip \
    unzip \
    python3.4 \
    python3-pip

# Install terraform
RUN curl -fSL "https://releases.hashicorp.com/terraform/0.11.2/terraform_0.11.2_linux_amd64.zip" -o terraform.zip && \
    unzip terraform.zip -d /opt/terraform && \
    ln -s /opt/terraform/terraform /usr/bin/terraform && \
    rm -f terraform.zip

# Install Heroku CLI
RUN wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh

# Install AWS CLI
RUN pip3 install --user awscli && \
    export PATH=$PATH:$HOME/.local/bin

# Setup workspace
WORKDIR /usr/src/app
COPY ./ .

# Why isn't .dockerignore working?
RUN rm -rf node_modules && \
    rm -rf backend/build && \
    rm -rf backend/frontend && \
    rm -rf infrastructure/env-dev/.terraform && \
    rm -rf infrastructure/env-production/.terraform
    
# Install node_modules
RUN yarn