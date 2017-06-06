(function($){

var timestamp = (new Date()).valueOf();

/*列表*/
$.activity_list = {
	"requestcommand" : "activity_list",
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
$.activity_getinfobyid = {
	"requestcommand" : "activity_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef"
	
};
/*活动效果*/
$.activity_results = {
	"requestcommand" : "activity_results",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"455453ffew1w1ef1w2fwwef"
};

/*市场活动关联已有的保存*/
$.activity_savereldatas = {
	"requestcommand" : "activity_savereldatas",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",//市场活动Id
	"relationDataIds":"",//添加的数据Id ，号分割
	"moduleType":"bh_clue", //表名
	"inviteStatus":"已邀约" //邀约状态

};

/*数据增删改*/
$.activity_cud = {
	"requestcommand" : "activity_cud",
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
$.activity_comments = {
	"requestcommand" : "activity_comments",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"455453ffew1w1ef1w2fwwef"	
		
}


})(Test);