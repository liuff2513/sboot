<#assign hidecss="display:block;",isHide=false>
<#if type??&&type?index_of("fieldName:")!=-1><#assign hidecss="display:none;",isHide=true></#if>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="renderer" content="webkit">
<link href="./theme/img/loading.gif" rel="prefetch" />
<link href="./theme/img/logo_element.png" rel="SHORTCUT ICON" />
<!--[if lt IE 8]>
	<script>
        alert('不支持IE6-8，请使用谷歌、火狐等浏览器\n或360、QQ等国产浏览器的极速模式浏览本页面！');
    </script>
<![endif]-->
	<link rel="stylesheet" href="plugins/Validform_v5.3.2/css/style.css" type="text/css" media="all" />
	<link rel="stylesheet" href="plugins/Validform_v5.3.2/css/demo.css" type="text/css" />
	<link href="theme/css/bootstrap.min.css?v=3.4.0" type="text/css" rel="stylesheet"/>
	<link href="theme/css/font-awesome/css/font-awesome.min.css?v=4.3.0" type="text/css" rel="stylesheet"/>
	<link href="theme/css/animate.min.css" rel="stylesheet">
	<link href="plugins/jquery-plugins/dataTables/css/dataTables.bootstrap.css" type="text/css" rel="stylesheet"/>
	<link href="plugins/jquery-plugins/validationEngine/css/validationEngine.jquery.css" type="text/css" rel="stylesheet">
	<link href="plugins/uploadify/js/uploadifive.css" rel="stylesheet" type="text/css">
	<link href="theme/css/emoji.css" type="text/css" rel="stylesheet"/>
	<link href="plugins/baihuicrm/baihuicrm.calendar.css" rel="stylesheet">
	<link href="theme/css/style.min.css?v=3.0.0" rel="stylesheet">
	<link href="theme/css/jquery.fancybox.css" rel="stylesheet" /> 
	<link href="theme/css/blueimp-gallery.min.css" rel="stylesheet" /> 
	<link href="theme/css/document.css" rel="stylesheet">
	<link href="theme/css/documentmanagement.css" rel="stylesheet">
	<link href="theme/css/attachUpload.css" rel="stylesheet">
    <#--主题-->
    <link rel="stylesheet" href="theme/css${Session['_USER_LOGIN_'].styleId?default('')}/skin${Session['_USER_LOGIN_'].styleId?default('')}.css ">

	<#--信箱-->
	<link href="theme/style1/css/plugins/iCheck/custom.css" rel="stylesheet">
	<link href="theme/style1/css/plugins/summernote/summernote2.css" rel="stylesheet">
	<link href="theme/style1/css/plugins/summernote/summernote-bs3.css" rel="stylesheet">
	<link  href="plugins/zyupload/control/css/zyUpload.css" rel="stylesheet">
	<#--信箱-->
	
	<#--
	<link href="theme/css/baihuicrm.css" rel="stylesheet">
	-->
	<link href="plugins/baihuierp/erptablebody.css" rel="stylesheet">
	<script src="plugins/baihuicrm/baihuicrm.hashmap.js"></script>
	<script src="theme/js/jquery-2.1.1.min.js" language="javascript" type="text/javascript"></script>
	<script src="plugins/jquery-ui-1.11.4/jquery-ui.min.js" language="javascript" type="text/javascript"></script>
	<script src="theme/js/util/disposeUtil.js"></script>
	<link rel="stylesheet" href="plugins/zTree_v3/css/customStyle/customStyle.css">
	<link rel="stylesheet" href="plugins/zTree_v3/css/customStyle/assistStyle.css">
	<script src="plugins/bootstrap-plugins/paginator/bootstrap-paginator.min.js" language="javascript" type="text/javascript"></script>
	<script src="plugins/zTree_v3/js/jquery.ztree.core-3.5.min.js" language="javascript" type="text/javascript"></script>
	<script src="plugins/zTree_v3/js/jquery.ztree.excheck-3.5.min.js" language="javascript" type="text/javascript"></script>
	<script src="plugins/zTree_v3/js/jquery.ztree.exedit-3.5.min.js" language="javascript" type="text/javascript"></script>

	<script type="text/javascript" src="plugins/ckeditor/ckeditor.js"></script>
   <#-- <script src="http://cdn.ckeditor.com/4.6.2/standard-all/ckeditor.js"></script>-->
    <script src="theme/js/util/disposeUtil.js"></script>
    <script src="theme/js/view/view.js"></script>
</head>
<body id="qixinChat_body" class="fixed-sidebar full-height-layout gray-bg pace-done">

<#--
<#include "document_attach.ftl"/>
-->

<div id="wrapper">
	<!--左侧导航开始-->
	<nav class="navbar-default navbar-static-side" role="navigation" <#if isHide>style="display: none;"</#if>>
        <#--style="${hidecss}"-->
	<div class="nav-close">
		<i class="fa fa-times-circle"></i>
	</div>
	<div id="left-home" class="sidebar-collapse">
		<ul class="nav pai0915 nan" id="side-menu">
			<li class="nav-header">
				<div class="profile-element" id="companyLogo_right_parent_div">
					<img height="57" width="220" src=".<#if companyLogo?exists&&companyLogo!=''>${companyLogo}<#else>/theme/img/logo.png</#if>?date=${(.now)?default('')}">
				</div>
			</li>
			<li>
				<a id="menu_home" title="主页" href="./welcome?module=home" data-params='{"module":"home"}'>
					<i class="menu-white-sprite menu2-40"></i> <span class="nav-label">主页</span>
				</a>
			</li>
			<#list functionsLe1?sort_by("seq") as function>
			<#assign key=function.id />
			<#if ((function.link!'')==""&&functionsLe2[key]??&&functionsLe2[key]?size gt 0)||(function.link!'')!="">
			<li title="${function.name}">
				<#if functionsLe2[key]??>
					<a title="${function.name}" href="#">
				<#else>
					<a id="menu_${function.nameSpace!''}" title="${function.name}" href="./welcome?module=${function.nameSpace!''}" data-params='{"module":"${function.nameSpace!""}"}'>
				</#if>
					<i class="menu-white-sprite ${function.imagePath?default('')}"></i> <span class="nav-label">${function.name}</span>
					<#if functionsLe2[key]??><span class="fa arrow"></span></#if>
				</a>
				<#if functionsLe2[key]??>
					<ul class="nav nav-second-level">
					<#list functionsLe2[key]?sort_by("seq") as child>
						<li>
							<a id="menu_${child.nameSpace!''}" title="${child.name}" href="./welcome?module=${child.nameSpace!''}" data-params='{"module":"${child.nameSpace!""}"}'>
								<#--
								<i class="fa"></i> <span class="nav-label">${child.name}</span>
								-->
								${child.name}
							</a>
						</li>
					</#list>
					</ul>
				</#if>
			</li>
			</#if>
			</#list>
		</ul>
	</div>
	</nav>
	<!--左侧导航结束-->
	<!--右侧部分开始-->
	<div id="page-wrapper" class="gray-bg dashbard-1" <#if isHide>style="margin:0px;height:auto;width: 100%"</#if>>
		<div class="row clright-head" bhc-auto="top" style="${hidecss}">
			<nav class="navbar navbar-static-top" role="navigation">
			<div class="navbar-header">
				<a class="minimalize-styl-2 navbar-minimalize">
					<i class="fa fa-2x fa-bars"></i>
                        <#--<img src="theme/img/shrink-menu-left.png" alt="">-->
				</a>
				<div role="search" class="navbar-form-custom" method="post" action="search_results.html">
					<div id="search_div_top" class="form-group has-feedback">
						<input type="text" onKeyUp='disposeUtil.limitlength(this,15);' placeholder="请输入搜索关键词" class="form-control"  name="top-search" id="top-search" class=""/>
						<span class="dback">
						<a class="btn-search">
							<#--<i id="search_id" class="fa fa-lg fa-search"></i>-->
                            <img src="theme/img/search.png" id="search_id" alt="" style="vertical-align: text-top;">
						</a>
						</span>
					</div>
				</div>
			</div>
			<ul class="nav navbar-top-links navbar-right m-t-mda">
				<li class="dropdown">
				<a href="#" title="添加" data-toggle="dropdown"  id="quickAdd"><i class="headtop01"></i></a>
				<!--快速创建-->
				<ul class="dropdown-menu-found" role="menu" id="quickUL">
					<div class="div-bg-t1"></div>
					<#--过滤掉（回款计划、实际回款）-->
					<#assign disallowNameSpaces="payment|paymentRecord|message|reportForm|chartDashboardRecord|workReport|receiveMail|apply|requirement|attachment|predictItem|">
					<#list functionsLe1?sort_by("seq") as function>
					<#assign key=function.id />
					<#if (function.link!'')!=''>
						<#if !disallowNameSpaces?contains((function.nameSpace!'|')+'|')>
						    <#--任务特殊处理区分主子任务-->
						    <#if (function.nameSpace!'')=='assignment'>
							<li>
								<a class="operation" data-params='{"module":"${function.nameSpace!''}", "opName":"create"}'>主${function.name}</a>
							</li>
							<li>
								<a class="operation" data-params='{"module":"${function.nameSpace!''}", "opName":"subCreate"}'>子${function.name}</a>
							</li>													    
						    <#else>
							<li>
								<#if (function.nameSpace!'')=="qixinMessage">
									<a class="operation" data-params='{"module":"${function.nameSpace!''}", "opName":"create"}'>公告</a>
								<#else>
									<a class="operation" data-params='{"module":"${function.nameSpace!''}", "opName":"create"}'>${function.name}</a>
								</#if>
							</li>						    
						    </#if>
						</#if>
					<#else>
						<#if functionsLe2[key]??>
						<#list functionsLe2[key]?sort_by("seq") as child>
							<#if !disallowNameSpaces?contains((child.nameSpace!'|')+'|')>
							<li>
								<#if (function.nameSpace!'')=="qixinMessage">
									<a class="operation" data-params='{"module":"${child.nameSpace!''}", "opName":"create"}'>公告</a>
								<#else>
									<a class="operation" data-params='{"module":"${child.nameSpace!''}", "opName":"create"}'>${child.name}</a>
								</#if>
							</li>
							</#if>
						</#list>
						</#if>
					</#if>
					</#list>
				</ul>
				</li>
				<#include "./qixinMessageAndNoticeList.ftl">
				<li>
					<a href="javascript:settingspage();" target="_self" title="设置"><i class="headtop06"></i></a>
				</li>
				<li>
					<div class="headtop-nameimg headtop-nameimgtop" onclick="settingspage('account');">
					<img id="currentUserPhoto_welcome_img" class="img-circle" src=".${Session['_USER_LOGIN_'].photo!'/theme/img/010927810.jpg'}?date=${(.now)?default('')}" alt="image"> 
					<div class="headtop-name-information">
					<div class="div-bg-t1"></div>
						<input type="hidden" id="_USER_ID_" value="${Session['_USER_LOGIN_'].id}">
						<p><i class="headtop-name"></i><span id="currentUserName_welcome_span">${Session['_USER_LOGIN_'].name?default("未知？")}</span></p>
						<p><i class="headtop-phone"></i><span id="currentUserMobilePhone_welcome_span">
							<#if Session['_USER_LOGIN_'].mobilePhone??&&(Session['_USER_LOGIN_'].mobilePhone!'')!=''>
								${Session['_USER_LOGIN_'].mobilePhone}
							<#else><a>未绑定手机</a></#if>
						</span></p>
						<p><i class="headtop-mail"></i><span id="currentUserEmail_welcome_span">
							<#if Session['_USER_LOGIN_'].email??&&(Session['_USER_LOGIN_'].email!'')!=''>
								${Session['_USER_LOGIN_'].email}
							<#else><a>未绑定邮箱</a></#if>
						</span></p>
					</div>
					
					</div>
					<span hidden id="currentUserName_welcome_span">${Session['_USER_LOGIN_'].name?default("未知？")}</span>
					<a>
						<i class="fa  logoutfont" onclick="loginout();"><small>退出</small></i>
				    </a>
				
				</li>
			</ul>
			</nav>
		</div>
		<div class="row" id="content-main" bhc-auto="bottom" style="overflow-y:auto;overflow-x:hidden;">
		</div>
	</div>
	<!--右侧部分结束-->
	
</div>
<!--组织组同事 请求url判断-->
<input type="hidden" id="OGUURLTPYE" value=".">

<form name="loginoutForm" role="form" action='./logout' method="post"></form>
<script language="javascript" type="text/javascript">
	var linkModuleMap = new Map(); //声明链接 linkMap
	var object_home = {}; object_home['nameSpace']="home"; object_home['actionName']="home"; object_home['function.name']="主页";
	linkModuleMap.put("home", object_home);//登录成功后默认将主页链接加入linkMap
	<#list funcs as func>
		<#if (func.nameSpace!'')!="">
			var object_${func_index} = {};
			object_${func_index}['function.id'] = "${func.id!''}";
			object_${func_index}['function.name'] = "${func.name!''}";
			object_${func_index}['function.tableName'] = "${func.tableName!''}";
			object_${func_index}['function.entityName'] = "${func.entityName!''}";
			object_${func_index}['function.entityClass'] = "${func.entityClass!''}";
			object_${func_index}['function.link'] = "${func.link!''}";
			object_${func_index}['function.nameSpace'] = "${func.nameSpace!''}";
			object_${func_index}['function.actionName'] = "${func.actionName!''}";
			object_${func_index}['nameSpace'] = "${func.nameSpace!''}";
			object_${func_index}['actionName'] = "${func.actionName!''}";
			linkModuleMap.put("${func.nameSpace!''}", object_${func_index});
			linkModuleMap.put("${func.tableName!''}", object_${func_index});
		</#if>
	</#list>
</script>
<#-- 全局js -->
<script src="theme/js/bootstrap.min.js?v=3.4.0" language="javascript" type="text/javascript"></script>
<script src="plugins/jquery-plugins/metisMenu/jquery.metisMenu.js"></script>
<script src="plugins/jquery-plugins/slimscroll/jquery.slimscroll.min.js"></script>
<script src="plugins/bootstrap-plugins/rightclick/BootstrapMenu.min.js"></script>
<script src="plugins/layer/layer.min.js"></script>
<script src="theme/js/hplus.min.js?v=3.0.0"></script>
<script src="plugins/jquery-plugins/dataTables/js/jquery.dataTables.min.js" language="javascript" type="text/javascript"></script>
<script src="plugins/jquery-plugins/dataTables/js/dataTables.bootstrap.js" language="javascript" type="text/javascript"></script>
<script src="plugins/jquery-plugins/dataTables/js/dataTables.plugIns.js" language="javascript" type="text/javascript"></script>
<script src="plugins/jquery-plugins/validationEngine/js/jquery.validationEngine-zh_CN.js" charset="UTF-8" language="javascript" type="text/javascript"></script>
<script src="plugins/jquery-plugins/validationEngine/js/jquery.validationEngine.js" charset="UTF-8" language="javascript" type="text/javascript"></script>
<script src="plugins/Validform_v5.3.2/js/Validform_v5.3.2.js" language="javascript" type="text/javascript" ></script>
<script src="plugins/uploadify/js/jquery.uploadifive.js" language="javascript" type="text/javascript"></script>
<script src="plugins/cookie/jquery.cookie.js" charset="UTF-8" language="javascript" type="text/javascript"></script>
<script src="plugins/My97DatePicker/WdatePicker.js" language="javascript" type="text/javascript"></script>
<script src="pages/account/compress/mobileFix.mini.js?v=ad62f13"></script>
<script src="pages/account/compress/exif.js?v=dd609b9"></script>
<script src="pages/account/compress/lrz.js?v=3d33fcf"></script>
<script src="theme/js/icheck.min.js"></script>

<#--信箱-->
<script src="theme/js/content.min.js"></script>
<script src="theme/js/summernote.js"></script>
<script src="theme/js/summernote2-zh-CN.js"></script>
<script type="text/javascript" src="plugins/zyupload/core/zyFile.js"></script>
<script type="text/javascript" src="plugins/zyupload/control/js/zyUpload.js"></script>
<#--信箱-->



<script src="theme/js/jquery.blueimp-gallery.min.js" language="javascript" type="text/javascript"></script>
<#--
-->
<script src="https://api.map.baidu.com/api?v=2.0&ak=Xyd7IZTG8EUsunIPwtASxTBp8SIOa72m&s=1;" language="javascript" type="text/javascript"></script>

<#-- 自定义js -->
<script src="plugins/baihuicrm/baihuicrm.updateFields.js"></script>
<script src="plugins/baihuicrm/baihuicrm.calendar.js"></script>
<script src="plugins/baihuicrm/baihuicrm.usersel.js"></script>
<script src="plugins/baihuicrm/baihuicrm.overlayer.js"></script>
<script src="plugins/baihuicrm/baihuicrm.resize.js"></script>
<script src="plugins/baihuicrm/baihuicrm.js"></script>
<script src="plugins/baihuierp/erptablebody.js"></script>
<script src="plugins/baihuierp/calculateUtil.js"></script>
<script src="plugins/baihuierp/commonValid.js"></script>
<script src="pages/system/dalPro.js"></script>

<#-- 功能实现JS-->
<script language="javascript" type="text/javascript">
	$(document).ready(function(){
		//返回主页
		$("#companyLogo_right_parent_div").click(function(){
			var host = window.location.host;
			var protocol = window.location.protocol;
			window.location.href=protocol+"//"+host;
		});
	});
	var settingWindow;
	function settingspage(account){
		var url="./settingsList";
		if(account){
			url="./settingsList?account="+account;
		}
		settingWindow = window.open(url, '后台设置', '');
	}
    //左侧导航点击 隐藏TOP div
    $("div[id='left-home']").on("click",function(){
            $("div[class='dropdown-menu dropdown-alerts qixinshowHide']").each(function(){
                $(this).hide();
            });
        });

	function loginout(){

		window.loginoutForm.submit();
		if(settingWindow){
			settingWindow.loginoutForm.submit();
		}
		//断开融云连接。
		//rongyunDisconnect();
		RongIMClient.getInstance().disconnect();
		
	}

	/*菜单缩放时悬浮弹出二级菜单*/
	$(".navbar-minimalize").click(function(){
	    var miniBar=$("body").attr('class').indexOf('mini-navbar');
	    if(miniBar>0){
	        $("#left-home").css('overflow','hidden');
	    }else{
	        $("#left-home").css('overflow','visible');
	    }
	});
</script>


<#--企信功能-->
<div>
<#if !isHide>
<#include "qixin/qixinHead.ftl"/>
<#include "qixin/qixinBody.ftl"/>
<#include "qixin/qixinChat.ftl"/>
<#include "qixin/qixinFoot.ftl"/>
</#if>
</div>
<#--弹框页面标签(所有弹出加载页面都放在这里)-->
<#include "../common/commonModal.ftl" />
<script src="pages/home/search/search.js"></script>
<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1260709685'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1260709685%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));</script>
</body>
<#--收付款--->
<script src="pages/erp/payReceive/payReceive.js"></script>
<#--认领打回共享js----------------------------->
<script src="pages/common/back_claim_share.js"></script>
<#--企信小图标js------------------------------------->
<script src="pages/home/qixin/qixinMN.js"></script>
<#---评论+时间轴--------------------------------------->
<script src="pages/common/commentAjax.js" language="javascript" type="text/javascript"></script>
<script src="pages/common/timelineAjax.js" language="javascript" type="text/javascript"></script>
<script>
	CKEDITOR.disableAutoInline = true;//关闭ckeditor自动替换，勿删！！
</script>
<#--图表echartsJS-->
<script src="pages/crm/chart/common.js" language="javascript" type="text/javascript"></script>
<script src="theme/js/echarts/echarts.js" language="javascript" type="text/javascript"></script>
<#--图表hchartsJS-->
<#--注掉将不显示滚动条（为了解决highcharts.js和highstock.js不能同时引用的问题）
-->
<script src="theme/js/highCharts/highcharts.js" language="javascript" type="text/javascript"></script>
<script src="theme/js/highCharts/highstock.js" language="javascript" type="text/javascript"></script>
<script src="theme/js/highCharts/modules/funnel.js" language="javascript" type="text/javascript"></script>
<script src="theme/js/highCharts/highcharts-3d.js" language="javascript" type="text/javascript"></script>
<script src="theme/js/highCharts/modules/exporting.js" language="javascript" type="text/javascript"></script>
<script src="plugins/baihuicrm/baihuicrm.inputclear.js"></script>
<script src="theme/js/table.js"></script>
<#--<script>
   /*表格拖拽*/
	$(document).ready(function(){
		var themeDatas=$(".dataTables_scrollHead .themeData"),
			simpleDatas=$(".dataTables_scrollHead .simpleData");
		var child='<span class="resizeDivClass"></span>';
		$.each(themeDatas,function(){
			$(this).append(child);
		})
		$.each(simpleDatas,function(){
            $(this).append(child)
		})

		var resizeDivs=document.querySelectorAll(".resizeDivClass");
		for(var i= 0,len=resizeDivs.length;i<len-1;i++){
            drag(resizeDivs[i])
            resizeDivs[len-1].style.display="none";
		}
	})
</script>-->
</html>