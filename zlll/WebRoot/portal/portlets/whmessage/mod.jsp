<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;

%>
<form name="form1" id="form1" action="#" method="post" >
    <input type="hidden" id="maindata" name="maindata" value=""/>
    <input type="hidden" id="optype" name="optype" value="add"/>
    <input type="hidden" id="msid" name="msid" value=""/>
     <input type="hidden" id="senduser" name="senduser" value=""/>
      <input type="hidden" id="createtime" name="createtime" value=""/>
    <input name=submenu id=submenu type="hidden" value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden" value="<c:out value='${param.mainmenu}'/>" />
		<div id="form_table_title" >
			<ul>
				<li class="top">
					<div>修改消息</div>
				</li>
			</ul>
		</div>
		<!-- 请保留此div和a标签  -->
		<div id="edit_table" style="height:400px;">
		<!--按link解析编辑区 -->
		<div id="editform" onkeydown = "switchFocus()"> 
		<table id ="edittable" width="100%" border="0" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
            <tr>
              <td style="width:10%" align="right">消息内容<span  style="color:red; ">*</span></td>
              <td colspan="5"  align="left"><input type="text" maxlength="250" value="" id="content" name="content" style="width:98%"/></td>
            </tr>
            <tr>
              <td  style="width:10%" align="right">开始时间<span  style="color:red; ">*</span></td>
              <td colspan="2" align="left"><input type="text" class="inputst" id="starttime" name="starttime" onclick="return showCalendar('starttime', '%Y-%m-%d', null, true);"   value="" style="width:260px;"/>
           <img src="/images/calendar/date.gif" alt="选择日期" onclick="return showCalendar('starttime', '%Y-%m-%d', null, true);" style="cursor:hand; border:0;" onmouseover="this.style.background='red';" onmouseout="this.style.background=''"/>
           </td>
              <td  style="width:10%" align="right">结束时间</td>
              <td colspan="2"  align="left">
              <input type="text" class="inputst" id="endtime" name="endtime" onclick="return showCalendar('endtime', '%Y-%m-%d', null, true);"   value="" style="width:260px;"/>
           <img src="/images/calendar/date.gif" alt="选择日期" onclick="return showCalendar('endtime', '%Y-%m-%d', null, true);" style="cursor:hand; border:0;" onmouseover="this.style.background='red';" onmouseout="this.style.background=''"/>
           
              </td>
            </tr>
           	<tr>
		 <td  style="width:10%" align="right">消息所属用户组</td>
          <td colspan="2"><input type="text" id="gcodesname" name="gcodesname" onclick="clickOn();" value="" style="width:260px;"/>
               <input type="hidden" id="gcode" name="gcode" value="" />
               <input type="button" value="..." onclick="clickOn();" />
          <img align=middle type ='image' value='清空' src='<%=basePath%>/images/done_btn/clear_qry2.gif' onclick="clearinput();" />
           </td>
           <td style="width:10%" align="right">链接地址</td>
              <td colspan="2"  align="left"><input type="text" id="linkname" name="linkname" maxlength="250" value="" style="width:260px;"/></td>
           </tr>
            
          </table>
    </div>
    <div id="querybutton">
		<div align="right">
		
		<input type="button" id="saveAndOut" name="save"  value="保存并退出" onclick="saveExit()" class="button_style" >
		<input type="button" id="cancel"   name="cancel"  value="返回" onclick="back()" class="button_style">	
		</div>
	</div>
</form>
<script type="text/javascript">

function checkinput(){
	
	if(trim($('content').value)==''){
		alert('消息内容不能为空');
		return false;
	}	
	if(trim($('starttime').value)==''){
		alert('开始时间不能为空');
		return false;
	}
	
	if(trim($('endtime').value)!=''){
		
	if(trim($('starttime').value)>trim($('endtime').value)){
		alert('结束时间不能小于开始时间!');
		return;
	}
	}
	return true;	
}

function saveExit(){
	var formObject = $("form1");
	var mainmenu='<%=request.getParameter("mainmenu") %>';
	var submenu= <%=request.getParameter("submenu") %>;
	formObject.action = "<%=request.getContextPath()%>/portal/message/update.do?mainmenu="+mainmenu+"&submenu="+submenu;	
	if(checkinput()){
		if(trim($('gcodesname').value)==''){			
			if(confirm("不选择消息所属用户组，消息会发送给所有用户,请确定是否保存!")){
				formObject.submit();
			}else{
			return false;
			}
		}else{
		formObject.submit();
		}
	}
}

function back(){	
			var mainmenu='<%=request.getParameter("mainmenu") %>';
		var submenu= <%=request.getParameter("submenu") %>;
	var url="<%=basePath%>/portal/message/messagequery.do?mainmenu="+mainmenu+"&submenu="+submenu;	
	window.location.href = url;	
}
function clickOn(){
	var myDialog = new Object();
	var treemenujson=<%=request.getAttribute("treemenujson1")%>;
	var ckvalue =  document.getElementById("gcode").value;
	myDialog.treemenujson = treemenujson;
	myDialog.ckvalue = ckvalue;
	var ieHeight = 400;
    var ieWidth =400;

	if(Sys.ie == '6.0') //IE7情况,在IE6的情况下加50px 
    {
      ieHeight += 50;
    }
	var result = window.showModalDialog("<%=request.getContextPath()%>/portal/portlets/whmessage/queryRight.jsp",myDialog,"dialogHeight:"+ieHeight+"px;dialogWidth: 325px;resizable: No; status: No;help:No;");
	var value=[], valueid=[];
	var projectname = document.getElementById("gcodesname");
	if(result){
	if(typeof result == "string"){
		document.getElementById("gcodesname").value=document.getElementById("gcodesname").value;  
		document.getElementById("gcode").value=document.getElementById("gcode").value; 
	}else{
	for(var pro in result) {
		var _resultObj = result[pro];
		if(typeof _resultObj != "object")continue;
		value.push(_resultObj.name,";");
		valueid.push(_resultObj.itemid,";");
	}
	document.getElementById("gcodesname").value=value.join("");  
	document.getElementById("gcode").value=valueid.join(""); 
	} 
	}else{
		document.getElementById("gcodesname").value=document.getElementById("gcodesname").value;  
		document.getElementById("gcode").value=document.getElementById("gcode").value; 
	}
}
window.onload=function(){
	var content= '<%=request.getAttribute("content")%>';
	var gcode = '<%=request.getAttribute("gcode")%>';
	var gcodesname = '<%=request.getAttribute("gcodesname")%>';
	var starttime = '<%=request.getAttribute("starttime")%>';
	var endtime = '<%=request.getAttribute("endtime")%>';
	var linkname = '<%=request.getAttribute("linkname")%>';
	var endtime = '<%=request.getAttribute("endtime")%>';
	var createtime = '<%=request.getAttribute("createtime")%>';
	var senduser = '<%=request.getAttribute("senduser")%>';
	var msid = '<%=request.getAttribute("msid")%>';
	if("null"==content){
		content = "";
	}
	if("null"==msid){
		msid = "";
	}
	if("null"==createtime){
		createtime = "";
	}
	if("null"==senduser){
		senduser = "";
	}
	if("null"==gcode){
		gcode = "";
	}
	if("null"==gcodesname){
		gcodesname = "";
	}
	if("null"==starttime){
		starttime = "";
	}
	if("null"==endtime){
		endtime = "";
	}
	if("null"==linkname){
		linkname = "";
	}
	document.getElementById("content").value=content;
	document.getElementById("gcode").value=gcode;
	document.getElementById("gcodesname").value=gcodesname;
	document.getElementById("starttime").value=starttime;
	document.getElementById("endtime").value=endtime;
	document.getElementById("linkname").value=linkname;
	document.getElementById("createtime").value=createtime;
	document.getElementById("senduser").value=senduser;
	document.getElementById("msid").value=msid;
}
function clearinput(){
	document.getElementById("gcode").value="";
	document.getElementById("gcodesname").value="";
}
</script>