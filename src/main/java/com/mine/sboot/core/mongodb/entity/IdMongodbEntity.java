package com.mine.sboot.core.mongodb.entity;

import org.springframework.data.annotation.Id;

import java.io.Serializable;

public abstract class IdMongodbEntity implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = -3918552629159611515L;
    @Id
    protected String id;
    private Long version;
    private String projectId;

    public IdMongodbEntity() {
        super();
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

}