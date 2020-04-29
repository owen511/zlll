<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/ltext_core.js"></script>
<% String  str = (String)request.getAttribute("str");%>
<%
	String bumenusign = (String)request.getAttribute("bumenusign");
    String bumenutype = (String)request.getAttribute("bumenutype");
	String bumenuname = (String)request.getAttribute("bumenuname");	
	String isuse = (String)request.getAttribute("isuse");

String itemid = (String)request.getAttribute("itemid");
 %>
<script type="text/javascript">

 function init(){
	$('topnum').value = 0;
 }
 
 function saveQuit(){
	 var bumenuname = document.detailform.bumenuname;
		if(!LenthCheck(bumenuname)) return false;
	document.detailform.action = "/portal/keyuserCompare/modsave.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
	document.detailform.submit(); 


 }
 function LenthCheck(item){
	  	var str = item.value;
		if(str.trim()==""){
			alert('业务系统菜单名称输入不能为空！');
			return false;
		}

		return true;
	  }
  function backCheckSave(){
	 window.location.href("<%=request.getContextPath()%>/portal/keyuserCompare/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
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
    function clearOranid(){
		var formObject = $("form1");
		
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
						单位用户信息采集修改
					</div>
				</li>
			</ul>
		</div>
		<!-- 请保留此div和a标签  -->
		<div id="edit_table">
		   <table id ="edittable" width="100%" border="0" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
      <tr> 
  
              <th class = 'thwidth'><div align=left>系统类型<span>*</span></div></th>
        <td nowrap=nowrap  colspan="0"  align="left" >
              <select style="width:120px;" class="text_popmin" id="bumenutype" name="bumenutype" onchange="changeopt(this.value)">
			  	<option value=1>太极华清系统</option>
		        <option value=2>龙图系统</option>
                <option value=3>龙图数据系统</option>
                <option value=4>一体化系统</option>
                <option value=5>其他系统</option>
                <option value=6>未实现系统</option>
                <option value=7>ASP系统</option>
               
		       </select></td>
			  
               <th class = 'thwidth'><div align=left>业务系统菜单名称<span>*</span></div></th>
                 <td nowrap=nowrap  colspan="0"  align="left" >
             		<select style="width:120px;" name= bumenuname id=bumenuname onchange="changeopt1(this.value)">
					<c:forEach items="${organTypeMap}" var="entry">
						<option value="<c:out value='${entry.value}' />"   >
							<c:out value="${entry.value}" />
						</option>
					</c:forEach>
				</select></td>
      

     </tr>
          <tr>
              <th class = 'thwidth'><div align=left>业务系统菜单标识<span>*</span></div></th>
                 <td nowrap=nowrap  colspan="0"  width = "500">
             		<select  style="width:120px;" name= bumenusign id=bumenusign >
					<c:forEach items="${signMap}" var="entry1">
						<option value="<c:out value='${entry1.value}' />"   >
							<c:out value="${entry1.value}" />
						</option>
					</c:forEach>
				</select></td>
            <th class = 'thwidth'><div align=left>是否启用</div></th>
                           <td nowrap=nowrap  colspan="0"  align="left">
			  <select style="width:120px;" class="text_popmin" id="isuse" name="isuse">
			  	<option value="启用">启用</option>
			  	<option value="停用">停用</option>
			  </select>
             </td> 
             
              <td nowrap=nowrap colspan="0" align="left"><br><br><input name="itemid" id="itemid" type="hidden"  maxlength="250"  class="textmin" title="" value = "<%= request.getAttribute("itemid") %>"/>
              <br></td> 
           
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

document.getElementById('bumenutype').value= '<%=bumenutype%>';
document.getElementById('isuse').value= '<%=isuse%>';
document.getElementById('bumenuname').value= '<%=bumenuname%>';
document.getElementById('bumenusign').value= '<%=bumenusign%>';
</script>
<script type="text/javascript">
var name = <%=str%>;
var objSelect = eval(name);
function changeopt(type){
	var obj=document.getElementById('bumenuname');//普通
	var obj2 = document.getElementById('bumenusign');
	obj.options.length=0;
	obj2.options.length=0;
		for(var i=0;i<objSelect.length;i++){		
			if(objSelect[i].TJHQPROGRAM==type){
			    //创建下拉信息对象
				var opt=document.createElement('option');
				var opt2  = document.createElement('option');
				opt.value=objSelect[i].NAME;
				opt2.value = objSelect[i].SIGN;
				opt2.innerText = objSelect[i].SIGN;
				opt.innerText=objSelect[i].NAME;
				//把下拉信息对象追加到下拉列表对象中
				obj.appendChild(opt);
				obj2.appendChild(opt2);
			}
		}
}
function changeopt1(bumenuname){
	var obj3=document.getElementById('bumenusign');//普通
   	obj3.options.length=0;
		for(var i=0;i<objSelect.length;i++){
				if(objSelect[i].NAME == bumenuname){
			    //创建下拉信息对象
			    var opt3=document.createElement('option');
				opt3.value=objSelect[i].SIGN;
				opt3.innerText=objSelect[i].SIGN;
				//把下拉信息对象追加到下拉列表对象中
				obj3.appendChild(opt3);
			}
		}
}
 
</script>