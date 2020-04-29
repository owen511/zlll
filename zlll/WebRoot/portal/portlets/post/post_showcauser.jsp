<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);

	
	String styleName ="stylefontS.css";	
	if(session.getAttribute("StyleName")!=null){
		 styleName = (String)session.getAttribute("StyleName");
    }
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<meta http-equiv="X-UA-Compatible" content="IE=7" />
        <script type="text/javascript" src="<%=request.getContextPath()%>/js/scripts/jsframework.js"></script>
		<title>请选择&nbsp;<c:out value="${elementcolumn.name}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</title>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
        <link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/<%=styleName %>" />
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
		<link href="<%=request.getContextPath()%>/style/default.css"rel="stylesheet" type="text/css" />
		<base target="_self"/>
	</head>
	
	<body class="pop_body">
	<script type="text/javascript">
			var idstr='';
			var namestr='';
			
			//判断哪些用户被选中
			function closewin(){
				idstr='';
				namestr='';
				var checks = document.getElementsByName('causervalue');
				for(var i=0;i<checks.length;i++){
					
					if(checks[i].checked){
						var nameandid = checks[i].value.split('@');
						idstr=idstr+nameandid[0]+"@";
						namestr=namestr+nameandid[1]+","
					}
				}
				idstr=idstr.substring(0,idstr.length-1);
				namestr=namestr.substring(0,namestr.length-1);
				var obj=window.dialogArguments;
				obj.document.getElementById("causer_user").value = namestr;
				obj.document.getElementById("casuer_hidden").value = idstr;
				try{closeMWindow(false)}catch(e){window.close();}
			}
		
		</script>
	<form action ='<%=request.getContextPath()%>/common/post/causer.do' method='post' id='detailform' >
	<iframe name="smz" width="0" height="0" frameborder="0"style="display: none"></iframe>
		<div id="popPage">
				<div id="shenhe_title">
					<div id="shenhe_title_middle"></div>
				</div>
				<!-- c:out value="${elementcolumn.name}"/ -->
				<div id="pop_search" style="padding-bottom: 2px">
					&nbsp;<input id="sqlwhere" type="text" class="popPage_input" onpropertychange="clearCodes()"  onkeydown="javascript:if(window.event.keyCode==13){search()}" name="sqlwhere"/>
					<input id="searchbutton" type="submit"  value="查询" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
				</div>
				<div id="pop_inner">
					<%
					
						java.util.List list = (java.util.List)request.getAttribute("causerList"); 
						if(null!=list && list.size()!=0){
						for(int i=0;i<list.size();i++){
						gov.mof.fasp.ifmis.portal.portlets.post.PostCauserDTO postCauserDTO = (gov.mof.fasp.ifmis.portal.portlets.post.PostCauserDTO)list.get(i);
					%>
					<div>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox"  name="causervalue" value="<%=postCauserDTO.getUserId()%>@<%=postCauserDTO.getCode() %>"/><%=postCauserDTO.getCode() %>-<%=postCauserDTO.getName() %></div>
					<%
						}
					}
					%>
				</div>
				<input type="hidden" name="hidshua" id="hidshua" value=""/>
				</form>	
				<div id="pop_button">
					<center>
					    <input type="button" onclick="closewin()" value="确定" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />&nbsp;&nbsp;&nbsp;
						<input type="button" onclick="javascript:try{closeMWindow(false)}catch(e){window.close();}" value="取消" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
					</center>
				</div>
	</body>

</html>

