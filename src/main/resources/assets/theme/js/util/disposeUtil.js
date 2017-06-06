/**
 * 项目中特殊符号
 * ★☆⊙ - ⊙☆★
 * ⊕⊙ - ⊕⊙
 * ▲
 */

/**
 * @version 0.0.1
 * @namespace Namespace
 * @author:ziyu.zhang
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

Namespace.create("disposeUtil");

/**
 * 格式化金额
 */
disposeUtil.fmoney = function(s,n){
   //更改这里n数也可确定要保留的小数位
   n = n > 0 && n <= 20 ? n : 2;  
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
   var l = s.split(".")[0].split("").reverse();  
   r = s.split(".")[1];  
   t = "";  
   for(i = 0; i < l.length; i++ )  
   {  
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
   }  
   //保留2位小数  如果要改动 把substring 最后一位数改动就可 
   return t.split("").reverse().join("") + "." + r.substring(0,2); 
}




/**
 * 去除所有空格
 */
String.prototype.NoSpace = function() 
{ 
	return this.replace(/\s+/g, ""); 
}

/**
 * 去除所有空格
 */
String.prototype.NoSpaceOneWay = function(g) 
{ 
	
	var result = this.replace(/(^\s+)|(\s+$)/g,"");
	if(g.toLowerCase()=="g"){
		result = result.replace(/\s/g,"");
	}
	return result;
}

/**
 * 获取所有数字
 */
String.prototype.getNumber = function(){
	return parseInt(this.replace(/[^0-9]/ig, ""));
}

/**
 * 去除最后一个指定字符
 */
String.prototype.wipeOutLastChar = function(str,c) { 
	var reg = new RegExp(c+"([^"+c+"]*?)$");
	return str.replace(reg,function(w){if(w.length>1){return w.substring(1);}else{return "";}});
}

/**
 * 为字符 或 以,隔开的字符 加 '' (事例：由 abc,bcd,def 变为: 'abc','bcd','def')
 */
String.prototype.addSingleQuotes = function() { 
	return this.replace(/([^,]+)/g, "'$1'"); 
}

/**
 * 获取最终sql串
 * 
 *⊕⊙t.lonname = ''⊕⊙t.creattime = '2015-20-12'⊕⊙t.id in ('123456qwerewq','sdfrew25874147','1254mkilrtfsd')⊕⊙t.name like '%"小米"%'⊕⊙
 *
 *    +
 *
 *( ( ( 1 和 2 ) 或者 3 ) 和 4 ) 
 *
 *    =
 *
 *( ( ( t.lonname = '' 和 t.creattime = '2015-20-12' ) 或者 t.id in ('123456qwerewq','sdfrew25874147','1254mkilrtfsd') ) 和 t.name like '%"小米"%' ) 
 * 
 */
String.prototype.sqlresults = function(s,n) { 
	var reg = new RegExp(s);
	return this.replace(reg,n); 
}

disposeUtil.sqlRegExp = function(s){
	var str = "";
	for(var i=0;i<s;i++){
		str += "⊕⊙([^⊕]+)";
	}
	str+="⊕⊙";
	return str;
}

/**
 * 在指定字符前 加指定字符$ 事例： ( ( ( 1 和 2 ) 或者 3 ) 和 4 ) 变为 ( ( ( $1 和 $2 ) 或者 $3 ) 和 $4 )
 */
String.prototype.sqlDollarSymbol = function() { 
	return this.replace(/(\d+)/g,"$$$1"); 
}

/**
 * 提取 ⊕⊙ 之间的字符
 */
String.prototype.sqlGetConditions = function() { 
	var reg = new RegExp("?<=⊕⊙)[^⊕]+(?=⊕⊙)");
	
	this.replace(reg, function() {
		alert(arguments.length); //5
		alert(arguments[1]);//test
	}); 
	
	//return this.match(reg); 
}

/**
 * 验证条件格式 如：( ( ( 1 和 2 ) 和 3 ) 和 4 ) 是否符合规则
 */
String.prototype.verrifiConditionFormat = function() { 
	//if(/^([\s\(]|\s|\d+或者\s+|\s+和\s+|\d(?!\s*\()|\)(?!\s*\d))*$/.test(str)){
	if(/^([\s\(]|\s+或者\s+|\s+和\s+|\d(?!\s*\()|\)(?!\s*\d))*$/.test(this)){
	//if(/^([\s\d\(\)]|\s+或者\s+|\s+和\s+)*$/.test(str)){
		return true;
	}else{
		return false;
	}
}

/**
 * 验证括号的 平衡性
 */
String.prototype.verrifiConditionBrackt = function() { 
	var results_ = verrifiConditionStr(this);  
	return !/[()]/.test(results_);  
}  
function verrifiConditionStr(str){  
	if(/[(][^()]*[)]/.test(str)){  
	    str = str.replace(/[(][^()]*[)]/g, '');  
	    return verrifiConditionStr(str);  
	}else{  
	    return str;  
	}  
}  


/**
 * 字符串替换
 */
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
    if(!RegExp.prototype.isPrototypeOf(reallyDo)) {
       return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);
    }else {
       return this.replace(reallyDo, replaceWith);
    }
}
//文本框只能输入数字，并屏蔽输入法和粘贴  (正负 小数或整数)
jQuery.fn.numprice = function() {     
    $(this).css("ime-mode", "disabled");

	this.bind("blur", function() {

        if(!(this.value.length==1 && this.value=="-")) {
            if (!/^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,9})?$/.test(this.value)) {
                this.value = "";
            }
        }

    });
    this.bind("keyup", function() {
        if(!(this.value.length==1 && this.value=="-")) {
            if (!/^(-)?(([1-9]{1}\d*)|([0]{1}))(\.)?$/.test(this.value) && !/^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,9})?$/.test(this.value)) {
                this.value = this.value.substring(0, this.value.length - 1);
            }
        }

    });
    this.bind("keydown", function() {
        if(!(this.value.length==1 && this.value=="-")) {
            if (!/^(-)?(([1-9]{1}\d*)|([0]{1}))(\.)?$/.test(this.value) && !/^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,9})?$/.test(this.value)) {
                this.value = this.value.substring(0, this.value.length - 1);
            }
        }
    });
    this.bind("paste", function() {
        var s = clipboardData.getData('text');
        if(!(s.length==1 && s=="-")) {
            if (!/^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,9})?$/.test(s)) {
                this.value = "";
            }
        }
        return false;
    });  
    
    this.bind("dragenter", function() {     
        return false;     
    });     
};  

disposeUtil.limitprice = function(obj){
	$(obj).numprice();
};
//文本框只能输入数字，并屏蔽输入法和粘贴  (正负 整数)
jQuery.fn.numeral = function() {
	$(this).css("ime-mode", "disabled");     
	
	this.bind("blur", function() {
        if(!(this.value.length==1 && this.value=="-")) {
            if (!/^(-)?(([1-9]{1}\d*)|([0]{1}))$/.test(this.value)) {
                this.value = "";
            }
        }
    });

    this.bind("keyup", function() {
        if(!(this.value.length==1 && this.value=="-")) {
            if (!/^(-)?(([1-9]{1}\d*)|([0]{1}))$/.test(this.value)) {
                this.value = this.value.substring(0, this.value.length - 1);
            }
        }

    });
    this.bind("keydown", function() {
        if(!(this.value.length==1 && this.value=="-")) {
            if (!/^(-)?(([1-9]{1}\d*)|([0]{1}))$/.test(this.value)) {
                this.value = this.value.substring(0, this.value.length - 1);
            }
        }
    });

    this.bind("paste", function() {     
        var s = clipboardData.getData('text');
        if(!(s.length==1 && s=="-")) {
            if (!/^(-)?(([1-9]{1}\d*)|([0]{1}))$/.test(s)) {
                this.value = "";
            }
        }
        //value = s.replace(/^0*/, '');
        return false;
    });  
    
    this.bind("dragenter", function() {     
        return false;     
    });       
	
};
disposeUtil.limitnumeral = function(obj){
	$(obj).numeral();
};

//文本框只能输入数字，并屏蔽输入法和粘贴  (正整数)
jQuery.fn.numeralpnum = function(type) {
    $(this).css("ime-mode", "disabled");
    var reg;
    if(type=='posnum'){
        reg = /^\d+?$/;
    }else if(type=='negnum'){
        reg = /^([0-9]|-)+?$/;
    }

    this.bind("blur", function() {
        if (!reg.test(this.value)) {
            this.value = "";
        }
    });

    this.bind("keyup", function() {
        if (!reg.test(this.value)) {
            this.value = this.value.substring(0,this.value.length-1);
        }

    });
    this.bind("keydown", function() {
        if (!reg.test(this.value)) {
            this.value = this.value.substring(0,this.value.length-1);
        }
    });

    this.bind("paste", function() {
        var s = clipboardData.getData('text');
        if (!reg.test(s));
        value = "";
        return false;
    });

    this.bind("dragenter", function() {
        return false;
    });

};
disposeUtil.limitposnum = function(obj){
    $(obj).numeralpnum('posnum');
};
disposeUtil.limitnegnum = function(obj){
    $(obj).numeralpnum('negnum');
};


//文本框不能输入特殊字符
jQuery.fn.specialstr = function() {

	this.bind("blur", function() {     
        if (/'|\\|%|${YESTERDAY|${LASTMONTH|/.test(this.value)) {     
    		this.value = ""; 
        } 
    });     
    this.bind("paste", function() {     
        var s = clipboardData.getData('text');     
        if (/'|\\|%|${YESTERDAY|${LASTMONTH|/.test(s));     
        //value = s.replace(/'|\\|%|TIME/, '');
        value = "";      
        return false;     
    });  
    
    this.bind("dragenter", function() {     
        return false;     
    });       
	
};
disposeUtil.limitspecialstr = function(obj){
	$(obj).specialstr();
};

//文本框不能输入特殊字符
jQuery.fn.specialstr1 = function() {

    this.bind("blur", function() {
        var inj_sql = ["⊕⊙","%","&","$","'","(",")"];
        for(var s in inj_sql){
            if(this.value.indexOf(inj_sql[s])!=-1){
                this.value = this.value.replaceAll("\\"+inj_sql[s],"");
                return false;
            }
        }
    });

    this.bind("keyup", function() {
        var inj_sql = ["⊕⊙","%","&","$","'","(",")"];
        //var inj_sql = ["⊕⊙","'","%",";","-","+",",","*","|","_","&"];
        for(var s in inj_sql){
            if(this.value.indexOf(inj_sql[s])!=-1){
                this.value = this.value.replaceAll("\\"+inj_sql[s],"");
                return false;
            }
        }

    });
    this.bind("keydown", function() {
        var inj_sql = ["⊕⊙","%","&","$","'","(",")"];
        for(var s in inj_sql){
            if(this.value.indexOf(inj_sql[s])!=-1){
                this.value = this.value.replaceAll("\\"+inj_sql[s],"");
                return false;
            }
        }
    });

    this.bind("paste", function() {
        var inj_sql = ["⊕⊙","%","&","$","'","(",")"];
        var ss = clipboardData.getData('text');
        for(var s in inj_sql){
            if(ss.indexOf(inj_sql[s])!=-1){
                this.value = this.value.replaceAll("\\"+inj_sql[s],"");
                return false;
            }
        }
    });
    this.bind("dragenter", function() {
        return false;
    });
};
disposeUtil.limitspecialstr1 = function(obj){
    $(obj).specialstr1();
};

/**
 * 限制输入长度
 */
jQuery.fn.maxLength = function(max){
    this.each(function(){
        var type = this.tagName.toLowerCase();
        var inputType = this.type? this.type.toLowerCase() : null;
        if(type == "input" && (inputType == "text" || inputType == "password")){
            //Apply the standard maxLength
            this.maxLength = max;
        }
        else if(type == "textarea"){
            this.onkeypress = function(e){
                var ob = e || event;
                var keyCode = ob.keyCode;
                var hasSelection = document.selection? document.selection.createRange().text.length > 0 : this.selectionStart != this.selectionEnd;
                return !(this.value.length >= max && (keyCode > 50 || keyCode == 32 || keyCode == 0 || keyCode == 13) && !ob.ctrlKey && !ob.altKey && !hasSelection);
            };
            this.onkeyup = function(){
                if(this.value.length > max){
                    this.value = this.value.substring(0,max);
                }
            };
        }
    });
    this.bind("blur", function() {     
        if (this.value.length > max) {     
            this.value = this.value.substring(0,max);   
        }    
    });
};
disposeUtil.limitlength = function(obj,num){
	$(obj).maxLength(num);
}

