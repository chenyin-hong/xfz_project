# Generated by Django 2.2.3 on 2020-03-18 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('xfzauth', '0002_user_join_data'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='join_data',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
