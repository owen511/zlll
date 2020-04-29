<%@ page language="java" contentType="text/html; charset=GBK" import ="gov.mof.fasp.Globals" pageEncoding="GBK"%>
<%@page import="gov.mof.fasp.ifmis.portal.portlets.post.PostDTO"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ page import="java.util.*"%>

<%
response.setHeader("Cache-Control", "no-cache");
response.setHeader("Pragma", "no-cache");
response.setDateHeader("Expires", 0);

String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ request.getContextPath();
String styleName = "stylefontS.css";
if (session.getAttribute("StyleName") != null) {
	styleName = (String) session.getAttribute("StyleName");
}

String imagepath = basePath + "/portal/login/images";

pageContext.setAttribute("imagepath",imagepath);

String original=null;
if(request.getAttribute("original")!=null) {
	original = (String)request.getAttribute("original");
}
String controlURL="/common/ifmis_plugins.exe";
	if(request.getAttribute("controlURL")!=null&&!((String)request.getAttribute("controlURL")).equals("")) {
		controlURL = (String)request.getAttribute("controlURL");
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%-- 
<OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar" 
    CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB" codebase="common/flyie.cab#version=1,0,0,0" VIEWASTEXT>
	 <PARAM NAME="ToolBar" VALUE="0">
	 <PARAM NAME="StatusBar" VALUE="1">
	 <PARAM NAME="MenuBar" VALUE="0">    
</OBJECT>

 
<object classid="clsid:707C7D52-85A8-4584-8954-573EFCE77488"
	id="JITDSignOcx" width="0" codebase="./JITDSign.cab#version=2,0,24,13"></object>
--%>
<style>
.wishing_title{ height:15px; line-height:15px; font-size:12px; background:#FF0000 url(portal/login/images/bg/wishingtitle.gif) repeat-x left top ;}
p.jrdate{ font-size:18px; font-family:"黑体"; color:#C32F2F; }
p.jrdate span{ font-size:14px; font-family: Arial, Helvetica, sans-serif; color:#000; }
.guoqing{ background:#FFF url(portal/login/images/bg/flag.gif) no-repeat left top;}
html,body{margin:0;padding:0;}
.a {
	background-image: url(<%=imagepath%>/bg_leri.jpg);
	background-repeat: repeat-x;
}
.a1 {
	background-image: url(<%=imagepath%>/bg_mid.jpg);
}
</style>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>用户登录</title>
<script>
/*
function popmsg(){
var date=new Date();
var time = date.getMonth()+1+""+date.getDate();
if(time==101){
document.getElementById("wishing").style.background='#FFF';
var winstr="<table width=\"100%\" height=\"96\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
winstr+="<tr><td align=\"right\" class=\"wishing_title\"><img src=\"portal/login/images/bg/winshingclose.gif\" style=\"cursor:pointer\" onmouseover = \"this.src = 'portal/login/images/bg/winshingclose_over.gif'\"  onmouseout = \"this.src = 'portal/login/images/bg/winshingclose.gif'\" onclick=\"popshow()\"/></td></tr>";
winstr+="<tr><td align=\"center\"><table width=\"100%\" height=\"90\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border:1px #F00 solid;\">";
winstr+="<tr><td align=\"center\" rowspan=\"2\" width=\"53\" class=\"guoqing\"></td><td align=\"left\" style=\"height:30px;line-height:30px;\" ><p class=\"jrdate\"><span>10月1日</span> 国庆节</p></td></tr>";
winstr+="<tr><td valign=\"top\" align=\"left\" style=\"font-size:12px;height:66px;line-height:22px; text-indent:24; padding-right:5px;\">"+"庆国庆,大家齐欢乐,五十六个民族共欢腾,祝我们的祖国欣欣向荣~！"+"</td></tr></table></td></tr></table>";
var popWishing = document.getElementById("wishing");
popWishing.innerHTML = winstr;
setTimeout("popshow();",10000);}
}
function hidWishing(){
var popWishing = document.getElementById("wishing");
popWishing.style.display = "none";
}
function popshow(){
if(bottomYINT < -96){
clearTimeout(mytime);
hidWishing();
return;
}else if(bottomYINT > -96){
bottomYINT -= 10;
popWishing.style.bottom = bottomYINT;
}else{alert("false");}
var mytime=setTimeout("popshow();",60);
}*/
function submitWin(){
		var cook=document.cookie;
		var date=new Date();
		var expireDays=10*365;
		date.setTime(date.getTime()+expireDays*24*3600*1000);
		newcook = 'loginname='+document.forms[0].username.value+";expires="+unescape(date.toGMTString())+';';
		document.cookie = newcook;
		document.forms[0].submit();
		//document.forms[0].password.value = "";
		
	}
	function resetWin(){
		document.forms[0].username.value = "";
		document.forms[0].password.value = "";
		document.forms[0].username.focus();
		
	}
	function onloadCook(){
		var cook=document.cookie;
		if(cook.indexOf('loginname')!=-1){
			document.forms[0].username.value=cook.split('loginname=')[1].split(';')[0];
		}
	}
	function onkeyEnter(e){
		var keynum
		var keychar
		var numcheck
		 
		if(window.event) // IE
		  {
		  keynum = e.keyCode
		  }
		else if(e.which) // Netscape/Firefox/Opera
		  {
		  keynum = e.which
		  }
		if(keynum==13){
			submitWin()
		}
	}
</script>
</head>
<body class="a" onkeypress="onkeyEnter(event)" onload="onloadCook();">
<form id="form1" name="form1" method="post" action="<%=request.getContextPath()%>/login.do">
<input type="hidden" id="screenwidth" name="screenwidth"></input>
<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>
<table width="861" height="781" border="0" align="center" cellpadding="0" cellspacing="0" class="a1" >
  <tr>
    <td valign="top">
	<table width="222" height="145" border="0" align="center" cellspacing="0" style="margin:245px; margin-bottom:0;">
  <tr>
    <td width="49">用户</td>
    <td width="169"><input type="text" name="username" value=""/></td>
  </tr>
  <tr>
    <td>密码</td>
    <td><input  type="password" name="password" value=""/></td>
  </tr>
  <tr>
    <td>年份</td>
    <td>    <select name="year">        
				<c:forEach var="loginyear"  items="${loginaCctyear}" >
				          <option value="<c:out value="${loginyear.all}"/>"><c:out value="${loginyear.acctmainbodyname}"/></option>
				</c:forEach>
	        </select>       </td>
  </tr>
  <tr>
    <td valign="bottom"><div align="center"><img src="<%=imagepath%>/come.jpg" width="92" height="43" border="0" onclick="submitWin();" style="cursor:pointer;"/></div></td>
    <td valign="bottom"><div align="center"><img src="<%=imagepath%>/recome.jpg" width="92" height="43" border="0" onclick="resetWin();" style="cursor:pointer;"/></div></td>
  </tr> 
</table>
<table border="0" style="margin-left:249px;">
<tr>
  	<td nowrap="nowrap" valign="bottom"><font color="red" size="2"><c:out value="${msg}"/></font></td>
  </tr>
</table>
	</td>
  </tr>
</table>
</form>
<script language="JavaScript" type="text/javascript">
    document.all("screenwidth").value= window.screen.width;
	try{
	   document.forms['form1'].username.focus();
	}catch(e){}
</script>
<!--<div style="height:112px; width:400px; position:absolute; z-index:1001;left:0; bottom:0; " id="wishing">
<script>var popWishing = document.getElementById("wishing");
var bottomY = popWishing.style.bottom;
var bottomYINT = parseInt(bottomY);
popmsg()</script></div>-->
</body>



</html>
