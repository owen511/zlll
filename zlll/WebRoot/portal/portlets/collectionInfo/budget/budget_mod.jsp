<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/ltext_core.js"></script>
<%
	String controlid = (String)request.getAttribute("id");
    String code = (String)request.getAttribute("code");
	String phonestate = (String)request.getAttribute("phonestate");	
	String mobilenum = (String)request.getAttribute("mobilenum");

 %>
<script type="text/javascript">

 function init(){
	$('topnum').value = 0;
 }
 
 function saveQuit(){
	 var mphone = document.detailform.mobilenum;
	 var code = document.detailform.code.value;
	 var state = document.detailform.phonestate.value;
	 if(!mobileCheck(mphone)) return false;
	
	// if(tel == null ||tel ==""){
	//	alert("请输入固定电话号码！");
	//	document.detailform.telephone.value="";
	//	document.detailform.telephone.focus();
	//	return false;
	// }
	
	  if(code==""){
	     alert("请输入用户CODE");
	     return false;
	  }
	  
	  //Ajax请求  后台	
	   	new Ajax.Request("<%=request.getContextPath()%>/portal/userInforCollection/check.do?random="+Math.random(), 
     	{
	   		parameters : "code="+code,
	   		method: 'get', 
	   		onComplete : function(resp) {
	   		               if(resp.responseText=="true"){  				                   	
	                            document.detailform.action = "/portal/userInforCollection/modsave.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
	                            document.detailform.submit();  			               
	                        }else{
  				                alert("请输入正确的用户CODE");
  				                document.detailform.code.value="";
  				                document.detailform.code.focus(); 				                 				                
  			                   }		        
	        },
	   		requestHeaders: {Accept: 'application/json'},
	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
	        }
		}); 	

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
	var myreg =/^(1+([0-9]{2})+\d{8})$/;
    //var myreg = /^(((13[0-9]{1})|15[0-9]{1}|18[0-9]{1}|)+\d{8})$/;
    if(!myreg.test(str)){
        alert('手机号码格式不正确！');
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
  //debugger;
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
	 backResult1(result,backinput1);
	 //<button id="organid_btn" onclick='selectElememtByOnlyElementcode0("USERID",this.form.code,false,null,null);'/></button>				 					
    //  <img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='clearvalue();'>
              
 
  }	
  
  function findByNoCode(type,code,findflag) {
	 if(code.trim()==""){
	   alert("请输入搜索内容");
	   searchcontent.focus();
	   return;
	 }
	 if(a.loading){
	   alert("正在加载中，请稍候!");
	   return;
	 }
	 if(type=="code"){
    // 父结点
		  var source = a.dataSource;
		  var parentCode;
		  var childCode;
		  var rootSum;
		  var len;
		  code=code.trim();
		  var nodePosition,chindex = 0;
		  for(var i in source){
		    if(i!="length"){
		     parentCode=i.split("_")[0];
		     childCode=i.split("_")[1];
		    }
    // 根节点
	      if(parentCode=="root"){
	       len = childCode.length;
	      }
	      if(len == childCode.length){
	         rootSum="";
	      }
	      rootSum +=childCode+",";
    // 如果parent=1一级结点
	       if(childCode==code && parentCode=="root"){
		       var acode = a.getNodeById(code);
		       if(acode!=null && !a.getNodeById(code).$$caller.useCheckbox){
			       // 父结点滚动条位置
			       a.focus(code);
			       a.getPosition();
			       return ;
	         	}else{
	         	   a.getNodeById(code).check(true,false);
	         	   a.getPosition();
	         	   return;
	         	}
	      }
    // 子结点
	     else if(childCode==code && parentCode!="-1"){
	     // debugger;
		      var arrRoot = rootSum.split(",");
		      for(var j = 0;j<arrRoot.length;j++){
			         if(arrRoot[j]!="" && code.indexOf(arrRoot[j])>-1){
				         a.expand(arrRoot[j]);
				         a.getNodeById(arrRoot[j]).expanded = true;
				         if(a.getNodeById(code)!=null && a.getNodeById(code).$$caller.useCheckbox){
				            a.getNodeById(code).check(true,false);  
				            a.getNodeById(code).upCheck();
				         }
	         		 }
		      } 
	         if(a.getNodeById(code)!=null && !a.getNodeById(code).$$caller.useCheckbox)
	         a.focus(code);
	         a.getPosition();
	         return;
	      }
	     }
	    }
    else if(type == "name"){
	   var arrNameCode = nameToCode(code,findflag);
	   for(var k=0;k<arrNameCode.length;k++){
		   if(arrNameCode!=null && arrNameCode[k]!= undefined){
		      findByNoCode("code",arrNameCode[k],findflag);
		   }
	   }
    }
   
}

  function selectElementTreeForEditWithFieldCTRL(mainmenu,submenu,vchtypecode,vchfieldcode,backinput1,vou,defaultvalue,anyvaluetag,parsetype,allField,elementfilter,isOnlyData){
	//debugger;
	var selvalue = backinput1.valuecode != undefined ? backinput1.valuecode : backinput1.value;
	window.selvalue = selvalue;
	var params = "";
	if(typeof(vou) != "object" || vou == null){
		selectElememtByUrl(mainmenu,submenu,vchtypecode,vchfieldcode,backinput1);
	} else {
		//判断是否为项目树
		if("program"==vchfieldcode&&vchtypecode.toString().charAt(0)!='6'){
			if(programtreetype=='0'){
				indi_SelectElementTreeForEditWithFieldCTRL(mainmenu,submenu,vchtypecode,vchfieldcode,backinput1, vou, selvalue, "0", "link", "0", elementfilter, "","","1",0,"")
				return;
			}else{
				selectProgramTreeForEditWithFieldCTRL(mainmenu,submenu,vchtypecode,vchfieldcode,backinput1,vou,selvalue,"0","link","0",elementfilter,"","",0,"");
				return;
			}
		}
		/** ganhua 20080304 在打开选择窗口前回调一个方法做某些事情
		  * 如：设置过滤条件，检查联动的其它控件是否选择值
		  * 
		**/
		var func = "callBeforeOpenSingleElementTree_"+vchfieldcode+"(window)";
		beforeMakeTree(func);
		var stopFlag = window.stopFlag != null ? true : false;
		if(stopFlag) {
			//避免全局变量不清空影响其它
			window.stopFlag = undefined;
			return;
		} 
		elementfilter = setElementfilter(elementfilter);
	    var voucher = new Array();
	    voucher[voucher.length]= vou;
		var refererurl = ""+window.location.href;
		var	url = ROOT_PATH+"/common/showElementTreeForEditWithFieldCTRL.do?AllField="+allField+"&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode+"&voucher="+voucher.toJSON()+"&defaultvalue="+defaultvalue+"&anyvaluetag="+anyvaluetag
	  			+"&parsetype="+parsetype+"&elementfilter="+elementfilter
	  			+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	  	
	  	if(isOnlyData=="1"){
	  		url = ROOT_PATH+"/common/showElementTreeForEditWithFieldCTRL.do?AllField=0&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode+"&voucher="+voucher.toJSON()+"&defaultvalue="+defaultvalue+"&anyvaluetag="+anyvaluetag
	  			+"&parsetype="+parsetype+"&elementfilter="+elementfilter+"&selvalue="+selvalue
	  			+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	  		var initData=eval("("+JQ.ajax({
						type:"post",
				  		url: url,
				  		data: "isOnlyData=1",
				  		async: false
				 	}).responseText+")");
			window.elementfilter=null;
	  		return 	loopgetchildren(initData,new Array());
	  	}
	  	var diasizeObj = setShowDiaSize();
		var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No;help:No;');
		backResult1(result,backinput1);
	 }
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
		clearInput(document.getElementById("code"));
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
						单位用户信息采集
					</div>
				</li>
			</ul>
		</div>
		<!-- 请保留此div和a标签  -->
		<div id="edit_table">
		   <table id ="edittable" width="100%" border="2" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
      		 <tr>  
              <th class = 'thwidth'><div align=left>手机号码：<span>*</span></div></th>
              <td nowrap=nowrap  colspan="1"  align="left">
              <input id="mobilenum" name="mobilenum" type=text class="text_popmin" title="" value="<%=mobilenum %>"  />
			  <input type="hidden" id="oldId" name="oldId" value="<%=controlid %>"/>
              </td> 
              
              <th class = 'thwidth'><div align=left>用户CODE：<span>*</span></div></th>
              <td nowrap=nowrap  colspan="1"  align="left">
              <input id="code" name="code" type=text class="text_popmin" value="<%=code %>"/>	
              </td>    
           </tr>
          <tr> 
             <th class = 'thwidth'><div align=left>手机状态：<span>*</span></div></th>
             <td nowrap=nowrap  colspan="1"  align="left">
			  <select class="text_popmin" id="phonestate" name="phonestate"  >
			  	<option value="1">启用</option>
			  	<option value="0">停用</option>
			  </select>             </td>             
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
<script type="text/javascript">
document.getElementById('phonestate').value='<%=phonestate%>';
</script>