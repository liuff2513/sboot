(function($){

var timestamp = (new Date()).valueOf();

/*列表*/
$.communication_list = {
	"requestcommand" : "communication_list",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",	
	"isHome":"false",	
	"listtemplateVer":"none",	
	"orderField":"createdTime",	
	"orderType":"desc",
	"id":"",
	"moduleType":"",
	"moduleId":"402893b74fedf704014fedf713c80000",
	"viewId":"",
	"searchVallist":"",
	"dicSearch":[
	             ],
     "currentPage":"",// 当前页 
	 "limit":"" // 每页记录数          
};
	
/*数据详情*/
$.communication_getinfobyid = {
	"requestcommand" : "communication_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef"
	
};


/*数据增删改*/
$.communication_cud = {
	"requestcommand" : "communication_cud",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",
	"isCUD":"add",
	"formFields":[],
	"communicationlist":[
	            {"name":"名称",
	            "mobile":"品牌",
	            "status":"状态",
	            "result":"结果"}
	            ]


};

/*评论列表*/
$.communication_comments = {
	"requestcommand" : "communication_comments",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"455453ffew1w1ef1w2fwwef"	
		
};



})(Test);