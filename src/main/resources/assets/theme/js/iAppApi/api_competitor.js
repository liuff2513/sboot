(function($){

var timestamp = (new Date()).valueOf();

/*列表*/
$.competitor_list = {
	"requestcommand" : "competitor_list",
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
$.competitor_getinfobyid = {
	"requestcommand" : "competitor_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef"
	
};


/*数据增删改*/
$.competitor_cud = {
	"requestcommand" : "competitor_cud",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",
	"isCUD":"add",
	"formFields":[],
	"competitorlist":[
	            {"name":"名称",
	            "url":"http://www.baidu.com",
	            "superiority":"优势",
	            "disadvantaged":"劣势"
	            }
	            ]


};

/*评论列表*/
$.competitor_comments = {
	"requestcommand" : "competitor_comments",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"455453ffew1w1ef1w2fwwef"	
		
};



})(Test);