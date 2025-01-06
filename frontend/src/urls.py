from . import view
from django.urls import path

urlpatterns = [
    path('', view.index, name='index'),
    path('create/<str:game_type>/', view.create_game, name='create_game'),
    path('game/',view.game_view, name='game_view'),
]
