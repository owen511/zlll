<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<jsp:directive.page import="java.util.List" />
<jsp:directive.page import="java.util.Map" />
<jsp:directive.page import="java.util.Iterator" />
<jsp:directive.page import="gov.mof.fasp.dic.column.dto.ColumnDTO" />
<jsp:directive.page
	import="gov.mof.fasp.pa.vouchertype.dto.VoucherTypeDTO" />
	<style>
div#errortable table{
	border:1px solid #8ba3da;
	border-right:0;
	border-bottom:0;
}
div#errortable td{
	border:1px solid #8ba3da;
	line-height:22px;
	border-top:0;
	border-left:0;
}
</style>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/export.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/importdata.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1[1].3.1.js"></script>
<form id="queryform" name="queryform" method="post"
	action="<%=request.getContextPath()%>/indi/common/queryimportdata.do"
	onsubmit="switchValue(this)">
	<%
	List columnList = (List)request.getAttribute("columnList");
	VoucherTypeDTO voucherTypeDTO = (VoucherTypeDTO)request.getAttribute("voucherTypeDTO");
	String submenu = request.getParameter("submenu");
	String mainmenu = request.getParameter("mainmenu");
	Map elementMap = (Map)request.getAttribute("elementMap");
	String json = (String)request.getAttribute("json");
	if(json==null)
	 	json = "[]";
	Map nullableMap = (Map)request.getAttribute("nullableMap");
	%>
	<div id="implist" style="position:relative;">
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						请核对导入数据
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
		var submenuid = <c:out value="${param.submenu}"/>;
		var mainmenu = <c:out value="${param.mainmenu}"/>;
		var vchtypeid = <c:out value="${param.vchtypeid}"/>;
		// 将选中的数据填写到编辑区内
		function mainclick(row){
			var s = "";
			for(var v in row ){
				s += v+":";
				eval("s += row."+v);
				s += "\n";
			}
			
			var formObject = $("queryform");
			if(row.checked&&formObject.selectedRow != row){
				ctrlInput(false);
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
							if(columncode.equals("month")){
								out.println("formObject."+columncode+".valueid = row."+columncode+";");
							}
						}
					}
				}
				%>
				formObject.selectedRow = row;
			}
		}
		
		//检查数据
		function checkData(){
			var rows = tmain.data;
			for(var i=0;i<rows.length;i++){
				var row = rows[i];
				row.checked = false;
			}
			tmain.data = rows;
			tmain.draw();
			for(var i=0;i<rows.length;i++){
				var row = rows[i];
				var rowerrormsg = "";
				<%
				if(null != columnList)
				{
					for(Iterator it = columnList.iterator();it.hasNext();){
						ColumnDTO columnDTO = (ColumnDTO)it.next();
						String columncode = columnDTO.getColumncode();
						String nullableKey = String.valueOf(columnDTO.getColumnid());
						String nullableValue = (String)nullableMap.get(nullableKey);
						if (null != nullableValue && "0".equals(nullableValue)){
							out.println("if(null==row."+columncode+" || row."+columncode+"==\"\"){");
							%>
							rowerrormsg += "\n";
							<%
							out.println("rowerrormsg +=\""+columnDTO.getName()+"不能为空!\";");
							out.println("row.checked = true;");
							out.println("}");
						}
					}
				}
				%>
				if(row.checked){
					alert(rowerrormsg);
					mainclick(row);
					tmain.draw();
					return false;
				}
			}
			return true;
		}
		/*浮动层*/
		function closeDiv(){
 		var d_mask=document.getElementById('mask'); 	
    	var d_dialog = document.getElementById('LoadStatus');
    	d_mask.style.visibility='hidden';
    	d_dialog.style.visibility='hidden';
    	d_dialog.style.display='none';
		}
	
		function show(){
    		var d_mask=document.getElementById('mask');
    		var d_dialog = document.getElementById('LoadStatus'); 
       
    		d_mask.style.width = document.body.offsetWidth+20;
    		d_mask.style.height=document.body.offsetHeight+20; 
       
   			d_dialog.style.top = document.body.clientHeight / 2 -20;
   			d_dialog.style.left =document.body.clientWidth / 2 -100;
    		d_mask.style.visibility='visible';
    		d_dialog.style.visibility='visible';
    		d_dialog.style.display='block';
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
					String nullableKey = String.valueOf(columnDTO.getColumnid());
					String nullableValue = (String)nullableMap.get(nullableKey);
					if (null != nullableValue && "0".equals(nullableValue)){
						out.println("if(event.srcElement==document.getElementById(\""+columncode+"\")&&formObject."+columncode+".value==\"\"){");
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
			//if(null != elementMap){
				//Set elementSet = elementMap.keySet();
				//for(Iterator it = elementSet.iterator();it.hasNext();){
				//	String element = (String)it.next();
				//	String elementJson = (String)elementMap.get(element);
					//out.println("var "+element+"_List="+elementJson);
				//}
			//}
		
			
			String tableHead = "\"serial\",\"radio\",";
			out.println("var json = "+json+";");
			if(null != columnList)
			{
				//产生处理json串的动作，主要是完成产生来源数据项的编码同名称
				///out.println("function dealJson(inputJson){");
				//out.println("for(var i=0;i<inputJson.size();i++){");
				//out.println("var row = inputJson[i];");
				//for(Iterator it = columnList.iterator();it.hasNext();){
				///	ColumnDTO columnDTO = (ColumnDTO)it.next();
				//	String columncode = columnDTO.getColumncode();
				//	String element = columnDTO.getSourceelement();
				//	if(null == element){
				//		element = "";
				//	}else{
				//		element = element.toLowerCase();
				//	}
				//	String sourcetable = columnDTO.getSourcetable();
				//	if(null != sourcetable && !"".equals(sourcetable)){
				//		out.println("if(null != row."+columncode+"){");
						//out.println("var element=getElement('"+element+"',row."+columncode+")");
						//out.println("if(null != element){");
						//out.println("row."+columncode+"_code = element.code;");
						//out.println("row."+columncode+"_name = element.name;");
						//out.println("}");
				//		out.println("row."+columncode+"_code = row."+columncode+"_code;");
				//		out.println("row."+columncode+"_name = row."+columncode+"_name;");
				//		out.println("}");
				//	}
				//}
				//out.println("}");
				//out.println("json = inputJson;");
				//out.println("}");
				//if(null != json && !"".equals(json)){
				//	out.println("dealJson("+json+");");
				//}
				//动态生成表的字段格式
				for(Iterator it = columnList.iterator();it.hasNext();){
					ColumnDTO columnDTO = (ColumnDTO)it.next();
					String columncode = columnDTO.getColumncode();
					if(!columnDTO.getDatatype().equalsIgnoreCase("D")){
						tableHead +=("\""+columncode+"\",");
						out.println("col = createColumnConfig();");
						out.println("col.id = \""+columncode+"\";");
						out.println("col.name = \""+columncode+"\";");
						if(!columncode.equalsIgnoreCase("amt")){
						out.println("col.type = \"S\";");
						}else{
						out.println("col.type = \"M\";");
						out.println("col.style = \"text-align:right\";");
						}
						out.println("col.title = \""+columnDTO.getName()+"\";");
						//金额样式处理
						//摘要特别处理
						if("text5".equals(columncode)){
							out.println("col.style = \"width:280px;text-align:left;word-wrap:break-word;word-break:break-all\";");
						}
						out.println("col.show = function(rownum,value,row,tdobj,datatable){");
						out.println("if(typeof(row."+columncode+")!=\"undefined\"&&row."+columncode+" != null ){");
						String sourcetable = columnDTO.getSourcetable();
						if(null != sourcetable && !"".equals(sourcetable)){
							out.println("eval(\"var code = row."+columncode+"_code\");");
							out.println("eval(\"var name = row."+columncode+"_name\");");
							out.println("if(code != null && name!= null){");
							out.println("var val1 = code+\"-\"+name");
							out.println("tdobj.innerHTML = \"<div onclick='return showOverlibTips(this.innerHTML,this);' class='divoverflow'>\"+val1+\"</div>\"");
							out.println("}");
						}else{
						    out.println("var val2 = row."+columncode+";");
							out.println("   tdobj.innerHTML = \"<div onclick='return showOverlibTips(this.innerHTML,this);' class='divoverflow'>\"+val2+\"</div>\"");
							 //金额后加.00
							if(columncode.equalsIgnoreCase("amt")){
							out.println("var amt = tdobj.innerText;var amtFormat = amt.toMoneyFormat()");
							out.println(" tdobj.innerHTML = \"<div onclick='return showOverlibTips(this.innerHTML,this);' class='divoverflow'>\"+amtFormat+\"</div>\"");
							}
						}
						out.println("} else {");
						out.println("row."+columncode+"=\"\";");
						out.println("tdobj.innerHTML = \"\";");
						out.println("}");
						out.println("}");
						out.println("ColumnConfig[col.id.toLowerCase()]=col;");
					} 
					else {
						out.println("col = createColumnConfig();");
						out.println("col.id = '"+columncode +"';");
						out.println("col.name = '"+columncode +"';");
						out.println("col.type = 'S';");
						out.println("col.title = '"+columnDTO.getName() +"';");
						out.println("col.show = function(rownum,value,row,tdobj,datatable){");
						out.println("if(value != null&& value != \"\"){");
						out.println("var optiondate = new Date(parseInt(value,10));");
						out.println("var date = optiondate.getFullYear()+'';");
						out.println("if (optiondate.getMonth() < 9)");
						out.println("date += '0'; ");
						out.println("date += optiondate.getMonth()+1;");
						out.println("if (optiondate.getDate() < 10)");
						out.println("date += '0'; ");
						out.println("date += optiondate.getDate();");
						out.println("tdobj.innerHTML = \"<div onclick='return showOverlibTips(this.innerHTML,this);' class='divoverflow'>\"+date+\"</div>\"");
						out.println("}");
						out.println("}");
						out.println("ColumnConfig[col.id.toLowerCase()]=col;");
					}
				}
			}
			tableHead = tableHead.substring(0,tableHead.lastIndexOf(","));
			out.println("var tmain =new dataTable();");
			out.println("tmain.id ='tmain';");
			out.println("tmain.parent = document.getElementById('tmain_div');");
			out.println("tmain.isCreateAmtColumn= true;");
			out.println("tmain.columnList = ['amt'];");
			out.println("tmain.tabletype = 'MainList';");
			out.println("tmain.allflag = false;");
			out.println("tmain.setTableHead(["+tableHead+"]);");
			
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
      <div>请编辑导入数据</div>
    </li>

  </ul>
</div>

	<div id="form_table" style="width:98%;	margin-left:10px; margin-bottom:10px; font-size:12px; position:relative; height:expression(this.offsetParent.offsetHeight-implist.offsetHeight-form_table.offsetHeight-100);overflow: auto;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0"
			class="main_lookup_input">
			<%
					if (null != columnList) {
					for (Iterator it = columnList.iterator(); it.hasNext();) {
						out.println("<tr>");
						ColumnDTO columnDTO = (ColumnDTO) it.next();
						String columncode = columnDTO.getColumncode();
						String sourcetable = columnDTO.getSourcetable();

						out
						.println("<th align=\"left\" nowrap=\"nowrap\"><div align=\"left\">");
						out.println(columnDTO.getName());
						String nullableKey = String.valueOf(columnDTO.getColumnid());
						String nullableValue = (String) nullableMap
						.get(nullableKey);
						if (null != nullableValue && "0".equals(nullableValue)) {
					out.println("<span class=\"STYLE1\">*</span>");
						}
						out.println("</div></th>");
						out.println("<td align=\"left\">");
						if (null != sourcetable && !"".equals(sourcetable)) {
					out
							.println("<input id=\""
							+ columncode
							+ "\" name=\""
							+ columncode
							+ "\" type=text class=main_lookup_input readonly onclick='selectElememt("
							+ mainmenu + "," + submenu + ",\""
							+ voucherTypeDTO.getVchcode() + "\",\""
							+ columncode
							+ "\",this);changeData()' />");
					out.println("<button id=\"" + columncode
							+ "_btn\" onclick='selectElememt(" + mainmenu
							+ "," + submenu + ",\""
							+ voucherTypeDTO.getVchcode() + "\",\""
							+ columncode + "\",this.form." + columncode
							+ ");changeData()'>");
					out.println("</button>");

						} else {
					if ("amt".equals(columncode)) {
						out
						.println("<input name=\""
								+ columncode
								+ "\" id=\""
								+ columncode
								+ "\" type=\"text\" class=\"main_lookup_input\" onkeyup=\"formatMoneyInput(this);changeData();\"  maxlength=\"14\"/> ");
					} else if(columnDTO.getName().indexOf("日期")!=-1){
						out
						.println("<input name=\""
								+ columncode
								+ "\" type=\"text\" id=\""
								+ columncode
								+ "\" class=\"main_lookup_input\" onchange=\"changeData()\" readonly />");
						out.println("<img src=\""+request.getContextPath()+"/images/calendar/date.gif\" alt=\"选择日期\" onclick=\"return showCalendar('" + columncode +"', '%Y%m%d', null, true);\" style=\"cursor:hand; border:0;\" onmouseover=\"this.style.background='red';\" onmouseout=\"this.style.background=''\"/>");
					} else if(columncode.equals("month")) {
						out
						.println("<input name=\""
								+ columncode
								+ "\" type=\"text\" id=\""
								+ columncode
								+ "\" class=\"main_lookup_input\" onchange=\"changeData();checkmonth(this)\"/>");
					} else {
						out
						.println("<input name=\""
								+ columncode
								+ "\" type=\"text\" id=\""
								+ columncode
								+ "\" class=\"main_lookup_input\" onchange=\"changeData()\"/>");
					}
						}
						out.println("</td>");

						if (it.hasNext()) {
					columnDTO = (ColumnDTO) it.next();
					columncode = columnDTO.getColumncode();
					sourcetable = columnDTO.getSourcetable();

					out
							.println("<th align=\"left\" nowrap=\"nowrap\"><div align=\"left\">");
					out.println(columnDTO.getName());
					nullableKey = String.valueOf(columnDTO.getColumnid());
					nullableValue = (String) nullableMap.get(nullableKey);
					if (null != nullableValue && "0".equals(nullableValue)) {
						out.println("<span class=\"STYLE1\">*</span>");
					}
					out.println("</div></th>");
					out.println("<td align=\"left\">");
					if (null != sourcetable && !"".equals(sourcetable)) {
						out
						.println("<input id=\""
								+ columncode
								+ "\" name=\""
								+ columncode
								+ "\" type=text class=main_lookup_input readonly onclick='selectElememt("
								+ mainmenu + "," + submenu + ",\""
								+ voucherTypeDTO.getVchcode()
								+ "\",\"" + columncode
								+ "\",this);changeData()' />");
						out.println("<button id=\"" + columncode
						+ "_btn\" onclick='selectElememt("
						+ mainmenu + "," + submenu + ",\""
						+ voucherTypeDTO.getVchcode() + "\",\""
						+ columncode + "\",this.form." + columncode
						+ ");changeData()'>");
						out.println("</button>");

					} else {
						if ("amt".equals(columncode)) {
							out
							.println("<input name=\""
							+ columncode
							+ "\" id=\""
							+ columncode
							+ "\" type=\"text\" class=\"main_lookup_input\" onkeyup=\"formatMoneyInput(this);changeData();\"  maxlength=\"14\"/> ");
						} else if(columnDTO.getName().indexOf("日期")!=-1){
							out
							.println("<input name=\""
									+ columncode
									+ "\" type=\"text\" id=\""
									+ columncode
									+ "\" class=\"main_lookup_input\" onchange=\"changeData()\" readonly />");
							out.println("<img src=\""+request.getContextPath()+"/images/calendar/date.gif\" alt=\"选择日期\" onclick=\"return showCalendar('" + columncode +"', '%Y%m%d', null, true);\" style=\"cursor:hand; border:0;\" onmouseover=\"this.style.background='red';\" onmouseout=\"this.style.background=''\"/>");
						} else if(columncode.equals("month")) {
							out
							.println("<input name=\""
									+ columncode
									+ "\" type=\"text\" id=\""
									+ columncode
									+ "\" class=\"main_lookup_input\" onchange=\"changeData();checkmonth(this)\"/>");
						} else {
							out
							.println("<input name=\""
							+ columncode
							+ "\" type=\"text\" id=\""
							+ columncode
							+ "\" class=\"main_lookup_input\" onchange=\"changeData()\"/>");
						}
					}
					out.println("</td>");
						} else {
					out
							.println("<th align=\"left\" nowrap=\"nowrap\"></th>");
					out.println("<td align=\"left\"> </td>");
						}

						if (it.hasNext()) {
					columnDTO = (ColumnDTO) it.next();
					columncode = columnDTO.getColumncode();
					sourcetable = columnDTO.getSourcetable();

					out
							.println("<th align=\"left\" nowrap=\"nowrap\"><div align=\"left\">");
					out.println(columnDTO.getName());
					nullableKey = String.valueOf(columnDTO.getColumnid());
					nullableValue = (String) nullableMap.get(nullableKey);
					if (null != nullableValue && "0".equals(nullableValue)) {
						out.println("<span class=\"STYLE1\">*</span>");
					}
					out.println("</div></th>");
					out.println("<td align=\"left\">");
					if (null != sourcetable && !"".equals(sourcetable)) {
						out
						.println("<input id=\""
								+ columncode
								+ "\" name=\""
								+ columncode
								+ "\" type=text class=main_lookup_input readonly onclick='selectElememt("
								+ mainmenu + "," + submenu + ",\""
								+ voucherTypeDTO.getVchcode()
								+ "\",\"" + columncode
								+ "\",this);changeData()' />");
						out.println("<button id=\"" + columncode
						+ "_btn\" onclick='selectElememt("
						+ mainmenu + "," + submenu + ",\""
						+ voucherTypeDTO.getVchcode() + "\",\""
						+ columncode + "\",this.form." + columncode
						+ ");changeData()'>");
						out.println("</button>");

					} else {
						if ("amt".equals(columncode)) {
							out
							.println("<input name=\""
							+ columncode
							+ "\" id=\""
							+ columncode
							+ "\" type=\"text\" class=\"main_lookup_input\" onkeyup=\"formatMoneyInput(this);changeData();\"  maxlength=\"14\"/> ");
						} else if(columnDTO.getName().indexOf("日期")!=-1){
							out
							.println("<input name=\""
									+ columncode
									+ "\" type=\"text\" id=\""
									+ columncode
									+ "\" class=\"main_lookup_input\" onchange=\"changeData()\" readonly />");
							out.println("<img src=\""+request.getContextPath()+"/images/calendar/date.gif\" alt=\"选择日期\" onclick=\"return showCalendar('" + columncode +"', '%Y%m%d', null, true);\" style=\"cursor:hand; border:0;\" onmouseover=\"this.style.background='red';\" onmouseout=\"this.style.background=''\"/>");
						} else if(columncode.equals("month")) {
							out
							.println("<input name=\""
									+ columncode
									+ "\" type=\"text\" id=\""
									+ columncode
									+ "\" class=\"main_lookup_input\" onchange=\"changeData();checkmonth(this)\"/>");
						} else {
							out
							.println("<input name=\""
							+ columncode
							+ "\" type=\"text\" id=\""
							+ columncode
							+ "\" class=\"main_lookup_input\" onchange=\"changeData()\"/>");
						}
					}
					out.println("</td>");
						} else {
					out
							.println("<th align=\"left\" nowrap=\"nowrap\"></th>");
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
			<input name="export" type="button" value="导出Excel模板"
				class="main_lookup_input" onclick="exportExcelByIdl(tmain,1)" />
			<input name="add" type="button" value="数据采集"
				class="main_lookup_input" onclick="addDetail1()" />
			<input name="del" type="button" value="删除" class="main_lookup_input"
				onclick="delDetail(this.form)" />
			<input type="button" id="import" name="import" value="导入" class="button_style"
				onclick="importData1(this.form);barStart();" />
			<input name="mod3" type="button" value="关闭" class="button_style"
				onclick="turnBack(this.form)" />
		</div>
	</div>
	<!-- 数据采集错误信息 -->
	<div id="form_table_title_edit" name="errortable" style="display:none;">
	  <ul>
	    <li class="top">
	      <div>数据采集错误信息</div>
	    </li>
	    <li>
	      <input type="button" class="button_style" style="width:50px;" onclick="download();" value="下载"/>
	    </li>
	  </ul>
	</div>
	<div id="errortable"  style="height:100px;margin-left:10px;display:none;overflow:auto;">
		<table width="98%" border="0" cellspacing="0" cellpadding="0">
		</table>
	</div>
	<div id ="mask"></div>
    <div id ="LoadStatus">
	 <table border="0" cellpadding="0" cellspacing="0">
	  <tr>
	   <td>
		<div  class="load_out">
		<div id="out" class="load_js"></div>
		<div class="load_in" id="bar" style="width:200px;">处理中,请稍候...</div>
		</div> 		
		</td>
	  </tr>
	 </table>
    </div>
	<script type="text/javascript">	
	function download(){
		if(errorfilename == "") {
			alert("无错误信息文件!");
			return;
		}
		var url = "/common/download.do?errorfilename="+errorfilename;
		var obj = document.createElement("<form>");
		document.body.appendChild(obj);
		obj.method="post";
		obj.action = url;
		obj.submit();
		document.body.removeChild(obj);
	}
		var ki=0;
		function barStart(){
		      var bar=setInterval("barBegin()",5000);
		    }
	    function barBegin(){
	     	ki+=1;
			if(ki<=87)
			{
				$("out").style.width = ki+"%";
			}
	    }
		function checkmonth(obj){
			var patrn=patrn=/^[1-9]{1,2}$/;   
			if (!patrn.exec(obj.value)){ 
				alert("月份格式非法！");
				if(obj.valueid!=null)
					obj.value = obj.valueid;
				else 
					obj.value = 0 ;
				changeData();
			}
			if(obj.value>12){
				alert("月份格式非法！");
				if(obj.valueid!=null)
					obj.value = obj.valueid;
				else 
					obj.value = 0 ;
				changeData();
			}
			return;
		}
		function addDetail1(){
			var url = "<%=request.getContextPath()%>/indi/common/searchFile1.do?vchtypeid="+<c:out value="${vchtypeid}"/> + '&submenu=' + <c:out value="${param.submenu}"/>+ '&mainmenu=' + <c:out value="${param.mainmenu}"/>;
		    var features = "top=150,left=50,width=400,height=100,scrollbars=no,resizable=no";
		    window.open(url, "选择导入文件", features);
		}
		
		// 放弃
		function turnBack(formObject){
			closeWindow(true);
		}
		
		//生成
		function importData1(formObject){
			if(checkData()){
				show();
				formObject.json.value = tmain.data.toJSON();
				formObject.action = "<%=request.getContextPath()%>/indi/common/importData1.do?vchtypeid="+vchtypeid  + '&submenu=' + <c:out value="${param.submenu}"/>+ '&mainmenu=' + <c:out value="${param.mainmenu}"/>;
				formObject.submit();
			}
		}
		
		//不刷新页面操作后更新单据状态
		function afterOperation(resp){
		    var json = resp.responseText.evalJSON(true);
		    if(typeof(json.success)!="undefined" && json.success!=null){
		    	alert("导入成功!");
		    	//清空数据
		    	tmain.data = new Array();
			    tmain.show();
		    	clearFormInput($("queryform"));
				ctrlInput(true);
			    closeWindow(false);
		    } else if(typeof(json.error)!="undefined" && json.error!=null){
		    	alert(json.error);
		    }
		    closeDiv();
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
				var url = '<%=request.getContextPath()%>/indi/common/deleteimportdata.do';
				var pars = 'vchtypeid='+vchtypeid+'&json=' + Object.toJSON(delrow) + '&submenu=' + <c:out value="${param.submenu}"/>;
			   	var myAjax = new Ajax.Request(url,{method: 'post', parameters: pars,onComplete: function(resp){
			   											var json = resp.responseText.evalJSON(true);
														if( json.sucmsg !=null && json.sucmsg!=""){
													    	alert(json.sucmsg);
													    	return;
													    }
														if( json.error !=null && json.error!=""){
													    	alert(json.error);
													    	return;
													    }
			   									}});
				ctrlInput(true);
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
		function ctrlInput(flag){
			var formObject = $("queryform");
			var inputelements = formObject.elements;
			if(null == tmain.data || tmain.data.length <= 0){
				document.getElementById("import").disabled = "disabled";
				document.getElementById("del").disabled = "disabled";
			} else{
				document.getElementById("import").disabled = "";
				document.getElementById("del").disabled = "";
			}
			if(flag==null){
				if(null == tmain.data || tmain.data.length <= 0)
				{
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
				}
			}else{
				for(var i=0;i<inputelements.length;i++){
					var obj = inputelements[i];
					if(obj.tagName == "INPUT" && obj.type=="text"){
						obj.disabled = flag;
					}
					if(obj.tagName == "BUTTON"){
						obj.disabled = flag;
					}
				}
			}
			
		}
		ctrlInput(true);
		function closeWindow(isReturn){
			if(tmain.data!=null&&tmain.data.length>0){
				var url = '<%=request.getContextPath()%>/indi/common/deleteimportdata.do';
				var pars = 'vchtypeid='+vchtypeid+'&json=' + tmain.data.toJSON() + '&submenu=' + <c:out value="${param.submenu}"/>+'&cleartag=1';
			   	var myAjax = new Ajax.Request(url,{method: 'post', parameters: pars,onComplete: function(resp){
			   											var json = resp.responseText.evalJSON(true);
														if( json.sucmsg !=null && json.sucmsg!=""){
													    	window.status=json.sucmsg;
													    }
														if( json.error !=null && json.error!=""){
													    	window.status=json.error;
													    }
			   									}});
		   	}								
			if(isReturn){
				window.close();
			} else {
				if(window.opener.returnBack){
					if(tmain.data!=null&&tmain.data.length>0){
						window.opener.returnBack(tmain.data.toJSON());
					} else {
						window.opener.returnBack();
					}
				}
				window.opener=null;
				window.close();
			}
		}
		window.onload = function(){
			self.moveTo(0,0);	
			self.resizeTo(screen.availWidth, screen.availHeight);
		}
		window.onunload = function(){
			//closeWindow(true);
		}
	</script>
	<script   for="window"   event="onbeforeunload">   
	  if   (event.clientX>document.body.clientWidth   &&event.clientY<0||event.altKey)   
	  return  closeWindow(true);
  	</script>
	<input id=json name=json type=hidden value="">
	<input id=istrue name=istrue type=hidden value="">
	<input name=submenu id=submenu type="hidden"
		value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden"
		value="<c:out value='${param.mainmenu}'/>" />
	<input id=vchtypeid name=vchtypeid type=hidden
		value="<c:out value='${vchtypeid}'/>">
	<input id="error" name="error" type="hidden"/>
	<input id="totalnum" name="totalnum" type="hidden"/>
	<input id="filepath" name="filepath" type="hidden"/>
	<input id="filename" name="filename" type="hidden"/>
</form>
<script type="text/javascript">
var errorfilename = "<c:out value="${param.errorfilename}"/>";
	var error = eval(<%=request.getAttribute("error")%>);
if(error){
	var strArr = [];
	var j=1;
	for(var i in error){
		if(i=="errorInfo") continue;
		if(i=="showconfig") strArr.push("<tr><td>"+j+"</td><td>关联关系错误信息:</td></tr>");
		strArr.push("<tr><td align=center>"+j+"</td><td>"+error[i]+"</td></tr>");
		j++;
	}
	if(strArr.length>0){
		JQ("div[name*='errortable']").css("display","block");
		JQ("#errortable").css("display","block");
		JQ("#errortable table").append(strArr.join(""));
	}
}
tmain.sumMainAmtToColumn = function(totaldbList){
	   var totalList = new Array();
	   if(totaldbList==null||totaldbList.length==0) {
	   		totalList = this.columnList;
	   		totalList.curtag="curpage";
	   } else {
	   		totalList = totaldbList;
	   }
	   if(totaldbList!=null&&this.totalColumn.curtag=="curpage")
			document.getElementById(this.id+"total_text").innerHTML="当前合计";
	   else if(totaldbList!=null&&this.totalColumn.curtag=="selectpage")
			document.getElementById(this.id+"total_text").innerHTML="选择合计";
	   else if(totaldbList!=null&&this.totalColumn.curtag=="allpage"){
	   		document.getElementById(this.id+"total_text").innerHTML="所有合计";
	   		for(var prp in this.allpage_totaljson ){
				var total_name = this.id+"sumAmtColumnid"+prp;
				var total_value=eval("this.allpage_totaljson."+prp)
				var nlen =2;
				if(this.amtflag=="10000"){
					//nlen =6;
				}
				total_value = Math.round((total_value/this.amtflag)*Math.pow(10,nlen))/Math.pow(10,nlen);				
				document.getElementById(total_name).innerHTML=(total_value+"").toMoneyFormat();
			}
			return;
	   }else{
			document.getElementById(this.id+"total_text").innerHTML="合计";
			for(var b=0;b<this.totalColumn.length;b++){
				q = eval(this.id+"sumAmtColumnid"+this.totalColumn[b]);
				q.innerHTML="0.00";
			}
	   }
	   this.sumamtrow = "all";
	   for(var a=0;a<totalList.length;a++){
			this.sumAmtColumn = '0.00';			
			var selectrows = null;
			//hwy20091230合计所有行金额
			if(this.sumamtrow=="all"){
				selectrows = this.data;
			}else if(this.tabletype=="MainList"){				
				this.getSelectedRow().length==0?selectrows = this.data:selectrows = this.getSelectedRow();
			} else if(totaldbList!=null&&totaldbList.curtag=="curpage"){
				selectrows = this.data;
			} else if(totaldbList!=null&&totaldbList.curtag=="selectpage"){
				selectrows = this.getSelectedRow();	
			} else {
				selectrows = this.getSelectedRow();	
			}	
			
			var totalStr = totalList[a];
			for(var i=0;i<selectrows.length;i++){
				var m = '0.00';		
				if(totalStr.indexOf(".")!=-1)totalStr=totalStr.substring(0, totalStr.indexOf("."))		;		
				if(typeof(eval('selectrows['+i+'].'+totalStr))!='undefined'){
					if(typeof(eval('selectrows['+i+'].'+totalStr))=="number"){
						m = String(eval('selectrows['+i+'].'+totalStr));
					}else{
						m = eval('selectrows['+i+'].'+totalStr);
					}
					
				}
				if(m!=null)m = m.replace(/,/g,"");	
				//debugger;
				if(!isNaN(parseFloat(m)))			
				    this.sumAmtColumn = accAdd(parseFloat(this.sumAmtColumn), parseFloat(m));
				//alert(sumAmtColumn);
			}
			var q;
			var amtflag=1;
			var columnType;
			for(var m=0;m<this.columnConfig.length;m++){
				//周伟 2010年1月22日 15:43:16
				//修改金额为可编辑时，汇总不准确问题
				var tempa = this.columnConfig[m].id;
				if(tempa.indexOf(".")!=-1)tempa=tempa.substring(0, tempa.indexOf("."))		;
				
				if(tempa==totalStr){
						amtflag = this.columnConfig[m].amtflag;
						columnType = this.columnConfig[m].type;
						break;
				}	
			}
			if(null==amtflag||""==amtflag){
				amtflag=1;
			}
			var nlen =2;
			if(amtflag=="10000"){
				//nlen =6;
			}
			this.sumAmtColumn = Math.round((this.sumAmtColumn/amtflag)*Math.pow(10,nlen))/Math.pow(10,nlen);
			try{
				q = eval(this.id+"sumAmtColumnid"+totalStr);		
				if(q[0]!=null){
					if(columnType == "I"){
						q[0].innerHTML = String(this.sumAmtColumn);	
					} else {
						q[0].innerHTML = String(this.sumAmtColumn).toMoneyFormat();	
					}
				}else if(typeof(q[0])=="undefined"){
				if(columnType == "I"){
					q.innerHTML = String(this.sumAmtColumn);
				} else {
					q.innerHTML = String(this.sumAmtColumn).toMoneyFormat();	
				}
					
				}	
			}catch(exception){
				//alert("2222");
			}
		}			
	}
	tmain.sumMainAmtToColumn();
</script>