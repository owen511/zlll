<%@ page language="java" contentType="text/html; charset=GBK" import ="gov.mof.fasp.Globals" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=7" />
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
<OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar" 
    CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB" codebase="common/flyie.cab#version=1,0,0,0" VIEWASTEXT>
	 <PARAM NAME="ToolBar" VALUE="-1"/>
	 <PARAM NAME="StatusBar" VALUE="1"/>
	 <PARAM NAME="MenuBar" VALUE="-1"/>     
</OBJECT>

 
<object classid="clsid:707C7D52-85A8-4584-8954-573EFCE77488"
	id="JITDSignOcx" width="0" codebase="./JITDSign.cab#version=2,0,24,13"></object>
<title>重庆财政管理一体化信息系统</title>
<style>
  .wishing_title{ height:15px; line-height:15px; font-size:12px; background:#FF0000 url(portal/login/images/bg/wishingtitle.gif) repeat-x left top ;}
p.jrdate{ font-size:18px; font-family:"黑体"; color:#C32F2F; }
p.jrdate span{ font-size:14px; font-family: Arial, Helvetica, sans-serif; color:#000; }
.guoqing{ background:#FFF url(portal/login/images/bg/flag.gif) no-repeat left top;}
  #login_button {
	border: 0px;
	text-align: center;
	padding-top: 3px;
	width: 70px;
	height: 20px;
	background-image: url(../../images/buttons/login_button.gif);
  }
</style>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/template.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/prototype.js"></script>
<script language="JavaScript" type="text/javascript">
	window.status="Copyright&copy; 2008 Longtu Software Co.,Ltd.All rights reserved." 
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
		document.forms[0].screenwidth.value = window.screen.width;
		document.forms[1].screenwidth.value = window.screen.width;
		document.forms[1].action = "authen.do";
		document.forms[1].submit();
	}
	
	function jumpToNomal(){
		document.getElementById("nomalandca").style.background = "url(../images/login/chooseaccttype1.jpg)"; 
		document.getElementById("ptyh").style.color = "#FFF"; 
		document.getElementById("cayh").style.color = "#555"; 
		document.getElementById("ptdl").style.display = "block"; 
		document.getElementById("cadl").style.display = "none"; 
	}
	function jumpToCA(){
		document.getElementById("nomalandca").style.background = "url(../images/login/chooseaccttype.jpg)"; 
		document.getElementById("cayh").style.color = "#FFF"; 
		document.getElementById("ptyh").style.color = "#555"; 
		document.getElementById("ptdl").style.display = "none"; 
		document.getElementById("cadl").style.display = "block"; 
	}
</script>
</head>
<body style="background-color:#FFFFFF;">
<div style="margin-top:12%; background-image:url(<%=request.getContextPath()%>/images/bg/font.gif); background-repeat:no-repeat; background-position:left; height:50px; "></div>
<div id="login1" style="display:block; background-image:url(<%=request.getContextPath()%>/images/bg/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_ADMDIV%>_login_bg.gif); background-repeat:no-repeat;height:221px; width:100%; margin-top:2%; background-position:left; font-size:14px;">
  <form id="form1" name="form1" method="post" action="<%=request.getContextPath()%>/login.do">
    <table id="ptdl" width="93%" border="0" cellspacing="0" cellpadding="0" style ="width:60%; display:none; margin-top:140px; margin-left:23%;">
      <tr>
      <!-- -请不要添加默认的用户和密码  -->
        <td width="8%" align="right" nowrap="nowrap"><font color="#ffffff">7用户：</font></td>
        <td width="25%" nowrap="nowrap"><input type="text" name="username" value=""/></td>
        <td width="10%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">密码：</font></td>
        <td width="25%" nowrap="nowrap"><input type="password" name="password" value=""/></td>
        <td width="9%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">年份：</font></td>
      <%if(Globals.isMultiDataSourceDeployMode()){ %>
        <td width="23%" nowrap="nowrap">
        <select name="year">        
			<c:forEach var="loginyear"  items="${loginaCctyear}" >
			          <option value="<c:out value="${loginyear.all}"/>"><c:out value="${loginyear.acctmainbodyname}"/></option>
			</c:forEach>
        </select>
        </td>
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
        <%} %>
      </tr>
        <tr>
           <td nowrap="nowrap" colspan="6">&nbsp;<input type="hidden" name="screenwidth"></td>
        </tr>
      <tr>
        <td colspan="4"  nowrap="nowrap" valign="bottom">&nbsp;<font color="red"><c:out value="${msg}"/></font></td>
        <td colspan="2" nowrap="nowrap">
        <input type="submit" value="登录" id="login_button" onclick1="submitWin()"/>
        <input type="reset" value="重置" id="login_button" />
        </td>
        <input type="hidden" name="fontFile"/>
      </tr>
    </table>
    </form>
    <form id="form2" name="form2" method="post" action="<%=request.getContextPath()%>/login.do">
    <table id="cadl" width="93%" border="0" cellspacing="0" cellpadding="0" style ="width:60%; display:block; margin-top:140px; margin-left:23%;">
      <tr>
      <!-- -请不要添加默认的用户和密码  -->
        <td width="9%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">年份：</font></td>
      <%if(Globals.isMultiDataSourceDeployMode()){ %>
        <td width="23%" nowrap="nowrap">
        <select name="year">        
			<c:forEach var="loginyear"  items="${loginaCctyear}" >
			          <option value="<c:out value="${loginyear.all}"/>"><c:out value="${loginyear.acctmainbodyname}"/></option>
			</c:forEach>
        </select>
        </td>
        <td colspan="2" nowrap="nowrap">
        <input type="hidden" id="signed_data" name="signed_data"/>
        <input type="button" value="认证" id="login_button" onclick="doDataProcess()"/></td>
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
        <td colspan="2" nowrap="nowrap">
        <input type="hidden" id="signed_data" name="signed_data"/>
        <input type="button" value="认证" id="login_button" onclick="doDataProcess()"/></td>
        <%} %>
      </tr>
      	<tr>
           <td nowrap="nowrap" colspan="4">&nbsp;<input type="hidden" name="screenwidth"><input type="hidden" name="fontFile"/></td>
        </tr>
      <tr>
        <td colspan="4"  nowrap="nowrap" valign="bottom">&nbsp;<font color="red"><c:out value="${msg}"/></font></td>
      </tr>
    </table>
  </form>
  
</div>
<div id="nomalandca" style="text-align:right; width:167px; height:27px; background-image:url(../images/login/chooseaccttype.jpg); float:right; margin-right:0; z-index:10; margin-top:-2px; cursor:pointer; font-size:14px;">
<table cellpadding="0" cellspacing="0" width="100%" border="0" style="line-height:27px;">
<tr><td id="ptyh" align="center" width="83px" style="color:#555;" onclick="jumpToNomal()">普通用户</td><td id="cayh" align="center" style="color:#FFF" onclick="jumpToCA()">CA用户</td></tr>
</table>
</div>
<!--<div style="height:112px; width:400px; position:absolute; z-index:1001;left:0; bottom:0; " id="wishing">
<script>var popWishing = document.getElementById("wishing");
var bottomY = popWishing.style.bottom;
var bottomYINT = parseInt(bottomY);
popmsg()</script></div>-->
</body>

<script language="JavaScript" type="text/javascript">
    document.forms[0].screenwidth.value = window.screen.width;
    document.forms[1].screenwidth.value = window.screen.width;
	try{
	   document.forms['form1'].username.focus();
	}catch(e){}
	var fontsize = getFont("ifmisfont");

	if(fontsize!=null && fontsize!=""){
	    if(fontsize=="l"){
	         document.forms[0].fontFile.value="stylefontL.css";
	         document.forms[1].fontFile.value="stylefontL.css";
	         //setFontSession("stylefontL.css");	
	   }else if(fontsize=="m"){
	     document.forms[0].fontFile.value="stylefontM.css";
	     document.forms[1].fontFile.value="stylefontL.css";
	     //setFontSession("stylefontM.css");	
	   }else{
	      document.forms[0].fontFile.value="stylefontS.css";
	      document.forms[1].fontFile.value="stylefontL.css";
	      //setFontSession("stylefontS.css");
	   }
	}else{
	   document.forms[0].fontFile.value="stylefontS.css";
	   document.forms[1].fontFile.value="stylefontL.css";
	   //setFontSession("stylefontS.css");
	}
</script>
</html>
