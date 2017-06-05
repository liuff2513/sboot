package com.mine.sboot.system.function.entity;

import com.mine.sboot.core.jpa.entity.IdJpaEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * ClassName: Function
 * Description: 功能实体类
 * Created by feifei.liu on 2017/6/5 17:17
 **/
@Entity
@Table(name = "s_function")
public class Function extends IdJpaEntity implements Serializable {
    private static final long serialVersionUID = -6297392416040265113L;

    @Column(name = "name")
    private String name;// 功能名称
    @Column(name = "description")
    private String description;// 功能描述
    @Column(name = "alias")
    private String alias;//
    @Column(name = "state")
    private Integer state;// 功能状态 1:启用/0:停用
    @Column(name = "link")
    private String link;// 功能连接
    @Column(name = "scheduleIcon")
    private String scheduleIcon;//日程图标
    @Column(name = "imagePath")
    private String imagePath;// 功能图标路径
    @Column(name = "imageSetting")
    private String imageSetting;// 功能图标路径(后台设置)
    @Column(name = "entityClass")
    private String entityClass;//实体类
    @Column(name = "entityName")
    private String entityName;// 实体类名
    @Column(name = "tableName")
    private String tableName;//对应表名
    @Column(name = "linkParameters")
    private String linkParameters;// 链接参数
    @Column(name = "sys")
    private Integer sys;// 是否为系统菜单
    @Column(name = "level")
    private Integer level;// 菜单等级
    @Column(name = "seq")
    private Integer seq;// 菜单排序
    private Function parent;// 父级功能
    private List<Function> children;// 子功能实体类集合
    @Column(name = "nameSpace")
    private String nameSpace;//命名空间
    @Column(name = "actionName")
    private String actionName;//请求名称命名
    @Column(name = "flag")
    private Integer flag;
    @Column(name = "projectId")
    private String projectId;//项目ID
    @Column(name = "creatorId")
    private String creatorId;
    @Column(name = "creatorName")
    private String creatorName;
    @Column(name = "createdTime")
    private Date createdTime;
    @Column(name = "modifierId")
    private String modifierId;
    @Column(name = "modifierName")
    private String modifierName;
    @Column(name = "modifiedTime")
    private Date modifiedTime;

    public Function() {
    }

    public Function(String name, String description, String alias, Integer state, String link, String scheduleIcon, String imagePath, String imageSetting, String entityClass, String entityName, String tableName, String linkParameters, Integer sys, Integer level, Integer seq, Function parent, List<Function> children, String nameSpace, String actionName, Integer flag, String projectId, String creatorId, String creatorName, Date createdTime, String modifierId, String modifierName, Date modifiedTime) {
        this.name = name;
        this.description = description;
        this.alias = alias;
        this.state = state;
        this.link = link;
        this.scheduleIcon = scheduleIcon;
        this.imagePath = imagePath;
        this.imageSetting = imageSetting;
        this.entityClass = entityClass;
        this.entityName = entityName;
        this.tableName = tableName;
        this.linkParameters = linkParameters;
        this.sys = sys;
        this.level = level;
        this.seq = seq;
        this.parent = parent;
        this.children = children;
        this.nameSpace = nameSpace;
        this.actionName = actionName;
        this.flag = flag;
        this.projectId = projectId;
        this.creatorId = creatorId;
        this.creatorName = creatorName;
        this.createdTime = createdTime;
        this.modifierId = modifierId;
        this.modifierName = modifierName;
        this.modifiedTime = modifiedTime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getScheduleIcon() {
        return scheduleIcon;
    }

    public void setScheduleIcon(String scheduleIcon) {
        this.scheduleIcon = scheduleIcon;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getImageSetting() {
        return imageSetting;
    }

    public void setImageSetting(String imageSetting) {
        this.imageSetting = imageSetting;
    }

    public String getEntityClass() {
        return entityClass;
    }

    public void setEntityClass(String entityClass) {
        this.entityClass = entityClass;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getLinkParameters() {
        return linkParameters;
    }

    public void setLinkParameters(String linkParameters) {
        this.linkParameters = linkParameters;
    }

    public Integer getSys() {
        return sys;
    }

    public void setSys(Integer sys) {
        this.sys = sys;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }

    @ManyToOne(cascade= CascadeType.REFRESH,fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name = "pid")
    public Function getParent() {
        return parent;
    }

    public void setParent(Function parent) {
        this.parent = parent;
    }

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "parent")
    @OrderBy(value="seq asc")
    public List<Function> getChildren() {
        return children;
    }

    public void setChildren(List<Function> children) {
        this.children = children;
    }

    public String getNameSpace() {
        return nameSpace;
    }

    public void setNameSpace(String nameSpace) {
        this.nameSpace = nameSpace;
    }

    public String getActionName() {
        return actionName;
    }

    public void setActionName(String actionName) {
        this.actionName = actionName;
    }

    public Integer getFlag() {
        return flag;
    }

    public void setFlag(Integer flag) {
        this.flag = flag;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public String getModifierId() {
        return modifierId;
    }

    public void setModifierId(String modifierId) {
        this.modifierId = modifierId;
    }

    public String getModifierName() {
        return modifierName;
    }

    public void setModifierName(String modifierName) {
        this.modifierName = modifierName;
    }

    public Date getModifiedTime() {
        return modifiedTime;
    }

    public void setModifiedTime(Date modifiedTime) {
        this.modifiedTime = modifiedTime;
    }
}
