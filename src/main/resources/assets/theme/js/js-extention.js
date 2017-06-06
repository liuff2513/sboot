

/**
 * 获得数字数组中最大的项
 * @method Max
 * @for Array
 * @param 
 * @return {Number} 
 */
Array.prototype.Max = function () {
    var oValue = 0;
    for (var i = 0; i < this.length; i++) {
        if (this[i] > oValue) {
            oValue = this[i];
        }
    }
    return oValue;
};

/**
 * 获得数字数组中最小的项
 * @method Max
 * @for Array
 * @param 
 * @return {Number} 
 */
Array.prototype.Min = function () {
    var oValue = 0;
    for (var i = 0; i < this.length; i++) {
        if (this[i] < oValue) {
            oValue = this[i];
        }
    }
    return oValue;
};

/**
 * 对数字数组升序排序
 * @method UpSort
 * @for Array
 * @param 
 * @return {Array} 
 */
Array.prototype.UpSort = function () {
    var oValue;
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {
            if (this[i] < this[j]) {
                oValue = this[i];
                this[i] = this[j];
                this[j] = oValue;
            }
        }
    }
    return this;
};

Array.prototype.SortProp = function (propname) {
    var oValue;
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {
            if (this[i][propname] < this[j][propname]) {
                oValue = this[i];
                this[i] = this[j];
                this[j] = oValue;
            }
        }
    }
    return this;
};

/**
 * 对数字去重复
 * @method Distinct
 * @for Array
 * @param 
 * @return {Array} 
 */
Array.prototype.Distinct = function() {
    var res = [], hash = {};
    for(var i=0, elem; (elem = this[i]) != null; i++)  {
        if (!hash[elem])
        {
            res.push(elem);
            hash[elem] = true;
        }
    }
    return res;
};

/**
 * 数字补全
 * @method LenWithZero
 * @for Number
 * @param 
 * @return {String} 
 */
Number.prototype.LenWithZero = function (oCount) {
    var strText = this.toString();
    while (strText.length < oCount) {
        strText = '0' + strText;
    }
    return strText;
};

/**
 * 获得URl参数值
 * @method UrlParam
 * @for window
 * @param {String}
 * @return {String} 
 */
Window.prototype.UrlParam=function(name)
{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
};

/**
 * 格式化日期
 * @method Format
 * @for Date
 * @param {String} y/m/d/h/m/s的多种组合
 * @return {String} 
 */
Date.prototype.Format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(),    //day 
        "h+": this.getHours(),   //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter 
        "S": this.getMilliseconds() //millisecond 
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
      RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

/**
 * 添加日期
 * @method DateAdd
 * @for Date
 * @param type {String} y/M/d/h/m/s/w
 * @param number {int}
 * @return {Date} 
 */
Date.prototype.DateAdd = function (type, number) {
    var date = this;
    switch (type) {
        case "y":
            date.setFullYear(date.getFullYear() + number);
            return date;
            break;
        case "M":
            date.setMonth(date.getMonth() + number);
            return date;
            break;
        case "w":
            date.setDate(date.getDate() + number * 7);
            return date;
            break;
        case "d":
            date.setDate(date.getDate() + number);
            return date;
            break;
        case "h":
            date.setHours(date.getHours() + number);
            return date;
            break;
        case "m":
            date.setMinutes(date.getMinutes() + number);
            return date;
            break;
        case "s":
            date.setSeconds(date.getSeconds() + number);
            return date;
            break;
        default:
            date.setDate(d.getDate() + number);
            return date;
            break;
    }
};

/*
 * @param(Date) newdate 要比较的日期
 * @param(String) type  要比较的类型 s=秒，m=分，h=时，d=天
 * */
Date.prototype.DateDiff=function(newdate,type){
	var diff=1;
	switch(type){
	case 's':
		diff=1000;
		break
	case 'm':
		diff=1000*6;
		break;
	case 'h':
		diff=1000*3600;
		break;
	case 'd':
		diff=1000*3600*24;
		break;
		default:
			break;
	}
	return parseInt(Math.abs(this.getTime()-newdate.getTime())/diff);
};

/**
 * 获得日器的星期形式
 * @method GetWeek
 * @for Date
 * @param {String} y/m/d/h/m/s的多种组合
 * @return {String} 
 */
Date.prototype.GetWeek = function (type) {
    var myweekday = this.getDay(),name='星期';
    
    if(type)
    	{
    	   name='周';
    	}
  
	    if (myweekday == 0)
	        return name+"日";
	    else if (myweekday == 1)
	        return name+"一";
	    else if (myweekday == 2)
	        return name+"二";
	    else if (myweekday == 3)
	        return name+"三";
	    else if (myweekday == 4)
	        return name+"四";
	    else if (myweekday == 5)
	        return name+"五";
	    else if (myweekday == 6)
	        return name+"六";
    	
};


/**
 * 字符过滤
 * @method Filter
 * @for String
 * @param 
 * @return {String} 
 */
String.prototype.Filter = function () {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>》《\|/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]\\%\"");

    var rs = "";
    for (var i = 0; i < this.length; i++) {
        var temp=this.substr(i, 1).replace(pattern, '');
        rs = rs + temp;
    }
    return rs;
};


/**
 * 字符去除两边的空格
 * @method Trim
 * @for String
 * @param 
 * @return {String} 
 */
String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};
/**
 * 去除字符前置的0
 * @method TrimLeftZero
 * @for String
 * @param 
 * @return {boolean} 
 */
String.prototype.TrimLeftZero = function () {
    return this.replace(/\b(0+)/gi, "");
};

/*模板字符串替换
 * @param(obj) 数据对象
 * 模板规则： 
 * {aa}=obj.aa 
 * {aa.bb}=obj.aa.bb 
 * {$aa(bb)}=aa(obj.bb) 注：aa为自定义方法
 * {$aa(bb.cc)}=aa(obj.bb.cc)
 * {$}=obj 注：单独的$为obj
 */ 
 String.prototype.Template = function (obj) {
 	 return this.replace(/\{{1}[a-zA-z\$\.\(\)]+\}{1}/gi, function (matchs) {
          var propname = matchs.replace(/\{|\}/g, "");
          var method;
          if (propname.indexOf('$')==0)
          {
              propname = propname.substring(1);
              method = propname.substring(0, propname.indexOf('('));
              propname = propname.substring(propname.indexOf('(')+1 , propname.length-1);
          }
          var names = propname.split('.');
          var returns = "";
          //以下通过模板内标记的属性从obj获得值，所以属性名一定大小写相同
          if (names.length == 1) {
         	 if(names=="$")
         		 {
         		 	returns=obj;
         		 }
         	 else if (obj.hasOwnProperty(names[0])) {
                  returns = obj[names[0]];
              }
          }
          if (names.length == 2) {
              if (obj.hasOwnProperty(names[0])) {
                  if (obj[names[0]].hasOwnProperty(names[1]))
                      returns = obj[names[0]][names[1]];
              }
          }
          if (method)
          {
              returns=window[method](returns);
          }
          return (returns + "") == "undefined" ? "" : returns;
      });
 };


(function ($) {
    /**
     * 将表单中的输入控件的值转换成键值对对象的格式，以下是转换规则：
     * 1. 文本框(type=text, type=password)、文本区域、不包含multiple属性的下拉选择框、name相同的一组单选框转换为字符串
     *    注意：一组单选框如果都没有点选，则为null
     * 2. 数值类型的文本框(type=number)转换为数字(HTML5 Only)
     * 3. 不包含value属性的复选框转换为布尔值
     *    注意：不应该出现多个name相同而又不包含value属性的复选框，否则结果不可预料
     * 4. name相同且都包含value属性的复选框、包含multiple属性的多重选择框(按ctrl键多选)的所选项转换为字符串数组
     *    注意：当前只能转成字符串数组
     * @return {*}
     */
    $.fn.getValue = function () {
        var ret = {};

        // 文本类型
        this.find('input[type=text], input[type=password], textarea, select:not([multiple])').each(function () {
            var name = $(this).prop('name');
            ret[name] = $(this).val();
        });

        this.find('input[type=radio]').each(function () {
            var name = $(this).prop('name');
            if (!ret[name]) {
                ret[name] = null;
            }
            if ($(this).prop('checked')) {
                ret[name] = $(this).prop('value');
            }
        });

        // 数值类型
        this.find('input[type=number]').each(function () {
            var name = $(this).prop('name');
            ret[name] = Number($(this).val());
        });

        // 布尔类型
        this.find('input[type=checkbox]:not([value])').each(function () {
            var name = $(this).prop('name');
            ret[name] = $(this).prop('checked');
        });


        // 数组
        this.find('select[multiple]').each(function () {
            var name = $(this).prop('name');
            ret[name] = $(this).val() || [];
        });

        this.find('input[type=checkbox][value]').each(function () {
            var name = $(this).prop('name');
            if (!ret[name]) {
                ret[name] = [];
            }
            if ($(this).prop('checked')) {
                ret[name].push($(this).prop('value'))
            }
        });

        return ret;
    };

    /**
     * getValue的逆操作，设置符合类型的控件的值
     * @param val
     */
    $.fn.setValue = function (val) {
        // 文本类型
        this.find('input[type=text], input[type=password], textarea, input[type=hidden],select:not([multiple])').each(function () {
            var name = $(this).prop('name');
            if (val[name] ) {
                $(this).val(val[name]);
            }
        });

        this.find('input[type=radio]').each(function () {
            var name = $(this).prop('name');
            if (val[name] && typeof(val[name]) == 'string' && $(this).prop('value') == val[name]) {
                $(this).prop('checked', true);
            }
        });

        // 数值类型
        this.find('input[type=number]').each(function () {
            var name = $(this).prop('name');
            if (val[name] && typeof(val[name]) == 'number') {
                $(this).val(val[name]);
            }
        });

        // 布尔类型
        this.find('input[type=checkbox]:not([value])').each(function () {
            var name = $(this).prop('name');
            if (val[name] && typeof(val[name]) == 'boolean') {
                $(this).prop('checked', val[name]);
            }
        });


        // 数组
        this.find('select[multiple]').each(function () {j
            var name = $(this).prop('name');
            if (val[name] && val[name] instanceof Array) {
                $(this).val(val[name])
            }
        });

        this.find('input[type=checkbox][value]').each(function () {
            var name = $(this).prop('name');
            if (val[name] && val[name] instanceof Array && $(this).prop('value') in val[name]) {
                $(this).prop('checked', true);
            }
        });
    };

}(jQuery));

