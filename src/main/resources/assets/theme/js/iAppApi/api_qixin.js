(function($){

var timestamp = (new Date()).valueOf();

/*消息列表*/
$.qixin_messagelist = {
	"requestcommand" : "qixin_messagelist",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"searchKeyWord":"",
	"pageNo":"",
	"pageSize":""
};


/*公告列表*/
$.qixin_noticelist = {
	"requestcommand" : "qixin_noticelist",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"searchKeyWord":"",
	"pageNo":"",
	"pageSize":"",
	"pageNoComment":"",
	"pageSizeComment":"",
	"type":"1"//1.公告列表 2.我的公告列表 3.草稿列表 *
	
};

/*关注列表*/
$.qixin_attentionlist = {
	"requestcommand" : "qixin_attentionlist",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"moduleId":"",
	"modifierName":"",
	"modifiedTime":"",
	"pageNo":"",
	"pageSize":"",
	"pageNoComment":"",
	"pageSizeComment":""
	
		
};

/*审批列表*/
$.qixin_approvelist = {
	"requestcommand" : "qixin_approvelist",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"searchKeyWord":"",
	"pageNo":"",
	"pageSize":"",
	"type":"" //1.待我审批 2.我的申请 *
	
}

/*预警列表*/
$.qixin_waringlist = {
	"requestcommand" : "qixin_waringlist",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"searchKeyWord":"",
	"pageNo":"",
	"pageSize":""
		
}




})(Test);