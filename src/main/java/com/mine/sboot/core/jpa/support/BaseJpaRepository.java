package com.mine.sboot.core.jpa.support;

import com.mine.sboot.core.jpa.enums.QueryType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

import javax.persistence.Query;
import javax.persistence.StoredProcedureQuery;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * ClassName: BaseJpaRepository
 * @Description: 公共基础Repository，继承此Repository可使用该接口定义的公共方法
 * @param <T> 实体类类型
 * @param <ID> 实体类主键类型
 * @author feifei.liu
 * @date 2015年9月9日 下午1:03:28
 */
@NoRepositoryBean
public interface BaseJpaRepository<T, ID extends Serializable> extends JpaRepository<T, ID>, JpaSpecificationExecutor<T> {
    Object saveObject(Object entity);

    T findOne(Specification<T> spec);

    Object findOne(Class<?> entityClass, Object primaryKey);

    Page<T> findAll(Specification<T> spec, Pageable pageable);

    List<T> findAll(Specification<T> spec);

    List<T> findAll(Specification<T> spec, Sort sort);

    long count(Specification<T> spec);

    @SuppressWarnings("rawtypes")
    List findAll(String queryString);

    @SuppressWarnings("rawtypes")
    List findBySql(String sqlString);

    Map<QueryType, Object> findBySql(String sqlString, int start, int length);

    @SuppressWarnings("rawtypes")
    List findBySql(String sqlString, Class resultClass);

    @SuppressWarnings("rawtypes")
    List findBySql(String sqlString, String resultSetMapping);

    Page<T> findAll(String queryString, Pageable pageable);

    void clear();

    void rollback();

    Query createNativeQuery(String sqlString);

    int execute(String sqlString);

    int updateQuery(String updateQuery);

    StoredProcedureQuery createStoredProcedureQuery(String procedureName);

    int execNativeQuery(String sqlString, Object... objects);

    Page<T> findByAuto(T example, Pageable pageable);
}
