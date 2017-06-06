
<script type="text/javascript">
	
		
	$(function(){
		$("#check-input-all").on("click",function(){
			if($(this).prop("checked")){
				$("#tbody-input-ele").find("input").each(function(idx,ele){
					var id = $(ele).attr("data");
					if(!$(ele).prop("checked")){
						if($.inArray(id,fileIds) > -1){
							return;
						}
						
						fileIds.push(id);
						
						$(ele).prop("checked",true);
						
						var txt = $(ele).closest("td").find(".SelectedFileList")[0].outerHTML;
						
						$("#selectAttachDiv").append(txt);
						
						$("#selectAttachDiv").find("#select_"+id).show();
					}
				});
			}else{
				$("#tbody-input-ele").find("input").each(function(idx,ele){
					var id = $(ele).attr("data");
					for(var i = 0;i<fileIds.length;i++){
						if(fileIds[i] == id){
							delete fileIds[i];
						}
					}
					
					if($(ele).prop("checked")){
						$(ele).prop("checked",false);
					}
					
					$("#selectAttachDiv").find("#select_"+id).remove();
				});
			}
			
		});
	 });
	
	function selectFile(id,name,folderId,ele){
	
		if($(ele).prop("checked")){
			if($.inArray(id,fileIds) > -1){
				alert("不能选择重复文件!");
				return;
			}
			
			fileIds.push(id);
			
			var txt = $(ele).closest("td").find(".SelectedFileList")[0].outerHTML;
			
			$("#selectAttachDiv").append(txt);
			
			$("#selectAttachDiv").find("#select_"+id).show();
		}else{
			for(var i = 0;i<fileIds.length;i++){
				if(fileIds[i] == id){
					delete fileIds[i];
				}
			}
			$("#selectAttachDiv").find("#select_"+id).remove();
		}
	}
	
	
	function deleteFile(id,ele){
		for(var i = 0;i<fileIds.length;i++){
			if(fileIds[i] == id){
				delete fileIds[i];
			}
		}
		$(ele).remove();
	}
</script>
<table class="table-attach  attach-table" style="width:100%">
	<thead>
	    <tr class="table-head">
	        <td><input type="checkbox" id="check-input-all"/></td>
	        <td><span>名称</span></td>
	        <td><span>作者</span></td>
	        <td><span>修改时间</span></td>
	    </tr>
	</thead>
    <tbody id="tbody-input-ele">
    	<#list files as file>
		    <tr>
		        <td>
		        	<input type="checkbox" onclick="selectFile('${file.id}','${file.oldName}','${file.folder.id}',this);" data="${file.id}"/>
                    <div class="SelectedFileList" onclick="deleteFile('${file.id!''}',this);" style="display:none"
                         id="select_${file.id!'0'}">
                        <img src="${request.contextPath}/theme/img/selectedfileListclosed.png" class="SelectedFileListpicture" style="cursor: pointer" />
						<span>${file.oldName}</span>
					</div>
		        </td>
		        <td><span title="${file.oldName!''}">${file.oldName!''}</span></td>
		        <td><span>${file.creatorName!''}</span></td>
		        <td><span>${file.createdTime!''}</span></td>
		    </tr>
	    </#list>
    </tbody>
</table>
<#include "document_attach_js.ftl"/>
