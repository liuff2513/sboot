<#--企信消息与通知小图标之 【普通】消息------------------------------------->
				<li class="dropdown">
					<a title="消息" class="dropdown-toggle count-info" onclick="showOrHide(this,'qixinMessage');"  data-toggle="dropdown" href="index.html#">
						<i class="headtop03"></i>
						<span class="label label-primary" first="1"  id ="unReadNum_qixinMessage"  <#if (unReadNumMap['qixinMessage'])?default('')=='0'>  style="display:none;" </#if> valuePre="${(unReadNumMap['qixinMessage'])?default('0')}"    value="${(unReadNumMap['qixinMessage'])?default('0')}" >${(unReadNumMap['qixinMessage'])?default('0')}</span>
					</a>
					<!--新加背景-->
					<div id="dropdown-menu-div-div" class="dropdown-menu dropdown-alerts qixinshowHide ">
					    <div class="div-bg-t1"></div>					    
						<div class="headtop-text-a"><a onclick="allUnreadDatasView('qixinMessage');">全部已读</a></div>
						<ul  style="max-height:220px;overflow:auto;" first="1" class="un-read-datas  notice_infor" id="ul_qixinMessage" onscroll="getQixinNewPageDatas('qixinMessage');">
						
						</ul>
						<div id="div_msg_qixinMessage" class="head-news04span" style="display:none;">没有更多数据了 </div>
					</div>	
				</li>
				<#--企信消息与通知小图标之 【预警】消息------------------------------------->
				<li class="dropdown">
					<a title="预警" class="dropdown-toggle count-info" onclick="showOrHide(this,'qixinWaring');"  data-toggle="dropdown" href="index.html#">
						<i class="headtop08"></i>
						<span class="label label-primary" first="1" id ="unReadNum_qixinWaring" <#if (unReadNumMap['qixinWaring'])?default('')=='0'> style="display:none;" </#if> valuePre="${(unReadNumMap['qixinWaring'])?default('0')}"  value="${(unReadNumMap['qixinWaring'])?default('0')}" >${(unReadNumMap['qixinWaring'])?default('0')}</span>
					</a>
					<!--新加背景-->
					<div class="dropdown-menu dropdown-alerts qixinshowHide">
					    <div class="div-bg-t1"></div>					    
						<div class="headtop-text-a"><a id="allUnreadDatasView_qixinWaring" onclick="allUnreadDatasView('qixinWaring');">全部已读</a></div>
						<ul  style="max-height:220px;overflow:auto;" first="1" class="un-read-datas  notice_infor" id="ul_qixinWaring" onscroll="getQixinNewPageDatas('qixinWaring');">
						
						</ul>
						<div id="div_msg_qixinWaring" class="head-news04span" style="display:none;">没有更多数据了 </div>
					</div>	
				</li>
				<#--企信消息与通知小图标之 【关注】消息------------------------------------->
				<li class="dropdown">
					<a title="关注" class="dropdown-toggle count-info" onclick="showOrHide(this,'qixinAttention');"  data-toggle="dropdown" href="index.html#">
						<i class="khc-icon-20"></i>
						<span class="label label-primary" first="1" id ="unReadNum_qixinAttention"  <#if (unReadNumMap['qixinAttention'])?default('')=='0'>  style="display:none;" </#if> valuePre="${(unReadNumMap['qixinAttention'])?default('0')}"   value="${(unReadNumMap['qixinAttention'])?default('0')}" >${(unReadNumMap['qixinAttention'])?default('0')}</span>
					</a>
					<!--新加背景-->
					<div class="dropdown-menu dropdown-alerts qixinshowHide">
					    <div class="div-bg-t1"></div>					    
						<div class="headtop-text-a"><a onclick="allUnreadDatasView('qixinAttention');">全部已读</a></div>
						<ul  style="max-height:220px;overflow:auto;" first="1" class="un-read-datas  notice_infor" id="ul_qixinAttention" onscroll="getQixinNewPageDatas('qixinAttention');">
						
						</ul>
						<div id="div_msg_qixinAttention" class="head-news04span" style="display:none;">没有更多数据了 </div>
					</div>	
				</li>
				<#--企信消息与通知小图标之 【审批】消息------------------------------------->
				<#if productType?default("")=="旗舰版">
				<li class="dropdown">
					<a title="审批" class="dropdown-toggle count-info" onclick="showOrHide(this,'qixinApprove');"  data-toggle="dropdown" href="index.html#">
						<i class="headtop09"></i>
						<span class="label label-primary" first="1" id ="unReadNum_qixinApprove" <#if (unReadNumMap['qixinApprove'])?default('')=='0'>  style="display:none;" </#if>  valuePre="${(unReadNumMap['qixinApprove'])?default('0')}"  value="${(unReadNumMap['qixinApprove'])?default('0')}" >${(unReadNumMap['qixinApprove'])?default('0')}</span>
					</a>
					<!--新加背景-->
					<div class="dropdown-menu dropdown-alerts qixinshowHide">
					    <div class="div-bg-t1"></div>					    
						<div class="headtop-text-a"><a onclick="allUnreadDatasView('qixinApprove');">全部已读</a></div>
						<ul  style="max-height:220px;overflow:auto;" first="1" class="un-read-datas  notice_infor" id="ul_qixinApprove" onscroll="getQixinNewPageDatas('qixinApprove');">
						
						</ul>
						<div id="div_msg_qixinApprove" class="head-news04span" style="display:none;">没有更多数据了 </div>
					</div>	
				</li>
				</#if>
				<#--企信消息与通知小图标之 【公告】消息------------------------------------->
				<li class="dropdown">
					<a title="公告" class="dropdown-toggle count-info" onclick="showOrHide(this,'qixinNotice');"  data-toggle="dropdown" href="index.html#">
						<i class="headtop10"></i>
						<span class="label label-primary" first="1" totalPage="1" pageNo="0" id ="unReadNum_qixinNotice"  <#if (unReadNumMap['qixinNotice'])?default('')=='0'>  style="display:none;" </#if>  valuePre="${(unReadNumMap['qixinNotice'])?default('0')}"   value="${(unReadNumMap['qixinNotice'])?default('0')}" >${(unReadNumMap['qixinNotice'])?default('0')}</span>
					</a>
					<!--新加背景-->
					<div class="dropdown-menu dropdown-alerts qixinshowHide">
					    <div class="div-bg-t1"></div>					    
						<div class="headtop-text-a"><a onclick="allUnreadDatasView('qixinNotice');">全部已读</a></div>
						<ul  style="max-height:220px;overflow:auto;" first="1" class="un-read-datas  notice_infor" id="ul_qixinNotice" >
						
						</ul>
						<div id="div_msg_qixinNotice" class="head-news04span" style="display:none;">没有更多数据了 </div>
					</div>	
				</li>

<#--企信小图标公告跳转新页面-->
<form id="qixinDataView" name="qixinDataView" action="" method="post" target="_blank" style="display:none;">
  <input type="text" id="qixinDataView_tableName" name="tableName" value="" />
  <input type="text" id="qixinDataView_dataId" name="dataId" value="" />
</form>
<#--企信其他模块查看详情页的表单参数--->
<form role="form" id="qixinDataDetailForm" name="qixinDataDetailForm" method="post" target="_blank" style="display:none;" action="">
	<input type="hidden"  name="entityId"/>  
	<input type="hidden"  name="opName"/>
	<input type="hidden"  name="function.id"/>
	<input type="hidden"  name="actionName"/>
	<input type="hidden"  name="nameSpace"/>
	<input type="hidden"  name="function.tableName"/>
</form>	