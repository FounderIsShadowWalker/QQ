/**
 * Created by founder on 8/19/15.
 */
window.conversation = null;
window.onload=function(){
    var talk= new Talk("","",$("#talk_name").text());
    talk.init();
}
function Talk(qq_number,talk_qq_number,name){
    this.socket=null;
    this.qq_number=qq_number;
    this.talk_qq_number=talk_qq_number;
    this.name=name;
}
Talk.prototype={
    init:function(){
        var that = this;
        this.socket = io.connect('http://localhost:3000');
        this.socket.emit('login',$("#hidden_userqq").val());   //登陆成功 则发送自己的qq号
        document.getElementById('talk_panel_send_btn').addEventListener('click', function() {
            var messageInput = document.getElementById('talk_panel_image'),
                msg = messageInput.value;
                messageInput.value = '';
                messageInput.focus();
            if (msg.trim().length != 0&&$("#hidden_talkerqq").val()!="-1") {     //判断是否点开了用户聊天面板
                that.qq_number=$("#hidden_userqq").val();                        //存储自己qq
                that.talk_qq_number=$("#hidden_talkerqq").val();                //存储对方qq
                that.socket.emit('postMsg', msg,that.qq_number,that.talk_qq_number); //把消息发送到服务器
                 //不考虑断线的情况,将自己发送的消息写入信息json
                that.write_send_message(msg,that.qq_number,that.talk_qq_number);
                that._displayNewMsg(that.name, msg); //把自己的消息显示到自己的窗口中
            };
        }, false);
        this.socket.on('newMsg', function(user, msg,from) {   //user 是用户自己
            console.log("得到:"+from+"发来的信息。")           //用户点击过联系人，数据已经产生后的方法
            console.log("正在跟:"+$("#hidden_talkerqq").val());
            if($("#hidden_talkerqq").val()!=from){           //未打开发信人的窗口
                console.log("正在与别人聊天");                 //通过qq号来找昵称名
                var data=$("#hidden_data").val();
                var title=JSON.parse(data);
                for(var i=0;i<title[0].contact_list.default.length;i++){
                     for(var j=0;j<title[0].contact_list.default[i].default_list.length;j++){
                         console.log("我的好友qq号:"+title[0].contact_list.default[i].default_list[j].qq_number)
                         if(from==title[0].contact_list.default[i].default_list[j].qq_number){
                             console.log("发送方的昵称是:"+title[0].contact_list.default[i].default_list[j].remark);  //发现昵称名，显示在会话上
                             var talker_dialog=title[0].contact_list.default[i].default_list[j].remark;
                             that.display_dialog(talker_dialog,from,msg);
                         }
                     }
                }
            }
            else {                                           //打开发信人的窗口
                console.log("正在与你聊天");
                //console.log($("span[id='qq" + from + "']"));
                var talker_nickname = $("#talk_panel_header_menu").next().text();   //昵称是聊天框的名称
                console.log("昵称是"+talker_nickname);
                that._displayNewMsg(talker_nickname, msg);
            }
            that.write_get_message(user,msg,from);
        });
    },
    _displayNewMsg: function(user, msg, color) {                            //聊天窗口
        var container = document.getElementById('talk_panel_content'),
            msgToDisplay = document.createElement('p'),
            date = new Date().toTimeString().substr(0, 8);
        //msg = this._showEmoji(msg);
        msgToDisplay.style.color = color || '#000';
        msgToDisplay.innerHTML = user+'<span class="timespan">(' + date + '): </span>' + msg;
        container.appendChild(msgToDisplay);
        //container.scrollTop = container.scrollHeight;
    },
    display_dialog:function(nickname, qq_number,msg){                       //消息窗口
        //先判断是否存在这个消息窗口
        var  date = new Date().toTimeString().substr(0, 8);
        if($("#talk_list_content li span[id=" + qq_number +"]").length > 0){
            $("#talk_list_content li span[id=" + qq_number +"]").next().next().text(msg);
            $("#talk_list_content li span[id=" + qq_number +"]").next().text($("#talk_list_content li span[id=" + qq_number +"]").next().text() + '\\n' + nickname + '(' + date +'): ' + msg);
        }
        else {
            $("#talk_list_content").append("<li class='contain_list_li' onclick='showMissMessage(this)'" +"></li>");
            $("#talk_list_content").find("li").last().append("<img src='../images/penguin.png' class='penguin'/>");
            //span#friend_name.friend_name_class
            $("#talk_list_content").find("li").last().append("<span class='friend_name_class'>" + nickname + "</span>");
            //span#friend_word.friend_word_class
            $("#talk_list_content").find("li").last().append("<span class='hidden_data' id=" + qq_number + ">" + qq_number + "</span>");
            $("#talk_list_content").find("li").last().append("<span id='talk_content' class='hidden_data'></span>");
            $("#talk_list_content").find("li").last().append("<span class='friend_word_class'>" + msg + "</span>");
            $("#talk_list_content li #talk_content").text($("#talk_list_content li #talk_content").text() + nickname + '(' + date +'): '+msg);
        }
        //随时保存会话内容;
        window.conversation =  document.getElementById("talk_list_content").innerHTML;

    },
    write_send_message:function(msg,qq_number,talk_qq_number){   //写入自己给发信人发送的信息
        console.log("我要发信息了");
        console.log("信息内容:"+msg);
        console.log("我的qq:"+qq_number);
        console.log("我要发送用户的qq号:"+talk_qq_number);
        //var data=$("#hidden_data").val();
        //var title=JSON.parse(data);
        //for(var i=0;i<title[0].contact_list.default.length;i++){
        //    for(var j=0;j<title[0].contact_list.default[i].default_list.length;j++) {
        //        if(title[0].contact_list.default[i].default_list[j].qq_number==talk_qq_number) {
        //            var word_position = title[0].contact_list.default[i].default_list[j].talk.length;
        //            console.log("我的好友是:" + title[0].contact_list.default[i].default_list[j].nickname);
        //            var arr =
        //            {
        //                "content": {
        //                    "message": msg,
        //                    "qq_number": qq_number,    //自己的qq
        //                    "talk_qq_number":talk_qq_number  //好友qq
        //                }
        //            }
                    //title[0].contact_list.default[i].default_list[j].talk.push(arr);
                    //console.log("新的数据:" + JSON.stringify(title));
                    $.ajax({
                        type: 'post',
                        url: "/messagePost",
                        data: {"message": msg,"my_qq":qq_number,"talk_qq_number":talk_qq_number},
                        success: function (data) {  //以我的写法，这里success是没有执行到的，直接跑到message处理程序，成功删除就over了
                            //console.log("写入新说的话:");
                            //var d = eval("("+data+")");
                            //console.log("data:"+JSON.stringify(d.data));
                            ////$("#hidden_data").html(JSON.stringify(d.data));
                            //$("#hidden_data").val(JSON.stringify(d.data));
                            //console.log($("#hidden_data").val());
                        }
                    })
                //}
           // }
        //}
    },
    write_get_message:function(user,msg,from){   //写入发信人的信息与发信人的qq
        console.log("我收到信息了");
        console.log("信息内容:"+msg);
        console.log("我的qq:"+user);
        console.log("收到qq:"+from+"的消息");
        var data=$("#hidden_data").val();
        var title=JSON.parse(data);
        //if(title[0]._id!=null) delete title[0]._id;
        //for(var i=0;i<title[0].contact_list.default.length;i++){
        //    for(var j=0;j<title[0].contact_list.default[i].default_list.length;j++) {
        //          if(title[0].contact_list.default[i].default_list[j].qq_number==from) {
        //            console.log("我的好友是:" + title[0].contact_list.default[i].default_list[j].nickname);
        //            var arr =
        //            {
        //                "content": {
        //                    "message": msg,
        //                    "qq_number": from
        //                }
        //            }
        //            title[0].contact_list.default[i].default_list[j].talk.push(arr);
        //            console.log("新的数据:" + JSON.stringify(title));
                    $.ajax({
                        type: 'post',
                        url: "/messageWrite",
                        data:{"message":msg,"my_qq":from},
        //                data: {"message": JSON.parse(title),"my_qq":from},
                        success: function () {  //以我的写法，这里success是没有执行到的，直接跑到message处理程序，成功删除就over了
                            console.log("写入新说的话:");
                        }
                    })
        //        }
        //    }
        //}
    }
}

function showMissMessage(obj,color){
    var talkContent = $(obj).find('span#talk_content').text();
    var talkSentences =  talkContent.split('\\n'),
        msgToDisplay,
        container = document.getElementById('talk_panel_content');

    $("#talk_panel_header").find("span").text($(obj).find("span").eq(0).text());   //改变聊天框的名称
    $("#hidden_talkerqq").val($(obj).find("span").eq(1).text());                   //改变聊天框的隐藏qq名

    if(container.innerHTML == '' && $(obj).find("span.friend_name_class").text() === $("#talk_panel_header").find("span").text()) {
        for (var i = 0; i < talkSentences.length; i++) {
            msgToDisplay = document.createElement('p');
            msgToDisplay.style.color = color || '#000';
            msgToDisplay.innerHTML = talkSentences[i];
            container.appendChild(msgToDisplay);
        }
    }
}