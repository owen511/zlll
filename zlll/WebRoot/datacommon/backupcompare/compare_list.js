function compare_list(config,service){
	var dt_0 = null;
	var dt_1 = null;
	//λ���α�
	var index = -1;
	//����λ�ü���
	var difIndex;
	var tables = config.tables;
	var sb = new StringBuffer();
	sb.append("<div id=\"query_t\">");
	//�ɼ���ѡ��������
	if(config.isjump!=null && config.isjump=='1'){
		sb.append("<span><button id=\"exit_btn\" type=\"button\" style=\"width:50px;\">����</button></span>");
	}
	sb.append("<span><span >�ɼ���:</span></span>");
	sb.append("<span><select id=\"form_table_list\" style=\"width:100px;\">");
	for(var i=0;i<tables.length;i++){
		sb.append("<option value=\""+tables[i].code+"\" title=\""+tables[i].name+"\">"+tables[i].name+"</option>");
	}
	sb.append("</select></span>");
	
	//��λѡ��������  
	sb.append("<span><span >��λ��</span></span>");
	sb.append("<span><input type=\"text\" readOnly=\"true\" id=\"form_agency_tree\" style=\"width:100px;cursor : pointer;\">");
	sb.append("</input></span>");
	
	sb.append("<span><span >�ԱȻ�׼:</span></span>");
	sb.append("<span><select id=\"form_backup_list_0\" style=\"width:100px;\">");
	sb.append("<option value=\"currentdata\" selected>��ǰ����</option>");
	sb.append("</select></span>");
	
	sb.append("<span><span >�Ա�Ŀ��:</span></span>");
	sb.append("<span><select id=\"form_backup_list_1\" style=\"width:100px;\">");
	sb.append("<option value=\"currentdata\" selected>��ǰ����</option>");
	sb.append("</select></span>");
	
	sb.append("<span><input type=\"radio\" name=\"compareType\" value=\"0\" checked>��������</input></span>");
	sb.append("<span><input type=\"radio\" name=\"compareType\" value=\"1\">��������</input></span>");
	
	sb.append("<span><span style=\"width:10px;\"></span></span>");
	
	sb.append("<span><span id=\"doCompareBTN\" title=\"��ʼ���ݶԱ�\" class=\"add_btn\" ><a href=\"javascript:void(0)\">��ʼ�Ƚ�</a></span></span>");
	sb.append("</div>");
	
	sb.append("<div id=\"form_table_title\">");
	sb.append("<ul><li class=\"top\"><div>�Ա���Ϣ</div></li><li class=\"nextdiffBTN\" style='float:right;'><div id=\"nextdiff\">��һ������</div></li><li class=\"prediffBTN\" style='float:right;'><div id=\"prediff\">��һ������</div></li></ul>");
	sb.append("</div>");
	sb.append("<div id=\"containerline20_d\">");
	sb.append("<div id='compareResult_div' style=\"width:100%;height:50px;line-height:20px;\"></div>");//border-left: #8ba3da 1px solid;border-top: #8ba3da 1px solid;background-color:#888C8C;margin-top:-5px;
	sb.append("<div id='edit_table_div' style=\"width:100%;height:500px;display:block;padding:0px;\">");//border-right: #8ba3da 1px solid;
	sb.append("<div id='datatable_div_0' style=\"width:49%;height:100%;float:left;\"></div>");
	sb.append("<div id='datatable_div_1' style=\"width:49%;height:100%;float:left;\"></div>");
	sb.append("</div>");
	sb.append("</div>");
	//sb.append("");
	
	document.getElementById("template_main").innerHTML = sb.toString();
	
	//��λ������
	document.getElementById("form_agency_tree").onclick=function(){
		showQtree2AgencyInput();
	}
	if(config.isjump!=null && config.isjump=='1'){
		document.getElementById("exit_btn").onclick=function(){
			jumpTo(config.fromURL,"post");
		}
	}
	document.getElementById("template_main").attachEvent('onresize', function(){
		var titleHeight = document.getElementById("query_t").offsetHeight + document.getElementById("form_table_title").offsetHeight + document.getElementById("compareResult_div").offsetHeight;
		document.getElementById('containerline20_d').style.height = document.getElementById("template_main").offsetHeight-titleHeight+'px';
		document.getElementById('edit_table_div').style.height = document.getElementById("template_main").offsetHeight-titleHeight-2+'px';
		document.getElementById('context').style.width = document.getElementById("main").offsetWidth+'px';
		document.getElementById('template_main').style.width = document.getElementById("main").offsetWidth-4+'px';
		document.getElementById('containerline20_d').style.width = document.getElementById("main").offsetWidth-30+'px';
		document.getElementById('edit_table_div').style.width = document.getElementById("main").offsetWidth-30+'px';
	});
	
	document.getElementById("edit_table_div").attachEvent('onresize', function(){
		document.getElementById('datatable_div_0').style.width=(document.getElementById("edit_table_div").offsetWidth/2-1)+'px';
		document.getElementById('datatable_div_1').style.width=(document.getElementById("edit_table_div").offsetWidth/2-1)+'px';
		document.getElementById('datatable_div_0').style.height=(document.getElementById("edit_table_div").offsetHeight-2)+'px';
		document.getElementById('datatable_div_1').style.height=(document.getElementById("edit_table_div").offsetHeight-2)+'px';
		if(dt_0!=null){
			dt_0.resize(document.getElementById("edit_table_div").offsetWidth/2-1,document.getElementById("edit_table_div").offsetHeight-2);
		}
		if(dt_1!=null){
			dt_1.resize(document.getElementById("edit_table_div").offsetWidth/2-1,document.getElementById("edit_table_div").offsetHeight-2);
		}
	});
	document.getElementById("prediff").onclick = function(){
		//��ת����һ������
		if(dt_0 == null || dt_1 == null){
			return;
		}
		if(0 < index){
			var i = parseInt(difIndex[--index]);
			dt_0.goto(i);
			dt_1.goto(i);
		}
	}
	document.getElementById("nextdiff").onclick = function(){
		//��ת����һ������
		if(dt_0 == null || dt_1 == null){
			return;
		}
		if(index < difIndex.length-1){
			var i = parseInt(difIndex[++index]);
			dt_0.goto(i);
			dt_1.goto(i);
		}
	}
	//�ɼ��������������¼�
	document.getElementById("form_table_list").onchange = function(){
		loadBackupList();
	}
	//��ʼ�Ƚϰ�ť����¼�
	document.getElementById("doCompareBTN").onclick = function(){
		var bakID0 = document.getElementById('form_backup_list_0').value;
		var bakID1 = document.getElementById('form_backup_list_1').value;
		var radios = document.getElementsByName('compareType');
		var compareType = '';
		for(var i=0;i<radios.length;i++){
			if(radios[i].checked){
				compareType = radios[i].value;
			}
		}
		if(bakID0 == bakID1){
			alert('��ѡ��ͬ�ı��ݣ�');
			return;
		}
		var agencys = [];
		if(document.getElementById('form_agency_tree').ids != null && document.getElementById('form_agency_tree').ids.length > 0){
			agencys = document.getElementById('form_agency_tree').ids.split(',');
		}
		if(agencys.length == 0){
			alert('��ѡ��λ��');
			return;
		}
		if(document.getElementById("form_table_list").value == 'V_BUDGETOUTPAYFORM'){
			//֧����
			if(agencys.length>1){
				alert('֧����Ŀ¼���ֻ��һ�ζԱ�һ����λ�����ݣ�');
				return;
			}
		}else{
			if(agencys.length>10){
				alert('ѡ��ĵ�λ�����ܳ���10����');
				return;
			}
		}
		document.getElementById('doCompareBTN').disabled = true;
		doCompare(bakID0,bakID1,agencys,compareType);
	}
	//���Ƶ�λ��
	function showQtree2AgencyInput(){
		var divID = 'form_agency_tree_drop_div';
		var targetDiv = document.getElementById(divID);
		if(targetDiv == null){
			targetDiv = _initTreeDiv(divID,config.allAgency,[config.agency],'#name');
		}
		targetDiv.style.top=(getTop(document.getElementById('form_agency_tree'))+18)+'px';
		targetDiv.style.left=getLeft(document.getElementById('form_agency_tree'))+'px';
		targetDiv.setValue2Input = function(){
			var nodes = targetDiv.tree.getSelected();
			var ids = new StringBuffer();
			var names = new StringBuffer();
			for(var i=0;i<nodes.length;i++){
				ids.append(nodes[i].itemid+'');
				names.append(nodes[i].name+'');
				if(i<nodes.length-1){
					ids.append(',');
					names.append(',');
				}
			}
			document.getElementById('form_agency_tree').value = names.toString();
			document.getElementById('form_agency_tree').ids = ids.toString();
		}
		
		function exitAGClickFN(){
			var div = document.getElementById(divID);
			if(!div.contains(window.event.srcElement)){
				//����������򣬹ر�������ȡֵ
				if(div.style.visibility=='visible'){
					div.setValue2Input();
				}
				div.style.visibility='hidden';
				document.body.detachEvent("onclick",exitAGClickFN);
			}
		}
		window.event.cancelBubble =  true;
		document.body.attachEvent("onclick",exitAGClickFN);
		targetDiv.style.visibility='visible';
	}
	//��ȡԪ��������
	function getTop(e){
		var offset=e.offsetTop; 
		if(e.offsetParent!=null) offset+=getTop(e.offsetParent); 
		return offset; 
	}
	//��ȡԪ�صĺ����� 
	function getLeft(e){
		var offset=e.offsetLeft; 
		if(e.offsetParent!=null) offset+=getLeft(e.offsetParent); 
		return offset; 
	}
	//��ʼ��div
	function _initTreeDiv(divID,datas,values,disptype){
		var targetDiv = document.createElement('DIV');
		var tree = null;
		targetDiv.id=divID;
		targetDiv.style.backgroundColor = '#FFFFFF';
		targetDiv.style.border='#99bbe8 solid 1px';	
		targetDiv.style.height='340px';
		targetDiv.style.width='260px';
		targetDiv.style.visibility='visible';
		targetDiv.style.position='absolute';
		document.body.appendChild(targetDiv);
		
		tree=new Ext.lt.Qtree({
			data:datas,
			linkchild:true,
			showRootNode:true,
			outformart:disptype,
			selectmode:'n',
			values:values
		});
		tree.expandlevel(1);
		tree.draw(targetDiv);
		
		targetDiv.tree = tree;
		return targetDiv;
	}
	
	//����ѡ��Ĳɼ��� ���ر�����Ϣ������
	function loadBackupList(selectedID){
		var tableCode = document.getElementById("form_table_list").value;
		Ext.lt.RCP.server('datacommon_compare_service','listBackupByTableCode',tableCode,function(resp){
			var backupList0 = document.getElementById("form_backup_list_0");
			var backupList1 = document.getElementById("form_backup_list_1");
			backupList0.length = 1;
			backupList1.length = 1;
			if(resp!=null && resp.length!=0){
				for(var i=0;i<resp.length;i++){
					var opt0 = new Option(resp[i].TIME,resp[i].ID);
					var opt1 = new Option(resp[i].TIME,resp[i].ID);
					if(resp[i].REMARK != null && resp[i].REMARK != ''){
						opt0.setAttribute('title', '��ע��'+resp[i].REMARK);
						opt1.setAttribute('title', '��ע��'+resp[i].REMARK);
					}
					backupList0[i+1] = opt0;
					backupList1[i+1] = opt1;
				}
			}
			if(selectedID!=null && selectedID!=''){
				document.getElementById('form_backup_list_0').value = selectedID;
			}
		});
	}
	
	/**
	 * ִ�����ݶԱȣ�ֻ��Ҫ����ID�Ϳ���ȡ��һ���������ݣ����а���ȫ����λ������ʱ��ѡ�ģ������ݡ�
	 * @param bakID0 ��׼����ID
	 * @param bakID1 Ŀ�걸��ID
	 * @param compareType ���ݷ�ʽ
	 */
	function doCompare(bakID0,bakID1,agencys,compareType){
		//����ձȽ�����
		document.getElementById('datatable_div_0').innerHTML='';
		document.getElementById('datatable_div_1').innerHTML='';
		
		function rowspanFN(l,c,rs){
			//��������
			if(rs.DIFFTYPE == '1'){
				return 'formmodelCompare_differenttype_1';
			}
			//��������
			if(rs.DIFFTYPE == '2'){
				var difIndex = rs.DIFINDEX.split("$");
				if(difIndex.indexOf(dt_0.getCols()[c].name)!=-1){
					return 'formmodelCompare_differenttype_2_1';
				}else{
					return 'formmodelCompare_differenttype_2';
				}
			}
			//ȱ������
			if(rs.DIFFTYPE == '3'){
				return 'formmodelCompare_differenttype_3';
			}
			return 'bl';
		}
		Ext.lt.RCPConsole.tipsserver('datacommon_compare_service','compareData',[bakID0,bakID1,agencys,compareType,config.submenu],function(resp){
			if(resp.success){
				dt_0 = new Ext.lt.datatable(resp.rs0);
				dt_1 = new Ext.lt.datatable(resp.rs1);
				var col0 = [];
				col0.push(dt_0.columns.seq);
				for(var i=0;i<resp.headTitle.length;i++){
					var col = resp.headTitle[i];
					col.rowspan = rowspanFN;
					col0.push(col);
				}
				dt_0.setCols(col0);
				dt_1.setCols(col0);
				var hideList = resp.hideList;
				for(var i = 0;i<hideList.length;i++){
					var col = hideList[i];
					dt_0.setHiddenColumn(col);
					dt_1.setHiddenColumn(col);
				}
				dt_0.setClassName("dttheme_budget");
				dt_1.setClassName("dttheme_budget");
				dt_0.setAlign("left");
				dt_1.setAlign("left");
				dt_0.mousedrag(false);
				dt_1.mousedrag(false);
				dt_0.setHiddenColumn("EMPTY");
				dt_1.setHiddenColumn("EMPTY");
				dt_0.setAllowClock(true);
				dt_1.setAllowClock(true);
				dt_0.setAllowcustom(false);
				dt_1.setAllowcustom(false);
				dt_0.setAllowHeadWidth(false);
				dt_1.setAllowHeadWidth(false);
				//���Ʊ��
				dt_0.draw(datatable_div_0);
				dt_1.draw(datatable_div_1);
				
				document.getElementById('compareResult_div').style.borderLeft = "#8ba3da 1px solid";
				document.getElementById('compareResult_div').style.borderTop = "#8ba3da 1px solid";
				document.getElementById('compareResult_div').innerHTML='�ȽϽ����</br>���Ӽ�¼��<span style="background-color:#FFFF00;">����</span>��ʾ����<strong>'+resp.addCNT+'</strong>�����������¼��<span style="background-color:#FFC864;">����</span>��ʾ����<strong>'+resp.difCNT+'</strong>������ȱ�ټ�¼��<span style="background-color:#C8C8C8;">����</span>��ʾ����<strong>'+resp.remCNT+'</strong>������';
				
				document.getElementById("datatable_div_1").style.position = "absolute";
				
				//datatable�����¼�
				document.getElementById("datatable_div_0").children[0].attachEvent('onscroll', function(e){
					window.event.cancelBubble =  true;
					document.getElementById("datatable_div_1").children[0].scrollLeft = document.getElementById("datatable_div_0").children[0].scrollLeft;
					document.getElementById("datatable_div_1").children[0].scrollTop = document.getElementById("datatable_div_0").children[0].scrollTop;
				});
				document.getElementById("datatable_div_0").children[0].attachEvent('onmousewheel', function(e){
					window.event.cancelBubble =  true;
					document.getElementById("datatable_div_1").children[0].scrollLeft = document.getElementById("datatable_div_0").children[0].scrollLeft;
					document.getElementById("datatable_div_1").children[0].scrollTop = document.getElementById("datatable_div_0").children[0].scrollTop;
				});
				
				document.getElementById("datatable_div_1").children[0].attachEvent('onscroll', function(e){
					window.event.cancelBubble =  true;
					document.getElementById("datatable_div_0").children[0].scrollLeft = document.getElementById("datatable_div_1").children[0].scrollLeft;
					document.getElementById("datatable_div_0").children[0].scrollTop = document.getElementById("datatable_div_1").children[0].scrollTop;
				});
				document.getElementById("datatable_div_1").children[0].attachEvent('onmousewheel', function(e){
					window.event.cancelBubble =  true;
					document.getElementById("datatable_div_0").children[0].scrollLeft = document.getElementById("datatable_div_1").children[0].scrollLeft;
					document.getElementById("datatable_div_0").children[0].scrollTop = document.getElementById("datatable_div_1").children[0].scrollTop;
				});
				
				Ext.lt.message.hook("datatable","clockcolumn",function(obj){
					var n = obj.clockcolumn;
					if(dt_0.getclockColumnSize()!=n){
						dt_0.clockColumnSize(n);
					}
					if(dt_1.getclockColumnSize()!=n){
						dt_1.clockColumnSize(n);
					}
				});
				difIndex = resp.difIndex;
				index = -1;
				
			}else{
				alert(resp.msg);
			}
			showCompareBTN();
		},function(){
			//����ʧ��
			showCompareBTN();
		});
	}
	function showCompareBTN(){
		//��ʱ�������ð�ť������ʾ
		setTimeout(function(){
			document.getElementById('doCompareBTN').disabled = false;
		},2000);
	}
	if(config.tablecode!=null && config.tablecode!=''){
		document.getElementById('form_table_list').value = config.tablecode;
		if(config.isjump=='1'){
			document.getElementById('form_table_list').disabled = true;
		}
	}else{
		document.getElementById('form_table_list').value = tables[0].code;
	}
	if(config.agency!=null && config.agency!=''){
		for(var i = 0;i<config.allAgency.size();i++){
			if(config.agency == config.allAgency.getData(i).itemid){
				document.getElementById('form_agency_tree').value = config.allAgency.getData(i).name;
				document.getElementById('form_agency_tree').ids = config.agency;
				break;
			}
		}
	}
	loadBackupList(config.backupId);
}