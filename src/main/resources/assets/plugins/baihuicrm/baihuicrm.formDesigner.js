/**
 * 表单设计器前端封装
 */
// 封装布局插件
(function($) {
	var isIE = (document.all) ? true : false;
	var FormDesigner = new Object();
	var FIELD_ = new Object();
	var $li;
	var UNREMOVE_="-OWNER_NAME-NAME-";
	FormDesigner = {
		
	};
	/*字段hover事件*/
	$.fn.fieldHover = function() {
		var $e = $(arguments[0]);
		var fieldShowType=this.find(".fieldtypecontainer").attr("data-showType");//字段显示类型
		var fieldIsCustom=this.attr("field-isCustom");//字段是否为自定义字段
		var fieldName=this.attr("field-name");//字段名称
		if ($.trim($e.find(".fieldactionicon").html()).length == 0){
			$e.find(".fieldactionicon").append(
					$("#fieldactionicon_").html());
			if(UNREMOVE_.indexOf("-"+fieldName.toUpperCase()+"-")!=-1){//所有者和名称不可删除
				$e.find(".fieldactionicon").find(".fieldDelIcon").addClass("eventNone cD op5");
				if(fieldName.toUpperCase()=="NAME"){
					//TODO 自定义模块的NAME字段可设置为唯一字段
				}
			}
		}
	};
	/*字段hoverNone事件*/
	$.fn.fieldHoverNone = function() {
		var $e = $(arguments[0]);
		$e.find(".fieldactionicon").empty();
	};
	/*字段属性菜单列表*/
	$.fn.fieldSettingsShow = function() {
		var $e = $(arguments[0]);
		var offset=$e.offset();
		var fieldShowType=this.find(".fieldtypecontainer").attr("data-showType");//字段显示类型
		var fieldIsCustom=this.attr("field-isCustom");//字段是否为自定义字段
		var fieldName=this.attr("field-name");//字段名称
		//alert(fieldName);return;
		$("#settingsDropDownPopup").children("div").show();
		if(UNREMOVE_.indexOf("-"+fieldName.toUpperCase()+"-")!=-1){
			
		}
		if(fieldName.toUpperCase()=="OWNER_NAME"){//所有者字段
			$("#settingsDropDownPopup").children("div[id!='fldPermission']").hide();
		}
		//alert(fieldShowType+":"+fieldIsCustom);return;
		$("#settingsDropDownPopup").css({left:offset.left-14, top:offset.top+$(this).closest("li").height()}).show();
		
	}
})(jQuery);

//加载xml文档
var loadXML = function(xmlFile) {
	var xmlDoc;
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');//IE浏览器
        xmlDoc.async = false;
        xmlDoc.load(xmlFile);
    }
    else if (isFirefox=navigator.userAgent.indexOf("Firefox")>0) { //火狐浏览器
    //else if (document.implementation && document.implementation.createDocument) {//这里主要是对谷歌浏览器进行处理
        xmlDoc = document.implementation.createDocument('', '', null);
        xmlDoc.load(xmlFile);
    }
    else{ //谷歌浏览器
      var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET",xmlFile,false);
        xmlhttp.send(null);
        if(xmlhttp.readyState == 4){
        xmlDoc = xmlhttp.responseXML.documentElement;
        } 
    }
    return xmlDoc;
}
//对xml对象进行判断
var checkXMLDoc = function(xmlFile){
	var xmlDoc = loadXML(xmlFile);
    if (xmlDoc == null) {
        alert('您的浏览器不支持xml文件读取,于是本页面禁止您的操作,推荐使用IE5.0以上可以解决此问题!');
        window.location.href = '../err.html';

    }
    return xmlDoc;
}