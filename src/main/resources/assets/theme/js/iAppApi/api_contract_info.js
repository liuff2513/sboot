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

/******************************列表***************************/
//请求内容
var	resContent_contract_list = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	resContent_contract_list += "<tr><td style='width:150px;'>isHome</td><td style='width:120px;'>boolean</td><td>Home进入列表标识(Home键中模块进入列表必传,传值：true或false)</td></tr>";	
	resContent_contract_list += "<tr><td style='width:150px;'>listtemplateVer</td><td style='width:120px;'>String</td><td>列表模板版本号,版本号一致时不再返回模板(未知时 传值：none)</td></tr>";	
	resContent_contract_list += "<tr><td style='width:150px;'>orderField</td><td style='width:120px;'>String</td><td>要排序的字段(调用系统接口中的获取排序字段接口获取)</td></tr>";	
	resContent_contract_list += "<tr><td style='width:150px;'>orderType</td><td style='width:120px;'>String</td><td>排序类型 (desc:降序,asc:升序)</td></tr>";	
	resContent_contract_list += "<tr><td style='width:150px;'>viewId</td><td style='width:120px;'>String</td><td>所选视图Id</td></tr>";	
	resContent_contract_list += "<tr><td style='width:150px;'>dicPojoName</td><td style='width:120px;'>String</td><td>字典PojoName</td></tr>";	
	resContent_contract_list += "<tr><td style='width:150px;'>dicValue</td><td style='width:120px;'>String</td><td>字典值</td></tr>";	
	
//响应内容
var	reqContent_contract_list = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	reqContent_contract_list += "<tr style='height:30px;'><td colspan='3'>以下是数据集：<td></tr>";	
	reqContent_contract_list += "<tr><td></td><td>listdata</td><td>Vector</td><td>数据集(以模板为准)</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>id</td><td>String</td><td>数据主键ID</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>name</td><td>String</td><td>合同名称</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>...</td><td>....</td><td>....</td></tr>";
			

	reqContent_contract_list += "<tr style='height:30px;'><td colspan='3'>以下是筛选项集(非Home键进入无值)：<td></tr>";	
	reqContent_contract_list += "<tr><td></td><td>listScreen</td><td>Vector</td><td>筛选项</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>dicName</td><td>String</td><td>筛选显示名称</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>dicPojoName</td><td>String</td><td>筛选字段</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>dicValues</td><td>Vector</td><td>筛选项集</td></tr>";
	reqContent_contract_list += "<tr><td></td><td></td><td>id</td><td>String</td><td>选项项Id</td></tr>";
	reqContent_contract_list += "<tr><td></td><td></td><td>name</td><td>String</td><td>选项项名称</td></tr>";
	
			
	reqContent_contract_list += "<tr style='height:30px;'><td colspan='3'>以下是视图集(非Home键进入无值)：<td></tr>";	
	reqContent_contract_list += "<tr><td></td><td>listViews</td><td>Vector</td><td>视图</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>viewName</td><td>String</td><td>视图名称</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>viewId</td><td>String</td><td>视图ID</td></tr>";
		
		
	reqContent_contract_list += "<tr style='height:30px;'><td colspan='3'>以下是模板版本号：<td></tr>";
	reqContent_contract_list += "<tr><td></td><td>listtemplateVer</td><td>String</td><td>模板版本号</td></tr>";
		
		
	reqContent_contract_list += "<tr style='height:30px;'><td colspan='3'>以下是模板中字段说明，具体明细请参考实例：<td></tr>";
	reqContent_contract_list += "<tr><td></td><td>listtemplate</td><td>String</td><td>模板</td></tr>";
		
	reqContent_contract_list += "<tr><td></td><td>textKeys</td><td>Vector</td><td>列表粗体标题字段集</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>imgUrl</td><td>Vector</td><td>列表Url字段</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>isIdField</td><td>Vector</td><td>Id主键字段</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>property</td><td>Vector</td><td>所有行字段集</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>defaultKey</td><td>Vector</td><td>每行显示字段集</td></tr>";
		
	reqContent_contract_list += "<tr><td></td><td>operations</td><td>Vector</td><td>操作功能</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>operationType</td><td>String</td><td><a href='#' onclick='showListTemplateCode();return false;'>操作类型(点我见详情)</a></td></tr>";
	reqContent_contract_list += "<tr><td></td><td>operationName</td><td>String</td><td>操作名称</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>isInvokPort</td><td>Boolean</td><td>是否需调用接口</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>invokPort</td><td>String</td><td>接口</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
	reqContent_contract_list += "<tr><td></td><td>method</td><td>String</td><td>接口请求方法</td></tr>";
		
	reqContent_contract_list += "<tr style='height:30px;'><td colspan='3'>以下是模板实例：<td></tr>";
	
	reqContent_contract_list += "<tr><td></td><td colspan='2'>{'textKeys': ['companyName','contactName'], 'imgUrl': 'url','isIdField': 'customerId','property':[ {'defaultKey': ['time','number']}, {'defaultKey': ['reason']}],'operations':[{'operationType': 'phone','isInvokPort': false},{'operationType': '认领','isInvokPort': true,'invokPort': {'paras': [{'paraProperty': 'customerId'}],'resParas':[{'paraProperty':'customerId'}],'method': 'cus_claim'}}]}</td></tr>";
	
		
	
		
$.contract_list = "<h3>请求：</h3>"+reqLine+reqLine1+resContent_contract_list+"</table>" +
		"<h3>响应：</h3>"+resLine+reqContent_contract_list+"</table>";
	
	

/******************************详情***************************/
//请求内容
var	reqContent_contract_getinfobyid = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_contract_getinfobyid += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>Vector</td><td>线索数据id(不传值，默认只获取模板)</span></td></tr>";	
	reqContent_contract_getinfobyid += "<tr><td style='width:150px;'>formtemplateVer</td><td style='width:120px;'>String</td><td>模板版本号,<span style='color:red;'>版本号一致时不再返回模板(未知时 传值：none)(必传)</span></td></tr>";	
	
//响应内容
var	resContent_contract_getinfobyid = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>formFun</td><td>Vector </td><td>表单功能 </td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>显示名 </td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>identif</td><td>String </td><td>标识</td></tr>";
	
		
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>formrelmodules</td><td>Vector</td><td>关联的模块</td></tr>";	
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>relevance</td><td>Vector</td><td>关联模块</td></tr>"
			resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>add</td><td>Vector</td><td>新建模块</td></tr>"
			
		
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleId</td><td>String</td><td>模块Id</td></tr>"
			resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleUrl</td><td>String</td><td>模块名图像URL</td></tr>"
				resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleName</td><td>String</td><td>模块名</td></tr>"
					resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>modulePort</td><td>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a></td></tr>"
			
		
	resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>formInfo</td><td>Vector </td><td><a href='#' onclick='showFormFun();return false;'>表单功能(点我见详情)</a>  </td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>合同名称</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>...</td><td>String </td><td>.... </td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>productlist</td><td>Vector </td><td>产品集</td></tr>";
		
		
		
		
	resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>formInfoComAndPraise</td><td>String </td><td>评论和点赞</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>praises</td><td>Vector </td><td>点赞集</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>userId</td><td>String </td><td>点赞人Id</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>userName</td><td>String </td><td>点赞人名称</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>commentsNum</td><td>int</td><td>评论数</td></tr>";
			
		
		
		
		resContent_contract_getinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板版本号：<td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>formtemplateVer</td><td>String</td><td>模板版本号</td></tr>";
		
		resContent_contract_getinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板中字段说明，具体明细请参考实例：<td></tr>";
		
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>formtemplate</td><td>String </td><td>表单模板 </td></tr>";
		
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>forms</td><td>Vector</td><td>表单版块集</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>boardTitleOnly</td><td>String</td><td>版块标题</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>Boolean</td><td>是否显示此版块</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldSet</td><td>Vector</td><td>字段集</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldTitle</td><td>String</td><td>字段标题</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>pojoProperty</td><td>String</td><td>字段属性名</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>pojoPropertyName</td><td>String</td><td>字段属性显示名称</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>String</td><td>此字段是否展示</td></tr>";
		
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>字段属性集</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldType</td><td>Vector</td><td>字段类型</td></tr>";
		
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>optionParas</td><td>Vector</td><td>字段选项</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>显示名</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>identity</td><td>Vector</td><td>唯一标识</td></tr>";
		
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>readOnly</td><td>Vector</td><td>是否只读</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>defaultVal</td><td>Vector</td><td>默认Value</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Vector</td><td>是否需要调接口</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口请求参数类型</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口响应参数类型</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>isShowHide</td><td>String</td><td>true 显示，false 隐藏</td></tr>";
		resContent_contract_getinfobyid += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
		
		resContent_contract_getinfobyid += "<tr style='height:30px;'><td colspan='3'>请测试接口获取实例展示结构<td></tr>";
		
		
		
		
		
$.contract_getinfobyid = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_contract_getinfobyid+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_contract_getinfobyid+"</table>";






/******************************数据增删改***************************/
//请求内容
var	reqContent_contract_cud = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_contract_cud += "<tr><td style='width:150px;'>isCUD</td><td style='width:120px;'>String</td><td style='width:180px;'>(传值：add、update、delete)<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_contract_cud += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>数据id(isCUD为 delete、update时必传)</td></tr>";	
	
	reqContent_contract_cud += "<tr><td style='width:150px;'>contractlist</td><td style='width:120px;'>Vector</td><td>数据集(新增、修改必传)</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>ownerId</td><td style='width:120px;'>String</td><td>所有者Id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>ownerName</td><td style='width:120px;'>String</td><td>所有者名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>contractNo</td><td style='width:120px;'>String</td><td>合同编号</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>contractType</td><td style='width:120px;'>String</td><td>合同类型</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>contractState</td><td style='width:120px;'>String</td><td>合同状态</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>contactId</td><td style='width:120px;'>String</td><td>联系人Id</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>contactName</td><td style='width:120px;'>String</td><td>联系人名称</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>customerId</td><td style='width:120px;'>String</td><td>客户Id</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>customerName</td><td style='width:120px;'>String</td><td>客户名称</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>signPersonId</td><td style='width:120px;'>String</td><td>合同签订人Id</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>signPersonName</td><td style='width:120px;'>String</td><td>合同签订人名称</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>opportunityId</td><td style='width:120px;'>String</td><td>销售机会Id</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>opportunityName</td><td style='width:120px;'>String</td><td>销售机会</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>合同名称</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>productNum</td><td style='width:120px;'>String</td><td>产品品种数量</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>noTaxSubtotal</td><td style='width:120px;'>String</td><td>未含税总计</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>discountRate</td><td style='width:120px;'>String</td><td>折扣</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>adjust</td><td style='width:120px;'>String</td><td>调整</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>totalMoney</td><td style='width:120px;'>String</td><td>总金额</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>accumulativeTotal</td><td style='width:120px;'>String</td><td>累计</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>...</td><td style='width:120px;'>...</td><td>...</td></tr>";	
	
	reqContent_contract_cud += "<tr><td style='width:150px;'>productlist</td><td style='width:120px;'>Vector</td><td>产品集(新增、修改必传)</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>productId</td><td style='width:120px;'>String</td><td>产品Id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>productName</td><td style='width:120px;'>String</td><td>产品名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>singlePrice</td><td style='width:120px;'>String</td><td>定价</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>productPrice</td><td style='width:120px;'>String</td><td>单价</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>productNum</td><td style='width:120px;'>String</td><td>数量</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>taxRate</td><td style='width:120px;'>String</td><td>税</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>tax</td><td style='width:120px;'>String</td><td>税费</td></tr>";	
	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>adjust</td><td style='width:120px;'>String</td><td>调整</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>discountRate</td><td style='width:120px;'>String</td><td>折扣</td></tr>";	
	reqContent_contract_cud += "<tr><td></td><td style='width:150px;'>totalMoney</td><td style='width:120px;'>String</td><td>总额</td></tr>";	
	
	reqContent_contract_cud += "<tr style='height:30px;'><td colspan='3'>请测试接口获取实例展示结构<td></tr>";
	
	
//响应内容
var	resContent_contract_cud = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
		
$.contract_cud = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_contract_cud+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";

	


/******************************获取产品***************************/
//请求内容
var	reqContent_contract_getproducts = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_contract_getproducts += "<tr><td style='width:150px;'>searchVal</td><td style='width:120px;'>String</td><td style='width:180px;'>搜索值</td></tr>";	
	
//响应内容
var	resContent_contract_getproducts = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>数据Id</td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>产品名称 </td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>creatorId</td><td style='width:120px;'>String</td><td>创建者Id </td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>creatorName</td><td style='width:120px;'>String</td><td>创建者名称 </td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>isDeleted</td><td style='width:120px;'>String</td><td>是否删除 </td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>modifiedTime</td><td style='width:120px;'>Date</td><td>修改时间</td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>modifierId</td><td style='width:120px;'>String</td><td>修改者Id </td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>modifierName</td><td style='width:120px;'>String</td><td>修改者名称 </td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>ownerId</td><td style='width:120px;'>String</td><td>所有者Id </td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>ownerName</td><td style='width:120px;'>String</td><td>所有者名称 </td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>productCode</td><td style='width:120px;'>String</td><td>产品编号 </td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>productType</td><td style='width:120px;'>String</td><td>产品类型 </td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>remark</td><td style='width:120px;'>String</td><td>产品备注 </td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>status</td><td style='width:120px;'>String</td><td>产品状态 </td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>storeroomId</td><td style='width:120px;'>String</td><td>商店Id </td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>unitPrice</td><td style='width:120px;'>String</td><td>产品单价</td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>vendorId</td><td style='width:120px;'>String</td><td>库房Id </td></tr>";	
	resContent_contract_getproducts += "<tr><td></td><td style='width:150px;'>vendorName</td><td style='width:120px;'>String</td><td>库房名称 </td></tr>";	
		
$.contract_getproducts = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_contract_getproducts+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_contract_getproducts+"</table>";

	



})(TestInfo);