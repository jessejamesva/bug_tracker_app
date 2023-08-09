from django.urls import path, include
from .views import All_projects, All_companies, A_company


# From project urls "users/"
urlpatterns = [
    path("", All_companies.as_view(), name="all_companies"),
    path("<int:id>/", A_company.as_view(), name="a_company"),
    path("<int:id>/projects/", All_projects.as_view(), name="all_projects")
]