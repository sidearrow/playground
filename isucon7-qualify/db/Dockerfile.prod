FROM mysql:5.7

ADD init /docker-entrypoint-initdb.d
ADD ./dev.cnf /etc/mysql/conf.d/dev.cnf

CMD ["--character-set-server=utf8mb4"]