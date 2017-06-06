(function($){

var timestamp = (new Date()).valueOf();

/*列表*/
$.contact_list = {
	"requestcommand" : "contact_list",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",	
	"isHome":"false",	
	"listtemplateVer":"none",	
	"orderField":"createdTime",	
	"orderType":"desc",
	"id":"",
	"customerId":"",
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
	
/*获取数据详情*/
$.contact_getinfobyid = {
	"requestcommand" : "contact_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef"
	
};
/*获取数据详情*/
$.contact_getinfobyid2 = {
	"requestcommand" : "contact_getinfobyid2",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"455453ffew1w1ef1w2fwwef"

};



/*数据增删改*/
$.contact_cud = {
	"requestcommand" : "contact_cud",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",
	"isCUD":"add",
	"formFields":["name","position","sex"],
	"contactlist":[
	            {"name":"name",
	            "position":"职位",
	            "mobilePhone":"手机号",
	            "sex":"男",
	            "birthday":"生日",
	            "weChat":"4655sdsd",
	            "qq":"1057311510",
	            "email":"ljlj@qq.com"}
	            ]

};

/*通讯录*/
$.contact_txl = {
	"requestcommand" : "contact_txl",
	"requesttime": timestamp,
	"userId":"402893c6540d71bf01540d9b91e80013",
	"moduleId":"402893b74fedf947014fedf957030003"

};




})(Test);