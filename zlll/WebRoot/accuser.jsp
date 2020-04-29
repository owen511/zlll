<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar" 
    CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB" codebase="common/flyie.cab#version=1,0,0,0" VIEWASTEXT>
	 <PARAM NAME="ToolBar" VALUE="1">
	 <PARAM NAME="StatusBar" VALUE="1">
	 <PARAM NAME="MenuBar" VALUE="1">     
</OBJECT>
<title>授权用户</title>
<link href="<%=request.getContextPath()%>/style/style.css" rel="stylesheet" type="text/css" />

</head>
<body style="background-color:#FFFFFF;">
<div style="margin-top:12%; background-image:url(<%=request.getContextPath()%>/images/bg/font.gif); background-repeat:no-repeat; background-position:left; height:50px; "></div>
<div id="login1" style="display:block; background-image:url(<%=request.getContextPath()%>/images/bg/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_ADMDIV%>_login_bg.gif); background-repeat:no-repeat;height:221px; width:100%; margin-top:2%; background-position:left; font-size:14px;">
  <form id="form1" name="form1" method="post" action="<%=request.getContextPath()%>/loginByAcc.do">
    <table width="93%" border="0" cellspacing="0" cellpadding="0" style ="width:60%; display:block; margin-top:140px; margin-left:23%;">
      
      <tr>  
            
      <tr>  
        <td width="9%" align="left" nowrap="nowrap" style="top_color"><font color="#ffffff">选择登录身份：</font>     
        <select name="accuser">
		<c:forEach var="accuser"  items="${accusers}" >
        	<option value="<c:out value="${accuser.userid}"/>"><c:out value="${accuser.name}"/></option>
		</c:forEach>
        </select>
        </td>        
        <td colspan="2" nowrap="nowrap" ><input type="submit" value="确定" id="login_button" /></td>
      </tr>
    </table>
  </form>
</div>
</body>

</html>
