package com.mine.sboot.system.user.web;

import com.mine.sboot.core.web.BaseJpaController;
import com.mine.sboot.system.user.entity.User;
import com.mine.sboot.system.user.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * ClassName: UserController
 * Description: 用户控制类
 * Created by feifei.liu on 2017/6/5 17:52
 **/
@RestController
@RequestMapping("/user")
public class UserController extends BaseJpaController<UserService, User, String> {

    @RequestMapping("/userList")
    public List<User> userList() {
        return baseJpaService.findAll();
    }

    @RequestMapping("/getById")
    public String getById(String id) {
        return baseJpaService.getById(id);
    }
}
