(function($){

	var timestamp = (new Date()).valueOf();

	/*已同步到App图表列表*/
	$.chars_synlist = {
		"requestcommand" : "chars_synlist",
		"requesttime": timestamp,
		"userId":"402893bb50d6280d0150d62aa2f00001"
	};
	/*未同步图表列表查询*/
	$.chars_searchlist = {
		"requestcommand" : "chars_searchlist",
		"requesttime": timestamp,
		"userId":"402893bb50d6280d0150d62aa2f00001",
		"searchVal":""
	};

	/*取消同步*/
	$.chars_cancelsyn = {
		"requestcommand" : "chars_cancelsyn",
		"requesttime": timestamp,
		"userId":"402893bb50d6280d0150d62aa2f00001",
		"id":"402893bb50d6280d0150d62aa2f00001"

	};

	/*同步*/
	$.chars_syn = {
		"requestcommand" : "chars_syn",
		"requesttime": timestamp,
		"userId":"402893bb50d6280d0150d62aa2f00001",
		"synlist":[
			{
				"flipId":"402893bb50d6280d0150d62aa2f00001",//仪表盘Id
				"dashboardId":"402893bb50d6280d0150d62aa2f00001"//文件夹Id
			}
		]

	};

	
})(Test);