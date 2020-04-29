<%@page language="java" contentType="text/html; charset=GBK"%>
<jsp:directive.page import="java.util.Map" />
<jsp:directive.page import="java.util.Iterator" />
<jsp:directive.page import="java.util.Set" />
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
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

//��ѯ
function doQuery(){
document.queryform.action="<%=request.getContextPath()%>/system/importConfig/index.do?mainmenu=26900938&submenu=26901001";
document.queryform.submit();
}

//��ղ�ѯ����
function clearValue(){
var obj=document.getElementById("vchtypecode");
 	obj.value = ""
	obj.valueid = null;
	obj.valuecode = null;
}

// ����
function doAdd() {
	var submenuid = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
    var url = "<%=request.getContextPath()%>/system/importConfig/turnToSave.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
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
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	
	var selectedRow = tmain.getSelectedRow();
    var billid = selectedRow[0].billid;
    if(billid == null || "" == billid)
    {
    	alert("����ֵ������ˢ��ҳ�棡");
    	return false;
    }
    var url = "<%=request.getContextPath()%>/system/importConfig/turnToModify.do?mainmenu="+mainmenu+"&submenu="+ submenuid + "&billid="+ billid;
    window.location.href = url;
}

//ɾ��
function doDel()
{
	if (getSelectedCount() < 1) {
        alert("��ѡ��Ҫɾ����¼��");
        return;
    }
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
   	
   	var selectedRow = tmain.getSelectedRow();
   	var billid = "";
   	for(var i = 0; i<selectedRow.length; i++ )
   	{
   		if(selectedRow[i].billid == null || "" == selectedRow[i].billid)
	    {
	    	alert("����ֵ������ˢ��ҳ�棡");
	    	return false;
	    }else{
	    	billid = billid + "&billid="+ selectedRow[i].billid;
	    }
   	}
    
    var url = "<%=request.getContextPath()%>/system/importConfig/delete.do?mainmenu="+mainmenu+"&submenu="+ submenuid + billid;
    if(confirm("ȷ��ɾ����ѡ������")){
    	window.location.href = url;
    }
}

//����ά��
function showItem(currentRow){
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	
	var formatid = currentRow.billid;
	if(null == formatid || "" == formatid)
	{
		alert("��������������ˢ��ҳ�棡");
		return false;
	}
	var url = "<%=request.getContextPath()%>/system/importConfig/listItem.do?mainmenu="+mainmenu+"&submenu="+submenuid+ "&formatid=" + formatid;
	window.location = url;
}

//������
function showQuery(){
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	var backinput=document.getElementById("vchtypecode");
	var opt = new Object();
	opt.mainmenu = mainmenu;
	opt.submenu = submenuid;
	opt.vchtypecode = "09002";
	opt.vchfieldcode = "vchtypeid";
	opt.backinput = backinput;
	opt.elementfilter = "vchtypeid in (select tovchtypeid from T_IMPORTFORMAT)";
	var B = new Object();
	B.url = "/common/mutlelementtree.do";
	customTree(opt,B);
}
</script>
<form id="queryform" name="queryform" method="post"
	action="<%=request.getContextPath()%>/system/importConfig/query.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	onsubmit="switchValue(this)">
	<div id="query_t">
	    <span><span title="��ѯ" class="query_btn"   onclick="doQuery()"
	        onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
	         onmousedown="doChangeBg1(this)"><a href="#">��ѯ</a></span> </span>
		<span><span title="�����ѯ����" class="clear_btn"
			onclick="clearValue()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">�����ѯ����</a> </span> </span>	         
		<span><span title="����" class="add_btn" onclick="doAdd()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">����</a> </span> </span>
		<span><span title="�޸�" class="mod_btn" onclick="doMod()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">�޸�</a> </span> </span>
		<span><span title="ɾ��" class="del_btn" onclick="doDel()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">ɾ��</a> </span> </span>
	</div>
<div id= "querylist" style="display:block;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
			 <td align="left">
					����ƾ֤&nbsp;
					<input name="vchtypecode" type="text" id="vchtypecode" value='<c:out value="${vchCondition}"/>' readonly onclick="showQuery();"/>
					<button style='margin-left:8px;'onclick="showQuery();"></button>
					<img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick="clearValue();"/>
				</td>
			</tr>
		</table>
</div>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					�����ʽģ����Ϣ
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
	Map vchtypeMap = (Map)request.getAttribute("vchtypeMap");
	Set vchtypeSet = vchtypeMap.keySet();
	for(Iterator it = vchtypeSet.iterator();it.hasNext();){
		String key = (String)it.next();
		String value = (String)vchtypeMap.get(key);
		out.println("var vchtype_"+key+"='"+value+"';");
	}
	
	Map tableMap = (Map)request.getAttribute("tableMap");
	Set tableSet = tableMap.keySet();
	for(Iterator it = tableSet.iterator();it.hasNext();){
		String key = (String)it.next();
		String value = (String)tableMap.get(key);
		out.println("var table_"+key+"='"+value+"';");
	}
	
	Map stateMap = (Map)request.getAttribute("stateMap");
	Set stateSet = stateMap.keySet();
	for(Iterator it = stateSet.iterator();it.hasNext();){
		String key = (String)it.next();
		String value = (String)stateMap.get(key);
		out.println("var state_"+key+"='"+value+"';");
	}
	%>
	col = createColumnConfig();
	col.id = "name";
	col.name = "name";
	col.type = "S";
	col.title = "��ʽ����";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["name"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "tovchtypeid";
	col.name = "tovchtypeid";
	col.type = "C";
	col.title = "����ƾ֤";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["tovchtypeid"] != null && value != null){
		  eval("var vchtypeName=vchtype_"+value);
		  tdobj.innerHTML = vchtypeName;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "vchflagstr";
	col.name = "vchflagstr";
	col.type = "S";
	col.title = "ģ���־";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["functionname"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "totablecode";
	col.name = "totablecode";
	col.type = "S";
	col.title = "���ݿ�ҵ���";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["totablecode"] != null && value != null){
		  eval("var tableName=table_"+value);
		  tdobj.innerHTML = tableName;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "fromtablecode";
	col.name = "fromtablecode";
	col.type = "S";
	col.title = "���ݿ���Դ��";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["fromtablecode"] != null && value != null){
		  eval("var tableName=table_"+value);
		  tdobj.innerHTML = tableName;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "type";
	col.name = "type";
	col.type = "S";
	col.title = "���������ļ���ʽ";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["type"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "classname";
	col.name = "classname";
	col.type = "S";
	col.title = "����������";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["classname"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "functionname";
	col.name = "functionname";
	col.type = "S";
	col.title = "���÷�������";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["functionname"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "definitionclass";
	col.name = "definitionclass";
	col.type = "S";
	col.title = "�Զ������������";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["functionname"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "definitionmethod";
	col.name = "definitionmethod";
	col.type = "S";
	col.title = "�Զ��������������";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["functionname"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "definitioncodeclass";
	col.name = "definitioncodeclass";
	col.type = "S";
	col.title = "�Զ���������������";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["functionname"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "definitioncodemethod";
	col.name = "definitioncodemethod";
	col.type = "S";
	col.title = "�Զ�����������������";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["functionname"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "state";
	col.name = "state";
	col.type = "S";
	col.title = "�Ƿ�����";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["state"] != null && value != null){
		  eval("var stateName=state_"+value);
		  tdobj.innerHTML = stateName;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "defaultvalue";
	col.name = "defaultvalue";
	col.type = "S";
	col.title = "Ĭ��ֵ";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["defaultvalue"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "itemconfig";
	col.name = "itemconfig";
	col.type = "S";
	col.title = "����ά��";
	col.show = function(rownum,value,row,tdobj,datatable){
		 tdobj.row = row;
		 tdobj.innerHTML = "<img src='../../images/actions/query.gif' alt='����ά��' onclick='showItem(this.parentNode.row);' />";
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	var tmain =new dataTable();
	tmain.parent = document.getElementById('tmain_div');
	tmain.setTableHead(["serial","checkbox","name","itemconfig","tovchtypeid","vchflagstr","totablecode","fromtablecode","type","classname","functionname","definitionclass","definitionmethod","definitioncodeclass","definitioncodemethod","state","defaultvalue"]);
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
	aRowsList.sort(tmain.generateCompareFunc("tovchtypeid","CODE",3));//ҳ���ʼ������ƾ֤����vchtypecode������ʾ
	tmain.drawing = true;
	tmain.draw();
	</script>
</form>
