FROM python:3.6.2

ARG APP_DIR=./app/python

ADD ${APP_DIR} /app
WORKDIR /app
RUN pip install --upgrade pip && \
    pip install -r /app/requirements.txt

RUN mkdir -p /app-files/icon

RUN chmod +x ./entrypoint.sh
RUN chmod +x ./entrypoint.dev.sh