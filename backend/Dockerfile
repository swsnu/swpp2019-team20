FROM python:3.7-slim

WORKDIR /opt/payback-backend/

COPY requirements.txt .
RUN set -ex \
	&& mkdir -p /usr/share/man/man1 \
	&& apt-get update && apt-get install -y build-essential python3-dev default-jre-headless \
	&& rm -rf /var/lib/apt/lists/* \
	&& pip3 install -U pip setuptools wheel \
	&& pip3 install --no-cache-dir -r requirements.txt uvicorn

COPY . .

EXPOSE 8080
CMD ["sh", "-c", "./manage.py makemigrations && ./manage.py migrate && uvicorn --host 0.0.0.0 --port 8080 backend.asgi:application"]
