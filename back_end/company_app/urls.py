from django.urls import path, include
from .views import All_companies, A_company, Company_names
from bug_app.views import A_ticket, A_sprint

# :8000/api/companies/
urlpatterns = [
    path("", All_companies.as_view(), name="all_companies"),
    path("list/", Company_names.as_view(), name="company_names"),
    path("<int:id>/", A_company.as_view(), name="a_company"),
    path("<int:id>/ticket/<int:ticket_id>/",
         A_ticket.as_view(), name="a_ticket"),
    path("<int:id>/sprints/<int:sprint_id>/",
         A_sprint.as_view(), name="a_sprint"),
    path("<int:id>/projects/", include('bug_app.urls'))
]
