from django.contrib import admin
from .models import Project, Sprint, Member, Ticket

# Register your models here.
admin.site.register([Project, Sprint, Member, Ticket])
