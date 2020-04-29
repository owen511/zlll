

var qtree = null;
var datatable = null;
var submenu, mainmenu, modelId, bdgAgency;
var selNodeFlag = false;
var tablecode = "";
var product;
var wind = null;// 弹出窗口
var agencyAddName=null;
var formulaEditor = null;
var tableData;
var elementDataMap = {},tableheight = 0;
var level,defineid,sourceTable;
var tablescolumn_list = function(config, service) {

	agencyAddName=config.nameAgency;
	mainmenu = config.mainmenu;
	submenu = config.menuId;	
	tablecode = config.defineid;
	bdgAgency = config.bdgAgency;
	product = config.product;
	tableData = config.tablesList;
	level = config.levelno;
	defineid = config.defineid;
	sourceTable = config.sourceTable;
	//agencyAddName=config.bdgAgency;
	// 初始化布局
	initLayout(config)
	datatable = new Ext.lt.datatable(config.tableDefineList);
	var first = config.headList;
	first.insert(datatable.columns.seq, 0)
    first.insert(datatable.columns.radio);
	
	
	datatable.setCols(first);


	datatable.setClassName("dttheme_budget");
	//datatable.setSelectDown(false);
	// 锁定第一列
	// datatable.clockColumnSize(1);

	initFormulaEditor();
	datatable.mousedrag(false);
	datatable.setAllowClock(true);
	datatable.headsort(false);
	datatable.headsort(true);
	datatable.setAllowcustom(false);
	datatable.draw(tableContainer);
//	 document.getElementById("template_main").attachEvent('onresize', function(){
//		var titleHeight = document.getElementById("query_t").offsetHeight + document.getElementById("form_table_title").offsetHeight;
//		document.getElementById('containerline20_d').style.height = document.getElementById("template_main").offsetHeight-titleHeight+'px';
//		document.getElementById('tableContainer').style.height = document.getElementById("template_main").offsetHeight-titleHeight-2+'px';
//		document.getElementById('context').style.width = document.getElementById("main").offsetWidth+'px';
//		document.getElementById('template_main').style.width = document.getElementById("main").offsetWidth-10+'px';
//		document.getElementById('containerline20_d').style.width = document.getElementById("main").offsetWidth-30+'px';
//		document.getElementById('tableContainer').style.width = document.getElementById("main").offsetWidth-30+'px';
//		if(datatable != null){
//			//datatable.resize(document.getElementById('tableContainer').offsetWidth,document.getElementById('tableContainer').offsetHeight);
//			datatable.reflash();
//		}
//	});
//	tableheight = $("#tableContainer").height();
}
//------onload end



/**
 * 初始化界面布局
 */
function initLayout(config) {
	var sb = new StringBuffer();
	var tableSbuffer = new StringBuffer();
		

//	sb.append(" <tr>");
//	sb.append("<td width=\"25%\" valign=\"top\">");
//	sb.append("<div style=\"position:relative;z-index:100;\">	");
//	sb.append("</div>");
//	sb.append("<div id=\"treeContainer\" style=\"background:#fff;border:1px solid #ccc;padding:4px; overflow:auto;height:500px;\"></div>");
//	sb.append("</td>");
//	sb.append("<td width=\"70%\" valign=\"top\">");
	sb.append("<div id=\"query_t\">");
	sb.append("<span><span title=\"增加\" class=\"add_btn\" onclick=\"doadd()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">增加</a></span></span>	");
	sb.append("<span><span title=\"清除\" class=\"del_btn\" onclick=\"clearData()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">清除</a></span><span>｜</span></span>");
	sb.append("<span><span title=\"删除\" class=\"mod_btn\" onclick=\"deleteData()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">删除</a></span></span>");
	sb.append("<span><span title=\"表达式\" class=\"template_btn\" onclick=\"doexpess()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">表达式</a></span></span>");
		
	sb.append("<span><span title=\"检查\" class=\"template_btn\" onclick=\"checkColumns()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">检查</a></span></span>	");
	sb.append("<span><span title=\"保存\" class=\"add_btn\" onclick=\"saveForm()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">保存</a></span></span>	");
	sb.append("<span><span title=\"返回\" class=\"template_btn\" onclick=\"backDefine()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">返回</a></span></span>	");
	sb.append("</div>");
	sb.append("<form name=\"mainListForm\" id=\"mainListForm\" action=\"#\" method=\"post\">");
	sb.append("<div id=\"form_table_title\">");
	sb.append("<ul>");
	sb.append("<li class=\"top\"><div>对应关系设置</div></li>");
	sb.append("</ul>");
	sb.append("</div>");
	sb.append("</form>");
//	sb.append("<table align='center' width=\"100%\" border=\"0\" id=\"table\">");
	sb.append("<div id=\"containerline20_d\">");
	sb.append("<div id=\"tableContainer\" style=\"height:450px;width:97%;\"></div>");	
	sb.append("</div>");
//	sb.append("</td>");
//	sb.append("</tr>");
//	sb.append("</table>");

	
	sb.append("<div id=\"form_content\" style=\"display:none;\" >");
	sb.append("<div style=\"width:560px;height:380px;\">");
	sb.append("<table id=\"form_table\" class=\"tableview\" width = '100%'>");
	sb.append("<tr>");
	sb.append("<td  valign=\"top\" width = '45%'>");
	sb.append("<div style=\"position:relative;z-index:100;\">");
	sb.append("<label>数据类型</label>：");
	sb.append("<select id=\"dataType_select\">");
	
	sb.append("</select>");
	sb.append("</div>");
	sb.append("<div id=\"tContainer\" style=\"background:#fff;border:1px solid #ccc;padding:4px; overflow:auto;height:300px;\"></div>");
	sb.append("</td>");
	sb.append("<td  valign=\"top\" width = '50%'>");
	sb.append("<div id=\"tContainer1\" style=\"height:300px;\">");
	sb.append("<input type='radio' id = \"textname\" onclick=\"radioShow();\"/>字段:<input type = 'text' code = \"\" datatype = \"\" id = \"filed\" style = \"width:75%\" disabled>");
	sb.append("<input type='hidden' id = \"columncode1\"/>");
	sb.append("<br>");
	sb.append("<input type='radio' id = \"constant\" onclick=\"constantRadioShow();\"/>常量:<input type = 'text' id = \"filed1\" style = \"width:75%\" disabled>");
	sb.append("<br>");
	sb.append("<input type='radio' id = \"formula\" onclick=\"formulaRadioShow();\"/><label>公式：</label>");
	sb.append("<iframe marginwidth=\"0\" marginheight=\"0\" frameborder=\"1\" name=\"formulaEditor\" id=\"formulaEditor\" style = \"height:280px\"></iframe>");
//	sb.append("<textarea id = \"filed2\" rows = '15' cols = '40' disabled></textarea>");
	sb.append("</div>");
	sb.append("</td>");
	sb.append("</tr>");
	sb.append("</table>");	
	sb.append("<div style=\"margin-left:40%;\">");
	sb.append("<input type=\"button\" style = \"height:20px;\" value=\"校 验\" onclick=\"vaildExp()\"></input>");
	sb.append("<input type=\"button\" style = \"height:20px;\" value=\"保 存\" onclick=\"saveExp()\"></input>");
	sb.append("<input type=\"button\" style = \"height:20px;\" value=\"取 消\" onclick=\"form_content_wind.hidden();\"></input>");
	sb.append("</div>");
	sb.append("</div>");
	sb.append("</div> ");
	
//	sb.append("");
	
					
					
									
					
					
				
			
					
					
				
				
		
		
	
	
	document.getElementById("template_main").innerHTML = sb.toString();
	




}


//添加
function doadd(){
	var params = {};
	params["sourceTable"] = sourceTable;
	params["defineid"] = defineid;
	params["levelno"] = level;
	params["product"] = product;
	var rs = datatable.getRecordset();	
	Ext.lt.RCP.server("datacommon_tablescolumn_service", "addColumnList",params,function(data){
			if(data!=null){
				rs.join(data,rs.size+1);
			}
			else{
				alert("没有可增加的目标列!");
			}
	
	});
	
}

//清除
function clearData(){
	var data = datatable.getRecordset().query({check:1});
	if(data.size()==0){
		alert("请选择需要清除的表达式!");
		return;
	}
	if(data.size()>0){
	data[0].EXPCONTENT = "";
	datatable.reflash();
	}
	
	
}
//删除
function deleteData(){
	var params = {};
	var datas = datatable.getRecordset();
	params["levelno"]=level;
	params["defineid"]=defineid;
	
	if(confirm("是否删除当前数据?")){ 
		Ext.lt.RCP.server("datacommon_tablescolumn_service", "deleteColumnList",params,function(data){
			if(data.error){
				alert(data.error);
			}
			else{
				datatable.getRecordSet().remove(datas);	
				datatable.reflash();
				alert("删除成功!");
			}
			
		
	});	
}
	else{
		return true
	}
}

function  doexpess(){
	var params = {};
	var datas = datatable.getRecordset().query({check:1});
	if(datas.size()==0){
		alert("请选择一个目标列!");
		return;
	}
	var columncode = datas[0].COLUMNCODE;	
	var expcontent = datas[0].EXPCONTENT;
	var exptype = datas[0].EXPTYPE;
	
	if(expcontent==undefined){
		expcontent = "";
	}
	
	
	document.getElementById("textname").checked= false;	
	document.getElementById("filed").value="";
	document.getElementById("constant").checked= false;	
	document.getElementById("filed1").value="";
	document.getElementById("formula").checked= false;	
	formulaEditor.document.body.innerHTML = "";
//	document.getElementById("filed2").value="";
	if(exptype==0){
		document.getElementById("textname").checked= true;	
		document.getElementById("filed").value=expcontent;
	}
	else if(exptype==1){
		document.getElementById("constant").checked= true;	
		document.getElementById("filed1").value=expcontent;
		document.getElementById("filed1").disabled = false;
	}
	else{
		var expName = datas[0].EXPNAME;
		document.getElementById("formula").checked= true;	
		 formulaEditor.document.body.innerHTML = expName;
		
//		document.getElementById("filed2").value=expcontent;
	}
	
	params["sourceTable"]=sourceTable;
	params["defineid"]=defineid;
	$("#form_content").show();
	var colData = null;
	var colTitle;
	form_content_wind = new Ext.lt.window({title:'表达式',fitmode:'body',className:'wind7',mark:true,autoshow:false,pop:true,w:662,h:472});
	
	form_content_wind.draw(form_content);
	
	form_content_wind.show();
	$("#form_content select").show();
	document.getElementById("formulaEditor").style.display = "";
	Ext.lt.RCP.server("datacommon_tablescolumn_service", "getSourceColumnList",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			colData = data.rs;
			var sourceTable = data.sourceTableList;
			if(sourceTable!=null&&sourceTable.length>0){
				var selector = new StringBuffer();
				for(var i = 0;i<sourceTable.length;i++){
					var table = sourceTable[i];				
					selector.append("<option value=").append(table.TABLECODE).append(" >").append(table.NAME).append("</option>");
				}
				$("#dataType_select").html(selector.toString());
			}
			colTitle = data.columnTitleList;
			var leftcoltable = null;
			leftcoltable = new Ext.lt.datatable35(colData);
			colTitle.insert(datatable.columns.seq, 0);	
			leftcoltable.setCols(colTitle);
			leftcoltable.setEditSelectCheckbox(false);
			leftcoltable.setMouselight('#597EAA');
			leftcoltable.mousedrag(false);
			leftcoltable.onEvent('ondblclick',function(td,el,l,c,d){
			var myValue = $("#dataType_select").text()+"."+d.NAME;
			var colCode = $("#dataType_select").val()+"."+d.COLUMNCODE;
			var datatype = d.DATATYPE;
			if(document.getElementById("textname").checked){
				document.getElementById("filed").value = myValue;
				$("#filed").attr("code",colCode);
				$("#filed").attr("datatype",datatype);
				document.getElementById("filed").code = colCode;
				document.getElementById("filed").datatype = datatype;
			}
			else if(document.getElementById("formula").checked){
				var html = "";
//				  if(pid=='sysfun_factor_container'){
//					  html =factorName ;
//				  }else{
					  html = "<input type=\"text\" datatype = \""+datatype+"\" factorId=\""+colCode+"\" value=\""+myValue+"\" style = \"width:"+myValue.length*13+"px\"/>";
//				  }
				   formulaEditor.focus();
				    var selection = formulaEditor.document.selection;
				    if(selection){
				      if (selection.type.toLowerCase() != "none"){
				        this.execCommand("Delete");
				      }
				      formulaEditor.document.selection.createRange().pasteHTML(html) ;
				    }else{//for ff
				      this.execCommand("insertHTML",false,html);
				    }
				    formulaEditor.focus(); 
//				var myField = document.getElementById("filed2");
//				var myfiledCode;
//				if (document.selection) {
//					myField.focus();
//					sel = document.selection.createRange();
//					sel.text = myValue;
//					myfiledCode = colCode;
//					sel.select();
//					}
//					//MOZILLA/NETSCAPE support 
//					else if (myField.selectionStart || myField.selectionStart == '0') {
//					var startPos = myField.selectionStart;
//					var endPos = myField.selectionEnd;
//					// save scrollTop before insert www.keleyi.com
//					var restoreTop = myField.scrollTop;
//					myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
//					myfiledCode  = myField.value.substring(0, startPos) + colCode + myField.value.substring(endPos, myField.value.length);;
//					if (restoreTop > 0) {
//					myField.scrollTop = restoreTop;
//					}
//					myField.focus();
//					myField.selectionStart = startPos + myValue.length;
//					myField.selectionEnd = startPos + myValue.length;
//					} else {
//					myField.value += myValue;
//					myField.focus();
//					}
//
			}
			});
			leftcoltable.setClassName('dttheme_budget');
			
			leftcoltable.draw(tContainer);
		}
		
	
	});
//	document.getElementById("columncode1").value=columncode;
	
}

function radioShow(){
		document.getElementById("textname").checked= true;		
//		document.getElementsByName("filed")[0].disabled = true;
		document.getElementById("constant").checked= false;
		document.getElementById("formula").checked= false;
		document.getElementById("filed1").value="";
		
		document.getElementById("filed1").disabled = true;		
	
			formulaEditor.document.body.innerHTML = "";				
			document.getElementById("formulaEditor").contentEditable = false;
	
}

function constantRadioShow(){
	document.getElementById("filed1").disabled = false;
//	document.getElementById("filed2").disabled = true;
	document.getElementById("filed").code="";
	document.getElementById("constant").checked= true;
	document.getElementById("textname").checked= false;		
	document.getElementById("formula").checked= false;
	document.getElementById("filed").value="";
	
	formulaEditor.document.body.innerHTML = "";				
	document.getElementById("formulaEditor").contentEditable = false;
//	document.getElementById("filed2").code="";
}
function formulaRadioShow(){
	formulaEditor.document.designMode = 'On';
	document.getElementById("constant").checked= false;
	document.getElementById("textname").checked= false;		
	document.getElementById("formula").checked= true;
	document.getElementById("filed").value="";
	document.getElementById("filed").code="";
	document.getElementById("filed1").value="";
	document.getElementById("filed1").disabled = true;

	
}

function saveExp(){
	var expStr,expContent,expName;
	var expType;
	if(document.getElementById("textname").checked){
		expStr = document.getElementById("filed").code;
		expContent = document.getElementById("filed").value;
		expType = 0;
	}
	else if(document.getElementById("constant").checked){
		expStr = document.getElementById("filed1").value;
		expContent = document.getElementById("filed1").value;
		expType = 1;
	}
	else{
		 var content = $("<div style=\"display:none;\">"+formulaEditor.document.body.innerHTML+"</div>");
		 var contentName = $("<div style=\"display:none;\">"+formulaEditor.document.body.innerHTML+"</div>");
		 expName = formulaEditor.document.body.innerHTML;
		 contentName.find("input[value]").each(function(){
	           var value = $(this).attr("value");
	           $(this).replaceWith("{"+value+"}");
	         });
		 expContent = contentName.text().replace(/[\xa0]/gi, " ");
         content.find("input[factorId]").each(function(){
           var fId = $(this).attr("factorId");
           $(this).replaceWith("{"+fId+"}");
         });
         expStr = content.text().replace(/[\xa0]/gi, " ");
		 
		expType = 2;
	}
	var params = {};
	params["sourceTable"] = sourceTable;
	params["expStr"] = expStr;
	params["expType"] = expType;
	params["expName"] = expName;
	params["expContent"] = expContent;
	Ext.lt.RCP.server("datacommon_tablescolumn_service", "validExp",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
							
			var colValue = $("#columncode1").val();
			var datas = datatable.getRecordset().query({check:1});
			datas[0].EXPCONTENT = data.expContent;
			datas[0].EXPTYPE = expType;
			datas[0].EXPCONDITION = data.expcondition;
			datas[0].EXPNAME = data.expName;
			datatable.reflash();
		}
		
	
});		
	
	form_content_wind.hidden();
}

function saveForm(){
	var result=true;
	var params = {};	
	var formData = datatable.getRecordset();
	if(formData.length==0){
		alert("没有目标列,请检查!");
		return;
	}
	var inputobj = formData.toArray();
	params["inputobj"]=inputobj;
	params["defineid"]=defineid;
	params["level"] = level;
	params["sourceTable"] = sourceTable;
	params["product"] = product;
	var res=Ext.lt.RCP.asynserver('datacommon_tablescolumn_service', 'saveDatas',params);
	if(res.result=='1'){
		result= true ;		
		alert("保存成功");
		jumpTo("/datacommon/tablesdefine/index.page?mainmenu="+mainmenu+"&submenu="+submenu+"","post",params);
	  }else{
		result=  false;
		alert("保存失败");
	  }
	
	
	
}

function vaildExp(){
	var expStr;
	var expType;
	var data = datatable.getRecordset().query({check:1});
	var datatype = data[0].DATATYPE;
	if(document.getElementById("textname").checked){
		if(datatype!=document.getElementById("filed").datatype){
			alert("字段类型不一致,请检查!");
			return;
		}
		expStr = document.getElementById("filed").code;
		expType = 0;
	}
	else if(document.getElementById("constant").checked){
		expStr = document.getElementById("filed1").value;
		expType = 1;
		
	}
	else{
		var content = $("<div style=\"display:none;\">"+formulaEditor.document.body.innerHTML+"</div>");		
        content.find("input[factorId]").each(function(){
          var fId = $(this).attr("factorId");
          $(this).replaceWith("{"+fId+"}");
        });
        expStr = content.text().replace(/[\xa0]/gi, " ");
		expType = 2;
	}
	var params = {};
	params["sourceTable"] = sourceTable;
	params["expStr"] = expStr;
	params["expType"] = expType;
	Ext.lt.RCP.server("datacommon_tablescolumn_service", "validExp",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
							
			alert("公式校验成功!");
		}
		
	
});		
}

function backDefine(){
	var params = {};
	params["product"] = product;
	params["tablecode"] = tablecode;
	jumpTo("/datacommon/tablesdefine/index.page?mainmenu="+mainmenu+"&submenu="+submenu+"","post",params);
}

function checkColumns(){
	var params = {};
	params["sourceTable"] = sourceTable;
	params["defineid"] = defineid;
	params["levelno"] = level;
	params["product"] = product;
	Ext.lt.RCP.server("datacommon_tablescolumn_service", "checkColumn",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			if(data.message!=null&&data.message!=undefined){				
				alert(data.message);
			}
			else{
				var rs = datatable.getRecordset();	
				rs.clear();	
				rs.join(data.rs,rs.size+1);
				alert("检查完成");
//				datatable.getRecordset().addData(data.rs,0);
				
			}
		}
		
	
});		
}

/**
 * 装载公式编辑器
 */
function initFormulaEditor(){

  formulaEditor = document.getElementById("formulaEditor").contentWindow; 
  formulaEditor.document.designMode = 'On';
  formulaEditor.document.contentEditable = true;
  formulaEditor.document.open();
//  formulaEditor.document.writeln(" <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /> <html><head><link href=\"datacommon/common/style/formulastyle.css\" rel=\"stylesheet\" type=\"text/css\"/></head><body></body></html>");
  formulaEditor.document.onclick = "alert()";
  formulaEditor.document.close();
  formulaEditor.document.charset="utf-8";
  this.srcElement = null;
  if(window.getSelection){//for ff
    $(formulaEditor.document).bind("mouseup",this,function(event){
      event.data.srcElement = event.target;
    });
  }
  
  //ie bug
  if(document.attachEvent){
      var selRange;
      var ieSelectionBookmark ;
      formulaEditor.document.onbeforedeactivate = function() {
        selRange = this.selection.createRange();
      };
      formulaEditor.document.onactivate = function () {
        if(selRange){
          selRange.select();
          selRange = null;
        } 
      }
  }
  

  
//  $("#project_func").html("");	 
  
  
  
//  //点击case语法
//  $("#btn_showcase").unbind().bind("click",function(e){
//		var  html = "case when    then     else     end  ";
//	    formulaEditor.focus();
//	    var selection = formulaEditor.document.selection;
//	    if(selection){
//	      if (selection.type.toLowerCase() != "none"){
//	        this.execCommand("Delete");
//	      }
//	      formulaEditor.document.selection.createRange().pasteHTML(html) ;
//	    }else{//for ff
//	      this.execCommand("insertHTML",false,html);
//	    }
//	    formulaEditor.focus(); 
//   });
//  
//  
//  
//  $("#btn_checkFormula").bind("click",function(){
//    //alert(formulaEditor.document.body.innerHTML);
//    checkFormula();
//
//  });
  
  formulaEditor.clear = function(){
		this.document.body.innerHTML = "";
		};
  
}


 
