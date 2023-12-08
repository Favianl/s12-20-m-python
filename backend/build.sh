#!/usr/bin/env bash
# exit on error
set -o errexit

cd backend/
pip install --upgrade pippip install --force-reinstall -U setuptools
pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

cd config/
pwd