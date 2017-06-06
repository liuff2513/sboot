(function($){

var timestamp = (new Date()).valueOf();

/***************************** 1 ********************************/

/*获取融云Token*/
$.rongy_gettoken = {
	"requestcommand" : "rongy_gettoken",
	"requesttime" : timestamp,
	"userId" : "dgdr3f34rtd3t3tdg343t"
};

/*获取通讯录(好友)选择源*/
$.rongy_getuserlist = {
	"requestcommand" : "rongy_getuserlist",
	"requesttime" : timestamp,
	"userId" : "402890b8506a818201506a826f160000",
	"friendName" : "好友名称"
	
};

/*获取通讯录(好友)列表*/
$.rongy_getuserfriendlist = {
	"requestcommand" : "rongy_getuserfriendlist",
	"requesttime" : timestamp,
	"userId" : "402890b8506a818201506a826f160000",
	"friendName" : "好友名称"
};

/*确认添加好友(通讯录)员*/
$.rongy_useraddfriend = {
	"requestcommand" : "rongy_useraddfriend",
	"requesttime" : timestamp,
	"userId":"402890b8506a818201506a826f160000",
	"friendId":"ff808081506a970501506af0c6190000"
};

/*拒绝添加好友(通讯录)员*/
$.rongy_userrefusefriend = {
	"requestcommand" : "rongy_userrefusefriend",
	"requesttime" : timestamp,
	"userId":"402890b8506a818201506a826f160000",
	"friendId":"ff808081506a970501506af0c6190000"
};

/*删除好友(通讯录)员*/
$.rongy_userdeletefriend = {
	"requestcommand" : "rongy_userdeletefriend",
	"requesttime" : timestamp,
	"userId":"402890b8506a818201506a826f160000",
	"friendId":"ff808081506a970501506af0c6190000"
};

/*获取新朋友通知记录*/
$.rongy_usernewfriendmsg = {
	"requestcommand" : "rongy_usernewfriendmsg",
	"requesttime" : timestamp,
	"userId":"402890b8506a818201506a826f160000"
};

/*刷新用户信息*/
$.rongy_userrefresh = {
	"requestcommand" : "rongy_userrefresh",
	"requesttime" : timestamp,
	"userId" : "dgdr3f34rtd3t3tdg343t"
};

/*检查用户在线状态*/
$.rongy_usercheckonline = {
	"requestcommand" : "rongy_usercheckonline",
	"requesttime" : timestamp,
	"userId" : "dgdr3f34rtd3t3tdg343t"	
};


/***************************** 4 ********************************/
/*发送单聊消息*/
$.rongy_mespripsh = {
	"requestcommand" : "rongy_mespripsh",
	"requesttime" : timestamp,
	"fromUserId":"402890b8506a818201506a826f160000",
	"toUserId":[
	            "ff808081506a970501506af0c6190000"
	            ],
	"content":"这是一个单聊消息"          
		
		
};


/*发送系统消息*/
$.rongy_messyspsh = {
	"requestcommand" : "rongy_messyspsh",
	"requesttime" : timestamp,
	"fromUserId":"ff80808150acfbcc0150ad8112230000",
	"toUserId":[
	            "ff808081506f936b01507ddbe1990007"
	            ],
	"content":"这是一个系统消息",         
	"msgType":"TxtMsg",         
	"pushType":"2",         
	"pushContent":"这是一个系统消息 推送通知"         
		
		
};

/*发送自定义系统消息*/
$.rongy_cusmessyspsh = {
	"requestcommand" : "rongy_cusmessyspsh",
	"requesttime" : timestamp,
	"fromUserId":"ff80808150acfbcc0150ad8112230000",
	"toUserId":[
	            "ff808081506f936b01507ddbe1990007"
	            ],
    "pushType":"2",
    "cusContent":{
		"type":"SysMsg",
		"typeContent":"内容",
        "typeTitle":"标题"
        }
		
}


/*发送聊天室消息*/
$.rongy_meschatroompsh = {
		"requestcommand" : "rongy_meschatroompsh",
		"requesttime" : timestamp,
		"fromUserId":"402890b8506a818201506a826f160000",
		"toChatroomId":[
		            "402890b7507fa1a301507fa6c1b30001"
		            ],
		"content":"这是一个聊天室消息"      
		
};



/***************************** 9 ********************************/
/*创建聊天室*/
$.rongy_chatroomcreate = {
	"requestcommand" : "rongy_chatroomcreate",
	"requesttime" : timestamp,
	"userId":"402890b8506a818201506a826f160000",
	"names":[
	            "聊天室1","聊天室2"
	            ]
		
};
/*销毁聊天室*/
$.rongy_chatroomdestroy = {
	"requestcommand" : "rongy_chatroomdestroy",
	"requesttime" : timestamp,
	"userId":"402890b8506a818201506a826f160000",
	"chatroomIds":[
	            "4545454542drf232523243r2sf2f2f","4235423r4s5d45f25f2f2fs2f"
	            ]	
		
};

/*查询聊天室*/
$.rongy_chatroomquery = {
	"requestcommand" : "rongy_chatroomquery",
	"requesttime" : timestamp,
	"userId":"402890b8506a818201506a826f160000",
	"chatroomIds":[
		            "402890b7507fa1a301507fa6c1a90000","402890b7507fa1a301507fa6c1b30001"
		            ]	
};


/*查询聊天室内用户信息*/
$.rongy_chatroomuserquery = {
	"requestcommand" : "rongy_chatroomuserquery",
	"requesttime" : timestamp,
	"userId":"402890b7507fa1a301507fa6c1a90000",
	"chatroomId":"402890b7507fa1a301507fa6c1b30001"
}





})(Test);