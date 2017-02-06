var count=0;
var contact_click_contact=0;
function last_photo(){
    $("#shadow").stop(false, true);
    count=(count+1)%7;
    $("#shadow").css("visibility","visible");
    var url="url(../images/"+count+".jpg)";
    console.log(url);
    $('body').css("background",url);
    $("#shadow").animate({"opacity":0},1500,function(){
        $("#shadow").css("opacity","1");
        $("#shadow").css("visibility","hidden");
    });
}
function next_photo(){
    if(count==0)
    count=7;
    count=(count-1)%7;
    $("#shadow").stop(false, true);
    $("#shadow").css("visibility","visible");
    var url="url(../images/"+count+".jpg)";
    console.log(url);
    $('body').css("background",url);
    $("#shadow").animate({"opacity":0},1500,function(){
        $("#shadow").css("opacity","1");
        $("#shadow").css("visibility","hidden");
    });
}
$(document).ready(function() {                                 //回话
    document.getElementById("conversation_footer").onclick=function(){
        reset_dark();
        document.getElementById("conversation").src="../images/tab_icon_conversation_selected.png";
        document.getElementById("talk_list_header").innerHTML="会话";
        document.getElementById("talk_list_content").innerHTML =  window.conversation;

    }
    document.getElementById("contact_footer").onclick=function (){show_friend()};
    document.getElementById("find_footer").onclick=function(){      //发现
        reset_dark();
        document.getElementById("find").src="../images/tab_icon_plugin_selected.png";
        document.getElementById("talk_list_header").innerHTML="发现";
        $("#talk_list_content").children().remove();


    }
    document.getElementById("setting_footer").onclick=function(){   //设置
        reset_dark();
        document.getElementById("setting").src="../images/tab_icon_setup_selected.png";
        document.getElementById("talk_list_header").innerHTML="设置";
        $("#talk_list_content").children().remove();
    }
})
function reset_dark(){
    document.getElementById("conversation").src="../images/tab_icon_conversation.png";
    document.getElementById("contact").src="../images/tab_icon_contact.png";
    document.getElementById("find").src="../images/tab_icon_plugin.png";
    document.getElementById("setting").src="../images/tab_icon_setup.png";
}
function show_list(obj){
    var type = 0;
    var num=obj.id.substr(12,obj.id.length);
    var ul=$("#"+"talk_list_content").find("ul").eq(num);
    var originHeight= $("#"+"talk_list_content").find("ul").eq(num).height();
    $("#"+"talk_list_content").find("ul").eq(num).css("height","auto");
    var targetHeight=$("#"+"talk_list_content").find("ul").eq(num).height();
    $("#"+"talk_list_content").find("ul").eq(num).css("height",originHeight);
    $("#" + "talk_list_content").find("ul").eq(num).stop(false,true);
    if(contact_click_contact==0&&type==0) {
        type=1;
        contact_click_contact=1;
        $("#contact_list"+num).find("img").attr("src","../images/open_arrow_fire.png");
        $("#" + "talk_list_content").find("ul").eq(num).animate({"height": targetHeight}, 500);
    }
    if(contact_click_contact==1&&type==0) {
        type=1;
        $("#contact_list"+num).find("img").attr("src","../images/open_arrow.png");
        contact_click_contact=0;
        $("#" + "talk_list_content").find("ul").eq(num).animate({"height": "0px"},500);
    }
}
function show_group(){
    var position="2";
    $("#contact_type").nextAll().remove();
    reset_word_border(position);
    document.getElementById('contact_friend').onclick=function(){
        show_friend();
    }
}
function show_discuss(){
    var position="3";
    $("#contact_type").nextAll().remove();
    reset_word_border(position);
    document.getElementById('contact_friend').onclick=function(){
        show_friend();
    }
}
function show_friend(){      //联系人
    reset_dark();
    document.getElementById("contact").src="../images/tab_icon_contact_selected.png";
    document.getElementById("talk_list_header").innerHTML="联系人";
    var position="1";
    reset_word_border(position);
    $("#talk_list_content").children().remove();
    var data=$("#hidden_data").val();
    var title=JSON.parse(data);
    var i;
    $("#talk_list_content").append("<li id='contact_type'>");
    $("#contact_type").append("<span id='contact_friend'>好友</span>");
    $("#contact_type").append("<span id='contact_discussion' onclick='show_group()'>群</span>");
    $("#contact_type").append("<span id='contact_group' onclick='show_discuss()'>讨论组</span>");
    for(i=0;i<title[0].contact_list.catologue.length;i++) {
        $("#talk_list_content").append("<li onclick='show_list(this)' class='contact_li'"+" id='contact_list"+i+"'/>");
        $("#"+"contact_list"+i).append("<img src='../images/open_arrow.png' class='contact_arrow' />");
        $("#"+"contact_list"+i).append("<span class='contact_catalogue'>"+title[0].contact_list.catologue[i].list+"</span>");
        $("#"+"contact_list"+i).append("<span class='contact_catalog_number'>"+title[0].contact_list.default[i].default_list.length+"</span>");
        $("#talk_list_content").append("<ul  class='contact_list'/>");
        for(var j=0;j<title[0].contact_list.default[i].default_list.length;j++) {
            var name=title[0].contact_list.default[i].default_list[j].remark;
            $("#talk_list_content").find("ul").eq(i).append("<li onclick='change_talk_name(this)'"+ "class='contain_list_li'/>");
            $("#talk_list_content").find("ul").eq(i).find(".contain_list_li").eq(j).append("<img src='../images/penguin.png' class='penguin'/>");
            $("#talk_list_content").find("ul").eq(i).find(".contain_list_li").eq(j).append("<span class='contact_info'>" + title[0].contact_list.default[i].default_list[j].remark + "</span>");
            $("#talk_list_content").find("ul").eq(i).find(".contain_list_li").eq(j).append("<span class='hidden_data' id=qq"+title[0].contact_list.default[i].default_list[j].qq_number+">" + title[0].contact_list.default[i].default_list[j].qq_number + "</span>");
        }
    }
}
function change_talk_name(obj){
    $("#talk_panel_header").find("span").text($(obj).find("span").eq(0).text());   //改变聊天框的名称
    $("#hidden_talkerqq").val($(obj).find("span").eq(1).text());                   //改变聊天框的隐藏qq名
    document.getElementById('talk_panel_content').innerHTML = "";                  //切换用户的时候抹掉聊天内容
}
function reset_word_border(position){
  if(position=="1"){
       $("#contact_friend").css("color","#0aa7ff");
       $("#contact_group").css("color","black");
       $("#contact_discussion").css("color","black");
       $("#contact_friend").css("border-bottom"," 2px solid #0aa7ff");
       $("#contact_group").css("border-bottom"," 2px solid #ccc");
       $("#contact_discussion").css("border-bottom"," 2px solid #ccc");

  }
    if(position=="2"){                                           //群
        $("#contact_friend").css("color","black");
        $("#contact_group").css("color","black");
        $("#contact_discussion").css("color","#0aa7ff");
        $("#contact_friend").css("border-bottom"," 2px solid #ccc");
        $("#contact_group").css("border-bottom"," 2px solid #ccc");
        $("#contact_discussion").css("border-bottom"," 2px solid #0aa7ff");
        var data=$("#hidden_data").val();
        var title=JSON.parse(data);
        for(var i=0;i<title[0].group_list.length;i++) {
            $("#talk_list_content").append("<li class='contain_list_li'/>");
            $("#talk_list_content").find(".contain_list_li").eq(i).append("<img src='../images/group_face.jpeg' class='penguin'/>");
            $("#talk_list_content").find(".contain_list_li").eq(i).append("<span class='contact_group'>" + title[0].group_list[i].group_name+ "</span>");
        }
    }
    if(position=="3"){                                                 //讨论组
        $("#contact_friend").css("color","black");
        $("#contact_group").css("color","#0aa7ff");
        $("#contact_discussion").css("color","black");
        $("#contact_friend").css("border-bottom"," 2px solid #ccc");
        $("#contact_group").css("border-bottom"," 2px solid #0aa7ff");
        $("#contact_discussion").css("border-bottom"," 2px solid #ccc");
        var data=$("#hidden_data").val();
        var title=JSON.parse(data);
        for(var i=0;i<title[0].group_list.length;i++) {
            $("#talk_list_content").append("<li class='contain_list_li'/>");
            $("#talk_list_content").find(".contain_list_li").eq(i).append("<img src='../images/discu_avatar.png' class='penguin'/>");
            $("#talk_list_content").find(".contain_list_li").eq(i).append("<span class='contact_group'>" + title[0].group_discussion[i].group_discussion_name+ "</span>");
        }
    }
}