<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/ltext_core.js"></script>
<%
	String faspcode = (String)request.getAttribute("faspcode");
    String bucode = (String)request.getAttribute("bucode");
	String buname = (String)request.getAttribute("buname");	
	String bupassword = (String)request.getAttribute("bupassword");

String itemid = (String)request.getAttribute("itemids");
 %>
<script type="text/javascript">

 function init(){
	$('topnum').value = 0;
 }
 
 function saveQuit(){
	 var faspcode = document.detailform.faspcode;
	 var bucode = document.detailform.bucode;
	 var buname = document.detailform.buname;
	 var bupassword = document.detailform.bupassword;
	 var bucode2 =  document.detailform.bucode2;
	 var faspcode2 = document.detailform.faspcode2;
	 if(!LenthCheck(faspcode,faspcode2)) return false;
	
	 if(!LenthCheck4(bucode,bucode2)) return false;
	 if(!LenthCheck2(buname)) return false;
	 if(!LenthCheck3(bupassword)) return false;
	 var itemid = document.detailform.itemid.value.trim();
  
	document.detailform.action = "/portal/userCompare/modsave.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
	document.detailform.submit(); 


 }
 function LenthCheck(item,item2){
	  	var str = item.value;
	  	var faspcode2 = item2.value;
		if(str.trim()==""){
			alert('一体化编码输入不能为空！');
			item.value = faspcode2;
			item.focus();
	        return false;
		}
	   if(str.length > 50){
	        alert('一体化编码输入长度过长，不能超过50！');
	        
	        item.value = faspcode2;
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
	      function LenthCheck4(item,item2){
	  	var str = item.value;
	  	var bucode2 = item2.value;
		if(str.trim()==""){
			alert('业务系统用户编码输入不能为空！');
			item.value = bucode2;
			item.focus();
	        return false;
		}
	   if(str.length > 100){
	        alert('业务系统用户编码输入长度过长，不能超过100！');
	        item.value = bucode2;
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
		   <table id ="edittable" width="100%" border="0" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
      		          <tr> 
              <th class = 'thwidth'><div align=left>一体化用户编码：<span>*</span></div></th>
              <td nowrap=nowrap  colspan="0"  align="left">
              	<input style="width:120px;" id="faspcode" name="faspcode" type=text class="text_popmin" title=""  value = "<%= request.getAttribute("faspcode") %>" />
             	
              </td> 
              <th class = 'thwidth'><div align=left>业务系统用户编码<span>*</span></div></th>
              <td nowrap=nowrap colspan="0" align="left">
              	<input style="width:120px;" name="bucode" id="bucode" type="text"  class="textmin" title="" value = "<%= request.getAttribute("bucode") %>" />
              </td> 
               <th class = 'thwidth'><div align=left>业务系统用户名称</div></th>
              <td nowrap=nowrap colspan="0" align="left">
              	<input style="width:120px;" name="buname" id="buname" type="text"  maxlength="250"  class="textmin" title="" value = "<%= request.getAttribute("buname") %>" />
              </td> 

          </tr>
          <tr>
            <th class = 'thwidth'><div align=left>业务系统用户密码</div></th>
              <td nowrap=nowrap colspan="0" align="left">
              	<input style="width:120px;" name="bupassword" id="bupassword" type="text"  maxlength="250"  class="textmin" title="" value = "<%= request.getAttribute("bupassword") %>"/>
              </td> 
             
              <td nowrap=nowrap colspan="0" align="left">
              	<input name="itemid" id="itemid" type="hidden"  maxlength="250"  class="textmin" title="" value = "<%= request.getAttribute("itemid") %>"/>
              </td> 
              <td nowrap=nowrap colspan="0" align="left">
              	<input name="busign" id="busign" type="hidden"  maxlength="250"  class="textmin" title="" value = "<%= request.getAttribute("busign") %>"/>
              </td>
              <td nowrap=nowrap colspan="0" align="left">
              <input style="width:120px;" name="bucode2" id="bucode2" type="hidden"  class="textmin" title="" value = "<%= request.getAttribute("bucode") %>" /> 
           
           </td>
           <td nowrap=nowrap  colspan="1"  align="left">
              	<input style="width:120px;" id="faspcode2" name="faspcode2" type=hidden class="text_popmin" title=""  value = "<%= request.getAttribute("faspcode") %>" />
             	
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
