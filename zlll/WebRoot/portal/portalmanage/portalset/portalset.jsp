<%@ page contentType="text/html; charset=GBK"%>
<jsp:directive.page import="java.util.List" />
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<link type="text/css" rel="stylesheet"
	href="<%=request.getContextPath()%>/style/style.css" />
<link type="text/css" rel="stylesheet"
	href="<%=request.getContextPath()%>/style/dtree.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/dtree.js"></script>
<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
<script src="<%=request.getContextPath()%>/js/tbajax.js"></script>
<div style="width: 98%;">
	<!-- InstanceBeginEditable name="EditRegion8" -->
<script>
function init(){
	var portal_control='<%=request.getAttribute("portal_control").toString() %>';
	var bulletin_control='<%=request.getAttribute("bulletin_control").toString() %>';
	var show_menus_control='<%=request.getAttribute("show_menus_control").toString() %>';
	var portal_ca_control = '<%=request.getAttribute("portal_ca_control").toString() %>'
	var portal_ca_appid = '<%=request.getAttribute("portal_ca_appid").toString() %>'
	var portal_ca_authurl = '<%=request.getAttribute("portal_ca_authurl").toString() %>'
	var CA_loginfail_control = '<%=request.getAttribute("CA_loginfail_control").toString() %>'
	var portal_userlogincontrol = '<%=request.getAttribute("portal_userlogincontrol").toString() %>'
	var Intranet_config ='<%=request.getAttribute("Intranet_config")%>'
	$('isportal').value=portal_control;
	 if(portal_ca_control==1)
    {
    	$("appid").disabled=false;
		$("authurl").disabled=false;
		$("isloginfail").disabled=false;
    }
	$('isbulletin').value=bulletin_control;
	$('ismultirow').value=show_menus_control;
	$('isca').value = portal_ca_control;
	$('appid').value = portal_ca_appid;
	$('authurl').value = portal_ca_authurl;
	$('isloginfail').value = CA_loginfail_control;
	if(Intranet_config=='null')
	{
		$('isintranet').value = 0;
		$('intranet').value = "";
	}
	else
	{
		$('isintranet').value = 1;
		$('intranet').value = Intranet_config;
		$("intranet").disabled=false;
	}
	$('userlogincontrol').value = portal_userlogincontrol;
}
function changeCavalue()
{
	if($('isca').value==1){
		$("appid").disabled=false;
		$("authurl").disabled=false;
		$("isloginfail").disabled=false;
	}
	else{
		$("appid").disabled=true;
		$("authurl").disabled=true;
		$("isloginfail").disabled=true;
	}
}
function changeIntranet()
{
	if($('isintranet').value==1){
		$("intranet").disabled=false;
	}
	else{
		$("intranet").disabled=true;
	}
}
function saveQuit()
{
   var CA_loginfail_control = document.getElementById("isloginfail").value;
   $("detailform").action="<%=request.getContextPath()%>/portal/portalset/save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
   $("detailform").submit();
}
<%String msg=(String)session.getAttribute("msg");
  if(msg!=null&&msg.equals("true"))
  {
  %>
  alert("保存成功");
  <%}if(msg!=null&&msg.equals("false")){%>
  alert("保存失败");
  <%}
  session.removeAttribute("msg");
  %>
</script>
<body onload='init()'>
<form name="detailform" id="detailform" action="#" method="post" >
	   <div id="form_table_title">
			<ul>
				<li id="zx" class="top" >
					<div>
						配置信息
					</div>
				</li>
			</ul>
		</div>
		<div id="edit_table">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
				   <td nowrap="nowrap">
						是否部署多个服务
					</td>
					<td nowrap="nowrap">
						<select id="isportal" name="isportal">
							<option value="0">否</option>
							<option value="1">是</option>
						</select>
					</td>
					<td nowrap="nowrap">
						是否使用公告栏
					</td>
					<td nowrap="nowrap">
					    <select id="isbulletin" name="isbulletin">
							<option value="0">不使用</option>
							<option value="1">使用</option>
						</select>
					</td>
					<td nowrap="nowrap">
						菜单单行显示多行显示
					</td>
					<td nowrap="nowrap">
						<select id="ismultirow" name="ismultirow">
							<option value="0">单行</option>
							<option value="1">多行</option>
						</select>
					</td>					
				</tr>
				<tr>
					<td nowrap="nowrap">
						是否使用CA
					</td>
					<td nowrap="nowrap">
						<select id="isca" name="isca" onchange="changeCavalue()">
							<option value="0">不使用</option>
							<option value="1">使用</option>
						</select>
					</td>
					<td nowrap="nowrap">
						CA应用标识
					</td>
					<td nowrap="nowrap">
					<input type="text" id="appid" name="appid" disabled/>
					</td>
					<td nowrap="nowrap">
						CA网关认证地址
					</td>
					<td nowrap="nowrap">
					<input type="text" id="authurl" name="authurl" disabled/>
					</td>
				</tr>
				<tr>
					<td nowrap="nowrap">
						CA登录失败后跳转的页面
					</td>
					<td nowrap="nowrap">
						<select id="isloginfail" name="isloginfail" disabled>
							<option value="0">跳转到用户名密码登录页面</option>
							<option value="1">跳转到CA登录页面</option>
						</select>
					</td>
					<td nowrap="nowrap">
						是否使用内网
					</td>
					<td nowrap="nowrap">
					<select id="isintranet" name="isintranet" onchange="changeIntranet()">
					<option value="0">不使用</option>
					<option value="1">使用</option>
					<input type="hidden" id="intranet" name="intranet"/>
					</td>
					<td nowrap="nowrap">
						登录时是否判断用户登录方式
					</td>
					<td nowrap="nowrap">
					<select id="userlogincontrol" name="userlogincontrol">
					<option value="0">不使用</option>
					<option value="1">使用（type=1）</option>
					<option value="2">使用（type=2）</option>
					</td>
				</tr>
			</table>
		</div>
		<div id="confirm_exit_btn"> 
		<input type="button" id="saveAndOut" name="save"  value="保存并退出" onclick="saveQuit()" class="button_style"/>
		</div>
</form>
</body>

