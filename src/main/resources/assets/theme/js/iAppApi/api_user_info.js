(function($){

var timestamp = (new Date()).valueOf();


//请求 ：列名 请求方法
var reqLine = "<table><tr><td style='width:150px;color:#00F;'>参数名</td><td style='width:120px;color:#00F;'>参数类型</td><td style='color:#00F;'>参数说明</td></tr>";
	reqLine += "<tr><td style='width:150px;'>requestcommand</td><td style='width:120px;'>String</td><td>方法名<span style='color:red;'>(必传)</span></td></tr>";
//请求时间戳
var reqLine1 = "<tr><td style='width:150px;'>requesttime</td><td style='width:120px;'>long</td><td>请求时间戳<span style='color:red;'>(必传)</span></td></tr>";
//响应：列名 请求方法
var resLine = "<table><tr><td style='width:150px;color:#00F;'>字段名</td><td style='width:120px;color:#00F;'>字段类型</td><td style='color:#00F;width:150px;'>字段说明</td></tr>";
	resLine += "<tr><td style='width:150px;'>code</td><td style='width:120px;'>int</td><td><a href='#' onclick='showCode();return false;'>响应代码(点我见详情)</a></td></tr>";
	resLine += "<tr><td style='width:150px;'>message</td><td style='width:120px;'>String</td><td>响应文字描述 </td></tr>";


		
/****************************获取组织数据*************************/
//请求内容
var	reqContent_user_getorglist = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>当前登录用户ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
//响应内容
var	resContent_user_getorglist = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_user_getorglist += "<tr><td></td><td style='width:150px;'>id</td><td>String </td><td>组织id </td></tr>";
	resContent_user_getorglist += "<tr><td></td><td style='width:150px;'>pid</td><td>String </td><td>组织父id </td></tr>";
	resContent_user_getorglist += "<tr><td></td><td style='width:150px;'>name</td><td>String </td><td>组织名称 </td></tr>";
	resContent_user_getorglist += "<tr><td></td><td style='width:150px;'>icon</td><td>String </td><td>组织图标 </td></tr>";

$.user_getorglist = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_user_getorglist+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_user_getorglist+"</table>";


/****************************获取组数据*************************/
//请求内容
var	reqContent_user_getgrouplist = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>当前登录用户ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
//响应内容
var	resContent_user_getgrouplist = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_user_getgrouplist += "<tr><td></td><td style='width:150px;'>id</td><td>String </td><td>组id </td></tr>";
	resContent_user_getgrouplist += "<tr><td></td><td style='width:150px;'>groupName</td><td>String </td><td>组名称 </td></tr>";

$.user_getgrouplist = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_user_getgrouplist+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_user_getgrouplist+"</table>";

	

/****************************获取个人信息*************************/
//请求内容
var	reqContent_user_persinfo = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>当前登录用户ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
//响应内容
var	resContent_user_persinfo = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_user_persinfo += "<tr><td></td><td style='width:150px;'>photo</td><td>String </td><td>头像</td></tr>";
	resContent_user_persinfo += "<tr><td></td><td style='width:150px;'>name</td><td>String </td><td>姓名 </td></tr>";
	resContent_user_persinfo += "<tr><td></td><td style='width:150px;'>mobilePhone</td><td>String </td><td>手机号 </td></tr>";
	resContent_user_persinfo += "<tr><td></td><td style='width:150px;'>orgName</td><td>String </td><td>组织名</td></tr>";
	resContent_user_persinfo += "<tr><td></td><td style='width:150px;'>qq</td><td>String </td><td>QQ </td></tr>";
	resContent_user_persinfo += "<tr><td></td><td style='width:150px;'>email</td><td>String </td><td>邮箱</td></tr>";
	resContent_user_persinfo += "<tr><td></td><td style='width:150px;'>fixedPhone</td><td>String </td><td>固话</td></tr>";
	resContent_user_persinfo += "<tr><td></td><td style='width:150px;'>sex</td><td>String </td><td>性别</td></tr>";
	resContent_user_persinfo += "<tr><td></td><td style='width:150px;'>weChat</td><td>String </td><td>微信</td></tr>";
	resContent_user_persinfo += "<tr><td></td><td style='width:150px;'>address</td><td>String </td><td>地址</td></tr>";
	resContent_user_persinfo += "<tr><td></td><td style='width:150px;'>companyName</td><td>String </td><td>公司名</td></tr>";
	resContent_user_persinfo += "<tr><td></td><td style='width:150px;'>roleName</td><td>String </td><td>角色名</td></tr>";
	resContent_user_persinfo += "<tr><td></td><td style='width:150px;'>managearea</td><td>String </td><td>管辖区域</td></tr>";
	resContent_user_persinfo += "<tr><td></td><td style='width:150px;'>registerTime</td><td>String </td><td>加入(注册)时间</td></tr>";
	resContent_user_persinfo += "<tr><td></td><td style='width:150px;'>superAdmin</td><td>String </td><td>超级管理员</td></tr>";

$.user_persinfo = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_user_persinfo+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_user_persinfo+"</table>";

	
/****************************修改个人信息*************************/
//请求内容
var	reqContent_user_persinfoupdate = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>当前登录用户ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_user_persinfoupdate += "<tr><td style='width:150px;'>photo</td><td>String </td><td>头像</td></tr>";
	reqContent_user_persinfoupdate += "<tr><td style='width:150px;'>sex</td><td>String </td><td>性别</td></tr>";
	reqContent_user_persinfoupdate += "<tr><td style='width:150px;'>name</td><td>String </td><td>名称 </td></tr>";
	reqContent_user_persinfoupdate += "<tr><td style='width:150px;'>qq</td><td>String </td><td>QQ </td></tr>";
	reqContent_user_persinfoupdate += "<tr><td style='width:150px;'>fixedPhone</td><td>String </td><td>固话</td></tr>";
	reqContent_user_persinfoupdate += "<tr><td style='width:150px;'>address</td><td>String </td><td>地址</td></tr>";
	reqContent_user_persinfoupdate += "<tr><td style='width:150px;'>weChat</td><td>String </td><td>微信</td></tr>";
//响应内容
var	resContent_user_persinfoupdate = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	

$.user_persinfoupdate = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_user_persinfoupdate+"</table>" +
	"<h3>响应：</h3>"+resLine+"</table>";

/****************************获取组织、组、用户数据*************************/
//请求内容
var	reqContent_user_ogu = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>当前登录用户ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_user_ogu += "<tr><td style='width:150px;'>seq</td><td>String </td><td>1包含人 否则不包含人</td></tr>";

//响应内容
var	resContent_user_ogu = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";

$.user_ogu = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_user_ogu+"</table>" +
	"<h3>响应：</h3>"+resLine+"</table>";



	/******************************获取所有用户***************************/
//请求内容
var	reqContent_user_getusers = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_user_getusers += "<tr><td style='width:150px;'>searchVal</td><td>String </td><td>搜索</td></tr>";

//响应内容
	var	resContent_user_getusers = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";
	resContent_user_getusers += "<tr><td></td><td style='width:150px;'>contactId</td><td>String</td><td>ID</td></tr>";
	resContent_user_getusers += "<tr><td></td><td style='width:150px;'>contactName</td><td>String</td><td>名称</td></tr>";
	resContent_user_getusers += "<tr><td></td><td style='width:150px;'>mobilePhone</td><td>String</td><td>手机号</td></tr>";
	resContent_user_getusers += "<tr><td></td><td style='width:150px;'>landline</td><td>String</td><td>电话号</td></tr>";
	resContent_user_getusers += "<tr><td></td><td style='width:150px;'>qq</td><td>String</td><td>QQ</td></tr>";
	resContent_user_getusers += "<tr><td></td><td style='width:150px;'>weChat</td><td>String</td><td>微信</td></tr>";
	resContent_user_getusers += "<tr><td></td><td style='width:150px;'>email</td><td>String</td><td>Email</td></tr>";
	resContent_user_getusers += "<tr><td></td><td style='width:150px;'>iconPath</td><td>String</td><td>头像地址</td></tr>";
	resContent_user_getusers += "<tr><td></td><td style='width:150px;'>position</td><td>String</td><td>职位</td></tr>";

	$.user_getusers = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_user_getusers+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_user_getusers+"</table>";



	/******************************用户验证***************************/
//请求内容
var	reqContent_user_veruser = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>被验证的用户ID<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_user_veruser = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";

	$.user_veruser = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_user_veruser+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_user_veruser+"</table>";



})(TestInfo);