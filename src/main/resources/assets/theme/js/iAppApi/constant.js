var rongyConstant = "<table><tr style='height:50px;'><td style='width:150px;color:#00F;font-size:20px;'>常量标识</td><td style='width:250px;color:#00F;font-size:20px;'>描述</td></tr>";
	rongyConstant += "<tr style='height:20px;'><td style='width:150px;'>0</td><td style='width:250px;'>好友关系</td></tr>";
	rongyConstant += "<tr style='height:20px;'><td style='width:150px;'>1</td><td style='width:250px;'>已添加</td></tr>";
	rongyConstant += "<tr style='height:20px;'><td style='width:150px;'>2</td><td style='width:250px;'>请求添加</td></tr>";
	rongyConstant += "<tr style='height:20px;'><td style='width:150px;'>3</td><td style='width:250px;'>等待确认添加</td></tr>";
	rongyConstant += "<tr style='height:20px;'><td style='width:150px;'>4</td><td style='width:250px;'>已拒绝</td></tr>";
	rongyConstant += "<tr style='height:20px;'><td style='width:150px;'>5</td><td style='width:250px;'>被拒绝</td></tr>";
	
	
	rongyConstant += "</table>";	
	
	
var sendObjTypeConstant = "<table><tr style='height:50px;'><td style='width:150px;color:#00F;font-size:20px;'>常量标识</td><td style='width:250px;color:#00F;font-size:20px;'>描述</td></tr>";
	sendObjTypeConstant += "<tr style='height:20px;'><td style='width:150px;'>0</td><td style='width:250px;'>组织</td></tr>";
	sendObjTypeConstant += "<tr style='height:20px;'><td style='width:150px;'>1</td><td style='width:250px;'>组</td></tr>";
	sendObjTypeConstant += "<tr style='height:20px;'><td style='width:150px;'>2</td><td style='width:250px;'>用户</td></tr>";
	
	sendObjTypeConstant += "</table>";

var PCodeType = "<table><tr style='height:50px;'><td style='width:150px;color:#00F;font-size:20px;'>常量标识</td><td style='width:250px;color:#00F;font-size:20px;'>描述</td></tr>";
	PCodeType += "<tr style='height:20px;'><td style='width:150px;'>RTP</td><td style='width:250px;'>注册</td></tr>";
	PCodeType += "<tr style='height:20px;'><td style='width:150px;'>FTP</td><td style='width:250px;'>忘记密码</td></tr>";
	PCodeType += "<tr style='height:20px;'><td style='width:150px;'>BDP</td><td style='width:250px;'>绑定邮箱/手机</td></tr>";

	PCodeType += "</table>";


var ListTemplateType = "<table><tr style='height:50px;'><td style='width:150px;color:#00F;font-size:20px;'>功能说明</td><td style='width:250px;color:#00F;font-size:20px;'>功能类型</td><td style='width:150px;color:#00F;font-size:20px;'>描述</td></tr>";
	ListTemplateType += "<tr style='height:20px;'><td style='width:150px;'>无操作项目</td><td style='width:250px;'>none</td><td style='width:250px;'>无操作功能按钮</td></tr>";
	ListTemplateType += "<tr style='height:20px;'><td style='width:150px;'>系统功能项目</td><td style='width:250px;'>system</td><td style='width:250px;'>调用本地系统功能，默认打电话、发短信</td></tr>";
	ListTemplateType += "<tr style='height:20px;'><td style='width:150px;'>服务器功能项目</td><td style='width:250px;'>service</td><td style='width:250px;'>调用服务器接口</td></tr>";
	ListTemplateType += "<tr style='height:20px;'><td style='width:150px;'>下拉选项</td><td style='width:250px;'>select</td><td style='width:250px;'>select选项模型</td></tr>";
	ListTemplateType += "</table>";	
	
	
var FormTemplateType = "<table><tr style='height:50px;'><td style='width:150px;color:#00F;font-size:20px;'>功能说明</td><td style='width:250px;color:#00F;font-size:20px;'>功能类型</td><td style='width:150px;color:#00F;font-size:20px;'>描述</td></tr>";
	FormTemplateType += "<tr style='height:20px;'><td style='width:150px;'>字段类型布局</td><td style='width:250px;'>field</td><td style='width:250px;'></td></tr>";
	FormTemplateType += "<tr style='height:20px;'><td style='width:150px;'>表格类型布局</td><td style='width:250px;'>tableField</td><td style='width:250px;'></td></tr>";
	FormTemplateType += "</table>";	
	
	
var ModulePort = "<table><tr style='height:50px;'><td style='width:150px;color:#00F;font-size:20px;'>功能说明</td><td style='width:250px;color:#00F;font-size:20px;'>功能类型</td><td style='width:150px;color:#00F;font-size:20px;'>描述</td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>客户池模块</td><td style='width:250px;'>bh_customer_pool</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>客户模块</td><td style='width:250px;'>bh_customer</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>线索池模块</td><td style='width:250px;'>bh_clue_pool</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>线索模块</td><td style='width:250px;'>bh_clue</td><td style='width:250px;'></td></tr>";
	
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>市场活动模块</td><td style='width:250px;'>bh_activity</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>联系人模块</td><td style='width:250px;'>bh_contact</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>销售机会模块</td><td style='width:250px;'>bh_opportunity</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>拜访模块</td><td style='width:250px;'>bh_visit</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>合同模块</td><td style='width:250px;'>bh_contract</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>回款</td><td style='width:250px;'>bh_payment</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>上门服务</td><td style='width:250px;'>bh_outdoor</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>投诉</td><td style='width:250px;'>bh_complaint</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>竞争对手</td><td style='width:250px;'>bh_competitor</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>沟通记录</td><td style='width:250px;'>bh_communication</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>关注</td><td style='width:250px;'>bh_qixin_attention</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>产品</td><td style='width:250px;'>bh_product</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>问答</td><td style='width:250px;'>bh_question_answer</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>回访</td><td style='width:250px;'>bh_callback</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>工作报告</td><td style='width:250px;'>bh_report</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>任务</td><td style='width:250px;'>bh_assignment</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>请求支援</td><td style='width:250px;'>bh_assistance</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>自定义模块1</td><td style='width:250px;'>bh_custom_module_1</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>...</td><td style='width:250px;'>...</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>自定义模块10</td><td style='width:250px;'>bh_custom_module_10</td><td style='width:250px;'></td></tr>";
	ModulePort += "<tr style='height:20px;'><td style='width:150px;'>..</td><td style='width:250px;'>...</td><td style='width:250px;'></td></tr>";
	ModulePort += "</table>";	
	
var listFun = "<table><tr style='height:50px;'><td style='width:150px;color:#00F;font-size:20px;'>功能说明</td><td style='width:250px;color:#00F;font-size:20px;'>功能类型</td><td style='width:150px;color:#00F;font-size:20px;'>描述</td></tr>";
	listFun += "<tr style='height:20px;'><td style='width:150px;'>新建</td><td style='width:250px;'>custpool_add</td><td style='width:250px;'></td></tr>";
	listFun += "<tr style='height:20px;'><td style='width:150px;'>名片扫描</td><td style='width:250px;'>custpool_bcard</td><td style='width:250px;'></td></tr>";
	listFun += "<tr style='height:20px;'><td style='width:150px;'>电话本导入</td><td style='width:250px;'>custpool_pntolead</td><td style='width:250px;'></td></tr>";
	listFun += "</table>";
	
var formFun = "<table><tr style='height:50px;'><td style='width:150px;color:#00F;font-size:20px;'>功能类型</td><td style='width:250px;color:#00F;font-size:20px;'>功能说明</td><td style='width:150px;color:#00F;font-size:20px;'>描述</td></tr>";
	formFun += "<tr style='height:20px;'><td style='width:150px;'>delete</td><td style='width:250px;'>删除本条详情数据</td><td style='width:250px;'>调用 xx_cud 接口</td></tr>";
	formFun += "<tr style='height:20px;'><td style='width:150px;'>clue_claimback</td><td style='width:250px;'>线索打回线索池</td><td style='width:250px;'>调用【clue_claimback】接口</td></tr>";
	formFun += "<tr style='height:20px;'><td style='width:150px;'>cluepool_claim</td><td style='width:250px;'>线索池认领</td><td style='width:250px;'>调用【cluepool_claim】接口</td></tr>";
	formFun += "<tr style='height:20px;'><td style='width:150px;'>custpool_claim</td><td style='width:250px;'>客户池认领</td><td style='width:250px;'>调用【custpool_claim】接口</td></tr>";
	formFun += "<tr style='height:20px;'><td style='width:150px;'>cust_claimback</td><td style='width:250px;'>客户打回客户池</td><td style='width:250px;'>调用【cust_claimback】接口</td></tr>";
	
	formFun += "<tr style='height:20px;'><td style='width:150px;'>visit_begin</td><td style='width:250px;'>开始拜访</td><td style='width:250px;'>调用【visit_begin】接口</td></tr>";
	formFun += "</table>";	
	
	
var formOperType = "<table><tr style='height:50px;'><td style='width:150px;color:#00F;font-size:20px;'>功能类型</td><td style='width:250px;color:#00F;font-size:20px;'>功能说明</td><td style='width:150px;color:#00F;font-size:20px;'>描述</td></tr>";
	formOperType += "<tr style='height:20px;'><td style='width:150px;'>1</td><td style='width:250px;'>手机号已经存在  添加到已有联系人，没有勾选复选框</td><td style='width:250px;'></td></tr>";
	formOperType += "<tr style='height:20px;'><td style='width:150px;'>2</td><td style='width:250px;'>添加到已有联系人，勾选了复选框</td><td style='width:250px;'></td></tr>";
	formOperType += "<tr style='height:20px;'><td style='width:150px;'>2.5</td><td style='width:250px;'>新建联系人</td><td style='width:250px;'></td></tr>";
	formOperType += "<tr style='height:20px;'><td style='width:150px;'>3</td><td style='width:250px;'>新建联系人，客户已经存在，添加到已有客户</td><td style='width:250px;'></td></tr>";
	formOperType += "<tr style='height:20px;'><td style='width:150px;'>4</td><td style='width:250px;'>新建联系人，基于已经存在的客户名新建客户</td><td style='width:250px;'></td></tr>";
	formOperType += "<tr style='height:20px;'><td style='width:150px;'>5</td><td style='width:250px;'>添加到已有客户</td><td style='width:250px;'></td></tr>";
	formOperType += "<tr style='height:20px;'><td style='width:150px;'>6</td><td style='width:250px;'>新建客户</td><td style='width:250px;'></td></tr>";
	formOperType += "<tr style='height:20px;'><td style='width:150px;'>7</td><td style='width:250px;'>手机号和客户名都不相同</td><td style='width:250px;'></td></tr>";
		
	formOperType += "</table>";	
	
	
var ownerType = "<table><tr style='height:50px;'><td style='width:150px;color:#00F;font-size:20px;'>所有者类型</td><td style='width:250px;color:#00F;font-size:20px;'>功能说明</td><td style='width:150px;color:#00F;font-size:20px;'>描述</td></tr>";
	ownerType += "<tr style='height:20px;'><td style='width:150px;'>owner</td><td style='width:250px;'>所有者</td><td style='width:250px;'></td></tr>";
	ownerType += "<tr style='height:20px;'><td style='width:150px;'>ownerDown</td><td style='width:250px;'>所有者(下级)</td><td style='width:250px;'></td></tr>";
	ownerType += "<tr style='height:20px;'><td style='width:150px;'>signPerson</td><td style='width:250px;'>合同签订人</td><td style='width:250px;'></td></tr>";
		
	formOperType += "</table>";	
	
	
	
	
	
	