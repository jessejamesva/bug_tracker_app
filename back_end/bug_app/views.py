from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND
from .serializers import Project, ProjectSerializer, Sprint, SprintSerializer, Ticket, TicketSerializer 
from user_app.models import Client
from company_app.models import Company


# Create your views here.
class User_permissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]



# <-------------------------- Project ------------------------------->
class All_projects(User_permissions):
    def get(self, request, id):
        if request.user.id == id:
            all_projects = Project.objects.filter(company__exact = id)
            projects = ProjectSerializer(all_projects, many=True)
            return Response(projects.data)
        else: 
            return Response("User not Authorized", status=HTTP_404_NOT_FOUND)
    
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
        
        
# <---------------------------- Sprint ------------------------------------>
class All_sprints(User_permissions):
    def get(self, request, id, proj_id):
        all_sprints = Sprint.objects.filter(parent_project__exact = proj_id)
        if request.user.company.id == id:
            serialized_sprints = SprintSerializer(all_sprints, many=True)
            return Response(serialized_sprints.data)
        else:
            return Response("User not authorized", status=HTTP_404_NOT_FOUND)
        
    def post(self, request, id, proj_id):
        project = get_object_or_404(Project, id = proj_id)
        request.data["parent_project"] = project
        new_sprint = Sprint(**request.data)
        new_sprint.save()
        a_sprint = SprintSerializer(new_sprint)
        return Response(a_sprint.data, status=HTTP_201_CREATED)
    
class A_sprint(User_permissions):
    def get(self, request, id, proj_id, sprint_id):
        a_sprint = Sprint.objects.filter(parent_project__exact = proj_id, id__exact = sprint_id)
        if request.user.company.id == id:
            serialized_sprint = SprintSerializer(a_sprint, many = True)
            return Response(serialized_sprint.data)
        else:
            return Response("User not authorized", status=HTTP_404_NOT_FOUND)
        

# <------------------------------ Ticket ----------------------------------->
class All_tickets(User_permissions):
    def get(self, request, id, proj_id, sprint_id):
        all_tickets = Ticket.objects.filter(sprint__exact = sprint_id) 
        if request.user.company.id == id:
            serialized_tickets = TicketSerializer(all_tickets, many=True)
            return Response(serialized_tickets.data)
        else: 
            return Response("User not authorized", status=HTTP_404_NOT_FOUND)
        
    def post(self, request, id, proj_id, sprint_id):
        sprint = get_object_or_404(Sprint, id = sprint_id)
        request.data["sprint"] = sprint
        new_ticket = Ticket(**request.data)
        new_ticket.save()
        a_ticket = TicketSerializer(new_ticket)
        return Response(a_ticket.data, status=HTTP_201_CREATED)
    
class A_ticket(User_permissions):
    def get(self, request, id, ticket_id):
        a_ticket = get_object_or_404(Ticket, id = ticket_id)
        if request.user.company.id == id:
            serialized_ticket = TicketSerializer(a_ticket)
            return Response(serialized_ticket.data)
        else:
            return Response("User not authorized", status=HTTP_404_NOT_FOUND)


    # def get(self, request, id, proj_id, sprint_id, ticket_id):
    #     a_ticket = Ticket.objects.filter(sprint__exact = sprint_id, id__exact = ticket_id)
    #     if request.user.company.id == id:
    #         serialized_ticket = TicketSerializer(a_ticket, many = True)
    #         return Response(serialized_ticket.data)
    #     else:
    #         return Response("User not authorized", status=HTTP_404_NOT_FOUND)
