<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<jsp:directive.page import="java.util.List" />
<jsp:directive.page import="java.util.Map" />	
<%@taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
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
		<title>收支情况查询</title>
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
		
		window.focus();
		for(var col in window.opener.ColumnConfig){
			if(typeof window.opener.ColumnConfig[col].id!="undefined"&&(
				window.opener.ColumnConfig[col].id!="checkbox"&&
				window.opener.ColumnConfig[col].id!="radio"))
				ColumnConfig[col]=window.opener.ColumnConfig[col];
		}
		</script>
	</head>

	<body class="pop_body">
		<div id ="status" style="display:none;">
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div id="vchtypeidname" >
						收支情况查询
					</div>
				</li>
			</ul>
		</div>	
		</div>
		<div id="showdata">
			<div id="shenhe_title">
				<div id="shenhe_title_middle">
					收支情况查询
				</div>
			</div>
			<div id="form_table_title">
				<ul>
					<li class="top">
						<div>
							原始单据信息
						</div>
					</li>
				</ul>
			</div>
			<div id="containerline3">
				<div id='edit_table' style='display:none;padding:0;margin:0;' ></div>
				<div id='tmain_div' style='position:relative;behavior:url(#default#userData);height:expression(this.offsetParent.offsetHeight-22);width:100%;'  > </div>
			</div>
			<div id="form_table_title">
				<ul>
					<li class="top">
						<div>
							收支情况
						</div>
					</li>
				</ul>
			</div>
			<div id="containerline3">
				<div id='edit_table' style='display:none;padding:0;margin:0;' ></div>
				<div id='tdetail_div' style='position:relative;behavior:url(#default#userData);height:expression(this.offsetParent.offsetHeight-22);width:100%;'  > </div>
			</div>
			<br />
			<center>
				<button onclick="exportexcel3(tmain,tdetail)" class="button_style"
					onmouseover="this.className='OverBtn'"
					onmouseout="this.className='button_style'"
					onmousedown="this.className='down'">
					导出EXCEL
				</button>
				
				<button onclick="window.close()" class="button_style"
					onmouseover="this.className='OverBtn'"
					onmouseout="this.className='button_style'"
					onmousedown="this.className='down'">
					关闭窗口
				</button>
			</center>

		</div>
		<script>
		var oridatatable = window.opener.<%=request.getParameter("content0")%>;
		/**/
		var tmain =new dataTable();
		tmain.id ='tmain';
		tmain.isShowRadio = oridatatable.isShowRadio ;
		tmain.isShowCheckBox = oridatatable.isShowCheckBox ;
		tmain.isShowSerial = oridatatable.isShowSerial ;
		tmain.isCreateAmtColumn= oridatatable.isCreateAmtColumn;
		tmain.columnList = [];
		tmain.tabletype = 'MainList';
		tmain.parent = document.getElementById('tmain_div');
		var heads = oridatatable.getTableHead;
		var newheads = new Array();
		for(var i=0;i<heads.length;i++){
			var head = heads[i];
			if(head=="checkbox"||head=="radio"||head =="indiexec"||head =="incomeinfo")
				continue;
			newheads[newheads.length] = head;
		}
		tmain.setTableHead(newheads);
		tmain.data = [<%=request.getParameter("content1")%>];
		tmain.display = 'block';
		tmain.mainmenu = <%=request.getParameter("mainmenu")%>;
		tmain.submenu = <%=request.getParameter("submenu")%>;
		tmain.vchtypecode = oridatatable.vchtypecode;
		tmain.showstatus = false;
		tmain.amtflag = oridatatable.amtflag;
		tmain.show();
		tmain.allflag = false ;
		
		var tdetail =new dataTable();
		tdetail.id ='tdetail';
		tdetail.isShowRadio = false ;
		tdetail.isShowCheckBox = false ;
		tdetail.isShowSerial = true ;
		tdetail.isCreateAmtColumn= false;
		tdetail.columnList = [];
		tdetail.tabletype = 'DetailList';
		tdetail.parent = document.getElementById('tdetail_div');
		tdetail.setTableHead(["incomeamt","payamt","curbalamt","controltype","inaccttypecode"]);
		tdetail.data = <%=request.getAttribute("incomedata")%>;
		tdetail.display = 'block';
		tdetail.mainmenu = <%=request.getParameter("mainmenu")%>;
		tdetail.submenu = <%=request.getParameter("submenu")%>;
		tdetail.vchtypecode = oridatatable.vchtypecode;
		tdetail.showstatus = false;
		tdetail.amtflag = oridatatable.amtflag;
		tdetail.show();
		</script>
	</body>
</html>
