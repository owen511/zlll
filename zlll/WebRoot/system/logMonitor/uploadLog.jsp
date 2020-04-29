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
		<title>请选择文件</title>
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
var mainmenu = '<c:out value="${mainmenu}"/>';
var submenu = '<c:out value="${submenu}"/>';
var currentDate = '<c:out value="${currentDate}"/>';
function loadInfo() {
    var info = '<c:out value="${info}"/>';
    if ("" != info) {
        alert(info);
    }
}
loadInfo();

function loadSuccess() {
    var info = '<c:out value="${success}"/>';
    if ("" != info) {
        alert(info);
        var fo = window.opener.document;
        fo.getElementById("filepath").value = '<c:out value="${filepath}"/>';
        fo.getElementById("queryform").action = "<%=request.getContextPath()%>/system/logMonitor/index.do?mainmenu=" + mainmenu + "&submenu=" + submenu + "&date=" + currentDate;
        fo.getElementById("queryform").submit();
        cancle();
    }
}
loadSuccess();

function openFile() {
    var formObject = $("form1");
    if (formObject.uploadfile.value == "") {
        alert("请选择要导入的文件！");
        return false;
    }
    if(!checktype()){
    	alert("不是有效的日志文件！");
    	return false;
    }
    formObject.action = "<%=request.getContextPath()%>/system/logMonitor/openFile.do?mainmenu=" + mainmenu + "&submenu=" + submenu;
    formObject.submit();
    document.getElementById("update").disabled = "disabled";
}

function cancle() {
    window.close();
}
function checktype() {
    var file = document.getElementById("file").value;
    if (file.indexOf("monitolog.log")==-1) {
        return false;
    }
    return true;
}
</script>
	</head>

	<body>
	<br/>
		<form id="form1" name="form1" method="post"
			action="<%=request.getContextPath()%>/system/logMonitor/openFile.do"
			ENCTYPE="multipart/form-data">
			<center>
			请选择导入的日志文件：
			<INPUT TYPE="FILE" id="file" NAME="uploadfile" SIZE="25" />
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
