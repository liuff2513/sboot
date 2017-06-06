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
		<link href="theme/css/bootstrap.min.css?v=3.4.0" type="text/css" rel="stylesheet"/>
		<link rel='stylesheet' href='../plugins/jquery-ui-1.11.4/jquery-ui.css'>
		<link href="../plugins/jquery-plugins/validationEngine/css/validationEngine.jquery.css" rel="stylesheet">
		<script src="../theme/js/jquery-2.1.1.min.js" language="javascript" type="text/javascript"></script>
	    <script src='../plugins/jquery-ui-1.11.4/jquery-ui.js' language="javascript" type="text/javascript"></script>
	    <script type="text/javascript" src="../plugins/bootstrap_v3/js/bootstrap.min.js"></script>
		<script src="../plugins/jquery-plugins/validationEngine/js/jquery.validationEngine-zh_CN.js" charset="UTF-8" language="javascript" type="text/javascript"></script>
		<script src="../plugins/jquery-plugins/validationEngine/js/jquery.validationEngine.js" charset="UTF-8" language="javascript" type="text/javascript"></script>
        <style type="text/css">
          body{
           	background:#f0f3fa;
           	font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif !important; 
           	font-size: 12px !important; 
           	color: #333 !important;
          }
          table{
            table-layout: fixed;
          }
          .home-content-container{
          	width: 98%;
          }
          .home-content-container table{width:100%;}
          .home-layout {
          	 box-shadow: 1px 1px 3px #ddd;
          	border: 1px solid #DDD;
          }
          .home-layout .opspan{
          	padding:5px 0px 5px;cursor: pointer;
          }
          table tr td{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif !important; 
           	font-size: 12px !important; 
           	color: #333 !important;
          }
          .section-one, .section-two{
            background:#FFF;
            height:100%;
            padding:15px;
            height: 310px; 
            margin:10px auto;
          	float: left;
          }
          .section-one{
          	width: 49%;
          	margin-right: 1%;
          }
          .section-two{
          	width: 99%;
          }
          .section-one table, .section-two table{
            background: #FFF;
          }
          #layoutModal .modal-body table tr td:first-child{
          	text-align:right;
          	width: 40%;
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
			.eventNone {
				pointer-events: none;
				cursor: default;
				color: #EFEFEF;
			}
        </style>
    </head><body>
        <div class="navbar navbar-static-top" id="home-header">
            <div class="container" style="padding-right:2%;">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#"><small>欢迎您</small></a>
                </div>
                <div class="collapse navbar-collapse" id="navbar-ex-collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="show">
                            <a href="#" data-toggle="modal" data-target="#layoutModal">添加</a>
                        </li>
                        <li class="active eventNone hide">
                            <a href="#">经典</a>
                        </li>
                        <li class="hide">
                            <a href="#">定制</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--主页homes Start Here-->
        <div id="home-content">
            <div class="container home-content-container">
            	<#list homes?sort_by("seq") as home>
            	<#assign type=home.type!1, typeclass=(type==1)?string("section-one", "section-two")>
            		<div class="${typeclass} home-layout" data-id="${home.id!''}" view-id="${home.viewId!''}">
            			<table  class="home-layout-handle">
                            <tbody><tr height="25px">
                                <td width="80%">
                                    <h5 name="namelabel">${home.name!''}</h5>
                                </td>
                                <td width="20%" class="text-right">
                                    <span class="opspan" name="layoutedit"> 编辑 </span>
                                    <span class="opspan" name="layoutflush"> 刷新 </span>
                                    <span class="opspan" name="layoutremove"> 移除 </span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <table class="table-condensed" width="100%" height="100%">
                                        <tbody><tr>
                                            <td>
                                           		<iframe id="${home.id!''}Iframe" name="${home.id!''}Iframe" class="layout-iframe" width="100%" height="210px" frameborder="0"></iframe>
                                            	<form id="${home.id!''}Form" name="${home.id!''}Form" action="./homeSettinglayoutList" method="post" target="${home.id!''}Iframe">
													<input type="hidden" name="id" value="${home.id!''}">
													<input type="hidden" name="name" value="${home.name!''}">
													<input type="hidden" name="type" value="${home.type!1}">
													<input type="hidden" name="tableName" value="${home.tableName!''}">
													<input type="hidden" name="seq" value="${home.seq!1}">
													<input type="hidden" name="viewId" value="${home.viewId!''}">
													<input type="hidden" name="pageNum" value="1">
												</form>
												<script>
													$(function(){
														$("form[name='${home.id!''}Form']").submit();
													});
												</script>
                                            </td>
                                        </tr>
                                    </tbody></table>
                                </td>
                            </tr>
                        </tbody></table>
            		</div>
            	</#list>
            </div>
        </div>
        <!--主页homes End Here-->
        <footer class="section text-center">
            <div class="container">
                <a class="link" target="_blank" href="#">隐私策略</a>
                <span class="sep">|</span>
                <a class="link" target="_blank" href="#">服务条款</a>
                <span class="sep">|</span>
                <span class="small">© 2016 百会纵横科技有限公司，保留所有权利。</span>
            </div>
        </footer>
    	<!-- 组件模态框（Modal） -->
	    <div class="modal fade" id="layoutModal" tabindex="-1" role="dialog" aria-labelledby="layoutModalLabel" aria-hidden="true">
	      <div class="modal-dialog">
	        <div class="modal-content">
	          <div class="modal-header">
	            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
	            <h4 class="modal-title" id="layoutModalLabel">添加组件</h4>
	          </div>
	          <div class="modal-body text-left">
	          	<form role="form" name="layoutForm" action="./homeSave" method="post">
	          	<table class="table-condensed" align="center">
	          	  <tr name="moduletr">
	          	    <td>选择模块：</td>
	          	    <td>
	          	      <select name="tableName">
					    <option value="">--无--</option>
					    <option value="bh_schedule_data">日程</option>
					    <#list modules?sort_by("seq") as module>
						  <option value="${module.tableName!''}">${module.name!''}</option>
					    </#list>
					  </select>
	          	    </td>
	          	  </tr>
	          	  <tr name="nametr" class="hide">
	          	    <td><i style="color:red;">*&nbsp;</i>组件名：</td>
	          	    <td>
	          	      <input name="name" type="text" class="form-input validate[required] validate[maxSize[50]]">
	          	    </td>
	          	  </tr>
	          	  <tr name="typetr" class="hide">
	          	    <td><i style="color:red;">*&nbsp;</i>栏布局：</td>
	          	    <td>
	          	      <select name="type" class="validate[required]">
					    <option value="1">1</option>
					    <option value="2">2</option>
					  </select>
	          	    </td>
	          	  </tr>
	          	  <tr name="viewtr" class="hide">
	          	    <td>自定义视图：</td>
	          	    <td>
	          	      <select name="viewId">
					    <option value="">--无--</option>
					  </select>
	          	    </td>
	          	  </tr>
	          	</table>
	          	<input name="id" type="hidden" value="">
	          	<input name="seq" type="hidden" value="">
	          	</form>
			  </div>
	          <div class="modal-footer">
	            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	            <button type="button" class="btn btn-primary" name="save">保存</button>
	          </div>
	        </div>
	        <!-- /.modal-content -->
	      </div>
	      <!-- /.modal-dialog -->
	    </div>
	    <!-- /.modal -->
    	<!-- 确认模态框（Modal） -->
	    <div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
	      <div class="modal-dialog">
	        <div class="modal-content">
	          <div class="modal-header">
	            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
	            <h4 class="modal-title" id="confirmModalLabel">移除确认</h4>
	          </div>
	          <div class="modal-body text-left">
	          	此操作不可恢复,确认删除该组件吗？
			  </div>
	          <div class="modal-footer">
	            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	            <button type="button" class="btn btn-primary" name="sure">确认</button>
	          </div>
	        </div>
	        <!-- /.modal-content -->
	      </div>
	      <!-- /.modal-dialog -->
	    </div>
	    <!-- /.modal -->
	    <div class="overlayer hide"><img src="../theme/img/loading.gif"></div>
	    <script>
	      $(function () { 
	      	$('#layoutModal').on('hide.bs.modal', function () {
	       	  // alert('嘿，我听说您喜欢模态框...');})
	      	});
	      });
	    </script>
	    <script>
	      $(document).ready(function(){
	      	$( "#singlelayouttd").sortable({
		      placeholder: "ui-state-highlight",
		      handle: '.home-layout-handle',
		      items: '.home-layout'
		    });
		    $( "#singlelayouttd").disableSelection();
	      	$('#layoutModal,#confirmModal').modal('hide');
	      	//弹框关闭事件
	      	$('#layoutModal').on('hide.bs.modal', function () {
	      		window.layoutForm.reset();
	      		$("#layoutModalLabel").text("添加组件");
	      		$(this).find("tr[name!='moduletr']").addClass("hide");
	      		$(this).find("tr[name='moduletr']").removeClass("hide");
	      	});
	      	$('#layoutModal').on('show.bs.modal', function () {
	      		//alert(viewMap)
			  	// 执行一些动作...
			});
	      	var $layout,homelayoutForm;
	      	//编辑主页组件
	      	$("[name='layoutedit']").click(function(){
	      		$layout=$(this).closest("div.home-layout");
	      		homelayoutForm=document.getElementById($layout.attr("data-id")+"Form");
	      		$(homelayoutForm.elements).each(function(index){
	      			$("[name='layoutForm'] [name='"+this.name+"']").val(this.value);
	      		});
	      		dealViews(homelayoutForm.tableName.value, homelayoutForm.viewId.value);
	      		$("#layoutModal").find("[name='viewId']").val($layout.attr("view-id"));
	      		$("#layoutModal").find("tr[name='moduletr']").addClass("hide");
	      		$("#layoutModal").find("tr[name!='moduletr']").removeClass("hide");
	      		$("#layoutModalLabel").text("编辑组件");
	      		$("#layoutModal").modal('toggle');
	      	});
	      	//刷新主页组件
	      	$("[name='layoutflush']").click(function(){
	      		$layout=$(this).closest("div.home-layout");
	      		homelayoutForm=document.getElementById($layout.attr("data-id")+"Form");
	      		homelayoutForm.pageNum.value=1;
	      		homelayoutForm.submit();
	      		homelayoutIframe=document.getElementById($layout.attr("data-id")+"Iframe");
	      		window.frames[$layout.attr("data-id")+"Iframe"].$(".overlayer").removeClass("hide");
	      	});
	      	//移除主页组件
	      	$("[name='layoutremove']").click(function(){
	      		$layout=$(this).closest("div.home-layout");
	      		homelayoutForm=document.getElementById($layout.attr("data-id")+"Form");
	      		$("#confirmModal").modal('toggle');
	      	});
	      	//移除确认事件
	      	$("#confirmModal [name='sure']").click(function(){
	      		$.ajax({
	      			type: 'post',
	      			url: './homeSettingDelete',
	      			data: $(homelayoutForm).serialize(),
	      			success: function(data){
	      				if(data.result === "success"){
	      					$layout.remove();
	      					$("#confirmModal").modal('toggle');
	      				}
	      			}
	      		});
	      	});
	      	//模块改变事件
	      	$("#layoutModal tr[name='moduletr'] td select").change(function(){
	      		if(this.value === ""){//空
	      		  $(this).closest("table").find("tr[name!='moduletr']").addClass("hide");
	      		}else{
	      		  dealViews(this.value, "");
	      		  $(this).closest("table").find("tr[name!='moduletr']").removeClass("hide");
	      		}
	      	});
	      	//单个字段点击即验证
			$(window.layoutForm).validationEngine();
	      	//保存
	      	$("button[name='save']").click(function(){
	      		if($(window.layoutForm).validationEngine("validate")){
		      		if(window.layoutForm.id.value=="") window.layoutForm.seq.value=$("#home-content .home-layout").length+1;
		      		$.ajax({
		      			type: 'post',
		      			url: './homeSettingSave',
		      			data: $(window.layoutForm).serialize(),
		      			success: function(data){
		      				if(data.result === "success"){
		      					if(window.layoutForm.id.value==""){
		      						var form = document.createElement("form");
									form.method = "post";
									form.action = window.location.href;
									document.body.appendChild(form);  
									form.submit();
									document.body.removeChild(form);
		      					}else{
			      					var newType=window.layoutForm.type.value;
			      					var oldType=homelayoutForm.type.value;
			      					if(newType != oldType && newType==="1"){
			      						$layout.removeClass("section-two").addClass("section-one");
			      					}else if(newType != oldType && newType==="2"){
			      						$layout.removeClass("section-one").addClass("section-two");
			      					}
			      					$layout.find("[name='namelabel']").text(window.layoutForm.name.value);
			      					homelayoutForm.type.value=newType;
			      					homelayoutForm.name.value=window.layoutForm.name.value;
						      		homelayoutForm.pageNum.value=1;
						      		homelayoutForm.submit();
		      					}
		      					$("#layoutModal").modal('toggle');
		      				}
		      			}
		      		});
	      		}
	      	});
	      	//排序
	      	$(".home-content-container" ).sortable({
				handle:".home-layout-handle",
				revert: 'invalid',
				start: function( event, ui ) {
			    },
			　　stop:function(){
					var ids=[];
					$(".home-layout").each(function(index){
						ids.push($(this).attr("data-id"));
					});
					$.ajax({
		      			type: 'post',
		      			url: './homeSettingSort',
		      			data: {ids:ids.toString()},
		      			success: function(data){
		      			},
		      			error:function(){
							alert("error");
						}
		      		});
			　　}
			}).disableSelection();
	      });
	      //视图选择框处理
	      function dealViews(tableName, viewId){
	  		$("select[name='viewId'] option:not(:first)").remove();
	      	$("select[name='viewId'] optgroup").remove();
<#--####################################################################################################################################-->
   			$.ajax({
				type:"post",url:"../view/viewLoadName",async:false,data:{tableName:tableName},dataType:"json",
				success:function(data){
					var myList = eval(data).myList;//我的
					var srList = eval(data).srList;//分享的
					var ofList = eval(data).ofList;//出厂
							
					//我创建的
					if(myList.length > 1){
						var myListStr = '<optgroup label="'+myList[0]['name']+'">';
						for(var m = 1; m < myList.length; m++) {
							myListStr += '<option value="'+myList[m]['id']+'">'+myList[m]['name']+'</option>';
						} 
						myListStr += '</optgroup>';
						$(myListStr).appendTo($("select[name='viewId']"));
					}
					
					//分享给我的
					if(srList.length > 1){
						var srListStr = '<optgroup label="'+srList[0]['name']+'">';
						for(var m = 1; m < srList.length; m++) {
							myListStr += '<option value="'+srList[m]['id']+'">'+srList[m]['name']+'</option>';
						} 
						srListStr += '</optgroup>';
						$(srListStr).appendTo($("select[name='viewId']"));
					}
	
					//出厂
					if(ofList!=null&&ofList.length > 1){
						var ofListStr = '<optgroup label="'+ofList[0]['name']+'">';
						for(var m = 1; m < ofList.length; m++) {
							ofListStr += '<option value="'+ofList[m]['id']+'">'+ofList[m]['name']+'</option>';
						} 
						ofListStr += '</optgroup>';
						$(ofListStr).appendTo($("select[name='viewId']"));
					}
				}
			});   		  
<#--####################################################################################################################################-->

	      }
	    </script>
</body></html>