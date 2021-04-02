#!/bin/sh
gunicorn --workers=4 --threads=4 --reload app:app -b '0.0.0.0:5000'