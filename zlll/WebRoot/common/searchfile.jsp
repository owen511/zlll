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
		<title>��ѡ���ļ�</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">

		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/style/calendar.css" />
		<script type="text/javascript" src="<%=rootPath%>/js/jquery-1[1].3.1.js"></script>
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
					alert("����ɹ���");
					window.close();
				}
			}
			window.onload = function(){
				loadError();
				self.moveTo(50,150);	
				self.resizeTo(450, 200);
			}
			
			function openFile() {
				var formObject = $("form1");
				if (formObject.uploadfile.value == "") {
					alert("��ѡ��Ҫ������ļ���");
					return false;
				}
				// ���ļ�֮ǰ����֤���û��Ƿ��Ѿ���������ļ�
				var filename = formObject.uploadfile.value;
				if (filename.indexOf("\\") > -1) {
					filename = filename.substring(filename.lastIndexOf("\\") + 1, filename.length);
				}
				var d = {
					filename: filename
				};
				JQ.ajax({
					type: "post",
					contentType:"application/x-www-form-urlencoded; charset=UTF-8",
					url: "/common/checkfile.do",
					dataType: 'json',
					data: d,
					success: function(resp) {
						if (resp && typeof resp != "undefined") {
							var flag = confirm("���Ѿ���" + resp[0].itime + "��������ļ����Ƿ�������룿");
							if (flag) {
								formObject.submit();
							} else {
								window.close();
							}
						} else {
							formObject.submit();
						}
					}
				});
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
			action="<%=request.getContextPath()%>/common/openFile.do?mainmenu=<c:out value='${param.mainmenu}'/>&submenu=<c:out value='${param.submenu}'/>&vchtypeid=<c:out value='${param.vchtypeid}'/>&vchflagStr=<c:out value='${param.vchflagStr}'/>"
			enctype="multipart/form-data">
			<center>
			��ѡ������ļ���
			<INPUT TYPE="FILE" NAME="uploadfile" SIZE="25" />
			<input id=vchtypeid name=vchtypeid type=hidden value="<c:out value='${vchtypeid}'/>">
			</center>
			<br />
			<center>
				<button id="update" name="update" onclick="openFile()" type="button" class="button_style"
					onmouseover="this.className='OverBtn'"
					onmouseout="this.className='button_style'"
					onmousedown="this.className='down'">
					ȷ��
				</button>	
				&nbsp;&nbsp;&nbsp;
				<button onclick="cancle()" type="button" class="button_style"
					onmouseover="this.className='OverBtn'"
					onmouseout="this.className='button_style'"
					onmousedown="this.className='down'">
					ȡ��
				</button>
			</center>
		</form>
	</body>
</html>
