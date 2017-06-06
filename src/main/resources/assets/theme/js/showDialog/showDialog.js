
/*!
 * jQuery showDialog
 * AYCRM
 * Date: 2014.12.22
*/

function detectMacXFF() {
	var userAgent = navigator.userAgent.toLowerCase();
	if(userAgent.indexOf("mac") != -1 && userAgent.indexOf("firefox") != -1) {
		return true;
	}
}

function in_array(needle, haystack) {
	if(typeof needle == "string" || typeof needle == "number") {
		for(var i in haystack) {
			if(haystack[i] == needle) {
				return true;
			}
		}
	}
	return false;
}

function sd_load(sd_width) {
	if(sd_width) {
		$("#SD_window").css("width", sd_width + "px");
	}
	$("#SD_window").height("850")
	var sd_top = ($(window).height() - $("#SD_window").height()) / 2 + $(document).scrollTop();
	if(sd_top < 0) {
		sd_top = 0;
	}
	var sd_left = ($(window).width() - $("#SD_window").width()) / 2;
	if(sd_left < 0) {
		sd_left = 0;
	}
	$("#SD_window").css("top", sd_top);
	$("#SD_window").css("left", sd_left);
}

function sd_remove() {
	$("#SD_close,#SD_cancel,#SD_confirm").unbind("click");
	$("#SD_window,#SD_overlay,#SD_HideSelect").remove();
	if(typeof document.body.style.maxHeight == "undefined") {
		$("body","html").css({height: "auto", width: "auto"});
	}
}

function sd_remove1() {
	$("#SD_close,#SD_cancel,#SD_confirm").unbind("click");
	$("#SD_window,#SD_overlay,#SD_HideSelect").remove();
	/*if(typeof document.body.style.maxHeight == "undefined") {
		$("body","html").css({height: "auto", width: "auto"});
	}*/
}

function showDialog(mode, msg, t, sd_width) {
	var sd_width = sd_width ? sd_width : 400;
	var mode = in_array(mode, ['confirm', 'window', 'info', 'loading']) ? mode : 'alert';
	var t = t ? t : "提示信息";
	var msg = msg ? msg : "";
	var confirmtxt = confirmtxt ? confirmtxt : "确定";
	var canceltxt = canceltxt ? canceltxt : "取消";
	sd_remove1();
	try {
		if(typeof document.body.style.maxHeight === "undefined") {
			$("body","html").css({height: "100%", width: "100%"});
			if(document.getElementById("SD_HideSelect") === null) {
				$("body").append("<iframe id='SD_HideSelect'></iframe><div id='SD_overlay'></div>");
			}
		} else {
			if(document.getElementById("SD_overlay") === null) {
				$("body").append("<div id='SD_overlay'></div>");
			}
		}
		if(mode == "alert") {
			if(detectMacXFF()) {
				$("#SD_overlay").addClass("SD_overlayMacFFBGHack");
			} else {
				$("#SD_overlay").addClass("SD_overlayBG");
			}
		} else {
			if(detectMacXFF()) {
				$("#SD_overlay").addClass("SD_overlayMacFFBGHack2");
			} else {
				$("#SD_overlay").addClass("SD_overlayBG2");
			}
		}
		$("body").append("<div id='SD_window' ></div>");
		var SD_html;
		SD_html = "";

		SD_html += "<div id='SD_body'><div id='SD_content'>" + msg + "</div></div>";

		$("#SD_window").append(SD_html);
		$("#SD_confirm,#SD_cancel,#SD_close,.zhuanhui-close").bind("click", function(){
			sd_remove();
		});
		if(mode == "info" || mode == "alert") {
			$("#SD_cancel").hide();
			$("#SD_button").show();
		}
		if(mode == "window") {
			$("#SD_close").show();
		}
		if(mode == "confirm") {
			$("#SD_button").show();
		}
		var sd_move = false;
		var sd_x, sd_y;
		$("#SD_container > h3").click(function(){}).mousedown(function(e){
			sd_move = true;
			sd_x = e.pageX - parseInt($("#SD_window").css("left"));
			sd_y = e.pageY - parseInt($("#SD_window").css("top"));
		});
		$(document).mousemove(function(e){
			if(sd_move){
				var x = e.pageX - sd_x;
				var y = e.pageY - sd_y;
				$("#SD_window").css({left:x, top:y});
			}
		}).mouseup(function(){
			sd_move = false;
		});
		$("#SD_body").width(sd_width - 50);
		sd_load(sd_width);
		$("#SD_window").show();
		$("#SD_window").focus();
	} catch(e) {
		alert("System Error !");
	}
}



function showInfo(msg, fn, timeout) {
	showDialog("info", msg);
	$("#SD_confirm").unbind("click");
	if(fn && timeout) {
		st = setTimeout(function(){
			sd_remove();
			fn();
		}, timeout * 1000);
	}
	$("#SD_confirm").bind("click", function(){
		if(timeout) {
			clearTimeout(st);
		}
		sd_remove();
		if(fn) {
			fn();
		}
	});
}

function showWindow(title, the_url, sd_width,datajson) {
	var sd_width = sd_width ? sd_width : 400;
	/*var datajson={
			"entityId":$("input[name='entityId']").val(),
			"mappingId":$("input[name='mappingId']").val(),
			"opName":$("input[name='opName']").val(),
			"nameSpace":$("input[name='nameSpace']").val(),
			"actionName":$("input[name='actionName']").val(),
			"function.id":$("input[name='function.id']").val(),
			"function.name":$("input[name='function.name']").val(),
			"locale":"en_US",
			"isajax":"1",
			"colleagueIds":$("input[name='colleagueIds']").val(),
			"groupIds":$("input[name='groupIds']").val(),
			"orgIds":$("input[name='orgIds']").val()
			
	};*/
	/*console.log("colleagueIds"+$("input[name='colleagueIds']").val());
	console.log("groupIds"+$("input[name='groupIds']").val());
	console.log("orgIds"+$("input[name='orgIds']").val());*/
	$.ajax({
		type		: "POST",
		dataType	: "html",
		cache		: false,
		timeout		: 1000000,
		url			: the_url,
		success		: function(data1){
			showDialog("window", data1, title, sd_width);
		},
		error		: function(data1){
			showDialog("alert", "读取数据失败");
		},
		beforeSend	: function(data1){
			showDialog("loading", "正在读取数据...");
		}
	});
}
/**
 * 公告中用到
 * @param title
 * @param the_url
 * @param sd_width
 */
function showWindowNotice(title, the_url, sd_width) {
	alert(0);
	var sd_width = sd_width ? sd_width : 400;
	var datajson={
			"toUserIds":$("input[name='toUserId']").val(),
			"toGroupIds":$("input[name='toGroupId']").val(),
			"toOrgIds":$("input[name='toOrgId']").val()
			
	};
	$.ajax({
		type		: "POST",
		dataType	: "html",
		cache		: false,
		timeout		: 1000000,
		url			: the_url,
		data		: datajson,
		success		: function(data){
			showDialog("window", data, title, sd_width);
		},
		error		: function(data){
			showDialog("alert", "读取数据失败");
		},
		beforeSend	: function(data){
			showDialog("loading", "正在读取数据...");
		}
	});
}
function showDialog1(mode, msg, t, sd_width) {
	var sd_width = sd_width ? sd_width : 400;
	var mode = 'window';
	var msg = msg ? msg : "";
	var confirmtxt = confirmtxt ? confirmtxt : "确定";
	var canceltxt = canceltxt ? canceltxt : "取消";
	try {
		if(typeof document.body.style.maxHeight === "undefined") {
			$("body","html").css({height: "100%", width: "100%"});
			if(document.getElementById("SD_HideSelect1") === null) {
				$("body").append("<iframe id='SD_HideSelect1'></iframe><div id='SD_overlay1'></div>");
			}
		} else {
			if(document.getElementById("SD_overlay1") === null) {
				$("body").append("<div id='SD_overlay1'></div>");
			}
		}
		$("body").append("<div id='SD_window1'></div>");
		var SD_html;
		SD_html = "";
		SD_html += "<table cellspacing='0' cellpadding='0'><tbody><tr><td class='SD_bg'></td><td class='SD_bg'></td><td class='SD_bg'></td></tr>";
		SD_html += "<tr><td class='SD_bg'></td>";
		SD_html += "<td id='SD_container1'>";
		SD_html += "<h3 id='SD_title1'>" + t + "</h3>";
		SD_html += "<div id='SD_body1'><div id='SD_content1'>" + msg + "</div></div>";
		SD_html += "<div id='SD_button1'><div class='SD_button1'>";
		SD_html += "<a id='SD_confirm1'>" + confirmtxt + "</a>";
		SD_html += "<a id='SD_cancel1'>" + canceltxt + "</a>";
		SD_html += "</div></div>";
		SD_html += "<a href='javascript:;' id='SD_close1' title='关闭'></a>";
		SD_html += "</td>";
		SD_html += "<td class='SD_bg'></td></tr>";
		SD_html += "<tr><td class='SD_bg'></td><td class='SD_bg'></td><td class='SD_bg'></td></tr></tbody></table>";
		$("#SD_window1").append(SD_html);
		/*$("#SD_confirm,#SD_cancel,#SD_close").bind("click", function(){
			sd_remove();
		});*/
		if(mode == "window") {
			$("#SD_close").show();
		}
		//alert("2");
		//var sd_move = false;
		//var sd_x, sd_y;
		$("#SD_container1 > h3").click(function(){}).mousedown(function(e){
			sd_move = true;
			sd_x = e.pageX - parseInt($("#SD_window1").css("left"));
			sd_y = e.pageY - parseInt($("#SD_window1").css("top"));
		});
		$(document).mousemove(function(e){
			if(sd_move){
				var x = e.pageX - sd_x;
				var y = e.pageY - sd_y;
				$("#SD_window1").css({left:x, top:y});
			}
		}).mouseup(function(){
			sd_move = false;
		});
		//$("#SD_body1").width(sd_width - 50);
		//sd_load(sd_width);
		$("#SD_window1").show();
		//$("#SD_window1").focus();
	} catch(e) {
		alert("System Error !");
	}
}

function showWindow1(title, the_url, sd_width) {
	showDialog1("window", "ss", title, sd_width);
	
	/*var sd_width = sd_width ? sd_width : 400;
	$.ajax({
		type		: "GET",
		dataType	: "html",
		cache		: false,
		timeout		: 10000,
		url			: the_url,
		data		: "isajax=1",
		success		: function(data){
			showDialog("window", data, title, sd_width);
		},
		error		: function(data){
			showDialog("alert", "读取数据失败");
		},
		beforeSend	: function(data){
			showDialog("loading", "正在读取数据...");
		}
	});*/
}

function showConfirm(msg, fn) {
	showDialog("confirm", msg);
	$("#SD_confirm").unbind("click");
	$("#SD_confirm").bind("click", function(){
		if(fn) {
			fn();
		}
	});
	$("#SD_confirm,#SD_cancel,#SD_close").bind("click", function(){
		sd_remove();
	});
}
function showConfirm(msg, fn, fn2) {
	showDialog("confirm", msg);
	$("#SD_confirm").unbind("click");
	$("#SD_confirm").bind("click", function(){
		if(fn) {
			fn();
		}
	});
	$("#SD_cancel,#SD_close").unbind("click");
	$("#SD_cancel,#SD_close").bind("click", function(){
		if(fn2){
			fn2();
		}else{
			sd_remove();
		}
	});
}