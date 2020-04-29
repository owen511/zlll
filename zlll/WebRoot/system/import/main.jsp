<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<jsp:directive.page import="java.util.List" />
<jsp:directive.page import="java.util.Map" />
<jsp:directive.page import="java.util.Set" />
<jsp:directive.page import="java.util.Iterator" />
<jsp:directive.page import="gov.mof.fasp.dic.column.dto.ColumnDTO" />
<jsp:directive.page
	import="gov.mof.fasp.pa.vouchertype.dto.VoucherTypeDTO" />
<script>
	var error = "<c:out value="${error}"/>";
	if(error!=""&&error!="null")alert(error);
</script>
<form id="queryform" name="queryform" method="post"
	action="<%=request.getContextPath()%>/system/import/query.do"
	onsubmit="switchValue(this)">
	<%
		List columnList = (List) request.getAttribute("columnList");
		VoucherTypeDTO voucherTypeDTO = (VoucherTypeDTO) request.getAttribute("voucherTypeDTO");
		String submenu = request.getParameter("submenu");
		String mainmenu = request.getParameter("mainmenu");
		Map elementMap = (Map) request.getAttribute("elementMap");
		String json = (String) request.getAttribute("json");
		Map nullableMap = (Map) request.getAttribute("nullableMap");
	%>
	<div style="position:relative;">
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						导入数据信息
					</div>
				</li>
			</ul>
		</div>
		<!-- 指标列表 -->
		<%
			int size = columnList.size();
			int height = 0;
			if (size % 3 == 0) {
				height = 20 - (size / 3) * 2;
			} else {
				height = 20 - (size / 3 + 1) * 2;
			}
			if((height>20&&height!=30)||height<1)height=10;
		%>
		<div id="containerline<%=height%>">
			<div id='tmain_div'
				style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
		</div>
		<script type="text/javascript">
		//修改您的位置为导入
		function changeYourPosition(){
			var your_position = document.getElementById("your_position");
			var table = your_position.getElementsByTagName("table");
			var td = table[0].getElementsByTagName("td");
			for(var i=0;i<td.length;i++){
				var tdNode = td[i];
				var width = tdNode.getAttribute("width");
				if(width = "591"){
					var position = tdNode.firstChild.nodeValue;
					tdNode.firstChild.nodeValue = position + ">> 导入";
					return;
				}
			}
		}
		changeYourPosition();
		
		function getElement(elementName,elementid){
			eval("var elementList = "+elementName+"_List;");
			for(var j=0;j<elementList.size();j++){
				var element = elementList[j];
				if(elementid == element.itemid){
					return element;
				}
			}
		}
		
		// 将选中的数据填写到编辑区内
		function mainclick(row){
			var s = "";
			for(var v in row ){
				s += v+":";
				eval("s += row."+v);
				s += "\n";
			}
			
			var formObject = $("queryform");
			ctrlInput();
			<%
			if(null != columnList)
			{
				for(Iterator it = columnList.iterator();it.hasNext();){
					ColumnDTO columnDTO = (ColumnDTO)it.next();
					String columncode = columnDTO.getColumncode();
					String sourcetable = columnDTO.getSourcetable();
					if(null != sourcetable && !"".equals(sourcetable)){
						out.println("setElementValueToInput(row,formObject."+columncode+");");
					}else{
						out.println("formObject."+columncode+".value = row."+columncode+";");
					}
				}
			}
			%>
			formObject.selectedRow = row;
		}
		
		//检查数据
		function checkData(){
			var rows = tmain.data;
			for(var i=0;i<rows.length;i++){
				var row = rows[i];
				row.checked = false;
			}
			tmain.data = rows;
			tmain.show();
			for(var i=0;i<rows.length;i++){
				var row = rows[i];
				<%
				if(null != columnList)
				{
					for(Iterator it = columnList.iterator();it.hasNext();){
						ColumnDTO columnDTO = (ColumnDTO)it.next();
						String columncode = columnDTO.getColumncode();
						String nullableKey = new Integer(columnDTO.getColumnid()).toString();
						String nullableValue = (String)nullableMap.get(nullableKey);
						if (null != nullableValue && "0".equals(nullableValue)){
							out.println("if(null==row."+columncode+" || row."+columncode+"==\"\"){");
							out.println("alert(\""+columnDTO.getName()+"不能为空！\");");
							out.println("row.checked = true;");
							out.println("tmain.data = rows;");
							out.println("mainclick(row)");
							out.println("tmain.show();");
							out.println("return false;");
							out.println("}");
						}
					}
				}
				%>
			}
			return true;
		}
		//修改信息
		function changeData(){
			var formObject = $("queryform");
			<%
			if(null != columnList)
			{
				for(Iterator it = columnList.iterator();it.hasNext();){
					ColumnDTO columnDTO = (ColumnDTO)it.next();
					String columncode = columnDTO.getColumncode();
					String sourcetable = columnDTO.getSourcetable();
					String nullableKey = new Integer(columnDTO.getColumnid()).toString();
					String nullableValue = (String)nullableMap.get(nullableKey);
					if (null != nullableValue && "0".equals(nullableValue)){
						out.println("if(formObject."+columncode+".value==\"\"){");
						out.println("alert(\""+columnDTO.getName()+"不能为空！\");");
						out.println("return false;");
						out.println("}");
					}
					
					if(null != sourcetable && !"".equals(sourcetable)){
						out.println("setElementValueToRow(formObject.selectedRow,document.getElementById(\""+columncode+"\"));");
					}else{
						if("amt".equals(columncode)){
							out.println("var amt = document.getElementById(\""+columncode+"\").value.replace(/,/g,\"\");");
							out.println("formObject.selectedRow."+columncode+" = amt;");
						}else{
							out.println("formObject.selectedRow."+columncode+" = document.getElementById(\""+columncode+"\").value;");
						}
					}
				}
			}
			%>
			tmain.draw();
		}
		
		<%
			if(null != elementMap){
				Set elementSet = elementMap.keySet();
				for(Iterator it = elementSet.iterator();it.hasNext();){
					String element = (String)it.next();
					String elementJson = (String)elementMap.get(element);
					out.println("var "+element+"_List="+elementJson);
				}
			}
		
			
			StringBuffer tableHead = new StringBuffer("\"serial\",\"radio\",");
			out.println("var json = new Array();");
			if(null != columnList)
			{
				//产生处理json串的动作，主要是完成产生来源数据项的编码同名称
				out.println("function dealJson(inputJson){");
				out.println("for(var i=0;i<inputJson.size();i++){");
				out.println("var row = inputJson[i];");
				for(Iterator it = columnList.iterator();it.hasNext();){
					ColumnDTO columnDTO = (ColumnDTO)it.next();
					String columncode = columnDTO.getColumncode();
					String element = columnDTO.getSourceelement();
					if(null == element){
						element = "";
					}else{
						element = element.toLowerCase();
					}
					String sourcetable = columnDTO.getSourcetable();
					if(null != sourcetable && !"".equals(sourcetable)){
						out.println("if(null != row."+columncode+"){");
						out.println("var element=getElement('"+element+"',row."+columncode+")");
						out.println("if(null != element){");
						out.println("row."+columncode+"_code = element.code;");
						out.println("row."+columncode+"_name = element.name;");
						out.println("}");
						out.println("}");
					}
				}
				out.println("}");
				out.println("json = inputJson;");
				out.println("}");
				if(null != json && !"".equals(json)){
					out.println("dealJson("+json+");");
				}
				//动态生成表的字段格式
				for(Iterator it = columnList.iterator();it.hasNext();){
					ColumnDTO columnDTO = (ColumnDTO)it.next();
					String columncode = columnDTO.getColumncode();
					tableHead.append("\""+columncode+"\",");
					out.println("col = createColumnConfig();");
					out.println("col.id = \""+columncode+"\";");
					out.println("col.name = \""+columncode+"\";");
					out.println("col.type = \"S\";");
					out.println("col.title = \""+columnDTO.getName()+"\";");
					//摘要特别处理
					if("text5".equals(columncode)){
						out.println("col.style = \"width:280px;text-align:right;word-wrap:break-word;word-break:break-all\";");
					}
					out.println("col.show = function(rownum,value,row,tdobj,datatable){");
					out.println("if(row."+columncode+" != null){");
					String sourcetable = columnDTO.getSourcetable();
					if(null != sourcetable && !"".equals(sourcetable)){
						out.println("eval(\"var code = row."+columncode+"_code\");");
						out.println("eval(\"var name = row."+columncode+"_name\");");
						out.println("if(code != null && name!= null){");
						out.println("tdobj.innerHTML = code+\"-\"+name;");
						out.println("}");
					}else{
						out.println("tdobj.innerHTML = row."+columncode+";");
					}
					out.println("} else {");
					out.println("tdobj.innerHTML = \"\";");
					out.println("}");
					out.println("}");
					out.println("ColumnConfig[col.id.toLowerCase()]=col;");
				}
			}
			tableHead.deleteCharAt(tableHead.lastIndexOf(","));
			out.println("var tmain =new dataTable();");
			out.println("tmain.parent = document.getElementById('tmain_div');");
			out.println("tmain.setTableHead(["+tableHead.toString()+"]);");
			
			if(null == json || "".equals(json)){
				out.println("tmain.data = new Array();\n");
			}else{
				out.println("tmain.data = json;");
			}
			out.println("tmain.onrowclick = mainclick;");
			out.println("tmain.show();");
		%>
		</script>
	</div>
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					指标明细编辑区
				</div>
			</li>
		</ul>
	</div>
	<div id="form_table">
		<table width="100%" border="0" cellspacing="0" cellpadding="0"
			class="main_lookup_input">
			<%
					if (null != columnList) {
					for (Iterator it = columnList.iterator(); it.hasNext();) {
						out.println("<tr>");
						ColumnDTO columnDTO = (ColumnDTO) it.next();
						String columncode = columnDTO.getColumncode();
						String sourcetable = columnDTO.getSourcetable();

						out.println("<th align=\"left\" nowrap=\"nowrap\"><div align=\"left\">");
						out.println(columnDTO.getName());
						String nullableKey = new Integer(columnDTO.getColumnid()).toString();
						String nullableValue = (String) nullableMap.get(nullableKey);
						if (null != nullableValue && "0".equals(nullableValue)) {
					out.println("<span class=\"STYLE1\">*</span>");
						}
						out.println("</div></th>");
						out.println("<td align=\"left\">");
						if (null != sourcetable && !"".equals(sourcetable)) {
					out.println("<input id=\"" + columncode + "\" name=\"" + columncode
							+ "\" type=text class=main_lookup_input readonly onclick='selectElememt(" + mainmenu
							+ "," + submenu + ",\"" + voucherTypeDTO.getVchcode() + "\",\"" + columncode
							+ "\",this);changeData()' />");
					out.println("<button id=\"" + columncode + "_btn\" onclick='selectElememt(" + mainmenu + ","
							+ submenu + ",\"" + voucherTypeDTO.getVchcode() + "\",\"" + columncode
							+ "\",this.form." + columncode + ");changeData()'>");
					out.println("</button>");

						} else {
					if ("amt".equals(columncode)) {
						out
						.println("<input name=\""
								+ columncode
								+ "\" id=\""
								+ columncode
								+ "\" type=\"text\" class=\"main_lookup_input\" onkeyup=\"formatMoneyInput(this);changeData();\"  maxlength=\"14\"/> ");
					} else {
						out.println("<input name=\"" + columncode + "\" type=\"text\" id=\"" + columncode
						+ "\" class=\"main_lookup_input\" onchange=\"changeData()\"/>");
					}
						}
						out.println("</td>");

						if (it.hasNext()) {
					columnDTO = (ColumnDTO) it.next();
					columncode = columnDTO.getColumncode();
					sourcetable = columnDTO.getSourcetable();

					out.println("<th align=\"left\" nowrap=\"nowrap\"><div align=\"left\">");
					out.println(columnDTO.getName());
					nullableKey = new Integer(columnDTO.getColumnid()).toString();
					nullableValue = (String) nullableMap.get(nullableKey);
					if (null != nullableValue && "0".equals(nullableValue)) {
						out.println("<span class=\"STYLE1\">*</span>");
					}
					out.println("</div></th>");
					out.println("<td align=\"left\">");
					if (null != sourcetable && !"".equals(sourcetable)) {
						out.println("<input id=\"" + columncode + "\" name=\"" + columncode
						+ "\" type=text class=main_lookup_input readonly onclick='selectElememt("
						+ mainmenu + "," + submenu + ",\"" + voucherTypeDTO.getVchcode() + "\",\""
						+ columncode + "\",this);changeData()' />");
						out.println("<button id=\"" + columncode + "_btn\" onclick='selectElememt(" + mainmenu
						+ "," + submenu + ",\"" + voucherTypeDTO.getVchcode() + "\",\"" + columncode
						+ "\",this.form." + columncode + ");changeData()'>");
						out.println("</button>");

					} else {
						if ("amt".equals(columncode)) {
							out
							.println("<input name=\""
							+ columncode
							+ "\" id=\""
							+ columncode
							+ "\" type=\"text\" class=\"main_lookup_input\" onkeyup=\"formatMoneyInput(this);changeData();\"  maxlength=\"14\"/> ");
						} else {
							out.println("<input name=\"" + columncode + "\" type=\"text\" id=\"" + columncode
							+ "\" class=\"main_lookup_input\" onchange=\"changeData()\"/>");
						}
					}
					out.println("</td>");
						} else {
					out.println("<th align=\"left\" nowrap=\"nowrap\"></th>");
					out.println("<td align=\"left\"> </td>");
						}

						if (it.hasNext()) {
					columnDTO = (ColumnDTO) it.next();
					columncode = columnDTO.getColumncode();
					sourcetable = columnDTO.getSourcetable();

					out.println("<th align=\"left\" nowrap=\"nowrap\"><div align=\"left\">");
					out.println(columnDTO.getName());
					nullableKey = new Integer(columnDTO.getColumnid()).toString();
					nullableValue = (String) nullableMap.get(nullableKey);
					if (null != nullableValue && "0".equals(nullableValue)) {
						out.println("<span class=\"STYLE1\">*</span>");
					}
					out.println("</div></th>");
					out.println("<td align=\"left\">");
					if (null != sourcetable && !"".equals(sourcetable)) {
						out.println("<input id=\"" + columncode + "\" name=\"" + columncode
						+ "\" type=text class=main_lookup_input readonly onclick='selectElememt("
						+ mainmenu + "," + submenu + ",\"" + voucherTypeDTO.getVchcode() + "\",\""
						+ columncode + "\",this);changeData()' />");
						out.println("<button id=\"" + columncode + "_btn\" onclick='selectElememt(" + mainmenu
						+ "," + submenu + ",\"" + voucherTypeDTO.getVchcode() + "\",\"" + columncode
						+ "\",this.form." + columncode + ");changeData()'>");
						out.println("</button>");

					} else {
						if ("amt".equals(columncode)) {
							out
							.println("<input name=\""
							+ columncode
							+ "\" id=\""
							+ columncode
							+ "\" type=\"text\" class=\"main_lookup_input\" onkeyup=\"formatMoneyInput(this);changeData();\"  maxlength=\"14\"/> ");
						} else {
							out.println("<input name=\"" + columncode + "\" type=\"text\" id=\"" + columncode
							+ "\" class=\"main_lookup_input\" onchange=\"changeData()\"/>");
						}
					}
					out.println("</td>");
						} else {
					out.println("<th align=\"left\" nowrap=\"nowrap\"></th>");
					out.println("<td align=\"left\"> </td>");
						}

						out.println("</tr>");
					}
				}
			%>
		</table>
	</div>
	<div id="querybutton">
		<div align="right">
		   <input name="mo11" type="button" value="导出模板" class="button_style"
				onclick="exportExcelTemplet(tmain)" />
			<input name="add" type="button" value="数据采集"
				class="main_lookup_input" onclick="addDetail()" />
			<input name="del" type="button" value="删除" class="main_lookup_input"
				onclick="delDetail(this.form)" />
			<input type="button" id="import" name="import" value="导入"
				class="button_style" onclick="importData(this.form);" />
			<input name="mod3" type="button" value="放弃" class="button_style"
				onclick="turnBack(this.form)" />
		</div>
	</div>
	<script type="text/javascript">
		function addDetail(){
			var url = "<%=request.getContextPath()%>/system/import/searchFile.do?vchtypeid="+<c:out value="${vchtypeid}"/>;
		    var features = "top=150,left=50,width=400,height=150,scrollbars=no,resizable=no";
		    window.open(url, "选择导入文件", features);
		}
		
		// 放弃
		function turnBack(formObject){
			var submenuid = <c:out value="${param.submenu}"/>;
			var mainmenu = <c:out value="${param.mainmenu}"/>;
			var url = "<%=request.getContextPath()%>/system/import/turnBack.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
			window.location.href = url;
		}
		
		// 保存数据
		function save(formObject){
			if(checkData()){
				formObject.json.value = tmain.data.toJSON();
				formObject.action = "<%=request.getContextPath()%>/system/import/update.do";	
				formObject.submit();
			}
		}
		
		//生成
		function importData(formObject){
			if(checkData()){
				formObject.json.value = tmain.data.toJSON();
				formObject.action = "<%=request.getContextPath()%>/system/import/importData.do";	
				formObject.submit();
			}
		}
		
		// 删除数据
		function delDetail(formObject){
			if(formObject.selectedRow == null){
				return ;
			}
			var delrow = formObject.selectedRow;
			var datas = tmain.data;
			if(confirm("确定删除所选单据吗？")){
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
		
		// 清除FORM中的可录入数据
		function clearFormInput(formObject){
			var inputelements = formObject.elements;
			for(var i=0;i<inputelements.length;i++){
				var obj = inputelements[i];
				if(obj.tagName == "INPUT" && obj.type=="text"){
					obj.value = ""
					obj.valueid = null;
				}
			}
			// 清除FORM对应数据
			formObject.selectedRow = null;
		}
		
		//控制输入框开启于否
		function ctrlInput(){
			var formObject = $("queryform");
			var inputelements = formObject.elements;
			if(null == tmain.data || tmain.data.length <= 0)
			{
				//document.getElementById("update").disabled = "disabled";
				document.getElementById("import").disabled = "disabled";
				for(var i=0;i<inputelements.length;i++){
					var obj = inputelements[i];
					if(obj.tagName == "INPUT" && obj.type=="text"){
						obj.disabled = "disabled";
					}
					if(obj.tagName == "BUTTON"){
						obj.disabled = "disabled";
					}
				}
			}else{
				//document.getElementById("update").disabled = "";
				document.getElementById("import").disabled = "";
				for(var i=0;i<inputelements.length;i++){
					var obj = inputelements[i];
					if(obj.tagName == "INPUT" && obj.type=="text"){
						obj.disabled = "";
					}
					if(obj.tagName == "BUTTON"){
						obj.disabled = "";
					}
				}
			}
			
		}
		ctrlInput();
	</script>
	<input id=json name=json type=hidden value="">
	<input name=submenu id=submenu type="hidden"
		value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden"
		value="<c:out value='${param.mainmenu}'/>" />
	<input id=vchtypeid name=vchtypeid type=hidden
		value="<c:out value='${vchtypeid}'/>">
</form>
