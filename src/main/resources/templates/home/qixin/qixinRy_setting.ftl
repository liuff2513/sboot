<script>
var isGetTokenNum=false;
$(function(){
	// 初始化
	// RongIMClient.init(appkey, [dataAccessProvider]);
	// appkey:官网注册的appkey。
	// dataAccessProvider:自定义本地存储方案的实例，不传默认为内存存储，自定义需要实现WebSQLDataProvider所有的方法，此参数必须是传入实例后的对象。
	var rongyunkey ="${rongyunKey?default('')}";
	//console.log("rongyunkey"+rongyunkey);
    try {
        RongIMClient.init(rongyunkey);//正式
    } catch (e) {
		console.log("no net");
		return ;
    }
	var token = "${(Session['_USER_LOGIN_'].rongyToken)?default('')}";
	
	
	// 连接融云服务器。
	rongyunConnect(token);
	function rongyunConnect(token){
		RongIMClient.connect(token, {
			onSuccess: function(userId) {
				console.log("Login successfully." + userId);
			},
			onTokenIncorrect: function() {
				console.log('token无效--');
				if(!isGetTokenNum){
					//重新请求获得融云新token
					$.ajax({
						url:'./qixinChat/getRongyToken',
						type:'post',
						success:function(data){
							isGetTokenNum=true;
							rongyunConnect(data);
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
	    	console.log("=========");
	    	console.log("监听到的消息：：："+JSON.stringify(message));
	    	console.log("=========");
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
	            	// //企信消息自定义接收处理
	            	addQixinUnreadDatasNum_Setting(message);
	            	break;
	            default:
	                // 自定义消息
	                // do something...
	        }
	    }
	});
	
});

/**
 * 监听到企信未读消息增加数量
 */
function addQixinUnreadDatasNum_Setting(message){
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
	}else if(qixinMessageContent.type=="forbidden"){//禁用
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
                return false;
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
		//top.location.href="https://bhcrm.baihui.com/viewLogin";
	}
	//if(global_qixin_unread_){
		var num = $("#unReadNum_"+tableName_temp).attr("value");
		if(isView){
			num = parseInt(num)-parseInt(flagNum)>0?parseInt(num)-parseInt(flagNum):0;
		}else{
			num = parseInt(num)+1;
		}
		$("#unReadNum_"+tableName_temp).attr("value",num);
		$("#unReadNum_"+tableName_temp).text(num);
		/*if(settingWindow){
			$("#unReadNum_"+tableName_temp,settingWindow.document.body).attr("value",num);
			$("#unReadNum_"+tableName_temp,settingWindow.document.body).text(num);
		}*/
		if(num==0){//
			$("#unReadNum_"+tableName_temp).hide();
			/*if(settingWindow){
				$("#unReadNum_"+tableName_temp,settingWindow.document.body).hide();
				$("#unReadNum_"+tableName_temp,settingWindow.document.body).hide();
			}*/
		}else{
			$("#unReadNum_"+tableName_temp).show();
			/*if(settingWindow){
				$("#unReadNum_"+tableName_temp,settingWindow.document.body).show();
			}*/
		}
		
	//}
	
};
</script>