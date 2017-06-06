(function($){

var timestamp = (new Date()).valueOf();

/*列表*/
$.outdoor_list = {
	"requestcommand" : "outdoor_list",
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
$.outdoor_getinfobyid = {
	"requestcommand" : "outdoor_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef"
	
};


/*数据增删改*/
$.outdoor_cud = {
	"requestcommand" : "outdoor_cud",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",
	"isCUD":"add",
	"formFields":[],
	"outdoorlist":[
	            {"name":"名称",
	            "brand":"品牌",
	            "type":"类型是啥"}
	            ]


};

/*评论列表*/
$.outdoor_comments = {
	"requestcommand" : "outdoor_comments",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"455453ffew1w1ef1w2fwwef"	
		
};



})(Test);