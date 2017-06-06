(function($){

var timestamp = (new Date()).valueOf();

/*列表*/
$.assignment_list = {
	"requestcommand" : "assignment_list",
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
	             {
	            	"dicPojoName":"STATUS",
	            	"dicValues":[
	            	             "未启动"
	            	             ]
	            	 
	             }
	             ],
	 "currentPage":"",// 当前页 
	 "limit":"" // 每页记录数                        
};
	
/*获取数据详情*/
$.assignment_getinfobyid = {
	"requestcommand" : "assignment_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef"
	
};

/*数据增删改*/
$.assignment_cud = {
	"requestcommand" : "assignment_cud",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",
	"isCUD":"add",
	"formFields":[],
	"assigpara":{
		"fatherId":"41541413232",
		"beginDate":"2016-05-15",
		"endDate":"2016-05-25",
		"repeatType":"aday",//重复类型：每日 aday;每周 aweek;每月 amonth;每年 ayear;
		"aday":"1",
		"adaySpace":"2",
		"aweekSpace":"2",
		"aweekNum":["2","3"],
		"amonth":"1",
		"amonthNum":"2",
		"amonthDayNum":"10",
		"amonthNoAweek":"2",
		"amonthAweekNum":"3",
		"ayear":"1"
	},
	"assignmentlist":[
	            {"模板中pojoProperty":"值"}
	            ]

};

})(Test);