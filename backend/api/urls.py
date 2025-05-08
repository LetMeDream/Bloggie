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
from django.urls import path
from api.views import (
    MyTokenObtainPairView,
    RegisterView,
    ProfileView,
    ProfileListView,
    UserView,
    UserListView,
    CategoryListView,
    PostCategoryListView,
    PostListView,
    PostView,
    PostBySlugView,
    LikePostView,
    PostCommentView,
    BookmarkPostView,
    DashboardStatsView,
    DashboardPostListView,
    DashboardCommentListView,
    DashboardNotificationListView,
    DashboardMarkNotificationAsSeenView,
    DashboardPostCommentReplyView,
    DashboardPostCreateView,
    DashboardPostEditView,
    DashboardPostDeleteView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    #### Serialized views #### 

    # User Auth Endpoints
    path('user/token/', MyTokenObtainPairView.as_view()),
    path('user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/register/', RegisterView.as_view(), name='register'),
    path('user/profile/<int:user_id>', ProfileView.as_view()),
    path('user/<int:id>', UserView.as_view()),

    # Post Endpoints
    path('post/category/list/', CategoryListView.as_view()),
    path('post/category/posts/<category_slug>', PostCategoryListView.as_view()),
    path('post/detail/<post_slug>', PostBySlugView.as_view()),
    path('post/', PostListView.as_view()),
    path('post/<int:id>', PostView.as_view()),
    path('post/like-post', LikePostView.as_view()),
    path('post/comment-post', PostCommentView.as_view()),
    path('post/bookmark-post', BookmarkPostView.as_view()),

    # Dashboard Endpoits
    path('author/dashboard/stats/<user_id>/', DashboardStatsView.as_view()),
    path('author/dashboard/post/<user_id>/', DashboardPostListView.as_view()),
    path('author/dashboard/comment/<user_id>/', DashboardCommentListView.as_view()),
    path('author/dashboard/noti-list/<user_id>/', DashboardNotificationListView.as_view()),
    path('author/dashboard/noti-mark-seen', DashboardMarkNotificationAsSeenView.as_view()),
    path('author/dashboard/reply-comment', DashboardPostCommentReplyView.as_view()),
    path('author/dashboard/post-create', DashboardPostCreateView.as_view()),
    path('author/dashboard/post-edit/<user_id>/<post_id>', DashboardPostEditView.as_view()),
    path('author/dashboard/post-delete/<user_id>/<post_id>', DashboardPostDeleteView.as_view()),

    # Misc
    path('profiles', ProfileListView.as_view()),
    path('users', UserListView.as_view())
]
