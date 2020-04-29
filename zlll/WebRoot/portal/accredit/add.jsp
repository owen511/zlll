<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<jsp:directive.page import="gov.mof.framework.util.DateUtil" />
<%
	String nowDate = DateUtil.getCurrentDateStr(DateUtil.C_DATE_PATTON_DEFAULT);
	String code = request.getAttribute("code")==null?"":request.getAttribute("code").toString(); 
	String name = request.getAttribute("name")==null?"":request.getAttribute("name").toString();
	String bdgagency = request.getAttribute("bdgagency")==null?"":request.getAttribute("bdgagency").toString();
	String organtype = request.getAttribute("organtype")==null?"":request.getAttribute("organtype").toString();
%>
<script>
var nowDate = '<%=nowDate%>';
function loadError(){
	var error = '<c:out value="${error}"/>';
	if("" != error ){
		alert(error);
	}
}
loadError();
function doClear(){
	document.getElementById("code").value = "";
	document.getElementById("name").value = "";
	document.getElementById("organtype").value = "";
	document.getElementById("bdgagency").value = "";
	document.getElementById("bdgage").value = "";
	document.getElementById("bdgage").valuecode = "";
	document.getElementById("bdgagency").valuecode = "";
	document.getElementById("bdgagency_valuecode").value = "";	
}
function doQuery() {
	var code =document.getElementById("code").value;
	var name = document.getElementById("name").value;
	var orantype = document.getElementById("organtype").value;
	var bdgagency= document.getElementById("bdgagency").value;	
	var json = <%=(String)request.getAttribute("json")%>;
	var arr = new Array();		
		for(var i=0;i<json.length;i++){
			if(null==json[i].organtype||null==json[i].organid){
			 continue;
			}
			if(code!=""){				   					
				   if(json[i].code.toUpperCase().indexOf(code.toUpperCase())==-1){
				    continue;
				   }
				}
			if(name!=""){				   					
				   if(json[i].name.toUpperCase().indexOf(name.toUpperCase())==-1){
				    continue;
				   }
				}
		if(orantype!=""){				   					
		   if(json[i].organtype.toUpperCase().indexOf(orantype.toUpperCase())==-1){
		    continue;
		   }
		}
		if(bdgagency != ""){
			if(bdgagency.indexOf(json[i].organidStr)==-1){
			    continue;
			}
			
		}				   						
		arr.push(json[i]);
		}
		tmain.data=arr;
		tmain.show();
}
function selectOrgan(obj){
	var formObject = $("form1");
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
			document.getElementById("hidden_"+backinput.id).value= result.valuecode;
		}
	}
	else
	{
	    if(backinput != null){
	        backinput.value = "";
			backinput.valueid = null;
			backinput.valuecode = "";
			document.getElementById("hidden_"+backinput.id).value= "";
	    } 
	 }
	 codeShowFlag=null;
}
function clearOranid(){
	document.getElementById("bdgagency").value = "";
	document.getElementById("bdgage").value = "";
}
</script>
<form name="form1" id="form1" action="<%=request.getContextPath()%>/portal/accredit/save.do"
	method="post">
	<div id="query_t">
		<div>
			<span><span title="��ѯ" class="query_btn" onclick="doQuery()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">��ѯ</a> </span> </span>
			<span><span title="�����ѯ����" class="clear_btn" onclick="doClear()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">�����ѯ����</a> </span> </span>
			<span><span title="���ز�ѯ����" class="hidden_btn"
				onclick="doQuery2(this)" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
					href="#">���ز�ѯ����</a> </span> </span>
		</div>
	</div>
	<div id="querylist" style="display:block">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td nowrap="nowrap">
					�û�����
				</td>
				<td nowrap="nowrap">
					<input type="text" name="code" id="code" value="<%=request.getAttribute("code") %>" >
				</td>
				<td nowrap="nowrap">
					�û�����
				</td>
				<td nowrap="nowrap">
					<input type="text" name="name" id="name" value="<%=request.getAttribute("name") %>" >
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
						<option value="<c:out value='${entry.key}' />" <c:if test="${organtype eq entry.key}"> selected </c:if> >
							<c:out value="${entry.value}" />
						</option>
					</c:forEach>
				</select>
				</td>
				<td nowrap="nowrap" >
					����
				</td>
			    <td nowrap=nowrap id='td_bdgagency_1' style = 'width:20%'>
				 <input name="bdgage" id="bdgage" type="hidden" value="<%=request.getAttribute("hidden_bdgagency") %>">
				  <input name="bdgagency_valuecode" id="bdgagency_valuecode" type="hidden">
				  <input id="bdgagency" name="bdgagency" type=text class=text_pop value="<%=request.getAttribute("bdgagency") %>" readonly onclick='selectOrgan(this)' />  
				  <button style='margin-left:8px;' onclick='selectOrgan(this.form.bdgagency)'></button>
				  <img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick='clearInputRule("bdgagency");clearInput(document.getElementById("bdgagency"));'>
			    </td> 
			</tr>
		</table>
	</div>
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					��Ȩ����༭��
				</div>
			</li>
		</ul>
	</div>
	<div id="edit_table"  style='height:50px;'>
		<table border="0" cellpadding="0px" cellspacing="0px">
			<tr>
				<th nowrap="nowrap">
					��Ȩ�û�
				</th>
				<td nowrap="nowrap" width="20%"><input name="hidden_accreditUser" id="hidden_accreditUser" value="<c:out value='${accreditUser.userid}'/>"type="hidden">
					<input type="text" name=accreditUser id=accreditUser value="<c:out value='${accreditUser.name}'/>" readonly="readonly" />
					<input name=submenu id=submenu type="hidden"
						value="<c:out value='${param.submenu}'/>" />
					<input name=mainmenu id=mainmenu type="hidden"
						value="<c:out value='${param.mainmenu}'/>" />
				</td>
				<th nowrap="nowrap">
					��ʼ����
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="text" name="startdate" id="startdate" value="" size="10" readonly="readonly"/>
					&nbsp;
					<img src="<%=request.getContextPath()%>/images/calendar/date.gif" alt="ѡ������"
						onclick="return showCalendar('startdate', '%Y-%m-%d', null, true);"
						style="cursor:hand; border:0;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
				</td>
				<th nowrap="nowrap">
					��������
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input name="enddate" type="text" id="enddate" value="" size="10" readonly="readonly"/>
					<img src="<%=request.getContextPath()%>/images/calendar/date.gif" alt="ѡ������"
						onclick="return showCalendar('enddate', '%Y-%m-%d', null, true);"
						style="cursor:hand; border:0;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					��ע
				</th>
				<td nowrap="nowrap" colspan="5">
					<input name="remark" id="remark" value="" maxlength="100" type="text" />
				</td>
			</tr>
		</table>
	</div>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					����Ȩ�û���Ϣ
				</div>
			</li>
		</ul>
	</div>
	<!--�뱣����div��a��ǩ -->
	<div id="containerline15">
		<div id='tmain_div'
			style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
	</div>
	<script type="text/javascript">
		col = createColumnConfig();
		col.id = "code";
		col.name = "code";
		col.type = "S";
		col.title = "�û�����";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
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
		col.title = "�û�����";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "organtypeStr";
		col.name = "organtypeStr";
		col.type = "S";
		col.title = "��������";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "organidStr";
		col.name = "organidStr";
		col.type = "S";
		col.title = "����";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "typeStr";
		col.name = "typeStr";
		col.type = "S";
		col.title = "�û�����";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		var tmain =new dataTable();
		tmain.parent = document.getElementById('tmain_div');
		tmain.setTableHead(["serial","radio","code","name","typeStr","organtypeStr","organidStr"]);
		<%
			String json = (String)request.getAttribute("json");
			if(null == json || "".equals(json)){
				out.println("tmain.data = new Array();\n");
			}else{
				out.println("tmain.data = "+ json);
			}
		%>
		tmain.show();
		function saveExit(){
			var selectedRow = tmain.getSelectedRow();
			if(null == selectedRow[0]){
				alert("��ѡ��һ��Ҫ����Ȩ�޵��û���");
    			return false;
			}
			var formObject = $("form1");
			if(formObject.startdate.value==""){
		       alert("�����뿪ʼʱ�䣡");
		       return false;
		    }
		    if(formObject.enddate.value==""){
		       alert("���������ʱ�䣡");
		       return false;
		    }
		    if(formObject.startdate.value > formObject.enddate.value){
		    	alert("��ʼʱ�䲻�ܴ��ڽ���ʱ�䣡");
		        return false;
		    }
		    if(formObject.enddate.value < nowDate){
		       alert("����ʱ�䲻��С�ڵ�ǰ���ڣ�");
		       return false;
		    }
		    formObject.accredited.value = selectedRow[0].userid;
		    if(formObject.hidden_accreditUser.value==selectedRow[0].userid){
		    	alert("�û������Լ����Լ���Ȩ��");
    			return false;
		    }
		    show();
		    formObject.action = "<%=request.getContextPath()%>/portal/accredit/save.do";
		    formObject.submit();
		}
		
		function cancel(){
			var submenuid = <c:out value="${param.submenu}"/>;
			var mainmenu = <c:out value="${param.mainmenu}"/>;
			var url = "<%=request.getContextPath()%>/portal/accredit/query.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
			window.location.href = url;
		}
	</script>
	<div id="confirm_exit_btn">
		<input name="submit2" type="button" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" value="��Ȩ" onclick="saveExit()" />
		<input name="submit3" type="button" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" value="����" onclick="cancel();" />
	</div>
	<input id=accredited name=accredited type=hidden value="">
	<input name=submenu id=submenu type="hidden"
		value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden"
		value="<c:out value='${param.mainmenu}'/>" />
</form>
