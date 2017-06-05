package com.mine.sboot.system.user.entity;

import com.mine.sboot.core.jpa.entity.IdJpaEntity;
import com.mine.sboot.system.role.Role;

import javax.persistence.*;
import java.io.Serializable;

/**
 * ClassName: User
 * Description: 用户实体类
 * Created by liuff on 2017/6/4 20:49.
 */
@Entity
@Table(name = "s_user")
public class User extends IdJpaEntity implements Serializable {
    private static final long serialVersionUID = -5355229364920581783L;

    @Column(name = "logname")
    private String logname;//登录名
    @Column(name = "password")
    private String password;//密码
    @Column(name = "name")
    private String name;
    private Role role;

    public User() {
    }

    public User(String logname, String password, String name, Role role) {
        this.logname = logname;
        this.password = password;
        this.name = name;
        this.role = role;
    }

    public String getLogname() {
        return logname;
    }

    public void setLogname(String logname) {
        this.logname = logname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ManyToOne(cascade= CascadeType.REFRESH,fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name = "role_id")
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
