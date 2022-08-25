from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomePage.as_view(), name='home'),
    path('precipitation-map/', views.PrecipMap.as_view(), name='precipitation-map'),
]
