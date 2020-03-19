from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request,'news/index.html')

def fufei(request):
    return render(request,'Payment_information/Payment information.html')