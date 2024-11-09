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
from django.urls import path
from api.views import CustomAdminLoginView
from django.views.generic import RedirectView  # Add this import for redirecting
from api.views import MyTokenObtainPairView, RegisterView, ProfileView, ProfileListView, UserView, UserListView, CategoryListView

urlpatterns = [
    path('admin/login/', CustomAdminLoginView.as_view()),  # Custom login view
    path('admin/', admin.site.urls),   # Custom login view
    #### Serialized views #### 
    path('api/token/', MyTokenObtainPairView.as_view()),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/profile/<int:user_id>', ProfileView.as_view()),
    path('api/profiles', ProfileListView.as_view()),
    path('api/user/<int:id>', UserView.as_view()),
    path('api/users', UserListView.as_view()),
    path('api/categories', CategoryListView.as_view())

]
