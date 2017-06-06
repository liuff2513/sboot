<#--文档文件上传-->
<#--
<div class="FromDocumentSelectFile-window-mark" id="FromDocumentSelectFile-window-mark-id"></div>
-->
<link rel="stylesheet" type="text/css" href="${request.contextPath}/plugins/zTree_v3/css/zTreeStyle/zTreeStyle.css">
<script type="text/javascript">
	var fileIds = [];
</script>
<div class="FromDocumentSelectFile-window" id="FromDocumentSelectFile-window-id">
	 <div class="window-header">
	     <span>从文档管理选择文件</span>
	     <img src="${request.contextPath}/theme/img/chabing-close.png" class="active" id="FromDocumentSelectFile-window" alt=""/>
	 </div>
	 <div class="window-body">
	    <div class="window-body-top" >
            <select onchange="changeTree(this.value);" class="select-box-left" style="cursor:pointer">
	        	<option value='owner'>我的文件夹</option>
	        	<option value='share'>共享给我的文件夹</option>
	        </select>
	        
	        <div class="select-box-right">
	            <input type="text" placeholder="请输入文件名称" id="attachTxt">
	            <img src="${request.contextPath}/theme/img/approve-srch.png" class="active" onclick="attachSearch()" style="cursor:pointer"/>
	        </div>
	    </div>
        
	    <div class="window-body-middle">
		    <div class="window-body-middle-left">
		        <div class="upload-Page-trees0">
		            <ul class="ztree" id="attachTree">
		               
		            </ul>
		        </div>
		    </div>
		    <form id="attachDocumentForm" name="attachDocumentForm">
		    	<input type="hidden" name="folderId" value="0"/>
		    	<input type="hidden" name="fileId" value=""/>
				<div class="window-body-middle-right" id="attachDocumentBody">
				
				</div>
			</form>
		    <#--
			    <div class="window-body-middle-right-bottom">
			       <p>
				       <span class="active">首页</span>
				       <img src="${request.contextPath}/theme/img/arrow-left.png" class="active" alt=""/>
				       <span>第</span><span>1</span><span>页</span> 
				       <img src="${request.contextPath}/theme/img/arrow-right.png" class="active" alt=""/>
				       <span class="active">末页</span><span>共</span>
				       <a href="javascript:void(0);">点击显示</a><span>条</span>
			       </p>
			    </div>
		    -->
	    </div>
	    <div class="window-body-footer">
	        <span>已选文件</span>
	        <div class="SelectedFile" id="selectAttachDiv">
		        	<#--
		        	<div class="SelectedFileList" >
			            <img src="${request.contextPath}/theme/img/selectedfileListclosed.png" class="SelectedFileListpicture" id="SelectedFilehide" style="cursor: pointer" />
			            <span>审批流文</span>
		        	</div>
		        	-->
		    </div>
		</div>
	</div>
	<div class="window-footer">
	    <button class="sure-btn" type="button" onclick="saveData();">确定</button>
	    <button class="" type="button" onclick="$('#FromDocumentSelectFile-window').click();">取消</button>
	</div>
</div>
<script type="text/javascript">

	
	var attachSettings = {
	        callback:{
	        	onClick:zTreeOnClick
	        },
	        data: {
	           	keep: {
	                parent: true,
	                leaf: false
	            },
	            simpleData: {
	                enable: true,
	                vid:'id',
	                pIdKey: "pid"
	            }
	        }
        };
        
        
    function zTreeOnClick(event,treeId,treeNode){
    	
    	var folderId = treeNode.id;
    	$("#attachDocumentForm").find("input[name='folderId']").val(folderId);
    
		$.ajax({
			type:'POST',
			url:'${request.contextPath}/attachment/documentFileList',
			data:{"folderId":folderId,"pageNo":1,"pageSize":10},
			dataType:"html",
			beforeSend:function(){
				$("#attachDocumentBody").html('');
			},
			success:function(data){
				$("#attachDocumentBody").html(data);
			}
		});
		
	}  
	
	/*
	* 保存	
	*/
	function changeTree(type){
		$.ajax({
			type:'POST',
			url:'${request.contextPath}/attachment/documentTree',
			data:{"folderType":type},
			
			success:function(data){
			console.clear();
			console.dir(JSON.parse(decodeURIComponent(data)));
				$.fn.zTree.init($("#attachTree"),attachSettings,JSON.parse(decodeURIComponent(data)));
			}
		});
	}  
	
	//保存文档文件数据
	function saveData(){
		var selects = $("#selectAttachDiv").find(".SelectedFileList");
		if(selects.length == 0){
			alert("请选择文档文件!");
		}else{
			$.ajax({
				type:'POST',
				url:'${request.contextPath}/attachment/saveDocumentCreate',
				data:{
					"fileIds":fileIds.join(","),
					"entityId":"${entityId!''}",
					"module":"${module!''}"
				},
				success:function(data){
					if(data == "success"){
						var dataParams = {
							"pageNum":"1",
							"pageSize":"6",
							"entityId": "${entityId!''}",
							"function.tableName": "${module!''}"
						};
						ajaxDisplay('${request.contextPath}/attachment/attachmentList', null, "#att_iframe_div", dataParams);
						$("#ajax_showhide_div").html("").modal("hide");
					}else{
						alert("操作失败!");
					}
				}
			});
		}
	}
	
	function attachSearch(){
		
		var attachTree = $.fn.zTree.getZTreeObj("attachTree");
		attachTree.cancelSelectedNode();
		$("#attachDocumentForm").find("input[name='folderId']").val('');
		
		var txt = $.trim($("#attachTxt").val());
		$.ajax({
			type:'POST',
			url:'${request.contextPath}/attachment/documentFileList',
			data:{
				"folderId":"",
				"pageNo":1,
				"pageSize":6,
				"txtSearch":txt
			},
			dataType:"html",
			success:function(data){
				$("#attachDocumentBody").html(data);
			}
		});
		
	}
	
   $(function(){
   
   		//初始化树
   		changeTree('owner');
		
	    $("#FromDocumentSelectFile-window").on("click",function(){
		    $(".FromDocumentSelectFile-window").hide();
		    $(".FromDocumentSelectFile-window-mark").hide();
		    $("#ajax_showhide_div").html("").modal("hide");
		});
   })
</script>
