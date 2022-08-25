from django.shortcuts import render
from django.views.generic import TemplateView

class HomePage(TemplateView):
    template_name = "home.html"

class PrecipMap(TemplateView):
    template_name = "mapviewer/precip_map.html"