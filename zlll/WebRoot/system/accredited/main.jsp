<%@page language="java" contentType="text/html; charset=GBK"%>
<jsp:directive.page import="java.util.Map" />
<jsp:directive.page import="java.util.Iterator" />
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<div id="form_table_title">
	<ul>
		<li class="top">
			<div>
				����Ȩ��Ϣ
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
		
		var tmain =new dataTable();
		tmain.parent = document.getElementById('tmain_div');
		tmain.setTableHead(["serial","radio","accreditUser","accreditedUser","startdate","enddate","stopdate","state","remark"]);
		<%
			String json = (String)request.getAttribute("json");
			if(null == json || "".equals(json)){
				out.println("tmain.data = new Array();\n");
			}else{
				out.println("tmain.data = "+ json);
			}
		%>
		tmain.show();
	</script>
