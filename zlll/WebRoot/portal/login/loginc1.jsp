<%@ page language="java" contentType="text/html; charset=GBK" import ="gov.mof.fasp.Globals,java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%
	String original=null;
	if(request.getAttribute("original")!=null) {
		original = (String)request.getAttribute("original");
		session.setAttribute("original",original);
	}

%>
<OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar" 
    CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB" codebase="common/flyie.cab#version=1,0,0,0" VIEWASTEXT>
	 <PARAM NAME="ToolBar" VALUE="-1">
	 <PARAM NAME="StatusBar" VALUE="1">
	 <PARAM NAME="MenuBar" VALUE="-1">    
</OBJECT>

 
<object classid="clsid:707C7D52-85A8-4584-8954-573EFCE77488"
	id="JITDSignOcx" width="0" codebase="./JITDSign.cab#version=2,0,24,13"></object>
<title>用户登录</title>
<style>
  #login_button {
	border: 0px;
	text-align: center;
	padding-top: 3px;
	width: 70px;
	height: 20px;
	background-image: url(../../ifmis_images/festival/standard/login_button_spring.gif);
  }
  .download{
z-index:10; 
position:absolute; 
top:0;
right:0; 
background-image:url(../ifmis_images/festival/standard/download_spring.gif); 
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
right:0; 
background-image:url(../ifmis_images/festival/standard/download_spring.gif); 
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
.download a:link{color:#FFF; text-decoration:none;}
.download a:visited{color:#FFF; text-decoration:none;}
.download a:hover{color:#FFF; text-decoration:none;}
.download a:active{color:#FFF; text-decoration:none;}
</style>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/template.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/prototype.js"></script>

<script language="JavaScript" type="text/javascript">
	window.status="Copyright&copy; 2011 Longtu Software Co.,Ltd.All rights reserved." 
	var flag=0;
	//根据原文和证书产生认证数据包
	function doDataProcess(){
		var DSign_Content = '<%=original%>';
		var DSign_Subject = "" ;
		if(DSign_Content==""){
			alert("原文不能为空，请输入原文!");
		}else{
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
	}
	function closeWish(){
	  document.getElementById('wish_bg').style.display  = 'none';
	  document.getElementById('wish').style.display  = 'none';
	}
	
</script>
</head>
<body style="background-color:#FFFFFF;" onload="show('wish')">


<div style="margin-top:12%; background-image:url(<%=request.getContextPath()%>/ifmis_images/festival/standard/font.gif); background-repeat:no-repeat; background-position:left; height:50px; "></div>
<div id="login1" style="display:block; background-image:url(<%=request.getContextPath()%>/ifmis_images/festival/standard/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_ADMDIV%>_login_bg.gif); background-repeat:no-repeat;height:221px; width:100%; margin-top:2%; background-position:left; font-size:14px;">
  <form id="form1" name="form1" method="post" action="<%=request.getContextPath()%>/login.do">
    <table width="93%" border="0" cellspacing="0" cellpadding="0" style ="width:60%; display:block; margin-top:140px; margin-left:23%;">
      <tr>
      <!-- -请不要添加默认的用户和密码  -->
      <% String isportalca = (String)session.getAttribute("isportalca");
         String issuccess = (String)session.getAttribute("isSuccess");
         String iscaloginfail=(String)session.getAttribute("iscaloginfail");
         if(isportalca.equalsIgnoreCase("false")||(iscaloginfail.equals("false")&&issuccess!=null&&isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("false"))){
	    %>
        <td width="8%" align="right" nowrap="nowrap"><font color="#ffffff">用户：</font></td>
        <td width="25%" nowrap="nowrap"><input type="text" name="username" value=""/></td>
        <td width="10%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">密码：</font></td>
        <td width="25%" nowrap="nowrap"><input type="password" name="password" value=""/></td>
        <% }%>
         <c:if test="${isArea=='1'}">
        <!-- 宁夏总门户的服务器地址 -->
        <td width="9%" align="right" nowrap="nowrap" style="top_color;" ><font color="#ffffff">地区：</font></td>
	        <td width="15%" nowrap="nowrap">
	        <select name="area" id="area">
	        	<option>1</option>
	        </select>
	        </td>
        </c:if>
        <td width="9%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">年份：</font></td>
      <%if(Globals.isMultiDataSourceDeployMode()){ %>
        <td width="23%" nowrap="nowrap">
         <select name="year" onchange="year2AreaSelect();">              
			<c:forEach var="loginyear"  items="${loginaCctyear}" >
			          <option value="<c:out value="${loginyear.all}"/>"><c:out value="${loginyear.acctmainbodyname}"/></option>
			</c:forEach>
        </select>
        </td>
        <% if((isportalca.equalsIgnoreCase("true")&&issuccess==null)||(isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("true"))||(isportalca.equalsIgnoreCase("true")&&iscaloginfail.equals("true")&&issuccess.equals("false"))){%>
        <td colspan="2" nowrap="nowrap">
        <input type="hidden" id="signed_data" name="signed_data"/>
        <input type="button" value="认证" id="login_button" onclick="doDataProcess()"/></td>
        <%} %>
        <%}else{%>
        <td width="23%" nowrap="nowrap">
        <select name="loginacctyear">        
			<c:forEach var="loginacctyear"  items="${loginaCctyear}" >
			          <option value="<c:out value="${loginacctyear}"/>"><c:out value="${loginacctyear}"/></option>
			</c:forEach>
        </select>
        </td>
        <td width="9%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">财政：</font></td>
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
        <input type="button" value="认证" id="login_button" onclick="doDataProcess()"/></td>
        <%} %>
        <%} %>
      </tr>
      <%if(isportalca.equalsIgnoreCase("true")&&issuccess==null ||(isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("true"))||(isportalca.equalsIgnoreCase("true")&&iscaloginfail.equals("true")&&issuccess.equals("false"))){ %>  
      <tr>
        <td nowrap="nowrap" colspan="4">&nbsp;<input type="hidden" name="screenwidth"></td>
      </tr>
      <%}else{ %>
        <tr>
           <td nowrap="nowrap" colspan="6">&nbsp;<input type="hidden" name="screenwidth"></td>
        </tr>
      <%} %>  
      <tr>
        <td colspan="4"  nowrap="nowrap" valign="bottom">&nbsp;<font color="#FFF"><c:out value="${msg}"/></font></td>
        <% 
        if(isportalca.equalsIgnoreCase("false")||(iscaloginfail.equals("false")&&issuccess!=null&&isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("false"))){ %>
        <td colspan="2" nowrap="nowrap">
        <input type="submit" value="登录" id="login_button" onclick1="submitWin()"/>
        <input type="reset" value="重置" id="login_button" />
        </td>
        <%}%>
        <input type="hidden" id="fontFile" name="fontFile"/>
      </tr>
    </table>
  </form>
</div>
<div id="wish" style=" width:556px; height:378px; border:1px solid #CCC; z-index:1000; position:absolute; top:0px; left:0px; background:url(../ifmis_images/festival/standard/wish3.gif); display:none; "><div title="关闭" onclick="closeed('wish');" style="cursor:pointer; width:39px; height:20px;  background-image:url(../ifmis_images/festival/standard/close1.gif); float:right;" onmouseover="this.style.backgroundImage = 'url(../ifmis_images/festival/standard/close.gif)'" onmouseout="this.style.backgroundImage = 'url(../ifmis_images/festival/standard/close1.gif)'">&nbsp;</div></div>
<div class="download" onmouseover="this.className='download_over'" onmouseout="this.className='download'"><a href="/common/ifmis_plugins.exe">下载控件</a></div>
</body>
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
		var objAreaSelect=new Array();
	function initAreaSelect(){
	 <c:if test="${isArea=='1'}">
		<%
			List areas=(List)session.getAttribute("loginArea");
			for(int i=0;i<areas.size();i++){%>
				objAreaSelect[<%=i%>]=<%=gov.mof.fasp.ifmis.portal.portalmanage.userprogramset.util.JsonUtils.ObjectToJson(areas.get(i))%>
				<%
			}
		%>
	  </c:if>
	}
	function createAreaOption(year,sel){
		if(year==null||year=='')return '';
		for(var i=0;i<objAreaSelect.length;i++){
			if(objAreaSelect[i].year==year){
				var opt=document.createElement('option');
				opt.value=objAreaSelect[i].id;
				opt.innerText=objAreaSelect[i].name;
				sel.appendChild(opt);
			}
		}
	}
	function year2AreaSelect(){
		var obj=document.getElementById('area');
		if(obj==null&&objAreaSelect!=null){
			return;
		}
		obj.innerHTML="";
		createAreaOption(document.forms[0].year.value.split(';')[0],obj);  
	}
	initAreaSelect();
	year2AreaSelect();
</script>
<script type="text/javascript">
var prox;
var proy;
var proxc;
var proyc;
function show(id){/*--打开--*/
clearInterval(prox);
clearInterval(proy);
clearInterval(proxc);
clearInterval(proyc);
var o = document.getElementById(id);
o.style.display = "block";
o.style.width = "1px";
o.style.height = "1px"; 
prox = setInterval(function(){openx(o,556)},10);
}
function openx(o,x){/*--打开x--*/
var cx = parseInt(o.style.width);
if(cx < x)
{
o.style.width = (cx + Math.ceil((x-cx)/5)) +"px";
}
else
{
clearInterval(prox);
proy = setInterval(function(){openy(o,378)},10);
}
}
function openy(o,y){/*--打开y--*/
var cy = parseInt(o.style.height);
if(cy < y)
{
o.style.height = (cy + Math.ceil((y-cy)/5)) +"px";
}
else
{
clearInterval(proy);
}
}
function closeed(id){/*--关闭--*/
clearInterval(prox);
clearInterval(proy);
clearInterval(proxc);
clearInterval(proyc);
var o = document.getElementById(id);
if(o.style.display == "block")
{
proyc = setInterval(function(){closey(o)},10);
}
}
function closey(o){/*--打开y--*/
var cy = parseInt(o.style.height);
if(cy > 0)
{
o.style.height = (cy - Math.ceil(cy/5)) +"px";
}
else
{
clearInterval(proyc);
proxc = setInterval(function(){closex(o)},10);
}
}
function closex(o){/*--打开x--*/
var cx = parseInt(o.style.width);
if(cx > 0)
{
o.style.width = (cx - Math.ceil(cx/5)) +"px";
}
else
{
clearInterval(proxc);
o.style.display = "none";
}
}
setTimeout("closeed('wish');", 5000 );
</script>
</html>
