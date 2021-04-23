FROM php:7.4.6-apache-buster

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY ./000-default.conf /etc/apache2/sites-enabled/000-default.conf
COPY ./php.ini /usr/local/etc/php/php.ini

RUN apt-get update && \
  apt-get -y install git libicu-dev libonig-dev libzip-dev unzip locales && \
  apt-get clean && \
  docker-php-ext-install intl pdo_mysql mbstring zip bcmath && \
  pecl install xdebug && \
  docker-php-ext-enable xdebug && \
  a2enmod rewrite

WORKDIR /var/www/app
