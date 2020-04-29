//by ss ��չ�ϴ����ܣ����Ӳɼ����ϴ���֧��

var fileUpload_wid = null;
//�ϴ����
var FileUploadProject = function(params,fileType,success,url){
	var fl_temp = null;
	
	//�Ȼ�ȡ������id
	var attachItemidRS = FileUploadProject.asynserverExcel("getAttachItemid",{});
	var attachItemid = attachItemidRS.itemId;
	params.push("attachItemid="+attachItemid);
	
	var initLayout = function(){
		if(fileUpload_wid == null){
			var	_tempdicv = document.createElement('div');
			_tempdicv.id = "down_ecmr_div";
			
			_tempdicv.innerHTML="<div id='down_ecmr'></div><center><button class=\"btns\" overclass=\"btn_over\" onclick=\"fileUpload.upload()\">�ϴ�</button>��<button class=\"btns\" overclass=\"btn_over\" onclick=\"fileUpload.closeDiv()\">ȡ��</button></center>";
			_tempdicv.style.height=60;
			_tempdicv.style.width=260;
			
			fileUpload_wid = new Ext.lt.window({title:"�ļ��ϴ�", w:300, h:100,close:true,pop:true,mark:true});
			fileUpload_wid.draw(_tempdicv);
		}
	}
	
	initLayout();
	
	this.showDiv();
	
	var uploadSuccess = function(){
		var resp = FileUploadProject.asynserverExcel("getUploadError",{"attachItemid":attachItemid});
		fileUpload_wid && fileUpload_wid.hidden();
		if(resp && resp.message){
			
			alert(resp.message);
			return;
		}
		else{
			success && success(resp,attachItemid);
			alert("�ϴ��ɹ���");
		}
	}
	
	var drawComponent = function(){
		var div = document.getElementById("down_ecmr");
		
		//Ĭ���ǲɼ����ϴ�����·��)
		var linkname = (url ? url : "/datacommon/filebase/index");
		
		var _config = {};
		_config["file_queue_limit"] = 1;
		_config["file_types"] = fileType;
		_config["upload_button_image"] = false;
		_config["param"] = params.join("&");
		_config["linkname"] = linkname;
		_config["upload_success_handler"] = uploadSuccess;
		_config["upload_error_handler"] = function(){
			alert("�ϴ�ʧ�ܣ����飡");
			return;
		};
		
		fl_temp = new Ext.lt.console.component.fileupload(null,_config); 
		fl_temp.draw(div);
	}
	
	drawComponent();
	this.fl = fl_temp;
}

FileUploadProject.prototype.showDiv = function(){
	fileUpload_wid && fileUpload_wid.show();
}

FileUploadProject.prototype.closeDiv = function(){
	fileUpload_wid && fileUpload_wid.close();
}

FileUploadProject.prototype.upload = function(){
	if (this.fl && this.fl.swfUpload.getStats().files_queued > 0) {
		this.fl.swfUpload.startUpload();
	} 
	else {
		alert('����ѡ���ļ�!');
		return;
	}
}

FileUploadProject.asynserverExcel = function(method,params){
	showdiv();
	var resultData = Ext.lt.RCP.asynserver('datacommon_excelbase_service', method,params);
	if(resultData.error){
		closediv();
		alert(resultData.error);
		return;
	}
	else {
		closediv();
	}
	return resultData;
}

FileUploadProject.asynserverFile = function(method,params){
	showdiv();
	var resultData = Ext.lt.RCP.asynserver('datacommon_filebase_service', method,params);
	if(resultData.error){
		closediv();
		alert(resultData.error);
		return;
	}
	else {
		closediv();
	}
	return resultData;
}

//�ɼ������Ӹ���
var form_attach,formAttach_wind;
var AddFormAttach = function (table,el,l,c,d){
	this.table = table;
	this.el = el;
	this.l = l;
	this.c = c;
	this.d = d;
}

//before upload handle
AddFormAttach.prototype.beforeUpload = function(l,c,d){}

//after upload handle
AddFormAttach.prototype.afterUpload = function(data){}


AddFormAttach.prototype.uploadAttach = function(){
	var attach = this;
	
	var result = attach.beforeUpload(this.l,this.c,this.d);
	
	if(!result || !result.params){
		//alert("���������ϴ�������");
		return;
	}
	
	var	params = result.params;
	var	type = result.type || "*.txt";
	
	if(!Ext.lt.isArray(params)){
		alert("����Ӧ��Ϊ����!");
		return;
	}
	
	//�ɼ����ϴ�typeΪ1
	params.push("type="+1);
	
	//����id
	var mapperId = this.getValue();
	params.push("mapperId=" + mapperId);
	
	fileUpload = new FileUploadProject(params,type,function(data){
		
		//�޸Ľ����
		var colName = attach.table.getCol(attach.c).name;
		attach.d[colName] = data.mapperId;
		
		if(!form_attach){
			alert("�������ȡΪ�գ�");
			return;
		}
		
		var rs = form_attach.getRecordset();
		rs.addData(data.dataMap,rs.size()+1);
		
		attach.afterUpload(data);
	});
}

AddFormAttach.prototype.addFormAttach = function(){
	this.uploadAttach();
}

AddFormAttach.prototype.delFormAttach = function(){
	var mapperId = this.getValue();
	
	if(!form_attach){
		alert("�������ȡΪ�գ�");
		return;
	}
	
	var rs = form_attach.getRecordSet();
	var selData = rs.query({check:1});
	
	if(!selData || selData.length==0){
		alert("����ѡ��һ�����ݣ�");
		return;
	}
	
	var selItemid = [];
	for(var i=0,n=selData.length; i<n; i++){
		selItemid.push(selData[i].ITEMID);
	}
	
	var params = {};
	params["itemids"] = selItemid.join(",");
	params["mapperId"] = mapperId;
	
	showdiv();
	Ext.lt.RCP.server("datacommon_filebase_service", "deleteAttach",params,function(data){
		if(data.error){
			closediv();
			alert(data.error);
		}
		else{
			rs.remove(selData);
			
			closediv();
			alert("ɾ���ɹ���");
		}
	});
	
}

AddFormAttach.prototype.initFormAttachDiv = function(){
	var div = document.getElementById("formAttach_common");
	
	if(!div){
		var sb = new StringBuffer();
		
		sb.append(" <div id=\"formAttach_common\"> ");
		sb.append("<table align='center' width=\"100%\" border=\"0\" >");
			sb.append("<tr>");
				sb.append("<td>");   
					sb.append("<div id=\"query_t\" style=\"height:20px;width:99%;margin:0;\">");				
						sb.append("<span><span title=\"����ļ�\" class=\"add_btn\" onclick=\"formAttach.addFormAttach()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">����ļ�</a></span></span>");	
						sb.append("<span><span title=\"ɾ���ļ�\" class=\"del_btn\" onclick=\"formAttach.delFormAttach()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">ɾ���ļ�</a></span></span>");	
					sb.append("</div>");
				sb.append("</td>");
			sb.append("</tr>");
			
			sb.append("<tr>");
				sb.append("<td>");
					sb.append("<div id='attachDiv_common' style='overflow:auto;width:700px;;height:330px;'></div>");
				sb.append("</td>");
			sb.append("</tr>");
	 	sb.append("</table>");
	 	
	 	sb.append("</div>");
	 	
	 	document.body.appendChild($(sb.toString())[0]);
	 	
	 	div = document.getElementById("formAttach_common");
	}
	
	//��ʼ����������
	if(!formAttach_wind){
		formAttach_wind = new Ext.lt.window({title:'�����ϴ�',fitmode:'body',className:'wind7',mark:true,autoshow:false,pop:true,w:762,h:472});
		formAttach_wind.draw(div);
	}
	
	formAttach_wind.show();
	
	var result = FileUploadProject.asynserverFile("findMapperAttach", {"mapperId":this.getValue()});
	
	form_attach = new Ext.lt.datatable35(result.attachList);
	
	form_attach.setCols([
	                 	form_attach.columns.seq,
	                 	form_attach.columns.checkbox,
						{name:'FILENAME',width:'300',datatype:'S',alias:'����',style:'text-align:left'},
						{name:'FILETYPE',width:'150',datatype:'S',alias:'����',style:'text-align:left'},
						{name:'FILESIZE',width:'150',datatype:'S',alias:'��С',style:'text-align:right'}
						]);
								
	form_attach.setEditSelectCheckbox(false);
	form_attach.setMouselight('#597EAA');
	form_attach.mousedrag(false);
	form_attach.setClassName('dttheme_ifmis');
	
	form_attach.draw(document.getElementById("attachDiv_common"));
}

AddFormAttach.prototype.getValue = function(){
	var col = this.table.getCol(this.c);
	
	return this.d[col.name] || "";
}

