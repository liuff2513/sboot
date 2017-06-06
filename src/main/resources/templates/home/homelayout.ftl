<style>
	table{
		overflow-y:hidden;
		width: 100%;
		margin: 0px !important;
	}
	table tr td, table tr th{
		white-space: nowrap;
	    overflow-y:hidden;
	}
	.prev, .next {
		font-weight: bold;
	}
	.eventNone {
		pointer-events: none;
		cursor: default;
		color: #EFEFEF;
	}
	span.ASC:after{
		content:url(../theme/img/sort_asc.gif);
	}
	span.DESC:after{
		content:url(../theme/img/sort_desc.gif);
	}
	.hide {
		display:none;
	}
</style>
<#if (noPermission!false)||layoutList?size lte 0>
	<style>
	.sorry-box{ margin:5% auto 0; width:300px; display:block; height:auto;}
	.sorry-box img{ margin:0 auto; display:block;}
	.sorry-box h2{ color:#e54e5b; font-size:20px; padding:20px 0; margin:0; text-align:center;border-bottom: 1px solid #d9d9d9;    font-family: "微软雅黑";}
	.sorry-box td{ font-size:13px;vertical-align: text-top; color:#333;}
	.sorry-box td p{ color:#e6e6e6;}
	.sorry-box td i{font-style:normal; margin-right:3px; color:#e6e6e6;}
	.sorry-box td .active-imp{ color:#333;}
	</style>
	<div class="sorry-box">
	<img alt="image" src="./theme/img/ins/ins-Sorry.png">
	<h2>抱歉！没有访问到数据！</h2>
	<table>
		<tr>
			<td>可能因为：</td>
			<td>
				<#if noPermission!false>
					<p class="active-imp"><i>●</i>您没有配置相关权限</p>
					<p><i>●</i>没有数据</p>
				<#else>
					<p><i>●</i>您没有配置相关权限</p>
					<p class="active-imp"><i>●</i>没有数据</p>
				</#if>
			</td>
		</tr>
	</table>
	</div>
<#else>
<div style="overflow-x:auto;overflow-y:hidden;border-bottom:1px solid #DDDDDD;border-left:1px solid #DDDDDD;border-right:1px solid #DDDDDD;">
	<table class="table table-condensed table-striped">
	    <tbody><tr style="color:#808080;">
	    	<#list fieldNames as fieldName>
	    		<#if fieldName??>
	    		<#if (fieldName[0]!'')==(orderColumn!'')>
			        <th><span name="${fieldName[0]!''}" class="simpleData ${orderDir!''}" style="cursor:pointer;">${fieldName[1]!''}&nbsp;</span></th>
	    		<#else>
			        <th><span name="${fieldName[0]!''}" class="simpleData" style="cursor:pointer;">${fieldName[1]!''}&nbsp;</span></th>
	    		</#if>
	    		<#if (fieldName[0]?lower_case)=="name"><#assign themeIndex=fieldName_index> </#if>
	    		</#if>
	    	</#list>
	    </tr>
	    <#list layoutList as data>
	    <tr data-id="${data[0]}" class="simple-data">
	    	<#list 0..fieldNames?size-1 as index>
	        <td>
	        	<#if (themeIndex!0)==index>
	        		<#if function.nameSpace=="receiveMail">
		        		<a href="./welcome?module=${function.nameSpace}&opName=view&receiveMailId=${data[0]!''}" class="link" data-params='{"module":"${function.nameSpace}","opName":"view","receiveMailId":"${data[0]!''}"}'>${data[index+1]!''}</a>
	        		<#else>
		        		<a href="./welcome?module=${function.nameSpace}&opName=view&entityId=${data[0]!''}" class="link" data-params='{"module":"${function.nameSpace}","opName":"view","entityId":"${data[0]!''}"}'>${data[index+1]!''}</a>
	        		</#if>
	        	<#else>
	        		<#if function.nameSpace=="receiveMail">
		        		<span class="operation" data-params='{"module":"${function.nameSpace}","opName":"view","receiveMailId":"${data[0]!''}"}'>${data[index+1]!''}</span>
	        		<#else>
		        		<span class="operation" data-params='{"module":"${function.nameSpace}","opName":"view","entityId":"${data[0]!''}"}'>${data[index+1]!''}</span>
	        		</#if>
	        	</#if>
	        </td>
	        </#list>
	    </tr>
	    </#list>
	</tbody></table>
</div>
<div style="padding-top:10px;">
	<table>
     <tr style="background: #FFF;">
        <td colspan="${fieldNames?size}" class="text-right">
            <span style="cursor:pointer" class="prev <#if ((pageNum!1)==1||(layoutList?size==0))>eventNone-link</#if>">&lt;&lt;</span>&nbsp;&nbsp;&nbsp;
         	<span style="cursor:pointer" class="next <#if (total<=pageSize||(layoutList?size==0))>eventNone-link</#if>">&gt;&gt;</span>
        </td>
    </tr>
	</table>
</div>
<div class="overlayer hide"><img src="../theme/img/loading.gif"></div>
<script>
	$(document).ready(function(){
		var ajaxParams_${home.id!''} = {
			"id": "${home.id!''}",
			"name": "${home.name!''}",
			"type": "${home.type!''}",
			"tableName": "${home.tableName!''}",
			"seq": "${home.seq!''}",
			"viewId": "${home.viewId!''}",
			"userId": "${home.userId!''}",
			"pageNum": "1",
		};
		//上一页
      	$("[data-id='${homelayout.id!''}'] span.prev").click(function(){
      		var newPageNum=("${pageNum!1}"==="1")?1:parseInt("${pageNum!1}")-1;
      		ajaxParams_${homelayout.id!''}["pageNum"] = newPageNum;
      		ajaxDisplay("./home/homelayoutList", null, "#homelayout_${homelayout.id!''}", ajaxParams_${homelayout.id!''})
      	});
      	//下一页
      	$("[data-id='${homelayout.id!''}'] span.next").click(function(){
      		var newPageNum=parseInt("${pageNum!1}")+1;
      		ajaxParams_${homelayout.id!''}["pageNum"] = newPageNum;
      		ajaxDisplay("./home/homelayoutList", null, "#homelayout_${homelayout.id!''}", ajaxParams_${homelayout.id!''})
      	});
      	//排序
      	$("[data-id='${homelayout.id!''}'] .simpleData").click(function(){
      		var dir=$(this).hasClass("ASC")?"DESC":$(this).hasClass("DESC")?"ASC":"ASC";
			$(this).removeClass("ASC").removeClass("DESC").addClass(dir);
			ajaxParams_${homelayout.id!''}["pageNum"] = 1;
			ajaxParams_${homelayout.id!''}["orderColumn"] = $(this).attr("name");
			ajaxParams_${homelayout.id!''}["orderDir"] = dir;
      		ajaxDisplay("./home/homelayoutList", null, "#homelayout_${homelayout.id!''}", ajaxParams_${homelayout.id!''})
      	});
	});
</script>
</#if>
