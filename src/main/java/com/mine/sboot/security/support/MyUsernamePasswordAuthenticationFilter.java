package com.mine.sboot.security.support;

import com.mine.sboot.security.web.VerifyController;
import com.mine.sboot.system.user.dao.UserDao;
import org.apache.commons.lang3.StringUtils;
import org.apache.tomcat.util.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;

/**
 * ClassName: MyUsernamePasswordAuthenticationFilter
 * Description: 自定义表单认证登录过滤器
 *  当我们调用了HttpSecurity对象的formLogin方法时，spring会给我们注册一个过滤器
 * Created by feifei.liu on 2017/6/5 20:40
 **/
public class MyUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private static Logger logger = LoggerFactory.getLogger(MyUsernamePasswordAuthenticationFilter.class);

    // 必须要和验证码保存那一段一致
    public static final String VALIDATE_CODE = VerifyController.getValidatecode();

    @Autowired(required = false)
    private UserDao userDao;
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)  throws AuthenticationException {
        try {
            request.setCharacterEncoding("UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        response.setCharacterEncoding("UTF-8");
        // 设置session有效时间
        // 用户登录次数验证
        // 首次登录=0
        long loginErrorNum = 0;
        // 登录时间
        Cookie[] cookies = request.getCookies();
        if(null != cookies && cookies.length!=0){
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("SECURITY_LOGIN_ERROR_NUM")) {
                    loginErrorNum = Integer.valueOf(cookie.getValue());
                }
            }
            loginErrorNum++;
        }
        logger.info("认证错误次数："+loginErrorNum);
        // 第一次修改登录次数
        Cookie loginNumCookie = new Cookie("SECURITY_LOGIN_ERROR_NUM", String.valueOf(loginErrorNum));
        loginNumCookie.setMaxAge(3600);
        //loginNumCookie.setHttpOnly(true);
        response.addCookie(loginNumCookie);


        if (!request.getMethod().equalsIgnoreCase("post")) {
            throw new AuthenticationServiceException("请求无效！");
        }
        if (loginErrorNum > 3) {
            checkValidateCode(request);
        }

        String username = obtainUsername(request);
        String password = obtainPassword(request);

        username = username.trim();
        password = password.trim();
        if (StringUtils.isEmpty(username)) {
            throw new AuthenticationServiceException("用户名不能为空！");
        }
        if (StringUtils.isEmpty(password)) {
            throw new AuthenticationServiceException("密码不能为空！");
        }

        byte[] userByte = username.getBytes();
        String usernameKey = Base64.encodeBase64String(userByte);
        Cookie cookie = new Cookie("SECURITY_LAST_USERNAME_KEY", usernameKey);
        cookie.setMaxAge(2592000);
        response.addCookie(cookie);
        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);

        // Allow subclasses to set the "details" property
        setDetails(request, authRequest);
        logger.info("security认证请求",authRequest);
        // 根据用户和密码查询
        return this.getAuthenticationManager().authenticate(authRequest);
    }



    /**
     * 验证session验证码是否一致
     *
     * @param request
     */
    private void checkValidateCode(HttpServletRequest request) {

        HttpSession session = request.getSession();
        String sessionValidatecode = obtailSessionValidateCode(session);
        // 让上一次的验证码失效,这里被调用2次,第二次调用在myUserDetail回调
//		 session.setAttribute(VALIDATE_CODE, null);
        String validateCodeParamter = obtainValidateCodeParamter(request);

        if (StringUtils.isEmpty(validateCodeParamter) || !sessionValidatecode.equalsIgnoreCase(validateCodeParamter)) {
            throw new AuthenticationServiceException("验证码不匹配！");
        }
    }

    /**
     * 获取参数中的验证码
     *
     * @param request
     * @return
     */
    private String obtainValidateCodeParamter(HttpServletRequest request) {
        Object obj = request.getParameter(VALIDATE_CODE);
        return null == obj ? "" : obj.toString();
    }

    /**
     * 获取出存在session中的验证码
     *
     * @param httpSession
     * @return
     */
    private String obtailSessionValidateCode(HttpSession httpSession) {

        Object object = httpSession.getAttribute(VALIDATE_CODE);
        return object == null ? "" : object.toString();
    }

    @Override
    protected String obtainPassword(HttpServletRequest request) {
        Object obj = request.getParameter(SPRING_SECURITY_FORM_PASSWORD_KEY);
        return null == obj ? "" : obj.toString();
    }

    @Override
    protected String obtainUsername(HttpServletRequest request) {
        Object obj = request.getParameter(SPRING_SECURITY_FORM_USERNAME_KEY);
        return null == obj ? "" : obj.toString();
    }
}
