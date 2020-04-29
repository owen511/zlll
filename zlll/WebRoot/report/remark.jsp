<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<%
	String styleName = "stylefontS.css";
	if (session.getAttribute("StyleName") != null) {
		styleName = (String) session.getAttribute("StyleName");
	}
	//String remark = request.getParameter("value");
	 %>
		<link rel="stylesheet" type="text/css"
			href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
		<link rel="stylesheet" id="ifmisfontstyle" type="text/css"
			href="<%=request.getContextPath()%>/style/<%=styleName%>" />
		<link rel="stylesheet" type="text/css"
			href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css" />
		<link href="<%=request.getContextPath()%>/style/default.css"
			rel="stylesheet" type="text/css" />
  </head>
  
  <body>
    <textarea id='remark' style="width: 385px;height: 230px" ></textarea><br><br>
    <table id="oktable" border=0 width=120 align="center" >
		<tr>
			<td width=40>
				<INPUT id="btn_enter" type="button" align="center"
					onclick="javascript:closeWindow(true)" value="确定"
					class="button_style" onmouseover="this.className='OverBtn'"
					onmouseout="this.className='button_style'"
					onmousedown="this.className='down'" />
			</td>
			<td width=40>
				<INPUT id="btn_enter" type="button" align="center"
					onclick="clearcont()" value="清除"
					class="button_style" onmouseover="this.className='OverBtn'"
					onmouseout="this.className='button_style'"
					onmousedown="this.className='down'" />
			</td>
		    <td width=40>
				<INPUT id="btn_cancel" type="button" align="center"
					onclick="javascript:closeWindow(false)" value="取消"
					class="button_style" onmouseover="this.className='OverBtn'"
					onmouseout="this.className='button_style'"
					onmousedown="this.className='down'" />
			</td>
		</tr>
	</table>
  </body>
 <script type="text/javascript">
 function clearcont(){
  document.getElementById('remark').value="";
 }
 function closeWindow(isReturn){
 	if(isReturn){
 		reValue = document.getElementById('remark').value;
 		if(reValue==undefined){
 			reValue="";
 		}
 		window.returnValue = reValue;
 	}else{
 		window.returnValue = undefined;
 	}
 	window.close();
 }
 document.getElementById('remark').value=window.dialogArguments;
 </script>
</html>
