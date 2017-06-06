(function($){

var timestamp = (new Date()).valueOf();

/*客户池列表*/
$.custpool_list = {
	"requestcommand" : "custpool_list",
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
	
/*客户池数据增删改*/
$.custpool_cud = {
	"requestcommand" : "custpool_cud",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"58204rt5483fgbnhy34rfdw",
	"isCUD":"add",
	"formFields":[],
	"custPoollist":[
	            {"name":"公司name",
	            "address":"石家庄",
	            "website":"www.google.com",
	            "fax":"125485296",
	            "customerStatus":"洽谈中",
	            "creatorName":"creatorName",
				"modifierName":"modifierName",
				"clueCreatorName":"线索创建者名称"}
	            ]
	
};

/*客户池获取数据详情*/
$.custpool_getinfobyid = {
	"requestcommand" : "custpool_getinfobyid",
	"requesttime": timestamp,
	"userId":"ff80808153a67b9f0153baf49c0f0048",
	"formtemplateVer":"none",
	"moduleId":"402893b74fedf947014fedf957030002",
	"id":"402893c654128e7d01541297e2cc0002"
	
};

/*客户池获取数据详情基本信息*/
$.cust_getinfobyid2 = {
	"requestcommand" : "cust_getinfobyid2",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"455453ffew1w1ef1w2fwwef"


}


/*客户池数据认领*/
$.custpool_claim = {
	"requestcommand" : "custpool_claim",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",	
	"id":"402893bb50d6280d0150d62aa2f00001"
		
}




/*共享*/
$.custpool_share = {
	"requestcommand" : "custpool_share",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001"
		
};



/*客户池列表*/
$.cust_list = {
	"requestcommand" : "cust_list",
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
	
/*客户池数据增删改*/
$.cust_cud = {
	"requestcommand" : "cust_cud",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"58204rt5483fgbnhy34rfdw",
	"isCUD":"add",
	"custlist":[
	            {"name":"公司name",
	            "address":"石家庄",
	            "website":"www.google.com",
	            "fax":"125485296",
	            "customerStatus":"洽谈中",
	            "creatorName":"creatorName",
				"modifierName":"modifierName",
				"clueCreatorName":"线索创建者名称"}
	            ]
	
};

/*客户获取数据详情*/
$.cust_getinfobyid = {
	"requestcommand" : "cust_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893c6540d71bf01540d9b91e80013",
	"formtemplateVer":"none",
	"moduleId":"402893b74fedf947014fedf957030002",
	"id":"402893be542d7cc201542e63f1fa0008"
	
};

/*客户打回*/
$.cust_claimback = {
	"requestcommand" : "cust_claimback",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",	
	"id":"402890b4513cb75e01513cba35ee0000",
	"reason":"打回原因"
}



/*客户池获取联系人*/
$.custpool_getcontacts = {
	"requestcommand" : "custpool_getcontacts",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"isCUD":"add",
	"id":""
		
}
/*评论列表*/
$.custpool_comments = {
	"requestcommand" : "custpool_comments",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"455453ffew1w1ef1w2fwwef"	
		
}
/*评论列表*/
$.cust_comments = {
	"requestcommand" : "cust_comments",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"455453ffew1w1ef1w2fwwef"	
		
}

/*客户原因*/
$.cust_backreason = {
	"requestcommand" : "cust_backreason",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001"

}

/*附近的客户*/
$.cust_nearbycus = {
	"requestcommand" : "cust_nearbycus",
	"requesttime": timestamp,
	"userId":"402893c6540d71bf01540d9b91e80013",
	"moduleType":"bh_customer","moduleId":"402893b74fedf947014fedf957030002",
	"jd":114.071266,
	"wd":22.546742,
	"bj":50000

}
/*币种*/
$.cust_currency = {
	"requestcommand" : "cust_currency",
	"requesttime": timestamp,
	"userId":"402893c6540d71bf01540d9b91e80013"
}
/*结算方式*/
$.cust_settlement = {
	"requestcommand" : "cust_settlement",
	"requesttime": timestamp,
	"userId":"402893c6540d71bf01540d9b91e80013"
}

	
})(Test);