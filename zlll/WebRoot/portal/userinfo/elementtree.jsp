<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<% 
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
  String styleName ="stylefontS.css";	
	if(session.getAttribute("StyleName")!=null){
		 styleName = (String)session.getAttribute("StyleName");
    }
%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<HTML xmlns="http://www.w3.org/1999/xhtml">
 <HEAD>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"> 
<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">
  <STYLE>
    
    TD {
      height: 18px;
      font-size: 10pt; 
      font-family: verdana,helvetica; 
      text-decoration: none;
      white-space:nowrap;}
 
    A {
      text-decoration: none;
      color: black;}
  </STYLE>

  <script type='text/javascript' src="<%=request.getContextPath()%>/js/prototype.js"></script>
  <script type='text/javascript' src='<%=request.getContextPath()%>/js/zapatec.js'></script>
  <SCRIPT type='text/javascript' src="<%=request.getContextPath()%>/js/tree.js"></SCRIPT>


 <TITLE>请选择&nbsp;<c:out value="${name}"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TITLE>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/<%=styleName %>" />
 </HEAD>
 <BODY class="pop_body">
   <div id="popPage">
   <div>
     <div id="shenhe_title"><div id="shenhe_title_middle"> </div><!-- c:out value="${elementcolumn.name}"/ -->
   </div>
   <div id="pop_inner"></div>
  <div id="pop_button">
   <CENTER><INPUT type="button" onclick="javascript:closeWindow(true)" value="确定" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;<INPUT type="button" onclick="javascript:closeWindow(false)" value="取消" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/></CENTER>
  </div>
  <div>
 </BODY>

</HTML>
<script>
var OnlySelectBottom = <%=request.getAttribute("onlyselectbottom")%>;
var elementTree;
var selectObj = new Object();
selectObj.value="";
selectObj.id="";


function fixbody(){
	// 修正页面问题
	$("pop_inner").style.setExpression("height","this.parentElement.offsetHeight - shenhe_title.offsetHeight - pop_button.offsetHeight");
	$("pop_inner").style.setExpression("width","this.parentElement.offsetWidth-(this.offsetWidth>this.parentElement.offsetWidth)?(this.parentElement.offsetWidth):0");
}

window.dialogHeight = "450px";
window.dialogWidth = "320px";


window.onload = function(){
fixbody();


function tree_select(){
	var node=this;
	selectObj.id=node.data.id;
	selectObj.value =node.data.label
	selectObj.isleaf = node.data.isleaf;

	if(OnlySelectBottom && node.data.isleaf != 1){
		node.deselect();
	}
}

function tree_labelDblclick(){
	var node=this;
	selectObj.id=node.data.id;
	selectObj.value =node.data.label;
	selectObj.isleaf = node.data.isleaf;

	closeWindow(true)
}

elementTree = new Zapatec.Tree({
                                quick: true,
                                parent: "pop_inner",
                                source: <c:out value="${jsonelements}" escapexml="false"/>,
                                sourceType: "json",
                                expandOnLabelClick: true,
                                highlightSelectedNode: true,
                                //putCheckboxes: true,
                                eventListeners:{
                                    'select': tree_select,'labelDblclick':tree_labelDblclick
                                }
                            });
}

function closeWindow(isReturn){
	if(isReturn && OnlySelectBottom && selectObj.isleaf != 1){
		alert("只能选择末级");
		return;
	}

	if(isReturn && selectObj.id!=""){
		window.returnValue = selectObj;
	}
	else{
		window.returnValue = null;
	}
	window.close();
}

</script>