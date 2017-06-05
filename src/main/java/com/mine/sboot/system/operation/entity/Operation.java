package com.mine.sboot.system.operation.entity;

import com.mine.sboot.core.jpa.entity.IdJpaEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * ClassName: Operation
 * Description: 操作实体类
 * Created by feifei.liu on 2017/6/5 17:14
 **/
@Entity
@Table(name = "s_operation")
public class Operation extends IdJpaEntity implements Serializable {
    private static final long serialVersionUID = 4661592777317770503L;

    @Column(name = "name")
    private String name;//操作名称
    @Column(name = "abbr")
    private String abbr;//操作标识
    @Column(name = "single")
    private Integer single;//列表、详情操作标识，0：列表操作 1：详情操作
    @Column(name = "state")
    private Integer state;//操作状态，0：禁用 1：正常使用
    @Column(name = "image")
    private String image;//操作图标
    @Column(name = "type")
    private Integer type;//暂时无用
    @Column(name = "seq")
    private Integer seq;//操作排序
    @Column(name = "flag")
    private Integer flag;////暂时无用

    public Operation() {
    }

    public Operation(String name, String abbr, Integer single, Integer state, String image, Integer type, Integer seq, Integer flag) {
        this.name = name;
        this.abbr = abbr;
        this.single = single;
        this.state = state;
        this.image = image;
        this.type = type;
        this.seq = seq;
        this.flag = flag;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAbbr() {
        return abbr;
    }

    public void setAbbr(String abbr) {
        this.abbr = abbr;
    }

    public Integer getSingle() {
        return single;
    }

    public void setSingle(Integer single) {
        this.single = single;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }

    public Integer getFlag() {
        return flag;
    }

    public void setFlag(Integer flag) {
        this.flag = flag;
    }
}
