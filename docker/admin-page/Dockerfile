FROM node:14.3-buster as node
FROM php:7.4-fpm-buster

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY --from=node /usr/local/bin /usr/local/bin
COPY --from=node /opt /opt

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN apt-get update && \
  apt-get -y install git libicu-dev libonig-dev libzip-dev unzip locales && \
  apt-get clean && \
  docker-php-ext-install intl pdo_mysql mbstring zip bcmath

COPY ./zzz-www.conf /usr/local/etc/php-fpm.d/zzz-www.conf

WORKDIR /var/www/app
