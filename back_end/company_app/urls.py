from django.urls import path, include
from .views import All_companies, A_company

# :8000/api/companies/
urlpatterns = [
    path("", All_companies.as_view(), name="all_companies"),
    path("<int:id>/", A_company.as_view(), name="a_company"),
    path("<int:id>/projects/", include('bug_app.urls'))
]