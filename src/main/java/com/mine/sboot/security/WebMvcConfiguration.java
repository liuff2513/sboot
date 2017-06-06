package com.mine.sboot.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerView;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

import java.util.Properties;

/**
 * ClassName: WebMvcConfiguration
 * Description: Spring MVC Java配置類
 * Created by feifei.liu on 2017/6/5 19:37
 **/
@Configuration
@EnableWebMvc
@EnableSpringDataWebSupport
public class WebMvcConfiguration extends WebMvcConfigurerAdapter {
    /**
     * Freemarker参数配置
     * @return
     */
    @Bean
    public FreeMarkerConfigurer freeMarkerConfigurer() {
        FreeMarkerConfigurer freeMarkerConfigurer = new FreeMarkerConfigurer();
        freeMarkerConfigurer.setTemplateLoaderPath("classpath:/templates/");
        freeMarkerConfigurer.setDefaultEncoding("UTF-8");
        Properties properties = new Properties();
        //Properties value值必须是字符串，不然服务启动时freemarker解析会报空指针异常
        properties.put("template_update_delay", "0");//模板刷新周期，开发时设置小点，上线再设置大些
        properties.put("locale", "zh_CN");
        properties.put("date_format", "yyyy-MM-dd");
        properties.put("datetime_format", "yyyy-MM-dd HH:mm:ss");
        properties.put("time_format", "HH:mm:ss");
        properties.put("number_format", "#.##");
        properties.put("auto_import", "spring.ftl as spring");
        properties.put("auto_include", "common/auto_include.ftl");
        properties.put("auto_flush", "true");
        freeMarkerConfigurer.setFreemarkerSettings(properties);
        return freeMarkerConfigurer;
    }

    /**
     * Freemarker视图配置
     * @return
     */
    @Bean
    public FreeMarkerViewResolver freeMarkerViewResolver(){
        FreeMarkerViewResolver freeMarkerViewResolver = new FreeMarkerViewResolver();
        freeMarkerViewResolver.setOrder(1);
        freeMarkerViewResolver.setCache(false);
        freeMarkerViewResolver.setViewClass(FreeMarkerView.class);
        freeMarkerViewResolver.setContentType("text/html;charset=utf-8");
        freeMarkerViewResolver.setSuffix(".ftl");
        freeMarkerViewResolver.setRequestContextAttribute("request");
        freeMarkerViewResolver.setAllowRequestOverride(true);
        freeMarkerViewResolver.setExposeRequestAttributes(true);
        freeMarkerViewResolver.setExposeSessionAttributes(true);
        freeMarkerViewResolver.setExposeSpringMacroHelpers(true);
        return freeMarkerViewResolver;
    }

    /**
     * JSP页面视图配置（定义JSP和JSTL视图解析器，将视图逻辑名解析为：/assets/<viewName>.jsp）
     * @return
     */
    @Bean
    public InternalResourceViewResolver viewResolver() {
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setOrder(2);
        viewResolver.setViewClass(JstlView.class);
        viewResolver.setPrefix("classpath:/statistical/");
        viewResolver.setSuffix(".jsp");
        return viewResolver;
    }

    /**
     * 静态资源路径配置
     * addResourceLocations 指的是文件放置的目录
     * addResourceHandler 指的是对外暴露的访问路径
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/assets/**").addResourceLocations("classpath:/assets/");
    }

    /**
     * 快速请求配置
     * @param registry
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
//        registry.addViewController("/").setViewName("/index");
    }
}
