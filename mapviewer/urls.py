from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomePage.as_view(), name='home'),
    path('about/', views.AboutPage.as_view(), name='about'),
    path('precipitation-hist-map/', views.PrecipHistMap.as_view(), name='precipitation-hist-map'),
    path('precipitation-nrt-map/', views.PrecipNRTMap.as_view(), name='precipitation-nrt-map'),
    path('chirps-gefs-map/', views.CHIRPSGEFSMap.as_view(), name='chirps-gefs-map'),
]
