<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
  String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<meta http-equiv="X-UA-Compatible" content="IE=7" />
<title>��ѡ���¼��ʽ&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</title>
<script type="text/javascript">
	var _ROOT_PATH_='<%=basePath%>';
</script>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/ifmis_style.css"/>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/stylefontL.css"/>
</head>
 <body class="" >
   <div id="pop_inner2">
    <br/>
   <div id="table_list_title"><ul><li class="top"><div>��¼��ʽ����</div></li></ul></div>
   <div id="edit_table" style="padding-left:0;">
 <form name="form1" id="form1" action="" method="post">
	<table width="100%" border="0" cellpadding="0" cellspacing="0">
	  <tr>
	    <th>��¼��ʽ</th>
	    <td><select id="logintype" name="logintype" style="width:172px"><option value="1">CA��¼</option><option value="2">�����¼</option></select></td>
	  </tr>
	</table>
	

</form>
  </div>
  <center>
		<input type="button" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" value="ȷ��" onclick="closeMWindow();"/>
		<input type="button" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" onclick="javascript:window.close()" value="ȡ��" />
</center>
  </div>
 </body>
</html>
<script type="text/javascript">
function closeMWindow(){
		window.returnValue = document.getElementById("logintype").value;
		window.close();
}
</script>