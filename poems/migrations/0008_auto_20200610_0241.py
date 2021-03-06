# Generated by Django 2.2 on 2020-06-10 02:41

from django.conf import settings
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('poems', '0007_poemlike'),
    ]

    operations = [
        migrations.AddField(
            model_name='poem',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='tweet_user', through='poems.PoemLike', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='poem',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
