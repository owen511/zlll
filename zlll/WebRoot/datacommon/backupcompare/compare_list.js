function compare_list(config,service){
	var dt_0 = null;
	var dt_1 = null;
	//位置游标
	var index = -1;
	//差异位置集合
	var difIndex;
	var tables = config.tables;
	var sb = new StringBuffer();
	sb.append("<div id=\"query_t\">");
	//采集表选择下拉框
	if(config.isjump!=null && config.isjump=='1'){
		sb.append("<span><button id=\"exit_btn\" type=\"button\" style=\"width:50px;\">返回</button></span>");
	}
	sb.append("<span><span >采集表:</span></span>");
	sb.append("<span><select id=\"form_table_list\" style=\"width:100px;\">");
	for(var i=0;i<tables.length;i++){
		sb.append("<option value=\""+tables[i].code+"\" title=\""+tables[i].name+"\">"+tables[i].name+"</option>");
	}
	sb.append("</select></span>");
	
	//单位选择下拉框  
	sb.append("<span><span >单位：</span></span>");
	sb.append("<span><input type=\"text\" readOnly=\"true\" id=\"form_agency_tree\" style=\"width:100px;cursor : pointer;\">");
	sb.append("</input></span>");
	
	sb.append("<span><span >对比基准:</span></span>");
	sb.append("<span><select id=\"form_backup_list_0\" style=\"width:100px;\">");
	sb.append("<option value=\"currentdata\" selected>当前数据</option>");
	sb.append("</select></span>");
	
	sb.append("<span><span >对比目标:</span></span>");
	sb.append("<span><select id=\"form_backup_list_1\" style=\"width:100px;\">");
	sb.append("<option value=\"currentdata\" selected>当前数据</option>");
	sb.append("</select></span>");
	
	sb.append("<span><input type=\"radio\" name=\"compareType\" value=\"0\" checked>完整数据</input></span>");
	sb.append("<span><input type=\"radio\" name=\"compareType\" value=\"1\">差异数据</input></span>");
	
	sb.append("<span><span style=\"width:10px;\"></span></span>");
	
	sb.append("<span><span id=\"doCompareBTN\" title=\"开始数据对比\" class=\"add_btn\" ><a href=\"javascript:void(0)\">开始比较</a></span></span>");
	sb.append("</div>");
	
	sb.append("<div id=\"form_table_title\">");
	sb.append("<ul><li class=\"top\"><div>对比信息</div></li><li class=\"nextdiffBTN\" style='float:right;'><div id=\"nextdiff\">下一个差异</div></li><li class=\"prediffBTN\" style='float:right;'><div id=\"prediff\">上一个差异</div></li></ul>");
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
	
	//单位下拉框
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
		//跳转到上一个差异
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
		//跳转到下一个差异
		if(dt_0 == null || dt_1 == null){
			return;
		}
		if(index < difIndex.length-1){
			var i = parseInt(difIndex[++index]);
			dt_0.goto(i);
			dt_1.goto(i);
		}
	}
	//采集表下拉框联动事件
	document.getElementById("form_table_list").onchange = function(){
		loadBackupList();
	}
	//开始比较按钮点击事件
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
			alert('请选择不同的备份！');
			return;
		}
		var agencys = [];
		if(document.getElementById('form_agency_tree').ids != null && document.getElementById('form_agency_tree').ids.length > 0){
			agencys = document.getElementById('form_agency_tree').ids.split(',');
		}
		if(agencys.length == 0){
			alert('请选择单位！');
			return;
		}
		if(document.getElementById("form_table_list").value == 'V_BUDGETOUTPAYFORM'){
			//支出表
			if(agencys.length>1){
				alert('支出项目录入表只能一次对比一个单位的数据！');
				return;
			}
		}else{
			if(agencys.length>10){
				alert('选择的单位数不能超过10个！');
				return;
			}
		}
		document.getElementById('doCompareBTN').disabled = true;
		doCompare(bakID0,bakID1,agencys,compareType);
	}
	//绘制单位树
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
				//点击其他区域，关闭下拉框，取值
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
	//获取元素纵坐标
	function getTop(e){
		var offset=e.offsetTop; 
		if(e.offsetParent!=null) offset+=getTop(e.offsetParent); 
		return offset; 
	}
	//获取元素的横坐标 
	function getLeft(e){
		var offset=e.offsetLeft; 
		if(e.offsetParent!=null) offset+=getLeft(e.offsetParent); 
		return offset; 
	}
	//初始化div
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
	
	//根据选择的采集表 加载备份信息下拉框
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
						opt0.setAttribute('title', '备注：'+resp[i].REMARK);
						opt1.setAttribute('title', '备注：'+resp[i].REMARK);
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
	 * 执行数据对比，只需要备份ID就可以取到一套完整备份，其中包含全部单位（备份时所选的）的数据。
	 * @param bakID0 基准备份ID
	 * @param bakID1 目标备份ID
	 * @param compareType 备份方式
	 */
	function doCompare(bakID0,bakID1,agencys,compareType){
		//先清空比较区域
		document.getElementById('datatable_div_0').innerHTML='';
		document.getElementById('datatable_div_1').innerHTML='';
		
		function rowspanFN(l,c,rs){
			//多余数据
			if(rs.DIFFTYPE == '1'){
				return 'formmodelCompare_differenttype_1';
			}
			//差异数据
			if(rs.DIFFTYPE == '2'){
				var difIndex = rs.DIFINDEX.split("$");
				if(difIndex.indexOf(dt_0.getCols()[c].name)!=-1){
					return 'formmodelCompare_differenttype_2_1';
				}else{
					return 'formmodelCompare_differenttype_2';
				}
			}
			//缺少数据
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
				//绘制表格
				dt_0.draw(datatable_div_0);
				dt_1.draw(datatable_div_1);
				
				document.getElementById('compareResult_div').style.borderLeft = "#8ba3da 1px solid";
				document.getElementById('compareResult_div').style.borderTop = "#8ba3da 1px solid";
				document.getElementById('compareResult_div').innerHTML='比较结果：</br>增加记录（<span style="background-color:#FFFF00;">　　</span>所示）：<strong>'+resp.addCNT+'</strong>　条、差异记录（<span style="background-color:#FFC864;">　　</span>所示）：<strong>'+resp.difCNT+'</strong>　条、缺少记录（<span style="background-color:#C8C8C8;">　　</span>所示）：<strong>'+resp.remCNT+'</strong>　条。';
				
				document.getElementById("datatable_div_1").style.position = "absolute";
				
				//datatable滚动事件
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
			//调用失败
			showCompareBTN();
		});
	}
	function showCompareBTN(){
		//延时两秒再让按钮正常显示
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