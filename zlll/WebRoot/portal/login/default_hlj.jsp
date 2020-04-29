<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ page import="java.util.*"%>

<%@ page import="gov.mof.fasp.ifmis.portal.portalmanage.userprogramset.dto.VMenu"%>
<%@ page import="gov.mof.fasp.ca.menu.MenuDTO"%>
<%@ page import="gov.mof.fasp.ifmis.portal.portlets.post.PostDTO"%>
<%@ page import="gov.mof.fasp.ifmis.portal.portlets.quickguidmenu.QuickGuidMenuDTO"%>
<%@ page import="gov.mof.fasp.ifmis.portal.portlets.report.ReportMaintenanceDTO"%>
<script> 
<!-- 
//页面加载后，使IE最大化
if(document.all){
	window.moveTo(0,0); 
	top.window.resizeTo(screen.availWidth,screen.availHeight); 
}
//--> 
</script>
<%
List report_list = (List)request.getAttribute("report_list");
//http://192.168.3.128:7001/fcas
    String report_pserver = "";
    String report_param = "";
    String report_fcasip = "";
    if(report_list!=null&&report_list.size()>0){
		ReportMaintenanceDTO reportMaintenanceDTO =(ReportMaintenanceDTO)report_list.get(0);
		report_pserver = reportMaintenanceDTO.getPserver();
		String refresh = reportMaintenanceDTO.getRefresh();
		String reportname = reportMaintenanceDTO.getReportname();
		report_param = reportMaintenanceDTO.getReportparam();
		String showpeople = reportMaintenanceDTO.getShowpeople();
		report_fcasip = reportMaintenanceDTO.getFcasip();%>
		<script type='text/javascript' src='<%=report_fcasip %>/fcas/js/outermouse.js'></script>
		<%
    }
 %>
<style>
.pp {
	width: 40%;
	float: left;
	padding-left: 3%;
	padding-right: 3%
}

.inner_title {
	font-size: 14px;
	color: blue;
	margin-left: 20px;
	margin-top: 10px;
	display: block;
	margin-bottom: 5px;
}
.title_orange{
 font-size:16px;
 color:#DD7D2E;
 height:30px;
 line-height:30px;
 border-bottom:2px #2C609C solid;
 margin-right:20px;
 }
 .title_report{
 font-size:13px;
 color:#DD7D2E;
 height:25px;
 border-bottom:2px #2C609C solid;
 margin-right:20px;
 }
 .title_report ul{list-style:none;margin:0;}
  .title_report ul li{float:left; margin-right:5px; padding:3px; border:1px #CCC solid; background-image:url(../images/bg/yeqian_report.gif); background-repeat:repeat-x; background-position:left bottom; cursor:pointer;}
  .title_report ul li.selected{float:left; margin-right:5px; padding:3px; border:1px #2C609C solid; background-image:url(../images/bg/yeqian_report.gif); background-repeat:repeat-x; background-position:left bottom; cursor:pointer; color:#2C609C;}
   .font_yeqian{ color:#FFF; cursor:pointer;}
  .font_yeqian_selected{ color:#CCC; cursor:pointer;}
</style>

<script>

<%
	//自动调用首页功能，相当于与首页自动刷新
	if(request.getAttribute("refreshtime")!=null){
		String refreshtime = (String) request.getAttribute("refreshtime");
		if(!refreshtime.equals("0")){
			%>
			window.setTimeout("window.location.href='<%=request.getContextPath()%>/common/index.do';", <%=refreshtime%>);
			<%
		}
	}
	//获取session失效与否，如果session失效，弹出提示，关闭窗口
	if(request.getAttribute("sessiontime")!=null){
		String refreshtime = (String) request.getAttribute("sessiontime");
		if(!refreshtime.equals("0")){
			%>
			window.setTimeout("window.location.href='<%=request.getContextPath()%>/getsession.do';", <%=refreshtime%>);
			<%
		}
	}

	String programstr=(String)session.getAttribute("isnullmenu");
	if(programstr!=null&&programstr.equalsIgnoreCase(""))
	{%>
	alert("请使用admin用户登录进行业务系统配置！");
	<%}
	session.removeAttribute("isnullmenu");
	%>
var menuid="";
var hosturl="";
var menuname="";
var type="";
var uid="";
var sid="";
var year="";
function pendingtask(){
  		new Ajax.Request("<%=request.getContextPath()%>/common/pendingtask.do?random="+Math.random(), 
     	{
	   		parameters : "menuid="+menuid+"&hosturl=" + hosturl+"&menuname=" + menuname+"&type=" + type+"&uid=" + uid+"&sid=" + sid+"&year=" + year,
	   		method: 'get', 
	   		onComplete : showPendingTask,
	   		requestHeaders: {Accept: 'application/json'},
	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
	     	netWorkEception();
	        }
		}); 
	}
	
	function showPendingTask(resp){
	    var json = resp.responseText.evalJSON(true);  
	    var totallist = eval(json.totallist);
	    for(var index=0;index<totallist.size();index++)
	    {
		    var pendingtasks=totallist[index];
		    //alert(Object.toJSON(pendingtasks));
		    var taskStr="";
		    if(pendingtasks.size()>0){
			   if(pendingtasks[0].outter!=1)
			   {
				   if(pendingtasks[0].name==undefined)
				   {
					    var k=pendingtasks[0].k;
						var menuname=pendingtasks[0].menuname;
						taskStr=taskStr+"<p style='display:block; overflow:auto;'>";
						taskStr=taskStr+"<a class=inner_title >"+menuname+"&nbsp&nbsp&nbsp&nbsp<b style='color:#000; font-weight:normal;'></b>"+"</a>";
						taskStr=taskStr+"</p>";
						eval("$('"+k+"').innerHTML=taskStr");
			       }
			       else{
					   var count=0;
					   taskStr=taskStr+"<p style='height:150px; display:block; overflow:auto;'>";
					   taskStr=taskStr+"<a class=inner_title >"+pendingtasks[0].menuname+"</a>";
					   taskStr=taskStr+"<table width=98% border=0 cellpadding=0 cellspacing=0>";
				       for(i=0; i<pendingtasks.size();i++) {
				       		count++;
							var pendingtask= pendingtasks[i];
							var details = pendingtask.details;
							var hostip = pendingtask.hostip;
							var hostport=pendingtask.hostport;
							var localip = pendingtask.localip;
							var localport=pendingtask.localport;
							var uid=pendingtask.uid;
							var k = pendingtask.k;
							var sid=pendingtask.sid;
							var year=pendingtask.year;
							
							if(count%2==1)
							{
			      				taskStr=taskStr+"<tr>";
			    			}
							taskStr=taskStr+"<td width='45%' style='vertical-align:top;'>"+"<span>";
							taskStr=taskStr+"<img src=\"<%=request.getContextPath()%>/images/bg/top.gif\"/>";
							taskStr=taskStr+pendingtask.name+"----->共"+pendingtask.totalcount+"条<br/>";
							for(j=0;j<details.size();j++)
							{
							    taskStr=taskStr+"&nbsp"+"<img src=\"<%=request.getContextPath()%>/images/bg/20.png\" />";
							    detail=details[j];
							    var url="http://"+hostip+":"+hostport+detail.linkName;
							    url=url.replace(/&/g, "%26");
							    if(hostip==""&&hostport==""){
							       taskStr=taskStr+"<a href=\"<%=request.getContextPath()%>";
							      taskStr=taskStr+detail.linkName+"\">";
							    }   
							    else if(hostip==localip&&hostport==localport)
								{
							      taskStr=taskStr+"<a href=\"<%=request.getContextPath()%>";
							      taskStr=taskStr+detail.linkName+"\">";
							    }
							    else{
							       taskStr=taskStr+"<a href=\"http://";
							       taskStr=taskStr+hostip+":"+hostport+"/common/pendingtasklogin.do"+"?uid="+uid+"&sid="+sid+"&year="+year+"&url="+url+"\">";
							    }
							    taskStr=taskStr+"&nbsp待"+detail.operattypedto.name+"&nbsp"+detail.totalcount+"条</a>";
				   				taskStr=taskStr+"<br/>";   
						    } 
							taskStr=taskStr+"</span>"+"</td>";
							if(count%2==0){
			      			    taskStr=taskStr+"</tr>";
			    			}  
					    }
						taskStr=taskStr+"</table>";
						taskStr=taskStr+"</p>";
						eval("$('"+k+"').innerHTML=taskStr"); 
				    }
			   }
			   if(pendingtasks[0].outter==1){
				   
				   for(i=0; i<pendingtasks.size();i++) {
				   	taskStr=taskStr+"<p  display:block;'>";
				      pendingtask= pendingtasks[i];
				      var k=pendingtask.k;
				      var details = pendingtask.details;
				      var name_tem = pendingtask.name_tem;
				      taskStr=taskStr+"<img src=\"<%=request.getContextPath()%>/images/bg/top.gif\"/>";
				      if(pendingtask.type==1)
					  {  
				      	taskStr=taskStr+"<a href=\""+pendingtask.Url+"\" target='_blank'>";
				      	taskStr=taskStr+pendingtask.name+"</a>";
				      }else{
				      	taskStr=taskStr+"<a href=\""+pendingtask.Url+"\">";
				      	taskStr=taskStr+pendingtask.name+"</a>";
				      }
				      if(pendingtask.count>0){
				        taskStr=taskStr+"----->共"+pendingtask.count+"条<br/>";
				       }
				       taskStr=taskStr+"<br/>"; 
				       taskStr=taskStr+"<span>";
				       if(name_tem.size()>0){
				       taskStr=taskStr+"<table border=0>";
				       	for(o=0;o<name_tem.size();o++){
				       	if(o%2==0)
							{
			      				taskStr=taskStr+"<tr>";
			    			}
				       	    taskStr=taskStr+"<td width='300' style='vertical-align:top;'>";
				       		taskStr=taskStr+"&nbsp"+"<img src=\"<%=request.getContextPath()%>/images/bg/20.png\" />";
				       		taskStr=taskStr+name_tem[o];
				       		
				       		taskStr=taskStr+"<br/>";
				       		for(j=0;j<details.size();j++)
							   { 
							      detail=details[j];
							      //taskStr=taskStr+"&nbsp"+"<img src=\"<%=request.getContextPath()%>/images/bg/20.png\" />";
							      if(detail.totalcount>0){
							      if(detail.menuname == name_tem[o] ){
							         if(pendingtask.type==1)
							         {  
							         	//taskStr=taskStr+"<a href=\""+detail.JobUrl+"&nbsp;"+detail.status+"\">"+detail.totalcount+"条</a>";
							         	taskStr=taskStr+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+"<a href=\""+detail.JobUrl+"\" target='_blank'>"+detail.status+"<"+detail.totalcount+"条></a>";
							         	taskStr=taskStr+"<br/>";
			                         }
			                         else
			                         {
			                            taskStr=taskStr+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+detail.status+"&nbsp;<"+detail.totalcount+"条>";
			                            taskStr=taskStr+"<br/>"; 
			                         }
			                       }
							       }
							       if(detail.totalcount==0){
							           taskStr=taskStr+"&nbsp"+detail.status; 
							           taskStr=taskStr+"<br/>"; 
							        }
							        
						       }
				       		
				       		taskStr=taskStr+"</td>";
				       		if(o%2==1)
							{
			      				taskStr=taskStr+"</tr>";
			    			}
				       	}
				       	taskStr=taskStr+"</table>";
				       }else{
				       for(j=0;j<details.size();j++)
					   {
					      detail=details[j];
					      taskStr=taskStr+"&nbsp"+"<img src=\"<%=request.getContextPath()%>/images/bg/20.png\" />";
				         if(pendingtask.type==1)
				         {  
				            if(detail.totalcount>0){
					         	taskStr=taskStr+"<a href=\""+detail.JobUrl+"\" target='_blank'>"+detail.status+"<"+detail.totalcount+"条></a>";
				         	}
				         	if(detail.totalcount==-1){
				         		taskStr=taskStr+"<a href=\""+detail.JobUrl+"\" target='_blank'>"+detail.status+"</a>";
				         	}
                         }
                         else
                         {
                         	if(detail.totalcount>0){
                            	taskStr=taskStr + detail.status+"&nbsp;<"+detail.totalcount+"条>";
                            }
                            if(detail.totalcount==-1){
				         		taskStr=taskStr + detail.status;
				         	}
				         }
					      if(detail.totalcount==0){
					         taskStr=taskStr+"&nbsp"+detail.status; 
					        }
					        taskStr=taskStr+"<br/>"; 
				       }
				       }
				       taskStr=taskStr+"</span>";
				       taskStr=taskStr+"</p>"; 
				  		if(pendingtask.count>0){
				   		eval("$('"+k+"').innerHTML=taskStr");  
				   	   }
				   	   if(pendingtask.count<0){
				   	   	eval("$('"+k+"').innerHTML=taskStr");  
				   	   } 
				    }
				     
			    }
		    }//pendingtasks>0
		    		progressBarNext(1);
	   }//for
		
	}
	
	function switchReport(obj,num,totalnum){
		var oo = document.getElementById("reportShow").getElementsByTagName('li');
		for(var t=0;t<oo.length;t++){
			oo[t].className='noselected';
		}
		obj.className='selected';
		var dividid = 'report_';
		for(var t=0;t<totalnum;t++){
			dividid = dividid +(t+1);
			document.getElementById(dividid).style.display = "none"; 
			dividid = 'report_';
		}
		var divid_show = 'report_'+num;
		document.getElementById(divid_show).style.display = "block";
		//alert(num);
		//alert(totalnum);
	}
</script>

<%
	byte[] password = (byte[]) request.getAttribute("sidpas");
	StringBuffer sbf = new StringBuffer();
	for (int i = 0; i < password.length; i++) {
		sbf.append(password[i]);
		sbf.append("|");
	}
	String sidpas = sbf.toString().substring(0,
			sbf.toString().length() - 1);
	String isportalyear = (String) request.getAttribute("isportalyear");
	String isbulletin = (String) request.getAttribute("isbulletin");
	//sessionid
	String report_sid = (String)request.getAttribute("report_sid");
	//是否使用首页展示报表功能
	String isshowreport = (String)request.getAttribute("isshowreport");
	//年度 不要字符串
	String report_year = (String) request.getAttribute("year");
	String report_pserver_tem = "";
	String report_param_tem = "";
	String report_fcasip_tem = "";
	String acctyear = "";
	if (isportalyear.equalsIgnoreCase("false")) {
		acctyear = (String) request.getAttribute("year");
	} else {
		acctyear = (String) request.getAttribute("acctyear");
	}
	String uid = (String) request.getAttribute("userCode");
	String isportal = (String) request.getAttribute("isportal");//判断是否用portal
	List portalMenus = (List) request.getAttribute("portalMenus");
	List totalmenus_tmp = (List) request.getAttribute("totalmenus");
	List authmenulist=(List)session.getAttribute("authmenulist");
	List totalmenus =new ArrayList();
	if(authmenulist==null)
	{
		for(int index=0;index<totalmenus_tmp.size();index++)
	  	{
	  		totalmenus.add(totalmenus_tmp.get(index));
	  	}
	}
	else{
		for(int m=0;m<totalmenus_tmp.size();m++)
	    {
	    	try {
					MenuDTO menu = (MenuDTO) totalmenus_tmp.get(m);
					for(int n=0;n<authmenulist.size();n++)
				  	{
				  	 	Map authmenu =(Map)authmenulist.get(n);
				  	 	if(menu.getMenuid()==Integer.parseInt(authmenu.get("menuid")+""))
				  	 	{
				  	 		totalmenus.add(menu);
				  	 		break;
				  	 	}
				  	 }
			} catch (java.lang.ClassCastException e) {
					VMenu menu = (VMenu) totalmenus_tmp.get(m);
					totalmenus.add(menu);
			}
				  	 
	    }
	}
	
%>
<%
    List quickguidMenu = (List) request.getAttribute("quickguidMenu");
	if (isbulletin.equals("false")&&quickguidMenu.size()==0) {
%>
<div id="default_center">
	<%
		} else {
	%>
	<div id="default_center"
		style="width: expression(document . body . clientWidth-527); float: left; margin-left: 1%; margin-top: 1%;">
		<%
			}
		%>
		<div id="default_top_simple">
			<div style="width:100%;"><span>待办事项</span></div>
		</div>
		<div id="default_middle_simple"
			style="height: expression(document .         body .         clientHeight-window_top .         offsetHeight-120);">
		<div id='context'></div>
			<span id="middle_inner">
									<!-- 黑龙江 待办事项的进度条-->
			<script type="text/javascript">
				/******\u5173\u95ed\u6d6e\u52a8\u5c42 start*****/
				/**/
				function findPosX(obj,overObj) {
				var curleft = 0;
				
				if (obj.offsetParent) { //返回父类元素，大多说offsetParent返回body
				   while (obj.offsetParent) {//遍历所有父类元素
				   	if(overObj!=null&&obj==overObj){
						break;
					}
				    curleft += obj.offsetLeft;//当前元素的左边距
				    obj = obj.offsetParent;
				   }
				} else if (obj.x) curleft += obj.x;
				return curleft;
				}
				
				function findPosY(obj,overObj) {
				var curtop = 0;
				
				if (obj.offsetParent) {
				   while (obj.offsetParent) {
					if(overObj!=null&&obj==overObj){
						break;
					}
				    curtop += obj.offsetTop;
				    obj = obj.offsetParent;
				   }
				} else if (obj.y) curtop += obj.y;
				return curtop;
				}
				
				function show2(vwidth,vheight,top,left){
					if(!document.getElementById("mask")){
						var d_mask=document.createElement('div');
				    	d_mask.id="mask";
				    	document.getElementById("context").appendChild(d_mask);
				    }else{
				    	var d_mask=document.getElementById("mask");
				    }
				    if(!document.getElementById("LoadStatu’s")){
				    	var d_dialog = document.createElement('div');
					    d_dialog.id = "LoadStatus"; 
					    d_dialog.style.background='';
					    var objHtml = "<table border=\"0\" cellpadding=\"0\"  cellspacing=\"0\">";
					    objHtml = objHtml + "<tr><td>";
					    objHtml = objHtml + "<div style=\"height:60px;\"><img src=\"/images/actions/loading_green.gif\" /> ";
					    objHtml = objHtml + "<div id='pBarTextId'>\u5904\u7406\u4e2d\uff0c\u8bf7\u7a0d\u540e......</div>";
					    objHtml = objHtml + "</div></td></tr></table>";
								
					    d_dialog.innerHTML=''+objHtml+'';
					    document.getElementById("context").appendChild(d_dialog);
				    }else{
				    	var d_dialog = document.getElementById('LoadStatus'); 
				    }
				    //\u6709\u65e0\u5de6\u4fa7\u6811
				    if(!vwidth){
				    //	vwidth = obj.offsetWidth;
				   // }else{
				        vwidth = document.body.offsetWidth;
				    }
				    //\u6709\u65e0\u9876\u90e8\u83dc\u5355
				     if(!vheight){
				    //	vheight = obj.offsetHeight; 
				   // }else{
				     	vheight = document.body.offsetHeight; 
				    }
					d_mask.style.width = vwidth;
				    d_mask.style.height = vheight; 
				    d_mask.style.top=top;
				    d_mask.style.left=left;
				    d_dialog.style.top =( top+vheight)/2-50;
				    d_dialog.style.left = (left+vwidth)/2-80;
				    d_mask.style.visibility='visible';
				    d_dialog.style.visibility='visible';
				    d_dialog.style.display='block';
				    hiddselect(true);
				}
				var bar=0 ;
				var line="|"; 
				var stopBar=0;
				var varcount=0;
				var lengthCount=0;
				
				function progressBarInit(length){
					if(lengthCount<length){
						lengthCount=length;
						stopBar=100.0/lengthCount;
					}
				}
				function progressBarNext(index)
				{
					//判断没有待办事项的情况下，滚动条退出 start
					if(index==-2){
						if(stopBar == 0){
							closeDiv();
							return;
						}
						return;
					}
					//判断没有待办事项的情况下，滚动条退出 end
					varcount=index+varcount;
					if(index==-1){
						bar = 100;
						}
					else{
						bar=parseInt(varcount*stopBar);
						}
					
					if(bar>100)
						bar=100;
					document.getElementById('pBarTextId').innerHTML=bar+"%"+'\uff0c\u8bf7\u7a0d\u540e......';
					if(bar==100||lengthCount==varcount){
						closeDiv();
					}
					//alert(bar);
				}
				var obj=document.getElementById('default_middle_simple');
				var overObj=document.getElementById('default_center');
				show2(obj.offsetWidth,obj.offsetHeight,findPosY(obj,overObj)+13,findPosX(obj)-5);
			</script>
				<table width=97% border=0 cellpadding=0 cellspacing=0>
					<%
						String menuid = "0";
						String hosturl = "";
						String meunname = "";
						boolean flag=false;
						int type = 0;
						String str = "";
						int count=0;
						int decount=0;
						if (isportal.equalsIgnoreCase("false")) {//不使用portal时，菜单及待办的读取
							for (int i = 0; i < totalmenus.size(); i++) {
								try {
									MenuDTO menu = (MenuDTO) totalmenus.get(i);
									menuid = menu.getMenuid() + "";
									hosturl = "0";
									meunname = menu.getName();
									count=count+1;
									//System.out.println(meunname);
									type = 4;
									str = "";
									str = str + "<tr>";
									str = str + "<td>";
									str = str + "<div id=" + menuid + ">";
									str = str + "</div>";
									str = str + "</td>";
									str = str + "</tr>";

								} catch (java.lang.ClassCastException e) {
									VMenu menu = (VMenu) totalmenus.get(i);
									if (menu.isHaspendingtask()) {
										//menuid = menu.getCode();
										menuid = menu.getCode();
										hosturl = menu.getHosturl();
										meunname = menu.getName();
										count=count+1;
										type = menu.getTjhqprogram();
										str = "";
										str = str + "<tr>";
										str = str + "<td>";
										str = str + "<div id=" + menuid + ">";
										str = str + "</div>";
										str = str + "</td>";
										str = str + "</tr>";
									}
									else{
									   decount=decount+1;
									   if(i!=totalmenus.size()-1){
									   		continue;
									   		}
									   	else{
									   		flag=true;
									   		}
									   
									}
								}
					%>
					<%=str%>
					<script type="text/javascript">
					if(!<%=flag%>)
					{
						menuid=menuid+'<%=menuid%>'+";"
						hosturl=hosturl+'<%=hosturl%>'+";"
						menuname=menuname+'<%=meunname%>'+";"
						//alert(menuname);
						type=type+'<%=type%>'+";"
						uid='<%=uid%>'
						sid='<%=sidpas%>'
						year='<%=acctyear%>'
					}
					if(<%=count%>%5==0&&menuid!=""){
					    pendingtask();
					    menuid="";
					    hosturl="";
					    menuname="";
					    type="";
					}
					else if(<%=count%>==<%= totalmenus.size()-decount%>&&menuid!=""){
					    pendingtask();
					    menuid="";
					    hosturl="";
					    menuname="";
					    type="";
					}
					progressBarInit(<%=count%>);
				</script>
					<%
					    meunname="";
						}
						} else {//使用portal时的待办事项
							for (int k = 0; k < portalMenus.size(); k++) {
								VMenu menu = (VMenu) portalMenus.get(k);
								type = menu.getTjhqprogram();
								if (type == 4) {
									str = "";
									str = str + "<tr>";
									str = str + "<td>";
									str = str + "<div id=" + menuid + ">";
									str = str + "</div>";
									str = str + "</td>";
									str = str + "</tr>";
								} else{
								    if (menu.isHaspendingtask()) {
								      	menuid = menu.getCode();
										hosturl = menu.getHosturl();
										meunname = menu.getName();
										count=count+1;
								    	str = "";
										str = str + "<tr>";
										str = str + "<td>";
										str = str + "<div id=" + menuid + ">";
										str = str + "</div>";
										str = str + "</td>";
										str = str + "</tr>";
									}
									else{
										decount=decount+1;
									    if(k!=portalMenus.size()-1)
									   		continue;
									   	else
									   		flag=true;
									}
								}
					%>
					<%=str%>
					<script type="text/javascript">
				if(!<%=flag%>){
					menuid=menuid+'<%=menuid%>'+";"
					hosturl=hosturl+'<%=hosturl%>'+";"
					menuname=menuname+'<%=meunname%>'+";"
					type=type+'<%=type%>'+";"
					uid='<%=uid%>'
					sid='<%=sidpas%>'
					year='<%=acctyear%>'
				}
				if(<%=count%>%5==0&&menuid!=""){
				    pendingtask();
				    menuid="";
				    hosturl="";
				    menuname="";
				    type="";
				}
				else if(<%=count%>==<%= portalMenus.size()-decount%>&&menuid!=""){
				    pendingtask();
				    menuid="";
				    hosturl="";
				    menuname="";
				    type="";
				}
				progressBarInit(<%=count%>);
				</script>

					<%
						meunname="";
						}
						}
					%>

				</table> </span>
		</div>
		<div id="default_bottom_simple">
			<div style="width:100%;"><span></span></div>
		</div>
	</div>
	<% if(quickguidMenu.size()>0||isbulletin.equals("true")){%>
	<div id="default_center"
		style="width:482px; float: left; margin-left: 1%; margin-top: 1%;">
		<div id="default_top_simple" >
			<div style="width:100%;"><span></span></div>
		</div>
		<div id="default_middle_simple"
			style="height: expression(document . body . clientHeight-window_top . offsetHeight-120); background-image: url(../images/bg/xidihongcun.gif); background-repeat: no-repeat; background-position: right bottom;">
			<span id="middle_inner"> 
			<% if(quickguidMenu.size()>0){%>
			 <div  class="title_orange">快速导航</div>
			 <%if(isbulletin.equals("true")){%>
			    <div style="height:210px; overflow-y:scroll;">
			    <%}else{ %>
			    <div style="height: expression(document . body . clientHeight-window_top . offsetHeight-180); overflow-y:scroll;">
			    <%} %>
			    <table width="90%" border="0" cellpadding="0" cellspacing="0">
				   <% for(int i=0;i<quickguidMenu.size();i++){
				      QuickGuidMenuDTO guidMenu =(QuickGuidMenuDTO)quickguidMenu.get(i);
				      if(i%3==0)
				      {
				   %>
				   <tr valign="top">
				   <%} %>
				      <td align="center" style="padding-top:2px;" width="32%">
				      <img style="margin-left:20px;" src="../images/bg/quick_before_small.gif" onMouseOver="this.src='../images/bg/quick.gif'" onMouseOut="this.src='../images/bg/quick_before_small.gif'" onClick="location.href='<%=guidMenu.getInputaddurl()%>'">
				      <br/>
				      <a href="<%=guidMenu.getInputaddurl()%>" style="font-size:12px; margin-top:2px;"><%=guidMenu.getMenuname()%></a>
				      <%if((i+1)%6==0){ %>
				      <br/><br/>
				      <%}%>
				      </td>
					  <%
					  if((i+1)%3==0||i==quickguidMenu.size()){%>
					  </tr>
					  <%}} %>
				</table>
				</div>
				<% }else if(isshowreport.equals("true") && report_list.size()>0){%>
			 <div id="reportShow" style="display:block;">
						<div  class="title_report">
						<ul>
						
						<% for(int o=0;o<report_list.size();o++){
							if(o==0){
							%><li class="selected" onclick="switchReport(this,<%=o+1 %>,<%=report_list.size() %>)">报表<%=o+1 %></li><%
							}else{
							%><li class="noselected" onclick="switchReport(this,<%=o+1 %>,<%=report_list.size() %>)">报表<%=o+1 %></li><%
							}
						}%>
						</ul>
						</div>
					</div>
			<% for(int k=1;k<report_list.size()+1;k++){
				ReportMaintenanceDTO reportMaintenanceDTO =(ReportMaintenanceDTO)report_list.get(k-1);
				report_pserver_tem = reportMaintenanceDTO.getPserver();
				report_param_tem = reportMaintenanceDTO.getReportparam();
				report_fcasip_tem = reportMaintenanceDTO.getFcasip();
				//System.out.println("report_pserver_tem::"+report_pserver_tem+"report_param_tem::"+report_param_tem+"report_fcasip_tem::"+report_fcasip_tem);
				%>
			 <%if(isbulletin.equals("true")){%>
			 		<%if(k==1){
			 		%>
			 		<div id="report_<%=k %>" style="height:210px;" style="display:block;">
				 	</div>
			 		<%
			 		}else{ %>
			    	<div id="report_<%=k %>" style="height:210px;" style="display:none;">
				 	</div>
			    <%}}else{ %>
			    <%if(k==1){
			 		%>
			 		<div id="report_<%=k %>" style="height: expression(document . body . clientHeight-window_top . offsetHeight-180); display:block;">
				 	</div>
				 	</div>
			 		<%
			 		}else{ %>
			    	<div id="report_<%=k %>" style="height: expression(document . body . clientHeight-window_top . offsetHeight-180); display:none;">
				 	</div>
			    <%}} %>
			    <input type='hidden' value='<%=report_sid %>' id='report_sid_temp'/>
				<script>
					var report_sid = document.getElementById('report_sid_temp').value;
					var report_uid = '<%=uid %>';
					var report_pserver = '<%=report_pserver_tem%>';
					var report_param = '<%=report_param_tem%>';
					var report_year = '<%=report_year%>';
					var report_fcasip = '<%=report_fcasip_tem%>';
					var divid = '<%="report_"+k%>';
					var tableObj = queryout(report_param);
			  		tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:report_pserver,acctYear:report_year,divId:divid,height:'210',width:'437',refresh:'0',fcasIp:report_fcasip});
				</script>
				<%}%>
				<% }%>
			<%if(isbulletin.equals("true")){%>
			<div  class="title_orange">通知</div>
			<%if(quickguidMenu.size()>0||(isshowreport.equals("true") && report_list.size()>0)){%>
			<marquee direction=up scrollamount=1
					scrolldelay=50 onMouseOver="stop()" onMouseOut="start()"
					style="cursor: pointer; color: #000000; height: expression(document . body . clientHeight-window_top . offsetHeight-400);">
				<%}else{ %>	
					<marquee direction=up scrollamount=1
					scrolldelay=50 onMouseOver="stop()" onMouseOut="start()"
					style="cursor: pointer; color: #000000; height: expression(document . body . clientHeight-window_top . offsetHeight-180);">
					
					
					<% 
					}
					List postList =(List)session.getAttribute("postList");
					for(int i=0;i<postList.size();i++){
					PostDTO post =(PostDTO)postList.get(i);
					%>
					<div class="gonggao">
							<img src="../images/done_btn/news.gif" />
							<a onclick='preview("<%=post.getId()%>")'>
							<%if(Integer.parseInt(post.getPostlevel())==3){%>
							<font color=red>
							<%=post.getPosttitle() %>
							</font>
							<%}else{%>
							<%=post.getPosttitle() %>
							<%}%>
							</a>
							(
							<%=post.getCreatetime() %>
							)
							<br>
					</div>
					<% }%>
					<br />
				</marquee> 
				<% }%>
				</span>
		</div>
		<div id="default_bottom_simple">
			<div style="width:100%;"><span></span></div>
			
		</div>
	</div>
	<% }%>
	<div>
		<p align="center">
			龙图软件 版权所有
		</p>
	</div>
	<script type="text/javascript">
		function preview(id){
				var url = "<%=request.getContextPath()%>/portal/portlets/post/post_preview.jsp?id="+id;
   				window.open(url,'window',"Width=700px;Height=550px;scroll=0;status=no;resizable=0;");  
		}
		progressBarNext(-2);
	</script>
	
	
	
	
