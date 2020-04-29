<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/ckeditor/ckeditor.js"></script>
<script>
var path;
function init(){
	var posttime='<%=request.getAttribute("posttime").toString() %>';
	var posttitle='<%=request.getAttribute("posttitle").toString() %>';
	var postlevel='<%=request.getAttribute("postposition").toString() %>';
	var topnum = '<%=request.getAttribute("topnum").toString() %>';
	var postorder = '<%=request.getAttribute("postorder").toString() %>';
	var filedisplay = '<%=request.getAttribute("filedisplay").toString() %>';
	$('posttime').value=posttime;
	$('posttitle').value=posttitle;
	$('postlevel').value=postlevel;
	$('topnum').value = topnum;
	$('postorder').value = postorder;
	$('filedisplay').value = filedisplay;
}

var isboosave=false;
function removeUploadFile(){
	if(document.getElementById('file')==null)return;
	var p=document.getElementById('file').parentNode;
	p.removeChild(document.getElementById('file'));
}
function savefile(){
	isboosave=true;
	var div=document.getElementById("detailform").parentNode;
	var p=document.getElementById('file').parentNode;
	var fileDiv=document.createElement("div");
	fileDiv.style.visibility='hidden';
	fileDiv.id='fileDiv';	
	var innerHTMLStr="<form action ='<%=request.getContextPath()%>/common/post/uploadFile.do' method='post' ENCTYPE='multipart/form-data' id='fileUploadForm' target='fileUploadIfr'>";
	innerHTMLStr=innerHTMLStr+"</form>";
	innerHTMLStr=innerHTMLStr+"<iframe name='fileUploadIfr' id='fileUploadIfr' src='no'></iframe>";
	fileDiv.innerHTML=innerHTMLStr;
	div.appendChild(fileDiv);
	var form = document.getElementById('fileUploadForm');
	
	form.appendChild(document.getElementById('file'));
	
	form.submit();
	p.appendChild(document.getElementById('file'));
}
function isNotUpload(){
	var locas=window.frames('fileUploadIfr').location.toString().split('/');
	if(locas[locas.length-1]=='no'){
		window.setTimeout("isNotUpload()",100);
	}else if(locas[locas.length-1]=='true'){
		alert('附件上传成功!');
		submitForm();
	}else {
		alert("上传失败！");
		isboosave=false;
		var div=document.getElementById('fileDiv');
		div.parentNode .removeChild(div);
		return true;
	}
}

function saveQuit(){
		if(addEditFormInput()){
				submitForm();
		}
}
function submitForm(){
	//removeUploadFile();//删除上传file标签
	subeditData();
	$("detailform").maindata.value  = Object.toJSON(editformobj);
	$("detailform").action="<%=request.getContextPath()%>/common/postqh/save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
	$("detailform").submit();
	document.getElementById("saveAndOut").disabled = true;
}
function backCheckSave(){
		window.location.href("<%=request.getContextPath()%>/common/postqh/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
}
function deleteFile(){
	new Ajax.Request("<%=request.getContextPath()%>/common/post/deleteFile.do?random="+Math.random(), 
   	{
   		parameters : "path="+<%=request.getAttribute("fileid")%>,
   		method: 'get', 
   		onComplete : showDeleteFile,
   		requestHeaders: {Accept: 'application/json'},
   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
     	netWorkEception();
        }
	}); 
}
function showDeleteFile(resp){
	var json = resp.responseText;  
	if(json||json=='true'){
		var button=document.getElementById('deleteFileButton');
		var file = document.createElement('input');
		file.id='file';file.name='file';file.type='file';
		var p = button.parentNode;
		p.replaceChild(document.createTextNode(''),p.firstChild);
		p.replaceChild(file,button);
		var fileid=document.getElementById('fileid');
		if(fileid!=null){
			fileid.parentNode.removeChild(fileid);
		}
	}else{
		alert("附件删除失败！");
	}
}
codeShowFlag =null;
function selectMutlElememt(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,checkflag,elementfilter,organtype){
    //wy add 20090923
    /** ganhua 20080304 在打开选择窗口前回调一个方法做某些事情
	  * 如：设置过滤条件，检查联动的其它控件是否选择值
	  * 
	**/
	codeShowFlag =1;
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	window.checkflag = checkflag;
	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";
	debugger;
	var notReturn = true;
    try{
        notReturn = eval(func);
	}catch(e){
		//不成功,不管它,当没有实现该方法
	}
	if(notReturn == false)
	{
		return;
	}
	var elementfilter = "";
	if(window.elementfilter){
		elementfilter = window.elementfilter;
	}

	var refererurl = ""+window.location.href;
	
	var url = ROOT_PATH+"/common/tree/openTreeUser.do?organtype="+organtype+"&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode
		+"&vchfieldcode="+vchfieldcode+"&elementfilter="+elementfilter
		+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var result = window.showModalDialog(url,window,"dialogHeight:500px;dialogWidth: 325px;resizable: No; status: No; help:No;");
	//var result = window.open(url, 'newWindow','dialogWidth=400px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
    //清楚窗体的过滤条件 ganhua 20090509
	if(window.elementfilter);
	{
		window.elementfilter = null;
	}
	if(result != null){
	    if(typeof(result)!="string"){
			if(backinput == null){
				backinput = $(vchfieldcode);
			}
			backinput.value = result.value;
			backinput.valueid = result.id;
			backinput.isleaf= result.isleaf;
			backinput.valuecode = result.valuecode;
			document.getElementById("hidden_"+backinput.id).value= result.valuecode;
		}
	}
	else
	{
	    if(backinput != null){
	        backinput.value = "";
			backinput.valueid = null;
			backinput.valuecode = "";
			document.getElementById("hidden_"+backinput.id).value= "";
	    } 
	 }
	 codeShowFlag=null;
}
</script>
<body onload='init()'>
<div>
    <form name="detailform" id="detailform" action="#" method="post" >
    <input type="hidden" id="maindata" name="maindata" value=""/>
    <input type="hidden" id="optype" name="optype" value="update"/>
    
    <input type="hidden" id="createtime" name="createtime" value="<%=request.getAttribute("createtime").toString()%>"/>
    <input type ="hidden" name ="id" id ="id" value="<c:out value="${id}" />"/>
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						修改公告
					</div>
				</li>
			</ul>
		</div>
		<!-- 请保留此div和a标签  -->
		<div id="edit_table">
		<ui:editform formid="detailform"  pagetype = "add" parsetype="link"/>
			<table id ="edittable" width="100%" border="2" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
		 <tr> 
		 <c:if test="${isauthority=='true'}">
   		   <th class = 'thwidth'><div align=left>预算单位</div></th>
		<td nowrap=nowrap  colspan="1"  align="left"><input name="hidden_bdgagency" id="hidden_bdgagency" type="hidden" value="<%=request.getAttribute("hidden_bdgagency") %>">
		<input id="bdgagency" name="bdgagency" value="<%=request.getAttribute("bdgagency") %>" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememt(46000000,46000011,"5001","bdgagency",this,false,"","bdgagency");null' />
		<button onclick='selectMutlElememt(46000000,46000011,"5001","bdgagency",this.form.bdgagency,false,"","bdgagency");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='clearInput(document.getElementById("bdgagency"));'>
		</td> 
		<th class = 'thwidth'><div align=left>指标管理处室</div></th>
      <td nowrap=nowrap colspan="1" align="left">
		<input name="hidden_bdgmanagedivision" id="hidden_bdgmanagedivision" type="hidden" value="<%=request.getAttribute("hidden_bdgmanagedivision") %>">
		<input id="bdgmanagedivision" name="bdgmanagedivision" value="<%=request.getAttribute("bdgmanagedivision") %>" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememt(46000000,46000011,"5001","bdgmanagedivision",this,false,"","bdgmanagedivision");null' />
		<button onclick='selectMutlElememt(46000000,46000011,"5001","bdgmanagedivision",this.form.bdgmanagedivision,false,"","bdgmanagedivision");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='clearInput(document.getElementById("bdgmanagedivision"));'>
		</td> 
      <th class = 'thwidth'><div align=left>代理银行</div></th>
      <td nowrap=nowrap colspan="1"  align="left">
		<input name="hidden_agentbank" id="hidden_agentbank" type="hidden" value="<%=request.getAttribute("hidden_agentbank") %>">
		<input id="agentbank" name="agentbank" value="<%=request.getAttribute("agentbank") %>"  valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememt(46000000,46000011,"5001","agentbank",this,false,"","agentbank");null' />
		<button onclick='selectMutlElememt(46000000,46000011,"5001","agentbank",this.form.agentbank,false,"","agentbank");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='clearInput(document.getElementById("agentbank"));'>
		 </td> </tr> 
     <tr> 
      <th class = 'thwidth'><div align="left">清算银行</div></th>
      <td nowrap=nowrap colspan="1"  align="left">
		<input name="hidden_clearbank" id="hidden_clearbank" type="hidden" value="<%=request.getAttribute("hidden_clearbank") %>">
		<input id="clearbank" name="clearbank" value="<%=request.getAttribute("clearbank") %>" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememt(46000000,46000011,"5001","clearbank",this,false,"","clearbank");null' />
		<button onclick='selectMutlElememt(46000000,46000011,"5001","clearbank",this.form.clearbank,false,"","clearbank");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='clearInput(document.getElementById("clearbank"));'>
		 <th class = 'thwidth'><div align="left">归集银行</div></th>
      <td nowrap=nowrap colspan="1"  align="left">
		<input name="hidden_gatherbank" id="hidden_gatherbank" type="hidden" value="<%=request.getAttribute("hidden_gatherbank") %>">
		<input id="gatherbank" name="gatherbank" value="<%=request.getAttribute("gatherbank") %>"  valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememt(46000000,46000011,"5001","gatherbank",this,false,"","gatherbank");null' />
		<button onclick='selectMutlElememt(46000000,46000011,"5001","gatherbank",this.form.gatherbank,false,"","gatherbank");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='clearInput(document.getElementById("gatherbank"));'>
		</td>
		 
		 <th class = 'thwidth'><div align="left">附件：</div></th>
		   <td nowrap=nowrap colspan="1"  align="left">
		<%
		Object path=request.getAttribute("filename");
		if(path==null||path.equals("")){
		%>
		<p ><input type="file" name='file' id="file"/></p>
		<%}else{ %>
		<p ><%=path.toString().substring(0,path.toString().length()>18?18:path.toString().length())%> 
		<input type="button" id='deleteFileButton' value="删除附件" onclick="deleteFile();"/></p>
		<input type="hidden" id="fileid" name="fileid" value="<%=request.getAttribute("fileid")%>"/>
		<%} 
		%>
		</td></c:if>
    </tr> 
  </table> 
		<br/>
		<p>
			<label for="editor2">公告内容：</label><br/>
			<textarea cols="80" id="editor2" name="editor2" rows="10">
			<%if(request.getAttribute("posttext")!=null){%>
			<%=request.getAttribute("posttext").toString()%>
			<% }%>
			</textarea>
			<script type="text/javascript">
				CKEDITOR.replace( 'editor2' );
			</script>
		</p>
			</div>
		<div id="confirm_exit_btn">
		<input type="button" id="saveAndOut" name="save"  value="保存并退出" onclick="saveQuit()" class="button_style">
		<input type="button" name="cancel"  value="返回" onclick="backCheckSave()" class="button_style">	
		</div>
	</form>
</div>
</body>
<SCRIPT LANGUAGE="JavaScript">

</SCRIPT>