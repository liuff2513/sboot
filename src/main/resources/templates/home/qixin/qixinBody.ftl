
<#--当前登陆人信息--->
<#assign currentUserId = Session['_USER_LOGIN_'].id?default('')>
<#assign currentUserName = Session['_USER_LOGIN_'].name?default('')>
<input type="hidden" id="qixinCurrentUserId" value="${Session['_USER_LOGIN_'].id?default('')}">
<input type="hidden" id="qixinCurrentUserName" value="${Session['_USER_LOGIN_'].name?default('')}">
<input type="hidden" id="qixinCurrentUserPhoto" value="${Session['_USER_LOGIN_'].photo?default('')}">
<input type="hidden" id="qixinCurrentUserRytoken" value="${Session['_USER_LOGIN_'].rongyToken?default('')}">
<input type="hidden" id="qixinrongyunkey" value="${rongyunKey?default('')}">
<#--图片上传--->
<input type="file" style="display:none;"  id="qixinChatImages_input"  onchange="compressQixinChatPic(this);"  accept="image/gif,image/jpeg,image/jpg,image/png"   name="uploadfile" >

<form name="discussionForm" action="" method="post">
	<input type="hidden" name="discussionId" >
</form>
