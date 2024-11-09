from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import MyTokenObtainPairSerializer, RegisterSerializer, ExtendedProfileSerializer, ExtendedUserSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework import status, generics
from api.models import User, Profile, Category


# Create your views here.
class CustomAdminLoginView(LoginView):
  template_name = 'api/admin/login.html'  # Point to the existing Jazzmin template

  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    # from pprint import pprint  # Import pprint for better formatting
    # pprint(context['form'])
    context['username'] = 'Username'
    return context

# Crear una vista personalizada para obtener tokens usando el serializer personalizado
class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()  # Set queryset for CreateAPIView
  serializer_class = RegisterSerializer
  
  # Optional: Customize the response returned by CreateAPIView
  def create(self, request, *args, **kwargs):
    response = super().create(request, *args, **kwargs)
    return Response('Successfully created user', status=status.HTTP_201_CREATED)

class ProfileView(generics.RetrieveAPIView):
  queryset = Profile.objects.all()
  serializer_class = ExtendedProfileSerializer
  lookup_field = 'user_id'  # Match with the actual field name in Profile

class ProfileListView(generics.ListAPIView):
  queryset = Profile.objects.all()  # Get all profiles
  serializer_class = ExtendedProfileSerializer  # Serializer to use to transform objects to JSON

class UserView(generics.RetrieveAPIView):
  queryset = User.objects.all()
  serializer_class = ExtendedUserSerializer
  lookup_field = 'id'  # Match with the actual field name in Profile

class UserListView(generics.ListAPIView):
  queryset = User.objects.all()  # Get all profiles
  serializer_class = ExtendedUserSerializer  # Serializer to use to transform objects to JSON

class CategoryListView(generics.ListAPIView):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer