<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8">
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<title></title>
<link rel="stylesheet" href="plugins/bootstrap_v3/css/bootstrap.min.css">
<script src="plugins/jquery-ui-1.11.4/external/jquery/jquery.js" language="javascript" type="text/javascript"></script>
<script src="plugins/bootstrap_v3/js/bootstrap.min.js" language="javascript" type="text/javascript"></script>
<script src="plugins/bootstrap_v3/js/transition.js" language="javascript" type="text/javascript"></script>
<script src="plugins/bootstrap_v3/js/modal.js" language="javascript" type="text/javascript"></script>
<script src="plugins/bootstrap_v3/js/tooltip.js" language="javascript" type="text/javascript"></script>
<script src="plugins/bootstrap_v3/js/popover.js" language="javascript" type="text/javascript"></script>
<script src="plugins/bootstrap-plugins/confirmation/bootstrap-confirmation.js" language="javascript" type="text/javascript"></script>
</head>
	<body>
	<form name="logoutForm" action="./logout" method="post">
	  	<div class="alert alert-warning alert-dismissible text-center" role="alert">
			<button type="button" class="close" data-dismiss="alert">
				<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
			</button>
			登录成功！
			<button type="button" onclick="formSubmit()">Log Out</button>
			<button type="submit" >Logout</button>
			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
		</div>
	</form>	
	</body>
</html>
<SCRIPT language="javascript">
function formSubmit() {
   window.logoutForm.action="./testLook";
   window.logoutForm.submit();
}
</SCRIPT>
