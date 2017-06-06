;(function($, window, document, undefined) {
	var pluginName = "erptablebody";
	var defaults = {
		themeField : "NAME", //产品主题字段
		orderTitle : "#序号", //首列名称
		sumTitle: "合计",
		initRowCount : 0,
		editingIndex : 0, //编辑行
//		choseType : 0,//产品选择类型 0 母 1 子
		dom: {}, //DOM对象
		thead: {},//thead对象
		tbody: {},//tbody对象
		tfoot: {},//tfoot对象
		_fields : [],//字段信息
		_data: [],//数据信息
		_opName: "create",
		titleIndexs: {}, // 字段下标信息
		fieldsInfo: {}, // 字段对相应下标信息
		pojoFields:{},
		sumFields:[],//需要合计的字段
		itemAjax : {dataType:"html"}, //产品选择请求
		inputTypes:[],
		//orderValues: [],
		style : {
			lookSpan:{
			},insertSpan:{
			},delSpan:{
			}
		}
		
	};
	function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this.init();
	}
	Plugin.prototype = {
		init : function(){
			var _this = this;
			var dom = _this.element;
			var thead = dom.createTHead();
			thead.className = "fixedThead";
			var headRow = thead.insertRow(0);
			var titleIndexs = {};
			var fieldsInfo  = {};
			var sumFields   = [];
			var formulaFields = [];
			var pojoFields  = {};
			//序号添加
			var orderCell = headRow.insertCell(0);
			orderCell.innerText = _this.settings.orderTitle;
			//--end 序号添加
			_this.settings._fields.forEach(function(item, i) {
				var cell = headRow.insertCell(i+1);
				cell.innerText = item.showName;
				for(var ii in item) {
					cell.setAttribute("field-"+ii, item[ii]);
				}
				if(item.localOnly&&item.localOnly==true){
					sumFields.push(item.name);
				}
				titleIndexs[item.name]=i+1;
				fieldsInfo[item.name] = item;
				if(!!item.showType&&item.showType==="formula") {
                    formulaFields.push(item);
				}
				pojoFields[item.pojoName] = item;
			});
			_this.settings.dom = dom;
			_this.settings.thead = thead;
			_this.settings.titleIndexs = titleIndexs;
			_this.settings.fieldsInfo  = fieldsInfo;
			_this.settings.sumFields   = sumFields;
			_this.settings.formulaFields = formulaFields;
			_this.settings.inputTypes  = ["input","select"];
			_this.settings.pojoFields  = pojoFields;
			_this.draw();
		},
		draw : function(){
			var _this = this;
			var dom = _this.element;
			var tbody = dom.createTBody();
			_this.settings.tbody = tbody;
			tbody.className = "scrollTbody ";
			for(var i in _this.settings.style){
				tbody.style[i] = _this.settings.style[i];
			}
			for(var i=0;i<_this.settings.initRowCount;i++) {
				_this.generateTr(i, i+1);
			}
			//数据写入处理
			if((_this.settings._opName==="update"||_this.settings._opName==="view")&&!!_this.settings._data){
				var lastSerialNum = "";
				_this.settings._data.forEach(function(item, i) {
					_this.generateTr(i, item["serialNum"], item);
					if(lastSerialNum!=""&&_this.ifChild(item["serialNum"],lastSerialNum)>0){
					   _this.disabledRow(i-1,false); 
					}
					lastSerialNum = item["serialNum"];
					
				});
			}
			
			//合计
			var tfoot = dom.createTFoot();
			_this.settings.tfoot = tfoot;
			var sumRow = tfoot.insertRow(0);
			var sumOrderCell = sumRow.insertCell(0);
			sumOrderCell.innerHTML = '<span class="orderSpan">'+_this.settings.sumTitle+'</span>'; 
			_this.settings._fields.forEach(function(item, i) {
				var sumCell = sumRow.insertCell(i+1);
				sumCell.innerText = "";
				for(var ii in item) {
					sumCell.setAttribute("field-"+ii, item[ii]);
				}
			});
			_this.resizeEvent();
			$(dom).resize(function() {_this.resizeEvent();});
			//调用一下合计
			_this.calculateSum();
		},
		resizeEvent: function() {
			var _this = this;
            var tbodytrs = $(_this.settings.tbody).find("tr").length;
            if(tbodytrs > 0) {
				$(_this.settings.thead).find("td").each(function(i, item) {
					item.style.width = $(_this.settings.tbody).find("tr:first td:eq("+i+")").outerWidth()+"px";
				});
				$(_this.settings.tfoot).find("td").each(function(i, item) {
					item.style.width = $(_this.settings.tbody).find("tr:first td:eq("+i+")").outerWidth()+"px";
				});
			}else{
            	var theadwidth = $(_this.settings.thead).outerWidth();
            	var theadtdcount = $(_this.settings.thead).find("td").length;
                $(_this.settings.thead).find("td").each(function(i, item) {
                    item.style.width = theadwidth/theadtdcount+"px";
                });
                $(_this.settings.tfoot).find("td").each(function(i, item) {
                    item.style.width = theadwidth/theadtdcount+"px";
                });
			}
		},
		generateTr: function() {//生成一行数据
			var _this = this;
			var newRowIndex = arguments[0];
			var orderValue = arguments[1];
			var data   = arguments[2]; 
			var newRow = _this.settings.tbody.insertRow(newRowIndex);
			var titleIndexs = _this.settings.titleIndexs;
			var fieldsInfo = _this.settings.fieldsInfo;
			//序号添加
			var orderCell = newRow.insertCell(0);
			orderCell.innerHTML = '<span class="orderSpan">'+orderValue+'</span>';
			//删除按钮添加
			if(_this.settings._opName!="view") {//查看详情不显示删除按钮
				var delSpan = document.createElement("span");
				delSpan.className = "kh-a03 delSpan";
				for(var i in _this.settings.style.delSpan){
					delSpan.style[i] = _this.settings.style.delSpan[i];
				}
				delSpan.addEventListener("click", function(){
					_this.delClick(this);
				});
				orderCell.appendChild(delSpan);
			}
			//--end 序号添加
			var childInsert = true;
			if((orderValue+"").split(".").length>4||data["motherPart"]===false){
			   childInsert = false;
			}
			var productId = data["productId"]?data["productId"]:"";
			for(var ii in titleIndexs) {
				var cell = newRow.insertCell(titleIndexs[ii]);
				var fieldItem = fieldsInfo[ii];
				var cellValue = "";
				if(fieldItem.name==this.settings.themeField){
				   cellValue =  data["productId"]?data["productId"]:"";
				   cellValue +=",";
				   cellValue += data["product"+cap_first(fieldItem.pojoName)]?data["product"+cap_first(fieldItem.pojoName)]:"";
				}else{
				   if(!!fieldItem.showType&&fieldItem.showType==="lookup"){
					  var idField = "";
					  if(fieldItem.pojoName.indexOf("argF2")>-1){
						 idField = fieldItem.pojoName.replace("argF2","argF1");
					  }else{
						 idField = fieldItem.pojoName.substr(0,fieldItem.pojoName.length-4)+"Id";
					  }
					  cellValue = data[idField]?data[idField]:"";
					  cellValue +=",";
					  cellValue += data[fieldItem.pojoName]?data[fieldItem.pojoName]:""; 
				   }else if(fieldItem.pojoName=="lineTaxRate"){
					  cellValue = data["lineTaxRate"]?data["lineTaxRate"]:"";
					  if(cellValue==""){
						 cellValue = data["outputTax"]?data["outputTax"]:"";//带入产品的销项税
					  }
					  if(cellValue==""){//带入表头的税率，税率默认为0
						 cellValue = $("#taxRate").val()?$("#taxRate").val():"0";   
					  }
				   }else if(fieldItem.pojoName=="productType"){//产品类型
					  if(data["motherPart"]===true){//如果产品的是否允许母件选择的“是”，则显示母件
						 cellValue = "母件";//默认赋值母件
					  }else{//新增子节点为子件，调整其父级为母件
						 cellValue = "子件";
					  }
				   }else if(fieldItem.pojoName=="discountRate1"||fieldItem.pojoName=="discountRate2"){//折扣默认为100
					  cellValue = data[fieldItem.pojoName]?data[fieldItem.pojoName]:"100";
				   }else if(fieldItem.pojoName=="property1"||fieldItem.pojoName=="property2"||fieldItem.pojoName=="property3"){
					  var pro_pojoName = "product"+fieldItem.pojoName.replace(/^\S/,function(s){return s.toUpperCase();});
					  cellValue = data[pro_pojoName]?data[pro_pojoName]:"";
				   }else{
					  cellValue = data[fieldItem.pojoName]?data[fieldItem.pojoName]:"";
				   }
				}
				 _this.generateFormField(fieldItem, cell, cellValue,childInsert,productId);
				
			}
			if(_this.settings._opName!="view"){
				var $tr = $(_this.settings.tbody).find("tr").eq(newRowIndex); 
				settleDefaultValues($tr,data);
			}
			_this.formulaCountEvent(newRowIndex);//公式字段处理
		},
		generateFormField: function() {// 表单字段生成
			var _this = this;
			var fieldItem   = arguments[0];
			var fieldCell   = arguments[1];
			var fieldValue  = arguments[2];
			var childInsert = arguments[3]; //是否展示子件新增按钮
			var productId   = arguments[4]; //产品id
			var fieldShowType = fieldItem.showType;
			var appendPosition = fieldItem.appendPosition;
			if(fieldItem.pojoName=="property1"||fieldItem.pojoName=="property2"||fieldItem.pojoName=="property3"){
			   fieldShowType  = "dropDown";
			}
			if(_this.settings._opName!="view"){
				var newField;
				if(!!fieldShowType&&fieldShowType==="text") {//单行
					newField = document.createElement("input");
					newField.type  ="text";
					newField.setAttribute("datatype","*1-"+fieldItem.setLength+",validContractProduct");
					if(!fieldItem.required){
					   newField.setAttribute("ignore","ignore");
					}
				}else if(!!fieldShowType&&fieldShowType==="dropDown") {//选择列表
					newField = document.createElement("select");
					newField.style.width="auto";
					newField.setAttribute("datatype","*,validContractProduct");
					if(!fieldItem.required){
					   newField.setAttribute("ignore","ignore");
					}
					if(fieldItem.pojoName!="property1"&&fieldItem.pojoName!="property2"
					   &&fieldItem.pojoName!="property3"){
						_this.dropDownOptions(newField,fieldItem.proDictId,fieldItem.defaultValue);
					}
				}else if(!!fieldShowType&&fieldShowType==="date") {//日期
					newField = document.createElement("input");
					newField.type="date";
					newField.setAttribute("datatype","date,validContractProduct");
					if(!fieldItem.required){
					   newField.setAttribute("ignore","ignore");
					}					
				}else if(!!fieldShowType&&fieldShowType==="datetime") {//日期时间
					newField = document.createElement("input");
					newField.type="datetime-local";	
					newField.setAttribute("datatype","dateTime,validContractProduct");
					if(!fieldItem.required){
					   newField.setAttribute("ignore","ignore");
					}					
				}else if(!!fieldShowType&&fieldShowType==="number") {//数字
					newField = document.createElement("input");newField.type="number";
					newField.setAttribute("datatype","integer1-"+fieldItem.setLength+",validContractProduct");
					if(!fieldItem.required){
					   newField.setAttribute("ignore","ignore");
					}					
				}else if(!!fieldShowType&&fieldShowType==="currency") {//货币
					newField = document.createElement("input");newField.type="number";
					newField.setAttribute("datatype","currency,validContractProduct"); 
					newField.setAttribute("maxlength",fieldItem.setLength);
					newField.setAttribute("limit","["+fieldItem.validationType+"]");
					if(!fieldItem.required){
					   newField.setAttribute("ignore","ignore");
					}					
				}else if(!!fieldShowType&&fieldShowType==="decimal") {//小数
					newField = document.createElement("input");newField.type="number";
					newField.setAttribute("datatype","decimal,validContractProduct"); 
					newField.setAttribute("limit","["+fieldItem.validationType+"]");
					if(!fieldItem.required){
					   newField.setAttribute("ignore","ignore");
					}					
				}else if(!!fieldShowType&&fieldShowType==="percent") {//百分数
					newField = document.createElement("input");newField.type="number";
					newField.setAttribute("datatype","percent,validContractProduct"); 
					newField.setAttribute("maxlength","16");
					if(!fieldItem.required){
					   newField.setAttribute("ignore","ignore");
					}
				}else if(!!fieldShowType&&fieldShowType==="formula") {//公式
					newField = document.createElement("input");
					newField.setAttribute("readonly","readonly");
				}else if(!!fieldShowType&&fieldShowType==="lookup") {//查找
					newField = document.createElement("input");
					newField.type="text";
					newField.setAttribute("datatype","*,validContractProduct");
					newField.setAttribute("readonly","readonly");
					if(!fieldItem.required){
					   newField.setAttribute("ignore","ignore");
					}					
				}else{//其它未知类型一律转为单行
					newField = document.createElement("input");
					newField.type="text";
					if(fieldItem.setLength){
					   newField.setAttribute("datatype","*1-"+fieldItem.setLength+",validContractProduct");
					}else{
					   newField.setAttribute("datatype","*,validContractProduct");
					}
					if(!fieldItem.required){
					   newField.setAttribute("ignore","ignore");
					}					
				}
				//新增监听change事件
				newField.addEventListener("change", function(){
					var showTypeArr = ["number","currency","decimal","percent"];
					if(showTypeArr.indexOf(fieldShowType)>-1
							||(fieldShowType=="formula"&&appendPosition&&showTypeArr.indexOf(appendPosition)>-1)){
						clearNoNum(this);
					}
					_this.changeValues(this);
					this.oldvalue = this.value;
				});
				newField.addEventListener("focus", function(){
					this.oldvalue = this.value;
				});
				if(fieldItem.name==this.settings.themeField//主题字段name
				   ||(!!fieldShowType&&fieldShowType==="lookup")){//查找
				   
				   var idVal="",nameVal="";
				   if(fieldValue.split(",").length>1){
					  idVal   = fieldValue.split(",")[0];
					  nameVal = fieldValue.split(",")[1];
				   }
				   //新增一id行hidden
				   var idField   = document.createElement("input");
				   idField.type  = "hidden";
				   if(fieldItem.name.indexOf("ARG_F")>-1){
					  idField.name  = fieldItem.name.replace("ARG_F2","ARG_F1");//域表字段，id/name对应关系固定
				   }else{
					  idField.name  = fieldItem.name.substr(0,fieldItem.name.length-4)+"ID";//域表字段，id/name对应关系固定
				   }
				   idField.value = idVal;
				   fieldCell.appendChild(idField);
				   //name域
				   newField.value = nameVal;
				   newField.name  = fieldItem.name;
				   fieldCell.appendChild(newField);				   
				}else{
				   if(!!fieldShowType&&fieldShowType==="dropDown"&&!fieldValue) {
					  //选择列表fieldValue为空时赋值默认值
				   }else{
				      newField.value = fieldValue;
				   }
				   newField.name  = fieldItem.name;
				   fieldCell.appendChild(newField);
				}
				if(!!fieldShowType&&fieldShowType==="lookup") {//查找字段添加查找按钮
					var lookSpan = document.createElement("span");
					lookSpan.innerText = "O";
					lookSpan.className = "lookSpan";
					for(var i in _this.settings.style.lookSpan){
						lookSpan.style[i] = _this.settings.style.lookSpan[i];
					}
					lookSpan.addEventListener("click", function(){
						_this.lookupClick(this);

					});
					fieldCell.appendChild(lookSpan);
				}
				//主题字段添加'+'用于添加子产品
				if(childInsert){
					if(!!fieldItem.name&&fieldItem.name===_this.settings.themeField){
						var insertSpan = document.createElement("span");
						insertSpan.innerText = "+";
						insertSpan.title = "添加子件";
						insertSpan.className = "insertSpan";
						for(var i in _this.settings.style.insertSpan){
							insertSpan.style[i] = _this.settings.style.insertSpan[i];
						}
						insertSpan.addEventListener("click", function(){
							_this.productClick(1, this);
		
						});
						fieldCell.appendChild(insertSpan);
					}
				}
				//产品字段设置为只读效果
				if(!!fieldItem["type"]&&fieldItem["type"]==2) {
					if(fieldItem.pojoName!="property1"&&fieldItem.pojoName!="property2"
					   &&fieldItem.pojoName!="property3"){
					   newField.setAttribute("disabled", "disabled");
					}
				}
				var validSpan = document.createElement("span");
				validSpan.className = "Validform_checktip";
				fieldCell.appendChild(document.createElement("br"));
				fieldCell.appendChild(validSpan);
				return newField;
			}else{//查看只显示值
				if(fieldItem.name==this.settings.themeField||
				   (!!fieldItem.showType&&fieldItem.showType==="lookup")){
					if(fieldValue.split(",").length>1){
					   if(fieldItem.name==_this.settings.themeField){
						  var link = '<a href="./welcome?module=product&opName=view&entityId='+productId+'" class="link" target="_blank">'+fieldValue.split(",")[1]+'</a>';
						  fieldCell.innerHTML = link;
					   }else{
						  fieldCell.innerText = fieldValue.split(",")[1];
					   }
					}
				}else{
				    fieldCell.innerText = fieldValue;
				}				
			}
		},
        formulaCountEvent: function() { //公式字段统计
			var _this = this;
			var tbodytrIndex = arguments[0];
			var $bodytr = $(_this.settings.tbody).find("tr:eq("+tbodytrIndex+")");
			var fieldsJsonString = JSON.stringify(_this.settings.pojoFields);
			_this.settings.formulaFields.forEach(function (item, i) {
				var params = {};
				var formulaFieldJsonString = JSON.stringify(item);
                var entityObject = {};
                for(var i in _this.settings.fieldsInfo) {
                	var tempItem = _this.settings.fieldsInfo[i];
                    entityObject[tempItem.pojoName] = $bodytr.find("[name='"+tempItem.name+"']").val();
				}
                var entityJsonString = JSON.stringify(entityObject);
                params["formulaFieldJsonString"] = formulaFieldJsonString;
                params["fieldsJsonString"] = fieldsJsonString;
                params["entityJsonString"] = entityJsonString;
                $.ajax({
					url: "./efpFormulaFieldDeal",
					type: "post",
					data: params,
					dataType: "json",
					success: function (data) {
						if(data.status === "success") {
                            $bodytr.find("[name='"+item.name+"']").val(data.result);
						}
                    },error: function (e) {
						console.log(e);
                    }
				});
            });
		},
		lookupClick: function() {//查找类型字段点击事件
			var _this = this;
			var dataParams = _this.settings.lookUpAjax.data||{};
			var editLookup = $(arguments[0]).closest("tr").index();
			var requstUrl  = "";
			if(_this.settings.lookUpAjax.url){
			   requstUrl = _this.settings.lookUpAjax.url;
			}
			$(arguments[0]).closest("td").find("input").each(function(){
			    editLookup+=","+this.name;
			    if(this.name.indexOf("NAME")>-1||this.name.indexOf("ARG_F2")>-1){
			       dataParams["pojoName"]  = this.name;
			       var fieldInfo  = _this.settings.fieldsInfo[this.name];
			       if(fieldInfo.moduleRelationId){//说明是自定义的查找字段 url需要处理
			    	  requstUrl = "./"+fieldInfo["nameSpaceB"]+"/lookupList?sourceNameSpace=contractProduct&nameSpace="
			    	             +fieldInfo["nameSpaceB"]+"&actionName=entity&pojoName="+this.name;
			    	  var obj = linkModuleMap.get(fieldInfo.tableNameB);
			    	  dataParams["function.name"] = obj["function.name"];
			    	  dataParams["function.tableName"] = obj["function.tableName"];
			    	  dataParams["function.entityName"] = obj["function.entityName"];
			    	  dataParams["function.id"] = obj["function.id"];
			       }
			    }
			});
			$.ajax({
				url: requstUrl,
				type: _this.settings.lookUpAjax.type||"GET",
				data: dataParams,
				dataType: _this.settings.lookUpAjax.dataType||"html",
				success : function(data) {
					$(document.body).undelegate();
					_this.settings.lookUpAjax.success(data);
					_this.settings.editingLookUp = editLookup;
				}
			});            			
		},
		lookupConfirm: function() {//查找数据确定事件
            var _this = this;
            var id    = arguments[0];
            var value = arguments[1];
            var editLookup   = _this.settings.editingLookUp.split(",");
            var index        = editLookup[0];
            var idFieldName  = editLookup[1];
            var fieldName    = editLookup[2];
            $(_this.settings.dom).find("tbody tr:eq("+index+")").find("input[name='"+idFieldName+"']").val(id);
            $(_this.settings.dom).find("tbody tr:eq("+index+")").find("input[name='"+fieldName+"']").val(value);
            if(",MAIN_UNIT_NAME,SALE_UNIT_NAME,PURCHASE_SALE_NAME,".indexOf(fieldName)>-1){//计量单位的查询还带出换算率/换算量
               if(arguments.length>2){//换算量*换算率=数量
            	  $(_this.settings.dom).find("tbody tr:eq("+index+")").find("input[name='CONVER_RATE']").val(arguments[2]); 
            	  var quantity = $(_this.settings.dom).find("tbody tr:eq("+index+")").find("input[name='QUANTITY']").val();
            	  if(quantity&&arguments[2]){
            		 $(_this.settings.dom).find("tbody tr:eq("+index+")").find("input[name='CONVER_QUANTITY']").val(Number(quantity).div(arguments[2])); 
            	  }
               }
            }
		},
		ifChild:function (){//判断parentOrderValue是否是curOrderValue的上一级
			var curOrderValue    = arguments[0];
			var parentOrderValue = arguments[1];
			if(curOrderValue&&parentOrderValue){
			   if(curOrderValue.startsWith(parentOrderValue+".")){
				  var curLen = curOrderValue.split(".").length;
				  var pLen   = parentOrderValue.split(".").length;
				  return curLen-pLen;
			   }
			}
			return -1;
		},
		childIndexs:function (){
			var _this        = this;
			var childNums    = [];
			var curIndex     = Number(arguments[0]);
			var trLength     = $(_this.settings.dom).find("tbody tr").length;
			var curSerialNum = $(_this.settings.dom).find("tbody tr:eq("+curIndex+")").find(".orderSpan").html();
			for(var i=curIndex+1;i<trLength;i++){
				var tempNum = $(_this.settings.dom).find("tbody tr:eq("+i+")").find(".orderSpan").html();
				if(_this.ifChild(tempNum,curSerialNum)==1){
					childNums.push(i);
				}
			}
			return childNums;
		},
		settleDataParams:function (){
			//debugger;
			var _this = this;
			var dataParams = _this.settings.itemAjax.data||{};
            var fieldName  = arguments[0];
            var fieldValue = arguments[1];
            dataParams[fieldName] = fieldValue;
            _this.settings.itemAjax.data = dataParams;
		},
		calculateSum:function(){//计算需要合计的一些字段
			var _this = this;
			var opName      = _this.settings._opName;
			var titleIndexs = _this.settings.titleIndexs;
			var sumFields   = _this.settings.sumFields;
			var trLength    = $(_this.settings.dom).find("tbody tr").length;
			if(sumFields.length>0&&trLength>0){
			   for(var i=0;i<sumFields.length;i++){
				   var fieldSum = 0;
				   for(var j=0;j<trLength;j++){
					   var title = $(_this.settings.dom).find("tbody tr:eq("+j+")").attr("title");
					   if(title&&title=="disabled"){
						   //有下级的，本行不计入合计
					   }else{
						   var fieldValue = Number(0);
						   if(opName=="view"){
							  fieldValue = $(_this.settings.dom).find("tbody tr:eq("+j+")").find("td:eq("+titleIndexs[sumFields[i]]+")").html();
						   }else{
							  fieldValue = $(_this.settings.dom).find("tbody tr:eq("+j+")").find("input[name='"+sumFields[i]+"']").val();
						   }
						   fieldValue = Number(fieldValue)?Number(fieldValue):0;
						   fieldSum   = Number(fieldSum).add(fieldValue);  
					   }
				   }
				   fieldSum = setDecimalDigits(fieldSum);
				   if(sumFields[i]=="MONEY_TAX"){
					  $("#signAmount").val(fieldSum);
					  $("#singleAmount").val(fieldSum);
					  $("#single_amount").html(fieldSum);
					  calSingleSum();//计算整单金额
				   }
				   $(_this.settings.tfoot).find("tr").find("td[field-name='"+sumFields[i]+"']").html(fieldSum);
			   }
			}
		},
		componentSum:function(){//母件下包含子件时，含税单价/无税单价/无税金额/金额/税额/折扣额根据其下的子件汇总，报价/税率/扣率暂定为空
			//debugger;
			var _this = this;
			var trIndex    = arguments[0];
			var serialNum  = arguments[1];
			var fieldNames = ["PRICE_TAX","PRICE_NO_TAX","MONEY_NO_TAX","LINE_TAX","MONEY_TAX","DISCOUNT_AMOUNT"];
			var parentMap  = new Map();
			var level = 1;
			for(var i=0;i<trIndex;i++){
				var $tr = $(_this.settings.dom).find("tbody tr:eq("+i+")");
				var orderValue = $tr.find(".orderSpan").html();
				if(_this.ifChild(serialNum,orderValue)>0){
				   parentMap.put(level,i+":"+orderValue);
				   level++;
				}
			}
			var mapSize = parentMap.size();
		    //更新父级以上的金额
		    if(mapSize>0){
			   for(var i=mapSize;i>0;i--){
				   var trIndex     = parentMap.get(i).split(":")[0];
				   var childIndexs = _this.childIndexs(trIndex);//获取下一级的数据
				   for(var j=0;j<fieldNames.length;j++){
					   var fieldValue = Number(0);
					   for(var k=0;k<childIndexs.length;k++){//下一级的数据累加
						  var tempValue = $(_this.settings.dom).find("tbody tr:eq("+childIndexs[k]+")")
						                  .find("input[name='"+fieldNames[j]+"']").val();
						  if(!tempValue){
							  tempValue = Number(0);
						  }
						  fieldValue = Number(fieldValue).add(tempValue);
					   }
					   $(_this.settings.dom).find("tbody tr:eq("+trIndex+")")
						 .find("input[name='"+fieldNames[j]+"']").val(fieldValue);
				   }				  
			   }
		    }
		},
		dropDownOptions:function(){//下拉框的值
			var selField   = arguments[0];
			var proDictId  = arguments[1];
			var defaultVal = arguments[2];
			$.ajax({
		        type: "POST",
		        url:"./contract/getDropDownOptions?proDictId="+proDictId,
				dataType:"json",
				async:false,
		        success: function(data){
					if(data&&data.length>0){
						$.each(data, function(i, item) {
							var option = document.createElement("option");
							option.value = item.value;
							option.innerText = item.value;
							if(item.value==defaultVal) option.selected = true;
							selField.appendChild(option);
						});
					}
		        },error:function(e){
		           console.log(e);
		        }
		    });						
		},
		changeValues:function(){//值改变事件，重新计算金额
			//debugger;
			var _this     = this;
			var _td       = arguments[0];
			var trIndex   = $(_td).parents("tr").index();
			//1.值改变，重新计算该行金额数据
			fieldsChange(_td,trIndex);
			//2.子件的变化，同步调整母件中金额
			var serialNum = $(_td).parents("tr").find(".orderSpan").text();
			_this.componentSum(trIndex,serialNum);
			//3.重新计算一下需要合计的字段
			_this.calculateSum();
			//4.重新计算一下公式字段
			_this.formulaCountEvent(trIndex);//公式字段处理
		},
		disabledRow: function(){
			var _this = this;
			var editingIndex = arguments[0];
			var ifEmpty      = arguments[1]; //是否置空
			var fieldsInfo   = _this.settings.fieldsInfo;
			var inputTypes   = _this.settings.inputTypes;
			var indexArr     = [];
			//获取该行的上级及上级的上级...,清空
			var curSerialNum = $(_this.settings.dom).find("tbody tr:eq("+editingIndex+")").find(".orderSpan").html();
			for(var i=0;i<editingIndex;i++){
				var serialNum = $(_this.settings.dom).find("tbody tr:eq("+i+")").find(".orderSpan").html();
				if(_this.ifChild(curSerialNum,serialNum)>0){
				   indexArr.push(i); 
				}
			}
			indexArr.push(editingIndex);
			for(var i=0;i<indexArr.length;i++){
				//标记该行
				$(_this.settings.dom).find("tbody tr:eq("+indexArr[i]+")").attr("title","disabled");
				//debugger;
				for(var j=0;j<inputTypes.length;j++){
					$(_this.settings.dom).find("tbody tr:eq("+indexArr[i]+")").find(inputTypes[j]).each(function (){
						var ifProField = false;//判断是否是产品的字段，产品带出的数据不置空
						$(this).parents("td").find("input").each(function (){
						  if(fieldsInfo[this.name]&&fieldsInfo[this.name].type==2){
							 ifProField = true;	
						  }
						});
						if(ifProField){
							$(this).attr("disabled","disabled"); 
						}else{
							$(this).attr("disabled","disabled");
							if(ifEmpty===true){
								$(this).val("");
							}
						}
						this.setAttribute("ignore","ignore");
						this.removeEventListener("change",_this.changeValues);
					});
				}			
			}
		},
		productClick: function() {//产品选择事件
			var _this = this;
			var dataParams = _this.settings.itemAjax.data||{};
			dataParams["typeFlag"] = arguments[0];
			var $editingTr   = $(arguments[1]).closest("tr");
			var editingIndex = $editingTr.index();
			var upIds        = "";
			//获取该行的上级及上级的上级的产品id...
			if(arguments[0]==1){//添加子件，不能再选它的上级产品
				var curSerialNum = $(_this.settings.dom).find("tbody tr:eq("+editingIndex+")").find(".orderSpan").html();
				for(var i=0;i<editingIndex+1;i++){
					var serialNum = $(_this.settings.dom).find("tbody tr:eq("+i+")").find(".orderSpan").html();
					if(_this.ifChild(curSerialNum,serialNum)>0||i==editingIndex){
						var tempProductId = $(_this.settings.dom).find("tbody tr:eq("+i+")").find("input[name='ID']").val(); 
						upIds+=",'"+tempProductId+"'"; 
					}
				}
			}                             
			dataParams["upIds"] = (upIds==""?"":upIds.substr(1));
			$.ajax({
				url: _this.settings.itemAjax.url||"",
				type: _this.settings.itemAjax.type||"GET",
				data: dataParams,
				dataType: _this.settings.itemAjax.dataType||"html",
				success : function(data) {
					$(document.body).undelegate();
					_this.settings.itemAjax.success(data);
					_this.settings.editingIndex = $editingTr.index();
				}
			});
		},
		productConfirm: function() {//产品字段选择确认
			var _this = this;
			var choseType   = arguments[0];
			var productIds  = arguments[1]; //产品的ids
			var prductItems = [];
			$.ajax({
		        type: "POST",
		        url:"./contract/productListByIds?ids="+productIds,
				dataType:"json",
				async:false,
		        success: function(data){
					if(data&&data.length>0){
					   prductItems = data;
					}
		        },error:function(e){
		           console.log(e);
		        }
		    });			
			//获取当前行序号值
			if(choseType==0) {//母产品选择
				var lastTrIndex = $(_this.settings.dom).find("tbody tr:last").index();
				if(lastTrIndex!=-1){
					var lastOrderValue = $(_this.settings.dom).find("tbody tr:last td:first").text();
					var lastOrderValue_0 = lastOrderValue;
					if(lastOrderValue.indexOf(".")!=-1) lastOrderValue_0 = lastOrderValue.split(".")[0];
				}else{lastOrderValue_0=0;}
				$(prductItems).each(function(i, item) {
					_this.generateTr(lastTrIndex+1+i, parseInt(lastOrderValue_0)+1+i,item);
				});
			}else if(choseType==1) {//子产品选择
				var editingOrderValue = $(_this.settings.dom).find("tbody tr:eq("+_this.settings.editingIndex+") td:first").text();
				var lastChildOrderValue = 1, lastChildIndex = _this.settings.editingIndex, st="", et="";
				$(_this.settings.tbody).find("tr").each(function(i, item){
					var firsttdtext = $(item).find("td:first").text();
					if(firsttdtext.indexOf(editingOrderValue+".")==0){
						st = firsttdtext.substr(0,editingOrderValue.length+2);
						if(et!=st) lastChildOrderValue++;
						lastChildIndex++;
					}
					et = st;
				});
				$(prductItems).each(function(i, item) {
					var newOrderValue = editingOrderValue+"."+(i+lastChildOrderValue);
					_this.generateTr(lastChildIndex+1+i, newOrderValue, item);
				});
                //新增子件的，需要将其除数量字段外，其他字段清空置灰
				_this.disabledRow(_this.settings.editingIndex,true);
			}
			$("#product_div").modal("hide");
		},
		delClick: function() {//行删除操作
			var _this = this;
			var delSpan = arguments[0];
			var $editingTr = $(delSpan).closest("tr");
			var editingOrderValue = $editingTr.find("td:first").text();
			var editingTrIndex = $editingTr.index();
			var tbodytrNum = $(_this.settings.tbody).find("tr").length;
			var deltrs = [];
			deltrs.push($editingTr);
			for(var i=editingTrIndex+1;i<tbodytrNum;i++) {
				var $temptr = $(_this.settings.tbody).find("tr:eq("+i+")");
				var tempOrderValue = $temptr.find("td:first").text();
				if(tempOrderValue.indexOf(editingOrderValue+".")==0) {//母件删除
					deltrs.push($temptr);
				}
			}
			deltrs.forEach(function($item, i) {
				$item.remove();
			});
			//重新计算接下来的序号
			tbodytrNum = $(_this.settings.tbody).find("tr").length;
			var hasChild = false; //待删除产品的上级是否还有其他子件
			var tempSameRankStr = "";
			var editingOrderValues = editingOrderValue.split(".");
			for(var i=editingTrIndex;i<tbodytrNum;i++){
				var $temptr = $(_this.settings.tbody).find("tr:eq("+i+")");
				var tempOrderValue = $temptr.find("td:first").text();
				var tempOrderValues = tempOrderValue.split(".");
				console.log("editingOrderValue::"+editingOrderValue+"  tempOrderValue::"+tempOrderValue+" ||"+editingOrderValues.length+"<->"+tempOrderValues.length);
				if(tempOrderValues.length < editingOrderValues.length){//循环到上一等级节点跳出循环
					break;
				}else if(tempOrderValues.length == editingOrderValues.length) {//同等级节点累加一
					hasChild = true;
					tempSameRankStr = tempOrderValue.substring(0, tempOrderValue.lastIndexOf(".")+1)+(parseInt(tempOrderValues[tempOrderValues.length-1])-1);
					$temptr.find("td:first .orderSpan").text(tempOrderValue.substring(0, tempOrderValue.lastIndexOf(".")+1)+(parseInt(tempOrderValues[tempOrderValues.length-1])-1));
				}else if(tempOrderValues.length > editingOrderValues.length) {//下一等级节点替换
					$temptr.find("td:first .orderSpan").text(tempSameRankStr+tempOrderValue.substring(tempSameRankStr.length));
				}
			}
			//处理待删除节点的上级
			if(!hasChild&&editingOrderValues.length>1){//不是第一级产品
			   var parentOrderValue = "";
			   for(var i=0;i<editingOrderValues.length-1;i++){
				   parentOrderValue += "."+editingOrderValues[i];
			   }
			   parentOrderValue = parentOrderValue.substr(1);
			   for(var i=0;i<editingTrIndex;i++){
                   var tempOrderValue = $(_this.settings.tbody).find("tr:eq("+i+")").find("td:first").text();
                   if(_this.ifChild(tempOrderValue,parentOrderValue)>0){
                	  hasChild = true;
                	  break;
                   }
			   }			   
			   if(!hasChild){//其上级已不存在子件
				  var inputTypes = _this.settings.inputTypes;
				  var fieldsInfo = _this.settings.fieldsInfo;
				  $("#erptablebody").find(".orderSpan").each(function(){
					if($(this).text()==parentOrderValue){
					   $($(this).parents("tr")[0]).attr("title","");
					   for(var i=0;i<inputTypes.length;i++){
						   $(this).parents("tr").find(inputTypes[i]).each(function(){
							   var fieldName = $(this).attr("name");
							   if(fieldsInfo[fieldName]){
								   if(fieldsInfo[fieldName].required){
									   this.setAttribute("ignore","");  
								   }
								   if(fieldsInfo[fieldName]&&fieldsInfo[fieldName].type!=2){
									   this.removeAttribute("disabled");  
								   }
								   this.addEventListener("change", function(){
									   _this.changeValues(this);
								   });
							   }
						   });
					   }
					}
				  });
			   }
			}
		}
	};
	$.fn[pluginName] = function(options) {
		var pluginObject;
		this.each(function() {
			var el = $(this);
			if (el.data(pluginName)) {
				el.data(pluginName).remove();
			}
			pluginObject = new Plugin(this, options);
			el.data(pluginName, pluginObject);
		});
		return pluginObject;
	};

})(jQuery, window, document);