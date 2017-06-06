package com.mine.sboot.security.web;

import com.mine.sboot.core.web.BaseJpaController;
import com.mine.sboot.security.service.LoginService;
import com.mine.sboot.system.user.entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
    /**
     * security自定义指定登录页面请求
     * @param request
     * @param response
     * @param map
     * @return
     */
    @RequestMapping(value="viewLogin")
    public String viewLogin(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {
        return baseJpaService.viewLogin(request, response, map);
    }

    /**
     *
     * @Description:  邀约用户登陆
     * @param username 登录名
     * @param password 密码
     * @return String
     * @throws
     * @author xiaopeng.ma
     * @date 2016年6月15日 下午1:25:20
     */
    @ResponseBody
    @RequestMapping(value="/loginBefore", produces = "text/html;charset=UTF-8")
    public String loginBefore(String username,String password,HttpServletRequest request,HttpServletResponse response){
        return baseJpaService.loginBefore(username,password,request,response);
    }

    /**
     * 登录成功请求
     * @param request
     * @param response
     * @param mm
     * @return
     */
    @RequestMapping(value="/success")
    public String success(HttpServletRequest request,HttpServletResponse response,ModelMap mm) {
        return baseJpaService.success(request, response,mm);
    }

    /**
     * 登录验证失败请求
     * @param request
     * @param response
     * @param map
     * @param error
     * @return
     */
    @RequestMapping(value = "/loginError")
    public String login(HttpServletRequest request,HttpServletResponse response, Map<String, Object> map,
                        @RequestParam(value = "error", required = false, defaultValue = "false")Boolean error) {
        return baseJpaService.login(request, response, map, error);
    }

}
