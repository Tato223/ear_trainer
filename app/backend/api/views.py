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

        category = serializer.validated_data["category"]
        value = serializer.validated_data["value"]

        score, created = HighScore.objects.get_or_create(
            owned_by=request.user,
            category=category,
            defaults={"value": value},
        )

        if not created and value > score.value:
            score.value = value
            score.save(update_fields=["value"])

        return Response(
            data={"data": HighScoreSerializer(score).data},
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )


class UserHighScoreView(APIView):

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        category = request.query_params.get("category")

        if category and category not in Category.values:
            return Response(
                data={
                    "category": [
                        f"Invalid category. Must be one of: {', '.join(Category.values)}"
                    ]
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            if category:
                highscores = (
                    HighScore.objects.filter(owned_by=user, category=category)
                    .order_by("-value")
                    .first()
                )
                serializer = UserHighScoreSerializer(highscores)
                return Response(
                    data={"data": serializer.data}, status=status.HTTP_200_OK
                )

            else:
                highscores = (
                    HighScore.objects.filter(owned_by=user)
                    .select_related("owned_by")
                    .order_by("-value")
                )

                serializer = AllUserHighScoresSerializer(highscores, many=True)
                return Response(
                    data={"data": serializer.data}, status=status.HTTP_200_OK
                )

        except Exception:
            raise Exception("An error occurred while retrieving high scores.")
