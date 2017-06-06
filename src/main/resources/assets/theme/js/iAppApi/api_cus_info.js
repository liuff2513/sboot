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

/******************************获取客户池列表***************************/
//请求内容
var	reqContent_custpool_1ist = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_custpool_1ist += "<tr><td style='width:150px;'>isHome</td><td style='width:120px;'>boolean</td><td>Home进入列表标识(Home键中模块进入列表必传,传值：true或false)</td></tr>";	
	reqContent_custpool_1ist += "<tr><td style='width:150px;'>listtemplateVer</td><td style='width:120px;'>String</td><td>列表模板版本号,版本号一致时不再返回模板(未知时 传值：none)</td></tr>";	
	reqContent_custpool_1ist += "<tr><td style='width:150px;'>orderField</td><td style='width:120px;'>String</td><td>要排序的字段(调用系统接口中的获取排序字段接口获取)</td></tr>";	
	reqContent_custpool_1ist += "<tr><td style='width:150px;'>orderType</td><td style='width:120px;'>String</td><td>排序类型 (desc:降序,asc:升序)</td></tr>";	
	reqContent_custpool_1ist += "<tr><td style='width:150px;'>viewId</td><td style='width:120px;'>String</td><td>所选视图Id</td></tr>";	
	reqContent_custpool_1ist += "<tr><td style='width:150px;'>dicPojoName</td><td style='width:120px;'>String</td><td>字典PojoName</td></tr>";	
	reqContent_custpool_1ist += "<tr><td style='width:150px;'>dicValue</td><td style='width:120px;'>String</td><td>字典值</td></tr>";	
	
//响应内容
var	resContent_custpool_1ist = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_custpool_1ist += "<tr style='height:30px;'><td colspan='3'>以下是数据集：<td></tr>";	
	
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>listdata</td><td>Vector</td><td>数据集(以模板为准)</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>id</td><td>String</td><td>数据主键Id</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>公司名称</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>ownerName</td><td>String</td><td>所有者名称</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>customerStatus</td><td>String </td><td>客户状态</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>....</td><td>....</td><td>....</td></tr>";
	
	
	

	resContent_custpool_1ist += "<tr style='height:30px;'><td colspan='3'>以下是筛选项集(非Home键进入无值)：<td></tr>";	
	resContent_custpool_1ist += "<tr><td></td><td>listScreen</td><td>Vector</td><td>筛选项</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td>dicName</td><td>String</td><td>筛选显示名称</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td>dicPojoName</td><td>String</td><td>筛选字段</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td>dicValues</td><td>Vector</td><td>筛选项集</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td></td><td>id</td><td>String</td><td>选项项Id</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td></td><td>name</td><td>String</td><td>选项项名称</td></tr>";
	
	
	
	resContent_custpool_1ist += "<tr style='height:30px;'><td colspan='3'>以下是视图集(非Home键进入无值)：<td></tr>";	
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>listViews</td><td>Vector</td><td>视图</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>viewName</td><td>String</td><td>视图名称</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>viewId</td><td>String</td><td>视图ID</td></tr>";
	
	
	
	
	resContent_custpool_1ist += "<tr style='height:30px;'><td colspan='3'>以下是模板版本号：<td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>listtemplateVer</td><td>String</td><td>模板版本号</td></tr>";
	
	
	resContent_custpool_1ist += "<tr style='height:30px;'><td colspan='3'>以下是模板中字段说明，具体明细请参考实例：<td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>listtemplate</td><td>String</td><td>模板</td></tr>";
	
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>textKeys</td><td>Vector</td><td>列表粗体标题字段集</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>imgUrl</td><td>Vector</td><td>列表Url字段</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>isIdField</td><td>Vector</td><td>Id主键字段</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>ishidFields</td><td>Vector</td><td>列表隐藏字段集合</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>所有行字段集</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>defaultKey</td><td>Vector</td><td>每行显示字段集</td></tr>";
	
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>operations</td><td>Vector</td><td>操作功能</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>operationType</td><td>String</td><td><a href='#' onclick='showListTemplateCode();return false;'>操作类型(点我见详情)</a></td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>operationName</td><td>String</td><td>操作名称</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Boolean</td><td>是否需调用接口</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
	resContent_custpool_1ist += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
	
	resContent_custpool_1ist += "<tr style='height:30px;'><td colspan='3'>以下是模板实例：<td></tr>";

	resContent_custpool_1ist += "<tr><td></td><td colspan='2'>{'textKeys': ['companyName','custpoolName'], 'imgUrl': 'url','isIdField': 'customerId','property':[ {'defaultKey': ['time','number']}, {'defaultKey': ['reason']}],'operations':[{'operationType': 'phone','isInvokPort': false},{'operationType': '认领','isInvokPort': true,'invokPort': {'paras': [{'paraProperty': 'customerId'}],'resParas':[{'paraProperty':'customerId'}],'method': 'cus_claim'}}]}</td></tr>";

	
	
		
$.custpool_list = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_custpool_1ist+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_custpool_1ist+"</table>";
	
		
	
	
/******************************获取池数据增删改***************************/
//请求内容
var	reqContent_custpool_cud = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_custpool_cud += "<tr><td style='width:150px;'>isCUD</td><td style='width:120px;'>String</td><td style='width:180px;'>(传值：add、update、delete)<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_custpool_cud += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>客户ID(isCUD为 delete、update时必传)</td></tr>";	

	reqContent_custpool_cud += "<tr><td style='width:150px;'>custPoollist</td><td style='width:120px;'>Vector</td><td>数据集(新增、修改必传)</td></tr>";	
	reqContent_custpool_cud += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>公司名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_custpool_cud += "<tr><td></td><td style='width:150px;'>address</td><td style='width:120px;'>String</td><td>地址<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_custpool_cud += "<tr><td></td><td style='width:150px;'>website</td><td style='width:120px;'>String</td><td>网站<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_custpool_cud += "<tr><td></td><td style='width:150px;'>fax</td><td style='width:120px;'>String</td><td>传真<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_custpool_cud += "<tr><td></td><td style='width:150px;'>customerStatus</td><td style='width:120px;'>String</td><td>客户状态<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_custpool_cud += "<tr><td></td><td style='width:150px;'>creatorName</td><td style='width:120px;'>String</td><td>创建者名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_custpool_cud += "<tr><td></td><td style='width:150px;'>modifierName</td><td style='width:120px;'>String</td><td>修改者名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_custpool_cud += "<tr><td></td><td style='width:150px;'>clueCreatorName</td><td style='width:120px;'>String</td><td>线索创建者名称</td></tr>";	

	
//响应内容
var	resContent_custpool_cud = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
		
$.custpool_cud = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_custpool_cud+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";
	
	

/******************************客户池获取详情***************************/
//请求内容
var	reqContent_custpool_getinfobyid = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_custpool_getinfobyid += "<tr><td style='width:150px;'>customerId</td><td style='width:120px;'>Vector</td><td>客户ID(不传值，默认只获取模板)</span></td></tr>";	
	reqContent_custpool_getinfobyid += "<tr><td style='width:150px;'>formtemplateVer</td><td style='width:120px;'>String</td><td>模板版本号,<span style='color:red;'>版本号一致时不再返回模板(未知时 传值：none)(必传)</span></td></tr>";	
	
//响应内容
var	resContent_custpool_getinfobyid = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>formFun</td><td>Vector </td><td><a href='#' onclick='showFormFun();return false;'>表单功能(点我见详情)</a>  </td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>显示名 </td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>identif</td><td>String </td><td>标识</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>options</td><td>Vector </td><td>打回原因数组(当identif为打回标识，返回此参数，否则无)</td></tr>";
	
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>formrelmodules</td><td>Vector</td><td>关联的模块</td></tr>";	
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>relevance</td><td>Vector</td><td>关联模块</td></tr>"
			resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>add</td><td>Vector</td><td>新建模块</td></tr>"
			
		
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleId</td><td>String</td><td>模块Id</td></tr>"
			resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleUrl</td><td>String</td><td>模块名图像URL</td></tr>"
				resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleName</td><td>String</td><td>模块名</td></tr>"
					resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>modulePort</td><td>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a></td></tr>"
			
		
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>formInfo</td><td>Vector </td><td>表单详情 </td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>数据主键Id</td></tr>";	
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>公司名称</td></tr>";	
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>address</td><td style='width:120px;'>String</td><td>地址</td></tr>";	
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>website</td><td style='width:120px;'>String</td><td>网站</td></tr>";	
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>fax</td><td style='width:120px;'>String</td><td>传真</td></tr>";	
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>customerStatus</td><td style='width:120px;'>String</td><td>客户状态</td></tr>";	
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>creatorName</td><td style='width:120px;'>String</td><td>创建者名称</td></tr>";	
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>modifierName</td><td style='width:120px;'>String</td><td>修改者名称</td></tr>";	
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>clueCreatorName</td><td style='width:120px;'>String</td><td>线索创建者名称</td></tr>";	

	resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>formInfoComAndPraise</td><td>String </td><td>评论和点赞</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>praises</td><td>Vector </td><td>点赞集</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>userId</td><td>String </td><td>点赞人Id</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>userName</td><td>String </td><td>点赞人名称</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>commentsNum</td><td>int</td><td>评论数</td></tr>";
		
		
		resContent_custpool_getinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板版本号：<td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>formtemplateVer</td><td>String</td><td>模板版本号</td></tr>";
		
		
		resContent_custpool_getinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板中字段说明，具体明细请参考实例：<td></tr>";
		
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>formtemplate</td><td>String </td><td>表单模板 </td></tr>";
		
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>forms</td><td>Vector</td><td>表单版块集</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>boardTitleOnly</td><td>String</td><td>版块标题</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>Boolean</td><td>是否显示此版块</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldSet</td><td>Vector</td><td>字段集</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldTitle</td><td>String</td><td>字段标题</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>pojoProperty</td><td>String</td><td>字段属性名</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>pojoPropertyName</td><td>String</td><td>字段属性显示名称</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>String</td><td>此字段是否展示</td></tr>";
		
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>字段属性集</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldType</td><td>Vector</td><td>字段类型</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>readOnly</td><td>Vector</td><td>是否只读</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>defaultVal</td><td>Vector</td><td>默认Value</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Vector</td><td>是否需要调接口</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口请求参数类型</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口响应参数类型</td></tr>";
		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>isShowHide</td><td>String</td><td>true 显示，false 隐藏</td></tr>";

		resContent_custpool_getinfobyid += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
		
		resContent_custpool_getinfobyid += "<tr style='height:30px;'><td colspan='3'>请测试接口获取实例展示结构<td></tr>";
		
		
		
		
		
$.custpool_getinfobyid = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_custpool_getinfobyid+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_custpool_getinfobyid+"</table>";
	



/******************************客户池数据认领***************************/


//请求内容
var	reqContent_custpool_claim = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_custpool_claim += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>客户池数据id<span style='color:red;'>(必传)</span></td></tr>";	
		
//响应内容
var	resContent_custpool_claim = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
		
$.custpool_claim = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_custpool_claim+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";


/******************************客户获取详情***************************/

//请求内容
var	reqContent_cust_getinfobyid2 = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_cust_getinfobyid2 += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>客户数据id<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_cust_getinfobyid2 = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_cust_getinfobyid2 += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>名称</td></tr>";
	resContent_cust_getinfobyid2 += "<tr><td></td><td style='width:150px;'>iconPath</td><td>String</td><td>头像地址</td></tr>";
	resContent_cust_getinfobyid2 += "<tr><td></td><td style='width:150px;'>longitude</td><td>String</td><td>经度</td></tr>";
	resContent_cust_getinfobyid2 += "<tr><td></td><td style='width:150px;'>latitude</td><td>String</td><td>纬度</td></tr>";
	resContent_cust_getinfobyid2 += "<tr><td></td><td style='width:150px;'>address</td><td>String</td><td>地址</td></tr>";
	resContent_cust_getinfobyid2 += "<tr><td></td><td style='width:150px;'>phone</td><td>String</td><td>电话</td></tr>";

$.cust_getinfobyid2 = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_cust_getinfobyid2+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_cust_getinfobyid2+"</table>";


/******************************客户打回***************************/


//请求内容
var	reqContent_cust_claimback = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_claimback += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>客户数据id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_claimback += "<tr><td style='width:150px;'>reason</td><td style='width:120px;'>String</td><td>打回原因<span style='color:red;'>(必传)</span></td></tr>";	
		
//响应内容
var	resContent_cust_claimback = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
		
$.cust_claimback = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_cust_claimback+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";



/******************************获取池数据共享***************************/
//请求内容
var	reqContent_custpool_share = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	

	
//响应内容
var	resContent_custpool_share = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_custpool_share += "<tr><td></td><td style='width:150px;'>shareNumber</td><td>String </td><td>共享数 </td></tr>"
	
$.custpool_share = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_custpool_share+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_custpool_share+"</table>";
	



/******************************获取池获取联系人***************************/
//请求内容
var	reqContent_custpool_getcustpools = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_custpool_getcustpools += "<tr><td style='width:150px;'>isCUD</td><td style='width:120px;'>Vector</td><td>数据集(传值：add、update)<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_custpool_getcustpools += "<tr><td style='width:150px;'>customerId</td><td style='width:120px;'>Vector</td><td>客户ID(isCUD为 delete、update时必传)</td></tr>";	

	
//响应内容
var	resContent_custpool_getcustpools = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	resContent_custpool_getcustpools += "<tr><td></td><td style='width:150px;'>custpoolId</td><td>String </td><td>联系人Id </td></tr>"
	resContent_custpool_getcustpools += "<tr><td></td><td style='width:150px;'>custpoolName</td><td>String </td><td>联系人名称 </td></tr>"
	
$.custpool_getcustpools = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_custpool_getcustpools+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_custpool_getcustpools+"</table>";
	


	
	
	
	
	
/************************************************客户****************************************/
//请求内容
var	reqContent_cust_1ist = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_1ist += "<tr><td style='width:150px;'>isHome</td><td style='width:120px;'>boolean</td><td>Home进入列表标识(Home键中模块进入列表必传,传值：true或false)</td></tr>";	
	reqContent_cust_1ist += "<tr><td style='width:150px;'>listtemplateVer</td><td style='width:120px;'>String</td><td>列表模板版本号,版本号一致时不再返回模板(未知时 传值：none)</td></tr>";	
	reqContent_cust_1ist += "<tr><td style='width:150px;'>orderField</td><td style='width:120px;'>String</td><td>要排序的字段(调用系统接口中的获取排序字段接口获取)</td></tr>";	
	reqContent_cust_1ist += "<tr><td style='width:150px;'>orderType</td><td style='width:120px;'>String</td><td>排序类型 (desc:降序,asc:升序)</td></tr>";	
	reqContent_cust_1ist += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>来自关联中的模块Id</td></tr>";	
	reqContent_cust_1ist += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td>来自关联中的模块标识<a href='#' onclick='showModulePort();return false;'>(点我见详情)</a></td></tr>";	
	
//响应内容
var	resContent_cust_1ist = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_cust_1ist += "<tr style='height:30px;'><td colspan='3'>以下是数据集：<td></tr>";	
	
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>listdata</td><td>Vector</td><td>数据集(以模板为准)</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>id</td><td>String</td><td>数据主键Id</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>公司名称</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>ownerName</td><td>String</td><td>所有者名称</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>customerStatus</td><td>String </td><td>客户状态</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>....</td><td>....</td><td>....</td></tr>";
	
	resContent_cust_1ist += "<tr style='height:30px;'><td colspan='3'>以下是筛选项集(非Home键进入无值)：<td></tr>";	
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>listScreen</td><td>Vector</td><td>筛选项</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>筛选名称</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>field</td><td>String</td><td>筛选标识</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>values</td><td>Vector</td><td>选项值集合</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>筛选值名称</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>identif</td><td>String</td><td>筛选值标识</td></tr>";
	
	resContent_cust_1ist += "<tr style='height:30px;'><td colspan='3'>以下是视图集(非Home键进入无值)：<td></tr>";	
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>listViews</td><td>Vector</td><td>视图</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>viewName</td><td>String</td><td>视图名称</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>viewId</td><td>String</td><td>视图ID</td></tr>";
	
	
	
	
	resContent_cust_1ist += "<tr style='height:30px;'><td colspan='3'>以下是模板版本号：<td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>listtemplateVer</td><td>String</td><td>模板版本号</td></tr>";
	
	
	resContent_cust_1ist += "<tr style='height:30px;'><td colspan='3'>以下是模板中字段说明，具体明细请参考实例：<td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>listtemplate</td><td>String</td><td>模板</td></tr>";
	
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>textKeys</td><td>Vector</td><td>列表粗体标题字段集</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>imgUrl</td><td>Vector</td><td>列表Url字段</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>isIdField</td><td>Vector</td><td>Id主键字段</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>ishidFields</td><td>Vector</td><td>列表隐藏字段集合</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>所有行字段集</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>defaultKey</td><td>Vector</td><td>每行显示字段集</td></tr>";
	
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>operations</td><td>Vector</td><td>操作功能</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>operationType</td><td>String</td><td><a href='#' onclick='showListTemplateCode();return false;'>操作类型(点我见详情)</a></td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>operationName</td><td>String</td><td>操作名称</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Boolean</td><td>是否需调用接口</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
	resContent_cust_1ist += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
	
	resContent_cust_1ist += "<tr style='height:30px;'><td colspan='3'>以下是模板实例：<td></tr>";

	resContent_cust_1ist += "<tr><td></td><td colspan='2'>{'textKeys': ['companyName','custpoolName'], 'imgUrl': 'url','isIdField': 'customerId','property':[ {'defaultKey': ['time','number']}, {'defaultKey': ['reason']}],'operations':[{'operationType': 'phone','isInvokPort': false},{'operationType': '认领','isInvokPort': true,'invokPort': {'paras': [{'paraProperty': 'customerId'}],'resParas':[{'paraProperty':'customerId'}],'method': 'cus_claim'}}]}</td></tr>";

	
	
		
$.cust_list = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_cust_1ist+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_cust_1ist+"</table>";




/******************************获取数据增删改***************************/
//请求内容
var	reqContent_cust_cud = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td style='width:150px;'>isCUD</td><td style='width:120px;'>String</td><td style='width:180px;'>(传值：add、update、delete)<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>客户ID(isCUD为 delete、update时必传)</td></tr>";	

	reqContent_cust_cud += "<tr><td style='width:150px;'>custPoollist</td><td style='width:120px;'>Vector</td><td>数据集(新增、修改必传)</td></tr>";	
	reqContent_cust_cud += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>公司名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td></td><td style='width:150px;'>address</td><td style='width:120px;'>String</td><td>地址<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td></td><td style='width:150px;'>website</td><td style='width:120px;'>String</td><td>网站<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td></td><td style='width:150px;'>fax</td><td style='width:120px;'>String</td><td>传真<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td></td><td style='width:150px;'>customerStatus</td><td style='width:120px;'>String</td><td>客户状态<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td></td><td style='width:150px;'>creatorName</td><td style='width:120px;'>String</td><td>创建者名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td></td><td style='width:150px;'>modifierName</td><td style='width:120px;'>String</td><td>修改者名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td></td><td style='width:150px;'>clueCreatorName</td><td style='width:120px;'>String</td><td>线索创建者名称</td></tr>";	

	
//响应内容
var	resContent_custpool_cud = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
		
$.cust_cud = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_cust_cud+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";
	
	


	
/******************************客户获取详情***************************/
//请求内容
var	reqContent_cust_getinfobyid = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_getinfobyid += "<tr><td style='width:150px;'>customerId</td><td style='width:120px;'>Vector</td><td>客户ID(不传值，默认只获取模板)</span></td></tr>";	
	reqContent_cust_getinfobyid += "<tr><td style='width:150px;'>formtemplateVer</td><td style='width:120px;'>String</td><td>模板版本号,<span style='color:red;'>版本号一致时不再返回模板(未知时 传值：none)(必传)</span></td></tr>";	
	
//响应内容
var	resContent_cust_getinfobyid = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>formFun</td><td>Vector </td><td>表单功能 </td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>显示名 </td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>identif</td><td>String </td><td>标识</td></tr>";
	
		
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>formrelmodules</td><td>Vector</td><td>关联的模块</td></tr>";	
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>relevance</td><td>Vector</td><td>关联模块</td></tr>"
			resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>add</td><td>Vector</td><td>新建模块</td></tr>"
			
		
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleId</td><td>String</td><td>模块Id</td></tr>"
			resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleUrl</td><td>String</td><td>模块名图像URL</td></tr>"
				resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleName</td><td>String</td><td>模块名</td></tr>"
					resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>modulePort</td><td>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a></td></tr>"
			
		
		
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>formInfo</td><td>Vector </td><td><a href='#' onclick='showFormFun();return false;'>表单功能(点我见详情)</a>  </td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>数据主键Id</td></tr>";	
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>公司名称</td></tr>";	
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>address</td><td style='width:120px;'>String</td><td>地址</td></tr>";	
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>website</td><td style='width:120px;'>String</td><td>网站</td></tr>";	
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>fax</td><td style='width:120px;'>String</td><td>传真</td></tr>";	
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>customerStatus</td><td style='width:120px;'>String</td><td>客户状态</td></tr>";	
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>creatorName</td><td style='width:120px;'>String</td><td>创建者名称</td></tr>";	
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>modifierName</td><td style='width:120px;'>String</td><td>修改者名称</td></tr>";	
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>clueCreatorName</td><td style='width:120px;'>String</td><td>线索创建者名称</td></tr>";	

	resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>isformInfo</td><td>String </td><td>0不显示  1显示时间轴 2显示审批流 3都显示</td></tr>";
	
	resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>formInfoComAndPraise</td><td>String </td><td>评论和点赞</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>praises</td><td>Vector </td><td>点赞集</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>userId</td><td>String </td><td>点赞人Id</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>userName</td><td>String </td><td>点赞人名称</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>commentsNum</td><td>int</td><td>评论数</td></tr>";
		
		
		resContent_cust_getinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板版本号：<td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>formtemplateVer</td><td>String</td><td>模板版本号</td></tr>";
		
		
		resContent_cust_getinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板中字段说明，具体明细请参考实例：<td></tr>";
		
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>formtemplate</td><td>String </td><td>表单模板 </td></tr>";
		
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>forms</td><td>Vector</td><td>表单版块集</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>boardTitleOnly</td><td>String</td><td>版块标题</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>Boolean</td><td>是否显示此版块</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldSet</td><td>Vector</td><td>字段集</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldTitle</td><td>String</td><td>字段标题</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>pojoProperty</td><td>String</td><td>字段属性名</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>pojoPropertyName</td><td>String</td><td>字段属性显示名称</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>String</td><td>此字段是否展示</td></tr>";
		
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>字段属性集</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldType</td><td>Vector</td><td>字段类型</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>readOnly</td><td>Vector</td><td>是否只读</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>defaultVal</td><td>Vector</td><td>默认Value</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Vector</td><td>是否需要调接口</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口请求参数类型</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口响应参数类型</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>isShowHide</td><td>String</td><td>true 显示，false 隐藏</td></tr>";
		resContent_cust_getinfobyid += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
		
		resContent_cust_getinfobyid += "<tr style='height:30px;'><td colspan='3'>请测试接口获取实例展示结构<td></tr>";
		
		
		
		
		
$.cust_getinfobyid = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_cust_getinfobyid+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_cust_getinfobyid+"</table>";
	
	




/******************************获取数据增删改***************************/
//请求内容
var	reqContent_cust_cud = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td style='width:150px;'>isCUD</td><td style='width:120px;'>String</td><td style='width:180px;'>(传值：add、update、delete)<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>客户ID(isCUD为 delete、update时必传)</td></tr>";	

	reqContent_cust_cud += "<tr><td style='width:150px;'>custPoollist</td><td style='width:120px;'>Vector</td><td>数据集(新增、修改必传)</td></tr>";	
	reqContent_cust_cud += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>公司名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td></td><td style='width:150px;'>address</td><td style='width:120px;'>String</td><td>地址<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td></td><td style='width:150px;'>website</td><td style='width:120px;'>String</td><td>网站<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td></td><td style='width:150px;'>fax</td><td style='width:120px;'>String</td><td>传真<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td></td><td style='width:150px;'>customerStatus</td><td style='width:120px;'>String</td><td>客户状态<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td></td><td style='width:150px;'>creatorName</td><td style='width:120px;'>String</td><td>创建者名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td></td><td style='width:150px;'>modifierName</td><td style='width:120px;'>String</td><td>修改者名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cust_cud += "<tr><td></td><td style='width:150px;'>clueCreatorName</td><td style='width:120px;'>String</td><td>线索创建者名称</td></tr>";	

	
//响应内容
var	resContent_custpool_cud = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
		
$.cust_cud = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_cust_cud+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";
	


/******************************打回原因***************************/
//请求内容
var	reqContent_cust_backreason = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";


//响应内容
var	resContent_cust_backreason = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";
	resContent_cust_backreason += "<tr><td></td><td style='width:150px;'>abbr</td><td>String</td><td>简写</td></tr>";
	resContent_cust_backreason += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>字典项名</td></tr>";
	resContent_cust_backreason += "<tr><td></td><td style='width:150px;'>projectId</td><td>String</td><td>项目Id</td></tr>";
	resContent_cust_backreason += "<tr><td></td><td style='width:150px;'>seq</td><td>String</td><td>排序</td></tr>";
	resContent_cust_backreason += "<tr><td></td><td style='width:150px;'>state</td><td>String</td><td>状态</td></tr>";
	resContent_cust_backreason += "<tr><td></td><td style='width:150px;'>value</td><td>String</td><td>字典项值</td></tr>";


$.cust_backreason = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_cust_backreason+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_cust_backreason+"</table>";


/******************************附近的客户***************************/
//请求内容
var	reqContent_cust_nearbycus = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_cust_nearbycus += "<tr><td style='width:150px;'>moduleId</td><td style='width:120px;'>String</td><td style='width:180px;'>模块ID<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_cust_nearbycus += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td>模块标识<a href='#' onclick='showModulePort();return false;'>(点我见详情)</a></td></tr>";
	reqContent_cust_nearbycus += "<tr><td style='width:150px;'>jd</td><td style='width:120px;'>Double</td><td>参考目标中的经度</td></tr>";
	reqContent_cust_nearbycus += "<tr><td style='width:150px;'>wd</td><td style='width:120px;'>Double</td><td>参考目标中的纬度</td></tr>";
	reqContent_cust_nearbycus += "<tr><td style='width:150px;'>bj</td><td style='width:120px;'>Double</td><td>目标范围</td></tr>";

//响应内容
var	resContent_cust_nearbycus = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";


var resMessage_cust_nearbycus = "</br>&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-size:13px;'>客户集 key:bh_customer</span></br>";
	resMessage_cust_nearbycus += "&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-size:13px;'>[0-id] [1-name] [2-经度] [3-维度] [4-地址] [5-固话] [6-头像URL]</span></br></br>";

	resMessage_cust_nearbycus += "&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-size:13px;'>客户池集 key:bh_customer_pool</span></br>";
	resMessage_cust_nearbycus += "&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-size:13px;'>[0-id] [1-name] [2-经度] [3-维度] [4-地址] [5-固话] [6-头像URL]</span></br></br>";

	resMessage_cust_nearbycus += "&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-size:13px;'>联系人 key:bh_contact</span></br>";
	resMessage_cust_nearbycus += "&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-size:13px;'>[0-id] [1-客户ID] [2-客户名称] [3-name] [4-经度] [5-维度] [6-地址] [7-固话] [8-手机号] [9-头像URL]</span></br></br>";

	resMessage_cust_nearbycus += "&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-size:13px;'>线索集 key:bh_clue</span></br>";
	resMessage_cust_nearbycus += "&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-size:13px;'>[0-id] [1-name] [2-经度] [3-维度] [4-地址] [5-固话] [6-手机号] [7-头像URL]</span></br></br>";

	resMessage_cust_nearbycus += "&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-size:13px;'>线索池集 key:bh_clue_pool</span></br>";
	resMessage_cust_nearbycus += "&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-size:13px;'>[0-id] [1-name] [2-经度] [3-维度] [4-地址] [5-固话] [6-手机号] [7-头像URL]</span>";





$.cust_nearbycus = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_cust_nearbycus+"</table>" +
	"<h3>响应：</h3>"+resLine+resContent_cust_nearbycus+"</table>"+resMessage_cust_nearbycus;


	resContent_cust_nearbycus += "<tr><td></td><td style='width:150px;'>wd</td><td>String</td><td>纬度</td></tr>";



/******************************币种***************************/
//请求内容
var	reqContent_cust_currency = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_cust_currency = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";
	resContent_cust_currency += "<tr><td></td><td style='width:150px;'>id</td><td>String</td><td>id</td></tr>";
	resContent_cust_currency += "<tr><td></td><td style='width:150px;'>currencySymbol</td><td>String</td><td>币符</td></tr>";
	resContent_cust_currency += "<tr><td></td><td style='width:150px;'>currencyName</td><td>String</td><td>币名</td></tr>";
	resContent_cust_currency += "<tr><td></td><td style='width:150px;'>exchrateType</td><td>String</td><td>汇率类型</td></tr>";
	resContent_cust_currency += "<tr><td></td><td style='width:150px;'>exchrateDate</td><td>String</td><td>汇率日期</td></tr>";
	resContent_cust_currency += "<tr><td></td><td style='width:150px;'>transmode</td><td>String</td><td>折算方式</td></tr>";

	resContent_cust_currency += "<tr><td></td><td style='width:150px;'>stopDate</td><td>String</td><td>停用日期</td></tr>";
	resContent_cust_currency += "<tr><td></td><td style='width:150px;'>refState</td><td>String</td><td>引用状态</td></tr>";
	resContent_cust_currency += "<tr><td></td><td style='width:150px;'>standardMoney</td><td>String</td><td>是否本位币  1:是,0:否</td></tr>";
	resContent_cust_currency += "<tr><td></td><td style='width:150px;'>stanmoneyRate</td><td>String</td><td>本位币汇率</td></tr>";


$.cust_currency = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_cust_currency+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_cust_currency+"</table>";

/******************************结算方式***************************/
//请求内容
var	reqContent_cust_settlement = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_cust_settlement = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";
	resContent_cust_settlement += "<tr><td></td><td style='width:150px;'>id</td><td>String</td><td>id</td></tr>";
	resContent_cust_settlement += "<tr><td></td><td style='width:150px;'>settlementCode</td><td>String</td><td>结算方式编码</td></tr>";
	resContent_cust_settlement += "<tr><td></td><td style='width:150px;'>settlementName</td><td>String</td><td>结算方式名称</td></tr>";
	resContent_cust_settlement += "<tr><td></td><td style='width:150px;'>stopDate</td><td>String</td><td>停用日期</td></tr>";
	resContent_cust_settlement += "<tr><td></td><td style='width:150px;'>refState</td><td>String</td><td>引用状态</td></tr>";
	resContent_cust_settlement += "<tr><td></td><td style='width:150px;'>value</td><td>String</td><td>字典项值</td></tr>";



$.cust_settlement = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_cust_settlement+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_cust_settlement+"</table>";




})(TestInfo);