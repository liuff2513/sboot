package com.mine.sboot.security.support;

import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.stereotype.Component;

import java.util.Collection;

/**
 * ClassName: MyFilterInvocationSecurityMetadataSource
 * Description: 最核心的地方，就是提供某个资源对应的权限定义，即getAttributes方法返回的结果。
 *  此类在初始化时，应该取到所有资源及其对应角色的定义
 * Created by feifei.liu on 2017/6/5 18:59
 **/
@Component
public class MyFilterInvocationSecurityMetadataSource implements FilterInvocationSecurityMetadataSource {
    @Override
    public Collection<ConfigAttribute> getAttributes(Object o) throws IllegalArgumentException {
        return null;
    }

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return null;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return false;
    }
}
