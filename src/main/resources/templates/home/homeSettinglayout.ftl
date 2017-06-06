<!DOCTYPE html>
<html><head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="renderer" content="webkit">
		<title>主页</title>
		<link href="./theme/img/loading.gif" rel="prefetch" />
		<link href="./theme/img/logo_element.png" rel="SHORTCUT ICON" />
		<!--[if lt IE 8]>
			<script>
		        alert('不支持IE6-8，请使用谷歌、火狐等浏览器\n或360、QQ等国产浏览器的极速模式浏览本页面！');
		    </script>
		<![endif]-->
		<link href="../theme/css/bootstrap.min.css?v=3.4.0" type="text/css" rel="stylesheet"/>
		
		<script type="text/javascript" src="../theme/js/jquery-2.1.1.min.js"></script>
	    <script type="text/javascript" src="../plugins/bootstrap_v3/js/bootstrap.min.js"></script>
		<style>
			body{
           	  //background:#f0f3fa;
           	  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif; 
           	  font-size: 12px; 
           	  color: #333;
           	  overflow:hidden;
            }
			table{
				/*table-layout: fixed;*/
				overflow-y:hidden;
				width: 100%;
				margin: 0px !important;
			}
			table tr td, table tr th{
				white-space: nowrap;
			    /*text-overflow: ellipsis;
			    overflow: hidden;*/
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
			.overlayer{
				position: fixed;
				left: 0px;
				top: 0px;
				height: 100%;
				width: 100%;
				text-align: center;
				background: #FFF;
				filter:alpha(opacity=50);
				-moz-opacity:0.5;
				-khtml-opacity: 0.5;
				opacity: 0.5;
			}
			.overlayer img{
				position: relative;
				top: 40%;
				-webkit-transform: translateY(-40%);
				-ms-transform: translateY(-40%);
				transform: translateY(-40%);
			}
			span.ASC:after{
				content:url(../theme/img/sort_asc.gif);
			}
			span.DESC:after{
				content:url(../theme/img/sort_desc.gif);
			}
		</style>
    </head><body style="overflow-x:auto;">
    
    	<div style="overflow-x:auto;overflow-y:hidden;border-bottom:1px solid #DDDDDD;border-left:1px solid #DDDDDD;border-right:1px solid #DDDDDD;">
		<table class="table table-condensed table-striped">
		    <tbody><tr style="color:#808080;">
		    	<#list fieldNames as fieldName>
		    		<#if (fieldName[0]!'')==(orderColumn!'')>
				        <th><span name="${fieldName[0]!''}" class="simpleData ${orderDir!''}" style="cursor:pointer;">${fieldName[1]!''}&nbsp;</span></th>
		    		<#else>
				        <th><span name="${fieldName[0]!''}" class="simpleData" style="cursor:pointer;">${fieldName[1]!''}&nbsp;</span></th>
		    		</#if>
		    	</#list>
		    </tr>
		    <#list layoutList as data>
		    <tr>
		    	<#list 0..fieldNames?size-1 as index>
		        <td>${data[index]!''}</td>
		        </#list>
		    </tr>
		    </#list>
		</tbody></table>
		</div>
		<div style="padding-top:10px;">
			<table>
		     <tr style="background: #FFF;">
                <td colspan="${fieldNames?size}" class="text-right">
                    <span style="cursor:pointer" class="prev <#if (pageNum!1)==1>eventNone</#if>">&lt;&lt;</span>&nbsp;&nbsp;&nbsp;
                 	<span style="cursor:pointer" class="next <#if (pageNum!1)==(pages!1)>eventNone</#if>">&gt;&gt;</span>
                </td>
            </tr>
			</table>
		</div>
		<div class="overlayer hide"><img src="../theme/img/loading.gif"></div>
		<form id="layoutlistForm" name="layoutlistForm" action="./homelayoutList" method="post">
			<input type="hidden" name="orderColumn">
			<input type="hidden" name="orderDir">
			<input type="hidden" name="id" value="${homelayout.id!''}">
			<input type="hidden" name="name" value="${homelayout.name!''}">
			<input type="hidden" name="type" value="${homelayout.type!1}">
			<input type="hidden" name="tableName" value="${homelayout.tableName!''}">
			<input type="hidden" name="seq" value="${homelayout.seq!1}">
			<input type="hidden" name="viewId" value="${homelayout.viewId!''}">
			<input type="hidden" name="userId" value="${homelayout.userId!''}">
			<input type="hidden" name="pageNum" value="${pageNum!1}">
		</form>
		<script>
			$(document).ready(function(){
				//上一页
		      	$("span.prev").click(function(){
		      		var newPageNum=("${pageNum!1}"==="1")?1:parseInt("${pageNum!1}")-1;
		      		window.layoutlistForm.pageNum.value=newPageNum;
		      		window.layoutlistForm.submit();
		      		$(".overlayer").removeClass("hide");
		      	});
		      	//下一页
		      	$("span.next").click(function(){
		      		var newPageNum=("${pageNum!1}"==="${pages!1}")?${pageNum!1}:parseInt("${pageNum!1}")+1;
		      		window.layoutlistForm.pageNum.value=newPageNum;
		      		window.layoutlistForm.submit();
		      		$(".overlayer").removeClass("hide");
		      	});
		      	//排序
		      	$(".simpleData").click(function(){
		      		var dir=$(this).hasClass("ASC")?"DESC":$(this).hasClass("DESC")?"ASC":"ASC";
					$(this).removeClass("ASC").removeClass("DESC").addClass(dir);
					window.layoutlistForm.pageNum.value=1;
					window.layoutlistForm.orderColumn.value=$(this).attr("name");
					window.layoutlistForm.orderDir.value=dir;
					window.layoutlistForm.submit();
					$(".overlayer").removeClass("hide");
		      	});
			});
		</script>
</body></html>