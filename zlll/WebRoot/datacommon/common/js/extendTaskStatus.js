
//主要是任务状态的展示，后台需要继承TaskBaseService.java
//serviceId为访问后台路径，treeObj为任务树对象，proitemid为区划,divId为状态展示divId,taskTypeCode任务分类类型编码

function DC_InitTask(serviceId,treeObj,proitemid,taskTypeCode,divId){
	if(!serviceId || !treeObj || !proitemid || !divId){
		alert("任务组件DC_InitTask参数错误！");
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
	
		sb.append("<span style='float:left;'>当前任务状态：<span id='task_taskstate'></span></span><span style='float:right;'><input style='height:25px;display:none;' id='task_collect' type='button' value='汇总' /><input style='height:25px;display:none;' id='task_loadolddata' type='button' value='重新载入数据' /><input style='height:25px;display:none;' type='button' value='上报任务' id='task_reporttask' taskStatus='6' /><input style='height:25px;display:none;' id='task_endtask' type='button' value='终止任务' taskStatus='4' /><input style='height:25px;display:none;' type='button' id='task_starttask' value='开始任务' taskStatus='5'  /><input style='height:25px;display:none;' type='button' id='task_backtask' value='退回任务' taskStatus='7'  /><input style='height:25px;display:none;' type='button' id='task_confirmtask' value='确认任务' taskStatus='1'  /></span>");	
		
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

//点击任务树后可调用
DC_InitTask.prototype.refreshButton = function(dataTree){
	if(!dataTree.isleaf){
		this.getBtnInstance("task_collect").style.display = "";
	} 
	else {
		if(this.proitemid == dataTree.tagarea) {
			//已接受
			if(dataTree.taskstatus == 4) {
				this.getBtnInstance("task_starttask").style.display = "";
			} 
			//进行中
			else if(dataTree.taskstatus == 5) {
				this.getBtnInstance("task_loadolddata").style.display = "";
				this.getBtnInstance("task_reporttask").style.display = "";
				this.getBtnInstance("task_endtask").style.display = "";
			}
			//已退回
			else if(dataTree.taskstatus == 7) {
				this.getBtnInstance("task_loadolddata").style.display = "";
				this.getBtnInstance("task_reporttask").style.display = "";
				this.getBtnInstance("task_starttask").style.display = "";
			}
		}
		//已上报
		if(dataTree.taskstatus == 6) {
			this.getBtnInstance("task_backtask").style.display = "";
			this.getBtnInstance("task_confirmtask").style.display = "";
		} 
		//已完成
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

//更改状态
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
		alert("载入成功");
	}
	else{
		alert("载入失败");
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
		alert("请确认子任务完成后汇总");
	} 
	else {
		if (result.flag == 1) {
			alert("汇总成功");
		} 
		else {
			alert("汇总失败");
		}
	}
}
