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
var	reqContent_cluepool_list = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cluepool_list += "<tr><td style='width:150px;'>isHome</td><td style='width:120px;'>boolean</td><td>Home进入列表标识(Home键中模块进入列表必传,传值：true或false)</td></tr>";	
	reqContent_cluepool_list += "<tr><td style='width:150px;'>listtemplateVer</td><td style='width:120px;'>String</td><td>列表模板版本号,版本号一致时不再返回模板(未知时 传值：none)</td></tr>";	
	reqContent_cluepool_list += "<tr><td style='width:150px;'>orderField</td><td style='width:120px;'>String</td><td>要排序的字段(调用系统接口中的获取排序字段接口获取)</td></tr>";	
	reqContent_cluepool_list += "<tr><td style='width:150px;'>orderType</td><td style='width:120px;'>String</td><td>排序类型 (desc:降序,asc:升序)</td></tr>";	
	reqContent_cluepool_list += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>来自关联中的模块Id</td></tr>";	
	reqContent_cluepool_list += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td>来自关联中的模块标识<a href='#' onclick='showModulePort();return false;'>(点我见详情)</a></td></tr>";	
	reqContent_cluepool_list += "<tr><td style='width:150px;'>relType</td><td style='width:120px;'>String</td><td>1 关联已有的选择 2 关联中的新增</td></tr>";
	reqContent_cluepool_list += "<tr><td style='width:150px;'>viewId</td><td style='width:120px;'>String</td><td>所选视图Id</td></tr>";
	reqContent_cluepool_list += "<tr><td style='width:150px;'>dicPojoName</td><td style='width:120px;'>String</td><td>字典PojoName</td></tr>";
	reqContent_cluepool_list += "<tr><td style='width:150px;'>dicValue</td><td style='width:120px;'>String</td><td>字典值</td></tr>";	
	
//响应内容
var	resContent_cluepool_list = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_cluepool_list += "<tr style='height:30px;'><td colspan='3'>以下是数据集：<td></tr>";	
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>listdata</td><td>Vector</td><td>数据集(以模板为准)</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>id</td><td>String</td><td>数据主键ID</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>公司名</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>mobilePhone</td><td>String </td><td>手机号</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>origine</td><td>String</td><td>来源</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>...</td><td>String</td><td>次数</td></tr>";
	
	

	resContent_cluepool_list += "<tr style='height:30px;'><td colspan='3'>以下是筛选项集(非Home键进入无值)：<td></tr>";	
	resContent_cluepool_list += "<tr><td></td><td>listScreen</td><td>Vector</td><td>筛选项</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td>dicName</td><td>String</td><td>筛选显示名称</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td>dicPojoName</td><td>String</td><td>筛选字段</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td>dicValues</td><td>Vector</td><td>筛选项集</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td></td><td>id</td><td>String</td><td>选项项Id</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td></td><td>name</td><td>String</td><td>选项项名称</td></tr>";
	
	
	
	resContent_cluepool_list += "<tr style='height:30px;'><td colspan='3'>以下是视图集(非Home键进入无值)：<td></tr>";	
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>listViews</td><td>Vector</td><td>视图</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>viewName</td><td>String</td><td>视图名称</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>viewId</td><td>String</td><td>视图ID</td></tr>";
	
	
	
	
	resContent_cluepool_list += "<tr style='height:30px;'><td colspan='3'>以下是模板版本号：<td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>listtemplateVer</td><td>String</td><td>模板版本号</td></tr>";
	
	
	resContent_cluepool_list += "<tr style='height:30px;'><td colspan='3'>以下是模板中字段说明，具体明细请参考实例：<td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>listtemplate</td><td>String</td><td>模板</td></tr>";
	
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>textKeys</td><td>Vector</td><td>列表粗体标题字段集</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>imgUrl</td><td>Vector</td><td>列表Url字段</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>isIdField</td><td>Vector</td><td>Id主键字段</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>ishidFields</td><td>Vector</td><td>列表隐藏字段集合</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>所有行字段集</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>defaultKey</td><td>Vector</td><td>每行显示字段集</td></tr>";
	
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>operations</td><td>Vector</td><td>操作功能</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>operationType</td><td>String</td><td><a href='#' onclick='showListTemplateCode();return false;'>操作类型(点我见详情)</a></td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>operationName</td><td>String</td><td>操作名称</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Boolean</td><td>是否需调用接口</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
	resContent_cluepool_list += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
	
	resContent_cluepool_list += "<tr style='height:30px;'><td colspan='3'>以下是模板实例：<td></tr>";

	resContent_cluepool_list += "<tr><td></td><td colspan='2'>{'textKeys': ['companyName','contactName'], 'imgUrl': 'url','isIdField': 'customerId','property':[ {'defaultKey': ['time','number']}, {'defaultKey': ['reason']}],'operations':[{'operationType': 'phone','isInvokPort': false},{'operationType': '认领','isInvokPort': true,'invokPort': {'paras': [{'paraProperty': 'customerId'}],'resParas':[{'paraProperty':'customerId'}],'method': 'cus_claim'}}]}</td></tr>";

	
	
		
$.cluepool_list = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_cluepool_list+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_cluepool_list+"</table>";
	
	



/******************************线索池获取详情***************************/
//请求内容
var	reqContent_cluepool_getinfobyid = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cluepool_getinfobyid += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>Vector</td><td>线索数据id(不传值，默认只获取模板)</span></td></tr>";	
	reqContent_cluepool_getinfobyid += "<tr><td style='width:150px;'>formtemplateVer</td><td style='width:120px;'>String</td><td>模板版本号,<span style='color:red;'>版本号一致时不再返回模板(未知时 传值：none)(必传)</span></td></tr>";	
	
//响应内容
var	resContent_cluepool_getinfobyid = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>formFun</td><td>Vector </td><td><a href='#' onclick='showFormFun();return false;'>表单功能(点我见详情)</a>  </td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>显示名 </td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>identif</td><td>String </td><td>标识</td></tr>";
	
	
	resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>formrelmodules</td><td>Vector</td><td>关联的模块</td></tr>";	
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>relevance</td><td>Vector</td><td>关联模块</td></tr>"
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>add</td><td>Vector</td><td>新建模块</td></tr>"
			
	
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleId</td><td>String</td><td>模块Id</td></tr>"
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleUrl</td><td>String</td><td>模块名图像URL</td></tr>"
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleName</td><td>String</td><td>模块名</td></tr>"
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>modulePort</td><td>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a></td></tr>"
		
		
		
	resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>formInfo</td><td>Vector </td><td>表单详情 </td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>客户名称 </td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>sex</td><td>String </td><td>性别 </td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>email</td><td>String </td><td>email </td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>....</td><td>String </td><td>.... </td></tr>";
		
		
	resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>formInfoComAndPraise</td><td>String </td><td>评论和点赞</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>praises</td><td>Vector </td><td>点赞集</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>userId</td><td>String </td><td>点赞人Id</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>userName</td><td>String </td><td>点赞人名称</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>commentsNum</td><td>int</td><td>评论数</td></tr>";
		
		
		resContent_cluepool_getinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板版本号：<td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>formtemplateVer</td><td>String</td><td>模板版本号</td></tr>";
		
		
		resContent_cluepool_getinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板中字段说明，具体明细请参考实例：<td></tr>";
		
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>formtemplate</td><td>String </td><td>表单模板 </td></tr>";
		
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>forms</td><td>Vector</td><td>表单版块集</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>boardTitleOnly</td><td>String</td><td>版块标题</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>Boolean</td><td>是否显示此版块</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldSet</td><td>Vector</td><td>字段集</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldTitle</td><td>String</td><td>字段标题</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>pojoProperty</td><td>String</td><td>字段属性名</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>pojoPropertyName</td><td>String</td><td>字段属性显示名称</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>String</td><td>此字段是否展示</td></tr>";
		
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>字段属性集</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldType</td><td>Vector</td><td>字段类型</td></tr>";
		
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>optionParas</td><td>Vector</td><td>字段选项</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>显示名</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>identity</td><td>Vector</td><td>唯一标识</td></tr>";
		
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>readOnly</td><td>Vector</td><td>是否只读</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>defaultVal</td><td>Vector</td><td>默认Value</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Vector</td><td>是否需要调接口</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口请求参数类型</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口响应参数类型</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>isShowHide</td><td>String</td><td>true 显示，false 隐藏</td></tr>";
		resContent_cluepool_getinfobyid += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
		
		resContent_cluepool_getinfobyid += "<tr style='height:30px;'><td colspan='3'>请测试接口获取实例展示结构<td></tr>";
		
		
		
		
		
$.cluepool_getinfobyid = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_cluepool_getinfobyid+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_cluepool_getinfobyid+"</table>";






/******************************获取池数据增删改***************************/
//请求内容
var	reqContent_cluepool_cud = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cluepool_cud += "<tr><td style='width:150px;'>isCUD</td><td style='width:120px;'>String</td><td style='width:180px;'>(传值：add、update、delete)<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cluepool_cud += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>线索池数据id(isCUD为 delete、update时必传)</td></tr>";	

	reqContent_cluepool_cud += "<tr><td style='width:150px;'>cluePoollist</td><td style='width:120px;'>Vector</td><td>数据集(新增、修改必传)</td></tr>";	
	reqContent_cluepool_cud += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>客户名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cluepool_cud += "<tr><td></td><td style='width:150px;'>address</td><td style='width:120px;'>String</td><td>地址<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cluepool_cud += "<tr><td></td><td style='width:150px;'>website</td><td style='width:120px;'>String</td><td>网站</td></tr>";	
	reqContent_cluepool_cud += "<tr><td></td><td style='width:150px;'>fax</td><td style='width:120px;'>String</td><td>传真</td></tr>";	
	reqContent_cluepool_cud += "<tr><td></td><td style='width:150px;'>contactName</td><td style='width:120px;'>String</td><td>联系人名称</td></tr>";	
	reqContent_cluepool_cud += "<tr><td></td><td style='width:150px;'>position</td><td style='width:120px;'>String</td><td>职位</td></tr>";	
	reqContent_cluepool_cud += "<tr><td></td><td style='width:150px;'>sex</td><td style='width:120px;'>String</td><td>性别</td></tr>";	
	reqContent_cluepool_cud += "<tr><td></td><td style='width:150px;'>mobilePhone</td><td style='width:120px;'>String</td><td>手机号</td></tr>";	
	reqContent_cluepool_cud += "<tr><td></td><td style='width:150px;'>fixedPhone</td><td style='width:120px;'>String</td><td>固话</td></tr>";	
	reqContent_cluepool_cud += "<tr><td></td><td style='width:150px;'>birthday</td><td style='width:120px;'>String</td><td>生日</td></tr>";	
	reqContent_cluepool_cud += "<tr><td></td><td style='width:150px;'>wechat</td><td style='width:120px;'>String</td><td>微信</td></tr>";	
	reqContent_cluepool_cud += "<tr><td></td><td style='width:150px;'>qq</td><td style='width:120px;'>String</td><td>qq</td></tr>";	
	reqContent_cluepool_cud += "<tr><td></td><td style='width:150px;'>email</td><td style='width:120px;'>String</td><td>Email</td></tr>";	

	
//响应内容
var	resContent_cluepool_cud = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
		
$.cluepool_cud = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_cluepool_cud+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";







/*******************************线索池数据认领*********************************/

//请求内容
var	reqContent_cluepool_claim = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_cluepool_claim += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>线索池数据id<span style='color:red;'>(必传)</span></td></tr>";	
		
//响应内容
var	resContent_cluepool_claim = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
		
$.cluepool_claim = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_cluepool_claim+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";







/***********************************************线索**********************************************/


/******************************线索列表***************************/
//请求内容
var	reqContent_clue_list = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_clue_list += "<tr><td style='width:150px;'>isHome</td><td style='width:120px;'>boolean</td><td>Home进入列表标识(Home键中模块进入列表必传,传值：true或false)</td></tr>";	
	reqContent_clue_list += "<tr><td style='width:150px;'>listtemplateVer</td><td style='width:120px;'>String</td><td>列表模板版本号,版本号一致时不再返回模板(未知时 传值：none)</td></tr>";	
	reqContent_clue_list += "<tr><td style='width:150px;'>orderField</td><td style='width:120px;'>String</td><td>要排序的字段(调用系统接口中的获取排序字段接口获取)</td></tr>";	
	reqContent_clue_list += "<tr><td style='width:150px;'>orderType</td><td style='width:120px;'>String</td><td>排序类型 (desc:降序,asc:升序)</td></tr>";	
	reqContent_clue_list += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>来自关联中的模块Id</td></tr>";	
	reqContent_clue_list += "<tr><td style='width:150px;'>relType</td><td style='width:120px;'>String</td><td>1 关联已有的选择 2 关联中的新增</td></tr>";
	reqContent_clue_list += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td>来自关联中的模块标识<a href='#' onclick='showModulePort();return false;'>(点我见详情)</a></td></tr>";
	
//响应内容
var	resContent_clue_list = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_clue_list += "<tr style='height:30px;'><td colspan='3'>以下是数据集：<td></tr>";	
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>listdata</td><td>Vector</td><td>数据集(以模板为准)</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>id</td><td>String</td><td>数据主键ID</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>ownerName</td><td>String</td><td>所有者</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>mobilePhone</td><td>String </td><td>手机号</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>sex</td><td>String</td><td>性别</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>...</td><td>String</td><td>次数</td></tr>";
		
	resContent_clue_list += "<tr style='height:30px;'><td colspan='3'>以下是筛选项集(非Home键进入无值)：<td></tr>";	
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>listScreen</td><td>Vector</td><td>筛选项</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>筛选名称</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>field</td><td>String</td><td>筛选标识</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>values</td><td>Vector</td><td>选项值集合</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>筛选值名称</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>identif</td><td>String</td><td>筛选值标识</td></tr>";
	
	resContent_clue_list += "<tr style='height:30px;'><td colspan='3'>以下是视图集(非Home键进入无值)：<td></tr>";	
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>listViews</td><td>Vector</td><td>视图</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>viewName</td><td>String</td><td>视图名称</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>viewId</td><td>String</td><td>视图ID</td></tr>";
	
	
	
	
	resContent_clue_list += "<tr style='height:30px;'><td colspan='3'>以下是模板版本号：<td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>listtemplateVer</td><td>String</td><td>模板版本号</td></tr>";
	
	
	resContent_clue_list += "<tr style='height:30px;'><td colspan='3'>以下是模板中字段说明，具体明细请参考实例：<td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>listtemplate</td><td>String</td><td>模板</td></tr>";
	
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>textKeys</td><td>Vector</td><td>列表粗体标题字段集</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>imgUrl</td><td>Vector</td><td>列表Url字段</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>isIdField</td><td>Vector</td><td>Id主键字段</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>ishidFields</td><td>Vector</td><td>列表隐藏字段集合</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>所有行字段集</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>defaultKey</td><td>Vector</td><td>每行显示字段集</td></tr>";
	
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>operations</td><td>Vector</td><td>操作功能</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>operationType</td><td>String</td><td><a href='#' onclick='showListTemplateCode();return false;'>操作类型(点我见详情)</a></td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>operationName</td><td>String</td><td>操作名称</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Boolean</td><td>是否需调用接口</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
	resContent_clue_list += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
	
	resContent_clue_list += "<tr style='height:30px;'><td colspan='3'>以下是模板实例：<td></tr>";

	resContent_clue_list += "<tr><td></td><td colspan='2'>{'textKeys': ['companyName','contactName'], 'imgUrl': 'url','isIdField': 'customerId','property':[ {'defaultKey': ['time','number']}, {'defaultKey': ['reason']}],'operations':[{'operationType': 'phone','isInvokPort': false},{'operationType': '认领','isInvokPort': true,'invokPort': {'paras': [{'paraProperty': 'customerId'}],'resParas':[{'paraProperty':'customerId'}],'method': 'cus_claim'}}]}</td></tr>";

	
	
		
$.clue_list = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_clue_list+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_clue_list+"</table>";
	
	



/******************************获取详情***************************/
//请求内容
var	reqContent_clue_getinfobyid = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_clue_getinfobyid += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>Vector</td><td>线索数据id(不传值，默认只获取模板)</span></td></tr>";	
	reqContent_clue_getinfobyid += "<tr><td style='width:150px;'>formtemplateVer</td><td style='width:120px;'>String</td><td>模板版本号,<span style='color:red;'>版本号一致时不再返回模板(未知时 传值：none)(必传)</span></td></tr>";	
	
//响应内容
var	resContent_clue_getinfobyid = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>formFun</td><td>Vector </td><td><a href='#' onclick='showFormFun();return false;'>表单功能(点我见详情)</a></td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>显示名 </td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>identif</td><td>String </td><td>标识</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>options</td><td>Vector </td><td>打回原因数组(当identif为打回标识，返回此参数，否则无)</td></tr>";
	
	resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>formrelmodules</td><td>Vector</td><td>关联的模块</td></tr>";	
	resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>relevance</td><td>Vector</td><td>关联模块</td></tr>"
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>add</td><td>Vector</td><td>新建模块</td></tr>"
		
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleId</td><td>String</td><td>模块Id</td></tr>"
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleUrl</td><td>String</td><td>模块名图像URL</td></tr>"
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleName</td><td>String</td><td>模块名</td></tr>"
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>modulePort</td><td>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a></td></tr>"
	
		
		
	resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>formInfo</td><td>Vector </td><td>表单详情 </td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>客户名称 </td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>sex</td><td>String </td><td>性别 </td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>email</td><td>String </td><td>email </td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>....</td><td>String </td><td>.... </td></tr>";
	
	resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>formInfoComAndPraise</td><td>String </td><td>评论和点赞</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>praises</td><td>Vector </td><td>点赞集</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>userId</td><td>String </td><td>点赞人Id</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>userName</td><td>String </td><td>点赞人名称</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>commentsNum</td><td>int</td><td>评论数</td></tr>";
			
		
		resContent_clue_getinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板版本号：<td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>formtemplateVer</td><td>String</td><td>模板版本号</td></tr>";
		
		
		resContent_clue_getinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板中字段说明，具体明细请参考实例：<td></tr>";
		
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>formtemplate</td><td>String </td><td>表单模板 </td></tr>";
		
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>forms</td><td>Vector</td><td>表单版块集</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>boardTitleOnly</td><td>String</td><td>版块标题</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>Boolean</td><td>是否显示此版块</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldSet</td><td>Vector</td><td>字段集</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldTitle</td><td>String</td><td>字段标题</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>pojoProperty</td><td>String</td><td>字段属性名</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>pojoPropertyName</td><td>String</td><td>字段属性显示名称</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>String</td><td>此字段是否展示</td></tr>";
		
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>字段属性集</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldType</td><td>Vector</td><td>字段类型</td></tr>";
		
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>optionParas</td><td>Vector</td><td>字段选项</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>显示名</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>identity</td><td>Vector</td><td>唯一标识</td></tr>";
		
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>readOnly</td><td>Vector</td><td>是否只读</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>defaultVal</td><td>Vector</td><td>默认Value</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Vector</td><td>是否需要调接口</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口请求参数类型</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口响应参数类型</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>isShowHide</td><td>String</td><td>true 显示，false 隐藏</td></tr>";
		resContent_clue_getinfobyid += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
		
		resContent_clue_getinfobyid += "<tr style='height:30px;'><td colspan='3'>请测试接口获取实例展示结构<td></tr>";
		
		
		
		
		
$.clue_getinfobyid = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_clue_getinfobyid+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_clue_getinfobyid+"</table>";


/******************************线索数据增删改***************************/
//请求内容
var	reqContent_clue_cud = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_clue_cud += "<tr><td style='width:150px;'>isCUD</td><td style='width:120px;'>String</td><td style='width:180px;'>(传值：add、update、delete)<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_clue_cud += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>线索池数据id(isCUD为 delete、update时必传)</td></tr>";	
	
	reqContent_clue_cud += "<tr><td style='width:150px;'>cluelist</td><td style='width:120px;'>Vector</td><td>数据集(新增、修改必传)</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>ownerName</td><td style='width:120px;'>String</td><td>所有者<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>公司名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>address</td><td style='width:120px;'>String</td><td>地址</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>website</td><td style='width:120px;'>String</td><td>网站</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>fax</td><td style='width:120px;'>String</td><td>传真</td></tr>";
	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>contactName</td><td style='width:120px;'>String</td><td>联系人名称</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>position</td><td style='width:120px;'>String</td><td>职位</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>sex</td><td style='width:120px;'>String</td><td>性别</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>mobilePhone</td><td style='width:120px;'>String</td><td>手机</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>fixedPhone</td><td style='width:120px;'>String</td><td>固话</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>birthday</td><td style='width:120px;'>String</td><td>生日</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>wechat</td><td style='width:120px;'>String</td><td>微信</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>qq</td><td style='width:120px;'>String</td><td>QQ</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>email</td><td style='width:120px;'>String</td><td>Email</td></tr>";
	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>origine</td><td style='width:120px;'>String</td><td>客户来源</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>promoLogo</td><td style='width:120px;'>String</td><td>推广标识</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>origineWebsite</td><td style='width:120px;'>String</td><td>网站来源</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>origineWord</td><td style='width:120px;'>String</td><td>来源词</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>origineWebaddress</td><td style='width:120px;'>String</td><td>来源网址</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>customerState</td><td style='width:120px;'>String</td><td>客户状态</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>lostReason</td><td style='width:120px;'>String</td><td>流失原因</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>invalidReason</td><td style='width:120px;'>String</td><td>无效原因</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>notes</td><td style='width:120px;'>String</td><td>备注</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>competitorName</td><td style='width:120px;'>String</td><td>竞争对手名字</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>purchaseReason</td><td style='width:120px;'>String</td><td>采购原因</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>callNumber</td><td style='width:120px;'>String</td><td>通话次数</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>stayTime</td><td style='width:120px;'>String</td><td>停留总时长</td></tr>";	
	reqContent_clue_cud += "<tr><td></td><td style='width:150px;'>hours</td><td style='width:120px;'>String</td><td>我跟进总时长</td></tr>";	

		
//响应内容
var	resContent_clue_cud = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
		
$.clue_cud = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_clue_cud+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";


/*******************************线索数据打回*********************************/

//请求内容
var	reqContent_clue_claimback = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_clue_claimback += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>线索数据id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_clue_claimback += "<tr><td style='width:150px;'>reason</td><td style='width:120px;'>String</td><td>打回原因<span style='color:red;'>(必传)</span></td></tr>";	
		
//响应内容
var	resContent_clue_claimback = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
		
$.clue_claimback = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_clue_claimback+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";


	/*******************************线索已转换详情*********************************/

//请求内容
var	reqContent_clue_convertinfo = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_clue_convertinfo += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>线索数据id<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	resContent_clue_convertinfo = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_clue_convertinfo += "<tr><td></td><td style='width:150px;'>customerName</td><td>String</td><td>客户</td></tr>";
	resContent_clue_convertinfo += "<tr><td></td><td style='width:150px;'>customerId</td><td>String</td><td>客户ID</td></tr>";
	resContent_clue_convertinfo += "<tr><td></td><td style='width:150px;'>contactName</td><td>String</td><td>联系人</td></tr>";
	resContent_clue_convertinfo += "<tr><td></td><td style='width:150px;'>contactId</td><td>String</td><td>联系人ID</td></tr>";
	resContent_clue_convertinfo += "<tr><td></td><td style='width:150px;'>opportunityName</td><td>String</td><td>销售商机</td></tr>";
	resContent_clue_convertinfo += "<tr><td></td><td style='width:150px;'>opportunityId</td><td>String</td><td>销售商机ID</td></tr>";
$.clue_convertinfo = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_clue_convertinfo+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_clue_convertinfo+"</table>";



/*******************************线索转换客户*********************************/

//请求内容
var	reqContent_clue_convert = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_clue_convert += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>线索数据id<span style='color:red;'>(必传)</span></td></tr>";	
		
//响应内容
var	resContent_clue_convert = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	
	resContent_clue_convert += "<tr style='height:30px;'><td colspan='3'>以下是data中的数据字段说明：<td></tr>";

	resContent_clue_convert += "<tr><td style='width:150px;'>mobilePhone</td><td style='width:120px;'>String</td><td>手机号(用于区分是否有重复联系人)</td></tr>";	
	resContent_clue_convert += "<tr><td style='width:150px;'>contacts</td><td style='width:120px;'>Vector</td><td>联系人集合</td></tr>";	
	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>联系人Id</td></tr>";	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>联系人名称</td></tr>";	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>customerId</td><td style='width:120px;'>String</td><td>客户Id</td></tr>";	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>customerName</td><td style='width:120px;'>String</td><td>客户名称</td></tr>";	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>ownerId</td><td style='width:120px;'>String</td><td>所有者Id</td></tr>";	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>ownerName</td><td style='width:120px;'>String</td><td>所有者名称</td></tr>";	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>createdTime</td><td style='width:120px;'>String</td><td>创建时间</td></tr>";	
	
	resContent_clue_convert += "<tr><td style='width:150px;'>customerName</td><td style='width:120px;'>String</td><td>客户名称(用于区分是否有重复客户名)</td></tr>";	
	resContent_clue_convert += "<tr><td style='width:150px;'>customers</td><td style='width:120px;'>Vector</td><td>客户集合</td></tr>";	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>数据Id</td></tr>";	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>客户名称</td></tr>";	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>ownerId</td><td style='width:120px;'>String</td><td>所有者Id</td></tr>";	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>ownerName</td><td style='width:120px;'>String</td><td>所有者名称</td></tr>";	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>customerStatus</td><td style='width:120px;'>String</td><td>状态</td></tr>";	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>createdTime</td><td style='width:120px;'>String</td><td>创建时间</td></tr>";	
	
	resContent_clue_convert += "<tr><td style='width:150px;'>oppofields</td><td style='width:120px;'>Vector</td><td>销售机会字段</td></tr>";	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>fieldTitle</td><td>String</td><td>字段标题</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>pojoProperty</td><td>String</td><td>字段属性名</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>pojoPropertyName</td><td>String</td><td>字段属性显示名称</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>show</td><td>String</td><td>此字段是否展示</td></tr>";
	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>字段属性集</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>fieldType</td><td>Vector</td><td>字段类型</td></tr>";
	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>optionParas</td><td>Vector</td><td>字段选项</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>显示名</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>identity</td><td>Vector</td><td>唯一标识</td></tr>";
	
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>readOnly</td><td>Vector</td><td>是否只读</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>defaultVal</td><td>Vector</td><td>默认Value</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Vector</td><td>是否需要调接口</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口请求参数类型</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口响应参数类型</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>isShowHide</td><td>String</td><td>true 显示，false 隐藏</td></tr>";
	resContent_clue_convert += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
	
	
	
		
$.clue_convert = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_clue_convert+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_clue_convert+"</table>";


/*******************************线索转换客户确定*********************************/

//请求内容
var	reqContent_clue_convertoper = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_clue_convertoper += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>线索数据id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_clue_convertoper += "<tr><td style='width:150px;'>ownerId</td><td style='width:120px;'>String</td><td>所有者id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_clue_convertoper += "<tr><td style='width:150px;'>ownerName</td><td style='width:120px;'>String</td><td>所有者名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_clue_convertoper += "<tr><td style='width:150px;'>customerId</td><td style='width:120px;'>String</td><td>客户Id</td></tr>";	
	reqContent_clue_convertoper += "<tr><td style='width:150px;'>contactId</td><td style='width:120px;'>String</td><td>联系人ID</td></tr>";	
	reqContent_clue_convertoper += "<tr><td style='width:150px;'>operType</td><td style='width:120px;'>String</td><td><a href='http://192.168.1.177:8080/baihui/upload/convert.png';return false;'>状态(点我见详情)</a></td></tr>";	
	reqContent_clue_convertoper += "<tr><td style='width:150px;'>oppors</td><td style='width:120px;'>String</td><td>销售机会</td></tr>";	
	reqContent_clue_convertoper += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>商机名</td></tr>";	
	reqContent_clue_convertoper += "<tr><td></td><td style='width:150px;'>source</td><td style='width:120px;'>String</td><td>机会来源</td></tr>";	
	reqContent_clue_convertoper += "<tr><td></td><td style='width:150px;'>contractSum</td><td style='width:120px;'>String</td><td>签订金额</td></tr>";	
	reqContent_clue_convertoper += "<tr><td></td><td style='width:150px;'>contractDate</td><td style='width:120px;'>String</td><td>签约日期</td></tr>";	
	reqContent_clue_convertoper += "<tr><td></td><td style='width:150px;'>exceptedDealDate</td><td style='width:120px;'>String</td><td>预计成交日期</td></tr>";	
	reqContent_clue_convertoper += "<tr><td></td><td style='width:150px;'>status</td><td style='width:120px;'>String</td><td>阶段</td></tr>";	
	reqContent_clue_convertoper += "<tr><td></td><td style='width:150px;'>...</td><td style='width:120px;'>...</td><td>...</td></tr>";	
		
//响应内容
var	resContent_clue_convertoper = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	
	
		
$.clue_convertoper = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_clue_convertoper+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_clue_convertoper+"</table>";









})(TestInfo);