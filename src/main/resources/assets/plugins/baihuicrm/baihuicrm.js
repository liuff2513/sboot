/**
 * baihuicrm div替换iframe设计
 */
$("[data-toggle='tooltip']").tooltip({html:true});
var erpTrIndex= 0,isERPLookuplistOperation =false;//erp收付款

var webName = "百会 CRM",contentMain = "#content-main", homeModule="home", homeLinkURL="./home/homepage?", sideMenuClick=false,
	initParamNames=["function.id","function.name","function.tableName","function.entityName","function.entityClass",
		"function.link","function.nameSpace","function.actionName","nameSpace","actionName"];
//声明特殊操作Link
var specialLink = {
		"home": "./home/homepage", //主页
		"contactrole": "./opportunity/contactroleDetail", //商机下联系人角色
		"reportForm": "./reportForm/reportFormList",//报表
		"reportFormPlan": "./reportFormPlan/reportFormPlanList",//报表计划表
		"chartDashboardRecord": "./chartDashboardRecord/chartDashboardRecordList",//表
		"documentFile": "./documentFile/documentList",//文档
		"qixinMessage": "./qixinMessage/qixinMessageList",//消息及公告
		"qixinWaring": "./qixinWaring/qixinWaringList",//预警
		"qixinAttentionField": "./qixinAttentionField/qixinAttentionFieldList",//关注
		"qixinApprove": "./qixinApprove/qixinApproveList",//审批
		"qixinNotice": "./qixinNotice/qixinNoticeList",//公告
		"qixinNoticeView": "./qixinNotice/qixinNoticeView",//公告查看
		"qixinNoticeUpdate": "./qixinNotice/qixinNoticeUpdate",//公告修改
		"qixinNoticeCreate": "./qixinNotice/qixinNoticeCreate",//公告创建
		"qixinMessageCreate": "./qixinNotice/qixinNoticeCreate",//快速创建公告
		"qixinWorkReport": "./qixinWorkReport/qixinWorkReportList",//工作报告
		"qixinWorkReportView": "./qixinWorkReport/qixinWorkReportView",//工作报告查看
		"qixinWorkReportCreate": "./qixinWorkReport/qixinWorkReportCreate",//工作报告新增
		"qixinWorkReportUpdate": "./qixinWorkReport/qixinWorkReportUpdate",//工作报告修改
		"receiveMail": "./receiveMail/receiveMailList",//信箱
		"receiveMailView": "./receiveMail/receiveMailView",//信箱查看
		"predictItem": "./predictItem/predictItemCreate",//预测
		"queryListForDelete": "./batch/queryListForDelete", //批量删除
		"queryListForUpdate": "./batch/queryList", //批量更新
		"queryListForOwnner": "./batch/queryListForOwnner", //批量更改所有者
		"queryListForMessage": "./batch/queryListForMessage", //批量发短信
		"queryListForEmail": "./batch/queryListForEmail", //批量发邮件
		"repeatToPage": "./repeat/toPage", //查重合并第一步
		"repeatQueryReapetedList": "./repeat/queryReapetedList", //查重合并第二步
		"repeatToThirdStep": "./repeat/toThirdStepPage", //查重合并第三步
		"repeatToFourthStep": "./repeat/fourthStep", //查重合并第四步
		"assignment": "./assignment/assignmentList", //
		"assignmentCreate": "./assignment/assignmentCreate",
		"assignmentSubCreate": "./assignment/assignmentCreate",
		"assignmentDelete": "./assignment/assignmentDelete",
		"assignmentUpdate": "./assignment/assignmentUpdate",
		"assignmentView": "./assignment/assignmentView",
		"requirement": "./requirement/requirementList",
		"requirementCreate": "./requirement/requirementCreate",
		"requirementDelete": "./requirement/requirementDelete",
		"requirementDelete": "./requirement/requirementUpdate",
		"requirementView": "./requirement/requirementView",
		"apply": "./apply/applyList",
		"applyCreate": "./apply/applyCreate",
		"applyDelete": "./apply/applyDelete",
		"applyUpdate": "./apply/applyUpdate",
		"applyView": "./apply/applyView",
		"approval": "./approval/approvalList",
		"approvalCreate": "./approval/approvalCreate",
		"approvalDelete": "./approval/approvalDelete",
		"approvalUpdate": "./approval/approvalUpdate",
		"approvalView": "./approval/approvalView",
		"requirement": "./requirement/requirementList",
		"requirementCreate": "./requirement/requirementCreate",
		"requirementDelete": "./requirement/requirementDelete",
		"requirementUpdate": "./requirement/requirementUpdate",
		"requirementView": "./requirement/requirementView",
		"currency":"./currency/currencyList",
		"currencyCreate": "./currency/currencyCreate",//币种
		"currencyView": "./currency/currencyView",//币种
		"settlementCreate": "./settlement/settlementCreate",//结算方式
		"verificationReceipt": "./verificationReceipt/receiptList",//收款核销
		"verificationReceiptView": "./verificationReceipt/verificationReceiptView",//收款核销
		"verificationReceiptDelete": "./verificationReceipt/verificationReceiptDelete",//收款核销
		"verificationPay": "./verificationPay/payList",//付款核销
		"verificationPayView": "./verificationPay/verificationPayView",//付款核销
		"verificationPayDelete": "./verificationPay/verificationPayDelete",//付款核销
		"payable":"./payable/payableList",//应付
		"payableView":"./payable/payableView",
		"receivable":"./receivable/receivableList",//应收
		"receivableView":"./receivable/receivableView"


};

/*菜单点击事件*/
$("#side-menu li a").bind("click", function(event) {
	if(!this.href || this.href.indexOf("#")!=-1) return false;//href为空或者为'#' return false 不执行
	var paramsJsonString = $(this).attr("data-params");
	var paramsJson = JSON.parse(paramsJsonString.replace(new RegExp("'",'gm'), "\""));
	var linkModule = linkModuleMap.get(paramsJson['module']);
	var module = paramsJson['module'];
	//清除linkModule中多余的参数
	for(var i in linkModule) {
		if(initParamNames.indexOf(i) < 0) delete linkModule[i];
	}
	var ajaxURL = "./"+module+"/entityList";

    if (!!specialLink[module]) {
        ajaxURL = specialLink[module];
        if ("qixinMessage" == module) {
            var qixinMNType = $.cookie("qixinMNType");
            if (qixinMNType) {
                ajaxURL = "./" + qixinMNType + "/" + qixinMNType + "List";
            }else{
				$.cookie("qixinMNType",'qixinMessage',{expires:365,path:'/'});
			}
        } else if ("qixinWorkReport" == module) {
            var qixinWRType = $.cookie("qixinWRType");
            if (qixinWRType) {
                ajaxURL += '?type=' + qixinWRType + '&listFlag=' + qixinWRType;
            }
        }
    }
    //调用ajaxDisplay函数将新页面载入contentMain
    ajaxDisplay(ajaxURL, module, contentMain, null);
    //调用history.pushState 将href写入浏览器历史
    var title = webName + "-" + linkModule['function.name'];
    var linkhref = location.href.split("?")[0] + "?module=" + module;
    if ("qixinWorkReport" == module) {
        var qixinWRType = $.cookie("qixinWRType");
        if (qixinWRType) {
            linkhref += '&type=' + qixinWRType + '&listFlag=' + qixinWRType;
        }
    }
    historyPush(title, linkhref);
    menuLinkDesign(module);
    //清空通用列表搜索结果保留的数据模块数据 保留当前模块下的数据
    var dataMap = localStorage.getItem($.cookie("USER_LOGIN"));
    var map = {};
    if (dataMap != "undefined" && dataMap != null) {
        var datas = $.parseJSON(dataMap);
        for (var key in datas) {
            if (key == module) {
                map[key] = datas[key];
            }
        }
    }
    localStorage.setItem($.cookie("USER_LOGIN"), JSON.stringify(map));
    sideMenuClick = true;
    return false;
});
$("#side-menu").find("*").bind("click", function(event) {
	//当快速创建已弹出时点击左侧菜单，则隐藏快速创建
	$(".navbar-top-links").find("li a").each(function(){
		if($(this).attr("aria-expanded")=="true"){
			$(this).click();//隐藏快速创建弹出框
		}	
	});
});
$(contentMain).delegate("*", "click", function(e) {
	//当快速创建已弹出时点击左侧菜单，则隐藏快速创建
	$(".navbar-top-links").find("li a").each(function(){
		if($(this).attr("aria-expanded")=="true"){
			$(this).click();//隐藏快速创建弹出框
		}	
	});
});
/*快速创建*/
$("#quickAdd").bind("click", function(event) {
	$(".qixinshowHide").hide();
});
$("#quickUL").find(".operation").bind("click", function(event) {
	var paramsJsonString = $(this).attr("data-params");
	var paramsJson = JSON.parse(paramsJsonString.replace(new RegExp("'",'gm'), "\""));
	var linkModule = linkModuleMap.get(paramsJson['module']);
	var module = paramsJson['module'];
	//清除linkModule中多余的参数
	for(var i in linkModule) {
		if(initParamNames.indexOf(i) < 0) delete linkModule[i];
	}
	for(var i in paramsJson) {
		linkModule[i] = paramsJson[i];
	}
	var ajaxURL = "./"+linkModule['nameSpace']+"/entity"+cap_first(linkModule['opName']);
	if(!!specialLink[linkModule['nameSpace']+cap_first(linkModule['opName'])])
		ajaxURL = specialLink[linkModule['nameSpace']+cap_first(linkModule['opName'])];
	//调用ajaxDisplay函数将新页面载入contentMain
	ajaxDisplay(ajaxURL, module, contentMain, null);
	//调用history.pushState 将href写入浏览器历史
	var query = "module="+linkModule['nameSpace'];
	for(var i in paramsJson) {
		if(i!="module")
			query += "&"+i+"="+paramsJson[i];
	}
	var title=webName+"-"+linkModule['function.name'];
	var linkhref=location.href.split("?")[0] + "?" + query;
	historyPush(title, linkhref);
	menuLinkDesign(module);
	//当快速创建已弹出时点击左侧菜单，则隐藏快速创建
	if($("#quickAdd").attr("aria-expanded")=="true"){	
	   $(".headtop01").click();//隐藏快速创建弹出框
	}
	return false;
});
/*模块 链接、操作 点击事件（所有基本操作都在这里）*/
$(contentMain).delegate(".link,.operation", "click", function(event) {
	var paramsJsonString = $(this).attr("data-params");
	var paramsJson = JSON.parse(paramsJsonString.replace(new RegExp("'",'gm'), "\""));
	var linkModule = linkModuleMap.get(paramsJson['module']);
	var module = paramsJson['module'];
	if(module=="product"&&paramsJson["opName"]=="create"){//创建的时候校验产品分类下是否有分类
	   var categoryId = paramsJson["categoryId"];
	   if(validExistCategory(categoryId)=="1"){
	      alert("此产品分类下已有下级分类，不能再新增产品！");
	      return;		   
	   }
	}
	//清除linkModule中多余的参数
	for(var i in linkModule) {
		if(initParamNames.indexOf(i) < 0) delete linkModule[i];
	}
	if(paramsJson["relation"]) { //详情页关联模块的操作
		var relation = relationMap.get(paramsJson["relation"]);
		for(var i in relation) {
			linkModule["relation."+i] = relation[i];
		}
		var relationModule = linkModuleMap.get(paramsJson["relation"]);
		for(var i in relationModule) {
			linkModule["relationData."+i] = relationModule[i];
		}
	}
	for(var i in paramsJson) {
		linkModule[i] = paramsJson[i];
	}
	delete linkModule["module"];
	delete linkModule["relation"];
	/*<<--###################################模块操作判断处理###################################*/
	//声明操作为列表页的操作还是表单页的操作
	var isDetailOperation = false;
	//获取当前地址所带参数
	var nowQuery = location.href.split("?")[1];
	var nowQueryJsonString = "{\""+nowQuery.replace(new RegExp("=",'gm'), "\":\"").replace(new RegExp("&",'gm'), "\",\"")+"\"}";
	var nowQueryJson = JSON.parse(nowQueryJsonString);
	if(!!nowQueryJson["opName"]) isDetailOperation = true; 
	//获取列表上勾选的数据ID
	var checkedIds = "";
	$(contentMain).find("#commonListDiv input[type='checkbox'][name='checkIds']:checked").each(function(){
		checkedIds+=","+this.value;
	});
	if(checkedIds!="") checkedIds = checkedIds.substring(1);
	var opName = linkModule["opName"];
	var entityId=linkModule["entityId"];
	
	//版本控制
	var opNames = ["share","batchShare","claim","batchClaim","back","batchBack","dallocationProtocol"];
	var specailOpNames=["batchDelete","batchUpdate","batchSendEmail","batchSendMsg","batchOwner"];
	if(opNames.indexOf(opName)>-1||specailOpNames.indexOf(opName)>-1){
		if (!versionSupprot(opName)) {
			//批量删除/更新/发邮件/发短信/更改所有者免费版不选数据的情况
			if (specailOpNames.indexOf(opName) > -1 && checkedIds == "") {
				alert("当前版本不支持，请先选择数据！");
				return;
			}
			if (opNames.indexOf(opName) > -1) {
				alert("版本不支持该功能！");
				return;
			}
		}
	}
	
	
	//添加用户数据权限过滤
	//判断数据是否在审批
	if("create"!=opName && "view"!=opName && "share"!=opName && "concern"!=opName && "previousDetail"!=opName && "nextDetail"!=opName){
		var json = getDataApprovalStatus(linkModule["entityId"], opName, linkModule["function.tableName"],linkModule["function.nameSpace"]);
      	if(json){
			var data = JSON.parse(json);
			if(null!=data){
				if(data["isLock"] && data["isLock"]=='1'){
					alert("数据被锁定，无法进行操作！");
					return false;
				}else if(data["approvalStatus"] && data["approvalStatus"]=="0"){
					alert("数据审批中，无法进行操作！");
					return false;
				}else if(data["approvalStatus"] && data["approvalStatus"]=="2"){
					alert("数据被驳回，只能进行修改和删除！");
					return false;
				}else if(data["refState"] && data["refState"]=="1"){
					if(linkModule["function.tableName"]=="bh_product"){
					   if(opName=="delete"){
						  alert("数据被引用，无法进行删除！");
						  return false;
					   }
					}else{
					   alert("数据被引用，无法进行操作！");
					   return false;
					}
				}
			}

		}
	}
	//已转换视图的数据不判断批量操作的权限
	var select_viewId =  $("span[class='all-select-in']").find("p").html();
	//单条数据判断是否拥有权限
	if(("close,open,update,delete,back,claim,convert,share,changeOwner,updateMemberStatus".indexOf(opName)!=-1)){
		entityId = excludesNoPermissionDataId(linkModule);
		if(!entityId){
			alert("对不起，您没有此操作权限！");
			return false;
		}
		//批量数据排除无权限数据，然后执行批量操作
	}else if("view_clue_con"!=select_viewId && ((opName.indexOf("batch")==0&&opName!="batchSendMsg"&&opName!="batchSendEmail")||"dallocationProtocol".indexOf(opName)!=-1)){
		if(checkedIds.length>0){
			checkedIds = excludesNoBatchPermissionDataIds(checkedIds, linkModule);
			if(!checkedIds){
				alert("对不起，您没有此操作权限！");
				return false;
			}
		}
	}
	//判断短信账号密码是否配置
	if("batchSendMsg"===opName){
		var flag = checkSendMsg();
		if(flag==false){
			return;
		}
	}
	if((opName=="update"||opName=="batchUpdate")&&(linkModule["function.tableName"]=="bh_communication"||linkModule["function.tableName"]=="bh_visit")){
		if(checkStatus(linkModule["entityId"],linkModule)==false){
			return;
		}
	}

	//执行操作	
	if(opName === "import") {//导入
		//调用ajaxDisplay函数将新页面载入contentMain
		ajaxDisplay("./import/commonImport", module, contentMain, null);
		//调用history.pushState 将href写入浏览器历史
		var title=webName+"-"+linkModule['function.name'];
		var linkhref=location.href.split("?")[0] + "?module="+module+"&opName=import";
		historyPush(title, linkhref);
	}else if(opName === "export") {//导出
		postURL("./export/commonExport?ids="+checkedIds, linkModule, "_self");
	}else if(opName === "claim") {//认领
		detailOpera_claim(paramsJson,linkModule);
	}else if(opName === "back") {//打回
		detailOpera_back(paramsJson,linkModule);
	}else if(opName === "share") {//共享
		detailOpera_share(paramsJson, linkModule);
	}else if(opName === "convert"){//线索转换
		detailOpera_clueConvert(linkModule);
	}else if(opName === "concern") {//关注
		detailOpera_concern(paramsJson, linkModule, $(this));
	}else if(opName === "close") {//关闭
		detailOpera_close(paramsJson, linkModule, $(this));
	}else if(opName === "open") {//打开
		detailOpera_open(paramsJson, linkModule, $(this));
	}else if(opName === "batchDelete") {//批量删除
		batchOperationForm(checkedIds,linkModule,null);
	}else if(opName === "batchUpdate") {//批量更新
		batchOperationForm(checkedIds,linkModule,null);
	}else if(opName === "batchShare") {//批量共享
		listOpera_batchShare(checkedIds,paramsJson,linkModule);
	}else if(opName === "batchOwner") {//批量更新所有者
		batchOperationForm(checkedIds,linkModule,null);
	}else if(opName === "batchSendEmail") {//批量发送邮件
		batchOperationForm(checkedIds,linkModule,null);
	}else if(opName === "batchSendMsg") {//批量发送短信
		batchOperationForm(checkedIds,linkModule,null);
	}else if(opName === "batchMerge") {//查重合并
		batchOperationForm(checkedIds,linkModule,null);
	}else if(opName === "batchConvert") {//批量转换
		batchOperationForm(checkedIds,linkModule,null);
	}else if(opName === "batchClaim") {//批量认领
		listOpera_batchClaim(checkedIds,paramsJson,linkModule);
	}else if(opName === "batchClose") {//批量关闭
		listOpera_batchClose(checkedIds,paramsJson,linkModule);
	}else if(opName === "batchOpen") {//批量打开
		listOpera_batchOpen(checkedIds,paramsJson,linkModule);
	}else if(opName === "batchBack") {//批量打回
		listOpera_batchBack(checkedIds,paramsJson,linkModule);
	}else if(opName === "dallocationProtocol") {//分配
		dallocationProtocolFun(linkModule,paramsJson,checkedIds);
	}else if(opName === "previousDetail"||opName === "nextDetail") {//前一个，后一个
		previousOrNext(paramsJson, linkModule, $(this));
	}else {
		if(opName === "delete") {//删除操作
			var ajaxURL = "./"+linkModule['nameSpace']+"/entity"+cap_first(linkModule['opName']);
			if(!!specialLink[linkModule['nameSpace']+"Delete"])
				ajaxURL = specialLink[linkModule['nameSpace']+"Delete"];
			if(confirm("您确定继续吗？")) {
				if("view_clue_con"==select_viewId){
					  entityId = linkModule["entityId"];
					batchDeleteConverted(entityId);
				}else{
					$.ajax({
						url: ajaxURL,
						data: linkModule,
						dataType: "html",
						success: function(data) {
							if(undefined!=data){
								if("commitApproval"==data)
									alert("您要删除的数据已经提交审批!");
							}
							if(!isDetailOperation) {// 列表页删除操作
								tableApi.draw();
							}else { //详情页删除返回列表
								moduleLink(paramsJson["module"]);
							}
						}
					});
				}
			}
		}else if("create|update|view|subCreate|".indexOf(opName+"|")!=-1) {
			if("view"==opName && "view_clue_con"==select_viewId) {
				var entityId = linkModule["entityId"];
				var ajaxURL = "./"+linkModule["nameSpace"]+"/entityConvertView";
				//调用ajaxDisplay函数将新页面载入contentMain
				ajaxDisplay(ajaxURL, module, contentMain, linkModule);
				//调用history.pushState 将href写入浏览器历史
				var title=webName+"-"+linkModule['function.name'];
				var linkhref=location.href.split("?")[0] + "?" + query;
				historyPush(title, linkhref);
			}else{
				if(linkModule["nameSpace"]=="verificationReceipt") {
					//调用ajaxDisplay函数将新页面载入contentMain
					var ajaxURL = "./" + linkModule['nameSpace'] + "/verificationReceipt" + cap_first(linkModule['opName']);
					ajaxDisplay(ajaxURL, module, contentMain, null);
					//调用history.pushState 将href写入浏览器历史
					var title = webName + "-" + linkModule['function.name'];
					var query = "module=" + linkModule['nameSpace'];
					var linkhref = location.href.split("?")[0] + "?" + query;
					historyPush(title, linkhref);
				}else if(linkModule["nameSpace"]=="verificationPay") {
					//调用ajaxDisplay函数将新页面载入contentMain
					var ajaxURL = "./" + linkModule['nameSpace'] + "/verificationPay" + cap_first(linkModule['opName']);
					ajaxDisplay(ajaxURL, module, contentMain, null);
					//调用history.pushState 将href写入浏览器历史
					var title = webName + "-" + linkModule['function.name'];
					var query = "module=" + linkModule['nameSpace'];
					var linkhref = location.href.split("?")[0] + "?" + query;
					historyPush(title, linkhref);
				}else{
					//详情页复制处理
					if(isDetailOperation&&opName==="create") linkModule["isClone"] = true; else delete linkModule["isClone"];
					var query = "module="+linkModule['nameSpace'];
					for(var i in paramsJson) {
						if(i!="module")
							query += "&"+i+"="+paramsJson[i];
					}
					var ajaxURL = "./"+linkModule['nameSpace']+"/entity"+cap_first(linkModule['opName']);
					if(!!specialLink[linkModule['nameSpace']+cap_first(linkModule['opName'])])
						ajaxURL = specialLink[linkModule['nameSpace']+cap_first(linkModule['opName'])];

					//调用ajaxDisplay函数将新页面载入contentMain
					ajaxDisplay(ajaxURL, module, contentMain, null);
					//调用history.pushState 将href写入浏览器历史
					var title=webName+"-"+linkModule['function.name'];
					var linkhref=location.href.split("?")[0] + "?" + query;
					historyPush(title, linkhref);
				}

			}
		}
		/*###################################模块操作判断处理###################################-->>*/
	}
	menuLinkDesign(module);
	return false;
});

/**
 * 返回模块(注意：关键代码，不能改动)
  * @param module	模块标识（使用的是nameSpace）
 */
function moduleLink(module) {
	$("#menu_"+module).trigger("click");
}

/**
 * Ajax请求页面展示到指定标签
 * @param ajaxURL	URL
 * @param module	模块标识（使用的是nameSpace）
 * @param dispalyTag	将服务器返回的页面载入的标签元素（注意：以jQuery选择器的形式传参）
 * @param ajaxParams	除了模块参数另外要传入的参数 {"属性":"属性值"}
 * @param method	ajax请求类型（GET/POST）
 */
var prevAJax;
function ajaxDisplay(ajaxURL, module, dispalyTag, ajaxParams, method) {
	//执行Ajax获取数据插入指定标签
	var linkModule = linkModuleMap.get(module)||{}; ajaxParams = ajaxParams||{};
	for(var i in ajaxParams) {
		linkModule[i] = ajaxParams[i];
	}
	if(!!prevAJax&& typeof prevAJax !="undefinded"&&ajaxURL.indexOf("/initRelationList")==-1&&ajaxURL.indexOf("/initPayReceiveRelationList")==-1
			&&ajaxURL.indexOf("/requirementList")==-1&&ajaxURL.indexOf("/claimBackRecordList")==-1
			&&ajaxURL.indexOf("/contactroleList")==-1&&ajaxURL.indexOf("/stagehistoryList")==-1
			&&ajaxURL.indexOf("/attachmentList")==-1&&ajaxURL.indexOf("/homelayoutList")==-1
			&&ajaxURL.indexOf("/getEchartsById")==-1&&ajaxURL.indexOf("/scheduleList")==-1){//ajax请求阻止之前的请求显示
		prevAJax.abort();
	}
	//linkModule["locale"]="zh_CN";
	prevAJax = $.ajax({
		type: method||"get",
		url: ajaxURL,
		data: linkModule,
		dataType: "html",
		success: function(data) {
			$(dispalyTag).empty();
			$(dispalyTag).html(data);
//			if(!!module) menuon(module);
			Overlayer.remove();
		},
		error:function(e){
			console.log(e);
		}
	});
}

/**
 * 调用history.pushState 将href写入浏览器历史(注意：关键代码，不能改动)
 */
function historyPush(title, linkhref) {
	if (history.pushState) {
		document.title = title;
		history.pushState({ title: title }, title, linkhref);
	}
}
$(document).ready(function(){
	var query = location.href.split("?")[1];
	if(undefined!=query){
		var queryJsonString = "{\""+query.replace(new RegExp("=",'gm'), "\":\"").replace(new RegExp("&",'gm'), "\",\"")+"\"}";
		var queryJson = JSON.parse(queryJsonString);
		if(!!queryJson['module']) menuLinkDesign(queryJson['module']);
	}

});
/**
 * 替代浏览器地址栏显示地址(注意：关键代码，不能改动)
 */
function historyHash(linkModule) {
	var link = location.href.split("?")[0];
	var query = location.href.split("?")[1];
	if (typeof query === "undefined") {
		if (linkModule = linkModuleMap.get(homeModule)) {
			history.replaceState(null, document.title, location.href.split("#")[0] + "?module=" + linkModule['nameSpace']) + location.hash;
			historyHash(linkModule);
		}
	} else {
		var queryJsonString = "{\"" + query.replace(new RegExp("=", 'gm'), "\":\"").replace(new RegExp("&", 'gm'), "\",\"") + "\"}";
		var queryJson = JSON.parse(queryJsonString);
		var templink = location.href.split("?")[0];
		if (!!queryJson['opName'] && !!specialLink[queryJson['module'] + cap_first(queryJson['opName'])]) {
			var ajaxURL = link.substring(0, link.lastIndexOf("/")) + specialLink[queryJson['module'] + cap_first(queryJson['opName'])].substring(1);
			var ajaxParams = {};
			for (var i in queryJson) {
				ajaxParams[i] = queryJson[i];
			}
			ajaxDisplay(ajaxURL, queryJson["module"], contentMain, ajaxParams);
		} else if (!!specialLink[queryJson["module"]]) { // specialLink处理
			history.replaceState(null, document.title, location.href);
			var ajaxParams = {};
			for (var i in queryJson) {
				ajaxParams[i] = queryJson[i];
			}
			var ajaxURL = link.substring(0, link.lastIndexOf("/")) + specialLink[queryJson["module"]].substring(1) + (typeof query === "undefined" ? "" : "?" + query);
			if (specialLink[queryJson["module"]] === "./qixinWorkReport/qixinWorkReportList" || specialLink[queryJson["module"]] === "./qixinMessage/qixinMessageList"
				|| specialLink[queryJson["module"]] === "./qixinWaring/qixinWaringList" || specialLink[queryJson["module"]] === "./qixinAttentionField/qixinAttentionFieldList"
				|| specialLink[queryJson["module"]] === "./qixinApprove/qixinApproveList" || specialLink[queryJson["module"]] === "./qixinNotice/qixinNoticeList") {
				ajaxDisplay(ajaxURL, "qixinMessage", contentMain, {});
			} else {
				ajaxDisplay(ajaxURL, queryJson["module"], contentMain, ajaxParams);
			}
		} else {
			linkModule = linkModuleMap.get(queryJson['module']);
			if (!linkModule) {
				history.replaceState(null, document.title, link);
				historyHash();
			} else {
				if (!queryJson["opName"]) {
					//清除linkModule中多余的参数
					for (var i in linkModule) {
						if (initParamNames.indexOf(i) < 0) delete linkModule[i];
					}
				}
				for (var i in queryJson) {
					if (i != "relation" && i != "convertOpera")
						linkModule[i] = queryJson[i];
				}
				//调用ajaxDisplay函数将新页面载入contentMain
				var query = "module=" + linkModule['nameSpace'];
				if (linkModule['opName']) {
					query += "&opName=" + linkModule['opName'];
				}
				if (linkModule['entityId']) {
					query += "&entityId=" + linkModule['entityId'];
				}
				var linkURL = "./" + linkModule['nameSpace'] + "/entityList?" + query;
				if (linkModule['opName']) {
					//新需求
					if (linkModule['nameSpace'] === 'requirement') {
						linkURL = "./" + linkModule['nameSpace'] + "/requirement" + cap_first(linkModule['opName']);
					} else if (linkModule['nameSpace'] === 'assignment') {
						linkURL = "./" + linkModule['nameSpace'] + "/assignment" + cap_first(linkModule['opName']);
					} else {
						linkURL = "./" + linkModule['nameSpace'] + "/entity" + cap_first(linkModule['opName']);
					}
				}
				if (queryJson['convertOpera']) {//转换的特殊请求处理
					linkURL = "./" + linkModule['nameSpace'] + "/entityConvertView";
				}
				//调用ajaxDisplay函数将新页面载入contentMain
				ajaxDisplay(linkURL, queryJson['module'], contentMain, null);
			}
		}
	}

}
/*浏览器后退、前进事件监听(注意：关键代码，不能改动)*/
if (history.pushState) {
	window.addEventListener("popstate", function() {
		historyHash();																
	});
	// 默认载入
	historyHash();
}
/*浏览器窗口焦点事件监听，用于退出登录*/
window.addEventListener("focus", function() {
	$.ajax({
		url: "./verifySession",
		success: function(data) {
			if(data.result!="success") {
				location.href=document.referrer;
			}else if($("#_USER_ID_").val()!=data.userId) {
				location.href=document.links[0];
			}
		}
	});
});

//菜单点击效果处理
function menuLinkDesign(module) {
	var $linkTag = $("#menu_"+module);
	var $linkLi = $linkTag.closest("li");
	var $linkUl = $linkLi.closest("ul");
	var linkLev = $linkUl.hasClass("nav-second-level")?2:1;
	if(linkLev==1) {//一级菜单点击
		//去除其它二级菜单选中效果并收缩
		$(".nav-second-level").each(function() {
			if($(this).attr("aria-expanded")==="true") {
				$(this).children("li").addClass("secondLevel_bg");
				var $menuTag = $(this).prev("a[href='#']");
				if(!!$menuTag) $menuTag.find(".arrow").trigger("click");
			}
		});
		$("#side-menu>li").removeClass("active ");
		$linkLi.addClass("active");
	}else if(linkLev==2) {
		$(".nav-second-level li").removeClass("secondLevel_bgW").addClass("secondLevel_bg");
		//父菜单展开
		if(!$linkUl.attr("aria-expanded")||$linkUl.attr("aria-expanded")==="false") {
			var $menuTag = $linkUl.prev("a[href='#']");
			if(!!$menuTag) $menuTag.find(".arrow").trigger("click");
		}
		$linkLi.addClass("secondLevel_bgW");
	}
	//$("#side-menu").children("li").css({"background":"transparent"});
	//$linkLi.css({"background":"#21303b"});
	var linkModule = linkModuleMap.get(module);
	var moduleName = "";
	//批量操作刷新后页面展示数据有问题
	if(linkModule!=null&&(typeof linkModule)!="undefined"&&(typeof linkModule['function.name'])!="undefined") {
		moduleName = "-"+linkModule['function.name']
	}
	document.title = webName+moduleName;
}

/**
 * 加载html页面执行之中的脚本
 */
function executeScript(html) {
	var reg = /<script[^>]*>([^\x00]+)$/i;
	//对整段HTML片段按<\/script>拆分
	var htmlBlock = html.split("<\/script>");
	for ( var i in htmlBlock) {
		var blocks;//匹配正则表达式的内容数组，blocks[1]就是真正的一段脚本内容，因为前面reg定义我们用了括号进行了捕获分组
		if (blocks = htmlBlock[i].match(reg)) {
			//清除可能存在的注释标记，对于注释结尾-->可以忽略处理，eval一样能正常工作
			var code = blocks[1].replace(/<!--/, '');
			try {
				eval(code); //执行脚本
			} catch (e) {
			}
		}
	}
}

/**
 * 首字母大写
 * @param str	字符串
 */
function cap_first(str){
	return str.replace(/(\w)/,function(v){return v.toUpperCase()});
}

/**
 * 去下划线 首字母大写
 * @param str	字符串
 * @returns
 */
function captureUnderlineName(str) {
	str = str.toLocaleLowerCase();
	for(var i=0; i< str.length; i++) {
		if(str.charAt(i)==="_"&&i<str.length-1) {
			str=str.substring(0, i)+cap_first(str.substr(i+1));
		}
	}
	return str;
}

/**
 * post请求
 * @param url
 * @param data
 * @param target
 * 		_blank - 在一个新的未命名的窗口载入文档
 *		_self - 在相同的框架或窗口中载入目标文档
 *		_parent - 把文档载入父窗口或包含了超链接引用的框架的框架集
 *		_top - 把文档载入包含该超链接的窗口,取代任何当前正在窗口中显示的框架
 */
function postURL(url, data, target) {
	var form = document.createElement("form");
	form.id = "_-_-form";
	form.method = "post";
	form.action = url;
	form.target = typeof(target) == "undefined"?"_self":target;
	for ( var key in data) {
		var hideInput = document.createElement("input");
		hideInput.type = "hidden";
		hideInput.name = key;
		hideInput.value = data[key];
		form.appendChild(hideInput);
	}
	if(window.attachEvent){//IE
		form.attachEvent("onsubmit",function(){ div.style.display="block"; });
	}else if(window.addEventListener){//FF
		form.addEventListener("onsubmit",function(){ div.style.display="block"; }, true);
	}
	document.body.appendChild(form);  
	form.submit();
	document.body.removeChild(form); 
}

/**
 * 查找字段弹框
 * @param url
 * @param formName
 * @param data
 */
function openPostLookupIframe(url, formName, data){
	var query = url.split("?")[1];
	var queryJsonString = "{\""+query.replace(new RegExp("=",'gm'), "\":\"").replace(new RegExp("&",'gm'), "\",\"")+"\"}";
	var queryJson = JSON.parse(queryJsonString);
	//联系人、销售机会查找字段特殊处理
	if(queryJson["nameSpace"]==="contact"||queryJson["nameSpace"]==="opportunity") {
		var tempFieldType_Value = "";
		var fieldRelations      = {};
		if(queryJson["nameSpace"]==="contact"){
			tempFieldType_Value = "bh_customer";
			fieldRelations      = customerFieldRelations||{};
		}else if(queryJson["nameSpace"]==="opportunity"){
			tempFieldType_Value = "bh_contact";
			fieldRelations      = contactFieldRelations||{};
		}
		var lookCustomers  = [];
		for(var i in fieldRelations) {
			var lookCustomer = {};
			var customerIdValue = "",customerNameValue="";
			var tempCustomerId = fieldRelations[i];
			if(tempCustomerId.indexOf("|")!=-1) {
				var tempFieldId = tempCustomerId.split("|")[0];
				var tempFieldType = tempCustomerId.split("|")[1];
				var tempFieldTypeValue = $("#"+captureUnderlineName(tempFieldType)).val();
				if(tempFieldTypeValue===tempFieldType_Value) {
					customerIdValue = $("#"+captureUnderlineName(tempFieldId)).val();
					customerNameValue = $("#"+captureUnderlineName(i)).val();
				}
			}else{
				customerIdValue = $("#"+captureUnderlineName(tempCustomerId)).val();
				customerNameValue = $("#"+captureUnderlineName(i)).val();
			}
			if(!!customerIdValue&&!!customerNameValue&&customerIdValue!=""&&customerNameValue!="") {
				lookCustomer.id = customerIdValue;
				lookCustomer.name = customerNameValue;
				lookCustomers.push(lookCustomer);
			}
		}
		if(lookCustomers.length > 0) {
			data["lookCustomers"] = JSON.stringify(lookCustomers);
		}
	}
	
	var lookupDivStyles = {position:"fixed", width: "70%", height: "auto", overflow: "hidden", left: "20%", top: "20%", display: "none", zIndex: 2041};
	var lookupDivAttributes = {"class":"modal fade","id":"_-lookup","tabindex":"-1","role":"dialog","aria-labelledby":"layoutModalLabel","aria-hidden":"true"};
	var lookupDiv = document.createElement("div");
	for(var property in lookupDivStyles){
		lookupDiv.style[property] = lookupDivStyles[property];
	}
	for(var attribute in lookupDivAttributes){
		lookupDiv[attribute] = lookupDivAttributes[attribute];
	}
	document.body.appendChild(lookupDiv);  
	ajaxDisplay(url, null, "#_-lookup", data);
	$(lookupDiv).modal("show");
}

/**
 * 关闭查找字段弹出层div
 */
function lookup_remove(){
	var lookupDiv = document.getElementById("_-lookup");
	$(lookupDiv).modal("hide");
	document.body.removeChild(lookupDiv);
}

/**
 * 单条线索转换
 * @param linkModule
 */
function detailOpera_clueConvert(linkModule){
	ajaxDisplay("./"+linkModule["nameSpace"]+"/"+linkModule["actionName"]+cap_first(linkModule["opName"])+"", null, contentMain, linkModule);
	var linkhref = './welcome?module='+linkModule["nameSpace"];
	historyPush("百会 CRM-"+linkModule["function.name"],linkhref);
}
/**
 * 关注
 * @param paramsJson
 * @param linkModule
 * @param currentObj 当前元素对象
 */
function detailOpera_concern(paramsJson, linkModule, currentObj){
	$.ajax({
		url: "./"+linkModule["nameSpace"]+"/"+linkModule["opName"],
		type: "post",
		data:{
			"entityId": linkModule["entityId"],
			"function.id": linkModule["function.id"],
			"function.name": linkModule["function.name"],
			"function.tableName": linkModule["function.tableName"],
			"image": paramsJson["image"]
		},success: function(data){
			if(data=="success"){
				alert("关注成功");
				currentObj.attr("data-original-title", "取消关注");
				currentObj.attr("data-params", '{"module":"'+linkModule["function.nameSpace"]+'", "opName":"concern", "entityId":"'+linkModule["entityId"]+'","image":"khc-icon-21"}');
				currentObj.children().attr("class", "khc-icon-21");
			}else if(data=="failure"){
				alert("取消成功");
				currentObj.attr("data-original-title", "关注");
				currentObj.attr("data-params", '{"module":"'+linkModule["function.nameSpace"]+'", "opName":"concern", "entityId":"'+linkModule["entityId"]+'","image":"khc-icon-20"}');
				currentObj.children().attr("class", "khc-icon-20");
			}else if(data=="no"){
				alert("操作失败");
			}
			$("[data-toggle='tooltip']").tooltip({html:true});
		},error: function(e){
			console.log(e);
		}
	});
}
/**
 * 批量操作
 * @param checkedIds
 * @param linkModule
 * @param e
 */
function batchOperationForm(checkedIds,linkModule,e){
	//给functionid等隐藏域赋值，批量操作中使用
	prepareDatas(linkModule);
	if(linkModule["opName"]=="batchDelete"){
		var select_viewId =  $("span[class='all-select-in']").find("p").html();
		if("view_clue_con"==select_viewId){
			if(checkedIds=="")
				alert("请选择删除数据");
			else{
				if(confirm("您确定要继续吗？"))
					batchDeleteConverted(checkedIds);
			}
		}else{
			if(checkedIds!=""){
				executeOperation_batchDelete(checkedIds,linkModule);
			}else{
				executeOperationOnly_batchDelete(linkModule);
			}
		}
	}else if(linkModule["opName"]=="batchUpdate"){
		if(checkedIds!=""){
			executeOperation_batchUpdate(linkModule);
		}else{
			executeOperationOnly_batchUpdate(linkModule);
		}
	}else if(linkModule["opName"]=="batchSendEmail"){
		if(checkedIds!=""){
			executeOperation_batchSendEmail(linkModule);
		}else{
			executeOperationOnly_batchSendEmail(linkModule);
		}
	}else if(linkModule["opName"]=="batchSendMsg"){
		if(checkedIds!=""){
			executeOperation_batchSendMsg(linkModule);
		}else{
			executeOperationOnly_batchSendMsg(linkModule);
		}
	}else if(linkModule["opName"]=="batchOwner"){
		if(checkedIds!=""){
			executeOperation_batchOwner(linkModule);
		}else{
			executeOperationOnly_batchOwner(linkModule);
		}		
	}else if(linkModule["opName"]=="batchMerge"){
		executeOperationOnly_batchMerge(linkModule);		
	}else if(linkModule["opName"]=="batchConvert"){
		executeOperation_batchConvert(checkedIds, linkModule);
	}
	
}

/*********************************************选择了数据id******************************************************************************/

/**
 * 由于一些批量操作需要functionid/tablename等数据
 * 所以在进行批量操作前先准备好这些字段
 * @param linkModule
 */
function prepareDatas(linkModule){
	$("input[name='function.id']").val(linkModule['function.id']);
	$("input[name='function.name']").val(linkModule['function.name']);
	$("input[name='function.tableName']").val(linkModule['function.tableName']);
	$("input[name='tableName']").val(linkModule['function.tableName']);
	$("input[name='nameSpace']").val(linkModule['nameSpace']);
}
/**
 * 批量删除
 */
function executeOperation_batchDelete(entityIds,linkModule){
	var promotStr,tableName =linkModule["function.tableName"];
	if(tableName=="bh_customer"){//删除客户后，客户关联的联系人、销售机会等，如果与客户是同一个所有者，应自动删除
		promotStr="删除客户后，客户关联的联系人、销售机会等，如果与客户是同一个所有者，将自动删除，您确定要继续吗？";
	}else{
		promotStr="您确定要继续吗？";
	}
	if(confirm(promotStr)){
		batchDeleteCheck(entityIds,linkModule);
	}
}
/**
 * 执行删除选中的数据
 * @param entityIds
 * @param linkModule
 */
function batchDeleteCheck(entityIds,linkModule){
	$.ajax({
		url: "./batch/deleteChecked",
		data: {"ids":entityIds,"tableName":linkModule["function.tableName"],"functionID":linkModule["function.id"]},
		dataType: "html",
		success: function(data) {
		   if(data!=""&&data!="0"){
			   //alert("成功删除"+data+"条数据");
			   tableApi.draw();
		   }
		}
	});	
}
/**
 * 批量转换已转换的记录数据
 * @param entityIds
 */
function batchDeleteConverted(entityIds){
	$.post("./batch/batchDeleteConverted", {"ids":entityIds}, function(data){
		if(data=="success"){
			tableApi.draw();
		}
	});
}
/**
 * 批量更新
 */
function executeOperation_batchUpdate(linkModule){
	//加载批量更新的字段
	choseTableNameFU(linkModule["function.tableName"]);
	if($("select[id='fieldsSelect']").html()==""){
		alert("批量更新字段未加载完全，请稍后重试");
		return;
	}
	$("input[type=hidden][name='function.id']").val(linkModule["function.id"]);
	$("#myModalCheck").modal("toggle");	
}
/**
 * 批量更改所有者
 */
function executeOperation_batchOwner(linkModule){
	if(linkModule['function.nameSpace']=="customer"){
		$("#reUpdateOwnner").show();
	}else{
		$("#reUpdateOwnner").hide();
	}
	$("#myModalOwnner").modal("toggle");	
}
/**
 * 批量发短信
 */
function executeOperation_batchSendMsg(linkModule){
	//点击时触发查看有几个字段
	queryMobileField(linkModule["function.id"]);
	findNoteTemplates(linkModule["function.tableName"],linkModule["function.name"]);
	$("#myModalSendMsg").modal("toggle");	
}
/**
 * 批量发邮件
 */
function executeOperation_batchSendEmail(linkModule){
	queryEmailField(linkModule["function.id"]);
	findTemplateListByTableName(linkModule["function.tableName"],linkModule["function.name"]);
	$("#myModalSendEmail").modal("toggle");	
}

/*********************************************未选择数据******************************************************************************/
/**
 * 批量删除
 */
function executeOperationOnly_batchDelete(linkModule){
    var tempDataParams = {
			"functionID" : linkModule["function.id"],
			"type" : "1"
	    };
	ajaxDisplay('./batch/queryListForDelete',null, contentMain, tempDataParams);
	var linkhref = './welcome?module=queryList&opName=forDelete';
	for(var i in tempDataParams) {
		if(i!="opName") linkhref+='&'+i+"="+tempDataParams[i];
	}
	historyPush("百会 CRM-批量删除",linkhref);
}
/**
 * 批量更新
 */
function executeOperationOnly_batchUpdate(linkModule){
    var tempDataParams = {
			"functionID" : linkModule["function.id"],
			"type" : "1"
	    };
	ajaxDisplay('./batch/queryList',null,contentMain, tempDataParams);
	var linkhref = './welcome?module=queryList&opName=forUpdate';
	for(var i in tempDataParams) {
		if(i!="opName") linkhref+='&'+i+"="+tempDataParams[i];
	}
	historyPush("百会 CRM-批量更新",linkhref);
}
/**
 * 批量更改所有者
 */
function executeOperationOnly_batchOwner(linkModule){
    var tempDataParams = {
    		"functionID" : linkModule["function.id"]
    	};
	ajaxDisplay('./batch/queryListForOwnner',null,contentMain, tempDataParams);
	var linkhref = './welcome?module=queryList&opName=forOwnner';
	for(var i in tempDataParams) {
		if(i!="opName") linkhref+='&'+i+"="+tempDataParams[i];
	}
	historyPush("百会 CRM-批量更改所有者",linkhref);	
}
/**
 * 批量发短信
 */
function executeOperationOnly_batchSendMsg(linkModule){
    var tempDataParams = {
    		"functionID" : linkModule["function.id"]
    	};
	ajaxDisplay('./batch/queryListForMessage',null,contentMain, tempDataParams);
	var linkhref = './welcome?module=queryList&opName=forMessage';
	for(var i in tempDataParams) {
		if(i!="opName") linkhref+='&'+i+"="+tempDataParams[i];
	}
	historyPush("百会 CRM-批量发短信",linkhref);	
}
/**
 * 批量发邮件
 */
function executeOperationOnly_batchSendEmail(linkModule){
    var tempDataParams = {
    		"functionID" : linkModule["function.id"]
    	};
	ajaxDisplay('./batch/queryListForEmail',null,contentMain, tempDataParams);
	var linkhref = './welcome?module=queryList&opName=forEmail';
	for(var i in tempDataParams) {
		if(i!="opName") linkhref+='&'+i+"="+tempDataParams[i];
	}
	historyPush("百会 CRM-批量发邮件",linkhref);	
}
/**
 * 查重合并
 */
function executeOperationOnly_batchMerge(linkModule){
    var tempDataParams = {
    		"functionID" : linkModule["function.id"]
    	};
	ajaxDisplay('./repeat/toPage',null,contentMain, tempDataParams);
	var linkhref = './welcome?module=repeat&opName=toPage';
	for(var i in tempDataParams) {
		if(i!="opName") linkhref+='&'+i+"="+tempDataParams[i];
	}
	historyPush("百会 CRM-查重合并",linkhref);		
}
/**
 * 批量转换
 */
function executeOperation_batchConvert(checkedIds, linkModule){
	if(checkedIds!=""){
		ajaxDisplay("./"+linkModule["nameSpace"]+"/"+linkModule["actionName"]+cap_first(linkModule["opName"]), null, contentMain, {
			"ids": checkedIds,
			"nameSpace": linkModule["nameSpace"],
			"actionName": linkModule["actionName"],
			"function.id": linkModule["function.id"],
			"function.name": linkModule["function.name"],
			"function.tableName": linkModule["function.tableName"],
			"function.nameSpace": linkModule["function.nameSpace"],
			"function.actionName": linkModule["function.actionName"]
		});
		var linkhref = "./welcome?module="+linkModule["nameSpace"];
		historyPush("百会 CRM-线索",linkhref);
	}else{
		alert("请先选择数据");
		return false;
	}
}
/**
 * 展示隐藏主/子任务
 */
function showTask(){
	if($("#task").is(":hidden")){
	   $("task").css("display","block");
	   $("#task").show();    //如果元素为隐藏,则将它显现
	}else{
	   $("#task").hide();    //如果元素为显现,则将其隐藏
	}	   
}
/**
 * 展示隐藏主/子合同
 */
function showContract(){
	if($("#contractDiv").is(":hidden")){
		$("contractDiv").css("display","block");
		$("#contractDiv").show();    //如果元素为隐藏,则将它显现
	}else{
		$("#contractDiv").hide();    //如果元素为显现,则将其隐藏
	}  
}
/*********************************操作执行之前*****************************************************************/



/**
 * 校验沟通/拜访模块状态是否为取消
 */
function checkStatus(idsstr, linkModule){
	var flag = true;
	var querySql = "";
	var ids = "";
	var selCount = 0;
	if(idsstr==""||idsstr==undefined){
		$("input:checkbox:checked[name='checkIds']").each(function(i,idas){
			ids+=",'"+idas.value+"'";
			selCount +=1;
		});
		if(ids.length>0){
			ids=ids.substring(1);
		}else{
			$("input[name='checkIds']").each(function(i,idas){
				selCount +=1;
				if(selCount>1) return false;
			});
			querySql = $("input[name='querySql']").val();		
		}
	}else{
		if(idsstr.indexOf("'")<0){
			ids = "'"+idsstr+"'";
		}else{
			ids = "'',"+ids;
		}
		selCount = 1;
	}
	$.ajax({
		"url":"./batch/checkStatus",
		"async":false,
		"type":"post",
		"data":{"ids":ids,"tableName":linkModule["function.tableName"],"querySql":querySql},
		"success":function(data){
			if(data!=""){
				if(selCount>1){
				   alert("存在处于取消状态的数据，数据被锁定，不可再编辑");
				}else{
				   alert("数据被锁定，不可再编辑");
				}
				flag = false;
				tableApi.ajax.reload();
				$("#chk_all").prop("checked",false);
			}
		}
	});
	return flag;
}
/**
 * 校验短信账户是否成功配置
 */
function checkSendMsg(){
	var flag = true;
	$.ajax({
		"url":"./batch/checkSendMsg",
		"async":false,
		"type":"post",
		"data":{"type":"0"},
		"success":function(data){
			if(data!=""){
				alert(data);
				flag = false;
			}
		}
	});
	return flag;
}
/**
 *判断数据是否处理锁定或者被驳回状态  
 */
function getDataApprovalStatus(keyNum, opName, tableName){
	var approvalStatus = "";
	$.ajax({
		url:"./dataApprovalStatus",
		type:'post',
		async: false,
		data:{"entityId":keyNum, "opName":opName,"tableName":tableName},
		success: function(data){
			approvalStatus = data;
		},
		error: function(e){
			console.log("error");
			console.log(e);
		}
	});
	return approvalStatus;
}
/**
 * 判断操作是否有权限
 */
function excludesNoPermissionDataId(linkModule){
	var hasPermissionEntityId;
	$.ajax({
		url:'./role/dataOperationPermission',
		type:'POST',
		async: false,
		data:{"operation":linkModule["opName"],"entityId":linkModule["entityId"],"functionId":linkModule["function.id"],"tableName":linkModule["function.tableName"]},
		success:function(data){
			if(data!="1"){
				hasPermissionEntityId ="";
			}else{
				hasPermissionEntityId =linkModule["entityId"];
			}
		}
		
	});
	return hasPermissionEntityId;
	
}
/**
 * 排除没有权限的数据
 */
function excludesNoBatchPermissionDataIds(idsstr, linkModule){
	$.ajax({
		url:'./role/excludesNoBatchPermissionDataIds',
		type:'POST',
		async: false,
		data:{"operation":linkModule["opName"],"dataIds":idsstr,"functionId":linkModule["function.id"],"tableName":linkModule["function.tableName"]},
		success:function(data){
			idsstr =data;
		}
		
	});
	return idsstr;
}
function versionSupprot(opName){
	var support =false;
	$.ajax({
		url:'./project/versionSupport',
		type:'POST',
		async: false,
		data:{"opName":opName},
		success:function(data){
			support =data;
		}
		
	});
	return support;
	
}


/**
 * 查看上一条/下一条
 * @param paramsJson
 * @param linkModule
 * @param currentObj
 */
function previousOrNext(paramsJson, linkModule, currentObj){
	$.ajax({
		"url":"./getPreviousOrNextId",
		"async":false,
		"type":'post',
		"data":{"entityId":linkModule["entityId"],"tableName":linkModule["function.tableName"],"preOrNext":paramsJson["opName"]},
		"success":function(data){
			if(data!=""){
				var ajaxURL = "./"+linkModule['nameSpace']+"/entityView";
				if(!!specialLink[linkModule['nameSpace']+"View"])
					ajaxURL = "./"+linkModule['nameSpace']+"/"+linkModule['nameSpace']+"View";
				linkModule['opName']      = "view";
				linkModule['entityId']    = data;
				//调用ajaxDisplay函数将新页面载入contentMain
				ajaxDisplay(ajaxURL,linkModule['nameSpace'], contentMain, {"entityId":data});

			}else{
			   if(paramsJson["opName"]=="nextDetail"){
				   //alert("已经是最后一条了！");
			   }else{
				   //alert("已经是第一条了！");
			   }
			}
		},error: function(e){
			console.log(e);
		}
	});
}
/**
 * 将表单转成json对象
 */
$.fn.serializeObject = function()  {    
   var o = {};    
   var a = this.serializeArray();    
   $.each(a, function() {   
       if (o[this.name]) {    
           if (!o[this.name].push) {    
               o[this.name] = [o[this.name]];    
           }    
           o[this.name].push(this.value || '');    
       } else {   
    	   if(this.value){
    		   o[this.name] = this.value || '';    
    	   }
       }    
   });   
  // console.dir(o);
   return o;    
};  

/**
 * 将json对象转成字符串（&分割）
 */
function getJSONStr(jsonParam){
	var jsonStr="";
	for ( var i in jsonParam) {
		jsonStr+="&"+i+"="+jsonParam[i];
	}
	//console.log("paramStr::::"+jsonStr);
	return jsonStr;
	
}
/**
 * 获取下拉框的值
 * @param event  
 * @param tableName    表名
 * @param keywordbox   下拉框展示div
 * @param idField      lookup对应id域
 * @param nameField    lookup对应name域
 */
function getDropDownList(event,tableName,keywordbox,idField,nameField){
	//if(event.which!=39&&event.which!=40&&event.which!=37&&event.which!=38&&event.which!=13){
		 keywordbox.css({display:"none",height:0});     
		 keywordbox.empty();
		 idField.val("");
		 var fieldValue = nameField.val();//输入的值
		 //var fieldName = nameField.closest("td").prev("td").attr("name");
		 console.log("solrQuery start  {tableName:"+tableName+",fieldValue:"+fieldValue+"}");
		 if(fieldValue==undefined||$.trim(fieldValue)==""){
			return; 
		 }
		 $.ajax({
               type: "post",
	            url: "./dropDownList",
	            data:{"tableName":tableName,"fieldName":"NAME","fieldValue":fieldValue},
	            async: false,
	            datatype:'json',
	            timeout: 5000,//请求超时
	            success: function (data) {
	               console.log(data);
	               console.log("solrQuery end");
	               if(data.data){
	                  keydata(data.data);
						//打印关键词
						function keydata(keys){
					        var spans="";
					        var count=0;
					        if(undefined!=keys){
								for(var i in keys){
									spans+="<span value='"+i+"' class='dataListItem' >"+keys[i]+"</span>";
									count++;
					        	}
					        }
					        if(count==0){
					            keywordbox.css({display:"none",height:0});
					        }else{
					            keywordbox.css({display:"block",height:0});
					        }
					        keywordbox.html(spans);//把关键词写入关键词盒子
					        keywordbox.animate({
					            height:(keywordbox.children().height()+1)*count//关键词下滑效果
					        },100);
					        keywordbox.children().click(function(){
					        	console.log("setvalue...");
					        	nameField.val($(this).html());//选中词汇放入输入框
					        	idField.val($(this).attr("value"));
					            keywordbox.animate({
					                height:0//关键盒子收缩效果
					            },10,function(){
					                keywordbox.css({display:"none",height:0});
					                keywordbox.empty();//清空盒子内容
					            });
					            nameField.focus();//输入框获取焦点*/
					        });
						}				                  
	               }
	            },
	            error: function (xhr) {

	            }
	    });		        
   //}	
}
/**
 * lookup字段光标移除事件
 * @param keywordbox 下拉框
 * @param idField    id域
 * @param nameField  name域
 */
function lookupFieldBlur(keywordbox,idField,nameField){
	if($.trim(idField.val())==""){
		nameField.val("");
    }
	keywordbox.animate("hide","fast",function(){
        keywordbox.css({display:"none",height:0});
        keywordbox.empty();//清空盒子内容
    });	
}

/**
 * 获取格式化的当前日期  2017-03-02
 * @returns {string}
 */
function getBHFormateDate(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var seperator ="-";
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (day >= 0 && day <= 9) {
		day = "0" + day;
	}
	return year + seperator + month + seperator + day
}
/*禁止form表单自动提交*/
$("body").delegate("form", "keydown", function () {
    if(event.keyCode==13)return false;
});
//二级页面标题返回
$("#content-main").delegate(".khc-tab","click",function(){
	var parentId=$(this).parents(".wrapper").attr("id");
	var selfClass=$(this).attr('class').indexOf('border-b01');
	if(parentId=="commonListDiv"||selfClass>-1){
		return false;
	}else{
		history.go(-1);
	}
})


/**
 * 敏感字段加密我
 * @param fieldValue
 * @param showType
 */
function encryptField (fieldValue, showType) {
	if(showType==="phone") {
		if(fieldValue.length > 4) {
			var endLength = fieldValue.substring(4).length;
			var endStr = "";
			for(var i=0;i<endLength;i++) {
				endStr+="*";
			}
			fieldValue = fieldValue.substring(0, 4)+endStr;
		}
	}else if(showType==="mobilephone") {
		if(fieldValue.length>=11) {
			var startIndex = (fieldValue.length-4)/2;
			fieldValue = fieldValue.substring(0, startIndex)+"****"+fieldValue.substring(startIndex+4);
		}
	}else if(showType==="idnumber") {
		if(fieldValue.length >=15) {
			fieldValue = fieldValue.substring(0, 6)+"********"+fieldValue.substring(14);
		}
	}
	return fieldValue;
}


//页面滚动时 日期控件消失 xie 17/4/10  没有日期控件下会报错，虽然不影响整体功能
/*$('#content-main').on('scroll',function(){
	$dp.hide();
})*/

















