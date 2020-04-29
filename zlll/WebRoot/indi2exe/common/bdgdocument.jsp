<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ taglib uri="http://struts.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	response.setHeader("Cache-Control","no-cache"); 
    response.setHeader("Pragma","no-cache"); 
    response.setDateHeader("Expires",0); 		
%>
<%
    response.setHeader("Cache-Control","no-cache"); 
    response.setHeader("Pragma","no-cache"); 
    response.setDateHeader("Expires",0); 
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
	String styleName ="stylefontS.css";	
	if(session.getAttribute("StyleName")!=null){
		styleName = (String)session.getAttribute("StyleName");
	}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 6.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName %>" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/calendar.css"/>
<script type="text/javascript" src="<%=basePath%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/changescroll.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/calendar.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/formatNumber.js"></script>
<script type="text/vbscript" src="<%=basePath%>/js/decode_resource.vbs"></script>
<script type="text/javascript" src="<%=basePath%>/js/ua.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/ftiens4.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/datatable.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_filter.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_shadow.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/rightButton.js"></script>
<script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/tabpage.js"></script>
<script type="text/javascript" src="<%=basePath%>/indi2exe/js/changedata.js"></script>
<script type="text/javascript">
var ROOT_PATH = '<%=basePath%>';
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
var url = window.location.href;
url = url.substr(0,url.indexOf('?'))+'?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
var result = new Object();
window.dialogHeight = "600px";
window.dialogWidth = "750px";

function mainlclick(row){
	tmain.selectedallrows(false) ;
	row.checked = true; 
	tmain.draw();
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

function conformcolse(){
	var trobj = tmain.getSelectedRow()[0];
	if(trobj==null){	
		alert("请选择文号!");
		result.text3 = "";
		result.textid = "";
		return;
	}else{
		result.text3 = trobj.indexfileno;
		result.textid = trobj.billid;
		var url = ROOT_PATH+'/common/IndiDocument/checkIndiDocument.do';
		var pars = 'text3='+trobj.indexfileno;
	    var myAjax = new Ajax.Request(
	                    url,
	                    {method: 'post', parameters: pars, onComplete: showResponse, asynchronous: false}
	                    );
	}
}

function showResponse(resp){
    var json = resp.responseText;
    if (json != null && json != "") {
    	if (confirm(json)) {
    		closeWindow(true);
    	}
    } else {
    	closeWindow(true);
    } 
}

function query(){		
 	var pars = getFormQueryString() ;  
	var urlajax = url;
	urlajax = urlajax.substr(0,urlajax.lastIndexOf("/"))+"/queryIndiDocument.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
    var myAjax = new Ajax.Request(
                    urlajax,
                    {method: 'post', parameters: pars, onComplete: queryAfter}
                    );
                    
                    
}
function queryAfter(request){
	   eval("var mainlistdata = "+request.responseText);
	   tmain.data = mainlistdata.result;
	   //setTabPage(tmain,mainlistdata);	  
       tmain.draw() ;
}

function getFormQueryString(){  
	   var myQueryform = $("queryform");	   
       var i,queryString = "", and = "";
       var item;  
       var itemValue;
       for( i=0;i<myQueryform.length;i++ ){
              item = myQueryform[i]; 
               if ( item.name!='' ) {                   
                     if ( item.type == 'select-one' ) {
                            itemValue = item.options[item.selectedIndex].value;
                     }
                     else if ( item.type=='checkbox' || item.type=='radio'){
                     if ( item.checked == false )
                     {
                            continue;    
                     }
                          itemValue = item.value; 
                     }else if(item.type=='text' && (item.nextSibling.tagName!='BUTTON')){
                         itemValue = item.value; 
                     }
                     else if ( item.type == 'button' || item.type == 'submit' || item.type == 'reset' || item.type == 'image'){
                            continue;
                     }
                     else{                     
                           if(item.value==null||item.value==""){
                           	itemValue = "";
                           }else{      
	                           	if(typeof(item.valueid)=="undefined"){
									itemValue = item.value;
	                           	}else{
	                           		itemValue = item.valueid;
	                           	}        
                           }
                     } 
                     //模糊查询
                     if(item.onkeyup==null){
							queryString += and + item.name + '=' + itemValue;
                     		and="&";
                     }else{
                          queryString += and + "hidden_"+item.name + "=" + itemValue;
                     	   and="&"; 
                     	   queryString += and + item.name + "=" + itemValue;
                     	   and="&"; 
                    }
              }
       }
       return queryString;
}

function tabPageClick(page ){
	var url = "<%=request.getContextPath() %>/common/IndiDocument/queryIndiDocument.do?&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
	tabTagPageClick(page,url) ;
}

</script>
</head>
<body class="pop_body">
<div id="popPage">
     <div id="shenhe_title"><div id="shenhe_title_middle">指标文号信息</div></div>
     <div id="query_t">
		<span><span title="查询" class="query_btn"	onclick="query()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">查询</a></span></span>
		<span><span title="清除查询条件" class="clear_btn" onclick="clearFormInputAll($('queryform'))"	onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">清除查询条件</a>	</span>	</span>
		<span><span title="隐藏查询条件" class="hidden_btn" onclick="doQuery2(this)" onmouseover="doChangBg(this)" onmouseout="doReturn(this)"><a href="#">隐藏查询条件</a></span></span>
   </div>
	<form id="queryform"
		action="<%=basePath%>/common/IndiDocument/showIndiDocument.do?mainmenu=<c:out value='${param.mainmenu}'/>&submenu=<c:out value='${param.submenu}'/>"
		method="post" target="_self">
		<ui:queryform formid="queryform" />
	</form>
	<ui:tabpage id="tabpage_main"  datatable="tmain"></ui:tabpage>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					指标文号信息
				</div>
			</li>
			<li>
       			<ui:row2column dataid="tmain" showdivname="edit_table"columnNum="4"/>
   			</li>
		</ul>
	</div>
	<div id="containerline12">
		<div id='edit_table' style='display:none;padding:0;margin:0;' ></div>
		<ui:datatable id="tmain"  tabletype="MainList" data="mainlist"   showradio="true"columndefine="true" onclick="mainlclick"/>
	</div>
	  <div id="pop_button" style="margin-top:10px;">
	   <CENTER>
	        <INPUT type="button" onClick="conformcolse()" value="确定" class="button_style" onMouseOver="this.className='OverBtn'" onMouseOut="this.className='button_style'" onMouseDown="this.className='down'"/>
	        <INPUT type="button" onClick="javascript:closeWindow(false)" value="取消" class="button_style" onMouseOver="this.className='OverBtn'" onMouseOut="this.className='button_style'" onMouseDown="this.className='down'"/>   
	  </CENTER>
	  </div>
<div>
</body>
</html>
<script type="text/javascript">
$("queryform").action=url;
function setFont(fontsize){
  	if(fontsize=="l"){
  	  document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontL.css';
      setFontSession("stylefontL.css");	
    }else if(fontsize=="m"){
      document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontM.css';
      setFontSession("stylefontM.css");	
    }else{
      document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontS.css';
      setFontSession("stylefontS.css"); 
    }
    setFontCookie(fontsize);
}


//自定义列
col = createColumnConfig();
col.id = "oaurl";
col.name = "oaurl";
col.type = "L";
col.title = "OA链接";
col.show = function(rownum,value,row,tdobj,datatable){
	if (row.oaurl!=null&&row.oaurl!="") {
		tdobj.innerHTML = "<center><a href='" + row.oaurl +"' title='OA连接'>OA连接</a></center>";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

tmain.show();

initPage(tmain);
</script>