from django.db import models
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
    role = models.CharField(max_length=2, choices=roles, default="ro")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def str(self):
        return f"{self.email}: role - {self.role}"
    
    