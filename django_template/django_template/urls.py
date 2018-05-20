"""django_template URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from django.views.generic import TemplateView
from custom_user.auth import TestAuthView
from rest_auth.views import LoginView, LogoutView
from rest_auth.registration.views import RegisterView, VerifyEmailView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('test_auth/', TestAuthView.as_view(), name='test_auth', ),
    path('rest-auth/logout/', LogoutView.as_view(), name='rest_logout', ),
    path('rest-auth/login/', LoginView.as_view(), name='rest_login', ),
    path('rest-auth/register/', RegisterView.as_view(), name='rest_register'),
]

urlpatterns += [

    url(r'^verify-email', VerifyEmailView.as_view(), name='verify_email'),
    url(r'^account-confirm-email/(?P<key>[-:\w]+)/$', TemplateView.as_view(),
            name='account_confirm_email'),

]