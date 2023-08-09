# Generated by Django 3.2.12 on 2023-08-08 13:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bug_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='project_manager',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='projects', to=settings.AUTH_USER_MODEL),
        ),
    ]