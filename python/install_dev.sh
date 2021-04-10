#!/bin/bash
poetry export --without-hashes --dev -f requirements.txt > /tmp/requirements.txt
pip install -r /tmp/requirements.txt