<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%
	response.setHeader("Cache-Control","no-cache"); 
	response.setHeader("Pragma","no-cache"); 
	response.setDateHeader("Expires",0); 

	String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ request.getContextPath();
	String voucherFieldCode = "";
 	if(request.getParameter("vchfieldcode")!=null){
	  voucherFieldCode = request.getParameter("vchfieldcode");
	}

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="programstyle" type="text/css" />
<script type="text/javascript" src="<%=basePath%>/js/prototype.js"></script>
<title>选择</title>
<style>
body {
    margin-left: 0px;
	margin-top: 0px;
    margin-right: 0px;
	margin-bottom: 0px;
}
</style>
<SCRIPT LANGUAGE="JavaScript">
var k = window.dialogArguments;
$("programstyle").href = k.$("ifmisfontstyle").href;
var ismutl = "<%=request.getParameter("ismutl")%>";
	window.onload=function(){
		document.all.opwin.src="<%=request.getContextPath()%>/common/jump/list_program.do"+document.location.search;
		//window.open("<%=request.getContextPath()%>/common/jump/list_program.do"+document.location.search);
	}
Array.prototype.copy = function(start,end){
		var newdata = new Array();
		for(var i=start;i<this.length&&i<=end;i++){
			newdata[newdata.length]=this[i];
		}
		return newdata;
}
var selectObj = new Object();
selectObj.value="";
selectObj.id="";
selectObj.data=new Array();

function closeWindow(isReturn){
	if(isReturn){
		if(selectObj.id==""){
			alert("请选择内容!");
			return;
		}		
	}

	if(isReturn && selectObj.id!=""){
		window.returnValue = selectObj;
	}
	else{
		window.returnValue = "cancel_";
	}
	
	var func;
    try{
        /* 动态调用父窗口的某个方法(参数:选择树window),
         * 这个方法在初始化数之前被调用
         * 这个方法在父窗口可实现,如果实现可以对数的数据作任何操作,如:过滤数据,
         * 当然,在父窗口也可以不实现改方法
         * ganhua 20090212
         **/
        func="window.dialogArguments.callByElementTreeBeforeClose_"+"<%=voucherFieldCode%>"+"(window)";
        eval(func);
        
	}catch(e){
		//alert("动态调用父窗口的某个方法出错:"+func);
		//不成功,不管它,当父窗口没有实现改方法处理
	}
	
	window.close();
}

function add(){
	$('linkadd').href="<%=request.getContextPath()%>/common/jump/addTabProgram.jsp?"+document.location.search;
	$('linkadd').click();
	$('zx').style.visibility='hidden';
}
function addBack(){
  document.all.opwin.src="<%=request.getContextPath()%>/common/jump/list_program.do"+document.location.search;
  $('zx').style.visibility='visible';
  document.title="选择";
}
</SCRIPT>
 </HEAD>
 <BODY>
 <%String isEdit = request.getParameter("isedit");%> 
 <table border="0" width="100%" height="100%" id="table1" cellspacing="0" cellpadding="0">
	<tr>
		<td height="95%">
			<iframe id=opwin name="opwin" src="loading.htm" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>
		</td>
	</tr>
	<tr id="zx">
		<td height="5%" align="center">
		<% if(isEdit.equalsIgnoreCase("1")){ %>
		<c:if test="${elementcolumn.name == '项目'}">
		<a href="<%=request.getContextPath()%>/common/addProgram.jsp" target="opwin" id ="linkadd" style="display:none;"></a>
     	<input type="button" value="增加" class="button_style"  onclick="add()" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;
		</c:if>
		<%} %>
		<INPUT type="button" onclick="javascript:closeWindow(true)" value="确定" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;<INPUT type="button" onclick="javascript:closeWindow(false)" value="取消" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
		</td>
	</tr>
</table>
 </BODY>
</HTML>
