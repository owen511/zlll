//������Ŀ�����������ڵ�λ������Ŀ ���� ��Ŀ����������Ŀ
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
	//���ƹ�������
	var vouname = JQ("#program").attr("program_showLevel");
	if(vouname){
		if(vouname.indexOf(".")>-1){
			//���б�������ƹ���
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
			//��ϸ�б�������ƹ���
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
	var progamAddElements = "";   //����ҳ����ʾ��
	var repeatprograms = "";	//��������
	var isQuery = "";
	//ҵ��ϵͳ���Զ�������
	if(typeof inputObj.query !="undefined" && inputObj.query!=null){
		sqlwhere = sqlwhere + inputObj.query + " and ";
	}
	//����ҳ����������
	if(typeof (progamAddElement) != "undefined" && progamAddElement != ""){
		progamAddElements = progamAddElement;
	}
	//������������
	if(typeof (repeatProgram) != "undefined" && repeatProgram != ""){
		repeatprograms = repeatProgram;
	}
	//����ҳ���������
	if(typeof (must_filter) != "undefined" && must_filter != ""){
		 	mustselect = must_filter;
	}
	//�ܿ�������
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
					   		alert(programdefaultvalue[i].name+"����Ϊ��");
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
					   		alert(programdefaultvalue[i].name+"����Ϊ��");
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
	//programtreetype�ж�������;
	if(programtreetype==0){
			if(typeof (tmain)!="undefined"){
				indi_SelectElementTreeForEditWithFieldCTRL(tmain.mainmenu, tmain.submenu, tmain.vchtypecode, "program", inputObj, vouObj, defaultValue, anyvaluetag, "link", "0", sqlwhere, programdefaultvalue,isQuery,"1",edit,mustselect,progamAddElements,repeatprograms);
			}else if (typeof (tdetail)!="undefined"){
				indi_SelectElementTreeForEditWithFieldCTRL(tdetail.mainmenu, tdetail.submenu, tdetail.vchtypecode, "program", inputObj, vouObj, defaultValue, anyvaluetag, "link", "0", sqlwhere, programdefaultvalue,isQuery,"1",edit,mustselect,progamAddElements,repeatprograms);
			//��Ӧ��������Ŀ���������������ӵ�ʱֱ�ӻ�ȡ����
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
