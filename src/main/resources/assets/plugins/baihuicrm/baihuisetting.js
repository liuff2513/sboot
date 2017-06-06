/**
 * 遮盖层封装
 */
var isIE = (document.all) ? true : false;
var Overlayer=new Object();
Overlayer={
		olStyle:{
		    position: 'fixed',
		    left: '0',
		    top: '0',
		    height: '100%',
		    width: '100%',
		    backgroundColor: '#222',
		    zIndex: 999999
		},
		msgStyle: {
		    position: 'fixed',
		    width: '100%',
		    height: '40px',
		    lineHeight: '40px',
		    top: 'calc(50% + 40px)',
		    marginTop: '-40px',
		    textAlign: 'center',
		    color: '#FFF'
//		    color: '#3c8dbc'
		},
		olinnerStyle: {
			position: 'fixed',
			width: '120px',
			height: '40px',
			lineHeight: '40px',
			left: '50%',
			top: '50%',
			marginTop: '-40px',
			marginLeft: '-50px',
			backgorundColor: 'red'
		},
		oneStyle:{},
		twoStyle:{},
		threeStyle:{},
		createComponent:function(){
			var component=document.createElement(arguments[0]);
			var styles = arguments[1]; 
			for (var property in styles) { 
				
				if (styles[property] != null) {  
					try{  
						component.style[property] = styles[property];
					}catch(err){  
						document.write(err.name+":"+property+"<br/>");//set property error!  
					}  
				}  
			}  
			return component;
		},
		show: function(){
			if(!this.isExist&&document.body){
				var bodyElem=document.body;
				var olElem=this.createComponent("div",this.olStyle);
				var olinnerElem=this.createComponent("div",this.olinnerStyle);
				var oneElem=this.createComponent("div",this.oneStyle);
				var twoElem=this.createComponent("div",this.twoStyle);
				var threeElem=this.createComponent("div",this.threeStyle);
				oneElem.className='object object_one';
				twoElem.className='object object_two';
				threeElem.className='object object_three';
				olinnerElem.appendChild(oneElem);
				olinnerElem.appendChild(twoElem);
				olinnerElem.appendChild(threeElem);
				olElem.appendChild(olinnerElem);
				if(!!arguments[0]&&arguments[0]!=''){
					var msgElem=this.createComponent("div",this.msgStyle);
					msgElem.innerHTML=arguments[0];
					olElem.appendChild(msgElem);
				}
				olElem.id="OverlayerDiv_-"
				
				//设置透明度（兼容IE）
				isIE ? olElem.style.filter = "alpha(opacity:50)" : olElem.style.opacity = 0.5;
				
				bodyElem.appendChild(olElem);
				this.isExist=true;
			}
		},
		remove: function(){
			var olElem = document.getElementById("OverlayerDiv_-");
			if(this.isExist) document.body.removeChild(olElem);
			this.isExist=false;
		}
}

/**
 * 弹出窗口
 * @param url
 * @param name
 * @param data
 */
function openPostWindow(url, name, data) {
	var form = document.createElement("form");
	form.id = "form1";
	form.method = "post";
	form.action = url;
	form.target = name;
	for ( var key in data) {
		var hideInput = document.createElement("input");
		hideInput.type = "hidden";
		hideInput.name = key;
		hideInput.value = data[key];
		form.appendChild(hideInput);
	}
	if(window.attachEvent){//IE
		form.attachEvent("onsubmit",function(){ openWindow(name); });
	}else if(window.addEventListener){//FF
		form.addEventListener("onsubmit",function(){ openWindow(name); }, true);
	}
	document.body.appendChild(form);  
	form.submit();
	document.body.removeChild(form);
}
function openWindow(name) {
	window.open(
		'about:blank',
		name,
		'height=400, width=400, top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes,location=yes, status=yes')
}

///**
// * 查找字段点击弹窗Iframe
// * @param url
// * @param formName
// * @param data
// */
//function openPostLookupIframe(url, formName, data){
//	var overlayStyles = {
//		position : "fixed",
//		width : "100%",
//		height : "100%",
//		left : "0px",
//		top : "0px",
//		display : "none",
//		background : "#000",
//		filter : "alpha(opacity=50)",
//		mozOpacity : "0.5",
//		khtmlOpacity : "0.5",
//		opacity : "0.5",
//		zIndex : 999,
//		cursor : "pointer"
//	};
//	var divStyles = {position:"fixed", width: "80%", height: "90%", overflow: "hidden", left: "10%", top: "10%", display: "none", zIndex: 1000};
//	var iframeStyles = {width: "100%", height: "100%", border: "none"};
//	var overlayDiv = document.createElement("div");
//	for(var property in overlayStyles){
//		overlayDiv.style[property] = overlayStyles[property];
//	}
//	overlayDiv.id="_-overlay";
//	var div = document.createElement("div");
//	for(var property in divStyles){
//		div.style[property] = divStyles[property];
//	}
//	div.id="_-div";
//	var iframe = document.createElement("iframe");
//	for(var property in iframeStyles){
//		iframe.style[property] = iframeStyles[property];
//	}
//	iframe.id="_-iframe";
//	iframe.name="_-iframe";
//	div.appendChild(iframe);
//	var form = document.createElement("form");
//	form.id = "_-form";
//	form.method = "post";
//	form.action = url;
//	form.target = "_-iframe";
//	for ( var key in data) {
//		var hideInput = document.createElement("input");
//		hideInput.type = "hidden";
//		hideInput.name = key;
//		hideInput.value = data[key];
//		form.appendChild(hideInput);
//	}
//	if(window.attachEvent){//IE
//		form.attachEvent("onsubmit",function(){ div.style.display="block"; });
//	}else if(window.addEventListener){//FF
//		form.addEventListener("onsubmit",function(){ div.style.display="block"; }, true);
//	}
//	document.body.appendChild(overlayDiv);  
//	document.body.appendChild(div);  
//	document.body.appendChild(form);  
//	form.submit();
//	document.body.removeChild(form);
//	overlayDiv.style.display="block";
//	div.style.display="block";
//}
///**
// * 关闭查找字段弹出层div
// * @param formName
// */
//function lookup_remove(){
//	document.body.removeChild(document.getElementById("_-overlay"));
//	document.body.removeChild(document.getElementById("_-div"));
//}
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
		var lookCustomers  = new Array();
		for(var i in fieldRelations) {
			var lookCustomer = new Object();
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
	$.ajax({
		url: url,
		data: data,
		dataType: "html",
		success: function(data) {
			$("#_-lookup").empty();
			$("#_-lookup").html(data);
			//web表单 隐藏新建市场活动按钮
			$("#_-lookup").find(".hkc-button-abg:last").hide();
		}
	});
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
$(document).ready(function(){
	$("body").delegate("#_-_-overlay","click",function(){
		document.body.removeChild(document.getElementById("_-_-overlay"));
		document.body.removeChild(document.getElementById("_-_-div"));
	});
});
/**
 * 弹出iframe div层
 * @param url
 * @param name
 * @param data
 */
function openPostIframe(url, data){

	var divStyles = {position:"fixed", width: "100%", height: "100%", left: "0px", top: "0px", display: "none", zIndex: 10000};
	var iframeStyles = {width: "100%", height: "100%", border: "none"};
	var div = document.createElement("div");
	for(var property in divStyles){
		div.style[property] = divStyles[property];
	}
	div.id="_-_-div";
	var iframe = document.createElement("iframe");
	for(var property in iframeStyles){
		iframe.style[property] = iframeStyles[property];
	}
	iframe.id="_-_-iframe";
	iframe.name="_-_-iframe";
	div.appendChild(iframe);
	var form = document.createElement("form");
	form.id = "_-_-form";
	form.method = "post";
	form.action = url;
	form.target = "_-_-iframe";
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
	document.body.appendChild(div);  
	document.body.appendChild(form);  
	form.submit();
	document.body.removeChild(form);
	div.style.display="block";
}
/**
 * 弹出iframe div层
 * @param url
 * @param name
 * @param data
 */
function openPostIframe(url, formName, data){
	var divStyles = {position:"fixed", width: "100%", height: "100%", left: "0px", top: "0px", display: "none", zIndex: 10000};
	var iframeStyles = {width: "100%", height: "100%", border: "none"};
	var div = document.createElement("div");
	for(var property in divStyles){
		div.style[property] = divStyles[property];
	}
	div.id="_-_-div";
	var iframe = document.createElement("iframe");
	for(var property in iframeStyles){
		iframe.style[property] = iframeStyles[property];
	}
	iframe.id="_-_-iframe";
	iframe.name="_-_-iframe";
	div.appendChild(iframe);
	var form = document.createElement("form");
	form.id = "_-_-form";
	form.method = "post";
	form.action = url;
	form.target = "_-_-iframe";
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
	document.body.appendChild(div);  
	document.body.appendChild(form);  
	form.submit();
	document.body.removeChild(form);
	$("[name='"+formName+"Form']").css("display", "none");
	div.style.display="block";
}
function removePostIframe(){
	document.body.removeChild(document.getElementById("_-_-div"));
}
/**
 * 关闭弹出层IFrame
 * @param formName
 */
function relation_remove(formName){
	$("[name='"+formName+"Form']").css("display", "block");
	document.body.removeChild(document.getElementById("_-_-div"));
	//document.getElementById(pointKey).scrollIntoView();
	$("html,body").animate({scrollTop:scrollTop},800);
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
 * JS仿jAVA Map集合
 */
function Map() {
	var struct = function(key, value) {
		this.key = key;
		this.value = value;
	}

	var put = function(key, value) {
		for (var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				this.arr[i].value = value;
				return;
			}
		}
		this.arr[this.arr.length] = new struct(key, value);
	}

	var get = function(key) {
		for (var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				return this.arr[i].value;
			}
		}
		return null;
	}

	var remove = function(key) {
		var v;
		for (var i = 0; i < this.arr.length; i++) {
			v = this.arr.pop();
			if (v.key === key) {
				continue;
			}
			this.arr.unshift(v);
		}
	}

	var size = function() {
		return this.arr.length;
	}

	var isEmpty = function() {
		return this.arr.length <= 0;
	}
	this.arr = new Array();
	this.get = get;
	this.put = put;
	this.remove = remove;
	this.size = size;
	this.isEmpty = isEmpty;
}

/*禁止form表单自动提交*/
$("body").delegate('form','keydown',function(){
	if(event.keyCode==13) return false;
})
$(document).delegate(".khc-tab","click",function(){
	var parentId=$(this).parents(".wrapper").attr("id");
	var selfClass=$(this).attr('class').indexOf('border-b01');
	if(parentId=="commonListDiv"||selfClass>-1){
		return false;
		//console.log(1)
	}else{
		history.go(-1)
		//console.log(2)
	}
})

