package com.mine.sboot.system.user.service;

import com.mine.sboot.core.jpa.support.BaseJpaService;
import com.mine.sboot.system.user.entity.User;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * ClassName: UserService
 * Description: //TODO
 * Created by feifei.liu on 2017/6/5 17:54
 **/
@Component
@Transactional
public class UserService extends BaseJpaService<User, String> {

    @Cacheable(value = "user_name")
    public String getById(String id) {
        System.out.println("不打印该输出，缓存生效！！");
        return this.findOne(id).getName();
    }
}
