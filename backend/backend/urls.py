"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.urls import path, include
from api.views import CustomAdminLoginView
from django.views.generic import RedirectView  # Add this import for redirecting
from api.views import MyTokenObtainPairView, RegisterView, ProfileView, ProfileListView, UserView, UserListView, CategoryListView

from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Blog Backend APIs",
        default_version="v1",
        description="This is the documentation for the backend API",
        terms_of_service="http://mywbsite.com/policies/",
        contact=openapi.Contact(email="desphixs@gmail.com"),
        license=openapi.License(name="BSD Licence"),
    ),
    public=True,
    permission_classes = (permissions.AllowAny, )
)

urlpatterns = [
    path("", schema_view.with_ui('swagger', cache_timeout=0), name="schema-swagger-ui"),
    path('admin/login/', CustomAdminLoginView.as_view()),  # Custom login view
    path('admin/', admin.site.urls),   # Custom login view
    path('api/', include('api.urls'))
]

# Serves from `settings.XXXXX_ROOT` when accessed to `settings.XXXXX_URL`
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)