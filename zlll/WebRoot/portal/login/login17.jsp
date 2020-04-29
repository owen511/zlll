<%@ page language="java" contentType="text/html; charset=GBK" import ="gov.mof.fasp.Globals" pageEncoding="GBK"%>
<%@page import="gov.mof.fasp.ifmis.portal.portlets.post.PostDTO"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ page import="java.util.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%
	String original=null;
	if(request.getAttribute("original")!=null) {
		original = (String)request.getAttribute("original");
	}
	String controlURL="/common/ifmis_plugins.exe";
	if(request.getAttribute("controlURL")!=null&&!((String)request.getAttribute("controlURL")).equals("")) {
		controlURL = (String)request.getAttribute("controlURL");
	}
	String jdcontrolURL="";
	if(request.getAttribute("jdcontrolURL")!=null&&!((String)request.getAttribute("jdcontrolURL")).equals("")) {
		jdcontrolURL = (String)request.getAttribute("jdcontrolURL");
	}

%>
<OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar" 
    CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB" codebase="common/flyie.cab#version=1,0,0,0" VIEWASTEXT>
	 <PARAM NAME="ToolBar" VALUE="0">
	 <PARAM NAME="StatusBar" VALUE="1">
	 <PARAM NAME="MenuBar" VALUE="0">    
</OBJECT>

 
<object classid="clsid:707C7D52-85A8-4584-8954-573EFCE77488"
	id="JITDSignOcx" width="0" codebase="./JITDSign.cab#version=2,0,24,13"></object>
<title>用户登录</title>
<style>
.wishing_title{ height:15px; line-height:15px; font-size:12px; background:#FF0000 url(portal/login/images/bg/wishingtitle.gif) repeat-x left top ;}
p.jrdate{ font-size:18px; font-family:"黑体"; color:#C32F2F; }
p.jrdate span{ font-size:14px; font-family: Arial, Helvetica, sans-serif; color:#000; }
.guoqing{ background:#FFF url(portal/login/images/bg/flag.gif) no-repeat left top;}
body{
width:100%;
height:100%;
margin:0;
padding:0;
text-align:center;
background:#0081C6 url(../portal/images/login/cd/cd_login.jpg) repeat-x center bottom;
}
.div_bg{
width:100%;
}
.login_bg{
background:url(../portal/images/login/cd/cd_logink.gif) no-repeat center center;
background-position:center center;
background-repeat:no-repeat;
height:349px;
color:#185da2;
font-weight:bold;
font-size:14px;
}
.login_btn{
border:0;
background-image:url(../../ifmis_images/login/20090930/login_btn_one.png);
background-position:center center;
background-repeat:no-repeat;
height:28px;
width:78px;
text-align:center;
font-size:14px;
color:#000000;
cursor:pointer;
}
.reset_btn{
border:0;
background-image:url(../../ifmis_images/login/20090930/btn_one.png);
background-position:center center;
background-repeat:no-repeat;
height:28px;
width:78px;
text-align:center;
font-size:14px;
color:#000000;
cursor:pointer;
}
.btn_over{
border:0;
background-image:url(../../ifmis_images/login/20090921/btn_over.png);
background-position:center center;
background-repeat:no-repeat;
height:53px;
width:53px;
text-align:center;
font-size:14px;
color:#000000;
cursor:pointer;
font-weight:900;
}
.input_style{
height:16px;
width:150px;
padding-left:2px;
line-height:16px;
font-size:14px;
background-color:none;
}
.password_style{
height:16px;
width:110px;
padding-left:2px;
line-height:16px;
font-size:14px;
background-color:none;
}
.input_style_end{
line-height:16px;
padding-left:2px;
font-size:14px;
}
#chooseyear{
filter: alpha(opacity=80);
-moz-opacity:0.5; 
opacity: 0.5;
}
#chooseyear div{
height:20px;
width:90px;
padding-left:10px;
}
.gonggao_div{
z-index:1000;
position:absolute;
background:#fff;
height:200px;
width:360px;
background-image:url(../portal/images/login/cd/gonggao.jpg);
background-repeat:no-repeat;
background-position:left top;
font-size:12px;
/*left:10px;
top:10px;*/
bottom:0; 
right:0;
}
.gonggao_div div{
font-size:12px;
height:25px;
line-height:25px;
}
.gonggao{
 border-bottom:1px #ccc dotted; 
 height:25px; 
 line-height:25px;
 
 }
 
 .download{
z-index:10; 
position:absolute; 
top:0;
left:0; 
background-image:url(../portal/images/login/cd/xiazai.jpg); 
height:128px; 
width:128px; 
background-repeat:no-repeat; 
color:#FFF; 
font-size:14px; 
cursor:pointer;
filter:alpha(opacity=100);-moz-opacity:0.8;
line-height:128px;
font-weight:bold;
text-align:center;
}
.download_over{
z-index:10; 
position:absolute; 
top:0;
left:0; 
background-image:url(../portal/images/login/cd/xiazai.jpg); 
height:128px; 
width:128px; 
background-repeat:no-repeat; 
color:#FFF; 
font-size:14px; 
cursor:pointer;
filter:alpha(opacity=80);-moz-opacity:0.8; 
line-height:128px;
font-weight:bold;
text-align:center;
}
.download a:link{
color:#FFF;
text-decoration:none;
}
.download a:visited{
color:#FFF;
}
.download a:hover{
color:#FFF;
}
.download a:active{
color:#FFF;
}
.download_over a:link{
color:#FFF;
text-decoration:none;
}
.download_over a:visited{
color:#FFF;
}
.download_over a:hover{
color:#FFF;
}
.download_over a:active{
color:#FFF;
}

.download a:link{color:#FFF; text-deco}

  .download9{
z-index:11; 
position:absolute; 
top:0;
left:0;
right:128; 
background-image:url(../../ifmis_images/login/20090930/download.gif); 
height:128px; 
width:128px; 
background-repeat:no-repeat; 
color:#FFF; 
font-size:14px; 
cursor:pointer;
filter:alpha(opacity=100);-moz-opacity:0.8;
line-height:128px;
font-weight:bold;
text-align:center;
}
.download_over9{
z-index:11; 
position:absolute; 
top:0;
left:0;
right:128; 
background-image:url(../../ifmis_images/login/20090930/download.gif); 
height:128px; 
width:128px; 
background-repeat:no-repeat; 
color:#FFF; 
font-size:14px; 
cursor:pointer;
filter:alpha(opacity=80);-moz-opacity:0.8;
line-height:128px;
font-weight:bold;
text-align:center;
}
.download9 a:link{color:#FFF; text-decoration:none;}
.download9 a:visited{color:#FFF; text-decoration:none;}
.download9 a:hover{color:#FFF; text-decoration:none;}
.download9 a:active{color:#FFF; text-decoration:none;}

</style>


<script type="text/javascript" src="<%=request.getContextPath()%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/template.js"></script>
<script language="JavaScript" type="text/javascript">
	window.status="Copyright (C) 2011 常德市财政局";
	//国庆节
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
	//根据原文和证书产生认证数据包
	function doDataProcess(){
		var DSign_Content = '<%=original%>';
		var DSign_Subject = "" ;
		if(DSign_Content==""){
			alert("原文不能为空，请输入原文!");
		}else{
			//控制证书为一个时，不弹出证书选择框
			//控制证书为一个时，不弹出证书选择框
		    JITDSignOcx.SetCertChooseType(1);
			JITDSignOcx.SetCert("SC","","","","CN=Private Certificate Authority Of MOF, O=MOF, C=CN","")
			if(JITDSignOcx.GetErrorCode()!=0){
				alert("错误信息："+JITDSignOcx.GetErrorMessage(JITDSignOcx.GetErrorCode()));
				return false;
			}else {
				 var temp_DSign_Result = JITDSignOcx.DetachSignStr(DSign_Subject,DSign_Content);
				 if(JITDSignOcx.GetErrorCode()!=0){
						alert("错误信息："+JITDSignOcx.GetErrorMessage(JITDSignOcx.GetErrorCode()));
						return false;
				 }
			//如果Get请求，需要放开下面注释部分
			//	 while(temp_DSign_Result.indexOf('+')!=-1) {
			//		 temp_DSign_Result=temp_DSign_Result.replace("+","%2B");
			//	 }
				 document.getElementById("signed_data").value = temp_DSign_Result;
			}
		}
		document.all("screenwidth").value= window.screen.width;
		document.forms[0].action = "authen.do";
		document.forms[0].submit();
		document.forms[0].action = "login.do";
	}
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
<body class="body_bg" onkeypress="onkeyEnter(event)" onload="onloadCook();">
<%String isbulletin=(String)request.getAttribute("isbulletin");
  if (isbulletin.equals("true")){
 %>
<div class="gonggao_div" id="gonggao_div" style="display:block;">
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td align=center><div></div></td>
    <td onclick="closeGonggao()" style="width:30px; cursor:pointer;" title="关闭">&nbsp;</td>
  </tr>
</table>
      <marquee direction=up scrollamount=1 scrolldelay=50 onmouseover="stop()" onmouseout="start()" style=" cursor:pointer; color:#000000; height:150px; margin:20px 20px 0 20px;">
	      <% 
	         if(session.getAttribute("postList")!=null){
					List postList =(List)session.getAttribute("postList");
					for(int i=0;i<postList.size();i++){
					PostDTO post = (PostDTO)postList.get(i);
					%>
					<div class="gonggao">
							<img src="../images/done_btn/news.gif" />
							<a  onclick='preview("<%=post.getId()%>")'>
							<%if(Integer.parseInt(post.getPostlevel())==3){%>
							<font color=red>
							<%=post.getPosttitle() %>
							</font>
							<%}else{%>
							<%=post.getPosttitle() %>
							<%}%>
							</a>
							(
							<%=post.getCreatetime() %>
							)
							<br>
					</div>
					<br />
					
					<% 
					}
				}	
				%>
	      
      </marquee>
</div>
<%} %>
<div class="div_bg">
<div style="display:block;position:absolute;z-index:100;left:0;bottom:200px; width:100%; text-align:center;">
   <div class="login_bg" style="width:535px;">
   	 <form id="form1" name="form1" autocomplete="off" method="post" action="<%=request.getContextPath()%>/login.do">
	    <table width="469px" border="0" style="margin-top:190px; font-size:14px;" align="center">
	      <tr width="380px">
	      <!-- -请不要添加默认的用户和密码  -->
	      <% String isportalca = (String)session.getAttribute("isportalca");
	         String issuccess = (String)session.getAttribute("isSuccess");
	         String iscaloginfail=(String)session.getAttribute("iscaloginfail");
	         if(isportalca.equalsIgnoreCase("false")||(iscaloginfail.equals("false")&&issuccess!=null&&isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("false"))){
	      %>
	        <td nowrap="nowrap" align="left" width="35px" nowrap="nowrap">用户</td>
	        <td nowrap="nowrap" width="160px" align="left" ><input type="text" name="username" value="" class="input_style"/></td>
	        <td nowrap="nowrap" width="35px" align="left" nowrap="nowrap">密码</td>
	        <td nowrap="nowrap" width="110px" align="left"><input type="password" name="password" value="" class="password_style"/></td>
	        <% }%>
	         <td nowrap="nowrap" width="35px" align="right" nowrap="nowrap">年份</td>
	      <%if(Globals.isMultiDataSourceDeployMode()){ %>
	        <td nowrap="nowrap" align="right" width="80px">
	        <select name="year">        
				<c:forEach var="loginyear"  items="${loginaCctyear}" >
				          <option value="<c:out value="${loginyear.all}"/>"><c:out value="${loginyear.acctmainbodyname}"/></option>
				</c:forEach>
	        </select>
	        </td>
	        <% if((isportalca.equalsIgnoreCase("true")&&issuccess==null)||(isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("true"))||(isportalca.equalsIgnoreCase("true")&&iscaloginfail.equals("true")&&issuccess.equals("false"))){%>
	        <td colspan="2" nowrap="nowrap">
	        <input type="hidden" id="signed_data" name="signed_data"/>
	        <input type="button" value="认证" id="login_button" onclick="doDataProcess()""/></td>
	        <%} %>
	        <%}else{%>
	        <td width="23%" nowrap="nowrap">
	        <select name="loginacctyear">        
				<c:forEach var="loginacctyear"  items="${loginaCctyear}" >
				          <option value="<c:out value="${loginacctyear}"/>"><c:out value="${loginacctyear}"/></option>
				</c:forEach>
	        </select>
	        </td>
	        <td width="9%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">财政</font></td>
	        <td width="23%" nowrap="nowrap">
	        <select name="logingovid">        
				<c:forEach var="logingovid"  items="${loginGovid}" >
				          <option value="<c:out value="${logingovid.govid}"/>"><c:out value="${logingovid.name}"/></option>
				</c:forEach>
	        </select>
	        </td>
        <% if((isportalca.equalsIgnoreCase("true")&&issuccess==null)||(isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("true"))||(isportalca.equalsIgnoreCase("true")&&iscaloginfail.equals("true")&&issuccess.equals("false"))){%>
	        <td colspan="2" nowrap="nowrap">
	        <input type="hidden" id="signed_data" name="signed_data"/>
	        <input type="button" value="认证" id="login_button" onclick="doDataProcess()""/></td>
	        <%} %>
	        <%} %>
	      </tr>
	      <%if(isportalca.equalsIgnoreCase("true")&&issuccess==null ||(isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("true"))||(isportalca.equalsIgnoreCase("true")&&iscaloginfail.equals("true")&&issuccess.equals("false"))){ %>
	      <tr>
	        <td nowrap="nowrap" width="50px" align="right" nowrap="nowrap">&nbsp;<input type="hidden" name="screenwidth"></td> 
	        <td nowrap="nowrap" align="right" width="80px">&nbsp;</td> 
	        <td colspan="2" nowrap="nowrap" valign="bottom"><font color="red"><c:out value="${msg}"/></font></td>
	      </tr>
	      <tr>
	        <td colspan="4" nowrap="nowrap" align="center" >
	      <%} else{
	      %>
	        <tr>
		        <td nowrap="nowrap" width="50px" align="right" nowrap="nowrap">&nbsp;<input type="hidden" name="screenwidth"></td> 
		        <td colspan="5" nowrap="nowrap" valign="bottom"><font color="red"><c:out value="${msg}"/></font></td>
	        </tr>
	        <tr>
	        <td colspan="6" nowrap="nowrap" align="center" >
	      <%} %>
	      
	        <% 
	        if(isportalca.equalsIgnoreCase("false")||(iscaloginfail.equals("false")&&issuccess!=null&&isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("false"))){ %>
	        <button class="login_btn" value="登录" id="login_button" onclick="submitWin()" ></button>&nbsp;&nbsp;&nbsp;
	        <button class="reset_btn" value="重置"  type="reset">	 </button>       
	       
	        <%}%>
	        <input type="hidden" id="fontFile" name="fontFile"/>
	        </td>
	      </tr>
	    </table>
  </form>
 </div>
<p style="font-size:12px; color:#173E60; font-weight:normal; text-align:right; width:480px; line-height:15px; height:15px;">Copyright (C) 2011 常德市财政局</p>
</div>
</div>
<%
	if(!jdcontrolURL.equals("")){
	%>
	<div class="download9" onmouseover="this.className='download_over9'" onmouseout="this.className='download9'"><a href="<%=jdcontrolURL %>">下载九鼎控件</a></div>
	<%
	}
 %>
<div class="download" onmouseover="this.className='download_over'" onmouseout="this.className='download'" ><a href="<%=controlURL %>">下载控件</a></div>
<!--<div style="height:112px; width:400px; position:absolute; z-index:1001;left:0; bottom:0;  " id="wishing">
<script>var popWishing = document.getElementById("wishing");
var bottomY = popWishing.style.bottom;
var bottomYINT = parseInt(bottomY);
popmsg()</script></div>-->
</body>
<script language="JavaScript" type="text/javascript">
    document.all("screenwidth").value= window.screen.width;
	try{
	   document.forms['form1'].username.focus();
	}catch(e){}
</script>
<script type="text/javascript">
//关闭公告
function closeGonggao(){
document.getElementById("gonggao_div").style.display = "none";
}
function preview(id){
		var url = "<%=request.getContextPath()%>/portal/portlets/post/post_preview.jsp?id="+id;
   		window.open(url,'window',"Width=700px;Height=550px;scroll=0;status=no;resizable=0;"); 
}

var fontsize = getFont("ifmisfont");
if(fontsize!=null && fontsize!=""){
    if(fontsize=="l"){
         document.forms[0].fontFile.value="stylefontL.css";
         //setFontSession("stylefontL.css");	
   }else if(fontsize=="m"){
     document.forms[0].fontFile.value="stylefontM.css";
     //setFontSession("stylefontM.css");	
   }else{
      document.forms[0].fontFile.value="stylefontS.css";
      //setFontSession("stylefontS.css");
   }
}else{
   document.forms[0].fontFile.value="stylefontS.css";
   //setFontSession("stylefontS.css");
}
</script>
</html>
