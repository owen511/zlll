<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/ltext_core.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/choose.js"></script>
<script type="text/javascript">

  function init(){
	$('topnum').value = 0;
  }
  
  function saveQuit(){ 
	 var mphone = document.detailform.mobilenum;
	 var code = document.detailform.code.value;
	
	  if(!mobileCheck(mphone)) return false;	 
	  //if(!telCheck(tel)) return false;
	  if(code==""){
	     alert("�������û�CODE");
	     return false;
	  }
	  //Ajax����  ��̨	
	   	new Ajax.Request("<%=request.getContextPath()%>/portal/userInforCollection/check.do?random="+Math.random(), 
     	{
	   		parameters : "code="+code,
	   		method: 'get', 
	   		onComplete : function(resp) {
	   		//debugger;
	   		 //alert(resp);
	   		               if(resp.responseText=="true"){  				                   	
		                      document.detailform.action = "/portal/userInforCollection/save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
		                      document.detailform.submit();
  			               }else{
  				                alert("��������ȷ���û�CODE");
  				                document.detailform.code.value="";
  				                document.detailform.code.focus(); 				                 				                
  			               }		        
	        },
	   		requestHeaders: {Accept: 'application/json'},
	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
	        }
		}); 

  }
  
  //�ж��ֻ���
  function mobileCheck(item){
	var str = item.value;
	if(str.trim()==""){
		alert('�ֻ����벻��Ϊ�գ�');
        item.focus();
		return false;
	}
   if(str.length!=11){
        alert('�ֻ�����λ������ȷ��');
        item.value="";
        item.focus();
        return false;
    }
	
    var myreg =/^(1+([0-9]{2})+\d{8})$/;
    //var myreg = /^(((13[0-9]{1})|15[0-9]{1}|18[0-9]{1}|)+\d{8})$/;
    if(!myreg.test(str)){
        alert('�ֻ������ʽ����ȷ��');
        item.value="";
        item.focus();
        return false;
    }
    return true;
  }

  function backCheckSave(){
		window.location.href("<%=request.getContextPath()%>/portal/userInforCollection/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
  }
  
  function selectElememtByOnlyElementcode0(elementcode,backinput1,allField,elementfilter,jsFunction){
		jsFunctionname = jsFunction;
		var selvalue = backinput1.valuecode != undefined ? backinput1.valuecode : backinput1.value.trim();
		window.selvalue = selvalue;	
		var params = "";
		var func = "callBeforeOpenSingleElementTree_"+elementcode+"(window)";
		beforeMakeTree(func);
		var stopFlag = window.stopFlag != null ? true : false;
		if(stopFlag) {
		   //����ȫ�ֱ��������Ӱ������
		   window.stopFlag = undefined;
		   return;
		} 
		//debugger;
		elementfilter = setElementfilter(elementfilter);
		var refererurl = ""+window.location.href;
	  	var	url = ROOT_PATH+"/common/showElementWithOnlyCode.do?elementcode="+elementcode
	  					+"&elementfilter="+elementfilter+"&AllField="+allField
	  					+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	  	var diasizeObj = setShowDiaSize();
		var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No;help:No;');
		backResult1(result,backinput1);		
  }	
    				
  function backResult1(result,backinput1){		  		
		if(result && result.value){
			var str = result.value;
			var ss = str.split(";")[0].split("-");
			if(backinput1){
				backinput1.value= ss[0];	
			}					 				
		}			
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
  function clearvalue(){
		clearInput(document.getElementById("userid"));
		document.getElementById("hidden_userid").value="";
  }
</script>

<body onload='init()'> 
<div>
    <form name="detailform" id="detailform" action="#" method="post" >
    <input type="hidden" id="maindata" name="maindata" value=""/>
    <input type="hidden" id="optype" name="optype" value="add"/>
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						��λ�û���Ϣ�ɼ�
					</div>
				</li>
			</ul>
		</div>
		<!-- �뱣����div��a��ǩ  -->
		<div id="edit_table">
		   <table id ="edittable" width="100%" border="2" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
           <tr> 
              <th class = 'thwidth'><div align=left>�ֻ����룺<span>*</span></div></th>
              <td nowrap=nowrap  colspan="1"  align="left">
              	<input id="mobilenum" name="mobilenum" type=text class="text_popmin" title=""   />
             	
              </td> 
              <th class = 'thwidth'><div align=left>�û�CODE��<span>*</span></div></th>
              <td nowrap=nowrap colspan="1" align="left">
              	<input name="code" id="code" type="text"  maxlength="250"  class="textmin" title=""/>
              </td> 
          </tr>
          <tr> 
 
             <th class = 'thwidth'><div align=left>�ֻ�״̬��<span>*</span></div></th>
             <td nowrap=nowrap  colspan="1"  align="left">
			  <select class="text_popmin" id="phonestate" name="phonestate">
			  	<option value="1">����</option>
			  	<option value="0">ͣ��</option>
			  </select>
             </td> 
        </tr> 
      </table>
      <div id="confirm_exit_btn"> 
		<input type="button" id="saveAndOut" name="save"  value="���沢�˳�" onclick="javascript:saveQuit()" class="button_style">
		<input type="button" name="cancel"  value="����" onclick="backCheckSave()" class="button_style">	
     </div> 
   </div>
  </form>
 </div>
</body>