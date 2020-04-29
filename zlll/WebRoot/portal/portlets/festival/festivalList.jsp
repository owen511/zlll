<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<head>
<script type="text/javascript" src="<%=basePath%>>/js/calendar.js"></script>

</head>
<script type="text/javascript">

function DisableF5(){   
		var d_url=document.location.href;
  		 with (event){  
    	 if (keyCode==116 || (ctrlKey && keyCode==82)){  
			window.location='<%=request.getContextPath() %>/portal/festival/turnToFestival.do?states=1&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
			event.keyCode = 0;   
       		event.cancelBubble = true;   
       		return false;   
     		}   
   			}   
} 
document.onkeydown = DisableF5;
function checkInput(){
	var startime1 = document.getElementById("1startime").value;
	var startime2 = document.getElementById("2startime").value;
	var startime3 = document.getElementById("3startime").value;
	var startime4 = document.getElementById("4startime").value;
	var startime5 = document.getElementById("5startime").value;
	var startime6 = document.getElementById("6startime").value;
	var startime7 = document.getElementById("7startime").value;
	var endtime1 = document.getElementById("1endtime").value;
	var endtime2 = document.getElementById("2endtime").value;
	var endtime3 = document.getElementById("3endtime").value;
	var endtime4 = document.getElementById("4endtime").value;
	var endtime5 = document.getElementById("5endtime").value;
	var endtime6 = document.getElementById("6endtime").value;
	var endtime7 = document.getElementById("7endtime").value;
		if(startime1>endtime1){
			alert("节日【元旦】设置开始日期不能大于结束日期");
			return false;
		}else if(startime2>endtime2){
			alert("节日【春节】设置开始日期不能大于结束日期");
			return false;
		}else if(startime3>endtime3){
			alert("节日【元宵节】设置开始日期不能大于结束日期");
			return false;
		}else  if(startime4>endtime4){
			alert("节日【劳动节】设置开始日期不能大于结束日期");
			return false;
		} else if(startime5>endtime5){
			alert("节日【中秋节】设置开始日期不能大于结束日期");
			return false;
		}else if(startime6>endtime6){
			alert("节日【国庆节】设置开始日期不能大于结束日期");
			return false;
		}else if(startime7>endtime7){
			alert("节日【圣诞节】设置开始日期不能大于结束日期");
			return false;
		}
		
	
	return true;
}
function save(){
	var startime1 = document.getElementById("1startime").value;
	var startime2 = document.getElementById("2startime").value;
	var startime3 = document.getElementById("3startime").value;
	var startime4 = document.getElementById("4startime").value;
	var startime5 = document.getElementById("5startime").value;
	var startime6 = document.getElementById("6startime").value;
	var startime7 = document.getElementById("7startime").value;
	var starttime = startime1+","+ startime2+","+startime3+","+ startime4+","+ startime5+","+ startime6+","+ startime7;
	var endtime1 = document.getElementById("1endtime").value;
	var endtime2 = document.getElementById("2endtime").value;
	var endtime3 = document.getElementById("3endtime").value;
	var endtime4 = document.getElementById("4endtime").value;
	var endtime5 = document.getElementById("5endtime").value;
	var endtime6 = document.getElementById("6endtime").value;
	var endtime7 = document.getElementById("7endtime").value;
	var endtime = endtime1+","+ endtime2+","+endtime3+","+ endtime4+","+ endtime5+","+ endtime6+","+ endtime7;
	
	var open10 = document.getElementsByName("1open");
	var open20 = document.getElementsByName("2open");
	var open30 = document.getElementsByName("3open");
	var open40 = document.getElementsByName("4open");
	var open50 = document.getElementsByName("5open");
	var open60 = document.getElementsByName("6open");
	var open70 = document.getElementsByName("7open");
	var open1 = "0";
	var open2 = "0";
	var open3 = "0";
	var open4 = "0";
	var open5 = "0";
	var open6 = "0";
	var open7 = "0";
	if(open10[0].checked){
		open1="1";
	}
	if(open20[0].checked){
		open2="1";
	}
	if(open30[0].checked){
		open3="1";
	}
	if(open40[0].checked){
		open4="1";
	}
	if(open50[0].checked){
		open5="1";
	}
	if(open60[0].checked){
		open6="1";
	}
	if(open70[0].checked){
		open7="1";
	}
	var open = open1+","+ open2+","+open3+","+ open4+","+ open5+","+ open6+","+ open7;
	if(checkInput()){
	new Ajax.Request("<%=request.getContextPath()%>/portal/festival/save.do?random="+Math.random(), 
     	{
	   		parameters : "starttime="+starttime+"&endtime="+endtime+"&open="+open,
	   		method: 'get', 
	   		onComplete : function(resp) {
	   		window.location.href='<%=request.getContextPath() %>/portal/festival/turnToFestival.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
	   		},
	   		requestHeaders: {Accept: 'application/json'},
	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
	     	netWorkEception();
	        }
		}); 
	}
}
</script>
 <div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					节日提醒页面配置
				</div>
			</li>
		</ul>
	</div>
	<div id="" style="display:block;">
	<table class="main_table_98" cellspacing="0" cellpadding="1" style="margin-left:10px;width:98%;">
		<tr>
	    <td class="main_table_title" width="50"><div align="center">序号</div></td>
	    <td class="main_table_title"><div align="center" >节日名称</div></td>
	    <td class="main_table_title"><div align="center">开始时间</div></td>
	    <td class="main_table_title"><div align="center">结束时间</div></td>
	    <td class="main_table_title" colspan="2"><div align="center">设置</div></td>
	  	</tr>
	  	<c:forEach items="${plist}" var="entry" varStatus="vs"> 
		<tr style="text-align:left">
		    <td class="main_table_title_letter"><div align="center"><c:out value="${vs.count}"/></div></td>
		     <td class="main_table_title_letter">
		    <c:out value="${entry.name}"/>
		    </td>
		    <td class="main_table_title_letter" style ="width:200px;"><input style ="border:0px;background-color:white;" id ="<c:out value="${vs.count}"/>startime" value ="<c:out value="${entry.starttime}"/>" readonly>
		    &nbsp;
			<img src="<%=request.getContextPath()%>/images/calendar/date.gif" alt="选择日期"
						onclick="return showCalendar('<c:out value="${vs.count}"/>startime', '%Y-%m-%d', null, true);"
						style="cursor:hand; border:0;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
		    </td>
		    <td class="main_table_title_letter" style ="width:200px;"><input style ="border:0px;background-color:white;" id ="<c:out value="${vs.count}"/>endtime" value ="<c:out value="${entry.endtime}"/>" readonly>
		    &nbsp;
			<img src="<%=request.getContextPath()%>/images/calendar/date.gif" alt="选择日期"
						onclick="return showCalendar('<c:out value="${vs.count}"/>endtime', '%Y-%m-%d', null, true);"
						style="cursor:hand; border:0;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
		    </td>
		        <c:choose>
          			<c:when test="${entry.isuse == 1}">
          			<td class="main_table_title_letter"><div align="center">开启<input type="radio" id="<c:out value="${vs.count}"/>open" name="<c:out value="${vs.count}"/>open" value="1" checked="checked" /></div></td>
          			<td class="main_table_title_letter"><div align="center">关闭<input type="radio" id="<c:out value="${vs.count}"/>open" name="<c:out value="${vs.count}"/>open" value="0"  /></div></td>
          			</c:when>
          			<c:otherwise>
          			 <td class="main_table_title_letter"><div align="center">开启<input type="radio" id="<c:out value="${vs.count}"/>open" name="<c:out value="${vs.count}"/>open" value="1"/></div></td>
          			 <td class="main_table_title_letter"><div align="center">关闭<input type="radio" id="<c:out value="${vs.count}"/>open" name="<c:out value="${vs.count}"/>open" value="0"  checked="checked" /></div></td>
          			</c:otherwise>
          		</c:choose>  
		    </tr>
			</c:forEach>
		
		
	</table>
	</div>
	<br/>
<div id="confirm_exit_btn">
		<input id ="updatevalue_button" name="mod3" type="button" value="保存修改" class="button_style"
			onclick="save();" />
		<input type="hidden" ></input>
		<input type="hidden" ></input>
	</div>
 
