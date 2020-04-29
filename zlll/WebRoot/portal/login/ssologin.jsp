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
	Object username=request.getParameter("username");
	if(username==null||username.toString().length()<=0){
		username=request.getAttribute("username");
	}
	Object signed_data=request.getParameter("signed_data");
	if(signed_data==null||signed_data.toString().length()<=0){
		signed_data=request.getAttribute("signed_data");
	}
	Object password=request.getParameter("password");
	if(password==null||password.toString().length()<=0){
		password=request.getAttribute("password");
	}
	Object httpUrl=request.getParameter("httpUrl");
	if(httpUrl==null||httpUrl.toString().length()<=0){
		httpUrl=request.getAttribute("httpUrl");
	}
	Object area_name=request.getParameter("area_name");
	if(area_name==null||area_name.toString().length()<=0){
		area_name=request.getAttribute("area_name");
	}
	Object areaurl=request.getParameter("areaurl");
	if(areaurl==null||area_name.toString().length()<=0){
		areaurl=request.getAttribute("areaurl");
	}
%>
<title>ÓÃ»§µÇÂ¼</title>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/template.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/prototype.js"></script>
<script type="text/javascript">
function bdonload(){
	var fontsize = getFont("ifmisfont");
	if(fontsize!=null && fontsize!=""){
	    if(fontsize=="l"){
	         document.form1.fontFile.value="stylefontL.css";
	   }else if(fontsize=="m"){
	     document.form1.fontFile.value="stylefontM.css";
	   }else{
	      document.form1.fontFile.value="stylefontS.css";
	   }
	}else{
	   document.form1.fontFile.value="stylefontS.css";
	}
	if(document.form1.screenwidth.value=='null'){
		document.form1.screenwidth.value=window.screen.width;
	}
	document.form1.submit();
}
</script>
</head>
<body  onload="bdonload()" >
  <form id="form1" name="form1" method="post" action="<%=httpUrl==null?"":httpUrl%>">
  <input type="hidden" id="username" name="username" value="<%=username==null?"":username%>"/>
  <input type="hidden" id="password" name="password"  value="<%=password==null?"":password%>"/>
  <input type="hidden" id="year" name="year"  value="<%=year==null?"":year%>"/>
  <input type="hidden" id="screenwidth" name="screenwidth"  value="<%=request.getParameter("screenwidth")%>"/>
  <input type="hidden" id="fontFile" name="fontFile" value="<%=request.getParameter("fontFile")%>"/>
  <input type="hidden" id="signed_data" name="signed_data" value="<%=signed_data==null?"":signed_data%>"/>
  <input type="hidden" id="areaurl" name="areaurl"  value="<%=areaurl==null?"":areaurl%>"/>
  <input type="hidden" id="original_data" name="original_data"  value="<%=original==null?"":original %>"/>
  <input type="hidden" id="area_name" name="area_name"  value="<%=area_name==null?"":area_name %>"/>
  </form>
</body>
</html>
