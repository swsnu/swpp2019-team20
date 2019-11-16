from django.urls import path

from . import views

urlpatterns = [
    path('loan', views.loan_list, name='loan_list'),
    path('loan/<int:loan_id>', views.loan, name='loan'),
    path('loan-transaction/<int:loan_id>', views.loan_transaction, name='loan-tranaction'),
    path('transaction/<int:tx_id>', views.transaction, name='transaction'),

    #path('deposit', views.deposit_list, name='deposit_list'),
    #path('deposit/<int:user_id>', views.deposit, name='deposit')
]
