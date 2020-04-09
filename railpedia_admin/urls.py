from django.contrib import admin
from django.urls import path, include
from . import views, admin

urlpatterns = [
    path('line', views.line_index)
]
