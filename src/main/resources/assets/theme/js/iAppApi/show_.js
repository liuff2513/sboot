/**--系统状态码--**/
function showCode(){
	$('#myModalCodeContent').html(codeAndMessage);
	$('#myModalCode').modal('toggle');
};
/**--系统获取模块名--**/
function showModulePort(){
	$('#myModalCodeContent').html(ModulePort);
	$('#myModalCode').modal('toggle');
};
/**--系统获取短信验证码--**/
function showPCode(){
	$('#myModalCodeContent').html(PCodeType);
	$('#myModalCode').modal('toggle');
}
/**--系统模块所有者 类型--**/
function showOwnerTypePort(){
	$('#myModalCodeContent').html(ownerType);
	$('#myModalCode').modal('toggle');
};
/**--列表-表头功能项--**/
function showListFun(){
	$('#myModalCodeContent').html(listFun);
	$('#myModalCode').modal('toggle');
};
/**--表单-功能项--**/
function showFormFun(){
	$('#myModalCodeContent').html(formFun);
	$('#myModalCode').modal('toggle');
};
/**--列表-模板功能类型--**/
function showListTemplateCode(){
	$('#myModalCodeContent').html(ListTemplateType);
	$('#myModalCode').modal('toggle');
};
/**--表单-模板功能类型--**/
function showFormTemplateCode(){
	$('#myModalCodeContent').html(FormTemplateType);
	$('#myModalCode').modal('toggle');
};
/**--融云状态码--**/
function showRongyCode(){
	$('#myModalCodeContent').html(rongyCodeAndMessage);
	$('#myModalCode').modal('toggle');
}
/**--融云消息类型--**/
function showRongyMesType(){
	$('#myModalCodeContent').html(rongyMsgType);
	$('#myModalCode').modal('toggle');
}
/**--系统消息类型--**/
function showsysMesType(){
	$('#myModalCodeContent').html(sysMsgType);
	$('#myModalCode').modal('toggle');
}
/**--融云好友相关--静态常量--**/
function showRongyConstant(){
	$('#myModalCodeContent').html(rongyConstant);
	$("h4[id='modalTitleCodeId']").html("静态常量");
	$('#myModalCode').modal('toggle');
}
/**--相同相关--静态常量--**/
function showSysConstant(type){
	/**--公告发送对象类型--**/
	if(type==1){
		$('#myModalCodeContent').html(sendObjTypeConstant);
		$("h4[id='modalTitleCodeId']").html("静态常量");
		$('#myModalCode').modal('toggle');
	}
}

/**--线索转换客户中的联系人客户状态值--**/
function showOperTypeCode(){
	$('#myModalCodeContent').html(formOperType);
	$('#myModalCode').modal('toggle');
}

