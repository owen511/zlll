<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%
	response.setHeader("Cache-Control","no-cache"); 
	response.setHeader("Pragma","no-cache"); 
	response.setDateHeader("Expires",0); 

	String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ request.getContextPath();
	String voucherFieldCode = "";
 	if(request.getParameter("vchfieldcode")!=null){
	  voucherFieldCode = request.getParameter("vchfieldcode");
	}

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="programstyle" type="text/css" />
<script type="text/javascript" src="<%=basePath%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/hashmap.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>	
<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_filter.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_shadow.js" type=text/javascript></SCRIPT>
<title>ѡ��</title>
 </HEAD>
 <BODY>
 <%String isEdit = request.getParameter("isedit");%> 
 <input type="hidden" id="itemid" name="itemid"></input>
 <table border="0" width="100%" height="100%" id="table1" cellspacing="0" cellpadding="0">
	<tr>
		<td height="95%">
			<iframe id=opwin name="opwin" src="loading.htm" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>
		</td>
	</tr>
	<tr id="zx">
		<td height="5%" align="center">
		<div id="a" style="display:none">
			<% if(isEdit.equalsIgnoreCase("1")){ %>
			<c:if test="${elementcolumn.name == '��Ŀ'}">
			<a href="<%=request.getContextPath()%>/common/addProgram.jsp" target="opwin" id ="linkadd" style="display:none;"></a>
	     	<input type="button" value="����һ��" id="f_btn" class="button_style"  onclick="add('father')" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;
	     	<input type="button" value="�����Ӽ�" id="c_btn" class="button_style"  onclick="add('child')" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;
	     	<input type="button" value="�޸�" id="m_btn" class="button_style" onclick="domodify()" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;
	     	<input type="button" value="ɾ��" id="d_btn" class="button_style" onclick="dodelete()" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;
			</c:if>
			<%} %>
			<INPUT type="button" onclick="javascript:closeWindow(true)" value="ȷ��" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;<INPUT type="button" onclick="javascript:closeWindow(false)" value="ȡ��" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
		</div>
		<div id="b" style="display:none">
			<% if(isEdit.equalsIgnoreCase("1")){ %>
			<c:if test="${elementcolumn.name == '��Ŀ'}">
			<a href="<%=request.getContextPath()%>/common/addProgram.jsp" target="opwin" id ="linkadd" style="display:none;"></a>
	     	<input type="button" value="����" id="f_btn" class="button_style"  onclick="add('father')" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;
			<input type="button" value="�޸�" id="" class="button_style" onclick="domodify()" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;
			<input type="button" value="ɾ��" id="" class="button_style" onclick="dodelete()" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;
			</c:if>
			<%} %>
			<INPUT type="button" onclick="javascript:closeWindow(true)" value="ȷ��" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;<INPUT type="button" onclick="javascript:closeWindow(false)" value="ȡ��" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
		</div>
		</td>
	</tr>
</table>
 </BODY>
</HTML>

<SCRIPT LANGUAGE="JavaScript">
var k = window.dialogArguments;
$("programstyle").href = k.$("ifmisfontstyle").href;
var selvalue = k.selvalue;
var row = k.row;
var page = k.page;
var ismutl = k.ismutl;
var vchCode = k.vchtypecode;
var sqlwhere = k.elementfilter;
var chkAll = k.chkAll;
//ҳ�����ʱ������Ŀ���
window.onload=function(){
		document.all.opwin.src="<%=request.getContextPath()%>/common/jump/turnProgram.do"+document.location.search;
}

//��ѡ���巵��ֵ�������
var selectObj = new Object();
selectObj.value="";
selectObj.id="";
selectObj.valuecode="";
selectObj.chkAll = new Array();
selectObj.page=new Object();
selectObj.data=new Object(); //�洢�ж���
var mulSelected = new Object(); //��ѡֵ�洢
var mulPath = new Object();
//�رմ���
function closeWindow(isReturn){
	if(ismutl == 2){
		for(var i in mulSelected){
				if(mulSelected[i] !=""){
					selectObj.id += i.replace(/\_node/,"")+",";
					selectObj.value += mulSelected[i];
				}
			}
		for(var i in mulPath){
				selectObj.valuecode += mulPath[i];
			}
	}
	if(isReturn){
		if(selectObj.id==""){
			alert("��ѡ������!");
			return;
		}		
	}
	if(isReturn && selectObj.id!=""){
		window.returnValue = selectObj;
	}
	else{
		window.returnValue = "cancel_";
	}
	var func;
    try{
        /* ��̬���ø����ڵ�ĳ������(����:ѡ����window),
         * ��������ڳ�ʼ����֮ǰ������
         * ��������ڸ����ڿ�ʵ��,���ʵ�ֿ��Զ������������κβ���,��:��������,
         * ��Ȼ,�ڸ�����Ҳ���Բ�ʵ�ָķ���
         * ganhua 20090212
         **/
        func="window.dialogArguments.callByElementTreeBeforeClose_"+"<%=voucherFieldCode%>"+"(window)";
        eval(func);
        
	}catch(e){
		//alert("��̬���ø����ڵ�ĳ����������:"+func);
		//���ɹ�,������,��������û��ʵ�ָķ�������
	}
	//���ȫ�ֱ���
	if(k.elementfilter);
	{
		k.elementfilter = null;
	}
	window.close();
}
//����
function add(flag){
	var itemid = "";
	if(flag != "father"){
		if(selectObj.id != ""){
			window.path = selectObj.valuecode;
			var arrCode = selectObj.valuecode.split(",");
			itemid = arrCode[arrCode.length-1];
		}else{
			alert("��ѡ�񸸼�");
			return;
		}
		if(itemid!=""){
				window.selectNode = itemid;
		}
	}
	var url  = "<%=request.getContextPath()%>" + "/common/getProgramInfo.do?itemid="+itemid;
	window.addFlag = flag;
	window.programdefaultvalue = k.programdefaultvalue;
	window.mustselect = k.mustselect;
	window.progamAddElements = k.progamAddElements;
	window.repeatprograms = k.repeatprograms;
	window.vchCode = vchCode;
	window.showModalDialog(url, window, "dialogHeight:400px;dialogWidth: 300px;resizable: No; status: No;help:No;");
}
//��ȡѡ�����ݺ͸��ڵ�id
function getItemId(){
	var nodeinfo = {itemid:null,parentid:null,name:null};
	if(selectObj.id != ""){
		window.path = selectObj.valuecode;
		var arrCode = selectObj.valuecode.split(",");
		nodeinfo.itemid = arrCode[arrCode.length-1];
		nodeinfo.parentid = arrCode[arrCode.length-2];
		var value = selectObj.value;
		nodeinfo.name = value.split("-")[1];
	}
	return nodeinfo;
}
//�޸�
function domodify(){
	var flag = "modify";
	var nodeinfo = getItemId();
	if(!nodeinfo.itemid){
		alert("��ѡ��Ҫ�޸���Ŀ��");
		return;
	}
	var isuseflag = programisuse(nodeinfo.itemid);
	var objChild = hasChildNode(nodeinfo);
	//��Ŀ��ʹ�ò����޸ģ���Ŀ�����ӽڵ�ʱֻ���޸�����
	if(!isuseflag){
		var url  = "<%=request.getContextPath()%>" + "/common/getProgramInfo.do?itemid="+nodeinfo.itemid;
		window.addFlag = flag;
		window.name = nodeinfo.name;
		window.itemid = nodeinfo.itemid;
		window.parentcode = objChild.parentcode;
		window.haschildnode = objChild.flag;
		window.load = onload;
		window.programdefaultvalue = k.programdefaultvalue;
		window.mustselect = k.mustselect;
		window.progamAddElements = k.progamAddElements;
		window.repeatprograms = k.repeatprograms;
		window.vchCode = vchCode;
		window.showModalDialog(url, window, "dialogHeight:400px;dialogWidth: 300px;resizable: No; status: No;help:No;");
	}else{
		alert("����Ŀ�ѱ�ʹ�ã�");
	}	
}
//ɾ��
function dodelete(){
	var nodeinfo = getItemId();
	if(!nodeinfo.itemid){
		alert("��ѡ��Ҫɾ����Ŀ��");
		return;
	}
	if(confirm("ȷ��ɾ����?")) {
		var flag = programisuse(nodeinfo.itemid);
		var haschildnode = hasChildNode(nodeinfo).flag;
		if(!flag && !haschildnode){
			var url = "<%=request.getContextPath()%>" + "/common/deleteProgram.do?itemid="+nodeinfo.itemid+"&parentid="+nodeinfo.parentid;
			JQ.ajax({
				url:url,
				async: false,
				success:function(data){
					if(eval(data)){
						alert("ɾ���ɹ���");
						window.returnValue= {value:"",id:"",valuecode:""};
						window.close();
					}else{
						alert("ɾ��ʧ�ܣ�");
					}
				}
			});
		}else{
			if(flag){
				alert("����Ŀ�ѱ�ʹ�ã�");
			}else if(haschildnode){
				alert("����Ŀ���ӽڵ㲻��ɾ����");
			}
		}
	}
}
//�ж���Ŀ�Ƿ�ʹ��
function programisuse(itemid){
	var url  = "<%=request.getContextPath()%>" + "/common/programIsUse.do?itemid="+itemid;
	var flag = JQ.ajax({
		url:url,
		async: false
	}).responseText;
	return eval(flag);
}
//�ж��Ƿ�Ϊ�����ڵ㣬���ڵ㲻���޸ı����ɾ��
function hasChildNode(nodeinfo){
	if(nodeinfo.parentid && nodeinfo.parentid!="0"){
		var url  = "<%=request.getContextPath()%>" + "/common/programHasChild.do?itemid="+nodeinfo.itemid+"&parentid="+nodeinfo.parentid;
	}else{
		var url  = "<%=request.getContextPath()%>" + "/common/programHasChild.do?itemid="+nodeinfo.itemid;
	}
	var data = JQ.ajax({
		url:url,
		async: false
	}).responseText;
	return eval("(" + data + ")");
}
//ȡ�����ӵ���
function addBack(detailObj){
   	window.returnValue=detailObj;
   	window.close();
}
</SCRIPT>
