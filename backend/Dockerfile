FROM python:3.7-slim

WORKDIR /opt/payback-backend/

COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt gunicorn

COPY . .
RUN mv backend/prod_settings.py backend/settings.py

EXPOSE 8080
CMD ["sh", "-c", "./manage.py makemigrations && ./manage.py migrate && gunicorn -b 0.0.0.0:8080 backend.wsgi"]
