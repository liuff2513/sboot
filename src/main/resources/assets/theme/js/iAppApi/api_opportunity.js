(function($){

var timestamp = (new Date()).valueOf();

/*销售机会列表*/
$.opportunity_list = {
	"requestcommand" : "opportunity_list",
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
	
/*销售机会获取数据详情*/
$.opportunity_getinfobyid = {
	"requestcommand" : "opportunity_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef"
	
};


/*销售机会数据增删改*/
$.opportunity_cud = {
	"requestcommand" : "opportunity_cud",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",
	"isCUD":"add",
	"formFields":[],
	"opportunitylist":[
	            {"name":"商机名",
	            "contactId":"联系人Id",
	            "contactName":"联系人名称",
	            "source":"机会来源",
	            "dealReason":"成交原因",
	            "salesCycle":"成交周期"
	            }
	            ]


};
/*评论列表*/
$.opportunity_comments = {
	"requestcommand" : "opportunity_comments",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"455453ffew1w1ef1w2fwwef"	
		
}

/*获取阶段历史列表*/
$.opportunity_stagehislist = {
	"requestcommand" : "opportunity_stagehislist",
	"requesttime": timestamp,
	"userId":"402890b556d957a20156da3b88a10077",
	"id":"402890b5573c057501573c4bab950512",
	"searchVallist":"",
	"currentPage":"",// 当前页
	"limit":"" // 每页记录数

}

/*获取联系人角色列表*/
$.opportunity_conrolelist = {
	"requestcommand" : "opportunity_conrolelist",
	"requesttime": timestamp,
	"userId":"ff808081564905e00156491f30370cf1",
	"id":"402890b5564e83ab01564f1c32130014",
	"relType":"1",
	"searchVallist":"",
	"currentPage":"",// 当前页
	"limit":"" // 每页记录数

};

/*获取联系人角色新增/编辑*/
$.opportunity_conroleedit = {
	"requestcommand" : "opportunity_conroleedit",
	"requesttime": timestamp,
	"userId":"ff808081564905e00156491f30370cf1",
	"id":"402890b5564e83ab01564f1c32130014",
	"opName":"add",
	"conroleeditlist":[
		{
			"contactId":"联系人Id",
			"contactRole":"联系人角色"
		}
	]
};
/*获取联系人角色删除*/
$.opportunity_conroledel = {
	"requestcommand" : "opportunity_conroledel",
	"requesttime": timestamp,
	"userId":"ff808081564905e00156491f30370cf1",
	"id":"402890b5564e83ab01564f1c32130014",
	"conIds":[
		"as4g343145f3f3sd344442feewfr3fw"
	]
};

})(Test);