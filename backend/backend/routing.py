from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import loan.routing

application = ProtocolTypeRouter({      # pylint: disable=invalid-name
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(
            loan.routing.websocket_urlpatterns
        )
    ),
})
