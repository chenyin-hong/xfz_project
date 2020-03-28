function Auth() {
    var self = this;
    self.singin_and_singup = $(".singin_and_singup");
    self.maskwrapper = $(".mask_wrapper");
}

Auth.prototype.run=function () {
    var self = this;
    self.silentdianji();
    self.silentSinginTi();
    self.listenImg_CaptchaEvent();
    self.silentSmsCode();
    self.silentRegister();
};

Auth.prototype.silentMaskShow = function () {
    var self = this;
    self.maskwrapper.show()
};

Auth.prototype.silentMaskhidden = function () {
    var self = this;
    self.maskwrapper.hide();
};

Auth.prototype.silentQiehuan = function () {
    var self = this;
    var yangshi=$(".up_in_wrapper").css("marginLeft");
    var yangshizuhanhuan = parseInt(yangshi);
    if (yangshizuhanhuan<0) {
            $(".up_in_wrapper").animate({marginLeft:"0px"});
        }
        else {
            $(".up_in_wrapper").animate({marginLeft:"-400px"});

        }
};

Auth.prototype.silentdianji = function () {
     var self  = this;
     var singin_sinup = $(".singin_and_singup");
     var closebtn = $(".close-btn");
     var qihuanbtn =  $(".qiehuan");

     singin_sinup.click(function () {
         self.silentMaskShow()
     });

     closebtn.click(function () {
         self.silentMaskhidden()
     });

     qihuanbtn.click(function () {
        self.silentQiehuan()
     });
};

Auth.prototype.silentSinginTi = function(){
    var self = this;
    var singinwrapper = $(".singin_wrapper");
    var telephon = singinwrapper.find("input[name='telephone']");
    var password = singinwrapper.find("input[name='password']");
    var remober = singinwrapper.find("input[name='remober']");
    var submit = singinwrapper.find("input[name='denglutijiao']");
    submit.click(function () {
        var telephoneval = telephon.val();
        var passwordval = password.val();
        var remoberval = remober.val();
        console.log(telephoneval,passwordval,remoberval);
        xfzajax.post({
            url:"login",
            data:{
                "telephone":telephoneval,
                "password":passwordval,
                "remober":remoberval?1:0,
            },
            success:function (result) {
                window.location.reload();
            }
        })
    })
};

//点击发送手机验证码
Auth.prototype.silentSmsCode = function(){
    var self = this;
    var singupwrapper = $(".singup_wrapper");
    var telephone = singupwrapper.find("input[name='telephone']");
    var submit = singupwrapper.find("input[name='smsbtn']");
    submit.click(function () {
        var telephoneval = telephone.val();
        xfzajax.get({
            url: "account/sms_captcha",
            data: {
                "telephone":telephoneval
            },
            success:function (result) {
                if (result['code']==200){
                    var count = 60;
                    var time=setInterval(function () {
                        submit.val(count+"s");
                        submit.addClass("disabled");
                        submit.removeAttr("style");
                        count--;
                        if (count<0){
                            clearInterval(time);
                            submit.val("发送验证码");
                            submit.removeClass("disabled");
                            submit.addClass("undisabled")
                        }
                    },1000)
                }
            }
        })
    })
};

//注册页面相关
//点击刷新验证码
Auth.prototype.listenImg_CaptchaEvent = function(){
    var self = this;
    var img_captcha = $(".img_captcha");
    img_captcha.click(function () {
        img_captcha.attr('src',"account/img_captcha/"+"?random="+Math.random())
    })
};

//点击注册提交事件
Auth.prototype.silentRegister = function(){
  var self = this;
  var singupwrapper = $(".singup_wrapper");
  var telephone = singupwrapper.find("input[name='telephone']");
  var username = singupwrapper.find("input[name='username']");
  var password1 = singupwrapper.find("input[name='password1']");
  var password2 = singupwrapper.find("input[name='password2']");
  var imgcaptcha = singupwrapper.find("input[name='imgcaptcha']");
  var smscaptcha = singupwrapper.find("input[name='smscaptcha']");
  var registerbtn = singupwrapper.find("input[name='registerbtn']");
  registerbtn.click(function () {
      var telephoneval = telephone.val();
      var usernameval = username.val();
      var password1val = password1.val();
      var password2val = password2.val();
      var imgcaptchaval = imgcaptcha.val();
      var smscaptchaval = smscaptcha.val();
      xfzajax.post({
          url:"account/register/",
          data:{
              "telephone":telephoneval,
              "username":usernameval,
              "password1":password1val,
              "password2":password2val,
              "imgcaptcha":imgcaptchaval,
              "smscaptcha":smscaptchaval,
          },
          success:function (result) {
              if (result['code']==200){
                  window.location.reload();
              }
          }
      })
  })
};


$(function () {
    var auth = new Auth();
    auth.run()
});