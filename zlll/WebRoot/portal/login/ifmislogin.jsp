<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
Calendar c = Calendar.getInstance();
String currYear = String.valueOf(c.get(Calendar.YEAR));
//-------------解析新疆单点登录
String taskURL = (String)request.getAttribute("taskURL");// 待办事项地址
String appCode = request.getAttribute("appCode") + "";
String appGuid = request.getAttribute("appGuid") + "";
String userGuid = request.getAttribute("userGuid") + "";
String jsessionid = request.getAttribute("JSESSIONID") + "";
String key = request.getAttribute("_key") + "";
String pserver = (String)request.getAttribute("pserver");

String loginacctyear=(String)request.getAttribute("loginacctyear");
String logingovid=(String)request.getAttribute("logingovid");
List loginYearsList=new ArrayList();

String year=(String)request.getAttribute("year");

//年度的选择
if(null!=request.getAttribute("loginYears")){
	loginYearsList=(List)request.getAttribute("loginYears");
}
//年度跳转参数
String isArea="0";
if(request.getAttribute("isArea")!=null&&!((String)request.getAttribute("isArea")).equals("")) {
	isArea = (String)request.getAttribute("isArea");
}
//年度跳转地址
String loginAreaUrls="";
if(request.getAttribute("loginAreaUrls")!=null) {
	loginAreaUrls = (String)request.getAttribute("loginAreaUrls");
}
%>
<script language="JavaScript" type="text/javascript">
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
			submitfunc();
		}
	}
</script>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>新疆单点登录</title>
    <style>
	body{
	text-align:center;
	background-color:#E6F5FF
	}
	 #login_button {
	border: 0px;
	text-align: center;
	padding-top: 3px;
	width: 70px;
	height: 20px;
	background-image: url(../../images/buttons/login_button.gif);
  }
	</style>
  </head>
  <body style="background-color:#FFFFFF;" onkeypress="onkeyEnter(event)" >
<div style="margin-top:12%; background-image:url(<%=request.getContextPath()%>/images/bg/font.gif); background-repeat:no-repeat; background-position:left; height:50px; "></div>
<div id="login1" style="display:block; background-image:url(<%=request.getContextPath()%>/images/bg/ifmis_login_bg.gif); background-repeat:no-repeat;height:221px; width:100%; margin-top:2%; background-position:left; font-size:14px;">
 	 <form id="form1" name="form1" autocomplete="off" method="post" action="<%=basePath%>/ifmislogin.do">
	    <div id="test">
		    <input type="hidden" name="taskURL" value="<%=taskURL%>"/>
			<input type="hidden" name="appCode" value="<%=appCode%>"/>
			<input type="hidden" name="appGuid" value="<%=appGuid%>"/>
			<input type="hidden" name="userGuid" value="<%=userGuid%>"/>
			<input type="hidden" name="JSESSIONID" value="<%=jsessionid%>"/>
			<input type="hidden" name="_key" value="<%=key%>"/>
			<input type="hidden" name="pserver" value="<%=pserver%>"/>
			<input type="hidden" name="loginacctyear" value="<%=loginacctyear%>"/>
			<input type="hidden" name="logingovid" value="<%=logingovid%>"/>
			<input type="hidden" name="year" value="<%=year%>"/>
	    </div>
	    <div>
	      <table width="93%" border="0" cellspacing="0" cellpadding="0" style ="width:60%; display:block; margin-top:140px; margin-left:23%;">
			    <tr>
			    	<td colspan="3" align="center" style="height:50px;font-weight: 800">请选择财政年度:</td>
			    <%
			    for (int i = 0; i < loginYearsList.size(); i++) {
			    	HashMap map = (HashMap) loginYearsList.get(i);
			    	String year_tem = (String) map.get("acctyear");
			    	String year_val_all = (String) map.get("all");
			    %>
			    <td><input type="radio" name="chooseyear" value="<%=year_val_all%>" /></td><td colspan="2" ><%=year_tem %>年</td>
			    <% 
			    }
			    %>
			    	<td colspan="3" align="center">
			    		<input type="button"  value="进入系统" id = "login_button" onclick="submitfunc()"/>&nbsp;&nbsp;&nbsp;
			    	</td>
			    </tr>
		    </table>
		    <input type = hidden id = "selyear" name = "selyear" value = "">
	    </div>
    </form>
    </div> 
  </body>
</html>
<script type="text/javascript">
	function submitfunc(){
		var result = selRadioValue();
		if(""==result){
			return;
		}
		//如果使用多年度跳转
		if("3"=='<%=isArea%>'){
			var loginAreaUrls = eval('<%=loginAreaUrls%>');
			for(var i = 0;i < loginAreaUrls.length;i ++){
				if(result.indexOf(loginAreaUrls[i].year)!=-1){
					result = loginAreaUrls[i].inditext;
					document.forms[0].action="http://"+loginAreaUrls[i].url+"/ifmislogin.do";
					break;
				}
			}
		}
		document.getElementById("selyear").value=result;
		document.forms[0].submit();
	}
	
	function selRadioValue(){
		var selectRadio=document.getElementsByName("chooseyear");
		var val='';
		for(var i=0;i<selectRadio.length;i++){
			if(selectRadio[i].checked){
				val=selectRadio[i].value;
				return val;
			}
		}
		alert('请选择财政年份');
		return "";
	}
	
	function onloadInfor(){
		var selectRadio=document.getElementsByName("chooseyear");
		var val='';
		for(var i=0;i<selectRadio.length;i++){
			val=selectRadio[i].value;
			if(val.indexOf('<%=currYear%>')>=0){
				selectRadio[i].checked=true;
			}
		}
	}
	onloadInfor();
	
	/*
	//登录
	function submitfunc(){
		var result = selRadioValue();
		if(""==result){
			return;
		}
		var arguments = eval('('+window.dialogArguments+')');
		var loginAreaUrls = arguments.loginAreaUrls;
		for(var i = 0;i < loginAreaUrls.length;i ++){
			if(result.indexOf(loginAreaUrls[i].year)!=-1){
				result = loginAreaUrls[i].inditext;
				document.forms[0].action="http://"+loginAreaUrls[i].url+"/ifmislogin.do";
				break;
			}
		}
		document.getElementById("selyear").value=result;
		document.forms[0].submit();
		window.close();
	}
	
	function onloadInfor(){
		var arguments = eval('('+window.dialogArguments+')');debugger;
		var args = arguments.loginYears;
		var yearHtml = ['<table>'];	
		for(var i=0;i<args.length;i++){
			var year = args[i];
			yearHtml.push('<tr><td>');
			yearHtml.push('<input type="radio" name="chooseyear" value="'+year.all+'" /></td><td>'+year.acctyear+'年</td>');
			yearHtml.push('</td></tr>');
		}
		yearHtml.push('</table>');
		document.getElementById("selloginyear").innerHTML=yearHtml.join('');
	}
	*/
</script>
