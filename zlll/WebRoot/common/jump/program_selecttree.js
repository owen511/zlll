//覆盖项目弹出树，用于单位限制项目 或者 项目归类限制项目
function program_selecttree(inputObj) {
	var vouObj = new Object();
	var defaultValue = "";
	var anyvaluetag = 0;
	var rowObj;
	try {
		var tObj = eval("tmain");
		if (typeof (tObj) == "object" && tObj.objecttype == "datatable") {
			var selectRows = tObj.getSelectedRow();
			if (selectRows.length > 0) {
				rowObj = selectRows[0];
			}
		}
	}
	catch (e) {
	}
	
	if (1 == 1) {
		if (typeof (rowObj) == "object" && typeof (rowObj.program) != "undefined" && "0" != rowObj.program) {
			defaultValue = rowObj.program_code;
		} else {
			if (inputObj.value != "") {
				var defv = inputObj.value.split("-");
				defaultValue = defv != null ? defv[0] : "";
			}
		}
	}
	//控制规则条件
	var vouname = JQ("#program").attr("program_showLevel");
	if(vouname){
		if(vouname.indexOf(".")>-1){
			//主列表输入控制规则
			var vo = vouname.split(".")[1];
			var rowObj;
			if(vouname.split(".")[0] == "tmain"){
			    try{
				 	var tObj = eval("tmain");
				  	if(typeof(tObj) == "object" && tObj.objecttype == "datatable"){ 
				   		var selectRows = tObj.getSelectedRow();
					   	if(selectRows.length>0){
						   rowObj = selectRows[0];
				    	}
					}
					if(typeof(rowObj) == "object"){
					 	vouObj[vo]=rowObj[vo];
					}
			    }catch(e){
				}
			}
			//明细列表输入控制规则
			if(vouname.split(".")[0] == "tdetail"){
				vouObj[vo] = $("detailform")[vo].valueid;
			}
		}else{
			var v = $("detailform")[vouname];
			if(v.valueid!=null && v.valueid!='')
			vouObj[vouname] = v.valueid;
		}
	}
	
	var sqlwhere = "";    
	var programdefaultvalue = ""; 
	var filter = "";
	var mustselect = "";
	var progamAddElements = "";   //增加页面显示项
	var repeatprograms = "";	//判重条件
	var isQuery = "";
	//业务系统的自定义条件
	if(typeof inputObj.query !="undefined" && inputObj.query!=null){
		sqlwhere = sqlwhere + inputObj.query + " and ";
	}
	//增加页面增加内容
	if(typeof (progamAddElement) != "undefined" && progamAddElement != ""){
		progamAddElements = progamAddElement;
	}
	//判重条件设置
	if(typeof (repeatProgram) != "undefined" && repeatProgram != ""){
		repeatprograms = repeatProgram;
	}
	//增加页面必填条件
	if(typeof (must_filter) != "undefined" && must_filter != ""){
		 	mustselect = must_filter;
	}
	//受控制条件
	if(typeof (program_filter) != "undefined" && program_filter != ""){
			if(typeof (tmain)!="undefined"){
				var vchtypecode = tmain.vchtypecode;
			}else{
				var vchtypecode = tdetail.vchtypecode;
			}
			var pars ="vchtypecode="+vchtypecode+"&filed="+program_filter;
			var url ="/common/getElementInfo.do";		
		   	var programdefaultvalue=eval("("+JQ.ajax({type:"post",url: url,data: pars,async: false}).responseText+")");
		   	for(var i = 0;i<programdefaultvalue.length;i++){
		   		if($("detailform")){
			   	 	var element = eval('$("detailform").'+programdefaultvalue[i].tablecode);
			   	 	if(element){
				   		if(element.valueid == undefined || element.valueid == ""){
					   		alert(programdefaultvalue[i].name+"不能为空");
					   		return;
				   		}else{
				   			var defaultname = programdefaultvalue[i].proname;
				   			programdefaultvalue[i].value = element.value;
				   			programdefaultvalue[i].valueid = element.valueid;
				   			if(defaultname == "BDGAGENCY" || defaultname == "BDGMANAGEDIVISION"){
				   				sqlwhere += "("+defaultname +" = "+element.valueid;
				   				sqlwhere += " or "+defaultname+" is null or "+defaultname+" = 0) and ";
				   			}else{
				   				sqlwhere += defaultname +" = "+element.valueid+" and ";
				   			}
				   		}
				   	}
			   	}
			   	else if($("form1")){
			   	 	var element = eval('$("form1").'+programdefaultvalue[i].tablecode);
			   	 	if(element){
				   		if(element.valueid == undefined || element.valueid == ""){
					   		alert(programdefaultvalue[i].name+"不能为空");
					   		return;
				   		}else{
				   			var defaultname = programdefaultvalue[i].proname;
				   			programdefaultvalue[i].value = element.value;
				   			programdefaultvalue[i].valueid = element.valueid;
				   			if(defaultname == "BDGAGENCY" || defaultname == "BDGMANAGEDIVISION"){
				   				sqlwhere += "("+defaultname +" = "+element.valueid;
				   				sqlwhere += " or "+defaultname+" is null or "+defaultname+" = 0) and ";
				   			}else{
				   				sqlwhere += defaultname +" = "+element.valueid+" and ";
				   			}
				   		}
				   	}
			   	}
		   	}
	}
	sqlwhere += "1=1";
	//programtreetype判断树类型;
	if(programtreetype==0){
			if(typeof (tmain)!="undefined"){
				indi_SelectElementTreeForEditWithFieldCTRL(tmain.mainmenu, tmain.submenu, tmain.vchtypecode, "program", inputObj, vouObj, defaultValue, anyvaluetag, "link", "0", sqlwhere, programdefaultvalue,isQuery,"1",edit,mustselect,progamAddElements,repeatprograms);
			}else if (typeof (tdetail)!="undefined"){
				indi_SelectElementTreeForEditWithFieldCTRL(tdetail.mainmenu, tdetail.submenu, tdetail.vchtypecode, "program", inputObj, vouObj, defaultValue, anyvaluetag, "link", "0", sqlwhere, programdefaultvalue,isQuery,"1",edit,mustselect,progamAddElements,repeatprograms);
			//对应操作的项目树不存在主单和子单时直接获取变量
			} else {
				indi_SelectElementTreeForEditWithFieldCTRL(mainmenu,submenu,window.vchtypecode, "program", inputObj, vouObj, defaultValue, anyvaluetag, "link", "0", sqlwhere, programdefaultvalue,isQuery,"1",edit,mustselect,progamAddElements,repeatprograms);
			}
	}else{
	        if(typeof (tmain)!="undefined"){
				selectProgramTreeForEditWithFieldCTRL(tmain.mainmenu,tmain.submenu,tmain.vchtypecode,"program",inputObj,vouObj,defaultValue,anyvaluetag,"link","0",sqlwhere,"",programdefaultvalue,edit,mustselect,progamAddElements,repeatprograms);
	        }else if (typeof (tdetail)!="undefined"){
	        	selectProgramTreeForEditWithFieldCTRL(tdetail.mainmenu,tdetail.submenu,tdetail.vchtypecode,"program",inputObj,vouObj,defaultValue,anyvaluetag,"link","0",sqlwhere,"",programdefaultvalue,edit,mustselect,progamAddElements,repeatprograms);
	        }else {
				selectProgramTreeForEditWithFieldCTRL(mainmenu,submenu,window.vchtypecode,"program",inputObj,vouObj,defaultValue,anyvaluetag,"link","0",sqlwhere,"",programdefaultvalue,edit,mustselect,progamAddElements,repeatprograms);
			}
	}
}
