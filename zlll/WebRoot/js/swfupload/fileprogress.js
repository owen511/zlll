/*
 * չʾ�ļ��ϴ����̺���Ϣ.
 * ������SWFUPLOAD���еĴ���ֻ��Ϊ����������������
 * 
 */
/*
*	A simple class for displaying file information and progress
*	Note: This is a demonstration only and not part of SWFUpload.
*	Note: Some have had problems adapting this class in IE7. It may not be suitable for your application.
*/

// Constructor
// file is a SWFUpload file object
// targetID is the HTML element id attribute that the FileProgress HTML structure will be added to.
// Instantiating a new FileProgress object with an existing file will reuse/update the existing DOM elements
function FileProgress(file, targetID) {
	this.fileProgressID = file.id;
	this.opacity = 100; //��͸��
	this.height = 0;
	

	this.fileProgressWrapper = document.getElementById(this.fileProgressID); 
	if (!this.fileProgressWrapper) { // �½��ϴ�����ҳ������div    //ҳ�������ʾ����
		this.fileProgressWrapper = document.createElement("div"); //��������
		this.fileProgressWrapper.className = "progressWrapper";
		this.fileProgressWrapper.id = this.fileProgressID;
		//this.fileProgressWrapper.style.marginTop ="3px"; 
		this.fileProgressElement = document.createElement("div"); //��DIV��û��
		this.fileProgressElement.className = "progressContainer";

		var progressCancel = document.createElement("div"); //ȡ���ϴ� ���� ���������������Ͻ�ȡ��
		progressCancel.className = "progressCancel";
		//progressCancel.style.visibility = "hidden";
		progressCancel.innerHTML="<div  class='cancle'><form id = 'form_"+this.fileProgressID+"'  method='post' ><A id='a_"+this.fileProgressID+"' href='#'>ȡ��</A><input type ='hidden' name='fileGUID'><input type ='hidden' name='product'></form></div>";
		
		
/*		var progressCancel = document.createElement("a"); //ȡ���ϴ� ���� ���������������Ͻ�ȡ��
		progressCancel.className = "progressCancel";
		progressCancel.href = "#";  
		//progressCancel.style.visibility = "hidden";
		progressCancel.appendChild(document.createTextNode("ȡ���ϴ�"));*/

		var progressText = document.createElement("div"); //��ʾ�ļ���DIV
		progressText.className = "progressName";
		progressText.appendChild(document.createTextNode(file.name));
		progressText.title = file.name;

		var progressBar = document.createElement("div");   //������DIV ����ܵĽ������Ž���
		progressBar.className = "progressBarInProgress";

		var innerBar = document.createElement("span");
		innerBar.className = "progressBar";
		innerBar.id="bar_"+this.fileProgressID;
		progressBar.appendChild(innerBar);
		
		var progressInfo = document.createElement("div"); //��ʾ�ļ���DIV ��ʽ���Ʋ�Ҫ����
		progressInfo.id = "uploadInfo_"+this.fileProgressID;
		//progressInfo.style.height  = "35px";
		//progressInfo.style.width  = "100px";
		progressInfo.className="progressInfo";
		//progressInfo.style.whiteSpace  = "nowrap";
		progressInfo.innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp";//����д�ϴ���ϸ��Ϣ
		

		var progressImg = document.createElement("div");   //
		progressImg.className = "progressImg";
		
		var Img = document.createElement("img");   //ͼƬ
		Img.id = "img_"+this.fileProgressID;
		Img.className = "progressImg";
		Img.alt = "img";
		Img.src = ROOT_PATH+"ifmis_images/common_upload/delete.png";
		Img.style.display = "block";
		
		var progressStatus = document.createElement("div");   //�����߷��ϴ�����������Ϣ
		progressStatus.className = "progressBarStatus";
		progressStatus.id = "status_"+this.fileProgressID;
		progressStatus.innerHTML = "&nbsp;";

		progressImg.appendChild(Img);
		//progressImg.appendChild(progressStatus);
		
		var progressline = document.createElement("div");   //���DIV����û�ö�
		progressline.innerHTML = "<hr  style='width:500'>";
		progressline.className = "progressline";
		
		
		this.fileProgressElement.appendChild(progressText);  //��һ������ �ļ���
		this.fileProgressElement.appendChild(progressBar); //�ڶ������ӽ�����
		this.fileProgressElement.appendChild(progressCancel); //���������ӷ�  ȡ��/ֹͣ/���ذ�ť
		this.fileProgressElement.appendChild(progressImg); //���ĸ����ӷ�IMG
		this.fileProgressElement.appendChild(progressStatus);  //��������ӷ��ϴ�״̬
		this.fileProgressElement.appendChild(progressInfo); //���������ӷ��ļ���Ϣ
		this.fileProgressElement.appendChild(progressline);	//���߸����ӷ�����
		this.fileProgressWrapper.appendChild(this.fileProgressElement);
		document.getElementById(targetID).appendChild(this.fileProgressWrapper);
	} else {
		this.fileProgressElement = this.fileProgressWrapper.firstChild; //��ǰ�ϴ���Ϣ���������ô���
	//	this.reset(); //do something
	}
	this.setClickHandle();
	this.height = this.fileProgressWrapper.offsetHeight;
	//this.setTimer(null);


}
//ÿ��progress��Ӧһ�� fileGUID
FileProgress.prototype.fileGUID = -1;

//�ϴ��ɹ��󷵻ظ��ļ���GUID����������
FileProgress.prototype.setFileGUID = function (id){
	this.fileGUID = id;
}

FileProgress.prototype.setTimer = function (timer) {
	this.fileProgressElement["FP_TIMER"] = timer;
};
FileProgress.prototype.getTimer = function (timer) {
	return this.fileProgressElement["FP_TIMER"] || null;
};

FileProgress.prototype.reset = function () {
	this.fileProgressElement.className = "progressContainer";
	this.fileProgressElement.childNodes[4].innerHTML = "&nbsp;";
	this.fileProgressElement.childNodes[4].className = "progressBarStatus";
	
	this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
	this.fileProgressElement.childNodes[3].style.width = "0%";
	
	this.appear();	
};

FileProgress.prototype.setProgress = function (percentage) {
/*	this.fileProgressElement.className = "progressContainer green";
	this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
	this.fileProgressElement.childNodes[3].style.width = percentage + "%";
*/
	this.appear();	
};
FileProgress.prototype.setComplete = function () {
/*	this.fileProgressElement.className = "progressContainer blue";
	this.fileProgressElement.childNodes[3].className = "progressBarComplete";
	this.fileProgressElement.childNodes[3].style.width = "";
*/
	var oSelf = this;
	this.setTimer(setTimeout(function () {
		//oSelf.disappear();
	}, 10000));
};
FileProgress.prototype.setError = function () {
	this.fileProgressElement.className = "progressContainer red";
/*	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";
*/
	var oSelf = this;
	this.setTimer(setTimeout(function () {
		//oSelf.disappear();
	}, 5000));
};
FileProgress.prototype.setCancelled = function () {
	this.fileProgressElement.className = "progressContainer";
/*	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";*/

	var oSelf = this;
	this.setTimer(setTimeout(function () {
	//	oSelf.disappear();
	}, 2000000));
};
// ҳ����ʾ��Ϣ
FileProgress.prototype.setStatus = function (status) {  //ÿ���ļ���Ӧһ���ϴ�����չʾ�������չʾ������һ��progressStatus��DIV ��������Ҫ��̬��ʾ��������Ϣ���������
	this.fileProgressElement.childNodes[4].innerHTML = status; 
};

// Show/Hide the cancel button ʵʱ�޸�ȡ����ť
/*
 * �������Ҳ�İ�ť��ƣ���Ϊȡ�������ذ�ť���ϴ���ɺ��ṩ���ع���
 */
FileProgress.prototype.toggleCancel = function (isCancel, swfUploadInstance, selfDelete) {
	if(isCancel ==true){
		document.getElementById("a_"+this.fileProgressID).innerHTML = "ȡ��";
		if (swfUploadInstance) {
			var fileID = this.fileProgressID;
			this.fileProgressElement.childNodes[2].onclick = function () {
				swfUploadInstance.cancelUpload(fileID);
				return false;
			};
		}
	}else if(isCancel ==false){
		if (swfUploadInstance) {
			var fileID = this.fileProgressID;
			var fileGUID = this.fileGUID;
			document.getElementById("a_"+this.fileProgressID).innerHTML = "����";
			var form = document.getElementById("form_"+fileID);
			form.action = "/webservicedown.rcp?serverid=UploadService&method=download&fileGUID="+fileGUID+"&product="+swfUploadInstance.settings.product ;
			form.enctype="multipart/form-data";
			form.fileGUID.value = fileGUID;
			form.product.value = swfUploadInstance.settings.product ;
			document.getElementById("a_"+this.fileProgressID).onclick = function () {
				form.submit();
				return false;
			};
			document.getElementById("a_"+this.fileProgressID).parentNode.appendChild(document.createTextNode("|"));
			var del = document.createElement("a");
			del.id = "del_"+fileID;
			del.innerHTML = "ɾ��";
			del.href = "#";
			del.onclick = function () {
				if(selfDelete){
					//swfUploadInstance.queueEvent("self_delete_handler",fileGUID);
             		var isDeleTrue = null ;
                    var paramArray = [];
                        paramArray.push(fileGUID);
                  //�˴� queueEvent������Ҫִ�з������в��ܲ�������ֵ
                       isDeleTrue = swfUploadInstance.settings["self_delete_handler"].apply(this, paramArray); 
                   if(isDeleTrue){
                 alert("ɾ���ɹ�!");
		   		 document.getElementById("status_"+fileID).innerHTML = '�Ѿ�ɾ����';
		   		 document.getElementById("a_"+fileID).disabled = 'true';
		   		 document.getElementById("a_"+fileID).onclick = 'javascript:void(0)';
		   		 document.getElementById("del_"+fileID).disabled = 'true';
		   		 document.getElementById("del_"+fileID).onclick = 'javascript:void(0)';
                   }else if(!isDeleTrue){
              	 alert("ɾ��ʧ��!");
                   }
				}else{
					swfUploadInstance.deleteFileById(fileGUID,fileID);
				}
				return false;
			};
			document.getElementById("a_"+this.fileProgressID).parentNode.appendChild(del);
			};
	}
};

// �ı�loading ͼƬ
FileProgress.prototype.setImgStatus = function (id,loadingStatus){
	if(typeof(loadingStatus) == "undefined"){
		document.getElementById(id).style.display = "none";
		return;
	}
	var img = document.getElementById(id);
	if(img!=null){
		img.style.display = "block";
		switch (loadingStatus){
		case 1:
			img.src = ROOT_PATH+"ifmis_images/common_upload/loading.gif";
			break;
		case 2:
			img.src = ROOT_PATH+"ifmis_images/common_upload/right.gif";
			break;
		case 3 :
			img.src = ROOT_PATH+"ifmis_images/common_upload/delete.png";
			break;
		default:
			break;
		}
	}
}

//�޸Ľ�������ʾ����
FileProgress.prototype.setProgressBar = function (fileid,percent){
	var  innerBar = document.getElementById("bar_"+fileid);
	if(typeof(innerBar)!=null){
		try{
			innerBar.style.width = percent+"%";
			}catch(e){
			}
	}
}

//ʵʱ�޸��ϴ�����
FileProgress.prototype.setProgressInfo = function (insance,file,bytesComplete){
	var info = document.getElementById("uploadInfo_"+file.id);
	if(typeof(info)!=null){
		try{
			info.innerHTML = "���ϴ� ��"+insance.getFileSize(bytesComplete)+"&nbsp&nbsp�ļ���С��"+insance.getFileSize(file.size);
		}catch(e){
		}
	}
}
//�Զ���һЩ����¼�����ʱ���ӡ�
FileProgress.prototype.setClickHandle = function(){

}


FileProgress.prototype.appear = function () {
	if (this.getTimer() !== null) {
		clearTimeout(this.getTimer());
		this.setTimer(null);
	}
	
	if (this.fileProgressWrapper.filters) {
		try {
			this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 100;
		} catch (e) {
			// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
			this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=100)";
		}
	} else {
		this.fileProgressWrapper.style.opacity = 1;
	}
		
	this.fileProgressWrapper.style.height = "";
	
	this.height = this.fileProgressWrapper.offsetHeight;
	this.opacity = 100;
	this.fileProgressWrapper.style.display = "";
	
};

// ��ţ�ƻ������˾�ʵ�ֵĵ���
//Fades out and clips away the FileProgress box.
FileProgress.prototype.disappear = function () {
	var reduceOpacityBy = 15;
	var reduceHeightBy = 4;
	var rate = 30;	// 15 fps

	if (this.opacity > 0) {
		this.opacity -= reduceOpacityBy;
		if (this.opacity < 0) {
			this.opacity = 0;
		}

		if (this.fileProgressWrapper.filters) {
			try {
				this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = this.opacity;
			} catch (e) {
				// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
				this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.opacity + ")";
			}
		} else {
			this.fileProgressWrapper.style.opacity = this.opacity / 100;
		}
	}

	if (this.height > 0) {
		this.height -= reduceHeightBy;
		if (this.height < 0) {
			this.height = 0;
		}

		this.fileProgressWrapper.style.height = this.height + "px";
	}

	if (this.height > 0 || this.opacity > 0) {
		var oSelf = this;
		this.setTimer(setTimeout(function () {
			oSelf.disappear();
		}, rate));
	} else {
		this.fileProgressWrapper.style.display = "none";
		this.setTimer(null);
	}
};