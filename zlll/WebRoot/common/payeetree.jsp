<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<jsp:directive.page import="java.util.HashMap" />
<jsp:directive.page import="gov.mof.fasp.pa.vouchertype.dto.VoucherTypeDTO" />
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<% 
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
  
  
    	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
					//字体相关
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

  	

  <TITLE>请选择收款账号信息</TITLE>

<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName %>" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/calendar.css"/>
 </HEAD>
 <BODY class="pop_body">
   <div id="popPage">
   <div>
     <div id="shenhe_title"><div id="shenhe_title_middle">收款人信息</div></div>
 <div id="pop_inner">
 <table id="container" width="90%" border="0" cellSpacing=1 class="main_table">
  <tr id="title" class=main_table_title>
    <TH align="center" nowrap="nowrap">收款人开户名</TH>
	<TH align="center" nowrap="nowrap">开户账号</TH>
	<TH align="center" nowrap="nowrap">收款账户开户行</TH>
  </tr>
  <div id  = 'payeediv' name = 'payeediv'>
	<c:forEach var="payee"  items="${payees}" >
	  <tr id="data" class="main_table_title_letter" onDblClick="confirm(this)" bdgagency='<c:out value="${payee.BDGAGENCY}"/>'  bankname='<c:out value="${payee.GATHERINGBANKNAME}"/>' bankacctname='<c:out value="${payee.GATHERINGBANKACCTNAME}"/>' bankacctcode='<c:out value="${payee.GATHERINGBANKACCTCODE}"/>' onClick="selectRow(this)">
	    <td><c:out value="${payee.GATHERINGBANKACCTNAME}"/>&nbsp;</td>
	    <td><c:out value="${payee.GATHERINGBANKACCTCODE}"/>&nbsp;</td>
	    <td><c:out value="${payee.GATHERINGBANKNAME}"/>&nbsp;</td>
	  </tr>
	</c:forEach>
</table>
</div>
  <div id="pop_button" style="margin-top:10px;">
   <CENTER>
        <INPUT type="button" onClick="javascript:closeWindow(true)" value="确定" class="button_style" onMouseOver="this.className='OverBtn'" onMouseOut="this.className='button_style'" onMouseDown="this.className='down'"/>
        <INPUT type="button" onClick="javascript:closeWindow(false)" value="取消" class="button_style" onMouseOver="this.className='OverBtn'" onMouseOut="this.className='button_style'" onMouseDown="this.className='down'"/>   
        <INPUT type="button" onClick="javascript:deletePayee()" value="删除" class="button_style" onMouseOver="this.className='OverBtn'" onMouseOut="this.className='button_style'" onMouseDown="this.className='down'"/>
  </CENTER>
  </div>
  <div>
 </BODY>

</HTML>
<script>
var result = new Object();
var ado = '<c:out value="${act}"/>';
function fixbody(){
	// 修正页面问题
	//$("pop_inner").style.setExpression("height","this.parentElement.offsetHeight - shenhe_title.offsetHeight - pop_button.offsetHeight");
	//$("pop_inner").style.setExpression("width","this.parentElement.offsetWidth-(this.offsetWidth>this.parentElement.offsetWidth)?(this.parentElement.offsetWidth):0");
	$("pop_inner").style.setExpression("height","360");
	$("pop_inner").style.setExpression("width","590");
}

window.dialogHeight = "470px";
window.dialogWidth = "620px";


window.onload = function(){
fixbody();
}
function selectRow(trobj){
	result.bankname=trobj.bankname;
	result.bankacctname=trobj.bankacctname;
	result.bankacctcode=trobj.bankacctcode;
	result.agency = trobj.bdgagency;
	var nodes = $A($('container').getElementsByTagName('tr'));
	for(var i=0;i<nodes.size();i++) {	    
		if(nodes[i].id=="data"){  
		    nodes[i].className="main_table_title_letter";
		}
	}
	trobj.className="main_table_title_letter_selected";
}
function confirm(trobj){
    result.agency = trobj.bdgagency;
	result.bankname=trobj.bankname;
	result.bankacctname=trobj.bankacctname;
	result.bankacctcode=trobj.bankacctcode;
	closeWindow(true);
}

function closeWindow(isReturn){       
	if(isReturn){
		window.returnValue = result;
	}
	else{
		window.returnValue = null;
	}
	window.close();
}

/**
 删除操作
 add by yxs
 增加删除账户的功能
**/
function deletePayee(){
   var url = "/common/payeetreedel.do?";
   url = url+"gatheringbankacctname="+result.bankacctname;
   url = url+"&gatheringbankacctcode="+result.bankacctcode;
   url = url+"&gatheringbankname="+result.bankname;
   url = url+"&agency="+result.agency;
   clearData(result);
   toDo(url,null);
}
/**
清空数据
**/
function clearData(result){
  result.bankacctname = "";
  result.bankacctcode = "";
  result.bankname = "";
  result.agency = "";  
}

/**
*  回写
 add by yxs
**/
function showResponse(request){
    eval("var datas = "+request.responseText);
    var data;
    var datashtml = "<table id='container' width='90%' border='0' cellSpacing=1 class='main_table'>";
    datashtml = datashtml + "<tr id='title' class=main_table_title>";
    datashtml = datashtml + "<TH align='center' nowrap='nowrap'>收款人开户名</TH>";
    datashtml = datashtml + "<TH align='center' nowrap='nowrap'>开户账号</TH>";
    datashtml = datashtml + "<TH align='center' nowrap='nowrap'>收款账户开户行</TH>";
    datashtml = datashtml + "</tr>";    

    var bdgagency;
    var bankname;
    var bankacctname;
    var bankacctcode;    
    for(var i = 0;i<datas.length;i++){
      data = datas[i];
      var datahtml = "<tr id='data' class='main_table_title_letter' ondblclick='confirm(this)' ";  
      bdgagency = data.BDGAGENCY;      
      bankname = data.GATHERINGBANKNAME; 
      bankacctname = data.GATHERINGBANKACCTNAME;  
      bankacctcode = data.GATHERINGBANKACCTCODE;
      
      datahtml = datahtml+" bdgagency='"+bdgagency+"' ";
      datahtml = datahtml+" bankname='"+bankname+"' ";
      datahtml = datahtml+" bankacctname='"+bankacctname+"' ";
      datahtml = datahtml+" bankacctcode='"+bankacctcode+"' ";
      datahtml = datahtml+" onclick='selectRow(this)' > ";
      datahtml = datahtml+" <td>"+bankacctname+"</td>";
      datahtml = datahtml+" <td>"+bankacctcode+"</td>";
      datahtml = datahtml+" <td>"+bankname+"</td>";
      datahtml = datahtml+" </tr>";
      datashtml = datashtml+ datahtml;
    }
    datashtml = datashtml + "</table>";    
    pop_inner.innerHTML = datashtml;
}

/**
* 公用动作
 add by yxs
**/
function toDo(url,para){    
   if(url != null && url.length > 0){        
   	   	var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'get',
						   	 parameters: para,
						   	 onComplete : showResponse,
							 onFailure : function(resp) {
							 	alert("动作操作失败！");
							 }
						} 
	   				);   
   }
}
</script>
