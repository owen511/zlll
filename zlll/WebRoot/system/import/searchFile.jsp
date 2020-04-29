<%@page language="java" contentType="text/html; charset=GBK"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);

	String rootPath = request.getContextPath();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 6.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
	<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
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
		<title>��ѡ���ļ�</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<link rel="stylesheet" type="text/css"
			href="<%=rootPath%>/style/calendar.css" />
		<script type="text/javascript" src="<%=rootPath%>/js/choose.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/js/changescroll.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/js/calendar.js"></script>
		<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
		<script src="<%=request.getContextPath()%>/js/formatNumber.js"></script>

		<script>

		    function loadError(){
				var error = '<c:out value="${error}"/>';
				if("" != error ){
					alert(error);
				}
			}
			loadError();
			
			function openFile(){
				var formObject = $("form1");
				if(formObject.uploadfile.value == ""){
					alert("��ѡ��Ҫ������ļ���");
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
			action="<%=request.getContextPath()%>/system/import/openFile.do"
			ENCTYPE="multipart/form-data">
			<center>
			��ѡ������ļ���
			<INPUT TYPE="FILE" NAME="uploadfile" SIZE="25" />
			<input id=vchtypeid name=vchtypeid type=hidden value="<c:out value='${vchtypeid}'/>">
			</center>
			<br />
			<center>
				<button id="update" name="update" onclick="openFile()" class="button_style"
					onmouseover="this.className='OverBtn'"
					onmouseout="this.className='button_style'"
					onmousedown="this.className='down'">
					ȷ��
				</button>
				&nbsp;&nbsp;&nbsp;
				<button onclick="cancle()" class="button_style"
					onmouseover="this.className='OverBtn'"
					onmouseout="this.className='button_style'"
					onmousedown="this.className='down'">
					ȡ��
				</button>
			</center>
			
		</form>
	</body>
</html>
