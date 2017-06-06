(function($){

var timestamp = (new Date()).valueOf();

/*列表*/
$.custom1_list = {
	"requestcommand" : "custom1_list",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",	
	"isHome":"true",	
	"listtemplateVer":"none",	
	"orderField":"createdTime",	
	"orderType":"desc",	
	"id":"",
	"moduleType":"",
	"moduleId":"402893b74fedf704014fedf713c80000",
	"relType":"",// 1 关联已有的选择 2 关联中的新增
	"viewId":"",
	"searchVallist":"",
	"dicSearch":[
	             {
	            	"dicPojoName":"type",
	            	"dicValues":[
	            	             "网络推广1",
	            	             "网络推广2"
	            	             ]
	            	 
	             }
	             
	             
	             ],
	 "currentPage":"",// 当前页 
	 "limit":"" // 每页记录数               
};
	
/*获取数据详情*/
$.custom1_getinfobyid = {
	"requestcommand" : "custom1_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef"
	
};


/*数据增删改*/
$.custom1_cud = {
	"requestcommand" : "custom1_cud",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",
	"isCUD":"add",
	"formFields":["name","status","startDate"],
	"customlist":[
	            {"name":"",
	            "remark":""
	            }
	            ]

};


})(Test);