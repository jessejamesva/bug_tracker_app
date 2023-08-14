from rest_framework.serializers import ModelSerializer
from .models import Client

class ClientSerializers(ModelSerializer):
    class Meta:
        model = Client
        fields = ["id", "name", "role"]