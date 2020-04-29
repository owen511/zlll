<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<script type="text/javascript">
// �Ƿ��Ѿ�ѡ��
function isSelected() {
    for (var i = 0; i < $('queryform').elements.length; i++) {
        var e = $('queryform').elements[i];
        if (e.type == "checkbox" && e.checked) {
            return true;
        }
    }
    return false;
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

//������ʾ
function loadError(){
	var error = '<c:out value="${error}"/>';
	if("" != error ){
		alert(error);
	}
}
loadError();

// ����
function doAdd() {
	var submenuid = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
    var url = "<%=request.getContextPath()%>/portal/userinfo/turnToSave.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
    window.location.href = url;
}

// �޸�
function doMod(){
	if (getSelectedCount() == 0) {
        alert("������ѡ��1����¼��Ȼ��[�޸�]��");
        return false;
    } else if (getSelectedCount() > 1) {
        alert("ֻ��ѡ��1����¼��Ȼ��[�޸�]��");
        return false;
    }
    
	var selectedRow = tmain.getSelectedRow();
    var userid = selectedRow[0].userid;
    
    
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	
    if(userid == null || "" == userid)
    {
    	alert("����ֵ������ˢ��ҳ�棡");
    	return false;
    }
    var url = "<%=request.getContextPath()%>/portal/userinfo/turnToModify.do?mainmenu="+mainmenu+"&submenu="+ submenuid + "&userid="+ userid;
    window.location.href = url;
}

function doDel(){
	var selectedRow = tmain.getSelectedRow();
    if(null == selectedRow){
    	alert("��ѡ��Ҫɾ�����û���");
        return;
    }
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
   	
   	var userid = "";
   	for(var i = 0; i<selectedRow.length; i++ )
   	{
   		if(selectedRow[i].userid == null || "" == selectedRow[i].userid)
	    {
	    	alert("����ֵ������ˢ��ҳ�棡");
	    	return false;
	    }else{
	    	userid = userid + "&userid="+ selectedRow[i].userid;
	    }
   	}
    
    var url = "<%=request.getContextPath()%>/portal/userinfo/delete.do?mainmenu="+mainmenu+"&submenu="+ submenuid + userid;
    if(confirm("ȷ��ɾ����ѡ�û���")){
    	window.location.href = url;
    }
}

function search(){
	var code = document.getElementById("code").value.trim().toUpperCase();
	var name = document.getElementById("name").value.trim();
	var organidStr = document.getElementById("bdgagency").value.trim();
	var logintype = document.getElementById("logintype").value;
	var organtype = document.getElementById("organtype").value;
	tdetail.data = new Array();
	tdetail.show();
	var list = new Array();
   	for(var i=0;i<userList.length;i++){
   		var row = userList[i];
   		if(code != "" ){
   			if(null == row.code || row.code.indexOf(code) == -1){
   				continue;
   			}
   		}
   		if(name != "" ){
   			if(null == row.name || row.name.indexOf(name) == -1){
   				continue;
   			}
   		}
   		if(organtype != "" ){
   			if(null == row.organtype || row.organtype!=organtype){
   				continue;
   			}
   		}
   		if(organidStr != ""){
   			if(null == row.organidStr || organidStr.indexOf(row.organidStr.split('--')[1]) == -1){
   				continue;
   			}
   		}
   		if(logintype !=""){
   			if(null == row.logintype || row.logintype != logintype){
   				continue;
   			}
   		}
   		list[list.length] = row;
   	}
   	tmain.data = list;
   	tmain.show();
}

function doCopy(){
	if (getSelectedCount() == 0) {
        alert("������ѡ��1����¼��Ȼ��[����]��");
        return false;
    } else if (getSelectedCount() > 1) {
        alert("ֻ��ѡ��1����¼��Ȼ��[����]��");
        return false;
    }
    
	var selectedRow = tmain.getSelectedRow();
    var userid = selectedRow[0].userid;
	
    if(userid == null || "" == userid)
    {
    	alert("����ֵ������ˢ��ҳ�棡");
    	return false;
    }
    var url = "<%=request.getContextPath()%>/portal/userinfo/turnToCopy.do?userid="+ userid;
    var features = "top=150,left=50,width=750,height=500,scrollbars=no,resizable=no";
    window.open(url, "�û�����", features);
}

function datapermission(){
	if (getSelectedCount() == 0) {
        alert("������ѡ��1����¼��Ȼ��[����Ȩ��]��");
        return false;
    } else if (getSelectedCount() > 1) {
        alert("ֻ��ѡ��1����¼��Ȼ��[����Ȩ��]��");
        return false;
    }
    
	var selectedRow = tmain.getSelectedRow();
    var userid = selectedRow[0].userid;
	
    if(userid == null || "" == userid)
    {
    	alert("����ֵ������ˢ��ҳ�棡");
    	return false;
    }
    var url = "<%=request.getContextPath()%>/portal/userinfo/queryDataRight.do?userid="+ userid;
    var features = "top=150,left=50,width=750,height=500,scrollbars=no,resizable=no";
    window.open(url, "����Ȩ��", features);
}
//�л���½��ʽ
function  changlogintype(){
	var selectedRow = tmain.getSelectedRow();
    if(selectedRow.length==0){
    	alert("��ѡ��Ҫ���ĵ��û���");
        return;
    }
    /*
    if(selectedRow.length>1){
    	alert("ÿ��ֻ�ܸ���һ����");
        return;
    }
    */
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
   	
   	/*var logintype = "";
	if(selectedRow[0].logintype == null || "" == selectedRow[0].logintype)
	    {
	    	alert("���û��޵�½�������飡");
	    	return false;
	    }else{
	    	logintype = logintype + "&logintype="+ selectedRow[0].logintype;
	    }
    var usercode = "&usercode="+selectedRow[0].code;
    */
    if(confirm("ȷ�����Ĵ��û���½��ʽ��")){
    	
		var usercodes = [];
		var logintypes = []; 
		for(i = 0 ;i<selectedRow.length;i++){
			var logintype = selectedRow[i].logintype;
			if(logintype==null&&logintype==""){
				alert("���û��޵�½�������飡");
		    	return false;
			}
			usercodes.push(selectedRow[i].code);
			logintypes.push(logintype);
		}
		show();
	    new Ajax.Request("<%=request.getContextPath()%>/portal/userinfo/modifylogintype.do?random="+Math.random(), 
         	{
    	   		parameters : "logintype=" + logintypes.join(',') +"&usercode=" + usercodes.join(','),
    	   		method: 'post', 
    	   		onComplete : function(resp) { //"resp" is just the XMLHttpRequest object
	    	     	//if(resp.responseText=="true"){
	    	     		var url = "<%=request.getContextPath()%>/portal/userinfo/query.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	    	     	    window.location.href = url;
	    	     	//}
    	        },
    	   		requestHeaders: {Accept: 'application/json'},
    	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
    	        }
    		}); 
   	 }	    
}
function selectOrgan(obj){
	var formObject = $("queryform");
	var elementcode = formObject.organtype.value;
	var codevalue =  formObject.bdgage.value;
	if(null == elementcode || "" == elementcode){
		alert("����ѡ��һ�ֻ������ͣ�");
		return false;
	}
	var submenu = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	selectMutlElememt(mainmenu,submenu,"5001",elementcode,obj,false,"",elementcode);
	//selectBaseInfoElememt(mainmenu,submenu,elementcode,obj,codevalue);
}

function selectBaseInfoElememt(mainmenu,submenu,elementcode,backinputStr,codevalue){
	var selvalue = backinputStr.valuecode != undefined ? backinputStr.valuecode : backinputStr.value;
	window.selvalue = selvalue;
    var element = window.$(elementcode);
   	var url = "<%=request.getContextPath()%>/portal/userinfo/elementtree.do?mainmenu="+mainmenu+"&submenu="+submenu+"&elementcode="+elementcode+"&organCode="+codevalue;
	var result = window.showModalDialog(url,window,'dialogHeight:500px;dialogWidth: 325px;resizable: No; status: No;help:No;');
	
	if(result != null){
	    if(typeof(result)!="string"){
		var str = backinputStr.id;
		eval(" var backinput = document.getElementById('"+str.substring(0,str.length-3)+"')");
		backinput.value = result.id;
		backinputStr.value = result.value;
		}
	}
}
//��ѯ���е�Ȩ��
function selectMutlElememt(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,checkflag,elementfilter,organtype){
    //wy add 20090923     46000000,46000011,"5001",    "bdgagency", this.form.bdgagency, false,"","bdgagency"
    					//46000000,46000011,"5001",    "agentbank", this.form.agentbank, false,"","agentbank"
    /** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
	  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
	  * 
	**/
	codeShowFlag=1;
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	window.checkflag = checkflag;
	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";;
	var notReturn = true;
    try{
        notReturn = eval(func);
	}catch(e){
		//���ɹ�,������,��û��ʵ�ָ÷���
	}
	if(notReturn == false)
	{
		return;
	}
	var elementfilter = "";
	if(window.elementfilter){
		elementfilter = window.elementfilter;
	}

	var refererurl = ""+window.location.href;
	
	var url = ROOT_PATH+"/common/tree/openTreeUser.do?organtype="+organtype+"&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode
		+"&vchfieldcode="+vchfieldcode+"&elementfilter="+elementfilter+"&managerid=1"
		+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var result = window.showModalDialog(url,window,"dialogHeight:500px;dialogWidth: 325px;resizable: No; status: No; help:No;");
	//var result = window.open(url, 'newWindow','dialogWidth=400px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
    //�������Ĺ������� ganhua 20090509
	if(window.elementfilter);
	{
		window.elementfilter = null;
	}
	if(result != null){
	    if(typeof(result)!="string"){
			if(backinput == null){
				backinput = $(vchfieldcode);
			}
			backinput.value = result.value;
			backinput.valueid = result.id;
			backinput.isleaf= result.isleaf;
			backinput.valuecode = result.valuecode;
			try{
				document.getElementById("hidden_"+backinput.id).value= result.valuecode;
			}catch(e){}
		}
	}
	else
	{
	    if(backinput != null){
	        backinput.value = "";
			backinput.valueid = null;
			backinput.valuecode = "";
			try{
				document.getElementById("hidden_"+backinput.id).value= "";
			}catch(e){}
	    } 
	 }
	 codeShowFlag=null;
}

function clearOranid(){
	document.getElementById("bdgagency").value = "";
	document.getElementById("bdgage").value = "";
}
</script>
<form id="queryform" name="queryform" method="post"
	action="<%=request.getContextPath()%>/portal/userinfo/query.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	onsubmit="switchValue(this)">
	<div id="query_t">
		<div>
			<span><span title="��ѯ" class="query_btn" onclick="search()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">��ѯ</a> </span> </span>
			<span><span title="�����ѯ����" class="clear_btn" onclick="clearFormInputAll($('queryform'))"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">�����ѯ����</a> </span> </span>
			<span><span title="���ز�ѯ����" class="hidden_btn"
				onclick="doQuery2(this)" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
					href="#">���ز�ѯ����</a> </span><span>��</span> </span>

			<span><span title="����" class="add_btn" onclick="doAdd()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">����</a> </span> </span>
			<span><span title="�޸�" class="mod_btn" onclick="doMod()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">�޸�</a> </span> </span>
			<span>
				<c:if test="${type == '2'}">
				<span title="ɾ��" class="del_btn" onclick="doDel()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">ɾ��</a> </span>
				</c:if>
				<span>��</span>
			</span>
<!-- 
			<span><span title="����" class="copyPlay_btn" onclick="doCopy()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">����</a> </span><span>��</span>
			</span>
 -->			

			<span><span title="����Ȩ��" class="datapermission_btn"
				onclick="datapermission()" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
					href="#">����Ȩ��</a> </span> </span>
			<span><span title="���ĵ�½��ʽ" class="datapermission_btn"
				onclick="changlogintype()" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
					href="#">���ĵ�½��ʽ</a> </span> </span>		
		</div>
	</div>
	<div id="querylist" style="display:block">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td nowrap="nowrap">
					�û�����
				</td>
				<td nowrap="nowrap">
					<input type="text" name="code" id="code" >
				</td>
				<td nowrap="nowrap">
					�û�����
				</td>
				<td nowrap="nowrap">
					<input type="text" name="name" id="name">
				</td>
				<td nowrap="nowrap">
					��������
				</td>
				<td nowrap="nowrap">
				<select name=organtype id=organtype onchange="clearOranid()">
				    <option value="">
						&nbsp;
					</option>
					<c:forEach items="${organTypeMap}" var="entry">
						<option value="<c:out value='${entry.key}' />" <c:if test="${userViewDTO.organtype eq entry.key}"> selected </c:if> >
							<c:out value="${entry.value}" />
						</option>
					</c:forEach>
				</select>
				</td>
				<td width="10%" nowrap="nowrap">
					����
				</td>
			<td nowrap=nowrap id='td_bdgagency_1' style = 'width:20%'><input name="bdgage" id="bdgage" type="hidden"><input name="bdgagency_valuecode" id="bdgagency_valuecode" type="hidden"><input id="bdgagency" name="bdgagency" type=text class=text_pop readonly onclick='selectOrgan(this)' />  <button style='margin-left:8px;' onclick='selectOrgan(this.form.bdgagency)'></button><img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick='clearInputRule("bdgagency");clearInput(document.getElementById("bdgagency"));'>
</td>
			</tr>
			<tr>
				<td width="10%" nowrap="nowrap">
					��½��ʽ
				</td>
				<td width="20%" nowrap="nowrap">
					<select name="logintype" id="logintype">
						<option></option>
						<option value="0">�����½</option>
						<option value="1">CA��½</option>
					</select>
				</td>
			</tr>
		</table>
	</div>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					�û�ά����Ϣ
				</div>
			</li>
		</ul>
	</div>
	<!--�뱣����div��a��ǩ -->
	<div id="containerline12">
		<div id='tmain_div'
			style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
		<script type="text/javascript">
		col = createColumnConfig();
		col.id = "code";
		col.name = "code";
		col.type = "S";
		col.title = "����";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "name";
		col.name = "name";
		col.type = "S";
		col.title = "����";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "userclsid";
		col.name = "userclsid";
		col.type = "S";
		col.title = "���";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.userclsidStr != null){
			  tdobj.innerHTML = row.userclsidStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "organtype";
		col.name = "organtype";
		col.type = "S";
		col.title = "��������";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.organtypeStr != null){
			  tdobj.innerHTML = row.organtypeStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "organid";
		col.name = "organid";
		col.type = "S";
		col.title = "����";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.organidStr != null){
			  tdobj.innerHTML = row.organidStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "type";
		col.name = "type";
		col.type = "S";
		col.title = "�û�����";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.typeStr != null){
			  tdobj.innerHTML = row.typeStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "logintype";
		col.name = "logintype";
		col.type = "S";
		col.title = "��½��ʽ";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.logintype!= null){
				if(row.logintype == "0"){
			  		tdobj.innerHTML = "�����½";
			  	}
			  	else{
			  		tdobj.innerHTML = "CA��½";
			  	}
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "managerid";
		col.name = "managerid";
		col.type = "S";
		col.title = "������";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.manageridStr != null){
			  tdobj.innerHTML = row.manageridStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "state";
		col.name = "state";
		col.type = "S";
		col.title = "״̬";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.stateStr != null){
			  tdobj.innerHTML = row.stateStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "createdate";
		col.name = "createdate";
		col.type = "S";
		col.title = "��������";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  var dateObject = new Date(value); 
			  tdobj.innerHTML = eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate();
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "updatedate";
		col.name = "updatedate";
		col.type = "S";
		col.title = "�޸�����";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  var dateObject = new Date(value); 
			  tdobj.innerHTML = eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate();
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "overduedate";
		col.name = "overduedate";
		col.type = "S";
		col.title = "��������";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  var dateObject = new Date(value); 
			  tdobj.innerHTML = eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate();
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "remark";
		col.name = "remark";
		col.type = "S";
		col.title = "��ע";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		function mainclick(row){
			var s = "";
			for(var v in row ){
				s += v+":";
				eval("s += row."+v);
				s += "\n";
			}
			var url = '<%=request.getContextPath()%>/portal/userinfo/queryRoleByUser.do';
			var pars = "userid="+row.userid;
		    var myAjax = new Ajax.Request(
		                    url,
		                    {method: 'post', parameters: pars, onComplete: showResponse}
		                    );
		}
		function showResponse(request){
			eval("var subList = " + request.responseText);
			tdetail.data = subList;
			tdetail.show();
		}
		
		var tmain =new dataTable();
		tmain.parent = document.getElementById('tmain_div');
		tmain.setTableHead(["serial","checkbox","code","name","organtype","organid","userclsid","type","logintype","managerid","state","createdate","updatedate","overduedate","remark"]);
		<%
			String userList = (String)request.getAttribute("userList");
			if(null == userList || "".equals(userList)){
				out.println("tmain.data = new Array();\n");
			}else{
				out.println("tmain.data = "+ userList);
				out.println("var userList = "+ userList);
			}
		%>
		tmain.onrowclick = mainclick;
		tmain.show();
		</script>
	</div>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					��ɫ��Ϣ
				</div>
			</li>
		</ul>
	</div>
	<div id="containerline3">
		<div id='tdetail_div'
			style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
		<script type="text/javascript">
		var tdetail =new dataTable();
		tdetail.parent = document.getElementById('tdetail_div');
		tdetail.setTableHead(["serial","userclsid","code","name"]);
		tdetail.data = new Array();
		tdetail.show();
		</script>
	</div>
</form>
