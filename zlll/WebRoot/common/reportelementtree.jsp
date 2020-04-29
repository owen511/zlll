<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<jsp:directive.page import="java.util.HashMap" />
<jsp:directive.page import="gov.mof.fasp.pa.vouchertype.dto.VoucherTypeDTO" />
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<% 
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<HTML xmlns="http://www.w3.org/1999/xhtml">
 <HEAD>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"> 
<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">
<meta http-equiv="X-UA-Compatible" content="IE=7" />
  <STYLE>
    
    TD {
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


  <TITLE></TITLE>
 </HEAD>
 <BODY class="pop_body">
  <div id="popPage">
   <div id="popPage">
     <div id="shenhe_title"><div id="shenhe_title_middle"> <c:out value="${elementcolumn.name}"/></div>
   </div>
   <div id="pop_inner"></div>
  <div id="pop_button">
   <CENTER><INPUT type="button" onclick="javascript:closeWindow(true)" value="确定" /><INPUT type="button" onclick="javascript:closeWindow(false)" value="取消" /></CENTER>
  </div>
  <div>
 </BODY>

</HTML>
<script>
var elementTree;

function fixbody(){
	// 修正页面问题
	$("pop_inner").style.setExpression("height","this.parentElement.offsetHeight - shenhe_title.offsetHeight - pop_button.offsetHeight");
	$("pop_inner").style.setExpression("width","this.parentElement.offsetWidth-(this.offsetWidth>this.parentElement.offsetWidth)?(this.parentElement.offsetWidth):0");
}

window.dialogHeight = "450px";
window.dialogWidth = "400px";


window.onload = function(){
fixbody();

elementTree = new Zapatec.Tree({
                                quick: true,
                                parent: "pop_inner",
                                source: <c:out value="${jsonelements}" escapexml="false"/>,
                                sourceType: "json",
                                expandOnLabelClick: true,
                                highlightSelectedNode: false,
                                putCheckboxes: true,
                                eventListeners:{
                                    //'select': function(){var node=this;if(node.data.isChecked){node.checkboxChanged(false)}else{node.checkboxChanged(true)}}
                                }
                            });

}

function closeWindow(isReturn){
	if(isReturn){
		window.returnValue = getTreeSelected(elementTree);
	}
	else{
		window.returnValue = null;
	}
	window.close();
}

</script>
