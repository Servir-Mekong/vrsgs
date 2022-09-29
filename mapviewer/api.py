import os
import json
from django.conf import settings
from django.http import JsonResponse
from datetime import date, datetime
from django.views.decorators.csrf import csrf_exempt
from mapviewer.core import ftpDownloadLink
from django.http.response import HttpResponse


# def is_ajax(request):
#     return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

def getData(request):
    # if is_ajax (request=request) and (request.method == "GET"):
    #     data = ftpDownloadLink()
    #     return data
    if request.method == "GET":
        # data = "ok"
        data = ftpDownloadLink()
    return JsonResponse(data, safe=False)

