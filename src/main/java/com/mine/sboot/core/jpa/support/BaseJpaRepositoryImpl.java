package com.mine.sboot.core.jpa.support;

import com.mine.sboot.core.jpa.enums.QueryType;
import com.mine.sboot.core.jpa.specs.CustomSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.StoredProcedureQuery;
import java.io.Serializable;
import java.math.BigInteger;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * ClassName: BaseJpaRepositoryImpl
 * @Description: 公共基础Repository 实现类
 * @param <T>
 * @param <ID>
 * @author feifei.liu
 * @date 2015年9月9日 下午1:04:26
 */
public class BaseJpaRepositoryImpl<T, ID extends Serializable> extends SimpleJpaRepository<T, ID> implements BaseJpaRepository<T, ID> {
    private final EntityManager em;

//    public BaseJpaRepositoryImpl(Class<T> domainClass, EntityManager em) {
//        super(domainClass, em);
//        this.em = em;
//    }
    public BaseJpaRepositoryImpl(JpaEntityInformation entityInformation, EntityManager em) {
        super(entityInformation, em);
        this.em = em;
    }

    /* (non-Javadoc)
     * <p>Title: rollback</p>
     * <p>Description: 事务回滚</p>
     * @see com.baihui.core.repository.BaseJpaRepository#rollback()
     */
    @Override
    public void rollback(){
        em.getTransaction().rollback();
    }

    /* (non-Javadoc)
    * <p>Title: saveObject</p>
    * <p>Description: 数据保存</p>
    * @param Object
    * @return
    * @see com.baihui.core.repository.BaseJpaRepository#saveObject(java.lang.Object)
    */
    @Override
    public Object saveObject(Object entity) {
        return  em.merge(entity);
    }

    /**
     * @Description: 查询：根据对象类型和主键
     * @param entityClass
     * @param primaryKey
     * @return
     * @return Object
     * @throws
     * @author feifei.liu
     * @date 2016年8月14日 下午4:06:56
     */
    public Object findOne(Class<?> entityClass, Object primaryKey) {
        return em.find(entityClass, primaryKey);
    }

    /* (non-Javadoc)
    * <p>Title: findAll</p>
    * <p>Description: 根据HQL语句获取查询结果集合</p>
    * @param queryString
    * @return
    * @see com.baihui.core.repository.BaseJpaRepository#findAll(java.lang.String)
    */
    @SuppressWarnings({ "rawtypes" })
    @Override
    public List findAll(String queryString) {
        return em.createQuery(queryString).getResultList();
    }
    /* (non-Javadoc)
    * <p>Title: findBySql</p>
    * <p>Description: 根据SQL语句获取查询结果集合</p>
    * @param sqlString
    * @return
    * @see com.baihui.core.repository.BaseJpaRepository#findBySql(java.lang.String)
    */
    @SuppressWarnings("rawtypes")
    @Override
    public List findBySql(String sqlString) {
        Query query=em.createNativeQuery(sqlString);
        return query.getResultList();
    }

    /* (non-Javadoc)
    * <p>Title: findBySql</p>
    * <p>Description: 根据SQL语句查询数据，并返回计数</p>
    * @param sqlString
    * @param start
    * @param length
    * @return
    * @see com.baihui.core.repository.BaseJpaRepository#findBySql(java.lang.String, int, int)
    */
    @Override
    public Map<QueryType, Object> findBySql(String sqlString, int start, int length){
        Map<QueryType, Object> resultMap=new LinkedHashMap<>();
        //查询数据
        Query query=em.createNativeQuery(sqlString);
        query.setFirstResult(start).setMaxResults(length);
        List data = this.findBySql(sqlString+" limit "+start+","+length);
        resultMap.put(QueryType.total, data.size()+start+length);
        //统计总数
        String fromSql = sqlString.substring(sqlString.indexOf("from", 0));
        boolean matches = Pattern.compile("^from\\s+(s_|bh_settlement|bh_basic_unit_group|bh_attention_rule).*", Pattern.CASE_INSENSITIVE).matcher(fromSql).find();
        System.err.println("后台模块表：："+matches);
        if(matches){
            String countSQL="select count(*) "+fromSql;
            if(sqlString.indexOf("order by")!=-1) countSQL="select count(*) "+sqlString.substring(sqlString.indexOf("from", 0),sqlString.indexOf("order by", 0));
            BigInteger total=(BigInteger) em.createNativeQuery(countSQL).getResultList().get(0);
            resultMap.put(QueryType.total, total);
        }else{
            resultMap.put(QueryType.total, data.size()+start+length);
        }
        resultMap.put(QueryType.data, data);
//		resultMap.put(QueryType.data, query.getResultList());
        return resultMap;
    }
    /* (non-Javadoc)
    * <p>Title: findBySql</p>
    * <p>Description: 根据SQL语句、实体类获取查询结果集合</p>
    * @param sqlString
    * @param resultClass
    * @return
    * @see com.baihui.core.repository.BaseJpaRepository#findBySql(java.lang.String, java.lang.Class)
    */
    @SuppressWarnings("rawtypes")
    @Override
    public List findBySql(String sqlString, Class resultClass){
        Query query=em.createNativeQuery(sqlString, resultClass);
        return query.getResultList();
    }

    /* (non-Javadoc)
    * <p>Title: findBySql</p>
    * <p>Description:  根据SQL语句、resultSetMapping获取查询结果集合</p>
    * @param sqlString
    * @param resultSetMapping
    * @return
    * @see com.baihui.core.repository.BaseJpaRepository#findBySql(java.lang.String, java.lang.String)
    */
    @SuppressWarnings("rawtypes")
    @Override
    public List findBySql(String sqlString,String resultSetMapping){
        Query query=em.createNativeQuery(sqlString, resultSetMapping);
        return query.getResultList();
    }

    /* (non-Javadoc)
    * <p>Title: findAll</p>
    * <p>Description: 分页-HQL语句</p>
    * @param queryString
    * @param pageable
    * @return
    * @see com.baihui.core.repository.BaseJpaRepository#findAll(java.lang.String, org.springframework.data.domain.Pageable)
    */
    @SuppressWarnings("unchecked")
    @Override
    public Page<T> findAll(String queryString, Pageable pageable){
        int pageSize=pageable.getPageSize();
        int pageNum=pageable.getPageNumber();
        int startIndex=pageNum*pageSize;
        Query query=em.createQuery(queryString);
        long total=(long) em.createQuery("select count(*) "+queryString.substring(queryString.indexOf("from"))).getResultList().get(0);
        query.setFirstResult(startIndex).setMaxResults(pageSize);
        List<T> content=query.getResultList();
        return new PageImpl<T>(content, pageable, total);
    }

    /* (non-Javadoc)
    * <p>Title: clear</p>
    * <p>Description: </p>
    * @see com.baihui.core.repository.BaseJpaRepository#clear()
    */
    @Override
    public void clear() {
        em.clear();
    }

    public List<T> findAll(String queryString, Pageable pageable, Specification<T> spec){
        return null;
    }

    /**
     * @Description: 执行SQL语句返回Query对象
     * @param sqlString
     * @return
     * @return Query
     * @throws
     * @author feifei.liu
     * @date 2016年6月2日 下午1:49:07
     */
    public Query createNativeQuery(String sqlString) {
        return em.createNativeQuery(sqlString);
    }

    /**
     * @Description: 执行SQL
     * @param sqlString
     * @param objects
     * @return int
     * @throws
     * @author chong.cheng
     * @date 2017年5月12日 下午12:08:21
     */
    public int execNativeQuery(String sqlString,Object...objects){
        Query query = em.createNativeQuery(sqlString);
        if(objects!=null&&objects.length>0){
            for(int i=0;i<objects.length;i++){
                query.setParameter(i+1,objects[i]);
            }
        }
        return query.executeUpdate();
    }

    /**
     * @Description: 执行SQL语句
     * @param sqlString
     * @return
     * @return int
     * @throws
     * @author feifei.liu
     * @date 2015年9月21日 上午9:44:53
     */
    @Override
    public int execute(String sqlString){
        Query query=em.createNativeQuery(sqlString);
        return query.executeUpdate();
    }
    /**
     * @Description: 执行HQL更新语句
     * @param updateQuery
     * @return
     * @return int
     * @throws
     * @author feifei.liu
     * @date 2015年10月10日 下午12:01:51
     */
    @Override
    public int updateQuery(String updateQuery){
        Query query=em.createQuery(updateQuery);
        return query.executeUpdate();
    }
    /**
     * @Description: 存储过程调用
     * @param procedureName
     * @return
     * @return StoredProcedureQuery
     * @throws
     * @author feifei.liu
     * @date 2016年6月1日 下午9:23:18
     */
    public StoredProcedureQuery createStoredProcedureQuery(String procedureName){
        return em.createStoredProcedureQuery(procedureName);
    }
    /**
     * ClassName: QueryType
     * @Description: 查询类型枚举
     * @author feifei.liu
     * @date 2015年9月21日 上午10:06:37
     */

    /**
     *
     * @param example
     * @param pageable
     * @return
     * @author feifei.liu
     * @date 2017年4月14日 下午22:52:01
     */
    @Override
    public Page<T> findByAuto(T example, Pageable pageable) {
        return findAll(CustomSpecification.byAuto(em, example), pageable);
    }
}
