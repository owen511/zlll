/**
 * 注：将导入页面的js放入此页面来统一维护，使代码更清晰，易懂
 */


//点击进度条显示控制 
function barStart(){
	  JQ("#out").css("margin","0 atuo");
	  JQ("#out").text("0/"+tmain.data.length)
      var bar=setInterval("barBegin()",5000);
}
//动态取得导入条数
function barBegin(){
	var url = "/common/getImportNum.do";
	JQ.get(url,function(data){
		JQ("#out").css({margin:"0 auto"});
		if (data && data!="null") {
			JQ("#out").text(data+"/"+tmain.data.length);
		}
	});
}

function checkmonth(obj){
	var patrn=patrn=/^[1-9]{1,2}$/;   
	if (!patrn.exec(obj.value)){ 
		alert("月份格式非法！");
		if(obj.valueid!=null)
			obj.value = obj.valueid;
		else 
			obj.value = 0 ;
		changeData();
	}
	if(obj.value>12){
		alert("月份格式非法！");
		if(obj.valueid!=null)
			obj.value = obj.valueid;
		else 
			obj.value = 0 ;
		changeData();
	}
	return;
}
function addDetail(){
	var url = ROOT_PATH+"/common/searchFile.do?"+pars;
    var features = "top=150,left=50,width=400,height=100,scrollbars=no,resizable=no";
    window.childWindow = window.open(url, "选择导入文件", features);
    window.childWindow.focus();    
}
// 新数据采集
function addDetail1(){
	var url = ROOT_PATH+"/common/searchFile1.do?"+pars;
    var features = "top=150,left=50,width=400,height=100,scrollbars=no,resizable=no";
    window.childWindow = window.open(url, "选择导入文件", features);
    window.childWindow.focus();    
}
// 放弃
function turnBack(formObject){
	closeWindow(true);
}

// 保存数据
function save(formObject){
	show();
	if(checkData()){
	    /*for(var i = 0;i<tmain.data.length;i++){
	    	var row = tmain.data[i];
	    	//以收定支标为“1-是”
	    	row.element14=1000682;
	    }*/
		formObject.json.value = tmain.data.toJSON();
		formObject.action = ROOT_PATH+"/common/updateimportdata.do?"+pars;
		formObject.submit();
	}else{
		closeDiv();
	}
}

//生成
function importData(formObject){
	if(checkData()){
		show();
		formObject.json.value = tmain.data.toJSON();
		formObject.action = ROOT_PATH+"/common/importData.do?"+pars;
		formObject.submit();
	}
}
//新生成
function importData1(formObject){
	if(checkData()){
		show();
		formObject.json.value = tmain.data.toJSON();
		formObject.action = ROOT_PATH+"/common/importData1.do?"+pars;
		formObject.submit();
	}
}
//不刷新页面操作后更新单据状态
function afterOperation(resp){
    var json = resp.responseText.evalJSON(true);
    if(typeof(json.success)!="undefined" && json.success!=null){
    	alert("导入成功!");
    	//清空数据
    	tmain.data = new Array();
	    tmain.show();
    	clearFormInput($("queryform"));
		ctrlInput(true);
	    closeWindow(false);
    } else if(typeof(json.error)!="undefined" && json.error!=null){
    	alert(json.error);
    }
    closeDiv();
}

// 删除数据
function delDetail(formObject){
	if(formObject.selectedRow == null){
		alert("请先选择一条单据!");
		return ;
	}
	var delrow = formObject.selectedRow;
	var datas = tmain.data;
	if(confirm("确定删除所选单据吗？")){
		var delrow = tmain.getSelectedRow();
		tmain.removeSelected();
		clearFormInput(formObject);
		var url = ROOT_PATH+'/common/deleteimportdata.do';
		var parsdata = pars+'&json=' + Object.toJSON(delrow);
	   	var myAjax = new Ajax.Request(url,{method: 'post', parameters: parsdata,onComplete: function(resp){
	   											var json = resp.responseText.evalJSON(true);
												if( json.sucmsg !=null && json.sucmsg!=""){
											    	alert(json.sucmsg);
											    	return;
											    }
												if( json.error !=null && json.error!=""){
											    	alert(json.error);
											    	return;
											    }
	   									}});
		ctrlInput(true);
		tmain.show();
	}
}

// 清除FORM中的可录入数据
function clearFormInput(formObject){
	var inputelements = formObject.elements;
	for(var i=0;i<inputelements.length;i++){
		var obj = inputelements[i];
		if(obj.tagName == "INPUT" && obj.type=="text"){
			obj.value = ""
			obj.valueid = null;
		}
	}
	// 清除FORM对应数据
	formObject.selectedRow = null;
}

//控制输入框开启于否
JQ(function($){
	ctrlInput(true);
});
function ctrlInput(flag){
	var inputelements = JQ("#queryform")[0];
	if(null == tmain.data || tmain.data.length <= 0){
		document.getElementById("import").disabled = "disabled";
		document.getElementById("del").disabled = "disabled";
	} else{
		document.getElementById("import").disabled = "";
		document.getElementById("del").disabled = "";
	}
	if(flag==null){
		if(null == tmain.data || tmain.data.length <= 0)
		{
			document.getElementById("import").disabled = "disabled";
			for(var i=0;i<inputelements.length;i++){
				var obj = inputelements[i];
				if(obj.tagName == "INPUT" && obj.type=="text"){
					obj.disabled = "disabled";
				}
				if(obj.tagName == "BUTTON"){
					obj.disabled = "disabled";
				}
			}
		}
	}else{
		for(var i=0;i<inputelements.length;i++){
			var obj = inputelements[i];
			if(obj.tagName == "INPUT" && obj.type=="text"){
				obj.disabled = flag;
			}
			if(obj.tagName == "BUTTON"){
				obj.disabled = flag;
			}
		}
	}
}
//关闭窗口
function closeWindow(isReturn){
	if(tmain.data!=null&&tmain.data.length>0){
		var url = ROOT_PATH+'/common/deleteimportdata.do';
		pars = pars+vchtypeid+'&json=' + tmain.data.toJSON() + '&cleartag=1';
	   	var myAjax = new Ajax.Request(url,{method: 'post', parameters: pars,onComplete: function(resp){
	   											var json = resp.responseText.evalJSON(true);
												if( json.sucmsg !=null && json.sucmsg!=""){
											    	window.status=json.sucmsg;
											    }
												if( json.error !=null && json.error!=""){
											    	window.status=json.error;
											    }
	   									}});
   	}								
	if(isReturn){
		window.close();
	} else {
		if(window.opener.returnBack){
			if(tmain.data!=null&&tmain.data.length>0){
				window.opener.returnBack(tmain.data.toJSON());
			} else {
				window.opener.returnBack();
			}
		}
		window.opener=null;
		window.close();
	}
}
//加载时全屏导入窗口
window.onload = function(){
	self.moveTo(0,0);	
	self.resizeTo(screen.availWidth, screen.availHeight);
}
window.onunload = function(){
	//closeWindow(true);
}
//加载之前关闭导入窗口
window.onbeforeunload = function (){
	if   (event.clientX>document.body.clientWidth   &&event.clientY<0||event.altKey)   
	return  closeWindow(true);
}
