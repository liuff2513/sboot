package com.mine.sboot.system.role;

import com.mine.sboot.core.jpa.entity.IdJpaEntity;
import com.mine.sboot.system.user.entity.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * ClassName: Role
 * Description: 角色实体类
 * Created by feifei.liu on 2017/6/5 16:49
 **/
@Entity
@Table(name = "s_role")
public class Role extends IdJpaEntity implements Serializable {
    private static final long serialVersionUID = -1477888917350721835L;

    @Column(name = "name")
    private String name;//角色
    private Set<User> users = new LinkedHashSet<User>();
    private Set<RolePermission> rolePerm = new LinkedHashSet<RolePermission>();

    public Role() {
    }

    public Role(String name, Set<User> users, Set<RolePermission> rolePerm) {
        this.name = name;
        this.users = users;
        this.rolePerm = rolePerm;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @OneToMany(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH},
            fetch = FetchType.LAZY, mappedBy = "role")
    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "role")
    public Set<RolePermission> getRolePerm() {
        return rolePerm;
    }

    public void setRolePerm(Set<RolePermission> rolePerm) {
        this.rolePerm = rolePerm;
    }
}
