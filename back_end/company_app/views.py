from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND
from .serializers import Company, CompanySerializer, CompanyOnlySerializer


# Create your views here.
class User_permissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Company_names(APIView):
    def get(self, request):
        all_companies = Company.objects.all()
        serializer_companies = CompanyOnlySerializer(all_companies, many=True)
        return Response(serializer_companies.data)
    
class All_companies(User_permissions):
    def get(self, request):
        all_companies = Company.objects.all()
        serializer_companies = CompanySerializer(all_companies, many=True)
        return Response(serializer_companies.data)
    
    def post(self, request):
        new_company = Company(**request.data)
        new_company.save()
        a_company = CompanySerializer(new_company)
        return Response(a_company.data, status=HTTP_201_CREATED)

class A_company(User_permissions):
    def get(self, request, id):
        a_company = get_object_or_404(Company, id = id)
        if request.user.company.id == a_company.id:
            company = CompanySerializer(a_company)        
            return Response(company.data)
        else:
            return Response("User not authorized", status=HTTP_404_NOT_FOUND)
