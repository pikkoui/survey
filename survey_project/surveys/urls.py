
from . import views as apiviews
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register("surveyquestions", apiviews.SurveyQuestionViewSet,
                "surveyquestions")
router.register("questions", apiviews.QuestionViewSet,
                "questions")
router.register("userresponses", apiviews.UserResponseViewSet,
                "userresponses")
router.register("userratings", apiviews.UserRatingViewSet,
                "userratings")

urlpatterns = router.urls
