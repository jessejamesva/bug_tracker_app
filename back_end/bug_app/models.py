from django.db import models

# these are my models. I only have these and a client app for users. That can be found under the user_app
# Right now, I have my models, serializers, and about half of my views created and verified. I can make the correct API calls, verified through postman, and have ensured only clients logged in and who are employees of the company can view the company information (projects, sprints, and tickets). I still need to make sure only project managers can update and delete projects and sprints. All users will be able to edit and create tickets. There are png files in the main readme that illustrate 

class Company(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=200, null=True)

    company = models.ForeignKey(Company, related_name="projects", on_delete=models.CASCADE)
    project_manager = models.ForeignKey("user_app.Client", related_name="projects", on_delete=models.CASCADE, null=True)

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
    assigned_to = models.ForeignKey("user_app.Client", related_name="bugs_assigned", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.id
    

