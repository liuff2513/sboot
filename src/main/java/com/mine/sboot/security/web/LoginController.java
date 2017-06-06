package com.mine.sboot.security.web;

import com.mine.sboot.core.web.BaseJpaController;
import com.mine.sboot.security.service.LoginService;
import com.mine.sboot.system.user.entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * ClassName: LoginController
 * Description: 用户登录控制器
 * Created by feifei.liu on 2017/6/6 11:16
 **/
@Controller
public class LoginController extends BaseJpaController<LoginService, User, String> {
    @RequestMapping(value="viewLogin")
    public String viewLogin(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {
        return baseJpaService.viewLogin(request, response, map);
    }
}
