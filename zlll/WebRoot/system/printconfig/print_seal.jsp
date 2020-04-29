<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<link type="text/css" rel="stylesheet"
	href="<%=request.getContextPath()%>/style/ifmis_style.css" />
<%
			String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
				//字体相关
		String styleName ="stylefontS.css";	
		if(session.getAttribute("StyleName")!=null){
		    styleName = (String)session.getAttribute("StyleName");
		}
%>
<TITLE>打印模板签章设置</TITLE>
<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/prototype.js"></script>
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName %>" />
 
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/choose.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/changescroll.js"></script>
<script type="text/javascript">
// 返回ID列复选框勾选的个数
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
//返回
function cancel(){
    var linkname = document.getElementById("hid").value;
	var url = "/system/print/query.do?linkname="+linkname;
	window.location.href = url;
}
//增加明细项
function addRow(){
			var formObject = $("form1");
			var row = new Object();
		   		 if(formObject.lleft.value==""){
      			 alert("请输入左边距！");
      			 return false;
   				 }
   				 if(formObject.ltop.value==""){
      			 alert("请输入上边距！");
      			 return false;
   				 }
   				 if(formObject.lzoom.value==""){
      			 alert("请输入缩放比例！");
      			 return false;
   				 }
		    row.reportid = formObject.reportid.value;
		    row.linkname = formObject.linkname.value;
		    row.sealname = formObject.sealname.value;
		    row.lleft = formObject.lleft.value;
		    row.ltop = formObject.ltop.value;
		    row.lzoom = formObject.lzoom.value;
			if(null == tmain.data)
			{
				tmain.data = new Array();
			}
			//清除原数据的选择状态
			if(tmain != null && tmain.data != null && tmain.data.length >0 ){
		         for(var i=0;i<tmain.data.length;i++){
		 	     tmain.data[i].checked=false;
		            } 
	          }
	        row.checked = true;
			tmain.data[tmain.data.length] = row;
			tmain.show();
			
			formObject.linkname.value = row.linkname;
			formObject.reportid.value = row.reportid
		    formObject.sealname.value = row.sealname;
			formObject.lleft.value = row.lleft;
			formObject.ltop.value = row.ltop;
			formObject.lzoom.value = row.lzoom;
			
		}
		//删除明细项
function deleteRow(){
            if (getSelectedCount() < 1) {
       			 alert("请选择要删除记录！");
        			return;
   				 }
			var formObject = $("form1");
			var delrow = tmain.getSelectedRow();
			var datas = tmain.data;
			if(confirm("确定删除所选数据吗？")){
				if(delrow != null){
                  tmain.removeSelected();
                 }
				clearFormInput(formObject);
				var nextrow = tmain.data[tmain.data.length-1];
                nextrow.checked = true;
                 formObject.reportid.value = nextrow.reportid;
		   		 formObject.linkname.value = nextrow.linkname;
		   		 formObject.sealname.value = nextrow.sealname;
		   		 formObject.lleft.value = nextrow.lleft;
		   		 formObject.ltop.value = nextrow.ltop;
		   		 formObject.lzoom.value = nextrow.lzoom;
				tmain.show();
			}
		}
		// 清除FORM中的可录入数据
		function clearFormInput(formObject){
		   // formObject.sealname.value ="";
			formObject.lleft.value = "";
			formObject.ltop.value = "";
			formObject.lzoom.value = "";
			// 清除FORM对应数据
			formObject.selectedRow = null;
		}
		//修改信息
		function changeData(){
			var formObject = $("form1");
			var row = tmain.getSelectedRow();
			if(row == null || row.length < 1){
				return;
			}
		    row[0].sealname = formObject.sealname.value;
		    row[0].lleft = formObject.lleft.value;
		    row[0].ltop = formObject.ltop.value;
		    row[0].lzoom = formObject.lzoom.value;
			tmain.show();
		}
		//保存
        function saveExit(){
			var formObject = $("form1");
			if(formObject.lleft.value==""){
      			 alert("请输入左边距！");
      			 return false;
   				 }
   				 if(formObject.ltop.value==""){
      			 alert("请输入上边距！");
      			 return false;
   				 }
   				 if(formObject.lzoom.value==""){
      			 alert("请输入缩放比例！");
      			 return false;
   				 }
			var reportid = document.getElementById("reportid").value
			var linkname = document.getElementById("hid").value;
			//if(null == tmain.data || tmain.data.length <= 0)
			//{
			//	alert("请增加明细项信息！");
			//return false;
			//}
			var json  = tmain.data.toJSON();
			
			var datas = tmain.data;
			for(var i=0;i<datas.length;i++){
					var count = 0;
					var data = datas[i];
					var id = data.sealname;
					for(var j=0;j<datas.length;j++){
					    if(id == datas[j].sealname){
					       count++;
					    }
					}
					if(count>1){
					   alert("签章名重复");
					   return false;
					}
				}
			if(confirm("确定保存数据吗？")){
			var result = "json="+json+"&linkname="+linkname+"&reportid="+reportid;
			var url = "/system/print/addseal.do?"
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
  			 alert("数据保存成功");
 		}
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
							签章设置信息
						</div>
					</li>
				</ul>
			</div>
			<!--请保留此div和a标签 	-->
			<div id="containerline7">
				<div id='tmain_div'
					style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
			</div>
	<script type="text/javascript">
	col = createColumnConfig();
	col.id = "sealname";
	col.name = "sealname";
	col.type = "S";
	col.title = "签章名";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "reportid";
	col.name = "reportid";
	col.type = "N";
	col.title = "打印ID";
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
	col.title = "链接名称";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	col = createColumnConfig();
	col.id = "lleft";
	col.name = "lleft";
	col.type = "S";
	col.title = "左边距";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "ltop";
	col.name = "ltop";
	col.type = "S";
	col.title = "上边距";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "lzoom";
	col.name = "lzoom";
	col.type = "S";
	col.title = "缩放比例";
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
	tmain.setTableHead(["serial","radio","linkname","reportid","sealname","lleft","ltop","lzoom"]);
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
			
			formObject.linkname.value = row.linkname;
			formObject.reportid.value = row.reportid;
			formObject.sealname.value = row.sealname;
			formObject.lleft.value = row.lleft;
			formObject.ltop.value = row.ltop;
			formObject.lzoom.value = row.lzoom;
			
			formObject.selectedRow = row;
		}
	</script>
	<div id="form_editor">
		<!-- InstanceBeginEditable name="EditRegion7" -->
		<div id="form_table_title_edit">
			<ul>
				<li class="top">
					<div>
						签章设置编辑区
					</div>
				</li>
			</ul>
		</div>
		<div id="edit_table" style="width:99%;">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<th nowrap="nowrap">
						链接名称
						<span>*</span>
					</th>
					<td nowrap="nowrap">
						<input type="text" name="linkname" style="width: 300px"
							value="<c:out value="${linkname}"/>" readonly="readonly" />
					</td>
				</tr>
				<tr>
					<th nowrap="nowrap">
						打印ID
					<span>*</span>
					</th>
					<td nowrap="nowrap">
						<input type="text" name="reportid" style="width: 300px"
							value="<c:out value="${reportid}"/>" readonly="readonly" />
					</td>
				</tr>
				<tr>
					<th nowrap="nowrap">
						签章名
						<span>*</span>
					</th>
					<td>
						<select name="sealname" style="width: 300px" onchange="changeData();">
						</select>
					</td>
				</tr>
				<tr>
					<th nowrap="nowrap">
						左边距
						<span>*</span>
					</th>
					<td nowrap="nowrap">
						<input type="text" name="lleft" style="width: 300px" onkeyup=" this.value=this.value.replace(/\D/g,'');changeData();" />
						
					</td>

				</tr>
				<tr>
					<th nowrap="nowrap">
						上边距
						<span>*</span>
					</th>
					<td nowrap="nowrap">
						<input type="text" name="ltop" style="width: 300px"  onkeyup="this.value=this.value.replace(/\D/g,'');changeData();"/>
					</td>
				</tr>
				<tr>
					<th nowrap="nowrap">
						缩放比例
						<span>*</span>
					</th>
					<td nowrap="nowrap">
						<input type="text" name="lzoom" style="width: 300px"  onkeyup="this.value=this.value.replace(/\D/g,'');changeData();"/>
					</td>
				</tr>
			</table>
		</div>
		<div id="confirm_exit_btn" style="margin-right:5px;">
			<input name="add" type="button" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'" value="增加明细" onclick="addRow()" />
			<input name="delete" type="button" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'" value="删除明细"
				onclick="deleteRow()" />
			<input name="submit2" type="button" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'" value="保存" onclick="saveExit()" />
			<input name="submit3" type="button" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'" value="返回" onclick="cancel();" />
		</div>
		</form>
		<script>
	           var element= <%=request.getAttribute("nameStr")%>;
               if(element!=null && element.length>0){
					for(var i = 0;i< element.length;i++){
						var oOption = document.createElement("OPTION");
						oOption.text=element[i].name;
						oOption.value=element[i].name;
						document.getElementById("sealname").add(oOption);
					}
				}
	</script>
</body>
<script>
function setFont(fontsize){
  	if(fontsize=="l"){
  	  document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontL.css';
      setFontSession("stylefontL.css");	
    }else if(fontsize=="m"){
      document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontM.css';
      setFontSession("stylefontM.css");	
    }else{
      document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontS.css';
      setFontSession("stylefontS.css"); 
    }
    setFontCookie(fontsize);
}
</script>