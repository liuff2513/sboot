/**
 * @version 0.0.1
 * @namespace Namespace
 * @author:ziyuzhang
 * @description 创建一个命名空间,命名空间的父子关系使用半角点号"."隔开
 * @param {}
 *            namespacePath String 例："a.b.c"
 * @example <br/><br/> Namespace.create("a.b.c"); a.b.c.num = 12; a.b.c.str =
 *          "12"; a.b.c.Fun = function(){ alert("dd"); } a.b.c.Obj =
 *          {a:"",c:""}; .....
 * @return {void}
 */
var Namespace = {};
Namespace.create = function(namespacePath) {
	// 以window为根
	var rootObject = window;
	// 对命名空间路径拆分成数组
	var namespaceParts = namespacePath.split('.');
	for ( var i = 0; i < namespaceParts.length; i++) {
		var currentPart = namespaceParts[i];
		// 如果当前命名空间下不存在，则新建一个Object对象，等效于一个关联数组。
		if (!rootObject[currentPart]) {
			rootObject[currentPart] = {};
		}
		rootObject = rootObject[currentPart];
	}
};

Namespace.create("util");
/**
 * 判断电话号码的方法
 * "^0?(13[0-9]|15[012356789]|18[0123456789]|17[67]|14[57])[0-9]{8}$";
 */


util.phone = {
	isMoblie : function(num) {// 判断手机号
		var reg = /^0?(13[0-9]|15[012356789]|18[02356789]|17[67]|14[57])[0-9]{8}$/;
		if (reg.test(num)) {
			return true;
		} else {
			return false;
		}
	},
	isTel : function(num) {// 判断座机号码
		// var reg =
		// /^(?<国家代码>(\+86)|(\(\+86\)))?\D?(?<电话号码>(?<三位区号>((010|021|022|023|024|025|026|027|028|029|852)|(\(010\)|\(021\)|\(022\)|
		// \(023\)|\(024\)|\(025\)|\(026\)|\(027\)|\(028\)|\(029\)|\(852\)))\D?
		// \d{8}|(?<四位区号>(0[3-9][1-9]{2})|(\(0[3-9][1-9]{2}\)))\D?\d{7,8}))(?<分机号>\D?\d{1,4})?$/;
		//var reg = /(\d{3}-|\d{4}-)(\d{8}|\d{7})$/;
		var reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
		if (reg.test(num)) {
			return true;
		} else {
			return false;
		}
	},
	isFax : function(num){// 判断传真
		var reg=/(\d{3,4})?(\-)?\d{7,8}$/;
		if(reg.test(num)){
			return true;
		}else{
			return false;
		}
	}
	
};

//邮编验证
util.postcode = function(num){
	var reg = /^[0-9][0-9]{5}$/;
	if(reg.test(num)){
		return true;
	}else{
		return false;
	}
}


//既能输入手机号也能输入电话号
util.phoneOrtel = function(num){
	var reg = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
	var regtel = /(\d{3}-|\d{4}-)(\d{8}|\d{7})$/;
	if (reg.test(num) || regtel.test(num)) {
		return true;
	} else {
		return false;
	}
}

//验证URL
util.IsValidUrl = function(str){
	varregu="^(https?://)"
	+"?(([0-9a-z_!~*'().&=+$%-]+:)?[0-9a-z_!~*'().&=+$%-]+@)?"
	+"(([0-9]{1,3}\.){3}[0-9]{1,3}"
	+"|"
	+"([0-9a-z_!~*'()-]+\.)*"
	+"([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\."
	+"[a-z]{2,6})"
	+"(:[0-9]{1,4})?"
	+"((/?)|"
	+"(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
	varre=newRegExp(regu);
	if(!re.test(str)){
	    return false;
	}
	return true;
};




/**
 * @version 0.0.1
 * @description 获得包含中文字符的字符串的长度
 * @param {String}
 *            str 被检查的字符串
 * @return {Number} 字符串的长度
 */
util.ChinLength = function(str) {
	if (str == null || typeof str == "undefined" || str == "") {
		return 0;
	}
	return str.replace(/[^\x00-\xff]/ig, "**").length;
};
/**
 * 判断参数是否为空
 */
util.isBlank = function(s) {

	s=s.replace(/(^\s*)|(\s*$)/g, "");
	return ((s == undefined || s == null || s == "" || s== "" || s==[] || s=='[]') ? true : false);
};

/**
 * SQL注入
 */
util.chesql_inj = function(str){
	var inj_sql = ["'","and","exec","insert","select","delete","update","count","*","%","chr","mid","master","truncate","char","declare",";","or","-","+",","];
	for(var s in inj_sql){
		if(inj_sql[s]==str){
			return false;
		}
	}
	return true;
}



/**
 * 验证是否包含中文
 */
util.isZhongwen = function(s){
	var regt=/^([\u4e00-\u9fa5])+$/;
	
	if (regt.test(s)) {
		return true;
	} else {
		return false;
	}
	
};

/**
 * 验证是否由数字和字母组成
 */
util.isNumandEz = function(s){
	var regt = /^([A-Za-z0-9])+$/;
	if (regt.test(s)) {
		return true;
	} else {
		return false;
	}
	
};

/**
 * 验证是否由大写字母和数字组成
 */
util.isDXENAndNum = function(str) {
	var reg = /^([A-Z0-9])+$/;
	if (reg.test(str)) {
		return true;
	} else {
		return false;
	}
};

/**
 * 验证是否由大写字母组成
 */
util.isDXEz = function(s){
	var regt = /^([A-Z])+$/;
	if (regt.test(s)) {
		return true;
	} else {
		return false;
	}
	
};

/**
 * 验证是否由大写字母和，组成
 */
util.isDXEzAndDH = function(s){
	var regt = /^([A-Z]|,)+$/;
	if (regt.test(s)) {
		return true;
	} else {
		return false;
	}
	
};

/**
 * 验证密码是否由大小写字母 数字 符号中的至少三位组成
 */
util.isPassright = function(s){
	//var regt = /(([-\da-zA-Z`=\\\[\];',./~!@#$%^&*()_+|{};"<>?]*((\d+[a-zA-Z]+[-`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]+)|(\d+[-`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]+[a-zA-Z]+)|([a-zA-Z]+\d+[-`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]+)|([a-zA-Z]+[-`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]+\d+)|([-`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]+\d+[a-zA-Z]+)|([-`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]+[a-zA-Z]+\d+))[-\da-zA-Z`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]*)|([-\da-zA-Z]*((\d+[a-z]+[A-Z]+)|(\d+[a-z]+[a-zA-Z]+)|([A-Z]+\d+[a-z]+)|([A-Z]+[a-z]+\d+)|([a-z]+\d+[A-Z]+)|([a-z]+[A-Z]+\d+))[-\da-zA-Z]*)|([-a-zA-Z`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]*(([a-z]+[A-Z]+[-`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]+)|([a-z]+[-`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]+[A-Z]+)|([A-Z]+[a-z]+[-`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]+)|([A-Z]+[-`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]+[a-z]+)|([-`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]+[a-z]+[A-Z]+)|([-`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]+[A-Z]+[a-z]+))[-a-zA-Z`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]*))/;

	var regt = /^([a-z][A-Z][0-9]|[a-z][A-Z][<>?!%&]|[a-z][0-9][<>?!%&]|[A-Z][0-9][<>?!%&])+$/;	
}



/**
 * 验证是否由大写字母和，组成
 */
util.isDXEzAndDH01 = function(s){
	var regt = /^([A-Z0-9]|,|-)+$/;
	if (regt.test(s)) {
		return true;
	} else {
		return false;
	}
	
};


/**
 * 验证多个复选框是否都未选中 用于复选框必选项 
 * $str is $("input[name=xxx]");
 */
util.isNotCheck = function($str){
	var counts = 0;
	for ( var i = 0; i < $str.length; i++) {
		if ($str[i].checked == true) {
			counts++;
		}
	}
	if(counts==0){
		return false;	
	}else{
		return true;	
	}
};



/**
 * 判断复选框是否已有选中
 */
util.isCheck = function($che) {
	var falg=0;
    if($("input:checked", $che).length <= 0){
    	falg+=1;
    }
	return falg>0 ? true : false;
};

//检查开始与结束日期
util.checkDateCompare=function (A, B) {
    var value1 = $.trim(A);
    var value2 = $.trim(B);
    return value1 > value2 ? true:false;
};

// 字符数
util.getLenth = function(str) {
	// /<summary>获得字符串实际长度，中文2，英文1</summary>
	// /<param name="str">要获得长度的字符串</param>
	var realLength = 0, len = str.length, charCode = -1;
	for ( var i = 0; i < len; i++) {
		charCode = str.charCodeAt(i);
		if (charCode >= 0 && charCode <= 128)
			realLength += 1;
		else
			realLength += 2;
	}
	return realLength;
};
// 是否是时间格式
util.isDate = function(date) {
	// alert(date);
	var a = /^((((19|20)\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/;
	// alert(a.test(date));
	if (a.test(date)) {
		return true;
	} else {
		return false;
	}
};

// email格式是否正确
util.isEmail = function(email) {
	// alert(date);
	var a = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	// alert(a.test(date));
	if (a.test(email)) {
		return true;
	} else {
		return false;
	}
};
/**
 * QQ验证
 */
util.qqvari = function(qq){
	var tel = /^[1-9]\d{4,9}$/;
	if (tel.test(qq)) {
		return true;
	} else {
		return false;
	}
}

/**
 * @description 判断字符串是否由英文字母和数字组成
 * @param {String}
 *            str:待判断字符串
 * @return {Boolean} <br/> true:符合要求 <br/> false:不符合要求
 */
util.isENAndNum = function(str) {
	var reg = /^[A-Za-z0-9]/g;
	if (reg.test(str)) {
		return true;
	} else {
		return false;
	}
};

/**
 * 验证字符是否按照 GDE,DSW,DEW 的规律
 */
util.isDDJC = function(ddjc){
	var count = 0;
	for(var i=0;i<ddjc.length;i++){
		
		if(","==ddjc[i]){
			count++;
		}
	}
	
	if(count>0){
		for(var j = 0; j<=count; j++){
			if(this.ChinLength(ddjc.split(",")[j])<3 || this.ChinLength(ddjc.split(",")[j])>3 || this.isDXEz(ddjc.split(",")[j])==false){
				return false;	
			}
		}
	}
	return true;
};

/**
 * 验证字符是否按照 BJS001,BJS002 的规律
 */
util.isOffice = function(ddjc){
	var count = 0;
	for(var i=0;i<ddjc.length;i++){
		
		if(","==ddjc[i]){
			count++;
		}
	}
	
	if(count>0){
		for(var j = 0; j<=count; j++){
			if(this.isNumandEz(ddjc.split(",")[j])==false){
				return false;	
			}
		}
	}
	return true;
};

/**
 * 拿到字符的个数
 */
util.isNumAtZifu = function(str,zf){
	var count = 0;
	for(var i=0;i<str.length;i++){
		
		if(zf==str[i]){
			count++;
		}
	}
	return count;
	
};


/**
 * 价格 可为-
 */
util.isDoubleORint = function(str){
   
    var tep = /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
    if(tep.test(str)){
    	return true;
    }else{
    	return false;
    }
};
/**
 * 价格 不能为-
 */
util.isDoubleOrintZ = function(str){
	var patrn=/^(([0-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
	if(patrn.test(str)){
	    return true;
	}else{
	    return false;
	}
};
/**
 * 不能为小数的价格
 */
util.isInt = function(str){
	 var tep = /^(-)?(([1-9]{1}\d*)|([0]{1}))$/;
	 if(tep.test(str)){
		 return true;
	 }else{
		 return false;
	 }
	 
};




/**
 * @description 判断字符串是否数字组成
 * @param {String}
 *            str:待判断字符串
 * @return {Boolean} <br/> true:符合要求 <br/> false:不符合要求
 */
util.isNum = function(str) {
	if (!str)
		return false;
	var strP = /^\d+(\.\d+)?$/;
	if (!strP.test(str))
		return false;
	try {
		if (parseFloat(str) != str)
			return false;
	} catch (ex) {
		return false;
	}
	return true;
};


/**身份证号码验证方法*/
util.validateIdCard = function(idCard) {
	//15位和18位身份证号码的正则表达式
	var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

	//如果通过该验证，说明身份证格式正确，但准确性还需计算
	if (regIdCard.test(idCard)) {
		if (idCard.length == 18) {
			var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
			var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
			var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
			for (var i = 0; i < 17; i++) {
				idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
			}

			var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
			var idCardLast = idCard.substring(17); //得到最后一位身份证号码
			//如果等于2，则说明校验码是10，身份证号码最后一位应该是X
			if (idCardMod == 2) {
				if (idCardLast == "X" || idCardLast == "x") {
					return true;
				} else {
					return false;
				}
			} else {
				//用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
				if (idCardLast == idCardY[idCardMod]) {
					return true;
				} else {
					return false;
				}
			}
		}
	} else {
		return false;
	}
}






/**
 * @description 多项删除
 * @param checkboxname
 *            str:复选框控件的 name
 * @param action
 *            str:提交伤处的 action
 * @return
 */
util.deleteall = function(checkboxname, action) {

	var opts = document.getElementsByName(checkboxname);
	var counts = 0;
	var uuids = "";
	// 将id拼装成 '789','2345','123'
	for ( var i = 0; i < opts.length; i++) {
		if (opts[i].checked == true) {
			uuids = uuids + " '" + opts[i].value + "',";
			counts++;
		}
	}
	uuids = uuids + " '000' ";
	if (counts == 0) {
		alert("请选择要删除的内容！");
		return false;
	}
	var m = window.confirm("确定？");
	if (m) {
		alert(action);
		var dynamicForm = document.createElement("Form");
		dynamicForm.setAttribute("method", "POST");
		dynamicForm.setAttribute("action", action);
		dynamicForm.innerHTML = "";

		var input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", "uuidstring");
		input.setAttribute("value", uuids);
		dynamicForm.appendChild(input);

		dynamicForm.submit();

	} else {
		return false;
	}

};

util.selectAll = function(checked,morebox) { 	 
	 var nodelist = document.getElementsByName(morebox);
	  for (var i=0;i<nodelist.length; i++) {
		  nodelist.item(i).checked = checked;
	  }
};	 
 util.setSelectAll = function(morebox,onebox) {
	  var nodelist = document.getElementsByName(morebox);
	  var flag = true;
	  for (var i=0;i<nodelist.length; i++) {		 
	      if(!nodelist.item(i).checked) {
	          flag = false;
	          break;
	       }
	  }
	  document.getElementById(onebox).checked = flag;
 };


 
 
 
 
function textCounter(field, countfield, maxlimit) {    
	 // 函数，3个参数，表单名字，表单域元素名，限制字符；    
	 if (field.value.length > maxlimit)    
	 //如果元素区字符数大于最大字符数，按照最大字符数截断；    
	 fieldfield.value = field.value.substring(0, maxlimit);    
	 else    
	 //在记数区文本框内显示剩余的字符数；    
	 countfield.value = maxlimit - field.value.length;    
}




 
 
 
 
 
 
    
 /*<form name=myform action=""> 
   <textarea name="message" cols="28" rows="5" 
 onKeyDown="textCounter(this.form.message,this.form.remLen,125);"
  onKeyUp="textCounter(this.form.message,
 this.form.remLen,100);"></textarea> 
   您还可以输入:<input name="remLen" type="text" 
 value="100" size="5" readonly="readonly">个字符  
 </form> */

/**
 * id input的id tipid 需要提示的id tipstr1 提示的文字(XXX不能为空) tipstr2 提示的文字(XXX格式不正确) type
 * 类型 1 是否为空 2 判断手机 3 判断座机 4 判断字符串长度(6位) 5 时间格式 6 英文数字组成 7 是否是数字 8 验证邮箱 9判断字符串长度(3位/4位) 0 判断字符串长度(7位)
 */
function checkblank(id, tipid, tipstr1, tipstr2, type) {
	var textid = document.getElementById(id).value;

	var tpid = document.getElementById(tipid);
	var types = type.split('');
	for ( var i = 0; i < types.length; i++) {
		if (types[i] == "1") {
			if (util.isBlank(textid)) {
				tpid.innerHTML = tipstr1;
				return false;
			}
		} else if (types[i] == "2") {
			if (!util.phone.isMoblie(textid)) {
				tpid.innerHTML = tipstr2;
				return false;
			}
		} else if (types[i] == "3") {
			if (!util.phone.isTel(textid)) {
				tpid.innerHTML = tipstr2;
				return false;
			}
		} else if (types[i] == "4") {
			if(util.getLenth(textid)!=6){
				tpid.innerHTML = tipstr2;
				return false;
			}
		} else if (types[i] == "5") {
			if (!util.isDate(textid)) {
				tpid.innerHTML = tipstr2;
				return false;
			}
		} else if (types[i] == "6") {
			if (!util.isENAndNum(textid)) {
				tpid.innerHTML = tipstr2;
				return false;
			}
		} else if (types[i] == "7") {
			if (!util.isNum(textid)) {
				tpid.innerHTML = tipstr2;
				return false;
			}
		} else if (types[i] == "8") {
			if (!util.isEmail(textid)) {
				tpid.innerHTML = tipstr2;
				return false;
			}
		} else if (types[i] == "9") {
			if(util.getLenth(textid)!=4&&util.getLenth(textid)!=3){
				tpid.innerHTML = tipstr2;
				return false;
			}
		} else if (types[i] == "0") {
			if(util.getLenth(textid)!=7){
				tpid.innerHTML = tipstr2;
				return false;
			}
		}else if(type[i]=="c"){
			if(util.ChinLength (textid)<1){
				tpid.innerHTML = tipstr2;
				return false;
			}
		}
		

	}
	tpid.innerHTML = "";

}
