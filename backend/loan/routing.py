from django.conf.urls import url
from . import consumers

websocket_urlpatterns = [           # pylint: disable=invalid-name
    url(r'^ws/loan/chatroom/(?P<room_name>[^/]+)/$', consumers.ChatConsumer),
]
