<style type="text/css">
  .home-layout {
  	 	box-shadow: 1px 1px 3px #ddd;
  		border: 1px solid #DDD;
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
      width: 49.333333%;
      margin-right: 0.667777%;
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
  .hide {
  	display:none;
  }
  .home-content-container {
	padding: 0px 15px;
  }
  .layout-div {
  	height: 100%;
  	width: 100%;
  }
  .eventNone {
		pointer-events: none;
		cursor: default;
		color: #EFEFEF;
		background: #FFF;
	}
	.bg_CCC {
		background: #CCC !important;
	}
	#navbar-ex-collapse ul li{
		margin-top:20px;
		background: #FFF;
		padding: 5px !important;
	}
	#navbar-ex-collapse ul li a {
		line-height:10px !important;
		padding: 10px 15px !important;
	}
	.home-layout-head {
		padding-bottom: 10px;
	}
	.home-layout-head span[name='namelabel'] {
		font-weight: bold;
	}
	.home-layout-head a {
		float: right;
	}
	.home-layout-head .opspan{
	  	padding:5px 2px 5px;cursor: pointer;
	  }
</style>


<div class="home-top">
    <div class="navbar-header">
        <a class="navbar-brand" style="cursor:default;"><small>欢迎您&nbsp;${Session['_USER_LOGIN_'].name!''}&nbsp;访问<#if company??>${company.companyName!''}</#if>CRM系统</small></a>
    </div>
    <div class="collapse navbar-collapse" id="navbar-ex-collapse">
        <ul class="navbar-nav navbar-right" style="margin-right:3px;">
        	<#if isCustom??&&isCustom>
				<#if homes?size gte 6>
                    <li style="margin-right:20px;visibility: hidden" id="addbtn">
                        <a data-toggle="modal" data-target="#layoutModal">添加</a>
                    </li>
				<#else>
                    <li style="margin-right:20px;" id="addbtn">
                        <a data-toggle="modal" data-target="#layoutModal">添加</a>
                    </li>
				</#if>                    		
                <li>
                    <a id="classic">经典</a>
                </li>
                <li class="eventNone bg_CCC">
                    <a id="custom">定制</a>
                </li>
        	<#else>
                <li class="eventNone bg_CCC">
                    <a id="classic">经典</a>
                </li>
                <li>
                    <a id="custom">定制</a>
                </li>
        	</#if>
        </ul>
    </div>
</div>
<!--主页homes Start Here-->
<div class="home-content-container">
	<#if isCustom??&&isCustom>
    	<#list homes?sort_by("seq") as home>
    	<#assign type=home.type!1, typeclass=(type==1)?string("section-one", "section-two")>
    		<div class="${typeclass} home-layout" data-id="${home.id!''}" view-id="${home.viewId!''}">
    			<p class="home-layout-head home-layout-handle">
    				<span name="namelabel">${home.name!''}</span>
    				<span style="float:right;">
	    				<a class="opspan" name="layoutedit"> 编辑 </a>
	                    <a class="opspan" name="layoutflush"> 刷新 </a>
	                    <a class="opspan" name="layoutremove"> 移除 </a>
    				</span>
    			</p>
    			<div id="homelayout_${home.id!''}" class="layout-div"></div>
				<script>
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
					<#if (home.tableName!'')=="bh_chart_dashboard_record">
						ajaxDisplay("./chartFlip/getEchartsById?chartFlipId=${home.viewId!''}", null, "#homelayout_${home.id!''}", ajaxParams_${home.id!''});
                	<#else>
						ajaxDisplay("./home/homelayoutList", null, "#homelayout_${home.id!''}", ajaxParams_${home.id!''});
                	</#if>
				</script>
    		</div>
    	</#list>
    <#else>
    	<table style="width:100%;">
    		<tr>
    			<td id="scheduletd" width="40%" style="min-width:460px;">
    				<div class="section-one home-layout" style="height: 650px; width:99%;">
    					<p class="home-layout-head home-layout-handle">
							<span name="namelabel">日程组件</span>
						</p>
						<div id="homelayout_schedule" class="layout-div"></div>
                   		<script>
                   			ajaxDisplay("./home/scheduleList", null, "#homelayout_schedule", {})
						</script>
    				</div>
    			</td>
    			<td id="singlelayouttd"  valign="top">
    				<#if homeSettingItems??>
    				<#list homeSettingItems?sort_by("seq") as homeSettingItem>
    					<#if homeSettingItem.seq lt 20>
		            	<#assign type=homeSettingItem.type!1, typeclass=(type==1)?string("section-one", "section-two")>
		            		<div class="${typeclass} home-layout" style="width:98%;margin-left:1%;" data-id="${homeSettingItem.id!''}">
		            			<p class="home-layout-head home-layout-handle">
				    				<span name="namelabel">${homeSettingItem.name!''}</span>
				    			</p>
				    			<div id="homelayout_${homeSettingItem.id!''}" class="layout-div"></div>
								<script>
									var ajaxParams_${homeSettingItem.id!''} = {
										"id": "${homeSettingItem.id!''}",
										"name": "${homeSettingItem.name!''}",
										"type": "${homeSettingItem.type!''}",
										"tableName": "${homeSettingItem.tableName!''}",
										"seq": "${homeSettingItem.seq!''}",
										"viewId": "${homeSettingItem.viewId!''}",
										"userId": "${homeSettingItem.userId!''}",
										"pageNum": "1",
									};
									<#if (homeSettingItem.tableName!'')=="bh_chart_dashboard_record">
										ajaxDisplay("./chartFlip/getEchartsById?chartFlipId=${homeSettingItem.viewId!''}", null, "#homelayout_${homeSettingItem.id!''}", ajaxParams_${homeSettingItem.id!''});
                                	<#else>
										ajaxDisplay("./home/homelayoutList", null, "#homelayout_${homeSettingItem.id!''}", ajaxParams_${homeSettingItem.id!''});
                                	</#if>
								</script>
		            		</div>
    					</#if>
	            	</#list>
	            	</#if>
    			</td>
    		</tr>
    		<tr>
    			<td colspan="2" id="mutilayouttd"  valign="top">
    				<#if homeSettingItems??>
    				<#list homeSettingItems?sort_by("seq") as homeSettingItem>
    					<#if homeSettingItem.seq gt 20>
    					<#assign sectionClassName=((homeSettingItem.type==1)?string("section-one","section-two"))>
    					<div class="${sectionClassName} home-layout" data-id="${homeSettingItem.id}" data-type="${homeSettingItem.type}" data-tableName="${homeSettingItem.tableName}" view-id="${homeSettingItem.viewId!''}">
	            			<p class="home-layout-head home-layout-handle">
			    				<span name="namelabel">${homeSettingItem.name!''}</span>
			    			</p>
			    			<div id="homelayout_${homeSettingItem.id!''}" class="layout-div"></div>
							<script>
								var ajaxParams_${homeSettingItem.id!''} = {
									"id": "${homeSettingItem.id!''}",
									"name": "${homeSettingItem.name!''}",
									"type": "${homeSettingItem.type!''}",
									"tableName": "${homeSettingItem.tableName!''}",
									"seq": "${homeSettingItem.seq!''}",
									"viewId": "${homeSettingItem.viewId!''}",
									"userId": "${homeSettingItem.userId!''}",
									"pageNum": "1",
								};
								<#if (homeSettingItem.tableName!'')=="bh_chart_dashboard_record">
									ajaxDisplay("./chartFlip/getEchartsById?chartFlipId=${homeSettingItem.viewId!''}", null, "#homelayout_${homeSettingItem.id!''}", ajaxParams_${homeSettingItem.id!''});
                            	<#else>
									ajaxDisplay("./home/homelayoutList", null, "#homelayout_${homeSettingItem.id!''}", ajaxParams_${homeSettingItem.id!''});
                            	</#if>
							</script>
	            		</div>
    					</#if>
    				</#list>
    				</#if>
    			</td>
    		</tr>
    	</table>
	</#if>
</div>
<!-- 组件模态框（Modal） -->
<div class="modal fade" id="layoutModal" tabindex="-1" role="dialog" aria-labelledby="layoutModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title" id="layoutModalLabel">添加组件</h4>
      </div>
      <div class="modal-body text-left">
      	<form name="layoutForm" action="./home/homeSave" method="post" onkeydown="if(event.keyCode==13)return false;">
      	<table class="table-condensed" align="center">
      	  <tr name="moduletr">
      	    <td>选择模块：</td>
      	    <td>
      	      <select name="tableName" onChange="layoutModuleChange(this)" class="validate[required]">
			    <option value="">--无--</option>
			    <#list modules as module>
				  <option value="${module[0]!''}">${module[1]!''}</option>
			    </#list>
			  </select>
      	    </td>
      	  </tr>
      	  <tr name="nametr" class="hide">
      	    <td><i style="color:red;">*&nbsp;</i>组件名：</td>
      	    <td>
      	      <input name="name" type="text" class="form-input validate[required] validate[maxSize[50]]" maxlength="50">
      	    </td>
      	  </tr>
      	  <tr name="typetr" class="hide">
      	    <td><i style="color:red;">*&nbsp;</i>栏布局：</td>
      	    <td>
      	      <select name="type" class="validate[required]">
			    <option value="1">单列</option>
			    <option value="2">双列</option>
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
<div class="overlayer hide"><img src="./theme/img/loading.gif"></div>
<script>
  $(function () {
  	$('#layoutModal').on('hide.bs.modal', function () {
   	  // alert('嘿，我听说您喜欢模态框...');})
  	});
  });
</script>
<script>
  $(document).ready(function(){
  	//弹框关闭事件
  	$('#layoutModal').on('hide.bs.modal', function () {
  		$("#layoutModalLabel").text("添加组件");
  		$(this).find("tr[name!='moduletr']").addClass("hide");
  		$(this).find("tr[name='moduletr']").removeClass("hide");
  		$(this).find("select[name='tableName']").val("");
  	});
  	var $layout,homelayoutForm;
  	//编辑主页组件
  	$("[name='layoutedit']").click(function(){
  		$layout=$(this).closest("div.home-layout");
  		var tempAjaxParams = window["ajaxParams_"+$layout.attr("data-id")];
  		dealViews(tempAjaxParams["tableName"], tempAjaxParams["viewId"]);
  		$("#layoutModal").find("[name='id']").val(tempAjaxParams["id"]);
  		$("#layoutModal").find("[name='seq']").val(tempAjaxParams["seq"]);
  		$("#layoutModal").find("[name='name']").val(tempAjaxParams["name"]);
  		$("#layoutModal").find("[name='tableName']").val(tempAjaxParams["tableName"]);
  		$("#layoutModal").find("[name='viewId']").val($layout.attr("view-id"));
  		$("#layoutModal").find("tr[name='moduletr']").addClass("hide");
  		$("#layoutModal").find("tr[name!='moduletr']").removeClass("hide");
  		$("#layoutModalLabel").text("编辑组件");
  		$("#layoutModal").modal('toggle');
  	});
  	//刷新主页组件
  	$("[name='layoutflush']").click(function(){
  		$layout=$(this).closest("div.home-layout");
  		var tempAjaxParams = window["ajaxParams_"+$layout.attr("data-id")];
  		tempAjaxParams["pageNum"] = 1;
  		if(tempAjaxParams["tableName"] ==="bh_chart_dashboard_record")
			ajaxDisplay("./chartFlip/getEchartsById?chartFlipId="+tempAjaxParams["viewId"], null, "#homelayout_"+$layout.attr("data-id"), tempAjaxParams);
    	else{
			ajaxDisplay("./home/homelayoutList", null, "#homelayout_"+$layout.attr("data-id"), tempAjaxParams)
    	}
  	});
  	//移除主页组件
  	$("[name='layoutremove']").click(function(){
  		if(confirm("您确定继续吗？")) {
	  		$layout=$(this).closest("div.home-layout");
	  		var entityId = $layout.attr("data-id");
  			$.ajax({
				type: 'post',
				url: './home/homeDelete',
				data: {"entityId":entityId},
				success: function(data){
					if(data === "success"){
						$layout.remove();
						if($("div.home-layout").length < 6){
							$("#addbtn").css("visibility", "visible");
						}
					}
				}
			});
  		}
  	});
  	//单个字段点击即验证
	/*$(window.layoutForm).validationEngine();*/
  	//保存
  	$("button[name='save']").click(function(event){
  		if($(window.layoutForm).validationEngine("validate")){
      		if(window.layoutForm.id.value=="") window.layoutForm.seq.value=$(".home-layout").length+1;
      		$.ajax({
      			type: 'post',
      			url: './home/homeSave',
      			data: $(window.layoutForm).serialize(),
      			success: function(data){
      				if(data.result === "success"){
      					$("#layoutModal").modal('toggle');
      					$(".modal-backdrop").remove();
      					moduleLink("home", event);
      				}
      			}
      		});
  		}
  	});
  	<#if isCustom??&&isCustom>
  	//排序
  	$(".home-content-container" ).sortable({
		handle:".home-layout-handle",
		revert: 'invalid',
		start: function( event, ui ) {
	    },
	　　stop:function(event, ui){
			var ids=[];
			$(".home-layout").each(function(index){
				ids.push($(this).attr("data-id"));
			});
			$.ajax({
      			type: 'post',
      			url: './home/homeSort',
      			data: {ids:ids.toString()},
      			success: function(data){
      			},
      			error:function(){
				}
      		});
	　　}
	}).disableSelection();
	</#if>
	//经典、定制切换
	$("#classic,#custom").click(function(event){
		$.ajax({
  		  	type: "post",
  		  	url: "./home/homeToggle",
  		  	data: {toggleType:this.id},
  		  	success: function(data) {
  		  		moduleLink("home", event);
  		  	}
  		  });
	});
  });
  //模块改变事件
  function layoutModuleChange(elem){
  	if(elem.value === ""){//空
	  $(elem).closest("table").find("tr[name!='moduletr']").addClass("hide");
	}else{
	  dealViews(elem.value, "");
	  $(elem).closest("table").find("tr[name!='moduletr']").removeClass("hide");
	}
  }
  //视图选择框处理
  function dealViews(tableName, viewId){
<#--####################################################################################################################################-->
	if(tableName==="bh_chart_dashboard_record") {//图标的视图特殊处理
		$.ajax({ 
			type: "post", url: "./home/viewChartFlip", async: false, 
			success: function(data) {
				$("tr[name='viewtr']").empty();
				var viewHTML = '<td><i style="color:red;">*&nbsp;</i>图表组件：</td><td><select name="viewId" class="validate[required]"><option value="">--无--</option>';
				for(var key in data.chartMap) {
					viewHTML += '<optgroup label="'+key.split("|")[1]+'">';
					for(var i=0; i<data.chartMap[key].length; i++) {
						var value = data.chartMap[key][i];
						viewHTML += '<option value ="'+value.split("|")[0]+'">'+value.split("|")[1]+'</option>';
					}
					viewHTML += '</optgroup>';
				}
				viewHTML += '</select></td>';
				$(viewHTML).appendTo("tr[name='viewtr']");
			}
		});
	}else{
		$.ajax({
			type:"post",url:"./view/viewLoadName",async:false,data:{tableName:tableName},dataType:"json",
			success:function(data){
				/*$("select[name='viewId'] option:not(:first)").remove();
  				$("select[name='viewId'] optgroup").remove();*/
  				$("tr[name='viewtr']").empty();
  				$('<td>选择视图：</td><td><select name="viewId"></select></td>').appendTo("tr[name='viewtr']");
				var myList = eval(data).myList;//我的
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
	}
	  
	  
<#--####################################################################################################################################-->
  }
</script>
