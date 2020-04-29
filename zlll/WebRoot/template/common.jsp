<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ page import="gov.mof.framework.util.DBUtil"%>
<%@ page import="gov.mof.fasp.systemset.dto.SystemSetDTO"%>
<%@ page import="gov.mof.fasp.systemset.bpo.ISystemSetService"%>
<%
	response.setHeader("Cache-Control","no-cache"); 
	response.setHeader("Pragma","no-cache"); 
	response.setDateHeader("Expires",0); 
	ISystemSetService systemSetService = (ISystemSetService) DBUtil.getBeanByName("fasp.systemset.systemSetBPO");
	boolean ukeycheck = false;
	try{
		SystemSetDTO systemSetDTO = systemSetService.findSystemSetByCode("common_ca_ukey");
		if(systemSetDTO!=null)ukeycheck = ("1".equals(systemSetDTO.getParamdata()));
	}catch(Exception e){}
	String timeout = "-1";
	try{
		SystemSetDTO systemSetDTO = systemSetService.findSystemSetByCode("common_timeout");
		if(systemSetDTO!=null&&systemSetDTO.isIsused())timeout = systemSetDTO.getParamdata();
	}catch(Exception e){}
%>
<%if(ukeycheck){%>
<object  id="ocxukey" classid="clsid:CC9AB409-D49F-4574-B07C-DD316E3114AD"  
style="display:none">
</object>
<object id="HTCOM" classid="CLSID:8c0c8ede-0f76-4f32-b298-ff8a16ee3b7e"></object>
<%}%>
<SCRIPT LANGUAGE="JavaScript">
<!--
var ukeytimer = null;
var timelong = 1000*60*<%=timeout%>; //��ʱ�೤ʱ�䲻������ϵͳ�˳�
var lastEventTime = (new Date()).getTime();

function toHex(number)
{
	number = number >>> 0;
	return number.toString(16);
}
//���KEY�Ƿ�������1.1.1
 
function MOF_WaitForDeviceEvent()
{
	try{
		var sign = 5;
		sign = ocxukey.MOF_WaitForDeviceEvent();
		sign = toHex(sign);
		if(sign == 1 )
		{
			return true;
		}
		if(sign == 2 )
		{
			return false;
		}
	}catch(e){
		//20130306 ��������ע�͵�
	//	return window.confirm("û�а�װUKEY�������������UKEY���������װ���Ƿ��������?");
	}
	return false;
}

function documentKeypress()
{
     if(event.keyCode==13&&event.srcElement.type=='submit')//��׽�س���,�����ύ����
     {
		 ukeyCheck();
     } 
	 lastEventTime = (new Date()).getTime();
}


function documentEvent(){
	if(event.button==1&&event.srcElement.tagName=="A"){
		//ukeyCheck();
	}
	lastEventTime = (new Date()).getTime();
}
function ukeyCheck(){
<%if(ukeycheck){%>
	var KeyNum = HTCOM.GetDeviceCount();
	if(KeyNum!=1){
		if(!MOF_WaitForDeviceEvent()){
			//window.clearTimeout(ukeytimer);
			exit();
		}
	}
<%}%>
}
function timeout(){
	window.clearTimeout(ukeytimer);
	ukeytimer = window.setTimeout("logonout()", timelong);
}
function logonout(){
	if((new Date()).getTime()-lastEventTime>=timelong){
		//alert((timelong/(1000))+"��û�в�����ϵͳ�Զ��˳�");
		window.location = "/logout.do";
		//window.close();
	}else{
		ukeytimer = window.setTimeout("logonout()", timelong-((new Date()).getTime()-lastEventTime));
	}
}
function exit(){
	//alert("UKey�����ڣ�ϵͳ�Զ��˳�");
	window.location = "/logout.do";
}

window.setTimeout("ukeyCheck()", 1000);
<%if(!"-1".equals(timeout)){%>
ukeytimer = window.setTimeout("logonout()", timelong);
//-->
</SCRIPT>
<SCRIPT LANGUAGE=javascript FOR=document EVENT=onkeypress>
documentKeypress();
</SCRIPT>
<SCRIPT LANGUAGE=javascript FOR=document EVENT=onmousedown>
documentEvent();
</SCRIPT>
<%}else{%>
//-->
</SCRIPT>
<%}%>