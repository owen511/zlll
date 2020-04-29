<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"  buffer="1400k"%>
<jsp:directive.page import="java.util.Map"/>
<jsp:directive.page import="java.util.Calendar"/>
<jsp:directive.page import="gov.mof.fasp.ifmis.system.configspace.ConfigElement"/>	
<%@ taglib uri="/WEB-INF/struts-tiles.tld" prefix="tiles" %>
<%@ page import="gov.mof.fasp.ifmis.common.Globals"%>
<%@ page import="gov.mof.fasp.ifmis.common.JsLoader"%>
<%@ page import="gov.mof.fasp.ca.user.UserDTO"%>
<%@ page import="gov.mof.fasp.sec.util.SecureUtil"%>
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
		
		UserDTO jnlpUser = SecureUtil.getCurrentUser();	    	
	    String year = SecureUtil.getUserSelectYear();   
	    String usercode = jnlpUser.getCode();   
	    String pws = jnlpUser.getPassword();   
	       
	    String protocol = request.getScheme();   
	    String ip = request.getServerName();   
	    int port = request.getServerPort();   
	    String context = request.getContextPath();
	    sun.misc.BASE64Encoder encoder = new sun.misc.BASE64Encoder(); 
	    String reportexturl = "&year="+year+"&protocol="+protocol+"&ip="+ip+"&port="+port+"&context="+context+"&usercode="+usercode+"&pws="+pws;
	    reportexturl= encoder.encode(reportexturl.getBytes("UTF-8")).replaceAll("\r\n", "");
	    reportexturl= reportexturl.replaceAll("\n", "");
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
<link type="text/css" rel="stylesheet"	href="<%=basePath%>/ltext/datatabletheme.css?t=<%=modifytime%>" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/bcal/style/bcal_btn_style.css?t=<%=modifytime%>" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/bcal/style/bcal_default.css?t=<%=modifytime%>" />
<script type="text/javascript" src="<%=basePath%>/js/scripts/jsframework.js?t=<%=modifytime%>"></script>
<link type="text/css" rel="stylesheet" href="<%=basePath%>/ltext/datatabletheme35.css?t=<%=modifytime%>" />
<script type="text/javascript" src="<%=basePath%>/js/scripts/system/data/mzdata.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/scripts/system/web/forms/mzeffect.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/scripts/system/web/ui/webcontrols/mztreeview.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/prototype.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js?t=<%=modifytime%>"></script>

<script type="text/javascript" src="<%=basePath%>/ltext/datatable3.0.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/ltext/editdatatable.js?t=<%=modifytime%>" ></script>
<script type="text/javascript" src="<%=basePath%>/js/ifmisdatatable.js?t=<%=modifytime%>"></script>
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

<script type="text/javascript" src="<%=basePath%>/js/datatable.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/export.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/tbajax.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/template.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws.js?t=<%=modifytime%>" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_filter.js?t=<%=modifytime%>" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_shadow.js?t=<%=modifytime%>" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/jquery.autocomplete.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/loadOcx.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/Evoucher.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/ftiens4.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/rightButton.js?t=<%=modifytime%>"></script>


<tiles:insert attribute="common"/>
<SCRIPT LANGUAGE="JavaScript">
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
	var REPORT_VERSION = '<%=request.getAttribute("reportversion")%>';
	var  reportexturl ="<%=reportexturl%>";
	
	var ifmisdiv = '<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_ADMINDIV%>';
	
	var evoucher_vouurl = '<%=gov.mof.fasp.ifmis.common.Globals.EVOUCHER_VOUCHURL%>';
	
	var evoucher_stampurl = '<%= gov.mof.fasp.ifmis.common.Globals.EVOUCHER_STAMPURL%>';
	
	var current_year = '<%=Calendar.getInstance().get(Calendar.YEAR)%>';
	
	var current_user ='<c:out value="${sessionScope.currentuser.code}"/>';
	var comlinkname = '<%=request.getAttribute("LINKNAME")%>';
</SCRIPT>

<title>
    <tiles:insert attribute="title" />
</title>
</head>
<body style="background:url(/ifmis_images/bg.jpg) no-repeat center top;">
<tiles:insert attribute="windowtop" />
<div id="div_all" >
    <div id="main" style="width:100%;overflow:hidden;height: 100%">
		  <div id ="context" style="width:100%;">
			<tiles:insert attribute="selfscript"/>
		  	<tiles:insert attribute="main"/>
		  	<div style="height:5px"></div>
	  	</div>
    </div>
</div>
<div id="ifmisuserdiv" style="display:none;behavior:url(#default#userData);"></div>
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
   
   <%
   //自定义标题头
   String customtitle = Globals.IFMIS_CUSTOMTITILE;
   if(null != customtitle && !"".equals(customtitle)){
  %>
	   	<script>				
	       		document.title = '<%=customtitle%>';
		</script> 
   <%} %>
