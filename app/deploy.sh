#!/bin/bash
cp .env.prod .env && gcloud app deploy
