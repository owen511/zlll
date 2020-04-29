<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);

	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/prototype.js"></script>
<script type="text/javascript" src="../../js/choose.js"></script>
<script type="text/javascript" src="../../js/changescroll.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/datatable.js"></script>
<TITLE>�Զ���༭��--�޸�</TITLE>
<style>
<!--
 select{
 width:110px;
 }
 textarea {
	width:100%;
}
-->
</style>
<script type="text/javascript">
var ROOT_PATH = "<%=basePath%>";
//��ȡCodeȫ�ֱ���
 var codeShowConfigs = new Array();
 var codeShowConfigs_ =<%=request.getAttribute("CODESHOWCONFIG") %> ;
 if(codeShowConfigs_ != null){
   codeShowConfigs = codeShowConfigs_;
 }
 //ϵͳCODE���ò���
 var codeShowFlag =<%=request.getAttribute("CODESHOWFLAG") %> ;
function updateback(){ 
      var mainmenu = document.getElementById("meu").value;
      var submenu = document.getElementById("seu").value;
	  var myparam = fft.myparam.value;
      var linkname = fft.linkname.value;
      window.location.href="/system/ui/showsetpageedit.do?linkname="+linkname+"&myparam="+myparam+'&submenu='+submenu+'&mainmenu='+mainmenu<c:if test='${param.elementvalue != null && param.elementvalue != ""}'>+'&elementvalue='+<c:out value="${param.elementvalue}"/></c:if>;
}
//��֤��ʾ˳��ֻ��������
 function checkNumber()
{
if(!(((window.event.keyCode>=48)&&(window.event.keyCode<=57))||(window.event.keyCode==13)||(window.event.keyCode==46)||(window.event.keyCode==45)))
{
      window.event.keyCode=0;
      alert("�Բ���ֻ���������֡�");
}
}
//ajax��֤
function savetest(){
      var linkname = document.getElementById("hid").value;
      var dbcolumnname = document.fft.dbcolumnname.value;
      var mainmenu = document.getElementById("meu").value;
      var submenu = document.getElementById("seu").value;
      var myparam = document.getElementById("myparam").value;
      var result = "submenu="+submenu+'&mainmenu='+mainmenu+"&dbcolumnname="+dbcolumnname+"&linkname="+linkname+"&myparam="+myparam<c:if test='${param.elementvalue != null && param.elementvalue != ""}'>+'&elementvalue='+<c:out value="${param.elementvalue}"/></c:if>;
      var url = "/system/ui/updateajax.do?";
      var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: result,
						   	 onComplete : showResponse
						} 
	   				);   

}
//��֤����Ϊ��
function showResponse(tr){
      var strs = tr.responseText;
      var dbcolumnname = document.fft.dbcolumnname.value;
      if(strs == "false" && document.getElementById("dbname").value !=dbcolumnname){
           alert("����������ݿ��ֶ��Ѵ���");
           return;
      }
      var elementname = document.fft.elementname.value;
      var ordernum = document.fft.ordernum.value;
      var colspannum = document.fft.colspannum.value;
      var mainmenu = document.getElementById("meu").value;
      var submenu = document.getElementById("seu").value;
      var myparam = document.getElementById("myparam").value;
      var maxlengthvalue = document.fft.maxlengthvalue.value;
       if(document.getElementById("showid").valueid!=null){
      document.getElementById("showid").value = document.getElementById("showid").valueid;
      }
       if(elementname==""){
       alert("����д��������");
       return;
       }
      if(dbcolumnname==""){
      alert("����д�ֶ���");
      return;
      }
     if(ordernum==""){
     alert("����д��ʾ˳��");
      return;
      }
      if(colspannum != ""){
      if(!forcheck(colspannum)){
     		alert( "����������������!"); 
     		return;
      }
       if(colspannum >5 || colspannum<1 ){
       	  alert("λ�ø���������ڵ���1��С�ڵ���5")
       	  return;
       }
     }
     if(maxlengthvalue != ""){
	     if(!forcheck(maxlengthvalue)){
	     	alert( "��󳤶�����������������!"); 
	     	return;
	     }
     }
     fft.action="/system/ui/updateshowsetpageedit.do?submenu="+submenu+'&mainmenu='+mainmenu+"&myparam="+myparam<c:if test='${param.elementvalue != null && param.elementvalue != ""}'>+'&elementvalue='+<c:out value="${param.elementvalue}"/></c:if>;;
     fft.submit();
    }
    function forcheck(ss){ 
		 var type = "^[0-9]*[1-9][0-9]*$"; 
	     var re = new RegExp(type); 
	    if(ss.match(re)==null) 
	     { 
	      return false;
	     }  else{
	       return true;
	     }
	} 

    
    //����ҳ��ѡ��������
function onchangeshowconfig(value){
 if(value == undefined){
  value =document.getElementById("showid").value;
 }
 var columncode = document.getElementById("dbcuname").value;
      var linkname = fft.linkname.value;
      window.open("<%=request.getContextPath()%>/system/ui/showlevelconfiglist.do?linkname="+linkname+'&dbcuname='+columncode+'&value='+value,"_blank","height=500,width=300,status=yes,scrollbars=yes,toolbar=no,menubar=no,location=no");
  }   
function returnresult(obj){
   document.getElementById("showid").value = obj.value;
    document.getElementById("showid").valueid = obj.valueid;
  }
//����ҳ��ѡ��Ĭ��ֵ
//Ĭ��ֵ������
function ondefvalue() {
	if (document.getElementById("elename").value == "") {
		alert("������д�ֶ���");
		return;
	}
	if (document.getElementById("itpe").value != "tree" && document.getElementById("itpe").value != "select") {
		alert("���ͱ���Ϊ������select��");
		return;
	}
	var mainmenu = document.getElementById("meu").value;
	var submenu = document.getElementById("seu").value;
	var dbcolumnname = document.getElementById("dbcuname").value;
	var vchcode = '<%=request.getAttribute("vchcode")%>';
	//�ж��Ƿ�ѡ����ĩ�����ƣ�ĩ�����ƽ�ֻ��ѡ��ĩ��
	var onlyObj = document.getElementById("inputrule");
	var selectedindex = onlyObj.selectedIndex;
	var OnlySelectBottom = onlyObj.options[selectedindex].value;
	document.getElementById("defaultvalue")["OnlySelectBottom"] = OnlySelectBottom;
	selectElememt(mainmenu, submenu, vchcode, dbcolumnname, document.getElementById("defaultvalue"));
	if (document.getElementById("defaultvalue").valueid != null) {
		if (document.getElementById("defaultvalue").value.indexOf("-") > -1) {
			document.getElementById("defaultvalue").value = document.getElementById("defaultvalue").valueid + "," + document.getElementById("defaultvalue").value;
		} else {
			document.getElementById("defaultvalue").value = document.getElementById("defaultvalue").valueid + "," + document.getElementById("defaultvalue").valuecode.replace(",", "") + "-" + document.getElementById("defaultvalue").value;
		}
		if (document.getElementById("defaultvalue").value == "undefined,") {
			document.getElementById("defaultvalue").value = "";
		}
	} else {
		document.getElementById("defaultvalue").value = "";
	}

}
    
</script>
<body class=pop_body>
	<div id="popPage1">
		<div id="shenhe_title">
			<div id="shenhe_title_middle"></div>
		</div>


		<div id="form_table_title_edit">
			<ul>
				<li class="top">
					<div>
						�༭������
					</div>
				</li>
			</ul>
		</div>
		<form id="editformlist" name="fft"
			action="/system/ui/updateshowsetpageedit.do" method="post">
			<input name="maindata" type="hidden" />
			<input type="hidden" name="mainmenu" id='meu'
				value="<c:out value="${mainmenu}"/>" />
			<input type="hidden" name="submenu" id='seu'
				value="<c:out value="${submenu}"/>" />
			<input type="hidden" id="dbname"
				value="<c:out value='${editformSetList.dbcolumnname}'/>" />
			<div id="edit_table" style="width:99%;height:520px;overflow-y:auto;">
				<table width="100%" id="tbl1" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<th nowrap="nowrap" width="15%">
							��ʾ˳��
							<font color="red">*</font>
						</th>
						<td nowrap="nowrap">
							<input type="text" name="ordernum" size="14"
								onkeypress="checkNumber()"
								value="<c:out value='${editformSetList.ordernum}'/>" />
						</td>
						<th nowrap="nowrap">
							�ֶ���
							<font color="red">*</font>
						</th>
						<td nowrap="nowrap" colspan="3">
							<select name="dbcolumnname" onchange="aa(this)" id='dbcuname'
								style="width:99%">
							</select>
						</td>
					</tr>
					<tr>
						<th nowrap="nowrap">
							��������
							<font color="red">*</font>
						</th>
						<td nowrap="nowrap">
							<input type="text" name="elementname" size="14" id="elename"
								value="<c:out value="${editformSetList.elementname}"/>" />
						</td>
						<th nowrap="nowrap">
							����ƾ֤��
						</th>
						<td nowrap="nowrap">
							<input type="text" name="vchcode" size="14"
								value="<c:out value="${editformSetList.vchcode}"/>" readonly />
						</td>
						<th nowrap="nowrap">
							����
						</th>
						<td nowrap="nowrap">
							<select name="itemtype" id='itpe'>
								<option value="input"
									<c:if test="${editformSetList.itemtype=='input'}"> selected </c:if>>
									input
								</option>
								<option value="inputtips"
									<c:if test="${editformSetList.itemtype=='inputtips'}"> selected </c:if>>
									inputtips
								</option>
								<option value="tree"
									<c:if test="${editformSetList.itemtype=='tree'}"> selected </c:if>>
									tree
								</option>
								<option value="inputtree"
									<c:if test="${editformSetList.itemtype=='inputtree'}"> selected </c:if>>
									inputtree
								</option>
								<option value="divtree"
									<c:if test="${editformSetList.itemtype=='divtree'}"> selected </c:if>>
									divtree
								</option>
								<option value="singlediv"
									<c:if test="${editformSetList.itemtype=='singlediv'}"> selected </c:if>>
									singlediv
								</option>
								<option value="select"
									<c:if test="${editformSetList.itemtype=='select'}"> selected </c:if>>
									select
								</option>
								<option value="img"
									<c:if test="${editformSetList.itemtype=='img'}"> selected </c:if>>
									img
								</option>
								<option value="date"
									<c:if test="${editformSetList.itemtype=='date'}"> selected </c:if>>
									date
								</option>
								
								<option value="dateym"
									<c:if test="${editformSetList.itemtype=='dateym'}"> selected </c:if>>
									dateym
								</option>
								
								<option value="textarea"
									<c:if test="${editformSetList.itemtype=='textarea'}"> selected </c:if>>
									textarea
								</option>
								<option value="isnumtocny"
									<c:if test="${editformSetList.itemtype=='isnumtocny'}"> selected </c:if>>
									isnumtocny
								</option>
							</select>
						</td>
					</tr>
					<tr>
						<th nowrap="nowrap">
							�Ƿ���
						</th>
						<td nowrap="nowrap">
							<select name="ismoney">
								<option value="1"
									<c:if test="${editformSetList.ismoney=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${editformSetList.ismoney!=1}"> selected </c:if>>
									��
								</option>
							</select>
						</td>
						<th nowrap="nowrap">
							�ɷ�Ϊ����
						</th>
						<td>
							<select name="isnegative">
								<option value="0"
									<c:if test="${editformSetList.isnegative!=1}"> selected </c:if>>
									��
								</option>
								<option value="1"
									<c:if test="${editformSetList.isnegative=='1'}"> selected </c:if>>
									��
								</option>
								
							</select>
						</td>
						<th nowrap="nowrap">
							��ʾ
						</th>
						<td>
							<select name="isvisiable">
								<option value="1"
									<c:if test="${editformSetList.isvisiable=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${editformSetList.isvisiable!=1}"> selected </c:if>>
									��
								</option>
							</select>
						</td>

						
					</tr>
					<tr>
					<!-- add by liyongze start -->
						<th nowrap="nowrap">
							��ʾ����
						</th>
						<td nowrap="nowrap">
							<select name="maxlevel">
								<option value="maxlevel=1"
									<c:if test="${editformSetList.maxlevel=='maxlevel=1'}"> selected </c:if>>
									һ��
								</option>
								<option value="maxlevel=2"
									<c:if test="${editformSetList.maxlevel=='maxlevel=2'}">  selected </c:if>>
									����
								</option>
								<option value="maxlevel=3"
									<c:if test="${editformSetList.maxlevel=='maxlevel=3'}"> selected </c:if>>
									����
								</option>
								<option value=""
									<c:if test="${editformSetList.maxlevel==null}">  selected </c:if>>
									ȫ��
								</option>
							</select>

						</td>
						<th nowrap="nowrap">
							���Ƽ���
						</th>
						<td nowrap="nowrap">
							<select name="ctrllevel">
								<option value="ctrllevel=1"
									<c:if test="${editformSetList.ctrllevel=='ctrllevel=1'}"> selected </c:if>>
									һ��
								</option>
								<option value="ctrllevel=2"
									<c:if test="${editformSetList.ctrllevel=='ctrllevel=2'}"> selected </c:if>>
									����
								</option>
								<option value="ctrllevel=3"
									<c:if test="${editformSetList.ctrllevel=='ctrllevel=3'}"> selected </c:if>>
									����
								</option>
								<option value=""
									<c:if test="${editformSetList.ctrllevel==null}"> selected </c:if>>
									ȫ��
								</option>
							</select>

						</td>
						<!-- add by liyongze end -->
						<th nowrap="nowrap">
							��������
						</th>
						<td nowrap="nowrap">
							<input type="text" name="showlevelconfig" size="14" id='showid'
								value="<c:out value='${editformSetList.showlevelconfig}'/>" />
							<button class="t_btn" onclick="onchangeshowconfig(showid.valueid)" />
						</td>
						
					</tr>
					<tr>
					<th nowrap="nowrap">
							��¼
						</th>
						<td nowrap="nowrap">
							<select name="requirement">
								<option value="1"
									<c:if test="${editformSetList.requirement=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${editformSetList.requirement!=1}"> selected </c:if>>
									��
								</option>
							</select>
						</td>
						<th nowrap="nowrap">
							��¼˵��
						</th>
						<td nowrap="nowrap">
							<input type="text" name="requirementcomment" size="14"
								value="<c:out value='${editformSetList.requirementcomment}'/>" />
						</td>
						<th nowrap="nowrap">
							�������ĩ��
						</th>
						<td nowrap="nowrap">
							<select name="inputrule" id="inputrule">

								<option value="OnlySelectBottom"
									<c:if test="${editformSetList.inputrule=='OnlySelectBottom'}"> selected </c:if>>
									��
								</option>

								<option value=""
									<c:if test="${editformSetList.inputrule==null}"> selected </c:if>>
									��
								</option>
							</select>
						</td>
						
					</tr>
					<tr>
						<th nowrap="nowrap">
							�����޸�
						</th>
						<td nowrap="nowrap">
							<select name="modifiable">
								<option value="1"
									<c:if test="${editformSetList.modifiable=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${editformSetList.modifiable!=1}"> selected </c:if>>
									��
								</option>
							</select>
						</td>
						<th nowrap="nowrap">
							¼�������ɸ�
						</th>
						<td nowrap="nowrap">
							<select name="addmodifiable">
								<option value="1"
									<c:if test="${editformSetList.addmodifiable=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${editformSetList.addmodifiable!=1}"> selected </c:if>>
									��
								</option>
							</select>
						</td>
						<th nowrap="nowrap">
							¼��������ʾ
						</th>
						<td nowrap="nowrap">
							<select name="addvisiable">
								<option value="1"
									<c:if test="${editformSetList.addvisiable=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${editformSetList.addvisiable!=1}"> selected </c:if>>
									��
								</option>
							</select>
						</td>
						
					</tr>
					<tr>
					<th nowrap="nowrap">
							¼���޸���ʾ
						</th>
						<td nowrap="nowrap">
							<select name="updvisiable">
								<option value="1"
									<c:if test="${editformSetList.updvisiable=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${editformSetList.updvisiable!=1}"> selected </c:if>>
									��
								</option>
							</select>
						</td>
						<th nowrap="nowrap">
							¼���޸Ŀɸ�
						</th>
						<td nowrap="nowrap">
							<select name="updmodifiable">
								<option value="1"
									<c:if test="${editformSetList.updmodifiable=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${editformSetList.updmodifiable!=1}"> selected </c:if>>
									��
								</option>
							</select>
						</td>
						<th nowrap="nowrap">
							��˿ɸ�
						</th>
						<td nowrap="nowrap">
							<select name="auditmodifiable">
								<option value="1"
									<c:if test="${editformSetList.auditmodifiable=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${editformSetList.auditmodifiable!=1}"> selected </c:if>>
									��
								</option>
							</select>
						</td>
						
					</tr>
					<tr>
						<th nowrap="nowrap">
							����޸���ʾ
						</th>
						<td nowrap="nowrap">
							<select name="auditvisiable">
								<option value="1"
									<c:if test="${editformSetList.auditvisiable=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${editformSetList.auditvisiable!=1}"> selected </c:if>>
									��
								</option>
							</select>
						</td>
						<th nowrap="nowrap">
							Ĭ��ֵ
						</th>
						<td nowrap="nowrap">
							<input type="text" name="defaultvalue" size="14" id='showdefid'
								value="<c:out value='${editformSetList.defaultvalue}'/>" />
							<button onclick="ondefvalue()"></button>
						</td>
						<th nowrap="nowrap">
							������ı��¼�
						</th>

						<td nowrap="nowrap">
							<input type="text" name="onpropertychange" size="14"
								value="<c:out value='${editformSetList.onpropertychange}'/>"
								readonly />
						</td>
						
					</tr>
					<tr>
						<th nowrap="nowrap">
							�����¼�
						</th>
						<td nowrap="nowrap">
							<input type="text" name="onkeyup" size="14"
								value="<c:out value='${editformSetList.onkeyup}'/>" readonly />
						</td>
						<th nowrap="nowrap">
							����������¼�
						</th>
						<td nowrap="nowrap">
							<input type="text" name="onattribute" size="14"
								value="<c:out value='${editformSetList.onattribute}'/>" readonly />
						</td>

						<th nowrap="nowrap">
							�������������ʽ�¼�
						</th>
						<td nowrap="nowrap" >
							<input type="text" name="expressions" size="14"
								value="<c:out value='${editformSetList.expressions}'/>" readonly />
						</td>
						
						
					</tr>
					<tr>
						<th nowrap="nowrap">
								�Ƿ�˳��ϸ��
							</th>
							<td>
								<select name="fromsource">
									<option value="1"
										<c:if test="${editformSetList.fromsource=='1'}"> selected </c:if>>
										��
									</option>
									<option value="0"
										<c:if test="${editformSetList.fromsource!=1}"> selected </c:if>>
										��
									</option>
								</select>
							</td>
							<th nowrap="nowrap" >
							λ�ø���
						</th>
						<td nowrap="nowrap"  >
							<input type="text" name="colspannum" 
								 onkeypress="checkNumber()" size="14" value="<c:out value='${editformSetList.colspannum}' />"/>
						</td>
						<th nowrap="nowrap" >
							������
						</th>
						<td nowrap="nowrap"  >
							<input type="text" name="groupid" 
								 onkeypress="checkNumber()" size="14" value="<c:out value='${editformSetList.groupid}' />"/>
						</td>
						
					</tr>
					<tr>
						<th nowrap="nowrap" >
								��󳤶�
							</th>
							<td nowrap="nowrap" colspan="5">
								<input type="text" size="14" id="maxlength" name="maxlengthvalue" 
									 onkeypress="checkNumber()" value="<c:out value='${editformSetList.maxlength}' />"/>&nbsp;&nbsp;&nbsp;<div id="textsizeshow" style="display:inline">
							</td>
					</tr>
					<tr>
							<th nowrap="nowrap">
								��Ŀ�ɷ�����
							</th>
							<td nowrap="nowrap" colspan="5">
								<select name="isAddProgam">
								<option value="1"
									<c:if test="${editformSetList.isAddProgam=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${editformSetList.isAddProgam!=1}"> selected </c:if>>
									��
								</option>
							</select>
							</td>
						</tr>
					<tr>
    					<th nowrap="nowrap">��Ŀ��������</th>
    					<td  colspan="5"><input id="repeatprogram" type="text" name="repeatprogram" size="10" style="width:100%;" value="<c:out value='${editformSetList.repeatprogram}'/>" /></td>											
					</tr>
					<tr>
    					<th nowrap="nowrap">input���ݿ���</th>
    					<td  colspan="5">
	    					<input id="inputstyle" type="radio" name="inputstyle"  value="L" <c:if test="${editformSetList.inputStyle=='L'}"> checked </c:if>>����</input>
	    					<input id="inputstyle" type="radio" name="inputstyle"  value="M" <c:if test="${editformSetList.inputStyle=='M'}"> checked </c:if>>����</input>
	    					<input id="inputstyle" type="radio" name="inputstyle"  value="R" <c:if test="${editformSetList.inputStyle=='R'}"> checked </c:if>>����</input>
    					</td>											
					</tr>
					<tr>
   						<th nowrap="nowrap" >textarea�ĸ߶�</th>
   						<td nowrap="nowrap" colspan="5"><input id="textarearows" type="text" name="textarearows" size="10" style="width:100%;" value="<c:out value='${editformSetList.textarearows}'/>" /></td>							    
					</tr>
					<tr>
    					<th nowrap="nowrap">��������</th>
    					<td  colspan="5"><input id="elementfilter" type="text" name="elementfilter" size="10" style="width:100%;" value="<c:out value='${editformSetList.elementfilter}'/>" /></td>											
					</tr>
					<tr>
    					<th nowrap="nowrap">¼��У������</th>
    					<td  colspan="5"><input id="chekinputstr" type="text" name="chekinputstr" size="10" style="width:100%;" value="<c:out value='${editformSetList.chekinputstr}'/>" /></td>											
					</tr>
					<tr>
						<th nowrap="nowrap">
						��������ֶ���
						</th>
						<td nowrap="nowrap" colspan="5">
							<input id="clearjsfunction" type="text" name="clearjsfunction" size="10" style="width:100%;" value="<c:out value='${editformSetList.clearjsfunction}'/>" />
						</td>
					</tr>					
					<tr>
						<th nowrap="nowrap">
							�Զ��庯���¼�
						</th>
						<td nowrap="nowrap" colspan="5">
							<textarea rows="5" name="jsfunction" style="width:100%;" readonly>
								<c:out value='${editformSetList.jsfunction}' />
							</textarea>
						</td>
					</tr>
					
				</table>
				<c:out value='${strs}' />
			</div>
			<div id="showhelp"></div>
			<input type="hidden" name="linkname" id='hid'
				value="<%=request.getParameter("linkname")%>" />

			<input type="hidden" id="myparam" 
				value="<%=request.getParameter("myparam")%>" />

			<input type="hidden" name="box"
				value="<%=request.getParameter("box")%>" />
			<div id="confirm_exit_btn">
				<INPUT type="button" name="buton" class="button_style" value="���沢����"
					onclick="savetest()" />
				<INPUT type="button" class="button_style" value="����"
					onclick="updateback()" />
			</div>
		</form>
		<script>
				var element= <%=request.getAttribute("nameStr")%>;
				if(element!=null && element.length>0){
					var arr = [{code:"isnumtocny",name:"��д���"}];
					element = arr.concat(element);
					for(var i = 0;i< element.length;i++){
						var oOption = document.createElement("OPTION");
						oOption.text=element[i].code+"-"+element[i].name;
						oOption.value=element[i].code;
						
						oOption.onclick = function(){
							document.getElementById("elementname").value = "'"+element[i].name +"'";			
						}
						document.getElementById("dbcolumnname").add(oOption);
						if(element[i].code == document.getElementById("dbname").value){
							if( typeof(element[i].datasize) != "undefined"){
								document.getElementById("textsizeshow").innerHTML = "�ֶγ���Ϊ:"+element[i].datasize;
							}
								
							showDef();
						  	oOption.selected = true;
						}
					}
				}
				function aa(obj){
					if(typeof(element[obj.selectedIndex].datasize) != "undefined"){
						document.getElementById("elementname").value=element[obj.selectedIndex].name;
						document.getElementById("textsizeshow").innerHTML ="�ֶγ���Ϊ:"+element[obj.selectedIndex].datasize ;
					}else{
						document.getElementById("elementname").value=element[obj.selectedIndex].name;
						document.getElementById("textsizeshow").innerHTML ="";
					}
					showDef();
				}
				showDef();
				function showDef(){
					var defobj = document.getElementById("tbl1").childNodes[0].childNodes[11];
					var repeatobj = document.getElementById("tbl1").childNodes[0].childNodes[12];
					var columnname = document.getElementById("dbcolumnname").value;
					if(columnname == "program"){
						defobj.style.display = "block";
						repeatobj.style.display = "block";
					}else{
						defobj.style.display = "none";
						repeatobj.style.display = "none";
					}
					//���ʱ��󳤶���ʾ
					if(columnname == "amt"){
						document.getElementById('maxlength').parentNode.parentNode.style.display = "none";
					}else{
						document.getElementById('maxlength').parentNode.parentNode.style.display = "block";
					}	
				}
			</script>
</body>
