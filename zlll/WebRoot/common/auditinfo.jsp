<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>

<div id="form_table_title">
  <ul>
    <li class="top">
      <div>请查看审核情况</div>
    </li>
  </ul>
</div>

<div id="containerline15">

   <div id='tmain_div' style='position:relative;height:expression(this.offsetParent.offsetHeight-22);width:100%;'  ></div>
</div>

<center><button onclick="window.close()" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'">关闭</button></center>
	

<script language='javascript'>


col = createColumnConfig();
col.id = 'actiondescname';
col.name = 'actiondescname';
col.type = 'S';
col.title = '操作'; 
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = 'callername';
col.name = 'callername';
col.type = 'S';
col.title = '操作人'; 
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = 'enddate';
col.name = 'enddate';
col.type = 'S';
col.title = '操作时间'; 

//如有需用格式化
col.show = function(rownum,value,row,tdobj,datatable){
	tdobj.innerHTML = value.substr(0,19);
}

ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = 'status';
col.name = 'status';
col.type = 'S';
col.title = '操作状态'; 
ColumnConfig[col.id.toLowerCase()]=col;



col = createColumnConfig();
col.id = 'auditOpinion';
col.name = 'auditOpinion';
col.type = 'S';
col.title = '操作意见'; 
ColumnConfig[col.id.toLowerCase()]=col;
	var tmain =new dataTable();
	tmain.id ='tmain';
	tmain.isCreateAmtColumn= false;
	tmain.columnList = [];
	tmain.tabletype = 'MainList';
	tmain.parent = document.getElementById('tmain_div');
	tmain.allpage_totaljson = {};
	tmain.setTableHead(["serial","actiondescname","callername","enddate","status","auditOpinion" ]);
	tmain.data = <%=request.getAttribute("auditInfos")%>;
	tmain.show();
</script>