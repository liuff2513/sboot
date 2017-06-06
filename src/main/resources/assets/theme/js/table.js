
function drag(o, r) {
        o.p_p_c_gw = function (index) /*取得o.parentNode.parentNode.cells的宽度，兼容IE6和Firefox*/ {
            if (window.ActiveXObject) {
                return o.parentNode.parentNode.cells[o.parentNode.cellIndex + index].offsetWidth;
            } else {
                return parseInt(o.parentNode.parentNode.cells[o.parentNode.cellIndex + index].offsetWidth);
            }
        }
        o.p_p_p_sw = function (index, w) /*设置table中所有行的第index个单元格的宽度为w，在IE下可只设第一行*/ {
            var ele = $('.dataTables_scroll').find('table');
            var trLength=$(o).parents('table')[0].rows.length;
            var celW1,celW2;
            for (var i = 0; i < trLength; i++) {
                    $(o).parents('table')[0].rows[i].cells[index].style.width=(w-2)+'px';
            }
            var length = ele[1].rows.length,rowCells=ele[1].rows[1].cells.length;
            if(rowCells>1){
                for(var z = 0; z<length ; z++){
                    ele[1].rows[z].cells[index].style.width=(w-2)+'px';
                }
                celW1=o.parentNode.parentNode.cells[index].offsetWidth;
                celW2=ele[1].rows[1].cells[index].offsetWidth;

                //监听上下两个表格当前移动的这列td的宽度，保证上下两个表格的td的宽度一致
                if(celW1!=celW2){
                    if(celW1>celW2){ //上面表格的td宽度大于下面的td的宽度，取大值
                        for(var z = 0; z<length ; z++){
                            ele[1].rows[z].cells[index].style.width = (celW1-2)+"px";
                        }
                    }else{
                        for (var i = 0; i < trLength; i++) {
                            $(o).parents('table')[0].rows[i].cells[index].style.width = (celW2-2)+"px";
                        }
                    }
                }
            }
            
        }

        /*o.firstChild.onmousedown = function () {
            return false;
        };*/
        o.onmousedown = function (a) {
            console.log(this)
            var d = document;
            if (!a) a = window.event;
            var lastX = a.clientX;
            var watch_dog = o.p_p_c_gw(0) + o.p_p_c_gw(1); //watch_dog是为了保证表格不会变大， 
            if (o.setCapture){
                o.setCapture();
            }else if (window.captureEvents){
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
            var minWidth=o.p_p_c_gw(0)-60>40 /*&& o.p_p_c_gw(1)-60>40*/
            var oldtableWidth=$('.dataTables_scroll').width();

                d.onmousemove = function (a) {
                    if (!a) a = window.event;
                    var t = a.clientX - lastX;
                    if(minWidth){ //如果表格td宽度大于最小宽度
                        //如果滚动时超过开始的宽度，设置宽度
                        if (o.p_p_c_gw(0) + o.p_p_c_gw(1) > watch_dog) {
                            o.p_p_p_sw(o.parentNode.cellIndex + 1, watch_dog - o.p_p_c_gw(0));
                            return;
                        }
                        //设置最大移动的范围
                        if (t > 0) { //right
                            if (parseInt(o.parentNode.parentNode.cells[o.parentNode.cellIndex + 1].style.width) - t <20)
                                return;
                            o.p_p_p_sw(o.parentNode.cellIndex, o.p_p_c_gw(0) + t);
                            o.p_p_p_sw(o.parentNode.cellIndex + 1, o.p_p_c_gw(1) - t);
                        } else { //left
                            if (parseInt(o.parentNode.parentNode.cells[o.parentNode.cellIndex].style.width) + t < 20)
                                return;
                            o.p_p_p_sw(o.parentNode.cellIndex, o.p_p_c_gw(0) + t);
                            o.p_p_p_sw(o.parentNode.cellIndex + 1, o.p_p_c_gw(1) - t);
                        }
                    }else{
                        var tableWidth=$('.dataTables_scroll .table').width();
                        o.p_p_p_sw(o.parentNode.cellIndex, o.p_p_c_gw(0) + t);
                        var newWidth=tableWidth + t;
                        if(newWidth < oldtableWidth){
                            $('.dataTables_scroll .table').width(oldtableWidth);
                        }else{
                            $('.dataTables_scroll .table').width(newWidth);
                        }

                    }

                    lastX = a.clientX;

                    o.tableHeight();
                };

                    /*o.p_p_p_sw(o.parentNode.cellIndex, o.p_p_c_gw(0) + t);
                    var newWidth=tableWidth + t;
                    if(newWidth<tableWidth) return false;
                    $('.dataTables_scroll .table').width(newWidth);
*/
            d.onmouseup = function () {
                if (o.releaseCapture)
                    o.releaseCapture();
                else if (window.captureEvents)
                    window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                d.onmousemove = null;
                d.onmouseup = null;
            };
        };
        //如果有列固定的，固定列的高度改变
        o.tableHeight=function () {
            if($(".DTFC_Cloned")){
                var heightArr=[],h='',bh='';
                //thead
                var fixedThead=$(".DTFC_Cloned").eq(0),fixedTbody=$(".DTFC_Cloned").eq(1).find('tbody'),trLen=fixedTbody.find('tr').length;
                h= o.parentNode.offsetHeight;
                $(".DTFC_Cloned:even").find('thead').find('tr').css({boxSizing:"border-box",height:h});
                //tbody
                var elebody = $('.dataTables_scrollBody').find('table').find('tbody'),length = elebody[0].rows.length,fixedTbodyHeight=0;
                var tbodys=$(".DTFC_Cloned tbody"),tbodysLen=tbodys.length;
                for(var z = 0; z<length ; z++){
                    bh=elebody[0].rows[z].cells[0].offsetHeight;
                    heightArr.push(bh);
                    for(var k=0;k<tbodysLen;k++){
                        tbodys.eq(k).find('tr').eq(z).css({boxSizing:"border-box",height:heightArr[z]});
                    }                
                    fixedTbodyHeight+=parseInt(heightArr[z]);
                }

                $(".DTFC_RightBodyLiner").height(fixedTbodyHeight);
                $(".DTFC_RightBodyWrapper").height(fixedTbodyHeight);
                
                $(".DTFC_LeftBodyLiner").height(fixedTbodyHeight);
                $(".DTFC_LeftBodyWrapper").height(fixedTbodyHeight);
                
                var clonedWidth=$(".DTFC_Cloned").width();
                $(".DTFC_Cloned").parent().width(clonedWidth)
            }
        }
        $(window).on('resize',function(){
            o.tableHeight();
        })
        
    }
