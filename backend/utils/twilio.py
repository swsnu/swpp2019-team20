import os
from twilio.rest import Client

TWILIO_API_KEY = os.getenv('TWILIO_API_KEY')
TWILIO_API_SECRET = os.getenv('TWILIO_API_SECRET')
TWILIO_FROM_NUMBER = os.getenv('TWILIO_FROM_NUMBER')

def check_env():
    if TWILIO_API_KEY and TWILIO_API_SECRET and TWILIO_FROM_NUMBER:
        return True
    return False

def send_message(recipient, msg):
    if not check_env():
        return

    client = Client(TWILIO_API_KEY, TWILIO_API_SECRET)
    client.messages.create(from_=TWILIO_FROM_NUMBER, to=recipient, body=msg)
