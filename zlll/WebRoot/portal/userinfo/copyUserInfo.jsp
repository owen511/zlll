<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);

	String rootPath = request.getContextPath();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 6.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
	<script type="text/javascript"
		src="<%=request.getContextPath()%>/js/prototype.js"></script>
	<script type="text/javascript">
	var ROOT_PATH = '<%=request.getContextPath()%>';
	String.prototype.trim = function(){
		return this.replace(/(^\s*)|(\s*$)/g,"");
	}
	</script>
	<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
	<head>
		<title>用户复制</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">

		<link href="<%=rootPath%>/style/ifmis_style.css" rel="stylesheet"
			type="text/css" />
		<link rel="stylesheet" type="text/css"
			href="<%=rootPath%>/style/calendar.css" />
			<link rel="stylesheet" type="text/css" href="<%=rootPath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
		<script type="text/javascript" src="<%=rootPath%>/js/choose.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/js/changescroll.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/js/calendar.js"></script>
		<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
		<script src="<%=request.getContextPath()%>/js/formatNumber.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/ajaxfunc.js"></script>

		<script type="text/javascript">	    
    	function checkUserCode(){
			var formObject = $("form1");
			var code = formObject.code.value.trim();
			var url = "<%=request.getContextPath()%>/portal/userinfo/checkUserCode.do";
			if(null != code && "" != code){
				var pars = "code="+code;
		    	var myAjax = new Ajax.Request(
		                    url,
		                    {method: 'post', parameters: pars, onComplete: checkUserCodeResult}
		                    );
			}
		}
		
		function checkUserCodeResult(request){
			eval("var isHave = " + request.responseText);
			if(isHave == true){
				alert("此用户编码已经存在，请输入其它编码！");
				var code = document.getElementById("code");
				code.value = "";
				code.focus();
			}
		}
		
		function doCopy(){
			var formObject = $("form1");
		    if(checkInput(formObject)){
			    formObject.submit();
		    }
		}
		
		function checkInput(formObject){
			if(formObject.code.value.trim() == ""){
				alert("请输入用户编码!");
				return false;
			}
			if(formObject.name.value.trim() == ""){
				alert("请输入用户名称!");
				return false;
			}
			if(formObject.password.value.trim() == ""){
				alert("请输入用户密码!");
				return false;
			}
			if(formObject.password.value != formObject.password2.value){
				alert("核对密码同用户密码不相等，请重新输入!");
				return false;
			}
			return true;
		}
		
		//错误提示
		function loadError(){
			var error = '<c:out value="${error}"/>';
			if("" != error ){
				alert(error);
			}
		}
		loadError();
		</script>
	</head>
	<body class="pop_body">
		<form id="form1" name="form1" method="post"
			action="<%=request.getContextPath()%>/portal/userinfo/copy.do">
			<div id="popPage">
				<div id="shenhe_title">
					<div id="shenhe_title_middle"></div>
				</div>
				<div id="pop_inner2">
					<div id="form_table_title">
						<ul>
							<li class="top">
								<div>
									设置
								</div>
							</li>
						</ul>
					</div>
					<div style="margin-left:0px; margin-top:0px;" id="edit_table">
						<table width="100%" cellspacing="0" cellpadding="0">
							<tr>
								<th nowrap="nowrap"
									style="border-bottom:1px #CCCCCC  dotted; border-right:0px;width:15%;">
									来源用户
								</th>
								<td nowrap="nowrap"
									style="border-bottom:1px #CCCCCC  dotted; border-left:0px; text-align:center;">
									<input type="text" style="background-color:#CBDAF2"
										value="<c:out value='${userViewDTO.code}'/>--<c:out value='${userViewDTO.name}'/>"
										style="width:80%;" readonly/>
									<input type="hidden" id="userid" name="userid" value="<c:out value='${userViewDTO.userid}'/>"/>
								</td>
							</tr>
							<tr>
								<td nowrap="nowrap" style="border-right:0px;">
									用户编码
									<span >*</span>
								</td>
								<td nowrap="nowrap" style="text-align:center;border-left:0px;">
									<input type="text" id="code" name="code" onchange="checkUserCode()" style="width:80%;"/>
								</td>
							</tr>
							<tr>
								<td nowrap="nowrap" style="border-right:0px;">
									用户名称
									<span >*</span>
								</td>
								<td nowrap="nowrap" style="text-align:center;border-left:0px;">
									<input type="text" id="name" name="name" style="width:80%;"/>
								</td>
							</tr>
							<tr>
								<td nowrap="nowrap" style="border-right:0px;">
									用户密码
									<span >*</span>
								</td>
								<td nowrap="nowrap" style="text-align:center;border-left:0px;">
									<input type="password" id="password" name="password" style="width:80%;"/>
								</td>
							</tr>
							<tr>
								<td nowrap="nowrap" style="border-right:0px;">
									核对密码
									<span >*</span>
								</td>
								<td nowrap="nowrap" style="text-align:center;border-left:0px;">
									<input type="password" id="password2" name="password2" style="width:80%;"/>
								</td>
							</tr>
						</table>


					</div>
				</div>

				<CENTER>
					<INPUT type="button" class="button_style"
						onmouseover="this.className='OverBtn'"
						onmouseout="this.className='button_style'"
						onmousedown="this.className='down'" value="确定"
						onclick="doCopy()" />
					<INPUT type="button" class="button_style"
						onmouseover="this.className='OverBtn'"
						onmouseout="this.className='button_style'"
						onmousedown="this.className='down'"
						onclick="javascript:window.close()" value="取消" />
				</CENTER>
			</div>
		</form>
	</body>
</html>
