from django.urls import path

from . import views

urlpatterns = [
    path('loan', views.loan_list, name='loan_list'),
    #path('loan/<int:user_id>', views.loan, name='loan'),

    #path('transaction', views.transaction_list, name='transaction_list'),
    #path('transaction/<int:user_id>', views.transaction, name='transaction'),

    #path('deposit', views.deposit_list, name='deposit_list'),
    #path('deposit/<int:user_id>', views.deposit, name='deposit')
]
