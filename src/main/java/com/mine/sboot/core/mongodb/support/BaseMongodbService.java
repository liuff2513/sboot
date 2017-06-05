package com.mine.sboot.core.mongodb.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;

/**
 * ClassName: BaseMongodbService
 * Description: //TODO
 * Created by feifei.liu on 2017/6/5 17:59
 **/
@Component
@Transactional
public abstract class BaseMongodbService<T, ID extends Serializable> {
    @Autowired
    protected BaseMongoRepository<T, ID> mongoRepository;
}
