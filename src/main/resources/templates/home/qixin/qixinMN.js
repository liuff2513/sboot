/**
 * 延迟三秒
 */
$(function(){
	waitAMinutes();
});
var global_qixin_unread= false;//（勿删）默认延迟3秒，防止首次登陆监听到的未读消息重复累加
var timer_qixinUnread,timer_qixin_wait=2;
function waitAMinutes(){
	//console.log(timer_qixin_wait);
	if(timer_qixin_wait<=0){
		clearTimeout(timer_qixinUnread);
		global_qixin_unread = true;
		return;
	}else{
		timer_qixin_wait--;
	}
	timer_qixinUnread = setTimeout(waitAMinutes,1000);
}
/**
 * 点击图标显示和隐藏内容
 * @param elem
 */
function showOrHide(elem,tableName){
	//bindDocs();
	$("#unReadNum_"+tableName).attr("type","c");//点击
	if($(elem).next().is(":hidden")){ 
		$("#unReadNum_qixinNotice").attr("totalPage",1);
		$("#unReadNum_qixinNotice").attr("pageNo",0);
		
		var totalCountPre = $("#unReadNum_"+tableName).attr("valuePre");
		var totalCount = $("#unReadNum_"+tableName).attr("value");
		//获取某个模块的未读消息
		$("#ul_"+tableName).html("");
		getQixinDatasByTableName(tableName);
		$(".qixinshowHide").hide();	
		var $elem=$("#ul_"+tableName);
		console.log("weizhi"+$elem[0].scrollTop);
		$(elem).next().show();
		$elem[0].scrollTop=0;
	}else{
		$(".qixinshowHide").hide();	
	}
}

document.onclick =function(e){
    var target = e.target;
    var tc = target.className;
    var className = $(target).parents(".dropdown").attr("class");
    //alert($(target).parents(".dropdown").attr("class"));
    if(!className||className.indexOf("dropdown")==-1){
    	$(".qixinshowHide").hide();	
    }else{
    	
    }
};
/**
 * 对非TOP document 元素绑定 TOP 隐藏事件，使TOP中div 在失去焦点时隐藏
 * 主体函数 在500毫秒后执行绑定 mainIFrame document事件，避免iframe加载完成前触发未知document绑定
 */
function bindDocs(){
    var iframeWin = window.frames['mainIFrame'];
    setTimeout(bindClick,500);
    function bindClick(){
        var sonframe_num = window.frames['mainIFrame'].frames.length;
        for(var i=0;i<sonframe_num;i++){
            (function (){ //加入闭包，放开执行度
                $(iframeWin.frames[i].document).on("click",function () {
                    $("div[class='dropdown-menu dropdown-alerts qixinshowHide']").each(function(){
                        $(this).hide();
                    });
                });
            })();
        }
        $(iframeWin.document).on("click",function () {
            $("div[class='dropdown-menu dropdown-alerts qixinshowHide']").each(function(){
                $(this).hide();
            });
        });
    }
}
/**
 * 获取某个模块的未读消息
 * @param tableName
 */
function getQixinDatasByTableName(tableName){
	var totalCountPre = $("#unReadNum_"+tableName).attr("valuePre");
	debugger;
	var totalCount = $("#unReadNum_"+tableName).attr("value");
	if(totalCount=="0"){
		$("#div_msg_"+tableName).show();
		return ;
	}
	var totalPage;
	var pageNo=1;
	if("qixinNotice"==tableName){
		totalPage = $("#unReadNum_qixinNotice").attr("totalPage");
		totalPage = parseInt(totalPage);
		pageNo = $("#unReadNum_qixinNotice").attr("pageNo");
		pageNo = parseInt(pageNo);
		if(pageNo==totalPage&&totalCount==totalCountPre){
			return;
		}
		pageNo= pageNo+1;
	}
	var type = $("#unReadNum_"+tableName).attr("type");
	if(type=="c"/*&&totalCount!=totalCountPre*/){
		pageNo =1;
	}
	$("#div_msg_"+tableName).hide();
	$.ajax({
		url:'./qixinMessage/qixinMessageAndNoticeList',
		type:'post',
		data:{tableName:tableName,pageNo:pageNo},
		async:false,
		dataType:'json',
		success:function(page){
			if(page!=null){
				//添加数据
				addQixinDatas(page,tableName);
			}else{
				
			}
		}
		
	});
}

/**
 * 显示某个模块的数据
 * @param data
 * @param tableName
 */
function addQixinDatas(page,tableName){
	
	if("qixinMessage"==tableName){
		addQixinMessage(page,tableName);
	}else if("qixinNotice"==tableName){//公告
		addQixinNotice(page,tableName);
	}else if("qixinWaring"==tableName){
		addQixinWaring(page,tableName);
	}else if("qixinAttention"==tableName){
		addQixinAttention(page,tableName);
	}else if("qixinApprove"==tableName){
		addQixinApprove(page,tableName);
	}
	
}
//显示预警消息的内容
function addQixinWaring(page,tableName){
	var datas =  page.datas,_html="",linkURL,dataParams;
	if(datas!=null&&datas.length>0){
		var mn=null;
		for (var i = 0; i < datas.length; i++) {
			mn=datas[i];
			linkURL = getLinkURL(mn.nameSpace,mn.dataId);
			dataParams="{'module':'"+(mn.nameSpace)+"','opName':'view','entityId':'"+mn.dataId+"'}";
			//userInfo = getUserInfo(mn);
			_html += '<li>'
				+'<a href="'+linkURL+'" class="link" data-params="'+dataParams+'" target="_blank" >'
				+'<div class="dropdown-music-left" >'
				+'<i class="fa a-fw"><img src=".'+(mn.portraitUri!=null&&mn.portraitUri!=''?mn.portraitUri:'/theme/img/010927810.jpg')+'" /></i> '
				+'</div>'
				+'<div class="pull-right-news-right">'							
				+'<span ><em>'+(mn.content!=null?mn.content:"")+'</em></span> '
				+'<span class="pull-right text-muted small">'+formateDate_(mn.createdTime.time)+'</span>'
				+'</div>'
				+'</a>'
				+'</li>';
		}
		//设置小图标未读数量
		setUnreadDataNum(tableName,datas.length);
		
	}else{//没有数据
		
	}
	$("#ul_"+tableName).append(_html);

}
//显示审批消息的内容

function addQixinApprove(page,tableName){
	var qixinCurrentUserId = $("#qixinCurrentUserId").val();
	var datas =  page.datas;
	var _html="",linkURL,dataParams,content;
	if(datas!=null&&datas.length>0){
		var mn=null;
		var approvePic ="./theme/img/worksimg/approve-on.png";//默认待我审批
		var quers_ = null;
		for (var i = 0; i < datas.length; i++) {
			mn=datas[i];
			linkURL = getLinkURL(mn.nameSpace,mn.dataId);
			if(mn.nameSpace=="approval"){
				linkURL = "./welcome?module=approval";
			}
			dataParams="{'module':'"+(mn.nameSpace)+"','opName':'view','entityId':'"+mn.dataId+"'}";
			//console.log("审批：：：：："+linkURL);
			_html += '<li>'
				+'<a href="'+linkURL+'" class="link" data-params="'+dataParams+'" target="_blank" >'
				+'<div class="dropdown-music-left" >';
			//我的申请
			if(mn.proposerId!=""&&mn.proposerId==qixinCurrentUserId){
				if(mn.result=="ing"){
					approvePic ="./theme/img/worksimg/approve-in.png";
					/*if(mn.approverName1!=null&&mn.approverName1!=""){*/
						content = '<span style="font-weight:bold;color:#0a7bcc;">'+(mn.approverName1!=null?mn.approverName1:"")+'</span>已通过您的申请<span style="font-weight:bold;color:#0a7bcc;">'+(mn.moduleName)+'：'+(mn.theme)+'</span>，正在等待其他审批人审批。';
					/*}else{
						content = '您提交的申请<span style="font-weight:bold;color:#0a7bcc;">'+(mn.moduleName)+'：'+(mn.theme)+'</span>正在等待<span style="font-weight:bold;color:#0a7bcc;">'+(mn.approverName!=null?mn.approverName:"")+'</span>的审批。';
					}*/
				}else if(mn.result=="back"){
					approvePic ="./theme/img/worksimg/approve-n.png";
					content = '<span style="font-weight:bold;color:#0a7bcc;">'+(mn.approverName!=null?mn.approverName:"")+'</span>已驳回您的申请<span style="font-weight:bold;color:#0a7bcc;">'+(mn.moduleName)+'：'+(mn.theme)+'</span>，审批终结。';
				}else if(mn.result=="pass"){
					approvePic ="./theme/img/worksimg/approve-y.png";
					content = '<span style="font-weight:bold;color:#0a7bcc;">'+(mn.approverName!=null?mn.approverName:"")+'</span>已同意您的申请<span style="font-weight:bold;color:#0a7bcc;">'+(mn.moduleName)+'：'+(mn.theme)+'</span>，审批完成。';
				}else if(mn.result=="delegate"){//新加的委派
					content = '<span style="font-weight:bold;color:#0a7bcc;">'+(mn.proposerName!=null?mn.proposerName:"")+'</span>向您委派了新的申请<span style="font-weight:bold;color:#0a7bcc;">'+(mn.moduleName)+'：'+(mn.theme)+'</span>，等待您的审批。';
				}

			}else{//待我审批
				if(mn.nameSpace=="approval"){
					content = '<span style="font-weight:bold;color:#0a7bcc;">您好，有一批数据需要您审批，点击查看。</span>';
				}else if(mn.result=="delegate"){
					content = '<span style="font-weight:bold;color:#0a7bcc;">'+(mn.proposerName!=null?mn.proposerName:"")+'</span>向您委派了新的申请<span style="font-weight:bold;color:#0a7bcc;">'+(mn.moduleName)+'：'+(mn.theme)+'</span>，等待您的审批。';
				}else{
					content = '<span style="font-weight:bold;color:#0a7bcc;">'+(mn.proposerName!=null?mn.proposerName:"")+'</span>向您提交了新的申请<span style="font-weight:bold;color:#0a7bcc;">'+(mn.moduleName)+'：'+(mn.theme)+'</span>，等待您的审批。';
				}
			}
			
			
			_html +='<i class="fa a-fw"><img src="'+approvePic+'" /></i> '
					+'</div>'
					+'<div class="pull-right-news-right">'							
					+'<span ><em>'+content+'</em></span> '
					+'<span class="pull-right text-muted small">'+formateDate_(mn.createdTime.time)+'</span>'
					+'</div>'
					+'</a>'
					+'</li>';
		}
		//设置小图标未读数量
		setUnreadDataNum(tableName,datas.length);
	}else{//没有数据
		
	}
	$("#ul_"+tableName).append(_html);

}
//显示关注消息的内容
function addQixinAttention(page,tableName){
	var datas =  page.datas;
	var _html="",linkURL,dataParams,linkURL_r,dataParams_r;
	if(datas!=null&&datas.length>0){
		var mn=null;
		var attentionFields=null;
		var fieldOldValue="";
		for (var i = 0; i < datas.length; i++) {
			mn=datas[i];
			linkURL = getLinkURL(mn.nameSpace,mn.dataId);
			dataParams="{'module':'"+(mn.nameSpace)+"','opName':'view','entityId':'"+mn.dataId+"'}";
			if(mn.operation!=null&&mn.operation!=""){
				//userInfo = getUserInfo(mn);
				if(mn.relNameSpace!=null&&mn.relNameSpace!=""){//关联模块
					linkURL_r = getLinkURL(mn.relNameSpace,mn.relDataId);
					dataParams_r="{'module':'"+(mn.relNameSpace)+"','opName':'view','entityId':'"+mn.relDataId+"'}";
					_html += '<li>'
						//+'<a href="'+linkURL+'" target="_blank" >'
						+'<div class="dropdown-music-left" >'
						+'<i class="fa a-fw"><img title="'+mn.userName+'" src=".'+(mn.portraitUri!=null&&mn.portraitUri!=''?mn.portraitUri:'/theme/img/010927810.jpg')+'" /></i> '
						+'</div>'
						+'<div class="pull-right-news-right">'							
						+'<a href="'+linkURL+'" class="link" data-params="'+dataParams+'" target="_blank" >'
						+'<span ><strong class="name-strong">'+(mn.userName!=null?mn.userName:"")+'</strong>于 <small class="text-muted">'+formateDate_(mn.createdTime.time)+'</small>更新了<strong class="name-strong">'+mn.moduleName+'：'+mn.moduleTitle+'</strong></span></a> '
						+'<a href="'+linkURL_r+'" class="link" data-params="'+dataParams_r+'" target="_blank" >'
						+'<span >'+mn.operation+'<strong class="name-strong">'+mn.relModuleName+'：'+mn.relModuleTitle+'</strong></span></a> '
						//+'<span class="pull-right text-muted small">'+formateDate_(mn.createdTime.time)+'</span>'
						+'</div>'
						//+'</a>'
						+'</li>';
				}else{
					if(mn.operation=="转换了"){
						linkURL = getLinkURL(mn.nameSpace,mn.dataId)+'&convertOpera=convert';
						dataParams="{'module':'"+(mn.nameSpace)+"','opName':'view','entityId':'"+mn.dataId+"','convertParam':'convert'}";
					}
					_html += '<li>'
						+(mn.operation=="转换了"?'<a href="'+linkURL+'" class="link" data-params="'+dataParams+'" target="_blank" >':"")
						+'<div class="dropdown-music-left" >'
						+'<i class="fa a-fw"><img title="'+mn.userName+'" src=".'+(mn.portraitUri!=null&&mn.portraitUri!=''?mn.portraitUri:'/theme/img/010927810.jpg')+'" /></i> '
						+'</div>'
						+'<div class="pull-right-news-right">'							
						+'<span ><strong class="name-strong">'+(mn.userName!=null?mn.userName:"")+'</strong>于 <small class="text-muted">'+formateDate_(mn.createdTime.time)+'</small>'+mn.operation+'<strong class="name-strong">'+mn.moduleName+'：'+mn.moduleTitle+'</strong></span> '
						//+'<span class="pull-right text-muted small">'+formateDate_(mn.createdTime.time)+'</span>'
						+'</div>'
						+(mn.operation=="转换了"?'</a>':"")
						+'</li>';
				}
			}else{
				_html += '<li>'
					+'<a href="'+linkURL+'" class="link" data-params="'+dataParams+'" target="_blank" >'
					+'<div class="dropdown-music-left" >'
					+'<i class="fa a-fw"><img title="'+mn.userName+'" src=".'+(mn.portraitUri!=null&&mn.portraitUri!=''?mn.portraitUri:'/theme/img/010927810.jpg')+'" /></i> '
					+'</div>'
					+'<div class="pull-right-news-right">'							
					+'<span><em>'+mn.userName+'</em></span>于<font color="grey">'+formateDate_(mn.createdTime.time)+'</font>'
					+'更新了<span ><b>'+(mn.moduleName!=null?mn.moduleName:"")+'</b> <em>'+mn.moduleTitle+'</em></span> '
					+'<br>';
				
				attentionFields =  mn.attentionFields;
				if(attentionFields!=null&&attentionFields.length>0){
					fieldOldValue ="";
					for (var j = 0; j < attentionFields.length; j++) {
						fieldOldValue = attentionFields[j].fieldOldValue;	
						if(fieldOldValue!=""&&fieldOldValue!=null){
							_html += ''+attentionFields[j].fieldName+'<font color="grey">从</font><b>'+fieldOldValue+'</b>&nbsp<font color="grey">变更为</font>&nbsp<b>'+attentionFields[j].fieldNewValue+'</b><br>';				
						}else{
							_html += ''+attentionFields[j].fieldName+'&nbsp<font color="grey">已经更改为</font> &nbsp<b>'+attentionFields[j].fieldNewValue+'</b><br>';				
						}
					}
				}
				_html+= '</div></a></li>';
			}
				
		}
		//设置小图标未读数量
		setUnreadDataNum(tableName,datas.length);
	}else{//没有数据
		
	}
	$("#ul_"+tableName).append(_html);

}
//显示普通消息的内容
function addQixinMessage(page,tableName){
	var datas =  page.datas;
	var _html="",linkURL,dataParams,userName;
	if(datas!=null&&datas.length>0){
		var mn=null;
		for (var i = 0; i < datas.length; i++) {
			mn=datas[i];
			if(mn.operationName=="business"){//娄勇专用
				_html+='<li><div class="dropdown-music-left" >'
					+'<i class="fa a-fw"><img title="百会" src="./theme/img/logo-default.png" /></i> '
					+'</div>'
					+'<div class="pull-right-news-right">'							
					+'<span ><em>百会</em><em>'+mn.content+'</em></span> '
					+'<span class="pull-right text-muted small">'+formateDate_(mn.createdTime.time)+'</span>'
					+'</div>'
					+'</li>';
			}else if(mn.operationName=="reportFormPlan"){
				_html+='<div class="dropdown-music-left" >'
					+'<i class="fa a-fw"><img title="'+mn.userName+'" src=".'+(mn.portraitUri!=null&&mn.portraitUri!=''?mn.portraitUri:'/theme/img/010927810.jpg')+'" /></i> '
					+'</div>'
					+'<div class="pull-right-news-right">'							
					+'<span ><em>'+mn.userName+'</em><em>'+mn.content+'</em></span> '
					+'<span class="pull-right text-muted small">'+formateDate_(mn.createdTime.time)+'</span>'
					+'</div>'
					+'</li>';
				
			}else{
				dataParams="{'module':'"+(mn.nameSpace)+"','opName':'view','entityId':'"+mn.dataId+"'}";
				linkURL = getLinkURL(mn.nameSpace,mn.dataId);
				_html += '<li>';
				if(mn.functionTableName&&(mn.functionTableName=="qixinWorkReport"||mn.functionTableName=="bh_report")){
					userName="";
				}else{
					userName=mn.userName;
				}
				_html+='<a href="'+linkURL+'" class="link" data-params="'+dataParams+'"  target="_blank" >';
				_html+='<div class="dropdown-music-left" >'
					+'<i class="fa a-fw"><img title="'+mn.userName+'" src=".'+(mn.portraitUri!=null&&mn.portraitUri!=''?mn.portraitUri:'/theme/img/010927810.jpg')+'" /></i> '
					+'</div>'
					+'<div class="pull-right-news-right">'							
					+'<span ><em>'+userName+'</em><em>'+mn.content+'</em></span> '
					+'<span class="pull-right text-muted small">'+formateDate_(mn.createdTime.time)+'</span>'
					+'</div>'
					+'</a>'
					+'</li>';
			}
		}
		//设置小图标未读数量
		setUnreadDataNum(tableName,datas.length);
	}else{//没有数据
		
	}
	$("#ul_"+tableName).append(_html);

}
//点击消息展示工作报告
function showWorkReport(field){
   $("#menu_qixinWorkReport").trigger("click");
   timedCount(field.id);
}
//显示公告的内容
function addQixinNotice(page,tableName){
	var datas =  page.datas;
	var totalPage= page.totalPage;
	var pageNo= page.pageNo;
	var _html="",linkURL,dataParams;
	if(datas!=null&&datas.length>0){
		var mn=null;
		for (var i = 0; i < datas.length; i++) {
			mn=datas[i];
			linkURL = "./welcome?module=qixinNotice&opName=view&entityId="+mn.id;
			//userInfo = getUserInfo(mn);
			dataParams="{'module':'qixinNotice','opName':'view','entityId':'"+mn.id+"'}";
			_html += '<li>'
				+'<a href="'+linkURL+'" class="link" data-params="'+dataParams+'" target="_blank" >'
				+'<div class="dropdown-music-left" >'
				+'<i class="fa a-fw"><img title="'+mn.userName+'" src=".'+(mn.portraitUri!=null&&mn.portraitUri!=''?mn.portraitUri:'/theme/img/010927810.jpg')+'" /></i> '
				+'</div>'
				+'<div class="pull-right-news-right">'							
				+'<span ><em>'+(mn.userName!=null?mn.userName:"")+'</em> 发布了新公告：<em>'+mn.title+'</em></span> '
				+'<span class="pull-right text-muted small">'+formateDate_(mn.createdTime.time)+'</span>'
				+'</div>'
				+'</a>'
				+'</li>';
		}
		setUnreadDataNum(tableName,datas.length);
	}else{//没有数据
		
	}
	$("#ul_"+tableName).append(_html);
	//添加當前頁碼和總頁碼
	$("#unReadNum_qixinNotice").attr("totalPage",totalPage);
	$("#unReadNum_qixinNotice").attr("pageNo",pageNo);


}
//格式化时间
function formateDate_(dateTime) {
	var  date = new Date(dateTime); 
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var ss = date.getSeconds();
    m = m > 9 ? m : '0' + m;
    d = d > 9 ? d : '0' + d;
    h = h > 9 ? h : '0' + h;
    mi = mi > 9 ? mi : '0' + mi;
    ss = ss > 9 ? ss : '0' + ss;
    return y + '-' + m + '-' + d + ' ' + h + ':' + mi+':'+ss;
}

/**
 * 全部已读
 */
function allUnreadDatasView(tableName){
	$.ajax({
		url:'./qixinMessage/allUnreadDatasView',
		type:'post',
		data:{tableName:tableName},
		async:false,
		success:function(data){
			if(data=="success"){
				$("#unReadNum_"+tableName).attr("value","0");
				$("#unReadNum_"+tableName).html('0');
				$("#unReadNum_"+tableName).hide();
			}
			$(".qixinshowHide").hide();	
			
		}
		
	});
}
/**
 * 获得下一页内容
 */
//滚动条获取历史记录
var mnScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
var mnScrollTop = 0;   //滚动到的当前位置
var mnDivHight=0;//div高度
function getQixinNewPageDatas(tableName){
	var $elem=$("#ul_"+tableName);
	var isFisrt=parseInt($($elem).attr("first"));//第一次不自动加载
	mnDivHight = $($elem).height();
	mnScrollHight = $($elem)[0].scrollHeight;
	mnScrollTop = $($elem)[0].scrollTop;
	if(mnScrollTop==0){
		//alert("top");
	}
	if(mnScrollTop + mnDivHight >= mnScrollHight&&isFisrt>1){
		//if("qixinNotice"==tableName){
		//}
		$("#unReadNum_"+tableName).attr("type","s");
		getQixinDatasByTableName(tableName);
	}

}
/**
 * 设置查出的数据为已读
 */
function setUnreadDataNum(tableName,num){
	
	var isFirst = parseInt($("#ul_"+tableName).attr("first"));
	//alert(isFirst);
	if(isFirst==1){
		//$("#ul_"+tableName)[0].scrollTop  =0;
		$("#ul_"+tableName).attr("first",isFirst+1);
	    $("#ul_"+tableName).attr("onscroll","getQixinNewPageDatas('"+tableName+"');");
	}

}
/**
 * 
 */
function getLinkURL(nameSpace,dataId){
	return linkURL = './welcome?module='+nameSpace+'&opName=view&entityId='+dataId;
}




