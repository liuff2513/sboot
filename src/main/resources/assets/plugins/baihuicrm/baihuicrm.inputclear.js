/**
 * 输入框清除按钮
 * 
 * @author feifei.liu
 */

/*
;
(function($, window, document, undefined) {
	/!**
	 * 输入框清除按钮功能 liuff 20141014
	 *!/
	$(document).ready(function(){
		/!*输入框获取焦点事件绑定*!/
		$("input").bind("focus",function(){
			if(inputObj!=this) $("#clearDiv").hide();
			if(this.value!=null&&this.value!=""){
				var inputWidth=$(this).outerWidth();
				var inputHeight=$(this).outerHeight();
				var inputOffset =  $(this).offset();
				var inputTop=inputOffset.top;
				var inputLeft=inputOffset.left;
				$("#clearDiv").css({top:inputTop+2,left:inputLeft+inputWidth-27}).show();
				inputObj=this;
			}
			$(this).attr("maxlength","19");
		});
		var bind_name="input";//定义所要绑定的事件名称
		if(navigator.userAgent.indexOf("MSIE")!=-1) bind_name="propertychange";//判断是否为IE内核 IE内核的事件名称要改为propertychange
		/!*输入框键盘离开事件绑定*!/
		$("input").bind(bind_name,function(){
			if(this.value!=null&&this.value!=""){
				var inputWidth=$(this).outerWidth();
				var inputHeight=$(this).outerHeight();
				var inputOffset =  $(this).offset();
				var inputTop=inputOffset.top;
				var inputLeft=inputOffset.left;
				$("#clearDiv").css({top:inputTop+2,left:inputLeft+inputWidth-27}).show();
				inputObj=this
			}else{
				$("#clearDiv").hide();
			}
		});
		/!*页面单击事件绑定*!/
		$(document).bind("mousedown",function(event){
			var targetType=event.target.type;
			var targetId=event.target.id;
			if(targetType!="text"&&targetId!="clearDiv")
				$("#clearDiv").hide();
		});
		/!*清除按钮click事件绑定*!/
		$("#clearDiv").bind("click",function(){
			if(inputObj) inputObj.value="";
			$(inputObj).focus();
			$("#clearDiv").hide();
		});
	});
	//定义清除按钮层
	var clearDiv="<div id='clearDiv' contenteditable='false' style='" +
			"display:none;" +
			"position:absolute;" +
			"z-index:9999;" +
			//"background:#FDFDFD url(\"../htmlShow/img/clear3.png\") no-repeat center left;" +
			"background:#FDFDFD url(\"../theme/img/chabing-close.png\") no-repeat center;" +
			"background-size:22px 22px;" +
			"text-align:center;" +
			"width:26px;"+
			"height:23px;"+
			//"border-left:1px solid #EEE;"+
			"'></div>";
	//将定义的层加入到当前页面中
	$(document.body).append(clearDiv);
	var inputObj;//当前clearDiv所悬浮在之上的输入框对象

})(jQuery, window, document);
*/

//input的清除功能
$(document).ready(function(){
	//定义清除按钮层
	var clearDiv="<div id='clearDiv' contenteditable='false'></div>";
	//将定义的层加入到当前页面中
	$(document.body).append(clearDiv);
	var inputObj;//当前clearDiv所悬浮在之上的输入框对象
	var parentArr=["text","email","phone","number","currency","decimal","percent","longnumber","url","idnumber","mobilephone"]

	/*输入框获取焦点事件绑定*/
	$(contentMain).delegate("input", "focus", function(){
		var parentType=$(this).parent().attr("data-showtype");
		if(inputObj!=this&&$(this).attr("type")!="text"){//如果不是点击的这个input框则不执行
			return;
		}else{
			if(parentArr.indexOf(parentType)<0) return;//如果不是parentArr中的类型不执行
			if(this.value!=null&&this.value!=""){
				/*不可编辑字段不能删除,特殊处理下*/
				if($(this).parent().hasClass("readOnly-view")){
					return;
				}
				var inputWidth=$(this).outerWidth();
				var inputHeight=$(this).outerHeight();
				var inputOffset =  $(this).offset();
				var inputTop=inputOffset.top;
				var inputLeft=inputOffset.left;
				$("#clearDiv").css({top:inputTop+5,left:inputLeft+inputWidth-18}).show();
				inputObj=this;
			}else{
				$("#clearDiv").hide();
			}
			var bind_name="input";//定义所要绑定的事件名称
			if(navigator.userAgent.indexOf("MSIE")!=-1) bind_name="propertychange";//判断是否为IE内核 IE内核的事件名称要改为propertychange
			/*输入框键盘离开事件绑定*/
			$(this).on(bind_name,function(){
				if(this.value!=null&&this.value!=""){
					var inputWidth=$(this).outerWidth();
					var inputHeight=$(this).outerHeight();
					var inputOffset =  $(this).offset();
					var inputTop=inputOffset.top;
					var inputLeft=inputOffset.left;
					$("#clearDiv").css({top:inputTop+5,left:inputLeft+inputWidth-18}).show();
					inputObj=this
				}else{
					$("#clearDiv").hide();
				}
			});
		}
	});

	/*页面单击事件绑定*/
	$(document).bind("click",function(event){
		var targetType=event.target.type;
		var targetId=event.target.id;
		if(targetType!="text"&&targetId!="clearDiv"){
			$("#clearDiv").hide();
		}
	});

	/*清除按钮click事件绑定*/
	$("#clearDiv").bind("click",function(){
		if(inputObj) inputObj.value="";
		$(inputObj).focus();
		$("#clearDiv").hide();
	});
});

