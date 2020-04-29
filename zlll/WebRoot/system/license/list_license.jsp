<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<link rel="stylesheet" type="text/css" href="<%=path%>/style/dialog.css" />
<script type="text/javascript" src="<%=path%>/js/dialog.js"></script>
<SCRIPT LANGUAGE="JavaScript">
<!--
var mainsub = false;//标注列表页面是否主子 true:是 false :否
var error="<%=(String)request.getAttribute("error")%>";
if(error.trim().length>0&&"null"!=error){
	alert(error);
}
//-->
</SCRIPT>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id=queryform
	action="index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&<c:out value="${DEFAULTURLPARAMETER}"/>"
	method="post">
	<ui:queryform formid="queryform" />
</form>

<form name="mainListForm" id="mainListForm" action="#" method="post">
	<input name="selectedbillids" id="selectedbillids" type="hidden" value=""/>
	<input type ="hidden" name ="maindata" id ="maindata" />
	<div id="form_table_title">
		<ul>
			<li class="top"><div>主单信息</div></li>
			<li>
				<ui:row2column dataid="tmain" showdivname="edit_table"
					columnNum="4" drawDetail="false" tdetailName="tdetail"
					tdetailShowDivName="edit_table_tdetail"/>
			</li>
		</ul>
	</div>
	<!--请保留此div和a标签 -->
	<div id="containerline5">
	<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
		<ui:datatable id="tmain" tabletype="MainList" data="json" showcheckbox="true" columndefine="true" useThisHead="tempHeadHtml" createAmtColumn="true" sumColumnList='<%=(String)request.getAttribute("sumColumnList")%>'/>
	</div>
</form>

<div class="dialog_content" id="Dlg_OutProject" style="display:none">
      <table id="edit_table" width="90%" class="form" style="margin:auto">
		  <tr>
		    <th><span>*</span><label>网卡物理地址</label>:</th>
		    <td><input type="text" id="macaddress" value="" size="19"/>  <a href="javascript:macaddress.value='<%=gov.mof.fasp.ifmis.system.license.util.MacAddressUtil.getMacAddress()%>';void(0);">获取本服务器地址</a></td>  
		  </tr>
		  <tr>
		     <th><span>*</span><label>生成密码</label>:</th>
		     <td><input type="password" id="password" value="" size="20"/></td>
		  </tr>
		  <tr>
		     <th><label>是否测试版</label>:</th>
		     <td><input type="checkbox" id="istest" value="1" size="20"/></td>
		  </tr>
		  <tr>
		     <td colspan="2">网卡物理地址的取得方式：
				<table border="1" cellspacing="0" width="100%" id="table1">
					<tr>
						<td width="50%">操作系统</td>
						<td>执行命令</td>
					</tr>
					<tr>
						<td width="50%">window</td>
						<td>ipconfig /all</td>
					</tr>
					<tr>
						<td width="50%">Linux</td>
						<td>/sbin/ifconfig -a</td>
					</tr>
					<tr>
						<td width="50%">SunSolaris</td>
						<td>/usr/sbin/arp</td>
					</tr>
					<tr>
						<td width="50%">Macintosh</td>
						<td>ifconfig</td>
					</tr>
					<tr>
						<td width="50%">HPUX</td>
						<td>/usr/sbin/lanscan -a</td>
					</tr>
				</table>
			 </td>
		  </tr>
       </table>
 <div class="formbtns">
    <input id="outProject_itemid" type="hidden" />
    <button type="button" id="btn_OutProject">确 定</button>
    <button type="button" onclick="closeDialog('OutProject')">取 消</button>
  </div>
</div>
<SCRIPT LANGUAGE="JavaScript">
<!--

//修改操作
function createcert(){
	 var ismutilsel=0;
	 var actionname="生成证书";
     if(hasChecked()){
       if(tmain.getSelectedRow().length>1&&ismutilsel==0){
          alert("请选择单条数据进行"+actionname+"！");
       }else{
			inputDialog();
       }
     }else{
       alert("请选择要"+actionname+"的数据！");
     }
}

function inputDialog(){
  JQ("#btn_OutProject").unbind("click").bind("click",function(){
  	
  	var macaddress = JQ("#macaddress").val();
  	var password = JQ("#password").val();

	if(!macaddress.match("^([A-Z0-9\ ]{1,2})-([A-Z0-9\ ]{1,2})-([A-Z0-9\ ]{1,2})-([A-Z0-9\ ]{1,2})-([A-Z0-9\ ]{1,2})-([A-Z0-9\ ]{1,2})$")&&"ifmis license"!=macaddress){
        alert("物理地址格式错误!物理地址格式应为六组两位的字符(大写或数字),中间用\"-\"隔开,如:F0-F0-F0-F0-F0-F0");
        return ;
    }
  	if(password.trim().length<1){
  		alert("密码不能为空");
  		return ;
  	}
	var istest = JQ("#istest").val();
	var paramdata = "macaddress="+macaddress+"&password="+password+"&istest="+istest;

	var selectRow=new Array();
	var len=tmain.getSelectedRow().length;
	for(var i=0;i<len;i++){
		selectRow[i]=tmain.getSelectedRow()[i].billid;
	}
	document.getElementById("selectedbillids").value=selectRow;
	document.mainListForm.action='createcert.do?'+paramdata+'&'+urlmenuparameter;
	document.mainListForm.submit();

    closeDialog("OutProject");
    
  });
  showDialog("生成证书","Dlg_OutProject",{"width":400,"height":250,"center":true},true,"OutProject");
}


//-->
</SCRIPT>