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
//ҳ����غ�ʹIE���
if(document.all){
	window.moveTo(0,0);
	top.window.resizeTo(screen.availWidth,screen.availHeight); 
}
//window.onbeforeunload =function (){alert(1);window.location.href='./logout.do';}
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
		report_fcasip = reportMaintenanceDTO.getFcasip();
		%>
		<script type='text/javascript' src='<%=report_fcasip %>/fcas/js/outermouse.js'></script>
		<script type='text/javascript' src='<%=report_fcasip %>/fcas/js/zapatec.js'></script>
		<script type='text/javascript' src='<%=report_fcasip %>/fcas/js/tree.js'></script>
		<script type='text/javascript' src='<%=report_fcasip %>/fcas/js/outerchart.js'></script>
		<script type='text/javascript' src='<%=report_fcasip %>/fcas/system/fuscharinfor/js/FusionCharts.js'></script>
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
	//�Զ�������ҳ���ܣ��൱������ҳ�Զ�ˢ��
	if(request.getAttribute("refreshtime")!=null){
		String refreshtime = (String) request.getAttribute("refreshtime");
		if(!refreshtime.equals("0")){
			%>
			window.setTimeout("window.location.href='<%=request.getContextPath()%>/common/index.do';", <%=refreshtime%>);
			<%
		}
	}
	//��ȡsessionʧЧ������sessionʧЧ��������ʾ���رմ���
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
	alert("��ʹ��admin�û���¼����ҵ��ϵͳ���ã�");
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
							taskStr=taskStr+pendingtask.name+"----->��"+pendingtask.totalcount+"��<br/>";
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
							    taskStr=taskStr+"&nbsp��"+detail.operattypedto.name+"&nbsp"+detail.totalcount+"��</a>";
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
				      //alert(pendingtask.Url);
				      if(pendingtask.type==1)
					  {  
				      	taskStr=taskStr+"<a href=\""+pendingtask.Url+"\" target='_blank'>";
				      	taskStr=taskStr+pendingtask.name+"</a>";
				      }else{
				      	taskStr=taskStr+"<a href=\""+pendingtask.Url+"\">";
				      	taskStr=taskStr+pendingtask.name+"</a>";
				      }
				      if(pendingtask.count>0){
				        taskStr=taskStr+"----->��"+pendingtask.count+"��<br/>";
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
							         	//taskStr=taskStr+"<a href=\""+detail.JobUrl+"&nbsp;"+detail.status+"\">"+detail.totalcount+"��</a>";
							         	taskStr=taskStr+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+"<a href=\""+detail.JobUrl+"\" target='_blank'><font color = '"+detail.color+"'>"+detail.status+"<"+detail.totalcount+"��></font></a>";
							         	taskStr=taskStr+"<br/>";  
			                         }
			                         else
			                         {
			                         	//taskStr=taskStr+"<font color = ''>";
			                            taskStr=taskStr+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+detail.status+"&nbsp;<"+detail.totalcount+"��>";
			                            //taskStr=taskStr+"</font>";
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
					         	taskStr=taskStr+"<a href=\""+detail.JobUrl+"\" target='_blank'><font color = '"+detail.color+"'>"+detail.status+"<"+detail.totalcount+"��></a>";
				         	}
				         	if(detail.totalcount==-1){
				         		taskStr=taskStr+"<a href=\""+detail.JobUrl+"\" target='_blank'><font color = '"+detail.color+"'>"+detail.status+"</a>";
				         	}
                         }
                         else
                         {
                         	if(detail.totalcount>0){
                            	taskStr=taskStr + detail.status+"&nbsp;<"+detail.totalcount+"��>";
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
	//�Ƿ�ʹ����ҳչʾ������
	String isshowreport = (String)request.getAttribute("isshowreport");
	//��� ��Ҫ�ַ���
	String report_year = (String) request.getAttribute("year");
	String report_pserver_tem = "";
	String report_param_tem = "";
	String report_fcasip_tem = "";
	//�Ǳ�����ͼ�Σ�0--����1---ͼ��
    String report_reportorimage_tem = "";
	String acctyear = "";
	if (isportalyear.equalsIgnoreCase("false")) {
		acctyear = (String) request.getAttribute("year");
	} else {
		acctyear = (String) request.getAttribute("acctyear");
	}
	String uid = (String) request.getAttribute("userCode");
	String isportal = (String) request.getAttribute("isportal");//�ж��Ƿ���portal
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
	if (isbulletin.equals("false") && quickguidMenu.size()==0 && (isshowreport.equals("false") || report_list.size()<=0)) {
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
		<div id="default_top_simple" >
			<div style="width:100%;"><span>��������</span></div>
		</div>
		<div id="default_middle_simple"
			style="height: expression(document .         body .         clientHeight-window_top .         offsetHeight-120);">
			<span id="middle_inner">
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
						if (isportal.equalsIgnoreCase("false")) {//��ʹ��portalʱ���˵�������Ķ�ȡ
							for (int i = 0; i < totalmenus.size(); i++) {
								try {
									MenuDTO menu = (MenuDTO) totalmenus.get(i);
									menuid = menu.getMenuid() + "";
									hosturl = "0";
									meunname = menu.getName();
									count=count+1;
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
				</script>
					<%
					    meunname="";
						}
						} else {//ʹ��portalʱ�Ĵ�������
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
	
	<% if(quickguidMenu.size()>0||isbulletin.equals("true")||(isshowreport.equals("true") && report_list.size()>0)){%>
	<div id="default_center"
		style="width:482px; float: left; margin-left: 1%; margin-top: 1%;">
		<div id="default_top_simple" >
			<div style="width:100%;"><span></span></div>
		</div>
		<div id="default_middle_simple"
			style="height: expression(document . body . clientHeight-window_top . offsetHeight-120); background-image: url(../images/bg/xidihongcun.gif); background-repeat: no-repeat; background-position: right bottom;">
			<span id="middle_inner"> 
						<% if(quickguidMenu.size()>0){%>
			 <div  class="title_orange">���ٵ���</div>
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
			<%  //if(report_list.size()>0){%>
			 <div id="reportShow" style="display:block;">
						<div  class="title_report">
						<ul>
						
						<% for(int o=0;o<report_list.size();o++){
							if(o==0){
							%><li class="selected" onclick="switchReport(this,<%=o+1 %>,<%=report_list.size() %>)">ͼ��<%=o+1 %></li><%
							}else{
							%><li class="noselected" onclick="switchReport(this,<%=o+1 %>,<%=report_list.size() %>)">ͼ��<%=o+1 %></li><%
							}
						}%>
						</ul>
						</div>
					</div>
			<% for(int k=1;k<report_list.size()+1;k++){
				ReportMaintenanceDTO reportMaintenanceDTO =(ReportMaintenanceDTO)report_list.get(k-1);
				report_pserver_tem = reportMaintenanceDTO.getPserver();
				report_param_tem = reportMaintenanceDTO.getReportparam();
				report_reportorimage_tem = reportMaintenanceDTO.getReportorimage();
				report_fcasip_tem = reportMaintenanceDTO.getFcasip();
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
			    <%
			    if(report_reportorimage_tem!=null && report_reportorimage_tem.equals("1")){
			    %>
				    <script>
						var report_sid = document.getElementById('report_sid_temp').value;
						var report_uid = '<%=uid %>';
						var report_pserver = '<%=report_pserver_tem%>';
						var report_param = '<%=report_param_tem%>';
						var report_year = '<%=report_year%>';
						var report_fcasip = '<%=report_fcasip_tem%>';
						var divid = '<%="report_"+k%>';
						var tableObj = queryChartOut(report_param);
				  		tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:report_pserver,acctYear:report_year,divId:divid,height:'210',width:'437',refresh:'0',fcasIp:report_fcasip,tparams:report_param});
					</script>
			    <%
			    }else{
			    %>
				    <script>
						var report_sid = document.getElementById('report_sid_temp').value;
						var report_uid = '<%=uid %>';
						var report_pserver = '<%=report_pserver_tem%>';
						var report_param = '<%=report_param_tem%>';
						var report_year = '<%=report_year%>';
						var report_fcasip = '<%=report_fcasip_tem%>';
						var divid = '<%="report_"+k%>';
						var tableObj = queryout(report_param);
				  		tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:report_pserver,acctYear:report_year,divId:divid,height:'210',width:'437',refresh:'0',fcasIp:report_fcasip,tparams:report_param});
					</script>
			    <%
			    } %>
				
				<%}%>
				<% }%>
			<%if(isbulletin.equals("true")){%>
			<div  class="title_orange">����</div>
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
			��ͼ��� ��Ȩ����
		</p>
	</div>
	<script type="text/javascript">
		function preview(id){
				var url = "<%=request.getContextPath()%>/portal/portlets/post/post_preview.jsp?id="+id;
   				window.open(url,'window',"Width=700px;Height=550px;scroll=0;status=no;resizable=0;");  
		}
    </script>
	
	
	
	
