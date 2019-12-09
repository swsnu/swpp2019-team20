FROM python:3.7-slim

WORKDIR /opt/payback-backend/

COPY requirements.txt .
RUN set -ex \
	&& apt-get update && apt-get install -y python3-dev gcc \
	&& rm -rf /var/lib/apt/lists/* \
	&& pip3 install --no-cache-dir -r requirements.txt uvicorn

COPY . .

EXPOSE 8080
CMD ["sh", "-c", "./manage.py makemigrations && ./manage.py migrate && uvicorn --host 0.0.0.0 --port 8080 backend.asgi:application"]
