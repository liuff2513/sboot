<script>
var isGetTokenNum=false;
var quitDiscussionFlag=true;
var rongyunConnectionSuccess=false;//融云连接是否成功！

$(function(){
	// 初始化
	// RongIMClient.init(appkey, [dataAccessProvider]);
	// appkey:官网注册的appkey。
	// dataAccessProvider:自定义本地存储方案的实例，不传默认为内存存储，自定义需要实现WebSQLDataProvider所有的方法，此参数必须是传入实例后的对象。
	var rongyunkey ="${rongyunKey?default('')}";
	//console.log("rongyunkey"+rongyunkey);
	RongIMClient.init(rongyunkey);//正式
	RongIMLib.RongIMEmoji.init();
	var token = "${(Session['_USER_LOGIN_'].rongyToken)?default('')}";
	var  currentUser = {
		"id":"${(Session['_USER_LOGIN_'].id)?default('')}",
		"name":"${(Session['_USER_LOGIN_'].name)?default('')}",
		"photo":"${(Session['_USER_LOGIN_'].photo)?default('./theme/img/010927810.jpg')}"
	};
	// 连接融云服务器。
	if(!rongyunConnectionSuccess){
		rongyunConnect(token);
	}
	
	function rongyunConnect(token){
		RongIMClient.connect(token, {
			onSuccess: function(userId) {
				console.log("Login successfully.");
				 rongyunConnectionSuccess=true;
			},
			onTokenIncorrect: function() {
				console.log('token无效');
				if(!isGetTokenNum){
					//重新请求获得融云新token
					$.ajax({
						url:'./qixinChat/getRongyToken',
						type:'post',
						success:function(data){
							console.log('isGetTokenNum---'+isGetTokenNum);
							isGetTokenNum=true;
							rongyunConnect(data);
						},
						error:function(data){
							isGetTokenNum=true;
						}
					
					});
				}
			},
			onError:function(errorCode){
				var info = '';
				switch (errorCode) {
				case RongIMLib.ErrorCode.TIMEOUT:
					info = '超时';
					break;
				case RongIMLib.ErrorCode.UNKNOWN_ERROR:
					info = '未知错误';
					break;
				case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
					info = '不可接受的协议版本';
					break;
				case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
					info = 'appkey不正确';
					break;
				case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
					info = '服务器不可用';
					break;
				}
				console.log(errorCode);
			}
		});
		
	}
	
	
	// 设置连接监听状态 （ status 标识当前连接状态）
	 // 连接状态监听器
	 RongIMClient.setConnectionStatusListener({
	    onChanged: function (status) {
	        switch (status) {
	            //链接成功
	            case RongIMLib.ConnectionStatus.CONNECTED:
	                console.log('链接成功-----');
	                rongyunConnectionSuccess=true;
	                break;
	            //正在链接
	            case RongIMLib.ConnectionStatus.CONNECTING:
	                console.log('正在链接');
	                break;
	            //重新链接
	            case RongIMLib.ConnectionStatus.DISCONNECTED:
	                console.log('断开连接');
	                break;
	            //其他设备登陆
	            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
	                console.log('其他设备登陆');
	                break;
	              //网络不可用
	            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
	              console.log('网络不可用');
	              break;
	            }
	    }});
	 //注册一个自定义消息
     RongIMClient.registerMessageType('qixinMessageAndNotice','KM:TxtMsg',new RongIMLib.MessageTag(true,true),['content']);
	 // 消息监听器
	 RongIMClient.setOnReceiveMessageListener({
	    // 接收到的消息
	    onReceived: function (message) {
	      	//console.dir(message);
	          // 判断消息类型
	        switch(message.messageType){
	            case RongIMClient.MessageType.TextMessage:
	            	// 发送的消息内容将会被打印
            		if(message.conversationType=="1"){
            			qixinReveive(message);
            		}else if(message.conversationType=="2"){
            			qixinReveiveGroup(message);
            		}
	                break;
	            case RongIMClient.MessageType.VoiceMessage:
	                // 对声音进行预加载                
	                // message.content.content 格式为 AMR 格式的 base64 码
	                RongIMLib.RongIMVoice.preLoaded(message.content.content);
	                break;
	            case RongIMClient.MessageType.ImageMessage:
	                // do something...
	            	//console.log("====图片消息=====");
	            	//console.dir(message); 
	            	if(message.conversationType=="1"){
		                	qixinReveive(message); 
		                }else if(message.conversationType=="2"){
		                	qixinReveiveGroup(message); 
		                }
	                break;
	            case RongIMClient.MessageType.DiscussionNotificationMessage:
	                // do something...
	                break;
	            case RongIMClient.MessageType.LocationMessage:
	                // do something...
	                break;
	            case RongIMClient.MessageType.RichContentMessage:
	                // do something...
	                break;
	            case RongIMClient.MessageType.DiscussionNotificationMessage:
	                // do something...
	                break;
	            case RongIMClient.MessageType.InformationNotificationMessage:
	                // do something...
	                break;
	            case RongIMClient.MessageType.ContactNotificationMessage:
	                // do something...
	                break;
	            case RongIMClient.MessageType.ProfileNotificationMessage:
	                // do something...
	                break;
	            case RongIMClient.MessageType.CommandNotificationMessage:
	                // do something...
	                break;
	            case RongIMClient.MessageType.CommandMessage:
	                // do something...
	                break;
	            case RongIMClient.MessageType.UnknownMessage:
	                // do something...
	                break;
	            case RongIMClient.MessageType.qixinMessageAndNotice:
	            	//console.log("====自定义消息=====");
	            	//console.dir(message);
	            	// //企信消息自定义接收处理
	            	addQixinUnreadDatasNum(message);
	            	
	            	
	            	break;
	            default:
	                // 自定义消息
	                // do something...
	        }
	    }
	});
	 
	 RongIMClient.setConnectionStatusListener({
		 onChanged:function(status){
			// console.dir("|||||||"+status);
			 	
		 }
		});

	
});

</script>
<script>


/**
 * 发送消息
 * @returns
 */
   function sendQixinMessage (data,flag){
	  var con ="";
	  var msg=null;
	  var conhtml="";
	  if(flag=="1"){//发送文字+表情
		   con = data.content.replace(/<img\s+name="\[([^\]]+)\][^>]+>/gi, '[$1]');//去掉表情标签
           con = RongIMLib.RongIMEmoji.symbolToEmoji(con);
           conhtml = con;
		   con = con.replace(/&nbsp;/gi," ");//替換空格
		   con = con.replace(/<div><br><\/div>/gi,"\n");//替換換行
          // con = con.replace(/<br><br>/gi,"\n");//狐火替換換行
           con = con.replace(/<br>/gi,"\n");//狐火替換換行
           con = con.replace(/<\/div>/gi,"");//
           con = con.replace(/<div>/gi,"\n");//

		   msg = new RongIMLib.TextMessage({content:con,extra:conhtml});
	  }else if(flag=="2"){//发送图片
		  	msg = new RongIMLib.ImageMessage({"content":data.content,"imageUri":data.imageUri});
		  //msg =RongIMClient.RichContentMessage.obtain('test',con,data.content);
		 // msg = new RongIMLib.TextMessage({content:"22",extra:""});
		 // msg = new RichContentMessage({"title":"News", "content":"I'm Ironman.", "imageUri":"http://p1.cdn.com/fds78ruhi.jpg", extra:""});
	  }else{
		  
	  }
	  
	// 定义消息类型,文字消息使用 RongIMLib.TextMessage
	 //或者使用RongIMLib.TextMessage.obtain 方法.具体使用请参见文档
	 //var msg = RongIMLib.TextMessage.obtain("hello");
	 var conversationtype = RongIMLib.ConversationType.PRIVATE; // 1:私聊
	 var targetId = data.id; // 目标 Id
	 if(data.chatType=="group"){
		 conversationtype=RongIMLib.ConversationType.DISCUSSION; //2:讨论组
		 targetId=data.dicRyId;//融云讨论组id//dicRyId
	 } //console.dir(msg);
		 RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
	         // 发送消息成功
	         onSuccess: function (message) {
		             //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
		             console.log("Send successfully");
		             return message;
		         },
		         onError: function (errorCode,message) {
		             var info = '';
		             switch (errorCode) {
		                 case RongIMLib.ErrorCode.TIMEOUT:
		                     info = '超时';
		                     break;
		                 case RongIMLib.ErrorCode.UNKNOWN_ERROR:
		                     info = '未知错误';
		                     break;
		                 case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
		                     info = '在黑名单中，无法向对方发送消息';
		                     break;
		                 case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
		                     info = '不在讨论组中';
		                     break;
		                 case RongIMLib.ErrorCode.NOT_IN_GROUP:
		                     info = '不在群组中';
		                     break;
		                 case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
		                     info = '不在聊天室中';
		                     break;
		                 default :
		                     info = x;
		                     break;
		             }
		             console.log('发送失败:' + info);
		         }
		     }
		 );
	
 }
  //执行发送消息
  function sendQixinMessageDo(conversationtype,targetId,msg){
		
  }
  
  
  //
  function formateDate_hmi(date) {
	    var h = date.getHours();
	    var mi = date.getMinutes();
	    h = h > 9 ? h : '0' + h;
	    mi = mi > 9 ? mi : '0' + mi;
	    return  h + ':' + mi;
	}
  var xxim={};
  var node = xxim.node = {
	        tabs: $('#xximmm #xxim_tabs>span'),
	        list: $('#qixinChat_body').find('.xxim_list'),
	        online: $('.xxim_online'),
	        setonline: $('.xxim_setonline'),
	        onlinetex: $('#xxim_onlinetex'),
	        xximon: $('#xxim_on'),
	        layimFooter: $('#xxim_bottom'),
	        xximHide: $('#xxim_hide'),
	        xximSearch: $('#xxim_searchkey'),
	        searchMian: $('#xxim_searchmain'),
	        closeSearch: $('#xxim_closesearch'),
	        layimMin: $('#layim_min')
	    };
  //获取某个人的历史消息
  function qixinReveive_history(list,targetId){
	  var qixinCurrentUserId = $("#qixinCurrentUserId").val();
	  var qixinCurrentUserName = $("#qixinCurrentUserName").val();
	  var qixinCurrentUserPhoto = $.trim($("#qixinCurrentUserPhoto").val())!=""&&$("#qixinCurrentUserPhoto").val()!=null?$.trim($("#qixinCurrentUserPhoto").val()):'/theme/img/010927810.jpg';
	  var myfriends = $('#qixinChat_body').find('.xxim_list').eq(2),//好友列表
	  	  myhistorys = $('#qixinChat_body').find('.xxim_list').eq(0),//历史消息列表
	  	senderUserId,conversationType,param={},content,theName,thePhoto;	
	  theName = myfriends.find("li[data-id='"+targetId+"']").find('.xxim_onename').text();  //用户名
	  thePhoto = myfriends.find("li[data-id='"+targetId+"']").find('.xxim_oneface').attr('src');  //用户头像
	  if(list!=null&&list.length>0){
		  for (var i = list.length-1; i >-1; i--) {
			  	senderUserId = list[i].senderUserId;//消息发送人
			  	conversationType = list[i].conversationType;
			  //	console.dir(list[i]);
			  	if(list[i].messageType=="ImageMessage"){//如果是图片
			  		//debugger;console.dir(list[i]);
			  		var rongyunpic =  list[i].content.imageUri;
			  		var smallpic= list[i].content.content;
			  		//if(rongyunpic!=null&&rongyunpic.indexOf("rongcloud-image")!=-1){
			  		if(smallpic){
			  			smallpic = "data:image/png;base64,"+smallpic;
			  		}
			  		//}
					content = '<div class="ibox float-e-margins"><div class=""> <div class="lightBoxGallery"><div class="coms-reps-pic-a"><a href="'+list[i].content.imageUri+'" title="图片" data-gallery=""><img src="'+smallpic+'"></a></div><div id="blueimp-gallery" class="blueimp-gallery"> <div class="slides"></div><h3 class="title"></h3><a class="prev">‹</a> <a class="next">›</a>  <a class="close">×</a>  <a class="play-pause"></a> <ol class="indicator"></ol> </div></div></div></div>';
				}else{
					if(list[i].content.content){
						content = RongIMLib.RongIMEmoji.emojiToHTML(list[i].content.content);
					}else if(list[i].content.extra){
                        content = RongIMLib.RongIMEmoji.emojiToHTML(list[i].content.extra);
                    }else{//1
						continue;
					}
				}
				//参数
				param={
						id:targetId,//打开的聊天框id
						type:list[i].conversationType==1?"one":"group",
						//time: formateDate_hmi(new Date(list[i].receivedTime)),
						time: formateDate_hmi(new Date(list[i].sentTime)),
						content:content
				}
			  
			  if(senderUserId==qixinCurrentUserId){//发送人是自己
				  param.name=qixinCurrentUserName;//我的名字
				  param.photo="."+qixinCurrentUserPhoto;//我的头像
				  sendOneMessage(param,'me');
			  }else{
				  if(conversationType==2){//讨论组
					 theName = myfriends.find("li[data-id='"+senderUserId+"']").find('.xxim_onename').text();  //用户名
					 thePhoto = myfriends.find("li[data-id='"+senderUserId+"']").find('.xxim_oneface').attr('src');  //用户头像
				  }
				  param.name = theName;  //用户名
				  param.photo = thePhoto;  //用户头像
				  sendOneMessage(param,'');
			  }
		}
          //定位
          var id = "#layim_area"+param.type+param.id;
          var linum= $(id).find("li").length;
          if(linum!=0){
          var nOffsetTop;
		  if(linum%5!=0){
              nOffsetTop =  $(id).find("li").eq((linum%5-1))[0].offsetTop;
		  }else{
              nOffsetTop =  $(id).find("li").eq(3)[0].offsetTop;
		  }
		  
         //
         	 $(id).animate({scrollTop:nOffsetTop},"fast");
          //log.imarea.scrollTop(log.imarea[0].scrollHeight);
		  }
	  }
	 
  }
  
  //发送一个消息
 function sendOneMessage(param,me){
	 
	 var keys = param.type + param.id,log={};
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
     
     log.imarea = $('#layim_chatbox').find('#layim_area'+ keys);
     //自己参数源
     log.imarea.prepend(log.html(param, me));
     // node.imwrite.html('').focus();

 } 
  
  
  //接收好友私聊消息
  function qixinReveive (message){
	  var myfriends = $('#qixinChat_body').find('.xxim_list').eq(2);//好友列表
	  var myhistorys = $('#qixinChat_body').find('.xxim_list').eq(0);//历史消息列表
	   var log = {};
		var param = {
	        id: message.senderUserId, //用户ID
	        type: "one",//单聊还是讨论组
	        name: myfriends.find("li[data-id='"+message.senderUserId+"']").find('.xxim_onename').text(),  //用户名
	        photo: myfriends.find("li[data-id='"+message.senderUserId+"']").find('.xxim_oneface').attr('src')  //用户头像
	    }, key = param.type + message.senderUserId;
		var qixinCurrentUserId = "${Session['_USER_LOGIN_'].id?default('')}";
	   if(param.id==qixinCurrentUserId){
			return ;
		}


		 xxim.nowchat = param;
		var hisContent="";//历史消息显示第一句话或者图片
		if(message.messageType=="ImageMessage"){
			hisContent="[图片]";
		}else if(message.messageType=="TextMessage"){
            try {
                hisContent = RongIMLib.RongIMEmoji.emojiToSymbol(message.content.extra);
            } catch (e) {
                if(message.content.content){
                    hisContent = RongIMLib.RongIMEmoji.emojiToSymbol(message.content.content);
                }else{
                    return;
                }
            }
		}
		 //var 
		//发送
		 var keys = xxim.nowchat.type + xxim.nowchat.id;
		log.receive= function(){
			
			//此处皆为模拟
			
			//聊天模版
			log.html = function(param, type){
				return '<li class="'+ (type === 'me' ? 'layim_chateme' : '') +'">'
				+'<div class="layim_chatuser">'
				+ function(){
					if(type === 'me'){
						return '<span class="layim_chattime">'+ param.time +'</span>'
						+'<span class="layim_chatname">'+ param.name +'</span>'
						+'<img src="'+ (param.photo!=null?param.photo:'') +'" >';
					} else {
						return '<img src="'+ (param.photo!=null?param.photo:'') +'" >'
						+'<span class="layim_chatname">'+ param.name +'</span>'
						+'<span class="layim_chattime">'+ param.time +'</span>';      
					}
				}()
				+'</div>'
				+'<div class="layim_chatsay">'+ param.content +'<em class="layim_zero"></em></div>'
				+'</li>';
			};
			
			log.imarea = $('#layim_chatbox').find('#layim_area'+ keys);
			var str = "";
			if(message.messageType=="ImageMessage"){//如果是图片
				//str ='<a data-gallery="" href="'+message.content.imageUri+'"><img src="'+message.content.content+'" ></a>';
				var rongyunpic =  message.content.imageUri;
		  		var smallpic= message.content.content;
		  		//if(rongyunpic!=null&&rongyunpic.indexOf("rongcloud-image")!=-1){
		  		if(smallpic){
		  			smallpic = "data:image/png;base64,"+smallpic;
		  		}
		  		//}
				str = '<div class="ibox float-e-margins"><div class=""> <div class="lightBoxGallery"><div class="coms-reps-pic-a"><a href="'+message.content.imageUri+'" title="图片" data-gallery=""><img src="'+smallpic+'"></a></div><div id="blueimp-gallery" class="blueimp-gallery"> <div class="slides"></div><h3 class="title"></h3><a class="prev">‹</a> <a class="next">›</a>  <a class="close">×</a>  <a class="play-pause"></a> <ol class="indicator"></ol> </div></div></div></div>';
			}else{
				try {
					str = RongIMLib.RongIMEmoji.emojiToHTML(message.content.content);
				} catch (e) {
					if(message.content.extra){
						str = RongIMLib.RongIMEmoji.emojiToHTML(message.content.extra);
					}else{
						return ;
					}
				}
			}
			log.imarea.append(log.html({
				time: formateDate_hmi(new Date(message.receivedTime)),
				name: param.name,
				photo: param.photo,
				content: str//message.content.content
			}));
			log.imarea.scrollTop(log.imarea[0].scrollHeight);
			
		};
		//非正在聊天
		log.reveiveHistory = function (hisContent,receivedTime){
			var theShowChatBox = $('#layim_chatbox').find('#layim_area'+ keys).attr("id");
			var classcolor="xxim_chatlist-color";
			if(theShowChatBox!=null){//正在聊天
				classcolor="";
			}
			var his = '<li data-id="'+ param.id +'" class="xxim_childnode '+classcolor+'" type="one"><img src="'+ param.photo +'"  class="xxim_oneface"><span  class="xxim_onename">'+ param.name +'</span><em class="xxim_time">'+ formateDate_hmi(new Date(receivedTime)) +'</em><span class="xxim_twospan">'+hisContent+'</span></li>'; 
			var firstChildClass = $(myhistorys).find("li").eq(0).attr("class");
			if(firstChildClass=="xxim_errormsg"||$(myhistorys).find("li").length==0){
				var _html='<li class="xxim_liston"><ul class="xxim_chatlist">'+his+'</ul></li>';
				myhistorys.html('');
				myhistorys.append(_html);
				
			}else{
				myhistorys.find(".xxim_chatlist li[data-id='"+param.id+"']").remove();
				myhistorys.find(".xxim_chatlist").prepend(his);
				
			}
		};
		//判断是正在聊天还是非正在聊天
		var theShowChatBox = $('#layim_chatbox').find('#layim_area'+ keys).attr("id");
		if(theShowChatBox!=null){
			log.receive();
		}else{
			var xxim_bottom_class= $("#xximmm").find("#xxim_bottom").attr("class");
			if(xxim_bottom_class=="xxim_bottom xxim_expend"){//企信图标没打开，企信图标闪
				$("#xximmm").find("li[id='xxim_hide']").attr("class","xxim_hide xxim_show message-alert-bg");
				$("#xximmm").find("li[id='xxim_hide']").attr("twinkle","true");//闪烁标识
			}else{//企信图标打开，历史图标闪
				$('#xximmm').find('i.xxim_clock-o').attr("class","xx_imx_sprite xxim_clock-o message-alert_clock-o");
				
			}
			//alert($(myhistorys).html());
		}
		log.reveiveHistory(hisContent,message.receivedTime);

	};
	//及时同步聊天消息到历史列表
	function reveiveHistorySync(param,hisContent,receivedTime){
	   var myfriends = $('#qixinChat_body').find('.xxim_list').eq(2);//好友列表
	   param.name=myfriends.find("li[data-id='"+param.id+"']").find('.xxim_onename').text();  //用户名
	   param.photo=myfriends.find("li[data-id='"+param.id+"']").find('.xxim_oneface').attr('src');  //用户头像
		var myhistorys = $('#qixinChat_body').find('.xxim_list').eq(0);//历史消息列表
		//历史消息列表闪烁
		//var his = '<li data-id="'+ param.id +'" class="xxim_childnode xxim_chatlist-color" type="one"><img src="'+ param.photo +'"  class="xxim_oneface"><span  class="xxim_onename">'+ param.name +'</span><em class="xxim_time">'+ formateDate_hmi(new Date(receivedTime)) +'</em><span class="xxim_twospan">'+hisContent+'</span></li>'; 
		var his = '<li data-id="'+ param.id +'" class="xxim_childnode" type="one"><img src="'+ param.photo +'"  class="xxim_oneface"><span  class="xxim_onename">'+ param.name +'</span><em class="xxim_time">'+ formateDate_hmi(new Date(receivedTime)) +'</em><span class="xxim_twospan">'+hisContent+'</span></li>'; 
		var firstChildClass = $(myhistorys).find("li").eq(0).attr("class");
		if(firstChildClass=="xxim_errormsg"||$(myhistorys).find("li").length==0){
			var _html='<li class="xxim_liston"><ul class="xxim_chatlist">'+his+'</ul></li>';
			myhistorys.html('');
			myhistorys.append(_html);
			
		}else{
			myhistorys.find(".xxim_chatlist li[data-id='"+param.id+"']").remove();
			myhistorys.find(".xxim_chatlist").prepend(his);
			
		}
	}
	
	
	//讨论组接收消息
	function qixinReveiveGroup (message){
		var myfriends = $('#qixinChat_body').find('.xxim_list').eq(2);//好友列表
		var mydiscussions = $('#qixinChat_body').find('.xxim_list').eq(1);//讨论组列表
		var myhistorys = $('#qixinChat_body').find('.xxim_list').eq(0);//历史消息列表
		var log = {};
		var param = {
				id: message.senderUserId, //用户ID
				type: "group",//单聊还是讨论组
				dicRyId:message.targetId,//融云讨论组id
				name: myfriends.find("li[data-id='"+message.senderUserId+"']").find('.xxim_onename').text(),  //用户名
				photo: myfriends.find("li[data-id='"+message.senderUserId+"']").find('.xxim_oneface').attr('src')  //用户头像
				//href: 'profile.html?user=' + dataId //用户主页
		}, key = param.type + message.senderUserId;
        var qixinCurrentUserId = "${Session['_USER_LOGIN_'].id?default('')}";
        if(param.id==qixinCurrentUserId){
            return ;
        }
		xxim.nowchat = param;
		//通过融云讨论组id 获取当前展开的面板
		var dis_data_id=  mydiscussions.find("li[data-discu-id='"+param.dicRyId+"']").attr("data-id");//讨论组本地的id
		var keys = xxim.nowchat.type + dis_data_id;//聊天框的id
		var hisContent="";
		var hisContent="";//历史消息显示第一句话或者图片
		if(message.messageType=="ImageMessage"){
			hisContent="[图片]";
		}else if(message.messageType=="TextMessage"){
            try {
                hisContent = RongIMLib.RongIMEmoji.emojiToSymbol(message.content.extra);
            } catch (e) {
                if(message.content.content){
                    hisContent = RongIMLib.RongIMEmoji.emojiToSymbol(message.content.content);
                }else{
                    return;
                }
            }

			//hisContent = RongIMLib.RongIMEmoji.emojiToHTML(message.content.content);
		}
		//发送
		log.receive= function(){
			
			//此处皆为模拟
			
			//聊天模版
			log.html = function(param, type){
				return '<li class="'+ (type === 'me' ? 'layim_chateme' : '') +'">'
				+'<div class="layim_chatuser">'
				+ function(){
					if(type === 'me'){
						return '<span class="layim_chattime">'+ param.time +'</span>'
						+'<span class="layim_chatname">'+ param.name +'</span>'
						+'<img src="'+ (param.photo!=null&&param.photo!=''?param.photo:'') +'" >';
					} else {
						return '<img src="'+ (param.photo!=null&&param.photo!=''?param.photo:'') +'" >'
						+'<span class="layim_chatname">'+ param.name +'</span>'
						+'<span class="layim_chattime">'+ param.time +'</span>';      
					}
				}()
				+'</div>'
				+'<div class="layim_chatsay">'+ param.content +'<em class="layim_zero"></em></div>'
				+'</li>';
			};
			
			log.imarea = $('#layim_chatbox').find('#layim_area'+ keys);
			var str = "";
			if(message.messageType=="ImageMessage"){//如果是图片
				//str ='<a data-gallery="" href="'+message.content.imageUri+'"><img src="'+message.content.content+'" ></a>';
				var rongyunpic =  message.content.imageUri;
		  		var smallpic= message.content.content;
		  		//if(rongyunpic!=null&&rongyunpic.indexOf("rongcloud-image")!=-1){
		  		if(smallpic){
		  			smallpic = "data:image/png;base64,"+smallpic;
		  		}	
		  		//}
				str = '<div class="ibox float-e-margins"><div class=""> <div class="lightBoxGallery"><div class="coms-reps-pic-a"><a href="'+message.content.imageUri+'" title="图片" data-gallery=""><img src="'+smallpic+'"></a></div><div id="blueimp-gallery" class="blueimp-gallery"> <div class="slides"></div><h3 class="title"></h3><a class="prev">‹</a> <a class="next">›</a>  <a class="close">×</a>  <a class="play-pause"></a> <ol class="indicator"></ol> </div></div></div></div>';
			}else{
				try {
					str = RongIMLib.RongIMEmoji.emojiToHTML(message.content.extra);
				} catch (e) {
					str = RongIMLib.RongIMEmoji.emojiToHTML(message.content.content);
				}

			}
			log.imarea.append(log.html({
				time: formateDate_hmi(new Date(message.receivedTime)),
				name: param.name,
				photo: param.photo,
				content: str
			}));
			log.imarea.scrollTop(log.imarea[0].scrollHeight);
			
		};
		//非正在聊天
		log.reveiveHistory =function (hisContent,receivedTime){
//			var his= mydiscussions.find("ul.xxim_chatlist").find("li[data-discu-id='"+param.dicRyId+"']").prop("outerHTML");
			var his= mydiscussions.find("ul.xxim_chatlist").find("li[data-discu-id='"+param.dicRyId+"']");
			var his_= mydiscussions.find("ul.xxim_chatlist").find("li[data-discu-id='"+param.dicRyId+"']").html();
			var data_discu_id = $(his).attr("data-discu-id");
			var data_id = $(his).attr("data-id");
			var id = $(his).attr("id");
			var data_discu_ownerId = $(his).attr("data-discu-ownerId");
			var his_html = '<li id="'+id+'" data-discu-ownerId="'+data_discu_ownerId+'" data-id="'+ data_id +'" data-discu-id="'+data_discu_id+'" class="xxim_childnode" type="group">'+his_+'<em class="xxim_time">'+ formateDate_hmi(new Date(receivedTime)) +'</em><span class="xxim_twospan">'+hisContent+'</span></li>'
			 //console.log(his);
			var firstChildClass = $(myhistorys).find("li").eq(0).attr("class");
			if(firstChildClass=="xxim_errormsg"||$(myhistorys).find("li").length==0){
				var _html='<li class="xxim_liston"><ul class="xxim_chatlist"><li>'+his_html+'</ul></li>';
				myhistorys.html('');
				myhistorys.append(_html);
			}else{
				myhistorys.find(".xxim_chatlist li[data-discu-id='"+param.dicRyId+"']").remove();
				myhistorys.find(".xxim_chatlist").prepend(his_html);
				var theShowChatBox = $('#layim_chatbox').find('#layim_area'+ keys).attr("id");
				if(!theShowChatBox){
					myhistorys.find(".xxim_chatlist").find("li[data-discu-id='"+param.dicRyId+"']").addClass("xxim_chatlist-color");
				}
			}
			
		};
		//判断是正在聊天还是非正在聊天
		var theShowChatBox = $('#layim_chatbox').find('#layim_area'+ keys).attr("id");
		if(theShowChatBox!=null){
			log.receive();
		}else{
			var xxim_bottom_class= $("#xximmm").find("#xxim_bottom").attr("class");
			if(xxim_bottom_class=="xxim_bottom xxim_expend"){//企信图标没打开，企信图标闪
				$("#xximmm").find("li[id='xxim_hide']").attr("class","xxim_hide xxim_show message-alert-bg");
				$("#xximmm").find("li[id='xxim_hide']").attr("twinkle","true");//闪烁标识
			}else{//企信图标打开，历史图标闪
				$('#xximmm').find('i.xxim_clock-o').attr("class","xx_imx_sprite xxim_clock-o message-alert_clock-o");
			}
		}
		log.reveiveHistory(hisContent,message.receivedTime);
		
		
	};
	//及时同步群组聊天消息到历史列表
	function reveiveHistoryGroupSync(param,hisContent,receivedTime){
		var mydiscussions = $('#qixinChat_body').find('.xxim_list').eq(1);//讨论组列表
		var myhistorys = $('#qixinChat_body').find('.xxim_list').eq(0);//历史消息列表
		var his= mydiscussions.find("ul.xxim_chatlist").find("li[data-discu-id='"+param.dicRyId+"']");
		var his_= mydiscussions.find("ul.xxim_chatlist").find("li[data-discu-id='"+param.dicRyId+"']").html();
		var data_discu_id = $(his).attr("data-discu-id");
		var data_id = $(his).attr("data-id");
		var id = $(his).attr("id");
		var data_discu_ownerId = $(his).attr("data-discu-ownerId");
		var his_html = '<li id="'+id+'" data-discu-ownerId="'+data_discu_ownerId+'" data-id="'+ data_id +'" data-discu-id="'+data_discu_id+'" class="xxim_childnode" type="group">'+his_+'<em class="xxim_time">'+ formateDate_hmi(new Date(receivedTime)) +'</em><span class="xxim_twospan">'+hisContent+'</span></li>'
		 //console.log(his);
		var firstChildClass = $(myhistorys).find("li").eq(0).attr("class");
		if(firstChildClass=="xxim_errormsg"||$(myhistorys).find("li").length==0){
			var _html='<li class="xxim_liston"><ul class="xxim_chatlist"><li>'+his_html+'</ul></li>';
			myhistorys.html('');
			myhistorys.append(_html);
		}else{
			myhistorys.find(".xxim_chatlist li[data-discu-id='"+param.dicRyId+"']").remove();
			myhistorys.find(".xxim_chatlist").prepend(his_html);
			
		}
	}
	//创建讨论组
	function qixinCreateDiscussion (discussionName,userIdList,discussionNameFlag){
		RongIMClient.getInstance().createDiscussion(discussionName, userIdList, {
			  onSuccess: function(discussId) {
				  // 创建成功 discussId为讨论组id
				  var userIds="";
		            for(var i=0;i<userIdList.length;i++){
		            	userIds += ","+userIdList[i];
		            }
		            var userIds = userIds.substring(1);
					$.ajax({
						url:'./qixinChat/discussionSave',
						data:{"opName":"create","discussionIdRy":discussId,"discussionName":discussionName,"userIds":userIds,"discussionNameFlag":discussionNameFlag},
						async:false,
						type:'POST',
						dataType:'json',
						success:function (data){
							if(data!=null&&data.result!="error"){
								//添加讨论组到列表
								//alert("创建讨论组成功！");
								addQixinDiscussion(discussId,discussionName,data,userIdList);
							} else{
								 alert("创建讨论组失败");
							}
						}
						
					});
			  },
			  onError: function(error) {
			    // 创建失败
				//失败 err 
				 alert("创建讨论组失败了"+error);
			  }
			});
	}
	
	
	/*
	function qixinCreateDiscussion(discussionName,userIdList){
		RongIMClient.getInstance().createDiscussion(discussionName,
				userIdList,{
				 onSuccess:function(id){//讨论组id
					 getQixinDiscussionInfo(id);
					 alert(quitDiscussionFlag);
					if(!quitDiscussionFlag){
						alert("请重试"); return ;
					}
						 //成功
				    var userIds="";
		            for(var i=0;i<userIdList.length;i++){
		            	userIds += ","+userIdList[i];
		            }
		            var userIds = userIds.substring(1);
					$.ajax({
						url:'../qixinChat/discussionSave',
						data:{"opName":"create","discussionIdRy":id,"discussionName":discussionName,"userIds":userIds},
						async:false,
						type:'POST',
						success:function (data){
							if(data!="error"||data!=null){
								//添加讨论组到列表
								alert("创建讨论组成功！");
								addQixinDiscussion(id,discussionName,data,userIdList);
							} else{
								 alert("创建讨论组失败");
							}
						}
						
					});
					
					// $('#light_popBox_close').trigger('click');
				 },onError:function(err){
				     //失败 err 
					 alert("创建讨论组失败了"+err);
					 quitDiscussionFlag=false;
					 return;
				 }
		});
	}*/
	//更新讨论组信息
	function updateDiscussionDetail(discussionId,discussionName,vIds){
		myf = $('#qixinChat_body').find('.xxim_list').eq(1);
		myf.find(".xxim_chatlist").find("li[data-id='"+discussionId+"']").find(".xxim_onename").text(discussionName);
		myf.find(".xxim_chatlist").find("li[data-id='"+discussionId+"']").find(".xxim_nums").text("("+vIds.split(",").length+")");
		//如果讨论组界面打开了关闭
		var len = $('#layim_chatbox').find("ul.layim_chatlist").find("li").length;
		if(len>1){
			$('#layim_chatbox').find("ul.layim_chatlist").find("li[data-id='"+discussionId+"']").find("em").trigger("click");
		}else{
			$('#layim_chatbox').find("span.layim_rightbtn").find("i[class='layim_close']").trigger("click");
		}
		
		
	};
	
	//添加讨论组到右侧列表
	function addQixinDiscussion(id,discussionName,data,userIdList){
		myf = $('#qixinChat_body').find('.xxim_list').eq(1);
		var qixinCurrentUserId = $("#qixinCurrentUserId").val();
		var pinyin = data.pinyin;
		var pinyinHead = data.pinyinHead;
		var groupPhoto='<div class="Group-picture">';
		var groupPhotos = data.groupPhoto;
	   	 if(groupPhotos!=null&&groupPhotos.length>0){
	   		 for (var j = 0; j < groupPhotos.length; j++) {
	   			 groupPhoto+='<img src=".'+groupPhotos[j]+'" class="xxim_oneface">';
				}
	   	 }
   	    groupPhoto+='</div>';
		var discussionHtml='<li onmousedown="qixinonmousedown(this);" pinyin="'+pinyin+'" pinyinHead="'+pinyinHead+'" data-discu-ownerId="'+qixinCurrentUserId+'" data-id="'+ data.discussionId +'" data-discu-id="'+id+'" class="xxim_childnode" type="group">'+groupPhoto+'<span class="xxim_onename">'+ discussionName +'</span><em class="xxim_nums">（'+ userIdList.length +'）</em></li>';
		var firstChildClass = $(myf).find("li").eq(0).attr("class");
		if(firstChildClass=="xxim_errormsg"){
			var _html='<div><a id="createOneDiscussion"></a></div><li class="xxim_parentnode"><ul class="xxim_chatlist">'+discussionHtml+'</ul></li>';
			myf.html('');
			myf.append(_html);
		}else{
			myf.find(".xxim_chatlist").append(discussionHtml);
		}
		myf.find(".xxim_chatlist").find("li[data-discu-id='"+id+"']").trigger("click");
		
	}
	//滚动条获取历史记录
	var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
    var nScrollTop = 0;   //滚动到的当前位置
    var nDivHight=0;//div高度
	function getQixinHistoryDatas(){
		var $elem=$("#qixinChat_body").find(".layim_chatthis");
    	nDivHight = $($elem).height();
    	nScrollHight = $($elem)[0].scrollHeight;
    	nScrollTop = $($elem)[0].scrollTop;
    	if(nScrollTop==0){
    		var dataparam = $elem.attr("data-param");
    		if(dataparam){
    			var param = JSON.parse(dataparam.replace(new RegExp("'",'gm'), "\""));
    			param.timestrap =1;
    			 getQixinHistory(param);
    		}
    	}
    	if(nScrollTop + nDivHight >= nScrollHight){
    		
    	}
   };
	
	//获取历史消息
	function getQixinHistory(param){
		var conversationtype =  RongIMLib.ConversationType.PRIVATE;
		var targetId=param.id;
		if(param.type=="group"){//讨论组
			conversationtype=RongIMLib.ConversationType.DISCUSSION; //2:讨论组
			targetId=param.dicRyId;//融云讨论组id
		}
		var timestrap =0;//默认从头开始获取
		if(param.timestrap==1){
			timestrap =null;
		}
    	RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationtype, targetId,timestrap, 5, {
			 onSuccess: function(list, hasMsg) {
			  		//list 历史消息数组，hasMsg为boolean值，如果为true则表示还有剩余历史消息可拉取，为false的话表示没有剩余历史消息可供拉取。
				 if(list!=null&&list.length>0){
					// console.dir(list);
					 qixinReveive_history(list,param.id);
				 }
				 if(!hasMsg){//没有历史消息了
					 var id = "layim_area"+param.type+param.id;
					 $("#layim_chatbox").find("ul[id='"+id+"']").removeAttr("onscroll");
				 }
			 },
			 onError: function(error) {
			 }
		});
	}
	//讨论组成员添加
	function qixinAddMemberToDiscussion(discussionId, userIdList){
		RongIMClient.getInstance().addMemberToDiscussion(discussionId, userIdList, {
			  onSuccess: function() {
			    //加入成功
				  console.log("addMember Successfully");
			  },
			  onError: function(error) {
			    //加入失败
				  console.log("addMember:errorcode:" + error);
			  }
			});
		
	}
	//将指定成员移除讨论租。
	function qixinRemoveMemberFromDiscussion(discussionId, userId){
		RongIMClient.getInstance().removeMemberFromDiscussion(discussionId, userId, {
			  onSuccess: function() {
			    console.log("RemoveMember Successfully");
			  },
			  onError: function(error) {
			    console.log("RemoveMember:errorcode:" + error);
			  }
			});
	}
	//修改讨论组名称
	function  qixinSetDiscussionName(discussionId,discussionName){
		RongIMClient.getInstance().setDiscussionName(discussionId, discussionName, {
			  onSuccess: function() {
			    console.log("setDiscussionName Successfully");
			  },
			  onError: function(error) {
			    console.log("setDiscussionName:errorcode:" + error);
			  }
			});
		
	}
	
	//获取融云讨论组信息
	function getQixinDiscussionInfo(discussionRyId){
		 //获取讨论组信息
	    RongIMClient.getInstance().getDiscussion(discussionRyId, {
	    	  onSuccess: function(discuss) {
	    	    console.log("GetDiscussion successfully");
	    	    //console.log("讨论组信息："+JSON.stringify(discuss));
	    	  },
	    	  onError: function(error) {
	    	    console.log("GetDiscussion:errorcode:" + error);
	    	  }
	    	});
	}
	
	
	//退出讨论组 判断套路组所有者是否是自己 并获得新的讨论组的所有者 发消息
	function qixinQuitDiscussion(discussionId,discussionRyId,dis_ownerId,creatorIdNew){
		
		RongIMClient.getInstance().quitDiscussion(discussionRyId, {
			  onSuccess: function() {
			    console.log("QuitDiscussion Successfully");
			    //退出成功
			    alert("退出讨论组成功！");
			    //删除讨论列表
			    deleteDiscussionLi(discussionId,creatorIdNew);
			  },
			  onError: function(error) {
			    console.log("QuitDiscussion:errorcode:" + error);
			  }
			});
		
	}
	//右键退出讨论组
	var menu2 = new BootstrapMenu("li[class='xxim_childnode'][type='group']", {
		  menuEvent: 'right-click',//right-click
		  menuSource: 'element',
		  menuPosition: 'belowRight',
		  fetchElementData: function($rowElem) {
			    return $rowElem;
			  },
		  actions: [{
		      name: '编辑讨论组',
		      onClick: function(row) {
		    	var dis_ownerId= $(row).attr("data-discu-ownerId");
				var dis_id =  $(row).attr("data-id");
				var dis_dicRyId = $(row).attr("data-discu-id");
				orgUserPage(dis_id,"update");
		      }
		    },{
		      name: '退出讨论组',
		      onClick: function(row) {
		    	 var dis_ownerId= $(row).attr("data-discu-ownerId");
				var dis_id =  $(row).attr("data-id");
				var dis_dicRyId = $(row).attr("data-discu-id");
				 RongIMClient.getInstance().getDiscussion(dis_dicRyId, {
			    	  onSuccess: function(discuss) {
			    		  if(discuss!=null){
			    			  //console.log("GetDiscussion successfully"+JSON.stringify(discuss));
			    			  var creatorIdNew = mofiLocalDiscussionInfo(discuss);
			    			  qixinQuitDiscussion(dis_id,dis_dicRyId,dis_ownerId,creatorIdNew);
			    			  
			    		  }
			    	  },
			    	  onError: function(error) {
			    	    console.log("GetDiscussion:errorcode:" + error);
			    	  }
			    	});
		      }
		    }]
		});
	//讨论组右键退出
	 /*function qixinonmousedown(elem){
		 $(elem)[0].onmousedown=function(e){
			 if(e.button=="2"){
				 if(confirm("您要退出讨论组吗？")){
					 var dis_ownerId= $(elem).attr("data-discu-ownerId");
					 var dis_id =  $(elem).attr("data-id");
					 var dis_dicRyId = $(elem).attr("data-discu-id");
					 RongIMClient.getInstance().getDiscussion(dis_dicRyId, {
				    	  onSuccess: function(discuss) {
				    		  if(discuss!=null){
				    			  //console.log("GetDiscussion successfully"+JSON.stringify(discuss));
				    			  var creatorIdNew = mofiLocalDiscussionInfo(discuss);
				    			  qixinQuitDiscussion(dis_id,dis_dicRyId,dis_ownerId,creatorIdNew);
				    			  
				    		  }
				    	  },
				    	  onError: function(error) {
				    	    console.log("GetDiscussion:errorcode:" + error);
				    	  }
				    	});
					 
				 }
				 
			 }
		 };
     }*/
	 //移除某人
	 function qixinonmousedownRemove(elem,x){
		 $(elem)[0].onmousedown=function(e){
			 if(e.button=="2"){
				 var discussionOwnerId = $(elem).attr("discussionOwnerId");
				 var targetId = $(elem).attr("data-id");//userId
				 var qixinCurrentUserId = $("#qixinCurrentUserId").val();
				 if((discussionOwnerId!=qixinCurrentUserId)||(targetId==qixinCurrentUserId)){
					 return ;
				 }
				 var discussionIdRongyun = $(elem).attr("discussionIdRongyun");
				 var myd = $('#qixinChat_body').find('.xxim_list').eq(1);
				 var discussionId = myd.find("ul.xxim_chatlist").find("li[data-discu-id='"+discussionIdRongyun+"']").attr("data-id");
				 if(confirm("您确定要移除此人吗？")){
					 RongIMClient.getInstance().removeMemberFromDiscussion(discussionIdRongyun, targetId, {
						  onSuccess: function() {
						    console.log("RemoveMember Successfully");
						    $.ajax({
								 url:'./qixinChat/discussionQuit',
								 type:'post',
								 data:{"discussionId":discussionId,"ownerIdNew":"","userIdRemove":targetId},
								 dataType:"json",
								 success:function(data){
									 if(data.result=="success"){
										 $(elem).remove();
									 }
									 
								 }
							 });
						    
						  },
						  onError: function(error) {
						    console.log("RemoveMember:errorcode:" + error);
						  }
						});
					 
				 }
				 
			 }
		 };
	 }
	 
	 //退出讨论组修改本地库信息
	 function mofiLocalDiscussionInfo(discuss){
		 
		 var qixinCurrentUserId = $("#qixinCurrentUserId").val();
		 var creatorIdNew = "";
		 if(qixinCurrentUserId==discuss.creatorId){//创建者退出讨论组
			 var memberIdList = discuss.memberIdList;
			 for (var i = 0; i < memberIdList.length; i++) {
				 if(memberIdList[i]!=discuss.creatorId){
					 creatorIdNew= memberIdList[i];
					  break;
				 }
			}
		 }
		 return creatorIdNew;
	 }
	 //删除列表的讨论组creatorIdNew:新的所有者
	 function deleteDiscussionLi(dis_id,creatorIdNew){
		// debugger;
		 var myd = $('#qixinChat_body').find('.xxim_list').eq(1);
		 myd.find("li[data-id='"+dis_id+"']").remove();
		 var len = myd.find("ul.xxim_chatlist").find("li").length;
		 if(len==0){
			 myd.find("li.xxim_parentnode").remove();
			 myd.append('<li class="xxim_errormsg">没有任何数据</li>');
		 }
		 //清除历史列表
		 $('#qixinChat_body').find("ul.xxim_list").eq(0).find("li[data-id='"+dis_id+"']").remove();
		 //清除已经打开的聊天框
		 var lilen = $('#qixinChat_body').find("#layim_chatmore").find("li").length;
		 if(lilen==1){
			 var divelem = $('#qixinChat_body').find("div.layim_namesbox").find("a[chat-id='"+dis_id+"']");
			 if(divelem){
				 $('#qixinChat_body').find("span.layim_rightbtn").find("i.layim_close").trigger("click");
			 }
		 }else if(lilen>1){
			 var divelem = $('#qixinChat_body').find("#layim_chatmore").find("li[data-id='"+dis_id+"']");
			 if(divelem){
				 divelem.find("em").trigger("click");
			 }
		 }
		 
		 $.ajax({
			 url:'./qixinChat/discussionQuit',
			 type:'post',
			 data:{"discussionId":dis_id,"ownerIdNew":creatorIdNew,"userIdRemove":""},
			 dataType:"json",
			 success:function(data){
				 if(data.result=="success"){
				 }
			 }
		 });
		
	 }
	 
	 
	//编辑：讨论组添加成员或者删除成员
	$("#qixinChat_body").delegate(".updateDiscussionUsers","click",function(){
		var discussionId = $(this).attr("updatediscussionid");
		var theUserId = $(this).attr("theUserId");
		if(theUserId){
			orgUserPage(theUserId,"create");
		}else{
			orgUserPage(discussionId,"update");
		}
	});
	
	$(".row").delegate("#btnExpressionId","click",function(){
		var expressonObj = $(".layim_chatthis").parent().next(),msgConment=$('.layim_chatthis').parent();
		if(!expressonObj.is(":visible")){
			expressonObj.show();
			msgConment.height(msgConment.height()-expressonObj.height());
		}else{
			expressonObj.hide();
			msgConment.height(msgConment.height()+expressonObj.height());
		}
		
	});
	
	
</script>
<script type="text/javascript">

/**
 * 以字符串的形式传送base64给服务端转存为图片。
 * @param elem
 */
function compressQixinChatPic(elem){
	var file = elem.files[0];
    if("image/gif|image/jpeg|image/jpg|image/png|".indexOf(file.type+"|")==-1||file.type==""){
        alert("文件格式不支持！");
        return ;
    }
    if((file.size/1024/1024)>3){
        alert("图片大小不能超过3M!");
        return ;
    }
    lrz(file, {width: 800}, function (results) {
    	//console.log(results);
    	var imgType = results.origin.type.split("/")[1];
    	var base64_b = results.base64.split(",")[0];
    	var base64 = results.base64.split(",")[1];
    	uploadQixinChatPic(base64_b,base64,imgType);
    });
}
/**
 * 上传聊天图片
 */
function uploadQixinChatPic(base64_b,base64,imgType){
	$.ajax({
 		url:'./uploadFile/compressPicUpload',
 		type:'post',
 		data:{base64:base64,imgType:imgType},
 		dataType:'json',
 		success:function(data){
 			if(data!=null){
 				var id = $("#qixinChat_body #layim_textarea").find("div[textarea-now='now']").attr("id");
 				var targetId="";
 				var chatType="";
 				var dicRyId ="";
 				if(id.indexOf("one")!=-1){
 					targetId = id.split("one")[1];
 					chatType="one";
 				}else if(id.indexOf("group")!=-1){
 					chatType="group";
 					var myd = $('#qixinChat_body').find('.xxim_list').eq(1);
 					targetId = id.split("group")[1];
 					dicRyId = myd.find("li[data-id='"+id.split("group")[1]+"']").attr("data-discu-id");
 				}//debugger;
				var picmsg = {};
				    picmsg.content=data.imageStr;
				    picmsg.imageUri=data.imagePath;
				    picmsg.type=chatType;
				    picmsg.chatType=chatType;
				    picmsg.id = targetId;
				    picmsg.dicRyId = dicRyId;
				    picmsg.contentAll = base64_b+','+data.imageStr;
				    //发送到融云 
				    sendQixinMessage (picmsg,"2");
				    //发送到聊天框
				   sendQixinMessageLocal(picmsg);
				    
 			}else{
 				alert("图片发送失败！");
 			}
 		}
 		
 	});
}
function sendQixinMessageLocal(picmsg){
	var imgHtml='<a data-gallery="" href="'+picmsg.imageUri+'"><img src="'+picmsg.contentAll+'" ></a>';
	
	
	imgHtml =  '<div class="ibox float-e-margins"><div class=""> <div class="lightBoxGallery"><div class="coms-reps-pic-a"><a href="'+picmsg.imageUri+'" title="图片" data-gallery=""><img src="'+picmsg.contentAll+'"></a></div><div id="blueimp-gallery" class="blueimp-gallery"> <div class="slides"></div><h3 class="title"></h3><a class="prev">‹</a> <a class="next">›</a>  <a class="close">×</a>  <a class="play-pause"></a> <ol class="indicator"></ol> </div></div></div></div>';
	
    //此处皆为模拟layim_areagroup402893bd548a515401548a5e0c680000
    var keys =picmsg.type + picmsg.id;
    var  log = {};
   
    //聊天模版
    log.html = function(param, type){
        return '<li class="'+ (type === 'me' ? 'layim_chateme' : '') +'">'
            +'<div class="layim_chatuser">'
                + function(){
                    if(type === 'me'){
                        return '<span class="layim_chattime">'+ param.time +'</span>'
                               +'<span class="layim_chatname">'+ param.name +'</span>'
                               +'<img src=".'+ param.photo +'" >';
                    } else {
                        return '<img src=".'+ param.photo +'" >'
                               +'<span class="layim_chatname">'+ param.name +'</span>'
                               +'<span class="layim_chattime">'+ param.time +'</span>';      
                    }
                }()
            +'</div>'
            +'<div class="layim_chatsay">'+ param.content +'<em class="layim_zero"></em></div>'
        +'</li>';
    };
    
    log.imarea = $("#qixinChat_body").find("#layim_chatbox").find('#layim_area'+ keys);
    var qixinCurrentUserId = $("#qixinCurrentUserId").val();
    var qixinCurrentUserName = $("#qixinCurrentUserName").val();
    var qixinCurrentUserPhoto = $("#qixinCurrentUserPhoto").val();
    log.imarea.append(log.html({
        time: formateDate_hmi(new Date),
        name: qixinCurrentUserName,
        photo: "."+qixinCurrentUserPhoto!=null&&qixinCurrentUserPhoto!=""?qixinCurrentUserPhoto:"/theme/img/010927810.jpg",
        content: imgHtml
    }, 'me'));
  
    $("#qixinChat_body #layim_textarea").find("div[textarea-now='now']").focus();
    log.imarea.scrollTop(log.imarea[0].scrollHeight);
	//及时同步聊天记录
////及时同步聊天消息到历史列表
    if(picmsg.type=="one"){//单
    	reveiveHistorySync(picmsg,"[图片]",new Date);
    }else{//群
    	reveiveHistoryGroupSync(picmsg,"[图片]",new Date)
    }
}
//图片压缩
function uploadQixinChatPicture(){
	$.ajaxFileUpload({  
		url:"./uploadFile/uploadQixinChatPicture",
		secureuri:false,  
		fileElementId:"qixinChatImages_input",//文件选择框的id属性  
		dataType: 'json',   //json
		success: function (data) {
			var id = $("#qixinChat_body #layim_textarea").find("div[textarea-now='now']").attr("id");
			var targetId="";
			var chatType="";
			if(id.indexOf("one")!=-1){
				targetId = id.split("one")[1];
				chatType="one";
			}else if(id.indexOf("group")!=-1){
				chatType="group";
				var myd = $('#qixinChat_body').find('.xxim_list').eq(1);
				var temp = id.split("group")[1];
				targetId = myd.find("li[data-id='"+id.split("group")[1]+"']").attr("data-discu-id");
			}
			for (var i = 0; i < data.length; i++) {
				var picmsg = {};
				    picmsg.content=data[i].contentType+';base64,'+data[i].imageStr;
				    picmsg.imageUri="./"+data[i].imagePath;
				    picmsg.type=chatType;
				    picmsg.id = targetId;
				    picmsg.dicRyId = targetId;
				    sendQixinMessage (picmsg,"2");
				//<a href="../../baihui/theme/img/p_big1.jpg" title="图片" data-gallery="">
				//<img src="../../baihui/theme/img/p_big1.jpg" /></a>
				/* var imgStr = '<a data-gallery="" href="./'+data[i].imagePath+'"><img src="data:'+data[i].contentType+';base64,'+data[i].imageStr+'" ></a>';
				 $("#qixinChat_body #layim_textarea").find("div[textarea-now='now']").focus();
				document.execCommand("insertHTML", false,imgStr);
				*/
			}
		}/*,
		error:function(XMLHttpRequest, textStatus, errorThrown){  
			alert('上传失败！');  
		}  */
	});  
}

/**
 * 监听到企信未读消息增加数量
 */
function addQixinUnreadDatasNum(message){
	var qixinMessageContent =eval('('+message.content.content+')'); 
	var flagNum = qixinMessageContent.typeContent;//已读数量减少
	var isView =false;
	var tableName_temp ="qixinNotice";//公告
	if(qixinMessageContent.type=="SysMsg"||qixinMessageContent.type=="RepMsg"){//普通消息||工作报告
		tableName_temp="qixinMessage";
	}else if(qixinMessageContent.type=="EwsMsg"){//预警
		tableName_temp="qixinWaring";
	}else if(qixinMessageContent.type=="AttMsg"){//关注
		tableName_temp="qixinAttention";
	}else if(qixinMessageContent.type=="ExaMsg"){//审批
		tableName_temp="qixinApprove";
	}else if(qixinMessageContent.type=="forbidden"){//用户禁用
		var userId = "${(Session['_USER_LOGIN_'].id)?default('')}";
		$.ajax({
			url:'./user/getUserState',
			type:'post',
			async:false,
			data:{userId:userId},
			success:function(data){
				//alert(typeof data);
				if(data==0){
					alert("您的账号已被管理员禁用，如有疑问，请联系管理员！");
					/*if(settingWindow){
						settingWindow.close();
					}*/
					loginout();
					
				}	
				return ;
			}
		});
		return ;
	}else if(qixinMessageContent.type=="projectForbidden"){//公司禁用
        var userId = "${(Session['_USER_LOGIN_'].id)?default('')}";
        $.ajax({
            url:'./project/getProjectState',
            type:'post',
            async:false,
            success:function(data){
                if(data){
                    alert("该机构已被禁用，如有疑问，请联系管理员！");
                    loginout();
                }
                return ;
            }
        });
        return ;
    }else if(qixinMessageContent.type=="delete"){
		alert("对不起，您的账号已被删除，如有疑问，请联系管理员！");
		loginout();
	}else if(qixinMessageContent.type=="enable"){//激活
		reutrn ;
	}else if(qixinMessageContent.type=="SysMsgs"||qixinMessageContent.type=="RepMsgs"){//普通消息已读||工作报告已读
		tableName_temp="qixinMessage";
		isView=true;
	}else if(qixinMessageContent.type=="EwsMsgs"){//预警已读
		tableName_temp="qixinWaring";
		isView=true;
	}else if(qixinMessageContent.type=="AttMsgs"){//关注已读
		tableName_temp="qixinAttention";
		isView=true;
	}else if(qixinMessageContent.type=="ExaMsgs"){//审批已读
		tableName_temp="qixinApprove";
		isView=true;
	}else if(qixinMessageContent.type=="AnnMsgs"){
		tableName_temp="qixinNotice";
		isView=true;
	}else if(qixinMessageContent.type=="CelMsg"){
		Overlayer.show("注销账号可能要花费一些时间，请耐心等待！");
	}else if(qixinMessageContent.type=="CelMsgOK"){
		Overlayer.remove();
		top.location.href="./viewLogin";
//		top.location.href="https://bhcrm.baihui.com/viewLogin";
	}
	if(global_qixin_unread){
		var num = $("#unReadNum_"+tableName_temp).attr("value");
		if(isView){
			num = parseInt(num)-parseInt(flagNum)>0?parseInt(num)-parseInt(flagNum):0;
		}else{
			num = parseInt(num)+1;
		}
		$("#unReadNum_"+tableName_temp).attr("value",num);
		$("#unReadNum_"+tableName_temp).text(num);
		if(num==0){//
			$("#unReadNum_"+tableName_temp).hide();
		}else{
			$("#unReadNum_"+tableName_temp).show();
		}
		
	}
	
};



//创建讨论组

$("#qixinChat_body").delegate("#createOneDiscussion","click",function(){
	//showWindow('a','../qixinChat/discussionOrgUserList','1000',null);
	//$.post("../qixinChat/discussionOrgUserList",{},function(){
	orgUserPage("","create");
		
	//});
	
});
//跳转到选择讨论组成员页面
function orgUserPage (discussionId,opName){
	
	$.layer({
		shade: [0.5, '#000', false],
		type: 2,
		iframe: {
			src: './qixinChat/discussionOrgUserList?discussionId='+discussionId+'&&opName='+opName
		},
		title: ['', false],
		closeBtn: [1, true],
		area: ['700px', '500px'],
		move: ['.xubox_border', true],
		offset: ['', ''],
		success: function(layer) {
			// 这里定义弹出层加载成功后要执行的内容
		}
	});
}



//定位光标
var savedRange,isInFocus;
function saveSelection()
{
if(window.getSelection)//non IE Browsers
{
    savedRange = window.getSelection().getRangeAt(0);
}
else if(document.selection)//IE
{ 
    savedRange = document.selection.createRange();  
} 

}
function restoreSelection()
{
var id = $("#qixinChat_body #layim_textarea").find("div[textarea-now='now']").attr("id");
//alert(id);
isInFocus = true;
document.getElementById(id).focus();
if (savedRange != null) {
    if (window.getSelection)//non IE and there is already a selection
    {
        var s = window.getSelection();
        if (s.rangeCount > 0) 
            s.removeAllRanges();
        s.addRange(savedRange);
    }
    else if (document.createRange)//non IE and no selection
    {
        window.getSelection().addRange(savedRange);
    }
    else if (document.selection)//IE
    {
        savedRange.select();
    }
}
}
//this part onwards is only needed if you want to restore selection onclick
var isInFocus = false;
function onDivBlur()
{
isInFocus = false;
//alert(savedRange.endOffset);
}

function cancelEvent(e)
{
if (isInFocus == false && savedRange != null) {
    if (e && e.preventDefault) {
        //alert("FF");
        e.stopPropagation(); // DOM style (return false doesn't always work in FF)
        e.preventDefault();
    }
    else {
        window.event.cancelBubble = true;//IE stopPropagation
    }
    restoreSelection();
    return false; // false = IE style
}
}

</script>
























