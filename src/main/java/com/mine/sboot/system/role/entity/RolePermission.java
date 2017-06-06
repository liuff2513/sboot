package com.mine.sboot.system.role.entity;

import com.mine.sboot.core.jpa.entity.IdJpaEntity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * ClassName: RolePermission
 * Description: 角色权限实体类
 * Created by feifei.liu on 2017/6/5 16:51
 **/
@Entity
@Table(name = "s_role_permission")
public class RolePermission extends IdJpaEntity implements Serializable {
    private static final long serialVersionUID = -6540620246713129103L;

    @Column(name = "function_id")
    private String functionId;
    @Column(name = "operation_id")
    private String operationId;
    private Role role;

    public RolePermission() {
    }

    public RolePermission(String functionId, String operationId, Role role) {
        this.functionId = functionId;
        this.operationId = operationId;
        this.role = role;
    }

    public String getFunctionId() {
        return functionId;
    }

    public void setFunctionId(String functionId) {
        this.functionId = functionId;
    }

    public String getOperationId() {
        return operationId;
    }

    public void setOperationId(String operationId) {
        this.operationId = operationId;
    }

    @ManyToOne(cascade = CascadeType.REFRESH, optional = false)
    @JoinColumn(name = "role_id")
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
