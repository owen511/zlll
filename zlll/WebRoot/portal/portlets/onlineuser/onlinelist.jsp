<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String organTypeMap = (String)request.getAttribute("organTypeMap");
	String onlinecount = (String)request.getAttribute("onlinecount");
	String conditiontype = (String)request.getAttribute("conditiontype");
	String organcode = (String)request.getAttribute("organcode");
	String organname = (String)request.getAttribute("organname");
	String username = (String)request.getAttribute("username");
	String starthour = (String)request.getAttribute("starthour");
	String endhour = (String)request.getAttribute("endhour");
	String startminute = (String)request.getAttribute("startminute");
	String endminute = (String)request.getAttribute("endminute");
%>
<script type="text/javascript">
//查询
function query(){
	var starthour=document.getElementById('queryhour').value;
	var startminute=document.getElementById('queryminute').value;
	var endhour=document.getElementById('queryhour2').value;
	var endminute=document.getElementById('queryminute2').value;
	if(starthour==""&&startminute!=""){
		alert("请选择开始的小时");
		return;
	}
	if(endhour==""&&endminute!=""){
		alert("请选择结束的小时");
		return;
	}
	if(starthour!=""&&endhour!=""){
		if(starthour>endhour){
			alert("起始小时不能大于结束小时");
			return;
		}else if(starthour==endhour&&startminute>endminute){
			alert("起始分钟不能大于结束分钟");
			return;
		}
	}
	$('queryform').submit();
}

function clearInput(obj){
	if(obj.tagName == "INPUT" && obj.type=="text"){
		obj.value = ""
		obj.valueid = null;
		obj.valuecode = "";
		if(obj.row){
			obj.row = "";
			obj.page = "";
		}
	}else if(obj.tagName == "SELECT"){
		obj.value="";
	}else if(obj.tagName == "INPUT" && obj.type=="hidden"){
		obj.value = "";
	}
}



// 清除FORM中的可录入数据
function clearFormInputAll(formObj){
	var inputelements = formObj.elements;
	for(var i=0;i<inputelements.length;i++){
		var obj = inputelements[i];
		if((obj.tagName == "INPUT" && obj.type=="text") || obj.tagName == "SELECT"){
			obj.value = ""
			obj.valueid = null;
			obj.valuecode = null;
		}else if(obj.tagName == "INPUT" && obj.type=="checkbox"){
			obj.checked=false;
		}else if(obj.tagName == "INPUT" && obj.type=="hidden"){
			obj.value = "";
		}
	}
}

//创建机构、登录时间下拉框，及选中默认值
function createorgantype(){
	try{
		var organcode = '<%=organcode%>';
		var organname = '<%=organname%>';
		if(organcode!=null&&organcode!=""&&organcode!="null"&&document.getElementById('organcode_valuecode')!=null){
			document.getElementById("organcode_valuecode").value=organcode;
		}
		if(organname!=null&&organname!=""&&organname!="null"&&document.getElementById('organcode')!=null){
			document.getElementById("organcode").value=organname;
		}
	}catch(e){
	}
	var username = '<%=username%>';
	if(username!=null&&username!=""&&username!="null"&&document.getElementById('name')!=null){
		document.getElementById('name').value=username;
	}
	var obj = document.getElementById('organtype');
	if(obj!=null){
		var organTypeMap = eval(<%=organTypeMap%>);
		if(organTypeMap!=null){
			for(var i = 0;i < organTypeMap.length; i++){
				//创建下拉信息对象
				var opt=document.createElement('option');
				opt.value=organTypeMap[i].code;
				opt.innerText=organTypeMap[i].name;
				if(organTypeMap[i].code=='<%=conditiontype%>'){
					opt.selected=true;
				}
				//把下拉信息对象追加到下拉列表对象中
				obj.appendChild(opt);
			}
		}
		try{
			obj.style.width="150px";
			document.getElementById('organcode').style.width='145px';
		}catch(e){}
	}
var obj = document.getElementById('queryhour');
	if(obj!=null){
		for(var i = 0;i < 24; i++){
			//创建下拉信息对象
			var opt=document.createElement('option');
			if(i<10){
				opt.value="0"+i;
				opt.innerText="0"+i;;
			}else{
				opt.value=i;
				opt.innerText=i;
			}
			if(opt.value=='<%=starthour%>'){
					opt.selected=true;
			}
			//把下拉信息对象追加到下拉列表对象中
			obj.appendChild(opt);
			
		}
	}
	var obj = document.getElementById('queryhour2');
	if(obj!=null){
		for(var i = 0;i < 24; i++){
			//创建下拉信息对象
			var opt=document.createElement('option');
			if(i<10){
				opt.value="0"+i;
				opt.innerText="0"+i;;
			}else{
				opt.value=i;
				opt.innerText=i;
			}
			if(opt.value=='<%=endhour%>'){
					opt.selected=true;
			}
			//把下拉信息对象追加到下拉列表对象中
			obj.appendChild(opt);
			
		}
	}
	var obj = document.getElementById('queryminute');
	if(obj!=null){
		for(var i = 0;i < 60; i++){
			//创建下拉信息对象
			var opt=document.createElement('option');
			if(i<10){
				opt.value="0"+i;
				opt.innerText="0"+i;;
			}else{
				opt.value=i;
				opt.innerText=i;
			}
			if(opt.value=='<%=startminute%>'){
					opt.selected=true;
			}
			//把下拉信息对象追加到下拉列表对象中
			obj.appendChild(opt);
		}
	}
	var obj = document.getElementById('queryminute2');
	if(obj!=null){
		for(var i = 0;i < 60; i++){
			//创建下拉信息对象
			var opt=document.createElement('option');
			if(i<10){
				opt.value="0"+i;
				opt.innerText="0"+i;;
			}else{
				opt.value=i;
				opt.innerText=i;
			}
			if(opt.value=='<%=endminute%>'){
					opt.selected=true;
			}
			//把下拉信息对象追加到下拉列表对象中
			obj.appendChild(opt);
		}
	}
}

function selectIntree_organcode(a,b,c,obj,e,f,g){
	var formObject = $("queryform");
	var elementcode = formObject.organtype.value;
	if(null == elementcode || "" == elementcode){
		alert("请先选择一种机构类型！");
		return false;
	}
	//var codevalue =  formObject.bdgage.value;
	var submenu = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	selectMutlElememt(mainmenu,submenu,"5001",elementcode,obj,false,"",elementcode);
	//selectBaseInfoElememt(mainmenu,submenu,elementcode,obj,codevalue);
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
  
  
  //查询所有的权限
function selectMutlElememt(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,checkflag,elementfilter,organtype){debugger;
    //wy add 20090923     46000000,46000011,"5001",    "bdgagency", this.form.bdgagency, false,"","bdgagency"
    					//46000000,46000011,"5001",    "agentbank", this.form.agentbank, false,"","agentbank"
    /** ganhua 20080304 在打开选择窗口前回调一个方法做某些事情
	  * 如：设置过滤条件，检查联动的其它控件是否选择值
	  * 
	**/
	codeShowFlag=1;
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	window.checkflag = checkflag;
	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";;
	var notReturn = true;
    try{
        notReturn = eval(func);
	}catch(e){
		//不成功,不管它,当没有实现该方法
	}
	if(notReturn == false)
	{
		return;
	}
	var elementfilter = "";
	if(window.elementfilter){
		elementfilter = window.elementfilter;
	}

	var refererurl = ""+window.location.href;
	
	var url = ROOT_PATH+"/common/tree/openTreeUser.do?organtype="+organtype+"&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode
		+"&vchfieldcode="+vchfieldcode+"&elementfilter="+elementfilter+"&managerid=1"
		+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var result = window.showModalDialog(url,window,"dialogHeight:500px;dialogWidth: 325px;resizable: No; status: No; help:No;");
	//var result = window.open(url, 'newWindow','dialogWidth=400px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
    //清楚窗体的过滤条件 ganhua 20090509
	if(window.elementfilter);
	{
		window.elementfilter = null;
	}
	if(result != null){
	    if(typeof(result)!="string"){
			if(backinput == null){
				backinput = $(vchfieldcode);
			}
			backinput.value = result.value;
			backinput.valueid = result.id;
			backinput.isleaf= result.isleaf;
			backinput.valuecode = result.valuecode;debugger;
			document.getElementById("hidden_organcode").value= result.valuecode;
			document.getElementById("organcode_valuecode").value= result.valuecode;
		}
	}
	else
	{
	    if(backinput != null){
	        backinput.value = "";
			backinput.valueid = null;
			backinput.valuecode = "";
			document.getElementById("hidden_organcode").value= "";
			document.getElementById("organcode_valuecode").value= "";
	    } 
	 }
	 codeShowFlag=null;
}
</script>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id="queryform"
	action="<%=request.getContextPath()%>/portal/onlineuser/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<div id= querylist style='display:block;'>   
		<table width=97% border=0 cellspacing=0 cellpadding=0> 
       		<tr> 
       		    <script> function createOption(optList){ if(optList==undefined||optList==null ||optList.length==0) return; var htmlStr =''; for(var i=0; i<optList.length;i++){ var opt = optList[i]; htmlStr += '<option value ='+opt+'>'+opt+'</option>' } return htmlStr; } function checkDef(def){ if(def.indexOf('|')<0||def==undefined ||def==null) alert('您输入的菜单选项格式不对！'); } </script>
 				<td nowrap=nowrap style = 'width:7%'>用户名称</td>
  				<td nowrap=nowrap style = 'width:15%'>
  					<input name=name id=name type=text maxlength=255 onblur="this.value=convertStr(this.value);"/>
  					<input name="hidden_name" id="hidden_name" type="hidden">
  				</td> 
 			    <td nowrap=nowrap style = 'width:7%'>登录时间</td>
				<td nowrap="nowrap"style = 'width:25%'>
					<select name=queryhour id=queryhour onchange="" style="width:42px">
						<option value=""></option>
					</select>时
					<select name=queryminute id=name=queryminute onchange="" style="width:42px">
						<option value=""></option>
					</select>分
					至
					<select name=queryhour2 id=queryhour2 onchange="" style="width:42px">
						<option value=""></option>
					</select>时
					<select name=queryminute2 id=queryminute2 onchange="" style="width:42px">
						<option value=""></option>
					</select>分
				</td>				
				<td nowrap=nowrap id='td_organtype_1' style = 'width:7%'>机构类型</td>
				<td nowrap=nowrap id='td_organtype_2' style = 'width:20%'>
					<select name="organtype" id="organtype" onchange='clearInput(document.getElementById("organcode"));clearInput(document.getElementById("organcode_valuecode"));'></select>
				</td> 
     		</tr> 
     		<tr> 
			  <td nowrap=nowrap id='td_organcode_1' style = 'width:7%'>机构名称</td>
			  <td nowrap=nowrap id='td_organcode_1' style = 'width:20%'>
				  <input name="hidden_organcode" id="hidden_organcode" type="hidden">
				  <input name="organcode_valuecode" id="organcode_valuecode" type="hidden">
				  <input id="organcode" name="organcode" type=text class=text_pop readonly onclick='clearInputRule("organcode");try{selectIntree_organcode(26900938,26900998,"5515",this,"","","");}catch(e){}' />  
				  <button style='margin-left:8px;' onclick='clearInputRule("organcode");try{selectIntree_organcode(26900938,26900998,"5515",document.getElementById("organcode"),"","","");}catch(e){}'></button>
				  <img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='clearInputRule("organcode");clearInput(document.getElementById("organcode"));clearInput(document.getElementById("organcode_valuecode"));'>
			</td> 
			<td nowrap=nowrap style = 'width:7%' >&nbsp;</td>
			<td nowrap=nowrap style = 'width:20%'>&nbsp;</td> 
			<td nowrap=nowrap style = 'width:7%' >&nbsp;</td>
			<td nowrap=nowrap style = 'width:20%'>&nbsp;</td> 
	    </tr> 
  </table> </div><input type="hidden" name="allflag"/><input type="hidden" name="totalrows" /><input type="hidden" name="totalpages" /><input type="hidden" name="rows"/><input type="hidden" name="currpage" value="1"/><script> ExForm($('queryform'));  function addQueryFormInput(){ var obj; return true; }
 function queryCheckIdata(){return true;}
function clearInputRule(element){ 
} 
 function clearValueofIsDataSouce(){ var obj;} 
</script> 
<input type='hidden' name='fromquery' value='yes'/><input type='hidden'id='isQuery' name='isQuery' value='yes'/><script> ExForm($('queryform')); </script> 
<script> JQ(document).ready(function() {loadselectquery();});  </script> 
<script> var programtreetype = 0;</script>


</form>

<div>
	<form name="mainListForm" id="mainListForm" action="#" method="post">
		<input name="selectedbillids" id="selectedbillids" type="hidden"
			value="">
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						在线用户：共<font color='red'><%=onlinecount%></font>人
					</div>
				</li>				
				<li><ui:row2column dataid="tmain" showdivname="edit_table" columnNum= "4"/></li>
			</ul>
		</div>
		<!--请保留此div和a标签 -->		
		<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
		<div id="containerline20" style="display: block;">
			<ui:datatable columndefine="true" id="tmain" tabletype="MainList"  data="json"  showcheckbox="true"/>
		</div>
		
	</form>
</div>
 <SCRIPT FOR=window EVENT=onload LANGUAGE="JScript">
createorgantype();
</script>
