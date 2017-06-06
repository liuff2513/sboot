
/**
 * 点击TOP搜索
 */
$("#search_id").on("click", function () {
    var top_val = $("#top-search").val();
    searchTop(top_val);
});

$("#top-search").keydown(function(e){
    var e = e || event,
        keycode = e.which || e.keyCode;
    if (keycode==13) {
        var top_val = $("#top-search").val();
        searchTop(top_val);
    }
});

function searchTop(val){
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
    ajaxDisplay(URL,"",contentMain,{"topSearchVal":val}); //提交搜索
    Overlayer.show();
}