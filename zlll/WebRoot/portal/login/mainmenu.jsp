<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%
  String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
		+ request.getContextPath();
  //是否显示在线人数
  String onlineUser=(String)session.getAttribute("onlineUser"); 
  //在线人数统计间隔
  String onlinetime=(String)session.getAttribute("onlinetime"); 
	//3,1,0,0
	String ltrpt_webstart_version=(String)request.getSession().getAttribute("ltrpt_webstart_version"); 
	if(ltrpt_webstart_version==null||"".equals(ltrpt_webstart_version)){
		ltrpt_webstart_version="3,1,0,0";
	}
	String indexjsp = (String)request.getSession().getAttribute("indexjsp");
 %>
<script type="text/javascript">
	var menuconfig = <%=request.getAttribute("menujson")%>;  
</script>
<style>
		
        .pp{
	    width:40%;
	    float:left;
	    padding-left:3%;
	    padding-right:3%;
        }
        .fontcolor   {color:#000000}
        .sngPst {
			FONT-SIZE: 12px; COLOR: #000; LINE-HEIGHT: 15px
		}
		.divline{
			BORDER-BOTTOM: #8BA3DA 1px dotted;
		}

</style>
  <script type="text/javascript" src="<%=request.getContextPath()%>/js/changescroll2.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/login/gsSso.js"></script>
  
<OBJECT
	  classid="clsid:9252769C-08EF-4E3A-9E04-490D76C0C832"
	  codebase="<%=request.getContextPath()%>/portal/appcaller.cab#version=1,0,0,0"
	  width="0"
	  height="0"
	  visible="0" 
	  style="display:none"
	  id="AppCaller"
>
    <param name="Visible" value="0">
    <param name="Enabled" value="-1">
    <param name="ParentBackground" value="0">
    <param name="DoubleBuffered" value="0">
    <param name="HideBar" value="0">
</OBJECT>
<%if(indexjsp=="30"){%>
  <OBJECT ID="ATL1" CLASSID="CLSID:{7FBD3C43-8609-4C8F-B46D-0633BEC7BC83}"codebase="<%=basePath%>/portal/setstate.cab#version=3,0,17,1"> 
  </OBJECT> 
<%}%>
<!-- 菜单div -->
<div id='menuid'></div>
<script language="javascript">	
//调用菜单组件
//menuconfig.totalmenus = menuconfig.totalmenus.toArray();
//new Ext.lt.portal.component.menu.showMenu('menuid',menuconfig);
</script>
<object classid="CLSID:E1D2CA62-FA6D-40F0-9680-DBC40A067C8F" codebase="<%=request.getContextPath()%>/common/webstart.cab#version=<%=ltrpt_webstart_version %>"
 width="0" height="0" title="a"  style="display:none" id="ltrptocx" name="ltrptocx"></object>
<script language="javascript">
  try{
  	AppCaller.initIE();
  	}catch(e){}

//是否使用在线人数统计
var onlineUser='<%=onlineUser%>';
var onlinetime='<%=onlinetime%>';
if("1"==onlineUser){
	new Ext.lt.portal.component.onlineuser();
}
</script>
