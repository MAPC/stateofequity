FROM ruby:2.4.2

RUN set -ex \
    ; \
    mkdir -p /usr/src/app

VOLUME /usr/src/app
WORKDIR /usr/src/app

RUN set -ex \
    ; \
    gem install jekyll

CMD ["jekyll", "serve"]
