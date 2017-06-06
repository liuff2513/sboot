
/**
 * 模块与附件版块切换
 */
$("#module_lump").on("click",function(){//切换到主要模块版块

    var searchVal = $("input[id='search_results_key']").val();
    $("input[id='search_val']").val(searchVal);

    var param = {
        topSearchVal:searchVal,
        topSearchFun:$("#search_fun").val(),
        topSearchFunId:$("#search_fun_id").val(),
        size:$("#search_size").val(),
        number:$("#search_number").val()
    }
    ajaxDisplay("./search/searchList","", contentMain,param); //提交搜索
    //$("div[id='load_div']").show();//显示加载提示
    Overlayer.show();
});


$("#file_lump").on("click", function () {//切换到附件版块

    var searchVal = $("input[id='search_results_key']").val();
    $("input[id='search_val']").val(searchVal);
    $("div[id='load_file_div']").show();//显示加载提示
    var param = {
        topSearchVal:searchVal,
        topSearchFun:$("#search_fun").val(),
        topSearchFunId:$("#search_fun_id").val(),
        size:$("#search_size").val(),
        number:$("#search_number").val()
    }
    ajaxDisplay("./search/searchFileList","", contentMain,param); //提交搜索
    //$("div[id='load_file_div']").show();//显示加载提示
    Overlayer.show();

});


function search(val){
    if(''==val || val.length<1){ //搜索词为空，以上次搜索词进行搜索
        //搜索词
        val = $("input[id='search_results_key']").val();
        if(!val){
            alert("搜索关键词不能为空！");
            return;
        }
    }
    var URL = "";
    if("fileType"==$("input[id='scho_search_type']").val()){
        URL = "./search/searchFileList";
    }else{
        URL = "./search/searchList";
    }
    $("input[type='hidden'][id='search_val']").val(val);//隐藏域赋搜索值
    $("input[id='two-search']").val(val);
    ajaxDisplay(URL,"", contentMain,{"topSearchVal":val}); //提交搜索
    Overlayer.show();
}

/**
 * 点击二级搜索
 */
$("#search_two_id").on("click", function () {
    var two_val = $("#two-search").val();
    search(two_val);
});
$("#two-search").keydown(function(event){
    if(event.which == "13"){
        var two_val = $("#two-search").val();
        search(two_val);
    }

});


/**
 * 模块选择事件
 * @param id -- 被选择模块中 table Id
 */
function checkModule(id){

    //change模块选择状态
    $("div[id='module_lump_check_div']").find("a").each(function(){
        $(this).attr("class","");
        if($(this).attr("id").split("|")[0]==id.split("|")[0]){
            $(this).attr("class","search-tbbg-active");
        }
    });

    $("div[id='table_div']").find("table").each(function(){
        $(this).hide();
    });
    $("div[id='table_div']").find("table[id='"+id.split("|")[0]+"']").show();
    //模块隐藏域中记录当前选择模块的 模块表名 ID
    $("input[type=hidden][id='search_fun']").val(id.split("|")[0]);
    $("input[type=hidden][id='search_fun_id']").val(id.split("|")[1]);

    //搜索词
    var searchVal = $("input[id='two-search']").val();
    if(searchVal.length<=0){
        alert("搜索关键词不能为空！");
        return;
    }

    //搜索词未发生变化，则取隐藏域
    /*if($("input[id='search_results_key']").val()==searchVal){
        //TODO Ajax 处理获取数据追加 table 便于从隐藏域中加载table，减少向服务器的请求任务
        if($("div[id='table_div']").find("table[id='"+id.split("|")[0]+"']").length<=0){

        }
    }

    else{
        $("input[id='search_val']").val(searchVal);
        $("#searchId").submit();

        $("div[id='load_div']").show();//显示加载提示
        $("div[id='table_div']").hide();
    }*/

    $("input[id='search_val']").val(searchVal);
    var param = {
        topSearchVal:searchVal,
        topSearchFun:$("#search_fun").val(),
        topSearchFunId:$("#search_fun_id").val(),
        size:$("#search_size").val(),
        number:$("#search_number").val()
    }
    ajaxDisplay("./search/searchList","", contentMain,param); //提交搜索
    //$("div[id='load_div']").show();//显示加载提示
    //$("div[id='table_div']").hide();
    Overlayer.show();


}

//附件进入详情
function fileDataInfo(elm){
    var dataId = $(elm).closest("li").find("input[id='file_dataId']").val();
    var moduleId = $(elm).closest("li").find("input[id='file_moduleId']").val();
    datainfo(dataId,moduleId);
}

//模块进入详情
function getInfo(elm){
    var dataId = $(elm).find("td:eq(0)").html();
    var moduleId = "";
    $("div[id='module_lump_check_div']").find("a").each(function(){
        if($(this).attr("class")=="search-tbbg-active"){
            moduleId = $(this).attr("id").split("|")[1];
        }
    });
    datainfo(dataId,moduleId);
}

function datainfo(dataId,moduleId){
//获取跳到详情的所需信息
    var nameSpace = "";
    var actionName = "";
    var name = "";
    var entityClass = "";
    var entityName = "";
    var tableName = "";
    var id = "";

    $.ajax({
        type: "post", url: "./fieldHistoryLog/getViewInfo", cache: true, async: false,
        data: {moduleId: moduleId}, dataType: "json",
        success: succ_callback,
        beforeSend: function () {//do something...
        },
        complete: function () {//do something...
        },
        error: function () {//do something...
        }
    });

    function succ_callback(data) {
        nameSpace = data.nameSpace;
        actionName = data.actionName;
        name = data.name;
        entityClass = data.entityClass;
        entityName = data.entityName;
        tableName = data.tableName;
        id = data.id;
    }
    //进入详情
    //var URL="./"+nameSpace+"/"+nameSpace+"View";
    var URL="./welcome";
    /*openPostIframe(URL,nameSpace+"commonListDiv",{
        "nameSpace" : nameSpace,
        "actionName" : actionName,
        "function.id" : moduleId,
        "function.name" : name,
        "function.entityClass" : entityClass,
        "function.entityName" : entityName,
        "function.tableName" : tableName,
        "entityId" : dataId,
        "opName" : "view",
        "type" : "1",
    });*/

    var param = {
        "module" : nameSpace,
        "entityId" : dataId,
        "opName" : "view",
        "type" : "1"
    }
    //ajaxDisplay(URL,"", contentMain,param); //提交搜索

    var strParam = "";
    for(var i in param) {
        strParam += "&"+i+"="+param[i];
    }

    var URL1=URL+"?"+strParam.substring(1);
    window.open(URL1,'1','width=1560,height=1560 ,resizable=1,scrollbars=1,left=50,top=50,location=no');
}


$('body').on('click', '#down_load_a', function(){
    downLoad($(this));
});
//下载文件
function downLoad(ele){
    var fileName = $(ele).closest("li").find("input[id='file_name']").val();
    var fileUrl = $(ele).closest("li").find("input[id='file_url']").val();

    var form=$("<form>");//定义一个form表单
    form.attr("style","display:none");
    form.attr("target","");
    form.attr("method","post");
    form.attr("action","./search/filedownload");
    var input1=$("<input>");
    input1.attr("type","hidden");
    input1.attr("name","filename");
    input1.attr("value",fileName);
    var input2=$("<input>");
    input2.attr("type","hidden");
    input2.attr("name","filepath");
    input2.attr("value",fileUrl);
    $("body").append(form);//将表单放置在web中
    form.append(input1);
    form.append(input2);
    form.submit();//表单提交
}

/**
 * 进入搜索设置
 */
$("#search_set").on("click",function(){
    var nameSpace = "basicDetail";
    //ajaxDisplay("./searchDetail/searchDetailList",nameSpace, contentMain,{"nameSpace":nameSpace,"actionName":nameSpace}); //提交搜索


    var URL1="./searchDetail/searchDetailList?nameSpace="+nameSpace+"&actionName="+nameSpace;
    window.open(URL1,'1','width=1260,height=650 ,resizable=1,scrollbars=1,left=180,top=90,location=no');

});
