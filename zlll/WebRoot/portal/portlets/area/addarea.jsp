<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<div>
    <form name="AreaForm" id="AreaForm" action="#" method="post" >
    <input type="hidden" id="maindata" name="maindata" value=""/>
    <input type="hidden" id="optype" name="optype" value="add"/>
		<div id="form_table_title" >
			<ul>
				<li class="top">
					<div>
						������������
					</div>
				</li>
			</ul>
		</div>
		<!-- �뱣����div��a��ǩ  -->
		<div id="edit_table" style="height:400px;">
		<!--��link�����༭�� -->
		<div id="editform" onkeydown = "switchFocus()"> 
		<table id ="edittable" width="100%" border="0" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
		   <tr> 
		      <th class = 'thwidth'><div align=left>���<span>*</span></div></th>
		      <td nowrap=nowrap  colspan="1"  align="left">
		      	<input name=year id=year type="text" style="text-align:left"  maxlength="250"  class="textmin" title=""  />
			  </td> 
		      <th class = 'thwidth'><div align=left>������ʶ��<span>*</span></div></th>
		      <td nowrap=nowrap colspan="1" align="left">
		      	<input name=code id=code type="text" style="text-align:left"  maxlength="250"  class="textmin" title=""    />
			  </td> 
		      <th class = 'thwidth'><div align=left>����<span>*</span></div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		      	<input name=name id=name type="text" style="text-align:left"  maxlength="250"  class="textmin" title=""  />
		   </tr> 
		   <tr> 
		      <th class = 'thwidth'><div align="left">��������ַ<span>*</span></div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		      	<input name=url id=url type="text" style="text-align:left"  maxlength="250"  class="textmin" title="" />
		 	  </td>
		      <th class = 'thwidth'><div align="left">����Դ<span>*</span></div></th>
		      <td nowrap=nowrap colspan="3"  align="left">
		      	<input name=inditext id=inditext type="text" style="text-align:left;"  maxlength="250"  class="textmin" title=""  />
		      </td>
          </tr> 
      </table> 
    </div> 
	<input name=submenu id=submenu type="hidden"
		value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden"
		value="<c:out value='${param.mainmenu}'/>" />
	<div id="querybutton"> 
		<div align="right">
			<input type="button" id="saveAndOut" name="save"  value="����" onclick="saveArea()" class="button_style" >
			<input type="button" id="cancel"   name="cancel"  value="����" onclick="cancelSave()" class="button_style">	
		</div>
	</div>
</form>
<script type="text/javascript">
	function checkInput(formObject){
		if(formObject.acctyear.value.trim() == ""){
			alert("���������!");
			return false;
		}
		if(formObject.areaflag.value.trim() == ""){
			alert("������ʶ��!");
			return false;
		}
		if(formObject.areaname.value.trim() == ""){
			alert("�������������!");
			return false;
		}
		if(formObject.serverUrl.value.trim() == ""){
			alert("�������������ַ!");
			return false;
		}
		
		if(formObject.datasource.value.trim() == ""){
			alert("����������Դ!");
			return false;
		}
	    return true;
	}
	//������������
    function saveArea(){
    
	    if($('AreaForm').name.value.trim()==''){
	    	alert("����������!");
    		return;
	    }
	    if($('AreaForm').url.value.trim()!=''){
	    debugger;
	    	var hosturl=$('AreaForm').url.value; 
	    	for(i=0;i<hosturl.length;i++){
	    		if(hosturl.substring(i,i+1)=="��"){
	    	       		alert("��������ַ���������ַ�����");
	    	       		return;
	    	       	}
	    	}
	    }else{
	    	alert("�������������ַ!");
	    	return ;
	    }
	    if($('AreaForm').code.value.trim()==''){
	    	alert("��������Ч������ʶ");
    		return;
	    }
	    if($('AreaForm').year.value.trim()==''){
	    	alert("��������Ч��ݣ�");
	    	return;
	    }
	    if($('AreaForm').inditext.value.trim()==''){
	    	alert("����������Դ��");
	    	return;
	    }
	    
    	var formObject = $('AreaForm');
    	formObject.action = "<%=request.getContextPath()%>/portal/area/SaveArea.do";
		    new Ajax.Request("<%=request.getContextPath()%>/portal/area/SaveCheckArea.do?random="+Math.random(), 
     	{
	   		parameters :  encodeURI(Form.serialize(formObject)),
	   		method: 'get', 
	   		onComplete : function(resp) { //"resp" is just the XMLHttpRequest object
	     	if(resp.responseText=="false"){
	     	alert("��������ݲ���ͬʱ�ظ�");
	     	return;
	     	}else{
	     	formObject.submit();
	     	}
	     	
	        },
	   		requestHeaders: {Accept: 'application/json'},
	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
	     	netWorkEception();
	        }
		}); 
		    
    }
       

	//���沢����
	function saveContinue(){
		var formObject = $("detailform");
	    if(checkInput(formObject)){
		    formObject.action = "<%=request.getContextPath()%>/portal/area/saveContinue.do";
		    formObject.submit();
	    }
	}
	//���沢�˳�
	function saveExit(){
	    var formObject = $("detailform");
	    if(checkInput(formObject)){
		    formObject.action = "<%=request.getContextPath()%>/portal/area/save.do";
		    formObject.submit();
	    }
	}
	//����
	function cancelSave(){
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		var url = "<%=request.getContextPath()%>/portal/area/index.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
		window.location.href = url;
	}
	function reset_a(){ 
		var formObject = $("detailform");
  		if(confirm("�Ƿ�ȡ����ǰ����?"))
  		formObject.acctyear.value.trim() == "";
	}
	</script>