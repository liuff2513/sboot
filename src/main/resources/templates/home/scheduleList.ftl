<style>
	#scheduletimestable {
		margin: 15px 0px;
	}
	#scheduletimestable tr td {
		border-bottom: 1px solid #e7eaec;
	}
	#scheduletimestable select{
		border: 1px solid #e7eaec;
		color: #222;
	}
	.g-pw:HOVER span {
		color: #337AB7;
		/*text-decoration: underline;*/
	}
</style>
<#--日程开始-->
<div class="whauo-schedule">
    <!--<h4>日程</h4>-->
    <div class="schedule-list-all">
        <div class="schedule-list-head">
            <span>选择用户：</span>
            <select id="scheduleusersel">
            	<option value="${Session['_USER_LOGIN_'].id!''}">${Session["_USER_LOGIN_"].name!''}</option>
            <#if users??>
            <#list users as user>
            	<#if user.id==userId>
                	<option value="${user.id!''}" selected>${user.name!''}</option>
            	<#else>
                	<option value="${user.id!''}">${user.name!''}</option>
            	</#if>
            </#list>
            </#if>
            </select>
            </div>
		<div class="schedule-times-img">
            <a><img src="${path!''}./theme/img/setup/schedule-times-img-button.png"></a>
        </div>
        <div class="schedule-times-panel">
        	<div id="scheduletimespanel" style="display:none;">
				<table id="scheduletimestable" class="table"></table>
			</div>
        </div>
        <ul id="scheduledataul">
			<#if schedules??>
				<#if schedules?size lte 0>
					<div class="sorry-box">
						<img alt="image" src="${path!''}./theme/img/ins/ins-Sorry.png">
						<#if noPermission!false||nosetting!false>
						<h2>抱歉！您还未配置日程！<br/>
						<label style="font-size: 11px;color: #3c8dbc;">点击<a href="javascript:settingspage('schedule');">这里</a>，配置日程</label>
						</h2>
						<#else>
						<h2>您好！今日无待办事宜！</h2>
						</#if>
					</div>
				<#else>
					<li>
						<div class="schedule-list-left home-time">
							<i class="gicon01"></i>
						</div>
						<div class="schedule-list-right">
							<span class="home-schedule-date" style="float:left;">
								${nowDate!''}
							</span>
							<span class="home-schedule-date" style="float:right;">
								<a id="showall" onclick="showAllDetail();" showtype="brief" style="text-decoration:none;color:#3e7fb7;font-family:'黑体';">展开全部</a>
							</span>
						</div>
					</li>
				</#if>
				<div class="home-schedule-content">
				<#list schedules  as schedulearr>
					<#assign schedule = schedulearr[0], function = schedulearr[1] />
					<#assign linkURL = "./welcome?module="+function.nameSpace+"&opName=view&entityId="+(schedule.dataId!'')/>
					<li data-dataId="${schedule.dataId!''}" data-tableName="${schedule.tableName!''}">
						<div class="schedule-list-left">
							${schedule.timeSection!''}<i class="gicon03"></i>
						</div>
						<div class="schedule-list-right" style="font-size:9pt;color:#333333;font-family:'微软雅黑';position:relative;">
							<div style="position:absolute;top:0px;left:10px" ><i class="menu-gray-sprite ${function.imagePath!''}"></i></div>
							<div style="left:6px;margin:0px 0px 0px 20px;background:#edf2f3;word-wrap: break-word;">
							   <div style="padding: 0 10px;background: #dbeeff;border-bottom: 2px solid #B0E0FF;">
								   <#--<a target="_blank" style="margin:0px 0px 0px 20px;color:#3e7fb7;font-size:14px;" href="${linkURL}" data-params='{"module":"${function.nameSpace!''}", "opName":"view", "entityId":"${schedule.dataId!''}"}'>
									${schedule.subject!''}
								</a>-->
								   <#if schedule.subject?length gt 26>
									   <a class="brief" title="${schedule.subject}" target="_blank" style="color:#333;font-size:14px; display: block" href="${linkURL}" data-params='{"module":"${function.nameSpace!''}", "opName":"view", "entityId":"${schedule.dataId!''}"}'>
									   ${schedule.subject[0..24]}......
									   </a>
									   <a class="detail" target="_blank" style="color:#333;font-size:14px; display: none" href="${linkURL}" data-params='{"module":"${function.nameSpace!''}", "opName":"view", "entityId":"${schedule.dataId!''}"}'>
									   ${schedule.subject!''}
									   </a>
								   <#else>
									   <a target="_blank" style="color:#333;font-size:14px;" href="${linkURL}" data-params='{"module":"${function.nameSpace!''}", "opName":"view", "entityId":"${schedule.dataId!''}"}'>
									   ${schedule.subject!''}
									   </a>
								   </#if>
							   </div>
								<div style = "padding: 5px 10px 5px;">
								<#if schedule.content?length gt 62>
									<div class="brief" id="briefContent${schedulearr_index}" style="display:block">
										<span style="font-family:'微软雅黑';">${schedule.content[0..57]}......&nbsp;&nbsp;<a onclick="showDetail('0','${schedulearr_index}')" style="color:#3e7fb7;text-decoration: none;">展开</a></span>
									</div>
									<div class="detail" id="detailContent${schedulearr_index}" style="display:none;">
										<span style="font-family:'微软雅黑';">${schedule.content}<a onclick="showDetail('1','${schedulearr_index}')" style="color:#3e7fb7;text-decoration: none;">&nbsp;收起</a></span>
									</div>
								<#else>
									${schedule.content!''}
								</#if>
								</div>
							</div>
						</div>
					</li>
				</#list>
			</#if>
        	</div>
        </ul>
    </div>
</div><#--日程结束-->
<script type="text/javascript">
	$(document).ready(function(){
	    console.log("-----日程-----");
	    //flexStyle();
		//用户改变事件
		$("#scheduleusersel").change(function(){
			ajaxDisplay("./home/scheduleList", null, "#homelayout_schedule", {"userId":this.value,"nowDate":"${nowDate!''}"});
		});
		//日程日期选择
		$(".schedule-times-img").click(function(){
			$("#scheduletimespanel").slideToggle();
		});
		
		$("#scheduletimestable").calendar({
			datas: ${datas},//默认日程标识数据
			onClick: function($elem){
				getScheduleData($elem);
				$("#scheduletimespanel").slideToggle();
				//flexStyle();
			},
			onChange: function($elem){
				$.ajax({
					url: './home/scheduleMonthData',
					data: {seldate:$elem.toLocaleDate(),userId: $("#scheduleusersel").val()},
					async: false,
					success: function(data){
						var jsonstr = data.datas;
						$elem.draw(JSON.parse(jsonstr));
					},
					error: function(e) {
						alert(e);
					}
				});
			}
		});
	});
	//异步获取数据
	function getScheduleData($elem){
		$.ajax({
			url: './home/scheduleDayData',
			data: {seldate: $elem.toLocaleDate("yyyy-MM-dd"),userId: $("#scheduleusersel").val()},
			async: false,
			success: function(data){
				var scheduleDatas = eval("(" + data.scheduleDatas + ")");
				console.log(scheduleDatas);
				if(scheduleDatas.length>0){
				    $("#scheduledataul").html('<li><div class="schedule-list-left home-time"><i class="gicon01"></i></div><div class="schedule-list-right"><span class="home-schedule-date"><a id="showall" onclick="showAllDetail();" showtype="brief" style="height:20px;line-height:20px;position:absolute;right:10px;margin-top:0px;text-decoration:none;color:#3e7fb7;font-family:黑体;">展开全部</a></span></div></li>');
				    $(".home-schedule-date").html($elem.toLocaleDate("yyyy-MM-dd")+$(".home-schedule-date").html());
					var html = "";
					$(scheduleDatas).each(function(index){
						var schedule = this.schedule;
						var tempFunction = this.function;
						var linkURL = "./welcome?module="+tempFunction.nameSpace+"&opName=view&entityId="+(schedule.dataId);
						var dataPrames = '\'{"module":"'+tempFunction.nameSpace+'","opName":"view","entityId":"'+schedule.dataId+'"}\'';
						var remindDate = new Date(schedule.timeSection);
						html+='<li data-dataId="'+schedule.dataId+'" data-tableName="'+schedule.tableName+'">'+
	                        '<div class="schedule-list-left">'+schedule.timeSection+
	                        	'<i class="gicon03"></i>'+
	                        '</div>'+
	                        '<div class="schedule-list-right" style="font-size:9pt;color:#333333;font-family:微软雅黑;position:relative;">'+
		                        '<div style="position:absolute;top:0px;left:10px" ><i class="menu-gray-sprite '+tempFunction.imagePath+'"></i></div>'+
		                        '<div style="left:6px;margin:0px 0px 0px 20px;background:#edf2f3;word-wrap: break-word;">';
                        /*'<div style="padding: 10px;"><a target="_blank" href="'+linkURL+'" style="margin:0px 0px 0px 20px;color:#3e7fb7;font-size:14px;" >'+
                        schedule.subject+
                        '</a></div>';*/
						if(schedule.subject.length>26){
							html+='<div style="padding:0 10px;background: #dbeeff;border-bottom: 2px solid #B0E0FF;"><a class="brief" title="'+schedule.subject+'" target="_blank" href="'+linkURL+'" style="color:#333;font-size:14px; display: block;" >'+
                                    schedule.subject.substring(0,24)+'......'+
                                    '</a>'+
                            '<a class="detail" target="_blank" href="'+linkURL+'" style="color:#333;font-size:14px; display: none" >'+
                            schedule.subject+
                            '</a></div>'
						}else{
							html+='<div style="padding:0 10px;background: #dbeeff;border-bottom: 2px solid #B0E0FF;"><a target="_blank" href="'+linkURL+'" style="color:#333;font-size:14px;" >'+
                                    schedule.subject+
                                    '</a></div>';
						}
                        if(schedule.content.length>62){
	                        html+='<div style = "padding: 5px 10px 5px;"><div class="brief" id="briefContent'+index+'" style="display:block">'+
			                    '<span style="font-family:微软雅黑;">'+
			                       schedule.content.substring(0,58)+'......&nbsp;&nbsp;'+
			                      '<a onclick="showDetail(\'0\',\''+index+'\')" style="color:#3e7fb7;text-decoration:none;">展开</a>'+
			                    '</span>'+
			                '</div>'+
			                '<div class="detail" id="detailContent'+index+'" style="display:none;">'+
			                    '<span style="font-family:微软雅黑;">'+
			                        schedule.content+
			                       '<a onclick="showDetail(\'1\',\''+index+'\')" style="color:#3e7fb7;text-decoration: none;">&nbsp;收起</a>'+
			                     '</span>'+
			                '</div></div></div></li>';
		                 }else{
		                    html+='<div style = "padding: 5px 10px 5px;">'+schedule.content+'</div></div></div></li>';
		                 }
	 
					});
					$("#scheduledataul").html($("#scheduledataul").html()+'<div class="home-schedule-content">'+html+"</div>");
				}else{
				    $("#scheduledataul").html('<div class="sorry-box"><img alt="image" src="./theme/img/ins/ins-Sorry.png"><#if noPermission!false||nosetting!false><h2>抱歉！您还未配置日程！</h2><table><tr><td>点击<a href="javascript:settingspage(\'schedule\');">这里</a>，配置日程</td></tr></table><#else><h2>您好！今日无待办事宜！</h2></#if></div>');
				}
			},
			error: function(e){
				alert(e);
			}
			
		});
	}
    //全部展开
    function showAllDetail(){
		var size=$(".home-schedule-content li").length;

        if($("#showall").attr("showtype")=="brief"){
			   $("#showall").attr("showtype","detail");
			   $("#showall").html('收起全部');
           for(var i=0;i<size;i++){
              /* $("#briefContent"+i).css("display","none");
               $("#detailContent"+i).css("display","block");*/
               $(".brief").css("display","none");
               $(".detail").css("display","block");
           }
        }else{
               $("#showall").attr("showtype","brief");
               $("#showall").html('展开全部');
           for(var i=0;i<size;i++){
//               $("#briefContent"+i).css("display","block");
//               $("#detailContent"+i).css("display","none");
               $(".brief").css("display","block");
               $(".detail").css("display","none");
           }           
        }
    }
    function showDetail(flag,index){
       if(flag=="0"){
          $("#briefContent"+index).hide();
          $("#detailContent"+index).show();
       }else{
          $("#showall").attr("showtype","brief");
          $("#briefContent"+index).show();
          $("#detailContent"+index).hide();       
       }
    }	
</script>
