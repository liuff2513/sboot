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

/**
 * 弹出iframe div层
 * @param url
 * @param name
 * @param data
 */
function openPostIframe(url, data){

	var divStyles = {position:"fixed", width: "100%", height: "100%", left: "0px", top: "0px", display: "none"};
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

	var divStyles = {position:"fixed", width: "100%", height: "100%", left: "0px", top: "0px", display: "none"};
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
(function(){
	var $CRM;

})(jQuery);
