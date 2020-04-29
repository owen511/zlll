<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://struts.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>

<%
    	
       response.setHeader("Cache-Control","no-cache"); 
       response.setHeader("Pragma","no-cache"); 
       response.setDateHeader("Expires",0); 
  
    	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
		String styleName ="stylefontS.css";	
		if(session.getAttribute("StyleName")!=null){
		    styleName = (String)session.getAttribute("StyleName");
		}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 6.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>��֧��������</title>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
		<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName %>" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/calendar.css"/>
		<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws.js" type=text/javascript></SCRIPT>
		<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_filter.js" type=text/javascript></SCRIPT>
		<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_shadow.js" type=text/javascript></SCRIPT>
		<script type="text/javascript" src="<%=basePath%>/js/prototype.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/calendar.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/formatNumber.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/datatable.js"></script>
		<script type='text/javascript' src='<%=basePath%>/indi2exe/js/changedata.js'></script>
		<script type="text/javascript">
		var ROOT_PATH = '<%=basePath%>';
		window.focus();
		for(var col in window.dialogArguments.ColumnConfig){
			if(typeof window.dialogArguments.ColumnConfig[col].id!="undefined"&&(
				window.dialogArguments.ColumnConfig[col].id!="checkbox"&&
				window.dialogArguments.ColumnConfig[col].id!="radio"))
				ColumnConfig[col]=window.dialogArguments.ColumnConfig[col];
		}
		col = createColumnConfig();
		col.id = "incomeamt";
		col.name = "incomeamt";
		col.type = "M";
		col.title = "��������";
		col.style = 'text-align:center';
		col.show = showInputMoneyFormat ;
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "payamt";
		col.name = "payamt";
		col.type = "M";
		col.title = "��֧����";
		col.style = 'text-align:center';
		col.show = showInputMoneyFormat ;
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "curbalamt";
		col.name = "curbalamt";
		col.type = "M";
		col.title = "�������";
		col.style = 'text-align:center';
		col.show = function(rownum,value,row,tdobj,datatable){
			var unit=this.amtflag;
			if(null==unit||""==unit||"null"==unit){
				unit=1;
			}
			value =Math.round((value/unit)*100)/100+""; 
			tdobj.innerHTML = value.toMoneyFormat();
		} ;
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "controltype";
		col.name = "controltype";
		col.type = "S";
		col.title = "���ն�֧���Ƽ���";
		col.style = 'text-align:center';
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value!=null&&value=="0"){
			    row.controltype_code = "0";
			    row.controltype_name = "�ϸ����";
				tdobj.innerHTML="0-�ϸ����";
			} else if(value!=null&&value=="1"){
				row.controltype_code = "1";
			    row.controltype_name = "����";
				tdobj.innerHTML="1-����";
			} else if(value!=null&&value=="2"){
				row.controltype_code = "2";
			    row.controltype_name = "������";
				tdobj.innerHTML="2-������";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "inaccttypecode";
		col.name = "inaccttypecode";
		col.type = "S";
		col.title = "���ն�֧����";
		col.style = 'text-align:center';
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value!=null&&row.inaccttypename!=null){
				row.inaccttypecode_code = value;
			    row.inaccttypecode_name = row.inaccttypename;
				tdobj.innerHTML= value +"-"+row.inaccttypename
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "checkresult";
		col.name = "checkresult";
		col.type = "S";
		col.title = "�����";
		col.style = 'text-align:center';
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row.checkinfo=="pass"){
				tdobj.innerHTML="ͨ��";
			} else if(row.checkinfo=="warn"){
				tdobj.innerHTML="<div>����</div>";
			} else if(row.checkinfo=="error"){
				tdobj.innerHTML="<div>����</div>";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		</script>
	</head>

	<body class="pop_body">
		<div id ="status" style="display:none;">
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div id="vchtypeidname" >
						��֧��������
					</div>
				</li>
			</ul>
		</div>	
		</div>
		<div id="showdata">
			<div id="shenhe_title">
				<div id="shenhe_title_middle">
					��֧��������
				</div>
			</div>
			<div id="form_table_title">
				<ul>
					<li class="top">
						<div>
							��֤��Ϣ
						</div>
					</li>
				</ul>
			</div>
			<div id="containerline10">
				<div id='tdetail_div' style='position:relative;behavior:url(#default#userData);height:expression(this.offsetParent.offsetHeight-22);width:100%;'  > </div>
			</div>
			<center>
				<button onclick="closeWin()" class="button_style"
					onmouseover="this.className='OverBtn'"
					onmouseout="this.className='button_style'"
					onmousedown="this.className='down'">
					�رմ���
				</button>
			</center>

		</div>
		<script>
		function checkWin(){
			if(window.dialogArguments.errorList!=null&&window.dialogArguments.errorList.length>0){
				alert("�����������������ݣ������޷������ύ������رպ����޸�");
				return false;
			}
			if(window.dialogArguments.warningList!=null&&window.dialogArguments.warningList.length>0){
				if(confirm("�����������������ݣ���ȷ�������ύ����")){
					return true;
				}else {
					return false;
				}
			}
			return true;
		}
		function closeWin(){
			if(checkWin()){
				if(window.dialogArguments.contisubmit){
					window.dialogArguments.contisubmit();
					window.close();
				} else {
					alert("���ն�֧���ͨ�������޻ص���contisubmit�ݷ���������ϵϵͳ����Ա");
					window.close();
				}
			} else {
				if(window.dialogArguments.errorcheck){
					window.dialogArguments.errorcheck();
					window.close();
				} else {
					alert("���ն�֧���ڴ��󣬵��޻ص���errorcheck�ݷ���������ϵϵͳ����Ա");
					window.close();
				}
			}
		}
		var oridatatable = window.dialogArguments.<%=request.getParameter("content0")%>;
		/**/
		var tdetail =new dataTable();
		tdetail.id ='tdetail';
		tdetail.isShowRadio = oridatatable.isShowRadio ;
		tdetail.isShowCheckBox = oridatatable.isShowCheckBox ;
		tdetail.isShowSerial = oridatatable.isShowSerial ;
		tdetail.isCreateAmtColumn= oridatatable.isCreateAmtColumn;
		tdetail.columnList = [];
		tdetail.tabletype = 'DetailList';
		tdetail.parent = document.getElementById('tdetail_div');
		var heads = oridatatable.getTableHead;
		var newheads = new Array();
		newheads[newheads.length] = "serial";
		newheads[newheads.length] = "checkresult";
		newheads[newheads.length] = "incomeamt";
		newheads[newheads.length] = "payamt";
		newheads[newheads.length] = "curbalamt";
		newheads[newheads.length] = "controltype";
		newheads[newheads.length] = "inaccttypecode";
		for(var i=0;i<heads.length;i++){
			var head = heads[i];
			if(head=="serial"||head=="checkbox"||head=="radio"||head =="indiexec"||head =="incomeinfo")
				continue;
			newheads[newheads.length] = head;
		}
		tdetail.setTableHead(newheads);
		var dataList  = new Array();
		if(window.dialogArguments.errorList!=null&&window.dialogArguments.errorList.length>0){
			for(var a=0;a<window.dialogArguments.errorList.length;a++){
			    var rowobj = window.dialogArguments.errorList[a];
			    rowobj.checked=true;
			    rowobj.showinfo=true;
				dataList[dataList.length] = rowobj;
			}
		}
		if(window.dialogArguments.warningList!=null&&window.dialogArguments.warningList.length>0){
			for(var a=0;a<window.dialogArguments.warningList.length;a++){
				dataList[dataList.length] = window.dialogArguments.warningList[a];
			}
		}
		if(window.dialogArguments.passList!=null&&window.dialogArguments.passList.length>0){
			for(var a=0;a<window.dialogArguments.passList.length;a++){
				dataList[dataList.length] = window.dialogArguments.passList[a];
			}
		}
		tdetail.data = dataList;
		tdetail.display = 'block';
		tdetail.mainmenu = oridatatable.mainmenu;
		tdetail.submenu = oridatatable.submenu;
		tdetail.vchtypecode = oridatatable.vchtypecode;
		tdetail.showstatus = false;
		tdetail.amtflag = oridatatable.amtflag;
		tdetail.show();
		tdetail.allflag = false ;	
		if(tdetail.data!=null&&tdetail.data.length>10&&tdetail.data.length<500){
			window.setTimeout(reRush,300);
		}
		function reRush(){
			tdetail.show();
		}
		</script>
	</body>
</html>
