(function($){

var timestamp = (new Date()).valueOf();

/*列表*/
$.contract_list = {
	"requestcommand" : "contract_list",
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
	
/*数据详情*/
$.contract_getinfobyid = {
	"requestcommand" : "contract_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef"
	
};


/*数据增删改*/
$.contract_cud = {
	"requestcommand" : "contract_cud",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",
	"isCUD":"add",
	"formFields":[],
	"productlist":[
		            {"productId":"34t43t34t334t3tt",
		            "productName":"产品名称",
		            "productPrice":"产品单价",
		            "singlePrice":"定价",
		            "productNum":"数量",
		            "taxRate":"税",
		            "tax":"税费",
		            "adjust":"调整",
		            "discountRate":"折扣",
		            "totalMoney":"总额"}
		            ],
	"contractlist":[
	                
	            {
	            "ownerId":"34t43t34t334t3tt",
	            "ownerName":"34t43t34t334t3tt",
	            "contractNo":"34t43t34t334t3tt",
	            "contractType":"合同类型",
	            "contractState":"合同状态",
	            "contactId":"34t43t34t334t3tt",
	            "contactName":"联系人名称",
	            "customerId":"kjoiojojoj34f23rf23rf",
	            "customerName":"客户名称",
	            "signPersonId":"2015-12-12",
	            "signPersonName":"合同签订人",
	            "opportunityId":"232r2f323f2f23f",
	            "opportunityName":"销售机会",
	            "name":"合同名称",
	            "productNum":"产品品种数量",
	            "noTaxSubtotal":"未含税总计",
	            "discountRate":"折扣",
	            "adjust":"12",
	            "totalMoney":"总金额",
	            "accumulativeTotal":"累计"
	            }
	            ]


};
/*获取产品*/
$.contract_getproducts = {
	"requestcommand" : "contract_getproducts",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"searchVal":""
	
};






})(Test);