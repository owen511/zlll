<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import="gov.mof.framework.util.DBUtil"%>
<%@ page import="gov.mof.fasp.systemset.dto.SystemSetDTO"%>
<%@ page import="gov.mof.fasp.systemset.bpo.ISystemSetService"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	ISystemSetService systemSetService = (ISystemSetService) DBUtil.getBeanByName("fasp.systemset.systemSetBPO");
	String types="doc,txt,jpg,bmp,xls,png,swf";
	try{
		SystemSetDTO systemSetDTO = systemSetService.findSystemSetByCode("portal_postfiletype");
		if(systemSetDTO!=null&&systemSetDTO.isIsused())types = systemSetDTO.getParamdata();
	}catch(Exception e){}
	//当前系统日期
	java.text.SimpleDateFormat fm = new java.text.SimpleDateFormat("yyyyMMdd"); 
	String systemDate = fm.format(new java.util.Date());
%>
<script type="text/javascript" src="<%=request.getContextPath()%>/portal/ckeditor/ckeditor.js"></script>
<script>
var types='<%=types%>';
var path;
var sum=0;//记录改公告的附件数量
var temp;//记录要删除的附件
function init(){
	var posttime='<%=request.getAttribute("posttime").toString() %>';
	var posttitle='<%=request.getAttribute("posttitle").toString() %>';
	var postlevel='<%=request.getAttribute("postposition").toString() %>';
	var topnum = '<%=request.getAttribute("topnum").toString() %>';
	var postorder = '<%=request.getAttribute("postorder").toString() %>';
	var filedisplay = '<%=request.getAttribute("filedisplay").toString() %>';
	var posttype = '<%=request.getAttribute("posttype")%>';
	$('posttime').value=posttime;
	$('posttitle').value=posttitle;
	$('postlevel').value=postlevel;
	$('topnum').value = topnum;
	$('postorder').value = postorder;
	$('filedisplay').value = "0";
	if($('posttype')!=null){
		$('posttype').value = posttype;
	}
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
	var fileuploads = document.getElementsByName('file');
	for(var i=0;i<fileuploads.length;i++){
		form.appendChild(fileuploads[0]);
	}
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
	var overDate = document.getElementById('posttime').value;
	var systemDate = '<%=systemDate%>'
	if(overDate <= systemDate){
		alert('失效时间应大于当前系统时间');
		return;
	}
if(null!=document.getElementById("hidden_bdgagency")&&null!=document.getElementById("hidden_bdgmanagedivision")&&null!=document.getElementById("hidden_agentbank")&&null!=document.getElementById("hidden_clearbank")&&null!=document.getElementById("hidden_gatherbank")){
var useridc = document.getElementById("hidden_userid").value.split(",");

var bdgagencyc = document.getElementById("hidden_bdgagency").value;
var bdgmanagedivisionc = document.getElementById("hidden_bdgmanagedivision").value;
var agentbankc = document.getElementById("hidden_agentbank").value;
var clearbankc = document.getElementById("hidden_clearbank").value;
var gatherbankc = document.getElementById("hidden_gatherbank").value;
var uStrs = bdgagencyc+","+bdgmanagedivisionc+","+agentbankc+","+clearbankc+","+gatherbankc;
var uStr = uStrs.split(",");

if(useridc.length>0&&""!=useridc[0]){
	for(var u=0;u<useridc.length;u++){
	if(""!=useridc[u]&&(""!=bdgagencyc||""!=bdgmanagedivisionc||""!=agentbankc||""!=clearbankc||""!=gatherbankc)){
	var bs = u;
		for(var b=0;b<uStr.length;b++){
			if(uStr[b].indexOf("@u")!=-1){
				var bStr = uStr[b].split("@u");
				if(useridc[u]==bStr[1]){
					bs ++;
				}
			}		
		}
	if(u==bs){
		alert("[首页弹出公告用户]所选编码为["+useridc[u]+"]的用户必须有公告权限!\n\n您可以尝试在[预算单位][指标管理处室][代理银行][清算银行]或[归集银行]中分配公告权限!");
		return false;
	}
	}	
	}
	
}
}
	if($('postorder').value.trim().length==0||isNaN($('postorder').value.trim())||parseInt($('postorder').value.trim())<0||parseInt($('postorder').value.trim().length)>=5){
		alert('排序序号请输入大于0的4位有效数字类型');
		return;
	}
	//-------------------------------上传附件：如果上传多附件中有一个值为空那么不允许上传
		var fileuploads = document.getElementsByName('file');
		var fileuploadres=true;
		if(fileuploads.length>1){
			for(var i=0;i<fileuploads.length;i++){
				if(fileuploads[i].value==''){
					fileuploadres=false;
					break;
				}
			}
		}
		//----------------------------------------------------------
		if(addEditFormInput()){
			//-----------------上传附件：如果上传多附件中有一个值为空那么不允许上传
			if(!fileuploadres){
				alert("上传附件不能为空!");
				return false;
			}
			//---------------------
			if(!(document.getElementById('file')==null||document.getElementById('file').value==null||document.getElementById('file').value.length==0||document.getElementById('file').value==path)){//如果含有附件
				//判断附件类型
				//var fileType = document.getElementById('file').value.split(".");
				var fileTypes = document.getElementsByName('file');
				//var totleType = "doc,txt,jpg,bmp,xls,png,swf".split(",");
				//var totleType = types.split(",");
				var typeFlag = false;
				for(var j = 0;j< fileTypes.length;j++){
					fileType=fileTypes[j].value.split(".");
					//begin 楚艳红 2012.11.19 图片上传格式大小写兼容
					if(types.toUpperCase().indexOf(fileType[fileType.length-1].toUpperCase())==-1){
					//end 楚艳红 2012.11.19 图片上传格式大小写兼容
						 alert("附件类型只能支持（"+types+"）类型！");
		    			 return false;
					}
				}
				if(isboosave){
					alert("附件上传中请稍候...");
					return ;
				}
				savefile();//上传附件
				isNotUpload();
			}else{
				submitForm();
			}
		}
}
function submitForm(){
	removeUploadFile();//删除上传file标签
	subeditData();
	$("detailform").maindata.value  = Object.toJSON(editformobj);
	$("detailform").action="<%=request.getContextPath()%>/common/post/save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
	$("detailform").submit();
	document.getElementById("saveAndOut").disabled = true;
}
function backCheckSave(){
		window.location.href("<%=request.getContextPath()%>/common/post/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
}
function deleteFile(i){
	temp=i;
	sum--;
	//alert("要删除的附件id----"+document.getElementById("fileid"+i).value);
	//var t=document.getElementById("oldfileid").value;
	var ids=document.getElementById("oldfileid").value.replace(document.getElementById("fileid"+i).value+"@","").replace(document.getElementById("fileid"+i).value,"");
	if(ids.lastIndexOf("@")==ids.length){
	ids=ids.substring(0,ids.lastIndexOf("@"));
	}
	document.getElementById("oldfileid").value=ids;
	new Ajax.Request("<%=request.getContextPath()%>/common/post/deleteFile.do?random="+Math.random(), 
   	{
   		parameters : "path="+document.getElementById("fileid"+i).value,
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
	
		var fileid=document.getElementById('fileid'+temp);
		var deleteFileButton=document.getElementById('deleteFileButton'+temp);
		var br=document.getElementById('br'+temp);
		if(fileid!=null){
			fileid.parentNode.removeChild(fileid);
		}
		if(deleteFileButton!=null){
			deleteFileButton.parentNode.removeChild(deleteFileButton);
		}
		if(br!=null){
			br.parentNode.removeChild(br);
		}
		if(sum==0){
				var td=document.getElementById('fileid_wyx');
      			var br=document.createElement('br');
      			var input=document.createElement('<input name=file>');
      			var button=document.createElement('<input name=buttondel class=button_style>');
      			input.type="file";
      			td.appendChild(input);
      			td.appendChild(br);
		//adduploadfile();
	}
	}else{
		alert("附件删除失败！");
	}
}
codeShowFlag =null;
if(null!=document.getElementById("userid")){
var ids = document.getElementById("userid").value.toString().replaceAll(";",",");
}else{
var ids ="";
}
function selectMutlElememtQtree(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,checkflag,elementfilter,organtype){
	codeShowFlag=1;
	if(ids!=""&&ids!=null){
		 selvalue = ids;
	}else{
		 //selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
		 selvalue = backinput.valuecode != undefined ? backinput.valuecode : document.getElementById("hidden_"+backinput.id).value;
	}
	ids="";
	window.selvalue = selvalue;
	window.checkflag = checkflag;
	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";
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
	
	var url = ROOT_PATH+"/tree/openQTreeUser.do?organtype="+organtype+"&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode
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
			backQtreeResult(result,backinput);
		}
	}
	 codeShowFlag=null;
}
function backQtreeResult(result, backinput){
	var value=[], valueid=[], valuecode = [],hidvaluecode = []
	for(var pro in result) {
		var _resultObj = result[pro];
		if(typeof _resultObj != "object")continue;
		value.push(_resultObj.code,"-",_resultObj.name,";");
		valueid.push(_resultObj.itemid);
		if(_resultObj.label!=null){
			valuecode.push("@u"+_resultObj.code);
			hidvaluecode.push(_resultObj.label);
		}else{
			valuecode.push(_resultObj.code);
			hidvaluecode.push(_resultObj.code);
		}
	}
	backinput.value = value.join("");
	var id = valueid.join(",");
	backinput.valueid = id+",";
	backinput.valuecode = valuecode.join(",");
	try{
		document.getElementById("hidden_"+backinput.id).value= hidvaluecode.join(",");
  	}catch(e){}
}
</script>
<script>
	function clearvalue(){
		clearInput(document.getElementById("userid"));
		document.getElementById("hidden_userid").value="";
	}
	</script>
<%
	//获取是否是重庆的标志
	String ischongqing = null == request.getAttribute("ischongqing")?"false":(String)request.getAttribute("ischongqing");
 %>
<body onload='init()'>
<div>
    <form name="detailform" id="detailform" action="#" method="post" >
    <input type="hidden" id="maindata" name="maindata" value=""/>
    <input type="hidden" id="optype" name="optype" value="update"/>
      <input type="hidden" id="filedisplay" name="filedisplay" value=""/>
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
		<th class = 'thwidth'><div align=left>首页弹出公告用户</div></th>
		<td nowrap=nowrap  colspan="1"  align="left"><input name="hidden_userid" id="hidden_userid" type="hidden" value="<%=request.getAttribute("hidden_userid") %>">
		<input id="userid" name="userid" value="<%=request.getAttribute("userid") %>" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","userid",this,false,"","userid");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","userid",this.form.userid,false,"","userid");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='clearvalue();'>
		</td> </tr>
		
		 <c:if test="${isauthority=='true'}">
   		   <th class = 'thwidth'><div align=left>预算单位</div></th>
		<td nowrap=nowrap  colspan="1"  align="left"><input name="hidden_bdgagency" id="hidden_bdgagency" type="hidden" value="<%=request.getAttribute("hidden_bdgagency") %>">
		<input id="bdgagency" name="bdgagency" value="<%=request.getAttribute("bdgagency") %>" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","bdgagency",this,false,"","bdgagency");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","bdgagency",this.form.bdgagency,false,"","bdgagency");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='document.getElementById("bdgagency").value="";document.getElementById("hidden_bdgagency").value="";'>
		</td> 
		<th class = 'thwidth'><div align=left>指标管理处室</div></th>
		
		<%if(ischongqing.equals("true")){
		%>
		<td nowrap=nowrap colspan="1" align="left">
		<input name="hidden_bdgmanagedivision" id="hidden_bdgmanagedivision" type="hidden" value="<%=request.getAttribute("hidden_bdgmanagedivision") %>">
		<input id="bdgmanagedivision" name="bdgmanagedivision" value="<%=request.getAttribute("bdgmanagedivision") %>" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","mofdept",this,false,"","mofdept");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","mofdept",this.form.bdgmanagedivision,false,"","mofdept");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='document.getElementById("bdgmanagedivision").value="";document.getElementById("hidden_bdgmanagedivision").value="";'>
		</td> 
		<%
		}else{
		%>
		<td nowrap=nowrap colspan="1" align="left">
		<input name="hidden_bdgmanagedivision" id="hidden_bdgmanagedivision" type="hidden" value="<%=request.getAttribute("hidden_bdgmanagedivision") %>">
		<input id="bdgmanagedivision" name="bdgmanagedivision" value="<%=request.getAttribute("bdgmanagedivision") %>" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","bdgmanagedivision",this,false,"","bdgmanagedivision");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","bdgmanagedivision",this.form.bdgmanagedivision,false,"","bdgmanagedivision");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='document.getElementById("bdgmanagedivision").value="";document.getElementById("hidden_bdgmanagedivision").value="";'>
		</td> 
		<%
		} %>
	
      <th class = 'thwidth'><div align=left>代理银行</div></th>
      <td nowrap=nowrap colspan="1"  align="left">
		<input name="hidden_agentbank" id="hidden_agentbank" type="hidden" value="<%=request.getAttribute("hidden_agentbank") %>">
		<input id="agentbank" name="agentbank" value="<%=request.getAttribute("agentbank") %>"  valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","agentbank",this,false,"","agentbank");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","agentbank",this.form.agentbank,false,"","agentbank");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='document.getElementById("agentbank").value="";document.getElementById("hidden_agentbank").value="";'>
		 </td>
    </tr> 
	<tr> 
      <th class = 'thwidth'><div align="left">清算银行</div></th>
      <td nowrap=nowrap colspan="1"  align="left">
		<input name="hidden_clearbank" id="hidden_clearbank" type="hidden" value="<%=request.getAttribute("hidden_clearbank") %>">
		<input id="clearbank" name="clearbank" value="<%=request.getAttribute("clearbank") %>" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","clearbank",this,false,"","clearbank");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","clearbank",this.form.clearbank,false,"","clearbank");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='document.getElementById("clearbank").value="";document.getElementById("hidden_clearbank").value="";'>
		 <th class = 'thwidth'><div align="left">归集银行</div></th>
      <td nowrap=nowrap colspan="1"  align="left">
		<input name="hidden_gatherbank" id="hidden_gatherbank" type="hidden" value="<%=request.getAttribute("hidden_gatherbank") %>">
		<input id="gatherbank" name="gatherbank" value="<%=request.getAttribute("gatherbank") %>"  valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","gatherbank",this,false,"","gatherbank");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","gatherbank",this.form.gatherbank,false,"","gatherbank");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='document.getElementById("gatherbank").value="";document.getElementById("hidden_gatherbank").value="";'>
		</td></tr>
		 </c:if>

		
		 <tr>
		 <th class = 'thwidth'><div align="left">附件：</div></th>
		    <td nowrap=nowrap colspan="5"  align="left" id='fileid_wyx'>
		<%
		//Object path=request.getAttribute("filename");
		Object path=new Object();
		java.util.List list = (java.util.List)request.getAttribute("filename");
		if(list==null||list.size()==0){
		%>
		<p ><input type="file" name='file' id="file" style="background-color: #F0F0F0;"/><input type='button' value='添加附件' class="button_style" onclick='adduploadfile()'/></p>
		<input type="hidden" id="oldfileid"  name="oldfileid" value=''/>
		<%}else{
		    String fileid=request.getAttribute("fileid").toString();
		    String[] fileds=new String[list.size()];
		    fileds=fileid.split("@");
		    for(int i =0;i<list.size();i++){
     			path=list.get(i); %>
    			<SCRIPT LANGUAGE="JavaScript">
    			//alert(document.getElementById('userid').value);
			    var id='<%=fileds[i]%>';
			    sum='<%=list.size()%>';
			    </SCRIPT>
			    <% if(i==0){%>
					<p><input type='button' value='添加附件' class="button_style" onclick='adduploadfile()'/></p>
				<% }%>
				<% if(!path.toString().equals("")){%>
					<p  id="br<%=i%>"><%=path.toString().substring(0,path.toString().length()>18?18:path.toString().length())%> 
					<input type="button" id="deleteFileButton<%=i%>" class="button_style" value="移除附件" onclick="deleteFile(<%=i%>);"/></p>
					<input type="hidden" id="fileid<%=i%>"  name="fileid" value='<%=fileds[i]%>'/>
				<% }%>
			<% }%>
			<input type="hidden" id="oldfileid"  name="oldfileid" value='<%=fileid%>'/>
		<% }%>
			</td>
		<script type="text/javascript">
      		//添加附件功能
      		function adduploadfile(){
      			sum++;
      			var td=document.getElementById('fileid_wyx');
      			var br=document.createElement('br');
      			var input=document.createElement('<input name=file style="background-color: #F0F0F0;">');
      			var button=document.createElement('<input name=buttondel class=button_style>');
      			input.type="file";
      			//input.name="file";
      			button.type="button";
      			button.value="移除附件";
      			//button.class='button_style';
      			button.onclick=function(){
      				td.removeChild(br);
      				td.removeChild(input);
      				td.removeChild(button);
      			}
      			td.appendChild(input);
      			td.appendChild(button);
      			td.appendChild(br);
      		}
      	</script>
		
    </tr> 
  </table> 
		<br/>
		<p>
			<label for="editor2">公告内容：</label><br/>
			<textarea cols="80" id="editor2" name="editor2" rows="6" style="overflow:auto;">
			<%if(request.getAttribute("posttext")!=null){%>
			<%=request.getAttribute("posttext").toString()%>
			<% }else{%>
			&nbsp;
			<% }%>
			</textarea>
			<script type="text/javascript">
			CKEDITOR.replace('editor2',addUploadButton(this));
			function addUploadButton(editor){
			   CKEDITOR.on('dialogDefinition', function( ev ){

               var dialogName = ev.data.name;

               var dialogDefinition = ev.data.definition;

               if ( dialogName == 'image' ){

                   var infoTab = dialogDefinition.getContents( 'info' );

                   infoTab.add({

                       type : 'button',

                       id : 'upload_image',

                       align : 'center',

                       label : '上传',

                       onClick : function( evt ){

                           var thisDialog = this.getDialog();

                           var txtUrlObj = thisDialog.getContentElement('info', 'txtUrl');

                           var txtUrlId = txtUrlObj.getInputElement().$.id;

                           addUploadImage(txtUrlId);

                       }

                   }, 'browse'); //place front of the browser button

               }

           });

       }

        function addUploadImage(theURLElementId){

           var uploadUrl = "<%=request.getContextPath()%>/portal/portlets/post/imgupload.jsp"; //这是图片上传的页面的URL

           var imgUrl = window.showModalDialog(uploadUrl);
			
				  //在upload结束后通过js代码window.returnValue=...可以将图片url返回给imgUrl变量。

           var urlObj = document.getElementById(theURLElementId);

           urlObj.value = imgUrl;

           urlObj.fireEvent("onchange"); //触发url文本框的onchange事件，以便预览图片

       }
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