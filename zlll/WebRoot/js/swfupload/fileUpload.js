/*
 * ʹ��ͳһ���������ʽ���ϴ����ܷ�װΪ�������
 * ��װswfupload�ؼ��ϴ����صķ������ṩҵ��ϵͳ���õĽӿ�.
 * ʹ�� Ext.lt �����ռ�
 * ǰ��������1.�ͻ��˰�װflash for IE,flash�汾���8��IE��Ͱ汾6�� 2.ROOT_PATH��Ҫ��ʹ��ҳ�����ж���.
 * ʹ�þ�����
 * 		var fpd = = new Ext.lt.fileupload({
 * 				product : "fasp",
 * 				store : "ifmis_T_pubsystemset@paramcode",
 * 				file_types :��"*.jpg",
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
	Ext.lt.ifmis.activex.getFlashVersion(); //����10����ʹ��.
	var cmp={} ;//�������
	this.settings = config;
	cmp = this;
	cmp.draw=function(){
		if(typeof(this.settings.product) == "undefined"){
			alert("�ϴ����δ�����Ʒ��ʶ��");
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
		this.ensureDefault("enableMultFile", false); //�趨��ѡ���Ƕ�ѡ
		this.ensureDefault("warnlevel", "warn"); //�趨���漶��
		
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
	//��ҳ�涨���sizeת�������ֱ�ʾ
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
			file_types_description : "�����ļ�",
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
			
			//����ص�����
			self_delete_handler :this_self_delete,
			onbeforeupload_handler: this_before_handler,
			successcallbackfn_handler : this_successcallbackfn,
			failcallbackfn_handler : this_failcallbackfn,

			// �¼�����
			file_dialog_start_handler : fileDialogStart,
			file_queued_handler : fileQueued,
			file_queue_error_handler : fileQueueError,
			file_dialog_complete_handler : fileDialogComplete,
			upload_start_handler : uploadStart,
			upload_progress_handler : uploadProgress,
			upload_error_handler : uploadError,
			upload_success_handler : uploadSuccess,
			upload_complete_handler : uploadComplete,

			// ��ť�Ĵ���
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
	//�ϴ����SWF����ʵ����.
	this.setSWFupload = function (swfobj){
		if(swfobj!=null){
			this.SWFINSTANCE = swfobj;
		}
	}
	//�ӿڷ����ļ��ϴ���FILEGUID���顣
	this.getFileGUID = function (){
		return this.SWFINSTANCE.getUploadFileInfo();
	}
	//�ӿ� �������һ���ϴ��ɹ����ļ�GUID;
	this.getLastFileGUID = function(){
		var fileArray = this.getFileGUID();
		if(fileArray.length >0){
			return fileArray[fileArray.length-1];
		}
	}
	/*
	 * ���ϴ����򻭵�ָ��div��.���������div�������򷵻ء�
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






/**********�������*******/
/*
 * ��ʱֻ֧��ͼƬ�Լ�DOC�ĵ���Ԥ��������֧��.
 * ����ͼƬ��Ԥ�������ַ�ʽ . �Զ���DIV;TipsDIV;���ֲ�DIV.
 * <1>��ϸ���ԣ�
 * fileid ���ļ�GUID
 * product : ��Ʒ��ʶ
 * drawToHTML ��ҳ��HTMLԪ�أ� �Զ���ͼƬԤ����ʽѡ���Զ��巽ʽ����ͼƬ���ڸ�DIV�У���ָ������ΪselfΪ�� ��Ч
 * file_type ��Ԥ���ļ�����.��֧��ͼƬ���ļ�Ԥ�����ĵ���Ԥ���ڿ�����...
 * ori_img   ��false - �鿴 ����ͼ ; true - �鿴ԭͼ ,Ĭ��Ϊfalse
 * width �� ָ�� ��ʾ���  ��ָ�� �Զ���Ӧ
 * height�� ָ����ʾ�߶�   ��ָ�� �Զ���Ӧ
 * show_type  ��Ԥ����ʽ ��  pop - ������ҳ��inner -  ���ֲ�DIV ��self -�Զ���DIVչʾ��Ĭ��Ϊpop
 * <2>����:
 * show(obj) ��Ԥ��ͼƬ
 * download(obj)�� ����ͼƬ
 */
Ext.lt.filedownload = Ext.lt.createComponent(function(){
	var cmp={} ;//�������
	cmp = this;
	cmp.MaxWidth  = 400; //����Ӧ��Ⱥ͸߶ȵ����ֵ�������ָ��img�߶ȺͿ�ȣ�����Ǻ����.
	cmp.MaxHeight = 400;
	cmp.method = "getSmallImg"; //Ĭ�����̨����getSmallImg��������ȡ����ͼ�����ָ��ָ��ori_imgΪtrue�� ��ʹ��preview����չʾԭͼ.
	cmp.draw=function(){ 
	}
	cmp.resize=function(el){
	}
	cmp.show=function(obj){ 
		if(typeof(obj)!="object"||obj == null){
			return ;
		}
		if(obj.file_type !="img" ){
			alert("��ʱֻ֧��ͼƬ�ļ���Ԥ��...");
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
	//���´����д�ͼƬ.
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
	//��ͼƬ�����Զ���DIV��
	cmp.drawToDiv = function(obj){
		if(typeof(obj.drawToHTML)==undefined ||document.getElementById(obj.drawToHTML) == null){ //�Զ���չʾDIV���û����ӦDIV�򷵻�.
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
	//�ر����ֲ�.
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
	//���ֲ�չʾͼƬ.
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
							+ "<div id=\"showClose\" class=\"showClose\"><a  href=\"#\" ><font color='white'>[�ر�]</font></a></div>";
					objHtml = objHtml
							+ "<div id=\"showImg\" class=\"showImg\"><span style='display:block;color:white;font-size:18px;'><img src=\"/ifmis_images/common_upload/loading2.gif\"/>ͼƬ��ȡ���ܱȽ��������Ժ󡭡�</span>";
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
							+ "<div id=\"showClose\" class=\"showClose\"><a  href=\"#\" ><font color='white'>[�ر�]</font></a></div>";
					objHtml = objHtml
							+ "<div id=\"showImg\" class=\"showImg\"><span style='display:block;color:white;font-size:18px;'><img src=\"/ifmis_images/common_upload/loading2.gif\"/>ͼƬ��ȡ���ܱȽ��������Ժ󡭡�</span>";
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
				objImg.onclick = function() {	//ͼƬ�������� ���ԭͼ��СС�ڿ��������鿴ԭͼ���������body��С������dialogWidth-30
					clickFlag = !clickFlag;
					if (clickFlag) {
						this.title = "������ԭ,��Esc���ر�.";
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
				objImg.title = "�����鿴��ͼ,��Esc���ر�.";
				objImg.onreadystatechange = function() {
					if (this.readyState == "complete") {
						oriWidth = objImg.width;
						oriHeight = objImg.height;
						if (oriWidth > dialogWidth / 2) { //ԭͼ���ڿ�������һ�룬ȡdialogWidth - 300
							objImg.width = dialogWidth - 300;
						}
						if (oriHeight > dialogHeight / 2) {
							objImg.height = dialogHeight - 200;
						}
						if (oriWidth < imgDIV.offsetWidth) { //ԭͼС�����DIV����������DIV��
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
						d_dialog.style.left = (dialogWidth - objImg.width) / 2 - 10; //λ�þ���
						d_dialog.style.top = (dialogHeight - objImg.height) / 2 - 10;
						document.onkeydown = function(e) { // Esc�˳�.
							var e = e ? e : window.event;
							if (e.keyCode == "27") {
								instance.closeMark();
							}
						}
					}
				}
				//hiddselect(true);
	}
	//��ȡ���ʵ�ͼƬ���
	cmp.getImgWidth = function (thisObj){
		if(thisObj == null){
			return 0;
		}
		if(typeof(thisObj.width) == "undefined"){
			return this.MaxWidth;
		}
		return thisObj.width;
	}
	//��ȡ���ʵ�ͼƬ�߶�
	cmp.getImgHeight = function (thisObj){
		if(thisObj == null){
			return 0;
		}
		if(typeof(thisObj.height) == "undefined"){
			return this.MaxHeight;
		}
		return thisObj.height;
	}
	// ����������ط���.
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
