/**
 * Created by founder on 8/15/15.
 */
$(document).ready(function() {
    var count = 0;
    $("#show_function").click(function () {
        var type = 0;
        var height=document.getElementById("talk_function").style.height="auto";
        console.log("height:"+height);
        var targetHeight = window.getComputedStyle(document.getElementById("talk_function")).height;
        document.getElementById("talk_function").style.height=0;
        if (count == 0 && type == 0) {
            $("#talk_function").css("height", targetHeight);
            count = 1;
            type = 1;
        }
        if (count == 1 && type == 0) {
            $("#talk_function").css("height", "0px");
            count = 0;
            type = 1;
        }
    })
})
function submit(){
    document.getElementById("login_form").submit();
}