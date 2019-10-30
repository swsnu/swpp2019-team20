#from django.shortcuts import render
from django.http import HttpResponse#, JsonResponse


# Create your views here.
def index(request):
    return HttpResponse("loan page")
    #return render(request, 'account/index.html')

def loan_list(request):
    if request.method == 'GET':
        # not implemented yet
        pass

    elif request.method == 'POST':
        # not implemented yet
        pass
    
    return HttpResponseNotAllowed(['GET', 'POST'])
