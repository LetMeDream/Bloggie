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
    PostBySlugSerializer,
    AuthorSerializer
)
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.views import APIView 
from rest_framework.permissions import AllowAny
from api.models import User, Profile, Category, Post, Notification, Comment, Bookmark

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.db.models import Sum 


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

class LikePostView(APIView):
  @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'user_id': openapi.Schema(type=openapi.TYPE_INTEGER),
                'post_id': openapi.Schema(type=openapi.TYPE_INTEGER),
            },
        ),
    )
  def post(self, request):
    user_id = request.data['user_id']
    post_id = request.data['post_id']

    user = User.objects.get(pk=user_id)
    post = Post.objects.get(pk=post_id)

    if user in post.likes.all():
      # Has it been liked before?
      post.likes.remove(user)
      return Response({"Message": "Post disliked"}, status=status.HTTP_200_OK)
    else:
      post.likes.add(user)
      Notification.objects.create(author=post.user, from_user=user, post=post, type='Like')

      return Response({"Message": "Post liked"}, status=status.HTTP_200_OK)

class PostCommentView(APIView):
  @swagger_auto_schema(
      request_body=openapi.Schema(
          type=openapi.TYPE_OBJECT,
          properties={
              'post_id': openapi.Schema(type=openapi.TYPE_INTEGER),
              'name': openapi.Schema(type=openapi.TYPE_STRING),
              'email': openapi.Schema(type=openapi.TYPE_STRING),
              'comment': openapi.Schema(type=openapi.TYPE_STRING),
          },
      ),
  )
  def post(self, request):
    # Get data from request.data (frontend)
    post_id = request.data['post_id']
    name = request.data['name']
    email = request.data['email']
    comment = request.data['comment']

    post = Post.objects.get(id=post_id)

    # Create Comment
    Comment.objects.create(
        post=post,
        name=name,
        email=email,
        comment=comment,
    )

    # Notification
    Notification.objects.create(
        author=post.user,
        from_user=name,
        post=post,
        type="Comment",
    )

    # Return response back to the frontend
    return Response({"message": "Comment Sent"}, status=status.HTTP_201_CREATED)

class BookmarkPostView(APIView):
  @swagger_auto_schema(
    request_body=openapi.Schema(
      type=openapi.TYPE_OBJECT,
      properties={
        'user_id': openapi.Schema(type=openapi.TYPE_INTEGER),
        'post_id': openapi.Schema(type=openapi.TYPE_STRING),
      },
    ),
  )
  
  def post(self, request):
    user_id = request.data['user_id']
    post_id = request.data['post_id']

    user = User.objects.get(id=user_id)
    post = Post.objects.get(id=post_id)
    bookmark = Bookmark.objects.filter(post=post, user=user).first()
    
    if bookmark:
      # Remove post from bookmark
      bookmark.delete()
      return Response({"message": "Post Un-Bookmarked"}, status=status.HTTP_200_OK)
    else:
      Bookmark.objects.create(
          user=user,
          post=post
      )

      # Notification
      Notification.objects.create(
          author=post.user,
          from_user=user.username,
          post=post,
          type="Bookmark",
      )
      return Response({"message": "Post Bookmarked"}, status=status.HTTP_201_CREATED)

class DashboardStats(generics.ListAPIView):
  serializer_class = AuthorSerializer

  def get_queryset(self):
    user_id = self.kwargs['user_id']
    user = User.objects.get(id=user_id)

    views = Post.objects.filter(user=user).aggregate(view=Sum("view"))['view']
    posts = Post.objects.filter(user=user).count()
    likes = Post.objects.filter(user=user).aggregate(total_likes=Sum("likes"))['total_likes']
    # 'post__user' is called a 'lookup field'.
    bookmarks = Bookmark.objects.filter(post__user=user).count() # 'post__user' refers to the user that authored the bookmarked posts.
    # It does not refer to the user that authored the bookmark itself.

    # Remember that ListAPIView MUST return an array list.
    return ([{
        "views": views,
        "posts": posts,
        "likes": likes,
        "bookmarks": bookmarks,
    }])
