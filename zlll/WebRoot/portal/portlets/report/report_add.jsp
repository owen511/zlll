<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/ckeditor/ckeditor.js"></script>
<script type="text/javascript">
codeShowFlag =null;
<!--
function init(){
	$('topnum').value = 0;
}
var isboosave=false;
function removeUploadFile(){
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
function submitForm(){
		$("detailform").action="<%=request.getContextPath()%>/portal/report/save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
		$("detailform").submit();
}
function saveQuit(){
	var reportname = Trim(document.getElementById("reportname").value);
	var reportparam = Trim(document.getElementById("reportparam").value);
	var pserver = Trim(document.getElementById("report_pserver").value);
	var fcasip = Trim(document.getElementById("fcasip").value);
	var reportorimage = Trim(document.getElementById("reportorimage").value);
	if(reportname==null||reportname==""){
		alert("�����뱨������");
		return ;
	}
	if(reportname.length>50){
		alert("���ƹ���");
		return ;
	}
	if(reportparam==null||reportparam==""){
		alert("�����뱨�����");
		return ;
	}
	if(reportparam.length>255){
		alert("�����������");
		return ;
	}
	if(pserver==null||pserver==""){
		alert("������pserver");
		return ;
	}
	if(fcasip==null||fcasip==""){
		alert("�������ۺϲ�ѯ����IP");
		return ;
	}
	if(reportorimage==null||reportorimage==""){
		alert("�����뱨����ͼ��");
		return ;
	}

	submitForm();
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
		alert("�����뱨������");
		return ;
	}
	if(reportname.length>50){
		alert("���ƹ���");
		return ;
	}
	if(reportparam==null||reportparam==""){
		alert("�����뱨�����");
		return ;
	}
	if(reportparam.length>255){
		alert("�����������");
		return ;
	}
	if(pserver==null||pserver==""){
		alert("������pserver");
		return ;
	}
	if(fcasip==null||fcasip==""){
		alert("�������ۺϲ�ѯ����IP");
		return ;
	}
	if(reportorimage==null||reportorimage==""){
		alert("�����뱨����ͼ��");
		return ;
	}
	createScript(fcasip+'/fcas/js/outermouse.js',1);
	createScript(fcasip+'/fcas/js/zapatec.js',2);
	createScript(fcasip+'/fcas/js/tree.js',3);
	createScript(fcasip+'/fcas/js/outerchart.js',4);
	createScript(fcasip+'/fcas/system/fuscharinfor/js/FusionCharts.js',5);
	if(reportorimage == 0){
		var tableObj = queryout(reportparam);
		tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:pserver,acctYear:report_year,divId:'report_1',height:'210',width:'437',refresh:'0',fcasIp:fcasip,tparams:reportparam});
		
	}else{
		var tableObj = queryChartOut(reportparam);
		tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:pserver,acctYear:report_year,divId:'report_1',height:'210',width:'437',refresh:'0',fcasIp:fcasip,tparams:reportparam});
	}
}

//��̬����script����
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



function backCheckSave(){
		window.location.href("<%=request.getContextPath()%>/portal/report/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
}


var checkSubmitFlg = false;
    function checkSubmit() {
      if (checkSubmitFlg == true) {
         return false;
      }
      checkSubmitFlg = true;
      return true;
    }
   
   document.ondblclick = function docondblclick() {
    window.event.returnValue = false;
   }
   document.onclick = function doconclick() {
       if (checkSubmitFlg) {
         window.event.returnValue = false;
       }
   } 


function selectMutlElememt(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,checkflag,elementfilter,organtype){
    //wy add 20090923
    /** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
	  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
	  * 
	**/
	codeShowFlag=1;
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	window.checkflag = checkflag;
	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";;
	var notReturn = true;
    try{
        notReturn = eval(func);
	}catch(e){
		//���ɹ�,������,��û��ʵ�ָ÷���
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
    //�������Ĺ������� ganhua 20090509
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
    //wy add 20090923
    /** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
	  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
	  * 
	**/
	codeShowFlag=1;
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : document.getElementById("hidden_"+backinput.id).value;
	window.selvalue = selvalue;
	window.checkflag = checkflag;
	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";;
	var notReturn = true;
    try{
        notReturn = eval(func);
	}catch(e){
		//���ɹ�,������,��û��ʵ�ָ÷���
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
    //�������Ĺ������� ganhua 20090509
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
//-->
</script>
<body onload='init()'> 
<%
	String uid = (String) request.getAttribute("userCode");
	String report_sid = (String)request.getAttribute("report_sid");
	String report_year = (String) request.getAttribute("year");
 %>
<div style="height:220px;">
    <form name="detailform" id="detailform" action="#" method="post" >
    <input type="hidden" id="maindata" name="maindata" value=""/>
    <input type="hidden" id="optype" name="optype" value="add"/>
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						��������
					</div>
				</li>
			</ul>
		</div>
		<!-- �뱣����div��a��ǩ  -->
		<div style="height:180px;" id="edit_table">
		<ui:editform formid="detailform"  pagetype = "add" parsetype="link"/>
		<table id ="edittable" width="100%" border="2" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
		<tr> 
   		  <th class = 'thwidth'><div align=left>��������<font color="red">*</font></div></th>
		<td nowrap=nowrap  colspan="1"  align="left">
		<input id="reportname" name="reportname" value="" valueid="" type=text  class=text_pop style="width: 100px" />
		</td> 
		<th class = 'thwidth'><div align=left>�������<font color="red">*</font></div></th>
      <td nowrap=nowrap colspan="1" align="left">
		<input id="reportparam" name="reportparam" value="" valueid="" type=text  class=text_pop style="width: 100px" />
		</td> 
		</tr>
		<tr> 
      <th class = 'thwidth'><div align=left>pserver<font color="red">*</font></div></th>
      <td nowrap=nowrap colspan="1"  align="left">
		<input id="report_pserver" name="report_pserver" value="" valueid="" type=text  class=text_pop style="width: 100px" />http://ip:port/security/authservice
		 </td> 
		
		
		
		 <th class = 'thwidth'><div align=left>ˢ��ʱ��</div></th>
      <td nowrap=nowrap colspan="1" align="left">
		<input id="refresh" name="refresh" value="" valueid="" type=text  class=text_pop style="width: 100px" />-1����ˢ��--��λ����
		</td> 
		</tr> 
		<tr>
		<th class = 'thwidth'><div align=left>�ۺϲ�ѯ����IP<font color="red">*</font></div></th>
      <td nowrap=nowrap colspan="1" align="left">
		<input id="fcasip" name="fcasip" value="" valueid="" type=text  class=text_pop style="width: 100px" />http://192.168.3.128:7001 
		
		</td> 
   		 <th class = 'thwidth'><div align=left>�������ͼ��<font color="red">*</font></div></th>
      <td nowrap=nowrap colspan="1" align="left">
		<input id="reportorimage" name="reportorimage" value="" valueid="" type=text  class=text_pop style="width: 100px" />0������--1��ͼ�� 
		
		</td> 
       </tr> 
     <tr>
<th class = 'thwidth'><div align=left>Ԥ�㵥λ</div></th>
		<td nowrap=nowrap  colspan="1"  align="left"><input name="hidden_bdgagency" id="hidden_bdgagency" type="hidden">
		<input id="bdgagency" name="bdgagency" value=""  type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","bdgagency",this.form.bdgagency,false,"","bdgagency");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","bdgagency",this.form.bdgagency,false,"","bdgagency");null'></button>
		<img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick='document.getElementById("bdgagency").value="";document.getElementById("hidden_bdgagency").value="";'>
		</td> 

     <th class = 'thwidth'><div align=left>ָ�������</div></th>
      <td nowrap=nowrap colspan="1" align="left">
		<input name="hidden_bdgmanagedivision" id="hidden_bdgmanagedivision" type="hidden">
		<input id="bdgmanagedivision" name="bdgmanagedivision" value="" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","bdgmanagedivision",this,false,"","bdgmanagedivision");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","bdgmanagedivision",this.form.bdgmanagedivision,false,"","bdgmanagedivision");null'></button>
		<img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick='document.getElementById("bdgmanagedivision").value="";document.getElementById("hidden_bdgmanagedivision").value="";'>
		</td> 
		   </tr> 
    <tr>
    <th class = 'thwidth'><div align=left>��������</div></th>
       <td nowrap=nowrap colspan="1"  align="left">
		<input name="hidden_agentbank" id="hidden_agentbank" type="hidden">
		<input id="agentbank" name="agentbank" value="" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","agentbank",this,false,"","agentbank");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","agentbank",this.form.agentbank,false,"","agentbank");null'></button>
		<img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick='document.getElementById("agentbank").value="";document.getElementById("hidden_agentbank").value="";'>
		 </td> 
    
      <th class = 'thwidth'><div align="left">��������</div></th>
     <td nowrap=nowrap colspan="1"  align="left">
		<input name="hidden_clearbank" id="hidden_clearbank" type="hidden">
		<input id="clearbank" name="clearbank" value="" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","clearbank",this,false,"","clearbank");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","clearbank",this.form.clearbank,false,"","clearbank");null'></button>
		<img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick='document.getElementById("clearbank").value="";document.getElementById("hidden_clearbank").value="";'>
		</td>
    </tr> 
    <tr>
    <th class = 'thwidth'><div align="left">�鼯����</div></th>
     <td nowrap=nowrap colspan="1"  align="left">
		<input name="hidden_gatherbank" id="hidden_gatherbank" type="hidden">
		<input id="gatherbank" name="gatherbank" value="" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememtQtree(46000000,46000011,"5001","gatherbank",this,false,"","gatherbank");null' />
		<button onclick='selectMutlElememtQtree(46000000,46000011,"5001","gatherbank",this.form.gatherbank,false,"","gatherbank");null'></button>
		<img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick='document.getElementById("gatherbank").value="";document.getElementById("hidden_gatherbank").value="";'>
		</td>
    </tr>
  </table> 
		<br/>
		</div>
	<div id="confirm_exit_btn"> 
		<input type="button" id="look1" name="look2"  value="Ԥ��" onclick="look()" class="button_style">
		<input type="button" id="saveAndOut" name="save"  value="���沢�˳�" onclick="saveQuit()" class="button_style">
		<input type="button" name="cancel"  value="����" onclick="backCheckSave()" class="button_style">	
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