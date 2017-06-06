package com.mine.sboot.security.support;

import com.mine.sboot.system.user.dao.UserDao;
import com.mine.sboot.system.user.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * ClassName: MyUserDetailsService
 * Description: //TODO
 * Created by feifei.liu on 2017/6/5 19:12
 **/
public class MyUserDetailsService implements UserDetailsService {
    private static Logger logger = LoggerFactory.getLogger(MyUserDetailsService.class);

    @Autowired
    private UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.getByUser(username);
        if (user == null) {
            throw new UsernameNotFoundException("UserName " + username + " not found");
        }
        org.springframework.security.core.userdetails.User securityUser = null;
        Collection<GrantedAuthority> authorities = obtionGrantedAuthorities(user);
        securityUser = new org.springframework.security.core.userdetails.User(
                username, user.getPassword(),true,true,true,true,authorities
        );
        logger.info("认证通过-获得用户权限地址",authorities);
        logger.info("认证通过-securityUser",securityUser);
        return securityUser;
    }

    /**
     * @Description: 取得用户的权限 获取当前用户可以查看的地址列表
     * @param @param adminUser
     * @param @return
     * @return Collection<GrantedAuthority>
     * @throws
     * @author 智圣
     * @date 2015年8月27日 下午8:19:31
     */
    public Collection<GrantedAuthority> obtionGrantedAuthorities(User user) {
        Set<GrantedAuthority> authSet = new HashSet<>();
        authSet.add(new SimpleGrantedAuthority(user.getRole().getId()));
        return authSet;
    }
}
