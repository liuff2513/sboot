var codeAndMessage = "<table><tr><td style='width:150px;height:50px;color:#00F;font-size:20px;'>code</td><td style='width:280px;color:#00F;font-size:20px;'>message</td></tr>";
	codeAndMessage += "<tr><td style='width:150px;'>200</td><td style='width:250px;'>成功</td></tr>";
	codeAndMessage += "<tr><td style='width:150px;'>400</td><td style='width:250px;'>错误请求,详细信息会给予说明</td></tr>";
	codeAndMessage += "<tr><td style='width:150px;'>401</td><td style='width:250px;'>拒绝请求,详细信息会给予说明</td></tr>";
	codeAndMessage += "<tr><td style='width:150px;'>402</td><td style='width:250px;'>请求超限,详细信息会给予说明</td></tr>";
	codeAndMessage += "<tr><td style='width:150px;'>1000</td><td style='width:250px;'>服务器内部错误,详细信息会给予说明</td></tr>";
	codeAndMessage += "<tr><td style='width:150px;'>1001</td><td style='width:250px;'>验证错误,详细信息会给予说明</td></tr>";
	codeAndMessage += "<tr><td style='width:150px;'>1002</td><td style='width:250px;'>参数错误,详细信息会给予说明</td></tr>";
	codeAndMessage += "<tr><td style='width:150px;'>1003</td><td style='width:250px;'>无法找到,详细信息会给予说明</td></tr>";
	codeAndMessage += "</table>";
	
	
var rongyCodeAndMessage = "<table><tr style='height:50px;'><td style='width:150px;color:#00F;font-size:20px;'>code</td><td style='width:250px;color:#00F;font-size:20px;'>描述</td><td style='width:150px;color:#00F;font-size:20px;'>详细解释</td></tr>";
	rongyCodeAndMessage += "<tr><td style='width:150px;'>3000</td><td style='width:250px;'>服务器内部错误,详细信息会给予说明</td></tr>";
	rongyCodeAndMessage += "<tr><td style='width:150px;'>3001</td><td style='width:250px;'>请求超时,详细信息会给予说明</td></tr>";
	rongyCodeAndMessage += "<tr><td style='width:150px;'>3002</td><td style='width:250px;'>接口不存在,详细信息会给予说明</td></tr>";
	rongyCodeAndMessage += "<tr><td style='width:150px;'>3003</td><td style='width:250px;'>无法找到,详细信息会给予说明</td></tr>";
	rongyCodeAndMessage += "</table>";	
	
var rongyMsgType = "<table><tr style='height:50px;'><td style='width:150px;color:#00F;font-size:20px;'>消息</td><td style='width:250px;color:#00F;font-size:20px;'>消息标识</td><td style='width:150px;color:#00F;font-size:20px;'>消息描述</td></tr>";
	rongyMsgType += "<tr style='height:20px;'><td style='width:150px;'>文本消息</td><td style='width:250px;'>TxtMsg</td><td style='width:250px;'></td></tr>";
	rongyMsgType += "<tr style='height:20px;'><td style='width:150px;'>图片消息</td><td style='width:250px;'>ImgMsg</td><td style='width:250px;'></td></tr>";
	rongyMsgType += "<tr style='height:20px;'><td style='width:150px;'>语音消息</td><td style='width:250px;'>VcMsg</td><td style='width:250px;'></td></tr>";
	rongyMsgType += "<tr style='height:20px;'><td style='width:150px;'>图文消息</td><td style='width:250px;'>ImgTextMsg</td><td style='width:250px;'></td></tr>";
	rongyMsgType += "<tr style='height:20px;'><td style='width:150px;'>位置消息</td><td style='width:250px;'>LBSMsg</td><td style='width:250px;'></td></tr>";
	rongyMsgType += "<tr style='height:20px;'><td style='width:150px;'>添加联系人消息</td><td style='width:250px;'>ContactNtf</td><td style='width:250px;'></td></tr>";
	rongyMsgType += "</table>";	

	
var sysMsgType = "<table><tr style='height:50px;'><td style='width:150px;color:#00F;font-size:20px;'>消息</td><td style='width:250px;color:#00F;font-size:20px;'>消息标识</td><td style='width:150px;color:#00F;font-size:20px;'>消息描述</td></tr>";
	sysMsgType += "<tr style='height:20px;'><td style='width:150px;'>公告</td><td style='width:250px;'>AnnMsg</td><td style='width:250px;'>公告版块消息</td></tr>";
	sysMsgType += "<tr style='height:20px;'><td style='width:150px;'>预警</td><td style='width:250px;'>EwsMsg</td><td style='width:250px;'>预警版块消息</td></tr>";
	sysMsgType += "<tr style='height:20px;'><td style='width:150px;'>消息</td><td style='width:250px;'>SysMsg</td><td style='width:250px;'>消息版块消息</td></tr>";
	sysMsgType += "<tr style='height:20px;'><td style='width:150px;'>关注</td><td style='width:250px;'>AttMsg</td><td style='width:250px;'>关注版块消息</td></tr>";
	sysMsgType += "<tr style='height:20px;'><td style='width:150px;'>审批</td><td style='width:250px;'>ExaMsg</td><td style='width:250px;'>审批版块消息</td></tr>";
	sysMsgType += "</table>";	

	