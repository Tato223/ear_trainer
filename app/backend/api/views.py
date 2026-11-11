from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse
from .models import Category, HighScore
from rest_framework.decorators import APIView, api_view
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import (
    AllUserHighScoresSerializer,
    UserHighScoreSerializer,
    UserSerializer,
    HighScoreSerializer,
)

# Create your views here.

User = get_user_model()


@api_view(http_method_names=["GET", "POST"])
def user_list(request):

    if request.method == "GET":
        all_users = User.objects.all()
        serializer = UserSerializer(all_users, many=True)
        return JsonResponse({"data": serializer.data})

    if request.method == "POST":
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():

            User.objects.create_user(  # type: ignore
                username=request.data.get("username"),
                email=request.data.get("email"),
                password=request.data.get("password"),
            )

            serializer.save()
            return JsonResponse({"data": serializer.data})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# View only user view, no auth required
class UserView(APIView):

    def get_permissions(self):
        return [permissions.AllowAny()]

    def get(self, request, username):
        user = get_object_or_404(User, username=username)

        if not user:
            return Response(
                data={"error": f"User {username} not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = UserSerializer(user)
        return Response(data={"data": serializer.data}, status=status.HTTP_200_OK)


class HighScoreView(APIView):

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get(self, request):
        category = request.query_params.get("category")

        if category not in Category.values:
            return Response(
                data={
                    "category": [
                        f"Required. Must be one of: {', '.join(Category.values)}"
                    ]
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        highscores = (
            HighScore.objects.filter(category=category)
            .select_related("owned_by")
            .order_by("-value")
        )
        serializer = HighScoreSerializer(highscores, many=True)
        return Response(data={"data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = HighScoreSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        assert isinstance(serializer.validated_data, dict)

        category = request.query_params["category"]
        value = serializer.validated_data["value"]

        new_score, create = HighScore.objects.get_or_create(
            owned_by=request.user,
            category=category,
            defaults={"value": value},
        )

        if not create and value > new_score.value:
            new_score.value = value
            new_score.save(update_fields=["value"])

        serializer = HighScoreSerializer(new_score)
        return Response(
            data={"data": serializer.data},
            status=status.HTTP_201_CREATED if create else status.HTTP_200_OK,
        )


class UserHighScoreView(APIView):

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        category = request.query_params.get("category")

        validated_category = validate_category_query_param(category)

        try:

            if validated_category:
                highscores = find_single_highscore(user, category)
                serializer = UserHighScoreSerializer(highscores)
                return Response(
                    data={"data": serializer.data}, status=status.HTTP_200_OK
                )

            elif not validated_category or not category:
                highscores = find_all_highscores_by_user(user)
                serializer = AllUserHighScoresSerializer(highscores, many=True)

                return Response(
                    data={"data": serializer.data}, status=status.HTTP_200_OK
                )

        except Exception:
            raise Exception("An error occurred while retrieving high scores.")


class AllUserHighScoreView(APIView):

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        highscores = find_all_highscores_by_user(user)
        serializer = AllUserHighScoresSerializer(highscores, many=True)
        return Response(data={"data": serializer.data}, status=status.HTTP_200_OK)


def validate_category_query_param(category):
    if category not in Category.values:
        return Response(
            data={
                "category": [f"Required. Must be one of: {', '.join(Category.values)}"]
            },
            status=status.HTTP_400_BAD_REQUEST,
        )
    return category


def find_single_highscore(user, category):
    try:
        return HighScore.objects.get(owned_by=user, category=category)
    except HighScore.DoesNotExist:
        return None


def find_all_highscores_by_user(user):
    try:
        return HighScore.objects.filter(owned_by=user).select_related("owned_by").all()
    except HighScore.DoesNotExist:
        return None
