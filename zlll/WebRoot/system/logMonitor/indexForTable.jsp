<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import="com.longtu.framework.daosupport.RecordSet"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
		String sameURL=(String)request.getAttribute("sameURL");
		String dateFroRe=(String)request.getAttribute("dateFroRe");
		String timeFroRe=(String)request.getAttribute("timeFroRe");
		String menuidFroRe=(String)request.getAttribute("menuidFroRe");
		String menunameFroRe=(String)request.getAttribute("menunameFroRe");
		String filepath=(String)request.getAttribute("filepath");
		String port=(String)request.getAttribute("logserverport");
		String visitCount=(String)request.getAttribute("visitCount");
		String spendtime=(String)request.getAttribute("spendtime");
%>
<script type="text/javascript" src="<%=basePath %>/ltext/datatable3.0.js"></script>
<link rel="stylesheet" type="text/css" href="<%=basePath %>/ltext/datatabletheme.css"></link>
<link rel="stylesheet" type="text/css" href="<%=basePath %>/ltext/datatabletheme35.css"></link>
<style type="text/css">
#showInfo {
	display : none;
    text-align:left;
	width: 97%;
	margin:0 10px 0 10px;
	padding-bottom: 5px;
	padding-top: 5px;
	/*border-bottom: #818181 1px solid;*/
	overflow: hidden;
}
</style>
<script>
var indexForTop= document.getElementById("window_top");
if(indexForTop.offsetHeight==0){
}else{
	doHiddenTop(document.getElementById("hiddenTopBar"));
}
function loadInfo() {
    var info = '<c:out value="${errorInfo}"/>';
    if ("" != info) {
        alert(info);
    }
}
loadInfo();
var selectedRow;
function importLog(){
 		var url = "<%=request.getContextPath()%>/system/logMonitor/searchFile.do?mainmenu="+mainmenu+"&submenu="+submenuid;
		    var features = "top=150,left=50,width=400,height=150,scrollbars=no,resizable=no";
		    window.open(url, "选择导入日志文件", features);
 
}
function checkInputValue(oTextbox){
    oTextbox.value = oTextbox.value.trim();
	var inputVal = oTextbox.value;
	var regDate = /^[0-9]+$/;
	var isValidDate = regDate.test(inputVal);
	if(inputVal!=null&&inputVal!=""){
			if(!isValidDate){
				alert("请输入非负整数!");
				oTextbox.value="";
		}else{
				oTextbox.value=parseInt(inputVal,10);
		}
	}else{
		oTextbox.value="";
	}
}
function showLogInfoWithDate(){
var dateValue=document.getElementById("date").value;
 if(dateValue==""){
 	alert("请先选择纪录日志的日期！");
 	return;
 }
 	$('queryform').action="<%=request.getContextPath()%>/system/logMonitor/index.do?mainmenu="+mainmenu+"&submenu="+submenuid+"&date="+dateValue+"&isImport=false";
	$('queryform').submit();
}
function queryLog(){
var dateValue=document.getElementById("date").value;
if(dateValue==null||dateValue==""){
 alert("尚未选择日志！");
 return;
}
if($('sameURL')==null||$('sameURL')==undefined){  //统计结果过滤查询
$('queryform').action="<%=request.getContextPath()%>/system/logMonitor/queryLogInfo.do?mainmenu="+mainmenu+"&submenu="+submenuid+"&date="+dateValue;
}else if($('sameURL')!=null||$('sameURL')=="yes"){
}
 $('queryform').submit();
}
// 返回ID列复选框勾选的个数
function getSelectedCount() {
    var count = 0;
    for (var i = 0; i < $('queryform').elements.length; i++) {
        var e = $('queryform').elements[i];
        if (e.type == "checkbox" && e.checked) {
        selectedRow=e;
            count++;
        }
    }
    return count;
}
var submenuid = <c:out value="${param.submenu}"/>;
var mainmenu = <c:out value="${param.mainmenu}"/>;
var pars = 'submenu=' + submenuid+ '&mainmenu=' + mainmenu;
//显示所有业务菜单
function chooseSys(){
	var url = "/system/logMonitor/showSys.do?"+pars;
	var iWidth = 300;
	var iHeight = 450;
	var iTop = (window.screen.availHeight-30-iHeight)/2;       //获得窗口的垂直位置;
    var iLeft = (window.screen.availWidth-10-iWidth)/2; 
	window.open(url, 'newWindow','width=310px,height=450px,top='+iTop+',left='+iLeft+',status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no,help:No');
}
//追踪相同URL
function doQueryWithSameURL(){
	if (getSelectedCount() == 0) {
        alert("请首先选择一条记录!");
        return false;
    }
    if(getSelectedCount() > 1){
        alert("只能选择一条记录!");
        return false;
    }
	var e = selectedRow;
	var url="none";
	var method="none";
	if( typeof(e.parentNode.nextSibling.childNodes[0])!=undefined){  //获取选中行的URL
	url=e.parentNode.nextSibling.childNodes[0].innerText;
	}
	$('reURL').value=url;
	$('reMethod').value=method;
	$('queryform').action="<%=request.getContextPath()%>/system/logMonitor/getSameURL.do?mainmenu="+mainmenu+"&submenu="+submenuid;
	$('queryform').submit();
}
function controlShowInfo(){
	<%
	if(sameURL!=null&&sameURL.equals("yes")){
	}else{
	if(port!=null&&visitCount!=null&&spendtime!=null){
	%>
	var countInfo = document.getElementById("showInfo");
	countInfo.style.display = "block";
	countInfo.innerHTML = '<font color = "red">*</font>当前访问的是 <font color = "red"><%=port%></font> 的日志文件，共记录<font color = "red"> <%=visitCount%></font> 次请求，分析日志耗时 <font color = "red"> <%=spendtime%> </font>。'; 
	<%
	}
	}
	%>
}
</script>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id="queryform" name="queryform" method="post"
	action="<%=request.getContextPath()%>/system/logMonitor/showLogInfo.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	onsubmit="switchValue(this)">
<div id= "querylist" style="display:block;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
			<td align="left">
			日志记录日期&nbsp;
			<input type="text" id="date" name="date" readonly />
			<img src="/images/calendar/date.gif" alt="记录日期" onclick="return showCalendar('date', '%Y-%m-%d', null, true);" style="cursor:hand; border:0;border:0;background:none;" 
					onmouseover="this.style.background='red';" 
					onmouseout="this.style.background=''">
			</td>
			 <td align="left">
			 <input  type="hidden" name="sysID" id="sysID">
					业务模块&nbsp;
					<input name="systemmenu" type="text" id="systemmenu"  onclick="chooseSys();"/>
					<button style='margin-left:8px;'onclick="chooseSys();"></button>
					<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick="$('systemmenu').value='';$('sysID').value='';"/>
				</td>
			 <td align="left">
					阀值&nbsp;
					<input name="spendtime" type="text" id="spendtime"  onblur="checkInputValue(this);"/>
					(统计超过此值的请求，单位：ms)
				</td>
			</tr>
		</table>
		<input type="hidden" name="FromPage" id="FromPage" value="yes"/>
		<input type="hidden" name="reURL" id="reURL"/>
		<input type="hidden" name="reMethod" id="reMethod"/>
		<input type="hidden" id="filepath" name="filepath" />
		<script>
		<%if(dateFroRe!=null&&!dateFroRe.equals("")){%>
		$('date').value='<%=dateFroRe%>';
		<%}; %>
		<%if(timeFroRe!=null&&!timeFroRe.equals("")){%>
		$('spendtime').value='<%=timeFroRe%>';
		<%}; %>
		<%if(menuidFroRe!=null&&!menuidFroRe.equals("")){%>
		$('sysID').value='<%=menuidFroRe%>';
		<%}; %>
		<%if(menunameFroRe!=null&&!menunameFroRe.equals("")){%>
		$('systemmenu').value='<%=menunameFroRe%>';
		<%}; %>		
		<%if(filepath!=null&&!filepath.equals("")){%>
		$('filepath').value='<%=filepath%>';
		<%}; %>	
		</script>
		<%if(sameURL!=null&&sameURL.equals("yes")){ %>
		<input type="hidden" id="sameURL" name="sameURL" value="yes"/>
		<%} %>
</div>
</div>
<br>
<div  id="showInfo"> <font color = "red">*</font> 当前是 8002 的日志文件，共有请求100036个，分析耗时：900ms</div>
<div id="form_table_title" style="margin-left: 10px;position: relative;margin-right: 10px;">
  <ul>
    <li class="top">
      <div>日志分析结果</div>
    </li>
  </ul>
</div>
<div id="tbl-container" style="width:1250px;height:520px;margin-left: 10px;position: relative;margin-right: 10px;">
</div>

 <script language="javascript" type="text/javascript">
		var rs1=new Ext.lt.recordset();
		<%
		String json = (String)request.getAttribute("json");
		if(null == json || "".equals(json)){
		}else{
			out.println("rs1 = "+ json);
		}
		%>
			var dt=new Ext.lt.datatable35(rs1);
			var col=null;
			col=[];
	<%
	if(sameURL!=null&&sameURL.equals("yes")){
	%>
			col.push(dt.columns.seq,dt.columns.checkbox);
			col.push({alias:'URL',head:['URL'],width:550,datatype:'S',name:'URL'});
			col.push({alias:'业务模块',head:['业务模块'],width:163,datatype:'S',name:'menuName'});
			col.push({alias:'耗时(ms)',head:['耗时(ms)'],width:130,datatype:'N',name:'spendTime',format:{dotname:0}});
			col.push({alias:'开始时间',head:['访问时间'],width:130,datatype:'S',name:'startTime'});
			col.push({alias:'结束时间',head:['访问时间'],width:130,datatype:'S',name:'endTime'});
	<%
	}else{
	%>
			col.push(dt.columns.seq,dt.columns.checkbox);
			col.push({alias:'URL',head:['URL'],width:280,datatype:'S',name:'uRL',onclick:function(datatableobj,srcElement,line ,column ,rs){alert(Object.toJSON(rs))}});
			col.push({alias:'方法',head:['方法'],width:110,datatype:'S',name:'methodName'});
			col.push({alias:'业务模块',head:['业务模块'],width:110,datatype:'S',name:'menuName'});
			col.push({alias:'最大值',head:['耗时(ms)'],width:110,datatype:'N',name:'maxspendTime',format:{dotname:0}});
			col.push({alias:'最小值',head:['耗时(ms)'],width:110,datatype:'N',name:'minspendTime',format:{dotname:0}});
			col.push({alias:'平均值',head:['耗时(ms)'],width:110,datatype:'N',name:'avrspendTime',format:{dotname:0}});
			//col.push({alias:'最接近真值',head:['耗时(ms)'],width:110,datatype:'S',name:'trueValue'});
			col.push({alias:'超过0.5s比例',head:['耗时(ms)'],width:110,datatype:'S',name:'percent'});
			col.push({alias:'访问次数',head:['访问次数'],width:115,datatype:'N',name:'countURL',format:{dotname:0}});
	
	
	<%
	}
	%>
			dt.drawMultiHead(true);
			dt.setCols(col);
			/*********设置样式*************/
			dt.headsort(true);
			dt.setAllowClock(false);
			dt.setClassName('dttheme_ifmis');
			dt.setMouselight('#CFF6FF');
			dt.mousedrag(false);
			var _div=document.getElementById('tbl-container')
			dt.draw(_div);
	window.onload=function(){
	var bl=document.getElementsByTagName("span");
	for(var i=0;i<bl.length;i++){
		bl[i].style.textOverflow="ellipsis";
		bl[i].style.whiteSpace="nowrap";
		bl[i].style.overflow="hidden";
	}
	controlShowInfo();
	}
	</script>
