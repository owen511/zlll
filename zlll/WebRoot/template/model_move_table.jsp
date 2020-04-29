<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK" buffer="1400k"%>
<jsp:directive.page import="java.util.Map"/>	
<%@ taglib uri="/WEB-INF/struts-tiles.tld" prefix="tiles" %>
<%@ page import="gov.mof.fasp.ifmis.common.Globals"%>
<%@ page import="gov.mof.fasp.ifmis.common.JsLoader"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>

<%
    	
	response.setHeader("Cache-Control","no-cache"); 
	response.setHeader("Pragma","no-cache"); 
	response.setDateHeader("Expires",0); 
	
	String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ request.getContextPath();
	String styleName ="stylefontS.css";	
	if(session.getAttribute("StyleName")!=null){
	    styleName = (String)session.getAttribute("StyleName");
	}
	long modifytime = JsLoader.modifyTime();
%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 6.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="X-UA-Compatible" content="IE=7" />
	
<OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar" 
    CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB"  VIEWASTEXT>
	 <PARAM NAME="ToolBar" VALUE="0">
	 <PARAM NAME="StatusBar" VALUE="1">
	 <PARAM NAME="MenuBar" VALUE="0">     
</OBJECT>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css?t=<%=modifytime%>" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName %>?t=<%=modifytime%>" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css?t=<%=modifytime%>"/>
<link type="text/css" rel="stylesheet"	href="<%=basePath%>/style/jquery.autocomplete.css?t=<%=modifytime%>" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/calendar.css?t=<%=modifytime%>"/>
<link href="<%=basePath%>/js/scripts/system/_resource/mztreeview/mztreeview.css?t=<%=modifytime%>" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>/js/scripts/jsframework.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/scripts/system/data/mzdata.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/scripts/system/web/forms/mzeffect.js?t=<%=modifytime%>"></script>
<script type="text/javascript"
src="<%=basePath%>/js/scripts/system/web/ui/webcontrols/mztreeview.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/prototype.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js?t=<%=modifytime%>"></script>	
<script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/choose.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/loadOcx.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/tabpage.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/changescroll.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/calendar.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/formatNumber.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/Word_Spell.js?t=<%=modifytime%>"></script>
<script type="text/vbscript" src="<%=basePath%>/js/decode_resource.vbs"></script>
<script type="text/javascript" src="<%=basePath%>/js/ua.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/ftiens4.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/datatable.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/export.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/tbajax.js?t=<%=modifytime%>"></script>
<script type='text/javascript' src='<%=basePath%>/js/zapatec.js?t=<%=modifytime%>'></script>
<script type='text/javascript' src='<%=basePath%>/js/tree.js?t=<%=modifytime%>'></script>
<script type="text/javascript" src="<%=basePath%>/js/template.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws.js?t=<%=modifytime%>" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_filter.js?t=<%=modifytime%>" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_shadow.js?t=<%=modifytime%>" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/jquery.autocomplete.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/rightButton.js?t=<%=modifytime%>"></script>
<tiles:insert attribute="selfscript"/>
<tiles:insert attribute="common"/>


<script type="text/javascript">
//Using("System.Web.UI.WebControls.MzTreeView");
var linkvchtypeid = '<%=request.getAttribute("linkvchtypeid")%>';
var ROOT_PATH = '<%=basePath%>';
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
<% 
String intranetConfig ="";
if(session.getAttribute("intranetConfig")!="" && session.getAttribute("intranetConfig")!=null){
	intranetConfig = session.getAttribute("intranetConfig").toString();
}
	
%>
//获取Code全局变量
 var codeShowConfigs = new Array();
 var codeShowConfigs_ =<%=request.getAttribute("CODESHOWCONFIG") %> ;
 if(codeShowConfigs_ != null){
   codeShowConfigs = codeShowConfigs_;
 }
 //系统CODE配置参数
 var codeShowFlag =<%=request.getAttribute("CODESHOWFLAG") %> ;
 //系统报表组件是否允许自动安装
 var rptOcxIsAuto =<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_RPTOCXAUTO%>;
	 //页面onload后处理，以免影响其它业务系统调用此方法
	JQ(document).ready(
		function(){fnload();}
	);
</script>

<title>
    <tiles:insert attribute="title" />
</title>



</head>
<body style="margin:0px;">
<tiles:insert attribute="windowtop" />
<div id="hidden_top" align="center" ><span id="hiddenTopBar" title="隐藏上部" onClick="doHiddenTop(this)"></span></div>
<div style="position: absolute;background-color: #8BA3DA;z-index:9999;display:none;cursor: col-resize;" id="splitter"></div>
<div id="div_all" style="position:relative;background-color:#CCCCCC; overflow:hidden;height:expression(this.offsetParent.offsetHeight-window_top.offsetHeight-hidden_top.offsetHeight-10);">
    <div id="left_tree" style="display:block; height:expression(this.offsetParent.offsetHeight-25); overflow-y:scroll">
       <tiles:insert attribute="edittree"/></div>
    <div id="switchBar" style="display:block; height:expression(this.offsetParent.style.height); overflow:hidden">
        <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
       <tr>
        <td align="center" id="hidden_left">
        <span id="divBar"  onmousedown="fnMouseDown(event)";></span>
        <span id="hiddenLeftBar" title="隐藏左侧树" onClick="doHiddenLeft(this)" ></span>
        <span id="divBar"  onmousedown="fnMouseDown(event)";></span>
        </td>
       </tr>
       </table>
    </div>
    <div id="main" style="display:block; height:expression(this.offsetParent.style.height);">
    <div id="tree_inner" oncontextmenu="return false;"></div>    
       <tiles:insert attribute="navigation"/>
       <div id ="context">
       	<tiles:insert attribute="main"/>
       	<tiles:insert attribute="showhelp"/>
		<div class="bottomdiv">　</div> 
       </div>	
    </div>	  
</div> 
<script>screeMaintain();</script> 
</body>
</html>
   <%
   String mainmenu = "";
	if(request.getParameter("mainmenu")!=null && request.getParameter("mainmenu")!=""){
		mainmenu = request.getParameter("mainmenu").toString();
	}
	
	//财政
	String financial = "";
	if(session.getAttribute("financial")!=null){
		financial = session.getAttribute("financial").toString();
	}	
   if(mainmenu.equals("30000")||mainmenu.equals("28000")){ %>
        	<% if(financial!=null && financial!=""){%>
        	<script>				
        		document.title = "财政管理一体化信息系统(IFMIS)  财政："+'<%=financial%>';
			</script> 
        	<%} 
        }%>