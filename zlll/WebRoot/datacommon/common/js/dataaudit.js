if(DataCommon == null) {var DataCommon = {}}
//�ɼ����������
//����params(��Ҫ������������ ����{"taskId":0,"bdgagencyId":0,"divId":"id","tableCode":""})

(function(window){
	function DataAudit(params){
		if(!(this instanceof DataAudit)){
			
			return new DataAudit(params);
		}
		
		this.auditMark = false;
	
		this.setting = {
			taskId : 0,
			bdagencyId: 0,
			divId : "template_main",
			divHeight : "200",
			tableCode : ""
		};
		
		$.extend(this.setting, params);
	
		this.context = null;
		this.initDiv();
		this.initEvent();
		
		this.findAuditData();
	}
	
	DataAudit.prototype.initDiv = function(){
		var $targDiv = $("#"+this.setting.divId);
		
		if($targDiv.length == 0 ){
			alert("û���ҵ������DIV:" + this.setting.divId);
			return;
		}
		
		if($targDiv.has("#auditResult_div").length == 0){
			var sb = new StringBuffer();
			
			sb.append("<div class=\"dataaudit_div\" id =\"auditResult_div\"  style=\"display:none;height:"+this.setting.divHeight+"px; \">");
			sb.append(" <div class=\"dataaudit_head\" ><span class=\"closeIcon\"></span><span class=\"title\">��˴�����Ϣ</span></div> ");
			sb.append(" <div class=\"dataaudit_content\" id=\"auditResult_content\" > </div>");
			sb.append("</div>");
			
			$targDiv.append(sb.toString());
			
			$("#auditResult_content").height(this.setting.divHeight-$("#auditResult_div .dataaudit_head").height()-10);
		}
		this.context = $("#auditResult_div");
	}
	
	DataAudit.prototype.asynserver = function(method,params){
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
	
	DataAudit.prototype.findAuditData = function(){
		var params = {"bdgAgencyId":this.setting.bdagencyId,"taskId":this.setting.taskId,"tableCode":this.setting.tableCode};
		
		var result = this.asynserver("dataAudit",params);
		if(result == undefined) return;
		
		var auditList = result.dataList, sb = new StringBuffer();
			   
	    for(var i=0,n=auditList.length; i<n; i++){
	        sb.append("<dl>");
	        sb.append("<dt> ��ʾ "+(i+1)+"("+auditList[i].auditName+")"+"</dt>");
	        if(auditList[i].grouping){
	          sb.append("<dd>"+auditList[i].grouping+"</dd>");
	        }
	        sb.append("<dd>");
	        sb.append(auditList[i].explain);

			if(auditList[i].customAudit == false){
				
		        sb.append("<span>[��ֵ��" + parseFloat(auditList[i].leftValue)+ "]</span> ");
				sb.append("<span>[��ֵ��" + parseFloat(auditList[i].rightValue) + "]</span> ");
				sb.append("<span>[��ֵ��" + parseFloat(auditList[i].poor) + "]</span>");
			}
	        sb.append("</dd>");
	        sb.append("</dl>");
			
			if(auditList[i].alarmlevels == "1"){
				
				this.auditMark = true;
			}
	    }
	
	    $("#auditResult_content").html(sb.toString());
	    
	    if(auditList.length > 0){
			
	    	this.showAudit();
		}
		else{
			
			this.closeAudit();
			alert("У��ͨ��!");
		}
	}
	
	//�ر�֮�����(����������Ҫ�ɸ���)����Ϊȫ�ֶ���
	DataAudit.prototype.afterCloseAudit = function(dataAudit){}
	
	//��ʾ֮ǰ����(����������Ҫ�ɸ���)����Ϊȫ�ֶ���
	DataAudit.prototype.beforeShowAudit = function(dataAudit){}
	
	
	DataAudit.prototype.getAuditMark = function(){
		return this.auditMark;
	}
	
	DataAudit.prototype.closeAudit = function(){
		this.context.hide();
		
		this.afterCloseAudit(this);
	}
	
	DataAudit.prototype.showAudit = function(){
		this.beforeShowAudit(this);
		
		this.context.show();
	}
	
	DataAudit.prototype.initEvent = function(){
		var _da = this;
		
		_da.context.unbind("click").bind("click",function(e){
			var $e = $(e.target);
			
			if($e.hasClass("closeIcon")){
				_da.closeIcon($e[0]);
			}
			//TODO ����չ
		});
	}
	
	DataAudit.prototype.closeIcon = function(e){
		this.closeAudit(this.context);
	}
	
	DataAudit.prototype.getDivHeight = function(){
		return this.setting.divHeight;
	}
	
	window.DataCommon.DataAudit = DataAudit;

})(window)