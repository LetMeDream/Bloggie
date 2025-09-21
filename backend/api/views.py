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
    AuthorSerializer,
    CommentSerializer, 
    NotificationSerializer,
    MinifiedPostSerializer
)
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.views import APIView 
from rest_framework.permissions import AllowAny
from api.models import User, Profile, Category, Post, Notification, Comment, Bookmark

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.db.models import Sum 
from django.views.decorators.cache import cache_control
from django.utils.decorators import method_decorator

import pdb  # Imported for depuration

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
@method_decorator(cache_control(max_age=31536000), name='dispatch')  
class PostListView(generics.ListAPIView):
  queryset = Post.objects.all().order_by('-id')
  serializer_class = PostSerializer

# Get Post by giver id (does not count the view in the view counter)
class PostView(generics.RetrieveUpdateAPIView):
  queryset = Post.objects.all()
  serializer_class = PostSerializer
  lookup_field = 'id'

# Get Post by given slow (counts the view in the view counter)
class PostBySlugView(generics.ListAPIView):
  serializer_class = PostBySlugSerializer

  def get_queryset(self):
    post_slug = self.kwargs['post_slug']
    post = Post.objects.get(slug=post_slug, status__iexact='Active')
    post.view += 1
    post.save()
    # Return a queryset instead of a single instance
    return Post.objects.filter(slug=post_slug, status__iexact='Active')

# Like a Post
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
      # Has it been liked by this user before?
      post.likes.remove(user)
      return Response({"Message": "Post disliked"}, status=status.HTTP_200_OK)
    else:
      post.likes.add(user)
      Notification.objects.create(author=post.user, from_user=user, post=post, type='Like')

      return Response({"Message": "Post liked"}, status=status.HTTP_200_OK)

# Create a Comment on a Post, alongide notification
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

class DashboardStatsView(generics.ListAPIView):
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

class DashboardPostListView(generics.ListAPIView):
  serializer_class = PostSerializer

  def get_queryset(self):
    user_id = self.kwargs['user_id']
    user = User.objects.get(pk=user_id) 
    return Post.objects.filter(user=user).order_by('-id')

class DashboardCommentListView(generics.ListAPIView):
  serializer_class = CommentSerializer

  def get_queryset(self):
    user_id = self.kwargs['user_id']
    user = User.objects.get(pk=user_id) 
    user_posts = Post.objects.filter(user=user)
    comments = Comment.objects.filter(post__user=user)
    return comments

class DashboardNotificationListView(generics.ListAPIView):
  serializer_class = NotificationSerializer

  def get_queryset(self):
    user_id = self.kwargs['user_id']
    user = User.objects.get(pk=user_id) 
    user_posts = Post.objects.filter(user=user)
    notifications = Notification.objects.filter(post__user=user)
    return notifications

class DashboardMarkNotificationAsSeenView(APIView):

  def post(self, request, *args, **kwargs):
    # Info by request body
    notification_id = request.data['notification_id']
    notification = Notification.objects.filter(pk=notification_id).last()
    if not notification.seen:
      notification.seen = True
      notification.save()
      return Response({"message": "Notification marked as seen successfully"}, status=status.HTTP_200_OK)
    else:
      return Response({"message": "This notification had been seen already and will remain that way"}, status=status.HTTP_200_OK)

class DashboardPostCommentReplyView(APIView):

  def post(self, request):
    comment_id = request.data['comment_id']
    reply = request.data['reply']

    print("comment_id =======", comment_id)
    print("reply ===========", reply)

    comment = Comment.objects.get(pk=comment_id)
    comment.reply = reply
    comment.save()

    return Response({"message": "Comment Response Sent"}, status=status.HTTP_201_CREATED)

class DashboardPostCreateView(generics.CreateAPIView):
  serializer_class = MinifiedPostSerializer
  permission_classes = [AllowAny]

  def create(self, request, *args, **kwargs):
    print(request.data)
    # pdb.set_trace()  # Pausar la ejecución aquí para depuración interactiva
    user_id = request.data.get('user')
    profile_id = request.data.get('profile')
    title = request.data.get('title')
    image = request.data.get('image')
    description = request.data.get('description')
    tags = request.data.get('tags')
    category_id = request.data.get('category')
    post_status = request.data.get('status')
    user = User.objects.get(id=user_id)
    profile = Profile.objects.get(id=profile_id) if profile_id else Profile.objects.get(user_id=user_id)
    category = Category.objects.get(id=category_id)

    post = Post.objects.create(
      user=user,
      profile=profile,
      title=title,
      image=image,
      description=description,
      tags=tags,
      category=category,
      status=post_status
    )

    return Response({"message": "Post Created Successfully"}, status=status.HTTP_201_CREATED)

class DashboardPostEditView(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = PostSerializer

  def get_object(self):
    user_id = self.kwargs['user_id']
    post_id = self.kwargs['post_id']
    user = User.objects.get(id=user_id)
    return Post.objects.get(user=user, id=post_id)

  def update(self, request, *args, **kwargs):
    post_instance = self.get_object()

    title = request.data.get('title')
    image = request.data.get('image')
    description = request.data.get('description')
    tags = request.data.get('tags')
    category_id = request.data.get('category')
    post_status = request.data.get('post_status')

    # Since 'category' is a foreign key in Post, we'll need to use the  id sent  for  fetching the category first
    category = Category.objects.get(id=category_id) # before actually assigning it 

    post_instance.title = title
    if image != "undefined":
        post_instance.image = image
    post_instance.description = description
    post_instance.tags = tags
    post_instance.category = category
    post_instance.status = post_status
    post_instance.save()

    return Response({"message": "Post Updated Successfully"}, status=status.HTTP_200_OK)
  
class DashboardPostDeleteView(generics.DestroyAPIView):
    serializer_class = PostSerializer

    def get_object(self):
        user_id = self.kwargs['user_id']
        post_id = self.kwargs['post_id']
        user = User.objects.get(id=user_id)
        return Post.objects.get(user=user, id=post_id)

    def destroy(self, request, *args, **kwargs):
        post_instance = self.get_object()
        post_instance.delete()
        print(">>> Devolviendo respuesta 200 OK personalizada") # Línea de depuración
        response = Response({"message": "Post Deleted Successfully"}, status=status.HTTP_200_OK)
        print(f">>> Status code: {response.status_code}") # Otra línea útil
        return response