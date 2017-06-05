package com.mine.sboot.core.web;

import com.mine.sboot.core.jpa.support.BaseJpaService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;

/**
 * ClassName: BaseJpaController
 * Description: //TODO
 * Created by feifei.liu on 2017/6/5 17:55
 **/
public abstract class BaseJpaController<R extends BaseJpaService<T, ID>, T, ID extends Serializable> {
    @Autowired
    protected R baseJpaService;//默认注入业务层Service
}
