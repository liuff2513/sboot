package com.mine.sboot.core.jpa;

import com.mine.sboot.core.jpa.support.BaseJpaRepositoryImpl;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * ClassName: JpaConfiguration
 * Description: Spring Data Jpa 配置类
 * Created by feifei.liu on 2017/6/5 16:43
 **/
@Configuration
@EnableJpaRepositories(repositoryBaseClass = BaseJpaRepositoryImpl.class, basePackages = {"com.mine.sboot"})
public class JpaConfiguration {
}
