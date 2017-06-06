package com.mine.sboot.security;

import com.mine.sboot.security.support.MyFilterSecurityInterceptor;
import com.mine.sboot.security.support.MyLoginSuccessHandler;
import com.mine.sboot.security.support.MyUserDetailsService;
import com.mine.sboot.security.support.MyUsernamePasswordAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.vote.AffirmativeBased;
import org.springframework.security.access.vote.AuthenticatedVoter;
import org.springframework.security.access.vote.RoleVoter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.access.expression.DefaultWebSecurityExpressionHandler;
import org.springframework.security.web.access.expression.WebExpressionVoter;

import java.util.ArrayList;
import java.util.List;

/**
 * ClassName: WebSecurityConfiguration
 * Description: Spring Security Java配置类
 * 该配置创建一个称为springSecurityFilterChain的Servlet过滤器，
 *      它负责应用程序中的所有安全性（保护应用程序URL，验证提交的用户名和密码，重定向到登录表单等）。
 * Created by feifei.liu on 2017/6/5 18:49
 **/
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true, proxyTargetClass =  true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Bean
    public MyFilterSecurityInterceptor filterSecurityInterceptor() {
        return new MyFilterSecurityInterceptor();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        authenticationProvider.setHideUserNotFoundExceptions(false);
        return authenticationProvider;
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        //指定密码加密所使用的加密器为passwordEncoder()
        //需要将密码加密后写入数据库
        auth.authenticationProvider(authenticationProvider());
//        auth.userDetailsService(customUserDetailsService()).passwordEncoder(passwordEncoder());
//        auth.eraseCredentials(false);
    }

    /**
     * 自定义UserDetailsService Bean
     * @return
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return new MyUserDetailsService();
    }

    /**
     * 自定义表单认证登录过滤器
     * @return
     * @throws Exception
     */
    @Bean
    public MyUsernamePasswordAuthenticationFilter usernamePasswordAuthenticationFilter() throws Exception {
        MyUsernamePasswordAuthenticationFilter usernamePasswordAuthenticationFilter =
                new MyUsernamePasswordAuthenticationFilter();
        usernamePasswordAuthenticationFilter.setAuthenticationManager(authenticationManagerBean());
        return usernamePasswordAuthenticationFilter;
    }

    /**
     * BCryptPasswordEncoder 加密
     * @return
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 登录成功后可使用loginSuccessHandler()存储用户信息，可选。
     * @return
     */
    @Bean
    public MyLoginSuccessHandler loginSuccessHandler() {
        MyLoginSuccessHandler loginSuccessHandler = new MyLoginSuccessHandler();
        loginSuccessHandler.setDefaultTargetUrl("/success");
        return loginSuccessHandler;
    }

    /**
     * 这里可以增加自定义的投票器
     * @return
     */
    @Bean
    public AccessDecisionManager accessDecisionManager() {
        List<AccessDecisionVoter<?>> decisionVoters = new ArrayList<>();
        decisionVoters.add(new RoleVoter());
        decisionVoters.add(new AuthenticatedVoter());
        decisionVoters.add(webExpressionVoter());//启用表达式投票器
        AffirmativeBased accessDecisionManager = new AffirmativeBased(decisionVoters);
        return accessDecisionManager;
    }

    /**
     * 表达式投票器
     * @return
     */
    @Bean
    public WebExpressionVoter webExpressionVoter() {
        WebExpressionVoter webExpressionVoter = new WebExpressionVoter();
        webExpressionVoter.setExpressionHandler(webSecurityExpressionHandler());
        return  webExpressionVoter;
    }

    /**
     * 表达式控制器
     * @return
     */
    @Bean
    public DefaultWebSecurityExpressionHandler webSecurityExpressionHandler() {
        DefaultWebSecurityExpressionHandler webSecurityExpressionHandler = new DefaultWebSecurityExpressionHandler();
        return webSecurityExpressionHandler;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    /**
     * UserDetailsService 加密认证配置
     * @param auth
     * @throws Exception
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder());
    }

    /**
     * 表单登录认证
     * @param http
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/viewLogin") //指定登录页的路径
                .loginProcessingUrl("/login")
                .failureUrl("/loginError?error=true")
                .successHandler(loginSuccessHandler())
                .permitAll()
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/viewLogin")
                .permitAll()
                .invalidateHttpSession(true)
                .and()
                .rememberMe().key("BHTOKEN")
                .alwaysRemember(false)
                .tokenValiditySeconds(1209600)
                .rememberMeParameter("remember-me")
                .rememberMeCookieName("BHTOKEN")
                .userDetailsService(userDetailsService())
                .authenticationSuccessHandler(loginSuccessHandler())
                .and()
                .sessionManagement()
                .invalidSessionUrl("/viewLogin")
                .maximumSessions(50)
                .expiredUrl("/expire.ftl");
//        http.csrf().disable();
        http.headers().cacheControl().disable().frameOptions().sameOrigin();
        http.authorizeRequests().accessDecisionManager(accessDecisionManager()).expressionHandler(webSecurityExpressionHandler());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        //设置不拦截规则
        web.ignoring().antMatchers("/**/*.js", "/**/*.css",
                "/home","/hello","/verify","/welcome",
                "/**/*.ftl",
                "/**/*.ico",
                "/**/*.css",
                "/**/*.jpg",
                "/**/*.jpeg",
                "/**/*.gif",
                "/**/*.png",
                "/**/*.js",
                "/**/fonts/*.woff*",
                "/**/*.ttf",
                "/**/*.htm",
                "/**/*.html",
                "/**/*.xml",
                "/**/*.swf",
                "/**/*.zip",
                "/**/*.rar",
                "/**/*.apk",
                "/**/*.ipa",
                "/**/*.txt",
                "/**/*.docx",
                "/**/*.doc",
                "/**/*.xlsx",
                "/**/*.ppt",
                "/**/*.emf",
                "/**/*.dic",
                "/**/inter",
                "/**/interAppApi",
                "/**/welcome?module=qixinMessage",
                "/**/saveWfFormDataForModule");
    }
}
