FROM node:14-buster as node
FROM composer:latest as composer

FROM php:7.3.28-apache-buster

RUN apt-get update \
  && apt-get -y install \
  libicu-dev \
  libzip-dev \
  unzip \
  && apt-get clean \
  && docker-php-ext-install \
  intl \
  pdo_mysql \
  mbstring \
  zip \
  bcmath

COPY --from=composer /usr/bin/composer /usr/bin/composer

COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /opt/yarn-v1.22.5 /opt/yarn
RUN ln -s /opt/yarn/bin/yarn /usr/local/bin/yarn

COPY ./docker/app/000-default.conf /etc/apache2/sites-enabled/000-default.conf

WORKDIR /

COPY ./app /app

WORKDIR /app

RUN composer install \
  && yarn install