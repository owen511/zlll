<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<div>
    <form name="detailform" id="detailform" action="#" method="post" >
    <input type="hidden" id="maindata" name="maindata" value=""/>
    <input type="hidden" id="optype" name="optype" value="add"/>
		<div id="form_table_title" >
			<ul>
				<li class="top">
					<div>
						����ҵ��ϵͳ
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
		      <th class = 'thwidth'><div align=left>����<span>*</span></div></th>
		      <td nowrap=nowrap  colspan="1"  align="left">
		      	 <input type='text' name='pcode' value=''/>
			  </td> 
		      <th class = 'thwidth'><div align=left>����<span>*</span></div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		   	 	 <input type='text' name='name' value='' />
		   	  </td>
		   	   <th class = 'thwidth'><div align=left>��ʶ�� <span>*</span></div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		      	  <input type='text' name='psign' value='' />
		   	  </td>
		   </tr> 
		    <tr> 
		      <th class = 'thwidth'><div align=left>����<span>*</span></div></th>
		      <td nowrap=nowrap  colspan="1"  align="left">
		     	  <select name='ptype' ><option value=1>B/S</option><option value=2>C/S</option><option value=3>����</option></select>
			  </td> 
		      <th class = 'thwidth'><div align=left>ϵͳ����<span>*</span></div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
				  <select name='ptjhq'>
					  <option value=1>̫������ϵͳ</option>
					  <option value=2>��ͼϵͳ</option>
			          <option value=3>��ͼ����ϵͳ</option>
			          <option value=4>һ�廯ϵͳ</option>
			          <option value=5>����ϵͳ</option>
			          <option value=6>δʵ��ϵͳ</option>
			          <option value=7>ASPϵͳ</option>
				  </select>
		      </td> 
		      <th class = 'thwidth'><div align=left> URL<span>*��C/S��ѡ�</span></div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		      	  <input type='text' name='purl'>
		      	 
		   	  </td>
		   </tr> 
		   <tr> 
		      <th class = 'thwidth'><div align="left">��Ȳ���</div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
			  	  <input type='checkbox' name='pneedyear' value='0' onclick="changepneedyear(this)"/>		 	
			  </td>
		      <th class = 'thwidth'><div align="left">��Ȳ�������</div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
				  <select name='pyearstyle'><option value=0></option><option value=1>���(YYYY)</option><option value=2>������ݿ��ַ���</option></select>
		      </td>
		      <th class = 'thwidth'><div align="left">��ʾ˳��</div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		      	  <input name=porder id=porder type="text" style="text-align:left;" />
		      </td>
          </tr> 
          <tr> 
		      <th class = 'thwidth'><div align="left">��������</div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		      	<input type='checkbox' name='ptask' value='0' onclick="changeptask(this)"/></td>
		 	  </td>
		      <th class = 'thwidth'><div align="left">Ӧ�ó����ַ</div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
				<input type='text' size='30' name='appLocation' value=''/>		     
			  </td>
		      <th class = 'thwidth'><div align="left">��������ַ</div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		      	<input type='text' name='phosturl' size='30'/>
		      </td>
          </tr> 
           <tr> 
           	  <th class = 'thwidth'><div align=left>�򿪷�ʽ</div></th>
		      <td nowrap=nowrap  colspan="1"  align="left">
		     	  <select name='opentype' ><option value=1>�´���</option><option value=2>��ǰ����</option></select>
			  </td> 
		      <th class = 'thwidth'><div align="left">csĬ��·��</div></th>
		      <td nowrap=nowrap colspan="3"  align="left">
		      	<input size='50' type='file' name='file' contentEditable='false'/>
		 	  </td>
		 	  </tr> 
		 	  <tr> 
		 	  <th class = 'thwidth'><div align=left> webservice��֤</div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		      	  <input type='text' name='checkurl' id = 'checkurl'>
		      	  <input type="button" id="check" name="check"  value="��֤" onclick="Check()" class="button_style" >
		   	  </td>
          </tr> 

      </table> 
    </div> 
	<input name=submenu id=submenu type="hidden"
		value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden"
		value="<c:out value='${param.mainmenu}'/>" />
	<div id="confirm_exit_btn"> 
		<input type="button" id="saveAndOut" name="save"  value="���沢����" onclick="saveContinue()" class="button_style" >
		<input type="button" id="saveAndOut" name="save"  value="���沢�˳�" onclick="saveExit()" class="button_style" >
		<input type="button" id="cancel"   name="cancel"  value="����" onclick="cancelSave()" class="button_style">	
	</div>
</form>
<script type="text/javascript">
	function checkInput(formObject){
		
		if(formObject.pcode.value.trim() == ""){
			alert("���������!");
			return false;
		}
		if(formObject.name.value.trim() == ""){
			alert("����������!");
			return false;
		}
		if(formObject.psign.value.trim() == ""){
			alert("�������ʶ��!");
			return false;
		}
		
		if(formObject.ptype.value.trim()=='1' && formObject.purl.value.trim() == ""){
			alert("������URL!");
			return false;
		}
		//�ȵȡ���
	    return true;
	}
	//���沢����
	function saveContinue(){
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		var formObject = $("detailform");
	    if(checkInput(formObject)){
	    	//��֤�����Ƿ��ظ�
	    	var pcode = formObject.pcode.value.trim();
			new Ajax.Request("<%=request.getContextPath()%>/portal/checkProgramCode.do?random="+Math.random(), 
		     	{
			   		parameters : "pcode="+pcode,
			   		method:'post', 
			   		onComplete : function(resp) {
				     	if(resp.responseText=="1"){
				     		formObject.action = "<%=request.getContextPath()%>/portal/userprogramset/addprogramconfigback.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
							formObject.submit();
				     	}else{
					     	alert("�������ظ�");
					     	formObject.pcode.focus();
				     	}
			        },
			   		requestHeaders: {Accept: 'application/json'},
			   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
			   		}
				}); 
	    }
	}
	//���沢�˳�
	function saveExit(){
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
	    var formObject = $("detailform");
	    if(checkInput(formObject)){
	    	//��֤�����Ƿ��ظ�
	    	var pcode = formObject.pcode.value.trim();
			new Ajax.Request("<%=request.getContextPath()%>/portal/checkProgramCode.do?random="+Math.random(), 
		     	{
			   		parameters : "pcode="+pcode,
			   		method:'post', 
			   		onComplete : function(resp) {
				     	if(resp.responseText=="1"){
				     		formObject.action = "<%=request.getContextPath()%>/portal/userprogramset/addprogramconfigmain.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
					   		formObject.submit();
				     	}else{
					     	alert("�������ظ�");
					     	formObject.pcode.focus();
				     	}
			        },
			   		requestHeaders: {Accept: 'application/json'},
			   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
			   		}
				}); 
	    }
	}
	//����
	function cancelSave(){
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		var url = "<%=request.getContextPath()%>/common/loadProgramConfig.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
		window.location.href = url;
	}
	function changepneedyear(obj){
		if(obj.checked==true){
			obj.value=1;
		}else{
			obj.value=0;
		}
		
	}
	function changeptask(obj){
		if(obj.checked==true){
			obj.value=1;
		}else{
			obj.value=0;
		}		
	}
	//begin 2012.11.22 ���޺�  �༭ҵ��ϵͳ���Ӽ��webservice����
function Check(){
	var formObject = $("detailform"); 
	var checkurl = document.detailform.checkurl.value;
	new Ajax.Request("<%=request.getContextPath()%>/common/progaramcheck.do?random="+Math.random(), 
     	{
	   		parameters :  "mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&checkurl="+checkurl+"",
	   		method: 'get', 
	   		onComplete : function(resp) { 
	     	
	     	if(resp.responseText=="true"){
	     	alert("��֤ͨ��");
	     	return;
	     	}else{
	     	alert("��֤��ͨ��");
	     	return;
	     	}
	     	
	        },
	   		requestHeaders: {Accept: 'application/json'},
	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
	     	netWorkEception();
	        }
		}); 
	}
	//end 2012.11.22 ���޺�  �༭ҵ��ϵͳ���Ӽ��webservice����
	</script>