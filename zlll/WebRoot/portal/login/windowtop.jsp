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

//��λ����
String agencyType = "";
if(session.getAttribute("currentagencytype")!=null&&session.getAttribute("currentagencytype")!=""){
	agencyType = (String)session.getAttribute("currentagencytype");
}
//���ݲ������⴦��
String area_name = "";
if(session.getAttribute("area_name") != null){
	area_name = session.getAttribute("area_name").toString();
}
String intranetConfig ="";
if(session.getAttribute("intranetConfig")!="" && session.getAttribute("intranetConfig")!=null){
	intranetConfig = session.getAttribute("intranetConfig").toString();
}
//����������
String valareaName="";
java.util.Map areamap=new java.util.HashMap();
if(null!=session.getAttribute("loginAreaInfor") && !session.getAttribute("loginAreaInfor").equals("")){
    areamap=(Map)session.getAttribute("loginAreaInfor");
	if(areamap.containsKey("area_name")){
		valareaName=(String)areamap.get("area_name");
	}
}
//�Ƿ�ʹ�ü�ʱ��Ϣ
String isMessage="0";
if(session.getAttribute("isMessage")!=null){
    isMessage=(String)session.getAttribute("isMessage");
}
//��Ϣˢ�¼��
String msgrefreshtime="30000";
if(session.getAttribute("msgrefreshtime")!=null){
    msgrefreshtime=(String)session.getAttribute("msgrefreshtime");
}
//��Ϣ�Ƿ�����е�����ʾ
String popflag="false";
if(session.getAttribute("popflag")!=null){
    popflag=(String)session.getAttribute("popflag");
}
//��ʾʱ�Ƿ�ʹ��falshͼƬ
String showflash="false";
if(session.getAttribute("showflash")!=null){
    showflash=(String)session.getAttribute("showflash");
}
//��Ϣ�����Ƿ���δ����Ϣ
String unreadMsg="0";
if(session.getAttribute("unreadMsg")!=null){
    unreadMsg=(String)session.getAttribute("unreadMsg");
}
//�Ƿ�ʹ�ÿ�������
String quickhelp="0";
if(session.getAttribute("quickhelp")!=null){
    quickhelp=(String)session.getAttribute("quickhelp");
}
//������
String isShowCalculator = "0";
if(session.getAttribute("isShowCalculator")!=null){
    isShowCalculator=(String)session.getAttribute("isShowCalculator");
}//�Ƿ���ʾ��ɫ�л�
String isaccuser="0";
if(session.getAttribute("isaccuser")!=null){
    isaccuser=(String)session.getAttribute("isaccuser");
}
// begin ���޺� 2012.11.21 �˳�ʱ����Ƿ���ʾ���޴�������  1��� 0 �����
String ischeckpengding="false";
if(session.getAttribute("ischeckpengding")!=null){
    ischeckpengding=(String)session.getAttribute("ischeckpengding");
}
// end ���޺� 2012.11.21 �˳�ʱ����Ƿ���ʾ���޴�������  1��� 0 �����
//��ǰϵͳ����
java.text.SimpleDateFormat formater = new java.text.SimpleDateFormat("yyyy-MM-dd"); 
String systemdate = formater.format(new java.util.Date());
//�Ƿ�ʹ��ca��¼
String isportalca = "fasle" ;
if (session.getAttribute("isportalca")!=null ){
	isportalca = (String)session.getAttribute("isportalca");
}
//�Ƿ��л����
String changeyear=(String)session.getAttribute("changeyear"); 
//�����л������
String changeYears=(String)session.getAttribute("changeYears");
//��ǰ��¼�����
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
	//ϵͳʱ��
	var systemdate='<%=systemdate%>';
	//isMessage-->0:��ʹ�ü�ʱ��Ϣ��1��ʹ����Ϣ��2���ݲ�ʹ�ã�����ĳ���ر�����
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
	//��ʾlogoʱ��Ҫ��һЩ���ò���
	var logoconfig = {};
	logoconfig.exitshow = '<%=Globals.IFMIS_EXITSHOW_FLAG%>';
	//�˳�ʱ������
	logoconfig.ischeckpengding = '<%=ischeckpengding%>';
	//��ʾ���ػ���ˢ��
	logoconfig.refreshType = '1';
	//�л���ɫ
	logoconfig.isaccuser = '<%=isaccuser%>';
	logoconfig.isportalca = '<%=isportalca%>';
	//�Ƿ���ʾ�޸�����
	logoconfig.passwordshow = '<%=Globals.IFMIS_PASSWORDSHOW_FLAG%>';
	logoconfig.intranetConfig = '<%=intranetConfig%>';
	logoconfig.quickhelp = '<%=quickhelp%>';
	logoconfig.isMessage = '<%=isMessage%>';
	logoconfig.isShowCalculator = '<%=isShowCalculator%>';
	//����(���ݲ������⴦��)
	logoconfig.area_name = '<%=area_name%>';
	logoconfig.year = '<c:out value="${sessionScope.loginacctyear}"/>';
	logoconfig.loginAreaName = '<%=valareaName%>';
	//����
	logoconfig.agencyType = '<%=agencyType%>';
	//��λ
	logoconfig.agencyName = '<c:out value="${sessionScope.currentuseragency.name}"/>';
	//����
	logoconfig.showAcctsystype = '<%=showAcctsystype%>';
	//�û�
	logoconfig.name = '<c:out value="${sessionScope.currentuser.name}"/>';
	//�л����
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
