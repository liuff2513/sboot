(function($){

var timestamp = (new Date()).valueOf();

/*线索池列表*/
$.cluepool_list = {
	"requestcommand" : "cluepool_list",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",	
	"isHome":"false",	
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
	             ],
    "currentPage":"",// 当前页 
	"limit":"" // 每页记录数               
};
	
/*线索池获取数据详情*/
$.cluepool_getinfobyid = {
	"requestcommand" : "cluepool_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef"
	
};
/*线索已转换详情*/
$.clue_convertinfo = {
	"requestcommand" : "clue_convertinfo",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"455453ffew1w1ef1w2fwwef"

};



/*线索池数据增删改*/
$.cluepool_cud = {
	"requestcommand" : "cluepool_cud",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",
	"isCUD":"add",
	"formFields":[],
	"cluePoollist":[
	            {"name":"name",
	            "address":"地址",
	            "website":"www.baidu.com",
	            "fax":"151651615",
	            "contactName":"联系人名称",
	            "position":"职位",
	            "sex":"男",
	            "mobilePhone":"151651615",
	            "fixedPhone":"1155155131",
	            "birthday":"生日",
	            "wechat":"4655sdsd",
	            "qq":"1057311510",
	            "email":"ljlj@qq.com"}
	            ]
	
};

/*线索池认领*/
$.cluepool_claim = {
	"requestcommand" : "cluepool_claim",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",	
	"id":"402890b7507e066f01507e0bc7360000"
		
}

/*线索列表*/
$.clue_list = {
	"requestcommand" : "clue_list",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",	
	"isHome":"false",	
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
	             ],
    "currentPage":"",// 当前页 
	"limit":"" // 每页记录数              
};
	
/*客户池获取数据详情*/
$.clue_getinfobyid = {
	"requestcommand" : "clue_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef"
	
};

/*线索池数据增删改*/
$.clue_cud = {
	"requestcommand" : "clue_cud",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",
	"isCUD":"add",
	"cluelist":[
	            {"name":"name",
	            "address":"地址",
	            "website":"www.baidu.com",
	            "fax":"151651615",
	            "contactName":"联系人名称",
	            "contactId":"联系人名称",
	            "position":"职位",
	            "sex":"男",
	            "mobilePhone":"151651615",
	            "fixedPhone":"1155155131",
	            "birthday":"生日",
	            "wechat":"4655sdsd",
	            "qq":"1057311510",
	            "email":"ljlj@qq.com"}
	            ]
	
};

/*线索数据打回*/
$.clue_claimback = {
	"requestcommand" : "clue_claimback",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",	
	"id":"402890b45138e3ab015138e6169d0000",
	"reason":"打回原因"
};

	
/*线索转换客户*/
$.clue_convert = {
	"requestcommand" : "clue_convert",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",	
	"id":"402893b352fc6fb50152fc74f3410000"
};


/*线索转换客户确定*/
$.clue_convertoper = {
	"requestcommand" : "clue_convertoper",
	"requesttime": timestamp,
	"userId":"402893c05383ba8d015383d1809c0000",
	"opportunity":{
		"name":"商机名",
		"source":"机会来源",
		"contractSum":"200.00",
		"contractDate":"2015-12-23 12:25:25",
		"exceptedDealDate":"2015-12-23 12:25:25",
		"exceptedDealSum":"205.23",
		"status":"初级阶段"
	},
	"clueConvert":{
		"clueId":"402893be53cf90eb0153d04c50b30005",
		"ownerId":"402893c05383ba8d015383d1809c0000",
		"ownerName":"胡歌",
		"contactId":"",
		"customerId":"",
		"customerType":"1",
		"contactType":"1"
	}
		
};

/*评论列表*/
$.clue_comments = {
	"requestcommand" : "clue_comments",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"455453ffew1w1ef1w2fwwef"	
		
}
/*评论列表*/
$.cluepool_comments = {
	"requestcommand" : "cluepool_comments",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"455453ffew1w1ef1w2fwwef"	
		
}

	
})(Test);