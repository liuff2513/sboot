<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="renderer" content="webkit">
    <title>主页</title>
    <link href="./theme/img/loading.gif" rel="prefetch"/>
    <link href="./theme/img/logo_element.png" rel="SHORTCUT ICON"/>
    <!--[if lt IE 8]>
    <script>
        alert('不支持IE6-8，请使用谷歌、火狐等浏览器\n或360、QQ等国产浏览器的极速模式浏览本页面！');
    </script>
    <![endif]-->
    <link href="../theme/css/bootstrap.min.css?v=3.4.0" type="text/css" rel="stylesheet"/>
    <link href="../theme/css/font-awesome/css/font-awesome.min.css?v=4.3.0" type="text/css" rel="stylesheet"/>
    <link href="../theme/css/animate.min.css" rel="stylesheet">
    <link href="../plugins/baihuicrm/baihuicrm.calendar.css" rel="stylesheet">
    <link rel='stylesheet' href='../pages/system/moduleDetail/style/moduleDetail.css'>
    <link href="../theme/css/style.min.css?v=3.0.0" rel="stylesheet">
<#--主题-->
    <link rel="stylesheet"
          href="../theme/css${Session['_USER_LOGIN_'].styleId?default('')}/skin${Session['_USER_LOGIN_'].styleId?default('')}.css ">
    <script src="../theme/js/jquery-2.1.1.min.js" language="javascript" type="text/javascript"></script>
    <script src="../plugins/jquery-ui-1.11.4/jquery-ui.min.js" language="javascript" type="text/javascript"></script>
<#-- 全局js -->
    <script src="../theme/js/bootstrap.min.js?v=3.4.0" language="javascript" type="text/javascript"></script>
<#-- 自定义js -->
    <script src="../plugins/baihuicrm/baihuicrm.calendar.js"></script>
    <script src="../plugins/baihuicrm/baihuicrm.overlayer.js"></script>
    <script src="../plugins/baihuicrm/baihuicrm.resize.js"></script>
    <script src="../pages/home/search/search.js"></script>
<#--图表echartsJS-->
    <script src="../pages/crm/chart/common.js" language="javascript" type="text/javascript"></script>
    <script src="../theme/js/echarts/echarts.js" language="javascript" type="text/javascript"></script>
    <script src="../theme/js/highCharts/highcharts.js" language="javascript" type="text/javascript"></script>
    <script src="../theme/js/highCharts/highstock.js" language="javascript" type="text/javascript"></script>
    <script src="../theme/js/highCharts/modules/funnel.js" language="javascript" type="text/javascript"></script>
    <script src="../theme/js/highCharts/highcharts-3d.js" language="javascript" type="text/javascript"></script>
    <script src="../theme/js/highCharts/modules/exporting.js" language="javascript" type="text/javascript"></script>
    <script>
        $(document).ready(function () {
            //关闭
            $(".newCancelBtn").click(function () {
                parent.$("#_-_-div").remove();
            });
        });
        function ajaxDisplay(ajaxURL, module, dispalyTag, ajaxParams, method) {
            //执行Ajax获取数据插入指定标签
            var linkModule = {};
            ajaxParams = ajaxParams || {};
            for (var i in ajaxParams) {
                linkModule[i] = ajaxParams[i];
            }
            prevAJax = $.ajax({
                type: method || "get",
                url: ajaxURL,
                data: linkModule,
                dataType: "html",
                success: function (data) {
                    $(dispalyTag).empty();
                    $(dispalyTag).html(data);
                    Overlayer.remove();
                    $("body").find("img").prop("src", "../theme/img/setup/schedule-times-img-button.png");
                }
            });
        }
    </script>
</head>
<body class="gray-bg">
<style type="text/css">
    li {
        list-style: none;
    }

    .home-layout {
        box-shadow: 1px 1px 3px #ddd;
        border: 1px solid #DDD;
    }

    .section-one, .section-two {
        background: #FFF;
        height: 100%;
        padding: 15px;
        height: 310px;
        margin: 10px auto;
        float: left;
    }

    .section-one {
        width: 49%;
        margin-right: 1%;
    }

    .section-two {
        width: 99%;
    }

    .section-one table, .section-two table {
        background: #FFF;
    }

    #layoutModal .modal-body table tr td:first-child {
        text-align: right;
        width: 40%;
    }

    .hide {
        display: none;
    }

    .home-content-container {
        padding: 0px 15px;
    }

    .layout-div {
        height: 100%;
        width: 100%;
    }

    .eventNone {
        pointer-events: none;
        cursor: default;
        color: #EFEFEF;
        background: #FFF;
    }

    .bg_CCC {
        background: #CCC !important;
    }

    #navbar-ex-collapse ul li {
        margin-top: 20px;
        background: #FFF;
        padding: 5px !important;
    }

    #navbar-ex-collapse ul li a {
        line-height: 10px !important;
        padding: 10px 15px !important;
    }

    .home-layout-head {
        padding-bottom: 10px;
    }

    .home-layout-head span[name='namelabel'] {
        font-weight: bold;
    }

    .home-layout-head a {
        float: right;
    }

    .home-layout-head .opspan {
        padding: 5px 2px 5px;
        cursor: pointer;
    }

</style>


<div class="home-top">
    <div class="navbar-header">
        <a class="navbar-brand" style="cursor:default;">
            <small>欢迎您&nbsp;${Session['_USER_LOGIN_'].name!''}&nbsp;访问<#if company??>${company.companyName!''}</#if>CRM系统</small>
        </a>
    </div>
    <div class="collapse navbar-collapse" id="navbar-ex-collapse">
        <ul class="navbar-nav navbar-right" style="margin-right:3px;">
            <li class="eventNone bg_CCC">
                <a id="classic">经典</a>
            </li>
            <li>
                <a id="custom">定制</a>
            </li>
        </ul>
    </div>
</div>
<!--主页homes Start Here-->
<div class="home-content-container">
    <table style="width:100%;">
        <tr>
            <td id="scheduletd" width="40%" style="min-width:460px;">
                <div class="section-one home-layout" style="height: 650px; width:99%;">
                    <p class="home-layout-head home-layout-handle">
                        <span name="namelabel">日程组件</span>
                    </p>
                    <div id="homelayout_schedule" class="layout-div"></div>
                    <script>
                        ajaxDisplay("../home/scheduleList", null, "#homelayout_schedule", {})
                    </script>
                </div>
            </td>
            <td id="singlelayouttd" valign="top">
            <#if homeSettingItems??>
                <#list homeSettingItems?sort_by("seq") as homeSettingItem>
                    <#if homeSettingItem.seq lt 20>
                        <#assign type=homeSettingItem.type!1, typeclass=(type==1)?string("section-one", "section-two")>
                        <div class="${typeclass} home-layout" style="width:98%;margin-left:1%;"
                             data-id="${homeSettingItem.id!''}">
                            <p class="home-layout-head home-layout-handle">
                                <span name="namelabel">${homeSettingItem.name!''}</span>
                            </p>
                            <div id="homelayout_${homeSettingItem.id!''}" class="layout-div"></div>
                            <script>
                                var ajaxParams_${homeSettingItem.id!''} = {
                                    "id": "${homeSettingItem.id!''}",
                                    "name": "${homeSettingItem.name!''}",
                                    "type": "${homeSettingItem.type!''}",
                                    "tableName": "${homeSettingItem.tableName!''}",
                                    "seq": "${homeSettingItem.seq!''}",
                                    "viewId": "${homeSettingItem.viewId!''}",
                                    "userId": "${homeSettingItem.userId!''}",
                                    "pageNum": "1",
                                };
                                    <#if (homeSettingItem.tableName!'')=="bh_chart_dashboard_record">
                                    ajaxDisplay("../chartFlip/getEchartsById?chartFlipId=${homeSettingItem.viewId!''}", null, "#homelayout_${homeSettingItem.id!''}", ajaxParams_${homeSettingItem.id!''});
                                    <#else>
                                    ajaxDisplay("../home/homelayoutList", null, "#homelayout_${homeSettingItem.id!''}", ajaxParams_${homeSettingItem.id!''});
                                    </#if>
                            </script>
                        </div>
                    </#if>
                </#list>
            </#if>
            </td>
        </tr>
        <tr>
            <td colspan="2" id="mutilayouttd" valign="top">
            <#if homeSettingItems??>
                <#list homeSettingItems?sort_by("seq") as homeSettingItem>
                    <#if homeSettingItem.seq gt 20>
                        <#assign sectionClassName=((homeSettingItem.type==1)?string("section-one","section-two"))>
                        <div class="${sectionClassName} home-layout" data-id="${homeSettingItem.id}"
                             data-type="${homeSettingItem.type}" data-tableName="${homeSettingItem.tableName}"
                             view-id="${homeSettingItem.viewId!''}">
                            <p class="home-layout-head home-layout-handle">
                                <span name="namelabel">${homeSettingItem.name!''}</span>
                            </p>
                            <div id="homelayout_${homeSettingItem.id!''}" class="layout-div"></div>
                            <script>
                                var ajaxParams_${homeSettingItem.id!''} = {
                                    "id": "${homeSettingItem.id!''}",
                                    "name": "${homeSettingItem.name!''}",
                                    "type": "${homeSettingItem.type!''}",
                                    "tableName": "${homeSettingItem.tableName!''}",
                                    "seq": "${homeSettingItem.seq!''}",
                                    "viewId": "${homeSettingItem.viewId!''}",
                                    "userId": "${homeSettingItem.userId!''}",
                                    "pageNum": "1",
                                };
                                    <#if (homeSettingItem.tableName!'')=="bh_chart_dashboard_record">
                                    ajaxDisplay("../chartFlip/getEchartsById?chartFlipId=${homeSettingItem.viewId!''}", null, "#homelayout_${homeSettingItem.id!''}", ajaxParams_${homeSettingItem.id!''});
                                    <#else>
                                    ajaxDisplay("../home/homelayoutList", null, "#homelayout_${homeSettingItem.id!''}", ajaxParams_${homeSettingItem.id!''});
                                    </#if>
                            </script>
                        </div>
                    </#if>
                </#list>
            </#if>
            </td>
        </tr>
    </table>
</div>
<div class="overlayer hide"><img src="../theme/img/loading.gif"></div>
<!--布局保存操作-->
<div id="builder_btnDivision" class="module-builder-btn" style="width:100%;padding-top:5px;">
    <div style="position: absolute;width: 100%;height: 100%;background: #222;opacity: 0.3;z-index: -1;"></div>
    <input type="button" value="关闭" class="mL15 newCancelBtn proximal"/>
</div>
</body>
</html>