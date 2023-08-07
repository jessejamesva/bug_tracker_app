from django.contrib import admin
from .models import Project, Sprint, User, Ticket

# Register your models here.
admin.site.register([Project, Sprint, User, Ticket])
