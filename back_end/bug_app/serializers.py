from rest_framework.serializers import ModelSerializer
from .models import Project, Sprint, Ticket


class TicketSerializer(ModelSerializer):
    class Meta:
        model = Ticket
        fields = ["id", "feature", "due_date", "status", "notes", "assigned_to"]


class SprintSerializer(ModelSerializer):
    tickets = TicketSerializer(many=True)

    class Meta:
        model = Sprint
        fields = ["id", "name", "start_date", "end_date", "tickets"]


class SprintOnlySerializer(ModelSerializer):
    class Meta:
        model = Sprint
        fields = ["id", "name", "start_date", "end_date"]


class ProjectSerializer(ModelSerializer):
    sprints = SprintSerializer(many=True)

    class Meta:
        model = Project
        fields = ["id", "name", "description", "project_manager", "sprints"]


class ProjectOnlySerializer(ModelSerializer):

    class Meta:
        model = Project
        fields = ["id", "name", "description", "project_manager"]


