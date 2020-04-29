<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);

	String styleName = "stylefontS.css";
	if (session.getAttribute("StyleName") != null) {
		styleName = (String) session.getAttribute("StyleName");
	}

	response.setDateHeader("Expires", 0);
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<HTML>
	<link rel="stylesheet" id="ifmisfontstyle" type="text/css"
		href="<%=basePath%>/style/<%=styleName%>" />
	<HEAD>
		<TITLE>项目维护&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TITLE>
		<STYLE>
TD {
	font-size: 10pt;
	font-family: verdana, helvetica;
	text-decoration: none;
	white-space: nowrap;
}

A {
	text-decoration: none;
	color: black;
}

select {
	width: 110px;
}

textarea {
	width: 100%;
}
</STYLE>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/choose.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/changescroll.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>
			
<script type="text/javascript">
var ROOT_PATH = '<%=basePath%>';
var detailObj = new Object();
var detailObjClone ;//单独传递自定义属性

	// 校验code和name 
	var checkflag = false;
	function check() {
		if(checkNull()){
			if(window.dialogArguments.addFlag!="modify"){
				setSavingData();
				var pars = 'program='+"["+Object.toJSON(detailObj)+"]";
		   		var url ="/common/queryProgramByCode.do";		
				var myAjax = new Ajax.Request(url,
							   	{
								   	 method: 'post',
								   	 parameters: pars,
								   	 onComplete : savetest,
									 onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
									 	alert("此项目已存在!");
									 }
								} 
			   				);
		   	}else{
				setSavingData();
				var pars = 'program='+"["+Object.toJSON(detailObj)+"]";
		   		var url ="/common/queryProgramByName.do";		
				var myAjax = new Ajax.Request(url,
							   	{
								   	 method: 'post',
								   	 parameters: pars,
								   	 onComplete : savemodify,
									 onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
									 }
								} 
			   				);

    		}
    	}	
 }   
	
function savemodify(resp){
	var data = resp.responseText.evalJSON(true);
	var flag = data.flag;
	if(flag=="true"){ //没有重名项
		var itemid = window.dialogArguments.itemid;
		var dtlform = $("detailform");
	   var code = dtlform.itemcode.value;
	var name =  convertStr(dtlform.name.value);
	var pars = "itemid="+itemid+"&code="+code+"&name="+name;
	if(detailObjClone){
		pars +='&selfprogram='+"["+Object.toJSON(detailObjClone)+"]";
	}
	var url = "/common/updateprogram.do";
	var myAjax = new Ajax.Request(url,
				   	{
					   	 method: 'post',
					   	 parameters: pars,
					   	 onComplete : function(resp){
					   	 	var data = resp.responseText;
					   	 	if(eval(data)){
					   	 		alert("项目修改成功！");
					   	 		window.dialogArguments.load();
					   	 		window.close();
					   	 	}else{
					   	 		alert("项目修改失败！");
					   	 	closeDiv();
					   	 	}
					   	 }
					} 
   				);
		}else{
			var itemid = data.json.split(';')[0]; //格式写死了后台。
			if(data.repeatname==1&&detailObj.superitemid!=itemid){
				show();
				if(!confirm(("此项目名称已存在,是否继续保存?"))){
					 closeDiv();
					 //关闭树窗口
					// window.close();				
				}else{
					var itemid = window.dialogArguments.itemid;
					var dtlform = $("detailform");
				   var code = dtlform.itemcode.value;
				var name =  convertStr(dtlform.name.value);
				var pars = "itemid="+itemid+"&code="+code+"&name="+name;
				if(detailObjClone){
					pars +='&selfprogram='+"["+Object.toJSON(detailObjClone)+"]";
				}
				var url = "/common/updateprogram.do";
				var myAjax = new Ajax.Request(url,
							   	{
								   	 method: 'post',
								   	 parameters: pars,
								   	 onComplete : function(resp){
								   	 	var data = resp.responseText;
								   	 	if(eval(data)){
								   	 		alert("项目修改成功！");
								   	 		window.dialogArguments.load();
								   	 		window.close();
								   	 	}else{
								   	 		alert("项目修改失败！");
								   	 	closeDiv();
								   	 	}
								   	 }
								} 
			   				);
				}
			}else{
				show();
				var itemid = window.dialogArguments.itemid;
				var dtlform = $("detailform");
			   var code = dtlform.itemcode.value;
			var name =  convertStr(dtlform.name.value);
			var pars = "itemid="+itemid+"&code="+code+"&name="+name;
			if(detailObjClone){
				pars +='&selfprogram='+"["+Object.toJSON(detailObjClone)+"]";
			}
			var url = "/common/updateprogram.do";
			var myAjax = new Ajax.Request(url,
						   	{
							   	 method: 'post',
							   	 parameters: pars,
							   	 onComplete : function(resp){
							   	 	var data = resp.responseText;
							   	 	if(eval(data)){
							   	 		alert("项目修改成功！");
							   	 		window.dialogArguments.load();
							   	 		window.close();
							   	 	}else{
							   	 		alert("项目修改失败！");
							   	 		closeDiv();
							   	 	}
							   	 }
							} 
		   				);
			}
		} 

}
//保存
function savetest(resp){
		var data = resp.responseText.evalJSON(true);
		var flag = data.flag;
		var json = data.json;
		if(flag=="true"){
	      show();  
		  //setSavingData();
	      var pars = "["+Object.toJSON(detailObj)+"]"
		if(detailObjClone){
				pars +='&selfprogram='+"["+Object.toJSON(detailObjClone)+"]";
		}
	      var url ='/common/addProgram.do';
	      var reulst = 'program='+pars;
	      var myAjax = new Ajax.Request(url,
						   	{
							   	 method: 'post',
							   	 parameters: reulst,
							   	 onComplete : showResponse
							} 
		   				); 
		}
		else if(flag=="code"){
			show();
			alert("此项目编码已存在!");
			showMsg(resp);
		}
		else{
			if(data.repeatname==1){
				show();
				if(!confirm(("此项目名称已存在,是否继续保存?"))){
					showMsg(resp);					
				}else{
				      var pars = "["+Object.toJSON(detailObj)+"]"
				      var url ='/common/addProgram.do';
				      var reulst = 'program='+pars;
				      var myAjax = new Ajax.Request(url,
									   	{
										   	 method: 'post',
										   	 parameters: reulst,
										   	 onComplete : showResponse
										} 
					   				); 
				}
			}else{
				show();
				alert("此项目名称已存在!");
				showMsg(resp);
			}
		}
}
function showMsg(resp){
		var data = resp.responseText.evalJSON(true);
		 var json = data.json;
		 detailObj.id = json.split(";")[0];
		 detailObj.value = json.split(";")[1];
		 if(codeType=='2' && haveCode && addFlag == "child"){
		 	var code = json.split(";")[0];
		 	detailObj.valuecode = window.dialogArguments.path+","+detailObj.id;
		 }else{
		 	detailObj.valuecode	= detailObj.id;
		 }
		 closeDiv();
		 //关闭树窗口
		 window.close();
		 window.dialogArguments.parent.addBack(detailObj);
}
function showResponse(tr){
		 var json = tr.responseText;
		 detailObj.id = json.split(";")[0];
		 detailObj.value = json.split(";")[1];
		 if(codeType=='2'&& haveCode && addFlag == "child"){
		 	detailObj.valuecode = window.dialogArguments.path+","+detailObj.id;
		 }else{
		 	detailObj.valuecode	= detailObj.id;
		 }
		 closeDiv();
		 //关闭树窗口
		 window.close();
		 window.dialogArguments.parent.addBack(detailObj);
}

function setSavingData(){
		var dtlform = $("detailform");
		//2010年2月24日 11:38:21
		//周伟 将项目名称中的半角字符替换为全角字符
		if(dtlform.superid){
			detailObj.superitemid = dtlform.superid.value !="" ? dtlform.superid.value : null;
			detailObj.itemcode = dtlform.itemcode.value;
		}
		detailObj.name =  convertStr(dtlform.name.value).replace(/\-/g, "");
		//获取判重条件
		if($("repeatprogram") && $("repeatprogram").value){
			detailObj.repeatprogram = dtlform.repeatprogram.value;
		}
		for(var i=0;i<elements.length;i++){
			if($(elements[i]).checkbox){ //自定义属性必须有checkbox属性
				detailObjClone = new Object();
				detailObjClone.itemcode = detailObj.itemcode;
				detailObjClone.vchtypecode = elements[i].toLowerCase();
			}
			if($(elements[i]).value && $(elements[i]).style.display != "none"){
				if($(elements[i]).checkbox&&$(elements[i]).checkbox=="true"){ //多选树，
					var ele = $(elements[i]).value.split(";");
					var ele_name="";
					var ele_code="";
				for(var j=0;j<ele.length-1;j++){
					ele_code +=ele[j].split("-")[0]+",";
					ele_name +=ele[j].split("-")[1]+",";
				}
				detailObjClone[elements[i].toLowerCase()+"_code"] = ele_code;
				detailObjClone[elements[i].toLowerCase()+"_name"] = ele_name;
				detailObjClone[elements[i].toLowerCase()] = $(elements[i]).valueid;
				}else{ //单选树
					detailObj[elements[i].toLowerCase()+"_code"] = $(elements[i]).value.split("-")[0];
					detailObj[elements[i].toLowerCase()+"_name"] = $(elements[i]).value.split("-")[1];
					detailObj[elements[i].toLowerCase()] = $(elements[i]).valueid;
				}
			}
		}
}
//验证
function checkNull(){
		var dtlform = $("detailform");
		//有层码时才进行编码必录判断
		if(codeType ==2 && haveCode != "" && dtlform.itemcode.value.trim() == ""){
			alert("请录入编码!");
			dtlform.itemcode.focus();
			return false; 
		}
		
		if(codeType ==2 && haveCode != "" && dtlform.itemcode.value.trim() != ""){
			var reg = /^[0-9]+$/;
			if(!reg.test(dtlform.itemcode.value.trim())){
				alert("编码只能是数字!");
				dtlform.itemcode.focus();
				return false;
			}
			//新增和修改子节点时验证是父级关系
			var code = '<c:out value='${code}'/>';
			var codeVal = dtlform.itemcode.value.trim();
			if(window.dialogArguments.addFlag!="modify"){
				if(code !="" && codeVal.substring(0,code.length) != code){
					alert("请注意父级编码!");
					dtlform.itemcode.focus();
					return false;
				}
			}else{
				//修改子节点时校验是否与父级相同
				if(codeVal.substring(0,window.dialogArguments.parentcode.length) != window.dialogArguments.parentcode){
					alert("请注意父级编码!");
					dtlform.itemcode.focus();
					return false;
				}
			}
		}
		if(codeType ==2 && haveCode != "" && dtlform.itemcode.value.trim().length<dtlform.itemcode.maxLength){
			alert("此节点编码应为"+dtlform.itemcode.maxLength+"位");
			dtlform.itemcode.focus();
			return false; 
		}
		if(dtlform.name.value.trim() == ""){
			alert("请录入名称!");
			dtlform.name.focus();
			return false; 
		}
		//必填项目验证
		if(mustselect){
			var mustElement = mustselect.split(",");
			for(var i=0;i<mustElement.length;i++){
				if(JQ("#"+mustElement[i]).attr("value")==""){
					alert("请选择 "+elementObj[mustElement[i]][0]);
					return false;
				}
			}
		}
	return true;
}

//返回
function back(){
	try{
     	window.close();
     }catch(e){
     }
}

</script>
	</HEAD>
	<BODY onload="" class="pop_body">
		<div id="popPage1">
			<div id="shenhe_title">
				<div id="shenhe_title_middle"></div>
			</div>
			<div id="form_table_title_edit" style="margin-right: 20px;">
				<ul>
					<li class="top">
						<div>
							<c:choose>
								<c:when test="${codeType ==2 && codeformat != null}">
									项目信息(层码:<c:out value='${codeformat}'/>)
								</c:when>
								<c:otherwise>
									项目信息
								</c:otherwise>
							</c:choose>
						</div>
					</li>
				</ul>
			</div>

			<FORM name="detailform" id="detailform" method="post"
				action="/common/addProgram.do">
				<input type="hidden" id="program" name="program" />
				<input type="hidden" id="repeatprogram" name="repeatprogram" />
				<c:if test="${codeType ==2 && codeformat != null}">
					<input type="hidden" id="superid" name="superid" value="<c:out value='${superid}'/>"/>
				</c:if>
				<div id="edit_table" style="width: 99%;">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<c:if test="${codeType ==2 && codeformat != null}">
							<tr>
								<th nowrap=nowrap style='width: 13%'>
									<div align=left>
										编码
										<span>*</span>
									</div>
								</th>
								<td nowrap=nowrap style='width: 20%' align="left">
									<input name=itemcode id=itemcode type="text" maxlength="250"
										class="main_lookup_input"  value='<c:out value='${code}'/>' />
							</tr>
						</c:if>
						<tr>
							<th nowrap=nowrap style='width: 13%'>
								<div align=left>
									名称
									<span>*</span>
								</div>
							</th>
							<td nowrap=nowrap style='width: 20%' align="left">
								<input name=name id=name type="text" maxlength="250"
									class="main_lookup_input" onblur="convertStrForObj(this);"/>
						</tr>
					</table>
				</div>
				<BR />
				<BR />
				<div id="confirm_exit_btn">
					<center>
						<INPUT type="button" name="buton" class="button_style" value="保存"
							onclick="check()" />
						<INPUT type="button" class="button_style" value="取消"
							onclick="back()" />
					</center>
				</div>
			</FORM>

		</div>
		<BR />
		<div id="context"></div>
	</BODY>
</HTML>
<script>
	//页面有的数据项
	var elements = [];
	var dtlform = $("detailform");
	//编码长度设置
	var codeType = '<c:out value="${codeType}"/>';
	var haveCode = '<c:out value="${codeformat}"/>';
	var selectedCode = '<c:out value='${code}'/>';
	//如果无层码编码自动生成,修改时不对层码验证
	if(window.dialogArguments.addFlag!="modify"){
		if(codeType ==2 && haveCode != ""){
			var arrCode = haveCode.split("-");
			if(selectedCode != null && selectedCode !=""){
				var codeLen = 0;
				for(var i=0;i<arrCode.length;i++){
					codeLen += parseInt(arrCode[i]);
					if(selectedCode.length == codeLen && i+1<arrCode.length){
							codeLen += parseInt(arrCode[i+1]);
							break;
					}
				}
				$("itemcode").maxLength=codeLen;
			}else{
				$("itemcode").maxLength=arrCode[0];
			}
		}
	}else{
		//修改时如果选中节点无子节点编码可修改，如果有子节点时不可改置灰
		if(codeType ==2 && haveCode != ""){
			if(window.dialogArguments.haschildnode){
				$("itemcode").disabled = true;
				$("itemcode").maxLength=selectedCode.length;
			}else {
				$("itemcode").maxLength=selectedCode.length;
			}
		}else{
			var html = "<tr><th nowrap=nowrap style='width: 13%'><div align=left>编码&nbsp;<span>*</span></div></th><td nowrap=nowrap style='width: 20%' align='left'><input name=itemcode id=itemcode type='text' maxlength='250' class='main_lookup_input'/></tr>";
			JQ("table").prepend(html);
			JQ("#itemcode").val(selectedCode);
			JQ("#name").val(window.dialogArguments.name);
			$("itemcode").maxLength=selectedCode.length;
		}
	}
 	
//父节点信息
var elementFatherObj={type:['项目归类','PROFUND','{mustselect:true}'],bdgagency:['预算单位','BDGAGENCY'],bdgmanagedivision:['处室','BDGMANAGEDIVISION']};
//临时只取父节点的几个信息	
var elementObj={type:['项目归类','PROFUND','{mustselect:true}'],bdgagency:['预算单位','BDGAGENCY']};
//业务系统判重条件配置
if(window.dialogArguments.repeatprograms){
	JQ("#repeatprogram").val(window.dialogArguments.repeatprograms);
}
//业务系统配置需要增加内容
if(window.dialogArguments.progamAddElements){
	elementObj = window.dialogArguments.progamAddElements;
}
var programInfo = <%=request.getAttribute("programInfo")%>;
function fatherInfo(){
	if(programInfo.length>0){
		if(elementObj){
			for(var bro in elementObj){ //增加子级增加 项目的自定义属性
				if(typeof(elementFatherObj[bro])=="undefined"){
					elementFatherObj[bro] = elementObj[bro];
				}
			}
		}
		for(var pro in elementFatherObj){
		if(programInfo[0][pro] != null && programInfo[0][pro] != '0' && typeof programInfo[0][pro] != "undedfined"){
			var addHTML = "<tr><th nowrap=nowrap style='width: 13%'><div align=left>"+elementFatherObj[pro][0];
			addHTML += "</div></th><td nowrap=nowrap style='width: 20%' align='left'><input name="+pro+" id="+pro;
			addHTML += " type='text' maxlength='250' class='text_pop' readOnly/></td></tr>";
			JQ("table").append(addHTML);
			var code = programInfo[0][pro+"_code"];
			var name = programInfo[0][pro+"_name"];
			var value = code+"-"+name;
			JQ("#"+pro).attr("value",value).attr("valueid",programInfo[0][pro]).attr("disabled","disabled");
			elements.push(pro);
			}else if(elementFatherObj[pro][2]){
		 		var checkbox = false;
		 		var isbottom = false;
		 		if(elementFatherObj[pro][2]){
		 		 var obj = eval('('+elementFatherObj[pro][2]+')');
		 		 checkbox = obj.checkbox;
		 		 isbottom = obj.isbottom;
 		 		 if(obj.mustselect){
				 	if(mustElement.length >0){
				 		mustElement[mustElement.length] = pro;
				 	}else{
				 		mustElement[0] = pro;
				 	}
				 	if(mustselect == null || mustselect == ""){
			 			mustselect += pro;
				 	}else{
			 			mustselect = mustselect + ',' + pro;
				 	}
			 	 }
		 		 
		 		}
				var addHTML = "<tr><th nowrap=nowrap style='width: 13%'><div align=left>"+elementFatherObj[pro][0];
				for(var i=0; i<mustElement.length ; i++){
					if(mustElement[i] == pro){
						addHTML += "<span>*</span>";
					}
				}
				addHTML += "</div></th><td nowrap=nowrap style='width: 20%' align='left'><input name="+pro+" id="+pro;
				//addHTML += " type='text' maxlength='250' class='text_pop' readOnly/></td></tr>";
				addHTML += " type='text' checkbox="+checkbox+" isbottom="+isbottom+" maxlength='250' class='text_pop' onclick='programkind_selecttree(\""+pro+"\",\""+elementFatherObj[pro][1]+"\","+checkbox+","+isbottom+")'/><button id='"+pro+"_btn' onclick='programkind_selecttree(\""+pro+"\",\""+elementFatherObj[pro][1]+"\","+checkbox+","+isbottom+")'></button></td></tr>";
				JQ("table").append(addHTML);
				elements.push(pro);
			}
		}
	}
}
var programAttribute = <%=request.getAttribute("programAttr")%>;

//自定义属性修改
function programAttr(){
	if(programInfo.length>0){
		if(elementObj){
			for(var bro in elementObj){ //增加子级增加 项目的自定义属性
				if(typeof(elementFatherObj[bro])=="undefined"){
					elementFatherObj[bro] = elementObj[bro];
				}
			}
		}
		for(var pro in elementFatherObj){
 			if(elementFatherObj[pro][2]){				
		 		var checkbox = false;
		 		var isbottom = false;
		 		if(elementFatherObj[pro][2]){
		 		 var obj = eval('('+elementFatherObj[pro][2]+')');
		 		 checkbox = obj.checkbox;
		 		 isbottom = obj.isbottom;
 		 		 if(obj.mustselect){
				 	if(mustElement.length >0){
				 		mustElement[mustElement.length] = pro;
				 	}else{
				 		mustElement[0] = pro;
				 	}
				 	if(mustselect == null || mustselect == ""){
			 			mustselect += pro;
				 	}else{
			 			mustselect = mustselect + ',' + pro;
				 	}
			 	 }
				 		 
		 		}
				var addHTML = "<tr><th nowrap=nowrap style='width: 13%'><div align=left>"+elementFatherObj[pro][0];
				for(var i=0; i<mustElement.length ; i++){
					if(mustElement[i] == pro){
						addHTML += "<span>*</span>";
					}
				}
				addHTML += "</div></th><td nowrap=nowrap style='width: 20%' align='left'><input name="+pro+" id="+pro;
				//addHTML += " type='text' maxlength='250' class='text_pop' readOnly/></td></tr>";
				addHTML += " type='text' checkbox="+checkbox+" isbottom="+isbottom+" maxlength='250' class='text_pop' onclick='programkind_selecttree(\""+pro+"\",\""+elementFatherObj[pro][1]+"\","+checkbox+","+isbottom+")'/><button id='"+pro+"_btn' onclick='programkind_selecttree(\""+pro+"\",\""+elementFatherObj[pro][1]+"\","+checkbox+","+isbottom+")'></button></td></tr>";
				JQ("table").append(addHTML);
				
				if(programAttribute){
					var valueid = programAttribute[pro+"_valueid"];
					
					var value = programAttribute[pro];
					if(valueid&&valueid){
						JQ("#"+pro).attr("value",value).attr("valueid",valueid);						
					}
				}
				elements.push(pro);
			}
		}
	}
}
//受控制项
var programdefaultvalue = window.dialogArguments.programdefaultvalue;
var mustselect = window.dialogArguments.mustselect;
var mustElement = []; 
function bdgType(){
	JQ("table").append("<tr><th nowrap=nowrap style='width: 13%'><div align=left>公共项目</div></th><td nowrap=nowrap style='width: 20%' align='left'><input type='checkbox' onclick='removeBdg(this);'/></tr>");
	if(mustselect !="" && typeof mustselect != "undefined"){
 		mustElement = mustselect.split(",");
 	}
 	for(var pro in elementObj){
 		var checkbox = false;
 		var isbottom = false;
 		if(elementObj[pro][2]){
 		 var obj = eval('('+elementObj[pro][2]+')');
 		 checkbox = obj.checkbox;
 		 isbottom = obj.isbottom;
		 if(obj.mustselect){
		 	if(mustElement.length >0){
		 		mustElement[mustElement.length] = pro;
		 	}else{
		 		mustElement[0] = pro;
		 	}
		 	if(mustselect == null || mustselect == ""){
	 			mustselect += pro;
		 	}else{
	 			mustselect = mustselect + ',' + pro;
		 	}
	 	 }
 		}	
			var addHTML = "<tr><th nowrap=nowrap style='width: 13%'><div align=left>"+elementObj[pro][0];
			if(typeof mustElement != "undefined" && JQ.inArray(pro,mustElement)>-1){
				addHTML += "<span>*</span>";
			}
			addHTML += "</div></th><td nowrap=nowrap style='width: 20%' align='left'><input name="+pro+" id="+pro;
			addHTML += " type='text' checkbox="+checkbox+" isbottom="+isbottom+" maxlength='250' class='text_pop' onclick='programkind_selecttree(\""+pro+"\",\""+elementObj[pro][1]+"\","+checkbox+","+isbottom+")'/><button id='"+pro+"_btn' onclick='programkind_selecttree(\""+pro+"\",\""+elementObj[pro][1]+"\","+checkbox+","+isbottom+")'></button></td></tr>";
			JQ("table").append(addHTML);
			elements.push(pro);
		}
 	if(programdefaultvalue != "" && typeof programdefaultvalue != "undefined"){
		for(var i =0;i<programdefaultvalue.length;i++){
			if(JQ("#"+programdefaultvalue[i].proname.toLowerCase()).length>0 && programdefaultvalue[i].value){
				JQ("#"+programdefaultvalue[i].proname.toLowerCase()).attr("value",programdefaultvalue[i].value).attr("valueid",programdefaultvalue[i].valueid).attr("disabled","disabled");
				JQ("#"+programdefaultvalue[i].proname.toLowerCase()+"_btn").attr("disabled","disabled");
			}
		}
	}
}
//项目级次 增加父节点按受控显示 子级按父级不相关不为空显示
var addFlag = window.dialogArguments.addFlag;
if(codeType ==2 && haveCode != ""){
	if(addFlag == "father"){
 		bdgType();	
 	}else if(addFlag == "child"){
 		fatherInfo();
 	}else{
 		//只修改编码和名称
 		JQ("#name").val(window.dialogArguments.name);
 		programAttr(); //可以修改项目的自定义属性，该属性必须是没有在项目表里定义的字段，否则自定义无意义 jzy
 	}	
}else{
	bdgType();
}
//公共项目(单位或者处室为空即为公共项目)
function removeBdg(chk){
	var input = document.getElementById("BDGAGENCY") || document.getElementById("BDGMANAGEDIVISION");
	if(input){
		var tr = input.parentNode.parentNode;
		if(chk.checked){
			tr.style.display = "none";
			input.style.display = "none";
		}else{
			tr.style.display = "";
			input.style.display = "";
		}
	}
}
//弹出树公用方法
var vchCode = window.dialogArguments.vchCode;
function programkind_selecttree(element,sourceelement,ischeckbox,isbottom){
	if(vchCode){
		if(element == 'type')
			selectElememtByUrlWithAllField(0,0,'8003',element,document.getElementById(element));
		else
			selectElememtByUrlWithAllField(0,0,vchCode,element,document.getElementById(element));
	}else{
		if(ischeckbox){ //复选
			selectMutElememtByOnlyElementcode(sourceelement,document.getElementById(element),"1",null,null,isbottom);
		}else{
			selectElememtByOnlyElementcode(sourceelement,document.getElementById(element),"1");			
		}
	}
}
function setFont(fontsize){
  	if(fontsize=="l"){
  	  document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontL.css';
      setFontSession("stylefontL.css");	
    }else if(fontsize=="m"){
      document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontM.css';
      setFontSession("stylefontM.css");	
    }else{
      document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontS.css';
      setFontSession("stylefontS.css"); 
    }
    setFontCookie(fontsize);
}
</script>
