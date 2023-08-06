from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Member(AbstractUser):
    roles = [
        ("pm", "Project Manager"),
        ("se", "Software Engineer"),
        ("ta", "Test Analyst"),
        ("qa", "Quality Assurance Spec."),
        ("ro", "Read-Only")
    ]
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    role = models.CharField(max_length=2, choices=roles, default="ro")

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    def str(self):
        return f"{self.username}: role - {self.role}"

class Project(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=200, null=True)

    project_manager = models.ForeignKey(Member, related_name="projects", on_delete=models.CASCADE)

class Sprint(models.Model):
    pass

class Ticket(models.Model):
    pass
