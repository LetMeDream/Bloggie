from django.contrib import admin
from .models import User, Profile, Category, Notification, Post, Comment, Bookmark
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.
#admin.site.register(User, UserAdmin)
User = get_user_model()

# 1. Desregistramos el User por defecto para liberar la tabla
try:
    admin.site.unregister(User)
except admin.sites.NotRegistered:
    pass

# 2. Heredamos del BaseUserAdmin original y SOLO modificamos la lista
@admin.register(User)
class CustomUserAdmin(BaseUserAdmin):
    list_display = ("id", "username", "email", "first_name", "last_name", "is_staff")
    list_display_links = ("id", "username")
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