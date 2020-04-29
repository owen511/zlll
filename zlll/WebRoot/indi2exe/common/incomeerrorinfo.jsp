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
		<title>收支情况检查结果</title>
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
		col.title = "总收入数";
		col.style = 'text-align:center';
		col.show = showInputMoneyFormat ;
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "payamt";
		col.name = "payamt";
		col.type = "M";
		col.title = "总支出数";
		col.style = 'text-align:center';
		col.show = showInputMoneyFormat ;
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "curbalamt";
		col.name = "curbalamt";
		col.type = "M";
		col.title = "收入余额";
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
		col.title = "以收定支控制级次";
		col.style = 'text-align:center';
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value!=null&&value=="0"){
			    row.controltype_code = "0";
			    row.controltype_name = "严格控制";
				tdobj.innerHTML="0-严格控制";
			} else if(value!=null&&value=="1"){
				row.controltype_code = "1";
			    row.controltype_name = "提醒";
				tdobj.innerHTML="1-提醒";
			} else if(value!=null&&value=="2"){
				row.controltype_code = "2";
			    row.controltype_name = "不控制";
				tdobj.innerHTML="2-不控制";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "inaccttypecode";
		col.name = "inaccttypecode";
		col.type = "S";
		col.title = "以收定支类型";
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
		col.title = "检查结果";
		col.style = 'text-align:center';
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row.checkinfo=="pass"){
				tdobj.innerHTML="通过";
			} else if(row.checkinfo=="warn"){
				tdobj.innerHTML="<div>警告</div>";
			} else if(row.checkinfo=="error"){
				tdobj.innerHTML="<div>错误</div>";
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
						收支情况检查结果
					</div>
				</li>
			</ul>
		</div>	
		</div>
		<div id="showdata">
			<div id="shenhe_title">
				<div id="shenhe_title_middle">
					收支情况检查结果
				</div>
			</div>
			<div id="form_table_title">
				<ul>
					<li class="top">
						<div>
							验证信息
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
					关闭窗口
				</button>
			</center>

		</div>
		<script>
		function checkWin(){
			if(window.dialogArguments.errorList!=null&&window.dialogArguments.errorList.length>0){
				alert("存在收入数不足数据，单据无法继续提交，窗体关闭后请修改");
				return false;
			}
			if(window.dialogArguments.warningList!=null&&window.dialogArguments.warningList.length>0){
				if(confirm("存在收入数不足数据，您确定继续提交单据")){
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
					alert("以收定支检查通过，但无回调［contisubmit］方法，请联系系统管理员");
					window.close();
				}
			} else {
				if(window.dialogArguments.errorcheck){
					window.dialogArguments.errorcheck();
					window.close();
				} else {
					alert("以收定支存在错误，但无回调［errorcheck］方法，请联系系统管理员");
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
