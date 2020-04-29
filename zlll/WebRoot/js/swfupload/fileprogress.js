/*
 * 展示文件上传过程和信息.
 * 并不是SWFUPLOAD固有的代码只是为了做例子特意做的
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
	this.opacity = 100; //不透明
	this.height = 0;
	

	this.fileProgressWrapper = document.getElementById(this.fileProgressID); 
	if (!this.fileProgressWrapper) { // 新建上传任务，页面新增div    //页面进度显示处理
		this.fileProgressWrapper = document.createElement("div"); //包裹容器
		this.fileProgressWrapper.className = "progressWrapper";
		this.fileProgressWrapper.id = this.fileProgressID;
		//this.fileProgressWrapper.style.marginTop ="3px"; 
		this.fileProgressElement = document.createElement("div"); //空DIV先没用
		this.fileProgressElement.className = "progressContainer";

		var progressCancel = document.createElement("div"); //取消上传 链接 可以做表格处理成右上角取消
		progressCancel.className = "progressCancel";
		//progressCancel.style.visibility = "hidden";
		progressCancel.innerHTML="<div  class='cancle'><form id = 'form_"+this.fileProgressID+"'  method='post' ><A id='a_"+this.fileProgressID+"' href='#'>取消</A><input type ='hidden' name='fileGUID'><input type ='hidden' name='product'></form></div>";
		
		
/*		var progressCancel = document.createElement("a"); //取消上传 链接 可以做表格处理成右上角取消
		progressCancel.className = "progressCancel";
		progressCancel.href = "#";  
		//progressCancel.style.visibility = "hidden";
		progressCancel.appendChild(document.createTextNode("取消上传"));*/

		var progressText = document.createElement("div"); //显示文件名DIV
		progressText.className = "progressName";
		progressText.appendChild(document.createTextNode(file.name));
		progressText.title = file.name;

		var progressBar = document.createElement("div");   //进度条DIV 将框架的进度条放进来
		progressBar.className = "progressBarInProgress";

		var innerBar = document.createElement("span");
		innerBar.className = "progressBar";
		innerBar.id="bar_"+this.fileProgressID;
		progressBar.appendChild(innerBar);
		
		var progressInfo = document.createElement("div"); //显示文件名DIV 样式控制不要换行
		progressInfo.id = "uploadInfo_"+this.fileProgressID;
		//progressInfo.style.height  = "35px";
		//progressInfo.style.width  = "100px";
		progressInfo.className="progressInfo";
		//progressInfo.style.whiteSpace  = "nowrap";
		progressInfo.innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp";//这里写上传详细信息
		

		var progressImg = document.createElement("div");   //
		progressImg.className = "progressImg";
		
		var Img = document.createElement("img");   //图片
		Img.id = "img_"+this.fileProgressID;
		Img.className = "progressImg";
		Img.alt = "img";
		Img.src = ROOT_PATH+"ifmis_images/common_upload/delete.png";
		Img.style.display = "block";
		
		var progressStatus = document.createElement("div");   //这个里边放上传进度描述信息
		progressStatus.className = "progressBarStatus";
		progressStatus.id = "status_"+this.fileProgressID;
		progressStatus.innerHTML = "&nbsp;";

		progressImg.appendChild(Img);
		//progressImg.appendChild(progressStatus);
		
		var progressline = document.createElement("div");   //这个DIV好像没用多
		progressline.innerHTML = "<hr  style='width:500'>";
		progressline.className = "progressline";
		
		
		this.fileProgressElement.appendChild(progressText);  //第一个孩子 文件名
		this.fileProgressElement.appendChild(progressBar); //第二个孩子进度条
		this.fileProgressElement.appendChild(progressCancel); //第三个孩子放  取消/停止/下载按钮
		this.fileProgressElement.appendChild(progressImg); //第四个孩子放IMG
		this.fileProgressElement.appendChild(progressStatus);  //第五个孩子放上传状态
		this.fileProgressElement.appendChild(progressInfo); //第六个孩子放文件信息
		this.fileProgressElement.appendChild(progressline);	//第七个孩子放虚线
		this.fileProgressWrapper.appendChild(this.fileProgressElement);
		document.getElementById(targetID).appendChild(this.fileProgressWrapper);
	} else {
		this.fileProgressElement = this.fileProgressWrapper.firstChild; //当前上传信息区存在则不用创建
	//	this.reset(); //do something
	}
	this.setClickHandle();
	this.height = this.fileProgressWrapper.offsetHeight;
	//this.setTimer(null);


}
//每个progress对应一个 fileGUID
FileProgress.prototype.fileGUID = -1;

//上传成功后返回该文件的GUID，供下载用
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
// 页面显示信息
FileProgress.prototype.setStatus = function (status) {  //每个文件对应一个上传进度展示区，这个展示区都有一个progressStatus的DIV 将所有需要动态显示的描述信息都放在这儿
	this.fileProgressElement.childNodes[4].innerHTML = status; 
};

// Show/Hide the cancel button 实时修改取消按钮
/*
 * 进度条右侧的按钮设计：分为取消和下载按钮。上传完成后提供下载功能
 */
FileProgress.prototype.toggleCancel = function (isCancel, swfUploadInstance, selfDelete) {
	if(isCancel ==true){
		document.getElementById("a_"+this.fileProgressID).innerHTML = "取消";
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
			document.getElementById("a_"+this.fileProgressID).innerHTML = "下载";
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
			del.innerHTML = "删除";
			del.href = "#";
			del.onclick = function () {
				if(selfDelete){
					//swfUploadInstance.queueEvent("self_delete_handler",fileGUID);
             		var isDeleTrue = null ;
                    var paramArray = [];
                        paramArray.push(fileGUID);
                  //此处 queueEvent方法需要执行方法队列不能产生返回值
                       isDeleTrue = swfUploadInstance.settings["self_delete_handler"].apply(this, paramArray); 
                   if(isDeleTrue){
                 alert("删除成功!");
		   		 document.getElementById("status_"+fileID).innerHTML = '已经删除！';
		   		 document.getElementById("a_"+fileID).disabled = 'true';
		   		 document.getElementById("a_"+fileID).onclick = 'javascript:void(0)';
		   		 document.getElementById("del_"+fileID).disabled = 'true';
		   		 document.getElementById("del_"+fileID).onclick = 'javascript:void(0)';
                   }else if(!isDeleTrue){
              	 alert("删除失败!");
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

// 改变loading 图片
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

//修改进度条显示进度
FileProgress.prototype.setProgressBar = function (fileid,percent){
	var  innerBar = document.getElementById("bar_"+fileid);
	if(typeof(innerBar)!=null){
		try{
			innerBar.style.width = percent+"%";
			}catch(e){
			}
	}
}

//实时修改上传进度
FileProgress.prototype.setProgressInfo = function (insance,file,bytesComplete){
	var info = document.getElementById("uploadInfo_"+file.id);
	if(typeof(info)!=null){
		try{
			info.innerHTML = "已上传 ："+insance.getFileSize(bytesComplete)+"&nbsp&nbsp文件大小："+insance.getFileSize(file.size);
		}catch(e){
		}
	}
}
//自定义一些点击事件，暂时不加。
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

// 真牛逼还是用滤镜实现的淡出
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