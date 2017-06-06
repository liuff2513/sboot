package com.mine.sboot.system.user.dao;

import com.mine.sboot.core.jpa.support.BaseJpaRepository;
import com.mine.sboot.system.user.entity.User;
import org.springframework.data.jpa.repository.Query;

/**
 * ClassName: UserDao
 * Description: //TODO
 * Created by feifei.liu on 2017/6/5 18:06
 **/
public interface UserDao extends BaseJpaRepository<User, String> {
    //默认查出启用激活用户 （勿删）
    @Query(value = "SELECT * FROM s_user WHERE state=1 and is_deleted =0  and enabled=1 and  (logname = ?1 or email = ?1 or mobile_phone = ?1)", nativeQuery = true)
    User getByUser(String username);
}
