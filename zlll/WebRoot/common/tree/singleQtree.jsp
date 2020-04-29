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
	int endlevelselect=0;
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
	if (request.getParameter("endlevelselect") != null) {
		endlevelselect = Integer.parseInt( request.getParameter("endlevelselect").toString());
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
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/ltext/datatabletheme.css" />
		<script src="<%=request.getContextPath()%>/ltext/ltext_core.js"></script>
		<title>��ѡ��&nbsp;<c:out value="${elementcolumn.name}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</title>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
        <link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/<%=styleName %>" />
		<link href="<%=request.getContextPath()%>/js/scripts/system/_resource/mztreeview/mztreeview.css"rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
		<link href="<%=request.getContextPath()%>/style/default.css"rel="stylesheet" type="text/css" />
	</head>
	
	<body class="pop_body">
		<div id="popPage">
				<div id="shenhe_title">
					<div id="shenhe_title_middle"></div>
				</div>
				<div id="pop_search" style="padding-bottom: 2px">
					<input type='text' style='width:85%' id='searchcontent' onkeyup="filtertree(this.value)"/>
				</div>
				<div id="pop_inner"></div>
				<div id="pop_button">
					<center>
					    <input type="button" onclick="javascript:try{closeSWindow(true)}catch(e){window.close();}" value="ȷ��" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />&nbsp;&nbsp;&nbsp;
						<input type="button" onclick="javascript:try{closeSWindow(false)}catch(e){window.close();}" value="ȡ��" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
					</center>
				</div>
	</body>

</html>
<script>
var s = window.dialogArguments;
var values = [];
if(s!=null){
	var selvalue = s.selvalue;
	if(selvalue)values.push(selvalue);
}
var element = "<%=voucherFieldCode%>";
var OnlySelectBottom = <%=request.getAttribute("onlyselectbottom")%>;
var elementfilter = "<%=elementfilter%>";
var elements=<%=request.getAttribute("jsonelements")%>;
var _qtree;
window.onload=function(){
		_qtree=new Ext.lt.Qtree({
			data:elements,
			values:values,
			linkchild:true,
			outformart:'#code-#name',
			classname:'pop',
			expand:'click',
			on:{
				'dblclick':function(tree){
					closeSWindow(true);
				}
			}
			
		});
		_qtree.draw(pop_inner);
}
//��������
function filtertree(f){
		var array_toPage = f.split("");
			var digitalStr = "^$*+??\\";
			for (var i = 0; i < array_toPage.length; i++) {
				if (digitalStr.indexOf(array_toPage[i]) != -1) {
					array_toPage[i] = '\\'+array_toPage[i];
				}
			}
		f = array_toPage.join('');
		_qtree.setFilter([{field:'name',values:f},{field:'code',values:f},{field:'pinyin',values:f}],'contain');
}
//�رղ��õ�ѡ��ֵ
function closeSWindow(isReturn){
	if(isReturn){
		if(<%=endlevelselect==1%>&&_qtree.getSelected().length>0){
			if(_qtree.getSelected()[0].isleaf==0){
				alert("��ѡ��ĩ��");
				return;
			}
		}
		window.returnValue = _qtree.getSelected();
	}
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
        func="window.dialogArguments.callByMultElementTreeBeforeClose_"+"<%=voucherFieldCode%>"+"(window)";
        eval(func);
	}catch(e){
	}
	window.close();
}
</script>
