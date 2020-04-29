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
	 var faspcode = document.detailform.faspcode;
	 var bucode = document.detailform.bucode;
	 var buname = document.detailform.buname;
	 var bupassword = document.detailform.bupassword;
	 var busign = document.detailform.busign;
	
	if(!LenthCheck(faspcode)) return false;
	
	if(!LenthCheck4(bucode)) return false;
	if(!LenthCheck2(buname)) return false;
	if(!LenthCheck3(bupassword)) return false;
	
	document.detailform.action = "/portal/userCompare/save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
	document.detailform.submit(); 
  }
  function  addcontinue(){
   	 var faspcode = document.detailform.faspcode;
	 var bucode = document.detailform.bucode;
	 var buname = document.detailform.buname;
	 var bupassword = document.detailform.bupassword;
	 var busign = document.detailform.busign;
	
	if(!LenthCheck(faspcode)) return false;
	
	if(!LenthCheck4(bucode)) return false;
	if(!LenthCheck2(buname)) return false;
	if(!LenthCheck3(bupassword)) return false;
    document.detailform.action = "/portal/userCompare/savecontinue.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
	
	document.detailform.submit(); 
	}
  function LenthCheck(item){
  	var str = item.value;
	if(str.trim()==""){
		alert('一体化用户编码输入不能为空！');
		item.focus();
        return false;
	}
   if(str.length > 50){
        alert('一体化用户编码输入长度过长，不能超过50！');
        
        item.value = "";
        item.focus();
        return false;
    }
	return true;
  }
    function LenthCheck2(item){
  	var str = item.value;
  if(str.length > 100){
        alert('业务系统用户名称输入长度过长，不能超过100！');
        item.value = "";
        item.focus();
        return false;
    }
   
	return true;
  }
    function LenthCheck3(item){
  	var str = item.value;
    if(str.length > 100){
        alert('业务系统用户密码输入长度过长，不能超过100！');
        item.value = "";
        item.focus();
        return false;
    }
	return true;
  }
      function LenthCheck4(item){
  	var str = item.value;
	if(str.trim()==""){
		alert('业务系统用户编码输入不能为空！');
		item.focus();
        return false;
	}
   if(str.length > 100){
        alert('业务系统用户编码输入长度过长，不能超过100！');
        item.value = "";
        item.focus();
        return false;
    }
   
	return true;
  }
  function backCheckSave(){
		document.detailform.action = "/portal/userCompare/index1.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
        document.detailform.submit(); 
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
		   //避免全局变量不清空影响其它
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
						单点登录用户对照-新增
					</div>
				</li>
			</ul>
		</div>
		<!-- 请保留此div和a标签  -->
		<div id="edit_table">
		   <table id ="edittable" width="100%" border="0" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
           <tr> 
              <th class = 'thwidth'><div align=left>一体化用户编码：<span>*</span></div></th>
              <td nowrap=nowrap  colspan="0"  align="left">
              	<input  style="width:120px;" id="faspcode" name="faspcode" type=text class="text_popmin" title=""   />
             	
              </td> 
              <th class = 'thwidth'><div align=left>业务系统用户编码<span>*</span></div></th>
              <td nowrap=nowrap colspan="0" align="left">
              	<input style="width:120px;" name="bucode" id="bucode" type="text"  maxlength="250"  class="textmin" title=""/>
              </td> 
               <th class = 'thwidth'><div align=left>业务系统用户名称</div></th>
              <td nowrap=nowrap colspan="0" align="left">
              	<input style="width:120px;" name="buname" id="buname" type="text"  maxlength="250"  class="textmin" title=""/>
              </td> 

          </tr>
          <tr>
            <th class = 'thwidth'><div align=left>业务系统用户密码</div></th>
              <td nowrap=nowrap colspan="0" align="left">
              	<input style="width:120px;" name="bupassword" id="bupassword" type="text"  maxlength="250"  class="textmin" title=""/>
              </td> 
                  
              <td nowrap=nowrap colspan="0" align="left">
              	<input name="busign" id="busign" type="hidden"  maxlength="250"  class="textmin" title="" value = "<%= request.getAttribute("busign") %>"/>
              </td> 
          </tr>
         
      </table>
      <div id="confirm_exit_btn"> 
		<input type="button" id="saveAndOut" name="save"  value="保存并退出" onclick="javascript:saveQuit()" class="button_style">
		<input type="button" id="saveAndOut" name="save"  value="继续新增" onclick="javascript:addcontinue()" class="button_style">
		<input type="button" name="cancel"  value="返回" onclick="backCheckSave()" class="button_style">	
     </div> 
   </div>
  </form>
 </div>
</body>