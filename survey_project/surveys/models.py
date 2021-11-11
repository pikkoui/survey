from django.db import models


class QuestionType(models.Model):
    QUESTION_TYPE_CHOICES = (
        ('single_option', 'single_option'),
        ('multiple_options', 'multiple_options'),
    )
    id = models.AutoField(primary_key=True)
    type = models.CharField(
        max_length=32,
        choices=QUESTION_TYPE_CHOICES,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Question(models.Model):
    id = models.AutoField(primary_key=True)
    text = models.CharField(max_length=2000)
    question_type = models.ForeignKey('QuestionType',
        on_delete=models.DO_NOTHING)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Survey(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=128)
    description = models.TextField()
    is_active = models.BooleanField(null=True)
    surveyquestions = models.ManyToManyField(
        'Question',
        through='SurveyQuestion',
        through_fields=('survey', 'question')
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class SurveyQuestion(models.Model):
    id = models.AutoField(primary_key=True)
    question = models.ForeignKey('Question', on_delete=models.DO_NOTHING)
    survey = models.ForeignKey('Survey', on_delete=models.DO_NOTHING)
    freetext_answer_available = models.BooleanField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Answer(models.Model):
    id = models.AutoField(primary_key=True)
    surveyquestion = models.ForeignKey('SurveyQuestion', on_delete=models.DO_NOTHING)
    answer = models.CharField(max_length=128)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=128)
    surname = models.CharField(max_length=128)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class UserResponse(models.Model):
    id = models.AutoField(primary_key=True)
    answer = models.ForeignKey('Answer', on_delete=models.DO_NOTHING, null=True)
    surveyquestion = models.ForeignKey('SurveyQuestion', on_delete=models.DO_NOTHING)
    free_text_answer = models.CharField(max_length=128, null=True)
    user = models.ForeignKey('User', on_delete=models.DO_NOTHING)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class RatingValue(models.Model):
    id = models.AutoField(primary_key=True)
    rating = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class UserRating(models.Model):
    id = models.AutoField(primary_key=True)
    rating = models.IntegerField()
    user = models.ForeignKey('User', on_delete=models.DO_NOTHING)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

