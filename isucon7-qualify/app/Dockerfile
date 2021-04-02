FROM python:3.6.2

ADD . /app
WORKDIR /app
RUN pip install --upgrade pip && \
    pip install -r /app/requirements.txt

RUN chmod +x ./entrypoint.sh
RUN chmod +x ./entrypoint.dev.sh