from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND
from .serializers import Company, CompanySerializer, Project, ProjectSerializer, Sprint, SprintOnlySerializer, SprintSerializer, Ticket, TicketSerializer, Client


# Create your views here.
class User_permissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

# <--------------------------  Company ------------------------------->
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



# <--------------------------  Project ------------------------------->
class All_projects(User_permissions):
    def get(self, request, id):
        all_projects = Project.objects.filter(company__exact = id)
        projects = ProjectSerializer(all_projects, many=True)
        return Response(projects.data)
    
    def post(self, request, id):
        company = get_object_or_404(Company, id = id)
        request.data["company"] = company
        pm_id = request.data["project_manager"]
        project_manager = get_object_or_404(Client, id = pm_id)
        request.data["project_manager"] = project_manager
        new_project = Project(**request.data)
        new_project.save()
        a_project = ProjectSerializer(new_project)
        return Response(a_project.data, status=HTTP_201_CREATED)
  
class A_project(User_permissions):
    def get(self, request, id, proj_id):
        a_project = Project.objects.filter(company__exact = id, id__exact = proj_id)
        if request.user.company.id == id:
            serialized_project = ProjectSerializer(a_project, many=True)
            return Response(serialized_project.data)
        else:
            return Response("User not authorized", status=HTTP_404_NOT_FOUND)
