package com.mine.sboot.security.service;

import com.mine.sboot.core.jpa.support.BaseJpaService;
import com.mine.sboot.core.utils.str.StringUtil;
import com.mine.sboot.core.utils.validate.ValidateUtil;
import com.mine.sboot.system.user.dao.UserDao;
import com.mine.sboot.system.user.entity.User;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.tomcat.util.codec.binary.Base64;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.RememberMeAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * ClassName: LoginService
 * Description: //TODO
 * Created by feifei.liu on 2017/6/6 11:18
 **/
@Component
@Transactional
public class LoginService extends BaseJpaService<User, String> {
    @Autowired
    private UserDao userDao;
    /**
     * 登录页面
     * @param request
     * @param response
     * @param map
     * @return
     */
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

    /**
     * @Description: 登录成功后跳转界面
     * @return
     * @return String
     * @throws
     * @author lizs
     * @date 2016年6月14日 下午7:15:39
     */
    public String success(HttpServletRequest request,HttpServletResponse response, ModelMap mm) {
        String remoteUser = request.getRemoteUser();
        if(request.getSession().getAttribute("_USER_LOGIN_")!=null)
        {
            User user = (User) request.getSession().getAttribute("_USER_LOGIN_");
            if(!user.getLogname().equals(remoteUser))
                return "/login/loginError";
        }
        // 进行到这登录错误次数 = 0
        long loginErrorNum = 0;
        // 一切ok登录次数清空
        Cookie loginNumCookie1 = new Cookie("SECURITY_LOGIN_ERROR_NUM", String.valueOf(loginErrorNum));
        loginNumCookie1.setMaxAge(3600);
        loginNumCookie1.setHttpOnly(true);
        response.addCookie(loginNumCookie1);

        List<User> byUserName = userDao.findByLogname(remoteUser);
        User user = byUserName.size()>0?byUserName.get(0):userDao.findByEmail(remoteUser).get(0);
        request.getSession().setAttribute("_USER_LOGIN_", user);

//        //==============邮件定时任务=======================
//        MailThreadUtil thread = new MailThreadUtil(user, mailProtocolService);
//        thread.start();
//
//        //==============邮件定时任务=======================
//
//        //写入登录日志
//        String agentString=request.getHeader("user-agent");
//        UserAgent agent=UserAgent.parseUserAgentString(agentString);
//        String projectId = user.getProjectId();
//        LoginEntity loginEntity = new LoginEntity();
//        loginEntity.setSessionId(request.getSession().getId());
//        loginEntity.setProjectId(projectId);
//        loginEntity.setHandler(user.getName());
//        loginEntity.setHandlerPhone(null!=user.getMobilePhone()?user.getMobilePhone():"");
//        loginEntity.setHandlerEmail(null!=user.getEmail()?user.getEmail():"");
//        loginEntity.setHandlerId(user.getId());
//        loginEntity.setIp(PathUtil.getIpAddr(request));
//        String sysName = agent.getOperatingSystem().name();
//        loginEntity.setSys(sysName);
//        loginEntity.setSysVersion(null!=sysName && sysName.contains("_")?sysName.split("_")[1]:"");
//        loginEntity.setSource("PC");
//        request.getSession().setAttribute("_USER_LOGIN_LOG_", loginEntity);
//
//        //公司信息写入缓存
//        RedisDataUtil.setProject(projectId,this);
//
//        //执行搜索字段的更新
//        try {
//            final List<Object[]> functionFields = this.findBySql("SELECT t.ID,t.NAME,t.TABLE_NAME FROM s_function t left join s_function p on t.PID=p.id WHERE t.STATE=1 AND t.TABLE_NAME IN ("+BasicDetailTableCollectionsUtil.commonTableCollections()+",'bh_report','bh_payment_record','bh_requirement')  AND t.PROJECT_ID='"+user.getProjectId()+"' ORDER BY coalesce(p.SEQ,t.SEQ),t.SEQ");
//            final String project_id = user.getProjectId();
//            new Thread(){
//                public void run(){
//                    JedisPermTool jedisPool = JedisPermTool.getInstance();
//                    if (functionFields != null && functionFields.size() > 0) {
//                        for (Object[] obj : functionFields) {
//                            String tableName = String.valueOf(obj[2]);
//                            jedisPool.setSearchField(project_id,tableName,searchDetailService);
//                        }
//                    }
//                }
//            }.start();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

        //return "redirect:/welcome?username="+username;
        return "redirect:/welcome";
    }

    /**
     * 登录验证
     * @param request
     * @param response
     * @param map
     * @param error
     * @return
     */
    public String login(HttpServletRequest request,HttpServletResponse response, Map<String, Object> map,
                        @RequestParam(value = "error", required = false, defaultValue = "false")Boolean error) {
        // 解密
        Cookie[] cookie = request.getCookies();
        if (ValidateUtil.isValid(cookie)) {
            for (Cookie cookie2 : cookie) {
                switch (cookie2.getName()) {
                    case "SECURITY_LAST_USERNAME_KEY":
                        // 产生签名
                        try {
                            byte[] usernameKey =Base64.decodeBase64(cookie2.getValue());
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
        // 获取session里面的错误
        HttpSession session = request.getSession();
        if (error && session.getAttribute("SPRING_SECURITY_LAST_EXCEPTION") != null) {

            Exception exception = (Exception) session.getAttribute("SPRING_SECURITY_LAST_EXCEPTION");
            String errorStr = "";
            String message = exception.getMessage();
            if("Bad credentials".equals(exception.getMessage())){
                errorStr="用户名密码错误！";
            }else if("User is disabled".equals(exception.getMessage())){
                errorStr="用户未激活！";
            }else{
                errorStr=exception.getMessage();

            }
            map.put("loginError", errorStr);

        }

        return "/login/login";
    }

    /**
     *
     * @Description:  邀约用户登陆
     * @param username
     * @param password
     * @return
     * @return String
     * @throws
     * @author xiaopeng.ma
     * @date 2016年6月15日 下午1:25:20
     */
    public String loginBefore(String username, String password,
                              HttpServletRequest request, HttpServletResponse response) {
        JSONObject json = new JSONObject();
        try {
            json.put("result", "0");//0：登陆错误 1:正常登陆 2：邀约用户
            if(StringUtil.empty(username)){
                json.put("msg", "用户名不能为空！");
                return json.toString();
            }
		/*else{
			if(StringUtil.sql_inj(username)){
				json.put("msg", "账号不存在,请重新输入！");
				return json.toString();
			}
		}
		*/

            User loginUser =null;
            //用户不存在
            Boolean usernameNotFound = true;
            Boolean userEnabledBefore =false;//其他同登录名的用户已经激活了
            System.out.println("登录名是====="+username);
            username = StringEscapeUtils.escapeJava(username);
            String hql ="from User where logname = '"+username+"'";
            System.err.println(hql);
            List<User> byUserName = userDao.findAll(hql);
            //List<User> byUserName = userDao.findUsersByLogName(username);
            if (byUserName == null || byUserName.size() == 0 ){
                json.put("msg", "账号不存在,请重新输入！");
                return json.toString();
            }
            //用户名或者密码错误
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            List<User> otherUsers = new ArrayList<User>();//其他用户
            for (User user : byUserName) {
                //$2a$10$dg6ChQLRFqS.AAXuYjHEduiaPB6Lba2.DrNyO4Siz0FQsphKJA9Oq
                boolean matches = passwordEncoder.matches(password, user.getPassword());
                if(matches){
                    usernameNotFound =false;
                    loginUser  = user;
//                if(Integer.valueOf(1).equals(loginUser.getEnabled())){//登录的是已激活的用户
                    break;
//                }
                }else{
                    otherUsers.add(user);
                }
            }

            if(usernameNotFound){
                json.put("msg", "用户名或者密码错误！");
                return json.toString();
            }
            for (User user : otherUsers) {
//            if(Integer.valueOf(1).equals(user.getEnabled())){
                userEnabledBefore =true;
                break;
//            }
            }
            json.put("result", "1");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return json.toString();

    }
}
