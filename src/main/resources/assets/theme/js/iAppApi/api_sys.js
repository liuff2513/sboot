(function($){

//var timestamp = new Date().getTime();
//var timestamp = Date.parse(new Date()); 
var timestamp = (new Date()).valueOf();

/*清除缓存*/
$.sys_clearcache = {
	"requestcommand" : "sys_clearcache",
	"requesttime": timestamp
};
/*获取系统时间*/
$.sys_gettime = {
	"requestcommand" : "sys_gettime",
};
/*升级App*/
$.sys_upapk = {
	"requestcommand" : "sys_upapk",
	"version" : "1.1.0"
}

/*上传附件*/
$.sys_uploadimg = {
	"requestcommand" : "sys_uploadimg",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"upType":"1",
	"uploadfile":""
	
};
//获取附件
$.sys_getfilemessage = {
	"requestcommand" : "sys_getfilemessage",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"moduleType":"bh_activity",
	"dataId":"402893b354180aac0154180d02f00000",
	"pageNo":1,
	"pageSize":10

};

//详情上传附件
$.sys_uploadimgdur = {
	"requestcommand" : "sys_uploadimgdur",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"moduleType":"bh_activity",
	"dataId":"402893b354180aac0154180d02f00000",
	"files":[
		{
			"url":"原图URL",
			"thumbnailUrl":"缩略图URL",
			"fileSize":1222,
			"fileName":"名称",
			"oldFileName":"原名称"
		},
		{
			"url":"原图URL",
			"thumbnailUrl":"缩略图URL",
			"fileSize":1222,
			"fileName":"名称",
			"oldFileName":"原名称"
		}
	]
}


//删除附件
$.sys_deletefilemessage = {
	"requestcommand" : "sys_deletefilemessage",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",
	"dataId":""
};

/*获取短信验证码*/
$.sys_getauthcode = {
	"requestcommand" : "sys_getauthcode",
	"requesttime": timestamp,
	"phone" : "13611112222",
	"type" : "RT"
};

/*验证短信验证码*/
$.sys_verauthcode = {
	"requestcommand" : "sys_verauthcode",
	"requesttime": timestamp,
	"loginName" : "13611112222",
	"authcode" : "123456"
		
};	

/*验证手机邮箱是否已注册*/
$.sys_verpnelregister = {
	"requestcommand" : "sys_verpnelregister",
	"requesttime": timestamp,
	"loginName" : "13611112222"
};



/*注册*/
$.sys_register = {
	"requestcommand" : "sys_register",
	"requesttime": timestamp,
	"phone" : "13611112222",
	"password" : "123456789",
	"authcode" : "123456"
};

	/*基本信息*/
	$.sys_getbasicinfo = {
		"requestcommand" : "sys_getbasicinfo",
		"requesttime": timestamp,
		"userId":"c90ee7a5e3034aada62d67b1089df5e3"
	};

	/*登录*/
$.sys_login = {
	"requestcommand" : "sys_login",
	"requesttime": timestamp,
	"loginName" : "1057311510@qq.com",
	"password" : "123asd"
};	
	/*登出*/
$.sys_loginout = {
	"requestcommand" : "sys_loginout",
	"requesttime": timestamp,
	"userId" : "402890b55635733d0156357512d10001",
	"sessionId" : "Asasassfwe43f343ggreg34ggerg34"
};

/*发送邮件 获取验证码等*/
$.sys_sendemailauth = {
	"requestcommand" : "sys_sendemailauth",
	"requesttime": timestamp,
	"userId":"c90ee7a5e3034aada62d67b1089df5e3",
	"type":"RT",
	"toEmails":[
	            "123@qq.com","err_ds@hotmail.com"
	            ]
		
}

/*修改或绑定邮箱*/
$.sys_updateemail = {
	"requestcommand" : "sys_updateemail",
	"requesttime": timestamp,
	"userId":"c90ee7a5e3034aada62d67b1089df5e3",
	"password" : "123456789",
	"authcode" : "123456",
	"email" : "1234567890@qq.com"
		
}


/*修改或绑定手机号*/
$.sys_updatephone = {
	"requestcommand" : "sys_updatephone",
	"requesttime": timestamp,
	"userId":"c90ee7a5e3034aada62d67b1089df5e3",
	"password" : "123456789",
	"authcode" : "123456",
	"phone" : "1234567890"
		
}



/*修改密码*/
$.sys_updatepassword = {
	"requestcommand" : "sys_updatepassword",
	"requesttime": timestamp,
	"userId":"c90ee7a5e3034aada62d67b1089df5e3",
	"oldPassword" : "123456789",
	"newPassword" : "1234567890"
};
/*忘记密码*/
$.sys_forgetpassword = {
	"requestcommand" : "sys_forgetpassword",
	"requesttime": timestamp,
	"loginName" : "13611112222",
	"authToken" : "340ee7a5dewbnaada62d67b1457dfbny",
	"newPassword" : "12345678900",
	"newPasswordagain" : "12345678900"
};



/*获取关注列表数据*/
$.sys_getattentions = {
	"requestcommand" : "sys_getattentions",
	"requesttime": timestamp,
	"userId":"c90ee7a5e3034aada62d67b1089df5e3",
	"moduleId":"402893bb50d6280d0150d62aa2f00001",
	"searchKey":"2015"
	
};


/*数据详情 关注*/
$.sys_attention = {
	"requestcommand" : "sys_attention",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",
	"identif":"save",//save 关注 cancel 取消关注
	"moduleType":"",
	"moduleId":""
		
}


/*获取预警列表数据*/
$.sys_getews = {
	"requestcommand" : "sys_getews",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001"
			
};

/*获取列表模板*/
$.sys_listtemplate = {
	"requestcommand" : "sys_listtemplate",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001"	
		
};

/*获取表单模板*/
$.sys_formstemplate = {
	"requestcommand" : "sys_formstemplate",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001"	
			
};


/*获取列表表头模板*/
$.sys_getlisttopfun = {
	"requestcommand" : "sys_getlisttopfun",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"modulePort":""
}


/*获取模块名集合*/
$.sys_getmodulenames = {
	"requestcommand" : "sys_getmodulenames",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001"
}


/*获取所有者*/
$.sys_getowner = {
	"requestcommand" : "sys_getowner",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"ownerType":"owner",
	"searchVal":"张三"
}



/*获取联系人根据客户Id*/
$.sys_getconsbycust = {
	"requestcommand" : "sys_getconsbycust",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"402893bb50d6280d0150d62aa2f00001",
			
}


/*获取客户根据联系人*/
$.sys_getcustsbycontact = {
		"requestcommand" : "sys_getcustsbycontact",
		"requesttime": timestamp,
		"userId":"402893bb50d6280d0150d62aa2f00001",
		"id":"402893bb50d6280d0150d62aa2f00001"
			
}


/*获取操作功能的字典*/
$.sys_getdicbyoperation = {
		"requestcommand" : "sys_getdicbyoperation",
		"requesttime": timestamp,
		"userId":"402893bb50d6280d0150d62aa2f00001",
		"identif":"back",
		"moduleType":"bh_clue"
}


/*版本检测*/
$.sys_versioncheck = {
	"requestcommand" : "sys_versioncheck",
	"requesttime": timestamp
};

/*意见反馈*/
$.sys_feedback = {
	"requestcommand": "sys_feedback",
	"requesttime": timestamp,
	"suggest": "意见",
	"protype": "air",
	"phone": "13661079461"
};
/*精选类消息推送开关*/
$.sys_messagepushonoff = {
	"requestcommand": "sys_messagepushonoff",
	"requesttime": timestamp,
	"isrecieve": "1",
	"messtype": "2"
};


/*点赞取消赞*/
$.sys_praise = {
	"requestcommand" : "sys_praise",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"userName":"名称",
	"moduleType":"",
	"id":"ff8080815161446001516171c58b0007"
};

/*评论*/
$.sys_comment = {
	"requestcommand" : "sys_comment",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"userName":"名称",
	"moduleType":"",
	"comment":{
		"dataId":"ff8080815161446001516171c58b0007",
		"content":"评论内容",
		"pid":"回复哪条评论",
		"seq":"1",//1.评论 2.回复
		"commentUserId":"",//评论人 或 被回复人ID
		"commentUserName":"",//评论人 或 被回复人名称
        "contentBphoto1":"原图url",
        "contentSphoto1":"缩略图url",
        "contentBphoto2":"原图url",
        "contentSphoto2":"缩略图url",
        "contentBphoto3":"原图url",
        "contentSphoto3":"缩略图url",
        "replyBphoto1":"回复原图url",
        "replySphoto1":"回复缩略图url",
        "replyBphoto2":"回复原图url",
        "replySphoto2":"回复缩略图url",
        "replyBphoto3":"回复原图url",
        "replySphoto3":"回复缩略图url"
        
        }
};


/*获取评论列表*/
$.sys_getcomments = {
	"requestcommand" : "sys_getcomments",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"moduleType":"",
	"id":"ff8080815148b30301514d7eaf1a0018",
	"pageNoComment":"1",
	"pageSizeComment":"10"
};


/*评论回复删除*/
$.sys_commentreplydel = {
	"requestcommand" : "sys_commentreplydel",
	"requesttime": timestamp,
	"moduleType":"",
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"402890b45162a163015162a3ba060001",
	"replyId":"402890b45162a163015162a3ba060001",
	"seq":"1"
		
};


/*业务审批*/
$.sys_getdataapprovals = {
	"requestcommand" : "sys_getdataapprovals",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"dataId":"402893b3531658910153165acf7e0000"
};

/*业务时间轴*/
$.sys_getdatatimershaft = {
	"requestcommand" : "sys_getdatatimershaft",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"40288fb451470e8f0151470fa7950000",
	"moduleType":"",
};


/*业务邀约状态更正*/
$.sys_invitestatus = {
	"requestcommand" : "sys_invitestatus",
	"requesttime": timestamp,
	"moduleType":"",
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"invites":[
		            {"id":"",
		            "activityId":"",
		            "status":"邀约成功"}
		            ]
};
/*业务数据字段变更记录*/
$.sys_fieldhistory = {
	"requestcommand" : "sys_fieldhistory",
	"requesttime": timestamp,
	"id":"402893bb50d6280d0150d62aa2f00001",
	"userId":"402893bb50d6280d0150d62aa2f00001",
};

/*业务打回认领记录*/
$.sys_claimbacklist = {
	"requestcommand" : "sys_claimbacklist",
	"requesttime": timestamp,
	"dataId":"402893bf5692619801569264f7b60004",
	"userId":"402890b55645de46015645e0502d0001",
	"currentPage":"1",// 当前页
	"limit":"10" // 每页记录数
};

/*业务新需求列表*/
$.sys_requirementlist = {
	"requestcommand" : "sys_requirementlist",
	"requesttime": timestamp,
	"dataId":"402893bf5692619801569264f7b60004",
	"userId":"402890b55645de46015645e0502d0001",
	"currentPage":"1",// 当前页
	"limit":"10" // 每页记录数
};
/*业务新需增删改*/
$.sys_requirementcud = {
	"requestcommand" : "sys_requirementcud",
	"requesttime": timestamp,
	"isCUD":"add",
	"id":"402893bf5692619801569264f7b60004",
	"dataId":"402893bf5692619801569264f7b60004",
	"dataName":"402893bf5692619801569264f7b60004",
	"userId":"402890b55645de46015645e0502d0001",
	"name":"",
	"status":"待处理",
	"moduleType":""
};

/*业务新需求详情*/
$.sys_requirementinfo = {
	"requestcommand" : "sys_requirementinfo",
	"requesttime": timestamp,
	"id":"402893bf5692619801569264f7b60004"
}

/*业务模块关联地址增删改*/
$.sys_maddresscud = {
	"requestcommand" : "sys_maddresscud",
	"requesttime": timestamp,
	"isCUD":"add",
	"userId":"402890b55635733d0156357512d10001",
	"id":"402893bf5692619801569264f7b60004",
	"dataId":"402893bf5692619801569264f7b60004",
	"maddresslist":[
			{
			"id":"402893bf5692619801569264f7b60004",
			"province":"省",
			"provinceId":"省ID",
			"city":"市",
			"cityId":"市ID",
			"district":"县",
			"districtId":"县Id",
			"detail":"详情",
			"moduleType":"bh_contact",
			"defaultStatus":false
			}
	]
}
/*业务模块关联地址列表*/
$.sys_maddresslist = {
	"requestcommand" : "sys_maddresslist",
	"requesttime": timestamp,
	"userId":"402890b55635733d0156357512d10001",
	"relDataId":"402893bf5692619801569264f7b60004",
	"moduleType":"bh_contact"
}
/*业务模块关联地址列表*/
$.sys_maddressacq = {
	"requestcommand" : "sys_maddressacq",
	"requesttime": timestamp,
	"userId":"402890b55635733d0156357512d10001",
	"relDataId":"402893bf5692619801569264f7b60004",
	"moduleType":"bh_contact"
}
/*业务模块关联地址省*/
$.sys_mdic = {
	"requestcommand" : "sys_mdic",
	"requesttime": timestamp,
	"userId":"402890b55635733d0156357512d10001",
	"template":"11321111"
}
/*业务模块关联地址省*/
$.sys_mprodic = {
	"requestcommand" : "sys_mprodic",
	"requesttime": timestamp,
	"userId":"402890b55635733d0156357512d10001"
}
/*业务模块关联地址市县*/
$.sys_mcitydic = {
	"requestcommand" : "sys_mcitydic",
	"requesttime": timestamp,
	"userId":"402890b55635733d0156357512d10001",
	"pid":"402890b55635733d0156357512d10001"
}
/*业务模块关联地址省*/
$.sys_maddressconf = {
	"requestcommand" : "sys_maddressconf",
	"requesttime": timestamp,
	"userId":"402890b55635733d0156357512d10001"
}


	/*主页时间轴查询*/
$.sys_timershaftbymodule = {
	"requestcommand" : "sys_timershaftbymodule",
	"requesttime": timestamp,
	"moduleType":"",
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"day":"2015-12-16",
	"ownerId":""
};

/*主页时间轴*/
$.sys_timershaft = {
		"requestcommand" : "sys_timershaft",
		"requesttime": timestamp,
		"userId":"402893bb50d6280d0150d62aa2f00001",
		"moduleType":"",
		"day":"",
		"ownerId":""
};

/*主页时间轴*/
$.sys_timershaftlist = {
		"requestcommand" : "sys_timershaftlist",
		"requesttime": timestamp,
		"userId":"402893bb50d6280d0150d62aa2f00001",
		"searchVal":"",
		"day":""
};

/*业务根据联系人Id获取客户*/
$.sys_getcusbyconid = {
	"requestcommand" : "sys_getcusbyconid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":""
};

/*接收坐标*/
$.sys_receivecoordinate = {
	"requestcommand" : "sys_receivecoordinate",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"jd":"",
	"wd":"",
	"bj":"",
	"fromUserId":""

};
/*模块排序*/
$.sys_modulesort = {
	"requestcommand" : "sys_modulesort",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"modules":"bh_activity,bh_clue,bh_contact"

};
/*数据详情关联模块*/
$.sys_modulesreldata = {
	"requestcommand" : "sys_modulesreldata",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"moduleId":"402893bb50d6280d0150d62aa2f00001",
	"moduleType":"bh_clue"

};

/*表单查重*/
$.sys_formmerge = {
	"requestcommand" : "sys_formmerge",
	"requesttime": timestamp,
	"userId":"ff808081564905e00156491f30370cf1",
	"fieldName":"ADDRESS",
	"fieldVal":"地址",
	"moduleType":"bh_clue",
	"firstTableName":"bh_clue",
	"showType":"text",
	"mergeFieldIds":[
		"402890b5564b477c01564b4c1a6b0006"
	],
	"isFirst": 1,
	"currentPage": 1,
	"limit": 10
};

/*表单验证唯一性*/
$.sys_formunique = {
	"requestcommand" : "sys_formunique",
	"requesttime": timestamp,
	"userId":"ff808081564905e00156491f30370cf1",
	"fieldName":"ADDRESS",
	"fieldVal":"地址001",
	"moduleType":"bh_clue",
	"dataId":""
};


/*精选类消息推送*/
$.sys_messagepush = {
	"requestcommand": "sys_messagepush",
	"requesttime": timestamp,
	"isrecieve": "1",
	"messtype": "2"
};
/*轮播图*/
$.sys_getwpicture = {
	"requestcommand": "sys_getwpicture",
	"requesttime": timestamp,
	"pictype": "0"
};
	
})(Test);