# {"code":405,"message":"表单验证失败","data":{}}
from django.http import JsonResponse

class HttpCode(object):
    ok = 200
    parametererro = 400
    unautherro = 401
    methoderro = 405
    servererro = 500

def restful(code = HttpCode.ok,message ="",data=None,kwargs=None):
    json_dict = {"code":code,"message":message,"data":data}

    if kwargs and isinstance(kwargs,dict) and kwargs.keys():#判断kwargs如果有值并且为字典类型并且字典中是有值的
        json_dict.update(kwargs)
    return JsonResponse(json_dict)

def ok(data = None,message=""):
    return restful(message=message,data=data)

def parameter_erro(data = None,message = ""):
    return restful(code=HttpCode.parametererro,message=message,data=data)

def unauth_erro(data=None):
    return restful(code=HttpCode.unautherro,message="你没有权限登录",data=data)

def method_erro(data=None):
    return restful(code=HttpCode.methoderro,message="请求方法错误",data=data)

def server_erro(data = None):
    return restful(code=HttpCode.servererro,message="服务器发生错误",data=data)