var flag = 0;
var but = function(){return ['<input type="button" onclick="dop()">']};
var detaildata = null;
var sondata = null;
var sondatatable = null;
var maindata = null;
var maindatatable = null;
var flag = 0;
var _qtree = null;
var qtree = null;
var qtreewind = null;
var taskclasslist = null;
var area = null;
var levelno = null;
var proitemid = null;
var taskclassid,isbenji,statelist,sontaskstatus,maintaskstatus,arealist,isdoadd,isDetailBJ;
var blflag = 1;
var qhflag = 0;
var checkedCodes = [];
var collecttask_list = function(config, service) {
	taskclasslist = config.taskclasslist;
	area = config.area;
	proitemid = config.proitemid;
	statelist = config.statelist;
	arealist = config.arealist;
	isbenji = config.isbenji;
	levelno = config.levelno;
	// ��ʼ������
	initLayout(config);
	maindata = config.maintaskList;
	maindatatable = new Ext.lt.datatable35(maindata);
//	var cols = config.headmap.titleList
//	cols.insert(maindatatable.columns.seq, 0);
//	cols.insert(maindatatable.columns.radio, 1);
//	maindatatable.setCols(cols);
	maindatatable.setCols([
   			maindatatable.columns.seq,
   			maindatatable.columns.radio,
   			{name:'TASKNAME',alias:'�ɼ���������',datatype:'S',style:'text-align:center'},
   			{name:'TASKTYPEID',alias:'�ɼ�����',datatype:'S',style:'text-align:center',mapper:config.collectclass,format:'#NAME'},
   			{name:'TASKNO',alias:'�ɼ�������',datatype:'S',style:'text-align:center'},
   			{name:'TASKCYCLE',alias:'����ɼ�����',datatype:'S',style:'text-align:center'},
   			{name:'MANAGEOFFICE',alias:'���ܴ���',datatype:'S',style:'text-align:center',mapper:config.officemapper,format:'#name'},
   			{name:'CONTENT',alias:'�ɼ�����˵��',datatype:'S',style:'text-align:center'},
   			{name:'DATASTARTDATE',alias:'���ݿ�ʼ����',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
   			{name:'DATAENDDATE',alias:'���ݽ�������',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
   			{name:'LASTDATE',alias:'��ֹ����',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
   			{name:'TASKSTATUS',alias:'�ɼ�����״̬',datatype:'S',style:'text-align:center',mapper:config.statemap,format:'#name'},
   			{name:'tasksource',alias:'������Դ',datatype:'S',style:'text-align:center'},
   			{name:'CREATEDATE1',alias:'��������',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
   			{name:'SENDDATE',alias:'�´�����',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
   			{name:'RECEIVEDATE',alias:'��������',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
   			{name:'STARTDATE',alias:'��ʼ����',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
   			{name:'REPORTDATE',alias:'�ϱ�����',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
   			{name:'ENDDATE',alias:'�������',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
   			{name:'BACKDATE',alias:'�˻�����',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'}
   	]);	
	maindatatable.setEditSelectCheckbox(false);
	maindatatable.setMouselight('#597EAA');
	maindatatable.setLayout();
	maindatatable.mousedrag(false);
	maindatatable.setClassName('dttheme_ifmis');
	maindatatable.onEvent('onclick',function(td,el,l,c,d){
		sondata.clear();
		var itemid = d.ITEMID;
		var params = {};
		params["itemid"] = itemid;
		params["typeid"] = d.TASKTYPEID;
		params["isbenji"] = isbenji;
		var resp = Ext.lt.RCP.asynserver("datacommon_collecttask_service", "selSonData" ,params);
//		if(!resp.detailmark) {
//			document.getElementById('createson').disabled= true;
//		} else {
//			document.getElementById('createson').disabled= false;
//		}
		isDetailBJ = resp.isDetailBJ;
		isdoadd = resp.detailmark;
		alert(isDetailBJ);
		sondata.join(resp.sontaskList,0);
		sondatatable.reflash();
	});
	//���Ʊ��
	maindatatable.draw(maindatadiv);
	
	
	sondata = new Ext.lt.recordset({columns:[],datas:[]});
 	sondatatable = new Ext.lt.datatable35(sondata);
 	//sondatatable.setCols(cols)
 	sondatatable.setCols([
 			sondatatable.columns.seq,
 			sondatatable.columns.radio,
 			{name:'TASKNO',alias:'��������',datatype:'S'},
 			{name:'TAGAREA',alias:'�������´����',datatype:'S',style:'text-align:center',mapper:config.areamapper,format:'#name'},
 			{name:'MANAGEOFFICE',alias:'���ܴ���',datatype:'S',style:'text-align:center',mapper:config.officemapper,format:'#name'},
 			{name:'TASKSTATUS',alias:'������״̬',datatype:'S',style:'text-align:center',mapper:config.statemap,format:'#name'},
 			{name:'LASTDATE',alias:'��ֹ����',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
 			{name:'CREATEDATE1',alias:'��������',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
 			{name:'SENDDATE',alias:'�´�����',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
 			{name:'RECEIVEDATE',alias:'��������',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
 			{name:'STARTDATE',alias:'��ʼ����',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
 			{name:'REPORTDATE',alias:'�ϱ�����',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
 			{name:'ENDDATE',alias:'�������',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
 			{name:'BACKDATE',alias:'�˻�����',datatype:'D',style:'text-align:center',format:'YYYY-MM-DD'},
 			{name:'BACKTEXT',alias:'�˻�ԭ��',datatype:'S',style:'text-align:center'},
 			{name:'REMARK',alias:'�ܽ���Ϣ',datatype:'S',style:'text-align:center'}
 			]);

 	sondatatable.setMouselight('#597EAA');
 	sondatatable.mousedrag(false);
 	sondatatable.setClassName('dttheme_ifmis');
 	sondatatable.setLayout();
 	//���Ʊ��
 	sondatatable.draw(sondatadiv);
}

/**
 * ��ʼ�����沼��
 */
function initLayout(config) {
	var sb = new StringBuffer();
	sb.append("<div>");
	sb.append("	<br class=\"clear\" />");
	sb.append("	<fieldset class=\"fieldset\">");
	sb.append("	<legend>������</legend>");
	sb.append("	<div id=\"query_t\">");
	sb.append("	<span>������״̬��<input id=\"ddlmaintask\" readonly value=\"ȫ������\" onclick=\"drawmaintaskddl(ddlmaintask)\">&nbsp;&nbsp;</span>");
	sb.append("	<span>������ࣺ<input id=\"ddl1\" readonly value=\"ȫ��\" onclick=\"drawddl(ddl1)\">");
	sb.append("		&nbsp;");
	sb.append("	</span>");
	sb.append("	<span style=\"vertical-align:middle;\"><input type=\"radio\" checked=\"checked\"  id='rad2' name=\"job\" value='0' />ȫϽ&nbsp;<input id='rad1' type=\"radio\" name=\"job\" value='1' />����&nbsp;</span>");
	sb.append("	<span><span title=\"�½�������\" class=\"add_btn\" onclick=\"doadd()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">�½�������</a></span></span>	");
	sb.append("	<span><span title=\"�޸�\" class=\"mod_btn\" onclick=\"doedit()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">�޸�</a></span></span>");
	sb.append("	<span><span title=\"ɾ��\" class=\"del_btn\" onclick=\"deleteData()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">ɾ��</a></span><span>��</span></span>");
	sb.append("	<span><span title=\"���ܲɼ�����\" class=\"mod_btn\" onclick=\"doaction(1)\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">��������</a></span></span>");
	sb.append("	<span><span title=\"ȡ���ɼ�����\" class=\"mod_btn\" onclick=\"doaction(2)\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">ȡ������</a></span></span>");
	sb.append("	<span><span title=\"��ɲɼ�����\" class=\"mod_btn\" onclick=\"doaction(3)\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">�������</a></span></span>");
	sb.append("	</div>");
	sb.append("	<div id='maindatadiv' style=\"width:auto;height:200px;overflow:scroll\" layout=\"{w:{fit:true},h:{fit:200}}\"></div>");
	sb.append("	<br class=\"clear\" />");
	sb.append("	</fieldset>	");
	sb.append("<br class=\"clear\" />");
	sb.append("<fieldset class=\"fieldset\">");
	sb.append("<legend>������</legend>");
	sb.append("<div id=\"query_t\">");
	sb.append("	<span>������״̬��<input id=\"ddlsontask\" value=\"ȫ������\" readonly onclick=\"drawsontaskddl(ddlsontask)\">&nbsp;&nbsp;&nbsp;&nbsp;</span>");
	sb.append("<span><span id='createson' title=\"�½�������\" class=\"add_btn\" onclick=\"doaddson()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">ϸ���ɼ�����</a></span></span>");
	sb.append("<span><span title=\"ɾ��������\" class=\"del_btn\" onclick=\"deleteSonData()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">ɾ��������</a></span></span>");
	sb.append("<span><span title=\"�´�������\" class=\"mod_btn\" onclick=\"doaction(4)\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">�´�������</a></span></span>");
	sb.append("<span><span title=\"ȷ��������\" class=\"mod_btn\" onclick=\"doaction(5)\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">ȷ��������</a></span></span>");
	sb.append("<span><span title=\"ȡ��������\" class=\"mod_btn\" onclick=\"doaction(6)\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">ȡ��������</a></span></span>");
	sb.append("<span><span title=\"����������\" class=\"mod_btn\" onclick=\"doaction(7)\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">����������</a></span></span><span>��</span></span>");
	sb.append("<span><span title=\"���½�ֹ����\" class=\"mod_btn\" onclick=\"doenddate()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">���½�ֹ����</a></span></span><span>��</span></span>");
	sb.append("<span><span title=\"ǿ���������\" class=\"mod_btn\" onclick=\"doaction(8)\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">ǿ���������</a></span></span>	");
	sb.append("</div>");
	sb.append("<div id='sondatadiv' style=\"width:auto;height:200px;overflow:scroll\" layout=\"{w:{fit:true},h:{fit:200}}\"></div>");
	sb.append("<br class=\"clear\" />");
	sb.append("</fieldset>");
	sb.append("</div>	");
//	sb.append("<div id=\"form_content\" style=\"display:none;\" >");
//	sb.append("<div style=\"width:460px;height:380px;\">");
//	sb.append("<table id=\"form_table\" class=\"tableview\">");
//	sb.append("	<colgroup colName=\"name\" colType=\"str\" style=\"text-align:center;\"></colgroup>");
//	sb.append("	<colgroup colName=\"value\" colType=\"str\" ></colgroup>");
//	sb.append("	<tbody>");
//	sb.append("		<tr>");
//	sb.append("			<td>�ɼ��������11</td>");
//	sb.append("			<td>");
//	sb.append("	</td>");
//	sb.append("		</tr>");
//	sb.append("		<tr>");
//	sb.append("		<td>�ɼ���������</td>");
//	sb.append("	<td><input type=\"text\" id=\"collecttaskname\" /></td>");
//	sb.append("</tr>");
//	sb.append("<tr>");
//	sb.append("	<td>�ɼ�������</td>");
//	sb.append("	<td><input type=\"text\" id=\"collecttaskid\" /></td>");
//	sb.append("	</tr>");
//	sb.append("	<tr>");
//	sb.append("	<td>����ɼ�����</td>");
//	sb.append("	<td><input type=\"text\" id=\"collecttaskcycle\" /></td>");
//	sb.append("	</tr>");
//	sb.append("<tr>");
//	sb.append("		<td>���ܴ���</td>");
//	sb.append("	<td><input type=\"text\" id=\"mainoffice\" /></td>");
//	sb.append("</tr>");
//	sb.append("	<tr>");
//	sb.append("		<td>���ݿ�ʼ����</td>");
//	sb.append("	<td><input type=\"text\" id=\"datastartdate\" /></td>");
//	sb.append("	</tr>	");
//	sb.append("	<tr>");
//	sb.append("	<td>���ݽ�������</td>");
//	sb.append("	<td><input type=\"text\" id=\"dataenddate\" /></td>");
//	sb.append("		</tr>		");
//	sb.append("</tbody>");
//	sb.append("</table>");
//	sb.append("</div>	");
//	sb.append("<div style=\"margin-left:40%;\">");
//	sb.append("<input type=\"button\" value=\"�� ��\" style=\"height:20px;\" onclick=\"dosave()\"></input>");
//	sb.append("<input type=\"button\" value=\"ȡ ��\" style=\"height:20px;\" onclick=\"form_content_wind.hidden();\"></input>");
//	sb.append("</div>");
//	sb.append("</div>");
	sb.append("<div id=\"form_content1\" style=\"display:none;\" >");
	sb.append("<div id=\"treediv\" style=\"width:460px;height:380px;\">");
	
	sb.append("</div>");
	
	sb.append("<div style=\"\">");
	sb.append("	<table>");
	sb.append("	<tr>");
	sb.append("	<td>");
	sb.append("		<span>�����ֹ����</span><input type=\"text\" id=\"taskenddate\" readonly onclick=\"opendate(this)\" />");
	sb.append("		<span>���ܴ���</span>");
	sb.append("		<select id=\"columnListwind\" style=\"width:100px;\" disabled=\"disabled\">");
	sb.append("		<option value=''></option>");
	sb.append("		</select>");
	sb.append("		<input id=\"autoass\" type=\"checkbox\" checked=\"true\"/><span>�Զ��´�</span>");
	sb.append("	</td>");
	sb.append("</tr>");
	sb.append("<tr>");
	sb.append("	<td align=\"center\">");
	//sb.append("		<input type=\"button\" value='���������´����' style=\"height:20px;\" onclick=\"dosave()\"></input>");
	sb.append("<input type=\"button\" value='�� ��' style=\"height:20px;\" onclick=\"dosonsave()\"></input>");
	sb.append("		<input type=\"button\" value='ȡ ��' style=\"height:20px;\" onclick=\"form_content_wind.hidden();\"></input>");
	sb.append("		</td>");
	sb.append("	</tr>");
	sb.append("	</table>");
	sb.append("</div>");
	sb.append("</div>");
	sb.append("<div id=\"form_content2\" style=\"display:none;width:460px;height:30px;\" >");
	sb.append("<div style=\"\">");
	sb.append("<table>");
	sb.append("<tr>");
	sb.append("	<td align=\"center\"><span>��ֹ����</span>");
	sb.append("	<input type=\"text\" id='enddateinput'></input>");
	sb.append("<input type=\"button\" value='�� ��' style=\"height:20px;\" onclick=\"updenddate();\"></input>");
	sb.append("		<input type=\"button\" value='ȡ ��' style=\"height:20px;\" onclick=\"form_content_wind.hidden();\"></input>");
	sb.append("</td>");
	sb.append("</tr>");
	sb.append("</table>");
	sb.append("</div>");
	sb.append("</div>");
	sb.append("<div id=\"form_content3\" style=\"display:none;width:460px;height:380px;\">");
	sb.append("<div id=\"updata\"  ></div>");
	sb.append("<div style=\"margin-left:40%;\">");
	sb.append("<input type=\"button\" value=\"�� ��\" style=\"height:20px;\" onclick=\"dosave(flag)\"></input>");
	sb.append("<input type=\"button\" value=\"ȡ ��\" style=\"height:20px;\" onclick=\"form_content_wind.hidden();\"></input>");
	sb.append("</div>");
	sb.append("</div>");
	sb.append("<div id='ddl_content' style=\"width:400px;height:170px;overflow:scroll;position:absolute;background-color:#FCFCFC;border:1px solid #ccc;display:none;\">");
	sb.append("</div>");
	
	sb.append("<div id='form_content_main' style=\"display:none;\" >");
	sb.append("<div style=\"width:460px;height:300px;\">");
	sb.append("<table id=\"form_table\" class=\"tableview\">");
	sb.append("	<colgroup colName=\"name\" colType=\"str\" style=\"text-align:center;\"></colgroup>");
	sb.append("	<colgroup colName=\"value\" colType=\"str\" ></colgroup>");
	sb.append("	<tbody>");
	sb.append("	<tr>");
	sb.append("			<td>�ɼ��������</td>");
	sb.append("			<td><input id=\"ddl2\" onclick=\"drawddlwind(ddl2);\" readonly value=\"��ѡ��\" >");
	sb.append("</td>");
	sb.append("	</tr>");
	sb.append("	<tr>");
	sb.append("		<td>�ɼ���������</td>");
	sb.append("		<td><input type=\"text\" id=\"collecttaskname\" /></td>");
	sb.append("	</tr>");
	sb.append("	<tr>");
	sb.append("	<td>�ɼ�������</td>");
	sb.append("	<td><input type=\"text\" id=\"collecttaskid\" /></td>");
	sb.append("</tr>");
	sb.append("	<tr>");
	sb.append("		<td>����ɼ�����</td>");
	sb.append("	<td><input type=\"text\" id=\"collecttaskcycle\" /></td>");
	sb.append("		</tr>");
	sb.append("	<tr>");
	sb.append("		<td>���ܴ���</td>");
	sb.append("		<td>");
	sb.append("		<select id=\"columnList\" style=\"width:100px;\">");
	sb.append("		<option value=''></option>");
	sb.append("		</select></td>");
	sb.append("	</tr>");
	sb.append("	<tr>");
	sb.append("	<td>���ݿ�ʼ����</td>");
	sb.append("	<td><input type=\"text\" id=\"datastartdate\" readonly onclick=\"opendate(this)\" /></td>");
	sb.append("	</tr>	");
	sb.append("	<tr>");
	sb.append("	<td>���ݽ�������</td>");
	sb.append("	<td><input type=\"text\" id=\"dataenddate\" readonly onclick=\"opendate(this)\" /></td>");
	sb.append("	</tr>		");
	sb.append("	</tbody>");
	sb.append("</table>");
	sb.append("</div>");
	sb.append("<div id='ddl_content2' style=\"width:400px;height:170px;overflow:scroll;position:absolute;background-color:#FCFCFC;border:1px solid #ccc;display:none;\">");
	sb.append("</div>");
	
	sb.append("<div style=\"margin-left:40%;\">");
	sb.append("<input type=\"button\" value=\"�� ��\" style=\"height:20px;\" onclick=\"dosave(flag)\"></input>");
	sb.append("<input type=\"button\" value=\"ȡ ��\" style=\"height:20px;\" onclick=\"form_content_wind.hidden();\"></input>");
	sb.append("</div>");
	sb.append("</div>");
	sb.append("<div id='ddl_contentmain' style=\"width:400px;height:170px;overflow:scroll;position:absolute;background-color:#FCFCFC;border:1px solid #ccc;display:none;\">");
	sb.append("</div>");
	sb.append("<div id='ddl_contentson' style=\"width:400px;height:170px;overflow:scroll;position:absolute;background-color:#FCFCFC;border:1px solid #ccc;display:none;\">");
	sb.append("</div>");
	
	
	
	document.getElementById("template_main").innerHTML = sb.toString();

  	drawddlwind(ddl2);
  	$("#ddl_content2").hide();
  	$("input[name='job']").bind("click",function(){
        alert($(this).val()); 
        var $selectedvalue = $(this).val(); 
        if ($selectedvalue == 0) {  
        	qhflag = 0;
        	var params = {};
	    	params["taskclassid"] = taskclassid;
			params["area"] = proitemid;
			params["levelno"] = parseInt(levelno);
			params["isbenji"] = isbenji;
			params["qhflag"] = qhflag;
			Ext.lt.RCP.server("datacommon_collecttask_service", "loadData",params,function(data){
				if(data.error){
					alert(data.error);
				}
				else{
					sondata.clear();
					sondata.addData([],-1);
					maindata.clear();
					maindata.addData(data.maintaskList,-1);
				}
				closediv();
			});
        } else {
        	qhflag = 1;
			var params = {};
	    	params["taskclassid"] = taskclassid;
			params["area"] = proitemid;
			params["levelno"] = parseInt(levelno)+1;
			params["isbenji"] = isbenji;
			params["qhflag"] = qhflag;
			Ext.lt.RCP.server("datacommon_collecttask_service", "loadData",params,function(data){
				if(data.error){
					alert(data.error);
				}
				else{
					sondata.clear();
					sondata.addData([],-1);
					maindata.clear();
					maindata.addData(data.maintaskList,-1);
				}
				closediv();
			});
        }
  	});
	
}

function doadd() {
//	Ext.lt.RCP.server("datacommon_collecttask_service", "updateData",{"itemid":0},function(data){
//		if(data.error){
//			alert(data.error);
//		}
//		else{
//			var div = document.getElementById('updata');
//			div.innerHTML = data.updatewin;
//		}
//	});
	$("#ddl2").val("��ѡ��");
	$("#collecttaskname").val("");
	$("#collecttaskid").val("");
	$("#collecttaskcycle").val("");
	//$("#mainoffice").val();
	$("#datastartdate").val("");
	$("#dataenddate").val("");
	$("#form_content_main").show();
	form_content_wind = new Ext.lt.window({title:'�½�������',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:514,h:472});
	form_content_wind.draw(form_content_main);
	form_content_wind.show();
	document.getElementById("columnList").style.display = "";
	flag = 0;
}
function doenddate() {
	var datas = sondata.query({check:1});
	if(!datas ||datas.length==0){
		alert("��ѡ����Ľ�ֹ���ڵ����ݵ�����");
		return;
	}
	$("#form_content2").show();
	form_content_wind = new Ext.lt.window({title:'���½�ֹ����',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:562,h:472});
	form_content_wind.draw(form_content2);
	form_content_wind.show();
}
function updenddate() {
	var datas = sondata.query({check:1});
	var mdatas = maindata.query({check:1});
	var params = {};
	params["mainitemid"] = mdatas[0].ITEMID;
	params["sonitemid"] = datas[0].ITEMID;
	params["enddate"] = $("#enddateinput").val();
	params["sontaskstatus"] = sontaskstatus;
	
	Ext.lt.RCP.server("datacommon_collecttask_service", "updenddate",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			sondata.clear();			
			sondata.addData(data.sontaskList,-1);
			form_content_wind.close();
			closediv();
		}
		closediv();
	});
	
}
function doedit() {
	var datas = maindata.query({check:1});
	if(!datas ||datas.length==0){
		alert("��ѡ��Ҫ�޸ĵ�����");
		return;
	}
	if(qhflag == 1) {
		alert("�����������޸ģ�");
		return;
	}
	var resp = Ext.lt.RCP.asynserver("datacommon_collecttask_service", "isedit",{"itemid":datas[0].ITEMID});
	if(!resp.isedit) {
		alert("���������½��������ϸ�����񣬲����޸�");
		return;
	}
	//Ӧ���ƶ�����
	//$("#ddl2").val(datas[0].TASKTYPEID);
	qtreewind.selectedNode(datas[0].TASKTYPEID);
	$("#collecttaskcycle").val(datas[0].TASKCYCLE);
	$("#columnList").val(datas[0].MANAGEOFFICE);
	$("#datastartdate").val(datas[0].DATASTARTDATE);
	$("#dataenddate").val(datas[0].DATAENDDATE);
//	Ext.lt.RCP.server("datacommon_collecttask_service", "updateData",{"itemid":datas[0].ITEMID},function(data){
//		if(data.error){
//			alert(data.error);
//		}
//		else{
//			var div = document.getElementById('updata');
//			div.innerHTML = data.updatewin;
//		}
//	});
	$("#form_content_main").show();
	form_content_wind = new Ext.lt.window({title:'�޸�������',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:562,h:472});
	form_content_wind.draw(form_content_main);
	form_content_wind.show();
	document.getElementById("columnList").style.display = "";
	setTimeout(function(){		
		$("#columnList").val(datas[0].MANAGEOFFICE);
		$("#collecttaskname").val(datas[0].TASKNAME);
		$("#collecttaskid").val(datas[0].TASKNO);
	},0);
	flag = 1;
}
function deleteData() {
	var datas = maindata.query({check:1});
	if(!datas || datas.length==0){
		alert("��ѡ��Ҫɾ��������");
		return;
	}else {
		if(qhflag == 1) {
			alert("����������ɾ����");
			return;
		}
		var resp = Ext.lt.RCP.asynserver("datacommon_collecttask_service", "isedit",{"itemid":datas[0].ITEMID});
		if(!resp.isedit) {
			alert("���������½��������ϸ�����񣬲���ɾ��");
			return;
		}
		var params = {};
		var itemid = datas[0].ITEMID;
		params["itemid"] = itemid;
		params["area"] = proitemid;
		params["levelno"] = levelno;
		params["isbenji"] = isbenji;
		if(window.confirm("�Ƿ�ɾ��ѡ�����ݣ�")){
			showdiv();
			Ext.lt.RCP.server("datacommon_collecttask_service", "delDataForm",params,function(data){
				if(data.error){
					alert(data.error);
				}
				else{
					if(data.delmark == 1) {
						alert("ɾ���ɹ���");
						maindatatable.getRecordset().remove(datas);
					} else {
						alert("�������ѱ������û�ɾ����");
					}
					form_content_wind.close();
					closediv();
				}
				closediv();
			});
			closediv();
		}		
	}
} 
function dosave(flag) {
	var params = {};
	if (flag == 1) {
		var datas = maindata.query({check:1});
		var itemid = datas[0].ITEMID;
		params["itemid"] = itemid;
		alert(itemid);
	} else {
		params["itemid"] = 0;
	}
	//��֤
	if ($("#ddl2").val() == '��ѡ��') {
		alert("��ѡ��������࣡");
		return;
	} else if ($("#collecttaskname").val().length > 50) {
		alert("�ɼ��������Ƴ��ȹ�����");
		return;
	} else if ($("#collecttaskid").val().length > 50) {
		alert("�ɼ������ų��ȹ�����");
		return;
	} else if (isEmpty($("#collecttaskname").val())) {
		alert("�ɼ��������Ʋ���Ϊ�գ�");
		return;
	} else if (isEmpty($("#collecttaskid").val())) {
		alert("�ɼ������Ų���Ϊ�գ�");
		return;
	} else if (isEmpty($("#collecttaskcycle").val())) {
		alert("��ѡ������ɼ����ڣ�");
		return;
	} else if (isEmpty($("#columnList").val())) {
		alert("��ѡ�����ܴ��ң�");
		return;
	} 
	var node = qtreewind.getSelected();
	params["tasktypeid"] = node[0].itemid;
	params["collecttaskname"] = $("#collecttaskname").val();
	params["collecttaskid"] = $("#collecttaskid").val();
	params["collecttaskcycle"] = $("#collecttaskcycle").val();
	params["mainoffice"] = $("#columnList").val();
	params["datastartdate"] = $("#datastartdate").val();
	params["dataenddate"] = $("#dataenddate").val();
	params["area"] = area;
	params["levelno"] = levelno;
	params["proitemid"] = proitemid;
	params["isbenji"] = isbenji;
	
	var myDate = new Date();
	params["createtime"] = myDate.format("yyyyMMddhhmmss");
	var resp = Ext.lt.RCP.asynserver("datacommon_collecttask_service", "isVal" ,params);
	if(!resp.isval) {
		alert("�������ƻ�����Ѵ��ڣ�����");
		return;
	}
	
	showdiv();
	Ext.lt.RCP.server("datacommon_collecttask_service", "saveMainData",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			document.getElementById("rad2").checked = true;
			$("#ddl1").val("ȫ��");
			$("#ddlmaintask").val("ȫ������");
			$("#ddlsontask").val("ȫ������");
			alert("����ɹ�");
			form_content_wind.close();
			closediv();
			maindata.clear();			
			maindata.addData(data.maintaskList,-1);
		}
		closediv();
	});
	
	
	
//	var result = projectForm.getData();
//	if(result && result.error){
//		alert(result.error);
//		return;
//	}
//	var data = result.data;
//	params["data"] = data;
//	
//	
//	showdiv();
//	Ext.lt.RCP.server("datacommon_collecttask_service", "saveDataForm",params,function(data){
//		if(data.error){
//			alert(data.error);
//		}
//		else{
//			alert("����ɹ�");
//			form_content_wind.close();
//			closediv();
//			var rs = maindatatable.getRecordset();
//			rs.clear();			
//			rs.addData(data.maintaskList,-1);
//			maindatatable.reflash();
//		}
//		closediv();
//	});
}
function dosonsave() {
	//��Ҫѡ��λ
	var selagency = _qtree.getSelected();
	alert(Object.toJSON(selagency));
	var datas = maindata.query({check:1});
	if(selagency.length == 0) {
		alert("��ѡ��λ");
	} else {
		var params = {};
		var taskstate = 2
		var flag = document.getElementById('autoass').checked;
		params["senddate"] = "";
		if (flag == true) {
			taskstate = 3;
			var myDate = new Date();
			params["senddate"] = myDate.format("yyyyMMdd");
		}
		var taskname = datas[0].TASKNAME;
		var tasktypeid = datas[0].TASKTYPEID;
		var superitemid = datas[0].ITEMID;
		var maintaskno = datas[0].TASKNO;
		var arr = new Array();
		var arrtaskno = new Array();
		var bdgagency = new Array();
		for(i=0;i<selagency.size();i++){
			if (selagency[i].disable == undefined) {
				arr.push(selagency[i].code);
				arrtaskno.push(maintaskno + "-" + selagency[i].code);
				bdgagency.push(selagency[i].itemid);
			}
		}
		var agencystr = arr.join(",");
		var tasknostr = arrtaskno.join(",");
		var bdgagency = bdgagency.join(",");
		
		params["taskname"] = taskname;
		params["tasktypeid"] = tasktypeid;
		params["tasknostr"] = tasknostr;
		params["bdgagency"] = bdgagency;
		params["taskstate"] = taskstate;
		params["agencystr"] = agencystr;
		params["superitemid"] = superitemid;
		params["area"] = area;
		params["levelno"] = levelno;
		params["proitemid"] = proitemid;
		params["manageoffice"] = $("#columnListwind").val();
		alert($("#columnListwind").val());
		params["enddate"] = $("#taskenddate").val();
		alert($("#taskenddate").val());
		var myDate = new Date();
		params["createtime"] = myDate.format("yyyyMMddhhmmss");
		var rs = null;
		showdiv();
		Ext.lt.RCP.server("datacommon_collecttask_service", "insertSonData",params,function(data){
			if(data.error){
				alert(data.error);
			}
			else{
				datas[0].TASKSTATUS = 5;
				if(data.flag == 1) {
					alert("����ɹ�");
				}				
				form_content_wind.close();
				var rs = sondatatable.getRecordset();
				rs.clear();
				rs.addData(data.sontaskList,-1);
				sondatatable.reflash();
				$("#ddlsontask").val("ȫ������");
			}
			closediv();
		});
		
	}
}
function doaddson() {
	var datas = maindata.query({check:1});
	if(!datas || datas.length==0){
		alert("��ѡ��Ҫϸ����������");
		return;
	}else {
		if (isdoadd == 0) {
			alert("����������ϸ����");
			return
		}
		var param = {};
		param["itemid"] = datas[0].ITEMID;
		param["typeid"] = datas[0].TASKTYPEID;
		param["isbenji"] = isbenji;
		var resps = Ext.lt.RCP.asynserver("datacommon_collecttask_service", "selSonData" ,param);
		var allsondata = resps.sontaskList;
		checkedCodes = [];
		for(var i=0;i<allsondata.size();i++){
			if (allsondata.getData(i).TASKSTATUS != '8') {
				checkedCodes.push(allsondata.getData(i).TAGAREA);
			}
		}
	  	_qtree=new Ext.lt.Qtree({
	  		data:arealist,
	  		//linkchild:true,
	  		showRootNode:true,
	  		expandlevel:'2',
	  		selectmode:'n',
	  		outformart:'#code-#name',
	  		values:checkedCodes
	  		
	  	});
	  	_qtree.draw(treediv);
		for(var i = 0,j = checkedCodes.length; i < j; i++){
			_qtree.setDisabled({itemid:checkedCodes[i]},true);
		}
		if(isDetailBJ == 0){
			_qtree.setDisabled({itemid:proitemid},true);
		}
		alert(checkedCodes);
		if (qhflag == 1) {
			alert("����������ϸ��");
			return;
		}
		var params = {};
		params["taskclassid"] = datas[0].TASKTYPEID;
	  	var resp = Ext.lt.RCP.asynserver("datacommon_collecttask_service", "selOffice" ,params);
		var list = document.getElementById("columnListwind");
		var mainoffice = resp.mainoffice;
		list.length = 1;
		if(mainoffice!=null && mainoffice.length!=0){
			for(var i=0;i<mainoffice.length;i++){
				var opt = new Option(mainoffice[i].name,mainoffice[i].itemid);
				list[i+1] = opt;
			}
		}
		$("#form_content1").show();
		form_content_wind = new Ext.lt.window({title:'�½�������',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:562,h:472});
		form_content_wind.draw(form_content1);
		form_content_wind.show();
		$("#taskenddate").val("");
		document.getElementById("columnListwind").style.display = "";
		setTimeout(function(){		
			$("#columnListwind").val(datas[0].MANAGEOFFICE);
		},0);
	}
}
function doaction(action) {
	var datas = null;
	if (action == '1' || action == '2' || action == '3') {
		datas = maindata.query({check:1});
		datasck = maindata.query({check:1});
	} else {
		datasck = maindata.query({check:1});
		datas = sondata.query({check:1});
	}
	if(!datas || datas.length==0){
		alert("��ѡ������");
		return;
	}
	var itemid = datas[0].ITEMID;
	var startstate = datas[0].TASKSTATUS;
	var params = {};
	params["itemid"] = itemid;
	params["action"] = action;
	params["startstate"] = startstate;
	params["superitemid"] = datasck[0].ITEMID;
	params["area"] = proitemid;
	params["levelno"] = levelno;
	params["isbenji"] = isbenji;
	params["qhflag"] = qhflag;
	showdiv();
	Ext.lt.RCP.server("datacommon_collecttask_service", "isDo",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			if (data.message != "") {
				alert(data.message);
			}
			var rs = sondatatable.getRecordset();
			rs.clear();
			rs.addData(data.sontaskList,-1);
			sondatatable.reflash();
			$("#ddlsontask").val("ȫ������");
			alert(action);
			if(action =='1' || action =='2' || action =='3'){
				var rs1 = maindatatable.getRecordset();
				rs1.clear();
				alert(Object.toJSON(data.maintaskList));
				rs1.addData(data.maintaskList,-1);
				maindatatable.reflash();
			}
			
		}
		closediv();
	});
}
function deleteSonData() {
	var datas = sondata.query({check:1});
	if(!datas || datas.length==0){
		alert("��ѡ��Ҫɾ��������");
		return;
	}else {
		var params = {};
		var itemid = datas[0].ITEMID;
		var mdata = maindata.query({check:1});
		var resp = Ext.lt.RCP.asynserver("datacommon_collecttask_service", "isedit",{"itemid":itemid});
		if(!resp.isedit) {
			alert("���������½����񣬲���ɾ��");
			return;
		}
		params["mainitemid"] = mdata[0].ITEMID;
		params["itemid"] = itemid;
		params["area"] = proitemid;
		params["levelno"] = levelno;
		if(window.confirm("�Ƿ�ɾ��ѡ�����ݣ�")){
			showdiv();
			Ext.lt.RCP.server("datacommon_collecttask_service", "delDataForm",params,function(data){
				if(data.error){
					alert(data.error);
				}
				else{
					if(data.delmark == 1) {
						alert("ɾ���ɹ���");
					} else {
						alert("�������ѱ������û�ɾ����");
					}
					closediv();
					sondatatable.getRecordSet().remove(datas);
					if(sondata.size()==0){
						mdata[0].TASKSTATUS = 2;
					}
				}
				closediv();
			});
		}		
	}
}
function drawddl(_input){
	var $tempDiv = $("#ddl_content");
	$tempDiv.width($(_input).width()+3);
	var pos = $(_input).position();
	$tempDiv.css("top",pos.top+16+"px");
	$tempDiv.css("left",pos.left+"px");
	$("#ddl_content").show();
	qtree=new Ext.lt.Qtree({
			data:taskclasslist,
			outformart:'#name',
			expandlevel:'1',
			showRootNode:true,
			rootNode:{superitemid:'0',itemid:'0',name:'ȫ��',isleaf:'0'},
			on:{
				'nodeclick':function(){
					var params = {};
					//params["itemid"] = itemid;
					var sel = qtree.getSelected();
					var selNode = sel[0];
					if (selNode == undefined){
						_input.innerText = "ȫ��";
			    		_input.itemid = 0;
			    		params["taskclassid"] = "";
			    		taskclassid = "";
					} else {
			    		_input.innerText = selNode.name;
			    		_input.itemid = selNode.itemid;
			    		params["taskclassid"] = selNode.itemid;
			    		taskclassid = selNode.itemid;
					}
					params["area"] = proitemid;
					params["levelno"] = levelno;
					params["isbenji"] = isbenji;
					params["qhflag"] = qhflag;

					sondata.clear();
					sondata.addData([],-1);
					Ext.lt.RCP.server("datacommon_collecttask_service", "loadData",params,function(data){
						if(data.error){
							alert(data.error);
						}
						else{
							maindata.clear();
							maindata.addData(data.maintaskList,-1);
						}
						closediv();
					});
					
			    	$("#ddl_content").hide();	    		

			}
		}
	});
	qtree.draw(ddl_content);
	$('#template_main').click(function (event) {
    var el = $(event.target);
    if (el.parents("#ddl_content").length == 0 && el.attr("id") != "ddl1" && el.attr("id") != "ddl_content") {
    	$("#ddl_content").hide();
	}}); 
}
function drawmaintaskddl(_input){
	var $tempDiv = $("#ddl_contentmain");
	$tempDiv.width($(_input).width()+3);
	var pos = $(_input).position();
	$tempDiv.css("top",pos.top+16+"px");
	$tempDiv.css("left",pos.left+"px");
	$("#ddl_contentmain").show();
	var maintaskqtree=new Ext.lt.Qtree({
			data:statelist,
			outformart:'#name',
			expandlevel:'1',
			showRootNode:true,
			rootNode:{superitemid:'0',itemid:'0',name:'ȫ������',isleaf:'0'},
			on:{
				'nodeclick':function(){
					var params = {};
					//params["itemid"] = itemid;
					var sel = maintaskqtree.getSelected();
					var selNode = sel[0];
					if (selNode == undefined){
						_input.innerText = "ȫ������";
			    		_input.itemid = 0;
			    		params["maintaskstatus"] = "";
			    		maintaskstatus = "";
					} else {
			    		_input.innerText = selNode.name;
			    		_input.itemid = selNode.itemid;
			    		params["maintaskstatus"] = selNode.itemid;
			    		maintaskstatus = selNode.itemid;
					}
					params["area"] = proitemid;
					params["levelno"] = levelno;
					params["isbenji"] = isbenji;
					params["qhflag"] = qhflag;
					params["maintaskstatus"] = maintaskstatus;

					sondata.clear();
					sondata.addData([],-1);
					Ext.lt.RCP.server("datacommon_collecttask_service", "loadData",params,function(data){
						if(data.error){
							alert(data.error);
						}
						else{
							maindata.clear();
							maindata.addData(data.maintaskList,-1);
						}
						closediv();
					});
					
			    	$("#ddl_contentmain").hide();	    		

			}
		}
	});
	maintaskqtree.draw(ddl_contentmain);
	$('#template_main').click(function (event) {
    var el = $(event.target);
    if (el.parents("#ddl_contentmain").length == 0 && el.attr("id") != "ddlmaintask" && el.attr("id") != "ddl_contentmain") {
    	$("#ddl_contentmain").hide();
	}}); 
}
function drawsontaskddl(_input){
	var $tempDiv = $("#ddl_contentson");
	$tempDiv.width($(_input).width()+3);
	var pos = $(_input).position();
	$tempDiv.css("top",pos.top+16+"px");
	$tempDiv.css("left",pos.left+"px");
	$("#ddl_contentson").show();
	var sontaskqtree=new Ext.lt.Qtree({
			data:statelist,
			outformart:'#name',
			expandlevel:'1',
			showRootNode:true,
			rootNode:{superitemid:'0',itemid:'0',name:'ȫ������',isleaf:'0'},
			on:{
				'nodeclick':function(){
					var params = {};
					//params["itemid"] = itemid;
					var sel = sontaskqtree.getSelected();
					var selNode = sel[0];
					if (selNode == undefined){
						_input.innerText = "ȫ������";
			    		_input.itemid = 0;
			    		params["sontaskstatus"] = "";
			    		sontaskstatus = "";
					} else {
			    		_input.innerText = selNode.name;
			    		_input.itemid = selNode.itemid;
			    		params["sontaskstatus"] = selNode.itemid;
			    		sontaskstatus = selNode.itemid;
					}
					var datas = maindata.query({check:1});
					var itemid = "";
					if(!datas || datas.length==0){
						itemid = "-111"
					}else {
						itemid = datas[0].ITEMID;
						tasktypeid = datas[0].TASKTYPEID
					}
					sondata.clear();
					var params = {};
					params["itemid"] = itemid;
					params["typeid"] = tasktypeid;
					params["sontaskstatus"] = sontaskstatus;
					params["isbenji"] = isbenji;
					var resp = Ext.lt.RCP.asynserver("datacommon_collecttask_service", "selSonData" ,params);
//					if(!resp.detailmark) {
//						document.getElementById('createson').disabled= true;
//					} else {
//						document.getElementById('createson').disabled= false;
//					}
					alert(resp.detailmark);
					sondata.join(resp.sontaskList,0);
					sondatatable.reflash();
			    	$("#ddl_contentson").hide();	    		

			}
		}
	});
	sontaskqtree.draw(ddl_contentson);
	$('#template_main').click(function (event) {
    var el = $(event.target);
    if (el.parents("#ddl_contentson").length == 0 && el.attr("id") != "ddlsontask" && el.attr("id") != "ddl_contentson") {
    	$("#ddl_contentson").hide();
	}}); 
}
function opendate(_input){
	var dt = $(_input);   

	 var onCalSelected = function(cal,date,dateObj){  
	    cal.sel.value = date;
	    if (cal.dateClicked) {
			
	    	dt.attr("itemid",dateObj);
	    	cal.callCloseHandler();
	    } 
    };

	var onCalClosed = function(cal) {
		cal.hide();
	};

	if(!_dynarch_popupCalendar_project){
		
		dt.cal = new CalendarProject(1, null, onCalSelected, onCalClosed);
		dt.cal.setRange(1900, 2050);
		dt.cal.create();
	}
	else{
		dt.cal = _dynarch_popupCalendar_project;
	}
	dt.cal.sel = dt[0];
	

	dt.onStartEdit = function(td) {
		this.cal.showAtElement(this[0]);
		var strDate = this.val();
		if (strDate) {
			this.cal.parseDate(strDate);
		}
	};
	dt.cal.closeCallBack = function() {
		dt.val("");
		dt.attr("itemid","");
	};
	
	dt.onStartEdit();
}
function drawddlwind(_input){
	var $tempDiv = $("#ddl_content2");
	$tempDiv.width($(_input).width()+3);
	var pos = $(_input).position();
	$tempDiv.css("top",pos.top+16+"px");
	$tempDiv.css("left",pos.left+13+"px");
	$("#ddl_content2").show();
	qtreewind=new Ext.lt.Qtree({
			data:taskclasslist,
			outformart:'#name',
			expandlevel:'1',
			showRootNode:true,
			rootNode:{superitemid:'0',itemid:'0',name:'��ѡ��',isleaf:'0'},
			on:{
				'nodeclick':function(){
					var params = {};
					//params["itemid"] = itemid;
					var sel = qtreewind.getSelected();
					var selNode = sel[0];
					if (selNode == undefined){
						_input.innerText = "��ѡ��";
			    		_input.itemid = 0;
			    		params["taskclassid"] = "";
					} else {
			    		_input.innerText = selNode.name;
			    		_input.itemid = selNode.itemid;
			    		params["taskclassid"] = selNode.itemid;
					}
					params["area"] = area;
					Ext.lt.RCP.server("datacommon_collecttask_service", "selName",params,function(data){
						if(data.error){
							alert(data.error);
						}
						else{
							$("#collecttaskname").val(data.taskname);
							$("#collecttaskid").val(data.tasknum);
							var list = document.getElementById("columnList");
							var mainoffice = data.mainoffice;
							list.length = 1;
							if(mainoffice!=null && mainoffice.length!=0){
								for(var i=0;i<mainoffice.length;i++){
									var opt = new Option(mainoffice[i].name,mainoffice[i].itemid);
									list[i+1] = opt;
								}
							}
						}
					});
			    	$("#ddl_content2").hide();	    		

			}
		}
	});
	qtreewind.draw(ddl_content2);
	$('#form_content_main').click(function (event) {
    var el = $(event.target);
    if (el.parents("#ddl_content2").length == 0 && el.attr("id") != "ddl2" && el.attr("id") != "ddl_content2") {
    	$("#ddl_content2").hide();
	}}); 
}
Date.prototype.format = function(format){ 
	var o = { 
			"M+" : this.getMonth()+1, //month 
			"d+" : this.getDate(), //day 
			"h+" : this.getHours(), //hour 
			"m+" : this.getMinutes(), //minute 
			"s+" : this.getSeconds(), //second 
			"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
			"S" : this.getMilliseconds() //millisecond 
	}
	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 
	for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
	} 
	return format; 
} 
