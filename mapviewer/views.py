from django.shortcuts import render
from django.views.generic import TemplateView

class HomePage(TemplateView):
    template_name = "home.html"

class AboutPage(TemplateView):
    template_name = "about.html"

class PrecipHistMap(TemplateView):
    template_name = "mapviewer/precip_hist_map.html"

class PrecipNRTMap(TemplateView):
    template_name = "mapviewer/precip_nrt_map.html"

class CHIRPSGEFSMap(TemplateView):
    template_name = "mapviewer/chirps-gefs_map.html"