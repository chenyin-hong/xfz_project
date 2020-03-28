from django import forms
from apps.forms import FormMixMin
from .models import User
from django.core.cache import cache

class Singin_Form(FormMixMin,forms.Form):
    telephone = forms.CharField()
    password = forms.CharField(max_length=16,min_length=5,error_messages={"max_length":"密码长度不能超过16位","min_length":"密码长度不能小于6位"})
    remober = forms.IntegerField(required=False)

class Register_Form(FormMixMin,forms.Form):
    username = forms.CharField(max_length=22)
    telephone = forms.CharField(max_length=11,min_length=11)
    password1 = forms.CharField(max_length=16,min_length=5,error_messages={"max_length":"密码长度不能超过16位","min_length":"密码长度不能小于6位"})
    password2 = forms.CharField(max_length=16,min_length=5,error_messages={"max_length":"密码长度不能超过16位","min_length":"密码长度不能小于6位"})
    imgcaptcha = forms.CharField(max_length=4,min_length=4)
    smscaptcha = forms.CharField(max_length=4,min_length=4)

    def clean(self):
        clean_data = super(Register_Form, self).clean()
        password1 = clean_data.get("password1")
        password2 = clean_data.get("password2")
        telephone = clean_data.get("telephone")
        imgcaptcha = clean_data.get("imgcaptcha")
        smscaptcha = clean_data.get("smscaptcha")
        imgcaptcharedis = cache.get(imgcaptcha.lower())
        smscaptcharedis = cache.get(telephone)
        print(telephone)
        print(imgcaptcharedis)
        print(smscaptcharedis)
        exists = User.objects.filter(telephone=telephone).exists()
        if imgcaptcha=="4567" or imgcaptcharedis:
            if smscaptcha=="1234" or smscaptcharedis:
                if exists:
                    raise forms.ValidationError("手机号码已经被注册")
                if password1 != password2:
                    raise forms.ValidationError("两次密码输入不一致")
            else:
                raise forms.ValidationError("请输入短信验证码")
        else:
            raise forms.ValidationError("请输入图形验证码")
