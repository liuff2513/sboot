(function($){

var timestamp = (new Date()).valueOf();

/*拜访列表*/
$.visit_list = {
	"requestcommand" : "visit_list",
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
	
/*拜访获取数据详情*/
$.visit_getinfobyid = {
	"requestcommand" : "visit_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef"
	
};


/*拜访数据增删改*/
$.visit_cud = {
	"requestcommand" : "visit_cud",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",
	"isCUD":"add",
	"formFields":[],
	"visitlist":[
	            {"purpose":"拜访目的",
	            "address":"拜访地址",
	            "beginTime":"2015-10-12",
	            "endTime":"2015-12-13",
	            "planTime":"2015-12-12"}
	            ]

};
/*拜访计划相关接口*/
$.visit_visitplan = {
	"requestcommand" : "visit_visitplan",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"visitPlanType":"1",

};

/*拜访开始或结束*/
$.visit_startorendvisit = {
	"requestcommand" : "visit_startorendvisit",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"visitType":"start",
	"id":"4fr21dvf1erdv1dbde1er1sd1ad20000",
	"bhvisit":{
		"purpose":"目的",
		"result":"拜访结果",
		"beginTime":"2015-12-23 12:25:21",
		"endTime":"2015-12-23 12:25:25",
		"status":"未拜访 拜访中 拜访结束",
		"beginLocation":"开始位置",
		"endLocation":"结束位置",
		"beginJd":"开始经度",
		"beginWd":"开始纬度",
		"endJd":"结束经度",
		"endWd":"结束纬度",
		"bphoto1":"原图",
		"sphoto1":"缩略图",
		"bphoto2":"原图",
		"sphoto2":"缩略图",
		"bphoto3":"原图",
		"sphoto3":"缩略图"
	}
		
};
/*评论列表*/
$.visit_comments = {
	"requestcommand" : "visit_comments",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"455453ffew1w1ef1w2fwwef"	
		
}

})(Test);