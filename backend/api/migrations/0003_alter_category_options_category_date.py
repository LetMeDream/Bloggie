# Generated by Django 5.1.2 on 2024-11-04 14:21

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_category_post_notification_comment_bookmark'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'ordering': ['-date'], 'verbose_name_plural': 'Category'},
        ),
        migrations.AddField(
            model_name='category',
            name='date',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
