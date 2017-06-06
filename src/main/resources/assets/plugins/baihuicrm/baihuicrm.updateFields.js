var echoFac = [];//条件回显的参数
var groupFields = [];//获取模块对应的字段用到的参数
//获取模块对应的字段
function choseTableNameFU(tableName){
	//var tableName = $("input[type=hidden][name='function.tableName']").val();
	$("select[id='fieldsSelect']").html("");
	$.ajax({
		url:"./batch/getUpdateFields",cache:false,async:false,data:{tableName:tableName},dataType:"json",
		type:"post",
		success:succ_callback,
		beforeSend:function(){
		},
	    complete:function(){
	    },
	    error: function() {
	    }
	});
	function succ_callback(data){
		groupFields = data;
		handleFieldsFun();
	}
}
//对应字段集合的处理
function handleFieldsFun(){
	//回显要用到
	var selectPojoNameId = $("#selectPojoNameId").val();
	//字段的赋值
	$("select[id='fieldsSelect']").html("<option value='-1'>--请选择--</option>");
	$(".condition-input").html("<input type='text' id='newValue' name='newValue' />");
	for(var g in groupFields){//遍历组
		if(groupFields[g].groupName!=undefined){
			$("select[id='fieldsSelect']").append("<option value='"+groupFields[g].groupId+"' disabled='false' style='font-weight:bold;font-style:italic;font-family:宋体;'>"+groupFields[g].groupName+"</option>");
			var fields = groupFields[g].childrens;
			for(var f in fields){//遍历字段
				if(fields[f].idNamePONameSType!=undefined){
					var sval = JSON.stringify(fields[f].idNamePONameSType);
					if(selectPojoNameId!=fields[f].idNamePONameSType.pojoName){
						$("select[id='fieldsSelect']").append("<option value='"+sval+"'>&nbsp;&nbsp;&nbsp;&nbsp;"+fields[f].showName+"</option>");
					}else{
						$("select[id='fieldsSelect']").append("<option selected='selected' value='"+sval+"'>&nbsp;&nbsp;&nbsp;&nbsp;"+fields[f].showName+"</option>");
						choseGroupField(sval,fields[f].showName,'2');
					}
				}
			}
		}
	}
}
//选择不同的字段的处理
function choseGroupField(value,context,flag){
	var showtype = "",proDictId = "",pojoName = "",setLength = "",validationType="";
	var required = false;
	var defdataType = "*";
	var obj = JSON.parse(value); //由JSON字符串转换为JSON对象
	showtype = obj.showType;
	proDictId = obj.proDictId; 
	pojoName = obj.pojoName; 
	setLength = obj.setLength;
	required = obj.required;
	validationType = obj.validationType;
	if(required==true){
	   required = "";
	}else{
	   required = "ignore='ignore'";
	}
	if(validationType==""){
	   validationType = "16,3,normal";
	}
	//选择对应的字段
	$("#selectPojoNameId").val(pojoName);
	$("#selectShowNameId").val(context);
	$("#viewFacForFU").val(value);
	
	var input_tag = document.getElementById("valueEare");
	var fieldUpdateValue = $("#fieldUpdateValue").val();
    //变更字段时需清空lookup类型数据的值：
    $("#luId").val("");
	$("#luName").val("");
	$("#errMsg").text("");
	$("#errMsg").removeClass();
	//字典值类型
	var dicItems = [];
	if(""!=proDictId){
		$.ajax({
			type:"post",url:"./view/findDics",async:false,data:{proDictId:proDictId},dataType:"json",
			success:function(data){
				dicItems = data;
			}
		});
	}
	if(flag=='1'){
		$("#fieldUpdateValue").val("");
	}
		switch(showtype){//根据不同的类型
		case "decisionbox":
			$(input_tag).find("div").attr("class","condition-input");
			$(input_tag).find("div").html("");
			if(flag=='1'){
				$(input_tag).find("div").html("<input id='newValue' type='checkbox' datatype='"+defdataType+"' "+required+"/>");
			}else if(flag=='2'){
				if(fieldUpdateValue!=null && fieldUpdateValue!=""){
					if(fieldUpdateValue=="1"){
						$(input_tag).find("div").html("<input id='newValue' type='checkbox' datatype='"+defdataType+"' "+required+" checked/>");
					}else{
						$(input_tag).find("div").html("<input id='newValue' type='checkbox' datatype='"+defdataType+"' "+required+" />");
					}
				}else{
					$(input_tag).find("div").html("<input id='newValue' type='checkbox' datatype='"+defdataType+"' "+required+" />");
				}
			}
			break;  			
		case "multiselect":
			$(input_tag).find("div").attr("class","condition-input");
			$(input_tag).find("div").css('width','auto');
			$(input_tag).find("div").css('text-align','left');
			$(input_tag).find("div").html("");
			var html = "";
			html += "<select onchange='multiSelectChange(this);' multiple='multiple' datatype='"+defdataType+"' "+required+" id='multiSelect_id'>";    	
		   	html += "<option value=''>--无--</option>";
		   	for(var a in dicItems){
		   		if(flag=='1'){
		   			html += "<option value='"+dicItems[a].name+"'>"+dicItems[a].name+"</option>";
		   		}else if(flag=='2'){
		   			if(fieldUpdateValue!=null && fieldUpdateValue!=""){
		   			    if(fieldUpdateValue.indexOf(",")!=-1){//多选
		   			       if((","+fieldUpdateValue+",").indexOf(","+dicItems[a].name+",")>-1){
		   			           html += "<option selected='selected' value='"+dicItems[a].name+"'>"+dicItems[a].name+"</option>";
		   			       }else{
		   			           html += "<option value='"+dicItems[a].name+"'>"+dicItems[a].name+"</option>";
		   			       }
		   			    }else{//单选
			   				if(fieldUpdateValue!=dicItems[a].name){
			   					html += "<option value='"+dicItems[a].name+"'>"+dicItems[a].name+"</option>";
			   				}else{
			   					html += "<option selected='selected' value='"+dicItems[a].name+"'>"+dicItems[a].name+"</option>";
			   				}
		   				}
		   			}else{
		   				html += "<option value='"+dicItems[a].name+"'>"+dicItems[a].name+"</option>";
		   			}
		   		}
		   	}
		    html += "</select>";
			$(input_tag).find("div").html(html);
			break;		
		case "dropDown":
			$(input_tag).find("div").attr("class","condition-select");
			$(input_tag).find("div").html("");
			var html = "";
			html += "<select onchange='choseDicItems(this.value);' datatype='"+defdataType+"' "+required+">";
		    html += "<option value=''>--无--</option>";      	
		   	for(var a in dicItems){
		   		if(flag=='1'){
		   			html += "<option value='"+dicItems[a].name+"'>"+dicItems[a].name+"</option>";
		   		}else if(flag=='2'){
		   			if(fieldUpdateValue!=null && fieldUpdateValue!=""){
		   				if(fieldUpdateValue!=dicItems[a].name){
		   					html += "<option value='"+dicItems[a].name+"'>"+dicItems[a].name+"</option>";
		   				}else{
		   					html += "<option selected='selected' value='"+dicItems[a].name+"'>"+dicItems[a].name+"</option>";
		   				}
		   			}else{
		   				html += "<option value='"+dicItems[a].name+"'>"+dicItems[a].name+"</option>";
		   			}
		   		}
		   	}
		    html += "</select>";
			$(input_tag).find("div").html(html);
			break;
		case "text":case "email":case "phone":case "mobilephone":case "autonumber":case "url":case "formula":case "idnumber":
			$(input_tag).find("div").attr("class","condition-input");
			$(input_tag).find("div").html("");
			if(showtype=="email"||showtype=="phone"||showtype=="mobilephone"||showtype=="idnumber"){
			   setLength = 100;
			}			
			if(flag=='1'){
				if(showtype=="text"){
				  $(input_tag).find("div").html("<input id='newValue' type='text' datatype='*1-"+setLength+"' "+required+" maxlength='"+setLength+"'/>");
				}else if(showtype=="autonumber"||showtype=="formula"){
				  $(input_tag).find("div").html("<input id='newValue' type='text' />"); 
				}else if(showtype=="idnumber"){
				  $(input_tag).find("div").html("<input id='newValue' type='text' datatype='idcard' "+required+" maxlength='100'/>"); 
				}else{
				  var html = "<input id='newValue' type='text' datatype='"+showtype+",*1-"+setLength+"' "+required+" maxlength='"+setLength+"'/>";
				  $(input_tag).find("div").html(html);
			    }
			}else if(flag=='2'){
				if(fieldUpdateValue!=null && fieldUpdateValue!=""){
					if(showtype=="text"){
					  $(input_tag).find("div").html("<input id='newValue' type='text' value='"+fieldUpdateValue+"' datatype='*1-"+setLength+"' "+required+" maxlength='"+setLength+"'/>");
					}else if(showtype=="autonumber"||showtype=="formula"){
					  $(input_tag).find("div").html("<input id='newValue' type='text' value='"+fieldUpdateValue+"' />"); 
					}else if(showtype=="idnumber"){
					  $(input_tag).find("div").html("<input id='newValue' type='text' value='"+fieldUpdateValue+"' datatype='idcard' "+required+" maxlength='100'/>"); 
					}else{
					  var html = "<input id='newValue' type='text' value='"+fieldUpdateValue+"' datatype='"+showtype+",*1-"+setLength+"' "+required+" maxlength='"+setLength+"'/>";
					  $(input_tag).find("div").html(html);					
				    }					
				}else{
					if(showtype=="text"){
					  $(input_tag).find("div").html("<input id='newValue' type='text' datatype='*1-"+setLength+"' "+required+" maxlength='"+setLength+"'/>");
					}else if(showtype=="autonumber"||showtype=="formula"){
					  $(input_tag).find("div").html("<input id='newValue' type='text' />"); 
					}else if(showtype=="idnumber"){
					  $(input_tag).find("div").html("<input id='newValue' type='text' datatype='idcard' "+required+" maxlength='100'/>"); 
					}else{
					  var html = "<input id='newValue' type='text' datatype='"+showtype+",*1-"+setLength+"' "+required+" maxlength='"+setLength+"'/>";
					  $(input_tag).find("div").html(html);
				    }				
				}
			}
			break;
		case "multiLine":
			$(input_tag).find("div").attr("class","condition-input");
			$(input_tag).find("div").html("");
			if(flag=='1'){
				$(input_tag).find("div").html("<input type='text' id='newValue' datatype='*1-"+setLength+"' "+required+" maxlength='"+setLength+"'/><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
			}else if(flag=='2'){
				if(fieldUpdateValue!=null && fieldUpdateValue!=""){
					$(input_tag).find("div").html("<input type='text' id='newValue' datatype='*1-"+setLength+"' "+required+" maxlength='"+setLength+"' value='"+fieldUpdateValue+"' /><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
				}else{
					$(input_tag).find("div").html("<input type='text' id='newValue' datatype='*1-"+setLength+"' "+required+" maxlength='"+setLength+"' /><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
				}
			}
			break;
		case "date":
			$(input_tag).find("div").html("");
			if(flag=='1'){
				$(input_tag).find("div").html("<div style='position: relative; display: inline-block;'><input id='newValue' datatype='"+defdataType+"' "+required+" class='laydate-icon' onfocus='dateFocus(this,\"yyyy-MM-dd\");' onblur='dateBlur(this);' readonly='readonly' placeholder='YYYY-MM-DD'/></div>");
			}else if(flag=='2'){
				if(fieldUpdateValue!=null && fieldUpdateValue!=""){
					$(input_tag).find("div").html("<div style='position: relative; display: inline-block;'><input id='newValue' datatype='"+defdataType+"' "+required+" value='"+fieldUpdateValue+"' class='laydate-icon' onfocus='dateFocus(this,\"yyyy-MM-dd\");' onblur='dateBlur(this);' readonly='readonly' placeholder='YYYY-MM-DD'/></div>");
				}else{
					$(input_tag).find("div").html("<div style='position: relative; display: inline-block;'><input id='newValue' datatype='"+defdataType+"' "+required+" class='laydate-icon' onfocus='dateFocus(this,\"yyyy-MM-dd\");' onblur='dateBlur(this);' readonly='readonly' placeholder='YYYY-MM-DD'/></div>");
				}
				
			}
			break;
		case "datetime":
			$(input_tag).find("div").html("");
			if(flag=='1'){
				$(input_tag).find("div").html("<div style='position: relative; display: inline-block;'><input id='newValue' datatype='"+defdataType+"' "+required+" class='laydate-icon' onfocus='dateFocus(this,\"yyyy-MM-dd HH:mm\");' onblur='dateBlur(this);' readonly='readonly' placeholder='yyyy-MM-dd HH:mm'></div>");
			}else if(flag=='2'){
				if(fieldUpdateValue!=null && fieldUpdateValue!=""){
				    $(input_tag).find("div").html("<div style='position: relative; display: inline-block;'><input id='newValue' datatype='"+defdataType+"' "+required+" value='"+fieldUpdateValue+"' class='laydate-icon' onfocus='dateFocus(this,\"yyyy-MM-dd HH:mm\");' onblur='dateBlur(this);' readonly='readonly' placeholder='yyyy-MM-dd HH:mm'></div>");
				}else{
					$(input_tag).find("div").html("<div style='position: relative; display: inline-block;'><input id='newValue' datatype='"+defdataType+"' "+required+" class='laydate-icon' onfocus='dateFocus(this,\"yyyy-MM-dd HH:mm\");' onblur='dateBlur(this);' readonly='readonly' placeholder='yyyy-MM-dd HH:mm'></div>");
				}
			}
			break;
		case "number":case "longnumber":
			$(input_tag).find("div").attr("class","condition-input");
			$(input_tag).find("div").html("");
			if(flag=='1'){
				$(input_tag).find("div").html("<input id='newValue' type='text' datatype='integer1-"+setLength+"' "+required+" /><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
			}else if(flag=='2'){
				if(fieldUpdateValue!=null && fieldUpdateValue!=""){
					$(input_tag).find("div").html("<input id='newValue' type='text' value='"+fieldUpdateValue+"' datatype='integer1-"+setLength+"' "+required+" /><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
				}else{
					$(input_tag).find("div").html("<input id='newValue' type='text' datatype='integer1-"+setLength+"' "+required+" /><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
				}
			}
			break;
		case "currency":case "decimal":case "percent":
			$(input_tag).find("div").attr("class","condition-input");
			$(input_tag).find("div").html("");
			if(flag=='1'){ 
			    if(showtype=="currency"){
				   $(input_tag).find("div").html("<input id='newValue' type='text' datatype='currency' "+required+" limit='["+validationType+"]' maxlength='"+setLength+"'/><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
			    }else if(showtype=="decimal"){
				   $(input_tag).find("div").html("<input id='newValue' type='text' datatype='decimal' "+required+" limit='["+validationType+"]'/><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
			    }else if(showtype=="percent"){
				   $(input_tag).find("div").html("<input id='newValue' type='text' datatype='percent' "+required+" maxlength='16' /><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
			    }
			}else if(flag=='2'){
				if(fieldUpdateValue!=null && fieldUpdateValue!=""){
				    if(showtype=="currency"){
					   $(input_tag).find("div").html("<input id='newValue' value='"+fieldUpdateValue+"' type='text' datatype='currency' "+required+" limit='["+validationType+"]' maxlength='"+setLength+"'/><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
				    }else if(showtype=="decimal"){
					   $(input_tag).find("div").html("<input id='newValue' value='"+fieldUpdateValue+"' type='text' datatype='decimal' "+required+" limit='["+validationType+"]'/><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
				    }else if(showtype=="percent"){
					   $(input_tag).find("div").html("<input id='newValue' value='"+fieldUpdateValue+"' type='text' datatype='percent' "+required+" maxlength='16' /><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
				    }					
				}else{
				    if(showtype=="currency"){
					   $(input_tag).find("div").html("<input id='newValue' type='text' datatype='currency' "+required+" limit='["+validationType+"]' maxlength='"+setLength+"'/><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
				    }else if(showtype=="decimal"){
					   $(input_tag).find("div").html("<input id='newValue' type='text' datatype='decimal' "+required+" limit='["+validationType+"]'/><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
				    }else if(showtype=="percent"){
					   $(input_tag).find("div").html("<input id='newValue' type='text' datatype='percent' "+required+" maxlength='16'/><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
				    }
				}
			}
			break;
		case "lookup":
			$(input_tag).find("div").attr("class","condition-input");
			$(input_tag).find("div").html("");
			
			var tableName = $("input[type=hidden][name='function.tableName']").val();
			//查询对应的关联的关联关系
			$.ajax({
            	type: "POST",
            	url:"./batch/lookUpFileds",
            	data:{
            		pojoName:pojoName,
            		tableName:tableName
            	},
				dataType : "json",
            	success: function(data) {
    				if(""!=data){
						var datas = eval(data);
						var tn = datas['tableName'];
						var an = datas['actionName'];
						var ns = datas['nameSpace'];
						var en = datas['entityName'];
						var di = datas['dataId'];
						var dn = datas['dataName'];
						var type = datas['type']; 
						var pn = datas['pojo_name'];
						$("#luId").val(di);
						$("#luName").val(dn);
						if(flag=='1'){
							$(input_tag).find("div").append("<p><input type='hidden' id=\'"+di+"\' name=\'"+di+"\' value=''/>");
							var html = "<div style='position: relative; display: inline-block;'><input id='"+dn+"' name='"+dn+"' value='' type='text' datatype='"+defdataType+"' "+required+" class='input' readonly='readonly' required><a class='clear'></a><a class='ico-jingzheng' href='javascript:choseLookupFun(\""+tn+"\",\""+an+"\",\""+ns+"\",\""+en+"\",\""+di+"\",\""+dn+"\",\""+pn+"\",\""+type+"\",\""+context+"\");'><i></i></a></div>";
						    if(pojoName=='module1Name'||pojoName=='module2Name'){//关联模块/关联业务先处理成文本域
						       $(input_tag).find("div").append("<input type='text' id='"+dn+"' name='"+dn+"' value=''/>");
						    }else{
						       $(input_tag).find("div").append(html);
						    }
						}else if(flag=='2'){
							if(fieldUpdateValue!=null && fieldUpdateValue!="" && fieldUpdateValue.indexOf("&")>-1){
								var fieldupdateValArr = fieldUpdateValue.split("&");
								$(input_tag).find("div").append("<p><input type='hidden' id=\'"+di+"\' name=\'"+di+"\' value=\'"+fieldupdateValArr[0]+"\'/>");
							    var html = "<div style='position: relative; display: inline-block;'><input id='"+dn+"' name='"+dn+"' value=\'"+fieldupdateValArr[1]+"\' type='text' datatype='"+defdataType+"' "+required+" class='input' readonly='readonly' required><a class='clear'></a><a class='ico-jingzheng' href='javascript:choseLookupFun(\""+tn+"\",\""+an+"\",\""+ns+"\",\""+en+"\",\""+di+"\",\""+dn+"\",\""+pn+"\",\""+type+"\",\""+context+"\");'><i></i></a></div>";
							    if(pojoName=='module1Name'||pojoName=='module2Name'){//关联模块/关联业务先处理成文本域
							       $(input_tag).find("div").append("<input type='text' readonly='readonly' id='"+dn+"' name='"+dn+"' value=\'"+fieldupdateValArr[1]+"\'/>");
							    }else{
							       $(input_tag).find("div").append(html);
							    }
							    //赋值完成后置空,lookup 类型需特殊处理：
							    $("#fieldUpdateValue").val("");
							}else{
								$(input_tag).find("div").append("<p><input type='hidden' id=\'"+di+"\' name=\'"+di+"\' value=''/>");
                                var html = "<div style='position: relative; display: inline-block;'><input id='"+dn+"' name='"+dn+"' value='' type='text' datatype='"+defdataType+"' "+required+" class='input' readonly='readonly' required><a class='clear'></a><a class='ico-jingzheng' href='javascript:choseLookupFun(\""+tn+"\",\""+an+"\",\""+ns+"\",\""+en+"\",\""+di+"\",\""+dn+"\",\""+pn+"\",\""+type+"\",\""+context+"\");'><i></i></a></div>";
							    if(pojoName=='module1Name'||pojoName=='module2Name'){//关联模块/关联业务先处理成文本域
							       $(input_tag).find("div").append("<input type='text' readonly='readonly' id='"+dn+"' name='"+dn+"' value=''/>");
							    }else{
							       $(input_tag).find("div").append(html);
							    }							    
							}
						}
				 	}
            	 }
        	});
			
			break;
		default:
			$(input_tag).find("div").attr("class","condition-input");
			$(input_tag).find("div").html("");
			if(flag=='1'){
				$(input_tag).find("div").html("<input id='newValue' type='text'/><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
			}else if(flag=='2'){
				if(fieldUpdateValue!=null && fieldUpdateValue!=""){
					if(fieldUpdateValue!=""){
						$(input_tag).find("div").html("<input id='newValue' value='"+fieldUpdateValue+"' type='text'/><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
					}else{
						$(input_tag).find("div").html("<input id='newValue' readonly='readonly' value='"+fieldUpdateValue+"' type='text'/><a id='aid' href='javascript:makeNotEmptyFun();'>指定值</a>");
					}
				}else{
					$(input_tag).find("div").html("<input id='newValue' type='text'/><a id='aid' href='javascript:makeEmptyFun();'>设置为空</a>");
				}
			}
			break;
	}
}
/*
 选择对应的字典值
因为字典建和值都是一样的
*/
function choseDicItems(value){
	$("#fieldUpdateValue").val(value); 
}
//关联模块和查找字段的查询选择
function choseLookupFun(tableName,actionName,nameSpace,entityName,dataId,dataName,pojoName,type,showName){
	if(tableName!="s_user"){
		var URL="../"+nameSpace+"/lookupList?nameSpace="+nameSpace+"&actionName="+actionName+"&pojoName="+pojoName+"";
		openPostLookupIframe(URL,"opportunity",{
		"function.name":"查找列表",
		"function.tableName":""+tableName+"",
		"function.entityName":""+entityName+""
		});
	}else{
	    var id = '#'+dataId;
	    var name = '#'+dataName;
	    var fromModalValue;
	    if($("#myModalCheck").attr("aria-hidden")=="false"){//在列表页弹出框更新
	    	fromModalValue = '#myModalCheck';
	    	$("#myModalCheck").modal("hide");
	    }else{
	    	fromModalValue = undefined;
	    }
	    if(showName==undefined||showName==""||$.trim(showName)==""){
	    	showName = "所有者";
	    }else{
	    	showName = $.trim(showName);
	    }
	    if(type==""){ //单选
	       $(this).usersel({e1:id, e2:name,title:'选择'+showName,fromModal:fromModalValue}); 
	    }else{ //多选
	       $(this).usersel({multiSelect:true,e1:id, e2:name,title:'选择'+showName,fromModal:fromModalValue});  
	    }
	}
}
//清空已经选择的关联模块和查找字段
function deleteLookupFun(dataId,dataName){
	$("#"+dataId+"").val("");
	$("#"+dataName+"").val("");
}
//设置为空
function makeEmptyFun(){
	//同时设置对应的class
	$("#newValue").val("");
	$("#newValue").focus();
	//$('#newValue').attr('readonly','readonly');
	//$("#aid").text("指定值");
	//$('#aid').attr('href','javascript:makeNotEmptyFun();'); 
	//同时设置a的点击链接
}
//设置为指定值
function makeNotEmptyFun(){
	//同时设置对应的class
	$("#newValue").val("");
	$('#newValue').attr('readonly',null);
	$("#aid").text("设置为空");
	$('#aid').attr('href','javascript:makeEmptyFun();'); 
}
//多选列表值变更事件
function multiSelectChange(elem) {
	var tempValue="";
	$(elem).children("option").each(function(index){
		if(this.selected&&this.value!=""){
			tempValue+=","+this.value;
		}
	});
	if(tempValue!=""&&tempValue.indexOf(",")==0) tempValue= tempValue.substring(1);
	$("#fieldUpdateValue").val(tempValue===""?"":tempValue);
	tempValue="";
}
//记录点击哪个按钮
function setClickButton(value){
   $("#clickButton").val(value);
}

/**
 * 校验日期
 * @param e
 */
function dateFocus(e,dataType){
	$(".updateFields").Validform().ignore("#"+e.id);
	WdatePicker({el:e.id, dateFmt:dataType,onpicking:function(){$('.updateFields').Validform().unignore('#'+e.id);},onpicked:function(){$('.updateFields').Validform().unignore('#'+e.id);$('.updateFields').Validform().check(false, '#'+e.id);},oncleared:function(dp){$('.updateFields').Validform().unignore('#'+e.id);}});
}

function dateBlur(e){
	if($("iframe[tag='my97Iframe']").parent("div").css("display")==="none"){
		$('.updateFields').Validform().unignore('#'+e.id);
		$('.updateFields').Validform().check(false, '#'+e.id);
	}
}