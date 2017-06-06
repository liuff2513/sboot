(function($){

var timestamp = (new Date()).valueOf();

/*列表*/
$.apply_list = {
	"requestcommand" : "apply_list",
	"requesttime": timestamp,
	"userId":"402893c05383ba8d015383d1809c0000",	
	"isHome":"true",	
	"listtemplateVer":"none",	
	"orderField":"createdTime",	
	"orderType":"desc",	
	"id":"",
	"moduleType":"",
	"moduleId":"402893b74fedf704014fedf713c80000",
	"applyType":"2",//1 我的申请 2 待我审批 3 全部审批
	"searchVallist":"",
	"dicSearch":[
	             {
	            	"dicPojoName":"APPROVAL_STATUS",
	            	"dicValues":[
	            	             "审批中"
	            	             ]
	            	 
	             }
	             
	             
	             ],
	 "currentPage":"",// 当前页 
	 "limit":"" // 每页记录数               
};
	
/*审批获取数据详情*/
$.apply_getinfobyid = {
	"requestcommand" : "apply_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef",
	"moduleType":"bh_clue"
	
};


/*数据增删改*/
$.apply_cud = {
	"requestcommand" : "apply_cud",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",
	"isCUD":"add",
	"formFields":["name","status","startDate"],
	"activitylist":[
	            {"name":"拜访目的",
	            "status":"拜访地址",
	            "startDate":"2015-10-12",
	            "endDate":"2015-12-13"}
	            ]

};

/*评论列表*/
$.apply_comments = {
	"requestcommand" : "activity_comments",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"455453ffew1w1ef1w2fwwef"	
		
}


})(Test);