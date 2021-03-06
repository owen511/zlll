<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/ltext_core.js"></script>
<script type="text/javascript">

 function init(){
	$('topnum').value = 0;
 }
 
 function saveQuit(){

	var mphone = document.detailform.mobilenum;
	var tel = document.detailform.telephone.value;
	var agentbank = document.detailform.organidStr;
	var mphoneusername = document.detailform.username;
	if(agentbank == null ||agentbank ==""){
		alert("请输入单位名称！");
		document.detailform.organidStr.value="";
		document.detailform.organidStr.focus();
		return false;
	}
	if(mphoneusername == null ||mphoneusername ==""||mphoneusername.value.length>10){
		alert("请输入正确长度的联系人！");
		document.detailform.username.value="";
		document.detailform.username.focus();
		return false;
	}
	
	if(!mobileCheck(mphone)) return false;
    if(!telCheck(tel)) return false;
			
	document.detailform.action = "/portal/financialbank/save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
	document.detailform.submit();
 }
  
 function telCheck(tel){
    //debugger; 
    if(tel=="") {
      alert("电话号码不能为空！"); 
      document.detailform.telephone.focus(); 
      return false;
    }  
    //alert(tel);
   	var r = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
	//var r = /^\d{3,4}-+\d{7,8}$/;
	if(!r.test(tel)){
      alert('电话号码不正确，请输入形如 区号+电话号码 的数字，如0511-4405222 或 021-87888822'); 
      document.detailform.telephone.value="";
      document.detailform.telephone.focus(); 
      return false;
    }
    return true;
 }
	
  //判断手机号
  function mobileCheck(item){
	var str = item.value;
	if(str.trim()==""){
		alert('手机号码不能为空！');
		item.value="";
        item.focus();
		return false;
	}
   if(str.length!=11){
        alert('手机号码位数不正确！');
        item.value="";
        item.focus();
        return false;
    }
	
    var myreg = /^(((13[0-9]{1})|15[0-9]{1}|18[0-9]{1}|)+\d{8})$/;
    if(!myreg.test(str)){
        alert('手机号码格式不正确！');
        item.value="";
        item.focus();
        return false;
    }
    return true;
  }



  function backCheckSave(){
		window.location.href("<%=request.getContextPath()%>/portal/financialbank/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
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
		//避免全局变量不清空影响其它
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
	if(result && result.value){
		var str = result.value;//alert(str);弹出  008-外事处；
		var aitemid = result.id;	
		var ss = str.split(";")[0].split("-");
		if(backinput1){
			backinput1.value= ss[1];	
		}					 
		if(backinput2){
			backinput2.value= aitemid;	
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
						财政专户开户行信息采集
					</div>
				</li>
			</ul>
		</div>
		<!-- 请保留此div和a标签  -->
		<div id="edit_table">
		   <table id ="edittable" width="100%" border="2" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
      		 <tr> 

              <th class = 'thwidth'><div align=left>银行专户：<span>*</span></div></th>
              <td nowrap=nowrap  colspan="1"  align="left">
              	<input id="organidStr" name="organidStr" type=text class="text_popmin" value="" readonly/>	
				<button id="organid_btn" onclick='selectElememtByOnlyElementcode0("BANK",this.form.organidStr,this.form.aitemid,null,false,"",null);null'/>				 					
              </td> 
    
              <th class = 'thwidth'><div align=left>联系人：<span>*</span></div></th>
              <td nowrap=nowrap colspan="1" align="left">
                <input name="username" id="username" type="text"  maxlength="250"  class="textmin" title=""   />
                <input id="aitemid" name="aitemid" type="hidden"  value=""/>
              </td> 
           </tr>
           <tr> 
 
              <th class = 'thwidth'><div align=left>手机号码：<span>*</span></div></th>
              <td nowrap=nowrap  colspan="1"  align="left">
              	<input id="mobilenum" name="mobilenum" type=text class="text_popmin" title=""   />

              </td> 
              <th class = 'thwidth'><div align=left>固定电话：<span>*</span></div></th>
              <td nowrap=nowrap colspan="1" align="left">
              	<input name="telephone" id="telephone" type="text"  maxlength="250"  class="textmin" title=""   />
              </td> 
          </tr>
          <tr> 
 
             <th class = 'thwidth'><div align=left>手机状态：<span>*</span></div></th>
             <td nowrap=nowrap  colspan="1"  align="left">
			  <select class="text_popmin" id="phonestate" name="phonestate">
			  	<option value="1">启用</option>
			  	<option value="0">停用</option>
			  </select>
             </td> 
             
             <th class = 'thwidth'><div align=left>联网方式：<span>*</span></div></th>
             <td nowrap=nowrap colspan="1" align="left">
             	<select class="text_popmin" id="networking" name="networking">
             		<option value="1">党政专网</option>
             		<option value="2">VPDN拨号升级</option>
             		<option value="3">电话拨号</option>
             	</select>
             </td> 
        </tr> 
      </table>
      <div id="confirm_exit_btn"> 
		<input type="button" id="saveAndOut" name="save"  value="保存并退出" onclick="javascript:saveQuit()" class="button_style">
		<input type="button" name="cancel"  value="返回" onclick="backCheckSave()" class="button_style">	
     </div> 
   </div>
			

  </form>
 </div>
</body>