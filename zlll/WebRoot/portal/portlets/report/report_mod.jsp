<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/ckeditor/ckeditor.js"></script>
<script>
var path;
function init(){
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
	var reportname = Trim(document.getElementById("reportname").value);
	var reportparam = Trim(document.getElementById("reportparam").value);
	var pserver = Trim(document.getElementById("report_pserver").value);
	var fcasip = Trim(document.getElementById("fcasip").value);
	var reportorimage = Trim(document.getElementById("reportorimage").value);
	if(reportname==null||reportname==""){
		alert("请输入报表名称");
		return ;
	}
	if(reportname.length>50){
		alert("名称过长");
		return ;
	}
	if(reportparam==null||reportparam==""){
		alert("请输入报表参数");
		return ;
	}
	if(reportparam.length>255){
		alert("报表参数过长");
		return ;
	}
	if(pserver==null||pserver==""){
		alert("请输入pserver");
		return ;
	}
	if(fcasip==null||fcasip==""){
		alert("请输入综合查询服务IP");
		return ;
	}
	if(reportorimage==null||reportorimage==""){
		alert("请输入报表还是图形");
		return ;
	}
	
	submitForm();
}
function submitForm(){
	$("detailform").action="<%=request.getContextPath()%>/portal/report/save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
	$("detailform").submit();
}
function backCheckSave(){
		window.location.href("<%=request.getContextPath()%>/portal/report/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
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

function look(){
	var reportname = Trim(document.getElementById("reportname").value);
	var reportparam = Trim(document.getElementById("reportparam").value);
	var pserver = Trim(document.getElementById("report_pserver").value);
	var fcasip = Trim(document.getElementById("fcasip").value);
	var reportorimage = Trim(document.getElementById("reportorimage").value);
	var report_sid = Trim(document.getElementById("report_sid").value);
	var report_uid = Trim(document.getElementById("report_uid").value);
	var report_year = Trim(document.getElementById("report_year").value);
	
	if(reportname==null||reportname==""){
		alert("请输入报表名称");
		return ;
	}
	if(reportname.length>50){
		alert("名称过长");
		return ;
	}
	if(reportparam==null||reportparam==""){
		alert("请输入报表参数");
		return ;
	}
	if(reportparam.length>255){
		alert("报表参数过长");
		return ;
	}
	if(pserver==null||pserver==""){
		alert("请输入pserver");
		return ;
	}
	if(fcasip==null||fcasip==""){
		alert("请输入综合查询服务IP");
		return ;
	}
	if(reportorimage==null||reportorimage==""){
		alert("请输入报表还是图形");
		return ;
	}
	//createScript(fcasip+'/fcas/js/outermouse.js',1);
	//createScript(fcasip+'/fcas/js/zapatec.js',2);
	//createScript(fcasip+'/fcas/js/tree.js',3);
	//createScript(fcasip+'/fcas/js/outerchart.js',4);
	//createScript(fcasip+'/fcas/system/fuscharinfor/js/FusionCharts.js',5);
	createScript_tem(fcasip+'/fcas/js/outermouse.js',1,function(){
			createScript_tem(fcasip+'/fcas/js/zapatec.js',2,function(){
				createScript_tem(fcasip+'/fcas/js/tree.js',3,function(){
					createScript_tem(fcasip+'/fcas/js/outerchart.js',4,function(){
						createScript_tem(fcasip+'/fcas/system/fuscharinfor/js/FusionCharts.js',5,function(){
							if(reportorimage == 0){
								var tableObj = queryout(reportparam);
								tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:pserver,acctYear:report_year,divId:'report_1',height:'210',width:'437',refresh:'0',fcasIp:fcasip,tparams:reportparam});
							}else{
								var tableObj = queryChartOut(reportparam);
								tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:pserver,acctYear:report_year,divId:'report_1',height:'210',width:'437',refresh:'0',fcasIp:fcasip,tparams:reportparam});
							}
						});
					});
				});
			});
		});
	
}
//动态创建script对象
function createScript(srcIp){
	srcIp += '/fcas/js/outermouse.js';
    if (document.getElementById("cgi_emotion_list123")){
		document.getElementsByTagName("HEAD")[0].removeChild(document.getElementById("cgi_emotion_list123"));
    }
    var s = document.createElement("SCRIPT");
    s.id="cgi_emotion_list123"; 
    document.getElementsByTagName("HEAD")[0].appendChild(s);
    s.src=srcIp;    
}
function createScript(srcIp,id){
    if (document.getElementById("cgi_emotion_list123"+id)){
		document.getElementsByTagName("HEAD")[0].removeChild(document.getElementById("cgi_emotion_list123"+id));
    }
    var s = document.createElement("SCRIPT");
    s.id="cgi_emotion_list123"+id; 
    document.getElementsByTagName("HEAD")[0].appendChild(s);
    s.src=srcIp;    
}

function createScript_tem(srcIp, divId, fn) {
		if (document.getElementById("cgi_emotion_list" + divId)) {
			document.getElementsByTagName("HEAD")[0].removeChild(document.getElementById("cgi_emotion_list" + divId));
		}
		var s = document.createElement("SCRIPT");
		s.id = "cgi_emotion_list" + divId;
		s.src = srcIp;
		s.onreadystatechange = function () {
			if (this.readyState == "complete" || this.readyState == "loaded") {
				if (fn != null) {
					fn();
				}
			}
		};
		document.getElementsByTagName("HEAD")[0].appendChild(s);
		return s;
	}


function Trim(TRIM_VALUE){
	if(TRIM_VALUE.length < 1){
		return"";
	}
	TRIM_VALUE = RTrim(TRIM_VALUE);
	TRIM_VALUE = LTrim(TRIM_VALUE);
	if(TRIM_VALUE==""){
		return "";
	}
	else{
		return TRIM_VALUE;
	}
} //End Function

function RTrim(VALUE){
	var w_space = String.fromCharCode(32);
	var v_length = VALUE.length;
	var strTemp = "";
	if(v_length < 0){
		return"";
	}
	var iTemp = v_length -1;

	while(iTemp > -1){
		if(VALUE.charAt(iTemp) == w_space){
		}
		else{
			strTemp = VALUE.substring(0,iTemp +1);
			break;
		}
		iTemp = iTemp-1;

	} //End While
	return strTemp;

} //End Function

function LTrim(VALUE){
	var w_space = String.fromCharCode(32);
	if(v_length < 1){
		return"";
	}
	var v_length = VALUE.length;
	var strTemp = "";
	var iTemp = 0;

	while(iTemp < v_length){
		if(VALUE.charAt(iTemp) == w_space){
			}
			else{
				strTemp = VALUE.substring(iTemp,v_length);
				break;
		}
		iTemp = iTemp + 1;
	} //End While
	return strTemp;
}
function selectMutlElememtQtree(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,checkflag,elementfilter,organtype){
	codeShowFlag=1;
	selvalue = backinput.valuecode != undefined ? backinput.valuecode : document.getElementById("hidden_"+backinput.id).value;
	
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
<body onload='init()'>
<%
	String id =request.getAttribute("id")!=null?(String)request.getAttribute("id"):"";
	String reportname =request.getAttribute("reportname")!=null?(String)request.getAttribute("reportname"):"";
	String reportparam =request.getAttribute("reportparam")!=null?(String)request.getAttribute("reportparam"):"";
	String pserver =request.getAttribute("pserver")!=null?(String)request.getAttribute("pserver"):"";
	String refresh =request.getAttribute("refresh")!=null?(String)request.getAttribute("refresh"):"";
	if(refresh.equalsIgnoreCase("null")){
		refresh = "";
	}
	//System.out.println(refresh+"-------------------------");
	String fcasip =request.getAttribute("fcasip")!=null?(String)request.getAttribute("fcasip"):"";
	String reportorimage =request.getAttribute("reportorimage")!=null?(String)request.getAttribute("reportorimage"):"0";
	String bdgagency =request.getAttribute("bdgagency")!=null?(String)request.getAttribute("bdgagency"):"";
	String bdgmanagedivision =request.getAttribute("bdgmanagedivision")!=null?(String)request.getAttribute("bdgmanagedivision"):"";
	String agentbank =request.getAttribute("agentbank")!=null?(String)request.getAttribute("agentbank"):"";
	String clearbank =request.getAttribute("clearbank")!=null?(String)request.getAttribute("clearbank"):"";
	String gatherbank =request.getAttribute("gatherbank")!=null?(String)request.getAttribute("gatherbank"):"";
	String uid = (String) request.getAttribute("userCode");
	String report_sid = (String)request.getAttribute("report_sid");
	String report_year = (String) request.getAttribute("year");
 %>
<div style="height:220px;">
    <form name="detailform" id="detailform" action="#" method="post" >
    <input type="hidden" id="maindata" name="maindata" value=""/>
    <input type="hidden" id="optype" name="optype" value="update"/>
    
    <input type ="hidden" name ="id" id ="id" value="<%=id %>" />
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						修改报表
					</div>
				</li>
			</ul>
		</div>
		<!-- 请保留此div和a标签  -->
		<div style="height:180px;" id="edit_table">
		<ui:editform formid="detailform"  pagetype = "add" parsetype="link"/>
			<table id ="edittable" width="100%" border="2" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
		 <tr> 
   		  <th class = 'thwidth'><div align=left>报表名称<font color="red">*</font></div></th>
		<td nowrap=nowrap  colspan="1"  align="left">
		<input id="reportname" name="reportname" value="<%=reportname %>" valueid="" type=text  class=text_pop style="width: 100px" />
		</td> 
		<th class = 'thwidth'><div align=left>报表参数<font color="red">*</font></div></th>
      <td nowrap=nowrap colspan="1" align="left">
		<input id="reportparam" name="reportparam" value="<%=reportparam %>" valueid="" type=text  class=text_pop style="width: 100px" />
		</td> 
		</tr> 
		
		
		
		 <tr> 
      <th class = 'thwidth'><div align=left>pserver<font color="red">*</font></div></th>
      <td nowrap=nowrap colspan="1"  align="left">
		<input id="report_pserver" name="report_pserver" value="<%=pserver %>" valueid="" type=text  class=text_pop style="width: 100px" />注：http://ip:port/security/authservice
		 </td> 
		 <th class = 'thwidth'><div align=left>刷新时间</div></th>
      <td nowrap=nowrap colspan="1" align="left">
		<input id="refresh" name="refresh" value="<%=refresh %>" valueid="" type=text  class=text_pop style="width: 100px" />注：-1：不刷新--单位：秒
		</td> 
		</tr> 
     <tr> 
		<th class = 'thwidth'><div align=left>综合查询服务IP<font color="red">*</font></div></th>
      <td nowrap=nowrap colspan="1" align="left">
		<input id="fcasip" name="fcasip" value="<%=fcasip %>" valueid="" type=text  class=text_pop style="width: 100px" />注：http://192.168.3.128:7001
		</td> 
		<th class = 'thwidth'><div align=left>报表或者图形<font color="red">*</font></div></th>
      <td nowrap=nowrap colspan="1" align="left">
		<input id="reportorimage" name="reportorimage" value="<%=reportorimage %>" valueid="" type=text  class=text_pop style="width: 100px" />0：报表--1：图形
		</td>
   		  
		</tr>
		<tr>
       <th class = 'thwidth'><div align=left>预算单位</div></th>
		<td nowrap=nowrap  colspan="1"  align="left"><input name="hidden_bdgagency" id="hidden_bdgagency" type="hidden" value="<%=request.getAttribute("hidden_bdgagency") %>">
		<input id="bdgagency" name="bdgagency" value="<%=bdgagency%>" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","bdgagency",this,false,"","bdgagency");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","bdgagency",this.form.bdgagency,false,"","bdgagency");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='document.getElementById("bdgagency").value="";document.getElementById("hidden_bdgagency").value="";'>
		</td> 
     <th class = 'thwidth'><div align=left>指标管理处室</div></th>
     <td nowrap=nowrap colspan="1" align="left">
		<input name="hidden_bdgmanagedivision" id="hidden_bdgmanagedivision" type="hidden" value="<%=request.getAttribute("hidden_bdgmanagedivision") %>">
		<input id="bdgmanagedivision" name="bdgmanagedivision" value="<%=bdgmanagedivision%>" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","bdgmanagedivision",this,false,"","bdgmanagedivision");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","bdgmanagedivision",this.form.bdgmanagedivision,false,"","bdgmanagedivision");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='document.getElementById("bdgmanagedivision").value="";document.getElementById("hidden_bdgmanagedivision").value="";'>
		</td> 
		 </tr> 
    <tr>
		  <th class = 'thwidth'><div align=left>代理银行</div></th>
       <td nowrap=nowrap colspan="1"  align="left">
		<input name="hidden_agentbank" id="hidden_agentbank" type="hidden" value="<%=request.getAttribute("hidden_agentbank") %>">
		<input id="agentbank" name="agentbank" value="<%=agentbank%>"  valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","agentbank",this,false,"","agentbank");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","agentbank",this.form.agentbank,false,"","agentbank");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='document.getElementById("agentbank").value="";document.getElementById("hidden_agentbank").value="";'>
		 </td>
      <th class = 'thwidth'><div align="left">清算银行</div></th>
     <td nowrap=nowrap colspan="1"  align="left">
		<input name="hidden_clearbank" id="hidden_clearbank" type="hidden" value="<%=request.getAttribute("hidden_clearbank") %>">
		<input id="clearbank" name="clearbank" value="<%=clearbank%>" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","clearbank",this,false,"","clearbank");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","clearbank",this.form.clearbank,false,"","clearbank");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='document.getElementById("clearbank").value="";document.getElementById("hidden_clearbank").value="";'>
   </td>
    </tr> 
    <tr>
     <th class = 'thwidth'><div align="left">归集银行</div></th>
     <td nowrap=nowrap colspan="1"  align="left">
		<input name="hidden_gatherbank" id="hidden_gatherbank" type="hidden" value="<%=request.getAttribute("hidden_gatherbank") %>">
		<input id="gatherbank" name="gatherbank" value="<%=gatherbank%>"  valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","gatherbank",this,false,"","gatherbank");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","gatherbank",this.form.gatherbank,false,"","gatherbank");null'></button>
		<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='document.getElementById("gatherbank").value="";document.getElementById("hidden_gatherbank").value="";'>
		</td>
    </tr>
  </table> 
		<br/>
			</div>
		<div id="confirm_exit_btn">
		<input type="button" id="look1" name="look2"  value="预览" onclick="look()" class="button_style">
		<input type="button" id="saveAndOut" name="save"  value="保存并退出" onclick="saveQuit()" class="button_style">
		<input type="button" name="cancel"  value="返回" onclick="backCheckSave()" class="button_style">	
		</div>
	</form>
</div>
<table style="desplay:none;">
 		<tr><td><input type="hidden" id="report_sid" value="<%=report_sid %>"></td></tr>
 		<tr><td><input type="hidden" id="report_uid" value="<%=uid %>"></td></tr>
 		<tr><td><input type="hidden" id="report_year" value="<%=report_year %>"></td></tr>
</table>
<div id="report_1" style="height:210px;">
</div>
</body>
<SCRIPT LANGUAGE="JavaScript">

</SCRIPT>