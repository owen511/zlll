<%@page language="java" contentType="text/html; charset=GBK"%>
<jsp:directive.page import="java.util.Map" />
<jsp:directive.page import="java.util.Iterator" />
<jsp:directive.page import="gov.mof.framework.util.DateUtil" />
<jsp:directive.page import="java.util.Date" />
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	Date nowDate = DateUtil.getCurrentDate();
	String json = (String)request.getAttribute("json");
	String isaccuser = (String)request.getAttribute("isaccuser");
%>
<script type="text/javascript">
var nowDate = new Date(<%=nowDate.getTime()%>);
// ����
var isaccuser=<%=isaccuser%>;
function doAdd() {
    if(isaccuser!="0"){
    	alert("�Ǳ��˽�ɫ����������Ȩ��������");
    	return;
    }else{
	var submenuid = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
    var url = "<%=request.getContextPath()%>/portal/accreditrole/turnToSave.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
    window.location.href = url;
    }
}

// �޸�
function doMod(){
 if(isaccuser!="0"){
    	alert("�Ǳ��˽�ɫ����������Ȩ�޸Ĳ���");
    	return;
    }else{
	var selectedRow = tmain.getSelectedRow();
    if(null == selectedRow || null == selectedRow[0]){
    	alert("��ѡ��Ҫ�޸ĵ���Ȩ��¼��");
        return;
    }
    if(selectedRow.length > 1){
     alert("��ѡ��һ�����ݽ����޸�!");
     return;
     }
    if(selectedRow[0].state == 2){
        alert("����Ȩ�Ѿ�������,�����޸�!");
        return false;
     }
    var accreditid = selectedRow[0].accreditid;
    var accreditedid = selectedRow[0].accreditedid;
   
    var rolename= selectedRow[0].rolename;
    
    
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	
    if(accreditid == null || "" == accreditid)
    {
    	alert("����ֵ������ˢ��ҳ�棡");
    	return false;
    }
    var url = "<%=request.getContextPath()%>/portal/accreditrole/turnToModify.do?mainmenu="+mainmenu+"&submenu="+ submenuid + "&accreditid="+ accreditid+"&rolename="+ rolename+ "&accreditedid="+ accreditedid;
    window.location.href = url;
    }
   
}

//����
function getBack()
{ 	if(isaccuser!="0"){
    	alert("�Ǳ��˽�ɫ����������Ȩ�ջز���");
    	return;
    }else{
	var selectedRow = tmain.getSelectedRow();
    if(null == selectedRow || null == selectedRow[0]){
        alert("��ѡ��Ҫ���յ���Ȩ��¼��");
        return;
    }
    if(selectedRow[0].state == 2){
       alert("����Ȩ�Ѿ��������ˣ�");
       return false;
    }
    var enddate = new Date(selectedRow[0].enddate);
    //if(enddate > nowDate){
       //alert("��ǰ����С�ڽ������ڣ��˼�¼���ܻ��գ�");
       //return false;
    //}
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	
   	var accreditid = "";
   	for(var i = 0; i<selectedRow.length; i++ )
   	{
   		if(selectedRow[i].accreditid == null || "" == selectedRow[i].accreditid)
	    {
	    	alert("����ֵ������ˢ��ҳ�棡");
	    	return false;
	    }else{
	    	accreditid = accreditid + "&accreditid="+ selectedRow[i].accreditid;
	    }
   	}
    
    var url = "<%=request.getContextPath()%>/portal/accreditrole/getBack.do?mainmenu="+mainmenu+"&submenu="+ submenuid + accreditid;
    if(confirm("ȷ��������ѡ��Ȩ��")){
    	window.location.href = url;
    }
    }
}

function doDel(){
 if(isaccuser!="0"){
    	alert("�Ǳ��˽�ɫ����������Ȩɾ������");
    	return;
    }else{
	var selectedRow = tmain.getSelectedRow();
    if(null == selectedRow || null == selectedRow[0]){
    	alert("��ѡ��Ҫɾ������Ȩ��¼��");
        return;
    }
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
   	
   	var accreditid = "";
   	for(var i = 0; i<selectedRow.length; i++ )
   	{
   		if(selectedRow[i].accreditid == null || "" == selectedRow[i].accreditid)
	    {
	    	alert("����ֵ������ˢ��ҳ�棡");
	    	return false;
	    }else{
	    	accreditid = accreditid + "&accreditid="+ selectedRow[i].accreditid;
	    }
   	}
    
    var url = "<%=request.getContextPath()%>/portal/accreditrole/delete.do?mainmenu="+mainmenu+"&submenu="+ submenuid + accreditid;
    if(confirm("ȷ��ɾ����ѡ��Ȩ��")){
    	window.location.href = url;
    }
    }
}
function doQuery(){
	$('queryform').dosubmit();
}
//����F5ˢ��
function DisableF5(){   
	var d_url=document.location.href;
   with (event){   
           // F5 and Ctrl+R   
     if (keyCode==116 || (ctrlKey && keyCode==82)){  
     	if(d_url.indexOf('common/post/index')<=0){
			window.location='<%=request.getContextPath() %>/portal/accreditrole/query.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
		} 
       event.keyCode = 0;   
       event.cancelBubble = true;   
       return false;   
     }   
   }   
} 
document.onkeydown = DisableF5;


</script>
<form id="queryform" name="queryform" method="post"
	action="<%=request.getContextPath()%>/portal/accreditrole/query.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	onsubmit="switchValue(this)">
	<div id="query_t">
	
			<span><span title="��ѯ" class="query_btn" onclick="selectByCode()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">��ѯ</a> </span> </span>
			<span><span title="�����ѯ����" class="clear_btn" onclick="clearcontinue()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">�����ѯ����</a> </span>
			</span>
			<span><span title="���ز�ѯ����" class="hidden_btn" onclick="dohiddensearch()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#"  id="ycorxs">���ز�ѯ����</a> </span><span>��</span>
			</span>
			<span><span title="����" class="add_btn" onclick="doAdd()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">����</a> </span> </span>
			<span><span title="�޸�" class="mod_btn" onclick="doMod()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">�޸�</a> </span>
			</span>
			<span><span title="ɾ��" class="del_btn" onclick="doDel()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">ɾ��</a> </span><span>��</span>
			</span>
			<span><span title="�ջ�" class="return_btn" onclick="getBack()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">�ջ�</a> </span> </span>
		
	</div>

	<div id="querylist"  style='display:block;'>
		<table width=97% border=0 cellspacing=0 cellpadding=0> 
			<tr>
				<td nowrap="nowrap">
					����Ȩ�û�
				</td>
				<td nowrap="nowrap" width="20%">
					<input type="text" name="user_code" id="user_code" value="" >
				</td>
				<td nowrap="nowrap">
					��ʼ����
			
				</td>
				<td nowrap="nowrap">
					<input type="text" name="startdate" id="startdate" value="" width="20%"readonly="readonly"/>
					&nbsp;
					<img src="<%=request.getContextPath()%>/images/calendar/date.gif" alt="ѡ������"
						onclick="return showCalendar('startdate', '%Y-%m-%d', null, true);"
						style="cursor:hand; border:0;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
				</td>
				<td nowrap="nowrap">
					��������
					
				</td>
				<td nowrap="nowrap">
					<input name="enddate" type="text" id="enddate" value="" width="20%" readonly="readonly"/>
					<img src="<%=request.getContextPath()%>/images/calendar/date.gif" alt="ѡ������"
						onclick="return showCalendar('enddate', '%Y-%m-%d', null, true);"
						style="cursor:hand; border:0;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
						
				</td>
			</tr>
			
		</table>
	</div>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					��Ȩ
				</div>
			</li>
		</ul>
	</div>
	<!--�뱣����div��a��ǩ -->
	<div id="containerline20">
		<div id='tmain_div'
			style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
	</div>
	<script type="text/javascript">
		<%
			Map stateMap = (Map)request.getAttribute("stateMap");
			if(null != stateMap && null != stateMap.keySet())
			{
				for(Iterator it = stateMap.keySet().iterator();it.hasNext();)
				{
					String id = (String)it.next();
					String stateJson = (String)stateMap.get(id);
					out.println("var state_"+id+"='"+stateJson+"';");
				}
			}
		%>
		col = createColumnConfig();
		col.id = "accreditUser";
		col.name = "accreditUser";
		col.type = "S";
		col.title = "��Ȩ�û�";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null && value.code != null ){
			  tdobj.innerHTML = value.code+"-"+value.name;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
				col = createColumnConfig();
		col.id = "roleid";
		col.name = "roleid";
		col.type = "S";
		col.title = "��Ȩ��ɫ";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;

		col = createColumnConfig();
		col.id = "rolename";
		col.name = "rolename";
		col.type = "S";
		col.title = "��Ȩ��ɫ����";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		col = createColumnConfig();
		col.id = "accreditedUser";
		col.name = "accreditedUser";
		col.type = "S";
		col.title = "����Ȩ�û�";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null && value.code != null ){
			  tdobj.innerHTML = value.code+"-"+value.name;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "startdate";
		col.name = "startdate";
		col.type = "S";
		col.title = "��ʼʱ��";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row["startdate"] != null && value != null){
			  var dateObject = new Date(value); 
			  tdobj.innerHTML = eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate();
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "enddate";
		col.name = "enddate";
		col.type = "S";
		col.title = "����ʱ��";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row["enddate"] != null && value != null){
			  var dateObject = new Date(value); 
			  tdobj.innerHTML = eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate();
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "stopdate";
		col.name = "stopdate";
		col.type = "S";
		col.title = "�ջ�����";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row["stopdate"] != null && value != null){
			  var dateObject = new Date(value); 
			  tdobj.innerHTML = eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate();
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
			if(value != null){
			  eval("var stateName = state_"+value);
			  tdobj.innerHTML = stateName;
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
			if(value != null){
			  tdobj.innerHTML = value;
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
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		var tmain =new dataTable();
		tmain.parent = document.getElementById('tmain_div');
		
		tmain.setTableHead(["serial","radio","accreditUser","accreditedUser","startdate","enddate","stopdate","state","remark"]);
	    
	    var json=<%=json%>;
        tmain.data =json;

		tmain.show(); 

	
//�û��б�Ĳ�ѯ��������
function selectByCode(){
		var code = document.getElementById('user_code').value;
		var startdate = document.getElementById('startdate').value;
		var enddate = document.getElementById('enddate').value;
		var arr = new Array();
		
		for(var i=0;i<json.length;i++){
			if(code != "" ){
				if(json[i].accreditedUser.code.toUpperCase().indexOf(code.toUpperCase())==-1){
				continue;
				}
			}
		if(startdate != ""){
			var dateObject = new Date(json[i].startdate); 
			var year = dateObject.getYear();
			var month = dateObject.getMonth()+1;
			if(month<10){
				month="0"+month;
			}
			var day = dateObject.getDate();
			if(day<10){
				day="0"+day;
			}
			
			if(!(year+"-"+month+"-"+day >= startdate )){
				continue;
			}
		}
		if(enddate != ""){
			var dateObject2 = new Date(json[i].enddate);
			var year = dateObject2.getYear();
			var month = dateObject2.getMonth()+1;
			if(month<10){
				month="0"+month;
			}
			var day = dateObject2.getDate();
			if(day<10){
				day="0"+day;
			} 
			if(!(year+"-"+month+"-"+day <= enddate)){
				continue;
			}
		}	
			
		/*if(startdate != "" && enddate != ""){
			var dateObject = new Date(json[i].startdate); 
			var dateObject2 = new Date(json[i].enddate); 
			if( !((eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate()) >= startdate )|| !((eval(dateObject2.getYear())+"-"+eval(dateObject2.getMonth()+1)+"-"+dateObject2.getDate())<= enddate)){
				continue;
			}
		}	*/			
		arr.push(json[i]);
		}
		tmain.data=arr;
		tmain.show();
}
//�����ѯ����
function clearcontinue(){
	document.getElementById('startdate').value="";
	document.getElementById('enddate').value="";
	document.getElementById('user_code').value="";

}
//���ز�ѯ����
function dohiddensearch(){
	var obj = document.getElementById('querylist').style.display+'';
	if(obj=='block'){
		document.getElementById('ycorxs').innerText='��ʾ��ѯ����';
		document.getElementById('querylist').style.display='none';
	}else{
		document.getElementById('ycorxs').innerText='���ز�ѯ����';
		document.getElementById('querylist').style.display='block';
	}
}

      
</script>
</form>
