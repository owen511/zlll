
//��Ҫ������״̬��չʾ����̨��Ҫ�̳�TaskBaseService.java
//serviceIdΪ���ʺ�̨·����treeObjΪ����������proitemidΪ����,divIdΪ״̬չʾdivId,taskTypeCode����������ͱ���

function DC_InitTask(serviceId,treeObj,proitemid,taskTypeCode,divId){
	if(!serviceId || !treeObj || !proitemid || !divId){
		alert("�������DC_InitTask��������");
		return;
	}
	
	this.serviceId = serviceId;
	this.treeObj = treeObj;
	this.proitemid = proitemid;
	this.taskTypeCode = taskTypeCode;
	
	this.btns = new Object();
	this.btnCache = new HashMap();
	
	(function(){
		var sb = new StringBuffer();
		
		sb.append("<div id=\"task_div_container\" style=\"height:30px;width:96%;border:2px solid #DDFFFF;background:#DDFFFF;\">");
	
		sb.append("<span style='float:left;'>��ǰ����״̬��<span id='task_taskstate'></span></span><span style='float:right;'><input style='height:25px;display:none;' id='task_collect' type='button' value='����' /><input style='height:25px;display:none;' id='task_loadolddata' type='button' value='������������' /><input style='height:25px;display:none;' type='button' value='�ϱ�����' id='task_reporttask' taskStatus='6' /><input style='height:25px;display:none;' id='task_endtask' type='button' value='��ֹ����' taskStatus='4' /><input style='height:25px;display:none;' type='button' id='task_starttask' value='��ʼ����' taskStatus='5'  /><input style='height:25px;display:none;' type='button' id='task_backtask' value='�˻�����' taskStatus='7'  /><input style='height:25px;display:none;' type='button' id='task_confirmtask' value='ȷ������' taskStatus='1'  /></span>");	
		
		sb.append("</div>");
		
		document.getElementById(divId).innerHTML = sb.toString();
		
	})();
	
	var task = this;
	task.initBtns();
	
	$("#task_div_container input[type=button]").unbind("click").bind("click",function(e){
		
		if(this.id && this.nodeName=='INPUT'){
			
			task.btns[this.id](task,this.taskStatus);
		}
	});
}

DC_InitTask.prototype.newInstance = function(id){
	return document.getElementById(id);
}

DC_InitTask.prototype.getBtnInstance = function(id){
	if(!this.btnCache.get(id)){
		
		this.btnCache.put(id,this.newInstance(id));
	}
	
	return this.btnCache.get(id);
}

//�����������ɵ���
DC_InitTask.prototype.refreshButton = function(dataTree){
	if(!dataTree.isleaf){
		this.getBtnInstance("task_collect").style.display = "";
	} 
	else {
		if(this.proitemid == dataTree.tagarea) {
			//�ѽ���
			if(dataTree.taskstatus == 4) {
				this.getBtnInstance("task_starttask").style.display = "";
			} 
			//������
			else if(dataTree.taskstatus == 5) {
				this.getBtnInstance("task_loadolddata").style.display = "";
				this.getBtnInstance("task_reporttask").style.display = "";
				this.getBtnInstance("task_endtask").style.display = "";
			}
			//���˻�
			else if(dataTree.taskstatus == 7) {
				this.getBtnInstance("task_loadolddata").style.display = "";
				this.getBtnInstance("task_reporttask").style.display = "";
				this.getBtnInstance("task_starttask").style.display = "";
			}
		}
		//���ϱ�
		if(dataTree.taskstatus == 6) {
			this.getBtnInstance("task_backtask").style.display = "";
			this.getBtnInstance("task_confirmtask").style.display = "";
		} 
		//�����
		else if(dataTree.taskstatus == 1) {
			this.getBtnInstance("task_backtask").style.display = "";
		}
	}
	this.getBtnInstance("task_taskstate").innerText = dataTree.statename;
}

DC_InitTask.prototype.initBtns = function(){
	this.btns["task_collect"] = this.collectdata;
	this.btns["task_loadolddata"] = this.loadLastData;
	this.btns["task_reporttask"] = this.dochangestatus;
	this.btns["task_endtask"] = this.dochangestatus;
	this.btns["task_starttask"] = this.dochangestatus;
	this.btns["task_backtask"] = this.dochangestatus;
	this.btns["task_confirmtask"] = this.dochangestatus;
}

DC_InitTask.prototype.asynserver = function(method,params){
	showdiv();
	var resultData = Ext.lt.RCP.asynserver(this.serviceId, method,params);
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

DC_InitTask.prototype.getTaskTreeId = function(){
	var projectId = 0;
	var sel =  this.treeObj.getSelected();
	if(sel && sel.length>0){
		projectId = sel[0].itemid;
	}
	return projectId;
}

DC_InitTask.prototype.getTaskTree = function(){
	return this.treeObj.getSelected();
}

//����״̬
DC_InitTask.prototype.dochangestatus = function(task,status){
	var params = new Object;
	
	var taskId = task.getTaskTreeId();
	var tree = task.getTaskTree();
	params["taskid"] = taskId;
	params["taskstatus"] = status;
	params["proitemid"] = task.proitemid;
	params["startstate"] = tree[0].taskstatus;
	params["taskTypeCode"] = task.taskTypeCode;
	
	var result = task.asynserver("changeStatus",params);
	if(result && result.flag){
		
		task.afterChangeStatus(result.projectTree,taskId);
	}
}

DC_InitTask.prototype.afterChangeStatus = function(dataTree,taskId){}

DC_InitTask.prototype.loadLastData = function(task) {
	var taskId = task.getTaskTreeId();
	
	var result = task.asynserver("loadLastData",{"taskId":taskId});
	if(result.flag){
		alert("����ɹ�");
	}
	else{
		alert("����ʧ��");
	}
}

DC_InitTask.prototype.collectdata = function(task) {
	var taskId = task.getTaskTreeId();
	
	var result = task.asynserver("collectData",{"taskid":taskId,"classid":task.getTaskTree()[0].tasktypeid,"tasklevelno":task.getTaskTree()[0].levelno});
	if(result.error){
		alert(result.error);
		return;
	}
	if(result.iscollect == 0) {
		alert("��ȷ����������ɺ����");
	} 
	else {
		if (result.flag == 1) {
			alert("���ܳɹ�");
		} 
		else {
			alert("����ʧ��");
		}
	}
}
