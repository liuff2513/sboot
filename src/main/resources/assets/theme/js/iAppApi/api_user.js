(function($){
	
	var timestamp = (new Date()).valueOf();
	
	/*个人信息*/
	$.user_persinfo = {
		"requestcommand" : "user_persinfo",
		"requesttime": timestamp,
		"userId" : "402890b7507e066f01507e0bc7360000"
	}
	
	/*个人信息 修改*/
	$.user_persinfoupdate = {
		"requestcommand" : "user_persinfoupdate",
		"requesttime": timestamp,
		"userId" : "402890b7507e066f01507e0bc7360000",
		"photo" : "",
		"qq" : "",
		"name" : "",
		"sex" : "",
		"fixedPhone" : "",
		"address" : "",
		"weChat" : ""
	};
	
	
	/*获取组织数据*/
	$.user_getorglist = {
		"requestcommand" : "user_getorglist",
		"requesttime": timestamp,
		"userId" : "402890b8506a818201506a826f160000"
	};
	
	/*获取组数据*/
	$.user_getgrouplist = {
		"requestcommand" : "user_getgrouplist",
		"requesttime": timestamp,
		"userId" : "402890b8506a818201506a826f160000"
	};
	
	/*获取组数据*/
	$.user_ogu = {
		"requestcommand" : "user_ogu",
		"requesttime": timestamp,
		"userId" : "402893bb50d6280d0150d62aa2f00001",
		"seq":"1" //1包含人 否则不包含
	};

	/*获取所有用户*/
	$.user_getusers = {
		"requestcommand" : "user_getusers",
		"requesttime": timestamp,
		"searchVal": "",
		"userId" : "402893bb50d6280d0150d62aa2f00001"
	};

	/*用户验证*/
	$.user_veruser = {
		"requestcommand" : "user_veruser",
		"requesttime": timestamp,
		"userId" : "402893bb50d6280d0150d62aa2f00001"
	};

	
	
	
})(Test);

