from django.urls import path, include
from .views import All_projects, A_project, All_sprints, A_sprint, All_tickets, A_ticket 


# From company_app
# :8000/api/companies/<int:id>/projects/
urlpatterns = [
    path("", All_projects.as_view(), name="all_projects"),
    path("<int:proj_id>/", A_project.as_view(), name="all_projects"),
    path("<int:proj_id>/sprints/", All_sprints.as_view(), name="all_sprints"),
    path("<int:proj_id>/sprints/<int:sprint_id>/", A_sprint.as_view(), name="a_sprint"),
    path("<int:proj_id>/sprints/<int:sprint_id>/tickets/", All_tickets.as_view(), name="all_tickets"),
    # path("<int:proj_id>/sprints/<int:sprint_id>/tickets/<int:ticket_id>/", A_ticket.as_view(), name="a_ticket"),
    # path("ticket/<int:ticket_id>/", A_ticket.as_view(), name="a_ticket")
]
