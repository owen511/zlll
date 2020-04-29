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
<script type="text/javascript" src="<%=basePath%>/js/hashmap.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>	
<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_filter.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_shadow.js" type=text/javascript></SCRIPT>
<title>选择</title>
 </HEAD>
 <BODY>
 <%String isEdit = request.getParameter("isedit");%> 
 <input type="hidden" id="itemid" name="itemid"></input>
 <table border="0" width="100%" height="100%" id="table1" cellspacing="0" cellpadding="0">
	<tr>
		<td height="95%">
			<iframe id=opwin name="opwin" src="loading.htm" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>
		</td>
	</tr>
	<tr id="zx">
		<td height="5%" align="center">
		<div id="a" style="display:none">
			<% if(isEdit.equalsIgnoreCase("1")){ %>
			<c:if test="${elementcolumn.name == '项目'}">
			<a href="<%=request.getContextPath()%>/common/addProgram.jsp" target="opwin" id ="linkadd" style="display:none;"></a>
	     	<input type="button" value="增加一级" id="f_btn" class="button_style"  onclick="add('father')" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;
	     	<input type="button" value="增加子级" id="c_btn" class="button_style"  onclick="add('child')" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;
	     	<input type="button" value="修改" id="m_btn" class="button_style" onclick="domodify()" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;
	     	<input type="button" value="删除" id="d_btn" class="button_style" onclick="dodelete()" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;
			</c:if>
			<%} %>
			<INPUT type="button" onclick="javascript:closeWindow(true)" value="确定" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;<INPUT type="button" onclick="javascript:closeWindow(false)" value="取消" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
		</div>
		<div id="b" style="display:none">
			<% if(isEdit.equalsIgnoreCase("1")){ %>
			<c:if test="${elementcolumn.name == '项目'}">
			<a href="<%=request.getContextPath()%>/common/addProgram.jsp" target="opwin" id ="linkadd" style="display:none;"></a>
	     	<input type="button" value="增加" id="f_btn" class="button_style"  onclick="add('father')" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;
			<input type="button" value="修改" id="" class="button_style" onclick="domodify()" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;
			<input type="button" value="删除" id="" class="button_style" onclick="dodelete()" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;
			</c:if>
			<%} %>
			<INPUT type="button" onclick="javascript:closeWindow(true)" value="确定" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;<INPUT type="button" onclick="javascript:closeWindow(false)" value="取消" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
		</div>
		</td>
	</tr>
</table>
 </BODY>
</HTML>

<SCRIPT LANGUAGE="JavaScript">
var k = window.dialogArguments;
$("programstyle").href = k.$("ifmisfontstyle").href;
var selvalue = k.selvalue;
var row = k.row;
var page = k.page;
var ismutl = k.ismutl;
var vchCode = k.vchtypecode;
var sqlwhere = k.elementfilter;
var chkAll = k.chkAll;
//页面加载时引入项目表格
window.onload=function(){
		document.all.opwin.src="<%=request.getContextPath()%>/common/jump/turnProgram.do"+document.location.search;
}

//单选定义返回值保存对象
var selectObj = new Object();
selectObj.value="";
selectObj.id="";
selectObj.valuecode="";
selectObj.chkAll = new Array();
selectObj.page=new Object();
selectObj.data=new Object(); //存储行对象
var mulSelected = new Object(); //多选值存储
var mulPath = new Object();
//关闭窗口
function closeWindow(isReturn){
	if(ismutl == 2){
		for(var i in mulSelected){
				if(mulSelected[i] !=""){
					selectObj.id += i.replace(/\_node/,"")+",";
					selectObj.value += mulSelected[i];
				}
			}
		for(var i in mulPath){
				selectObj.valuecode += mulPath[i];
			}
	}
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
	//清除全局变量
	if(k.elementfilter);
	{
		k.elementfilter = null;
	}
	window.close();
}
//增加
function add(flag){
	var itemid = "";
	if(flag != "father"){
		if(selectObj.id != ""){
			window.path = selectObj.valuecode;
			var arrCode = selectObj.valuecode.split(",");
			itemid = arrCode[arrCode.length-1];
		}else{
			alert("请选择父级");
			return;
		}
		if(itemid!=""){
				window.selectNode = itemid;
		}
	}
	var url  = "<%=request.getContextPath()%>" + "/common/getProgramInfo.do?itemid="+itemid;
	window.addFlag = flag;
	window.programdefaultvalue = k.programdefaultvalue;
	window.mustselect = k.mustselect;
	window.progamAddElements = k.progamAddElements;
	window.repeatprograms = k.repeatprograms;
	window.vchCode = vchCode;
	window.showModalDialog(url, window, "dialogHeight:400px;dialogWidth: 300px;resizable: No; status: No;help:No;");
}
//获取选中数据和父节点id
function getItemId(){
	var nodeinfo = {itemid:null,parentid:null,name:null};
	if(selectObj.id != ""){
		window.path = selectObj.valuecode;
		var arrCode = selectObj.valuecode.split(",");
		nodeinfo.itemid = arrCode[arrCode.length-1];
		nodeinfo.parentid = arrCode[arrCode.length-2];
		var value = selectObj.value;
		nodeinfo.name = value.split("-")[1];
	}
	return nodeinfo;
}
//修改
function domodify(){
	var flag = "modify";
	var nodeinfo = getItemId();
	if(!nodeinfo.itemid){
		alert("请选择要修改项目！");
		return;
	}
	var isuseflag = programisuse(nodeinfo.itemid);
	var objChild = hasChildNode(nodeinfo);
	//项目被使用不能修改，项目包含子节点时只能修改名称
	if(!isuseflag){
		var url  = "<%=request.getContextPath()%>" + "/common/getProgramInfo.do?itemid="+nodeinfo.itemid;
		window.addFlag = flag;
		window.name = nodeinfo.name;
		window.itemid = nodeinfo.itemid;
		window.parentcode = objChild.parentcode;
		window.haschildnode = objChild.flag;
		window.load = onload;
		window.programdefaultvalue = k.programdefaultvalue;
		window.mustselect = k.mustselect;
		window.progamAddElements = k.progamAddElements;
		window.repeatprograms = k.repeatprograms;
		window.vchCode = vchCode;
		window.showModalDialog(url, window, "dialogHeight:400px;dialogWidth: 300px;resizable: No; status: No;help:No;");
	}else{
		alert("此项目已被使用！");
	}	
}
//删除
function dodelete(){
	var nodeinfo = getItemId();
	if(!nodeinfo.itemid){
		alert("请选择要删除项目！");
		return;
	}
	if(confirm("确定删除吗?")) {
		var flag = programisuse(nodeinfo.itemid);
		var haschildnode = hasChildNode(nodeinfo).flag;
		if(!flag && !haschildnode){
			var url = "<%=request.getContextPath()%>" + "/common/deleteProgram.do?itemid="+nodeinfo.itemid+"&parentid="+nodeinfo.parentid;
			JQ.ajax({
				url:url,
				async: false,
				success:function(data){
					if(eval(data)){
						alert("删除成功！");
						window.returnValue= {value:"",id:"",valuecode:""};
						window.close();
					}else{
						alert("删除失败！");
					}
				}
			});
		}else{
			if(flag){
				alert("此项目已被使用！");
			}else if(haschildnode){
				alert("此项目有子节点不能删除！");
			}
		}
	}
}
//判断项目是否被使用
function programisuse(itemid){
	var url  = "<%=request.getContextPath()%>" + "/common/programIsUse.do?itemid="+itemid;
	var flag = JQ.ajax({
		url:url,
		async: false
	}).responseText;
	return eval(flag);
}
//判断是否为父级节点，父节点不许修改编码和删除
function hasChildNode(nodeinfo){
	if(nodeinfo.parentid && nodeinfo.parentid!="0"){
		var url  = "<%=request.getContextPath()%>" + "/common/programHasChild.do?itemid="+nodeinfo.itemid+"&parentid="+nodeinfo.parentid;
	}else{
		var url  = "<%=request.getContextPath()%>" + "/common/programHasChild.do?itemid="+nodeinfo.itemid;
	}
	var data = JQ.ajax({
		url:url,
		async: false
	}).responseText;
	return eval("(" + data + ")");
}
//取消增加调用
function addBack(detailObj){
   	window.returnValue=detailObj;
   	window.close();
}
</SCRIPT>
