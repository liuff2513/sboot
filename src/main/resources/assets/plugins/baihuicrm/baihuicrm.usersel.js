/**
 * 用户选择插件 (为项目封装的用户选择插件)
 * 
 * @author feifei.liu
 */

;
(function($, window, document, undefined) {
	var pluginName = "usersel";
	var defaults = {
		multiSelect: false, //是否多选，默认单选
		e1: '', //选择后ID接收TAG
		e2: '', //选择后NAME接收TAG
		title: '用户选择',
//		search: function($elem) {
//		}, //搜索事件
//		singleClick: function($elem) {
//		}, //单选确定事件
//		multiClick: function($elem) {
//		}, //多选确定事件
//		toggleCheckAll: function($elem) {
//		}, //全选/反全选事件
		onSearch: function($elem) {
		},//搜索事件
		onRemove: function($elem) {
		}, //删除事件
		language : {
			search : '搜索',
			sure : '确定',
			userName : '名称',
			userState : '激活状态'
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
			var $this = this.element,
			obj = this;
			var userselHTML = '<div class="alter-concear"></div><div class="alter-possessor" id="usersel-div">'+
					'<table style="width:100%;">'+
						'<tr class="alter-head">'+
							'<td class="alter-headline">'+obj.settings.title+'</td>'+
							'<td class="alter-close"><a class="userselcolse"></a></td>'+
						'</tr>'+
						'<tr style="width: 100%; padding: 0px 20px;">';
			if(obj.settings.multiSelect){
				userselHTML += '<td colspan="2"><input class="usersel-search-input" style="margin: 10px; height: 28px;" ><a class="usersel-search-bth">&nbsp;&nbsp;'+obj.settings.language.search+'</a><a class="usersel-sure-bth">&nbsp;&nbsp;'+obj.settings.language.sure+'</a></td>';
			}else{
				userselHTML += '<td colspan="2"><input class="usersel-search-input" style="margin: 10px; height: 28px;" ><a class="usersel-search-bth">&nbsp;&nbsp;'+obj.settings.language.search+'</a></td>';
			}
			userselHTML += '</tr>'+
						'<tr style="background-color: rgb(243, 243, 243);">'+
							'<td colspan="2" style="height: 415px;overflow-y: auto; background: #fff; display: block;">'+
								'<table style="width:100%;" class="usersel-table-data">'+
									'<thead><tr>';
			if(obj.settings.multiSelect)
				userselHTML += '<th class="checkbox-th" width="5%" style="padding-left:10px;"><input type="checkbox"></th>';
			userselHTML += '<th class="username-th" width="47.25%" style="padding-left:10px;">'+obj.settings.language.userName+'</th>'+
										'<th class="userstate-th" width="47.25%">'+obj.settings.language.userState+'</th>'+
									'</tr></thead>'+
									'<tbody style="overflow-y: scroll;"></tbody>'+
								'</table>'+
							'</td>'+
						'</tr>'+
					'</table>'+
				'</div>';
			$(userselHTML).appendTo(document.body);
			obj.draw($("#usersel-div .usersel-search-input").val(), obj.settings.multiSelect, obj.settings.e1);
			//监听关闭操作
			$(".alter-concear, #usersel-div .alter-close").click(function(){
				if(obj.settings.fromModal!=undefined){
					$(obj.settings.fromModal).modal("toggle");
				}
				$(".alter-concear,.alter-possessor").remove();
				obj.settings.onRemove($this);
			});
			//监听搜索操作
			$("#usersel-div .usersel-search-bth").click(function(){
				obj.draw($("#usersel-div .usersel-search-input").val(), obj.settings.multiSelect, obj.settings.e1);
				obj.settings.onSearch($this);
			});
			//判断为多选用户的时候进行如下监听
			if(obj.settings.multiSelect){
				$("#usersel-div .usersel-table-data thead tr th input[type='checkbox']").click(function(){//全选/反全选
					$("#usersel-div .usersel-table-data tbody").find("tr td input[type='checkbox']").prop("checked", this.checked);
				});
				$("#usersel-div .usersel-sure-bth").click(function(){//监听确定事件
					var tempids = "", tempnames = "";
					$("#usersel-div .usersel-table-data tbody").find("tr td input[type='checkbox']:checked").each(function(){
						tempids += ','+this.value; tempnames += ','+$(this).closest("tr").find(".usersel-name-td").text();
					});
					$(obj.settings.e1).val(tempids!=""?tempids.substring(1):tempids);
					$(obj.settings.e2).val(tempnames!=""?tempnames.substring(1):tempnames);
					if(obj.settings.fromModal!=undefined){
						$(obj.settings.fromModal).modal("toggle");
					}
					$(".alter-concear,.alter-possessor").remove();
				});
			}else{
				$("#usersel-div .usersel-table-data tbody").delegate("tr .usersel-name-td a", "click", function(){//监听单击事件
					var tempid = this.id;
					var tempname = $(this).text();
					$(obj.settings.e1).val(tempid);
					$(obj.settings.e2).val(tempname);
					if(obj.settings.fromModal!=undefined){
						$(obj.settings.fromModal).modal("toggle");
					}
					$(".alter-concear,.alter-possessor").remove();
				});
			}
		},
		draw : function() {
			var searchValue = arguments[0];
			var multiSelect = arguments[1];
			var $idtag = $(arguments[2]);
			$.ajax({
				type: "post",
				url: "./ownerList",
				data:{ownerName:searchValue},
				success: function(data){
					if(data.data){
						//清除数据
						$("#usersel-div .usersel-table-data tbody tr").remove();
						var tempMultiCheckALlFlag = true;
						//重新加载数据
						$.each(data.data,function(index){
							if(multiSelect) {
								var tempChecked="";
								if($idtag.val().indexOf(this[0])!=-1) tempChecked = "checked";
								else tempMultiCheckALlFlag = false;
								$('<tr>'+
										'<td class="usersel-checkbox-td" style="padding-left:10px;"><input type="checkbox" value="'+this[0]+'" '+tempChecked+'/></td>'+
										'<td class="usersel-name-td" style="padding-left:10px;">'+this[1]+'</td>'+
										'<td class="usersel-state-td" style="padding-left:10px;">'+this[2]+'</td>'+
								'</tr>').appendTo("#usersel-div .usersel-table-data tbody");
							}else{
								$('<tr>'+
										'<td class="usersel-name-td" style="padding-left:10px;"><a href="javaScript:;" id="'+this[0]+'">'+this[1]+'</a></td>'+
										'<td class="usersel-state-td" style="padding-left:10px;">'+this[2]+'</td>'+
								'</tr>').appendTo("#usersel-div .usersel-table-data tbody");
							}
						});
						if(multiSelect&&tempMultiCheckALlFlag) {
							$("#usersel-div .usersel-table-data thead tr th input[type='checkbox']").prop("checked", true);
						}
					}
				}
			});
		},
		remove : function() {
			//this.element.off("." + pluginName);
			//this.element.removeData(pluginName);
		}

	};
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
