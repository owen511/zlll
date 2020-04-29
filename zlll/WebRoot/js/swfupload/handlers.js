/*
 * handlers. 事件处理.
 * 
 * 
 */
/* This is an example of how to cancel all the files queued up.  It's made somewhat generic.  Just pass your SWFUpload
object in to this method and it loops through cancelling the uploads. */
function cancelQueue(instance) {
	document.getElementById(instance.customSettings.cancelButtonId).disabled = true;
	instance.stopUpload();
	var stats;
	
	do {
		stats = instance.getStats();
		instance.cancelUpload();
	} while (stats.files_queued !== 0);
	
}

/* **********************
 * 事件句柄    当swfupload完成不同的任务的时候，我通常会使用这些事件句柄来控制我的web
 * 应用的行为。正因为有了这些动作行为 swfupload才会展现在我的应用中。
   Event Handlers
   These are my custom event handlers to make my
   web application behave the way I went when SWFUpload
   completes different tasks.  These aren't part of the SWFUpload
   package.  They are part of my application.  Without these none
   of the actions SWFUpload makes will show up in my application.
   ********************** */
// 文件对话框打开事件,一般不要把事件放在这里
function fileDialogStart() {
	/* I don't need to do anything here */
}
//文件成功选择后触发的事件
/*
 * fileQueued方法优先于fileDialogComplete调用，fileQueue是对话框关闭后，调用，
 * 并且每个文件对调用一次该事件，然后再调用一次fileDialogComplete事件
 * tips:是不是可以把对文件大小判断的事件放在这里也可以呢。
 */
function fileQueued(file) {
	try {
		// You might include code here that prevents the form from being submitted while the upload is in
		// progress.  Then you'll want to put code in the Queue Complete handler to "unblock" the form
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setStatus("等待上传...");
		progress.setProgressInfo(this,file,0);
		progress.toggleCancel(true, this); //将取消上传按钮设置为可用.
	} catch (ex) {
		this.debug(ex);
	}

}

//文件选择失败后触发事件（类型不对、大小不对等等）
function fileQueueError(file, errorCode, message) {
	try {
		if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
			alert("" + (message === 0 ? "您选中的文件数目已经达到上限." : "您" + (message > 1 ? "最多还可以选择 " + message + " 个文件." : " 选中的文件数目已经达到上限.")));
			return;
		}

		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setError();
		progress.toggleCancel(false);

		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			progress.setStatus("您选择的文件太大，超过了允许上传的最大值 "+this.settings.file_size_limit+".");
			this.debug("Error Code: File too big, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			progress.setStatus("您选择的文件是空文件，系统默认不允许上传空文件.");
			this.debug("Error Code: Zero byte file, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
			progress.setStatus("非法文件类型.");
			this.debug("Error Code: Invalid File Type, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		default:
			if (file !== null) {
				progress.setStatus("未知异常");
			}
			this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}


//文件对话框关闭事件。
function fileDialogComplete(numFilesSelected, numFilesQueued) {
	this.QUEUESUM = this.getStats().files_queued; //选中文件数目
	if(this.TOTALSUM+numFilesSelected <=this.settings.file_upload_limit){
		this.TOTALSUM = this.TOTALSUM+numFilesSelected;
	}
	try {
		if (this.getStats().files_queued > 0) {
			this.setTotalInfo(this.getCurLoadStatus(), this.QUEUESUCCESS, this.TOTALSUM);
		}
		
		//文件选择对话框关闭后立即上传.
		if(this.settings.autoupload!=null&&this.settings.autoupload==true){
			this.startUpload();
		}
	} catch (ex)  {
        this.debug(ex);
	}
}

//上传触发事件与startupload不同， what a fuck name it is...
//返回true继续上传，否则uploaderror捕获之
//上传开始时触发事件
function uploadStart(file) {
	try {//将需要后台获取的信息放在这儿设置.
		  var post_params = this.settings.post_params;  
		  post_params = JQ.extend (post_params,{fileName:encodeURI(file.name),product:this.settings.product,width:this.settings.img_resized_width,height:this.settings.img_resized_height}); //文件名当做参数上传，避免中文乱码，不通过request获取文件名
		  this.setPostParams(post_params);
		/* I don't want to do any file validation or anything,  I'll just update the UI and return true to indicate that the upload should start */
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setStatus("正在上传，请稍后...");
		progress.setImgStatus("img_"+file.id,1);
		progress.toggleCancel(true, this);
		this.setTotalInfo(0, this.QUEUESUCCESS, this.TOTALSUM);
	}
	catch (ex) {
	}
	
	return true;
}

//定义上传进度发生变化后的回调方法.
function uploadProgress(file, bytesLoaded, bytesTotal) {
	try {
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
		var progress = new FileProgress(file, this.customSettings.progressTarget);
			progress.setProgressBar(file.id,percent);
			progress.setStatus("已上传"+percent+"%...");
			progress.setProgressInfo(this,file,bytesLoaded);
	} catch (ex) {
		this.debug(ex);
	}
}
//文件传输完成（仅仅是发送，不管服务器是否操作serverdata表示服务器upload_url返回的信息（Window服务器需要返回一个非空值，否则success和complete都不执行）
//根据后台返回的state编码，显示不同的提示信息，数据库保存失败或者成功，网络异常，等等
function uploadSuccess(file, serverData) {
	var serverJson ;
	var fileObj;
	try{
	serverJson = eval("(" + serverData.substr(1,(serverData.length-2))+ ")");
	
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		if(typeof(serverJson)=="undefined"||serverData==""){
			progress.setImgStatus("img_"+file.id,3);
			progress.setStatus("上传失败...");
			return;
		}
		if(serverJson.state == SWFUpload.FILE_STATUS.COMPLETE){ //前后台定义文件上传状态常量要对应
			this.QUEUESUCCESS++;
			fileObj = {
					id:serverJson.GUID,
					name : serverJson.name
			};
			this.UPLOADFILEINFO.push(fileObj); //文件上传成功后，用一个全局数组记录文件的GUID（返回业务系统，可以建关联表啥的）
			progress.setImgStatus("img_"+file.id,2); 
			progress.setProgressBar(file.id,100);
			progress.setStatus("上传成功。");
			progress.setProgressInfo(this,file,file.size);
			progress.setFileGUID(serverJson.GUID);
			this.setTotalInfo(this.getCurLoadStatus(), this.QUEUESUCCESS, this.TOTALSUM); //统计信息
			progress.toggleCancel(false, this);
			serverJson = JQ.extend (serverJson,{mfile:file}); 
			this.queueEvent("successcallbackfn_handler",serverJson);
		}else if(serverJson.state == SWFUpload.FILE_STATUS.ERROR){
			progress.setImgStatus("img_"+file.id,3);
			progress.setStatus("上传失败...");
			serverJson = JQ.extend (serverJson,{mfile:file}); 
			this.queueEvent("failcallbackfn_handler",serverJson);
		}
		progress.setComplete(); //调整样式必须加
	//	progress.setStatus("上传完成");
		//progress.toggleCancel(false);
		if(this.settings.showMark){
			closeDiv();
		}

	} catch (ex) {
		this.debug(ex);
	}
}
//一个文件上传周期完成时触发（不管是否上传成功还是失败，都会触发）
function uploadComplete(file) {
	try {
		/*  I want the next upload to continue automatically so I'll call startUpload here */
		if (this.getStats().files_queued === 0) {
			document.getElementById(this.customSettings.cancelButtonId).disabled = true;
		} else {	
			this.startUpload();
		}
	} catch (ex) {
		this.debug(ex);
	}

}

//文件传输过程中出错触发事件  //如果uploadStart返回false则触发该事件，整个上传取消
function uploadError(file, errorCode, message) {
		var progress ;
	try {
		progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setError();
	//	progress.toggleCancel(false);  出错以后取消 取消上传按钮

		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
			progress.setStatus("Upload Error: " + message);
			this.debug("Error Code: HTTP Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
			progress.setStatus("Configuration Error");
			this.debug("Error Code: No backend file, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
			progress.setStatus("Upload Failed.");
			this.debug("Error Code: Upload Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.IO_ERROR:
			progress.setStatus("Server (IO) Error"); //选择文件后删除源文件则可以报这个错.
			this.debug("Error Code: IO Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
			progress.setStatus("Security Error");
			this.debug("Error Code: Security Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			progress.setStatus("Upload limit exceeded.");
			this.debug("Error Code: Upload Limit Exceeded, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
			progress.setStatus("File not found.");
			this.debug("Error Code: The file was not found, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
			progress.setStatus("Failed Validation.  Upload skipped.");
			this.debug("Error Code: File Validation Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			if (this.getStats().files_queued === 0) {
				//document.getElementById(this.customSettings.cancelButtonId).disabled = true;
			}
			progress.setStatus("上传取消.");
			progress.setCancelled();
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			progress.setStatus("Stopped");
			break;
		default:
			progress.setStatus("未知异常: " + error_code);
			this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		}
	
	} catch (ex) {
        this.debug(ex);
    }
	progress.setImgStatus("img_"+file.id, 3);
	if(this.settings.showMark){ //如果此时有遮罩层，则关闭.
		try{
			closeDiv();
		}catch(e){
			
		}
	}
}
