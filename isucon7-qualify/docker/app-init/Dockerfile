FROM python:3.6.2

ARG APP_DIR

ADD ${APP_DIR} /app
WORKDIR /app
RUN pip install --upgrade pip && \
    pip install -r /app/requirements.txt

ADD ./docker/app/entrypoint.sh /app/entrypoint.sh
RUN chmod +x ./entrypoint.sh

CMD ["sh", "./entrypoint.sh"]