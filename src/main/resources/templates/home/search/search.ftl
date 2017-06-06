<#--<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <title>全局搜索</title>
    <script src="theme/js/jquery-2.1.1.min.js"></script>
    <script src="theme/js/bootstrap.min.js"></script>
</head>
<body class="gray-bg">-->


<script src="pages/home/search/search_specific.js" language="javascript" type="text/javascript"></script>
<div class="wrapper wrapper-content-indexsetup">
    <div class="panel">
        <div class="panel-heading">
            <div id="h1_keyword" class="khc-tab">
                <h1>查询结果</h1><input type="hidden" id="search_results_key" value="${topSearchVal?default('')}"/>
            </div>
        </div>
        <div class="panel-body">
            <div class="box-shadow-7" style="background:#fff;">
                <div class="set-content" style="border:none;">

                    <div class="search-head-all">
                        <div class="search-head-box">
                            <input id="two-search" value="${topSearchVal?default('')}" class="search-head-box-input" type="text" name="all-search" placeholder="请输入搜索关键词" onKeyUp='disposeUtil.limitlength(this,15);'>
                            <a id="search_two_id"><img src="theme/img/allsearch/all-search.png" /></a>
                        </div>
                        <a id="search_set"  class="search-settings">搜索设置</a>
                    </div>

                    <div class="search-head-con">

                        <!--查询列表-->
                        <div class="search-con-all">
                            <div class="search-con-menu">

                                <#if searchType?default('')=="moduleType">
                                    <a id="module_lump" onclick="moduleFun();" class="search-active">主要模块</a>
                                    <a id="file_lump" onclick="fileFun();">附件</a>
                                <#else >
                                    <a id="module_lump" onclick="moduleFun();">主要模块</a>
                                    <a id="file_lump" onclick="fileFun();" class="search-active">附件</a>

                                </#if>
                            </div>

                            <div id="file_lump_div" class="search-con-tab-01" <#if searchType?default('')=="moduleType">style="display: none;"<#else>style="display: block;"</#if>>
                            <#if files?exists>
                                <ul>
                                        <#list files as file>
                                            <li>
                                                <div class="search-box01">
                                                    <input id="file_url" type="hidden" value="${file.url?default('')}">
                                                    <input id="file_name" type="hidden" value="${file.fileName?default('')}">
                                                    <input id="file_module" type="hidden" value="${file.module?default('')}">
                                                    <input id="file_moduleId" type="hidden" value="${file.moduleId?default('')}">
                                                    <input id="file_dataId" type="hidden" value="${file.dataId?default('')}">
                                                    <p><i class="search-con-01"></i><span title="${file.oldFileName}">${file.oldFileName}</span></p>
                                                    <p><i class="search-con-02"></i><a  onclick="fileDataInfo(this);">${file.moduleName}</a></p>
                                                </div>
                                                <a id="down_load_a" class="search-con-tab-a"><i class="search-con-down"></i>下载</a>
                                            </li>
                                        </#list>

                                </ul>


                            <#else>
                                <!--无数据-->
                                    <div class="search-head-con-n" style="height:30px;">
                                        <img src="theme/img/allsearch/search-con-n.png" />
                                    </div>

                            </#if>

                                <!--load提示-->
                                <div id="load_file_div" style="margin:5% auto; width:281px; height:34px; display:none;">
                                <#--<img src="../theme/img/loading.gif" />-->
                                    <span>载入中...</span>
                                </div>
                            </div>
                            <div id="module_lump_div" class="search-con-tab-02" <#if searchType?default('')=="moduleType">style="display: block;"<#else>style="display: none;"</#if>>
                                <div id="module_lump_check_div" class="search-tbbg">
                                    <#if group?exists>
                                        <#list group?keys as key>

                                            <!--第一个模块 默认选中-->
                                            <#if key==topSearchFun>
                                                <a id='${key}|${group[key][1]}'  onclick="checkModule('${key}');" class="search-tbbg-active">${group[key][2]}
                                            <#else>
                                                <a id='${key}|${group[key][1]}'  onclick="checkModule('${key}');" >${group[key][2]}
                                            </#if>

                                            <!--模块数量-->
                                            <#if group[key]??>
                                                (${group[key][0]})
                                            <#else>
                                                (0)
                                            </#if>
                                                </a>

                                        </#list>
                                    </#if>
                                    <#--<a class="search-tbbg-active">线索</a>
                                    <a>客户</a>
                                    <a>市场活动</a>-->
                                </div>

                                <div id="table_div" class="search-tb-all">

                                    <#if groupdata?exists>
                                        <#list groupdata?keys as modulekey>

                                            <!--查询模块为空的情况下 第一个模块 默认显示-->
                                            <#if modulekey==topSearchFun>
                                            <table id='${modulekey}' class="table table-condensed table-striped">
                                            <#else>
                                            <table id='${modulekey}' class="table table-condensed table-striped" style="display: none;">
                                            </#if>
                                            <tbody>


                                            <#if groupdata[modulekey]?exists>
                                                <!--第一列 显示表格列头-->
                                                <tr>
                                                    <#list fieldshowname?keys as module_field_key>
                                                        <#if modulekey==module_field_key>
                                                            <#list fieldshowname[module_field_key] as fieldshowname>
                                                                    <#if fieldshowname_index==0>
                                                                        <td style="display: none;">${fieldshowname}</td>
                                                                    <#else>
                                                                        <td>${fieldshowname}</td>
                                                                    </#if>
                                                            </#list>
                                                        </#if>
                                                    </#list>
                                                </tr>

                                                <#list groupdata[modulekey] as fieldkeys>
                                                <tr onclick="getInfo(this);" style="cursor:pointer;">
                                                    <#list fieldkeys?keys as field>
                                                        <#if field_index==0>
                                                            <td style="display: none;">${fieldkeys[field]}</td>
                                                        <#else>
                                                            <td>${fieldkeys[field]}</td>
                                                        </#if>

                                                    </#list>
                                                </tr>
                                                </#list>

                                            </#if>

                                            </tbody>
                                            </table>
                                        </#list>
                                    <#else>
                                        <!--无数据-->
                                        <#if !files?exists>
                                            <div class="search-head-con-n" style="height:30px;">
                                                <img src="theme/img/allsearch/search-con-n.png" />
                                            </div>
                                        </#if>

                                    </#if>


                                </div>
                                <!--load提示-->
                                <div id="load_div" style="margin:5% auto; width:281px; height:34px; display:none;">
                                    <#--<img src="../theme/img/loading.gif" />-->
                                    <span>载入中...</span>
                                </div>

                            </div>
                        </div>

                    <#--分页的开始-->
                        <div id="fun_page_div" class="mail-pagination-all" <#if searchType?default('')=="moduleType">style="display: block;"<#else>style="display: none;"</#if>>
                            <div class="mail-pagination-left">
                            ${page.size*page.number+1}~${(page.size*page.number)+page.numberOfElements} &nbsp;&nbsp;&nbsp;&nbsp;
                            ${page.number+1}/${page.totalPages} 页  &nbsp;&nbsp;&nbsp;&nbsp;
                                共${page.totalElements}条数据   &nbsp;&nbsp;&nbsp;&nbsp;
                                <select onchange="pageSizeChange(this.value)">
                                    <option value="5"<#if page.size==5> selected</#if>>5</option>
                                    <option value="10"<#if page.size==10> selected</#if>>10</option>
                                    <option value="15"<#if page.size==15> selected</#if>>15</option>
                                    <option value="20"<#if page.size==20> selected</#if>>20</option>
                                    <option value="50"<#if page.size==50> selected</#if>>50</option>
                                    <option value="80"<#if page.size==80> selected</#if>>80</option>
                                    <option value="100"<#if page.size==100> selected</#if>>100</option>
                                </select>
                            </div>
                            <div class="mail-pagination-right">
                                <div class="pagination"></div>
                                <div class="mail-pagination-input">第<input id="jumpInpId"/>页<a href="javascript:;" onclick="jumpFun();">GO</a></div>
                            </div>
                        </div>
                    <#--分页的结束-->


                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
<#--全局搜索-->
<form id="searchId" name="searchName" action='./search/searchList' method="post" >
    <#--搜索关键词-->
    <input type="hidden" id="search_val" name="topSearchVal" />
    <input type="hidden" id="search_fun" name="topSearchFun" />
    <input type="hidden" id="search_fun_id" name="topSearchFunId" />
    <input type="hidden" id="search_size" name="size" />
    <input type="hidden" id="search_number" name="number" />
    <input type="hidden" id="functionId" name="function.id" />
    <input type="hidden" id="functionName" name="function.name" />
    <input type="hidden" id="tableName" name="function.tableName" />
    <input type="hidden" id="entityName" name="function.entityName" />
    <input type="hidden" id="entityClass" name="function.entityClass" />
</form>
<input id="topSearchVal" type="hidden" name="topSearchVal" value="${topSearchVal?default('')}"/>
<input id="scho_search_fun" type="hidden" value="${topSearchFun?default('')}"/>
<input id="scho_search_type" type="hidden" value="${searchType?default('')}"/>


<script type="text/javascript" language="javascript">
    $(function(){
        var url_type = "";
        if("fileType"==$("input[id='scho_search_type']").val()){
            url_type = "./search/searchFileList";
        }else{
            url_type = "./search/searchList";
            $("#fun_page_div").show();
        }

        var topSearchVal = $("input[id='two-search']").val();
        if(topSearchVal.length<=0){
            alert("搜索关键词不能为空！");
            return;
        }
        //当前所选模块
        $("div[id='table_div']").find("table").each(function(){
            if(!$(this).is(":hidden")){
                $("input[id='search_fun']").val($(this).attr("id"));
                return;
            }
        });
        var searchFun = $("input[id='search_fun']").val();
        var options_ = {
            currentPage: ${page.number+1},
            totalPages: ${page.totalPages},
            numberOfPages:5,
            size:"normal",
            alignment:"left",
            pageUrl:function(type, page, current){
                return "javascript:pageUrl('"+url_type+"',${page.size},'"+page+"','"+topSearchVal+"','"+searchFun+"')";
                //return url_type+"?size=$page.size}&number="+page+"&topSearchVal="+encodeURI(encodeURI(topSearchVal))+"&topSearchFun="+searchFun+"&pageSign=1";
            },
            itemTexts:function(type, page, current){
                switch(type){
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "末页";
                    case "page":
                        return ""+page;
                    default:
                        return "";
                }
            },
            tooltipTitles:function (type, page, current) {
                switch (type) {
                    case "first":
                        return "Tooltip for first page";
                    case "prev":
                        return "Tooltip for previous page";
                    case "next":
                        return "Tooltip for next page";
                    case "last":
                        return "Tooltip for last page";
                    case "page":
                        return "Tooltip for page " + page;
                }
            },
            shouldShowPage:function(type, page, current){
                switch(type){
                    case "first":
                    case "last":
                        return true;
                    default:
                        return true;
                }
            },
            onPageClicked: function(e,originalEvent,type,page){
                $('#alert-content').text("Page item clicked, type: "+type+" page: "+page);
            }
        }
        if('${page.totalPages}'>0){
            $(".pagination").bootstrapPaginator(options_);
        }



    });

    <!--分页跳转-->
    function jumpFun(){
        var jumpInpValue = $("#jumpInpId").val();
        var pageNum = ${page.totalPages};
        if(jumpInpValue<=pageNum){

            //当前所选模块
            $("div[id='table_div']").find("table").each(function(){
                if(!$(this).is(":hidden")){
                    $("input[id='search_fun']").val($(this).attr("id"));
                    return;
                }
            });
            //每页显示条数
            $("input[type=hidden][id='search_size']").val(${page.size});
            $("input[type=hidden][id='search_number']").val(jumpInpValue);

            //搜索词
            var searchVal = $("input[id='search_results_key']").val();
            $("input[id='search_val']").val(searchVal);

            var URL = "";
            if("fileType"==$("input[id='scho_search_type']").val()){
                URL = "./search/searchFileList";
            }else{
                URL = "./search/searchList";
            }

            var param = {
                topSearchVal:searchVal,
                topSearchFun:$("#search_fun").val(),
                topSearchFunId:$("#search_fun_id").val(),
                size:$("#search_size").val(),
                number:$("#search_number").val()
            }
            ajaxDisplay(URL,"", contentMain,param);
            Overlayer.show();
        }else{
            alert("共 "+pageNum+" 页");
            return false;
        }
    }

    $("#jumpInpId").keydown(function(event){
        if(event.which == "13")
            jumpFun();
    });


    <!--改变每页显示条数-->
    function pageSizeChange(size){
        //当前所选模块
        $("div[id='table_div']").find("table").each(function(){
            if(!$(this).is(":hidden")){
                $("input[id='search_fun']").val($(this).attr("id"));
                return;
            }
        });
        //每页显示条数
        $("input[type=hidden][id='search_size']").val(size);

        //搜索词
        var searchVal = $("input[id='search_results_key']").val();
        $("input[id='search_val']").val(searchVal);

        var URL = "";
        if("fileType"==$("input[id='scho_search_type']").val()){
            URL = "./search/searchFileList";
        }else{
            URL = "./search/searchList";
        }

        var param = {
            topSearchVal:searchVal,
            topSearchFun:$("#search_fun").val(),
            topSearchFunId:$("#search_fun_id").val(),
            size:$("#search_size").val(),
            number:$("#search_number").val()
        }
        ajaxDisplay(URL,"", contentMain,param);
        Overlayer.show();
    }

    function pageUrl(URL,size,number,topSearchVal,searchFun){
        var param = {
            topSearchVal:topSearchVal,
            topSearchFun:searchFun,
            size:size,
            number:number
        }
        ajaxDisplay(URL,"", contentMain,param);
        Overlayer.show();
    }

</script>


<#--</body>
</html>-->

