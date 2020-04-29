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
	id="JITDSignOcx" width="0" codebase="./portal/JITDSign.cab#version=2,0,24,13"></object>
<OBJECT id="iTrusPTA" codeBase=="../PTADLL/iTrusPta.cab#version=2.4.2.471" classid="clsid:1E0DFFCF-27FF-4574-849B-55007349FEDA">
</OBJECT>
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
background-color:#40D0E8;
background-image:url(../../ifmis_images/login/20090930/body_bg.png);
background-repeat:repeat-x;
background-position:left top;

}
.div_bg{
height:768px;
width:100%;
background-image:url(../../ifmis_images/login/20091110/div_bg_three.jpg);
background-position:center center;
background-repeat:no-repeat;
}
.login_bg{
background-image:url(../../ifmis_images/login/20091110/login_bg.jpg);
background-position:center center;
background-repeat:no-repeat;
height:349px;
width:99%;
margin-top:172px;
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
height:16px;
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
background-image:url(../../ifmis_images/bg/gonggao_div.gif);
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
right:0; 
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
.download_over{
z-index:10; 
position:absolute; 
top:0;
right:0; 
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
	//定义2个全局变量证书集合，一个证书集合，一个当前选定的证书
	var Certs;
	var CurCert;
	OUTPUT_BASE64				= 0x04;
	window.status="Copyright (C) 2011 安徽省财政厅";
	//拆分主题得到用户名+电子邮件组合体
	function spitSubject(Subject)
	{
	 var sub_email="";
	 var sub_id=Subject.split(",");
	 for(var i=0;i<sub_id.length;i++)
	 {
	    var get_i=sub_id[i].indexOf("E=")
		if(get_i>0)
		{
		 sub_email=sub_id[i].substring(get_i+2);
		}
	 }
	  return sub_email;
	}
	//页面载入的时候用来显示证书列表
	function refresh1()
	{
		debugger;
	     Certs=null;
	     document.getElementById("select1").innerText =""
		 CertFilter =iTrusPTA.Filter;
		 CertFilter.Issuer="O=GuangXi Certificate Authority Ltd., OU=For Intranet Using, CN=Guangxi Individual CA for Intranet";
	     Certs=iTrusPTA.MyCertificates;
		for(i=1;i<=Certs.Count;i++)
		{
		 if(i==1)
		 {
		   form1.pk.value=Certs.item(i).CommonName+spitSubject(Certs.item(i).Subject);
		 }
		   opt=document.createElement("OPTION");
		   form1.select1.options.add(opt);
		   opt.innerText=Certs.item(i).CommonName;
		   opt.value=i;
		   
		} 
	}
	//进行签名提交目的是不让人篡改
function signvalue()
{
	debugger;
	if (Certs.Count == 0) 
	{
      alert("没有查找到证书");
	  return false;
	}
	 CurCert=Certs.item(form1.select1.value);
	 form1.pk.value=CurCert.CommonName+spitSubject(CurCert.Subject);
	try
	{
		form1.Sign_value.value = CurCert.SignMessage(form1.pk.value,OUTPUT_BASE64);
		document.forms[0].action = "glauthen.do";
		document.forms[0].submit();
		document.forms[0].action = "login.do";
	}
	catch(Exception)
	{
	  alert("签名失败");
	   return false;
	}
}
	
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
		refresh1();
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
    <td align=center><div>公告栏</div></td>
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
   <div class="login_bg">
   	 <form id="form1" name="form1" autocomplete="off" method="post" action="<%=request.getContextPath()%>/login.do">
	    <table width="480px" border="0" style="margin-top:220px; font-size:14px;">
	      <tr width="380px">
	      <!-- -请不要添加默认的用户和密码  -->
	      <% String isportalca = (String)session.getAttribute("isportalca");
	         String issuccess = (String)session.getAttribute("isSuccess");
	         String iscaloginfail=(String)session.getAttribute("iscaloginfail");
	         if(isportalca.equalsIgnoreCase("false")||(iscaloginfail.equals("false")&&issuccess!=null&&isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("false"))){
	      %>
	        <td nowrap="nowrap" align="left" width="50px" nowrap="nowrap">19用户：</td>
	        <td nowrap="nowrap" width="50px" align="left" ><input type="text" name="username" value="" class="input_style"/></td>
	        <td nowrap="nowrap" width="50px" align="left" nowrap="nowrap">密码：</td>
	        <td nowrap="nowrap" width="50px" align="left"><input type="password" name="password" value="" class="password_style"/></td>
	        <% }else{
	            %>
	            <input name="pk" type="hidden"  >
				<input name="Sign_value" type="hidden"  >
	            <td nowrap="nowrap" width="50px" align="right" nowrap="nowrap">证书：
	            </td><td nowrap="nowrap" width="100px" align="right" nowrap="nowrap">
	            <select name="select1" id="select1" >
    			</select></td>
	            <%
	        }%>
	         <td nowrap="nowrap" width="50px" align="right" nowrap="nowrap">年份：</td>
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
	        <input type="button" value="认证" id="login_button" onclick="signvalue()"/></td>
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
	        <input type="button" value="认证" id="login_button" onclick="signvalue()"/></td>
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
<p style="font-size:12px; color:#FFFFFF; text-align:right; width:480px; line-height:15px; height:15px;">Copyright (C) 2011 安徽省财政厅</p>
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
