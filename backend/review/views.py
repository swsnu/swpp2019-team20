#from django.shortcuts import render


def review(request):
    if request.method == 'POST':
        print("review post OK :D")
