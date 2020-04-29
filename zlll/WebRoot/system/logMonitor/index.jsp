<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
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
%>
<script>
function importLog(){
 alert(Ext.lt.ifmis.activex.getFlashVersion());
}
function checkInputValue(oTextbox){
    oTextbox.value = oTextbox.value.trim();
	var inputVal = oTextbox.value;
	var regDate = /^[0-9]+$/;
	var isValidDate = regDate.test(inputVal);
	if(inputVal!=null&&inputVal!=""){
			if(!isValidDate){
				alert("������Ǹ�����!");
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
 	alert("����ѡ���¼��־�����ڣ�");
 	return;
 }
 	$('queryform').action="<%=request.getContextPath()%>/system/logMonitor/index.do?mainmenu="+mainmenu+"&submenu="+submenuid+"&date="+dateValue;
	$('queryform').submit();
}
function queryLog(){
var dateValue=document.getElementById("date").value;
if(dateValue==null||dateValue==""){
 alert("��δѡ����־��");
 return;
}
if($('sameURL')==null||$('sameURL')==undefined){  //ͳ�ƽ�����˲�ѯ
$('queryform').action="<%=request.getContextPath()%>/system/logMonitor/queryLogInfo.do?mainmenu="+mainmenu+"&submenu="+submenuid+"&date="+dateValue;
}else if($('sameURL')!=null||$('sameURL')=="yes"){
}
 $('queryform').submit();
}
// ����ID�и�ѡ��ѡ�ĸ���
function getSelectedCount() {
    var count = 0;
    for (var i = 0; i < $('queryform').elements.length; i++) {
        var e = $('queryform').elements[i];
        if (e.type == "checkbox" && e.checked) {
            count++;
        }
    }
    return count;
}
function mainclick(row){
	var s = "";
	for(var v in row ){
		s += v+":";
		eval("s += row."+v);
		s += "\n";
	}
	var formObject = $("queryform");
	formObject.selectedRow = row;
}
var submenuid = <c:out value="${param.submenu}"/>;
var mainmenu = <c:out value="${param.mainmenu}"/>;
var pars = 'submenu=' + submenuid+ '&mainmenu=' + mainmenu;
//��ʾ����ҵ��˵�
function chooseSys(){
	var url = "/system/logMonitor/showSys.do?"+pars;
	var iWidth=300;
	var iHeight =450;
	var iTop = (window.screen.availHeight-30-iHeight)/2;       //��ô��ڵĴ�ֱλ��;
    var iLeft = (window.screen.availWidth-10-iWidth)/2; 
	window.open(url, 'newWindow','width=310px,height=450px,top='+iTop+',left='+iLeft+',status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no,help:No');
}
//׷����ͬURL
function doQueryWithSameURL(){
	if (getSelectedCount() == 0) {
        alert("������ѡ��һ����¼!");
        return false;
    }
    if(getSelectedCount() > 1){
        alert("ֻ��ѡ��һ����¼!");
        return false;
    }
	var selectRow=tmain.getSelectedRow();
	var url="none";
	var method="none";
	for(var i=0;i<selectRow.length;i++){
	if(url.indexOf(selectRow[i].uRL)==-1){
		url=selectRow[i].uRL;
		method=selectRow[i].methodName;
	}
	}
	$('reURL').value=url;
	$('reMethod').value=method;
	$('queryform').action="<%=request.getContextPath()%>/system/logMonitor/getSameURL.do?mainmenu="+mainmenu+"&submenu="+submenuid;
	$('queryform').submit();
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
			��־��¼����&nbsp;
			<input type="text" id="date" name="date" readonly />
			<img src="/images/calendar/date.gif" alt="��¼����" onclick="return showCalendar('date', '%Y-%m-%d', null, true);" style="cursor:hand; border:0;border:0;background:none;" 
					onmouseover="this.style.background='red';" 
					onmouseout="this.style.background=''">
			</td>
			 <td align="left">
			 <input  type="hidden" name="sysID" id="sysID">
					ҵ��ģ��&nbsp;
					<input name="systemmenu" type="text" id="systemmenu"  onclick="chooseSys();"/>
					<button style='margin-left:8px;'onclick="chooseSys();"></button>
					<img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick="$('systemmenu').value='';$('sysID').value='';"/>
				</td>
			 <td align="left">
					��ֵ&nbsp;
					<input name="spendtime" type="text" id="spendtime"  onblur="checkInputValue(this);"/>
					(ͳ�Ƴ�����ֵ�����󣬵�λ��ms)
				</td>
			</tr>
		</table>
		<input type="hidden" name="FromPage" id="FromPage" value="yes"/>
		<input type="hidden" name="reURL" id="reURL"/>
		<input type="hidden" name="reMethod" id="reMethod"/>
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
		
		</script>
		<%if(sameURL!=null&&sameURL.equals("yes")){ %>
		<input type="hidden" id="sameURL" id="sameURL" value="yes"/>
		<%} %>
</div>
</div>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					��־�������
				</div>
			</li>
		</ul>
	</div>
	<!--�뱣����div��a��ǩ -->
	<div id="containerline20">
		<div id='tmain_div'
			style='position:relative;height:expression(this.offsetParent.offsetHeight+160);width:100%;'></div>
	</div>
<!--�뱣����div��a��ǩ -->
<div id="containerline15">
<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
</div>
<script>
	col = createColumnConfig();
	col.id = "uRL";
	col.name = "uRL";
	col.type = "S";
	col.title = "����URL";
	col.show = function(rownum,value,row,tdobj,datatable){
	tdobj.style.width="120px";
		if(row["uRL"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "menuName";
	col.name = "menuName";
	col.type = "S";
	col.title = "ҵ��ģ��";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["menuName"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "spendTime";
	col.name = "spendTime";
	col.type = "S";
	col.title = "��ʱ(ms)";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["spendTime"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "startTime";
	col.name = "startTime";
	col.type = "S";
	col.title = "����ʱ��";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["startTime"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;

	col = createColumnConfig();
	col.id = "endTime";
	col.name = "endTime";
	col.type = "S";
	col.title = "��������ʱ��";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["endTime"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;

	col = createColumnConfig();
	col.id = "maxspendTime";
	col.name = "maxspendTime";
	col.type = "S";
	col.title = "����ʱ(ms)";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["maxspendTime"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
		col = createColumnConfig();
	col.id = "minspendTime";
	col.name = "minspendTime";
	col.type = "S";
	col.title = "��С��ʱ(ms)";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["minspendTime"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
		col = createColumnConfig();
	col.id = "avrspendTime";
	col.name = "avrspendTime";
	col.type = "S";
	col.title = "ƽ����ʱ(ms)";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["avrspendTime"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "trueValue";
	col.name = "trueValue";
	col.type = "S";
	col.title = "��ӽ���ֵ(ms)";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["trueValue"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;

	col = createColumnConfig();
	col.id = "percent";
	col.name = "percent";
	col.type = "S";
	col.title = "��ʱ����0.5s����";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["percent"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;	
	
	col = createColumnConfig();
	col.id = "countURL";
	col.name = "countURL";
	col.type = "S";
	col.title = "���ʴ���";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["countURL"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;	
	
	
	col = createColumnConfig();
	col.id = "methodName";
	col.name = "methodName";
	col.type = "S";
	col.title = "ִ�з�������(ms)";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["methodName"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	var tmain =new dataTable();
	tmain.parent = document.getElementById('tmain_div');
	<%
	if(sameURL!=null&&sameURL.equals("yes")){
	%>
	tmain.setTableHead(["serial","checkbox","uRL","methodName","menuName","spendTime","startTime","endTime"]);
	<%
	}else{
	%>
	tmain.setTableHead(["serial","checkbox","uRL","methodName","menuName","maxspendTime","minspendTime","avrspendTime","trueValue","percent","countURL"]);
	<%
	}
	%>
	<%
		String json = (String)request.getAttribute("json");
		if(null == json || "".equals(json)){
			out.println("tmain.data = new Array();\n");
		}else{
			out.println("tmain.data = "+ json);
		}
	%>
	tmain.onrowclick = mainclick;
	tmain.show();
	var aRowsList=tmain.data;
	try{
	aRowsList.sort(tmain.generateCompareFunc("uRL","STRING",2));//�б�Ĭ�ϰ���URL����
	tmain.drawing = true;
	tmain.draw();
	}catch(e){
	alert(e);
	}
</script>
