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
	String elementcode = "";

	int start = 0;
	int step = 0;
	int allcount = 0;

	//wy added 20090922
	String selvalue = "";
    if(request.getParameter("elementcode")!=null){
	  elementcode = request.getParameter("elementcode");
	}
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
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/scripts/system/data/mzdata.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/scripts/system/web/forms/mzeffect.js">
		</script>

		<script type="text/javascript"
		src="<%=request.getContextPath()%>/js/scripts/system/web/ui/webcontrols/mztr
		eeview.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/ltext/ltext_core.js"></script>
		<title>��ѡ��&nbsp;<c:out value="${elementname}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</title>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
        <link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/<%=styleName %>" />
		<link
		href="<%=request.getContextPath()%>/js/scripts/system/_resource/mztreeview/m
		ztreeview.css"rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
		<link href="<%=request.getContextPath()%>/style/default.css"rel="stylesheet" type="text/css" />
	</head>
	
	<body class="pop_body">
		<div id="popPage">
				<div id="shenhe_title">
					<div id="shenhe_title_middle"></div>
				</div>
				<div id="pop_search" style="padding-bottom: 2px">
					<input id="searchcontent" type="text" class="popPage_input" onpropertychange="clearCodes()" onkeydown="javascript:if(window.event.keyCode==13){search()}"/>
					<input id="searchbutton" type="button" onclick="javascript:search()" value="��ѯ" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
				</div>
				<div id="pop_inner"></div>
					<div id="rightMenu">
						<div id="menuItem1" onclick="selectT(this)" onmouseover="onMOver(this)" onmouseout="onMOut(this)" class="nomal">
							ѡ���¼�
						</div>
						<div id="menuItem2" onclick="selectT(this)" onmouseover="onMOver(this)" onmouseout="onMOut(this)" class="nomal">
							ȫ��ѡ��
						</div>
						<div id="menuItem3" onclick="selectT(this)" onmouseover="onMOver(this)" onmouseout="onMOut(this)" class="nomal">
							ȡ��ѡ��
						</div>
						<div id="menuItem4" onclick="selectT(this)" onmouseover="onMOver(this)" onmouseout="onMOut(this)" class="nomal">
							��ѡ
						</div>
					</div>
				<div id="pop_button">
					<center style="height:30px;">
					    <input type="button" onclick="javascript:try{closeMWindow(true)}catch(e){window.close();}" value="ȷ��" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />&nbsp;&nbsp;&nbsp;
						<input type="button" onclick="javascript:try{closeMWindow(false)}catch(e){window.close();}" value="ȡ��" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
					</center>
				</div>
	</body>

</html>
<script>
var s = window.dialogArguments;
if(s!=null){
 var selvalue = s.selvalue;
var checkflag = s.checkflag;
var OnlySelectBottom = s.OnlySelectBottom;
}
var element = "<%=voucherFieldCode%>";
var elementfilter = "<%=elementfilter%>";
var elementcode = "<%=elementcode%>";
//��ʼҳ�湹����
var d = new Object();
//Using("System.Web.UI.WebControls.MzTreeView");
var elements=<%=request.getAttribute("jsonelements")%>;
var data = eval(elements);
var a =  new MzTreeView();
            a.dataSource =  getTree(data);
            a.autoSort = true;
            a.useCheckbox = true;
            a.canOperate = true;
            a.lastNode = "";
            if(checkflag)a.checkflag = true;
            document.getElementById("pop_inner").innerHTML=a.render();
            a.expandLevel(1);

            
//��ѡ���ر�
function closeMWindow(isReturn){
	if(isReturn){
		window.returnValue = getTreeSelect(OnlySelectBottom); //���� ĩ������ ��ѡ��
	}
	//090527 mod by liuhongchang
	else{
		window.returnValue = "cancel_";
	}
	
	var func;
    try{
        /* ��̬���ø����ڵ�ĳ������(����:ѡ����window),
         * ��������ڳ�ʼ����֮ǰ������
         * ��������ڸ����ڿ�ʵ��,���ʵ�ֿ��Զ������������κβ���,��:��������,
         * ��Ȼ,�ڸ�����Ҳ���Բ�ʵ�ָķ���
         * ganhua 20090212
         **/
        func="window.dialogArguments.callByMultElementTreeBeforeClose_"+"<%=elementcode%>"+"(window)";
        eval(func);
	}catch(e){
		//alert("��̬���ø����ڵ�ĳ����������:"+func);
		//���ɹ�,������,��������û��ʵ�ָķ�������
	}
	//���������Ĺ������� ganhua 20090509
	if(window.dialogArguments.elementfilter);
	{
		window.dialogArguments.elementfilter = null;
	}
	window.close();
}
window.onload = function(){
   try{
   	a.getPosition();
   }catch(e){}
} 
</script>
