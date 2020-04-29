<%@page language="java" pageEncoding="GBK" isErrorPage="true"%>
<%@page import="gov.mof.fasp.ifmis.system.saveerror.action.ErrorLogManager" %>
<%response.setStatus(HttpServletResponse.SC_OK);%>
<%@ page import="org.apache.struts.Globals" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%
     String path = request.getContextPath();
	 String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path;
    // 确保浏览器不缓存页面
    gov.mof.fasp.ifmis.common.WebUtils.clearBrowerCache(response);
    String mainmenu = "";
    String submenu = "";
    String fromurl = "";
    String postdata = "";
    String ipport = "";
    String appcode = "";
    if (request.getAttribute("mainmenu") != null) {
    	mainmenu = String.valueOf(request.getAttribute("mainmenu"));
    }
    if (request.getAttribute("submenu") != null) {
    	submenu = String.valueOf(request.getAttribute("submenu"));
    }
    if (request.getAttribute("fromurl") != null) {
    	fromurl = String.valueOf(request.getAttribute("fromurl"));
    }
    if (request.getAttribute("postdata") != null) {
    	postdata = String.valueOf(request.getAttribute("postdata"));
    }
    if (request.getAttribute("ipport") != null) {
    	ipport = String.valueOf(request.getAttribute("ipport"));
    }
    if (request.getAttribute("appcode") != null) {
    	appcode = String.valueOf(request.getAttribute("appcode"));
    }
    // 管理员信息
  	String managerStr = ErrorLogManager.getErrorManager();
%>
   <head>
    <title>错误页面</title>
	<link type="text/css" rel="stylesheet"	href="<%=basePath%>/style/ifmis_style.css" />
	<script type="text/javascript" src="<%= basePath %>/ltext/ltext_core.js"></script>
	<script type="text/javascript" src="<%= basePath %>/js/choose.js"></script>
	<script type="text/javascript" src="<%= basePath %>/js/jquery-1[1].3.1.js"></script>
   </head>
        
    <body style="overflow: scroll;">
	    <div style="width:100%; height:100%;overflow: scroll;">
			<div id="erroroutter" class="erroroutter">
				<p class="fiveerror"></p>
				<p class="font_nomal">您使用的页面出现错误，请联系&nbsp;<span>管理员:</span></p>
				<p class="font_blue"><%=managerStr %></p>
				<p class="font_nomal">以解决问题。</p>
				<p class="errorshow"><a href="#" onclick="showError();">错误详细信息 &gt;&gt;</a></p>
				<div id="errorinfos" class="errorinfo" style="display:none;">
					<textarea cols="100" rows="10" ><%=request.getAttribute("stacklog")%></textarea>
				</div>
				<div id="errormessage" style="display:none;">
					<bean:write name="<%=Globals.EXCEPTION_KEY%>" property="message"/>
				</div>
				<p class="btnarea">
					<button onclick="saveErrorlog()" class="feedbackbtn" onmouseover="this.className='feedbackbtn_over'" onmouseout="this.className='feedbackbtn'"></button>&nbsp;
					<button id="backbtn"></button>
			</p>
			</div>
		</div>
	</body>
<script>
window.onload = function () {
	var _btn = document.getElementById("backbtn");
	if (window.history != null && window.history !="" && window.history.length > 0) {
		_btn.className = "returnbtn";
		_btn.onclick = function() {history.go(-1);}
		_btn.onmouseover = function() {this.className = "returnbtn_over";}
		_btn.onmouseout = function() {this.className = "returnbtn";}
	} else {
		_btn.className = "closebtn";
		_btn.onclick = function() {window.close();}
		_btn.onmouseover = function() {this.className = "closebtn_over";}
		_btn.onmouseout = function() {this.className = "closebtn";}
	}
}
var flag = true;
function showError(){
	var obj = document.getElementById("errorinfos");
	if (flag) {
		obj.style.display="block";
		flag = false;
	} else {
		obj.style.display="none";
		flag = true;
	}
}
function saveErrorlog() {
	if(confirm("是否保存错误信息？")) {
		// 堆栈信息只保存4000字符 
		var stackstr = document.getElementById("errorinfos").children[0].innerText;
		var errorstr = document.getElementById("errormessage").innerText;
		if(typeof(errorstr)!="undefined"){
			errorstr = errorstr.trim();
		}
		var d = {
			mainmenu: '<%=mainmenu%>',
			submenu: '<%=submenu%>',
			fromurl: '<%=fromurl%>',
			errortime: '<%=request.getAttribute("errortime")%>',
			postdata: '<%=postdata%>',
			errorlog: errorstr,
			stacklog: stackstr,
			errortype: '500',
			ipport: '<%=ipport%>',
			appcode: '<%=appcode%>'
		};
		// ajax提交错误信息  
		JQ.ajax({
			type: "post",
			url: "/common/error/saveErrorLog.do",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			data: d
		});
	}
	// 返回页面
	history.back();
}
</script>