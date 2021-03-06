package com.mine.sboot.core.redis;

import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

/**
 * ClassName: RedisSessionConfiguration
 * Description: Redis Session共享配置（需redis支持）
 * maxInactiveIntervalInSeconds 表示session失效时长，该配置会导致server.session.timeout失效
 * Created by feifei.liu on 2017/6/5 18:09
 **/
@Configuration
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 1800)
public class RedisSessionConfiguration {
}
