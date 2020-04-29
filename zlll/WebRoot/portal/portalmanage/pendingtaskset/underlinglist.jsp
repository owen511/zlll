<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page
	import="gov.mof.fasp.ifmis.portal.portalmanage.userprogramset.dto.VMenu"%>
<%@ page import="gov.mof.fasp.ca.menu.MenuDTO"%>
<%@ page import="gov.mof.fasp.ca.user.UserDTO"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<link href="<%=request.getContextPath()%>/style/styleportal.css"
	rel="stylesheet" type="text/css" />
<script type="text/javascript">
function init(){
	$('topnum').value = 0;
}
</script>

<div id="querylist" style="display: block;">
	<form>
		<div id="managerdiv">
			<table width='100%' border='0' cellspacing='0' cellpadding='0'>
				<tr>
					<td width='100%' valign="top">
						<div id="form_table_title">
							<ul>
								<li class="top">
									<div>
										<%=request.getAttribute("depname")%>
									</div>
								</li>
							</ul>
						</div>
						<div id='containerline15'>
							<div id='tgroup_div'
								style='position: relative; height: expression(this .                       offsetParent .                       offsetHeight); width: 100%;'>
							</div>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</form>
</div>
<script>
col = createColumnConfig();
col.id = "name";
col.name = "name";
col.type = "S";
col.title = "姓名";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "menuname";
col.name = "menuname";
col.type = "S";
col.title = "待办事项菜单";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "pendingtaskname";
col.name = "pendingtaskname";
col.type = "S";
col.title = "待办事项";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "number";
col.name = "number";
col.type = "S";
col.title = "剩余数量";
ColumnConfig[col.id.toLowerCase()]=col;

  	tgroup=new dataTable();
	tgroup.parent =document.getElementById('tgroup_div');
	tgroup.setTableHead(["name","menuname","pendingtaskname","number"]);
	tgroup.show();
	//排序 jjy20090515
	tgroup.sort_click = function(sortname,sorttype,cellindex){};
	tgroup.toDate=function(ds){};//字符串转成日期类型 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
	tgroup.switchOrder=function(idx){};
	tgroup.generateCompareFunc=function(sortname,type,cellindex,thobj){};//生存排序函数 
	//排序 end
var menuid="";
var hosturl="";
var menuname="";
var type="";
var uid="";
var sid="1";
var year="";
var username="";
function pendingtask(){
	new Ajax.Request("<%=request.getContextPath()%>/portal/portalpendingtask/pendingtask.do?random="+Math.random(), 
   	{
   		parameters : "menuid="+menuid+"&hosturl=" + hosturl+"&menuname=" + menuname+"&type=" + type+"&uid=" + uid+"&sid=" + sid+"&year=" + year+"&username="+username,
   		method: 'get', 
   		onComplete : showPendingTask,
   		requestHeaders: {Accept: 'application/json'},
   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
     	netWorkEception();
        }
	}); 
}
	function insertTable(obj){
	
		if(obj!=null&&obj.length>0){
			tgroup.data=tgroup.data.concat(obj);
			tgroup.show();
		}
	}
	function showPendingTask(resp){
		var arr=new Array();
	    var json = resp.responseText.evalJSON(true);  
	    var totallist = eval(json.totallist);
	    if(totallist.size()==1)return;
	//	debugger;
	    for(var index=0;index<totallist.size()-1;index++)
	    {
	    	 var pendingtasks=totallist[index];
	    	 var taskStr="";
		     if(pendingtasks.size()>0){
		     	if(pendingtasks[0].outter!=1)
		     	{
		     		if(pendingtasks[0].name!=undefined)
		     		{
						 for(i=0; i<pendingtasks.size();i++) {
							var pendingtask= pendingtasks[i];
							var details = pendingtask.details;
							for(j=0;j<details.size();j++)
							{
							   var detail=details[j];
								var obj=new Object;
							    obj.name=totallist[totallist.size()-1].username;
							    totallist[totallist.size()-1].username="";
							    obj.menuname=pendingtasks[0].menuname+"";
							    pendingtasks[0].menuname="";

								obj.pendingtaskname=pendingtask.name+" 待"+detail.operattypedto.name;
								obj.number=detail.totalcount;
							    count++;
							    arr[arr.length]=obj;
						    }
					    }
			        }
		     	}else{
				   for(i=0; i<pendingtasks.size();i++) {
				  	  pendingtask= pendingtasks[i];
				   	  if(pendingtask.count>0){
		     		 	var details = pendingtask.details;
		     		 	var name_tem = pendingtask.name_tem;
		     		 	if(name_tem.size()>0){
			     		 	for(var o=0;o<name_tem.size();o++){
					       		for(j=0;j<details.size();j++){
									var detail=details[j];
								    if(detail.totalcount>0){
										if(detail.menuname == name_tem[o] ){
											var obj=new Object;
										    obj.name=totallist[totallist.size()-1].username;
										    totallist[totallist.size()-1].username="";
										    obj.menuname=pendingtask.name;
										    pendingtask.name="";
			
											obj.pendingtaskname=name_tem[o]+" "+detail.status;
											obj.number=detail.totalcount;
										    arr[arr.length]=obj;
					                    }
								    }
							    }
							}
				      	}else{
				      		for(j=0;j<details.size();j++){
					      		var detail=details[j];
					      		if(detail.totalcount>0||detail.totalcount==-1){
									var obj=new Object;
								    obj.name=totallist[totallist.size()-1].username;
								    totallist[totallist.size()-1].username="";
								    obj.menuname=pendingtask.name;
								    pendingtask.name="";
									
									obj.pendingtaskname=name_tem[o]+" "+detail.status;
									obj.number=detail.totalcount;
									arr[arr.length]=obj;
								}
							}
						}
					}
				}
			}
		}
	}
	insertTable(arr);
}
	function showPendingTask2(resp){
		var obj=new Object();
	    var json = resp.responseText.evalJSON(true);  
	    var totallist = eval(json.totallist);
	    if(totallist.size()==1)return;
	    obj.count=0;
	    obj.name=totallist[totallist.size()-1].username;
	    obj.menus=new Array();
	    var counts=0
	    for(var index=0;index<totallist.size()-1;index++)
	    {
	    	 var pendingtasks=totallist[index];
	    	 var taskStr="";
		     if(pendingtasks.size()>0){
		     	if(pendingtasks[0].outter!=1)
		     	{
		     		if(pendingtasks[0].name!=undefined)
		     		{
						 for(i=0; i<pendingtasks.size();i++) {
						 	var menu=new Object();
		     		 		menu.name=pendingtasks[0].menuname;
		     		 		menu.operat=new Array();
							var pendingtask= pendingtasks[i];
							var details = pendingtask.details;
							for(j=0;j<details.size();j++)
							{
							    detail=details[j];
								var operat=new Object();
								operat.name="待"+detail.operattypedto.name;
								operat.num=detail.totalcount;
							    obj.count++;
							    menu.operat[j]=operat;
						    }
						    if(menu.operat.size()>0){
							    obj.menm[counts]=menu;
								counts++;	 
							}
					    }
			        }
		     	}else{
				   for(i=0; i<pendingtasks.size();i++) {
				  	  pendingtask= pendingtasks[i];
				   	  if(pendingtask.count>0){
				      	var menu=new Object();
		     		 	menu.name=pendingtasks.name;
		     		 	menu.operat=new Array();
		     		 	var details = pendingtask.details;
		     		 	var name_tem = pendingtask.name_tem;
		     		 	if(name_tem.size()>0){
			     		 	for(var o=0;o<name_tem.size();o++){
					       		for(j=0;j<details.size();j++){
									detail=details[j];
								    if(detail.totalcount>0){
										if(detail.menuname == name_tem[o] ){
									      	var operat=new Object();
											operat.name=detail.status;
											operat.num=detail.totalcount;
											menu.operat[menu.operat.length]=operat;
					                    }
								    }
							    }
							}
				      	}else{
				      		for(j=0;j<details.size();j++){
					      		detail=details[j];
					      		if(detail.totalcount>0||detail.totalcount==-1){
						      		var operat=new Object();
									operat.name=detail.status;
									operat.num=detail.totalcount;
									menu.operat[menu.operat.length]=operat;
								}
							}
						}
						if(menu.operat.size()>0){
						    obj.menm[counts]=menu;
							counts++;	 
						}
					}
				}
			}
		}
	}
	//insertTable(obj);
}
<%
String acctyear = (String) request.getAttribute("year");
String isportal = (String) request.getAttribute("isportal");//判断是否用portal
List users = (List)request.getAttribute("usermenus");
if(users!=null&&users.size()>0){
	for(int m=0;m<users.size();m++){
		Object[] obj=(Object[])users.get(m);
		UserDTO user=(UserDTO)obj[0];
		List menus=(List)obj[1];
		if(menus==null||menus.size()==0)
		{
			continue;
		}
		String menuid="";
		String hosturl="";
		String meunname="";
		String type="4";
		if (isportal.equalsIgnoreCase("false")) {//不使用portal时，菜单及待办的读取
			for (int i = 0; i < menus.size(); i++) {
				try {
					MenuDTO menu = (MenuDTO) menus.get(i);
					menuid = menu.getMenuid() + "";
					hosturl = "0";
					meunname = menu.getName();
					//System.out.println(meunname);
					type = "4";
			%>
					menuid=menuid+'<%=menuid%>'+";"
					hosturl=hosturl+'<%=hosturl%>'+";"
					menuname=menuname+'<%=meunname%>'+";"
					type=type+'<%=type%>'+";";
					uid='<%=user.getCode()%>';
					year='<%=acctyear%>';
					username='<%=user.getName()%>';
			<%
				} catch (java.lang.ClassCastException e) {
					VMenu menu = (VMenu) menus.get(i);
					if (menu.isHaspendingtask()) {
						//menuid = menu.getCode();
						menuid = menu.getCode();
						hosturl = menu.getHosturl();
						meunname = menu.getName();
						type = menu.getTjhqprogram()+"";
				%>
						menuid=menuid+'<%=menuid%>'+";"
						hosturl=hosturl+'<%=hosturl%>'+";"
						menuname=menuname+'<%=meunname%>'+";"
						type=type+'<%=type%>'+";";
						uid='<%=user.getCode()%>';
						year='<%=acctyear%>';
						username='<%=user.getName()%>';
				<%
					}
				}
			}
		%>pendingtask();
		  menuid="";
		  hosturl="";
		  menuname="";
		  type="";
		  uid="";
		  year="";
		  username="";
		<%
		} else {//使用portal时的待办事项
			for (int k = 0; k < menus.size(); k++) {
				VMenu menu = (VMenu) menus.get(k);
				type = String.valueOf(menu.getTjhqprogram());
				if (!type.equals("4")) {
					if (menu.isHaspendingtask()) {
						menuid = menu.getCode();
						hosturl = menu.getHosturl();
						meunname = menu.getName();
					%>
						menuid=menuid+'<%=menuid%>'+";"
						hosturl=hosturl+'<%=hosturl%>'+";"
						menuname=menuname+'<%=meunname%>'+";"
						type=type+'<%=type%>'+";";
						uid='<%=user.getCode()%>';
						year='<%=acctyear%>';
						username='<%=user.getName()%>';
					<%
					}
				}
			}
		%>pendingtask();
		   menuid="";
		  hosturl="";
		  menuname="";
		  type="";
		  uid="";
		  year="";
		  username="";
		<%
		}
	}
}
%>
</script>