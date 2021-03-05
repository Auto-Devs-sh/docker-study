FROM ruby

WORKDIR /home/app

# Environment vars
ENV PORT 3000
ENV NODE_VERSION=14.16.0
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
ENV NVM_DIR=/root/.nvm

EXPOSE $PORT

RUN gem install rails bundler
RUN gem install rails
RUN apt-get update -qq

RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
# Installing yarn because rails 6 depends on yarn
RUN npm install -g yarn

ENTRYPOINT [ "/bin/bash" ]
