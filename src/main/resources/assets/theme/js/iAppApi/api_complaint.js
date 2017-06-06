(function($){

var timestamp = (new Date()).valueOf();

/*列表*/
$.complaint_list = {
	"requestcommand" : "complaint_list",
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
$.complaint_getinfobyid = {
	"requestcommand" : "complaint_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef"
	
};


/*数据增删改*/
$.complaint_cud = {
	"requestcommand" : "complaint_cud",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",
	"isCUD":"add",
	"formFields":[],
	"complaintlist":[
	            {"cName":"名称",
	            "cPhone":"1245789656",
	            "details":"投诉内如"}
	            ]


};

/*评论列表*/
$.complaint_comments = {
	"requestcommand" : "complaint_comments",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"455453ffew1w1ef1w2fwwef"	
		
};



})(Test);