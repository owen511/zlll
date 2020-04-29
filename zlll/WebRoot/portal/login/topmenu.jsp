<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ page import="java.util.List"%>
<%@page import="java.util.Map"%>
<jsp:directive.page import="gov.mof.fasp.ca.user.UserDTO" />
<jsp:directive.page import="gov.mof.fasp.sec.util.SecureUtil" />
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path;
String mainmenuid = request.getParameter("parentmenu")!=null?request.getParameter("parentmenu"):"";
String submenuid = request.getParameter("submenu")!=null?request.getParameter("submenu"):"";
List menuids = (List)request.getAttribute("menuids");
if(!"".equals(submenuid)&&"".equals(mainmenuid)&&menuids!=null){
	for(int i = 0;i < menuids.size();i ++){
		Map m = (Map)menuids.get(i);
		if(m.get(submenuid)!=null){
			mainmenuid = (String)m.get(submenuid);
			break;
		}
	}
}
%>
<style>
.topmenu_tops li.selected{
	list-style-type: none;
	float :left;
	background:url(<%=basePath%>/portal/images/menuright_over.gif) repeat right center;
}
.topmenu_tops li.selected div{
	background:url(<%=basePath%>/portal/images/menuleft_over.gif) no-repeat left center;
}

.topmenu_tops li.select{
	list-style-type: none;
	float :left;
	background:url(<%=basePath%>/ltext/images/popupmenu/menuright.gif) repeat right center;
}
.topmenu_tops li.select div{
	background:url(<%=basePath%>/ltext/images/popupmenu/menuleft.gif) no-repeat left center;
}

</style>
<div  id="winmenu" layout="{h:{fit:28},w:{fit:true}}" style="background:url(<%=basePath%>/ltext/images/popupmenu/menu_bg.gif);">
	<div id="topmenu" layout="{h:{fit:28},w:{fit:true}}" ></div>
</div>
<%
	//3,1,0,0
	String ltrpt_webstart_version=(String)session.getAttribute("ltrpt_webstart_version"); 
	if(ltrpt_webstart_version==null||"".equals(ltrpt_webstart_version)){
		ltrpt_webstart_version="3,1,0,0";
	}
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
    reportexturl = encoder.encode(reportexturl.getBytes("UTF-8")).replaceAll("\r\n", "");
    reportexturl = reportexturl.replaceAll("\n", "");
 %>
<object classid="CLSID:E1D2CA62-FA6D-40F0-9680-DBC40A067C8F" codebase="<%=request.getContextPath()%>/common/webstart.cab#version=<%=ltrpt_webstart_version %>"
 width="0" height="0" title="a" id="ltrptocx" name="ltrptocx"></object>
<script>
	var mainmenuid = '<%=mainmenuid%>';
	var submenuid = '<%=submenuid%>';
	var selectedMenuid = [];
	if(mainmenuid!=''&&submenuid!=''){
		selectedMenuid.push(mainmenuid);
	}
	var REPORT_VERSION = '<%=request.getAttribute("reportversion")%>';
	var reportexturl ="<%=reportexturl%>";
	//二级菜单
	var treemenujson=<%=request.getAttribute("treemenujson")%>;
	//判断treemenujson是否为空。如果为空不走下面的for循环。
	if(null!=treemenujson && treemenujson!='' && treemenujson.length!=0){
	for(var i = 0;i < treemenujson.length;i ++){
		var topObj = treemenujson[i];
		if(topObj.click!=null){
			var target = topObj.clickhref;
			if(target.indexOf("javascript:openReport(")>=0||(target.indexOf("/longtu/report")>=0&&reportexturl!=null)){
				topObj.click=function(topObj){
					var target = topObj.clickhref;
					if (isLinked(target)) {
			    		if(target.indexOf("javascript:openReport(")>=0){
			    			target = target.substring(22,target.indexOf(")"));
			    			openReport(target);
			    		}else if(target.indexOf("/longtu/report")>=0&&reportexturl!=null){
							target += ((target.indexOf("?")==-1)?"?":"&")+Base64.decode(reportexturl);
							try{
								if(document.all.ltrptocx==undefined||document.all.ltrptocx.object==null){ // 点击系统管理左侧报表定义等菜单项，判断ltrpt是否存在，不存在则允许自动安装或弹出下载提示
									Ext.lt.ifmis.activex.loadLTReportOcx();
								}
								ltrptocx.openJnlpProgram('RPT',
							            REPORT_VERSION,
										ROOT_PATH+'/common/jre6.zip',
										target,
										target.substring(target.indexOf('?')+1));	
							 }catch(ex){
								 alert("调用ltrptocx异常："+ex);	
							 }
				    	}
				    }
				}
			}else{
				topObj.click=function(topObj){
					var ieHeight = topObj.h;
					var ieWidth = topObj.w;
					window.showModalDialog(ROOT_PATH+topObj.clickhref,window,"dialogHeight:"+ieHeight+"px;dialogWidth:"+ieWidth+";resizable: No; status: No; help:No;");		
				};
			}
		}
	}
	
	var topmenu=new Ext.lt.topmenu({
			data:treemenujson,
			field:{id:'id',name:'name',sid:'sid'},
			//maxHeight:'auto',
			values:selectedMenuid,
			//scroll:true,
			correction:0
		});
	topmenu.draw(document.getElementById('topmenu'));
	}
	//模态窗口
	function openModel(topObj){
					var ieHeight = topObj.h;
					var ieWidth = topObj.w;
					window.showModalDialog(topObj.clickhref,window,"dialogHeight:"+ieHeight+"px;dialogWidth:"+ieWidth+";resizable: No; status: No; help:No;");		
	};
	//打开龙图报表
	function openReport(topObj){
					var target = topObj.clickhref;
					if (isLinked(target)) {
			    		if(target.indexOf("javascript:openReport(")>=0){
			    			target = target.substring(22,target.indexOf(")"));
			    			openReport(target);
			    		}else if(target.indexOf("/longtu/report")>=0&&reportexturl!=null){
							target += ((target.indexOf("?")==-1)?"?":"&")+Base64.decode(reportexturl);
							try{
								if(document.all.ltrptocx==undefined||document.all.ltrptocx.object==null){ // 点击系统管理左侧报表定义等菜单项，判断ltrpt是否存在，不存在则允许自动安装或弹出下载提示
									Ext.lt.ifmis.activex.loadLTReportOcx();
								}
								ltrptocx.openJnlpProgram('RPT',
							            REPORT_VERSION,
										ROOT_PATH+'/common/jre6.zip',
										target,
										target.substring(target.indexOf('?')+1));	
							 }catch(ex){
								 alert("调用ltrptocx异常："+ex);	
							 }
				    	}
				    }
				}
	/*
	//动态添加菜单方法：
	//打开的窗口
	topmenu.additem({id:4200000,name:'test1',code:'test1',sid:42000200,href:'http://192.168.3.17:6000/',target:'_blank'});
	topmenu.reflash(); 
	//模态窗口
	topmenu.additem({id:4200010,name:'test2',code:'test2',sid:42000200,click:openModel,clickhref:'http://192.168.3.17:6000/',w:'200px',h:'100px'});
	topmenu.reflash(); 
	//打开龙图报表
	topmenu.additem({id:4200020,name:'test3',code:'test3',sid:42000200,click:openReport,clickhref:'/longtu/report?openModel=7&isMenu=yes&mainmenu=26900938&submenu=75000003'});
	topmenu.reflash();
	*/
</script>