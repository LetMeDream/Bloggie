from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Profile, Category, Notification, Post, Comment, Bookmark

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Profile)
admin.site.register(Category)
admin.site.register(Notification)
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'status', 'user', 'date')
    actions = ['delete_selected', 'mark_as_disabled']
    actions_on_top = True
admin.site.register(Comment)
admin.site.register(Bookmark)