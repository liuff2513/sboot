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
var	resContent_documents_list = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_list += "<tr><td style='width:150px;'>orderField</td><td style='width:120px;'>String</td><td>排序字段(createdTime时间fileSize大小name名称)<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_list += "<tr><td style='width:150px;'>orderType</td><td style='width:120px;'>String</td><td>排序类型 (desc:降序,asc:升序)<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_list += "<tr><td style='width:150px;'>pageNo</td><td style='width:120px;'>Integer</td><td>当前页</td></tr>";
	resContent_documents_list += "<tr><td style='width:150px;'>pageSize</td><td style='width:120px;'>Integer</td><td>每页记录数</td></tr>";
	resContent_documents_list += "<tr><td style='width:150px;'>type</td><td style='width:120px;'>Integer</td><td>1最近列表2我的文档3共享给我的4回收站<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_list += "<tr><td style='width:150px;'>keyword</td><td style='width:120px;'>Integer</td><td>搜索关键字</td></tr>";
	resContent_documents_list += "<tr><td style='width:150px;'>具体格式见实例</tr>";
	
	
//响应内容
var	reqContent_documents_list = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	reqContent_documents_list += "<tr style='height:30px;'><td>以下是数据集：<td></tr>";
	reqContent_documents_list += "<tr style='height:30px;'><td>listdata</td><td>Vector</td><td>数据集</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>id</td><td>String</td><td>数据主键ID</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>name</td><td>String</td><td>文件夹名称</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>isCollect</td><td>Integer</td><td>是否收藏：0未收藏1收藏</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>oldName</td><td>String</td><td>文件名</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>fileSize</td><td>String</td><td>文件大小</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>createdTime</td><td>String</td><td>创建时间</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>isLock</td><td>String</td><td>文件是否锁定0表示未锁定，1表示已锁定</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>approvalStatus</td><td>String</td><td>审批状态：0审批中1审批通过2驳回3挂起</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>creatorName</td><td>String</td><td>创建者名字</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>isParent</td><td>String</td><td>是否是父级文件夹true是false不是</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>isShareMessage</td><td>Integer</td><td>共享发消息0不发1发</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>isShared</td><td>Integer</td><td>是否是共享文件夹只针对顶层文件夹0不是1是</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>isUploadMessage</td><td>Integer</td><td>是否上传文件发消息0不发1发</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>level</td><td>Integer</td><td>文件夹等级</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>name</td><td>String</td><td>文件夹名称</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>permissionName</td><td>String</td><td>共享权限：1、浏览者 2、共同拥有者 3、管理员</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>pid</td><td>String</td><td>文件夹父节点id</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>uid</td><td>String</td><td>文件夹创建者id</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>downloadCount</td><td>Integer</td><td>下载次数</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>fileType</td><td>Integer</td><td>文件类型：1 文档 2图片 3 音乐 4 视频   5 文件夹</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>folderId</td><td>String</td><td>文件夹id</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>oldFileName</td><td>String</td><td>回收站文件名称</td></tr>";
	reqContent_documents_list += "<tr><td></td><td>folderId</td><td>String</td><td>文件所在文件夹id</td></tr>";



$.documents_list = "<h3>请求：</h3>"+reqLine+reqLine1+resContent_documents_list+"</table>" +
		"<h3>响应：</h3>"+resLine+reqContent_documents_list+"</table>";


	/******************************单个文件夹列表***************************/
//请求内容
	var	resContent_documents_singlelist = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_singlelist += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>文件夹id<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_singlelist += "<tr><td style='width:150px;'>level</td><td style='width:120px;'>String</td><td>文件夹等级<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_singlelist += "<tr><td style='width:150px;'>orderField</td><td style='width:120px;'>String</td><td>排序字段(createdTime时间name名称)<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_singlelist += "<tr><td style='width:150px;'>orderType</td><td style='width:120px;'>String</td><td>排序类型 (desc:降序,asc:升序)<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_singlelist += "<tr><td style='width:150px;'>pageNo</td><td style='width:120px;'>Integer</td><td>当前页</td></tr>";
	resContent_documents_singlelist += "<tr><td style='width:150px;'>pageSize</td><td style='width:120px;'>Integer</td><td>每页记录数</td></tr>";


//响应内容
	var	reqContent_documents_singlelist = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	reqContent_documents_singlelist += "<tr style='height:30px;'><td>以下是数据集：<td></tr>";
	reqContent_documents_singlelist += "<tr style='height:30px;'><td>listdata</td><td>Vector</td><td>数据集</td></tr>";
	reqContent_documents_singlelist += "<tr><td></td><td>id</td><td>String</td><td>文件或文件夹id</td></tr>";
	reqContent_documents_singlelist += "<tr><td></td><td>fileType</td><td>String</td><td>文件类型：1 文档 2图片 3 音乐 4 视频   5 文件夹</td></tr>";
	reqContent_documents_singlelist += "<tr><td></td><td>createdTime</td><td>String</td><td>创建时间</td></tr>";
	reqContent_documents_singlelist += "<tr><td></td><td>createdId</td><td>String</td><td>创建者id</td></tr>";
	reqContent_documents_singlelist += "<tr><td></td><td>pid</td><td>String</td><td>父级文件夹id</td></tr>";
	reqContent_documents_singlelist += "<tr><td></td><td>isShared</td><td>String</td><td>0未共享1共享</td></tr>";
	reqContent_documents_singlelist += "<tr><td></td><td>level</td><td>String</td><td>文件夹等级</td></tr>";
	reqContent_documents_singlelist += "<tr><td></td><td>name</td><td>String</td><td>文件夹名</td></tr>";
	reqContent_documents_singlelist += "<tr><td></td><td>oldName</td><td>String</td><td>文件名</td></tr>";
	reqContent_documents_singlelist += "<tr><td></td><td>fileSize</td><td>String</td><td>文件大小</td></tr>";
	reqContent_documents_singlelist += "<tr><td></td><td>folderId</td><td>String</td><td>文件所在文件夹id</td></tr>";
	reqContent_documents_singlelist += "<tr><td></td><td>isLock</td><td>String</td><td>文件是否锁定0表示未锁定，1表示已锁定</td></tr>";
	reqContent_documents_singlelist += "<tr><td></td><td>approvalStatus</td><td>String</td><td>审批状态：0审批中1审批通过2驳回3挂起</td></tr>";
	reqContent_documents_singlelist += "<tr><td></td><td>isCollect</td><td>Integer</td><td>是否收藏：0未收藏1收藏</td></tr>";
	reqContent_documents_singlelist += "<tr><td></td><td>creatorName</td><td>String</td><td>创建者名称</td></tr>";





	$.documents_singlelist = "<h3>请求：</h3>"+reqLine+reqLine1+resContent_documents_singlelist+"</table>" +
		"<h3>响应：</h3>"+resLine+reqContent_documents_singlelist+"</table>";




	/******************************文档管理全局搜索***************************/
//请求内容
var	resContent_documents_listsearch = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_listsearch += "<tr><td style='width:150px;'>pageNo</td><td style='width:120px;'>Integer</td><td>当前页</td></tr>";
	resContent_documents_listsearch += "<tr><td style='width:150px;'>pageSize</td><td style='width:120px;'>Integer</td><td>每页记录数</td></tr>";
	resContent_documents_listsearch += "<tr><td style='width:150px;'>searchKey</td><td style='width:120px;'>String</td><td>搜索关键字<span style='color:red;'>(必传)</span></td></tr>";


//响应内容
var	reqContent_documents_listsearch = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	reqContent_documents_listsearch += "<tr style='height:30px;'><td>以下是数据集：<td></tr>";
	reqContent_documents_listsearch += "<tr style='height:30px;'><td>listdata</td><td>Vector</td><td>数据集</td></tr>";
	reqContent_documents_listsearch += "<tr><td></td><td>id</td><td>String</td><td>文件或文件夹id</td></tr>";
	reqContent_documents_listsearch += "<tr><td></td><td>fileType</td><td>String</td><td>文件类型：1 文档 2图片 3 音乐 4 视频   5 文件夹</td></tr>";
	reqContent_documents_listsearch += "<tr><td></td><td>createdTime</td><td>String</td><td>创建时间</td></tr>";
	reqContent_documents_listsearch += "<tr><td></td><td>createdId</td><td>String</td><td>创建者id</td></tr>";
	reqContent_documents_listsearch += "<tr><td></td><td>pid</td><td>String</td><td>父级文件夹id</td></tr>";
	reqContent_documents_listsearch += "<tr><td></td><td>isShared</td><td>String</td><td>0未共享1共享</td></tr>";
	reqContent_documents_listsearch += "<tr><td></td><td>level</td><td>String</td><td>文件夹等级</td></tr>";
	reqContent_documents_listsearch += "<tr><td></td><td>name</td><td>String</td><td>文件夹名</td></tr>";
	reqContent_documents_listsearch += "<tr><td></td><td>oldName</td><td>String</td><td>文件名</td></tr>";
	reqContent_documents_listsearch += "<tr><td></td><td>fileSize</td><td>String</td><td>文件大小</td></tr>";
	reqContent_documents_listsearch += "<tr><td></td><td>folderId</td><td>String</td><td>文件所在文件夹id</td></tr>";
	reqContent_documents_listsearch += "<tr><td></td><td>isLock</td><td>String</td><td>文件是否锁定0表示未锁定，1表示已锁定</td></tr>";
	reqContent_documents_listsearch += "<tr><td></td><td>approvalStatus</td><td>String</td><td>审批状态：0审批中1审批通过2驳回3挂起</td></tr>";
	reqContent_documents_listsearch += "<tr><td></td><td>isCollect</td><td>Integer</td><td>是否收藏：0未收藏1收藏</td></tr>";
	reqContent_documents_listsearch += "<tr><td></td><td>creatorName</td><td>String</td><td>创建者名称</td></tr>";


$.documents_listsearch = "<h3>请求：</h3>"+reqLine+reqLine1+resContent_documents_listsearch+"</table>" +
		"<h3>响应：</h3>"+resLine+reqContent_documents_listsearch+"</table>";




/******************************文档管理文件上传***************************/
//请求内容
var	resContent_documents_upload = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_upload += "<tr><td style='width:150px;'>folderId</td><td style='width:120px;'>String</td><td>上传的文件夹id<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_upload += "<tr><td style='width:150px;'>fileName</td><td style='width:120px;'>String</td><td>处理后的文件名称含后缀名<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_upload += "<tr><td style='width:150px;'>oldName</td><td style='width:120px;'>String</td><td>原文件名称含后缀名<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_upload += "<tr><td style='width:150px;'>fileUrl</td><td style='width:120px;'>String</td><td>文件上传路径<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_upload += "<tr><td style='width:150px;'>fileSize</td><td style='width:120px;'>String</td><td>文件大小<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_upload += "<tr><td style='width:150px;'>fileType</td><td style='width:120px;'>String</td><td>文件类型0 全部文件 1 文档 2图片 3 音乐 4视频 -1 收藏<span style='color:red;'>(必传)</span></td></tr>";


//响应内容
var	reqContent_documents_upload = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	reqContent_documents_upload += "<tr style='height:30px;'><td>以下是数据集：<td></tr>";
	reqContent_documents_upload += "<tr style='height:30px;'><td>listdata</td><td>Vector</td><td>数据集</td></tr>";
	reqContent_documents_upload += "<tr><td></td><td>result</td><td>String</td><td>success成功fail失败</td></tr>";


$.documents_upload = "<h3>请求：</h3>"+reqLine+reqLine1+resContent_documents_upload+"</table>" +
		"<h3>响应：</h3>"+resLine+reqContent_documents_upload+"</table>";





/******************************文档夹新建***************************/
//请求内容
var resContent_documents_createfolder = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_createfolder += "<tr><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>文件夹名称<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_createfolder += "<tr><td style='width:150px;'>level</td><td style='width:120px;'>Integer</td><td>新建的文件夹的等级0是一级，1是二级<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_createfolder += "<tr style='height:30px;'><td colspan='3'>以下是创建二级文件夹必传参数，一级不传</td></tr>";
	resContent_documents_createfolder += "<tr><td style='width:150px;'>pId</td><td style='width:120px;'>String</td><td>父文件夹id</td></tr>";
	resContent_documents_createfolder += "<tr style='height:30px;'><td colspan='3'>以下是设置共享时传的参数，不设置共享全不传，设置共享但不发消息不传相应参数即可：<td></tr>";
	resContent_documents_createfolder += "<tr><td style='width:150px;'>isShared</td><td style='width:120px;'>Integer</td><td>是否共享，1共享</td></tr>";
	resContent_documents_createfolder += "<tr><td style='width:150px;'>isShareMessage</td><td style='width:120px;'>Integer</td><td>共享发消息，1发消息</td></tr>";
	resContent_documents_createfolder += "<tr><td style='width:150px;'>isUploadMessage</td><td style='width:120px;'>Integer</td><td>上传文件发消息，1发消息</td></tr>";
	resContent_documents_createfolder += "<tr><td style='width:150px;'>userType</td><td style='width:120px;'>String</td><td>3 组 2 组织 1用户（多值时用逗号拼接）</td></tr>";
	resContent_documents_createfolder += "<tr><td style='width:150px;'>groupidOrUserid</td><td style='width:120px;'>String</td><td>组，组织，用户id(多值时用逗号拼接)</td></tr>";
	resContent_documents_createfolder += "<tr><td style='width:150px;'>permissionName</td><td style='width:120px;'>String</td><td>共享权限:浏览者,共同拥有者,管理员(多值时用逗号拼接)</td></tr>";


//响应内容
var	reqContent_documents_createfolder = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	reqContent_documents_createfolder += "<tr style='height:30px;'><td>以下是数据集：<td></tr>";
	reqContent_documents_createfolder += "<tr style='height:30px;'><td>listdata</td><td>Vector</td><td>数据集</td></tr>";
	reqContent_documents_createfolder += "<tr><td></td><td>result</td><td>String</td><td>success成功fail失败exception操作异常</td></tr>";
	reqContent_documents_createfolder += "<tr><td></td><td>judgeResult</td><td>String</td><td>-1名称已存在-3父级文件夹已删除-2不具备操作文件夹权限-4被取消共享0自建文件夹1共享给我的文件夹</td></tr>";


$.documents_createfolder = "<h3>请求：</h3>"+reqLine+reqLine1+resContent_documents_createfolder+"</table>" +
		"<h3>响应：</h3>"+resLine+reqContent_documents_createfolder+"</table>";


/******************************文件夹共享***************************/
//请求内容
var resContent_documents_sharefolders = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_sharefolders += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>文件夹id<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_sharefolders += "<tr><td style='width:150px;'>level</td><td style='width:120px;'>Integer</td><td>文件夹等级<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_sharefolders += "<tr><td style='width:150px;'>isShared</td><td style='width:120px;'>Integer</td><td>1设置共享0取消共享<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_sharefolders += "<tr style='height:30px;'><td colspan='3'>设置共享时还需传的参数：<td></tr>";
	resContent_documents_sharefolders += "<tr><td style='width:150px;'>isShareMessage</td><td style='width:120px;'>Integer</td><td>共享发消息，1发0不发</td></tr>";
	resContent_documents_sharefolders += "<tr><td style='width:150px;'>isUploadMessage</td><td style='width:120px;'>Integer</td><td>上传文件发消息，1发0不发</td></tr>";
	resContent_documents_sharefolders += "<tr><td style='width:150px;'>userType</td><td style='width:120px;'>String</td><td>3 组 2 组织 1用户（多值时用逗号拼接）</td></tr>";
	resContent_documents_sharefolders += "<tr><td style='width:150px;'>groupidOrUserid</td><td style='width:120px;'>String</td><td>组，组织，用户id(多值时用逗号拼接)</td></tr>";
	resContent_documents_sharefolders += "<tr><td style='width:150px;'>permissionName</td><td style='width:120px;'>String</td><td>共享权限:浏览者,共同拥有者,管理员(多值时用逗号拼接)</td></tr>";


//响应内容
var	reqContent_documents_sharefolders = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	reqContent_documents_sharefolders += "<tr style='height:30px;'><td>以下是数据集：<td></tr>";
	reqContent_documents_sharefolders += "<tr style='height:30px;'><td>listdata</td><td>Vector</td><td>数据集</td></tr>";
	reqContent_documents_sharefolders += "<tr><td></td><td>result</td><td>String</td><td>success成功fail失败exception操作异常</td></tr>";
	reqContent_documents_sharefolders += "<tr><td></td><td>judgeResult</td><td>String</td><td>-3文件夹已删除-2不具备操作文件夹权限-4被取消共享0自建文件夹1共享给我的文件夹</td></tr>";


$.documents_sharefolders = "<h3>请求：</h3>"+reqLine+reqLine1+resContent_documents_sharefolders+"</table>" +
		"<h3>响应：</h3>"+resLine+reqContent_documents_sharefolders+"</table>";


/******************************文件夹名称修改***************************/
//请求内容
var	resContent_documents_updatefoldername = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_updatefoldername += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>文件夹id<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_updatefoldername += "<tr><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>文件夹修改后名称<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_updatefoldername += "<tr><td style='width:150px;'>level</td><td style='width:120px;'>Integer</td><td>文件夹等级<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_updatefoldername += "<tr><td style='width:150px;'>creatorId</td><td style='width:120px;'>String</td><td>文件夹创建者id<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_updatefoldername += "<tr><td style='width:150px;'>pId</td><td style='width:120px;'>String</td><td>父文件夹id(二级文件夹必传参数，一级不传)</td></tr>";

//响应内容
var	reqContent_documents_updatefoldername = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	reqContent_documents_updatefoldername += "<tr style='height:30px;'><td>以下是数据集：<td></tr>";
	reqContent_documents_updatefoldername += "<tr><td></td><td>result</td><td>String</td><td>success成功fail失败exception操作异常</td></tr>";
	reqContent_documents_updatefoldername += "<tr><td></td><td>judgeResult</td><td>String</td><td>-1同级目录名称冲突-2用户无操作权限-3文件夹已不存在-4被取消共享0自建文件夹1共享给我的文件夹</td></tr>";


$.documents_updatefoldername = "<h3>请求：</h3>"+reqLine+reqLine1+resContent_documents_updatefoldername+"</table>" +
		"<h3>响应：</h3>"+resLine+reqContent_documents_updatefoldername+"</table>";


/******************************文件名称修改***************************/
//请求内容
var	resContent_documents_updatefilename = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_updatefilename += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>文件id<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_updatefilename += "<tr><td style='width:150px;'>oldName</td><td style='width:120px;'>String</td><td>文件修改后名称<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
var	reqContent_documents_updatefilename = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	reqContent_documents_updatefilename += "<tr style='height:30px;'><td>以下是数据集：<td></tr>";
	reqContent_documents_updatefilename += "<tr><td></td><td>result</td><td>String</td><td>1成功-1文件名称超过100字符，-2用户无操作权限,-3文件夹已不存在-4文件已不存在</td></tr>";


$.documents_updatefilename = "<h3>请求：</h3>"+reqLine+reqLine1+resContent_documents_updatefilename+"</table>" +
		"<h3>响应：</h3>"+resLine+reqContent_documents_updatefilename+"</table>";



	/******************************根据文件类型查找***************************/
//请求内容
	var	resContent_documents_findbytype = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_findbytype += "<tr><td style='width:150px;'>type</td><td style='width:120px;'>Integer</td><td>1最近2我的3共享4回收站<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_findbytype += "<tr><td style='width:150px;'>fileType</td><td style='width:120px;'>String</td><td>文件类型0 全部文件 1 文档 2图片 3 音乐 4视频 -1 收藏<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_findbytype += "<tr><td style='width:150px;'>orderField</td><td style='width:120px;'>String</td><td>排序字段(createdTime时间fileSize大小name名称)<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_findbytype += "<tr><td style='width:150px;'>orderType</td><td style='width:120px;'>String</td><td>排序类型 (desc:降序,asc:升序))<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_findbytype += "<tr><td style='width:150px;'>pageNo</td><td style='width:120px;'>Integer</td><td>当前页</td></tr>";
	resContent_documents_findbytype += "<tr><td style='width:150px;'>pageSize</td><td style='width:120px;'>Integer</td><td>每页记录数</td></tr>";


//响应内容
	var	reqContent_documents_findbytype = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	reqContent_documents_findbytype += "<tr style='height:30px;'><td>以下是数据集：<td></tr>";
	reqContent_documents_findbytype += "<tr style='height:30px;'><td>listdata</td><td>Vector</td><td>数据集</td></tr>";
	reqContent_documents_findbytype += "<tr><td></td><td>id</td><td>String</td><td>文件id</td></tr>";
	reqContent_documents_findbytype += "<tr><td></td><td>oldName</td><td>String</td><td>文件名</td></tr>";
	reqContent_documents_findbytype += "<tr><td></td><td>fileSize</td><td>String</td><td>文件大小</td></tr>";
	reqContent_documents_findbytype += "<tr><td></td><td>createdTime</td><td>String</td><td>创建时间</td></tr>";
	reqContent_documents_findbytype += "<tr><td></td><td>isLock</td><td>String</td><td>文件是否锁定0表示未锁定，1表示已锁定</td></tr>";
	reqContent_documents_findbytype += "<tr><td></td><td>approvalStatus</td><td>String</td><td>审批状态：0审批中1审批通过2驳回3挂起</td></tr>";
	reqContent_documents_findbytype += "<tr><td></td><td>folderId</td><td>String</td><td>文件所在文件夹id</td></tr>";
	reqContent_documents_findbytype += "<tr><td></td><td>fileType</td><td>String</td><td>文件类型 1 文档 2图片 3 音乐 4视频</td></tr>";
	reqContent_documents_findbytype += "<tr><td></td><td>isCollect</td><td>String</td><td>是否收藏：0未收藏1收藏</td></tr>";

	$.documents_findbytype = "<h3>请求：</h3>"+reqLine+reqLine1+resContent_documents_findbytype+"</table>" +
		"<h3>响应：</h3>"+resLine+reqContent_documents_findbytype+"</table>";


	/******************************文件复制移动删除收藏***************************/
//请求内容
	var	resContent_documents_filecopy = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_filecopy += "<tr><td style='width:150px;'>fileIds</td><td style='width:120px;'>String</td><td>文件id(多个逗号拼接)<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_filecopy += "<tr><td style='width:150px;'>type</td><td style='width:120px;'>Integer</td><td>1复制2移动3删除4收藏<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_filecopy += "<tr><td style='width:150px;'>folderId</td><td style='width:120px;'>String</td><td>复制移动的目标文件夹id</span></td></tr>";

//响应内容
	var	reqContent_documents_filecopy = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	reqContent_documents_filecopy += "<tr style='height:30px;'><td>以下是数据集：<td></tr>";
	reqContent_documents_filecopy += "<tr style='height:30px;'><td>listdata</td><td>Vector</td><td>数据集</td></tr>";
	reqContent_documents_filecopy += "<tr style='height:30px;'><td colspan='3'>复制移动删除结果:<td></tr>";
	reqContent_documents_filecopy += "<tr><td></td><td>result</td><td>String</td><td>success成功fail失败</td></tr>";
	reqContent_documents_filecopy += "<tr style='height:30px;'><td colspan='3'>收藏结果:<td></tr>";
	reqContent_documents_filecopy += "<tr><td></td><td>result</td><td>String</td><td>操作后0没收藏1收藏-3文件夹已删除-4文件已删除</td></tr>";



	$.documents_filecopy = "<h3>请求：</h3>"+reqLine+reqLine1+resContent_documents_filecopy+"</table>" +
		"<h3>响应：</h3>"+resLine+reqContent_documents_filecopy+"</table>";



	/******************************回收站文件清除恢复***************************/
//请求内容
	var	resContent_documents_cleanandrestore = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_cleanandrestore += "<tr><td style='width:150px;'>type</td><td style='width:120px;'>Integer</td><td>1清除2恢复<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_cleanandrestore += "<tr><td style='width:150px;'>id</td><td style='width:120px;'>String</td><td>文件或文件夹id<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_cleanandrestore += "<tr><td style='width:150px;'>fileType</td><td style='width:120px;'>String</td><td>文件类型：1 文档 2图片 3 音乐 4 视频   5 文件夹<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_cleanandrestore += "<tr><td style='width:150px;'>name</td><td style='width:120px;'>String</td><td>文件或文件夹名称<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_cleanandrestore += "<tr><td style='width:150px;'>folderId</td><td style='width:120px;'>String</td><td>文件夹id<span style='color:red;'>(必传)</span></span></td></tr>";

//响应内容
	var	reqContent_documents_cleanandrestore = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	reqContent_documents_cleanandrestore += "<tr style='height:30px;'><td>以下是数据集：<td></tr>";
	reqContent_documents_cleanandrestore += "<tr style='height:30px;'><td>listdata</td><td>Vector</td><td>数据集</td></tr>";
	reqContent_documents_cleanandrestore += "<tr><td></td><td>result</td><td>String</td><td>success成功fail失败</td></tr>";



	$.documents_cleanandrestore = "<h3>请求：</h3>"+reqLine+reqLine1+resContent_documents_cleanandrestore+"</table>" +
		"<h3>响应：</h3>"+resLine+reqContent_documents_cleanandrestore+"</table>";




	/******************************文件夹批量删除***************************/
//请求内容
	var	resContent_documents_deletefolder = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_deletefolder += "<tr><td style='width:150px;'>ids</td><td style='width:120px;'>String</td><td>文件夹id(批量时逗号拼接)<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_deletefolder += "<tr><td style='width:150px;'>names</td><td style='width:120px;'>String</td><td>文件夹名称(批量时逗号拼接)<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
	var	reqContent_documents_deletefolder = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	reqContent_documents_deletefolder += "<tr style='height:30px;'><td>以下是数据集：<td></tr>";
	reqContent_documents_deletefolder += "<tr style='height:30px;'><td>listdata</td><td>Vector</td><td>数据集</td></tr>";
	reqContent_documents_deletefolder += "<tr><td></td><td>result</td><td>String</td><td>success成功fail失败exception异常</td></tr>";
	reqContent_documents_deletefolder += "<tr><td></td><td>delId</td><td>String</td><td>文件夹id</td></tr>";
	reqContent_documents_deletefolder += "<tr><td></td><td>name</td><td>String</td><td>文件夹名称</td></tr>";
	reqContent_documents_deletefolder += "<tr><td></td><td>judgeResult</td><td>String</td><td>0自己创建的文件夹1共享文件夹-1文件夹下有正在审批的文件-2没有权限-3文件夹已经不存在-4文件夹已经取消共享给我</td></tr>";



	$.documents_deletefolder = "<h3>请求：</h3>"+reqLine+reqLine1+resContent_documents_deletefolder+"</table>" +
		"<h3>响应：</h3>"+resLine+reqContent_documents_deletefolder+"</table>";


	/******************************文件查看下载***************************/
//请求内容
	var	resContent_documents_fileshowdownload = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_fileshowdownload += "<tr><td style='width:150px;'>ids</td><td style='width:120px;'>String</td><td>文件夹id(批量时逗号拼接)<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_fileshowdownload += "<tr><td style='width:150px;'>type</td><td style='width:120px;'>Integer</td><td>1下载2查看<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
	var	reqContent_documents_fileshowdownload = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	reqContent_documents_fileshowdownload += "<tr style='height:30px;'><td>以下是数据集：<td></tr>";
	reqContent_documents_fileshowdownload += "<tr style='height:30px;'><td>listdata</td><td>Vector</td><td>数据集</td></tr>";
	reqContent_documents_fileshowdownload += "<tr><td></td><td>id</td><td>String</td><td>文件id</td></tr>";
	reqContent_documents_fileshowdownload += "<tr><td></td><td>oldName</td><td>String</td><td>文件名</td></tr>";
	reqContent_documents_fileshowdownload += "<tr><td></td><td>fileUrl</td><td>String</td><td>文件地址</td></tr>";
	reqContent_documents_fileshowdownload += "<tr><td></td><td>fileSize</td><td>String</td><td>文件大小</td></tr>";



	$.documents_fileshowdownload = "<h3>请求：</h3>"+reqLine+reqLine1+resContent_documents_fileshowdownload+"</table>" +
		"<h3>响应：</h3>"+resLine+reqContent_documents_fileshowdownload+"</table>";



	/******************************文件夹批量下载***************************/
//请求内容
	var	resContent_documents_folderdownload = "<tr><td style='width:150px;'>userId</td><td style='width:120px;'>String</td><td>登录ID,最大长度 32 字节<span style='color:red;'>(必传)</span></td></tr>";
	resContent_documents_folderdownload += "<tr><td style='width:150px;'>ids</td><td style='width:120px;'>String</td><td>文件夹id(多个逗号拼接)<span style='color:red;'>(必传)</span></td></tr>";

//响应内容
	var	reqContent_documents_folderdownload = "<tr><td style='width:150px;'>data</td><td style='width:120px;'>String</td><td>响应结果数据 </td></tr>";
	reqContent_documents_folderdownload += "<tr style='height:30px;'><td>以下是数据集：<td></tr>";
	reqContent_documents_folderdownload += "<tr style='height:30px;'><td>listdata</td><td>Vector</td><td>数据集</td></tr>";
	reqContent_documents_folderdownload += "<tr><td></td><td>id</td><td>String</td><td>文件id</td></tr>";
	reqContent_documents_folderdownload += "<tr><td></td><td>oldName</td><td>String</td><td>文件名称</td></tr>";
	reqContent_documents_folderdownload += "<tr><td></td><td>fileUrl</td><td>String</td><td>文件路径</td></tr>";
	reqContent_documents_folderdownload += "<tr><td></td><td>fileSize</td><td>String</td><td>文件大小</td></tr>";
	reqContent_documents_folderdownload += "<tr><td></td><td>judgeResult</td><td>String</td><td>-3文件夹已删除-2不具备操作文件夹权限-4被取消共享0自建文件夹1共享给我的文件夹</td></tr>";


	$.documents_folderdownload = "<h3>请求：</h3>"+reqLine+reqLine1+resContent_documents_folderdownload+"</table>" +
		"<h3>响应：</h3>"+resLine+reqContent_documents_folderdownload+"</table>";


})(TestInfo);