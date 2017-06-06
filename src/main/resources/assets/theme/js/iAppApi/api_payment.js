(function($){

var timestamp = (new Date()).valueOf();

/*回款列表*/
$.payment_list = {
	"requestcommand" : "payment_list",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"contractId":"402893b351b855300151b858480d0000",
	"payType":"plan"
		
};
	
/*数据详情*/
$.payment_plangetinfobyid = {
	"requestcommand" : "payment_plangetinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef",
	"contractId":"402893b351b855300151b858480d0000"
	
};

/*回款 计划增删改*/
$.payment_plancud = {
		"requestcommand" : "payment_plancud",
		"requesttime": timestamp,
		"userId":"402893bb50d6280d0150d62aa2f00001",
		"id":"",
		"contractId":"402893b351b855300151b858480d0000",
		"isCUD":"add",
		"paymentlist":[
		            {"name":"2",
		            "actualPaymentMoney":"1200",
		            "paymentMoney":"1200",
		            "paymentDate":"1200"
		            }
		            ]

};

/*回款 实际增删改*/
$.payment_actualcud = {
		"requestcommand" : "payment_actualcud",
		"requesttime": timestamp,
		"userId":"402893bb50d6280d0150d62aa2f00001",
		"id":"",
		"contractId":"402893b351b855300151b858480d0000",
		"contractName":"合同名称",
		"paymentId":"计划回款Id",
		"isCUD":"add",
		"paymentactuallist":[
		            {
		            "actualPaymentDate":"2015-12-23",
		            "actualPaymentMoney":"1200",
		            "name":"2",
		            "isBill":"是",
		            "billType":"普通"}
		            ]

};


/*数据详情*/
$.payment_actualgetinfobyid = {
	"requestcommand" : "payment_actualgetinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef",
	"contractId":"402893b351b855300151b858480d0000"
	
};


})(Test);