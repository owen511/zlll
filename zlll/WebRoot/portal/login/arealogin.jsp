<%@ page language="java" contentType="text/html; charset=GBK" import ="gov.mof.fasp.Globals,java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%
	String original=null;
	if(request.getAttribute("original")!=null) {
		original = (String)request.getAttribute("original");
	}else{
		if(session.getAttribute("original")!=null) {
			original = (String)session.getAttribute("original");
		}
	}
	if(null==original){
		if(request.getAttribute("original_data")!=null) {
			original = (String)request.getAttribute("original_data");
		}else{
			if(session.getAttribute("original_data")!=null) {
				original = (String)session.getAttribute("original_data");
			}
		}
	}
	Object year=request.getAttribute("year");
	if(year==null||year.toString().length()<=1){
	year=request.getParameter("year");
	}
%>
<title>ÓÃ»§µÇÂ¼</title>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/template.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/prototype.js"></script>
</head>
<body  onload="document.form1.submit();" >
  <form id="form1" name="form1" method="post" action="<%=request.getAttribute("httpUrl")%>">
  <input type="hidden" id="username" name="username" value="<%=request.getAttribute("username")%>"/>
    <input type="hidden" id="realname" name="realname" value="<%=request.getAttribute("realname")%>"/>
    <input type="hidden" id="password" name="password"  value="<%=request.getAttribute("password")%>"/>
  <input type="hidden" id="year" name="year"  value="<%=year.toString()%>"/>
  <input type="hidden" id="screenwidth" name="screenwidth"  value="<%=request.getParameter("screenwidth")%>"/>
  <input type="hidden" id="fontFile" name="fontFile" value="<%=request.getParameter("fontFile")%>"/>
  <input type="hidden" id="signed_data" name="signed_data" value="<%=request.getParameter("signed_data")%>"/>
  <input type="hidden" id="areaurl" name="areaurl"  value="<%=request.getAttribute("mainUrl")%>"/>
  <input type="hidden" id="mainUrl" name="mainUrl"  value="<%=request.getAttribute("mainUrl")%>"/>
  <input type="hidden" id="original_data" name="original_data"  value="<%=original %>"/>
   <input type="hidden" id="area_name" name="area_name"  value="<%=request.getAttribute("area_name") %>"/>
  </form>
</body>
</html>
