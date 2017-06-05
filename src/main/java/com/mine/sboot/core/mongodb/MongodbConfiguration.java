package com.mine.sboot.core.mongodb;

import com.mine.sboot.core.mongodb.support.BaseMongoRepositoryImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.CustomConversions;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.Collections;

/**
 * ClassName: MongodbConfiguration
 * Description: MongDB配置类
 * Created by feifei.liu on 2017/6/5 16:37
 **/
@Configuration
@EnableMongoRepositories(repositoryBaseClass = BaseMongoRepositoryImpl.class, basePackages = {"com.mine.sboot"})
public class MongodbConfiguration {

    /**
     * customConversions 和solr重名导致启动异常，重命名mongodb的customConversions
     * @return
     */
    @Bean
    public CustomConversions mongoCustomConversions() {
        return new CustomConversions(Collections.emptyList());
    }
}
