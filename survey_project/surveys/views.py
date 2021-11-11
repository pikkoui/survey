from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from .models import Question, Answer, SurveyQuestion, Survey, UserResponse, \
    User, UserRating, RatingValue
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from .serializers import QuestionSerializer, SurveySerializer, \
    SurveyQuestionSerializer, AnswerSerializer, UserSerializer, \
    UserResponseSerializer, RatingValueSerializer, UserRatingSerializer


class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]


class SurveyViewSet(ModelViewSet):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer
    permission_classes = [AllowAny]


class SurveyQuestionViewSet(ModelViewSet):
    queryset = SurveyQuestion.objects.prefetch_related('answer_set').filter(
        survey__is_active=True)
    serializer_class = SurveyQuestionSerializer
    permission_classes = [AllowAny]


class AnswerViewSet(ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [AllowAny]


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserResponseViewSet(ModelViewSet):
    queryset = UserResponse.objects.all()
    serializer_class = UserResponseSerializer
    permission_classes = [AllowAny]

    @action(methods=['post'], detail=False)
    def create_multiple(self, request, *args, **kargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RatingValueViewSet(ModelViewSet):
    queryset = RatingValue.objects.all()
    serializer_class = RatingValueSerializer
    permission_classes = [AllowAny]


class UserRatingViewSet(ModelViewSet):
    queryset = UserRating.objects.all()
    serializer_class = UserRatingSerializer
    permission_classes = [AllowAny]
