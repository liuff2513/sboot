package com.mine.sboot.system.user.dao;

import com.mine.sboot.core.jpa.support.BaseJpaRepository;
import com.mine.sboot.system.user.entity.User;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * ClassName: UserDao
 * Description: //TODO
 * Created by feifei.liu on 2017/6/5 18:06
 **/
public interface UserDao extends BaseJpaRepository<User, String> {
    //默认查出启用激活用户 （勿删）
    @Query(value = "SELECT * FROM s_user WHERE state=1 and is_deleted =0  and enabled=1 and  (logname = ?1 or email = ?1 or mobile_phone = ?1)", nativeQuery = true)
    User getByUser(String username);

    /**
     *
     * @Description: 根据用户名查USER
     * @param logname
     * @return
     * @return User
     * @throws
     * @author wangdaze
     * @date 2015年9月8日 下午2:43:56
     */
    //默认查出启用激活用户 （勿删）
    @Query(value = "SELECT * FROM s_user WHERE state=1 and is_deleted =0  and enabled=1 and (logname = ?1 or email = ?1 or mobile_phone = ?1)", nativeQuery = true)
    List<User> findByLogname(String logname);


    /**
     *
     * @Description: 根据邮箱查未删除USER
     * @param email
     * @return
     * @return User
     * @throws
     * @author wangdaze
     * @date 2015年9月8日 下午2:43:56
     */
    @Query(value = "SELECT * FROM s_user WHERE (is_deleted =0 or is_deleted is null) and email = ?1 ", nativeQuery = true)
    List<User> findByEmail(String email);
}
