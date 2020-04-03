from django.urls import path
from . import views

app_name = "cms"

urlpatterns = [
    path("",views.index,name="index"),
    path("addnewsclassify/",views.Add_News_Classify.as_view(),name='addnewsclassify')
]
