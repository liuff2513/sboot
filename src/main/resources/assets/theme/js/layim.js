;!function(win, undefined){
var config = {
    msgurl: 'mailbox.html?msg=',
    chatlogurl: 'mailbox.html?user=',
    aniTime: 200,
    right: -298,//收进数值
    api: {
    	chatlog: '', //聊天记录接口
        group: './qixinChat/discussionList', //讨论组列表接口 
        friend: './qixinChat/friendList', //好友列表接口
        groups: './qixinChat/discussionUserList', //群组成员接口
        sendurl: '' //发送消息接口
    },
    user: { //当前用户信息
        name: '遊客',
        photo: '/theme/img/010927810.jpg'
    },
    emojis:'',//融云表情
    //自动回复内置文案，也可动态读取数据库配置
    autoReplay: [
        '您好，我现在有事不在，一会再和您联系。'
    ],
    
    
    chating: {},
    hosts: (function(){
        var dk = location.href.match(/\:\d+/);
        dk = dk ? dk[0] : '';
        return '/' + document.domain + dk + '/';
    })(),
    json: function(url, data, callback, error){
        return $.ajax({
            type: 'POST',
            url: url,
            data: data,
            async:false,
            dataType: 'json',
            success: callback,
            error: error
        });
    },
    stopMP: function(e){
        e ? e.stopPropagation() : e.cancelBubble = true;
    }
}, dom = [$(window), $(document), $('html'), $('body')], xxim = {};
var qixinCurrentUserId = $("#qixinCurrentUserId").val();
var qixinCurrentUserName = $("#qixinCurrentUserName").val();
var qixinCurrentUserPhoto = $.trim($("#qixinCurrentUserPhoto").val())!=""&&$("#qixinCurrentUserPhoto").val()!=null?$.trim($("#qixinCurrentUserPhoto").val()):'/theme/img/010927810.jpg';
config.user.name=qixinCurrentUserName;
config.user.photo=qixinCurrentUserPhoto;

var base64Str="";//图片base64压缩
var base64StrList=[];
//工具类
var qixinUtil ={
        symbolReplace: function (str) {
            if (!str) return '';
            str = str.replace(/&/g, '&amp;');
            str = str.replace(/</g, '&lt;');
            str = str.replace(/>/g, '&gt;');
            str = str.replace(/"/g, '&quot;');
            str = str.replace(/'/g, '&#039;');
            return str;
        },
        replaceSymbol: function (str) {
            if (!str) return '';
            str = str.replace(/&amp;/g, '&');
            str = str.replace(/&lt;/g, '<');
            str = str.replace(/&gt;/g, '>');
            str = str.replace(/&quot;/g, '"');
            str = str.replace(/&#039;/g, "'");
            str = str.replace(/&nbsp;/g, " ");
            return str;
        }
};

//主界面tab
xxim.tabs = function(index){
    var node = xxim.node;
    node.tabs.eq(index).addClass('xxim_tabnow').siblings().removeClass('xxim_tabnow');
    node.list.eq(index).show().siblings('.xxim_list').hide();
    if(node.list.eq(index).find('li').length === 0){
        xxim.getDates(index);
    }
};

//节点
xxim.renode = function(){
    var node = xxim.node = {
        tabs: $('#xxim_tabs>span'),
        list: $('.xxim_list'),
        online: $('.xxim_online'),
        setonline: $('.xxim_setonline'),
        onlinetex: $('#xxim_onlinetex'),
        xximon: $('#xxim_on'),
        layimFooter: $('#xxim_bottom'),
        xximHide: $('#xxim_hide'),
        xximSearch: $('#xxim_searchkey'),
        searchMian: $('#xxim_searchmain'),
        closeSearch: $('#xxim_closesearch'),
        layimMin: $('#layim_min'),
        xximmmParent:$("#xximmm")
        
    }; 
};

//主界面缩放
xxim.expend = function(){
    var node = xxim.node;
    if(xxim.layimNode.attr('state') !== '1'){
        xxim.layimNode.stop().animate({right: config.right}, config.aniTime, function(){
            node.xximon.addClass('xxim_off');
            try{
                localStorage.layimState = 1;
            }catch(e){}
            xxim.layimNode.attr({state: 1});
            node.layimFooter.addClass('xxim_expend').stop().animate({marginLeft: config.right}, config.aniTime/2);
            node.xximHide.addClass('xxim_show');
        });
    } else {
        xxim.layimNode.stop().animate({right: 1}, config.aniTime, function(){
            node.xximon.removeClass('xxim_off');
            try{
                localStorage.layimState = 2;
            }catch(e){}
            xxim.layimNode.removeAttr('state');
            node.layimFooter.removeClass('xxim_expend');
            node.xximHide.removeClass('xxim_show');
        });
        node.layimFooter.stop().animate({marginLeft: 0}, config.aniTime);
    }
};

//初始化窗口格局
xxim.layinit = function(){
    var node = xxim.node;
    
    //主界面
    try{
        /*
        if(!localStorage.layimState){       
            config.aniTime = 0;
            localStorage.layimState = 1;
        }
        */
        if(localStorage.layimState === '1'){
            xxim.layimNode.attr({state: 1}).css({right: config.right});
            node.xximon.addClass('xxim_off');
            node.layimFooter.addClass('xxim_expend').css({marginLeft: config.right});
            node.xximHide.addClass('xxim_show');
        }
    }catch(e){
        //layer.msg(e.message, 5, -1);
    }
};

//添加融云表情
//表情
xxim.drawExpressionWrap = function () {
   // var RongIMexpressionObj = $(".expression");
    config.emojis="";
    RongIMLib.RongIMEmoji.init();//初始化表情
    var emojiList = RongIMLib.RongIMEmoji.emojis;
   //console.log(emojiList);
    if (emojiList && emojiList.length > 0) {
    	for (var int = 0; int < emojiList.length; int++) {
    		config.emojis+=emojiList[int].innerHTML; 
		}

    }

}
//发送图片
$("#qixinChat_body").delegate(".layim_addimage","click",function(){
	$("#qixinChatImages_input").trigger("click");
});


/*
$("#qixinChatImages_input").change(function(){
	
	
	$.ajaxFileUpload({  
		url:"./uploadFile/uploadQixinChatPicture",
		secureuri:false,  
		fileElementId:"qixinChatImages_input",//文件选择框的id属性  
		dataType: 'json',   //json
		success: function (data) {
			alert("start");
			//console.log(data);
			base64StrList=data;
			for (var i = 0; i < base64StrList.length; i++) {
				 var imgStr = '<img src="data:'+base64StrList[i].contentType+';base64,'+base64StrList[i].imageStr+'" >';
				// insertImages(imgStr);
				 $("#layim_textarea").find("div[textarea-now='now']").focus();
				document.execCommand("insertHTML", false,imgStr);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){  
			alert('上传失败！');  
		}  
	});  
	
});*/

/*
$('#qixinChatImages_input').bind('change',function(){


	var node = xxim.node;
	    node.sendbtn = $('#layim_sendbtn');
	    var textarea =  $("#layim_textarea").find("div[textarea-now='now']");
	    var textarea_id =  $("#layim_textarea").find("div[textarea-now='now']").attr("id");
	var file = this.files[0];
	 getBase64Image(file);
    if(!/image\/\w+/.test(file.type)){
        alert("请确保文件为图像类型");
        return false;
    }
    console.log("图片大小：：：："+file.size/1024);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
        var imgStr = '<img src="'+this.result+'"  style="height:50px;width:50px">';
        //$('.send-content').html( $('.send-content').html()+imgStr);
       //插入图片
       // $(textarea).html($(textarea).html()+imgStr);
        base64Str=this.result;
        console.log(base64Str);
        insertImages(imgStr);
       
      
    }
  
});
*/

//
function insertImages(imgStr){
	
	$("#layim_textarea").find("div[textarea-now='now']").focus();
	document.execCommand("insertHTML", false,imgStr);
	/*require('editor',function(editor){
		editor.insertImage(imgStr);
		
		avalon.bind($('insertImg'),'click',function(e){
			// editor.insertImage("<img src='1.jpeg'>");
			// editor.insertImage("<img src='1.jpeg'>");
			editor.insertImage('1.jpeg');
		});
	});*/

};
//聊天窗口mxp
xxim.popchat = function(param){
	$('#layim_groups').find("ul").hide();
    $("#updown_i").attr("class","fa fa-chevron-down");
    var node = xxim.node, log = {};
    
    log.success = function(layero){
        layer.setMove();
     
        xxim.chatbox = layero.find('#layim_chatbox');
        log.chatlist = xxim.chatbox.find('.layim_chatmore>ul');
        
        log.chatlist.html('<li data-id="'+ param.id +'" type="'+ param.type +'"  id="layim_user'+ param.type + param.id +'"><span>'+ param.name +'</span><em>×</em></li>')
        xxim.tabchat(param, xxim.chatbox);
        
        //最小化聊天窗
        xxim.chatbox.find('.layer_setmin').on('click', function(){
            var indexs = layero.attr('times');
            layero.hide();
            node.layimMin.text(xxim.nowchat.name).show();
        });
        
        //关闭窗口
        xxim.chatbox.find('.layim_close').on('click', function(){
            var indexs = layero.attr('times');
            layer.close(indexs);
            xxim.chatbox = null;
            config.chating = {};
            config.chatings = 0;
        });
        
        //关闭某个聊天
        log.chatlist.on('mouseenter', 'li', function(){
            $(this).find('em').show();
        }).on('mouseleave', 'li', function(){
            $(this).find('em').hide();
        });
        log.chatlist.on('click', 'li em', function(e){
            var parents = $(this).parent(), dataType = parents.attr('type');
            var dataId = parents.attr('data-id'), index = parents.index();
            var chatlist = log.chatlist.find('li'), indexs,param={};
           //清除未读消息数目
            param.id=dataId;
            param.type=dataType;
            if(dataType=="group"){
            	param.dicRyId=$("#xximmm").find("ul.xxim_list").eq(1).find("ul.xxim_chatlist").find("li[data-id='"+dataId+"']").attr("data-discu-id");
            }
            setMessageReaded(param);
            // alert(2);
            config.stopMP(e);
            
            delete config.chating[dataType + dataId];
            config.chatings--;
            
            parents.remove();
            $('#layim_area'+ dataType + dataId).remove();
            if(dataType === 'group'){
                $('#layim_group'+ dataType + dataId).remove();
            }
            
            if(parents.hasClass('layim_chatnow')){
                if(index === config.chatings){
                    indexs = index - 1;
                } else {
                    indexs = index + 1;
                }
                xxim.tabchat(config.chating[chatlist.eq(indexs).attr('type') + chatlist.eq(indexs).attr('data-id')]);
            }
            
            if(log.chatlist.find('li').length === 1){
                log.chatlist.parent().hide();
            } 
        });
        //聊天选项卡
        log.chatlist.on('click', 'li', function(){
            var othis = $(this), dataType = othis.attr('type'), dataId = othis.attr('data-id');
            $('#layim_groups').find("ul").hide();
            $("#updown_i").attr("class","fa fa-chevron-down");
            xxim.tabchat(config.chating[dataType + dataId]);
        });
        
        //发送热键切换
        log.sendType = $('#layim_sendtype'), log.sendTypes = log.sendType.find('span');
        $('#layim_enter').on('click', function(e){
            config.stopMP(e);
            log.sendType.show();
        });
        log.sendTypes.on('click', function(){
            log.sendTypes.find('i').text('')
            $(this).find('i').text('√');
            var senTypeFlag = $(this).text();
            if(senTypeFlag.indexOf("Ctrl")>=0){
            	$('#layim_sendtype').attr('i_sentype',"2");
            }else{
            	$('#layim_sendtype').attr('i_sentype',"1");
            }
        });
        
        //xxim.transmit();
    };
    
    
    
    
    
    log.html = '<div class="layim_chatbox" id="layim_chatbox">'
            +'<h6>'
            +'<span class="layim_move"></span>'
            +'    <a class="layim_face"><img src="'+ param.photo +'" ></a>'
            //+'    <a href="javascript:;" class="layim_names">'+ param.name +'</a>'
            +'    <div class="layim_namesbox" style="width:450px;"><a href="javascript:;" class="updown" chatType="'+param.type+'" chatId="'+param.id+'"><span>'+ param.name +'</span><i id="updown_i" class="fa fa-chevron-down"></i></a></div>'
            +'    <span class="layim_rightbtn">'
            +'        <i class="layer_setmin">—</i>'
            +'        <i class="layim_close">&times;</i>'
            +'    </span>'
            +'</h6>'
            //+'<div style="width:100%;height: 280px;float: left;position: relative;">'
            +'<div class="layim_chatmore" id="layim_chatmore">'
            +'    <ul class="layim_chatlist"></ul>'
            +'</div>'
            
            //+'</div>'
            +'<div class="layim_chat">'
            +'<div class="layim_groups" style="display:none;" id="layim_groups">'
            // +'<div class="layim_groups-top-btn"></div>'
             +'</div>'
            +'    <div class="layim_chatarea" id="layim_chatarea">'
            +'        <ul class="layim_chatview layim_chatthis" data-param ="{\'id\':\''+param.id+'\',\'type\':\''+param.type+'\',\'dicRyId\':\''+(param.dicRyId!=null?param.dicRyId:'')+'\'}"  onscroll="getQixinHistoryDatas();" id="layim_area'+ param.type + param.id +'"></ul>'
            +'    </div>'                       
            +'    <div class="layim_tool">'
            +'	  <div class="col-md-12 expression" style="display: none;"	>'+config.emojis+'</div>'
            +'        <i id="btnExpressionId" class="layim_addface fa fa-meh-o" title="发送表情"></i>'
           // +'        <img id="emoji01" class="RC_Expression" style="background-position: -1900px 0px;" name="[搞怪]">'
            +'        <a href="javascript:;"><i class="layim_addimage fa fa-picture-o" title="上传图片"></i></a>'
           // +'        <a href="javascript:;"><i class="layim_addfile fa fa-paperclip" title="上传附件"></i></a>'
           // +'        <a href="" target="_blank" class="layim_seechatlog"><i class="fa fa-comment-o"></i>聊天记录</a>'
            +'    </div>'
           // +'    <textarea class="layim_write" id="layim_write"></textarea>'
            +'    <div id="layim_textarea" class="layim_textarea">'
            +'   	 <div style="border:none;voerflow:auto;max-height:100px;"    class="layim_write" id="textarea-layim_area'+ param.type + param.id +'" contenteditable="true" onblur="onDivBlur();" onmousedown="return cancelEvent(event);" onclick="return cancelEvent(event);"  onmouseup="saveSelection();" onkeyup="saveSelection();" onfocus="restoreSelection();"></div>'
            +'    </div>'
            +'    <div class="layim_send">'
            +'        <div class="layim_sendbtn" id="layim_sendbtn">发送<span class="layim_enter" id="layim_enter"><em class="layim_zero"></em></span></div>'
            +'        <div i_sentype="1" class="layim_sendtype" id="layim_sendtype">'
            +'            <span><i>√</i>按Enter键发送</span>'
            +'            <span><i></i>按Ctrl+Enter键发送</span>'
            +'        </div>'
            +'    </div>'
            +'</div>'
            +'</div>';

    if(config.chatings < 1){
        $.layer({
            type: 1,
            border: [0],
            title: false,
            shade: [0],
            area: ['620px', '493px'],
            move: '.layim_chatbox .layim_move',
            moveType: 1,
            closeBtn: false,
            offset: [(($(window).height() - 493)/2)+'px', ''],
            page: {
                html: log.html
            }, success: function(layero){
                log.success(layero);
            }
        })
        //获取历史记录
        getQixinHistory(param);
    } else {
        log.chatmore = xxim.chatbox.find('#layim_chatmore');
        log.chatarea = xxim.chatbox.find('#layim_chatarea');
        log.textarea = xxim.chatbox.find('#layim_textarea');//输入框
        
        log.chatmore.show();
        
        log.chatmore.find('ul>li').removeClass('layim_chatnow');
        log.chatmore.find('ul').append('<li data-id="'+ param.id +'" type="'+ param.type +'" id="layim_user'+ param.type + param.id +'" class="layim_chatnow"><span>'+ param.name +'</span><em>×</em></li>');
        
        log.chatarea.find('.layim_chatview').removeClass('layim_chatthis');
        log.chatarea.append('<ul class="layim_chatview layim_chatthis" data-param ="{\'id\':\''+param.id+'\',\'type\':\''+param.type+'\',\'dicRyId\':\''+(param.dicRyId!=null?param.dicRyId:'')+'\'}"  onscroll="getQixinHistoryDatas();" id="layim_area'+ param.type + param.id +'"></ul>');
        log.textarea.find('.layim_write').hide();
        log.textarea.append('<div style="border:none;voerflow:auto;max-height:100px;" class="layim_write" id="textarea-layim_area'+ param.type + param.id +'" contenteditable="true"onblur="onDivBlur();" onmousedown="return cancelEvent(event);" onclick="return cancelEvent(event);"  onmouseup="saveSelection();" onkeyup="saveSelection();" onfocus="restoreSelection();" ></div>');
        xxim.tabchat(param);
        //获取历史记录
        getQixinHistory(param);
    }
    
    //群组
    log.chatgroup = xxim.chatbox.find('#layim_groups');
    if(param.type === 'group'){
    	log.chatgroup.find('ul').removeClass('layim_groupthis');
        log.chatgroup.append('<ul  class="layim_groupthis" style="display:none;" id="layim_group'+ param.type + param.id +'"> </ul>');
        xxim.getGroups(param);
        //添加讨论组是否可以编辑
        //log.chatgroup.find(".layim_groups-top-btn a").hide();
    }else{
    	 log.chatgroup.find('ul').removeClass('layim_groupthis');
    	 var group_html = '<ul class="layim_groupthis" style="display:none;" id="layim_group'+ param.type + param.id +'">';
         group_html+='<div class="layim_groups-top-btn" ><a class="updateDiscussionUsers" theUserId='+param.id+' operationFlag="create">+</a></div>';  
         group_html+='<li type="one"><img src=".'+config.user.photo+'" class="xxim_oneface"><span class="xxim_onename">'+config.user.name+'</span></li>';
         group_html+='<li type="one"><img src="'+param.photo+'" class="xxim_oneface"><span class="xxim_onename">'+param.name+'</span></li>';
         group_html+='</ul>';
         log.chatgroup.append(group_html);
    }
    //点击群员切换聊天窗
    log.chatgroup.on('click', 'ul>li', function(){
    	xxim.popchatbox($(this));
    });
};

//显示讨论组成员和隐藏讨论组成员
$("#qixinChat_body").delegate(".updown","click",function(){
	var chatType = $(this).attr("chatType");
	var chatId = $(this).attr("chatId");
	var iclass= $(this).find("i").attr("class");
	
	if(iclass=="fa fa-chevron-down"){//原先不显示-->显示
		$('#layim_groups').show();
		$("#layim_group"+chatType+chatId).show();
		$(this).find("i").attr("class","fa fa-chevron-up");
	}else{
		$('#layim_groups').hide();
		$("#layim_group"+chatType+chatId).hide();
		$(this).find("i").attr("class","fa fa-chevron-down");
	}
	
}); 


//定位到某个聊天队列
xxim.tabchat = function(param){
    var node = xxim.node, log = {}, keys = param.type + param.id;
    xxim.nowchat = param;
    
    xxim.chatbox.find('#layim_user'+ keys).addClass('layim_chatnow').siblings().removeClass('layim_chatnow');
    xxim.chatbox.find('#layim_area'+ keys).addClass('layim_chatthis').siblings().removeClass('layim_chatthis');
    xxim.chatbox.find('#layim_group'+ keys).addClass('layim_groupthis').siblings().removeClass('layim_groupthis');
    if(param.type=="group"){
    	xxim.chatbox.find('.layim_face').html(param.groupPhoto);
    }else{
    	xxim.chatbox.find('.layim_face').html("<img src='"+param.photo+"'>");
    }
    xxim.chatbox.find('.layim_face, .layim_namesbox').attr('href', "javascript:;");
    xxim.chatbox.find('a.updown').find("span").text(param.name);
    xxim.chatbox.find('.layim_namesbox').attr("chatType",param.type);//设置类型单条还是讨论组
    xxim.chatbox.find('.updown').attr("chatType","one");//上下箭头控制讨论组成员显示和隐藏
    xxim.chatbox.find('.updown').attr("chatId",param.id);
    xxim.chatbox.find('.layim_seechatlog').attr('href', config.chatlogurl + param.id);
	$(this).find("i").attr("class","fa fa-chevron-down");
    log.groups = xxim.chatbox.find('.layim_groups');
    if(param.type === 'group'){
    	xxim.chatbox.find('.updown').attr("chatType","group");//上下箭头控制讨论组成员显示和隐藏
        //log.groups.show();
        //显示讨论组编辑
        //log.groups.find(".layim_groups-top-btn a").hide();
        //log.groups.find(".layim_groups-top-btn").find("a[updateDiscussionId='"+param.id+"']").show();
    	log.groups.hide()
    } else {
        log.groups.hide();
    }
    log.textarea = xxim.chatbox.find('#layim_textarea');
   // alert(log.textarea.find("div[textarea-now='now']").length);
    log.textarea.find("div[textarea-now='now']").attr("textarea-now","");
    log.textarea.find('.layim_write').hide();
    $("#textarea-layim_area"+ param.type + param.id).show();
    $("#textarea-layim_area"+ param.type + param.id).attr("textarea-now","now");
    $("#textarea-layim_area"+ param.type + param.id).focus();
    //$('#layim_write').focus();
};
//表情显示隐藏
$("#qixinChat_body").delegate("#btnExpressionId","click",function(){
	var expressonObj = $(".layim_chatthis").parent().next().children().eq(0),msgConment=$('.layim_chatthis').parent();
	if(!expressonObj.is(":visible")){
		expressonObj.show();
		//msgConment.height(msgConment.height()-expressonObj.height());
	}else{
		expressonObj.hide();
		//msgConment.height(msgConment.height()+expressonObj.height());
	}
	
});
//表情点击显示到输入框
$("#qixinChat_body").delegate(".expression>span","click",function(){
	//var str = $(this).children().first()[0].outerHTML.replace(/b/,"img");
    //str=str.replace(/&amp;nbsp;/,"&nbsp;") 表情点击事件不好使 
	//var str ="[" + $(this).children().first().attr("alt") + "]";
	//var layim_write = $(".gray-bg").find("ul.layim_chatthis").parents("div.layim_chat").find("#layim_write");
	var emojiName= $(this).attr("name");
	
	var style= $(this).children().first().attr("style");
	var text='<img name="'+emojiName+'" class="RC_Expression" style="'+style+'" >';
	
	 insertImages(text);
	 $("#qixinChat_body #btnExpressionId").trigger("click");
});




//点击其他地方关闭表情
$("#qixinChat_body").delegate('.expression','mouseleave', function (event) {
   // $("#btnExpressionId").trigger("click");
});
//好友讨论组列表点击弹出聊天窗mxp
xxim.popchatbox = function(othis){
	//<li data-id="402890b8538d41f301538d91d2430000" class="xxim_childnode" type="one">
	//<img src="./upload/app/20160412140451_297.png" class="xxim_oneface">
	//<span class="xxim_onename">测试账号001</span></li>
	var node = xxim.node, dataId = othis.attr('data-id'),
	dicRyId=othis.attr('data-discu-id'),
	discussionOwnerId=othis.attr('data-discu-ownerId'),
	//对方参数源
	param = {
        id: dataId, //用户ID
        dicRyId:dicRyId,//融云讨论组 id
        type: othis.attr('type'),//单聊还是讨论组
        name: othis.find('.xxim_onename').text(),  //用户名
        photo: othis.find('.xxim_oneface').attr('src'), //用户头像
        discussionOwnerId: discussionOwnerId, //讨论组所有者
        groupPhoto: '<div class="Group-picture-01">'+othis.find('div.Group-picture').html()+'</div>',
        href: 'javascript:;' //用户主页
    }, key = param.type + dataId;
	//设置消息已读
	setMessageReaded(param);
	//console.log("==============="+JSON.stringify(othis));
	//不能和自己聊天
	if(dataId==qixinCurrentUserId){
		layer.msg('请勿和自己聊天！');
		 //layer.alert('请勿和自己聊天！');
		return ;
	}
    if(!config.chating[key]){
        xxim.popchat(param);
        config.chatings++;
        xxim.transmit();
    } else {
        xxim.tabchat(param);
    }
    config.chating[key] = param;
    
    var chatbox = $('#layim_chatbox');
    if(chatbox[0]){
        node.layimMin.hide();
        chatbox.parents('.xubox_layer').show();
    }
};
/*
$.post("./qixinChat/discussionOrgUserList",{},function(str){
	 $.layer({
		    type: 1,
		    content: str //注意，如果str是object，那么需要字符拼接。
	  });
	console.log(str);
	
});

$.layer({
	shade: [0.5, '#000', false],
	type: 2,
	iframe: {
		src: './qixinChat/discussionOrgUserList'
	},
	title: ['', false],
	closeBtn: [1, true],
	area: ['600px', '300px'],
	move: ['.xubox_border', true],
	offset: ['', ''],
	success: function(layer) {
		// 这里定义弹出层加载成功后要执行的内容
	}
});
*/


//请求群员 讨论组成员
xxim.getGroups = function(param){
    var keys = param.type + param.id, str = '',
    groupss = xxim.chatbox.find('#layim_group'+ keys);
    groupss.addClass('loading');
    if(param.discussionOwnerId==qixinCurrentUserId){
    	str = '<div class="layim_groups-top-btn"><a class="updateDiscussionUsers"  updateSiscussionRyId='+param.dicRyId+'  updateDiscussionId='+param.id+'>+</a></div>';
    	//log.chatgroup.find(".layim_groups-top-btn[operationFlag='update']").append('');
    }
    config.json(config.api.groups, {id:param.id}, function(datas){
        if(datas.type == "discussionUser"){
            var ii = 0, lens = datas.data.length;
            if(lens > 0){
                for(; ii < lens; ii++){
                    //str += '<li onmousedown="qixinonmousedownRemove(this);" discussionOwnerId="'+datas.data[ii].discussionOwnerId+'"  discussionIdRongyun="'+datas.data[ii].discussionIdRy+'" data-id="'+ datas.data[ii].id +'" type="one"><img src=".'+ (datas.data[ii].photo!=null&&datas.data[ii].photo!=""?datas.data[ii].photo:'/theme/img/010927810.jpg') +'" class="xxim_oneface"><span class="xxim_onename">'+ datas.data[ii].name +'</span></li>';
                	str += '<li  discussionOwnerId="'+datas.data[ii].discussionOwnerId+'"  discussionIdRongyun="'+datas.data[ii].discussionIdRy+'" data-id="'+ datas.data[ii].id +'" type="one"><img src=".'+ (datas.data[ii].photo!=null&&datas.data[ii].photo!=""?datas.data[ii].photo:'/theme/img/010927810.jpg') +'" class="xxim_oneface"><span class="xxim_onename">'+ datas.data[ii].name +'</span></li>';
                }
            } else {
                str = '<li class="layim_errors">没有群员</li>';
            }
            
        } else {
            str = '<li class="layim_errors">'+ datas.msg +'</li>';
        }
        groupss.removeClass('loading');
        groupss.html(str);
    }, function(){
        groupss.removeClass('loading');
        groupss.html('<li class="layim_errors">请求异常</li>');
    });
};

//消息传输
xxim.transmit = function(){
    var node = xxim.node, log = {};
    node.sendbtn = $('#layim_sendbtn');
    node.imwrite = $("#layim_textarea").find("div[textarea-now='now']");
    //发送
    log.send = function(){
    	node.imwrite = $("#layim_textarea").find("div[textarea-now='now']");
        var i_sentype = $("#layim_sendtype").attr("i_sentype");
        var t_id = $("#layim_textarea").find("div[textarea-now='now']").attr("id");//输入框id
        var tempContent = $.trim(node.imwrite.html());
       // console.log("1::--["+i_sentype+"]---"+tempContent+"-----");
        //
        if(i_sentype=="1"&&tempContent.length>0){
            tempContent = tempContent.replace(/<br><br>$/,"");//火狐
            tempContent = tempContent.replace(/<div><br><\/div>$/,"");//谷歌
        }else{
            tempContent = tempContent.replace(/<br>$/,"");//火狐
        }
       // console.log("2::-----"+tempContent+"-----");
        var data = {
            content:tempContent,
            contentText:node.imwrite.text(),
            id: xxim.nowchat.id,
            dicRyId: xxim.nowchat.dicRyId,
            chatType:xxim.nowchat.type,
            sign_key: '', //密匙
            
            _: +new Date
        };
        //alert("=="+$.trim(data.contentText).length);

        var lenEmojis = data.content.match(/<img\s+name="\[([^\]]+)\][^>]+>/gi)||[];//替换表情
        var lenTexts=$.trim(data.contentText).length;
        var lensAll= lenEmojis.length+lenTexts;
         if(lensAll==0){
            //layer.tips('说点啥呗！', '#'+t_id, 2);
            node.imwrite.focus();
        }else if(lensAll>500){
        	layer.tips('最多500字！', '#'+t_id, 2);
            node.imwrite.focus();
        } else {
        	
        	//console.log(JSON.stringify(data)+"===");
        	//发消息
        	sendQixinMessage(data,"1");

            //此处皆为模拟
            var keys = xxim.nowchat.type + xxim.nowchat.id;
            
            //聊天模版
            log.html = function(param, type){
                return '<li class="'+ (type === 'me' ? 'layim_chateme' : '') +'">'
                    +'<div class="layim_chatuser">'
                        + function(){
                            if(type === 'me'){
                                return '<span class="layim_chattime">'+ param.time +'</span>'
                                       +'<span class="layim_chatname">'+ param.name +'</span>'
                                       +'<img src="'+ param.photo +'" >';
                            } else {
                                return '<img src="'+ param.photo +'" >'
                                       +'<span class="layim_chatname">'+ param.name +'</span>'
                                       +'<span class="layim_chattime">'+ param.time +'</span>';      
                            }
                        }()
                    +'</div>'
                    +'<div class="layim_chatsay">'+ param.content +'<em class="layim_zero"></em></div>'
                +'</li>';
            };

            log.imarea = xxim.chatbox.find('#layim_area'+ keys);
            //自己参数源
            var param_temp ={
                    time: formateDate_hmi(new Date),
                    name: config.user.name,
                    photo: "."+config.user.photo,
                    content: data.content
                };
            log.imarea.append(log.html(param_temp, 'me'));
            node.imwrite.html('').focus();
            log.imarea.scrollTop(log.imarea[0].scrollHeight);
            ////及时同步聊天消息到历史列表
            var content =  data.content.replace(/<img\s+name="\[([^\]]+)\][^>]+>/gi, '[$1]');//去掉表情的标签
             content = content.replace(/&nbsp;/gi," ");//替換空格
             content = content.replace(/<div><br><\/div>/gi,"\n");//替換換行
             content = content.replace(/<br><br>/gi,"\n");//狐火替換換行
             content = content.replace(/<br>/gi,"\n");//狐火替換換行
             content = content.replace(/<div>|<\/div>/gi,"");//
             var clearparm =data;
             if(data.chatType=="group"){
                 clearparm.type="group";
             }
             //setMessageReaded(data);
             if(data.chatType=="one"){//单

            	reveiveHistorySync(data,content,new Date);
            }else{//群
                //setMessageReaded(data);
            	reveiveHistoryGroupSync(data,content,new Date)
            }
        }
       
    };
    
    node.sendbtn.on('click', log.send);
    node.imwrite.keyup(function(e){//监听键盘事件
        var temp = node.imwrite.attr("class");
        var i_sentype = $('#layim_sendtype').attr("i_sentype");
    	 // 兼容FF和IE和Opera    
        var theEvent = e || window.event;  
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    	if(i_sentype=="1"){
           // console.log(theEvent.ctrlKey);
            //console.log(theEvent.shiftKey);
            //console.log("------");
    		if(code === 13&&!theEvent.ctrlKey&&!theEvent.shiftKey){//按Enter+没有按ctrl+没有按shift
    			log.send();
    		}
    		if(code === 13&&theEvent.ctrlKey){//按Enter+按ctrl= 换行
    		}
    	}else{
    		if(theEvent.ctrlKey&&code === 13){
    			log.send();
    		}
    	}
    });
};
//消息传输






function formateDate_hmi(date) {
    //var y = date.getFullYear();
    //var m = date.getMonth() + 1;
   // var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    h = h > 9 ? h : '0' + h;
    mi = mi > 9 ? mi : '0' + mi;
    return  h + ':' + mi;
}

//事件
xxim.event = function(){
    var node = xxim.node;
    
    //主界面tab//历史信息||讨论组||好友||点击
    node.tabs.eq(0).addClass('xxim_tabnow');
    node.tabs.on('click', function(){
    	node.tabs.eq(0).find("i").attr("class","xx_imx_sprite xxim_clock-o");//历史图标点击去除闪
        var othis = $(this), index = othis.index();
        xxim.tabs(index);
    });
    
    //列表展收
    node.list.on('click', 'h5', function(){
        var othis = $(this), chat = othis.siblings('.xxim_chatlist'), parentss = othis.find("i");
        if(parentss.hasClass('fa-caret-down')){
            chat.hide();
            parentss.attr('class','fa fa-caret-right');
        } else {
            chat.show();
            parentss.attr('class','fa fa-caret-down');
        }
    });
    
    //设置在线隐身
    node.online.on('click', function(e){
        config.stopMP(e);
        node.setonline.show();
    });
    node.setonline.find('span').on('click', function(e){
        var index = $(this).index();
        config.stopMP(e);
        if(index === 0){
            node.onlinetex.html('在线');
            node.online.removeClass('xxim_offline');
        } else if(index === 1) {
            node.onlinetex.html('隐身');
            node.online.addClass('xxim_offline');
        }
        node.setonline.hide();
    });
    
    node.xximon.on('click', xxim.expend);
    node.xximHide.on('click', xxim.expend);
    
    //搜索
    node.xximSearch.keyup(function(){
        var val = $(this).val().replace(/\s/g, '');
        if(val !== ''){
            node.searchMian.show();
            node.closeSearch.show();
            //此处的搜索ajax参考xxim.getDates
            node.list.eq(0).hide();
            node.list.eq(1).hide();
            node.list.eq(2).hide();
            //好友列表
            var pinyin ="",pinyinHead="", liname="",li_html="",isHasli=false;
            node.list.eq(2).find("ul.xxim_chatlist").find("li").each(function(){
            	pinyin = $(this).attr("pinyin");
            	pinyinHead = $(this).attr("pinyinHead");
            	liname = $(this).find("span.xxim_onename").text();
            	if(pinyin.indexOf(val)!=-1||pinyinHead.indexOf(val)!=-1||liname.indexOf(val)!=-1){
            		isHasli=true;
            		li_html+=$(this).prop("outerHTML");
            		
            	}
            });
            //讨论组列表
            node.list.eq(1).find("ul.xxim_chatlist").find("li").each(function(){
            	pinyin = $(this).attr("pinyin");
            	pinyinHead = $(this).attr("pinyinHead");
            	liname = $(this).find("span.xxim_onename").text();
            	if(pinyin.indexOf(val)!=-1||pinyinHead.indexOf(val)!=-1||liname.indexOf(val)!=-1){
            		isHasli=true;
            		li_html+=$(this).prop("outerHTML");
            		
            	}
            });
            
            if(isHasli){
            	node.list.eq(3).html('<li class="xxim_parentnode"><ul class="xxim_chatlist">'+li_html+'</ul></li>');
            }else{
            	node.list.eq(3).html('<li class="xxim_errormsg">没有符合条件的结果</li>');
            }
        } else {
            node.searchMian.hide();
            node.closeSearch.hide();
            $("#xxim_tabs").find("span.xxim_tabnow").trigger("click");
        }
    });
    node.closeSearch.on('click', function(){
        $(this).hide();
        node.searchMian.hide();
        node.xximSearch.val('').focus();
    });
    
    //好友讨论组弹出聊天窗 点击某人mxp
    config.chatings = 0;
    node.list.on('click', '.xxim_childnode', function(){
       var othis = $(this);
       if($(othis).find("em.xxim_time").html()){//点击历史消息的列表中的任何一个人去除闪烁
    	   if(node.tabs.eq(0).find("i").attr("class")=="xx_imx_sprite xxim_clock-o message-alert_clock-o"){
    		   node.tabs.eq(0).find("i").attr("class","xx_imx_sprite xxim_clock-o");
    	   }
    	   if($(othis).attr("class").indexOf("xxim_chatlist-color")>=0){//历史消息中人点击后名字不变色
    		   $(othis).attr("class","xxim_childnode");
    	   }
       }
        //console.log("=||=="+$(othis).html());
        xxim.popchatbox(othis);
    });
    
    //点击最小化栏
    node.layimMin.on('click', function(){
        $(this).hide();
        $('#layim_chatbox').parents('.xubox_layer').show();
    });
    
    
    //document事件
    dom[1].on('click', function(){
        node.setonline.hide();
        $('#layim_sendtype').hide();
    });
};


//请求列表数据 好友列表
xxim.getDates = function(index){
    var api = [ config.api.chatlog, config.api.group,config.api.friend],
        node = xxim.node, myf = node.list.eq(index);
    myf.addClass('loading');
    if(index>0){
    	 config.json(api[index], {}, function(datas){
    		 if(datas.type =="friend"){//好友列表
    	    		var i = 0, myflen = datas.data.length, str = '', item;
    	            if(myflen>0){
    	            	item = datas.data;
    	            	str+='<li class="xxim_parentnode"><ul class="xxim_chatlist">';
    	            	for(var j = 0; j < item.length; j++){
    	            		str += '<li pinyin="'+item[j].pinyin+'" pinyinHead="'+item[j].pinyinHead+'" data-id="'+ item[j].id +'" class="xxim_childnode" type="'+ (index === 2 ? 'one' : 'group') +'"><img src=".'+ (item[j].photo!=''?item[j].photo:'/theme/img/010927810.jpg') +'" class="xxim_oneface"><span class="xxim_onename">'+ item[j].name +'</span><span class="xxim_twospan">'+item[j].orgName+'</span></li>';
    	            	}
    	            	str += '</ul></li>';
    	            
    	            }else {
    	            	str+="<li class='xxim_errormsg'>没有任何数据</li>";
    	            }
    	            $(myf).append(str);
    	    
    	            myf.removeClass('loading');
    	        }else if(datas.type =="discussion"){//讨论组
    	        	 var i = 0, myflen = datas.data.length, str = '', item;
    	             if(myflen >= 1){
    	            	 str += '<li class="xxim_parentnode"><ul class="xxim_chatlist">';
    	            	 for(i=0; i < myflen; i++){
    	            		 var groupPhoto='<div class="Group-picture">';
    	            		 var groupPhotos = datas.data[i].groupPhoto;
        	            	 //console.dir(groupPhotos);
        	            	 if(groupPhotos!=null&&groupPhotos.length>0){
        	            		 for (var j = 0; j < groupPhotos.length; j++) {
        	            			 groupPhoto+='<img src=".'+groupPhotos[j]+'" class="xxim_oneface">';
    							}
        	            	 }
        	            	 groupPhoto+='</div>';
        	            	 /*
        	            	 console.error(groupPhoto);*/
        	            	 str += '<li  pinyin="'+datas.data[i].pinyin+'" pinyinHead="'+datas.data[i].pinyinHead+'"  data-discu-ownerId="'+datas.data[i].ownerId+'" data-id="'+ datas.data[i].id +'" data-discu-id="'+datas.data[i].discussionIdRy+'" class="xxim_childnode" type="group">'+groupPhoto+'<span class="xxim_onename">'+ datas.data[i].discussionName +'</span><em class="xxim_nums">（'+ datas.data[i].nums +'）</em></li>';
    	            		 //str += '<li onmousedown="qixinonmousedown(this);" pinyin="'+datas.data[i].pinyin+'" pinyinHead="'+datas.data[i].pinyinHead+'"  data-discu-ownerId="'+datas.data[i].ownerId+'" data-id="'+ datas.data[i].id +'" data-discu-id="'+datas.data[i].discussionIdRy+'" class="xxim_childnode" type="group">'+groupPhoto+'<span class="xxim_onename">'+ datas.data[i].discussionName +'</span><em class="xxim_nums">（'+ datas.data[i].nums +'）</em></li>';
    	            	 }
    	            	 str += '</ul></li>';
    	               
    	                 myf.html(str);
    	             } else {
    	                // myf.html('<div><a id="createOneDiscussion">创建讨论组</a></div><li class="xxim_errormsg">没有任何数据</li>');
    	            	  myf.html('<li class="xxim_errormsg">没有任何数据</li>');
    	             }
    	             myf.removeClass('loading');
    	        } else {
    	            myf.html('<li class="xxim_errormsg">'+ datas.msg +'</li>');
    	        }
    	    }, function(){
    	        myf.html('<li class="xxim_errormsg">请求失败</li>');
    	        myf.removeClass('loading');
    	    });
    }else{//获取历史会话列表
    	// qixinConversationList();
    	 RongIMClient.getInstance().getConversationList({
 			onSuccess: function(list) {
 				if(list!=null&&list.length>0){
 					var qixinCurrentUserId = $("#qixinCurrentUserId").val();
 					var myfriends = node.list.eq(2);//好友列表
 					var mydisucssions = node.list.eq(1);//讨论组列表
 					myf.html('<li class="xxim_liston"><ul class="xxim_chatlist"></ul></li>');//清空历史消息列表
 					var unreadMessageClass="";
 					var hisContent="";
 					for (var i = 0; i < list.length; i++) {
 						//console.log("========历史会话消息列表=======");
 						//console.dir(list[i]);
 						var param = {
 								id: list[i].targetId, //用户ID
 								type: list[i].conversationType==1?"one":"group",//单聊还是讨论组
 								dicRyId:list[i].latestMessage.targetId,//融云讨论组id
 								name: myfriends.find("li[data-id='"+list[i].targetId+"']").find('.xxim_onename').text(),  //用户名
 								photo: myfriends.find("li[data-id='"+list[i].targetId+"']").find('.xxim_oneface').attr('src'),  //用户头像
 								href: 'javascript:;' //用户主页
 						}
 						if(list[i].unreadMessageCount){
 							unreadMessageClass="xxim_chatlist-color";
 						}else{
 							unreadMessageClass="";
 						}
 						//判断消息是文字 还是图片还是表情
 						var contentObj = list[i].latestMessage.content;
 						if(contentObj.messageName=="TextMessage"){
                            try {
                                hisContent = RongIMLib.RongIMEmoji.emojiToSymbol(contentObj.content);
                            } catch (e) {
                                hisContent = RongIMLib.RongIMEmoji.emojiToSymbol(contentObj.extra);
                            }
 							//hisContent=RongIMLib.RongIMEmoji.emojiToHTML(contentObj.content);
 						}else if(contentObj.messageName=="ImageMessage"){
 							hisContent="[图片]";
 						}else{
 							continue;
 						}
 						
 						if(param.type=="one"){
 							//if(list[i].latestMessage.senderUserId!=qixinCurrentUserId){
 								var his = '<li data-id="'+ param.id +'" class="xxim_childnode '+unreadMessageClass+'" type="one"><img src="'+ param.photo +'"  class="xxim_oneface"><span  class="xxim_onename">'+ param.name +'</span><em class="xxim_time">'+ formateDate_hmi(new Date(list[i].sentTime)) +'</em><span class="xxim_twospan">'+hisContent+'</span></li>'; 
 								myf.find(".xxim_chatlist").prepend(his);
 							//}
 							
 						}else if(param.type=="group"){
 							
 							var his= mydisucssions.find("ul.xxim_chatlist").find("li[data-discu-id='"+param.dicRyId+"']").prop("outerHTML");
 							myf.find(".xxim_chatlist li[data-discu-id='"+param.dicRyId+"']").remove();
 							myf.find(".xxim_chatlist").prepend(his);
 							if(list[i].unreadMessageCount){
 								myf.find(".xxim_chatlist").find("li[data-discu-id='"+param.dicRyId+"']").addClass("xxim_chatlist-color");
 							}
 							myf.find(".xxim_chatlist").find("li[data-discu-id='"+param.dicRyId+"']").append('<em class="xxim_time">'+ formateDate_hmi(new Date(list[i].sentTime)) +'</em><span class="xxim_twospan">'+hisContent+'</span>');
 							
 							/*
 							var his= mydiscussions.find("ul.xxim_chatlist").find("li[data-discu-id='"+param.dicRyId+"']");
 							var his_= mydiscussions.find("ul.xxim_chatlist").find("li[data-discu-id='"+param.dicRyId+"']").html();
 							var data_discu_id = $(his).attr("data-discu-id");
 							var data_id = $(his).attr("data-id");
 							var id = $(his).attr("id");
 							var data_discu_ownerId = $(his).attr("data-discu-ownerId");
 							var his_html = '<li id="'+id+'" data-discu-ownerId="'+data_discu_ownerId+'" data-id="'+ data_id +'" data-discu-id="'+data_discu_id+'" class="xxim_childnode" type="group">'+his_+'<em class="xxim_time">'+ formateDate_hmi(new Date) +'</em><span class="xxim_twospan">'+hisContent+'</span></li>'
 							*/
 						}
 						/*
 						var firstChildClass = $(myhistorys).find("li").eq(0).attr("class");
 						if(firstChildClass=="xxim_errormsg"||$(myhistorys).find("li").length==0){
 							var _html='<li class="xxim_liston"><ul class="xxim_chatlist">'+his+'</ul></li>';
 							myhistorys.append(_html);
 						}else{
 							myhistorys.find(".xxim_chatlist li[data-id='"+param.id+"']").remove();
 							
 						}*/
 					}
 					
 				}else{//没有会话列表
 					myf.html('<li class="xxim_errormsg">没有任何数据</li>');
 					
 				}
 				 myf.removeClass('loading');
 			},
 			onError: function(error) {
 				// do something.
 			}
 		},null);
    	 myf.removeClass('loading');
    }
};
//设置消息已读
function setMessageReaded(param){
	var targetId = param.id;
	var conversationType =1;//默认私聊
	if(param.type=="group"){
		targetId = param.dicRyId;
		conversationType=2;
	}
	RongIMClient.getInstance().clearUnreadCount(conversationType,targetId,{
		   onSuccess:function(isClear){
		  			// isClear true 清除成功 ， false 清除失败
			   //console.log("clear Success");
		   },
		   onError:function(){
		       //清除遇到错误。
		   }
		 });
	
}



$(document).ready(function(){
	var demo5Rows = {
	  '1': { first_name: 'John', last_name: 'Martin', is_editable: true },
	  '2': { first_name: 'Peter', last_name: 'Roberts', is_editable: true },
	  '3': { first_name: 'Stuart', last_name: 'Smith', is_editable: false }
	};
	
	


});
var timer_rongyun;
var timer_num = 5;
$("#qixinChat_body").delegate("#xxim_bottom","click",function(){
	var node = xxim.node;
	node.list.eq(2).html('');
	xxim.getDates(2);//加载好友
	xxim.getDates(1);//加载讨论组
	var twinkle = $(this).find("li[id='xxim_hide']").attr("twinkle");
	if(twinkle=="true"){//如果企信图标闪，则打开企信图标后历史图标闪，企信图标不闪
		$('#xximmm').find('i.xxim_clock-o').attr("class","xx_imx_sprite xxim_clock-o message-alert_clock-o");
		$("#xximmm").find("li[id='xxim_hide']").attr("class","xxim_hide");
		$("#xximmm").find("li[id='xxim_hide']").attr("twinkle","false");
	}
	if(rongyunConnectionSuccess){
		xxim.getDates(0);
	}else{
		rongyunConnect();
	}
});

function rongyunConnect(){
	if(rongyunConnectionSuccess){
		xxim.getDates(0);
		timer_num =5;
		clearTimeout(timer_rongyun);
		 return ;
	}
	if(timer_num<0&&!rongyunConnectionSuccess){
		timer_num =5;
		clearTimeout(timer_rongyun);
		alert("请刷新页面试试~");
		 return ;
	}else{
		timer_num--;
	}
	timer_rongyun = setTimeout(rongyunConnect,1000);
}


//渲染骨架
xxim.view = (function(){
    var xximNode = xxim.layimNode = $('<div id="xximmm" class="xxim_main" style="right: -298px;" state="1">'
	+'<div style=" width:265px;float: left;">'
        	+'<div style=" width:45px;display: inline-block;" class="xxim_tabs" id="xxim_tabs">'
        	+'<span class="xxim_latechat"  title="最近聊天"><i class="xx_imx_sprite xxim_clock-o"></i></span>'
        	+'<span class="xxim_tabgroup" title="群组"><i class="xx_imx_sprite xxim_users"></i></span>'
        	+'<span class="xxim_tabfriend" title="好友"><i class="xx_imx_sprite xxim_user"></i></span>'
        	+'</div>'
            +'<div style=" width: calc(100% - 45px);display: inline-block;" class="xxim_top" id="xxim_top">'
            +'  <div class="xxim_search"><input id="xxim_searchkey" /><span id="xxim_closesearch">×</span><a title="创建讨论组" id="createOneDiscussion" class="xxim_search-but"></a></div>'
            
            +'  <ul class="xxim_list" style="display:block"></ul>'
            +'  <ul class="xxim_list"> ' 
           // +'  <div><a>创建讨论组</a></div>'
            +'  </ul>'
            +'  <ul class="xxim_list"></ul>'
            +'  <ul class="xxim_list xxim_searchmain" id="xxim_searchmain"></ul>'
            +'</div>'
	+'</div>'
            +'<ul  class="xxim_bottom xxim_expend" id="xxim_bottom" style="margin-left: -298px;">'
   
            +'<li class="xxim_hide xxim_show" id="xxim_hide"><i class="xxim_exchange"></i></li>'
            //+'<li id="xxim_on" class="xxim_icon xxim_on fa fa-ellipsis-v"></li>'
            +'<div class="layim_min" id="layim_min"></div>'
        +'</ul>'
    +'</div>');
    dom[3].append(xximNode);
    
    xxim.renode();
    xxim.event();
    xxim.layinit();
    xxim.drawExpressionWrap();
}());

}(window);

