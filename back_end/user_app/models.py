from django.db import models
from bug_app.models import Company
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Client(AbstractUser):
    roles = [
        ("pm", "Project Manager"),
        ("se", "Software Engineer"),
        ("ta", "Test Analyst"),
        ("qa", "Quality Assurance Spec."),
        ("ro", "Read-Only")
    ]

    email = models.EmailField(max_length=50, unique=True)
    name = models.CharField(max_length=50, unique=True)
    role = models.CharField(max_length=2, choices=roles, default="ro")

    company = models.ForeignKey("bug_app.Company", related_name="employees", on_delete=models.CASCADE)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def str(self):
        return f"{self.name}: role - {self.role}"
    
    