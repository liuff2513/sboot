CKEDITOR.editorConfig = function( config ) {
    config.toolbarGroups = [
        { name: 'basicstyles', groups: [ 'basicstyles'] },
        { name: 'paragraph', groups: [  'align', 'paragraph' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] },
    ];
    //要删除的功能按钮			//															  //样式	  //背景色  //基本样式
    config.removeButtons = 'Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Styles,BGColor,Strike,Subscript,Superscript';
    // 字体
    config.font_names = '宋体;楷体_GB2312;新宋体;黑体;隶书;幼圆;微软雅黑;Arial;Comic Sans MS;Courier New;Tahoma;Times New Roman;Verdana';
    //预览区域显示内容
    config.image_previewText=' ';
    // 图片上传配置
    config.filebrowserUploadUrl="./uploadFile/ckeditorUpload?flag="+1;
};