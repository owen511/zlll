<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
    	
    	 response.setHeader("Cache-Control","no-cache"); 
       response.setHeader("Pragma","no-cache"); 
       response.setDateHeader("Expires",0); 
  
    	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
			
%>
<HTML>
	<HEAD>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<script type="text/javascript" src="<%=basePath%>/js/prototype.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
<script language="javascript">
		var ROOT_PATH = "<%=basePath%>";
	//��ȡCodeȫ�ֱ���
	 var codeShowConfigs = new Array();
	 var codeShowConfigs_ =<%=request.getAttribute("CODESHOWCONFIG") %> ;
	 if(codeShowConfigs_ != null){
	  codeShowConfigs = codeShowConfigs_;
	}
	//ϵͳCODE���ò���
	var codeShowFlag =<%=request.getAttribute("CODESHOWFLAG") %> ;
	  	function back(){ 
	  	 var mainmenu = document.getElementById("meu").value;
	     var submenu = document.getElementById("seu").value;
	     var linkname = ft.linkname.value;
	     var param = ft.myparam.value;
	     window.location.href="/system/ui/showsetpageedit.do?linkname="+linkname+"&myparam="+param+'&submenu='+submenu+'&mainmenu='+mainmenu<c:if test='${param.elementvalue != null && param.elementvalue != ""}'>+'&elementvalue='+<c:out value="${param.elementvalue}"/></c:if>;
	}


//ajax��֤
function savetest(){
      var linkname = document.getElementById("linkname").value;
      var dbcolumnname = document.ft.dbcolumnname.value;
      var mainmenu = document.getElementById("meu").value;
      var submenu = document.getElementById("seu").value;
      var myparam = document.getElementById("mp").value;
      var result = "submenu="+submenu+'&mainmenu='+mainmenu+"&dbcolumnname="+dbcolumnname+"&linkname="+linkname+"&myparam="+myparam<c:if test='${param.elementvalue != null && param.elementvalue != ""}'>+"&elementvalue="+<c:out value='${param.elementvalue}'/></c:if>;
      var url = "/system/ui/updateajax.do?";
      var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: result,
						   	 onComplete : showResponse
						} 
	   				);   

}
  //����
function showResponse(tr){
      var strs = tr.responseText;
      if(strs == "false"){
           alert("����������ݿ��ֶ��Ѵ���");
           return;
      }
      var dbcolumnname = document.ft.dbcolumnname.value;
      var elementname = document.ft.elementname.value;
      var ordernum = document.ft.ordernum.value;
      var colspannum = document.ft.colspannum.value;
      var mainmenu = document.getElementById("meu").value;
      var submenu = document.getElementById("seu").value;
      var maxlengthvalue = document.ft.maxlengthvalue.value;
     // if(document.getElementById("showdefid").valueid!=null){
     // 	document.getElementById("showdefid").value = document.getElementById("showdefid").valueid;
     // }
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
      if(ordernum<1){
      alert("��ʾ˳�������ڵ���1");
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
     ft.action="/system/ui/addshowsetPageedit.do?submenu="+submenu+'&mainmenu='+mainmenu<c:if test='${param.elementvalue != null && param.elementvalue != ""}'>+'&elementvalue='+<c:out value="${param.elementvalue}"/></c:if>;
     ft.submit();
    }
    //��ʾ˳��ֻ��������
  function checkNumber()
{
if(!(((window.event.keyCode>=48)&&(window.event.keyCode<=57))||(window.event.keyCode==13)||(window.event.keyCode==46)||(window.event.keyCode==45)))
{
      window.event.keyCode=0;
      alert("�Բ���ֻ���������֡�");
}
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
 
 //ajax��֤
function savesquel(){
      var linkname = document.getElementById("linkname").value;
      var dbcolumnname = document.ft.dbcolumnname.value;
      var mainmenu = document.getElementById("meu").value;
      var submenu = document.getElementById("seu").value;
      var myparam = document.getElementById("mp").value;
      var result = "submenu="+submenu+'&mainmenu='+mainmenu+"&dbcolumnname="+dbcolumnname+"&linkname="+linkname+"&myparam="+myparam<c:if test='${param.elementvalue != null && param.elementvalue != ""}'>+'&elementvalue='+<c:out value="${param.elementvalue}"/></c:if>;
      var url = "/system/ui/updateajax.do?";
      var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: result,
						   	 onComplete : showResponses
						} 
	   				);   

}
//liyongze modify  ���沢����
function showResponses(tr){
      var strs = tr.responseText;
      if(strs == "false"){
           alert("����������ݿ��ֶ��Ѵ���");
           return;
      }
      var elementname = document.ft.elementname.value;
      var dbcolumnname = document.ft.dbcolumnname.value;
      var ordernum = document.ft.ordernum.value;
      var mainmenu = document.getElementById("meu").value;
      var submenu = document.getElementById("seu").value;
      var maxlengthvalue = document.ft.maxlengthvalue.value;
      var colspannum = document.ft.colspannum.value;
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
     ft.action="/system/ui/addsquelshowsetPageedit.do?submenu="+submenu+'&mainmenu='+mainmenu<c:if test='${param.elementvalue != null && param.elementvalue != ""}'>+'&elementvalue='+<c:out value="${param.elementvalue}"/></c:if>;
     ft.submit();
    }
  //����ҳ��ѡ��������
function onchangeshowconfig(value){
  var columncode = document.getElementById("dbcuname").value;
  if(document.getElementById("elename").value == ""){
     alert("������д�ֶ���");
     return;
  }
      var linkname = ft.linkname.value;
      window.open("<%=request.getContextPath()%>/system/ui/showlevelconfiglist.do?linkname="+linkname+'&dbcuname='+columncode+'&value='+value,"_blank","height=500,width=300,status=yes,scrollbars=yes,toolbar=no,menubar=no,location=no");
  }   
function returnresult(obj){
   document.getElementById("showid").value = obj.value;
    document.getElementById("showid").valueid = obj.valueid;
  }
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
		<TITLE>�Զ���༭��--����</TITLE>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
        <link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
	</HEAD>
	<!-- topmargin="16" marginheight="16" -->
	<BODY onload="" class="pop_body">
		<div id="popPage1">
			<div id="shenhe_title">
				<div id="shenhe_title_middle"></div>
			</div>
			<div id="form_table_title_edit" style="margin-right:20px;">
				<ul>
					<li class="top">
						<div>
							�༭������
						</div>
					</li>
				</ul>
			</div>

			<FORM name="ft" method="post"
				action="/system/ui/addshowsetPageedit.do">
				<input type="hidden" name="linkname"
					value="<%=request.getParameter("linkname")%>" />
					<!--������ ��� ��ʼ -->
					<input type="hidden" name="myparam" id="mp" value="<%=request.getParameter("myparam")%>" />
					<input type="hidden" name="mainmenu" id='meu' value="<c:out value="${mainmenu}"/>"/>
					<input type="hidden" name="submenu" id='seu' value="<c:out value="${submenu}"/>"/>
					<input type="hidden" id="db" value="<c:out value='${EditFormDTO.dbcolumnname}' />"/>
					<!--������ ��� ���� -->
				<!--�뱣����div��a��ǩ -->
				<div id="edit_table"  style="width:99%;height:520px;overflow-y:auto;">

					<table width="100%" id="tbl1" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<th nowrap="nowrap" width="15%">
								��ʾ˳��
								<font color="red">*</font>
							</th>
							<td nowrap="nowrap">
								<input type="text" name="ordernum" size="14"
									 onkeypress="checkNumber()" value="<c:out value='${EditFormDTO.ordernum}' />"/>
							</td>
							<th nowrap="nowrap">
							     �ֶ���
								<font color="red">*</font>
							</th>
							<td nowrap="nowrap" colspan="3">
							    <select name="dbcolumnname" onchange="aa(this)" id='dbcuname' style="width:99%">
							    </select>
							    </tr>
						<tr>
							<th nowrap="nowrap">
								��������
								<font color="red">*</font>
							</th>
							<td nowrap="nowrap">
								<input type="text" name="elementname" id="elename" size="14" value="<c:out value='${EditFormDTO.elementname}' />"/>
							</td>
						
							<th nowrap="nowrap">
								����ƾ֤��
							</th>
							<td nowrap="nowrap">
								<input type="text" name="vchcode" size="14" value="<c:out value='${EditFormDTO.vchcode}' />"/>
							</td>
							<th nowrap="nowrap">
								����
							</th>
							<td nowrap="nowrap">
								<select name="itemtype" id="itpe">
								<option value="input"
									<c:if test="${EditFormDTO.itemtype=='input'}"> selected </c:if>>
									input
								</option>
								<option value="inputtips"
									<c:if test="${EditFormDTO.itemtype=='inputtips'}"> selected </c:if>>
									inputtips
								</option>
								<option value="tree"
									<c:if test="${EditFormDTO.itemtype=='tree'}"> selected </c:if>>
									tree
								</option>
								<option value="inputtree"
									<c:if test="${EditFormDTO.itemtype=='inputtree'}"> selected </c:if>>
									inputtree
								</option>
								<option value="divtree"
									<c:if test="${EditFormDTO.itemtype=='divtree'}"> selected </c:if>>
									divtree
								</option>
								<option value="singlediv"
									<c:if test="${EditFormDTO.itemtype=='singlediv'}"> selected </c:if>>
									singlediv
								</option>
								<option value="select"
									<c:if test="${EditFormDTO.itemtype=='select'}"> selected </c:if>>
									select
								</option>
								<option value="date"
									<c:if test="${EditFormDTO.itemtype=='date'}"> selected </c:if>>
									date
								</option>
								
								<option value="dateym"
									<c:if test="${EditFormDTO.itemtype=='dateym'}"> selected </c:if>>
									dateym
								</option>
								
								
								<option value="img"
									<c:if test="${EditFormDTO.itemtype=='img'}"> selected </c:if>>
									img
								</option>
								<option value="textarea"
									<c:if test="${EditFormDTO.itemtype=='textarea'}"> selected </c:if>>
									textarea
								</option>
								<option value="isnumtocny"
									<c:if test="${EditFormDTO.itemtype=='isnumtocny'}"> selected </c:if>>
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
									<c:if test="${EditFormDTO.ismoney==1}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${EditFormDTO.ismoney!=1}"> selected </c:if>>
									��
								</option>
							</select>
							</td>
							<th nowrap="nowrap">
								�ɷ�Ϊ����
							</th>
							<td nowrap="nowrap">
								<select name="isnegative">
								<option value="1"
									<c:if test="${EditFormDTO.isnegative==1}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${EditFormDTO.isnegative!=1}"> selected </c:if>>
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
									<c:if test="${EditFormDTO.isvisiable=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${EditFormDTO.isvisiable!=1}"> </c:if>>
									��
								</option>
							</select>
							</td>
							
<!-- add by liyongze start -->					
							
	  					</tr>
	  					
						<tr>
						<th nowrap="nowrap">
								��ʾ����
							</th>
							<td nowrap="nowrap">
						<select name="maxlevel">
								<option value="maxlevel=1">
									һ��
								</option>
								<option value="maxlevel=2">
									����
								</option>
								<option value="maxlevel=3">
									����
								</option>
								<option value="" selected>
									ȫ��
								</option>
						</select>
							        
							</td>
							<th nowrap="nowrap">
								���Ƽ���
							</th>
							<td nowrap="nowrap">
					<select name="ctrllevel">
								<option value="ctrllevel=1">
									һ��
								</option>
								<option value="ctrllevel=2">
									����
								</option>
								<option value="ctrllevel=3">
									����
								</option>
								<option value="" selected>
									ȫ��
								</option>
					</select>
							</td>
<!-- add by liyongze end -->
						
							<th nowrap="nowrap">
								��������
							</th>
							<td nowrap="nowrap">
								<input type="text" name="showlevelconfig"
									class="main_lookup_input" id='showid' size="14" value="<c:out value='${EditFormDTO.showlevelconfig}' />"/>
									<button  class="t_btn" onclick="onchangeshowconfig(showid.valueid)" />
							</td>
							
							</tr>
							
							<tr>
							<th nowrap="nowrap">
								��¼
							</th>
							<td nowrap="nowrap">
								<select name="requirement">
								<option value="1"
									<c:if test="${EditFormDTO.requirement=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${EditFormDTO.requirement!=1}"> selected </c:if>>
									��
								</option>
							</select>
							</td>
							<th nowrap="nowrap">
								��¼˵��
							</th>
							<td nowrap="nowrap">
								<input type="text" name="requirementcomment"
									class="main_lookup_input" size="14" value="<c:out value='${EditFormDTO.requirementcomment}' />"/>
							</td>
						
							<th nowrap="nowrap">
								�������ĩ��
							</th>
							<td nowrap="nowrap">
								<select name="inputrule" id="inputrule">
								
								<option value="OnlySelectBottom"
									<c:if test="${EditFormDTO.inputrule=='OnlySelectBottom'}"> selected </c:if>>
									��
								</option>
								
								<option value=""
									<c:if test="${EditFormDTO.inputrule==null}"> selected </c:if>>
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
									<c:if test="${EditFormDTO.modifiable=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${EditFormDTO.modifiable!=1}"> </c:if>>
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
									<c:if test="${EditFormDTO.addmodifiable=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${EditFormDTO.addmodifiable!=1}"></c:if>>
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
									<c:if test="${EditFormDTO.addvisiable=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${EditFormDTO.addvisiable!=1}"> </c:if>>
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
									<c:if test="${EditFormDTO.updvisiable=='1'}"> </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${EditFormDTO.updvisiable!=1}"> </c:if>>
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
									<c:if test="${EditFormDTO.updmodifiable=='1'}"> </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${EditFormDTO.updmodifiable!=1}"> </c:if>>
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
									<c:if test="${EditFormDTO.auditmodifiable=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${EditFormDTO.auditmodifiable!=1}"> selected </c:if>>
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
									<c:if test="${EditFormDTO.auditvisiable=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${EditFormDTO.auditvisiable!=1}"> selected </c:if>>
									��
								</option>
							</select>
							</td>
							<th nowrap="nowrap">
								Ĭ��ֵ
							</th>
							<td nowrap="nowrap">
								<input type="text" name="defaultvalue" class="main_lookup_input" id='showdefid'
									size="14" value="<c:out value='${EditFormDTO.defaultvalue}' />" />
									<button onclick="ondefvalue()" ></button>
							</td>
						
							
							<th nowrap="nowrap">
								������ı��¼�
							</th>

							<td nowrap="nowrap">
								<input type="text" name="onpropertychange"
									class="main_lookup_input" size="14" readonly>
							</td>
							
						</tr>
						<tr>
						<th nowrap="nowrap">
								�����¼�
							</th>
							<td nowrap="nowrap">
								<input type="text" name="onkeyup" class="main_lookup_input"
									size="14" readonly>
							</td>
							<th nowrap="nowrap">
								����������¼�
							</th>
							<td nowrap="nowrap">
								<input type="text" name="onattribute" class="main_lookup_input"
									size="14" readonly>
							</td>
					    
							<th nowrap="nowrap">
								�������������ʽ�¼�
							</th>
							<td nowrap="nowrap">
								<input type="text" name="expressions" class="main_lookup_input"
									size="14" readonly>
							</td>
							
							
						</tr>
						
						<tr>
							
							<th nowrap="nowrap">
								�Ƿ�˳��ϸ��
							</th>
							<td >
								<select name="fromsource">
								<option value="1"
									<c:if test="${EditFormDTO.fromsource=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${EditFormDTO.fromsource!=1}"> </c:if>>
									��
								</option>
							</select>
							</td>
							<th nowrap="nowrap" >
								λ�ø���
							</th>
							<td nowrap="nowrap"  >
							
							<input type="text" size="14" name="colspannum" 
								 onkeypress="checkNumber()" value="1"/>
							</td>
							<th nowrap="nowrap" >
								������
							</th>
							<td nowrap="nowrap" >
							
							<input type="text" size="14" name="groupid" 
								 onkeypress="checkNumber()" />
							</td>
							
						</tr>
						<tr>
						<th nowrap="nowrap" >
								��󳤶�
							</th>
							<td nowrap="nowrap" colspan="5" >
								<input type="text"  size="14" id="maxlength" name="maxlengthvalue" 
									 onkeypress="checkNumber()" value="<c:out value='${EditFormDTO.maxlength}' />"/>&nbsp;&nbsp;&nbsp;<div id="textsizeshow" style="display:inline"></div>
							</td>
						</tr>
						<tr>
							<th nowrap="nowrap">
								��Ŀ�ɷ�����
							</th>
							<td nowrap="nowrap" colspan="5">
								<select name="isAddProgam">
								<option value="1"
									<c:if test="${EditFormDTO.isAddProgam=='1'}"> selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${EditFormDTO.isAddProgam!=1}"> selected </c:if>>
									��
								</option>
							</select>
							</td>
						</tr>
						<tr>
    						<th nowrap="nowrap" >��Ŀ��������</th>
    						<td nowrap="nowrap" colspan="5"><input id="repeatprogram" type="text" name="repeatprogram" size="10" style="width:100%;" value="<c:out value='${EditFormDTO.repeatprogram}'/>" /></td>							    
						</tr>
						<tr>
    					<th nowrap="nowrap">input���ݿ���</th>
    					<td  colspan="5">
	    					<input id="inputstyle" type="radio" name="inputstyle"  value="L" >����</input>
	    					<input id="inputstyle" type="radio" name="inputstyle"  value="M" >����</input>
	    					<input id="inputstyle" type="radio" name="inputstyle"  value="R" >����</input>
    					</td>											
						</tr>
						<tr>
    						<th nowrap="nowrap" >textarea�ĸ߶�</th>
    						<td nowrap="nowrap" colspan="5"><input id="textarearows" type="text" name="textarearows" size="10" style="width:100%;" value="<c:out value='${EditFormDTO.textarearows}'/>" /></td>							    
						</tr>
						<tr>
    						<th nowrap="nowrap" >��������</th>
    						<td nowrap="nowrap" colspan="5"><input id="elementfilter" type="text" name="elementfilter" size="10" style="width:100%;" value="<c:out value='${EditFormDTO.elementfilter}'/>" /></td>							    
						</tr>
						<tr>
    						<th nowrap="nowrap" >¼��У������</th>
    						<td nowrap="nowrap" colspan="5"><input id="chekinputstr" type="text" name="chekinputstr" size="10" style="width:100%;" value="<c:out value='${EditFormDTO.chekinputstr}'/>" /></td>							    
						</tr>
						<th nowrap="nowrap">
						��������ֶ���
						</th>
						<td nowrap="nowrap" colspan="5">
							<input id="clearjsfunction" type="text" name="clearjsfunction" size="10" style="width:100%;" value="<c:out value='${editformSetList.clearjsfunction}'/>" />
						</td>												
						<tr>
						<th nowrap="nowrap">
								�Զ��庯���¼�
						</th>
						<td nowrap="nowrap" colspan="5">
							   <textarea rows="5" name="jsfunction" style="width:100%;"  readonly ></textarea>
						</td>
						</tr>
					</table>
				<c:out value='${strs}'/>
				</div>
				<BR />
				<BR />
				<div id="confirm_exit_btn">
					<INPUT type="button" class="button_style" value="���沢����"
						onclick="savesquel()" />
					<INPUT type="button" name="buton" class="button_style"
						value="���沢����" onclick="savetest()" />
					<INPUT type="button" class="button_style" value="����"
						onclick="back()" />
				</div>
			</FORM>
			<script>
				var element= <%=request.getAttribute("nameStr")%>;
				if(element!=null && element.length>0){
					var arr = [{code:"isnumtocny",name:"��д���"}];
					element = arr.concat(element);
					for(var i = 0;i< element.length;i++){
						var oOption = document.createElement("OPTION");
						oOption.text=element[i].code+"-"+element[i].name;
						oOption.value=element[i].code;
						if(i==0){
							if( typeof(element[0].datasize) != "undefined"){
								document.getElementById("elename").value =element[0].name;
								document.getElementById("textsizeshow").innerHTML ="�ֶγ���Ϊ:"+element[0].datasize ;
							}else{
								document.getElementById("elename").value =element[0].name;
							}
							
						}
						oOption.onclick = function(){
							document.getElementById("elementname").value = "'"+element[i].name +"'";
							showDef();
						}
						document.getElementById("dbcolumnname").add(oOption);
						if(element[i].code == document.getElementById("db").value){
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
				//���ݲ�ͬ��ʾ���ݿ�������������ʾ���Ƿ����
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
		</div>
		<BR />
	</BODY>
</HTML>