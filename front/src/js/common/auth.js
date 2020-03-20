function Auth() {
    var self = this;
    self.singin_and_singup = $(".singin_and_singup");
    self.maskwrapper = $(".mask_wrapper");
}

Auth.prototype.run=function () {
    var self = this;
    self.silentdianji();
    self.silentSinginTi();
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

$(function () {
    var auth = new Auth();
    auth.run()
});