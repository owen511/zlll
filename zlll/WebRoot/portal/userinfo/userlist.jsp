<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<script type="text/javascript">
function search(){
	var code = document.getElementById("code").value.trim().toUpperCase();
	var name = document.getElementById("name").value.trim().toUpperCase();
	var organidStr = document.getElementById("bdgagency").value.trim();
	var logintype = document.getElementById("logintype").value;
	var organtype = document.getElementById("organtype").value;
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

//�л���½��ʽ
function  changlogintype(){
	var selectedRow = tmain.getSelectedRow();
    if(selectedRow.length==0){
    	alert("��ѡ��Ҫ���ĵ��û���");
        return;
    }
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
   	
   	
  	var url = ROOT_PATH+"/portal/userinfo/show.jsp";
	var result = window.showModalDialog(url,window,"dialogHeight:150px;dialogWidth: 325px;resizable: No; status: No; help:No;");
  	if(result != null&&typeof(result)=="string"){
		if(confirm("ȷ�����Ĵ��û���½��ʽ��")){
		var usercodes = [];
		for(i = 0 ;i<selectedRow.length;i++){
			usercodes.push(selectedRow[i].code);
		}
		show();
    	new Ajax.Request("<%=request.getContextPath()%>/portal/userinfo/changelogintype/change.do?random="+Math.random(), 
        		{
    	   		parameters : "logintype="+result+"&usercode=" + usercodes.join(','),
    	   		method: 'post', 
    	   		onComplete : function(resp) { //"resp" is just the XMLHttpRequest object
	    	     		var url = "<%=request.getContextPath()%>/portal/userinfo/changelogintype/query.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	    	     	    window.location.href = url;
    	        },
    	   		requestHeaders: {Accept: 'application/json'},
    	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
   	       	 	}
   			}); 
  	 		}	
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

			<span><span title="���ĵ�½��ʽ" class="datapermission_btn"
				onclick="changlogintype()" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
					href="#">���ĵ�½��ʽ</a> </span> </span>		
		</div>
	</div>
	<div id="querylist" style="display:block">
		<table width="97%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td nowrap="nowrap" style = 'width:7%'>
					�û�����
				</td>
				<td nowrap="nowrap" style = 'width:17%'>
					<input type="text" name="code" id="code" style='width:150px'>
				</td>
				<td nowrap="nowrap" style = 'width:7%'>
					�û�����
				</td>
				<td nowrap="nowrap" style = 'width:17%'>
					<input type="text" name="name" id="name" style='width:150px'>
				</td>
				<td nowrap="nowrap" style = 'width:7%'>
					��������
				</td>
				<td nowrap="nowrap" style = 'width:17%'>
				<select name=organtype id=organtype onchange="clearOranid()" style="width:150px;">
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
				<td  nowrap="nowrap" style = 'width:5%'>
					����
				</td>
				<td nowrap=nowrap id='td_bdgagency_1' style = 'width:17%'><input name="bdgage" id="bdgage" type="hidden"><input name="bdgagency_valuecode" id="bdgagency_valuecode" type="hidden"><input id="bdgagency" name="bdgagency" type=text class=text_pop readonly style='width:150px' onclick='selectOrgan(this)' />  <button style='margin-left:8px;' onclick='selectOrgan(this.form.bdgagency)'></button><img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick='clearInputRule("bdgagency");clearInput(document.getElementById("bdgagency"));'>
				</td>
			</tr>
			<tr>
				<td width="7%" nowrap="nowrap">
					��½��ʽ
				</td>
				<td width="17%" nowrap="nowrap">
					<select name="logintype" id="logintype" style="width:155px;">
						<option></option>
						<option value="2">�����½</option>
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
					�û���¼��ʽά��
				</div>
			</li>
		</ul>
	</div>
	<!--�뱣����div��a��ǩ -->		
		<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
		<div id="containerline20" style="display: block;">
			<div id=tmain_div style='position:relative;behavior:url(#default#userData);height:100%;width:100%;'> </div>
	 	</div>
	
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
		col.id = "logintype";
		col.name = "logintype";
		col.type = "S";
		col.title = "��½��ʽ";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.logintype!= null){
				if(row.logintype == "2"){
			  		tdobj.innerHTML = "�����½";
			  	}else if(row.logintype == "1"){
			  		tdobj.innerHTML = "CA��½";
			  	}else{
			  		tdobj.innerHTML = "";
			  	}
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		
		var tmain =new dataTable();
		tmain.parent = document.getElementById('tmain_div');
		tmain.setTableHead(["serial","checkbox","code","name","organtype","organid","logintype"]);
		<%
			String userList = (String)request.getAttribute("userList");
			if(null == userList || "".equals(userList)){
				out.println("tmain.data = new Array();\n");
			}else{
				out.println("tmain.data = "+ userList);
				out.println("var userList = "+ userList);
			}
		%>
		tmain.show();
		</script>
</form>
