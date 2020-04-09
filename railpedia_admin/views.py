from django.shortcuts import render
from django.http.response import JsonResponse
from django.core import serializers
from . import models

def line_index(request):
    lines = models.Line.objects.all()

    view_data_line = []
    for line in lines:
        view_data_line.append({
            'line_name': line.line_name,
        })

    return render(request, 'line_index.html', {'lines': view_data_line})
