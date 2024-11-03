from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db.models.signals import post_save
from django.utils.html import mark_safe
from django.utils.text import slugify
from django.dispatch import receiver

# Create your models here.
class User(AbstractUser):
  username = models.CharField(unique=True, max_length=150)
  email = models.EmailField(unique=True)
  full_name = models.CharField(max_length=100, null=True, blank=True)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username']

  def save(self, *args, **kwargs):
    email_username, mobile = self.email.split("@")
    if self.full_name == "" or self.full_name == None:
        self.full_name = email_username

    super().save(*args, **kwargs)

  def __str__(self):
    return self.username

class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  image = models.FileField(upload_to='image', default='default/default-user.jpg', null=True, blank=True) # FileField >> ImageField
  full_name = models.CharField(max_length=100, null=True, blank=True)
  bio = models.CharField(max_length=100, null=True, blank=True)
  about = models.CharField(max_length=100, null=True, blank=True)
  author = models.BooleanField(default=False)
  country = models.CharField(max_length=100, null=True, blank=True)
  facebook = models.CharField(max_length=100, null=True, blank=True)
  twitter = models.CharField(max_length=100, null=True, blank=True)
  date = models.DateField(auto_now_add=True)

  def __str__(self):
    return self.user.username

  def save(self, *args, **kwargs):
    if not self.full_name:
      self.full_name = self.user.full_name

    super().save(*args, **kwargs)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
  if (created):
    Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
  instance.profile.save()