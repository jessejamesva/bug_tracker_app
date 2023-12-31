# Generated by Django 3.2.12 on 2023-08-12 00:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('company_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('description', models.TextField(max_length=200, null=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='projects', to='company_app.company')),
                ('project_manager', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='projects', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Sprint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, unique=True)),
                ('start_date', models.DateField(null=True)),
                ('end_date', models.DateField(null=True)),
                ('parent_project', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sprints', to='bug_app.project')),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('feature', models.CharField(max_length=25)),
                ('due_date', models.DateField(null=True)),
                ('status', models.CharField(choices=[('na', 'Not Assigned'), ('ip', 'In Progress'), ('te', 'Scheduled for Testing'), ('qa', 'Verified'), ('ok', 'Approved')], default='na', max_length=2)),
                ('notes', models.TextField(max_length=300, null=True)),
                ('assigned_to', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tickets_assigned', to=settings.AUTH_USER_MODEL)),
                ('sprint', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to='bug_app.sprint')),
            ],
        ),
    ]
