import json
import datetime
#from django.shortcuts import render
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.models import User
from pytz import timezone
from dateutil.parser import isoparse
from .models import Loan, Transaction


def index(request):
    return HttpResponse("loan page")


def loan_list(request):
    if request.method != 'GET' and request.method != 'POST':
        return HttpResponseNotAllowed(['GET', 'POST'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'GET':
        loanlist = list(Loan.objects.all().order_by('deadline') .values())
        return JsonResponse(loanlist, safe=False)

    # elif request.method == 'POST'
    try:
        req_data = json.loads(request.body.decode())
        participants_data = req_data['participants']
        deadline_data = str(req_data['deadline'])
        interest_type_data = str(req_data['interest_type'])
        interest_rate_data = float(req_data['interest_rate'])
        alert_frequency_data = str(req_data['alert_frequency'])
    except (KeyError, TypeError, JSONDecodeError):
        return HttpResponse(status=400)

    try:
        for participant in participants_data:
            participant['id'] = int(participant['id'])
            participant['paid_money'] = int(participant['paid_money'])
    except(KeyError, TypeError):
        return HttpResponse(status=400)

    try:
        deadline = isoparse(deadline_data)
    except ValueError:
        return HttpResponse(status=400)

    #if deadline < datetime.datetime.now().replace(tzinfo=timezone('Asia/Seoul')):
    #    return HttpResponse(status=400)

    interest_type_list = ['hour', 'day', 'week', 'month', 'year']
    if interest_type_data not in interest_type_list:
        return HttpResponse(status=400)

    if interest_rate_data < 0:
        return HttpResponse(status=400)

    alert_frequency_list = ['very low', 'low', 'medium', 'high', 'very high']
    if alert_frequency_data not in alert_frequency_list:
        return HttpResponse(status=400)

    total_money = 0
    for participant in participants_data:
        total_money += participant['paid_money']

    loan = Loan(num_members=len(participants_data),
                deadline=deadline,
                total_money=total_money,
                alert_frequency=alert_frequency_data,
                apply_interest=(interest_rate_data != 0),
                interest_type=interest_type_data if interest_rate_data == 0 else None,
                interest_rate=interest_rate_data,
                completed=False,
                #expected_date=null
                #completed_date=null
                registered_date=datetime.datetime.now()
                )
    loan.save()

    create_transactions(loan, participants_data)

    response_dict = {'id': loan.id, 'num_members': loan.num_members,
                     'total_money': loan.total_money, 'alert_frequency': loan.alert_frequency,
                     'apply_interest': loan.apply_interest, 'interest_type': loan.interest_type,
                     'interest_rate': loan.interest_rate, 'completed': loan.completed,
                     'expected_date': loan.expected_date, 'completed_date': loan.completed_date,
                     'registered_date': loan.registered_date}
    return JsonResponse(response_dict, status=201)


def create_transactions(loan, participants):
    fair_share = int(loan.total_money / len(participants))

    overs, unders = {}, {}
    for participant in participants:
        diff = participant['paid_money'] - fair_share
        if diff > 0:
            overs[participant['id']] = diff
        else:
            unders[participant['id']] = -diff

    over_keys = sorted(overs.keys(), key=lambda p: -overs[p])
    under_keys = sorted(unders.keys(), key=lambda p: -unders[p])

    transactions = []
    while len(over_keys) > 0 and len(under_keys) > 0:
        over, under = overs[over_keys[0]], unders[under_keys[0]]
        diff = min(over, under)
        overs[over_keys[0]] = over - diff
        unders[under_keys[0]] = under - diff

        transaction = Transaction(
            loan_id=loan.id,
            lender=User.objects.get(id=over_keys[0]),
            borrower=User.objects.get(id=under_keys[0]),
            money=diff,
            completed=False,
            completed_date=None,
            lender_confirm=False,
            borrower_confirm=False,
        )
        transaction.save()
        transactions.append(transaction)

        if overs[over_keys[0]] <= 0:
            over_keys.pop(0)
        if unders[under_keys[0]] <= 0:
            under_keys.pop(0)
