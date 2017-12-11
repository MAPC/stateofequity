FROM ruby:2.4.2

RUN set -ex \
    ; \
    mkdir -p /usr/src/app

VOLUME /usr/src/app
WORKDIR /usr/src/app

COPY Gemfile .
COPY Gemfile.lock .

RUN set -ex \
    ; \
    bundle install

CMD ["jekyll", "serve"]
