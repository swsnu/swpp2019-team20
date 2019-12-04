FROM python:3.7-slim

WORKDIR /opt/payback-backend/

COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .
RUN mv backend/prod_settings.py backend/settings.py

EXPOSE 8080
CMD ["sh", "-c", "./manage.py makemigrations && ./manage.py migrate && ./manage.py runserver 0.0.0.0:8080"]
