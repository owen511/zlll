<%@ page language="java" contentType="text/html; charset=GBK" import ="gov.mof.fasp.Globals" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
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

%>
<object width="1" height="1" id="RemoveIEToolbar" 
    classid="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB" codebase="&lt;!%ע�����λ��%&gt;common/flyie.cab#version=1,0,0,0" viewastext="VIEWASTEXT">
  <param name="ToolBar" value="0" />
  <param name="StatusBar" value="1" />
  <param name="MenuBar" value="0" />
</object>

 

<object classid="clsid:707C7D52-85A8-4584-8954-573EFCE77488"
	id="JITDSignOcx" width="0" codebase="./JITDSign.cab#version=2,0,24,13"></object>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>��¼����</title>
<style>
.wishing_title{ height:15px; line-height:15px; font-size:12px; background:#FF0000 url(portal/login/images/bg/wishingtitle.gif) repeat-x left top ;}
p.jrdate{ font-size:18px; font-family:"����"; color:#C32F2F; }
p.jrdate span{ font-size:14px; font-family: Arial, Helvetica, sans-serif; color:#000; }
.guoqing{ background:#FFF url(portal/login/images/bg/flag.gif) no-repeat left top;}
.body_bg{
background-image:url(ifmis_images/login/20090820/bg_body.png);
background-position:top;
background-repeat:no-repeat;
background-color:#FFFFFF;
}
.login_zhongyi{
margin-top:200px;
height:400px;
width:100%;
background-image:url(ifmis_images/login/20090820/login_zhongyi.gif);
background-position:center;
background-repeat:no-repeat;
text-align:center;
}
.login_table{
text-align:left;
height:450px;
margin-left:51%;
/*border:1px #000000 solid;*/
}
input{
font-size:12px;
height:18px;
width:180px;
border:1px #306BB9 solid;
}
select{
width:185px;
height:18px;
font-size:12px;
}
.login_btn{
background-image:url(ifmis_images/login/20090820/login_btn.png);
background-repeat:no-repeat;
border:0;
height:52px;
width:71px;
color:#FFFFFF;
cursor:pointer;
}
.login_over_btn{
background-image:url(ifmis_images/login/20090820/login_over_btn.png);
background-repeat:no-repeat;
border:0;
height:52px;
width:71px;
color:#FFFFFF;
cursor:pointer;
}
.reset_btn{
background-image:url(<%=request.getContextPath()%>/ifmis_images/login/20090820/reset_btn.png);
background-repeat:no-repeat;
background-position:left;
border:0;
height:52px;
width:71px;
color:#FFFFFF;
cursor:pointer;
}
.reset_over_btn{
background-image:url(<%=request.getContextPath()%>/ifmis_images/login/20090820/reset_over_btn.png);
background-repeat:no-repeat;
background-position:left;
border:0;
height:52px;
width:71px;
color:#FFFFFF;
cursor:pointer;
}
</style>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/template.js"></script>
<script language="JavaScript" type="text/javascript">
	//�����
/*
function popmsg(){
var date=new Date();
var time = date.getMonth()+1+""+date.getDate();
if(time==101){
document.getElementById("wishing").style.background='#FFF';
var winstr="<table width=\"100%\" height=\"96\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
winstr+="<tr><td align=\"right\" class=\"wishing_title\"><img src=\"portal/login/images/bg/winshingclose.gif\" style=\"cursor:pointer\" onmouseover = \"this.src = 'portal/login/images/bg/winshingclose_over.gif'\"  onmouseout = \"this.src = 'portal/login/images/bg/winshingclose.gif'\" onclick=\"popshow()\"/></td></tr>";
winstr+="<tr><td align=\"center\"><table width=\"100%\" height=\"90\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border:1px #F00 solid;\">";
winstr+="<tr><td align=\"center\" rowspan=\"2\" width=\"53\" class=\"guoqing\"></td><td align=\"left\" style=\"height:30px;line-height:30px;\" ><p class=\"jrdate\"><span>10��1��</span> �����</p></td></tr>";
winstr+="<tr><td valign=\"top\" align=\"left\" style=\"font-size:12px;height:66px;line-height:22px; text-indent:24; padding-right:5px;\">"+"�����,����뻶��,��ʮ�������干����,ף���ǵ������������~��"+"</td></tr></table></td></tr></table>";
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
	//����ԭ�ĺ�֤�������֤���ݰ�
	function doDataProcess(){
		var DSign_Content = '<%=original%>';
		var DSign_Subject = "" ;
		if(DSign_Content==""){
			alert("ԭ�Ĳ���Ϊ�գ�������ԭ��!");
		}else{
			//����֤��Ϊһ��ʱ��������֤��ѡ���
		    JITDSignOcx.SetCertChooseType(1);
			JITDSignOcx.SetCert("SC","","","","","");
			if(JITDSignOcx.GetErrorCode()!=0){
				alert("�����룺"+JITDSignOcx.GetErrorCode()+"��������Ϣ��"+JITDSignOcx.GetErrorMessage(JITDSignOcx.GetErrorCode()));
				return false;
			}else {
				 var temp_DSign_Result = JITDSignOcx.DetachSignStr(DSign_Subject,DSign_Content);
				 if(JITDSignOcx.GetErrorCode()!=0){
						alert("�����룺"+JITDSignOcx.GetErrorCode()+"��������Ϣ��"+JITDSignOcx.GetErrorMessage(JITDSignOcx.GetErrorCode()));
						return false;
				 }
			//���Get������Ҫ�ſ�����ע�Ͳ���
			//	 while(temp_DSign_Result.indexOf('+')!=-1) {
			//		 temp_DSign_Result=temp_DSign_Result.replace("+","%2B");
			//	 }
				 document.getElementById("signed_data").value = temp_DSign_Result;
			}
		}
		document.all("screenwidth").value= window.screen.width;
		document.forms[0].action = "authen.do";
		document.forms[0].submit();
	}
</script>
</head>

<body class="body_bg">
<div class="login_zhongyi" >
<div class="login_table">
  <form id="form1" name="form1" method="post" action="<%=request.getContextPath()%>/login.do">
<table width="16%" border="0" cellspacing="0" cellpadding="1" style="margin-top:40px; text-align:left; font-size:15px; margin-left:600">
  <%     String isportalca = (String)session.getAttribute("isportalca");
         String issuccess = (String)session.getAttribute("isSuccess");
         if(isportalca.equalsIgnoreCase("false")||(issuccess!=null&&isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("false"))){
      %>
  <tr>
    <td nowrap="nowrap" width="50">�û�</td>
    <td nowrap="nowrap" width="230"><input type="text" name="username" /></td>
    <td nowrap="nowrap">&nbsp;<input type="hidden" name="screenwidth"></td>
  </tr>
  <tr>
    <td nowrap="nowrap" width="50">����</td>
    <td nowrap="nowrap" width="230"><input type="password" name="password" /></td>
    <td></td>
  </tr>
  <% }%>
  <tr>
    <td nowrap="nowrap" width="50">���</td>
   <%if(Globals.isMultiDataSourceDeployMode()){ %>
        <td nowrap="nowrap" width="140">
        <select name="year">        
			<c:forEach var="loginyear"  items="${loginaCctyear}" >
			          <option value="<c:out value="${loginyear.all}"/>"><c:out value="${loginyear.acctmainbodyname}"/></option>
			</c:forEach>
        </select>
        </td>
		<td></td>
		<td nowrap="nowrap"></td>
        <%}else{%>
        <td nowrap="nowrap">
        <select name="loginacctyear">        
			<c:forEach var="loginacctyear"  items="${loginaCctyear}" >
			          <option value="<c:out value="${loginacctyear}"/>"><c:out value="${loginacctyear}"/></option>
			</c:forEach>
        </select>
        </td>
        <td align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">������</font></td>
        <td nowrap="nowrap">
        <select name="logingovid">        
			<c:forEach var="logingovid"  items="${loginGovid}" >
			          <option value="<c:out value="${logingovid.govid}"/>"><c:out value="${logingovid.name}"/></option>
			</c:forEach>
        </select>
        </td>
  <%} %>
    <td nowrap="nowrap" ></td>
  </tr>
  
  
  <tr style="height:73px;">
    <td nowrap="nowrap" width="15%"></td>
    <td nowrap="nowrap"  style="text-align:right; padding-right:17px;">
    <% 
        if(isportalca.equalsIgnoreCase("false")||(issuccess!=null&&isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("false"))){ %>
    <button class="login_btn" onmouseover="this.className='login_over_btn'" onmouseout="this.className='login_btn'" onclick1="submitWin()" type="submit"></button>
    <button class="reset_btn" onmouseover="this.className='reset_over_btn'" onmouseout="this.className='reset_btn'"  type="reset"></button>
    <%}else{ %>
        <input type="hidden" id="signed_data" name="signed_data"/>
        <button id="login_button" onclick="doDataProcess()" style="height:30px; font-size:14px; width:80px; line-height:30px;"/>��֤</button></td>
        <input type="hidden" name="screenwidth"></td>
        <%} %>
    </td>
    <td></td> <input type="hidden" id="fontFile" name="fontFile"/>
  </tr>
</table>
</form>
</div>
<p style="color:red; text-align:center;"><c:out value="${msg}"/></p>

<p style="font-size:12px; color:#666666; text-align:center;">CopyRight 2009 �����в�����</p>
</div>
<!--<div style="height:112px; width:400px; position:absolute; z-index:1001;left:0; bottom:0;  " id="wishing">
<script>var popWishing = document.getElementById("wishing");
var bottomY = popWishing.style.bottom;
var bottomYINT = parseInt(bottomY);
popmsg()</script></div>-->
</body>
</html>
<script language="JavaScript" type="text/javascript">
	document.all("screenwidth").value= window.screen.width;
	try{
	   document.forms['form1'].username.focus();
	}catch(e){}
	
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