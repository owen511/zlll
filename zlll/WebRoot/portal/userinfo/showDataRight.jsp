<%@page language="java" contentType="text/html; charset=GBK"%>
<jsp:directive.page import="java.util.List" />
<jsp:directive.page
	import="gov.mof.fasp.ifmis.portal.dataright.dto.TableColumnDTO" />
<jsp:directive.page import="java.util.Iterator" />
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);

	String rootPath = request.getContextPath();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 6.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
	<script type="text/javascript"
		src="<%=request.getContextPath()%>/js/prototype.js"></script>
	<script type="text/javascript">
	var ROOT_PATH = '<%=request.getContextPath()%>';
	String.prototype.trim = function(){
		return this.replace(/(^\s*)|(\s*$)/g,"");
	}
	function nd(){
		return false;
	}
	</script>
	<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
	<head>
		<title>数据权限</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">

		<link href="<%=rootPath%>/style/style.css" rel="stylesheet"
			type="text/css" />
		<link rel="stylesheet" type="text/css"
			href="<%=rootPath%>/style/calendar.css" />
		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
		<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=rootPath%>/style/stylefontS.css" />
		<script type="text/javascript" src="<%=rootPath%>/js/choose.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/js/changescroll.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/js/calendar.js"></script>
		<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
		<script src="<%=request.getContextPath()%>/js/formatNumber.js"></script>

	 
	</head>
	<body class="pop_body">
		<div id="popPage">
			<div id="shenhe_title">
				<div id="shenhe_title_middle">
					数据权限
				</div>
			</div>
			<div id="form_table_title">
				<ul>
					<li class="top">
						<div>
							数据权限
						</div>
					</li>
				</ul>
			</div>
			<div id="containerline15">
				<div id='tmain_div'
					style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
			</div>
			<center>
				<button onclick="window.close()" class="button_style"
					onmouseover="this.className='OverBtn'"
					onmouseout="this.className='button_style'"
					onmousedown="this.className='down'">
					关闭窗口
				</button>
			</center>
			<script type="text/javascript">
			
			col = createColumnConfig();
			col.id = "role";
			col.name = "role";
			col.type = "S";
			col.title = "角色";
			col.show = function(rownum,value,row,tdobj,datatable){
				if(row.name != null){
				  tdobj.innerHTML = row.name;
				} else {
				  tdobj.innerHTML = "";
				}
			}
			ColumnConfig[col.id.toLowerCase()]=col;
			
			col = createColumnConfig();
			col.id = "functionright";
			col.name = "functionright";
			col.type = "S";
			col.title = "功能权限";
			col.show = function(rownum,value,row,tdobj,datatable){
				if(row.funcname != null){
				  tdobj.innerHTML = row.funcname;
				} else {
				  tdobj.innerHTML = "";
				}
			}
			ColumnConfig[col.id.toLowerCase()]=col;
			
			<%	
			List tableColumn = (List)request.getAttribute("tableColumn");
			StringBuffer tableHead = new StringBuffer("\"serial\",\"role\",\"functionright\",");
			for(Iterator it = tableColumn.iterator();it.hasNext();){
				TableColumnDTO tableColumnDTO = (TableColumnDTO)it.next();
				String code = tableColumnDTO.getTableHead();
				String name = tableColumnDTO.getTableColumn();
				int position = tableColumnDTO.getPosition();
				tableHead.append("\""+code+"\",");
				out.println("col = createColumnConfig();");
				out.println("col.id = \""+code+"\";");
				out.println("col.name = \""+code+"\";");
				out.println("col.type = \"S\";");
				out.println("col.title = \""+ code +"-"+ name +"\";");
				out.println("col.show = function(rownum,value,row,tdobj,datatable){");
				out.println("if(row.list != null){");
				out.println("tdobj.innerHTML = row.list["+position+"];");
				out.println("} else {");
				out.println("tdobj.innerHTML = \"\";");
				out.println("}");
				out.println("}");
				out.println("ColumnConfig[col.id.toLowerCase()]=col;");
			}
			tableHead.deleteCharAt(tableHead.lastIndexOf(","));
			out.println("var tmain =new dataTable();");
			out.println("tmain.parent = document.getElementById('tmain_div');");
			out.println("tmain.setTableHead(["+tableHead.toString()+"]);");
			String json = (String)request.getAttribute("json");
			if(null == json || "".equals(json)){
				out.println("tmain.data = new Array();\n");
			}else{
				out.println("tmain.data = "+ json);
			}
			out.println("tmain.show();");
			%>
		</script>
		</div>
	</body>
</html>
