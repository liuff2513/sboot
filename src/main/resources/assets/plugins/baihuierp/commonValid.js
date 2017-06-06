/*
 * 一些模块字段特殊校验的方法
 */

/**
 * 产品模块一些字段特殊校验的入口
 * @param field
 */
function validProduct(field){
	if(field.attr("id")=="productTypeMultiSel"){
	   return validProductType(field);
	}
}

/**
 * 产品模块-校验产品类型的选择
 * @param field
 */
function validProductType(field){
	var value = $("#productType").val();
	/**
	 * 值为“无”时，即使是保存的产品，也无法被任何模块参照。若有其他属性值被选择，则无法选择“无”。
		值为“内销”时，可以被销售管理相关模块参照，|销售报价|、|销售订单|、|销售出库|、|销售退货|、|销售价目表|、|标准BOM|。
		值为“采购”时，可以被采购管理相关模块参照，|采购订单|、|采购入库|、|采购退货|、|采购价目表|、|标准BOM|。
		值为“库存选配”时，【库存选配】功能可用，实现产品多版本的选配功能，子件不能选择选项件，在选配后直接带出BOM的所有物料。
		值为“模型”时，不能单独选择，使用前提有且仅具有“库存选配”属性，模型可以实现在BOM子件中添加选项件。
		值为“选项”时，其他库存属性无法选择，且仅能在|标准BOM|中参照。
		值为“服务”时，不能选择“库存选配”、“模型”、“选项”。服务类型产品不能进行入出库业务，在订单模块进行参照，并传递数据至应收应付。
	 */
    if(value.indexOf("模型")>-1&&value!="模型,库存选配"&&value!="库存选配,模型"){
       return "选择“模型”，必须且只能选择“库存选配”属性";
    }else if(value.indexOf("选项")>-1&&value!="选项"){
       return "“选项”属性只能单独选择";
    }else if(value.indexOf("服务")>-1){
       if(value.indexOf("库存选配")>-1||value.indexOf("模型")>-1||value.indexOf("选项")>-1){
    	  return "选择“服务”属性的不能选择“库存选配”、“模型”、“选项”"; 
       }
    }
	//没有错误
	$(field).parents("td").find(".Validform_checktip").html("");
	return true;
}


/**
 * ‘产品名称’+‘规格型号’需要判断唯一性，当重复时，提示“已存在相同名称和规格型号的产品，是否继续保存？”；是，则保存产品信息，否，则返回编辑界面
 */
function validUnique(){
	var flag   = false;
	var dataId = "";
	if($("#entityId").val()!=""&&$("#opName").val()!="create"){
	   dataId = $("#entityId").val();
	}
	$.ajax({
    	type: "post",
    	url: "./product/validUnique",
    	data: {"dataId":dataId,"name":$("#name").val(),"model":$("#model").val()},
    	async:false,
    	success: function(data){
        	if(data!=""){
        	   flag = true;
        	}
    	}
	});	
	return flag;
}

/**
 * 校验产品分类下是否已存在分类 
 */
function validExistCategory(upperId){
    var flag = "0";
	$.ajax({
		type:"post",
		url: "./productCategory/existsCategory",
		data: {"categoryId":upperId},
		async:false,
		dataType: "json",
		success: function(data) {
		    flag = data;
			Overlayer.remove();
		},error: function(e){
			Overlayer.remove();
			console.log(e);
		}
	});
	return flag;	
}
function validCustomerNameUnique(tableName){
	var flag   = false;
	var dataId = "";
	if($("#entityId").val()!=""&&$("#opName").val()!="create"){
		dataId = $("#entityId").val();
	}
	$.ajax({
		type: "post",
		url: "../customer/customerNameSame",
		data: {"fieldName": "NAME","param":$("#name").val(),"tableName":tableName, "entityId": dataId},
		async:false,
		success: function(data){
			if(data && data== "yes"){
				flag = true;
			}
		}
	});
	return flag;
}
