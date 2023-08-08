from django.shortcuts import render
from django.contrib.auth import authenticate
from .models import Client
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST


# Create your views here.
class Sign_Up(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        app_user = Client.objects.create_user(**request.data)
        token = Token.objects.create(user = app_user)
        return Response({"client": app_user.email, "token": token.key}, status=HTTP_201_CREATED)


class Log_in(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        app_user = authenticate(**request.data)
        if app_user:
            token, created = Token.objects.get_or_create(user = app_user)
            return Response({"token": token.key, "client": app_user.email})
        else:
            return Response("No user matching credentials.", status=HTTP_400_BAD_REQUEST)

class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({"client": request.user.email})