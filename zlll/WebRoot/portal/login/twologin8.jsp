<%@ page language="java" contentType="text/html; charset=GBK" import ="gov.mof.fasp.Globals,java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<style>
  body,form{padding:0;margin:0;}
  input{padding:0;margin:0;height:15px; width:59px;font-size:12px;line-height:15px; margin-right:1px;}
  #login_button {
	border: 0px;
	text-align: center;
	padding-top: 3px;
	width:45px;
	height:20px;
	background-image: url(../../images/login/login_btn.gif);
	cursor:pointer;
  }
</style>
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

<script type="text/javascript" src="<%=request.getContextPath()%>/js/template.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/prototype.js"></script>
<script language="JavaScript" type="text/javascript">
	window.status="Copyright&copy; 2008 Longtu Software Co.,Ltd.All rights reserved." 
	
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
		//----
		document.forms[0].action = "authen.do";
		document.forms[0].submit();
		document.forms[0].action = "login.do";
	}
</script>
</head>
<body style="background-color:#FFFFFF;">

<div style="text-align:center;display:block;height:78px; width:190px; font-size:12px; border:1px #ccc solid; background:url(<%=request.getContextPath()%>/images/login/small_login.gif); background-repeat:repeat; background-position:left top;">
  <form id="form1" name="form1" method="post" target="_blank" action="<%=request.getContextPath()%>/login.do">
    <table border="0" cellspacing="0" cellpadding="0" style ="width:99%; display:block; height:78px;">
      <tr>
      <!-- -请不要添加默认的用户和密码  -->
      <% String isportalca = (String)session.getAttribute("isportalca");
         String issuccess = (String)session.getAttribute("isSuccess");
         String iscaloginfail=(String)session.getAttribute("iscaloginfail");
         //if(isportalca.equalsIgnoreCase("false")||(iscaloginfail.equals("false")&&issuccess!=null&&isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("false"))){
	    %>
        <td width="8%" align="right" nowrap="nowrap"><font color="#000">t8用户：</font></td>
        <td width="25%" nowrap="nowrap" colspan="4" align="left"><input type="text" name="username" value=""/></td>
        <td width="10%" align="right" nowrap="nowrap" style="top_color"><font color="#000">密码：</font></td>
        <td width="25%" nowrap="nowrap" colspan="4" align="left"><input type="password" name="password" value=""/></td>
        </tr>
        <tr>
        <% //}%>
        <!-- 宁夏集中登录地区选择 -->
        <c:if test="${isArea=='1'}">
        <!-- 宁夏总门户的服务器地址 -->
        <td width="9%" align="right" nowrap="nowrap" style="top_color;" ><font color="#ffffff">地区：</font></td>
	        <td width="15%" nowrap="nowrap">
	        <select name="area" id="area">
	        	<option>1</option>
	        </select>
	        </td>
        </c:if>
         <!-- 宁夏集中登录地区选择结束  -->
         
        <td width="9%" align="right" nowrap="nowrap" style="top_color"><font color="#000">年份：</font></td>
      <%if(Globals.isMultiDataSourceDeployMode()){ %>
        <td width="23%" nowrap="nowrap" align="left" colspan="10">
        <select name="year" onchange="year2AreaSelect();">        
			<c:forEach var="loginyear"  items="${loginaCctyear}" >
			          <option value="<c:out value="${loginyear.all}"/>"><c:out value="${loginyear.acctmainbodyname}"/></option>
			</c:forEach>
        </select>
        </td>
        <% //if((isportalca.equalsIgnoreCase("true")&&issuccess==null)||(isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("true"))||(isportalca.equalsIgnoreCase("true")&&iscaloginfail.equals("true")&&issuccess.equals("false"))){%>
        <td colspan="2" nowrap="nowrap" style="display:none;">
        <input type="hidden" id="signed_data" name="signed_data"/>
        </td>
        <%//} %>
        <%}else{%>
        <td width="23%" nowrap="nowrap" colspan="10">
        <select name="loginacctyear">        
			<c:forEach var="loginacctyear"  items="${loginaCctyear}" >
			          <option value="<c:out value="${loginacctyear}"/>"><c:out value="${loginacctyear}"/></option>
			</c:forEach>
        </select>
        </td>
        <td width="9%" align="right" nowrap="nowrap" style="top_color"><font color="#000">财政：</font></td>
        <td width="23%" nowrap="nowrap">
        <select name="logingovid">        
			<c:forEach var="logingovid"  items="${loginGovid}" >
			          <option value="<c:out value="${logingovid.govid}"/>"><c:out value="${logingovid.name}"/></option>
			</c:forEach>
        </select>
        </td>
        <% //if((isportalca.equalsIgnoreCase("true")&&issuccess==null)||(isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("true"))||(isportalca.equalsIgnoreCase("true")&&iscaloginfail.equals("true")&&issuccess.equals("false"))){%>
        <td colspan="2" nowrap="nowrap">
        <input type="hidden" id="signed_data" name="signed_data"/>
        </td>
        <%//} %>
        <%} %>   
        </tr>
        <tr>    
        <td colspan="10" nowrap="nowrap" align="center">
        <input type="submit" value="登录" id="login_button" onclick1="submitWin()"/>
        <input type="button" value="CA认证" id="login_button" onclick="doDataProcess()"/>
        </td>
        <input type="hidden" id="fontFile" name="fontFile"/>
      </tr>
            <tr style="display:none;">
      <%if(isportalca.equalsIgnoreCase("true")&&issuccess==null ||(isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("true"))||(isportalca.equalsIgnoreCase("true")&&iscaloginfail.equals("true")&&issuccess.equals("false"))){ %>  

        <td nowrap="nowrap" colspan="4" style="display:none">&nbsp;<input type="hidden" name="screenwidth"></td>
      <%}else{ %>
           <td nowrap="nowrap" colspan="6">&nbsp;<input type="hidden" name="screenwidth"></td>

      <%} %>  
      <!-- 判断返回信息是否为空，如果为空，进行弹出提示 -->
      	<%String msg = (String)request.getAttribute("msg"); 
      	%>
      	<td><input type="hidden" name="msg" value="<%=msg %>"></td>
      	<%
      		if(msg!=null&&!"".equals(msg)){%>
      			<script language="JavaScript" type="text/javascript">
      			var msg = document.forms[0].msg.value;
      			if(msg!=null){
      				alert(msg);
      				window.close();
      			}
      			</script>
      			<%
      		}
      	%>
        </tr>
        <tr>
 
      </tr>
    </table>
  </form>
</div>
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
</html>
