<div class="login-baihui">
    <div>
        <div>
            <h1 class="login-logo"><a></a></h1>
        </div>
        <h5 class='baihui-title'>欢迎使用百会CRM</h5>
        <form role="form" name="loginForm" action="./login" method="post" class="m-t">
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>

            <div class="form-group">
                <div class="login-por"><i class="login-por-i"></i></div>
                <input class="form-co" id="exampleInputEmail1" placeholder="请输入用户名或注册邮箱" value="" type="text"
                       name="username" required value="${lastLoginName!''}">
            </div>
            <div class="form-group">
                <div class="login-code"><i class="login-code-i"></i></div>
                <input class="form-co" value="" id="exampleInputEmail1" class="form-co" placeholder="请输入密码" required
                       type="password" name="password">
            </div>
        <#if (loginNum?has_content) && (loginNum?eval > 2) >
            <div class="form-group input-group-lg">
                <label for="verifycode" class="col-sm-2 control-label sr-only"> 验证码 </label>
                <input type="text" name="sessionVerifyName" style=" display: inline;width: 44%;  float: left;"
                       placeholder="" id="verifycode" class="form-control">
                <img alt="" style="cursor: pointer; margin-left:2%" src="./verify" class="fl" onclick="fleshVerify()">
            </div>
        </#if>

            <div id="loginError" style="display:none;" class="alert alert-warning alert-dismissible" role="alert">
            <#--button type="button" class="close" data-dismiss="alert"-->
                <button type="button" class="close">
                    <span aria-hidden="true" onclick="$('#loginError').hide();">&times;</span><span class="sr-only"
                                                                                                    onclick="$('#loginError').hide();">Close</span>
                </button>
                <div id="loginErrorMsg"></div>
            </div>
            <p>
                <span class="f-l"><label class=""><input type="checkbox" name="remember-me"
                                                         value="true"><span>自动登录</span></label></span>
                <a href="./getPassword">
                    <small>忘记密码？</small>
                </a>
            </p>
            <button type="button" onclick="loginBefore();" class="login-land" id="loginbtn">登 录</button>
            <p><a href="./register/viewRegister">免费注册</a></p>
            <input type="hidden" name="userId">
        </form>
    </div>
</div>

<script language="javascript">
    (function () {
        $('form img').click(function () {
            fleshVerify();
        });
    });
    $(document).ready(function () {
        loginError();
        $(document).keyup(function (e) {
            var curKey = e.which;
            if (curKey == 13) {
                $(".login-land").trigger("click");
            }
        });
        $("input[name='username']").val('${lastLoginName!''}');
    });

    function fleshVerify() {
        var timenow = new Date().getTime();
        var src = $('form img').attr("src");
        var indexof = src.indexOf("?");
        if (indexof != -1) {
            src = src.substring(0, src.indexOf("?"));
        }
        $('form img').attr("src", src + '?d=' + timenow);
    }
    function loginError() {
    <#if loginError?has_content>
        $("#loginErrorMsg").text("${loginError}");
        $("#loginError").show();
    </#if>
        return;
    }
    /**
     * 登陆之前
     */
    function loginBefore() {
        var username = window.loginForm.username.value;
        var password = window.loginForm.password.value;
        if ($.trim(username).length == 0) {
            $("#loginErrorMsg").text("用户名不能为空");
            $("#loginError").show();
            return;
        } else if ($.trim(password).length == 0) {
            $("#loginErrorMsg").text("密码不能为空");
            $("#loginError").show();
            return;
        }
        $.ajax({
            url: './loginBefore',
            type: 'post',
            data: {username: username, password: password},
            dataType: 'json',
            success: function (data) {
                if (data != null) {
                    var result = data.result;
                    if (result == "0") {
                        var msg = data.msg;
                        $("#loginErrorMsg").text(msg);
                        $("#loginError").show();
                    } else if (result == "1") {
                        $("#loginError").hide();
                        $("#loginbtn").text("登录中...");
                        $("#loginbtn").css("background-color", "#3e91bd");
                        window.loginForm.submit();
                    } else {
                        $("#loginError").hide();
                        window.loginForm.userId.value = data.userId;
                        window.loginForm.action = "./inviteUser";
                        window.loginForm.submit();
                    }
                }

            }
        });
    }

</script>