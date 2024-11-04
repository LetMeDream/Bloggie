from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db.models.signals import post_save
from django.utils.html import mark_safe
from django.utils.text import slugify
from django.dispatch import receiver
import shortuuid

# Create your models here.
class User(AbstractUser):
  username = models.CharField(unique=True, max_length=150)
  email = models.EmailField(unique=True)
  full_name = models.CharField(max_length=100, null=True, blank=True)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username']

  # Overriding default save method
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

  # Overriding default save method
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

class Category(models.Model):
  title = models.CharField(max_length=100)
  image = models.FileField(upload_to='image', null=True, blank=True)
  slug = models.SlugField(unique=True, null=True, blank=True)
  date = models.DateField(auto_now_add=True)

  def __str__(self):
    return self.title
  
  class Meta:
    ordering = ['-date'] 
    verbose_name_plural = 'Category'

  # Overriding default save method
  def save(self, *args, **kwargs):
    if not self.slug:
      self.slug = slugify(self.title)
    super().save(*args, **kwargss)

  def count_post(self):
    return Post.objects.filter(category=self).count()

class Post(models.Model):

  STATUS = (
    ('Active', 'Active'),
    ('Draft', 'Draft'),
    ('Disabled', 'Disabled')
  )

  user = models.ForeignKey(User, on_delete=models.CASCADE)
  profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True)
  category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)

  title = models.CharField(max_length=100)
  description = models.TextField(null=True, blank=True)
  image = models.FileField(upload_to='image', null=True, blank=True)
  slug = models.SlugField(unique=True, null=True, blank=True)
  status = models.CharField(max_length=100, choices=STATUS, default='Active')
  view = models.IntegerField(default=0)
  likes = models.ManyToManyField(User, blank=True, related_name='likes_user')
  date = models.DateField(auto_now_add=True)

  def __str__(self):
    return self.title

  class Meta:
    ordering = ['-date'] 
    verbose_name_plural = 'Post'
  
  # Overriding default save method
  def save(self, *args, **kwargs):
    if not self.slug:
      self.slug = slugify(self.title) + '-' + shortuuid.uuid()[:2]
    super().save(*args, **kwargss)

class Comment(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE)
  name = models.CharField(max_length=100)
  email = models.CharField(max_length=100)
  comment = models.TextField(null=True, blank=True)
  reply = models.TextField(null=True, blank=True)
  date = models.DateField(auto_now_add=True)

  def __str__(self):
    return self.post.title

  class Meta:
    ordering = ['-date'] 
    verbose_name_plural = 'Comment'
  
class Bookmark(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  post = models.ForeignKey(Post, on_delete=models.CASCADE)
  date = models.DateTimeField(auto_now_add=True)

  def __str__(self):
      return f"{self.post.title} - {self.user.username}"
  
  class Meta:
    verbose_name_plural = "Bookmark"
    ordering = ['-date'] 


class Notification(models.Model):
  NOTIFICATION_TYPE = (
    ('Like', 'Like'),
    ('Comment', 'Comment'),
    ('Bookmark', 'Bookmark')
  )
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  post = models.ForeignKey(Post, on_delete=models.CASCADE)
  title = models.CharField(max_length=100)
  date = models.DateTimeField(auto_now_add=True)
  type = models.CharField(choices=NOTIFICATION_TYPE, max_length=100)
  seen = models.BooleanField(default=False)

  def __str__(self):
    if self.post:
      return f"{self.post.title} - {self.type}"
    else:
      return "Notification"

  class Meta:
    ordering = ['-date'] 
    verbose_name_plural = "Notification"
