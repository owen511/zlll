<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);

	//wy add 
	String mainmenu = "";
	String submenu = "";
	String vchtypecode = "";
	String voucherFieldCode = "";
	String elementfilter = "";
	String Referer = "";

	int start = 0;
	int step = 0;
	int allcount = 0;

	//wy added 20090922
	String selvalue = "";

	if (request.getParameter("mainmenu") != null) {
		mainmenu = request.getParameter("mainmenu").toString();
	}
	if (request.getParameter("submenu") != null) {
		submenu = request.getParameter("submenu").toString();
	}
	if (request.getParameter("vchtypecode") != null) {
		vchtypecode = request.getParameter("vchtypecode");
	}

	if (request.getParameter("vchfieldcode") != null) {
		voucherFieldCode = request.getParameter("vchfieldcode");
	}

	if (request.getParameter("elementfilter") != null) {
		elementfilter = request.getParameter("elementfilter");
	}

	if (request.getParameter("Referer") != null) {
		Referer = request.getParameter("Referer");
	}
	if (request.getAttribute("start") != null) {
		start = Integer.parseInt(request.getAttribute("start")
				.toString());
	}
	if (request.getAttribute("step") != null) {
		step = Integer
				.parseInt(request.getAttribute("step").toString());
	}

	if (request.getAttribute("selvalue") != null) {
		selvalue = request.getAttribute("selvalue").toString();
	}
	if (request.getAttribute("allCount") != null) {
		allcount = Integer.parseInt(request.getAttribute("allCount")
				.toString());
	}
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
 <script type="text/javascript" src="<%=request.getContextPath()%>/js/scripts/jsframework.js"></script>
 <script type="text/javascript" src="<%=request.getContextPath()%>/js/scripts/system/data/mzdata.js"></script>
 <script type="text/javascript" src="<%=request.getContextPath()%>/js/scripts/system/web/forms/mzeffect.js"></script>
 <script type="text/javascript" src="<%=request.getContextPath()%>/js/scripts/system/web/ui/webcontrols/mztreeview.js"></script>
 <script type="text/javascript" src="<%=request.getContextPath()%>/ltext/ltext_core.js"></script>

		<title>请选择&nbsp;<c:out value="${elementcolumn.name}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</title>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
        <link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/<%=styleName %>" />
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
		<link href="<%=request.getContextPath()%>/js/scripts/system/_resource/mztreeview/mztreeview.css"rel="stylesheet" type="text/css" />
		<link href="<%=request.getContextPath()%>/style/default.css"rel="stylesheet" type="text/css" />
	</head>
	
	<body class="pop_body">
		<div id="popPage">
				<div id="shenhe_title">
					<div id="shenhe_title_middle"></div>
				</div>
				<div id="pop_search" style="padding-bottom: 2px">
					&nbsp;<input id="searchcontent" type="text" class="popPage_input" onpropertychange="clearCodes()"  onkeydown="javascript:if(window.event.keyCode==13){search()}"/>
					<input id="searchbutton" type="button" onclick="javascript:search()" value="查询" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
				</div>
				<div id="pop_inner"></div>
					<div id="rightMenu">
						<div id="menuItem1" onclick="selectT(this)" onmouseover="onMOver(this)" onmouseout="onMOut(this)" class="nomal">
							选中下级
						</div>
						<div id="menuItem2" onclick="selectT(this)" onmouseover="onMOver(this)" onmouseout="onMOut(this)" class="nomal">
							全部选中
						</div>
						<div id="menuItem3" onclick="selectT(this)" onmouseover="onMOver(this)" onmouseout="onMOut(this)" class="nomal">
							取消选中
						</div>
						<div id="menuItem4" onclick="selectT(this)" onmouseover="onMOver(this)" onmouseout="onMOut(this)" class="nomal">
							反选
						</div>
					</div>
				<div id="pop_button">
						<center style="height:30px;">
					    <input type="button" onclick="javascript:try{closeMWindow(true)}catch(e){window.close();}" value="确定" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />&nbsp;&nbsp;&nbsp;
						<input type="button" onclick="javascript:try{closeMWindow(false)}catch(e){window.close();}" value="取消" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
					</center>
				</div>
	</body>

</html>
<script>
var s = window.dialogArguments;
if(s!=null){
var selvalue = s.selvalue;
var checkflag = s.checkflag;
}
var element = "<%=voucherFieldCode%>";
var elementfilter = "<%=elementfilter%>";
var OnlySelectBottom = <%=request.getAttribute("onlyselectbottom")%>;
//初始页面构建树
var d = new Object();
//Using("System.Web.UI.WebControls.MzTreeView");
var elements=<%=request.getAttribute("jsonelements")%>;
var data;
var a =  new MzTreeView();        
//多选树关闭
function closeMWindow(isReturn){
	if(isReturn){

		window.returnValue = getTreeSelect(OnlySelectBottom);
	}
	//090527 mod by liuhongchang
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
        func="window.dialogArguments.callByMultElementTreeBeforeClose_"+"<%=voucherFieldCode%>"+"(window)";
        eval(func);
	}catch(e){
		//alert("动态调用父窗口的某个方法出错:"+func);
		//不成功,不管它,当父窗口没有实现改方法处理
	}
	//清楚父窗体的过滤条件 ganhua 20090509
	if(window.dialogArguments.elementfilter);
	{
		window.dialogArguments.elementfilter = null;
	}
	window.close();
}
window.onload = function(){
   try{
	    if( elements instanceof Array){
			data = eval(elements);
			a.dataSource = getTree(data);
		}else{
			data = elements;
			data["-1_0"]="text: abcdroot;"
			a.dataSource = data;
			a.rootId="-1";
		}
		a.autoSort = true;
		a.useCheckbox = true;
		a.canOperate = true;
		a.lastNode = "";
		if(checkflag)a.checkflag = true;
		document.getElementById("pop_inner").innerHTML=a.render();
		a.expandLevel(1);
   		a.getPosition();
   }catch(e){}
} 
</script>
