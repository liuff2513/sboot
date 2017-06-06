(function($){

var timestamp = (new Date()).valueOf();

/*列表*/
$.documents_list = {
	"requestcommand": "documents_list",
	"requesttime": timestamp,
	"userId": "402890b55b947bfe015b948dc4660002",
	"orderField": "createdTime",
	"orderType": "desc",
	"pageNo": 1,
	"pageSize": 10,
	"type": 1,
	"keyword": ""
};

/*单个文件夹列表*/
$.documents_singlelist = {
	"requestcommand": "documents_singlelist",
	"requesttime": timestamp,
	"userId": "402890b55b947bfe015b948dc4660002",
	"id": "fd1b7abd4e0f41ada60787e0299f0d55",
	"orderField": "createdTime",
	"orderType": "desc",
	"pageNo": 1,
	"pageSize": 10,
	"level": 0
};

/*文档管理全局搜索*/
$.documents_listsearch = {
	"requestcommand": "documents_listsearch",
	"requesttime": timestamp,
	"userId": "402890b55b947bfe015b948dc4660002",
	"pageNo": 1,
	"pageSize": 10,
	"searchKey": ""
};


/*文档管理文件上传*/
$.documents_upload = {
	"requestcommand": "documents_upload",
	"requesttime": timestamp,
	"userId": "402890b55b947bfe015b948dc4660002",
	"folderId": "fd1b7abd4e0f41ada60787e0299f0d55",
	"fileParams": [
		{
			"fileName": "新201705555.txt",
			"oldName": "新上传.txt",
			"fileUrl": "upload/20170507/新201705555.txt",
			"fileSize": "0",
			"fileType": "1"
		},
		{
			"fileName": "新20170590410.jpg",
			"oldName": "新11.jpg",
			"fileUrl": "upload/20170507/新20170590410.jpg",
			"fileSize": "0",
			"fileType": "2"
		}
	]
};

/*文档夹新建*/
$.documents_createfolder = {
	"requestcommand": "documents_createfolder",
	"requesttime": timestamp,
	"userId": "402890b55b947bfe015b948dc4660002",
	"name": "1010下接口新建验证5",
	"level": 1,
	"pId": "fd1b7abd4e0f41ada60787e0299f0d55",
	"isShared": 1,
	"isShareMessage": 1,
	"isUploadMessage": 1,
	"userType": "2",
	"groupidOrUserid": "402890b55b9467ee015b9471aab60006",
	"permissionName": "共同拥有者"
};

/*修改文件夹名*/
$.documents_updatefoldername = {
	"requestcommand": "documents_updatefoldername",
	"requesttime": timestamp,
	"id": "bef5684bfe4f4faa92340f07532f3cc1",
	"userId": "402890b55b947bfe015b948dc4660002",
	"name": "1010下接口新建验证5",
	"level": 1,
	"creatorId": "402890b55b947bfe015b948dc4660002",
	"pId": "fd1b7abd4e0f41ada60787e0299f0d55"

};

/*修改文件名*/
$.documents_updatefilename = {
	"requestcommand": "documents_updatefilename",
	"requesttime": timestamp,
	"id": "b1fc318afe0b48eba5d7d58b4d7a45e0",
	"userId": "402890b55b947bfe015b948dc4660002",
	"oldName": "新上传"
};


/*文件夹共享*/
$.documents_sharefolders = {
	"requestcommand": "documents_sharefolders",
	"requesttime": timestamp,
	"userId": "402890b55b947bfe015b948dc4660002",
	"id": "654ad384c49240b4a8d7c481555ea766",
	"level": 1,
	"isShared": 1,
	"isShareMessage": 1,
	"isUploadMessage": 1,
	"userType": "1",
	"groupidOrUserid": "402890b55b9467ee015b9471aab60006",
	"permissionName": "共同拥有者"
};

/*根据文件类型查找*/
$.documents_findbytype = {
	"requestcommand": "documents_findbytype",
	"requesttime": timestamp,
	"userId": "402890b55b947bfe015b948dc4660002",
	"type": 2,
	"fileType": "1",
	"orderField": "createdTime",
	"orderType": "desc",
	"pageNo": 1,
	"pageSize": 10,
};

/*文件复制移动删除收藏*/
$.documents_filecopy = {
	"requestcommand": "documents_filecopy",
	"requesttime": timestamp,
	"userId": "402890b55b947bfe015b948dc4660002",
	"fileIds": "341fa5e07e66429a94515b4ece99e11b,82aaf152f6e2459bbaf6e965ca541b81",
	"folderId":"6bcdc9afec8846b797b7f496d1820b3d",
	"type":2
};

/*文件恢复清除*/
$.documents_cleanandrestore = {
	"requestcommand": "documents_cleanandrestore",
	"requesttime": timestamp,
	"userId": "402890b55b947bfe015b948dc4660002",
	"type": 1,//1清除2恢复
	"fileParams": [
		{
			"id": "49e0ec81d6374dfca2de945600b302f5",
			"fileType": "1",
			"name": "验证文件、删除2",
			"folderId":"6bcdc9afec8846b797b7f496d1820b3d"
		},
		{
			"id": "fc20a30f63c9486b8f88b5dd2e047349",
			"fileType": "5",
			"name": "42542",
			"folderId":"fc20a30f63c9486b8f88b5dd2e047349"
		}
	]
};


/*文件夹批量删除*/
$.documents_deletefolder = {
	"requestcommand": "documents_deletefolder",
	"requesttime": timestamp,
	"userId": "402890b55b947bfe015b948dc4660002",
	"ids": "341fa5e07e66429a94515b4ece99e11b,82aaf152f6e2459bbaf6e965ca541b81",
	"names":"1,2"
};

/*文件下载查看*/
$.documents_fileshowdownload = {
	"requestcommand": "documents_fileshowdownload",
	"requesttime": timestamp,
	"userId": "402890b55b947bfe015b948dc4660002",
	"ids": "7e39614408294352b0c9e3836cbe9abc,564632a29743482294bca88865c90410",
	"type":1
};


	/*文件夹批量下载*/
	$.documents_folderdownload = {
		"requestcommand": "documents_folderdownload",
		"requesttime": timestamp,
		"userId": "402890b55b947bfe015b948dc4660002",
		"ids": "fd1b7abd4e0f41ada60787e0299f0d55,fc20a30f63c9486b8f88b5dd2e047349",

	};


})(Test);