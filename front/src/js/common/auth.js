$(function () {
    $(".singin_and_singup").click(function () {
        $(".mask_wrapper").show();
    });

    $(".close-btn").click(function () {
        $(".mask_wrapper").hide();
    })
});

$(function () {
    $(".qiehuan").click(function () {
        var yangshi=$(".up_in_wrapper").css("marginLeft");
        var yangshizuhanhuan = parseInt(yangshi);
        console.log(yangshi);
        if (yangshizuhanhuan<0) {
            $(".up_in_wrapper").animate({marginLeft:"0px"});
        }
        else {
            $(".up_in_wrapper").animate({marginLeft:"-400px"});

        }
    })
})