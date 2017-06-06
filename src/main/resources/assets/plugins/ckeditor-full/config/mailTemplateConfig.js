CKEDITOR.editorConfig = function( config ) {
	/*config.toolbarGroups = [
		{ name: 'basicstyles', groups: [ 'basicstyles'] },
		{ name: 'paragraph', groups: [  'align', 'paragraph' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'colors', groups: [ 'colors' ] },
	];*/
	
	config.toolbar_Full =
		[
		        { name: 'document', items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
		        { name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
		        { name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
		        { name: 'forms', items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 
		        'HiddenField' ] },
		        '/',
		        { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
		        { name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv',
		        '-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
		        { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
		        { name: 'insert', items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },
		        '/',
		        { name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
		        { name: 'colors', items : [ 'TextColor','BGColor' ] },
		        { name: 'tools', items : [ 'Maximize', 'ShowBlocks','-','About' ] }
		];
		 
		config.toolbar_Basic =
		[
		        ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink','-','About']
		];
	
	//要删除的功能按钮			//															  //样式	  //背景色  //基本样式	
	config.removeButtons = 'Flash,Table,HorizontalRule,SpecialChar,PageBreak,Iframe,Styles,BGColor,Strike,Subscript,Superscript';
	// 字体
	config.font_names = '宋体;楷体_GB2312;新宋体;黑体;隶书;幼圆;微软雅黑;Arial;Comic Sans MS;Courier New;Tahoma;Times New Roman;Verdana'; 
	//预览区域显示内容
	config.image_previewText=' ';
	//获取编辑区域的光标
	config.startupFocus = true;
    // 图片上传配置
	config.filebrowserUploadUrl="../uploadFile/ckeditorUpload?flag="+2;

};