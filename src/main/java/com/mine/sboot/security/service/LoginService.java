package com.mine.sboot.security.service;

import com.mine.sboot.core.jpa.support.BaseJpaService;
import com.mine.sboot.core.utils.validate.ValidateUtil;
import com.mine.sboot.system.user.entity.User;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.security.authentication.RememberMeAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Map;

/**
 * ClassName: LoginService
 * Description: //TODO
 * Created by feifei.liu on 2017/6/6 11:18
 **/
@Component
@Transactional
public class LoginService extends BaseJpaService<User, String> {
    public String viewLogin(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {
        // 解密
        if (isRememberMeAuthenticated()) {
            return "redirect:/welcome";
        }
        HttpSession session = request.getSession();
        if(session.getAttribute("_USER_LOGIN_")!=null && request.getRemoteUser() !=null)
        {
            return "redirect:/welcome";
        }
        Cookie[] cookie = request.getCookies();
        if (ValidateUtil.isValid(cookie)) {
            for (Cookie cookie2 : cookie) {
                switch (cookie2.getName()) {
                    case "SECURITY_LAST_USERNAME_KEY":
                        // 产生签名
                        try {
                            byte[] usernameKey = Base64.decodeBase64(cookie2.getValue());
                            String username = new String(usernameKey);
                            map.put("lastLoginName", username);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        break;
                    case "SECURITY_LOGIN_ERROR_NUM":
                        String loginNum = cookie2.getValue();
                        map.put("loginNum", loginNum);
                        break;
                    default:
                        break;
                }

            }
        }
        return "/login/login";
    }

    /**
     * @Description: 判断用户是否从Remember Me Cookie自动登录
     * @return boolean
     * @throws
     * @author 智圣
     * @date 2015年9月16日 下午2:01:38
     */
    private boolean isRememberMeAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return false;
        }
        return RememberMeAuthenticationToken.class.isAssignableFrom(authentication.getClass());
    }
}
