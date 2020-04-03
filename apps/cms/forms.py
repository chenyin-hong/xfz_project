from django import forms
from apps.news.models import News_Classify
from apps.forms import FormMixMin

class AddNewsClassify(forms.ModelForm,FormMixMin):
    class Meta:
        model= News_Classify
        fields = ['name']

    def clean(self):
        clean_data=super(AddNewsClassify, self).clean()
        name = clean_data.get("name")
        exists = News_Classify.objects.filter(name=name).exists()
        if exists:
            raise forms.ValidationError("这个鸡巴分类已经存在")
        return clean_data