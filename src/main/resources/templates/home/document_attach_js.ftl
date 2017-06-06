<#assign pageNo = page.number +1 ,
		 pageSize = page.size,
		 totalPage=page.totalPages,
		 totalCount = page.totalElements
/>
<#if totalPage == 0>
	<#assign totalPage = 1/>
</#if>

<div class="mail-pagination-all mail-pagination-bottom">
    <div class="mail-pagination-left">
		${pageSize*(pageNo-1)+1}~${(pageSize*pageNo)} &nbsp;&nbsp;&nbsp;&nbsp;
		${pageNo}/${totalPage} 页  &nbsp;&nbsp;&nbsp;&nbsp;
		共${totalCount}条数据   &nbsp;&nbsp;&nbsp;&nbsp;
	</div>
	<div class="mail-pagination-right" >
		<div class="pagination" id="documentPagination"></div>
		<#--
		<div class="mail-pagination-input">第<input id="jumpInpId"/>页<a onclick="jumpFun();">GO</a></div>
		-->
	</div>
</div>

<form name="paginationForm" id="paginationForm">
	<input type="hidden" name="pageNo" value="${pageNo}"/>
	<input type="hidden" name="pageSize" value="${pageSize}"/>
	<input type="hidden" name="folderId" value="${folderId!'0'}"/>
	<input type="hidden" name="keyword" value="${keyword!''}"/>
</form>
 
<script type="text/javascript">
	$(function(){
		var options = {
			currentPage: ${pageNo},
	        totalPages: ${totalPage},
	        numberOfPages:5,
	        size:"normal",
	        alignment:"left",
	    	pageUrl:function (type, page, current){
				return "javascript:pageUrl('"+page+"')";
			},
	    	itemTexts:function(type, page, current){
	    		switch(type){
	    			case "first":
	    				return "首页";
	    			case "prev":
	    				return "上一页";
	    			case "next":
	    				return "下一页";
	    			case "last":
	    				return "末页";
	    			case "page":
	    				return ""+page;
	    			default:
	    				return "";
	    		}
	    	},
	    	tooltipTitles:function (type, page, current) {
	         	switch (type) {
	       			case "first":
	              		return "Tooltip for first page";
	            	case "prev":
	                 	return "Tooltip for previous page";
	               	case "next":
	                   	return "Tooltip for next page";
	              	case "last":
	                	return "Tooltip for last page";
	            	case "page":
	                 	return "Tooltip for page " + page;
	     		}
			},
	    	shouldShowPage:function(type, page, current){
	       		switch(type){
	            	case "first":
	               	case "last":
	                	return true;
	              	default:
	                 	return true;
	          	}
	   		},
	   		onPageClicked: function(e,originalEvent,type,page){
	 			$('#alert-content').text("Page item clicked, type: "+type+" page: "+page);
	        }
		}
		$("#documentPagination").bootstrapPaginator(options);
	});
	
	
	function pageUrl(pageNo){
	
		var folderId = $("#attachDocumentForm").find("input[name='folderId']").val();
		var txtSearch = $("#attachTxt").val();
		$.ajax({
			type:'POST',
			url:'${request.contextPath}/attachment/documentFileList',
			data:{
				"folderId":folderId,
				"pageNo":pageNo,
				"pageSize":10,
				"txtSearch":txtSearch
			},
			dataType:"html",
			success:function(data){
				$("#attachDocumentBody").html(data);
			}
		});
		
		
	}
	
	function jumpFun(){
		var pageNo = $("#jumpInpId").val();
		
		if($.trim(pageNo) == ''){
			return ;
		}
		
		if(isNaN(parseInt($.trim(pageNo)))){
			$("#jumpInpId").val('');
			return ;
		}
		
		if(parseInt($.trim(pageNo)) > ${totalPage}){
			pageNo = ${totalPage};
		}
		
		if(parseInt($.trim(pageNo)) < 1){
			pageNo = 1;
		}
		
		var folderId = $("#attachDocumentForm").find("input[name='folderId']").val();
		var txtSearch = $("#attachTxt").val();
		
		$.ajax({
			type:'POST',
			url:'${request.contextPath}/attachment/documentFileList',
			data:{
				"folderId":folderId,
				"pageNo":pageNo,
				"pageSize":10,
				"txtSearch":txtSearch
			},
			dataType:"html",
			success:function(data){
				$("#attachDocumentBody").html(data);
			}
		});
		
	}
	
	function pageSizeChange(size){
		
		var folderId = $("#attachDocumentForm").find("input[name='folderId']").val();
		var txtSearch = $("#attachTxt").val();
		
		$.ajax({
			type:'POST',
			url:'${request.contextPath}/attachment/documentFileList',
			data:{
				"folderId":folderId,
				"pageNo":1,
				"pageSize":size,
				"txtSearch":txtSearch
			},
			dataType:"html",
			success:function(data){
				$("#attachDocumentBody").html(data);
			}
		});
		
	}
	
</script>