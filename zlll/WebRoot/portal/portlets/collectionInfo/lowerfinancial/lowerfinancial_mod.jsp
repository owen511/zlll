<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/ltext_core.js"></script>
<%
	String controlid = (String)request.getAttribute("id");
	String phoneusers = (String)request.getAttribute("phoneusers");
	String phonestate = (String)request.getAttribute("phonestate");
	String telephone = (String)request.getAttribute("telephone");
	String organidStr = (String)request.getAttribute("unit");
	String mobilenum = (String)request.getAttribute("mobilenum");
	String networking = (String)request.getAttribute("networking");
	String aitemid = (String)request.getAttribute("aitemid");
	String bitemid = (String)request.getAttribute("bitemid");

 %>
<script type="text/javascript">

  function init(){
	 $('topnum').value = 0;
  }
  function saveQuit(){
	 var mphone = document.detailform.mobilenum;
	 var tel = document.detailform.telephone.value.trim();
	 var bdgagency = document.detailform.organidStr.value.trim();
	 var mphoneusername = document.detailform.username.value.trim();
	 if(bdgagency == null ||bdgagency ==""){
		alert("�����뵥λ���ƣ�");
		document.detailform.organidStr.value="";
		document.detailform.organidStr.focus();
		return false;
	 }
	 if(mphoneusername == null ||mphoneusername ==""){
		alert("��������ϵ�ˣ�");
		document.detailform.username.value="";
		document.detailform.username.focus();
		return false;
	 }
	
	 if(!mobileCheck(mphone)) return false;
	
	 if(tel == null ||tel ==""){
		alert("������̶��绰���룡");
		document.detailform.telephone.value="";
		document.detailform.telephone.focus();
		return false;
	 }	
	 detailform.action = "/portal/lowerfinancial/modsave.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
	 document.detailform.submit();
  }

  //�ж��ֻ���
  function mobileCheck(item){
	var str = item.value;
	if(str.trim()==""){
		alert('�ֻ����벻��Ϊ�գ�');
		item.value="";
        item.focus();
		return false;
	}
   if(str.length!=11){
        alert('�ֻ�����λ������ȷ��');
        item.value="";
        item.focus();
        return false;
    }
	
    var myreg = /^(((13[0-9]{1})|15[0-9]{1}|18[0-9]{1}|)+\d{8})$/;
    if(!myreg.test(str)){
        alert('�ֻ������ʽ����ȷ��');
        item.value="";
        item.focus();
        return false;
    }
    return true;
  }


   function backCheckSave(){
		window.location.href("<%=request.getContextPath()%>/portal/lowerfinancial/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
   }

   function selectElememtByOnlyElementcode0(elementcode,backinput1,backinput2,backinput3,allField,elementfilter,jsFunction){
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
		elementfilter = setElementfilter(elementfilter);
		var refererurl = ""+window.location.href;
	  	var	url = ROOT_PATH+"/common/showElementWithOnlyCode.do?elementcode="+elementcode
	  						+"&elementfilter="+elementfilter+"&AllField="+allField
	  						 +"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	  	var diasizeObj = setShowDiaSize();
		var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No;help:No;');
		backResult1(result,backinput1,backinput2,backinput3);
   }	
     	  
     	  				
   function backResult1(result,backinput1,backinput2,backinput3){
  // debugger;		
		if(result && result.value){
			var str = result.value;	//alert(str);����  008-���´���
			var ss = str.split(";")[0].split("-");
			backinput1.value= ss[1];
			
			//alert(backinput2.value);		
			if(backinput2){
				backinput2.value= result.id;
				//alert("sdsdsd=="+backinput2.value);		
			}			
			if(backinput3){	
				backinput3.value=result.id.split(",")[0];
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
var sql = "type in(select itemid from t_dicenumitem where elementcode = \'TYPE\' and code = \'3\')";
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
						�¼�����ר����Ϣ�ɼ�
					</div>
				</li>
			</ul>
		</div>
		<!-- �뱣����div��a��ǩ  -->
		<div id="edit_table">
		   <table id ="edittable" width="100%" border="2" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
      		 <tr> 

              <th class = 'thwidth'><div align=left>�¼�������<span>*</span></div></th>
              <td nowrap=nowrap  colspan="1"  align="left">
              	<input id="organidStr" name="organidStr" type=text class="text_popmin" value="<%=organidStr  %>" readonly/>	
				<button id="organid_btn" onclick='selectElememtByOnlyElementcode0("AGENCY",this.form.organidStr,this.form.bitemid,null,false,sql,null);null'/>				 					
              </td>   
              <th class = 'thwidth'><div align=left>��ϵ�ˣ�<span>*</span></div></th>
              <td nowrap=nowrap colspan="1" align="left">
                <input name="username" id="username" type="text"  maxlength="250"  class="textmin" title=""   value="<%=phoneusers %>" />
              	<input id="bitemid" name="bitemid" type="hidden"  value="<%=bitemid %>"/>
              </td> 
           </tr>
           <tr> 
 
              <th class = 'thwidth'><div align=left>�ֻ����룺<span>*</span></div></th>
              <td nowrap=nowrap  colspan="1"  align="left">
              <input id="mobilenum" name="mobilenum" type=text class="text_popmin" title="" value="<%=mobilenum %>"  />
			  <input type="hidden" id="oldId" name="oldId" value="<%=controlid %>"/>
			  <input type="hidden" id="oldId" name="oldId" value="<%=controlid %>"/>
              </td> 
              <th class = 'thwidth'><div align=left>�̶��绰��<span>*</span></div></th>
              <td nowrap=nowrap colspan="1" align="left">
              	<input name="telephone" id="telephone" type="text"  maxlength="250"  class="textmin" title=""  value="<%=telephone%>" />
              </td> 
          </tr>
          <tr> 
 
             <th class = 'thwidth'><div align=left>�ֻ�״̬��<span>*</span></div></th>
             <td nowrap=nowrap  colspan="1"  align="left">
			  <select class="text_popmin" id="phonestate" name="phonestate" value="<%=phonestate %>">
			  	<option value="1">����</option>
			  	<option value="0">ͣ��</option>
			  </select>             </td> 
             
             <th class = 'thwidth'><div align=left>������ʽ��<span>*</span></div></th>
             <td nowrap=nowrap colspan="1" align="left">
             	<select class="text_popmin" id="networking" name="networking" value="<%=networking%>">
             		<option value="1">����ר��</option>
             		<option value="2">VPDN��������</option>
             		<option value="3">�绰����</option>
             	</select>             </td> 
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
<script type="text/javascript">
document.getElementById('phonestate').value='<%=phonestate%>';
document.getElementById('networking').value='<%=networking%>';
</script>