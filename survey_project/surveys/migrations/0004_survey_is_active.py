# Generated by Django 2.1.15 on 2021-11-05 11:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0003_auto_20211105_1043'),
    ]

    operations = [
        migrations.AddField(
            model_name='survey',
            name='is_active',
            field=models.BooleanField(null=True),
        ),
    ]
