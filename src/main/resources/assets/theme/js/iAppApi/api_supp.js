(function($){

var timestamp = (new Date()).valueOf();


/*列表*/
$.supp_list = {
	"requestcommand" : "supp_list",
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

/*数据增删改*/
$.supp_cud = {
	"requestcommand" : "supp_cud",
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

/*获取数据详情*/
$.supp_getinfobyid = {
	"requestcommand" : "supp_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893c6540d71bf01540d9b91e80013",
	"formtemplateVer":"none",
	"moduleId":"402893b74fedf947014fedf957030002",
	"id":"402893be542d7cc201542e63f1fa0008"
	
};



	
})(Test);