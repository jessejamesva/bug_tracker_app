from django.db import models
from user_app.models import Client

# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=200, null=True)

    project_manager = models.ForeignKey(Client, related_name="projects", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Sprint(models.Model):
    name = models.CharField(max_length=25, unique=True)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)

    parent_project = models.ForeignKey(Project, related_name="sprints", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name

class Ticket(models.Model):
    status = [
        ("na", "Not Assigned"),
        ("ip", "In Progress"),
        ("te", "Scheduled for Testing"),
        ("qa", "Verified"),
        ("ok", "Approved")
    ]

    feature = models.CharField(max_length=25)
    due_date = models.DateField(null=True)
    status = models.CharField(max_length=2, choices=status, default="na")
    notes = models.TextField(max_length=300, null=True)

    sprint = models.ForeignKey(Sprint, related_name="tickets", on_delete=models.CASCADE, null=True)
    assigned_to = models.ForeignKey(Client, related_name="bugs_assigned", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.id
