package com.mine.sboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration;
import org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.env.Environment;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * ClassName: Application
 * Description: Spring Boot项目启动主类
 * Created by liuff on 2017/6/4 18:56.
 */
@RestController
@EnableAutoConfiguration(exclude = {SecurityAutoConfiguration.class, FreeMarkerAutoConfiguration.class, WebMvcAutoConfiguration.class}) //过滤不需要自动配置(exclude={DataSourceAutoConfiguration.class})
@ComponentScan
@EnableTransactionManagement
//@ImportResource(xx) 引入xml配置设置
//@SpringBootConfiguration // same as @Configuration @EnableAutoConfiguration @ComponentScan
public class Application extends SpringBootServletInitializer {

    /**
     * spring boot自带tomcat服务通过main函数启动服务
     * @param args
     */
    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(Application.class);
        application.setBannerMode(Banner.Mode.OFF); //关闭启动横幅
        application.run(args);
    }

    /**
     * spring boot 外部tomcat服务启动配置
     * @param builder
     * @return
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(Application.class);
    }

    @Value("${my.secret}")
    private String secret;
    @Value("${my.number}")
    private String number;
    @Value("${my.bignumber}")
    private String bignumber;
    @Value("${my.uuid}")
    private String uuid;
    @Value("${my.number.less.than.ten}")
    private String numLessThanTen;
    @Value("${my.number.in.range}")
    private String numberInRange;
    @Autowired
    Environment env;
    @RequestMapping("/hello")
    String hello() {
        System.out.println("secret:"+secret);
        System.out.println("number:"+number);
        System.out.println("bignumber:"+bignumber);
        System.out.println("uuid:"+uuid);
        System.out.println("numLessThanTen:"+numLessThanTen);
        System.out.println("numberInRange:"+numberInRange);
        return "Hello Spring Boot!";
    }

}
