FROM node:17

# Install gettext for envsubst
RUN apt-get update
RUN apt-get install -y gettext-base

ADD deploy.sh /

ENTRYPOINT [ "/deploy.sh" ]