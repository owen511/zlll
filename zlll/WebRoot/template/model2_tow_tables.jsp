<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"  buffer="1400k"%>
<jsp:directive.page import="java.util.Map"/>
<jsp:directive.page import="gov.mof.fasp.ifmis.system.configspace.ConfigElement"/>	
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
		String datatablejs = "datatable.js";
		String linkname = "";
		ConfigElement configElement = (ConfigElement)request.getAttribute("UIConfigElement");  
		if(configElement!=null&&configElement.get("LINKNAME")!=null){
			linkname = configElement.get("LINKNAME").toString();
		}    
		long modifytime = JsLoader.modifyTime();
		int clientWidth = JsLoader.getCookieInt(request,"clientWidth"); 
		if(clientWidth == 0) clientWidth =  1020;
		int clientHeight = JsLoader.getCookieInt(request,"clientHeight");
		if(clientHeight == 0) clientHeight =  764;
		int windowtopHeight = 120;
		int lefttreeWidth = 160;
		int switchBarWidth = 8;
		int bottomHeight = clientHeight - windowtopHeight;
		int mainWidth = clientWidth - lefttreeWidth - switchBarWidth - 10;
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
<link type="text/css" rel="stylesheet"	href="<%=basePath%>/style/jquery.autocomplete.css?t=<%=modifytime%>" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/calendar.css?t=<%=modifytime%>"/>
<link href="<%=basePath%>/js/scripts/system/_resource/mztreeview/mztreeview.css?t=<%=modifytime%>" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>/js/scripts/jsframework.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/scripts/system/data/mzdata.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/scripts/system/web/forms/mzeffect.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/scripts/system/web/ui/webcontrols/mztreeview.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/prototype.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/jquery.md5.js?t=<%=modifytime%>"></script>	
<script type="text/javascript" src="<%=basePath%>/js/jquery.editable-select.js?t=<%=modifytime%>"></script>	
<script type="text/javascript" src="<%=basePath%>/js/choose.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/tabpage.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/changescroll.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/calendar.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/formatNumber.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/Word_Spell.js?t=<%=modifytime%>"></script>
<script type="text/vbscript" src="<%=basePath%>/js/decode_resource.vbs"></script>
<script type="text/javascript" src="<%=basePath%>/js/ua.js?t=<%=modifytime%>"></script>

<script type="text/javascript" src="<%=basePath%>/js/<%=datatablejs%>?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/export.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/tbajax.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/template.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws.js?t=<%=modifytime%>" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_filter.js?t=<%=modifytime%>" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_shadow.js?t=<%=modifytime%>" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/jquery.autocomplete.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/loadOcx.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/ftiens4.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/rightButton.js?t=<%=modifytime%>"></script>

<tiles:insert attribute="common"/>
<SCRIPT LANGUAGE="JavaScript">
var switchBarLeft = <%=lefttreeWidth%>;
try{
	var oldSLeft =  getCookie("customer_switchbar_left");
	if(oldSLeft != ""){
		switchBarLeft = oldSLeft;
	}
}catch(e){}
<!--
	var ROOT_PATH = "<%=basePath%>";
	var linkvchtypeid = '<%=request.getAttribute("linkvchtypeid")%>';

	//获取Code全局变量
	var codeShowConfigs = new Array();
	var codeShowConfigs_ =<%=request.getAttribute("CODESHOWCONFIG") %> ;
	if(codeShowConfigs_ != null){
		codeShowConfigs = codeShowConfigs_;
	}
	//系统CODE配置参数
	var codeShowFlag =<%=request.getAttribute("CODESHOWFLAG") %> ;
	//系统报表组件是否允许自动安装
	var rptOcxIsAuto ='<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_RPTOCXAUTO%>';

	var current_user ='<c:out value="${sessionScope.currentuser.code}"/>';
	var comlinkname = '<%=request.getAttribute("LINKNAME")%>';
//-->
</SCRIPT>

<title>
    <tiles:insert attribute="title" />
</title>
</head>
<body style="margin:0px;">
<tiles:insert attribute="windowtop" />
<div id="hidden_top" align="center" ><span id="hiddenTopBar" title="隐藏上部" onClick="doHiddenTop(this);Ext.lt.layout.doLayout()"></span></div>
<div style="position: absolute;background-color: #8BA3DA;z-index:9999;display:none;cursor: col-resize;" id="splitter"></div>
<div id="div_all" layout="{w:{fit:true,min:800},h:{fit:'auto',min:450}}" style="position:relative;background-color:#fff; overflow:hidden;width:<%=clientWidth%>px;height:<%=bottomHeight%>px;">
       <div id="left_tree" layout="{h:{fit:-25}}" style="display:block;  overflow-y:scroll;height:<%=bottomHeight%>px">
    <script>document.getElementById("left_tree").style.width =switchBarLeft; //或者用expression 貌似IE8不支持</script> 
       <tiles:insert attribute="edittree"/></div>
    <div id="switchBar" layout="{h:{fit:true}}" style="display:block; overflow:hidden;width:<%=switchBarWidth%>px;height:<%=bottomHeight%>px">
        <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
       <tr>
		   <td align="center" id="hidden_left">
			<span id="hiddenLeftBar" class="hideLeftBar" title="隐藏左侧树" onClick="doHiddenLeft(this);Ext.lt.layout.doLayout()" ></span>
			</td>
       </tr>
       </table>
    </div>
    <div id="main" layout="{h:{fit:true},w:{fit:'auto'}}" style="width:<%=mainWidth%>px;height:<%=bottomHeight%>px;">
		  <div id="tree_inner" oncontextmenu="return false;"></div>    
		  <tiles:insert attribute="navigation" />
		  <div id ="context">
			<tiles:insert attribute="selfscript"/>
			<tiles:insert attribute="btnarea"/>
			<tiles:insert attribute="queryarea"/>
			<tiles:insert attribute="data_main"/>
			<tiles:insert attribute="data_detail"/>	
			<tiles:insert attribute="showhelp"/>
	  	</div>
    </div>
	<div id="ifmisuserdiv" style="display:none;behavior:url(#default#userData);"></div>
</div> 
<script>screeMaintain();</script> 
</body>
<script>
//临时8007测试改进控件加载方法，测试完成后删除这段script
//var ltrptocx = Ext.lt.ifmis.activex.loadLTReportOcx(); 
//var WebPrinter = Ext.lt.ifmis.activex.loadJQReportOcx();
//var AppCaller = Ext.lt.ifmis.activex.loadAppCallerOcx();
</script>
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
   
   <%
   //自定义标题头
   String customtitle = Globals.IFMIS_CUSTOMTITILE;
   if(null != customtitle && !"".equals(customtitle)){
  %>
	   	<script>				
	       		document.title = '<%=customtitle%>';
		</script> 
   <%} %>    

<script>
	Ext.lt.layout.on(fnload);
</script> 