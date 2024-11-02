from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView
# Create your views here.

class CustomAdminLoginView(LoginView):
  template_name = 'api/admin/login.html'  # Point to the existing Jazzmin template

  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    # from pprint import pprint  # Import pprint for better formatting
    # pprint(context['form'])
    context['username'] = 'Username'
    return context