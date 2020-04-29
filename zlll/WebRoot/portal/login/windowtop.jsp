<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<jsp:directive.page import="java.util.Map"/>
<%@ taglib uri="/WEB-INF/struts-tiles.tld" prefix="tiles" %>
<%@ page import="gov.mof.fasp.ifmis.common.Globals"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%
  String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ request.getContextPath();
  String showAcctsystype = null;
  
  Map hpacctsystype = (Map)session.getAttribute("hpacctsystype");
  Object acctsystypeid = session.getAttribute("acctsystype");
  if(hpacctsystype != null && acctsystypeid != null){	  
	  showAcctsystype = (String)hpacctsystype.get(acctsystypeid.toString()) ;
  }
  if(showAcctsystype == null){
	  showAcctsystype = "";
  }
  String hsagnecy = null;
  if(session.getAttribute("hsagencyname") != null){
	  hsagnecy =  "/"+session.getAttribute("hsagencycode").toString()+"-"+session.getAttribute("hsagencyname").toString();
  }
  
  String isbudget = "";
  if(session.getAttribute("isbudget") != null){
	  isbudget =  session.getAttribute("isbudget").toString();
  }
  if (showAcctsystype!=null && showAcctsystype!="" && isbudget.equals("2") && hsagnecy != null ){
	  showAcctsystype += hsagnecy;
  }
  String currentuseragencyname = "";
if(session.getAttribute("currentuseragency")!=null){
	java.util.HashMap currentuseragency = (java.util.HashMap)session.getAttribute("currentuseragency");
	currentuseragencyname = currentuseragency.get("name").toString();
}

//单位类型
String agencyType = "";
if(session.getAttribute("currentagencytype")!=null&&session.getAttribute("currentagencytype")!=""){
	agencyType = (String)session.getAttribute("currentagencytype");
}
//福州财政特殊处理
String area_name = "";
if(session.getAttribute("area_name") != null){
	area_name = session.getAttribute("area_name").toString();
}
String intranetConfig ="";
if(session.getAttribute("intranetConfig")!="" && session.getAttribute("intranetConfig")!=null){
	intranetConfig = session.getAttribute("intranetConfig").toString();
}
//地区的名称
String valareaName="";
java.util.Map areamap=new java.util.HashMap();
if(null!=session.getAttribute("loginAreaInfor") && !session.getAttribute("loginAreaInfor").equals("")){
    areamap=(Map)session.getAttribute("loginAreaInfor");
	if(areamap.containsKey("area_name")){
		valareaName=(String)areamap.get("area_name");
	}
}
//是否使用即时消息
String isMessage="0";
if(session.getAttribute("isMessage")!=null){
    isMessage=(String)session.getAttribute("isMessage");
}
//消息刷新间隔
String msgrefreshtime="30000";
if(session.getAttribute("msgrefreshtime")!=null){
    msgrefreshtime=(String)session.getAttribute("msgrefreshtime");
}
//消息是否集体进行弹出提示
String popflag="false";
if(session.getAttribute("popflag")!=null){
    popflag=(String)session.getAttribute("popflag");
}
//提示时是否使用falsh图片
String showflash="false";
if(session.getAttribute("showflash")!=null){
    showflash=(String)session.getAttribute("showflash");
}
//消息中心是否有未读消息
String unreadMsg="0";
if(session.getAttribute("unreadMsg")!=null){
    unreadMsg=(String)session.getAttribute("unreadMsg");
}
//是否使用快速提问
String quickhelp="0";
if(session.getAttribute("quickhelp")!=null){
    quickhelp=(String)session.getAttribute("quickhelp");
}
//计算器
String isShowCalculator = "0";
if(session.getAttribute("isShowCalculator")!=null){
    isShowCalculator=(String)session.getAttribute("isShowCalculator");
}//是否显示角色切换
String isaccuser="0";
if(session.getAttribute("isaccuser")!=null){
    isaccuser=(String)session.getAttribute("isaccuser");
}
// begin 楚艳红 2012.11.21 退出时检测是否提示有无待办事项  1检测 0 不检测
String ischeckpengding="false";
if(session.getAttribute("ischeckpengding")!=null){
    ischeckpengding=(String)session.getAttribute("ischeckpengding");
}
// end 楚艳红 2012.11.21 退出时检测是否提示有无待办事项  1检测 0 不检测
//当前系统日期
java.text.SimpleDateFormat formater = new java.text.SimpleDateFormat("yyyy-MM-dd"); 
String systemdate = formater.format(new java.util.Date());
//是否使用ca登录
String isportalca = "fasle" ;
if (session.getAttribute("isportalca")!=null ){
	isportalca = (String)session.getAttribute("isportalca");
}
//是否切换年度
String changeyear=(String)session.getAttribute("changeyear"); 
//用来切换的年度
String changeYears=(String)session.getAttribute("changeYears");
//当前登录的年度
String titleYear = (String)session.getAttribute("loginacctyear"); 
String areaInfo=(String)session.getAttribute("areaInfo");
String ukeycheck=(String)session.getAttribute("ukeycheck");
%>
<script type="text/javascript">
	var titleYear=eval('<%=titleYear%>');
	var allAreaInfo='<%=areaInfo%>';
	var areaInfo=eval('<%=areaInfo%>');
	var changeYears=eval('<%=changeYears%>');
	var _ROOT_PATH_='<%=basePath%>';
	//系统时间
	var systemdate='<%=systemdate%>';
	//isMessage-->0:不使用即时消息；1：使用消息；2：暂不使用（处理某种特别需求）
	var ismessage='<%=isMessage%>';
	var msgrefreshtime='<%=msgrefreshtime%>';
	var unreadMsg='<%=unreadMsg%>';
	var popflag=<%=popflag%>;
	var showflash=<%=showflash%>;
</script> 
		 <%
			String area = gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO;
			String logo = "/style/" + area + "_logo.css";
			if ("yueyang, loudi, gansu".indexOf(area) != -1){
			    logo = "/portal/style/" + area + "_logo.css";
			}
		 %>
		<link rel="stylesheet" type="text/css" href="<%=basePath%><%=logo %>"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/portal/style/message.css"/>
		<script type="text/javascript" src="<%=basePath%>/portal/js/login/ltext_common_menu.js"></script>
		<script type="text/javascript" src="<%=basePath%>/portal/js/login/ltext_common_util.js"></script>
<div id="window_top" >
<div id="top" >
  <div id="logo">
  </div>
  <script type="text/javascript">
	//显示logo时需要的一些配置参数
	var logoconfig = {};
	logoconfig.exitshow = '<%=Globals.IFMIS_EXITSHOW_FLAG%>';
	//退出时待办检测
	logoconfig.ischeckpengding = '<%=ischeckpengding%>';
	//显示返回还是刷新
	logoconfig.refreshType = '1';
	//切换角色
	logoconfig.isaccuser = '<%=isaccuser%>';
	logoconfig.isportalca = '<%=isportalca%>';
	//是否显示修改密码
	logoconfig.passwordshow = '<%=Globals.IFMIS_PASSWORDSHOW_FLAG%>';
	logoconfig.intranetConfig = '<%=intranetConfig%>';
	logoconfig.quickhelp = '<%=quickhelp%>';
	logoconfig.isMessage = '<%=isMessage%>';
	logoconfig.isShowCalculator = '<%=isShowCalculator%>';
	//财政(福州财政特殊处理)
	logoconfig.area_name = '<%=area_name%>';
	logoconfig.year = '<c:out value="${sessionScope.loginacctyear}"/>';
	logoconfig.loginAreaName = '<%=valareaName%>';
	//类型
	logoconfig.agencyType = '<%=agencyType%>';
	//单位
	logoconfig.agencyName = '<c:out value="${sessionScope.currentuseragency.name}"/>';
	//账套
	logoconfig.showAcctsystype = '<%=showAcctsystype%>';
	//用户
	logoconfig.name = '<c:out value="${sessionScope.currentuser.name}"/>';
	//切换年度
	logoconfig.changeyear = '<%=changeyear%>';
	logoconfig.ukeycheck = '<%=ukeycheck%>';
	new Ext.lt.portal.component.logo.showLogo('logo',logoconfig);
</script>
  <%String showmenu = Globals.IFMIS_SHOWMENUFLAG;
	if(showmenu.equals("1")){%>
  <div id="menu">
     <tiles:insert attribute="mainmenu"/>
  </div>
  <%} %>
  <script type="text/javascript">
     var menuelement= document.getElementById("menu");
     var logoelement= document.getElementById("logo");
     menuheight = menuelement?menuelement.offsetHeight:0;
     topheight = logoelement.offsetHeight;
  </script>
 </div>
</div>
<%if("1".equals(isMessage)){%>
<div id="eMengbg" style="display:none;bottom:0;right:0;background:url(/portal/images/msgImages/wininfo_k.png); Z-INDEX:999;  no-repeat left top; width:278px; height:193px; POSITION: absolute;overflow:hidden;"></div>
<%} %>
