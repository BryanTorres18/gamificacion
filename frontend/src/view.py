from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def create_game(request, game_type):
    return render(request, 'create_game.html', {'game_type': game_type})

def game_view(request):
    return render(request, 'game_view.html')


