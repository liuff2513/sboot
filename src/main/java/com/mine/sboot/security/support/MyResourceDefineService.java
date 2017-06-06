package com.mine.sboot.security.support;

import com.mine.sboot.core.jpa.support.BaseJpaService;
import com.mine.sboot.core.utils.str.StringUtil;
import com.mine.sboot.system.function.entity.Function;
import com.mine.sboot.system.operation.entity.Operation;
import com.mine.sboot.system.role.entity.Role;
import com.mine.sboot.system.role.entity.RolePermission;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * ClassName: MyResourceDefineService
 * Description: //TODO
 * Created by feifei.liu on 2017/6/5 19:01
 **/
@Component
@Transactional
public class MyResourceDefineService extends BaseJpaService<Role, String> {
     /**
     * @Description: 隐藏、显示菜单时生成security权限
     * @param projectId
     * @return void
     * @author lizs
     * @date 2016年8月4日 下午2:04:56
            */
    public Map<String, Collection<ConfigAttribute>> loadResourceDefine(String projectId){

        Map<String, Map<String, Collection<ConfigAttribute>>> proPerSecurityMap = new HashMap();
        Map<String, Function> functionMap = new HashMap();
        Map<String, Operation> operationMap = new HashMap();
        Map<String, Set<RolePermission>> rolePermissionMap = new HashMap();
//        functionMap = functionService.getProFunctionMap(projectId);
//        operationMap = operationService.getOperationMap();
//        rolePermissionMap = rolePermisssionService.getProRolePermissionMap(projectId);
//        functionMap = JedisPermTool.getInstance().getProFunctionMap(projectId, functionDao);
//        operationMap = JedisPermTool.getInstance().getOperationMap(operationDao);
//        rolePermissionMap = JedisPermTool.getInstance().getProRolePermissionMap(projectId, rolePermissionDao);

        Map<String, Collection<ConfigAttribute>> permissionMap = new HashMap<>();
        for(Map.Entry<String, Set<RolePermission>> entryRoleMap:rolePermissionMap.entrySet()){
            ConfigAttribute configAttribute = new SecurityConfig(entryRoleMap.getKey());
            Set<RolePermission> permissions = entryRoleMap.getValue();
            if(permissions!=null&&permissions.size() > 0){
                for(RolePermission rolePerm : permissions){
                    if(functionMap.get(rolePerm.getFunctionId()) != null && operationMap.get(rolePerm.getOperationId()) != null){
                        Collection<ConfigAttribute> configAttributes = new HashSet<>();
                        if(functionMap.get(rolePerm.getFunctionId()) != null){
                            Function func = functionMap.get(rolePerm.getFunctionId());
                            if(func.getState() == 1){
                                if(operationMap.get(rolePerm.getOperationId()) != null){
                                    Operation operation = operationMap.get(rolePerm.getOperationId());
                                    String abbr = operation.getAbbr();
                                    if(abbr.equals("view")){
                                        if(permissionMap.get("/"+func.getLink())!=null &&
                                                permissionMap.get("/"+func.getNameSpace()+"/"+func.getActionName()+StringUtil.captureName(abbr))!=null)
                                            configAttributes = permissionMap.get("/"+func.getLink());
                                        configAttributes.add(configAttribute);
                                        permissionMap.put("/"+func.getLink(), configAttributes);
                                        permissionMap.put("/"+func.getNameSpace()+"/"+func.getActionName()+StringUtil.captureName(abbr), configAttributes);
                                        permissionMap = addExtraPermission(permissionMap,configAttributes,func,abbr);
                                    }else{
                                        if(permissionMap.get("/"+func.getNameSpace()+"/"+func.getActionName()+StringUtil.captureName(abbr))!=null &&
                                                permissionMap.get("/"+func.getNameSpace()+"/"+func.getActionName()+StringUtil.captureName(abbr)+"Do")!=null)
                                            configAttributes = permissionMap.get("/"+func.getNameSpace()+"/"+func.getActionName()+ StringUtil.captureName(abbr));
                                        configAttributes.add(configAttribute);
                                        permissionMap.put("/"+func.getNameSpace()+"/"+func.getActionName()+StringUtil.captureName(abbr), configAttributes);
                                        permissionMap.put("/"+func.getNameSpace()+"/"+func.getActionName()+StringUtil.captureName(abbr)+"Do", configAttributes);
                                        permissionMap = addExtraPermission(permissionMap,configAttributes,func,abbr);
                                    }
                                }
                            }
                        }
                    }else{
                        //新增管理公告
                        if("2".equals(rolePerm.getFunctionId())&&"2".equals(rolePerm.getOperationId())){
                            //公告新增
                            permissionMap = addExtraPermURL(entryRoleMap.getKey(), permissionMap,"/qixinNotice/qixinNoticeCreate");
                            permissionMap = addExtraPermURL(entryRoleMap.getKey(), permissionMap,"/qixinNotice/qixinNoticeCreateDo");
                            //公告删除
                            permissionMap = addExtraPermURL(entryRoleMap.getKey(), permissionMap,"/qixinNotice/qixinNoticeDelete");
                            //公告修改
                            permissionMap = addExtraPermURL(entryRoleMap.getKey(), permissionMap,"/qixinNotice/qixinNoticeUpdate");
                        }
                    }
                }
            }else{
                System.out.println("角色权限为空：：："+projectId+"======RolePerm:::"+permissions);
            }
        }
//        redisCommands.hSet("proPerSecurityMap".getBytes(), projectId.getBytes(), SerializableUtil.serialize(permissionMap));
        return permissionMap;
    }

    private Map<String, Collection<ConfigAttribute>> addExtraPermURL(String roleId,Map<String, Collection<ConfigAttribute>> permissionMap,String url) {
        Collection<ConfigAttribute> configAttributes = new HashSet<ConfigAttribute>();
        if(permissionMap.get(url)!=null){
            configAttributes = permissionMap.get(url);
        }
        configAttributes.add(new SecurityConfig(roleId));
        permissionMap.put(url, configAttributes);
        return permissionMap;
    }

    private Map<String, Collection<ConfigAttribute>> addExtraPermission(Map<String, Collection<ConfigAttribute>> permissionMap,
                                                                        Collection<ConfigAttribute> configAttributes, Function func, String abbr) {
        String listLink =null;//格式："/"+function.getLink()
        String nameSpaceActionName =null;//格式："/"+func.getNameSpace()+"/"+func.getActionName()
        if("statement".equals(func.getAlias())){//报表
            //1添加计划报表
            listLink="/reportFormFolder/reportFormFolderList";
            nameSpaceActionName="/reportFormFolder/reportFormFolder";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            //2.添加报表文件夹
            listLink="/reportFormPlan/reportFormPlanList";
            nameSpaceActionName="/reportFormPlan/reportFormPlan";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
        }
        if("webform".equals(func.getAlias())){//web表单
            //1表单自动响应规则
            listLink="/webformRule/webformRuleList";
            nameSpaceActionName="/webformRule/webformRule";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            //2.表单自动响应规则条目
            listLink="/webformRule/webformRuleSubList";
            nameSpaceActionName="/webformRule/webformRuleSub";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
        }
        if("qixinMessage".equals(func.getAlias())){//消息与公告
            //1.预警
            listLink="/qixinWaring/qixinWaringList";
            nameSpaceActionName="/qixinWaring/qixinWaring";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            //2.关注
            listLink="/qixinAttentionField/qixinAttentionFieldList";
            nameSpaceActionName="/qixinAttentionField/qixinAttentionField";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            //3.审批
            listLink="/qixinApprove/qixinApproveList";
            nameSpaceActionName="/qixinApprove/qixinApproveList";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            //4.公告
            listLink="/qixinNotice/qixinNoticeList";
            nameSpaceActionName="/qixinNotice/qixinNotice";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            listLink="";//app
            nameSpaceActionName="/qixinNotice/qixinNoticeApp";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
        }
        if("qixinWorkReport".equals(func.getAlias())){//工作报告（转发）
            listLink="/qixinWorkReport/qixinWorkReportTran";
            nameSpaceActionName="";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            listLink="/orgGroupUser/workReportOrgGroupUserList";
            nameSpaceActionName="";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
        }
        if("sharingSetting".equals(func.getAlias())){//共享规则
            listLink="";
            nameSpaceActionName="/sharingSetting/sharingSettingRule";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
        }
        if("ewsMailTemplate".equals(func.getAlias())){//邮件模板
            listLink="";
            nameSpaceActionName="/mailFolder/mailFolder";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
        }
        if("ewsShortMessageTemplate".equals(func.getAlias())){//短信模板
            listLink="";
            nameSpaceActionName="/shortMessageFolder/shortMessageFolder";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
        }
        if("concernRule".equals(func.getAlias())){//自动关注
            if("update".equals(abbr)){
                listLink="/attentionRule/attentionRuleMake";
                nameSpaceActionName="";
                permissionMap = addUrlToPermisionMap("view",listLink,nameSpaceActionName,configAttributes,permissionMap);
            }
        }
        if("ewsAutomation".equals(func.getAlias())){//自动化

            listLink="/ewsMail/ewsMailList";//自动化对应的邮件
            nameSpaceActionName="/ewsMail/ewsMail";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);

            listLink="/ewsMessage/ewsMessageList";//自动化对应的消息
            nameSpaceActionName="/ewsMessage/ewsMessage";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);

            listLink="/ewsTask/ewsTaskList";//自动化对应的任务
            nameSpaceActionName="/ewsTask/ewsTask";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);

            listLink="/ewsFieldupdate/ewsFieldupdateList";//自动化对应的字段更新
            nameSpaceActionName="/ewsFieldupdate/ewsFieldupdate";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);

            listLink="";//自动化对应的转换
            nameSpaceActionName="/ewsTransfor/ewsTransfor";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);

            listLink="/ewsCallback/ewsCallbackList";//自动化对应的回访
            nameSpaceActionName="/ewsCallback/ewsCallback";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);

            listLink="/ewsShortMessage/ewsShortMessageList";//自动化对应的短信
            nameSpaceActionName="/ewsShortMessage/ewsShortMessage";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);


        }
        if("model".equals(func.getAlias())){//审批+申请
			/*listLink="/apply/applyList";//
			nameSpaceActionName="/apply/apply";
			permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);*/
            listLink="/approval/approvalList";//
            nameSpaceActionName="/approval/approval";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
        }
        if("statisticalGraph".equals(func.getAlias())){//图表
            listLink="";//图表文件夹
            nameSpaceActionName="/chartFolder/chartFolder";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            listLink="/chartFlip/chartFlipList";//图表
            nameSpaceActionName="/chartFlip/chartFlip";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            listLink="/chartDashboard/chartDashboardList";//图表仪表盘
            nameSpaceActionName="/chartDashboard/chartDashboard";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
        }
        if("user".equals(func.getAlias())&&"create".equals(abbr)){//用户有新增，则有导入
            listLink="/import/userImportBefore";
            nameSpaceActionName = "";
            permissionMap = addUrlToPermisionMap("view",listLink,nameSpaceActionName,configAttributes,permissionMap);
            listLink="/import/userImport";
            permissionMap = addUrlToPermisionMap("view",listLink,nameSpaceActionName,configAttributes,permissionMap);
        }
        if("documentFile".equals(func.getAlias())){//文档管理

            if("create".equals(abbr)){
                listLink="";
                nameSpaceActionName="/documentFile/uploadFile";
                permissionMap = delUrlFromPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
                nameSpaceActionName="/documentFile/saveFile";
                permissionMap = delUrlFromPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
                nameSpaceActionName="/documentFile/copyToFolder";
                permissionMap = delUrlFromPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
                nameSpaceActionName="/documentFolder/saveFolder";
                permissionMap = delUrlFromPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            }

            if("delete".equals(abbr)){
                listLink="";
                nameSpaceActionName="/documentFile/rubbish";
                permissionMap = delUrlFromPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
                nameSpaceActionName="/documentFile/completed";
                permissionMap = delUrlFromPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
                nameSpaceActionName="/documentFolder/folder";
                permissionMap = delUrlFromPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            }

            if("update".equals(abbr)){
                listLink="";
                nameSpaceActionName="/documentFolder/folderName";
                permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
                nameSpaceActionName="/documentFile/editName";
                permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
                nameSpaceActionName="/documentFile/moveToFolder";
                permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
                nameSpaceActionName="/documentFile/restore";
                permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
                nameSpaceActionName = "/documentFolder/sharedFolder";
                permissionMap = delUrlFromPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            }

            listLink="/documentFile/typeForList";
            nameSpaceActionName = "/documentFile/documentFile";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            listLink="/documentFile/ownerForList";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            listLink="/documentFile/sharedForList";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            listLink="/documentFile/rubbishForList";
            permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            if("view".equals(abbr)){


                listLink="";
                nameSpaceActionName="/documentFile/downloadFile";
                permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
                nameSpaceActionName="/documentFile/batchDownload";
                permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
                nameSpaceActionName="/documentFolder/downloadFolder";
                permissionMap = addUrlToPermisionMap(abbr,listLink,nameSpaceActionName,configAttributes,permissionMap);
            }

        }

        return permissionMap;
    }

    private Map<String, Collection<ConfigAttribute>> addUrlToPermisionMap(String abbr, String listLink, String nameSpaceActionName,
                                                                          Collection<ConfigAttribute> configAttributes, Map<String, Collection<ConfigAttribute>> permissionMap) {
        if("view".equals(abbr)&&!StringUtil.empty(listLink)){
            permissionMap.put(listLink, configAttributes);
        }else if(("update".equals(abbr)||"create".equals(abbr)||"delete".equals(abbr))&&!StringUtil.empty(nameSpaceActionName)){
            permissionMap.put(nameSpaceActionName+StringUtil.captureName(abbr)+"Do", configAttributes);
        }
        if(!StringUtil.empty(nameSpaceActionName)){
            permissionMap.put(nameSpaceActionName+StringUtil.captureName(abbr), configAttributes);
        }

        return permissionMap;
    }

    private Map<String, Collection<ConfigAttribute>> delUrlFromPermisionMap(String abbr, String listLink,String nameSpaceActionName,
                                                                            Collection<ConfigAttribute> configAttributes,Map<String, Collection<ConfigAttribute>> permissionMap) {
        if("view".equals(abbr)&&!StringUtil.empty(listLink)){
            permissionMap.put(listLink, configAttributes);
        }else if(("update".equals(abbr)||"create".equals(abbr)||"delete".equals(abbr))&&!StringUtil.empty(nameSpaceActionName)){
            permissionMap.put(nameSpaceActionName+StringUtil.captureName(abbr)+"Do", configAttributes);
        }
        if(!StringUtil.empty(nameSpaceActionName)){
            permissionMap.put(nameSpaceActionName+StringUtil.captureName(abbr), configAttributes);
        }
        return permissionMap;
    }
}
