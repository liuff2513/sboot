(function($){

//请求 ：列名 请求方法
var reqLine = "<table border='1'><tr><td style='width:150px;color:#00F;'>参数名</td><td style='width:120px;color:#00F;'>参数类型</td><td style='color:#00F;'>参数说明</td></tr>";
	reqLine += "<tr><td style='width:150px;'>requestcommand</td><td style='width:120px;'>String</td><td>方法名<span style='color:red;'>(必传)</span></td></tr>";
//请求时间戳
var reqLine1 = "<tr><td style='width:150px;'>requesttime</td><td style='width:120px;'>long</td><td>请求时间戳<span style='color:red;'>(必传)</span></td></tr>";
//响应：列名 请求方法
var resLine = "<table border='1'><tr><td style='width:150px;color:#00F;'>字段名</td><td style='width:120px;color:#00F;'>字段类型</td><td style='color:#00F;width:150px;'>字段说明</td></tr>";
	resLine += "<tr><td style='width:150px;'>code</td><td style='width:120px;'>int</td><td><a href='#' onclick='showCode();return false;'>响应代码(点我见详情)</a></td></tr>";
	resLine += "<tr><td style='width:150px;'>message</td><td style='width:120px;'>String</td><td>响应文字描述 </td></tr>";

/******************************列表***************************/
//请求内容
var	resContent_activity_list = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	resContent_activity_list += "<tr><td style='width:150px;'>isHome</td><td style='width:120px;'>boolean</td><td>Home进入列表标识(Home键中模块进入列表必传,传值：true或false)</td></tr>";	
	resContent_activity_list += "<tr><td style='width:150px;'>listtemplateVer</td><td style='width:120px;'>String</td><td>列表模板版本号,版本号一致时不再返回模板(未知时 传值：none)</td></tr>";	
	resContent_activity_list += "<tr><td style='width:150px;'>orderField</td><td style='width:120px;'>String</td><td>要排序的字段</td></tr>";	
	resContent_activity_list += "<tr><td style='width:150px;'>orderType</td><td style='width:120px;'>String</td><td>排序类型 (desc:降序,asc:升序)</td></tr>";	
	
	resContent_activity_list += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>关联数据的Id</td></tr>";	
	resContent_activity_list += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td>关联数据的模块标识<a href='#' onclick='showModulePort();return false;'>(点我见详情)</a></td></tr>";	

	resContent_activity_list += "<tr><td style='width:150px;'>moduleId</td><td style='width:120px;'>String</td><td>模块ID<span style='color:red;'>(必传)</span></td></tr>";
	
	
	resContent_activity_list += "<tr><td style='width:150px;'>viewId</td><td style='width:120px;'>String</td><td>所选视图Id</td></tr>";	
	resContent_activity_list += "<tr><td style='width:150px;'>searchVallist</td><td style='width:120px;'>String</td><td>列表查询值</td></tr>";	
	resContent_activity_list += "<tr><td style='width:150px;'>dicSearch</td><td style='width:120px;'>Vector</td><td>筛选集</td></tr>";	
	resContent_activity_list += "<tr><td></td><td style='width:150px;'>dicPojoName</td><td style='width:120px;'>String</td><td>字典名</td></tr>";	
	resContent_activity_list += "<tr><td></td><td style='width:150px;'>dicValues</td><td style='width:120px;'>Vector</td><td>字典值集</td></tr>";	
	
	resContent_activity_list += "<tr><td style='width:150px;'>具体格式见实例</tr>";	
	
	
//响应内容
var	reqContent_activity_list = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	reqContent_activity_list += "<tr style='height:30px;'><td colspan='3'>以下是数据集：<td></tr>";	
	reqContent_activity_list += "<tr><td></td><td>listdata</td><td>String</td><td>数据集(以模板为准)</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>list</td><td>Vector</td><td>数据集(以模板为准)</td></tr>";
	reqContent_activity_list += "<tr><td></td><td></td><td>id</td><td>String</td><td>数据主键ID</td></tr>";
	reqContent_activity_list += "<tr><td></td><td></td><td>mobile</td><td>String</td><td>手机号</td></tr>";
	reqContent_activity_list += "<tr><td></td><td></td><td>location</td><td>String </td><td>地址</td></tr>";
	reqContent_activity_list += "<tr><td></td><td></td><td>...</td><td>....</td><td>....</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>currentPage</td><td>int</td><td>当前页数</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>limit</td><td>int</td><td>每页显示的总条数</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>total</td><td>int</td><td>总数据条数</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>pages</td><td>int</td><td>总页数</td></tr>";
	
	
	reqContent_activity_list += "<tr style='height:30px;'><td colspan='3'>以下是分享数据的权限：<td></tr>";	
	reqContent_activity_list += "<tr><td></td><td>shareOperation1</td><td>String</td><td>共享来的数据的操作权限(人到人)</td></tr>";
	reqContent_activity_list += "<tr><td></td><td></td><td>dataId</td><td>Vector</td><td>列表中数据ID</td></tr>";
	reqContent_activity_list += "<tr><td></td><td></td><td>ownerId</td><td>Vector</td><td>共享者：这条数据拥有者</td></tr>";
	reqContent_activity_list += "<tr><td></td><td></td><td>ownerName</td><td>Vector</td><td>共享者：这条数据拥有者名称</td></tr>";
	reqContent_activity_list += "<tr><td></td><td></td><td>functionFlag</td><td>Vector</td><td>是否有关联模块1.否 2.是</td></tr>";
	reqContent_activity_list += "<tr><td></td><td></td><td>operationFlag</td><td>Vector</td><td>2.只读3.读写删</td></tr>";
	
	reqContent_activity_list += "<tr><td></td><td>shareOperation2</td><td>String</td><td>1.忽略此权限 2.只读（用户可以查看）3.读写删除</td></tr>";
	
	
	reqContent_activity_list += "<tr style='height:30px;'><td colspan='3'>以下是筛选项集(非Home键进入无值)：<td></tr>";	
	reqContent_activity_list += "<tr><td></td><td>listScreen</td><td>Vector</td><td>筛选项</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>dicName</td><td>String</td><td>筛选显示名称</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>dicPojoName</td><td>String</td><td>筛选字段</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>dicValues</td><td>Vector</td><td>筛选项集</td></tr>";
	reqContent_activity_list += "<tr><td></td><td></td><td>id</td><td>String</td><td>选项项Id</td></tr>";
	reqContent_activity_list += "<tr><td></td><td></td><td>name</td><td>String</td><td>选项项名称</td></tr>";
			
	reqContent_activity_list += "<tr style='height:30px;'><td colspan='3'>以下是视图集(非Home键进入无值)：<td></tr>";	
	reqContent_activity_list += "<tr><td></td><td>listViews</td><td>Vector</td><td>视图</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>viewName</td><td>String</td><td>视图名称</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>viewId</td><td>String</td><td>视图ID</td></tr>";
		
		
	reqContent_activity_list += "<tr style='height:30px;'><td colspan='3'>以下是模板版本号：<td></tr>";
	reqContent_activity_list += "<tr><td></td><td>listtemplateVer</td><td>String</td><td>模板版本号</td></tr>";
		
		
	reqContent_activity_list += "<tr style='height:30px;'><td colspan='3'>以下是模板中字段说明，具体明细请参考实例：<td></tr>";
	reqContent_activity_list += "<tr><td></td><td>listtemplate</td><td>String</td><td>模板</td></tr>";
		
	reqContent_activity_list += "<tr><td></td><td>textKeys</td><td>Vector</td><td>列表粗体标题字段集</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>imgUrl</td><td>Vector</td><td>列表Url字段</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>isIdField</td><td>Vector</td><td>Id主键字段</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>property</td><td>Vector</td><td>所有行字段集</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>defaultKey</td><td>Vector</td><td>每行显示字段集</td></tr>";
		
	reqContent_activity_list += "<tr><td></td><td>operations</td><td>Vector</td><td>操作功能</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>operationType</td><td>String</td><td><a href='#' onclick='showListTemplateCode();return false;'>操作类型(点我见详情)</a></td></tr>";
	reqContent_activity_list += "<tr><td></td><td>operationName</td><td>String</td><td>操作名称</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>isInvokPort</td><td>Boolean</td><td>是否需调用接口</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>invokPort</td><td>String</td><td>接口</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
	reqContent_activity_list += "<tr><td></td><td>method</td><td>String</td><td>接口请求方法</td></tr>";
		
	reqContent_activity_list += "<tr style='height:30px;'><td colspan='3'>以下是模板实例：<td></tr>";
	
	reqContent_activity_list += "<tr><td></td><td colspan='2'>{'textKeys': ['companyName','contactName'], 'imgUrl': 'url','isIdField': 'customerId','property':[ {'defaultKey': ['time','number']}, {'defaultKey': ['reason']}],'operations':[{'operationType': 'phone','isInvokPort': false},{'operationType': '认领','isInvokPort': true,'invokPort': {'paras': [{'paraProperty': 'customerId'}],'resParas':[{'paraProperty':'customerId'}],'method': 'cus_claim'}}]}</td></tr>";
	
		
	
		
$.activity_list = "<h3>请求：</h3>"+reqLine+reqLine1+resContent_activity_list+"</table>" +
		"<h3>响应：</h3>"+resLine+reqContent_activity_list+"</table>";
	
	

/******************************详情***************************/
//请求内容
var	reqContent_activity_getinfobyid = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_activity_getinfobyid += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>Vector</td><td>线索数据id(不传值，默认只获取模板)</span></td></tr>";	
	reqContent_activity_getinfobyid += "<tr><td style='width:150px;'>formtemplateVer</td><td style='width:120px;'>String</td><td>模板版本号,<span style='color:red;'>版本号一致时不再返回模板(未知时 传值：none)(必传)</span></td></tr>";	
	
//响应内容
var	resContent_activity_getinfobyid = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>formFun</td><td>Vector </td><td>表单功能 </td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>显示名 </td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>identif</td><td>String </td><td>标识</td></tr>";
	
	resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>formrelmodules</td><td>String</td><td>关联的模块</td></tr>";	
	
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>relevance</td><td>Vector</td><td>关联模块</td></tr>"
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>add</td><td>Vector</td><td>新建模块</td></tr>"
				
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleId</td><td>String</td><td>模块Id</td></tr>"
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleUrl</td><td>String</td><td>模块名图像URL</td></tr>"
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleName</td><td>String</td><td>模块名</td></tr>"
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>modulePort</td><td>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a></td></tr>"
	
	
	
	resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>formInfo</td><td>Vector </td><td><a href='#' onclick='showFormFun();return false;'>表单功能(点我见详情)</a>  </td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>名称</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>status</td><td>String </td><td>状态 </td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>startDate</td><td>String </td><td>开始时间 </td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>endDate</td><td>String </td><td>结束时间</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>...</td><td>String </td><td>.... </td></tr>";
		
	resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>formInfoComAndPraise</td><td>String </td><td>评论和点赞</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>praises</td><td>Vector </td><td>点赞集</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>userId</td><td>String </td><td>点赞人Id</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>userName</td><td>String </td><td>点赞人名称</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>commentsNum</td><td>int</td><td>评论数</td></tr>";
		
		
		
		resContent_activity_getinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板版本号：<td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>formtemplateVer</td><td>String</td><td>模板版本号</td></tr>";
		
		
		resContent_activity_getinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板中字段说明，具体明细请参考实例：<td></tr>";
		
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>formtemplate</td><td>String </td><td>表单模板 </td></tr>";
		
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>forms</td><td>Vector</td><td>表单版块集</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>boardTitleOnly</td><td>String</td><td>版块标题</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>Boolean</td><td>是否显示此版块</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldSet</td><td>Vector</td><td>字段集</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldTitle</td><td>String</td><td>字段标题</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>pojoProperty</td><td>String</td><td>字段属性名</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>pojoPropertyName</td><td>String</td><td>字段属性显示名称</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>String</td><td>此字段是否展示</td></tr>";
		
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>字段属性集</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldType</td><td>Vector</td><td>字段类型</td></tr>";
		
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>optionParas</td><td>Vector</td><td>字段选项</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>显示名</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>identity</td><td>Vector</td><td>唯一标识</td></tr>";
		
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>readOnly</td><td>Vector</td><td>是否只读</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>defaultVal</td><td>Vector</td><td>默认Value</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Vector</td><td>是否需要调接口</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口请求参数类型</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口响应参数类型</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>isShowHide</td><td>String</td><td>true 显示，false 隐藏</td></tr>";
		resContent_activity_getinfobyid += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
		
		resContent_activity_getinfobyid += "<tr style='height:30px;'><td colspan='3'>请测试接口获取实例展示结构<td></tr>";
		
		
		
		
		
$.activity_getinfobyid = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_activity_getinfobyid+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_activity_getinfobyid+"</table>";






/******************************增删改***************************/
//请求内容
var	reqContent_activity_cud = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_activity_cud += "<tr><td style='width:150px;'>isCUD</td><td style='width:120px;'>String</td><td style='width:180px;'>(传值：add、update、delete)<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_activity_cud += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>线索池数据id(isCUD为 delete、update时必传)</td></tr>";	
	reqContent_activity_cud += "<tr><td style='width:150px;'>formFields</td><td style='width:120px;'>Vector</td><td>表单属性集(update时必传)</td></tr>";	
	
	reqContent_activity_cud += "<tr><td style='width:150px;'>contactlist</td><td style='width:120px;'>Vector</td><td>数据集(新增、修改必传)</td></tr>";	
	reqContent_activity_cud += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>名称<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_activity_cud += "<tr><td></td><td style='width:150px;'>status</td><td style='width:120px;'>String</td><td>状态<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_activity_cud += "<tr><td></td><td style='width:150px;'>startDate</td><td style='width:120px;'>String</td><td>开始时间</td></tr>";	
	reqContent_activity_cud += "<tr><td></td><td style='width:150px;'>endDate</td><td style='width:120px;'>String</td><td>结束时间</td></tr>";	
	reqContent_activity_cud += "<tr><td></td><td style='width:150px;'>...</td><td style='width:120px;'>...</td><td>...</td></tr>";	
	
	
	
//响应内容
var	resContent_activity_cud = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
		
$.activity_cud = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_activity_cud+"</table>" +
		"<h3>响应：</h3>"+resLine+"</table>";


/******************************市场活动活动效果***************************/
//请求内容
var	reqContent_activity_results = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_activity_results += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>数据id<span style='color:red;'>(必传)</span></td></tr>";


//响应内容
var	resContent_activity_results = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	resContent_activity_results += "<tr><td></td><td style='width:150px;'>convertRate</td><td style='width:120px;'>String</td><td>线索转化率</td></tr>";
	resContent_activity_results += "<tr><td></td><td style='width:150px;'>dealRate</td><td style='width:120px;'>String</td><td>线索成交率</td></tr>";
	resContent_activity_results += "<tr><td></td><td style='width:150px;'>inputOutputRatio</td><td style='width:120px;'>String</td><td>投入产出比</td></tr>";
	resContent_activity_results += "<tr><td></td><td style='width:150px;'>opportunityCount</td><td style='width:120px;'>String</td><td>销售机会数</td></tr>";
	resContent_activity_results += "<tr><td></td><td style='width:150px;'>dealAmount</td><td style='width:120px;'>String</td><td>成交额</td></tr>";


$.activity_results = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_activity_results+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_activity_results+"</table>";


/******************************市场活动添加已有的选择***************************/
//请求内容
var	reqContent_activity_savereldatas = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	reqContent_activity_savereldatas += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>市场活动数据ID</td></tr>";
	reqContent_activity_savereldatas += "<tr><td style='width:150px;'>inviteStatus</td><td style='width:120px;'>String</td><td>邀约状态</td></tr>";
	reqContent_activity_savereldatas += "<tr><td style='width:150px;'>relationDataIds</td><td style='width:120px;'>String</td><td>已选的数据Id集，“,”号分割</td></tr>";
	reqContent_activity_savereldatas += "<tr><td style='width:150px;'>moduleType</td><td style='width:120px;'>String</td><td>关联数据的模块标识<a href='#' onclick='showModulePort();return false;'>(点我见详情)</a></td></tr>";


//响应内容
var	resContent_activity_savereldatas = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";

$.activity_savereldatas = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_activity_savereldatas+"</table>" +
	"<h3>响应：</h3>"+resLine+"</table>";




})(TestInfo);