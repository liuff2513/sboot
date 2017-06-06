(function($){

var timestamp = (new Date()).valueOf();


//请求 ：列名 请求方法
var reqLine = "<table border='1'><tr><td style='width:150px;color:#00F;'>参数名</td><td style='width:120px;color:#00F;'>参数类型</td><td style='color:#00F;'>参数说明</td></tr>";
	reqLine += "<tr><td style='width:150px;'>requestcommand</td><td style='width:120px;'>String</td><td>方法名<span style='color:red;'>(必传)</span></td></tr>";
//请求时间戳
var reqLine1 = "<tr><td style='width:150px;'>requesttime</td><td style='width:120px;'>long</td><td>请求时间戳<span style='color:red;'>(必传)</span></td></tr>";
//响应：列名 请求方法
var resLine = "<table border='1'><tr><td style='width:150px;color:#00F;'>字段名</td><td style='width:120px;color:#00F;'>字段类型</td><td style='color:#00F;width:150px;'>字段说明</td></tr>";
	resLine += "<tr><td style='width:150px;'>code</td><td style='width:120px;'>int</td><td><a href='#' onclick='showCode();return false;'>响应代码(点我见详情)</a></td></tr>";
	resLine += "<tr><td style='width:150px;'>message</td><td style='width:120px;'>String</td><td>响应文字描述 </td></tr>";

/******************************获取系统时间***************************/
//响应说明
var resMessage_sys_gettime = "<span style='font-size:13px;color:#8E8E8E;'>此接口1秒内限制调用100次，超出100次不再返回data</span>";
//响应内容
var	resContent_sys_gettime = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_sys_gettime += "<tr><td></td><td style='width:150px;'>time</td><td>long </td><td>服务器时间戳 </td></tr>"

$.sys_gettime = "<h3>请求：</h3>"+reqLine+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_gettime+"</table>"+resMessage_sys_gettime;

/******************************升级App***************************/
//响应说明
var	reqContent_sys_upapk = "<tr><td style='width:150px;'>version</td><td style='width:120px;'>String</td><td>版本号<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_sys_upapk = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_upapk += "<tr><td></td><td style='width:150px;'>version</td><td>String </td><td>最新版本 </td></tr>";
	resContent_sys_upapk += "<tr><td></td><td style='width:150px;'>url</td><td>long </td><td>更新地址 </td></tr>";

$.sys_upapk = "<h3>请求：</h3>"+reqLine+reqContent_sys_upapk+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_upapk+"</table>";


/******************************上传附件***************************/
//上传附件接口 (请求说明)	
var reqMessage_uploadfile = "<span style='font-size:13px;color:#8E8E8E;'>请求说明：附件提交以form表单提交方式完成，附件key值为uploadfile,支持的文件扩展名：'gif', 'jpg', 'jpeg', 'png', 'bmp', 'mp3', 'MP3', 'WAV', 'wav', 'WMA', 'amr'</span>";
//上传附件接口 (响应说明)	
var resMessage_uploadfile = "<span style='font-size:13px;color:#8E8E8E;'>此接口1秒内限制调用100次，超出100次不再返回data</span>";
//响应内容
var	resContent_sys_uploadfile = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_sys_uploadfile += "<tr><td></td><td style='width:150px;'>url</td><td>String </td><td>以http开头的可访问链接 </td></tr>"

$.sys_uploadfile = 	"<h3>请求：</h3>"+reqMessage_uploadfile+reqLine+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_uploadfile+"</table>"+resMessage_uploadfile;




/******************************上传附件(图片)***************************/
//请求内容
var	reqContent_sys_uploadimg = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录Id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_uploadimg += "<tr><td style='width:150px;'>uploadfile</td><td style='width:120px;'>String</td><td>图片base64后的字符串<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_uploadimg += "<tr><td style='width:150px;'>upType</td><td style='width:120px;'>String</td><td>1.表示上传头像 <span style='color:red;'>(上传头像必传)</span></td></tr>";
//上传附件接口 (响应说明)
var reqMessage_sys_uploadimg = "<span style='font-size:13px;color:#8E8E8E;'>此接口1秒内限制调用100次，超出100次不再返回data</span>";
//响应内容
var	resContent_sys_uploadimg = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_sys_uploadimg += "<tr><td></td><td style='width:150px;'>originalUrl</td><td>String </td><td>原图可访问链接 </td></tr>";
	resContent_sys_uploadimg += "<tr><td></td><td style='width:150px;'>thumbnailUrl</td><td>String </td><td>压缩后的缩略图可访问链接 </td></tr>";

$.sys_uploadimg = 	"<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_uploadimg+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_uploadimg+"</table>"+reqMessage_sys_uploadimg;


/******************************详情上传附件***************************/
//请求内容
var	reqContent_sys_uploadimgdur = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录Id<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_uploadimgdur += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_uploadimgdur += "<tr><td style='width:150px;'>dataId</td><td style='width:120px;'>String</td><td>数据Id<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_uploadimgdur += "<tr><td style='width:150px;'>files</td><td style='width:120px;'>Vector</td><td>附件信息集<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_uploadimgdur += "<tr><td style='width:150px;'></td><td style='width:150px;'>url</td><td style='width:120px;'>String</td><td>路径<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_uploadimgdur += "<tr><td style='width:150px;'></td><td style='width:150px;'>thumbnailUrl</td><td style='width:120px;'>String</td><td>缩略图路径</td></tr>";
	reqContent_sys_uploadimgdur += "<tr><td style='width:150px;'></td><td style='width:150px;'>fileSize</td><td style='width:120px;'>String</td><td>附件大小<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_uploadimgdur += "<tr><td style='width:150px;'></td><td style='width:150px;'>fileName</td><td style='width:120px;'>String</td><td>附件名称<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_uploadimgdur += "<tr><td style='width:150px;'></td><td style='width:150px;'>oldFileName</td><td style='width:120px;'>String</td><td>原附件名称<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_sys_uploadimgdur = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_uploadimgdur += "<tr><td></td><td style='width:150px;'>originalUrl</td><td>String </td><td>原图可访问链接 </td></tr>";
	resContent_sys_uploadimgdur += "<tr><td></td><td style='width:150px;'>thumbnailUrl</td><td>String </td><td>压缩后的缩略图可访问链接 </td></tr>";

$.sys_uploadimgdur = 	"<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_uploadimgdur+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";


/******************************获取附件***************************/
//请求内容
var	reqContent_sys_getfilemessage = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录Id<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_getfilemessage += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_getfilemessage += "<tr><td style='width:150px;'>dataId</td><td style='width:120px;'>String</td><td>数据ID<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_getfilemessage += "<tr><td style='width:150px;'>pageNo</td><td style='width:120px;'>int</td><td>页码<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_getfilemessage += "<tr><td style='width:150px;'>pageSize</td><td style='width:120px;'>int</td><td>每页显示条数<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_sys_getfilemessage = "<tr><td style='width:80px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_getfilemessage += "<tr><td style='width:40px;'></td><td style='width:120px;'>datas</td><td style='width:120px;'>Vector</td><td>数据集 </td></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:130px;'>createdTime</td><td style='width:120px;'>Date</td><td>创建时间 </td></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:130px;'>id</td><td style='width:120px;'>附件ID</td><td>附件ID</td></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:150px;'>dataId</td><td style='width:120px;'>String</td><td>数据ID </td></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:150px;'>fileName</td><td style='width:120px;'>String</td><td>附件名称</td></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:150px;'>oldFileName</td><td style='width:120px;'>String</td><td>附件名称</td></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:150px;'>fileSize</td><td style='width:120px;'>String</td><td>附件大小</td></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:150px;'>module</td><td style='width:120px;'>String</td><td>模块标识</td></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:150px;'>ownerId</td><td style='width:120px;'>String</td><td>所有者ID</td></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:150px;'>ownerName</td><td style='width:120px;'>String</td><td>所有者名称</td></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:150px;'>url</td><td style='width:120px;'>String</td><td>URL</td></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:150px;'>thumbnailUrl</td><td style='width:120px;'>String</td><td>缩略图URL</td></tr>";

	resContent_sys_getfilemessage += "<tr style='height:5px;'></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:100px;'>nextPage</td><td style='width:120px;'>String</td><td>下一页页码</td></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:100px;'>pageNo</td><td style='width:120px;'>String</td><td>当前页码</td></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:100px;'>pageSize</td><td style='width:120px;'>String</td><td>每页显示的条数</td></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:150px;'>totalCount</td><td style='width:120px;'>String</td><td>数据总条数</td></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:150px;'>totalPage</td><td style='width:120px;'>String</td><td>总页数</td></tr>";
	resContent_sys_getfilemessage += "<tr><td></td><td style='width:150px;'>upPage</td><td style='width:120px;'>String</td><td>上一页页码</td></tr>";

$.sys_getfilemessage = 	"<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_getfilemessage+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_getfilemessage+"</table>";


/******************************删除附件***************************/
//请求内容
	//上传附件接口 (请求说明)
	var reqMessage_sys_deletefilemessage = "<span style='font-size:13px;color:#8E8E8E;'>请求说明：id 与 dataId 必传其一，id 方式为单文件删除，dataId 方式为此条数据下的附件全部删除， 二者都传默认以dataId方式删除</span>";

	var	reqContent_sys_deletefilemessage = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录Id<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_deletefilemessage += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>附件ID</td></tr>";
	reqContent_sys_deletefilemessage += "<tr><td style='width:150px;'>dataId</td><td style='width:120px;'>String</td><td>数据ID</td></tr>";

//响应内容
var	resContent_sys_deletefilemessage = "<tr><td style='width:80px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";

	$.sys_deletefilemessage = 	"<h3>请求：</h3>"+reqMessage_sys_deletefilemessage+reqLine+reqLine1+reqContent_sys_deletefilemessage+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_deletefilemessage+"</table>";


	
/****************************获取短信验证码*************************/
//请求内容
var	reqContent_sys_getauthcode = "<tr><td style='width:150px;'>phone</td><td style='width:120px;'>String</td><td>手机号<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_getauthcode += "<tr><td style='width:150px;'>type</td><td style='width:120px;'>String</td><td><a href='#' onclick='showPCode();return false;'>类型(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";
//响应内容
var	resContent_sys_getauthcode = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	/*resContent_sys_getauthcode += "<tr><td></td><td style='width:150px;'>authcode</td><td>String </td><td>验证码 </td></tr>";*/

$.sys_getauthcode = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_getauthcode+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_getauthcode+"</table>";

	
/***************************验证验证码***************************/
//请求内容
var	reqContent_sys_verauthcode = "<tr><td style='width:150px;'>loginName</td><td style='width:120px;'>String</td><td>手机号或email<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_verauthcode += "<tr><td style='width:150px;'>authcode</td><td style='width:120px;'>String</td><td>验证码<span style='color:red;'>(必传)</span></td></tr>";	
//响应内容
var	resContent_sys_verauthcode = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_sys_verauthcode += "<tr><td></td><td style='width:150px;'>loginName</td><td>String </td><td>手机号 </td></tr>"
	resContent_sys_verauthcode += "<tr><td></td><td style='width:150px;'>authToken</td><td>String</td><td>验证码Token时效10分钟（用于忘记密码接口，约束设置密码的请求时效） </td></tr>"

	
$.sys_verauthcode = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_verauthcode+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_verauthcode+"</table>";



/*******************验证手机号是否已注册*******************/
//请求内容
var	reqContent_sys_verpnelregister = "<tr><td style='width:150px;'>loginName</td><td style='width:120px;'>String</td><td>手机号或邮箱<span style='color:red;'>(必传)</span></td></tr>";
//响应内容
var	resContent_sys_verpnelregister = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_verpnelregister += "<tr><td></td><td style='width:150px;'>isRegister</td><td>boolean </td><td>true 已注册，false 未注册 </td></tr>"
	
$.sys_verpnelregister = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_verpnelregister+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_verpnelregister+"</table>";
	
	
	
/*******************注册***************************/	
//请求内容
var	reqContent_sys_register = "<tr><td style='width:150px;'>phone</td><td style='width:120px;'>String</td><td>手机号<span style='color:red;'>(必传)</span></td></tr>";	
		reqContent_sys_register += "<tr><td style='width:150px;'>authcode</td><td style='width:120px;'>String</td><td>验证码<span style='color:red;'>(必传)</span></td></tr>";	
		reqContent_sys_register += "<tr><td style='width:150px;'>password</td><td style='width:120px;'>String</td><td>密码<span style='color:red;'>(必传)</span></td></tr>";	
//响应内容
var	resContent_sys_register = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_sys_register += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>用户名称 </td></tr>"
	resContent_sys_register += "<tr><td></td><td style='width:150px;'>userId</td><td>String</td><td>用户ID </td></tr>"
	resContent_sys_register += "<tr><td></td><td style='width:150px;'>phone</td><td>String</td><td>手机号 </td></tr>"
	resContent_sys_register += "<tr><td></td><td style='width:150px;'>portraitUri</td><td>String</td><td>用户头像 </td></tr>"
	
$.sys_register = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_register+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_register+"</table>";



	/*******************获取基本信息***************************/
//请求内容
var	reqContent_sys_getbasicinfo = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_sys_getbasicinfo = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_getbasicinfo += "<tr><td></td><td style='width:150px;'>modules</td><td>Vector</td><td>模块集合(参考登录接口)</td></tr>";
	resContent_sys_getbasicinfo += "<tr><td></td><td style='width:150px;'>lowerusers</td><td>Vector</td><td>下级成员Id集(参考登录接口)</td></tr>";
$.sys_getbasicinfo = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_getbasicinfo+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_getbasicinfo+"</table>";






/***************************登录***************************/	
//请求内容
var	reqContent_sys_login = "<tr><td style='width:150px;'>phone</td><td style='width:120px;'>String</td><td>手机号<span style='color:red;'>(必传)</span></td></tr>";	
		reqContent_sys_login += "<tr><td style='width:150px;'>password</td><td style='width:120px;'>String</td><td>密码<span style='color:red;'>(必传)</span></td></tr>";	
//响应内容
var	resContent_sys_login = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
		resContent_sys_login += "<tr style='height:30px;'><td colspan='3'>以下是用户基本信息：<td></tr>";

		resContent_sys_login += "<tr><td></td><td style='width:150px;'>userBasicInfo</td><td>String</td><td>用户基本信息串 </td></tr>";
		resContent_sys_login += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>用户名称 </td></tr>";
		resContent_sys_login += "<tr><td></td><td style='width:150px;'>userId</td><td>String</td><td>用户ID </td></tr>";
		resContent_sys_login += "<tr><td></td><td style='width:150px;'>phone</td><td>String</td><td>手机号 </td></tr>";
		resContent_sys_login += "<tr><td></td><td style='width:150px;'>portraitUri</td><td>String</td><td>用户头像 </td></tr>";
		resContent_sys_login += "<tr><td></td><td style='width:150px;'>rongyToken</td><td>String</td><td>融云Token </td></tr>";
	
		resContent_sys_login += "<tr style='height:30px;'><td colspan='3'>以下是模块信息(Home键中内容)：<td></tr>";	
		resContent_sys_login += "<tr><td></td><td style='width:150px;'>modules</td><td>Vector</td><td>模块集合</td></tr>";
		resContent_sys_login += "<tr><td></td><td style='width:150px;'>moduleId</td><td>String</td><td>模块Id</td></tr>";
		resContent_sys_login += "<tr><td></td><td style='width:150px;'>moduleUrl</td><td>String</td><td>模块名图像URL</td></tr>";
		resContent_sys_login += "<tr><td></td><td style='width:150px;'>moduleName</td><td>String</td><td>模块名</td></tr>";
		resContent_sys_login += "<tr><td></td><td style='width:150px;'>modulePort</td><td>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a></td></tr>";
	
		resContent_sys_login += "<tr><td></td><td style='width:150px;'>headoperations</td><td>String</td><td>列表上操作功能</td></tr>";
		resContent_sys_login += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String</td><td>功能名称</td></tr>";
		resContent_sys_login += "<tr><td></td><td></td><td style='width:150px;'>identif</td><td>String</td><td>功能标识</td></tr>";
		
		resContent_sys_login += "<tr><td></td><td style='width:150px;'>listoperations</td><td>String</td><td>每条数据上操作功能</td></tr>";
		resContent_sys_login += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String</td><td>功能名称</td></tr>";
		resContent_sys_login += "<tr><td></td><td></td><td style='width:150px;'>identif</td><td>String</td><td>功能标识</td></tr>";
		
		resContent_sys_login += "<tr><td></td><td style='width:150px;'>lowerusers</td><td>Vector</td><td>下级成员Id集</td></tr>";
		
		
		
		
			
$.sys_login = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_login+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_login+"</table>";


/***************************登出***************************/
//请求内容
	var	reqContent_sys_loginout = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>用户ID<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_loginout += "<tr><td style='width:150px;'>sessionId</td><td style='width:120px;'>String</td><td>SessionID<span style='color:red;'>(必传)</span></td></tr>";
//响应内容
	var	resContent_sys_loginout = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";


	$.sys_loginout = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_loginout+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_loginout+"</table>";




	/***************************发送邮件 获取验证码等***************************/
//请求内容
var	reqContent_sys_sendemailauth = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_sendemailauth += "<tr><td style='width:150px;'>toEmails</td><td style='width:120px;'>Vector</td><td>邮箱<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_sendemailauth += "<tr><td style='width:150px;'>type</td><td style='width:120px;'>String</td><td><a href='#' onclick='showPCode();return false;'>类型(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";
//响应内容
var	resContent_sys_sendemailauth = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	

		
$.sys_sendemailauth = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_sendemailauth+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_sendemailauth+"</table>";
						

		
/***************************修改或绑定邮箱***************************/	
//请求内容
var	reqContent_sys_updateemail = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID<span style='color:red;'>(必传)</span></td></tr>";	
		reqContent_sys_updateemail += "<tr><td style='width:150px;'>password</td><td style='width:120px;'>String</td><td>当前账号登陆密码<span style='color:red;'>(必传)</span></td></tr>";	
		reqContent_sys_updateemail += "<tr><td style='width:150px;'>email</td><td style='width:120px;'>String</td><td>新邮箱<span style='color:red;'>(必传)</span></td></tr>";	
		reqContent_sys_updateemail += "<tr><td style='width:150px;'>authcode</td><td style='width:120px;'>String</td><td>验证码<span style='color:red;'>(必传)</span></td></tr>";	
//响应内容
var	resContent_sys_updateemail = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	

		
$.sys_updateemail = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_updateemail+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_updateemail+"</table>";		
				
		
		
		
/***************************修改或绑定手机号***************************/	
//请求内容
var	reqContent_sys_updatephone = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID<span style='color:red;'>(必传)</span></td></tr>";	
		reqContent_sys_updatephone += "<tr><td style='width:150px;'>password</td><td style='width:120px;'>String</td><td>当前账号登陆密码<span style='color:red;'>(必传)</span></td></tr>";	
		reqContent_sys_updatephone += "<tr><td style='width:150px;'>phone</td><td style='width:120px;'>String</td><td>新手机号<span style='color:red;'>(必传)</span></td></tr>";	
		reqContent_sys_updatephone += "<tr><td style='width:150px;'>authcode</td><td style='width:120px;'>String</td><td>验证码<span style='color:red;'>(必传)</span></td></tr>";	
//响应内容
var	resContent_sys_updatephone = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	

		
$.sys_updatephone = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_updatephone+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_updatephone+"</table>";		
		

/***************************修改密码***************************/	
//请求内容
var	reqContent_sys_updatepassword = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID<span style='color:red;'>(必传)</span></td></tr>";	
		reqContent_sys_updatepassword += "<tr><td style='width:150px;'>oldPassword</td><td style='width:120px;'>String</td><td>原登录密码<span style='color:red;'>(必传)</span></td></tr>";	
		reqContent_sys_updatepassword += "<tr><td style='width:150px;'>newPassword</td><td style='width:120px;'>String</td><td>新登录密码<span style='color:red;'>(必传)</span></td></tr>";	
//响应内容
var	resContent_sys_updatepassword = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_sys_updatepassword += "<tr><td></td><td style='width:150px;'>password</td><td>String</td><td>修改后的密码</td></tr>"

		
$.sys_updatepassword = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_updatepassword+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_updatepassword+"</table>";
	
/***************************忘记密码***************************/	
//请求内容
var	reqContent_sys_forgetpassword = "<tr><td style='width:150px;'>loginName</td><td style='width:120px;'>String</td><td>手机号或邮箱<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_forgetpassword += "<tr><td style='width:150px;'>authToken</td><td style='width:120px;'>String</td><td>验证码绑定的Token<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_forgetpassword += "<tr><td style='width:150px;'>newPassword</td><td style='width:120px;'>String</td><td>新密码<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_forgetpassword += "<tr><td style='width:150px;'>newPasswordagain</td><td style='width:120px;'>String</td><td>确认新密码<span style='color:red;'>(必传)</span></td></tr>";	
//响应内容
var	resContent_sys_forgetpassword = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_sys_forgetpassword += "<tr><td></td><td style='width:150px;'>password</td><td>String</td><td>新密码</td></tr>"


$.sys_forgetpassword = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_forgetpassword+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_forgetpassword+"</table>";
	
	
	

/***************************关注列表数据***************************/	
//请求内容
var	reqContent_sys_getattentions = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>用户ID<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_getattentions += "<tr><td style='width:150px;'>moduleId</td><td style='width:120px;'>String</td><td>模块ID(不传  则默认显示全部模块数据)</td></tr>";	
	reqContent_sys_getattentions += "<tr><td style='width:150px;'>searchKey</td><td style='width:120px;'>String</td><td>标题搜索值</td></tr>";	
	
//响应内容
var	resContent_sys_getattentions = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_sys_getattentions += "<tr><td></td><td style='width:150px;'>fieldId</td><td>String</td><td>关注数据Id</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td style='width:150px;'>userId</td><td>String</td><td>用户Id</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>用户名称</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td style='width:150px;'>portraitUri</td><td>String</td><td>用户头像</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td style='width:150px;'>moduleTitle</td><td>String</td><td>被修改数据Title</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td style='width:150px;'>time</td><td>String</td><td>修改时间</td></tr>";
	
	resContent_sys_getattentions += "<tr><td></td><td style='width:150px;'>fields</td><td>Vector</td><td>修改字段集</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td></td><td style='width:150px;'>fieldName</td><td>String</td><td>字段名</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td></td><td style='width:150px;'>fieldOldVal</td><td>String</td><td>原内容</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td></td><td style='width:150px;'>fieldNewVal</td><td>String</td><td>新内容</td></tr>";
	
	resContent_sys_getattentions += "<tr><td></td><td style='width:150px;'>praises</td><td>Vector</td><td>点赞集</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td></td><td style='width:150px;'>userId</td><td>String</td><td>点赞人Id</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td></td><td style='width:150px;'>userName</td><td>String</td><td>点赞人名称</td></tr>";
	
	resContent_sys_getattentions += "<tr><td></td><td style='width:150px;'>comments</td><td>Vector</td><td>评论集</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td></td><td style='width:150px;'>commentId</td><td>String</td><td>评论/回复Id</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td></td><td style='width:150px;'>commentUserId</td><td>String</td><td>评论人Id</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td></td><td style='width:150px;'>commentUserName</td><td>String</td><td>评论人名称</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td></td><td style='width:150px;'>commentTime</td><td>long</td><td>评论/回复时间(时间戳)</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td></td><td style='width:150px;'>replyUserId</td><td>String</td><td>回复人Id(seq为0 无此数据)</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td></td><td style='width:150px;'>replyUserName</td><td>String</td><td>回复人名称(seq为0 无此数据)</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td></td><td style='width:150px;'>content</td><td>String</td><td>评论、回复内容</td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td></td><td style='width:150px;'>seq</td><td>String</td><td>0(表示单纯评论)1(表示回复)</td></tr>";
	
	
	resContent_sys_getattentions += "<tr style='height:30px;'><td colspan='3'>回复集(结构见数据实例)：<td></tr>";
	resContent_sys_getattentions += "<tr><td></td><td style='width:150px;'>replys</td><td>Vector </td><td>回复集</td></tr>";
	

$.sys_getattentions = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_getattentions+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_getattentions+"</table>";
	


/***************************对详情数据的关注、取消关注***************************/	
//请求内容
var	reqContent_sys_attention = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>用户/评论人ID<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_attention += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>数据Id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_attention += "<tr><td style='width:150px;'>identif</td><td style='width:120px;'>String</td><td>传值：save(关注)/cancel(取消关注)<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_attention += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_attention += "<tr><td style='width:150px;'>moduleId</td><td style='width:120px;'>String</td><td>模块Id<span style='color:red;'>(必传)</span></td></tr>";	
	
//响应内容
var	resContent_sys_attention = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	



$.sys_attention = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_attention+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_attention+"</table>";
	
	
/***************************获取预警列表数据***************************/	
//请求内容
var	reqContent_sys_getews = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>用户ID<span style='color:red;'>(必传)</span></td></tr>";	
	
//响应内容
var	resContent_sys_getews = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_sys_getews += "<tr><td></td><td style='width:150px;'>ewsTitle</td><td>String</td><td>预警标题</td></tr>";
	resContent_sys_getews += "<tr><td></td><td style='width:150px;'>ewsTime</td><td>String</td><td>执行时间</td></tr>";
	resContent_sys_getews += "<tr><td></td><td style='width:150px;'>ewsObj</td><td>String</td><td>关联对象</td></tr>";
	resContent_sys_getews += "<tr><td></td><td style='width:150px;'>ewsTask</td><td>String</td><td>任务</td></tr>";
	


$.sys_getews = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_getews+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_getews+"</table>";
	
	
	
/***************************获取列表模板***************************/	
//请求内容
var	reqContent_sys_listtemplate = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>用户ID<span style='color:red;'>(必传)</span></td></tr>";	
	
//响应内容
var	resContent_sys_listtemplate = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	

	resContent_sys_listtemplate += "<tr style='height:30px;'><td colspan='3'>以下是data中字段说明，具体明细请参考实例：<td></tr>";

	resContent_sys_listtemplate += "<tr><td></td><td style='width:150px;'>textKeys</td><td>Vector</td><td>列表粗体标题字段集</td></tr>";
	resContent_sys_listtemplate += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>普通字段集</td></tr>";
	resContent_sys_listtemplate += "<tr><td></td><td style='width:150px;'>position</td><td>String</td><td>位置(H:占据半行,P:占据一行)</td></tr>";
	resContent_sys_listtemplate += "<tr><td></td><td style='width:150px;'>defaultKey</td><td>String</td><td>字段Key</td></tr>";
	
	resContent_sys_listtemplate += "<tr><td></td><td style='width:150px;'>operations</td><td>Vector</td><td>操作功能</td></tr>";
	resContent_sys_listtemplate += "<tr><td></td><td style='width:150px;'>operationType</td><td>String</td><td><a href='#' onclick='showListTemplateCode();return false;'>操作类型(点我见详情)</a></td></tr>";
	resContent_sys_listtemplate += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Boolean</td><td>是否需调用接口</td></tr>";
	resContent_sys_listtemplate += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
	resContent_sys_listtemplate += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
	resContent_sys_listtemplate += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
	resContent_sys_listtemplate += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
	resContent_sys_listtemplate += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
	resContent_sys_listtemplate += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
	
	resContent_sys_listtemplate += "<tr style='height:30px;'><td colspan='3'>以下是data中数据实例：<td></tr>";

	resContent_sys_listtemplate += "<tr><td></td><td colspan='2'>{'textKeys': ['companyName','contactName'], 'imgUrl': 'url','property':[{'position': 'H','defaultKey': 'time'},{'position':'P','defaultKey': 'number'},{'position': 'H','defaultKey': 'reason'}],'operations':[{'operationType': 'phone','isInvokPort': false},{'operationType': '认领','isInvokPort': true,'invokPort': {'paras': [{'paraProperty': 'customerId'}],'resParas':[{'paraProperty':'customerId'}],'method': 'cus_claim'}}]}</td></tr>";

$.sys_listtemplate = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_listtemplate+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_listtemplate+"</table>";
	
	
/***************************获取表单模板***************************/	
//请求内容
var	reqContent_sys_formstemplate = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>用户ID<span style='color:red;'>(必传)</span></td></tr>";	

//响应内容
var	resContent_sys_formstemplate = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	

	resContent_sys_formstemplate += "<tr style='height:30px;'><td colspan='3'>以下是data中字段说明，具体明细请参考实例：<td></tr>";
	
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>modulTitle</td><td>String</td><td>模板标题</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>text</td><td>String</td><td>主模板标题</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>subtext</td><td>String</td><td>副模板标题</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>backgroundColor</td><td>String</td><td>背景颜色</td></tr>";
	
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>forms</td><td>Vector</td><td>表单版块集</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>boardTitle</td><td>String</td><td>版块标题</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>text</td><td>String</td><td>主版块标题</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>subtext</td><td>String</td><td>副版块标题</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>show</td><td>Boolean</td><td>是否显示此版块</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>boardType</td><td>String</td><td><a href='#' onclick='showFormTemplateCode();return false;'>版块类型(点我见详情)</a></td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>fieldSet</td><td>Vector</td><td>字段集</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>fieldTitle</td><td>String</td><td>字段标题</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>pojoProperty</td><td>String</td><td>字段属性名</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>pojoPropertyName</td><td>String</td><td>字段属性显示名称</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>isSubmit</td><td>String</td><td>是否提交</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>theNextFieldisLevel</td><td>String</td><td>字段属性对应组件是否平行显示</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>show</td><td>String</td><td>此字段是否展示</td></tr>";
	
	
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>field</td><td>String</td><td>字段组件</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>字段属性集</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>fieldType</td><td>Vector</td><td>字段类型</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>readOnly</td><td>Vector</td><td>是否只读</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>defaultKey</td><td>Vector</td><td>默认Key</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>defaultVal</td><td>Vector</td><td>默认Value</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Vector</td><td>是否需要调接口</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口请求参数类型</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口响应参数类型</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
	
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>proNumber</td><td>String</td><td>字段个数</td></tr>";
	resContent_sys_formstemplate += "<tr><td></td><td style='width:150px;'>boardType</td><td>Vector</td><td>字段类型</td></tr>";
	
	resContent_sys_formstemplate += "<tr style='height:30px;'><td colspan='3'>请测试接口获取实例展示结构<td></tr>";
	

$.sys_formstemplate = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_formstemplate+"</table>" +
"<h3>响应：</h3>"+resLine+resContent_sys_formstemplate+"</table>";




/***************************获取列表表头模板***************************/	
//请求内容
var	reqContent_sys_getlisttopfun = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>用户ID<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_getlisttopfun += "<tr><td style='width:150px;'>modulePort</td><td style='width:120px;'>String</td><td>模块标识<span style='color:red;'>(必传)</span></td></tr>";	

//响应内容
var	resContent_sys_getlisttopfun = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_sys_getlisttopfun += "<tr><td></td><td style='width:150px;'>listViews</td><td>Vector</td><td>视图集</td></tr>"
		resContent_sys_getlisttopfun += "<tr><td></td><td></td><td style='width:150px;'>viewName</td><td>String</td><td>显示名</td></tr>"
		resContent_sys_getlisttopfun += "<tr><td></td><td></td><td style='width:150px;'>viewId</td><td>String</td><td>ID</td></tr>"
	resContent_sys_getlisttopfun += "<tr><td></td><td style='width:150px;'>listFun</td><td>Vector</td><td>功能集</td></tr>"
		resContent_sys_getlisttopfun += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>功能名称</td></tr>"
		resContent_sys_getlisttopfun += "<tr><td></td><td></td><td style='width:150px;'>identif</td><td>String </td><td><a href='#' onclick='showListFun();return false;'>标识(点我见详情)</a></td></tr>"
	resContent_sys_getlisttopfun += "<tr><td></td><td style='width:150px;'>listOrders</td><td>Vector</td><td>排序集</td></tr>"
		resContent_sys_getlisttopfun += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>名称</td></tr>"
		resContent_sys_getlisttopfun += "<tr><td></td><td></td><td style='width:150px;'>field</td><td>String </td><td>字段</td></tr>"
		resContent_sys_getlisttopfun += "<tr><td></td><td></td><td style='width:150px;'>type</td><td>String </td><td>(service:掉接口system:本地)</td></tr>"
	resContent_sys_getlisttopfun += "<tr><td></td><td style='width:150px;'>listScreen</td><td>Vector</td><td>筛选字段集</td></tr>"
		resContent_sys_getlisttopfun += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>名称</td></tr>"
		resContent_sys_getlisttopfun += "<tr><td></td><td></td><td style='width:150px;'>field</td><td>String </td><td>字段</td></tr>"
		resContent_sys_getlisttopfun += "<tr><td></td><td></td><td style='width:150px;'>values</td><td>Vector </td><td>字典项</td></tr>"
			resContent_sys_getlisttopfun += "<tr><td></td><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>名称</td></tr>"
			resContent_sys_getlisttopfun += "<tr><td></td><td></td><td></td><td style='width:150px;'>identif</td><td>String </td><td>标识</td></tr>"

$.sys_getlisttopfun = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_getlisttopfun+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_getlisttopfun+"</table>";
	
		
/***************************模块名数据集***************************/	
//请求内容
var	reqContent_sys_getmodulenames = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>用户ID<span style='color:red;'>(必传)</span></td></tr>";	

//响应内容
var	resContent_sys_getowner = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_sys_getowner += "<tr><td></td><td style='width:150px;'>moduleId</td><td>String</td><td>模块Id</td></tr>"
	resContent_sys_getowner += "<tr><td></td><td style='width:150px;'>moduleUrl</td><td>String</td><td>模块名图像URL</td></tr>"
	resContent_sys_getowner += "<tr><td></td><td style='width:150px;'>moduleName</td><td>String</td><td>模块名</td></tr>"
	resContent_sys_getowner += "<tr><td></td><td style='width:150px;'>modulePort</td><td>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a></td></tr>"


$.sys_getmodulenames = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_getmodulenames+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_getowner+"</table>";
	
		

	
	
/***************************获取所有者***************************/	
//请求内容
var	reqContent_sys_getowner = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>用户ID<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_getowner += "<tr><td style='width:150px;'>searchVal</td><td style='width:120px;'>String</td><td>可根据Email,手机号,名称搜索</td></tr>";
	reqContent_sys_getowner += "<tr><td style='width:150px;'>ownerType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showOwnerTypePort();return false;'>类型(点我见详情)</a>默认owner</td></tr>";

//响应内容
var	resContent_sys_getowner = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_sys_getowner += "<tr><td></td><td style='width:150px;'>ownerId</td><td>String</td><td>所有者Id</td></tr>";
	resContent_sys_getowner += "<tr><td></td><td style='width:150px;'>ownerName</td><td>String</td><td>所有者名称</td></tr>";
	resContent_sys_getowner += "<tr><td></td><td style='width:150px;'>...</td><td>...</td><td>...</td></tr>";


$.sys_getowner = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_getowner+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_getowner+"</table>";




/******************************获取联系人根据客户Id***************************/
//请求内容
var	reqContent_sys_getconsbycust = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_getconsbycust += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>客户Id,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	
//响应内容
var	resContent_sys_getconsbycust = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_sys_getconsbycust += "<tr><td></td><td style='width:150px;'>contactId</td><td>String </td><td>联系人Id </td></tr>"
	resContent_sys_getconsbycust += "<tr><td></td><td style='width:150px;'>contactName</td><td>String </td><td>联系人名称 </td></tr>"
		
$.sys_getconsbycust = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_getconsbycust+"</table>" +
"<h3>响应：</h3>"+resLine+resContent_sys_getconsbycust+"</table>";

	
/******************************获取客户根据联系人Id***************************/
//请求内容
var	reqContent_sys_getcustsbycontact = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_getcustsbycontact += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>联系人Id,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	
//响应内容
var	resContent_sys_getcustsbycontact = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_sys_getcustsbycontact += "<tr><td></td><td style='width:150px;'>customerId</td><td>String </td><td>联系人Id </td></tr>"
	resContent_sys_getcustsbycontact += "<tr><td></td><td style='width:150px;'>customerName</td><td>String </td><td>联系人名称 </td></tr>"
		
$.sys_getcustsbycontact = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_getcustsbycontact+"</table>" +
"<h3>响应：</h3>"+resLine+resContent_sys_getcustsbycontact+"</table>";
	

/******************************获取操作功能的字典***************************/
//请求内容
var	reqContent_sys_getdicbyoperation = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_getdicbyoperation += "<tr><td style='width:150px;'>identif</td><td style='width:120px;'>String</td><td>功能标识<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_getdicbyoperation += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";	
	
//响应内容
var	resContent_sys_getdicbyoperation = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
		
$.sys_getdicbyoperation = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_getdicbyoperation+"</table>" +
"<h3>响应：</h3>"+resLine+resContent_sys_getdicbyoperation+"</table>";
	
	
	
/******************************点赞/取消赞***************************/
//请求内容
var	reqContent_sys_praise = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_praise += "<tr><td style='width:150px;'>userName</td><td style='width:120px;'>String</td><td style='width:180px;'>登录名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_praise += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>数据id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_praise += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";	
	
//响应内容
var	resContent_sys_praise = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_sys_praise += "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td></td></tr>";	
	resContent_sys_praise += "<tr><td style='width:150px;'>userName</td><td style='width:120px;'>String</td><td></td></tr>";	
	resContent_sys_praise += "<tr><td style='width:150px;'>dataId</td><td style='width:120px;'>String</td><td></td></tr>";	
	resContent_sys_praise += "<tr><td style='width:150px;'>praiseTime</td><td style='width:120px;'>String</td><td></td></tr>";	


$.sys_praise = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_praise+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_praise+"</table>";



/******************************评论***************************/
//请求内容
var	reqContent_sys_comment = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_comment += "<tr><td style='width:150px;'>userName</td><td style='width:120px;'>String</td><td style='width:180px;'>登录名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_comment += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";	

	reqContent_sys_comment += "<tr><td style='width:150px;'>comment</td><td style='width:120px;'>Vector</td><td>数据<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>dataId</td><td style='width:120px;'>String</td><td>被评论的数据Id</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>content</td><td style='width:120px;'>String</td><td>评论内容</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>pid</td><td style='width:120px;'>String</td><td>回复哪条评论</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>seq</td><td style='width:120px;'>String</td><td>1.评论 2.回复</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>commentUserId</td><td style='width:120px;'>String</td><td>评论人或被回复人ID</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>commentUserName</td><td style='width:120px;'>String</td><td>评论人或回复人名称</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>contentBphoto1</td><td style='width:120px;'>String</td><td>原图</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>contentSphoto1</td><td style='width:120px;'>String</td><td>缩略图</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>contentBphoto2</td><td style='width:120px;'>String</td><td>...</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>contentSphoto2</td><td style='width:120px;'>String</td><td>...</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>contentBphoto3</td><td style='width:120px;'>String</td><td>...</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>contentSphoto3</td><td style='width:120px;'>String</td><td>...</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>replyBphoto1</td><td style='width:120px;'>String</td><td>回复原图</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>replySphoto1</td><td style='width:120px;'>String</td><td>回复缩略图</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>replyBphoto2</td><td style='width:120px;'>String</td><td>...</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>replySphoto2</td><td style='width:120px;'>String</td><td>...</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>replyBphoto3</td><td style='width:120px;'>String</td><td>...</td></tr>";	
	reqContent_sys_comment += "<tr><td></td><td style='width:150px;'>replySphoto3</td><td style='width:120px;'>String</td><td>...</td></tr>";	
	
//响应内容
var	resContent_sys_comment = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_sys_comment += "<tr><td></td><td style='width:150px;'>commentId</td><td style='width:120px;'>String</td><td>评论后的Id </td></tr>";	
		
$.sys_comment = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_comment+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_comment+"</table>";


/******************************评论列表***************************/
//请求内容
var	reqContent_sys_getcomments = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_getcomments += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td style='width:180px;'>被评论/回复的数据Id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_getcomments += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_getcomments += "<tr><td style='width:150px;'>pageNoComment</td><td style='width:120px;'>String</td><td>评论页码</td></tr>";	
	reqContent_sys_getcomments += "<tr><td style='width:150px;'>pageSizeComment</td><td style='width:120px;'>String</td><td>评论每页个数</td></tr>";	

	
//响应内容
var	resContent_sys_getcomments = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>commentId</td><td>String </td><td>评论、回复Id</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>commentUserId</td><td>String </td><td>评论人Id</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>commentUserName</td><td>String </td><td>评论人名称</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>replyUserId</td><td>String </td><td>回复人Id</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>replyUserName</td><td>String </td><td>回复人名称</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>commentTime</td><td>long </td><td>评论时间</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>content</td><td>String </td><td>评论人名称</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>contentBphoto1</td><td>String </td><td>评论原图</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>contentSphoto1</td><td>String </td><td>评论缩略图</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>contentBphoto2</td><td>String </td><td>...</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>contentSphoto2</td><td>String </td><td>...</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>contentBphoto3</td><td>String </td><td>...</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>contentSphoto3</td><td>String </td><td>...</td></tr>";
		
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>replyBphoto1</td><td>String </td><td>评论原图</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>replySphoto1</td><td>String </td><td>评论缩略图</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>replyBphoto2</td><td>String </td><td>...</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>replySphoto2</td><td>String </td><td>...</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>replyBphoto3</td><td>String </td><td>...</td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>replySphoto3</td><td>String </td><td>...</td></tr>";
	
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>seq</td><td>String </td><td>0：评论 1：回复</td></tr>";
	
	resContent_sys_getcomments += "<tr style='height:30px;'><td colspan='3'>回复集(结构见数据实例)：<td></tr>";
	resContent_sys_getcomments += "<tr><td></td><td style='width:150px;'>replys</td><td>Vector </td><td>回复集</td></tr>";
	
		
$.sys_getcomments = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_getcomments+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_getcomments+"</table>";



/******************************评论回复删除***************************/
//请求内容
var	reqContent_sys_commentreplydel = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_commentreplydel += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td style='width:180px;'>评论Id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_commentreplydel += "<tr><td style='width:150px;'>replyId</td><td style='width:120px;'>String</td><td style='width:180px;'>回复Id<span style='color:red;'>(删回复必传)</span></td></tr>";	
	reqContent_sys_commentreplydel += "<tr><td style='width:150px;'>seq</td><td style='width:120px;'>String</td><td style='width:180px;'>1.评论 2.回复<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_commentreplydel += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";	


	
//响应内容
var	resContent_sys_commentreplydel = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
		
$.sys_commentreplydel = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_commentreplydel+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";



/******************************业务审批***************************/
//请求内容
var	reqContent_sys_getdataapprovals = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_getdataapprovals += "<tr><td style='width:150px;'>dataId</td><td style='width:120px;'>String</td><td style='width:180px;'>数据Id<span style='color:red;'>(必传)</span></td></tr>";


//响应内容
var	resContent_sys_getdataapprovals = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";

$.sys_getdataapprovals = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_getdataapprovals+"</table>" +
	"<h3>响应：</h3>"+resLine+"</table>";


/******************************业务时间轴***************************/
//请求内容
var	reqContent_sys_getdatatimershaft = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_getdatatimershaft += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td style='width:180px;'>数据Id<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_getdatatimershaft += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";


//响应内容
var	resContent_sys_getdatatimershaft = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";

$.sys_getdatatimershaft = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_getdatatimershaft+"</table>" +
	"<h3>响应：</h3>"+resLine+"</table>";


/******************************业务邀约状态更正***************************/
//请求内容
var	reqContent_sys_invitestatus = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_invitestatus += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_invitestatus += "<tr><td style='width:150px;'>invites</td><td style='width:120px;'>Vector</td><td>状态更正集<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_invitestatus += "<tr><td></td><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>当前列表数据id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_invitestatus += "<tr><td></td><td style='width:150px;'>activityId</td><td style='width:120px;'>String</td><td>市场活动Id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_invitestatus += "<tr><td></td><td style='width:150px;'>status</td><td style='width:120px;'>String</td><td>状态值<span style='color:red;'>(必传)</span></td></tr>";	


	
//响应内容
var	resContent_sys_invitestatus = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
		
$.sys_invitestatus = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_invitestatus+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";



/******************************业务数据字段历史变更***************************/
//请求内容
var	reqContent_sys_fieldhistory = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_fieldhistory += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td style='width:180px;'>数据ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_sys_fieldhistory = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";

$.sys_fieldhistory = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_fieldhistory+"</table>" +
	"<h3>响应：</h3>"+resLine+"</table>";




/******************************认领打回记录***************************/
//请求内容
var	reqContent_sys_claimbacklist = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_claimbacklist += "<tr><td style='width:150px;'>dataId</td><td style='width:120px;'>String</td><td>数据ID<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_claimbacklist += "<tr><td style='width:150px;'>currentPage</td><td style='width:120px;'>Integer</td><td>当前页</td></tr>";
	reqContent_sys_claimbacklist += "<tr><td style='width:150px;'>limit</td><td style='width:120px;'>Integer</td><td>每页显示条数</td></tr>";
//响应内容
var	resContent_sys_claimbacklist = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_claimbacklist += "<tr><td style='width:150px;'>具体格式见实例</tr>";

$.sys_claimbacklist = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_claimbacklist+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_claimbacklist+"</table>";



/******************************业务新需求列表***************************/
//请求内容
var	reqContent_sys_requirementlist = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_requirementlist += "<tr><td style='width:150px;'>dataId</td><td style='width:120px;'>String</td><td>数据ID<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_requirementlist += "<tr><td style='width:150px;'>currentPage</td><td style='width:120px;'>Integer</td><td>当前页</td></tr>";
	reqContent_sys_requirementlist += "<tr><td style='width:150px;'>limit</td><td style='width:120px;'>Integer</td><td>每页显示条数</td></tr>";
//响应内容
var	resContent_sys_requirementlist = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_requirementlist += "<tr><td style='width:150px;'>具体格式见实例</tr>";

$.sys_requirementlist = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_requirementlist+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_requirementlist+"</table>";


/******************************业务关联模块地址***************************/
//请求内容
var	reqContent_sys_maddresscud = "<tr><td style='width:150px;'>userId</td><td style='width:220px;'>String</td><td style='width:380px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_maddresscud += "<tr><td style='width:150px;'>id</td><td style='width:220px;'>String</td><td>地址本身ID(删除必传)</td></tr>";
	reqContent_sys_maddresscud += "<tr><td style='width:150px;'>dataId</td><td style='width:220px;'>String</td><td>关联数据ID<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_maddresscud += "<tr><td style='width:150px;'>isCUD</td><td style='width:220px;'>String</td><td style='width:380px;'>(传值：add、update、delete)<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_maddresscud += "<tr><td style='width:150px;'>maddresslist</td><td style='width:220px;'>Vector</td><td>新增修改必传</td></tr>";
	reqContent_sys_maddresscud += "<tr><td></td><td style='width:150px;'>uuId</td><td style='width:220px;'>String</td><td>地址本身ID(删除必传)<span style='color:red;'>(修改/删除必传)</span></td></tr>";
	reqContent_sys_maddresscud += "<tr><td></td><td style='width:150px;'>province</td><td style='width:220px;'>String</td><td>省<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_maddresscud += "<tr><td></td><td style='width:150px;'>provinceId</td><td style='width:220px;'>String</td><td>省ID<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_maddresscud += "<tr><td></td><td style='width:150px;'>city</td><td style='width:220px;'>String</td><td>市</td></tr>";
	reqContent_sys_maddresscud += "<tr><td></td><td style='width:150px;'>cityId</td><td style='width:220px;'>String</td><td>市ID</td></tr>";
	reqContent_sys_maddresscud += "<tr><td></td><td style='width:150px;'>district</td><td style='width:220px;'>String</td><td>区、县</td></tr>";
	reqContent_sys_maddresscud += "<tr><td></td><td style='width:150px;'>districtId</td><td style='width:220px;'>String</td><td>区、县ID</td></tr>";
	reqContent_sys_maddresscud += "<tr><td></td><td style='width:150px;'>detail</td><td style='width:220px;'>String</td><td>详情</td></tr>";
	reqContent_sys_maddresscud += "<tr><td></td><td style='width:150px;'>moduleType</td><td style='width:220px;'>String</td><td><a href='#' onclick='showModulePort();return false;'>关联模块标识(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_maddresscud += "<tr><td></td><td style='width:150px;'>defaultStatus</td><td style='width:220px;'>Boolean</td><td>是否设为默认地址(false否;true是)<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_sys_maddresscud = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_maddresscud += "<tr><td style='width:150px;'>具体格式见实例</tr>";

$.sys_maddresscud = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_maddresscud+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_maddresscud+"</table>";



/******************************业务关联模块列表***************************/
//请求内容
var	reqContent_sys_maddresslist = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_maddresslist += "<tr><td style='width:150px;'>relDataId</td><td style='width:120px;'>String</td><td>数据ID<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_maddresslist += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showModulePort();return false;'>关联模块标识(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_sys_maddresslist = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_maddresslist += "<tr><td style='width:150px;'>list</td><td style='width:120px;'>Vector</td><td>结果集 </td></tr>";
	resContent_sys_maddresslist += "<tr><td></td><td style='width:150px;'>uuId</td><td style='width:120px;'>String</td><td>地址本身ID </td></tr>";
	resContent_sys_maddresslist += "<tr><td></td><td style='width:150px;'>dataId</td><td style='width:120px;'>String</td><td>关联数据ID </td></tr>";
	resContent_sys_maddresslist += "<tr><td></td><td style='width:150px;'>province</td><td style='width:120px;'>String</td><td>省 </td></tr>";
	resContent_sys_maddresslist += "<tr><td></td><td style='width:150px;'>provinceId</td><td style='width:120px;'>String</td><td>省ID </td></tr>";
	resContent_sys_maddresslist += "<tr><td></td><td style='width:150px;'>city</td><td style='width:120px;'>String</td><td>市 </td></tr>";
	resContent_sys_maddresslist += "<tr><td></td><td style='width:150px;'>cityId</td><td style='width:120px;'>String</td><td>市ID </td></tr>";
	resContent_sys_maddresslist += "<tr><td></td><td style='width:150px;'>district</td><td style='width:120px;'>Integer</td><td>区、县 </td></tr>";
	resContent_sys_maddresslist += "<tr><td></td><td style='width:150px;'>districtId</td><td style='width:120px;'>Integer</td><td>区、县ID </td></tr>";
	resContent_sys_maddresslist += "<tr><td></td><td style='width:150px;'>detail</td><td style='width:120px;'>String</td><td>详细地址 </td></tr>";
	resContent_sys_maddresslist += "<tr><td></td><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td>模块标识 </td></tr>";
	resContent_sys_maddresslist += "<tr><td></td><td style='width:150px;'>defaultStatus</td><td style='width:120px;'>String</td><td>是否是默认地址(true是，false否)</td></tr>";
	resContent_sys_maddresslist += "<tr><td style='width:150px;'>currentPage</td><td style='width:120px;'>Integer</td><td>当前页数 </td></tr>";
	resContent_sys_maddresslist += "<tr><td style='width:150px;'>limit</td><td style='width:120px;'>Integer</td><td>每页显示条数 </td></tr>";
	resContent_sys_maddresslist += "<tr><td style='width:150px;'>total</td><td style='width:120px;'>Integer</td><td>总条数 </td></tr>";
	resContent_sys_maddresslist += "<tr><td style='width:150px;'>pages</td><td style='width:120px;'>Integer</td><td>总页数 </td></tr>";
	resContent_sys_maddresslist += "<tr><td style='width:150px;'>具体格式见实例</tr>";

$.sys_maddresslist = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_maddresslist+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_maddresslist+"</table>";



/******************************业务关联模块地址省***************************/
//请求内容
var	reqContent_sys_mprodic = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_sys_mprodic = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_mprodic += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>字典ID </td></tr>";
	resContent_sys_mprodic += "<tr><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>字典名 </td></tr>";
	resContent_sys_mprodic += "<tr><td style='width:150px;'>pid</td><td style='width:120px;'>String</td><td>字典父ID </td></tr>";
	resContent_sys_mprodic += "<tr><td style='width:150px;'>level</td><td style='width:120px;'>int</td><td>等级(1省2市3县) </td></tr>";

$.sys_mprodic = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_mprodic+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_mprodic+"</table>";

/******************************业务关联模块地址省***************************/
//请求内容
var	reqContent_sys_mdic = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_mdic += "<tr><td style='width:150px;'>template</td><td style='width:120px;'>String</td><td style='width:180px;'>模板号<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_sys_mdic = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_mdic += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>字典ID </td></tr>";
	resContent_sys_mdic += "<tr><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>字典名 </td></tr>";
	resContent_sys_mdic += "<tr><td style='width:150px;'>pid</td><td style='width:120px;'>String</td><td>字典父ID </td></tr>";
	resContent_sys_mdic += "<tr><td style='width:150px;'>level</td><td style='width:120px;'>int</td><td>等级(1省2市3县) </td></tr>";
	resContent_sys_mdic += "<tr><td style='width:150px;'>具体格式见实例</tr>";
$.sys_mdic = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_mdic+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_mdic+"</table>";



/******************************业务关联模块地址市县***************************/
//请求内容
var	reqContent_sys_mcitydic = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_mcitydic += "<tr><td style='width:150px;'>pid</td><td style='width:120px;'>String</td><td>父ID<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_sys_mcitydic = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_mcitydic += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>字典ID </td></tr>";
	resContent_sys_mcitydic += "<tr><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>字典名 </td></tr>";
	resContent_sys_mcitydic += "<tr><td style='width:150px;'>pid</td><td style='width:120px;'>String</td><td>字典父ID </td></tr>";
	resContent_sys_mcitydic += "<tr><td style='width:150px;'>level</td><td style='width:120px;'>int</td><td>等级(1省2市3县) </td></tr>";
$.sys_mcitydic = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_mcitydic+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_mcitydic+"</table>";


/******************************业务关联模块地址市县***************************/
//请求内容
var	reqContent_sys_maddressconf = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_sys_maddressconf = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_maddressconf += "<tr><td style='width:150px;'>enableLevel</td><td style='width:120px;'>int</td><td>启用级别 </td></tr>";
	resContent_sys_maddressconf += "<tr><td style='width:150px;'>provinceReq</td><td style='width:120px;'>String</td><td>省是否必填 1：是；0：否 </td></tr>";
	resContent_sys_maddressconf += "<tr><td style='width:150px;'>cityReq</td><td style='width:120px;'>String</td><td>市是否必填 1：是；0：否</td></tr>";
	resContent_sys_maddressconf += "<tr><td style='width:150px;'>countyReq</td><td style='width:120px;'>int</td><td>县是否必填 1：是；0：否</td></tr>";
	resContent_sys_maddressconf += "<tr><td style='width:150px;'>detailReq</td><td style='width:120px;'>int</td><td>详细地址是否必填 1：是；0：否</td></tr>";
$.sys_maddressconf = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_maddressconf+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_maddressconf+"</table>";




/******************************业务关联模块默认地址***************************/
//请求内容
var	reqContent_sys_maddressacq = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_maddressacq += "<tr><td style='width:150px;'>relDataId</td><td style='width:120px;'>String</td><td>数据ID<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_maddressacq += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showModulePort();return false;'>关联模块标识(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_sys_maddressacq = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_maddressacq += "<tr><td></td><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>ID </td></tr>";
	resContent_sys_maddressacq += "<tr><td></td><td style='width:150px;'>address</td><td style='width:120px;'>String</td><td>地址 </td></tr>";
	resContent_sys_maddressacq += "<tr><td></td><td style='width:150px;'>isAcquiescent</td><td style='width:120px;'>Integer</td><td>是否默认(0否 1是) </td></tr>";
	resContent_sys_maddressacq += "<tr><td></td><td style='width:150px;'>phone</td><td style='width:120px;'>String</td><td>手机号 </td></tr>";
	resContent_sys_maddressacq += "<tr><td></td><td style='width:150px;'>telePhone</td><td style='width:120px;'>String</td><td>电话号码 </td></tr>";

$.sys_maddressacq = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_maddressacq+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_maddressacq+"</table>";


/******************************业务新需增删改***************************/
//请求内容
var	reqContent_sys_requirementcud = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_requirementcud += "<tr><td style='width:150px;'>isCUD</td><td style='width:120px;'>String</td><td>add;delete;update<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_requirementcud += "<tr><td style='width:150px;'>dataId</td><td style='width:120px;'>String</td><td>关联数据ID<span style='color:red;'>(增改必传)</span></td></tr>";
	reqContent_sys_requirementcud += "<tr><td style='width:150px;'>dataName</td><td style='width:120px;'>String</td><td>关联数据主题<span style='color:red;'>(增改必传)</span></td></tr>";
	reqContent_sys_requirementcud += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showModulePort();return false;'>关联模块标识(点我见详情)</a><span style='color:red;'>(增改必传)</span></td></tr>";
	reqContent_sys_requirementcud += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>新需求自身数据ID<span style='color:red;'>(删改必传)</span></td></tr>";
	reqContent_sys_requirementcud += "<tr><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>需求描述<span style='color:red;'>(增改必传)</span></td></tr>";
	reqContent_sys_requirementcud += "<tr><td style='width:150px;'>status</td><td style='width:120px;'>String</td><td>状态[待处理;处理中;处理完毕]<span style='color:red;'>(增改必传)</span></td></tr>";

//响应内容
var	resContent_sys_requirementcud = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";

$.sys_requirementcud = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_requirementcud+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_requirementcud+"</table>";



	/******************************业务新需增删改***************************/
//请求内容
var	reqContent_sys_requirementinfo = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_requirementinfo += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>新需求自身数据ID<span style='color:red;'>(删改必传)</span></td></tr>";

//响应内容
var	resContent_sys_requirementinfo = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";

	$.sys_requirementinfo = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_requirementinfo+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_requirementinfo+"</table>";




	/******************************主页时间轴查找***************************/
//请求内容
var	reqContent_sys_timershaftbymodule = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_timershaftbymodule += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_timershaftbymodule += "<tr><td style='width:150px;'>day</td><td style='width:120px;'>String</td><td>日期（yyyy-MM-dd）</td></tr>";	
	reqContent_sys_timershaftbymodule += "<tr><td style='width:150px;'>ownerId</td><td style='width:120px;'>String</td><td>所有者</td></tr>";	
//响应内容
var	resContent_sys_timershaftbymodule = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_sys_timershaftbymodule += "<tr><td></td><td style='width:150px;'>type</td><td style='width:120px;'>int</td><td>0 无时间显示，1有时间显示 </td></tr>";	
	resContent_sys_timershaftbymodule += "<tr><td></td><td style='width:150px;'>list</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_sys_timershaftbymodule += "<tr><td></td><td style='width:150px;'>content</td><td style='width:120px;'>String</td><td>内容 </td></tr>";	
	resContent_sys_timershaftbymodule += "<tr><td></td><td style='width:150px;'>subject</td><td style='width:120px;'>String</td><td>标题 </td></tr>";	
	resContent_sys_timershaftbymodule += "<tr><td></td><td style='width:150px;'>day</td><td style='width:120px;'>String</td><td>天（MM-dd） </td></tr>";	
	resContent_sys_timershaftbymodule += "<tr><td></td><td style='width:150px;'>remind</td><td style='width:120px;'>String</td><td>整体时间 </td></tr>";	
	resContent_sys_timershaftbymodule += "<tr><td></td><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td>模块标识 </td></tr>";	
	resContent_sys_timershaftbymodule += "<tr><td></td><td style='width:150px;'>status</td><td style='width:120px;'>String</td><td>状态 </td></tr>";	
	resContent_sys_timershaftbymodule += "<tr><td></td><td style='width:150px;'>time</td><td style='width:120px;'>String</td><td>时分（HH-mm） </td></tr>";	
	resContent_sys_timershaftbymodule += "<tr><td></td><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>待办日程Id（用于点击进详情）</td></tr>";	
	

	resContent_sys_timershaftbymodule += "<tr><td style='width:150px;'>具体格式见实例</tr>";	

$.sys_timershaftbymodule = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_timershaftbymodule+"</table>" +
"<h3>响应：</h3>"+resLine+resContent_sys_timershaftbymodule+"</table>";


/******************************主页时间轴***************************/
//请求内容
var	reqContent_sys_timershaft = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_timershaft += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a></td></tr>";	
	reqContent_sys_timershaft += "<tr><td style='width:150px;'>day</td><td style='width:120px;'>String</td><td>日期（yyyy-MM-dd）</td></tr>";	
	reqContent_sys_timershaft += "<tr><td style='width:150px;'>ownerId</td><td style='width:120px;'>String</td><td>所有者</td></tr>";	

	
	
	
//响应内容
var	resContent_sys_timershaft = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_sys_timershaft += "<tr style='height:30px;'><td colspan='3'>以下是datas中参数信息：<td></tr>";
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>datas</td><td style='width:120px;'>String</td><td>轴上的内容 </td></tr>";	
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>type</td><td style='width:120px;'>int</td><td>0 无时间显示，1有时间显示 </td></tr>";	
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>list</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>content</td><td style='width:120px;'>String</td><td>内容 </td></tr>";	
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>subject</td><td style='width:120px;'>String</td><td>标题 </td></tr>";	
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>day</td><td style='width:120px;'>String</td><td>天（MM-dd） </td></tr>";	
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>remind</td><td style='width:120px;'>String</td><td>整体时间 </td></tr>";	
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>status</td><td style='width:120px;'>String</td><td>状态 </td></tr>";	
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>time</td><td style='width:120px;'>String</td><td>时分（HH-mm） </td></tr>";	
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>待办日程Id（用于点击进详情）</td></tr>";	
	
	resContent_sys_timershaft += "<tr style='height:30px;'><td colspan='3'>以下是timershaDayNum中参数信息：<td></tr>";
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>num</td><td style='width:120px;'>int</td><td>待办事数量 </td></tr>";	
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>day</td><td style='width:120px;'>String</td><td>天（yyyy-MM-dd） </td></tr>";	
	resContent_sys_timershaft += "<tr style='height:30px;'><td colspan='3'>以下是urgency参数信息：<td></tr>";
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>urgency</td><td style='width:120px;'>int</td><td>紧急程度的数量上限 </td></tr>";	
	
	resContent_sys_timershaft += "<tr style='height:30px;'><td colspan='3'>以下是 modules 参数信息：<td></tr>";
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>moduleId</td><td style='width:120px;'>int</td><td>模块Id</td></tr>";	
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>moduleName</td><td style='width:120px;'>int</td><td>模块名称 </td></tr>";	
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>modulePort</td><td style='width:120px;'>int</td><td>模块标识</td></tr>";	
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>moduleUrl</td><td style='width:120px;'>int</td><td>模块URL </td></tr>";	
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>moduleTimerNum</td><td style='width:120px;'>int</td><td>当日待办事数量 </td></tr>";	
	
	
	resContent_sys_timershaft += "<tr style='height:30px;'><td colspan='3'>以下是 主页时间轴三个统计数 参数信息：<td></tr>";
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>signmoney</td><td style='width:120px;'>double</td><td>本月签订额</td></tr>";	
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>goal</td><td style='width:120px;'>int</td><td>本月目标</td></tr>";	
	resContent_sys_timershaft += "<tr><td></td><td style='width:150px;'>retmoney</td><td style='width:120px;'>int</td><td>本月回款</td></tr>";	
	
	
	resContent_sys_timershaft += "<tr style='height:30px;'><td colspan='3'>具体格式见实例：<td></tr>";

$.sys_timershaft = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_timershaft+"</table>" +
"<h3>响应：</h3>"+resLine+resContent_sys_timershaft+"</table>";




/******************************主页时间轴列表查询***************************/
//请求内容
var	reqContent_sys_timershaftlist = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_sys_timershaftlist += "<tr><td style='width:150px;'>searchVal</td><td style='width:120px;'>String</td><td>搜索值</td></tr>";
	reqContent_sys_timershaftlist += "<tr><td style='width:150px;'>day</td><td style='width:120px;'>String</td><td>日期（yyyy-MM-dd）</td></tr>";

	
//响应内容
var	resContent_sys_timershaftlist = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_sys_timershaftlist += "<tr><td></td><td style='width:150px;'>ownerId</td><td style='width:120px;'>String</td><td>所有者Id </td></tr>";	
	resContent_sys_timershaftlist += "<tr><td></td><td style='width:150px;'>ownerName</td><td style='width:120px;'>String</td><td>所有者名称 </td></tr>";	
	resContent_sys_timershaftlist += "<tr><td></td><td style='width:150px;'>content</td><td style='width:120px;'>String</td><td>内容 </td></tr>";	
	resContent_sys_timershaftlist += "<tr><td></td><td style='width:150px;'>dataId</td><td style='width:120px;'>String</td><td>数据Id(用于查看详情) </td></tr>";	
	resContent_sys_timershaftlist += "<tr><td></td><td style='width:150px;'>tableName</td><td style='width:120px;'>String</td><td>模块标识</td></tr>";	
	resContent_sys_timershaftlist += "<tr><td></td><td style='width:150px;'>subject</td><td style='width:120px;'>String</td><td>标题 </td></tr>";	
	resContent_sys_timershaftlist += "<tr><td></td><td style='width:150px;'>remind</td><td style='width:120px;'>String</td><td>时间 </td></tr>";	
	resContent_sys_timershaftlist += "<tr><td></td><td style='width:150px;'>moduleName</td><td style='width:120px;'>String</td><td>模块名称</td></tr>";	
		


$.sys_timershaftlist = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_timershaftlist+"</table>" +
"<h3>响应：</h3>"+resLine+resContent_sys_timershaftlist+"</table>";



	/******************************业务根据联系人ID获取客户***************************/
//请求内容
	var	reqContent_sys_getcusbyconid = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
		reqContent_sys_getcusbyconid += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>联系人ID</td></tr>";


//响应内容
	var	resContent_sys_getcusbyconid = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
		resContent_sys_getcusbyconid += "<tr><td></td><td style='width:150px;'>customerId</td><td style='width:120px;'>String</td><td>客户Id </td></tr>";
		resContent_sys_getcusbyconid += "<tr><td></td><td style='width:150px;'>customerName</td><td style='width:120px;'>String</td><td>客户名称 </td></tr>";

	$.sys_getcusbyconid = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_getcusbyconid+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_sys_getcusbyconid+"</table>";






	/******************************接收坐标***************************/
//请求内容
	var	reqContent_sys_receivecoordinate = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_receivecoordinate += "<tr><td style='width:150px;'>jd</td><td style='width:120px;'>Double</td><td>经度</td></tr>";
	reqContent_sys_receivecoordinate += "<tr><td style='width:150px;'>wd</td><td style='width:120px;'>Double</td><td>纬度</td></tr>";
	reqContent_sys_receivecoordinate += "<tr><td style='width:150px;'>bj</td><td style='width:120px;'>Long</td><td>半径(单位米)</td></tr>";
	reqContent_sys_receivecoordinate += "<tr><td style='width:150px;'>fromUserId</td><td style='width:120px;'>String</td><td>经纬度请求者ID</td></tr>";


//响应内容
	var	resContent_sys_receivecoordinate = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";

	$.sys_receivecoordinate = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_receivecoordinate+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";

/******************************模块排序***************************/
//请求内容
var	reqContent_sys_modulesort = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
reqContent_sys_modulesort += "<tr><td style='width:150px;'>modules</td><td style='width:120px;'>String</td><td>被排序的模块</td></tr>";

//响应内容
var	resContent_sys_modulesort = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";

$.sys_modulesort = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_modulesort+"</table>" +
	"<h3>响应：</h3>"+resLine+"</table>";



	/******************************表单查重***************************/
//请求内容
var	reqContent_sys_formmerge = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_formmerge += "<tr><td style='width:150px;'>fieldName</td><td style='width:120px;'>String</td><td>查重字段名<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_formmerge += "<tr><td style='width:150px;'>fieldVal</td><td style='width:120px;'>String</td><td>查重值<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_formmerge += "<tr><td style='width:150px;'>firstTableName</td><td style='width:120px;'>String</td><td>第一次查重模块名<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_formmerge += "<tr><td style='width:150px;'>showType</td><td style='width:120px;'>String</td><td>查重字段类型<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_formmerge += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td>查重模块名<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_formmerge += "<tr><td style='width:150px;'>mergeFieldIds</td><td style='width:120px;'>Vector</td><td>查重字段对应的ID<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_formmerge += "<tr><td style='width:150px;'>currentPage</td><td style='width:120px;'>int</td><td>页码 默认1</td></tr>";
	reqContent_sys_formmerge += "<tr><td style='width:150px;'>limit</td><td style='width:120px;'>int</td><td>每页显示条数 默认10</td></tr>";
	reqContent_sys_formmerge += "<tr><td style='width:150px;'>isFirst</td><td style='width:120px;'>int</td><td>是否第一次查询 1是 0否 默认为1</td></tr>";

//响应内容
var	resContent_sys_formmerge = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_formmerge += "<tr><td></td><td style='width:150px;'>listdata</td><td style='width:120px;'>String</td><td>列表数据 </td></tr>";
	resContent_sys_formmerge += "<tr><td></td><td style='width:150px;'>firstTableName</td><td style='width:120px;'>String</td><td>第一次查重模块名</td></tr>";
	resContent_sys_formmerge += "<tr><td></td><td style='width:150px;'>showType</td><td style='width:120px;'>String</td><td>查重字段类型</td></tr>";
	resContent_sys_formmerge += "<tr><td></td><td style='width:150px;'>tableInfo</td><td style='width:120px;'>String</td><td>模块信息(只有点击查重按钮时返回) </td></tr>";
	resContent_sys_formmerge += "<tr><td></td><td style='width:150px;'>listFields</td><td style='width:120px;'>Vector</td><td>列表展示字段 </td></tr>";

$.sys_formmerge = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_formmerge+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_formmerge+"</table>";
	/******************************数据详情关联模块***************************/
//请求内容
var	reqContent_sys_modulesreldata = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_modulesreldata += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td>查重模块名<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_modulesreldata += "<tr><td style='width:150px;'>moduleId</td><td style='width:120px;'>String</td><td>模块ID<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_sys_modulesreldata = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_modulesreldata += "<tr><td></td><td style='width:150px;'>listdata</td><td style='width:120px;'>String</td><td>列表数据 </td></tr>";
	resContent_sys_modulesreldata += "<tr><td></td><td style='width:150px;'>firstTableName</td><td style='width:120px;'>String</td><td>第一次查重模块名</td></tr>";
	resContent_sys_modulesreldata += "<tr><td></td><td style='width:150px;'>showType</td><td style='width:120px;'>String</td><td>查重字段类型</td></tr>";
	resContent_sys_modulesreldata += "<tr><td></td><td style='width:150px;'>tableInfo</td><td style='width:120px;'>String</td><td>模块信息(只有点击查重按钮时返回) </td></tr>";
	resContent_sys_modulesreldata += "<tr><td></td><td style='width:150px;'>listFields</td><td style='width:120px;'>Vector</td><td>列表展示字段 </td></tr>";

$.sys_modulesreldata = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_modulesreldata+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_modulesreldata+"</table>";


/******************************表单查唯一***************************/
//请求内容
var	reqContent_sys_formunique = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_formunique += "<tr><td style='width:150px;'>fieldName</td><td style='width:120px;'>String</td><td>唯一性验证字段名<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_formunique += "<tr><td style='width:150px;'>fieldVal</td><td style='width:120px;'>String</td><td>唯一性验证值<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_formunique += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td>唯一性验证模块名<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_sys_formunique += "<tr><td style='width:150px;'>dataId</td><td style='width:120px;'>String</td><td>唯一性验证数据ID(数据本身ID)<span style='color:red;'>(表单编辑时必传)</span></td></tr>";

//响应内容
var	resContent_sys_formunique = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_sys_formunique += "<tr><td></td><td style='width:150px;'>isRepeat</td><td style='width:120px;'>String</td><td>yes 重复;no 无重复</td></tr>";

$.sys_formunique = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_sys_formunique+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_sys_formunique+"</table>";






})(TestInfo);