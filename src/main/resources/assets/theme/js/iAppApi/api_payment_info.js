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

/******************************回款 列表***************************/
//请求内容
var	reqContent_payment_list = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_payment_list += "<tr><td style='width:150px;'>payType</td><td style='width:120px;'>String</td><td style='width:180px;'>回款列表类型，传值：plan(计划回款) actual(实际回款)</td></tr>";	
	reqContent_payment_list += "<tr><td style='width:150px;'>contractId</td><td style='width:120px;'>String</td><td style='width:180px;'>合同Id,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	
//响应内容
var	resContent_payment_list = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	
	resContent_payment_list += "<tr style='height:30px;'><td colspan='3'>计划回款<td></tr>";
	resContent_payment_list += "<tr><td></td><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>数据Id</td></tr>";	
	resContent_payment_list += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>期数 </td></tr>";	
	resContent_payment_list += "<tr><td></td><td style='width:150px;'>actualPaymentMoney</td><td style='width:120px;'>String</td><td>实际回款金额 </td></tr>";	
	resContent_payment_list += "<tr><td></td><td style='width:150px;'>paymentMoney</td><td style='width:120px;'>String</td><td>计划回款金额 </td></tr>";	
	resContent_payment_list += "<tr><td></td><td style='width:150px;'>paymentDate</td><td style='width:120px;'>String</td><td>计划回款日期 </td></tr>";	
		
	
	
	resContent_payment_list += "<tr style='height:30px;'><td colspan='3'>实际回款<td></tr>";
	resContent_payment_list += "<tr><td></td><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>数据Id</td></tr>";	
	resContent_payment_list += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>期数</td></tr>";	
	resContent_payment_list += "<tr><td></td><td style='width:150px;'>paymentMoney</td><td style='width:120px;'>String</td><td>计划回款金额</td></tr>";	
	resContent_payment_list += "<tr><td></td><td style='width:150px;'>isBill</td><td style='width:120px;'>String</td><td>是否开发票</td></tr>";	
	resContent_payment_list += "<tr><td></td><td style='width:150px;'>billType</td><td style='width:120px;'>String</td><td>发票类型</td></tr>";	
	resContent_payment_list += "<tr><td></td><td style='width:150px;'>actualPaymentMoney</td><td style='width:120px;'>Double</td><td>实际回款金额</td></tr>";	
	resContent_payment_list += "<tr><td></td><td style='width:150px;'>actualPaymentDate</td><td style='width:120px;'>String</td><td>实际回款日期 </td></tr>";	
	
		
$.payment_list = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_payment_list+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_payment_list+"</table>";

/******************************回款 计划增删改***************************/
//请求内容
var	reqContent_payment_plancud = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_payment_plancud += "<tr><td style='width:150px;'>isCUD</td><td style='width:120px;'>String</td><td style='width:180px;'>(传值：add、update、delete)<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_payment_plancud += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>数据id(isCUD为 delete、update时必传)</td></tr>";	
	reqContent_payment_plancud += "<tr><td style='width:150px;'>contractId</td><td style='width:120px;'>String</td><td>合同id,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	
	reqContent_payment_plancud += "<tr><td style='width:150px;'>paymentlist</td><td style='width:120px;'>Vector</td><td>数据集(新增、修改必传)</td></tr>";	
	reqContent_payment_plancud += "<tr><td></td><td style='width:150px;'>paymentMoney</td><td style='width:120px;'>String</td><td>计划回款金额 </td></tr>";	
	reqContent_payment_plancud += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>期数 </td></tr>";	
	reqContent_payment_plancud += "<tr><td></td><td style='width:150px;'>...</td><td style='width:120px;'>...</td><td>... </td></tr>";	
	
//响应内容
var	resContent_payment_plancud = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	
	
		
$.payment_plancud = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_payment_plancud+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_payment_plancud+"</table>";


/******************************计划详情***************************/
//请求内容
var	reqContent_getinfobyid = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_getinfobyid += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>Vector</td><td>线索数据id(不传值，默认只获取模板)</span></td></tr>";	
	reqContent_getinfobyid += "<tr><td style='width:150px;'>contractId</td><td style='width:120px;'>String</td><td>合同id<span style='color:red;'>必传</span></td></tr>";	
	reqContent_getinfobyid += "<tr><td style='width:150px;'>formtemplateVer</td><td style='width:120px;'>String</td><td>模板版本号,<span style='color:red;'>版本号一致时不再返回模板(未知时 传值：none)(必传)</span></td></tr>";	
	
//响应内容
var	resContent_getinfobyid = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
	resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>formFun</td><td>Vector </td><td>表单功能 </td></tr>";
		resContent_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>显示名 </td></tr>";
		resContent_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>identif</td><td>String </td><td>标识</td></tr>";
	
		
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>formrelmodules</td><td>Vector</td><td>关联的模块</td></tr>";	
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>relevance</td><td>Vector</td><td>关联模块</td></tr>"
			resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>add</td><td>Vector</td><td>新建模块</td></tr>"
			
		
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleId</td><td>String</td><td>模块Id</td></tr>"
			resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleUrl</td><td>String</td><td>模块名图像URL</td></tr>"
				resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>moduleName</td><td>String</td><td>模块名</td></tr>"
					resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>modulePort</td><td>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a></td></tr>"
			
		
		
	resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>formInfo</td><td>Vector </td><td><a href='#' onclick='showFormFun();return false;'>表单功能(点我见详情)</a>  </td></tr>";
		
		
		resContent_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>plan</td><td>String </td><td>计划回款信息</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>回款期次</td></tr>";
		
		resContent_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>...</td><td>String </td><td>.... </td></tr>";
		
		resContent_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>actual</td><td>Vector </td><td>实际回款记录</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>...</td><td>String </td><td>.... </td></tr>";
		
		
		
	resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>formInfoComAndPraise</td><td>String </td><td>评论和点赞</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>praises</td><td>Vector </td><td>点赞集</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>userId</td><td>String </td><td>点赞人Id</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>userName</td><td>String </td><td>点赞人名称</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td></td><td style='width:150px;'>commentsNum</td><td>int</td><td>评论数</td></tr>";
			
		
		
		
		resContent_getinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板版本号：<td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>formtemplateVer</td><td>String</td><td>模板版本号</td></tr>";
		
		resContent_getinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板中字段说明，具体明细请参考实例：<td></tr>";
		
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>formtemplate</td><td>String </td><td>表单模板 </td></tr>";
		
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>forms</td><td>Vector</td><td>表单版块集</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>boardTitleOnly</td><td>String</td><td>版块标题</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>Boolean</td><td>是否显示此版块</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldSet</td><td>Vector</td><td>字段集</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldTitle</td><td>String</td><td>字段标题</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>pojoProperty</td><td>String</td><td>字段属性名</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>pojoPropertyName</td><td>String</td><td>字段属性显示名称</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>String</td><td>此字段是否展示</td></tr>";
		
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>字段属性集</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>fieldType</td><td>Vector</td><td>字段类型</td></tr>";
		
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>optionParas</td><td>Vector</td><td>字段选项</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>显示名</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>identity</td><td>Vector</td><td>唯一标识</td></tr>";
		
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>readOnly</td><td>Vector</td><td>是否只读</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>defaultVal</td><td>Vector</td><td>默认Value</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Vector</td><td>是否需要调接口</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口请求参数类型</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口响应参数类型</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>isShowHide</td><td>String</td><td>true 显示，false 隐藏</td></tr>";
		resContent_getinfobyid += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
		
		resContent_getinfobyid += "<tr style='height:30px;'><td colspan='3'>请测试接口获取实例展示结构<td></tr>";
		
		
		
		
		
$.payment_plangetinfobyid = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_getinfobyid+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_getinfobyid+"</table>";




/******************************回款 实际增删改***************************/
//请求内容
var	reqContent_payment_plancud = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td style='width:180px;'>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_payment_plancud += "<tr><td style='width:150px;'>isCUD</td><td style='width:120px;'>String</td><td style='width:180px;'>(传值：add、update、delete)<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_payment_plancud += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>数据id(isCUD为 delete、update时必传)</td></tr>";	
	reqContent_payment_plancud += "<tr><td style='width:150px;'>paymentId</td><td style='width:120px;'>String</td><td>回款计划Id<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_payment_plancud += "<tr><td style='width:150px;'>contractId</td><td style='width:120px;'>String</td><td>合同id,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_payment_plancud += "<tr><td style='width:150px;'>contractName</td><td style='width:120px;'>String</td><td>合同名称<span style='color:red;'>(必传)</span></td></tr>";	
	
	reqContent_payment_plancud += "<tr><td style='width:150px;'>paymentactuallist</td><td style='width:120px;'>Vector</td><td>数据集(新增、修改必传)</td></tr>";	
	reqContent_payment_plancud += "<tr><td></td><td style='width:150px;'>actualPaymentDate</td><td style='width:120px;'>String</td><td>实际回款日期 </td></tr>";	
	reqContent_payment_plancud += "<tr><td></td><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>回款期次</td></tr>";	
	reqContent_payment_plancud += "<tr><td></td><td style='width:150px;'>actualPaymentMoney</td><td style='width:120px;'>Double</td><td>实际回款金额</td></tr>";	
	reqContent_payment_plancud += "<tr><td></td><td style='width:150px;'>isBill</td><td style='width:120px;'>String</td><td>是否开发票</td></tr>";	
	reqContent_payment_plancud += "<tr><td></td><td style='width:150px;'>billType</td><td style='width:120px;'>String</td><td>发票类型</td></tr>";	
	reqContent_payment_plancud += "<tr><td></td><td style='width:150px;'>...</td><td style='width:120px;'>...</td><td>... </td></tr>";	
	
//响应内容
var	resContent_payment_plancud = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>Vector</td><td>响应结果数据 </td></tr>";	
	


		
$.payment_actualcud = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_payment_plancud+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_payment_plancud+"</table>";



/******************************计划详情***************************/
//请求内容
var	reqContent_actgetinfobyid = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";	
	reqContent_actgetinfobyid += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>Vector</td><td>线索数据id(不传值，默认只获取模板)</span></td></tr>";	
	reqContent_actgetinfobyid += "<tr><td style='width:150px;'>contractId</td><td style='width:120px;'>Vector</td><td>合同Id</span></td></tr>";	
	reqContent_actgetinfobyid += "<tr><td style='width:150px;'>formtemplateVer</td><td style='width:120px;'>String</td><td>模板版本号,<span style='color:red;'>版本号一致时不再返回模板(未知时 传值：none)(必传)</span></td></tr>";	

//响应内容
var	resContent_actgetinfobyid = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";	
resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>formFun</td><td>Vector </td><td>表单功能 </td></tr>";
resContent_actgetinfobyid += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>显示名 </td></tr>";
resContent_actgetinfobyid += "<tr><td></td><td></td><td style='width:150px;'>identif</td><td>String </td><td>标识</td></tr>";
	
		
resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>formrelmodules</td><td>Vector</td><td>关联的模块</td></tr>";	
resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>relevance</td><td>Vector</td><td>关联模块</td></tr>"
	resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>add</td><td>Vector</td><td>新建模块</td></tr>"
			
		
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>moduleId</td><td>String</td><td>模块Id</td></tr>"
			resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>moduleUrl</td><td>String</td><td>模块名图像URL</td></tr>"
				resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>moduleName</td><td>String</td><td>模块名</td></tr>"
					resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>modulePort</td><td>String</td><td><a href='#' onclick='showModulePort();return false;'>模块标识(点我见详情)</a></td></tr>"
			
		
		
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>formInfo</td><td>Vector </td><td><a href='#' onclick='showFormFun();return false;'>表单功能(点我见详情)</a>  </td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td></td><td style='width:150px;'>name</td><td>String </td><td>实际回款金额</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td></td><td style='width:150px;'>...</td><td>String </td><td>.... </td></tr>";
		
		
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>formInfoComAndPraise</td><td>String </td><td>评论和点赞</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td></td><td style='width:150px;'>praises</td><td>Vector </td><td>点赞集</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td></td><td style='width:150px;'>userId</td><td>String </td><td>点赞人Id</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td></td><td style='width:150px;'>userName</td><td>String </td><td>点赞人名称</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td></td><td style='width:150px;'>commentsNum</td><td>int</td><td>评论数</td></tr>";
			
		
		
		
		resContent_actgetinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板版本号：<td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>formtemplateVer</td><td>String</td><td>模板版本号</td></tr>";
		
		resContent_actgetinfobyid += "<tr style='height:30px;'><td colspan='3'>以下是模板中字段说明，具体明细请参考实例：<td></tr>";
		
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>formtemplate</td><td>String </td><td>表单模板 </td></tr>";
		
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>forms</td><td>Vector</td><td>表单版块集</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>boardTitleOnly</td><td>String</td><td>版块标题</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>Boolean</td><td>是否显示此版块</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>fieldSet</td><td>Vector</td><td>字段集</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>fieldTitle</td><td>String</td><td>字段标题</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>pojoProperty</td><td>String</td><td>字段属性名</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>pojoPropertyName</td><td>String</td><td>字段属性显示名称</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>show</td><td>String</td><td>此字段是否展示</td></tr>";
		
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>property</td><td>Vector</td><td>字段属性集</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>fieldType</td><td>Vector</td><td>字段类型</td></tr>";
		
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>optionParas</td><td>Vector</td><td>字段选项</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>name</td><td>String</td><td>显示名</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>identity</td><td>Vector</td><td>唯一标识</td></tr>";
		
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>readOnly</td><td>Vector</td><td>是否只读</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>defaultVal</td><td>Vector</td><td>默认Value</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>isInvokPort</td><td>Vector</td><td>是否需要调接口</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>invokPort</td><td>String</td><td>接口</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>paras</td><td>Vector</td><td>接口请求参数集</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口请求参数属性</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口请求参数类型</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>resParas</td><td>Vector</td><td>接口响应参数集</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>paraProperty</td><td>String</td><td>接口响应参数属性</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>paraDatatype</td><td>String</td><td>接口响应参数类型</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>isShowHide</td><td>String</td><td>true 显示，false 隐藏</td></tr>";
		resContent_actgetinfobyid += "<tr><td></td><td style='width:150px;'>method</td><td>String</td><td>接口请求方法</td></tr>";
		
		resContent_actgetinfobyid += "<tr style='height:30px;'><td colspan='3'>请测试接口获取实例展示结构<td></tr>";
		
		
		
		
		
$.payment_actualgetinfobyid = "<h3>请求：</h3>"+reqLine+reqLine1+reqContent_actgetinfobyid+"</table>" +
		"<h3>响应：</h3>"+resLine+resContent_actgetinfobyid+"</table>";


	

})(TestInfo);