from rest_framework import serializers
from apps.news.models import News_Classify

class News_Classify_Serializer(serializers.ModelSerializer):
    class Meta:
        model = News_Classify
        fields = ('id','name')