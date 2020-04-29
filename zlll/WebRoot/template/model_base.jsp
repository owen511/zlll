<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<jsp:directive.page import="java.util.Map"/>	
<%@ taglib uri="/WEB-INF/struts-tiles.tld" prefix="tiles" %>
<%@ page import="gov.mof.fasp.ifmis.common.Globals"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
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
%>
			
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 6.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="X-UA-Compatible" content="IE=7" />
	
<object classid="clsid:0B7A9F67-EB6F-42B4-847B-E4A451E276F6" id=WebPrinter codebase="<%=basePath%>/common/JQezPrinter.ocx#version=1.0.0.0"></object>
<OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar" 
    CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB" codebase="<%=basePath%>/common/flyie.cab#version=1,0,0,0" VIEWASTEXT>
	 <PARAM NAME="ToolBar" VALUE="0">
	 <PARAM NAME="StatusBar" VALUE="1">
	 <PARAM NAME="MenuBar" VALUE="0">     
</OBJECT>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName %>" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<link type="text/css" rel="stylesheet"	href="<%=basePath%>/style/jquery.autocomplete.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/calendar.css"/>
<script type="text/javascript" src="<%=basePath%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>	
<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/changescroll.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/calendar.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/formatNumber.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/Word_Spell.js"></script>
<script type="text/vbscript" src="<%=basePath%>/js/decode_resource.vbs"></script>
<script type="text/javascript" src="<%=basePath%>/js/ua.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/ftiens4.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/datatable.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/export.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_filter.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_shadow.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/jquery.autocomplete.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/rightButton.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/jqueryExtend.js"></script>
<tiles:insert attribute="selfscript"/>
<tiles:insert attribute="common"/>


<script type="text/javascript">
var linkvchtypeid = '<%=request.getAttribute("linkvchtypeid")%>';
var ROOT_PATH = '<%=basePath%>';
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
function setFont(fontsize){
  	if(fontsize=="l"){
  	  document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontL.css';
      setFontSession("stylefontL.css");	
    }else if(fontsize=="s"){
      document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontS.css';
      setFontSession("stylefontM.css");	
    }else{
      document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontM.css';
      setFontSession("stylefontS.css"); 
    }
    setFontCookie(fontsize);
}
//获取Code全局变量
 var codeShowConfigs = new Array();
 var codeShowConfigs_ =<%=request.getAttribute("CODESHOWCONFIG") %> ;
 if(codeShowConfigs_ != null){
   codeShowConfigs = codeShowConfigs_;
 }
  //系统CODE配置参数
 var codeShowFlag =<%=request.getAttribute("CODESHOWFLAG") %> ;
</script>


<title>
    <tiles:insert attribute="title" />
</title>


<%
   
  String showAcctsystype = null;
  
  Map hpacctsystype = (Map)session.getAttribute("hpacctsystype");
  Object acctsystypeid = session.getAttribute("acctsystype");
  if(hpacctsystype != null && acctsystypeid != null){	  
	  showAcctsystype = (String)hpacctsystype.get(acctsystypeid.toString()) ;
  }
  if(showAcctsystype == null){
	  showAcctsystype = "";
  }

//单位类型
String agencyType = "";
if(session.getAttribute("currentagencytype")!=null&&session.getAttribute("currentagencytype")!=""){
	agencyType = (String)session.getAttribute("currentagencytype");
}
 
String currentuseragencyname = "";
if(session.getAttribute("currentuseragency")!=null){
	java.util.HashMap currentuseragency = (java.util.HashMap)session.getAttribute("currentuseragency");
	currentuseragencyname = currentuseragency.get("name").toString();
}

//财政
String financial = "";
if(session.getAttribute("financial")!=null){
	financial = session.getAttribute("financial").toString();
}	  

String intranetConfig ="";
	if(session.getAttribute("intranetConfig")!="" && session.getAttribute("intranetConfig")!=null){
		intranetConfig = session.getAttribute("intranetConfig").toString();
	}
//福州财政特殊处理
String area_name = "";
if(session.getAttribute("area_name") != null){
	area_name = session.getAttribute("area_name").toString();
}
	  
%>
</head>
<body >
<div id="window_top" >
<div id="top" >
  <div id="logo">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <th rowspan="2" nowrap="nowrap"><span><img src="<%=basePath%>/images/logo/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_ADMDIV%>_logo_left.gif" /></span><span><img src="<%=basePath%>/images/logo/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_ADMDIV%>_area.gif" /></span></th>
        <td height="26" nowrap="nowrap">
        <% String exitshow = Globals.IFMIS_EXITSHOW_FLAG;
        	if(exitshow.equals("1")){
         %>
        	<div><a title="退出" href="<%=basePath%>/logout.do"><img src="<%=basePath%>/images/actions/exit.gif" width="16" height="16" border="0"/> 退出 </a></div><div class="w_gang"></div>
        <%}%>
        <div><a title="返回首页" href="<%=basePath%>/common/index.do"><img src="<%=basePath%>/images/actions/house.gif" width="16" height="16" /> 首页</a></div><div class="w_gang"></div>
        <div><img src="<%=basePath%>/images/actions/font_size.gif" width="16" height="16" border="0" title="字号" /><a href="#" onclick="setFont('l')">大</a><a href="#" onclick="setFont('m')"> 中</a><a href="#" onclick="setFont('s')"> 小</a></div><div class="w_gang"></div>
          <% 
		     //启用ca 后不在一体化系统中修改密码 20100107
		     String isportalca = "fasle" ;
		     String passwordshow = Globals.IFMIS_PASSWORDSHOW_FLAG;
			 if (session.getAttribute("isportalca")!=null ) isportalca =  (String)session.getAttribute("isportalca");
             if(passwordshow.equals("1") && isportalca.equalsIgnoreCase("false")) {%>
          <div><a title="修改密码" href="<%=basePath%>/portal/login/mod_password.jsp" target="_blank"><img src="<%=basePath%>/images/actions/mod_pwd.gif" width="16" height="16" border="0"/> 修改密码</a></div><div class="w_gang"></div>
		<% } %>

          <div><a title="进入内网" href="<%=basePath%>/common/inner.html"><img src="<%=basePath%>/images/actions/go_innerNet.gif" width="16" height="16" /> 内网</a></div><div class="w_gang"></div>
 
          <div class="w_head"></div>   
        <td width="6" nowrap="nowrap" class="w_right">&nbsp;</td>
      </tr>
      <tr>
        <td nowrap="nowrap" class="welcomeA"> 
		<%if(area_name != null && area_name != ""){ %>
       	财政:<%=area_name%> 
       <%}%>
        <%  if(agencyType!=null&&agencyType!=""){%>
        	<c:out value="${sessionScope.currentagencytype}"/>:<c:out value="${sessionScope.currentuseragency.name}"/> 
        <%}else if(currentuseragencyname!=null && currentuseragencyname!=""){%>
         单位:<c:out value="${sessionScope.currentuseragency.name}"/>&nbsp;
        <%} %>
        <%if (showAcctsystype!=null && showAcctsystype!=""){%>
         账套:<%=showAcctsystype%>
        <% } %>
         用户:<c:out value="${sessionScope.currentuser.name}"/>
         <% if(agencyType!=null&&agencyType!=""){%>日期:<%}else{%>系统日期:<%}%>         
         <span id=cdate>
         <% java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd"); 
        	out.println(formatter.format(new java.util.Date()));
         %></span></td>
        <td nowrap="nowrap">&nbsp;</td>
      </tr>   
    </table>
  </div>
  <div id="menu">
     <tiles:insert attribute="mainmenu"/>
  </div>
  <script type="text/javascript">
     var menuelement= document.getElementById("menu");
     var logoelement= document.getElementById("logo");
     menuheight = menuelement.offsetHeight;
     topheight = logoelement.offsetHeight;
  </script>
 </div>
</div>
<div id="hidden_top" align="center" ><span id="hiddenTopBar" title="隐藏上部" onClick="doHiddenTop(this)"></span></div>
<div style="position:relative;background-color:#CCCCCC; overflow:hidden;height:expression(this.offsetParent.offsetHeight-window_top.offsetHeight-hidden_top.offsetHeight-10);">
    <div id="left_tree" style="display:block; height:expression(this.offsetParent.offsetHeight-25); overflow-y:scroll">
       <tiles:insert attribute="edittree"/></div>
    <div id="switchBar" style="display:block; height:expression(this.offsetParent.style.height); overflow:hidden">
        <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
       <tr>
        <td id="hidden_left" align="center"><span id="hiddenLeftBar" title="隐藏左侧树" onClick="doHiddenLeft(this)"></span></td>
       </tr>
       </table>
    </div>
    <div id="main" style="display:block; height:expression(this.offsetParent.style.height);">    
       <tiles:insert attribute="navigation"/>
       <div id ="context">
       	<% 
       		String url = request.getRequestURI();
       	    String webRoot = request.getContextPath();
	       	 if (webRoot.length() > 0) {
	             url = url.substring(webRoot.length());
	         }
	
	         if (url.indexOf(".do") > -1) {
	             if (url.indexOf("?") > -1) {
	                 url = url.substring(0, url.indexOf("?"));
	             }
	         } else {
	        	 url ="";
	         }
       	%>
       	<ui:menufunction divid="query_t"/>
		<form id="queryform" action="<%=request.getContextPath() %><%=request.getRequestURI() %>?mainmenu=<c:out value='${param.mainmenu}'/>&submenu=<c:out value='${param.submenu}'/>" method="post">
			<ui:queryform formid="queryform"/>
			<input type ="hidden" name ="queryall" />
		</form>
		<form id="advancedQueryForm" name="advancedQueryForm" 
		action="<%=request.getContextPath() %><%=url %>?queryall=queryall&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>" method="post">   
			   <ui:advancedqueryform formid="advancedQueryForm" />
		</form>
			<div id="form_table_title">
			  <ul>
			    <li class="top">
			      <div>计划信息</div>
			    </li>
			       <li>
			       	<ui:row2column dataid="tmain" showdivname="edit_table" columnNum= "4"/>
			   	</li>
			  </ul>
			</div>
			<form name="planform" id="planform" action="#" method="post">
			<input type ="hidden" name ="maindata" id ="maindata">
			<input type ="hidden" name ="billid" id ="billid">
			<input type ="hidden" name ="fromctrlid" id ="fromctrlid">
			<!--请保留此div和a标签 -->
			<div id="containerline15">
				<div id='edit_table' style='display:none;padding:0;margin:0;' ></div>
			      <ui:datatable columndefine="true" id="tmain" tabletype="MainList" data="datalist" display="block" showcheckbox="true" />
			</div>
			</form> 
       	<tiles:insert attribute="showhelp"/>
       </div>	
    </div>	  
</div> 
</body>
</html>
