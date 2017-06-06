/**
 * @version 0.0.1
 * @namespace Namespace
 * @author:ziyu.zhang
 * @description 创建一个命名空间,命名空间的父子关系使用半角点号"."隔开
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

Namespace.create("view");
//新增视图
$("a[id='addView']").click(function(){
	window.listForm.action="../aycrm/viewCreate.action?";
	window.listForm.submit();
});