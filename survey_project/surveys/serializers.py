from rest_framework import serializers
from . import models


class QuestionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'type', 'created_at', 'updated_at',)
        model = models.QuestionType


class QuestionSerializer(serializers.ModelSerializer):
    questiontype_obj = QuestionTypeSerializer(
        source='question_type', read_only=True
    )
    class Meta:
        fields = ('id', 'text', 'question_type', 'questiontype_obj', 'created_at', 'updated_at',)
        model = models.Question


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'answer', 'surveyquestion', 'created_at', 'updated_at',)
        model = models.Answer


class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'description', 'surveyquestions', 'created_at', 'updated_at',)
        model = models.Survey


class SurveyQuestionSerializer(serializers.ModelSerializer):
    question_obj = QuestionSerializer(
        source='question', read_only=True
    )
    answer_set = AnswerSerializer( many=True, read_only=True)
    class Meta:
        fields = ('id', 'question', 'survey', 'question_obj', 'answer_set',
            'freetext_answer_available', 'created_at', 'updated_at',)
        model = models.SurveyQuestion


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'surname', 'created_at', 'updated_at',)
        model = models.User


class UserResponseSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'answer', 'surveyquestion',
                  'free_text_answer', 'user', 'created_at',
                  'updated_at',)
        model = models.UserResponse


class RatingValueSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'rating', 'created_at', 'updated_at',)
        model = models.RatingValue


class UserRatingSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'rating', 'user', 'created_at', 'updated_at',)
        model = models.UserRating
