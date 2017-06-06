(function($){


//请求 ：列名 请求方法
	var reqLine = "<table><tr><td style='width:150px;color:#00F;'>参数名</td><td style='width:120px;color:#00F;'>参数类型</td><td style='color:#00F;'>参数说明</td></tr>";
	reqLine += "<tr><td style='width:150px;'>requestcommand</td><td style='width:120px;'>String</td><td>方法名<span style='color:red;'>(必传)</span></td></tr>";
//请求时间戳
	var reqLine1 = "<tr><td style='width:150px;'>requesttime</td><td style='width:120px;'>long</td><td>请求时间戳<span style='color:red;'>(必传)</span></td></tr>";
//响应：列名 请求方法
	var resLine = "<table><tr><td style='width:150px;color:#00F;'>字段名</td><td style='width:120px;color:#00F;'>字段类型</td><td style='color:#00F;width:150px;'>字段说明</td></tr>";
	resLine += "<tr><td style='width:150px;'>code</td><td style='width:120px;'>int</td><td><a href='#' onclick='showCode();return false;'>响应代码(点我见详情)</a></td></tr>";
	resLine += "<tr><td style='width:150px;'>message</td><td style='width:120px;'>String</td><td>响应文字描述 </td></tr>";

/******************************已同步列表***************************/
//请求内容
	var	reqContent_chars_list = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
	var	resContent_chars_list = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_chars_list += "<tr><td></td><td style='width:150px;'>chartFlipId</td><td>String</td><td>图表ID(用于访问图表)</td></tr>";
	resContent_chars_list += "<tr><td></td><td style='width:150px;'>id</td><td>String</td><td>数据主键ID</td></tr>";
	resContent_chars_list += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>图表名称</td></tr>";
	resContent_chars_list += "<tr><td></td><td style='width:150px;'>path</td><td>String</td><td>图表路径</td></tr>";
	resContent_chars_list += "<tr><td></td><td style='width:150px;'>iconPath</td><td>String</td><td>图表图标路径</td></tr>";

	$.chars_synlist = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_chars_list+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_chars_list+"</table>";


/******************************未同步查询列表***************************/
//请求内容
var	reqContent_chars_searchlist = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_chars_searchlist += "<tr><td style='width:150px;'>searchVal</td><td style='width:120px;'>String</td><td>查询词<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_chars_searchlist = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_chars_searchlist += "<tr><td></td><td style='width:150px;'>flipId</td><td>String</td><td>仪表盘ID</td></tr>";
	resContent_chars_searchlist += "<tr><td></td><td style='width:150px;'>dashboardId</td><td>String</td><td>文件夹ID</td></tr>";
	resContent_chars_searchlist += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>图表名</td></tr>";

	$.chars_searchlist = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_chars_searchlist+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_chars_searchlist+"</table>";



/******************************取消同步***************************/
//请求内容
var	reqContent_chars_cancelsyn = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_chars_cancelsyn += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>图表ID<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_chars_cancelsyn = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";

	$.chars_cancelsyn = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_chars_cancelsyn+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_chars_cancelsyn+"</table>";



/******************************同步***************************/
//请求内容
var	reqContent_chars_syn = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_chars_syn += "<tr><td style='width:150px;'>flipId</td><td style='width:120px;'>String</td><td>仪表盘ID<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_chars_syn += "<tr><td style='width:150px;'>dashboardId</td><td style='width:120px;'>String</td><td>文件夹ID<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_chars_syn = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";

	$.chars_syn = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_chars_syn+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_chars_syn+"</table>";



})(TestInfo);