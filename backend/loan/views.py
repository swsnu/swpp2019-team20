import json
from json import JSONDecodeError
from django.utils import timezone
from django.http import (
    HttpResponse,
    HttpResponseNotAllowed,
    HttpResponseForbidden,
    JsonResponse,
)
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.db.models import Q
from django.forms.models import model_to_dict
from dateutil.parser import isoparse
from .models import Loan, Transaction

def loan_list(request):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        query = Q(lender=request.user) | Q(borrower=request.user)
        txlist = Transaction.objects.filter(query).order_by('loan__deadline').reverse()
        loanlist = list(map(model_to_dict, {tx.loan for tx in txlist}))
        return JsonResponse(loanlist, safe=False)

    if request.method == 'POST':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        try:
            req_data = json.loads(request.body.decode())
            deadline = isoparse(str(req_data['deadline']))
            interest_type = str(req_data['interest_type'])
            interest_rate = float(req_data['interest_rate'])
            alert_frequency = str(req_data['alert_frequency'])

            participants = list(req_data['participants'])
            for participant in participants:
                participant['id'] = int(participant['id'])
                participant['paid_money'] = int(participant['paid_money'])
        except (KeyError, TypeError, ValueError, JSONDecodeError):
            return HttpResponse(status=400)

        if interest_type not in ['hour', 'day', 'week', 'month', 'year']:
            return HttpResponse(status=400)

        if interest_rate < 0:
            return HttpResponse(status=400)

        if alert_frequency not in ['very low', 'low', 'medium', 'high', 'very high']:
            return HttpResponse(status=400)

        total_money = 0
        for participant in participants:
            total_money += participant['paid_money']

            # also verify if it's a valid participant
            try:
                User.objects.get(id=participant['id'])
            except User.DoesNotExist:
                return HttpResponse(status=400)

        loan_data = Loan(
            num_members=len(participants),
            deadline=deadline,
            total_money=total_money,
            alert_frequency=alert_frequency,
            apply_interest=interest_rate != 0,
            interest_type=interest_type if interest_rate == 0 else None,
            interest_rate=interest_rate,
            completed=False,
            registered_date=timezone.now()
        )
        loan_data.save()

        create_transactions(loan_data, participants)

        response_dict = {
            'id': loan_data.id,
            'num_members': loan_data.num_members,
            'total_money': loan_data.total_money,
            'alert_frequency': loan_data.alert_frequency,
            'apply_interest': loan_data.apply_interest,
            'interest_type': loan_data.interest_type,
            'interest_rate': loan_data.interest_rate,
            'completed': loan_data.completed,
            'expected_date': loan_data.expected_date,
            'completed_date': loan_data.completed_date,
            'registered_date': loan_data.registered_date,
        }
        return JsonResponse(response_dict, status=201)

    return HttpResponseNotAllowed(['GET', 'POST'])

def create_transactions(loan_data, participants):
    fair_share = loan_data.total_money // len(participants)

    overs, unders = {}, {}
    for participant in participants:
        diff = participant['paid_money'] - fair_share
        if diff > 0:
            overs[participant['id']] = diff
        else:
            unders[participant['id']] = -diff

    over_keys = sorted(overs.keys(), key=lambda p: -overs[p])
    under_keys = sorted(unders.keys(), key=lambda p: -unders[p])

    while len(over_keys) > 0 and len(under_keys) > 0:
        over, under = overs[over_keys[0]], unders[under_keys[0]]
        diff = min(over, under)
        overs[over_keys[0]] = over - diff
        unders[under_keys[0]] = under - diff

        transaction_data = Transaction(
            loan_id=loan_data.id,
            lender=User.objects.get(id=over_keys[0]),
            borrower=User.objects.get(id=under_keys[0]),
            money=diff,
            completed=False,
            completed_date=None,
            lender_confirm=False,
            borrower_confirm=False,
        )
        transaction_data.save()

        if overs[over_keys[0]] <= 0:
            over_keys.pop(0)
        if unders[under_keys[0]] <= 0:
            under_keys.pop(0)

def loan(request, loan_id):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        loan_data = get_object_or_404(Loan, pk=loan_id)

        txset = Transaction.objects.filter(Q(loan=loan_data))
        txset = txset.filter(Q(borrower=request.user) | Q(lender=request.user))

        if not txset.exists():
            return HttpResponseForbidden()
        return JsonResponse(model_to_dict(loan_data))

    #elif request.method == 'PUT':
    #    raise NotImplementedError()
    #elif request.method == 'DELETE':
    #    raise NotImplementedError()

    return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

def loan_transaction(request, loan_id):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    loan_data = get_object_or_404(Loan, pk=loan_id)

    txset = Transaction.objects.filter(loan=loan_data)
    if not txset.filter(Q(borrower=request.user) | Q(lender=request.user)).exists():
        return HttpResponseForbidden()

    txlist = []
    for tsx in txset:
        txdict = model_to_dict(tsx)

        txdict['loan_id'] = txdict['loan']
        del txdict['loan']
        txdict['borrower_id'] = txdict['borrower']
        txdict['borrower'] = tsx.borrower.username
        txdict['lender_id'] = txdict['lender']
        txdict['lender'] = tsx.lender.username
        txlist.append(txdict)

    return JsonResponse(txlist, safe=False)

def transaction(request, tx_id):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        tsx = get_object_or_404(Transaction, pk=tx_id)

        txset = Transaction.objects.filter(Q(loan=tsx.loan))
        txset = txset.filter(Q(borrower_id=request.user.id) | Q(lender_id=request.user.id))

        if not txset.exists():
            return HttpResponseForbidden()

        tx_dict = model_to_dict(tsx)
        tx_dict['loan_id'] = tx_dict['loan']
        del tx_dict['loan']
        tx_dict['borrower_id'] = tx_dict['borrower']
        tx_dict['borrower'] = tsx.borrower.username
        tx_dict['lender_id'] = tx_dict['lender']
        tx_dict['lender'] = tsx.lender.username

        return JsonResponse(tx_dict)

    if request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        tsx = get_object_or_404(Transaction, pk=tx_id)

        if tsx.borrower == request.user:
            tsx.borrower_confirm = True
            tsx.save()
        elif tsx.lender == request.user:
            tsx.lender_confirm = True
            tsx.save()
        else:
            return HttpResponseForbidden()

        if tsx.borrower_confirm and tsx.lender_confirm and not tsx.completed:
            tsx.completed = True
            tsx.completed_date = timezone.now()
            tsx.save()

            txset = Transaction.objects.filter(loan=tsx.loan, completed=False)
            if not txset.exists():
                tsx.loan.completed = True
                tsx.loan.completed_date = timezone.now()
                tsx.loan.save()

        txdict = model_to_dict(tsx)
        txdict['loan_id'] = txdict['loan']
        del txdict['loan_id']
        txdict['borrower_id'] = txdict['borrower']
        txdict['borrower'] = tsx.borrower.username
        txdict['lender_id'] = txdict['lender']
        txdict['lender'] = tsx.lender.username

        return JsonResponse(txdict)

    return HttpResponseNotAllowed(['GET', 'PUT'])
