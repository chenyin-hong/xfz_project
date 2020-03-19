from django import forms
from apps.forms import FormMixMin

class Singin_Form(FormMixMin,forms.Form):
    telephone = forms.CharField()
    password = forms.CharField(max_length=16,min_length=5,error_messages={"max_length":"密码长度不能超过16位","min_length":"密码长度不能小于6位"})
    remober = forms.IntegerField(required=False)
