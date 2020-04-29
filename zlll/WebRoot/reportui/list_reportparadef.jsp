<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
<form name="form1" id="form1" action="/report/update_reportparadef.do"
	method="post">
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					�����������
				</div>
			</li>
		</ul>
	</div>
	<div id="containerline15">
		<div id='tmain_div'
			style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
	</div>
	<script>
		col = createColumnConfig();
		col.id = "parametername";
		col.name = "parametername";
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
		col.id = "paralabel";
		col.name = "paralabel";
		col.type = "S";
		col.title = "����˵��";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "parametertype";
		col.name = "parametertype";
		col.type = "S";
		col.title = "��������";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row["parametertypename"] !=null ){
				tdobj.innerHTML = row["parametertypename"];
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "getvaluesource";
		col.name = "getvaluesource";
		col.type = "S";
		col.title = "ȡֵ��Դ";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row["getvaluesourcename"] !=null ){
				tdobj.innerHTML = row["getvaluesourcename"];
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "isctrlright";
		col.name = "isctrlright";
		col.type = "S";
		col.title = "�Ƿ��ܿ�����Ȩ��";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row["isctrlrightname"] !=null ){
				tdobj.innerHTML = row["isctrlrightname"];
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		var tmain =new dataTable();
		tmain.parent = document.getElementById('tmain_div');
		tmain.setTableHead(["serial","radio","parametername","paralabel","parametertype","getvaluesource","isctrlright"]);
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
			
			formObject.parametername.value = row.parametername;
			formObject.paralabel.value = row.paralabel;
			formObject.parametertype.value = row.parametertype;
			formObject.getvaluesource.value = row.getvaluesource;
			formObject.isctrlright.value = row.isctrlright;
			
			formObject.selectedRow = row;
		}
		
		// ���FORM�еĿ�¼������
		function clearFormInput(formObject){
			formObject.parametername.value = "";
			formObject.paralabel.value = "";
			// ���FORM��Ӧ����
			formObject.selectedRow = null;
		}
		
		function addRow(){
			var formObject = $("form1");
			var row = new Object();
			if(formObject.parametername.value==""){
		       alert("������������룡");
		       return;
		    }
			if(formObject.paralabel.value==""){
		       alert("������������ƣ�");
		       return;
		    }
		    
		    row.parametername = formObject.parametername.value;
		    row.paralabel = formObject.paralabel.value;
		    row.parametertype = formObject.parametertype.value;
		    row.parametertypename = formObject.parametertype.options[formObject.parametertype.selectedIndex].text;
		    row.getvaluesource = formObject.getvaluesource.value;
		    row.getvaluesourcename = formObject.getvaluesource.options[formObject.getvaluesource.selectedIndex].text;
		    row.isctrlright = formObject.isctrlright.value;
		    row.isctrlrightname = formObject.isctrlright.options[formObject.isctrlright.selectedIndex].text;
		    row.rptid = formObject.rptid.value;
		    
			if(null == tmain.data)
			{
				tmain.data = new Array();
			}
			tmain.data[tmain.data.length] = row;
			tmain.show();
			
			formObject.parametername.value = "";
			formObject.paralabel.value = "";
		}
		
		//�޸���Ϣ
		function changeData(){
		
			var formObject = $("form1");
			var row = formObject.selectedRow;
			if(row == null || row.length < 1){
				return;
			}
			if(formObject.parametername.value==""){
		       alert("������������룡");
		       return;
		    }
			if(formObject.paralabel.value==""){
		       alert("������������ƣ�");
		       return;
		    }
			row.parametername = formObject.parametername.value;
		    row.paralabel = formObject.paralabel.value;
		    row.parametertype = formObject.parametertype.value;
		    row.parametertypename = formObject.parametertype.options[formObject.parametertype.selectedIndex].text;
		    row.getvaluesource = formObject.getvaluesource.value;
		    row.getvaluesourcename = formObject.getvaluesource.options[formObject.getvaluesource.selectedIndex].text;
		    row.isctrlright = formObject.isctrlright.value;
		    row.isctrlrightname = formObject.isctrlright.options[formObject.isctrlright.selectedIndex].text;
		    row.rptid = formObject.rptid.value;
		    
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
				alert("�����Ӳ�����Ϣ��");
				return false;
			}
			formObject.json.value = tmain.data.toJSON();
			formObject.action = '/report/update_reportparadef.do';
			// ����ֻ������onsubmit�¼�������������Ҫ����submit�����ύ
			formObject.submit();
		}
		
		function cancel(){
			var submenuid = <c:out value="${param.submenu}"/>;
			var mainmenu = <c:out value="${param.mainmenu}"/>;
			var url = "/report/reportedit.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
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
	</script>
	<div id="form_editor">
		<!-- InstanceBeginEditable name="EditRegion7" -->
		<div id="form_table_title_edit">
			<ul>
				<li class="top">
					<div>
						�����༭��
					</div>
				</li>
			</ul>
		</div>
		<div id="edit_table">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<th nowrap="nowrap">
						��������
						<span>*</span>
					</th>
					<td nowrap="nowrap">
						<input type="text" name="parametername" value=""
							onchange="changeData();" />
					</td>
					<th nowrap="nowrap">
						��������
						<span>*</span>
					</th>
					<td nowrap="nowrap">
						<input type="text" name="paralabel" value=""
							onchange="changeData();" />
					</td>
					<th nowrap="nowrap" width="10%">
						��������
						<span>*</span>
					</th>
					<td nowrap="nowrap" width="20%">
						<select name="parametertype" onchange="changeData();">
							<c:forEach items="${parametertypes}" var="entry">
								<option value="<c:out value='${entry.key}' />">
									<c:out value="${entry.value}" />
								</option>
							</c:forEach>
						</select>
					</td>

				</tr>
				<tr>
					<th nowrap="nowrap">
						ȡֵ��Դ
					</th>
					<td nowrap="nowrap">
						<select name="getvaluesource" onchange="changeData();">
							<c:forEach items="${getvaluesource}" var="entry">
								<option value="<c:out value='${entry.key}' />">
									<c:out value="${entry.value}" />
								</option>
							</c:forEach>
						</select>
					</td>
					<th nowrap="nowrap">
						��������Ȩ��
					</th>
					<td nowrap="nowrap">
						<select name="isctrlright" onchange="changeData();">
							<c:forEach items="${isctrlright}" var="entry">
								<option value="<c:out value='${entry.key}' />">
									<c:out value="${entry.value}" />
								</option>
							</c:forEach>
						</select>
					</td>
					<th nowrap="nowrap" width="10%"></th>
					<td nowrap="nowrap" width="20%"></td>
				</tr>
			</table>
		</div>
		<div id="confirm_exit_btn" style="margin-right:5px;">
			<input name="add" type="button" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'" value="����" onclick="addRow()" />
			<input name="delete" type="button" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'" value="ɾ��" onclick="deleteRow()" />
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
	<input id=rptid name=rptid type=hidden
		value="<c:out value='${rptid}'/>">
	<input id=json name=json type=hidden value="">
</form>
