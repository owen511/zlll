<%@ page contentType="text/html; charset=GBK"%>
<jsp:directive.page import="java.util.Map" />
<jsp:directive.page import="java.util.Iterator" />
<jsp:directive.page import="java.util.Set" />
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
<form name="form1" id="form1"
	action="<%=request.getContextPath()%>/system/importConfig/updateItem.do"
	method="post">
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					��ʽģ����ϸ���
				</div>
			</li>
		</ul>
	</div>
	<div id="containerline12">
		<div id='tmain_div'
			style='position: relative; height: expression(this.offsetParent.offsetHeight); width: 100%;'></div>
	</div>
	<script>
		<%
		Map columnMap = (Map)request.getAttribute("columnMap");
		Set columnSet = columnMap.keySet();
		for(Iterator it = columnSet.iterator();it.hasNext();){
			String key = (String)it.next();
			String value = (String)columnMap.get(key);
			out.println("var column_"+key+"='"+value+"';");
		}
		
		Map nullAbleMap = (Map)request.getAttribute("nullAbleMap");
		Set nullAbleSet = nullAbleMap.keySet();
		for(Iterator it = nullAbleSet.iterator();it.hasNext();){
			String key = (String)it.next();
			String value = (String)nullAbleMap.get(key);
			out.println("var nullAble_"+key+"='"+value+"';");
		}
		
		Map isNegativeMap = (Map)request.getAttribute("isNegativeMap");
		Set isNegativeSet = isNegativeMap.keySet();
		for(Iterator it = isNegativeSet.iterator();it.hasNext();){
			String key = (String)it.next();
			String value = (String)isNegativeMap.get(key);
			out.println("var isNegative_"+key+"='"+value+"';");
		}
		%>
		
		col = createColumnConfig();
		col.id = "columnname";
		col.name = "columnname";
		col.type = "S";
		col.title = "�����ļ����к�";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "fieldid";
		col.name = "fieldid";
		col.type = "S";
		col.title = "���������ݱ������";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(null != row.fieldid && value != null && ""!=value){
			  try{
				  eval("var columnName=column_"+value);
			  	  tdobj.innerHTML = columnName;
		  	  }catch(e){
  	  	  		  tdobj.innerHTML = "<div style='color:red'>����:"+value+";,�ڱ����ֶ��в�����!</div>"; 
		  	  }
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "fieldname";
		col.name = "fieldname";
		col.type = "S";
		col.title = "����";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(typeof value!= "undefined" && value){
		  		tdobj.innerHTML = value;
			} else {
			  	tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "nullable";
		col.name = "nullable";
		col.type = "S";
		col.title = "�Ƿ�����Ϊ��";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  eval("var nullAbleName=nullAble_"+value);
		      tdobj.innerHTML = nullAbleName;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "isnegative";
		col.name = "isnegative";
		col.type = "S";
		col.title = "�Ƿ�������";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null || value == ""){
			  eval("var isNegative=isNegative_"+value);
		      tdobj.innerHTML = isNegative;
			} else if (typeof value == "undefined") {
			  eval("var isNegative=isNegative_");
		      tdobj.innerHTML = isNegative;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		var tmain =new dataTable();
		tmain.parent = document.getElementById('tmain_div');
		tmain.setTableHead(["serial","radio","columnname","fieldid","fieldname","nullable","isnegative"]);
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
		
		function mainclick(row){
			var s = "";
			for(var v in row ){
				s += v+":";
				eval("s += row."+v);
				s += "\n";
			}
		
			var formObject = $("form1");
			
			formObject.columnname.value = row.columnname;
			formObject.fieldid.value = row.fieldid;
			if(typeof row.fieldname !="undefined"){
				formObject.fieldname.value = row.fieldname;
			}else{
				formObject.fieldname.value = "";
			}
			formObject.nullable.value = row.nullable;
			if (row.isnegative == null) row.isnegative = "";
			formObject.isnegative.value = row.isnegative;
			formObject.selectedRow = row;
		}
		
		// ���FORM�еĿ�¼������
		function clearFormInput(formObject){
			formObject.columnname.value = "";
			formObject.fieldid.value = "";
			// ���FORM��Ӧ����
			formObject.selectedRow = null;
		}
		
		function addRow(){
			var formObject = $("form1");
			var row = new Object();
			if(formObject.columnname.value.trim()==""){
		       alert("�����뵼���ļ����кţ�");
		       return;
		    }
			if(formObject.fieldname.value.trim()==""){
				alert("����������!");
				return false;
			}
			if(tmain.data.length >= 1){
				for(var i = 0; i < tmain.data.length; i++){
					if(formObject.fieldid.value.trim()==tmain.data[i].fieldid){
						alert("���������ݱ�������ظ������޸ģ�");
						return false;
					}
					if(formObject.fieldname.value.trim()==tmain.data[i].fieldname){
						alert("�����ظ������޸ģ�");
						return false;
					}
				}
			}
		    row.columnname = formObject.columnname.value;
		    row.fieldid = formObject.fieldid.value;
		    row.formatid = formObject.formatid.value;
		    row.nullable = formObject.nullable.value;
		    row.isnegative = formObject.isnegative.value;
		    row.fieldname = formObject.fieldname.value;
		    
			if(null == tmain.data)
			{
				tmain.data = new Array();
			}
			tmain.data[tmain.data.length] = row;
			tmain.show();
			
			formObject.columnname.value = "";
			formObject.fieldid.value = "";
		}
		
		//�޸���Ϣ
		function changeData(obj){
			var formObject = $("form1");
			var row = formObject.selectedRow;
			if(row == null || row.length < 1){
				return;
			}
			if(formObject.columnname.value==""){
		       alert("�����뵼���ļ����кţ�");
		       return;
		    }
		    if (typeof obj != "undefined" && obj.id == "fieldid") {
		    	//formObject.fieldname.value = formObject.fieldid.value.split("-")[1];
		    }
		    
			var currentColumnname = formObject.fieldid.options[formObject.fieldid.selectedIndex].text;
			formObject.fieldname.value = currentColumnname.split('-')[1];
		    
			row.columnname = formObject.columnname.value;
		    row.fieldid = formObject.fieldid.value;
		    row.fieldname = formObject.fieldname.value;
		    row.nullable = formObject.nullable.value;
		    row.isnegative = formObject.isnegative.value;
			tmain.show();
		}
		
		
		
		function changeData1(){
			var formObject = $("form1");
			var row = formObject.selectedRow;
			if(tmain.data.length >= 1){
				for(var i = 0; i < tmain.data.length; i++){
					if(formObject.fieldname.value.trim()==tmain.data[i].fieldname){
						alert("�����ظ������޸ģ�");
						return false;
					}
				}
			}
			row.fieldname = formObject.fieldname.value;
			tmain.show();
		}

		//�޸���Ϣ
		function changeData2(obj){
			var formObject = $("form1");
			var row = formObject.selectedRow;
			if(row == null || row.length < 1){
				return;
			}
			if(formObject.columnname.value==""){
		       alert("�����뵼���ļ����кţ�");
		       return;
		    }
		    if(tmain.data.length >= 1){
				for(var i = 0; i < tmain.data.length; i++){
					if(formObject.fieldid.value.trim()==tmain.data[i].fieldid){
						alert("���������ݱ�������ظ������޸ģ�");
						return false;
					}
				}
			}
		    if (typeof obj != "undefined" && obj.id == "fieldid") {
		    	//formObject.fieldname.value = formObject.fieldid.value.split("-")[1];
		    }
		    
			var currentColumnname = formObject.fieldid.options[formObject.fieldid.selectedIndex].text;
			formObject.fieldname.value = currentColumnname.split('-')[1];
		    
			row.columnname = formObject.columnname.value;
		    row.fieldid = formObject.fieldid.value;
		    row.fieldname = formObject.fieldname.value;
		    row.nullable = formObject.nullable.value;
		    row.isnegative = formObject.isnegative.value;
			tmain.show();
		}

		function deleteRow(){
			var formObject = $("form1");
			if(formObject.selectedRow == null){
				return ;
			}
			var delrow = formObject.selectedRow;
			var datas = tmain.data;
			if(confirm("ȷ��ɾ����ѡ������")){
				for(var i=0;i<datas.length;i++){
					if(datas[i] == delrow){
						for(;i<datas.length-1;i++){
							datas[i] = datas[i+1];
						}
						datas.length = datas.length-1;
					}
				}
				clearFormInput(formObject);
				tmain.show();
			}
		}
		
		function saveExit(){
		
			var formObject = $("form1");
			if(null == tmain.data || tmain.data.length <= 0)
			{
				alert("��������ϸ����Ϣ��");
				return false;
			}
			
			
			
			formObject.json.value = tmain.data.toJSON();
			formObject.action = '<%=request.getContextPath()%>/system/importConfig/updateItem.do';
			// ����ֻ������onsubmit�¼�������������Ҫ����submit�����ύ
			formObject.submit();
		}
		
		function cancel(){
			var submenuid = <c:out value="${param.submenu}"/>;
			var mainmenu = <c:out value="${param.mainmenu}"/>;
			var url = "<%=request.getContextPath()%>/system/importConfig/query.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
			if(null == tmain.data || tmain.data.length <= 0)
			{
			    window.location.href = url;
		    }else{
				if(confirm("�Ƿ񱣴����ݣ�")){
					saveExit();
				}else{
					window.location.href = url;
				}
			}
		}
		
		function loadError(){
			var error = '<c:out value="${error}"/>';
			if("" != error ){
				alert(error);
			}
		}
		loadError();
	</script>
	<div id="form_editor">
		<!-- InstanceBeginEditable name="EditRegion7" -->
		<div id="form_table_title_edit">
			<ul>
				<li class="top">
					<div>
						��ϸ��༭��
					</div>
				</li>
			</ul>
		</div>
		<div id="edit_table">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<th nowrap="nowrap">
						�����ļ����к�
						<span>*</span>
					</th>
					<td nowrap="nowrap">
						<input type="text" name="columnname" id="columnname" value=""
							onchange="changeData();"
							onkeyup="value=value.replace(/[^\d]/g,'') " />
					</td>
					<th nowrap="nowrap">
						���������ݱ������
					</th>
					<td nowrap="nowrap">
						<select name="fieldid" id="fieldid" onchange="changeData2(this);">
							<option value="">
							</option>
							<c:forEach items="${columnMap}" var="entry">
								<option value="<c:out value='${entry.key}' />">
									<c:out value="${entry.value}" />
								</option>
							</c:forEach>
						</select>
					</td>
					<th nowrap="nowrap">
						����Ϊ��
						<span>*</span>
					</th>
					<td nowrap="nowrap">
						<select name="nullable" id="nullable" onchange="changeData();">
							<c:forEach items="${nullAbleMap}" var="entry">
								<option value="<c:out value='${entry.key}' />">
									<c:out value="${entry.value}" />
								</option>
							</c:forEach>
						</select>
					</td>
				</tr>
				<tr>
					<th nowrap="nowrap">
						����
						<span>*</span>
					</th>
					<td nowrap="nowrap">
						<input type="text" id="fieldname" name="fieldname"
							onblur="changeData1();" value="" />
					</td>
					<th nowrap="nowrap">
						�Ƿ�������
					</th>
					<td nowrap="nowrap">
						<select name="isnegative" id="isnegative" onchange="changeData();">
							<c:forEach items="${isNegativeMap}" var="entry">
								<option value="<c:out value='${entry.key}' />">
									<c:out value="${entry.value}" />
								</option>
							</c:forEach>
						</select>
					</td>
				</tr>
			</table>
		</div>
		<div id="confirm_exit_btn"
			style="position: relative; margin-right: 5px;">
			<input name="add" type="button" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'" value="������ϸ��" onclick="addRow()" />
			<input name="delete" type="button" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'" value="ɾ����ϸ��"
				onclick="deleteRow()" />
			<input name="submit2" type="button" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'" value="����" onclick="saveExit()" />
			<input name="submit3" type="button" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'" value="����" onclick="cancel();" />

		</div>
	</div>
	<input name=submenu id=submenu type="hidden"
		value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden"
		value="<c:out value='${param.mainmenu}'/>" />
	<input id=formatid name=formatid type=hidden
		value="<c:out value='${importFormatDTO.billid}'/>">
	<input id=json name=json type=hidden value="">
</form>
