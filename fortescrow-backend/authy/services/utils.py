from authy.models import User
from rest_framework.authtoken.models import Token

def refresh_token(user: User) -> str:
    try:
        token = Token.objects.get(user=user).delete()

    except Token.DoesNotExist:
        pass

    token = Token.objects.create(user=user)

    return token.key