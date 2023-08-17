from django.urls import path, include
from .views import All_companies, A_company
from bug_app.views import A_ticket

# :8000/api/companies/
urlpatterns = [
    path("", All_companies.as_view(), name="all_companies"),
    path("<int:id>/", A_company.as_view(), name="a_company"),
    path("<int:id>/ticket/<int:ticket_id>/", A_ticket.as_view(), name="a_ticket"),
    path("<int:id>/projects/", include('bug_app.urls'))
]