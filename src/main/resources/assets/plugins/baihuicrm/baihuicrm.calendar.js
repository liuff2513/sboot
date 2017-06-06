/**
 * 日历插件 (为主页日程组件封装的日历插件)
 * 
 * @author feifei.liu
 */

;
(function($, window, document, undefined) {
	var SN_ = new Date();
	var pluginName = "calendar";
	var defaults = {
		now : SN_,
		year : SN_.getFullYear(),
		month : SN_.getMonth() + 1,
		date : SN_.getDate(),//
		datas : {},// 标识数据、和isDraw同时使用
		isDraw : true,// 是否绘图标识
		onClick : function($elem) {
		},// 日 点击事件
		onChange : function($elem) {
		}, // 年、月 切换事件
		language : {
			prepMonth : '<',
			nextMonth : '>',
			prepYear : '<<',
			nextYear : '>>'
		}
	};
	function Plugin(element, options) {
		this.element = $(element);
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}
	Plugin.prototype = {
		init : function() {
			var $this = this.element, $year = this.settings.year;
			obj = this;
			var years = new Array(1916, 1917, 1918, 1919, 1920, 1921, 1922,
					1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932,
					1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942,
					1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952,
					1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962,
					1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972,
					1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982,
					1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992,
					1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002,
					2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
					2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
					2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032,
					2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042,
					2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050, 2051, 2052,
					2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062,
					2063, 2064, 2065, 2066, 2067, 2068, 2069, 2070, 2071, 2072,
					2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082,
					2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090, 2091, 2092,
					2093, 2094, 2095, 2096, 2097, 2098, 2099, 2100, 2101, 2102,
					2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2111, 2112,
					2113, 2114, 2115, 2116);
			var months = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
			var days = this.getMonthDays();
			var startweek = this.getStartWeek();
			var html = '<tr><td><span class="btn btn-link prepYearBtn">'
					+ obj.settings.language.prepYear
					+ '</span></td><td><span class="btn btn-link prepMonthBtn">'
					+ obj.settings.language.prepMonth + '</span></td>';
			html += '<td colspan="3"><select class="yearsel">';
			years.forEach(function(item, i) {
				if (item == obj.settings.year)
					html += '<option value="' + item + '" selected>'
							+ item + '</option>';
				else
					html += '<option value="' + item + '">' + item
							+ '</option>';
			});
			
			html += '</select>&nbsp;&nbsp;年&nbsp;&nbsp;<select class="monthsel">';
			months.forEach(function(item, i) {
				if (item == obj.settings.month)
					html += '<option value="' + item + '" selected>'
							+ item + '</option>';
				else
					html += '<option value="' + item + '">' + item
							+ '</option>';
			});
			html += '</select>&nbsp;&nbsp;月&nbsp;&nbsp;</td>';
			html += '<td><span class="btn btn-link nextMonthBtn">'
					+ obj.settings.language.nextMonth
					+ '</span></td><td><span class="btn btn-link nextYearBtn">'
					+ obj.settings.language.nextYear + '</span></td></tr>';
			html += '<tr><td>星期一</td><td>星期二</td><td>星期三</td><td>星期四</td><td>星期五</td><td>星期六</td><td>星期日</td></tr><tr class="simpletr">';
			var index = 0;
			for (var i = 1; i < startweek; i++) {
				html += '<td></td>';
				index++;
			}
			for (var i = 1; i <= days; i++) {
				if (index % 7 == 0) {
					html += '</tr><tr class="simpletr">';
				}
				if (this._defaults.year == this.settings.year
						&& this._defaults.month == this.settings.month
						&& this._defaults.date == i)
					html += '<td data-value="'
							+ (i < 10 ? '0' + i : i)
							+ '" class="simpletd samedaytd seltd" onselectstart="return false;" style="-moz-user-select:none;"><a>'
							+ (i < 10 ? '0' + i : i) + '</a></td>';
				else
					html += '<td data-value="'
							+ (i < 10 ? '0' + i : i)
							+ '" class="simpletd" onselectstart="return false;" style="-moz-user-select:none;"><a>'
							+ (i < 10 ? '0' + i : i) + '</a></td>';
				index++;
			}
			for (var i = 0; i < 7; i++) {
				if (index % 7 == 0) {
					break;
				}
				html += '<td></td>';
				index++;
			}
			html += '</tr>';
			$this.html(html);
			if (obj.settings.isDraw)
				obj.draw(obj.settings.datas);
			// 上年、上月、下月、下年点击事件
			$(".prepYearBtn").click(function() {// 上年
				var selYear = parseInt($("select.yearsel").val());
				if (selYear > years[0])
					$("select.yearsel").val(selYear - 1).trigger("change");
			});
			$(".prepMonthBtn").click(function() {// 上月
				var selYear = parseInt($("select.yearsel").val());
				var selMonth = parseInt($("select.monthsel").val());
				if (selMonth > 1) {
					$("select.monthsel").val(selMonth - 1).trigger("change");
				} else if (selYear > years[0]) {
					$("select.yearsel").val(selYear - 1);
					$("select.monthsel").val("12").trigger("change");
				}
			});
			$(".nextMonthBtn").click(function() {// 下月
				var selYear = parseInt($("select.yearsel").val());
				var selMonth = parseInt($("select.monthsel").val());
				if (selMonth < 12) {
					$("select.monthsel").val(selMonth + 1).trigger("change");
				} else if (selYear < years[years.length - 1]) {
					$("select.yearsel").val(selYear + 1);
					$("select.monthsel").val("1").trigger("change");
				}
			});
			$(".nextYearBtn").click(function() {// 下年
				var selYear = parseInt($("select.yearsel").val());
				if (selYear < years[years.length - 1])
					$("select.yearsel").val(selYear + 1).trigger("change");
			});
			// 日期点击事件
			$this.find("tr:not(:first) td.simpletd a").click(function() {
				$("td.simpletd").removeClass("seltd");
				$(this).closest("td").addClass("seltd");
				obj.settings.date = parseInt($.trim($(this).closest("td").attr("data-value")));
				obj.settings.onClick(obj);
			});
			// 年、月切换事件
			$this.find("select.yearsel, select.monthsel").change(function() {
				var year = $("select.yearsel").val();
				var month = $("select.monthsel").val();
				obj.settings.year = parseInt(year);
				obj.settings.month = parseInt(month);
				obj.settings.isDraw = false;
				obj.init();
				obj.settings.onChange(obj);
			});
		},
		draw : function() {
			var datas = arguments[0];
			$(".simpletd")
					.each(
							function(index) {
								var dateValue = $(this).attr("data-value");
								if (typeof datas[dateValue] != "undefined") {
									$(this).addClass(datas[dateValue]);
									if(datas[dateValue] === 'schedule-notice' || datas[dateValue] === 'schedule-warn') {
										$('<i class="simpletd-box-active"></i>').insertAfter($(this).find("a"));
									}
								} else if ((obj.settings.year < obj._defaults.year)
										|| (obj.settings.year <= obj._defaults.year && obj.settings.month < obj._defaults.month)
										|| (obj.settings.year == obj._defaults.year
												&& obj.settings.month == obj._defaults.month && parseInt(dateValue) < obj._defaults.date)) {
									$(this).addClass("schedule-none");
								}
							});
		},
		// 默认为 yyyy-MM, 参数为 yyyy-MM-dd 时返回到日的字符串
		toLocaleDate : function() {
			var year = obj.settings.year;
			var month = obj.settings.month;
			var date = obj.settings.date;
			var tempDate = new Date(year, month - 1, date);
			if (arguments[0] && arguments[0] === "yyyy-MM-dd")
				return year + "-" + (month < 10 ? '0' + month : month) + "-"
						+ (date < 10 ? '0' + date : date);
			else
				return year + "-" + (month < 10 ? '0' + month : month);
		},
		// 计算当月的天数
		getMonthDays : function() {
			var year = this.settings.year;
			var month = this.settings.month;
			var isy = false;
			if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
				isy = true;
			switch (month) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				return 31;
			case 4:
			case 6:
			case 9:
			case 11:
				return 30;
			case 2:
				return isy ? 29 : 28;
			}
		},
		// 获取该月一号是周几
		getStartWeek : function() {
			var year = this.settings.year;
			var month = this.settings.month;
			var tempDate = new Date(year, month - 1, 1);
			var tempnum = tempDate.getDate() % 7;
			var week = tempDate.getDay() + 1; //今天周几
			var startweek = week + 7 - tempnum;
			return startweek > 7 ? startweek % 7 : startweek;

		},

		remove : function() {
			this.element.off("." + pluginName);
			this.element.removeData(pluginName);
		}

	}
	$.fn[pluginName] = function(options) {
		this.each(function() {
			var el = $(this);
			if (el.data(pluginName)) {
				el.data(pluginName).remove();
			}
			el.data(pluginName, new Plugin(this, options));
		});
		return this;
	};

})(jQuery, window, document);
