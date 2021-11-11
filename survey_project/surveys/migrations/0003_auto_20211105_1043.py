# Generated by Django 2.1.15 on 2021-11-05 10:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0002_surveyquestion_freetext_answer_available'),
    ]

    operations = [
        migrations.AddField(
            model_name='questiontype',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='questiontype',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
