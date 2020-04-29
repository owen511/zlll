<%@ page language="java" contentType="text/html; charset=GBK"
	import="gov.mof.fasp.Globals" pageEncoding="GBK"%>
<%@page import="gov.mof.fasp.ifmis.portal.portlets.post.PostDTO"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ page import="java.util.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<%
			String original = null;
			if (request.getAttribute("original") != null) {
				original = (String) request.getAttribute("original");
			}
		%>
		<OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar"
			CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB"
			codebase="common/flyie.cab#version=1,0,0,0" VIEWASTEXT>
			<PARAM NAME="ToolBar" VALUE="0">
			<PARAM NAME="StatusBar" VALUE="1">
			<PARAM NAME="MenuBar" VALUE="0">
		</OBJECT>


		<object classid="clsid:707C7D52-85A8-4584-8954-573EFCE77488"
			id="JITDSignOcx" width="0"
			codebase="./JITDSign.cab#version=2,0,24,13"></object>
		<title>福建财政管理一体化信息系统</title>
		<style>
body {
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	text-align: center;
	background-color: #40D0E8;
	background-image: url(../../ifmis_images/festival/specialOne/body_bg.png);
	background-repeat: repeat-x;
	background-position: left top;
}

form {
	margin: 0;
	padding: 0;
}

.div_bg {
	height: 768px;
	width: 100%;
	background-image: url(../ifmis_images/festival/specialOne/div_bg_three1.jpg);
	background-position: center center;
	background-repeat: no-repeat;
}

.login_bg {
	background-image: url(../../ifmis_images/festival/specialOne/login_bg_fj.png);
	background-position: center center;
	background-repeat: no-repeat;
	height: 349px;
	width: 99%;
	margin-top: 172px;
	color: #9C5C00;
	font-weight: bold;
	font-size: 14px;
}

.login_btn {
	border: 0;
	background-image:
		url(../../ifmis_images/festival/specialOne/login.gif);
	background-position: center center;
	background-repeat: no-repeat;
	height: 28px;
	width: 78px;
	text-align: center;
	font-size: 14px;
	color: #000000;
	cursor: pointer;
}

.reset_btn {
	border: 0;
	background-image: url(../../ifmis_images/festival/specialOne/reset.gif);
	background-position: center center;
	background-repeat: no-repeat;
	height: 28px;
	width: 78px;
	text-align: center;
	font-size: 14px;
	color: #000000;
	cursor: pointer;
}

.safe_btn {
	border: 0;
	background-image: url(../ifmis_images/festival/specialOne/safe_login.gif);
	background-position: center center;
	background-repeat: no-repeat;
	height: 28px;
	width: 78px;
	text-align: center;
	font-size: 14px;
	color: #000000;
	cursor: pointer;
}

.btn_over {
	border: 0;
	background-image: url(../../ifmis_images/login/20090921/btn_over.png);
	background-position: center center;
	background-repeat: no-repeat;
	height: 53px;
	width: 53px;
	text-align: center;
	font-size: 14px;
	color: #000000;
	cursor: pointer;
	font-weight: 900;
}

.input_style {
	height: 16px;
	width: 110px;
	padding-left: 2px;
	line-height: 16px;
	font-size: 14px;
	background-color: none;
}

.password_style {
	height: 16px;
	width: 110px;
	padding-left: 2px;
	line-height: 16px;
	font-size: 14px;
	background-color: none;
}

.input_style_end {
	height: 16px;
	line-height: 16px;
	padding-left: 2px;
	font-size: 14px;
}

#chooseyear {
	filter: alpha(opacity =       80);
	-moz-opacity: 0.5;
	opacity: 0.5;
}

#chooseyear div {
	height: 20px;
	width: 90px;
	padding-left: 10px;
}

.gonggao_div {
	z-index: 1000;
	position: absolute;
	background: #fff;
	height: 200px;
	width: 360px;
	background-image: url(../../ifmis_images/festival/specialOne/gonggao_div1.gif);
	background-repeat: no-repeat;
	background-position: left top;
	font-size: 12px;
	/*left:10px;
top:10px;*/
	bottom: 0;
	right: 0;
}

.gonggao_div div {
	font-size: 12px;
	height: 25px;
	line-height: 25px;
}

.gonggao {
	border-bottom: 1px #ccc dotted;
	height: 25px;
	line-height: 25px;
}

.download {
	z-index: 10;
	position: absolute;
	top: 0;
	right: 0;
	background-image: url(../../ifmis_images/festival/specialOne/xiazai2.gif);
	height: 128px;
	width: 128px;
	background-repeat: no-repeat;
	color: #FFF;
	font-size: 14px;
	cursor: pointer;
	filter: alpha(opacity =       100);
	-moz-opacity: 0.8;
	line-height: 128px;
	font-weight: bold;
	text-align: center;
	display: none;
}

.download_over {
	z-index: 10;
	position: absolute;
	top: 0;
	right: 0;
	background-image: url(../../ifmis_images/festival/specialOne/xiazai2.gif);
	height: 128px;
	width: 128px;
	background-repeat: no-repeat;
	color: #FFF;
	font-size: 14px;
	cursor: pointer;
	filter: alpha(opacity =       80);
	-moz-opacity: 0.8;
	line-height: 128px;
	font-weight: bold;
	text-align: center;
}

.download a:link {
	color: #FFF;
	text-decoration: none;
}

.download a:visited {
	color: #FFF;
}

.download a:hover {
	color: #FFF;
}

.download a:active {
	color: #FFF;
}

.download_over a:link {
	color: #FFF;
	text-decoration: none;
}

.download_over a:visited {
	color: #FFF;
}

.download_over a:hover {
	color: #FFF;
}

.download_over a:active {
	color: #FFF;
}

.choose_acc {
	color: #FFF;
	text-align: center;
	font-size: 12px;
	font-weight: normal;
	width: 105px;
	text-align: center;
	float: left;
}

.download a:link {
	color: #FFF;
	text-deco
}

.ca_style {
	width: 211px;
	height: 26px;
	background-image: url(../ifmis_images/festival/specialOne/ca_login.gif);
	background-position: top center;
	background-repeat: no-repeat;
	color: #FFF;
	text-align: left;
	line-height: 26px;
	cursor: pointer;
}

.nomal_style {
	width: 211px;
	height: 26px;
	background-image: url(../ifmis_images/festival/specialOne/nomal_login.gif);
	background-position: top center;
	background-repeat: no-repeat;
	color: #FFF;
	text-align: left;
	line-height: 26px;
	cursor: pointer;
}
</style>


		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/prototype.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/template.js"></script>
		<script language="JavaScript" type="text/javascript">
	window.status="Copyright (C) 2011 福建省财政厅";
	
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
		document.forms[0].screenwidth.value = window.screen.width;
		document.forms[1].screenwidth.value = window.screen.width;
		document.forms[1].action = "authen.do";
		document.forms[1].submit();
	}
	
	function jumpToNomal(){
		document.getElementById("nomalandca").className = "nomal_style"; 
		document.getElementById("ptdl").style.display = "block"; 
		document.getElementById("cadl").style.display = "none"; 
	}
	function jumpToCA(){
		document.getElementById("nomalandca").className = "ca_style";
		document.getElementById("ptdl").style.display = "none"; 
		document.getElementById("cadl").style.display = "block"; 
	}
</script>
	</head>
	<body class="body_bg">
		<%
			String isbulletin = (String) request.getAttribute("isbulletin");
			if (isbulletin.equals("true")) {
		%>
		<div class="gonggao_div" id="gonggao_div" style="display: block;">
			<table width="100%" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td align=center>
						<div>
							公告栏
						</div>
					</td>
					<td onclick="closeGonggao()" style="width: 30px; cursor: pointer;"
						title="关闭">
						&nbsp;
					</td>
				</tr>
			</table>
			<marquee direction=up scrollamount=1 scrolldelay=50
				onmouseover="stop()" onmouseout="start()"
				style=" cursor:pointer; color:#000000; height:150px; margin:20px 20px 0 20px;">
			<%
				if (session.getAttribute("postList") != null) {
						List postList = (List) session.getAttribute("postList");
						for (int i = 0; i < postList.size(); i++) {
							PostDTO post = (PostDTO) postList.get(i);
			%>
			<div class="gonggao">
				<img src="../images/done_btn/news.gif" />
				<a onclick='preview("<%=post.getId()%>")'> <%
 	if (Integer.parseInt(post.getPostlevel()) == 3) {
 %> <font color=red> <%=post.getPosttitle()%> </font> <%
 	} else {
 %> <%=post.getPosttitle()%> <%
 	}
 %> </a> (
				<%=post.getCreatetime()%>
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
		<%
			}
		%>
		<div class="div_bg">
			<div class="login_bg">
				<form id="form1" name="form1" method="post"
					action="<%=request.getContextPath()%>/login.do">
					<table id="ptdl" width="469px" border="0" cellpadding="0"
						cellspacing="0"
						style="display: none; margin-top: 190px; font-size: 14px;">
						<tr width="380px" style="line-height: 25px;">

							<!-- -请不要添加默认的用户和密码  -->
							<td nowrap="nowrap" align="left" width="70px">用户编码</td>
							<td nowrap="nowrap"  align="left">
								<input type="text" name="username" value="" class="input_style" />
							</td>
							<td nowrap="nowrap" width="70px" align="left">&nbsp;用户密码</td>
							<td nowrap="nowrap" align="left">
								<input type="password" name="password" value=""
									class="password_style" />
							</td>
							<c:if test="${isArea!='1'}">
								<td nowrap="nowrap" align="right" nowrap="nowrap">
									&nbsp;财政年份
								</td>
								<td nowrap="nowrap" align="right" width="80px">
									<select name="year" style="width: 80px;" >
										<c:forEach var="loginyear" items="${loginaCctyear}">
											<option value="<c:out value="${loginyear.all}"/>">
												<c:out value="${loginyear.acctmainbodyname}" />
											</option>
										</c:forEach>
									</select>
								</td>
						</tr>
						<tr style="line-height: 25px; height: 25px;">
							<td nowrap="nowrap" align="left">
								&nbsp;
							</td>
						</c:if>
						<c:if test="${isArea=='1'}">
							</tr>
							<tr style="line-height: 25px; height: 25px;">

								<td nowrap="nowrap" align="left" width="100px">财政名称</td>
								<td nowrap="nowrap" width="118px" align="left" >
									<select name="area" style="width: 118px;" id="area0">
										<option>
											1
										</option>
									</select>
								</td>
								<td nowrap="nowrap" width="100px" align="left" >&nbsp;财政年度</td>
								<td nowrap="nowrap" align="left" >
									<select name="year" style="width: 118px;" onchange="year2AreaSelect(0);">
										<c:forEach var="loginyear" items="${loginaCctyear}">
											<option value="<c:out value="${loginyear.all}"/>">
												<c:out value="${loginyear.acctmainbodyname}" />
											</option>
										</c:forEach>
									</select>
							</c:if>
							</tr>
						<tr>
							<td colspan="6" nowrap="nowrap" align="center">
								<button class="login_btn" value="登录" id="login_button"
									onclick1="submitWin()" type="submit"></button>
								&nbsp;&nbsp;&nbsp;
								<button class="reset_btn" value="重置" type="reset">
								</button>
								<input type="hidden" name="fontFile" />
							</td>
						</tr>
						<tr style="height: 18px;">
							<td nowrap="nowrap" width="50px" align="right" nowrap="nowrap">
								&nbsp;
								<input type="hidden" name="screenwidth" />
							</td>
							<td colspan="6" nowrap="nowrap" valign="middle">
								<font color="red"><c:out value="${msg}" /> </font>
							</td>
						</tr>
					</table>
				</form>
				<form id="form2" name="form2" method="post"
					action="<%=request.getContextPath()%>/login.do">
						<table id="cadl" width="469px" border="0" cellpadding="0" cellspacing="0" style="margin-top:200px;display: block; font-size:14px;">
						<tr width="380px" style="height: 24px;">
							<!-- 请不要添加默认的用户和密码  -->
							<!-- 集中登录地区选择 -->
							<c:if test="${isArea=='1'}">
								<!-- 总门户的服务器地址 -->
								<td nowrap="nowrap" width="120px" align="center" >财政名称</td>
								 <td nowrap="nowrap" align="left" >
									<select name="area" id="area1" style="width: 118px;">
										<option>
											1
										</option>
									</select>
								</td>
							</c:if>
							<!-- 集中登录地区选择结束  -->
							 <td nowrap="nowrap" width="120px" align="center" >财政年度</td>
							 <td nowrap="nowrap" align="left" >
								<select name="year" style="width: 118px;" onchange="year2AreaSelect(this);">
									<c:forEach var="loginyear" items="${loginaCctyear}" > 
										<option value="<c:out value="${loginyear.all}"/>">
											<c:out value="${loginyear.acctmainbodyname}" />
										</option>
									</c:forEach>
								</select>
							</td>
						</tr>
						<tr style="height: 5px">
							<td>
								&nbsp;
							</td>
						</tr>
						<tr>
							<td nowrap="nowrap" align="center" colspan="4">
								<input type="button" class="safe_btn" id="login_button"
									onclick="doDataProcess()"/>
								<input type="hidden" id="signed_data" name="signed_data" />
							</td>
						</tr>
						
						<tr style="height: 18px;">
							<td nowrap="nowrap" width="50px" align="right" nowrap="nowrap">
								&nbsp;
								<input type="hidden" name="screenwidth" />
							</td>
							<td colspan="6" nowrap="nowrap" valign="middle">
								<input type="hidden" name="fontFile" />
								<font color="red"><c:out value="${msg}" /> </font>
							</td>
						</tr>
					</table>
				</form>


				<table width="469px" border="0" cellpadding="0" cellspacing="0">
					<tr style="height: 10px;">
						<td>
							&nbsp;
						</td>
						<td>
							&nbsp;
						</td>
						<td>
							&nbsp;
						</td>
						<td>
							&nbsp;
						</td>
						<td>
							&nbsp;
						</td>
						<td>
							&nbsp;
						</td>
					</tr>
					<tr>
						<td nowrap="nowrap" align="center" colspan="7" valign="bottom"
							style="height: 26px;">
							<div id="nomalandca" class="ca_style">
								<div class="choose_acc" onclick="jumpToCA()">
									CA认证
								</div>
								<div class="choose_acc" onclick="jumpToNomal()">
									普通用户
								</div>
							</div>
						</td>
					</tr>
				</table>

			</div>
			<p
				style="font-size: 12px; color: #FFFFFF; text-align: right; width: 480px; line-height: 15px; height: 15px;">
				Copyright (C) 2011 福建省财政厅
			</p>
		</div>
		<div class="download" onmouseover="this.className='download_over'"
			onmouseout="this.className='download'">
			<a href="/common/ifmis_plugins.exe">下载控件</a>
		</div>
	</body>
	<script language="JavaScript" type="text/javascript">
    document.forms[0].screenwidth.value = window.screen.width;
    document.forms[1].screenwidth.value = window.screen.width;
	try{
	   document.forms['form1'].username.focus();
	}catch(e){}
</script>
	<script type="text/javascript">
//关闭公告
function closeGonggao(){
document.getElementById("gonggao_div").style.display = "none";
}
closeGonggao();//先关了公告
function preview(id){
		var url = "<%=request.getContextPath()%>/portal/portlets/post/post_preview.jsp?id="+id;
   		window.open(url,'window',"Width=700px;Height=550px;scroll=0;status=no;resizable=0;"); 
}

var fontsize = getFont("ifmisfont");
if(fontsize!=null && fontsize!=""){
    if(fontsize=="l"){
         document.forms[0].fontFile.value="stylefontL.css";
	         document.forms[1].fontFile.value="stylefontL.css";
         //setFontSession("stylefontL.css");	
   }else if(fontsize=="m"){
     document.forms[0].fontFile.value="stylefontM.css";
     document.forms[1].fontFile.value="stylefontM.css";
     //setFontSession("stylefontM.css");	
   }else{
      document.forms[0].fontFile.value="stylefontS.css";
      document.forms[1].fontFile.value="stylefontS.css";
      //setFontSession("stylefontS.css");
   }
}else{
   document.forms[0].fontFile.value="stylefontS.css";
   document.forms[1].fontFile.value="stylefontS.css";
   //setFontSession("stylefontS.css");
}
	var objAreaSelect=new Array();
	function initAreaSelect(){
	 <c:if test="${isArea=='1'}">
		<%
			List areas=(List)session.getAttribute("loginArea");
			for(int i=0;i<areas.size();i++){%>
				objAreaSelect[<%=i%>]=<%=gov.mof.fasp.ifmis.portal.portalmanage.userprogramset.util.JsonUtils
										.ObjectToJson(areas.get(i))%>
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
	function year2AreaSelect(i){
		var obj=document.getElementById('area'+i);
		if(obj==null&&objAreaSelect!=null){
			return;
		}
		obj.innerHTML="";
		createAreaOption(document.forms[i].year.value.split(';')[0],obj);  
	}
	initAreaSelect();
	year2AreaSelect(0);
	year2AreaSelect(1);
</script>
</html>
