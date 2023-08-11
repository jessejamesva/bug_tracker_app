from django.urls import path, include
from .views import All_projects, A_project, All_companies, A_company, All_sprints, A_sprint, All_tickets, A_ticket


# From project urls "users/"
urlpatterns = [
    path("", All_companies.as_view(), name="all_companies"),
    path("<int:id>/", A_company.as_view(), name="a_company"),
    path("<int:id>/projects/", All_projects.as_view(), name="all_projects"),
    path("<int:id>/projects/<int:proj_id>/", A_project.as_view(), name="all_projects"),
    path("<int:id>/projects/<int:proj_id>/sprints/", All_sprints.as_view(), name="all_sprints"),
    path("<int:id>/projects/<int:proj_id>/sprints/<int:sprint_id>/", A_sprint.as_view(), name="a_sprint"),
    path("<int:id>/projects/<int:proj_id>/sprints/<int:sprint_id>/tickets/", All_tickets.as_view(), name="all_tickets"),
    path("<int:id>/projects/<int:proj_id>/sprints/<int:sprint_id>/tickets/<int:ticket_id>/", A_ticket.as_view(), name="a_ticket")
]

# path (sprint) (?=company = one, project = 7)
# path (sprint/1)