<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ page import="gov.mof.fasp.ifmis.common.Globals"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
			String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
			//�������
			String styleName ="stylefontS.css";	
			if(session.getAttribute("StyleName")!=null){
			    styleName = (String)session.getAttribute("StyleName");
			}
%>
<TITLE>��ӡģ������</TITLE>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName %>" />
<script type="text/javascript" src="<%=basePath%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/datatable.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/changescroll.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_filter.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_shadow.js" type=text/javascript></SCRIPT>

<script type="text/javascript">
// ����ID�и�ѡ��ѡ�ĸ���
function getSelectedCount() {
    var count = 0;
    for (var i = 0; i < $('form1').elements.length; i++) {
        var e = $('form1').elements[i];
        if (e.type == "radio" && e.checked) {
            count++;
        }
    }
    return count;
}
function showItem(rownum){
if (getSelectedCount() == 0) {
       alert("��ѡ��Ҫ����ǩ�����õ����ݣ�");
       return false;
    } 
   if(!tmain.data[rownum].checked){
   		return;
   }
   for (var i = 0; i < $('form1').elements.length; i++) {
        var e = $('form1').elements[i];
        if (e.type == "radio" && e.checked) {
    		 var row = tmain.getSelectedRow();
   			 var id = row[0].reportid;
   			 var linkname = document.getElementById("hid").value;
    		 var url = "/system/print/findsealbyprint.do?";
    		 var result = "id="+id+"&linkname="+linkname;
   			 var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: result,
						   	 onComplete : showResponseseal
						} 
	   				);   
            }
    }
}
function showResponseseal(tr){
var strs = tr.responseText;
 if(strs == "false"){
   alert("���ȱ����ӡ������Ϣ");
   return ;
 }
    var row = tmain.getSelectedRow();
    var id = row[0].reportid;
    var linkname = document.getElementById("hid").value;
    var url = "/system/print/seal.do?id="+id+"&linkname="+linkname;
    window.location.href=url;
 }
//������ϸ��
function addRow(){
			var formObject = $("form1");
			if(formObject.condition.value==""){
      			 alert("������������");
      			 return false;
   				 }
			var row = new Object();
		    row.reportid = formObject.reportid.value;
		    row.condition =formObject.condition.value;
		    row.linkname = formObject.linkname.value;
		    row.engine = document.getElementById("engine").checked ? "2" : "";
			if(null == tmain.data)
			{
				tmain.data = new Array();
				row.checked = true;
			}
			if(tmain != null && tmain.data != null && tmain.data.length >0 ){
		        for(var i=0;i<tmain.data.length;i++){
		 	     	tmain.data[i].checked=false;
		            } 
	          }
	        row.checked = true;
			tmain.data[tmain.data.length] = row;
			tmain.draw();
			
			formObject.condition.value = row.condition;
			formObject.linkname.value = row.linkname;
			formObject.reportid.value = row.reportid;
		}
//ɾ����ϸ��
function deleteRow(){
    if (getSelectedCount() < 1) {
        alert("��ѡ��Ҫɾ����¼��");
        return;
       }
            var formObject = $("form1");
			 var  delrow = tmain.getSelectedRow();
			var json =  Object.toJSON(delrow);
			var result = "json="+json;
			var url = "/system/ui/delrow.do?"
			   var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: result,
						   	 onComplete : showResponse
						} 
	   				);   
		}
function showResponse(tr){
var strs = tr.responseText;
    if(strs == "false"){
  		 alert("����ɾ��ǩ��");
   		 return ;
 	}
 var formObject = $("form1");
 var  delrow = tmain.getSelectedRow();
 var datas = tmain.data;
 if(confirm("ȷ��ɾ����ѡ������")){
                 if(delrow != null){
                  tmain.removeSelected();
                 }
				 clearFormInput(formObject);
				 var nextrow = tmain.data[tmain.data.length-1];
                 nextrow.checked = true;
				 formObject.linkname.value = nextrow.linkname;
		   		 formObject.reportid.value =  nextrow.reportid ;
		   		 formObject.condition.value = nextrow.condition  ;
				 tmain.draw();
      }
}
// ���FORM�еĿ�¼������
		function clearFormInput(formObject){
		    formObject.condition.value ="";
			//formObject.reportid.value = "";
			// ���FORM��Ӧ����
			formObject.selectedRow = null;
		}
//�޸���Ϣ
		function changeData(){
			var formObject = $("form1");
			var row = tmain.getSelectedRow();
			if(row == null || row.length < 1){
				return;
			}
		    row[0].reportid = formObject.reportid.value;
		    row[0].condition = formObject.condition.value;
		    row[0].engine = document.getElementById("engine").checked ? "2" : "";
			tmain.show();
		}
//����
        function saveExit(){
			var formObject = $("form1");
			if(tmain.data.length >0){
				if(formObject.condition.value==""){
	      			 alert("������������");
	      			 return false;
	   				 }
   			}
			var json = escape(tmain.data.toJSON());
			var linkname = document.getElementById("hid").value;
			var datas = tmain.data;
			for(var i=0;i<datas.length;i++){
					var count = 0;
					var data = datas[i];
					var id = data.reportid;
					for(var j=0;j<datas.length;j++){
					    if(id == datas[j].reportid){
					       count++;
					    }
					}
					if(count>1){
					   var str = "��ӡID ["+id+"] �ظ�"
					   alert(str);
					   return false;
					}
				}
		if(confirm("ȷ������������")){
			var result = "json="+json+"&linkname="+linkname;
			var url = "/system/print/save.do?"
			   var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: result,
						   	 onComplete : showResponseto
						} 
	   				);   
			}
		}
		
		function showResponseto(tr){
			var strs = tr.responseText;
		 	window.location.reload();
		 	if(strs=="true"){
		   	alert("���ݱ���ɹ�");
		 	}
		}
		
function mainclick(row){
	if(!row.checked){
		return;
	}
	var s = "";
	for(var v in row ){
		s += v+":";
		eval("s += row."+v);
		s += "\n";
	}
	var formObject = $("form1");
	formObject.selectedRow = row;
	formObject.linkname.value = row.linkname;
	formObject.reportid.value = row.reportid;
	formObject.condition.value = row.condition;
}		
</script>

<body class=pop_body>
	<div id="popPage1">
		<form id="form1" name="form1" method="post" action="#">
			<input type="hidden" id="hid" value="<c:out value="${linkname}"/>" />
			<input id=json name=json type=hidden value="">
			<div id="form_table_title">
				<ul>
					<li class="top">
						<div>
							��ӡģ����Ϣ
						</div>
					</li>
				</ul>
			</div>
			<!--�뱣����div��a��ǩ 	-->
			<div id="containerline10">
				<!--�뱣����div��a��ǩ 	-->
			<div id="containerline10">
				<div id='tmain_div'
					style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
			</div>
			<script type="text/javascript">
				col = createColumnConfig();
				col.id = "condition";
				col.name = "condition";
				col.type = "S";
				col.title = "����";
				col.show = function(rownum,value,row,tdobj,datatable){
					if(value != null){
					  tdobj.innerText = value;
					} else {
					  tdobj.innerHTML = "";
					}
				}
				ColumnConfig[col.id.toLowerCase()]=col;
				
				col = createColumnConfig();
				col.id = "reportid";
				col.name = "reportid";
				col.type = "N";
				col.title = "��ӡID";
				col.show = function(rownum,value,row,tdobj,datatable){
					if(value != null){
					 tdobj.innerHTML = value;
					} else {
					  tdobj.innerHTML = "";
					}
				}
				ColumnConfig[col.id.toLowerCase()]=col;
				
				col = createColumnConfig();
				col.id = "linkname";
				col.name = "linkname";
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
				col.id = "itemconfig";
				col.name = "itemconfig";
				col.type = "S";
				col.title = "ǩ������";
				col.show = function(rownum,value,row,tdobj,datatable){
					 tdobj.innerHTML = "<img src='../../images/actions/query.gif' alt='ǩ������' onclick='showItem("+rownum+");' />";
				}
				ColumnConfig[col.id.toLowerCase()]=col;
				
				col = createColumnConfig();
				col.id = "engine";
				col.name = "engine";
				col.type = "S";
				col.title = "��ͼ����ģ��";
				col.show = function(rownum,value,row,tdobj,datatable){
					if(value != null && value == "2"){
					  tdobj.innerHTML = "��";
					} else {
					  tdobj.innerHTML = "��";
					}
				}
				ColumnConfig[col.id.toLowerCase()]=col;
				
				var tmain =new dataTable();
				tmain.id="tmain";
				tmain.parent = document.getElementById('tmain_div');
				tmain.setTableHead(["serial","radio","linkname","reportid","condition","itemconfig","engine"]);
				<%
					String json = (String)request.getAttribute("json");
					if(null == json || "".equals(json)){
						out.println("tmain.data = new Array();\n");
					}else{
						out.println("tmain.data = "+ json);
					}
				%>
				tmain.isCreateAmtColumn = false;
				tmain.onrowclick = mainclick;
				tmain.show();
			</script>
	</div>
			
			
	<div id="form_editor">
		<!-- InstanceBeginEditable name="EditRegion7" -->
		<div id="form_table_title_edit">
			<ul>
				<li class="top">
					<div>
						��ӡģ�����ñ༭��
					</div>
				</li>
			</ul>
		</div>
		<div id="edit_table" style="width:99%;">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<th nowrap="nowrap">
						��������
						<span>*</span>
					</th>
					<td nowrap="nowrap">
						<input type="text" name="linkname" style="width: 300px"
							value="<c:out value="${linkname}"/>" readonly="readonly" />
					</td>
				</tr>
				<tr>
					<th nowrap="nowrap">
						��ӡID
						<span>*</span>
					</th>
					<td nowrap="nowrap">
						<select name="reportid" style="width: 300px"
							onchange="changeData();">

						</select>
						&nbsp;&nbsp;
						<input type="checkbox" id="engine" onclick="changOptions(this)"/>��ͼ����
					</td>
				</tr>
				<tr>
					<th nowrap="nowrap">
						����
						<span>*</span>
					</th>
					<td nowrap="nowrap">
						<input type="text" name="condition" style="width: 300px"
						onpaste="this.fireEvent('onkeyup')"	onkeyup="changeData();" />
					</td>
				</tr>
			</table>
		</div>
		
		<div id="confirm_exit_btn" style="margin-right:5px;">
			<input name="add" type="button" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'" value="������ϸ" onclick="addRow()" />
			<input name="delete" type="button" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'" value="ɾ����ϸ"
				onclick="deleteRow()" />
			<input name="submit2" type="button" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'" value="����" onclick="saveExit()" />
			<input name="submit3" type="button" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'" value="�ر�"
				onclick="window.close();" />
		</div>
	</div>
	</form>
</body>
<script>
//��ӡID����
var element= <%=request.getAttribute("nameStr")%>;
var ltReport = <%=request.getAttribute("ltReport")%>;
if(element!=null && element.length>0){
	for(var i = 0;i< element.length;i++){
		var oOption = document.createElement("OPTION");
		oOption.text=element[i].ID+"-"+element[i].NAME;
		oOption.value=element[i].ID;
		document.getElementById("reportid").add(oOption);
	}
}
//ѡ������ʾ��ͼ����
function changOptions(obj){
	//�������ģ��
	document.getElementById("reportid").options.length = 0;
	//ѡ�м�����ͼģ��,������ؾ���ģ��
	if(obj.checked){
		if(ltReport!=null && ltReport.length>0){
			for(var i = 0;i< ltReport.length;i++){
				var oOption = document.createElement("OPTION");
				oOption.text=ltReport[i].REPORTID+"-"+ltReport[i].REPORTSPEC;
				oOption.value=ltReport[i].REPORTID;
				document.getElementById("reportid").add(oOption);
			}
		}
	}
	else{
		if(element!=null && element.length>0){
			for(var i = 0;i< element.length;i++){
				var oOption = document.createElement("OPTION");
				oOption.text=element[i].ID+"-"+element[i].NAME;
				oOption.value=element[i].ID;
				document.getElementById("reportid").add(oOption);
			}
		}
	}
}
//����ģ������ͼ�����ʶ
var isLtReport ='<%=request.getAttribute("isLtReport").toString()%>';
if(isLtReport == "1"){
	document.getElementById("engine").checked = true;
	document.getElementById("engine").fireEvent("onclick");
}
</script>