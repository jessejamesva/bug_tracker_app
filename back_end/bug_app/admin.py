from django.contrib import admin
from .models import Project, Sprint, Ticket
from user_app.models import Client

# Register your models here.
admin.site.register([Project, Sprint, Ticket, Client])
