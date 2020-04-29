<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
<form name="form1" id="form1" action="/report/update_reportparaset.do"
	method="post">
	<div id="querylist">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td nowrap="nowrap">
					�������
				</td>
				<td nowrap="nowrap">
					<input type="text" name="time" value="<c:out value="${reportdot.reportcode}" />"
						readonly="readonly" />
				</td>
				<td nowrap="nowrap">
					��������
				</td>
				<td nowrap="nowrap">
					<input type="text" value="<c:out value="${reportdot.reportspec}" />" readonly="readonly" />
				</td>
				<td nowrap="nowrap" width="5%"></td>
				<td nowrap="nowrap" width="20%"></td>
			</tr>
		</table>
	</div>
	<div>
		<div>
			<div id="form_table_title_edit">
				<ul>
					<li class="top">
						<div>
							�����ѯ�����༭��
						</div>
					</li>
				</ul>
			</div>
			<div id="containerline9">
				<div id='tmain_div'
					style='position:relative;height:100%;width:100%;'></div>
			</div>
		</div>
		<div id="form_editor">
			<div id="form_table_title_edit">
				<ul>
					<li class="top">
						<div>
							��ѯ�����༭��
						</div>
					</li>
				</ul>
			</div>

			<div id="edit_table">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<th nowrap="nowrap">
							�ؼ�����
							<span>*</span>
						</th>
						<td nowrap="nowrap" colspan="5">
							<input type="text" id=controlname name=controlname value="" style="width:75%"
								onchange="changeData();" />
						</td>
					</tr>
					<tr>
						<th nowrap="nowrap">
							������Դ����
							<span>*</span>
						</th>
						<td nowrap="nowrap">
							<select id=datasouretype name=datasouretype class="text_popm2d"
								onchange="changeData();">
								<c:forEach items="${datasouretype}" var="entry">
									<option value="<c:out value='${entry.key}' />">
										<c:out value="${entry.value}" />
									</option>
								</c:forEach>
							</select>
						</td>
						<th nowrap="nowrap">
							����Դ
							<span>*</span>
						</th>
						<td nowrap="nowrap" colspan="3">
							<select id=datasoureSelect name=datasoureSelect
								onchange="changeData();" style="display:none;">
								<c:forEach items="${elementDTOMap}" var="entry">
									<option value="<c:out value='${entry.key}' />">
										<c:out value="${entry.value}" />
									</option>
								</c:forEach>
							</select>
							<input type="text" id="datasoure" name="datasoure"
								onchange="changeData();" style="display:none;" />
						</td>
					</tr>
					<tr>
						<th nowrap="nowrap">
							��Ӧ����
							<span>*</span>
						</th>
						<td nowrap="nowrap">
							<select id=toparametername name=toparametername class="text_popm2d"
								onchange="changeData();">
								<c:forEach items="${rptParameterDTOMap}" var="entry">
									<option value="<c:out value='${entry.key}' />">
										<c:out value="${entry.value}" />
									</option>
								</c:forEach>
							</select>
						</td>
						<th nowrap="nowrap">
							��Ҫ����ֵ
							<span>*</span>
						</th>
						<td nowrap="nowrap">
							<select id=getvaluetype name=getvaluetype class="text_popm2d"
								onchange="changeData();">
								<c:forEach items="${getvaluetype}" var="entry">
									<option value="<c:out value='${entry.key}' />">
										<c:out value="${entry.value}" />
									</option>
								</c:forEach>
							</select>
						</td>
						<th nowrap="nowrap">
							��Ӧ�Ӳ���
						</th>
						<td nowrap="nowrap">
							<select id=subparameter name=subparameter class="text_popm2d"
								onchange="changeData();">
								<option value="">
								</option>
								<c:forEach items="${rptParameterDTOMap}" var="entry">
									<option value="<c:out value='${entry.key}' />">
										<c:out value="${entry.value}" />
									</option>
								</c:forEach>
							</select>
						</td>
					</tr>
					<tr>
						<th nowrap="nowrap">
							�ؼ�����
							<span>*</span>
						</th>
						<td nowrap="nowrap">
							<select id=controltype name=controltype class="text_popm2d" onchange="changeData();">
								<c:forEach items="${controltype}" var="entry">
									<option value="<c:out value='${entry.key}' />">
										<c:out value="${entry.value}" />
									</option>
								</c:forEach>
							</select>
						</td>
						<th nowrap="nowrap">
							����¼��ֵ
						</th>
						<td nowrap="nowrap">
							<select id=ismustinput name=ismustinput class="text_popm2d" onchange="changeData();">
								<c:forEach items="${ismustinput}" var="entry">
									<option value="<c:out value='${entry.key}' />">
										<c:out value="${entry.value}" />
									</option>
								</c:forEach>
							</select>
						</td>
						<th nowrap="nowrap">
							�Ƿ�����
						</th>
						<td nowrap="nowrap">
							<select id=ishide name=ishide class="text_popm2d" onchange="changeData();">
								<c:forEach items="${ishide}" var="entry">
									<option value="<c:out value='${entry.key}' />">
										<c:out value="${entry.value}" />
									</option>
								</c:forEach>
							</select>
						</td>
					</tr>
					<tr>
						<th nowrap="nowrap">
							��������
						</th>
						<td nowrap="nowrap">
							<select id=type name=type class="text_popm2d" onchange="changeData();">
								<option value=""></option>
								<option value="1">ҳ�����ѡ�����</option>
								<option value="2">������ƹ������</option>
							</select>
						</td>
						<th nowrap="nowrap">
							��������
						</th>
						<td nowrap="nowrap">
							<input type="text" id=controllercol name=controllercol
								onchange="changeData();" />
						</td>
						<th nowrap="nowrap">
							�����ֶα���
						</th>
						<td nowrap="nowrap">
							<input type="text" id=tablefield name=tablefield
								onchange="changeData();" />
						</td>
					</tr>
					<tr>
						<th nowrap="nowrap">
							��������
						</th>
						<td nowrap="nowrap">
							<input type="text" id=elementfilter name=elementfilter
								onchange="changeData();" />
						</td>
						<th nowrap="nowrap">
							Ĭ��ֵ
						</th>
						<td nowrap="nowrap">
							<input type="text" id=defaultvalue name=defaultvalue
								onchange="changeData();" />
						</td>
						<th nowrap="nowrap">
							���ֵ
						</th>
						<td nowrap="nowrap">
							<input type="text" id=maxvalue name=maxvalue
								onchange="changeData();" />
						</td>
					</tr>
					<tr>
						<th nowrap="nowrap">
							��Сֵ
						</th>
						<td nowrap="nowrap">
							<input type="text" id=minvalue name=minvalue
								onchange="changeData();" />
						</td>
						<th nowrap="nowrap">
						</th>
						<td nowrap="nowrap">
						</td>
						<th nowrap="nowrap">
						</th>
						<td nowrap="nowrap">
						</td>
					</tr>
				</table>
			</div>
			<div id="confirm_exit_btn" style="margin-right:5px;clear:both;">
				<input name="submit1" type="button" class="button_style"
					onmouseover="this.className='OverBtn'"
					onmouseout="this.className='button_style'"
					onmousedown="this.className='down'" value="����"
					onclick="addRow()" />
				<input name="submit1" type="button" class="button_style"
					onmouseover="this.className='OverBtn'"
					onmouseout="this.className='button_style'"
					onmousedown="this.className='down'" value="ɾ��"
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
		<input id=rptid name=rptid type=hidden
			value="<c:out value='${reportdot.reportid}'/>">
		<input id=json name=json type=hidden value=""/>
		<input id=controlls name=controlls type=hidden value=""/>
</form>
<script>
	col = createColumnConfig();
	col.id = "controlname";
	col.name = "controlname";
	col.type = "S";
	col.title = "�ؼ�����";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["controlname"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;		 
	
	col = createColumnConfig();
	col.id = "toparametername";
	col.name = "toparametername";
	col.type = "S";
	col.title = "��Ӧ���� ";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["toparameternamename"] !=null ){
			tdobj.innerHTML = row["toparameternamename"];
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
		 
	col = createColumnConfig();
	col.id = "datasouretype";
	col.name = "datasouretype";
	col.type = "S";
	col.title = "������Դ����";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["datasouretypename"] !=null ){
			tdobj.innerHTML = row["datasouretypename"];
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "getvaluetype";
	col.name = "getvaluetype";
	col.type = "S";
	col.title = "������ȡֵ";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["getvaluetypename"] !=null ){
			tdobj.innerHTML = row["getvaluetypename"];
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "subparameter";
	col.name = "subparameter";
	col.type = "S";
	col.title = "��Ӧ�Ӳ���";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["subparametername"] !=null ){
			tdobj.innerHTML = row["subparametername"];
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "datasoure";
	col.name = "datasoure";
	col.type = "S";
	col.title = "����Դ";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["datasourename"] !=null ){
			tdobj.innerHTML = row["datasourename"];
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "controltype";
	col.name = "controltype";
	col.type = "S";
	col.title = "�ؼ�����";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["controltypename"] !=null ){
			tdobj.innerHTML = row["controltypename"];
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;		 
	
	col = createColumnConfig();
	col.id = "controlheight";
	col.name = "controlheight";
	col.type = "S";
	col.title = "�ؼ��߶�";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["controlheight"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "controlwidth";
	col.name = "controlwidth";
	col.type = "S";
	col.title = "�ؼ����";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["controlwidth"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "controlleft";
	col.name = "controlleft";
	col.type = "S";
	col.title = "�ؼ���߾�";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["controlleft"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
				 
	col = createColumnConfig();
	col.id = "controltop";
	col.name = "controltop";
	col.type = "S";
	col.title = "�ؼ��ϱ߾�";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["controltop"] != null && value != null){
		  tdobj.innerHTML = value;
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
	col.id = "maxvalue";
	col.name = "maxvalue";
	col.type = "S";
	col.title = "���ֵ";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["maxvalue"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;	
				 
	col = createColumnConfig();
	col.id = "minvalue";
	col.name = "minvalue";
	col.type = "S";
	col.title = "��Сֵ";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["minvalue"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
				 
	col = createColumnConfig();
	col.id = "ismustinput";
	col.name = "ismustinput";
	col.type = "S";
	col.title = "����¼��ֵ";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["ismustinputname"] !=null ){
			tdobj.innerHTML = row["ismustinputname"];
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
				 
	col = createColumnConfig();
	col.id = "ishide";
	col.name = "ishide";
	col.type = "S";
	col.title = "�Ƿ�����";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["ishidename"] !=null ){
			tdobj.innerHTML = row["ishidename"];
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "controllercol";
	col.name = "controllercol";
	col.type = "S";
	col.title = "��������";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["controllercol"] !=null ){
			tdobj.innerHTML = row["controllercol"];
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "tablefield";
	col.name = "tablefield";
	col.type = "S";
	col.title = "�����ֶα���";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["tablefield"] !=null ){
			tdobj.innerHTML = row["tablefield"];
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "elementfilter";
	col.name = "elementfilter";
	col.type = "S";
	col.title = "��������";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["elementfilter"] !=null ){
			tdobj.innerHTML = row["elementfilter"];
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "type";
	col.name = "type";
	col.type = "S";
	col.title = "��������";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["typename"] !=null ){
			tdobj.innerHTML = row["typename"];
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	var tmain =new dataTable();
	tmain.parent = document.getElementById('tmain_div');
	tmain.setTableHead(["serial","radio","controlname","toparametername","datasouretype","getvaluetype","subparameter","datasoure","controltype","defaultvalue","maxvalue","minvalue","ismustinput","ishide","controllercol","tablefield","elementfilter","type"]);
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
		
		formObject.controlname.value = row.controlname;
	    formObject.toparametername.value = row.toparametername;
	    
	    formObject.datasouretype.value = row.datasouretype;
	    
	    formObject.getvaluetype.value = row.getvaluetype;
	    
	    formObject.subparameter.value = row.subparameter;
	    
	    if(row.datasouretype == 3)
	    {
	    	formObject.datasoureSelect.style.display = "block";
	    	formObject.datasoure.style.display = "none";
	    	formObject.datasoureSelect.value = row.datasoure;
	    }else{
	    	formObject.datasoureSelect.style.display = "none";
	    	formObject.datasoure.style.display = "block";
	    	formObject.datasoure.value = row.datasoure;
	    }
	    
	    formObject.controltype.value = row.controltype;
	    /*
	    formObject.controlheight.value = row.controlheight;
	    formObject.controlwidth.value = row.controlwidth;
	    formObject.controlleft.value = row.controlleft;
	    formObject.controltop.value = row.controltop;
		*/
	    if(typeof(row.defaultvalue)!="undefined"&&row.defaultvalue!="undefined")formObject.defaultvalue.value = row.defaultvalue;
	    if(typeof(row.maxvalue)!="undefined"&&row.maxvalue!="undefined")formObject.maxvalue.value = row.maxvalue;
	    if(typeof(row.minvalue)!="undefined"&&row.minvalue!="undefined")formObject.minvalue.value = row.minvalue;
	    
	    formObject.ismustinput.value = row.ismustinput;
	    
	    formObject.ishide.value = row.ishide;
	    
	    //�����ѯ���������� lp20120601
	    if(typeof row.tablefield != 'undefined') {
	    	formObject.tablefield.value = row.tablefield;
	    }else{
	    	formObject.tablefield.value = "";
	    }
	    if(typeof row.controllercol != 'undefined') {
	    	formObject.controllercol.value = row.controllercol;
	    }else{
	    	formObject.controllercol.value = "";
	    }
	    if(typeof row.elementfilter != 'undefined') {
	    	formObject.elementfilter.vlaue = row.elementfilter;
	    }else{
	    	formObject.elementfilter.vlaue = "";
	    }
	    if(typeof row.type != 'undefined') {
	    	formObject.type.value = row.type;
	    }
	
		formObject.selectedRow = row;
	}
	
	// ���FORM�еĿ�¼������
	function clearFormInput(formObject){
		var inputelements = formObject.elements;
		for(var i=0;i<inputelements.length;i++){
			var obj = inputelements[i];
			if(obj.tagName == "INPUT" && obj.type=="text" && obj.name != "windowswidth" && obj.name != "windowsheight"){
				obj.value = ""
			}
		}
		// ���FORM��Ӧ����
		formObject.subparameter.selectedIndex = 0;
		formObject.selectedRow = null;
	}
	
	function addRow(){
		var formObject = $("form1");
		var row = new Object();
		if(formObject.controlname.value==""){
	       alert("������ؼ����ƣ�");
	       return;
	    }
	    if(formObject.datasouretype.value != 3)
	    {
	    	if(formObject.datasoure.value==""){
		       alert("����������Դ��");
		       return;
		    }
	    }
		/*
	    if(formObject.controlheight.value==""){
	       alert("������ؼ��߶ȣ�");
	       return;
	    }
	    if(formObject.controlwidth.value==""){
	       alert("������ؼ���ȣ�");
	       return;
	    }
	    if(formObject.controlleft.value==""){
	       alert("������ؼ���߾࣡");
	       return;
	    }
	    if(formObject.controltop.value==""){
	       alert("������ؼ��ϱ߾࣡");
	       return;
	    }
		*/
	    if(null == formObject.toparametername.value || formObject.toparametername.value == ""){
	       alert("�������������");
	       return;
	    }
	    row.controlname = formObject.controlname.value;
	    row.toparametername = formObject.toparametername.value;
		if(formObject.toparametername.selectedIndex>0)
	    row.toparameternamename = formObject.toparametername.options[formObject.toparametername.selectedIndex].text;
	    
	    row.datasouretype = formObject.datasouretype.value;
		if(formObject.datasouretype.selectedIndex>0)
	    row.datasouretypename = formObject.datasouretype.options[formObject.datasouretype.selectedIndex].text;
	    
	    row.getvaluetype = formObject.getvaluetype.value;
		if(formObject.getvaluetype.selectedIndex>0)
	    row.getvaluetypename = formObject.getvaluetype.options[formObject.getvaluetype.selectedIndex].text;
	    
	    row.subparameter = formObject.subparameter.value;
		if(formObject.subparameter.selectedIndex>0)
	    row.subparametername = formObject.subparameter.options[formObject.subparameter.selectedIndex].text;
	    
	    if(row.datasouretype == 3)
	    {
	    	row.datasoure = formObject.datasoureSelect.value;
			if(formObject.datasoureSelect.selectedIndex>0)
	    	row.datasourename = formObject.datasoureSelect.options[formObject.datasoureSelect.selectedIndex].text;
	    }else{
	    	row.datasoure = formObject.datasoure.value;
	    	row.datasourename = formObject.datasoure.value;
	    }
	    
	    row.controltype = formObject.controltype.value;
		if(formObject.controltype.selectedIndex>0)
	    row.controltypename = formObject.controltype.options[formObject.controltype.selectedIndex].text;
	    /*
	    row.controlheight = formObject.controlheight.value;
	    row.controlwidth = formObject.controlwidth.value;
	    row.controlleft = formObject.controlleft.value;
	    row.controltop = formObject.controltop.value;
		*/
	    row.defaultvalue = formObject.defaultvalue.value;
	    row.maxvalue = formObject.maxvalue.value;
	    row.minvalue = formObject.minvalue.value;
	    
	    row.ismustinput = formObject.ismustinput.value;
		if(formObject.ismustinput.selectedIndex>0)
	    row.ismustinputname = formObject.ismustinput.options[formObject.ismustinput.selectedIndex].text;
	    
	    row.ishide = formObject.ishide.value;
		if(formObject.ishide.selectedIndex>0)
	    row.ishidename = formObject.ishide.options[formObject.ishide.selectedIndex].text;
	    
	    //�����ѯ���������� lp20120601
	    row.tablefield = formObject.tablefield.value;
	    row.controllercol = formObject.controllercol.value;
	    row.elementfilter = formObject.elementfilter.value;
	    row.type = formObject.type.value;
	    row.typename = formObject.type.options[formObject.type.selectedIndex].text;
	    
	    row.reportid = formObject.rptid.value;
	    
		if(null == tmain.data)
		{
			tmain.data = new Array();
		}
		tmain.data[tmain.data.length] = row;
		tmain.show();
		
		clearFormInput(formObject);
	}
	
	//�޸���Ϣ
	function changeData(){
	
		var formObject = $("form1");
		if(formObject.datasouretype.value == 3)
	    {
	    	formObject.datasoureSelect.style.display = "block";
	    	formObject.datasoure.style.display = "none";
	    }else{
	    	formObject.datasoureSelect.style.display = "none";
	    	formObject.datasoure.style.display = "block";
	    }
	    
		var row = formObject.selectedRow;
		if(row == null || row.length < 1){
			return;
		}
		if(formObject.controlname.value==""){
	       alert("������ؼ����ƣ�");
	       return;
	    }
		/*
	    if(formObject.controlheight.value==""){
	       alert("������ؼ��߶ȣ�");
	       return;
	    }
	    if(formObject.controlwidth.value==""){
	       alert("������ؼ���ȣ�");
	       return;
	    }
	    if(formObject.controlleft.value==""){
	       alert("������ؼ���߾࣡");
	       return;
	    }
	    if(formObject.controltop.value==""){
	       alert("������ؼ��ϱ߾࣡");
	       return;
	    }
		*/
		row.controlname = formObject.controlname.value;
	    row.toparametername = formObject.toparametername.value;
		if(formObject.toparametername.selectedIndex>0)
	    row.toparameternamename = formObject.toparametername.options[formObject.toparametername.selectedIndex].text;
	    
	    row.datasouretype = formObject.datasouretype.value;
		if(formObject.datasouretype.selectedIndex>0)
	    row.datasouretypename = formObject.datasouretype.options[formObject.datasouretype.selectedIndex].text;
	    
	    row.getvaluetype = formObject.getvaluetype.value;
		if(formObject.getvaluetype.selectedIndex>0)
	    row.getvaluetypename = formObject.getvaluetype.options[formObject.getvaluetype.selectedIndex].text;
	    
	    row.subparameter = formObject.subparameter.value;
		if(formObject.subparameter.selectedIndex>0)
	    row.subparametername = formObject.subparameter.options[formObject.subparameter.selectedIndex].text;
	    
	    if(row.datasouretype == 3)
	    {
	    	row.datasoure = formObject.datasoureSelect.value;
			if(formObject.datasoureSelect.selectedIndex>0)
	    	row.datasourename = formObject.datasoureSelect.options[formObject.datasoureSelect.selectedIndex].text;
	    }else{
	    	row.datasoure = formObject.datasoure.value;
	    	row.datasourename = formObject.datasoure.value;
	    }
	    
	    row.controltype = formObject.controltype.value;
		if(formObject.controltype.selectedIndex>0)
	    row.controltypename = formObject.controltype.options[formObject.controltype.selectedIndex].text;
	    /*
	    row.controlheight = formObject.controlheight.value;
	    row.controlwidth = formObject.controlwidth.value;
	    row.controlleft = formObject.controlleft.value;
	    row.controltop = formObject.controltop.value;
		*/
	    row.defaultvalue = formObject.defaultvalue.value;
	    row.maxvalue = formObject.maxvalue.value;
	    row.minvalue = formObject.minvalue.value;
	    
	    row.ismustinput = formObject.ismustinput.value;
		if(formObject.ismustinput.selectedIndex>0)
	    row.ismustinputname = formObject.ismustinput.options[formObject.ismustinput.selectedIndex].text;
	    
	    row.ishide = formObject.ishide.value;
		if(formObject.ishide.selectedIndex>0)
	    row.ishidename = formObject.ishide.options[formObject.ishide.selectedIndex].text;
	    //�����ѯ���������� lp20120601
	    row.tablefield = formObject.tablefield.value;
	    row.controllercol = formObject.controllercol.value;
	    row.elementfilter = formObject.elementfilter.value;
	    row.type = formObject.type.value;
	    if(formObject.type.selectedIndex>0)
	    row.typename = formObject.type.options[formObject.type.selectedIndex].text;
	    
	    row.reportid = formObject.rptid.value;
	    
		tmain.show();
	}

	function deleteRow(){
		var formObject = $("form1");
		if(formObject.selectedRow == null){
			return ;
		}
		var delrow = formObject.selectedRow;
		var datas = tmain.data;
		if(confirm("ȷ��ɾ����ѡ��ѯ������")){
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
		//������������ߴ��ڹ�������ʱ����
		var i=0, _tempData = tmain.data, ln = _tempData.length, _controlledArr = []; 
		for (; i<ln; i++){
			var _tempRow = _tempData[i];
			if(_tempRow.controltype=="8"&&_tempRow.toparametername!="program"){
				alert("��Ŀ��ѡ������ֻ֧�ֶ�Ӧ����Ϊ��Ŀ�Ŀؼ���");
				return;
			}
		    if((typeof _tempRow.tablefield != 'undefined' && _tempRow.tablefield) || (typeof _tempRow.controllercol != 'undefined' && _tempRow.controllercol !="")||(typeof _tempRow.elementfilter !='undefined' &&��_tempRow.elementfilter !="")) {
		    	if(_tempRow.type == "") {
		    		alert("��ѡ��������ͣ�");
		    		return;
		    	}
		    	var _tmepObj = {reportid:_tempRow.reportid, tablefield:_tempRow.tablefield, controlledcol:_tempRow.toparametername, controllercol:_tempRow.controllercol, filter:_tempRow.elementfilter, type:_tempRow.type};
		    	_controlledArr.push(_tmepObj);
		    }
	    }
		var formObject = $("form1");
		formObject.json.value = tmain.data.toJSON();
		formObject.controlls.value = _controlledArr.toJSON();
		formObject.action = '/report/update_reportparaset.do';
		// ����ֻ������onsubmit�¼�������������Ҫ����submit�����ύ
	 	formObject.submit();
	}
	
	function cancel(){
		var submenuid = <c:out value="${param.submenu}"/>;
		var mainmenu = <c:out value="${param.mainmenu}"/>;
		var url = "/report/reportedit.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
		if(confirm("�Ƿ񱣴����ݣ�")){
			saveExit();
		}else{
			window.location.href = url;
		}
	}
	changeData();
</script>