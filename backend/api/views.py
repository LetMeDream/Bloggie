from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import (
    MyTokenObtainPairSerializer,
    RegisterSerializer,
    ExtendedProfileSerializer,
    ExtendedUserSerializer,
    CategorySerializer,
    PostSerializer,
    PostBySlugSerializer
)
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from api.models import User, Profile, Category, Post


# Create your views here.
# View for the Custom Login for admin
class CustomAdminLoginView(LoginView):
  template_name = 'api/admin/login.html'  # Point to the existing Jazzmin template

  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    # from pprint import pprint  # Import pprint for better formatting
    # pprint(context['form'])
    context['username'] = 'Username'
    return context

# Obtain User Token
class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer

# Register User
class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()  # Set queryset for CreateAPIView
  serializer_class = RegisterSerializer
  
  # Optional: Customize the response returned by CreateAPIView
  def create(self, request, *args, **kwargs):
    response = super().create(request, *args, **kwargs)
    return Response('Successfully created user', status=status.HTTP_201_CREATED)

# Specific Profile
class ProfileView(generics.RetrieveUpdateAPIView):
  queryset = Profile.objects.all()
  serializer_class = ExtendedProfileSerializer
  lookup_field = 'user_id'  # Match with the actual field name in Profile

# All Profiles
class ProfileListView(generics.ListAPIView):
  queryset = Profile.objects.all()  # Get all profiles
  serializer_class = ExtendedProfileSerializer  # Serializer to use to transform objects to JSON

# Specific User
class UserView(generics.RetrieveAPIView):
  queryset = User.objects.all()
  serializer_class = ExtendedUserSerializer
  lookup_field = 'id'  # Match with the actual field name in Profile

# All Users
class UserListView(generics.ListAPIView):
  queryset = User.objects.all()  # Get all profiles
  serializer_class = ExtendedUserSerializer  # Serializer to use to transform objects to JSON

# All Categories of Posts
class CategoryListView(generics.ListAPIView):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer

# Posts filtered by Category
class PostCategoryListView(generics.ListAPIView):
  serializer_class = PostSerializer
  permission_classes = [AllowAny]

  def get_queryset(self):
    category_slug = self.kwargs['category_slug']
    category = Category.objects.get(slug=category_slug)
    return Post.objects.filter(category=category, status='Active')

# All Posts
class PostListView(generics.ListAPIView):
  queryset = Post.objects.all()
  serializer_class = PostSerializer

class PostView(generics.RetrieveUpdateAPIView):
  queryset = Post.objects.all()
  serializer_class = PostSerializer
  lookup_field = 'id'

class PostBySlugView(generics.ListAPIView):
  serializer_class = PostBySlugSerializer

  def get_queryset(self):
    post_slug = self.kwargs['post_slug']
    post = Post.objects.get(slug=post_slug, status='Active')
    post.view += 1
    post.save()
    # Return a queryset instead of a single instance
    return Post.objects.filter(slug=post_slug, status='Active')

