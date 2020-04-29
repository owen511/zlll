<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
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
	</script>
	<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
	<head>
		<title>请选择文件</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">

		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
		<link rel="stylesheet" type="text/css"
			href="<%=rootPath%>/style/calendar.css" />
		<script type="text/javascript" src="<%=rootPath%>/js/choose.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/js/changescroll.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/js/calendar.js"></script>
		<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
		<script src="<%=request.getContextPath()%>/js/formatNumber.js"></script>

		<script>
		    window.status="Copyright (C) 2008 Longtu Software Co.,Ltd.All rights reserved.";
		    function loadError(){
				var error = '<c:out value="${error}"/>';
				if("" != error ){
					error = error.replace(/#/g,"\n");
					alert(error);
				}
				var success = '<c:out value="${success}"/>';
				if("" != success ){
					alert("导入成功！");
					window.close();
				}
			}
			
			window.onload = function(){
				loadError();
				self.moveTo(50,150);	
				self.resizeTo(450, 150);
			}
			
			function openFile(){
				var formObject = $("form1");
				if(formObject.uploadfile.value == ""){
					alert("请选择要导入的文件！");
       				return false;
				}
				formObject.submit();
				document.getElementById("update").disabled = "disabled";
			}
			
			function cancle(){
				window.close();
			}
		</script>
	</head>

	<body>
	<br/>
		<form id="form1" name="form1" method="post"
			action="<%=request.getContextPath()%>/indi/common/openFile1.do?mainmenu=<c:out value='${param.mainmenu}'/>&submenu=<c:out value='${param.submenu}'/>&vchtypeid=<c:out value='${param.vchtypeid}'/>"
			ENCTYPE="multipart/form-data">
			<center>
			请选择导入的文件：
			<INPUT TYPE="FILE" ID="uploadfile" NAME="uploadfile" SIZE="25" />
			<input id=vchtypeid name=vchtypeid type=hidden value="<c:out value='${vchtypeid}'/>">
			</center>
			<br />
			<center>
				<button id="update" name="update" onclick="openFile()" class="button_style"
					onmouseover="this.className='OverBtn'"
					onmouseout="this.className='button_style'"
					onmousedown="this.className='down'">
					确定
				</button>
				&nbsp;&nbsp;&nbsp;
				<button onclick="cancle()" class="button_style"
					onmouseover="this.className='OverBtn'"
					onmouseout="this.className='button_style'"
					onmousedown="this.className='down'">
					取消
				</button>
			</center>
		</form>
	</body>
</html>
