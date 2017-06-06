function reloadView(tableName){
    $.ajax({
        type:"post",url:"./view/viewLoadName",async:false,data:{tableName:tableName},dataType:"json",
        success:function(data){

            var nvList = eval(data).nvList;//最近访问
            var myList = eval(data).myList;//我的
            var srList = eval(data).srList;//分享的
            var dfList = eval(data).dfList;//默认的
            var ofList = eval(data).ofList;//出厂

            var lastViewId = eval(data).lastViewId;
            var isOper = eval(data).isOper;

            if(lastViewId=="view_clue_con"){
                $("#view_edit").unbind("click");
                $("#view_edit").attr("style","color:#CCC;cursor:text");
                $("#view_edit").attr("onclick","null");
            }
            //是否可删除 编辑
            if(isOper=="NO"){
                $("#view_delete").unbind("click");
                $("#view_delete").attr("style","color:#CCC;cursor:text");
                $("#view_delete").attr("onclick","null");

                $("#view_edit").unbind("click");
                $("#view_edit").attr("style","color:#CCC;cursor:text");
                $("#view_edit").attr("onclick","null");
            }

            if(isOper=="OF"){
                $("#view_delete").unbind("click");
                $("#view_delete").attr("style","color:#CCC;cursor:text");
                $("#view_delete").attr("onclick","null");

                $("#view_copy").unbind("click");
                $("#view_copy").attr("style","color:#CCC;cursor:text");
                $("#view_copy").attr("onclick","null");
            }

            //无查看视图记录 默认显示全部
            if(lastViewId==""){
                $("span[class='all-select-in']").html("<p style='display:none;'></p>所有");

                $("#view_copy").unbind("click");
                $("#view_copy").attr("style","color:#CCC;cursor:text");
                $("#view_copy").attr("onclick","null");


                $("#view_customer_all").find("span").attr("class","select-ative");
            }

            if((null==myList || ""==myList) && (null==srList || ""==srList)){
                $("select[id='view_id']").append("<option value='' style='font-weight:bold;font-style:italic;font-family:宋体;cursor:default;'>所有</option>");
                $("#view_copy").unbind("click");
                $("#view_copy").attr("style","color:#CCC;cursor:text");
                $("#view_copy").attr("onclick","null");
                return;
            }
            //最近访问的
            if(nvList.length > 1){
                for(var m in nvList){
                    var v_id = nvList[m]['id'];
                    var v_name = nvList[m]['name'];
                    if(undefined!=v_name && ""!=v_name) {
                        if (m == 0) {
                            $("ul[id='sel_ul_id']").append("<li><b>" + v_name + "</b></li>");

                        } else {
                            if (lastViewId == v_id) {
                                $("ul[id='sel_ul_id']").append("<li onclick='checkedLi(this);'><span class='select-ative'><p style='display:none;'>" + v_id + "</p>" + v_name + "</span></li>");
                                $("span[class='all-select-in']").html("<p style='display:none;'>" + v_id + "</p>" + v_name + "");

                            } else {
                                $("ul[id='sel_ul_id']").append("<li onclick='checkedLi(this);'><span><p style='display:none;'>" + v_id + "</p>" + v_name + "</span></li>");
                            }
                        }
                    }
                }
            }else{
                var v_id = nvList[0]['id'];
                var v_name = nvList[0]['name'];
                $("ul[id='sel_ul_id']").append("<li><b>"+v_name+"</b></li>");
               /* $("ul[id='sel_ul_id']").append("<li><span>-- 暂无 --</span></li>");*/
            }

            //我创建的
            if(myList.length > 1){
                for(var m in myList){
                    var v_id = myList[m]['id'];
                    var v_name = myList[m]['name'];
                    if(undefined!=v_name && ""!=v_name) {
                        if (m == 0) {
                            $("ul[id='sel_ul_id']").append("<li><b>" + v_name + "</b></li>");

                        } else {
                            if (lastViewId == v_id) {
                                $("ul[id='sel_ul_id']").append("<li onclick='checkedLi(this);'><span class='select-ative'><p style='display:none;'>" + v_id + "</p>" + v_name + "</span></li>");
                                $("span[class='all-select-in']").html("<p style='display:none;'>" + v_id + "</p>" + v_name + "");

                            } else {
                                $("ul[id='sel_ul_id']").append("<li onclick='checkedLi(this);'><span><p style='display:none;'>" + v_id + "</p>" + v_name + "</span></li>");
                            }
                        }
                    }
                }
            }else{
                var v_id = myList[0]['id'];
                var v_name = myList[0]['name'];
                $("ul[id='sel_ul_id']").append("<li><b>"+v_name+"</b></li>");
               /* $("ul[id='sel_ul_id']").append("<li><span>-- 暂无 --</span></li>");*/
            }

            //分享给我的
            if(srList.length > 1){
                for(var m in srList){
                    var v_id = srList[m]['id'];
                    var v_name = srList[m]['name'];
                    if(undefined!=v_name && ""!=v_name) {
                        if (m == 0) {
                            $("ul[id='sel_ul_id']").append("<li><b>" + v_name + "</b></li>");

                        } else {
                            if (lastViewId == v_id) {
                                $("ul[id='sel_ul_id']").append("<li onclick='checkedLi(this);'><span class='select-ative'><p style='display:none;'>" + v_id + "</p>" + v_name + "</span></li>");
                                $("span[class='all-select-in']").html("<p style='display:none;'>" + v_id + "</p>" + v_name + "");

                            } else {
                                $("ul[id='sel_ul_id']").append("<li onclick='checkedLi(this);'><span><p style='display:none;'>" + v_id + "</p>" + v_name + "</span></li>");
                            }
                        }
                    }
                }
            }else{
                var v_id = srList[0]['id'];
                var v_name = srList[0]['name'];
                $("ul[id='sel_ul_id']").append("<li><b>"+v_name+"</b></li>");
               /* $("ul[id='sel_ul_id']").append("<li><span>-- 暂无 --</span></li>");*/
            }


            //自定义
            if(dfList.length > 1){
                for(var m in dfList){
                    var v_id = dfList[m]['id'];
                    var v_name = dfList[m]['name'];
                    if(undefined!=v_name && ""!=v_name) {
                        if (m == 0) {
                            $("ul[id='sel_ul_id']").append("<li><b>" + v_name + "</b></li>");

                        } else {
                            if (lastViewId == v_id) {
                                $("ul[id='sel_ul_id']").append("<li onclick='checkedLi(this);'><span class='select-ative'><p style='display:none;'>" + v_id + "</p>" + v_name + "</span></li>");
                                $("span[class='all-select-in']").html("<p style='display:none;'>" + v_id + "</p>" + v_name + "");

                            } else {
                                $("ul[id='sel_ul_id']").append("<li onclick='checkedLi(this);'><span><p style='display:none;'>" + v_id + "</p>" + v_name + "</span></li>");
                            }
                        }
                    }
                }
            }else{
                var v_id = dfList[0]['id'];
                var v_name = dfList[0]['name'];
                $("ul[id='sel_ul_id']").append("<li><b>"+v_name+"</b></li>");
              /*  $("ul[id='sel_ul_id']").append("<li><span>-- 暂无 --</span></li>");*/
            }

            //出厂
            if(ofList!=null&&ofList.length > 1){
                for(var m in ofList){
                    var v_id = ofList[m]['id'];
                    var v_name = ofList[m]['name'];
                    if(undefined!=v_name && ""!=v_name && "view_clue_con" != v_id) {
                        if (m == 0) {
                            $("ul[id='sel_ul_id']").append("<li><b>" + v_name + "</b></li>");

                        } else {
                            if (lastViewId == v_id) {
                                $("ul[id='sel_ul_id']").append("<li id='" + v_id + "' onclick='checkedLi(this);'><span class='select-ative'><p  style='display:none;'>" + v_id + "</p>" + v_name + "</span></li>");
                                $("span[class='all-select-in']").html("<p style='display:none;'>" + v_id + "</p>" + v_name + "");

                            } else {
                                if (v_id.indexOf("_all") != -1 && lastViewId == "") {
                                    $("ul[id='sel_ul_id']").append("<li id='" + v_id + "' onclick='checkedLi(this);'><span class='select-ative'><p  style='display:none;'>" + v_id + "</p>" + v_name + "</span></li>");
                                } else {
                                    $("ul[id='sel_ul_id']").append("<li id='" + v_id + "' onclick='checkedLi(this);'><span><p  style='display:none;'>" + v_id + "</p>" + v_name + "</span></li>");
                                }

                            }
                        }
                    }
                }
            }else{
                try {
                    var v_id = ofList[0]['id'];
                    var v_name = ofList[0]['name'];
                    $("ul[id='sel_ul_id']").append("<li><b>" + v_name + "</b></li>");
                   /* $("ul[id='sel_ul_id']").append("<li><span>-- 暂无 --</span></li>");*/
                } catch (e) {
                }
            }


        }
    });
}

function seachBySql(){
    tableApib.ajax.reload();
}


//<#-- 视图  显示隐藏可选视图名称-->
function showSelect(obj){
    if(!$("div[id='select_id']").is(":visible")){
        $("#select_id").slideDown(200);
    }else{
        $("#select_id").slideUp(200);
    }

}

function checkedLi(obj){

    $(obj).closest("ul").find("li").each(function(){
        $(this).find("span").attr("class","");
    });

    $(obj).find("span").attr("class","select-ative");
    $("span[class='all-select-in']").html($(obj).find("span").html());
    var functionID =  $("input[type=hidden][id='functionId']").val();
    var tableName =  $("input[type=hidden][id='tableName']").val();
    var select_viewId =  $("span[class='all-select-in']").find("p").html();

    $.ajax({
        type:"post",url:"./view/lastSawView",async:false,data:{viewId:select_viewId,tableName:tableName},dataType:"text",
        success:function(data){
            if(!data.length){
                alert("此视图已被删除或已无权访问！");
            }else{

                //$("#searchSql").val(data);
                //tableApib.ajax.reload();
                $("#select_id").slideUp(200);
            }
        }
    });

    var URL="./dallocationProtocol/queryListForDall1";
    var linkModule = linkModuleMap.get($("#nameSpace").val());
    var functionID = linkModule["function.id"];
    //市场活动下线索等关联模块批量发短信/发邮件切换视图查询处理：新增两个参数
    var ids           = $("#send_Ids").val();
    var member_Status = $("#member_Status").val();
    if(ids==undefined||ids==null){
    	ids = "";
    }
    if(member_Status==undefined||member_Status==null){
    	member_Status = "";
    }
    ajaxDisplay(URL,$("#nameSpace").val(), "#dal_local",{"functionID":functionID,"ids":ids,"member_Status":member_Status});
    tableApib.ajax.reload();
    /* var linkhref = './welcome?module='+linkModule["actionName"]+'&opName='+linkModule["opName"];
    for(var i in linkModule) {
        if(i!="opName") linkhref+='&'+i+"="+linkModule[i];
    }
    historyPush("百会 CRM-分配",linkhref);*/



}
//手动搜索条件
function reflushPage(obj){
    //$("#searchSql").val("");
    //$("span[id='span_check_view']").removeAttr("onclick");
    if(obj.prop('checked')){
        $("div[id='view_con_div']").show();//非手动搜索条件 隐藏搜索条件
        $("#searchbtn").show();
        $("#searchbtncancel").show();
        tableApib.ajax.reload();
    }else{
        cancelSeachBySql();
    }


}

//选择自定义视图
function cancelSeachBySql(){
    manualReaload();
    $("#chaxuntype").prop("checked","");
    var functionID =  $("input[type=hidden][id='functionId']").val();
    var tableName =  $("input[type=hidden][id='tableName']").val();
    var select_viewId =  $("span[class='all-select-in']").find("p").html();
    $.ajax({
        type:"post",url:"./view/lastSawView",async:false,data:{viewId:select_viewId,tableName:tableName},dataType:"text",
        success:function(data){
            $("#searchSql").val(data);
            tableApib.ajax.reload();
        }
    });
    $("div[id='view_con_div']").hide();
    $("#searchbtn").hide();
    $("#searchbtncancel").hide();

}