from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('registration', views.registration),
    path('form', views.form),
    path('auth', views.auth),
    path('log_out', views.log_out),
]
