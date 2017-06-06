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

/******************************销售机会列表***************************/
//请求内容
var	reqContent_opportunity_list = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_opportunity_list += "<tr><td style='width:150px;'>isHome</td><td style='width:120px;'>boolean</td><td>Home进入列表标识(Home键中模块进入列表必传,传值：true或false)</td></tr>";	
	reqContent_opportunity_list += "<tr><td style='width:150px;'>listtemplateVer</td><td style='width:120px;'>String</td><td>列表模板版本号,版本号一致时不再返回模板(未知时 传值：none)</td></tr>";	
	reqContent_opportunity_list += "<tr><td style='width:150px;'>orderField</td><td style='width:120px;'>String</td><td>要排序的字段(调用系统接口中的获取排序字段接口获取)</td></tr>";	
	reqContent_opportunity_list += "<tr><td style='width:150px;'>orderType</td><td style='width:120px;'>String</td><td>排序类型 (desc:降序,asc:升序)</td></tr>";	
	reqContent_opportunity_list += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>来自关联中的模块Id</td></tr>";	
	reqContent_opportunity_list += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td>来自关联中的模块标识<a href='#' onclick='showModulePort();return false;'>(点我见详情)</a></td></tr>";	
	reqContent_opportunity_list += "<tr><td style='width:150px;'>viewId</td><td style='width:120px;'>String</td><td>所选视图Id</td></tr>";	
	reqContent_opportunity_list += "<tr><td style='width:150px;'>dicPojoName</td><td style='width:120px;'>String</td><td>字典PojoName</td></tr>";	
	reqContent_opportunity_list += "<tr><td style='width:150px;'>dicValue</td><td style='width:120px;'>String</td><td>字典值</td></tr>";	
	
//响应内容
var	resContent_opportunity_list = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_opportunity_list += "<tr style='height:30px;'><td colspan='3'>以下是数据集：<td></tr>";	
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>listdata</td><td>Vector</td><td>数据集(以模板为准)</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>id</td><td>String</td><td>数据主键ID</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>mobile</td><td>String</td><td>手机号</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>location</td><td>String </td><td>地址</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>...</td><td>....</td><td>....</td></tr>";
			

	resContent_opportunity_list += "<tr style='height:30px;'><td colspan='3'>以下是筛选项集(非Home键进入无值)：<td></tr>";	
	resContent_opportunity_list += "<tr><td></td><td>listScreen</td><td>Vector</td><td>筛选项</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td>dicName</td><td>String</td><td>筛选显示名称</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td>dicPojoName</td><td>String</td><td>筛选字段</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td>dicValues</td><td>Vector</td><td>筛选项集</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td></td><td>id</td><td>String</td><td>选项项Id</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td></td><td>name</td><td>String</td><td>选项项名称</td></tr>";
	
			
	resContent_opportunity_list += "<tr style='height:30px;'><td colspan='3'>以下是视图集(非Home键进入无值)：<td></tr>";	
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>listViews</td><td>Vector</td><td>视图</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>viewName</td><td>String</td><td>视图名称</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>viewId</td><td>String</td><td>视图ID</td></tr>";
		
		
	resContent_opportunity_list += "<tr style='height:30px;'><td colspan='3'>以下是模板版本号：<td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>listtemplateVer</td><td>String</td><td>模板版本号</td></tr>";
		
		
	resContent_opportunity_list += "<tr style='height:30px;'><td colspan='3'>以下是模板中字段说明，具体明细请参考实例：<td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>listtemplate</td><td>String</td><td>模板</td></tr>";
		
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>textKeys</td><td>Vector</td><td>列表粗体标题字段集</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>imgUrl</td><td>Vector</td><td>列表Url字段</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>isIdField</td><td>Vector</td><td>Id主键字段</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>所有行字段集</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>defaultKey</td><td>Vector</td><td>每行显示字段集</td></tr>";
		
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>operations</td><td>Vector</td><td>操作功能</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>operationType</td><td>String</td><td><a href='#' onclick='showListTemplateCode();return false;'>操作类型(点我见详情)</a></td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>operationName</td><td>String</td><td>操作名称</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Boolean</td><td>是否需调用接口</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
	resContent_opportunity_list += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
		
	resContent_opportunity_list += "<tr style='height:30px;'><td colspan='3'>以下是模板实例：<td></tr>";
	
	resContent_opportunity_list += "<tr><td></td><td colspan='2'>{'textKeys': ['companyName','contactName'], 'imgUrl': 'url','isIdField': 'customerId','property':[ {'defaultKey': ['time','number']}, {'defaultKey': ['reason']}],'operations':[{'operationType': 'phone','isInvokPort': false},{'operationType': '认领','isInvokPort': true,'invokPort': {'paras': [{'paraProperty': 'customerId'}],'resParas':[{'paraProperty':'customerId'}],'method': 'cus_claim'}}]}</td></tr>";
	
		
	
		
$.opportunity_list = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_opportunity_list+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_opportunity_list+"</table>";
	
	

/******************************销售机会详情***************************/
//请求内容
var	reqContent_opportunity_getinfobyid = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_opportunity_getinfobyid += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>Vector</td><td>线索数据id(不传值，默认只获取模板)</span></td></tr>";	
	reqContent_opportunity_getinfobyid += "<tr><td style='width:150px;'>formtemplateVer</td><td style='width:120px;'>String</td><td>模板版本号,<span style='color:red;'>版本号一致时不再返回模板(未知时 传值：none)(必传)</span></td></tr>";	
	
//响应内容
var	resContent_opportunity_getinfobyid = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>formFun</td><td>Vector </td><td>表单功能 </td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>显示名 </td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>identif</td><td>String </td><td>标识</td></tr>";
	
		
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>formrelmodules</td><td>Vector</td><td>关联的模块</td></tr>";	
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>relevance</td><td>Vector</td><td>关联模块</td></tr>"
			resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>add</td><td>Vector</td><td>新建模块</td></tr>"
			
		
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleId</td><td>String</td><td>模块Id</td></tr>"
			resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleUrl</td><td>String</td><td>模块名图像URL</td></tr>"
				resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleName</td><td>String</td><td>模块名</td></tr>"
					resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>modulePort</td><td>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a></td></tr>"
			
		
		
	resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>formInfo</td><td>Vector </td><td><a href='#' onclick='showFormFun();return false;'>表单功能(点我见详情)</a>  </td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>purpose</td><td>String </td><td>拜访目的</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>address</td><td>String </td><td>拜访地址 </td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>beginTime</td><td>String </td><td>开始拜访时间 </td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>endTime</td><td>String </td><td>结束拜访时间</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>planTime</td><td>String </td><td>计划拜访时间</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>...</td><td>String </td><td>.... </td></tr>";
		
		
	resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>formInfoComAndPraise</td><td>String </td><td>评论和点赞</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>praises</td><td>Vector </td><td>点赞集</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>userId</td><td>String </td><td>点赞人Id</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>userName</td><td>String </td><td>点赞人名称</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>commentsNum</td><td>int</td><td>评论数</td></tr>";
		
		
		resContent_opportunity_getinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板版本号：<td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>formtemplateVer</td><td>String</td><td>模板版本号</td></tr>";
		
		
		resContent_opportunity_getinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板中字段说明，具体明细请参考实例：<td></tr>";
		
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>formtemplate</td><td>String </td><td>表单模板 </td></tr>";
		
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>forms</td><td>Vector</td><td>表单版块集</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>boardTitleOnly</td><td>String</td><td>版块标题</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>Boolean</td><td>是否显示此版块</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldSet</td><td>Vector</td><td>字段集</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldTitle</td><td>String</td><td>字段标题</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>pojoProperty</td><td>String</td><td>字段属性名</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>pojoPropertyName</td><td>String</td><td>字段属性显示名称</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>String</td><td>此字段是否展示</td></tr>";
		
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>字段属性集</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldType</td><td>Vector</td><td>字段类型</td></tr>";
		
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>optionParas</td><td>Vector</td><td>字段选项</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>显示名</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>identity</td><td>Vector</td><td>唯一标识</td></tr>";
		
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>readOnly</td><td>Vector</td><td>是否只读</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>defaultVal</td><td>Vector</td><td>默认Value</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Vector</td><td>是否需要调接口</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口请求参数类型</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口响应参数类型</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>isShowHide</td><td>String</td><td>true 显示，false 隐藏</td></tr>";
		resContent_opportunity_getinfobyid += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
		
		resContent_opportunity_getinfobyid += "<tr style='height:30px;'><td colspan='3'>请测试接口获取实例展示结构<td></tr>";
		
		
		
		
		
$.opportunity_getinfobyid = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_opportunity_getinfobyid+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_opportunity_getinfobyid+"</table>";






/******************************数据增删改***************************/
//请求内容
var	reqContent_opportunity_cud = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_opportunity_cud += "<tr><td style='width:150px;'>isCUD</td><td style='width:120px;'>String</td><td style='width:180px;'>(传值：add、update、delete)<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_opportunity_cud += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>线索池数据id(isCUD为 delete、update时必传)</td></tr>";	
		
	reqContent_opportunity_cud += "<tr><td style='width:150px;'>contactlist</td><td style='width:120px;'>Vector</td><td>数据集(新增、修改必传)</td></tr>";	
	reqContent_opportunity_cud += "<tr><td></td><td style='width:150px;'>purpose</td><td style='width:120px;'>String</td><td>拜访目的<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_opportunity_cud += "<tr><td></td><td style='width:150px;'>address</td><td style='width:120px;'>String</td><td>拜访地址<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_opportunity_cud += "<tr><td></td><td style='width:150px;'>beginTime</td><td style='width:120px;'>String</td><td>开始拜访时间</td></tr>";	
	reqContent_opportunity_cud += "<tr><td></td><td style='width:150px;'>endTime</td><td style='width:120px;'>String</td><td>结束拜访时间</td></tr>";	
	reqContent_opportunity_cud += "<tr><td></td><td style='width:150px;'>planTime</td><td style='width:120px;'>String</td><td>计划拜访时间</td></tr>";	
	reqContent_opportunity_cud += "<tr><td></td><td style='width:150px;'>...</td><td style='width:120px;'>...</td><td>...</td></tr>";	
		
	
	
	
//响应内容
var	resContent_opportunity_cud = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
		
$.opportunity_cud = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_opportunity_cud+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";



/******************************获取联系人角色列表***************************/
//请求内容
var	reqContent_opportunity_conrolelist = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID长度32字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_opportunity_conrolelist += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td style='width:180px;'>销售机会ID<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_opportunity_conrolelist += "<tr><td style='width:150px;'>relType</td><td style='width:120px;'>String</td style='width:180px;'><td>(1.已关联;2.跟客户相关的未关联联系人;3.全部)<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_opportunity_conrolelist += "<tr><td style='width:150px;'>searchVallist</td><td style='width:120px;'>String</td><td>搜索值</td></tr>";
	reqContent_opportunity_conrolelist += "<tr><td style='width:150px;'>currentPage</td><td style='width:120px;'>int</td><td>当前页码</td></tr>";
	reqContent_opportunity_conrolelist += "<tr><td style='width:150px;'>limit</td><td style='width:120px;'>int</td><td>每页显示条数</td></tr>";



//响应内容
var	resContent_opportunity_conrolelist = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";
	resContent_opportunity_conrolelist += "<tr style='height:30px;'><td colspan='3'>以下是数据集：<td></tr>";
	resContent_opportunity_conrolelist += "<tr><td></td><td style='width:150px;'>contactRole</td><td>Vector</td><td>角色数组</td></tr>";
	resContent_opportunity_conrolelist += "<tr><td></td><td style='width:150px;'>listdata</td><td>Vector</td><td>数据集(以模板为准)</td></tr>";
	resContent_opportunity_conrolelist += "<tr><td></td><td style='width:150px;'>ID</td><td>String</td><td>数据主键ID</td></tr>";
	resContent_opportunity_conrolelist += "<tr><td></td><td style='width:150px;'>NAME</td><td>String</td><td>联系人名称</td></tr>";
	resContent_opportunity_conrolelist += "<tr><td></td><td style='width:150px;'>CUSTOMER_NAME</td><td>String </td><td>客户名称</td></tr>";
	resContent_opportunity_conrolelist += "<tr><td></td><td style='width:150px;'>POSITION</td><td>String </td><td>联系人职位</td></tr>";
	resContent_opportunity_conrolelist += "<tr><td></td><td style='width:150px;'>CONTACT_ROLE</td><td>String </td><td>联系人角色</td></tr>";


	$.opportunity_conrolelist = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_opportunity_conrolelist+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_opportunity_conrolelist+"</table>";


/******************************阶段历史列表***************************/
//请求内容
var	reqContent_opportunity_stagehislist = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID长度32字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_opportunity_stagehislist += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td style='width:180px;'>销售机会ID<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_opportunity_stagehislist += "<tr><td style='width:150px;'>searchVallist</td><td style='width:120px;'>String</td><td>搜索值</td></tr>";
	reqContent_opportunity_stagehislist += "<tr><td style='width:150px;'>currentPage</td><td style='width:120px;'>int</td><td>当前页码</td></tr>";
	reqContent_opportunity_stagehislist += "<tr><td style='width:150px;'>limit</td><td style='width:120px;'>int</td><td>每页显示条数</td></tr>";


//响应内容
var	resContent_opportunity_stagehislist = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";
	resContent_opportunity_stagehislist += "<tr style='height:30px;'><td colspan='3'>以下是数据集：<td></tr>";
	resContent_opportunity_stagehislist += "<tr><td></td><td style='width:150px;'>ID</td><td>String</td><td>数据主键ID</td></tr>";
	resContent_opportunity_stagehislist += "<tr><td></td><td style='width:150px;'>STATUS</td><td>String</td><td>阶段</td></tr>";
	resContent_opportunity_stagehislist += "<tr><td></td><td style='width:150px;'>CONTRACT_SUM</td><td>String</td><td>签约金额</td></tr>";
	resContent_opportunity_stagehislist += "<tr><td></td><td style='width:150px;'>POSSIBILITY</td><td>String</td><td>可能性</td></tr>";
	resContent_opportunity_stagehislist += "<tr><td></td><td style='width:150px;'>EXCEPTED_YIELD</td><td>String </td><td>预期收益</td></tr>";
	resContent_opportunity_stagehislist += "<tr><td></td><td style='width:150px;'>SYSTEM_EXCEPTED_DEAL_DATE</td><td>String </td><td>系统预计成交日期</td></tr>";
	resContent_opportunity_stagehislist += "<tr><td></td><td style='width:150px;'>STAGE_DAYS</td><td>String </td><td>阶段时长</td></tr>";
	resContent_opportunity_stagehislist += "<tr><td></td><td style='width:150px;'>MODIFIED_TIME</td><td>String </td><td>修改时间</td></tr>";


$.opportunity_stagehislist = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_opportunity_stagehislist+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_opportunity_stagehislist+"</table>";




	/******************************获取联系人角色新增/编辑***************************/
//请求内容
var	reqContent_opportunity_conroleedit = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,长度32字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_opportunity_conroleedit += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td style='width:180px;'>销售机会ID<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_opportunity_conroleedit += "<tr><td style='width:150px;'>opName</td><td style='width:120px;'>String</td><td style='width:180px;'>新增/编辑(add/update)<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_opportunity_conroleedit += "<tr><td style='width:150px;'>conroleeditlist</td><td style='width:120px;'>Vector</td style='width:180px;'><td><span style='color:red;'>(必传)</span></td></tr>";
	reqContent_opportunity_conroleedit += "<tr><td></td><td style='width:150px;'>contactId</td><td style='width:120px;'>String</td><td>联系人ID</td></tr>";
	reqContent_opportunity_conroleedit += "<tr><td></td><td style='width:150px;'>contactRole</td><td style='width:120px;'>String</td><td>联系人角色</td></tr>";

//响应内容
var	resContent_opportunity_conroleedit = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";


$.opportunity_conroleedit = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_opportunity_conroleedit+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";



/******************************获取联系人角色删除***************************/
//请求内容
var	reqContent_opportunity_conroledel = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,长度32字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_opportunity_conroledel += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td style='width:180px;'>销售机会ID<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_opportunity_conroledel += "<tr><td style='width:150px;'>conIds</td><td style='width:120px;'>String[]</td style='width:180px;'>联系人ID数组<td><span style='color:red;'>(必传)</span></td></tr>";

//响应内容
	var	resContent_opportunity_conroleedit = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";


$.opportunity_conroledel = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_opportunity_conroledel+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";



})(TestInfo);