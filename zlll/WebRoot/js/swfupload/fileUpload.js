/*
 * 使用统一的组件管理方式将上传功能封装为功能组件
 * 封装swfupload控件上传下载的方法。提供业务系统调用的接口.
 * 使用 Ext.lt 命名空间
 * 前置条件：1.客户端安装flash for IE,flash版本最低8，IE最低版本6。 2.ROOT_PATH需要在使用页面自行定义.
 * 使用举例：
 * 		var fpd = = new Ext.lt.fileupload({
 * 				product : "fasp",
 * 				store : "ifmis_T_pubsystemset@paramcode",
 * 				file_types :　"*.jpg",
 * 				file_size : "10MB",
 * 				imagesize : {width:12,height:20},
 * 				file_upload_limit : "10",
 * 				enableMultFile : true,
 * 				onbeforeupload : dosomething,
 * 				autoupload : true,
 * 				drawToHTML : "uploadArea"
 * 			});
 * 			fpd.draw();
 * 
 */
if(Ext==null){
var Ext={};
Ext.lt={};
}
if (typeof(SWFUpload) == "undefined") {
	document.write("<script language='javascript' src='/js/swfupload/swfupload.js' ></script>");
	document.write("<script language='javascript' src='/js/swfupload/swfupload.queue.js' ></script>");
	document.write("<script language='javascript' src='/js/swfupload/fileprogress.js'  ></script>");
	document.write("<script language='javascript' src='/js/swfupload/handlers.js'   ></script>");
}
Ext.lt.fileupload   =	Ext.lt.createComponent(function(config){
	Ext.lt.ifmis.activex.getFlashVersion(); //低于10不能使用.
	var cmp={} ;//组件本身
	this.settings = config;
	cmp = this;
	cmp.draw=function(){
		if(typeof(this.settings.product) == "undefined"){
			alert("上传组件未定义产品标识！");
			return;
		}
		this.initfileupload(this.settings);
	}
	cmp.resize=function(el){
	}
	this.initfileupload = function (setting){
		this.initSettings();
		this.drawToHTML();
		this.creatSWFupload();
	}
	this.initSettings = function () {
		this.ensureDefault = function (settingName, defaultValue) {
			this.settings[settingName] = (this.settings[settingName] == undefined) ? defaultValue : this.settings[settingName];
		};
		this.ensureDefault("id", 'fileuploadcmp'+Ext.lt. getNextSeqValue());
		this.ensureDefault("product", "");
		this.ensureDefault("store", false);
		this.ensureDefault("file_types", "*.*");
		this.ensureDefault("file_size", 0);
		this.ensureDefault("imagesize", {width:0,height:0});
		this.ensureDefault("file_upload_limit", 0);
		this.ensureDefault("file_queue_limit", 0);
		this.ensureDefault("resized_width", null);
		this.ensureDefault("resized_height", null);
		this.ensureDefault("enableMultFile", false); //设定单选还是多选
		this.ensureDefault("warnlevel", "warn"); //设定警告级别
		
		this.ensureDefault("onbeforeupload", null);
		this.ensureDefault("successcallbackfn", null);
		this.ensureDefault("failcallbackfn", null);
		this.ensureDefault("self_delete", null);
		
		this.ensureDefault("autoupload", true);
		this.ensureDefault("showMark", false);
		this.ensureDefault("enableZipFile", false);
		this.ensureDefault("drawToHTML", undefined);
		this.ensureDefault("fileArray",undefined);
		delete this.ensureDefault;
	};
	//将页面定义的size转换成数字表示
	this.sizeComplete  = function(size){
		if(size.indexOf("MB")!=-1){
			return size.substr(0,size.length-2)*1024*1024;
		}else if(size.indexOf("KB")!=-1){
			return size.substr(0,size.length-2)*1024;
		}else if(size.indexOf("GB")!=-1){
			return size.substr(0,size.length-2)*1024*1024*1024;
		}else{
			return size;
		}
	}
	this.creatSWFupload = function(){
		if(typeof(file_upload)!="undefined"){
			return;
		}
		var this_product = this.settings.product;
		var this_file_size = this.sizeComplete(this.settings.file_size);
		var this_file_types = this.settings.file_types;
		var this_file_queue_limit = this.settings.file_queue_limit;
		var this_file_upload_limit = this.settings.file_upload_limit;
		var this_resized_width = this.settings.resized_width;
		var this_resized_height = this.settings.resized_height;
		var this_enableMultFile = this.settings.enableMultFile;
		var this_autoupload = this.settings.autoupload;
		var this_warnlevel = this.settings.warnlevel;
		var this_showMark = this.settings.showMark;
		var this_enableZipFile = this.settings.enableZipFile;
		
		var this_before_handler = this.settings.onbeforeupload;
		var this_successcallbackfn = this.settings.successcallbackfn;
		var this_failcallbackfn = this.settings.failcallbackfn;
		var this_fileArray = this.settings.fileArray;
		
		var this_self_delete = this.settings.self_delete;
		
		
		
		
		if(this_autoupload!=null&&this_autoupload==false){
			document.getElementById("control_btn").style.display = "block";
		}
		
		 var file_upload = new SWFUpload({
			upload_url: "/webservice.rcp?serverid=UploadService&method=upload",
			post_params: {"param" : "wfs"},
			use_query_string : true,    
			file_post_name: "file",  
			file_size_limit : "1000MB",	
			file_size : this_file_size,  
			file_types : this_file_types,
			file_types_description : "所有文件",
			file_upload_limit : this_file_upload_limit, 
			file_queue_limit : "0",
			img_resized_width : this_resized_width,
			img_resized_height : this_resized_height,
			
			product : this_product,
			fileArray : this_fileArray,
			showMark : this_showMark,
			autoupload : this_autoupload,
			warnlevel : this_warnlevel,
			enableZipFile : this_enableZipFile,
			
			//定义回调方法
			self_delete_handler :this_self_delete,
			onbeforeupload_handler: this_before_handler,
			successcallbackfn_handler : this_successcallbackfn,
			failcallbackfn_handler : this_failcallbackfn,

			// 事件处理
			file_dialog_start_handler : fileDialogStart,
			file_queued_handler : fileQueued,
			file_queue_error_handler : fileQueueError,
			file_dialog_complete_handler : fileDialogComplete,
			upload_start_handler : uploadStart,
			upload_progress_handler : uploadProgress,
			upload_error_handler : uploadError,
			upload_success_handler : uploadSuccess,
			upload_complete_handler : uploadComplete,

			// 按钮的处理
		    button_image_url : ROOT_PATH+"ifmis_images/common_upload/upfile.png",
			button_placeholder_id : "spanButtonPlaceholder1",
			button_width: 65,
			button_height: 22,
			button_placeholder_id: "spanButtonPlaceHolder1",
			button_text_style: ".theFont { font-size: 12; }",
			button_text_left_padding: 12,
			button_text_top_padding: 2,
			button_action :this_enableMultFile?SWFUpload.BUTTON_ACTION.SELECT_FILES:SWFUpload.BUTTON_ACTION.SELECT_FILE,
			button_window_mode:SWFUpload.WINDOW_MODE.OPAQUE, 
			flash_url : ROOT_PATH+"js/swfupload/swfupload.swf",
			custom_settings : {
				progressTarget : "fsUploadProgress1",
				cancelButtonId : "btnCancel1"
			},
			debug: false
		});
		 this.setSWFupload(file_upload);
	}
	//上传组件SWF对象实例化.
	this.setSWFupload = function (swfobj){
		if(swfobj!=null){
			this.SWFINSTANCE = swfobj;
		}
	}
	//接口返回文件上传的FILEGUID数组。
	this.getFileGUID = function (){
		return this.SWFINSTANCE.getUploadFileInfo();
	}
	//接口 返回最近一次上传成功的文件GUID;
	this.getLastFileGUID = function(){
		var fileArray = this.getFileGUID();
		if(fileArray.length >0){
			return fileArray[fileArray.length-1];
		}
	}
	/*
	 * 将上传区域画到指定div中.如果该容器div不存在则返回。
	 */
	this.drawToHTML = function(){
		var instance = this; 
		var outContainer = document.getElementById(this.settings.drawToHTML);
		if(outContainer  == null){
			return false;
		}
		var container = document.createElement("div");
		container.id = "uploadarea";
		var controlDiv = document.createElement("div");
		controlDiv.style.float="left";
		controlDiv.className = "controlDiv";
		var swfDiv = document.createElement("div");
		swfDiv.className = "swfbtnDiv";
		var swfbtn  = document.createElement("span");
		swfbtn.id="spanButtonPlaceholder1";
		swfbtn.style.display = "none";
		swfDiv.appendChild(swfbtn);
		var upDiv = document.createElement("div");
		upDiv.className = "uploadbtnDiv";
		var uploadbtn = document.createElement("input");
		uploadbtn.id="control_btn";
		uploadbtn.type="button";
		uploadbtn.value="";
		uploadbtn.className ="inp_L1";
		uploadbtn.onmouseover = function(){
			this.className='inp_L2';
		}
		uploadbtn.onmouseout = function(){
			this.className='inp_L1';
		}
		uploadbtn.onclick = function(){
			if(instance.SWFINSTANCE!=undefined)instance.SWFINSTANCE.startUpload();
		};
		uploadbtn.style.display = "none";
		upDiv.appendChild(uploadbtn);
		var totalInfo = document.createElement("div");
		totalInfo.id = "totalInfo";
		totalInfo.className = "totalInfo";
		var showDiv = document.createElement("div");
		showDiv.id = "fsUploadProgress1";
		showDiv.className = "fieldsetflash";
		controlDiv.appendChild(swfDiv);
		controlDiv.appendChild(upDiv);
		container.appendChild(controlDiv);
		container.appendChild(totalInfo);
		container.appendChild(showDiv);
		outContainer.appendChild(container);
	}
	return cmp;
});






/**********下载组件*******/
/*
 * 暂时只支持图片以及DOC文档的预览其他不支持.
 * 对于图片的预览有三种方式 . 自定义DIV;TipsDIV;遮罩层DIV.
 * <1>详细属性：
 * fileid ：文件GUID
 * product : 产品标识
 * drawToHTML ：页面HTML元素， 自定义图片预览方式选择自定义方式，则将图片画在该DIV中，在指定类型为self为后 有效
 * file_type ：预览文件类型.现支持图片类文件预览，文档类预览在开发中...
 * ori_img   ：false - 查看 缩略图 ; true - 查看原图 ,默认为false
 * width ： 指定 显示宽度  不指定 自动适应
 * height： 指定显示高度   不指定 自动适应
 * show_type  ：预览方式 ：  pop - 弹出网页；inner -  遮罩层DIV ；self -自定义DIV展示，默认为pop
 * <2>方法:
 * show(obj) ：预览图片
 * download(obj)： 下载图片
 */
Ext.lt.filedownload = Ext.lt.createComponent(function(){
	var cmp={} ;//组件本身
	cmp = this;
	cmp.MaxWidth  = 400; //自适应宽度和高度的最大值。如果不指定img高度和宽度，最多是和这个.
	cmp.MaxHeight = 400;
	cmp.method = "getSmallImg"; //默认向后台传递getSmallImg方法，获取缩略图，如果指定指定ori_img为true， 则使用preview方法展示原图.
	cmp.draw=function(){ 
	}
	cmp.resize=function(el){
	}
	cmp.show=function(obj){ 
		if(typeof(obj)!="object"||obj == null){
			return ;
		}
		if(obj.file_type !="img" ){
			alert("暂时只支持图片文件的预览...");
			return;
		}
		if(obj.ori_img == true){
			this.method = "preview";
		}
		if(typeof(obj.show_type)!="undefined"&&obj.show_type=="self"){
			this.drawToDiv(obj);
		}else if(typeof(obj.show_type)=="undefined"||obj.show_type=="pop"){
			this.openNewWindow(obj);
		}else if(obj.show_type=="inner"){
			this.showMark(obj);
		}
	}
	//在新窗口中打开图片.
	cmp.openNewWindow = function(obj){
		var width = 600;
		var height = 450;
		if(typeof(obj.width) != "undefined"){
			width = obj.width;
		}
		if(typeof(obj.height) != "undefined"){
			height = obj.height;
		}
		var iTop = (window.screen.availHeight-height)/2;
	    var iLeft = (window.screen.availWidth-width)/2; 
		window.open(ROOT_PATH+"/webservicedown.rcp?serverid=UploadService&method="+this.method+"&fileGUID="+obj.fileid+"&product="+obj.product+"&random2="+Math.random()*10000, '','width='+width+'px,height='+height+'px,top='+iTop+',left='+iLeft+',status=yes,toolbar=no,menubar=no,directories=no,resizable=yes,Scrollbars=yes,help:No');
	}
	//将图片画到自定义DIV中
	cmp.drawToDiv = function(obj){
		if(typeof(obj.drawToHTML)==undefined ||document.getElementById(obj.drawToHTML) == null){ //自定义展示DIV如果没有相应DIV则返回.
			return;
		}
		var showEle ;
		if(obj.file_type == "img"){
			showEle = document.createElement("img");
		}
		showEle.id = "SWFElement_"+obj.fileid;
		showEle.src = "/webservicedown.rcp?serverid=UploadService&method="+this.method+"&fileGUID="+obj.fileid+"&product="+obj.product+"&random2="+Math.random()*10000;
		showEle.width = this.getImgWidth(obj); 
		showEle.height = this.getImgHeight(obj);
		try{
		var elDIV = document.getElementById(obj.drawToHTML);
		elDIV.appendChild(showEle);
		}catch(e){
		}
	}
	//关闭遮罩层.
	cmp.closeMark = function(){
		try{
	 	var d_mask=document.getElementById('mask33');
	    var d_dialog = document.getElementById('showContainer');
	    d_mask.style.width=0;
	    d_mask.style.height=0;
	    d_mask.style.visibility='hidden';
	    d_dialog.style.visibility='hidden';
	    d_dialog.style.display='none';
		}catch(e){
		}
		document.onkeydown ="";
	}
	//遮罩层展示图片.
	cmp.showMark = function(obj){
				var instance = this;
				if (typeof (obj) != "object" || obj == null) {
					return;
				}
				if (!document.getElementById("mask33")) {
					var d_mask = document.createElement('div');
					d_mask.id = "mask33";
					document.body.appendChild(d_mask);
				} else {
					var d_mask = document.getElementById("mask33");
				}
				if (!document.getElementById("showContainer")) {
					var d_dialog = document.createElement('div');
					d_dialog.id = "showContainer";
					var objHtml = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
					objHtml = objHtml + "<tr><td>";
					objHtml = objHtml
							+ "<div id=\"showClose\" class=\"showClose\"><a  href=\"#\" ><font color='white'>[关闭]</font></a></div>";
					objHtml = objHtml
							+ "<div id=\"showImg\" class=\"showImg\"><span style='display:block;color:white;font-size:18px;'><img src=\"/ifmis_images/common_upload/loading2.gif\"/>图片读取可能比较慢，请稍后……</span>";
					objHtml = objHtml + "</div></td></tr></table>";
					d_dialog.innerHTML = '' + objHtml + '';
					document.body.appendChild(d_dialog);
					document.getElementById("showClose").onclick = function() {
						instance.closeMark();
					}
				} else {
					var d_dialog = document.getElementById('showContainer');
					var objHtml = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
					objHtml = objHtml + "<tr><td>";
					objHtml = objHtml
							+ "<div id=\"showClose\" class=\"showClose\"><a  href=\"#\" ><font color='white'>[关闭]</font></a></div>";
					objHtml = objHtml
							+ "<div id=\"showImg\" class=\"showImg\"><span style='display:block;color:white;font-size:18px;'><img src=\"/ifmis_images/common_upload/loading2.gif\"/>图片读取可能比较慢，请稍后……</span>";
					objHtml = objHtml + "</div></td></tr></table>";
					d_dialog.innerHTML = '' + objHtml + '';
					document.getElementById("showClose").onclick = function() {
						instance.closeMark();
					}
					
				}
				var vwidth = screen.width;
				var dialogWidth = document.body.offsetWidth;
				var vheight = screen.height;
				var dialogHeight = document.body.offsetHeight;
				d_mask.style.width = vwidth;
				d_mask.style.height = vheight;

				d_dialog.style.left = dialogWidth / 2 - 100;
				d_dialog.style.top = dialogHeight / 2 - 10;
				d_mask.style.visibility = 'visible';
				d_dialog.style.visibility = 'visible';
				d_dialog.style.display = 'block';
				var imgDIV = document.getElementById("showImg");
				var closeDIV = document.getElementById("showClose");
				var oriWidth = 0;
				var oriHeight = 0;
				var newWidth = 0;
				var newHeight = 0;
				var clickFlag = false;
				var objImg = document.createElement("img");
				objImg.src = "/webservicedown.rcp?serverid=UploadService&method="+this.method+"&fileGUID="+obj.fileid+"&product="+obj.product+"&random2="+Math.random()*10000;
				objImg.onclick = function() {	//图片单击方法 如果原图大小小于可视区，查看原图，如果大于body大小，采用dialogWidth-30
					clickFlag = !clickFlag;
					if (clickFlag) {
						this.title = "单击还原,按Esc键关闭.";
						this.width = dialogWidth - oriWidth > 0 ? oriWidth
								: dialogWidth-30;
						this.height = dialogHeight - oriHeight > 0 ? oriHeight
								: dialogHeight-30;
						imgDIV.style.height = this.height;
						imgDIV.style.width = this.width;
						closeDIV.style.width = this.width;
					} else {
						this.width = newWidth;
						this.height = newHeight;
						imgDIV.style.height = this.height;
						imgDIV.style.width = this.width;
						closeDIV.style.width = this.width;
					}
					d_dialog.style.left = (dialogWidth - this.width) / 2 - 10;
					d_dialog.style.top = (dialogHeight - this.height) / 2 - 10;
				}
				objImg.title = "单击查看大图,按Esc键关闭.";
				objImg.onreadystatechange = function() {
					if (this.readyState == "complete") {
						oriWidth = objImg.width;
						oriHeight = objImg.height;
						if (oriWidth > dialogWidth / 2) { //原图大于可视区的一半，取dialogWidth - 300
							objImg.width = dialogWidth - 300;
						}
						if (oriHeight > dialogHeight / 2) {
							objImg.height = dialogHeight - 200;
						}
						if (oriWidth < imgDIV.offsetWidth) { //原图小于外层DIV，则铺满该DIV。
							objImg.width = imgDIV.offsetWidth;
						}
						if (oriHeight < imgDIV.offsetHeight) {
							objImg.height = imgDIV.offsetHeight;
						}
						imgDIV.style.height = this.height;
						imgDIV.style.width = this.width;
						newWidth = this.width;
						newHeight = this.height;
						imgDIV.removeChild(imgDIV.lastChild);
						imgDIV.appendChild(objImg);
						d_dialog.style.left = (dialogWidth - objImg.width) / 2 - 10; //位置居中
						d_dialog.style.top = (dialogHeight - objImg.height) / 2 - 10;
						document.onkeydown = function(e) { // Esc退出.
							var e = e ? e : window.event;
							if (e.keyCode == "27") {
								instance.closeMark();
							}
						}
					}
				}
				//hiddselect(true);
	}
	//获取合适的图片宽度
	cmp.getImgWidth = function (thisObj){
		if(thisObj == null){
			return 0;
		}
		if(typeof(thisObj.width) == "undefined"){
			return this.MaxWidth;
		}
		return thisObj.width;
	}
	//获取合适的图片高度
	cmp.getImgHeight = function (thisObj){
		if(thisObj == null){
			return 0;
		}
		if(typeof(thisObj.height) == "undefined"){
			return this.MaxHeight;
		}
		return thisObj.height;
	}
	// 下载组件下载方法.
	cmp.download=function(obj){
		if(typeof(obj)!="object"||obj == null){
			return ;
		}
		var dform = document.createElement("form");
		dform.id = "SWFFORM_"+obj.fileid;
		dform.method = "post";
		dform.action = "/webservicedown.rcp?serverid=UploadService&method=download&fileGUID="+obj.fileid+"&product="+obj.product+"&random2="+Math.random()*10000;
/*		var inputServer = document.createElement("input");
		inputServer.name = "serverid";
		inputServer.value = ""*/
		document.body.appendChild(dform);
		dform.submit();
	}
});
