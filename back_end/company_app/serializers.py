from rest_framework.serializers import ModelSerializer
from .models import Company
from user_app.models import Client
from bug_app.serializers import ProjectSerializer



class ClientSerializers(ModelSerializer):
    class Meta:
        model = Client
        fields = ["id", "name", "role"]

class CompanySerializer(ModelSerializer):
    projects = ProjectSerializer(many=True)
    employees = ClientSerializers(many=True)

    class Meta:
        model = Company
        fields = ["id", "name", "projects", "employees"]

class CompanyOnlySerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = ["id", "name"]