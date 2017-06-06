(function($){

var timestamp = (new Date()).valueOf();

/***************(1)*****************/

//请求 ：列名 请求方法
var reqLine = "<table><tr><td style='width:150px;color:#00F;'>参数名</td><td style='width:120px;color:#00F;'>参数类型</td><td style='color:#00F;'>参数说明</td></tr>";
	reqLine += "<tr><td style='width:150px;'>requestcommand</td><td style='width:120px;'>String</td><td>方法名<span style='color:red;'>(必传)</span></td></tr>";
//请求时间戳
var reqLine1 = "<tr><td style='width:150px;'>requesttime</td><td style='width:120px;'>long</td><td>请求时间戳<span style='color:red;'>(必传)</span></td></tr>";
//响应：列名 请求方法
var resLine = "<table><tr><td style='width:150px;color:#00F;'>字段名</td><td style='width:120px;color:#00F;'>字段类型</td><td style='color:#00F;width:150px;'>字段说明</td></tr>";
	resLine += "<tr><td style='width:150px;'>code</td><td style='width:120px;'>int</td><td><a href='#' onclick='showCode();return false;'>响应代码(点我见详情)</a></td></tr>";
	resLine += "<tr><td style='width:150px;'>message</td><td style='width:120px;'>String</td><td>响应文字描述 </td></tr>";

/******************************获取融云Token***************************/
//请求内容
var	reqContent_rongy_gettoken = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
//响应说明
var resMessage_rongy_gettoken = "<span style='font-size:13px;color:#8E8E8E;'>此接口1秒内限制调用100次，超出100次不再返回data</span>";
//响应内容
var	resContent_rongy_gettoken = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_gettoken += "<tr><td></td><td style='width:150px;'>code</td><td>int </td><td><a href='#' onclick='showRongyCode();return false;'>融云状态码(点我见详情)</a></td></tr>"
	resContent_rongy_gettoken += "<tr><td></td><td style='width:150px;'>userId</td><td>String </td><td>用户Id </td></tr>"
	resContent_rongy_gettoken += "<tr><td></td><td style='width:150px;'>token</td><td>String </td><td>token </td></tr>"
	resContent_rongy_gettoken += "<tr><td></td><td style='width:150px;'>errorMessage</td><td>String</td><td>code非200时返回 </td></tr>"

$.rongy_gettoken = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_rongy_gettoken+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_rongy_gettoken+"</table>";
	
	
/******************************获取通讯录(好友)选择源***************************/
//请求内容
var	reqContent_rongy_getuserlist = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_rongy_getuserlist += "<tr><td style='width:150px;'>friendName</td><td style='width:120px;'>String</td><td>好友的名称(用于搜索)</td></tr>";	
//响应说明
var resMessage_rongy_getuserlist = "<span style='font-size:13px;color:#8E8E8E;'>此接口1秒内限制调用100次，超出100次不再返回data</span>";
//响应内容
var	resContent_rongy_getuserlist = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_getuserlist += "<tr><td></td><td style='width:150px;'>userId</td><td>String </td><td>用户Id </td></tr>"
	resContent_rongy_getuserlist += "<tr><td></td><td style='width:150px;'>name</td><td>String </td><td>用户名称 </td></tr>"
	resContent_rongy_getuserlist += "<tr><td></td><td style='width:150px;'>portraitUri</td><td>String </td><td>用户头像 </td></tr>"
		
$.rongy_getuserlist = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_rongy_getuserlist+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_rongy_getuserlist+"</table>";
		
	
/******************************获取通讯录(好友)列表***************************/
//请求内容
var	reqContent_rongy_getuserfriendlist = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_rongy_getuserfriendlist += "<tr><td style='width:150px;'>friendName</td><td style='width:120px;'>String</td><td>好友的名称(用于搜索)</td></tr>";	
//响应说明
var resMessage_rongy_getuserfriendlist = "<span style='font-size:13px;color:#8E8E8E;'>此接口1秒内限制调用100次，超出100次不再返回data</span>";
//响应内容
var	resContent_rongy_getuserfriendlist = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_getuserfriendlist += "<tr><td></td><td style='width:150px;'>userId</td><td>String </td><td>用户Id </td></tr>"
	resContent_rongy_getuserfriendlist += "<tr><td></td><td style='width:150px;'>name</td><td>String </td><td>用户名称 </td></tr>"
	resContent_rongy_getuserfriendlist += "<tr><td></td><td style='width:150px;'>portraitUri</td><td>String </td><td>用户头像 </td></tr>"
			

$.rongy_getuserfriendlist = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_rongy_getuserfriendlist+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_rongy_getuserfriendlist+"</table>";
		
	
	
/******************************添加好友(通讯录)员***************************/
//请求说明
var reqMessage_rongy_useraddfriend = "<span style='font-size:13px;color:#8E8E8E;'>同一个用户好友上限2000人</span>";
//请求内容
var	reqContent_rongy_useraddfriend = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>当前登录用户ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_rongy_useraddfriend += "<tr><td style='width:150px;'>friendId</td><td style='width:120px;'>String</td><td>要添加的好友ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
//响应说明
var resMessage_rongy_useraddfriend = "<span style='font-size:13px;color:#8E8E8E;'>此接口1秒内限制调用100次，超出100次不再返回data</span>";
//响应内容
var	resContent_rongy_useraddfriend = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_useraddfriend += "<tr><td></td><td style='width:150px;'>userId</td><td>String </td><td>添加好友成功，返回的好友userId </td></tr>"

$.rongy_useraddfriend = "<h3>请求：</h3>"+reqMessage_rongy_useraddfriend+reqLine+reqLine1+reqContent_rongy_useraddfriend+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_rongy_useraddfriend+"</table>";
		
	
/******************************拒绝添加好友(通讯录)员***************************/
	
//请求说明
var reqMessage_rongy_userrefusefriend = "<span style='font-size:13px;color:#8E8E8E;'></span>";
//请求内容
var	reqContent_rongy_userrefusefriend = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>当前登录用户ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_rongy_userrefusefriend += "<tr><td style='width:150px;'>friendId</td><td style='width:120px;'>String</td><td>要拒绝添加的好友ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
//响应说明
var resMessage_rongy_userrefusefriend = "<span style='font-size:13px;color:#8E8E8E;'>此接口1秒内限制调用100次，超出100次不再返回data</span>";
//响应内容
var	resContent_rongy_userrefusefriend = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_userrefusefriend += "<tr><td></td><td style='width:150px;'>userId</td><td>String </td><td>拒绝添加好友成功，返回的好友userId </td></tr>"

$.rongy_userrefusefriend = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_rongy_userrefusefriend+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_rongy_userrefusefriend+"</table>";
	
	
	
/******************************删除好友(通讯录)员***************************/
//请求说明
var reqMessage_rongy_userdeletefriend = "<span style='font-size:13px;color:#8E8E8E;'>删除好友，将会同时将您从对方的好友列表中删除</span>";
//请求内容
var	reqContent_rongy_userdeletefriend = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>当前登录用户ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_rongy_userdeletefriend += "<tr><td style='width:150px;'>friendId</td><td style='width:120px;'>String</td><td>要删除的好友ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
//响应说明
var resMessage_rongy_userdeletefriend = "<span style='font-size:13px;color:#8E8E8E;'>此接口1秒内限制调用100次，超出100次不再返回data</span>";
//响应内容
var	resContent_rongy_userdeletefriend = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_userdeletefriend += "<tr><td></td><td style='width:150px;'>userId</td><td>String </td><td>删除好友成功，返回的好友userId </td></tr>"

$.rongy_userdeletefriend = "<h3>请求：</h3>"+reqMessage_rongy_userdeletefriend+reqLine+reqLine1+reqContent_rongy_userdeletefriend+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_rongy_userdeletefriend+"</table>";
		
		
	
/******************************获取新朋友通知记录***************************/
//请求说明
var reqMessage_rongy_usernewfriendmsg = "<span style='font-size:13px;color:#8E8E8E;'></span>";
//请求内容
var	reqContent_rongy_usernewfriendmsg = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>当前登录用户ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
//响应说明
var resMessage_rongy_usernewfriendmsg = "<span style='font-size:13px;color:#8E8E8E;'>此接口1秒内限制调用100次，超出100次不再返回data</span>";
//响应内容
var	resContent_rongy_usernewfriendmsg = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_usernewfriendmsg += "<tr><td></td><td style='width:150px;'>userId</td><td>String </td><td>新的朋友id </td></tr>"
	resContent_rongy_usernewfriendmsg += "<tr><td></td><td style='width:150px;'>name</td><td>String </td><td>新的朋友名称 </td></tr>"
	resContent_rongy_usernewfriendmsg += "<tr><td></td><td style='width:150px;'>portraitUri</td><td>String </td><td>新的朋友头像URI</td></tr>"
	resContent_rongy_usernewfriendmsg += "<tr><td></td><td style='width:150px;'>type</td><td>int </td><td> <a href='#' onclick='showRongyConstant();return false;'>类型状态(点我见详情)</a></td></tr>"

$.rongy_usernewfriendmsg = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_rongy_usernewfriendmsg+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_rongy_usernewfriendmsg+"</table>";
	
	
	
	
/******************************刷新用户信息***************************/
//请求内容
var	reqContent_rongy_userrefresh = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
//响应说明
var resMessage_rongy_userrefresh = "<span style='font-size:13px;color:#8E8E8E;'>此接口1秒内限制调用100次，超出100次不再返回data</span>";
//响应内容
var	resContent_rongy_userrefresh = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_userrefresh += "<tr><td></td><td style='width:150px;'>code</td><td>int </td><td><a href='#' onclick='showRongyCode();return false;'>融云状态码(点我见详情)</a></td></tr>"
	resContent_rongy_userrefresh += "<tr><td></td><td style='width:150px;'>errorMessage</td><td>String</td><td>code非200时返回 </td></tr>"

$.rongy_userrefresh = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_rongy_userrefresh+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_rongy_userrefresh+"</table>";
	

/******************************检查用户在线状态***************************/
//请求内容
var	reqContent_rongy_usercheckonline = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
//响应说明
var resMessage_rongy_usercheckonline = "<span style='font-size:13px;color:#8E8E8E;'>每秒钟限 100 次</span>";
//响应内容
var	resContent_rongy_usercheckonline = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_usercheckonline += "<tr><td></td><td style='width:150px;'>code</td><td>int </td><td><a href='#' onclick='showRongyCode();return false;'>融云状态码(点我见详情)</a></td></tr>"
	resContent_rongy_usercheckonline += "<tr><td></td><td style='width:150px;'>status</td><td>String </td><td>在线状态，1为在线，0为不在线 </td></tr>"
	resContent_rongy_usercheckonline += "<tr><td></td><td style='width:150px;'>errorMessage</td><td>String</td><td>code非200时返回 </td></tr>"

$.rongy_usercheckonline = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_rongy_usercheckonline+"</table>" +
"<h3>响应：</h3>"+resLine+resContent_rongy_usercheckonline+"</table>"+resMessage_rongy_usercheckonline;
	
	
	
/*****************(4)**********************/	
	
/***********发送单聊消息*************/	
//请求说明
var reqMessage_rongy_mespripsh = "<span style='font-size:13px;color:#8E8E8E;'>每分钟最多向 6000 人发送信息，每次发送用户上限为 1000 人</span>";

//请求内容
var	reqContent_rongy_mespripsh = "<tr><td style='width:150px;'>fromUserId</td><td style='width:120px;'>String</td><td>发送人用户 Id,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_rongy_mespripsh += "<tr><td style='width:150px;'>toUserId</td><td style='width:120px;'>Vector</td><td>接收用户 Id 字符串集,每个Id最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_rongy_mespripsh += "<tr><td style='width:150px;'>content</td><td style='width:120px;'>String</td><td>消息内容<span style='color:red;'>(必传)</span></td></tr>";
	
//响应说明
var resMessage_rongy_mespripsh = "<span style='font-size:13px;color:#8E8E8E;'>每分钟最多向 6000 人发送信息，每次发送用户上限为 1000 人</span>";

//响应内容
var	resContent_rongy_mespripsh = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_mespripsh += "<tr><td></td><td style='width:150px;'>code</td><td>int </td><td><a href='#' onclick='showRongyCode();return false;'>融云状态码(点我见详情)</a></td></tr>"
	resContent_rongy_mespripsh += "<tr><td></td><td style='width:150px;'>errorMessage</td><td>String</td><td>code非200时返回 </td></tr>"

	
	
$.rongy_mespripsh = "<h3>请求：</h3>"+reqMessage_rongy_mespripsh+reqLine+reqLine1+reqContent_rongy_mespripsh+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_rongy_mespripsh+"</table>";
	
	
	
/***********发送系统消息************/
//请求说明
var reqMessage_rongy_messyspsh = "<span style='font-size:13px;color:#8E8E8E;'>每秒钟限100次，如果是添加联系人类型消息，添加多个需循环调用此接口 toUserId只放一个Id</span>";

//请求内容
var	reqContent_rongy_messyspsh = "<tr><td style='width:150px;'>fromUserId</td><td style='width:120px;'>String</td><td>发送人用户 Id,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_rongy_messyspsh += "<tr><td style='width:150px;'>toUserId</td><td style='width:120px;'>Vector</td><td>接收用户 Id 字符串集,每个Id最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_rongy_messyspsh += "<tr><td style='width:150px;'>content</td><td style='width:120px;'>String</td><td>消息内容<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_rongy_messyspsh += "<tr><td style='width:150px;'>msgType</td><td style='width:120px;'>String</td><td><a href='#' onclick='showRongyMesType();return false;'>消息类型(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";
	reqContent_rongy_messyspsh += "<tr><td style='width:150px;'>pushType</td><td style='width:120px;'>int</td><td><a href='#' onclick='showSysConstant(1);return false;'>发送对象类型(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";
	
	reqContent_rongy_messyspsh += "<tr><td style='width:150px;'>pushContent</td><td style='width:120px;'>String</td><td>推送通知内容</td></tr>";
	reqContent_rongy_messyspsh += "<tr><td style='width:150px;'>operation</td><td style='width:120px;'>String</td><td>操作名 (添加联系人、资料通知类型消息必传此参)</td></tr>";
	reqContent_rongy_messyspsh += "<tr><td style='width:150px;'>extra</td><td style='width:120px;'>String</td><td>附加信息</td></tr>";
	
//响应说明
var resMessage_rongy_messyspsh = "<span style='font-size:13px;color:#8E8E8E;'>每分钟最多向 6000 人发送信息，每次发送用户上限为 1000 人</span>";

//响应内容
var	resContent_rongy_messyspsh = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_messyspsh += "<tr><td></td><td style='width:150px;'>code</td><td>int </td><td><a href='#' onclick='showRongyCode();return false;'>融云状态码(点我见详情)</a></td></tr>"
	resContent_rongy_messyspsh += "<tr><td></td><td style='width:150px;'>errorMessage</td><td>String</td><td>code非200时返回 </td></tr>"
	
	
$.rongy_messyspsh = "<h3>请求：</h3>"+reqMessage_rongy_messyspsh+reqLine+reqLine1+reqContent_rongy_messyspsh+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_rongy_messyspsh+"</table>";
	
	
/***********发送自定义系统消息************/
//请求说明
var reqMessage_rongy_cusmessyspsh = "<span style='font-size:13px;color:#8E8E8E;'>每秒钟限100次，如果是添加联系人类型消息，添加多个需循环调用此接口 toUserId只放一个Id</span>";

//请求内容
var	reqContent_rongy_cusmessyspsh = "<tr><td style='width:150px;'>fromUserId</td><td style='width:120px;'>String</td><td>发送人用户 Id,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_rongy_cusmessyspsh += "<tr><td style='width:150px;'>toUserId</td><td style='width:120px;'>Vector</td><td>接收用户 Id 字符串集,每个Id最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_rongy_cusmessyspsh += "<tr><td style='width:150px;'>content</td><td style='width:120px;'>String</td><td>消息内容<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_rongy_cusmessyspsh += "<tr><td></td><td style='width:150px;'>type</td><td style='width:120px;'>String</td><td><a href='#' onclick='showsysMesType();return false;'>消息类型(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";
	reqContent_rongy_cusmessyspsh += "<tr><td></td><td style='width:150px;'>typeContent</td><td style='width:120px;'>String</td><td>消息内容<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_rongy_cusmessyspsh += "<tr><td></td><td style='width:150px;'>typeTitle</td><td style='width:120px;'>String</td><td>必填<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_rongy_cusmessyspsh += "<tr><td style='width:150px;'>pushType</td><td style='width:120px;'>int</td><td><a href='#' onclick='showSysConstant(1);return false;'>发送对象类型(点我见详情)</a><span style='color:red;'>(必传)</span></td></tr>";
		
	reqContent_rongy_cusmessyspsh += "<tr><td style='width:150px;'>pushContent</td><td style='width:120px;'>String</td><td>推送通知内容</td></tr>";
	reqContent_rongy_cusmessyspsh += "<tr><td style='width:150px;'>operation</td><td style='width:120px;'>String</td><td>操作名 (添加联系人、资料通知类型消息必传此参)</td></tr>";
	reqContent_rongy_cusmessyspsh += "<tr><td style='width:150px;'>extra</td><td style='width:120px;'>String</td><td>附加信息</td></tr>";
		
//响应说明
var resMessage_rongy_cusmessyspsh = "<span style='font-size:13px;color:#8E8E8E;'>每分钟最多向 6000 人发送信息，每次发送用户上限为 1000 人</span>";

//响应内容
var	resContent_rongy_cusmessyspsh = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_cusmessyspsh += "<tr><td></td><td style='width:150px;'>code</td><td>int </td><td><a href='#' onclick='showRongyCode();return false;'>融云状态码(点我见详情)</a></td></tr>"
	resContent_rongy_cusmessyspsh += "<tr><td></td><td style='width:150px;'>errorMessage</td><td>String</td><td>code非200时返回 </td></tr>"
	
	
$.rongy_cusmessyspsh = "<h3>请求：</h3>"+reqMessage_rongy_cusmessyspsh+reqLine+reqLine1+reqContent_rongy_cusmessyspsh+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_rongy_cusmessyspsh+"</table>";

	
	
	
/************发送聊天室消息************/
//请求说明
var reqMessage_rongy_meschatroompsh = "<span style='font-size:13px;color:#8E8E8E;'>每秒钟限100次</span>";

//请求内容
var	reqContent_rongy_meschatroompsh = "<tr><td style='width:150px;'>fromUserId</td><td style='width:120px;'>String</td><td>发送人用户 Id,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_rongy_meschatroompsh += "<tr><td style='width:150px;'>toChatroomId</td><td style='width:120px;'>Vector</td><td>聊天室Id 字符串集,每个Id最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_rongy_meschatroompsh += "<tr><td style='width:150px;'>content</td><td style='width:120px;'>String</td><td>消息内容<span style='color:red;'>(必传)</span></td></tr>";
	
//响应说明
var resMessage_rongy_meschatroompsh = "<span style='font-size:13px;color:#8E8E8E;'>每分钟最多向 6000 人发送信息，每次发送用户上限为 1000 人</span>";

//响应内容
var	resContent_rongy_meschatroompsh = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_meschatroompsh += "<tr><td></td><td style='width:150px;'>code</td><td>int </td><td><a href='#' onclick='showRongyCode();return false;'>融云状态码(点我见详情)</a></td></tr>"
	resContent_rongy_meschatroompsh += "<tr><td></td><td style='width:150px;'>errorMessage</td><td>String</td><td>code非200时返回 </td></tr>"
	
	
$.rongy_meschatroompsh = "<h3>请求：</h3>"+reqMessage_rongy_meschatroompsh+reqLine+reqLine1+reqContent_rongy_meschatroompsh+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_rongy_meschatroompsh+"</table>";
	
	
	

/*****************(9)**********************/	
	
/***********创建聊天室*************/
	
//请求说明
var reqMessage_rongy_chatroomcreate = "<span style='font-size:13px;color:#8E8E8E;'>每秒钟限100次</span>";

//请求内容
var	reqContent_rongy_chatroomcreate = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录人Id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_rongy_chatroomcreate += "<tr><td style='width:150px;'>names</td><td style='width:120px;'>Vector</td><td>聊天室名称集合(每个名称最大长度128字节)<span style='color:red;'>(必传)</span></td></tr>";
	
//响应说明
var resMessage_rongy_chatroomcreate = "<span style='font-size:13px;color:#8E8E8E;'>每分钟最多向 6000 人发送信息，每次发送用户上限为 1000 人</span>";

//响应内容
var	resContent_rongy_chatroomcreate = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_chatroomcreate += "<tr><td></td><td style='width:150px;'>code</td><td>int </td><td><a href='#' onclick='showRongyCode();return false;'>融云状态码(点我见详情)</a></td></tr>"
	resContent_rongy_chatroomcreate += "<tr><td></td><td style='width:150px;'>errorMessage</td><td>String</td><td>code非200时返回 </td></tr>"
	
	
$.rongy_chatroomcreate = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_rongy_chatroomcreate+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_rongy_chatroomcreate+"</table>";
	
	
	
	
/******************************销毁聊天室*****************************/
	
//请求说明
var reqMessage_rongy_chatroomdestroy = "<span style='font-size:13px;color:#8E8E8E;'>每秒钟限100次</span>";

//请求内容
var	reqContent_rongy_chatroomdestroy = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录人Id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_rongy_chatroomdestroy += "<tr><td style='width:150px;'>chatroomIds</td><td style='width:120px;'>Vector</td><td>聊天室Id集合(每个ID最大长度32字节)<span style='color:red;'>(必传)</span></td></tr>";
	
//响应说明
var resMessage_rongy_chatroomdestroy = "<span style='font-size:13px;color:#8E8E8E;'>每分钟最多向 6000 人发送信息，每次发送用户上限为 1000 人</span>";

//响应内容
var	resContent_rongy_chatroomdestroy = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_chatroomdestroy += "<tr><td></td><td style='width:150px;'>code</td><td>int </td><td><a href='#' onclick='showRongyCode();return false;'>融云状态码(点我见详情)</a></td></tr>"
	resContent_rongy_chatroomdestroy += "<tr><td></td><td style='width:150px;'>errorMessage</td><td>String</td><td>code非200时返回 </td></tr>"
	
	
$.rongy_chatroomdestroy = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_rongy_chatroomdestroy+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_rongy_chatroomdestroy+"</table>";
	
	
	
/******************************查询聊天室*****************************/
//请求说明
var reqMessage_rongy_chatroomquery = "<span style='font-size:13px;color:#8E8E8E;'>每秒钟限100次</span>";

//请求内容
var	reqContent_rongy_chatroomquery = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录人Id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_rongy_chatroomquery += "<tr><td style='width:150px;'>chatroomIds</td><td style='width:120px;'>Vector</td><td>聊天室Id集合(每个ID最大长度32字节)<span style='color:red;'>(必传)</span></td></tr>";
	
	
//响应说明
var resMessage_rongy_chatroomquery = "<span style='font-size:13px;color:#8E8E8E;'>每分钟最多向 6000 人发送信息，每次发送用户上限为 1000 人</span>";

//响应内容
var	resContent_rongy_chatroomquery = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_chatroomquery += "<tr><td></td><td style='width:150px;'>code</td><td>int </td><td><a href='#' onclick='showRongyCode();return false;'>融云状态码(点我见详情)</a></td></tr>";
	resContent_rongy_chatroomquery += "<tr><td></td><td style='width:150px;'>errorMessage</td><td>String</td><td>code非200时返回 </td></tr>";
	resContent_rongy_chatroomquery += "<tr><td></td><td style='width:150px;'>chatRooms</td><td>Vector</td><td>聊天室信息集 </td></tr>";
	resContent_rongy_chatroomquery += "<tr><td></td><td></td><td style='width:150px;'>chrmId</td><td>String</td><td>聊天室Id</td></tr>";
	resContent_rongy_chatroomquery += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String</td><td>聊天室名称</td></tr>";
	resContent_rongy_chatroomquery += "<tr><td></td><td></td><td style='width:150px;'>time</td><td>String</td><td>聊天室创建时间</td></tr>";
	
	
$.rongy_chatroomquery = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_rongy_chatroomquery+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_rongy_chatroomquery+"</table>";
	
	
	
	
/******************************查询聊天室内用户信息*****************************/
//请求说明
var reqMessage_rongy_chatroomuserquery = "<span style='font-size:13px;color:#8E8E8E;'>每秒钟限100次</span>";

//请求内容
var	reqContent_rongy_chatroomuserquery = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录人Id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_rongy_chatroomuserquery += "<tr><td style='width:150px;'>chatroomId</td><td style='width:120px;'>String</td><td>聊天室Id<span style='color:red;'>(必传)</span></td></tr>";
	
	
//响应说明
var resMessage_rongy_chatroomuserquery = "<span style='font-size:13px;color:#8E8E8E;'>每分钟最多向 6000 人发送信息，每次发送用户上限为 1000 人</span>";

//响应内容
var	resContent_rongy_chatroomuserquery = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_rongy_chatroomuserquery += "<tr><td></td><td style='width:150px;'>code</td><td>int </td><td><a href='#' onclick='showRongyCode();return false;'>融云状态码(点我见详情)</a></td></tr>";
	resContent_rongy_chatroomuserquery += "<tr><td></td><td style='width:150px;'>errorMessage</td><td>String</td><td>code非200时返回 </td></tr>";
	resContent_rongy_chatroomuserquery += "<tr><td></td><td style='width:150px;'>users</td><td>Vector </td><td>用户信息</td></tr>";
	resContent_rongy_chatroomuserquery += "<tr><td></td><td></td><td style='width:150px;'>id</td><td>String </td><td>用户ID</td></tr>";
	resContent_rongy_chatroomuserquery += "<tr><td></td><td></td><td style='width:150px;'>time</td><td>String </td><td>加入时间</td></tr>";
	
	
$.rongy_chatroomuserquery = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_rongy_chatroomuserquery+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_rongy_chatroomuserquery+"</table>";
	
	
	
	
})(TestInfo);