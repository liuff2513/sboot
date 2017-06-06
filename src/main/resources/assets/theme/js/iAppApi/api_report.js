(function($){

var timestamp = (new Date()).valueOf();

/*列表*/
$.report_list = {
	"requestcommand" : "report_list",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",	
	"isHome":"false",	
	"listtemplateVer":"none",	
	"orderField":"createdTime",	
	"orderType":"desc",
	"id":"",
	"moduleType":"",
	"moduleId":"402893b74fedf704014fedf713c80000",
	"reportType":"",//0 我的报告 1 报告给我的 2 @或转发给我的 3 草稿箱
	"searchVallist":"",
	"dicSearch":[
	             {
	            	"dicPojoName":"TYPE",
	            	"dicValues":[
	            	             "日报",
	            	             "月报",
	            	             "周报"
	            	             ]
	            	 
	             }
	             
	             
	             ],
     "currentPage":"",// 当前页 
     "limit":"" // 每页记录数   
};
	
/*获取数据详情*/
$.report_getinfobyid = {
	"requestcommand" : "report_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef"
	
};


/*数据增删改*/
$.report_cud = {
	"requestcommand":"report_cud",
	"requesttime":timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"isCUD":"create", // create 新增，update 修改  delete 删除
	"id":"",//修改或删除时 传值
	"reportStatus":"1",//1保存  0保存草稿
	"type":"报告类型",
	"reportContent":"报告内容",
	"name":"报告主题",
	"reportPlan":"报告计划",
	"relevanceContent":"@的人或组织",
	"relevanceUserIds":[
	                    "1212212222",
	                    "8655445464",
	                    ],
	"groupIds":"",
	"userIds":"",
	"orgIds":"",
	"texts":"",
	"annexs":["url1","url2"] //附件URL

	/*private String orgTexts;
	private String groupTexts;
	private String userTexts;
	private String htmlText;*/


};

/*转发 点赞 评论 已阅*/
$.report_operate = {
	"requestcommand":"report_operate",
	"requesttime":timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"reportOpear":"1", // 用于对工作报告的评论 ， 点赞（1） ， 转发（2）  ， 已阅（3） ,取消点赞（4） 的 操作
	"id":"",//工作报告 Id
	"relevanceOrgIds":[],//@的组织ID
	"relevanceGroupIds":[],//@的组ID
	"relevanceUserIds":[],//@的用户ID
	"sharePeopleContent":""//人或组织所分享的内容
		
};


})(Test);