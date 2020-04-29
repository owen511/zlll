/*
 * handlers. �¼�����.
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
 * �¼����    ��swfupload��ɲ�ͬ�������ʱ����ͨ����ʹ����Щ�¼�����������ҵ�web
 * Ӧ�õ���Ϊ������Ϊ������Щ������Ϊ swfupload�Ż�չ�����ҵ�Ӧ���С�
   Event Handlers
   These are my custom event handlers to make my
   web application behave the way I went when SWFUpload
   completes different tasks.  These aren't part of the SWFUpload
   package.  They are part of my application.  Without these none
   of the actions SWFUpload makes will show up in my application.
   ********************** */
// �ļ��Ի�����¼�,һ�㲻Ҫ���¼���������
function fileDialogStart() {
	/* I don't need to do anything here */
}
//�ļ��ɹ�ѡ��󴥷����¼�
/*
 * fileQueued����������fileDialogComplete���ã�fileQueue�ǶԻ���رպ󣬵��ã�
 * ����ÿ���ļ��Ե���һ�θ��¼���Ȼ���ٵ���һ��fileDialogComplete�¼�
 * tips:�ǲ��ǿ��԰Ѷ��ļ���С�жϵ��¼���������Ҳ�����ء�
 */
function fileQueued(file) {
	try {
		// You might include code here that prevents the form from being submitted while the upload is in
		// progress.  Then you'll want to put code in the Queue Complete handler to "unblock" the form
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setStatus("�ȴ��ϴ�...");
		progress.setProgressInfo(this,file,0);
		progress.toggleCancel(true, this); //��ȡ���ϴ���ť����Ϊ����.
	} catch (ex) {
		this.debug(ex);
	}

}

//�ļ�ѡ��ʧ�ܺ󴥷��¼������Ͳ��ԡ���С���Եȵȣ�
function fileQueueError(file, errorCode, message) {
	try {
		if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
			alert("" + (message === 0 ? "��ѡ�е��ļ���Ŀ�Ѿ��ﵽ����." : "��" + (message > 1 ? "��໹����ѡ�� " + message + " ���ļ�." : " ѡ�е��ļ���Ŀ�Ѿ��ﵽ����.")));
			return;
		}

		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setError();
		progress.toggleCancel(false);

		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			progress.setStatus("��ѡ����ļ�̫�󣬳����������ϴ������ֵ "+this.settings.file_size_limit+".");
			this.debug("Error Code: File too big, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			progress.setStatus("��ѡ����ļ��ǿ��ļ���ϵͳĬ�ϲ������ϴ����ļ�.");
			this.debug("Error Code: Zero byte file, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
			progress.setStatus("�Ƿ��ļ�����.");
			this.debug("Error Code: Invalid File Type, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		default:
			if (file !== null) {
				progress.setStatus("δ֪�쳣");
			}
			this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}


//�ļ��Ի���ر��¼���
function fileDialogComplete(numFilesSelected, numFilesQueued) {
	this.QUEUESUM = this.getStats().files_queued; //ѡ���ļ���Ŀ
	if(this.TOTALSUM+numFilesSelected <=this.settings.file_upload_limit){
		this.TOTALSUM = this.TOTALSUM+numFilesSelected;
	}
	try {
		if (this.getStats().files_queued > 0) {
			this.setTotalInfo(this.getCurLoadStatus(), this.QUEUESUCCESS, this.TOTALSUM);
		}
		
		//�ļ�ѡ��Ի���رպ������ϴ�.
		if(this.settings.autoupload!=null&&this.settings.autoupload==true){
			this.startUpload();
		}
	} catch (ex)  {
        this.debug(ex);
	}
}

//�ϴ������¼���startupload��ͬ�� what a fuck name it is...
//����true�����ϴ�������uploaderror����֮
//�ϴ���ʼʱ�����¼�
function uploadStart(file) {
	try {//����Ҫ��̨��ȡ����Ϣ�����������.
		  var post_params = this.settings.post_params;  
		  post_params = JQ.extend (post_params,{fileName:encodeURI(file.name),product:this.settings.product,width:this.settings.img_resized_width,height:this.settings.img_resized_height}); //�ļ������������ϴ��������������룬��ͨ��request��ȡ�ļ���
		  this.setPostParams(post_params);
		/* I don't want to do any file validation or anything,  I'll just update the UI and return true to indicate that the upload should start */
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setStatus("�����ϴ������Ժ�...");
		progress.setImgStatus("img_"+file.id,1);
		progress.toggleCancel(true, this);
		this.setTotalInfo(0, this.QUEUESUCCESS, this.TOTALSUM);
	}
	catch (ex) {
	}
	
	return true;
}

//�����ϴ����ȷ����仯��Ļص�����.
function uploadProgress(file, bytesLoaded, bytesTotal) {
	try {
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
		var progress = new FileProgress(file, this.customSettings.progressTarget);
			progress.setProgressBar(file.id,percent);
			progress.setStatus("���ϴ�"+percent+"%...");
			progress.setProgressInfo(this,file,bytesLoaded);
	} catch (ex) {
		this.debug(ex);
	}
}
//�ļ�������ɣ������Ƿ��ͣ����ܷ������Ƿ����serverdata��ʾ������upload_url���ص���Ϣ��Window��������Ҫ����һ���ǿ�ֵ������success��complete����ִ�У�
//���ݺ�̨���ص�state���룬��ʾ��ͬ����ʾ��Ϣ�����ݿⱣ��ʧ�ܻ��߳ɹ��������쳣���ȵ�
function uploadSuccess(file, serverData) {
	var serverJson ;
	var fileObj;
	try{
	serverJson = eval("(" + serverData.substr(1,(serverData.length-2))+ ")");
	
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		if(typeof(serverJson)=="undefined"||serverData==""){
			progress.setImgStatus("img_"+file.id,3);
			progress.setStatus("�ϴ�ʧ��...");
			return;
		}
		if(serverJson.state == SWFUpload.FILE_STATUS.COMPLETE){ //ǰ��̨�����ļ��ϴ�״̬����Ҫ��Ӧ
			this.QUEUESUCCESS++;
			fileObj = {
					id:serverJson.GUID,
					name : serverJson.name
			};
			this.UPLOADFILEINFO.push(fileObj); //�ļ��ϴ��ɹ�����һ��ȫ�������¼�ļ���GUID������ҵ��ϵͳ�����Խ�������ɶ�ģ�
			progress.setImgStatus("img_"+file.id,2); 
			progress.setProgressBar(file.id,100);
			progress.setStatus("�ϴ��ɹ���");
			progress.setProgressInfo(this,file,file.size);
			progress.setFileGUID(serverJson.GUID);
			this.setTotalInfo(this.getCurLoadStatus(), this.QUEUESUCCESS, this.TOTALSUM); //ͳ����Ϣ
			progress.toggleCancel(false, this);
			serverJson = JQ.extend (serverJson,{mfile:file}); 
			this.queueEvent("successcallbackfn_handler",serverJson);
		}else if(serverJson.state == SWFUpload.FILE_STATUS.ERROR){
			progress.setImgStatus("img_"+file.id,3);
			progress.setStatus("�ϴ�ʧ��...");
			serverJson = JQ.extend (serverJson,{mfile:file}); 
			this.queueEvent("failcallbackfn_handler",serverJson);
		}
		progress.setComplete(); //������ʽ�����
	//	progress.setStatus("�ϴ����");
		//progress.toggleCancel(false);
		if(this.settings.showMark){
			closeDiv();
		}

	} catch (ex) {
		this.debug(ex);
	}
}
//һ���ļ��ϴ��������ʱ�����������Ƿ��ϴ��ɹ�����ʧ�ܣ����ᴥ����
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

//�ļ���������г������¼�  //���uploadStart����false�򴥷����¼��������ϴ�ȡ��
function uploadError(file, errorCode, message) {
		var progress ;
	try {
		progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setError();
	//	progress.toggleCancel(false);  �����Ժ�ȡ�� ȡ���ϴ���ť

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
			progress.setStatus("Server (IO) Error"); //ѡ���ļ���ɾ��Դ�ļ�����Ա������.
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
			progress.setStatus("�ϴ�ȡ��.");
			progress.setCancelled();
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			progress.setStatus("Stopped");
			break;
		default:
			progress.setStatus("δ֪�쳣: " + error_code);
			this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		}
	
	} catch (ex) {
        this.debug(ex);
    }
	progress.setImgStatus("img_"+file.id, 3);
	if(this.settings.showMark){ //�����ʱ�����ֲ㣬��ر�.
		try{
			closeDiv();
		}catch(e){
			
		}
	}
}
