import datetime
#from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed#, JsonResponse
from dateutil.parser import parse

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
        try:
            req_data = json.loads(request.body.decode())
            participants_data = req_data['participants']
            deadline_data = req_data['deadline']
            interest_type_data = req_data['interest_type']
            interest_rate_data = req_data['interest_rate']
            alert_frequency_data = req_data-['alert_frequency']
        except (KeyError, JSONDecodeError):
            return HttpResponse(status=400)

        total_money = 0
        for participant in participants_data: total_money += participant['paid_money']

        loan = Loan(num_members = len(participants_data), 
                    deadline = parse(deadline_data), 
                    total_money = total_money,
                    alert_frequency = alert_frequency_data,
                    apply_interest = (interest_rate_data != 0),
                    interest_type = interest_type_data,
                    interest_rate = interest_rate_data,
                    completed = False,
                    # expected_date
                    # completed_date
                    # average_rating
                    registered_date = datetime.datetime.now()
                    )
        loan.save()


    return HttpResponseNotAllowed(['GET', 'POST'])
