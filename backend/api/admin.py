from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Profile, Category, Notification, Post, Comment, Bookmark

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Profile)
admin.site.register(Category)
admin.site.register(Notification)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Bookmark)