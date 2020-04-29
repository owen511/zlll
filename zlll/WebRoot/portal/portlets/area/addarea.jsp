<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<div>
    <form name="AreaForm" id="AreaForm" action="#" method="post" >
    <input type="hidden" id="maindata" name="maindata" value=""/>
    <input type="hidden" id="optype" name="optype" value="add"/>
		<div id="form_table_title" >
			<ul>
				<li class="top">
					<div>
						新增地区管理
					</div>
				</li>
			</ul>
		</div>
		<!-- 请保留此div和a标签  -->
		<div id="edit_table" style="height:400px;">
		<!--按link解析编辑区 -->
		<div id="editform" onkeydown = "switchFocus()"> 
		<table id ="edittable" width="100%" border="0" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
		   <tr> 
		      <th class = 'thwidth'><div align=left>年份<span>*</span></div></th>
		      <td nowrap=nowrap  colspan="1"  align="left">
		      	<input name=year id=year type="text" style="text-align:left"  maxlength="250"  class="textmin" title=""  />
			  </td> 
		      <th class = 'thwidth'><div align=left>地区标识符<span>*</span></div></th>
		      <td nowrap=nowrap colspan="1" align="left">
		      	<input name=code id=code type="text" style="text-align:left"  maxlength="250"  class="textmin" title=""    />
			  </td> 
		      <th class = 'thwidth'><div align=left>名称<span>*</span></div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		      	<input name=name id=name type="text" style="text-align:left"  maxlength="250"  class="textmin" title=""  />
		   </tr> 
		   <tr> 
		      <th class = 'thwidth'><div align="left">服务器地址<span>*</span></div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		      	<input name=url id=url type="text" style="text-align:left"  maxlength="250"  class="textmin" title="" />
		 	  </td>
		      <th class = 'thwidth'><div align="left">数据源<span>*</span></div></th>
		      <td nowrap=nowrap colspan="3"  align="left">
		      	<input name=inditext id=inditext type="text" style="text-align:left;"  maxlength="250"  class="textmin" title=""  />
		      </td>
          </tr> 
      </table> 
    </div> 
	<input name=submenu id=submenu type="hidden"
		value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden"
		value="<c:out value='${param.mainmenu}'/>" />
	<div id="querybutton"> 
		<div align="right">
			<input type="button" id="saveAndOut" name="save"  value="保存" onclick="saveArea()" class="button_style" >
			<input type="button" id="cancel"   name="cancel"  value="返回" onclick="cancelSave()" class="button_style">	
		</div>
	</div>
</form>
<script type="text/javascript">
	function checkInput(formObject){
		if(formObject.acctyear.value.trim() == ""){
			alert("请输入年份!");
			return false;
		}
		if(formObject.areaflag.value.trim() == ""){
			alert("地区标识符!");
			return false;
		}
		if(formObject.areaname.value.trim() == ""){
			alert("请输入地区名称!");
			return false;
		}
		if(formObject.serverUrl.value.trim() == ""){
			alert("请输入服务器地址!");
			return false;
		}
		
		if(formObject.datasource.value.trim() == ""){
			alert("请输入数据源!");
			return false;
		}
	    return true;
	}
	//保存新增地区
    function saveArea(){
    
	    if($('AreaForm').name.value.trim()==''){
	    	alert("请输入名称!");
    		return;
	    }
	    if($('AreaForm').url.value.trim()!=''){
	    debugger;
	    	var hosturl=$('AreaForm').url.value; 
	    	for(i=0;i<hosturl.length;i++){
	    		if(hosturl.substring(i,i+1)=="："){
	    	       		alert("服务器地址包含中文字符：！");
	    	       		return;
	    	       	}
	    	}
	    }else{
	    	alert("请输入服务器地址!");
	    	return ;
	    }
	    if($('AreaForm').code.value.trim()==''){
	    	alert("请输入有效地区标识");
    		return;
	    }
	    if($('AreaForm').year.value.trim()==''){
	    	alert("请输入有效年份！");
	    	return;
	    }
	    if($('AreaForm').inditext.value.trim()==''){
	    	alert("请输入数据源！");
	    	return;
	    }
	    
    	var formObject = $('AreaForm');
    	formObject.action = "<%=request.getContextPath()%>/portal/area/SaveArea.do";
		    new Ajax.Request("<%=request.getContextPath()%>/portal/area/SaveCheckArea.do?random="+Math.random(), 
     	{
	   		parameters :  encodeURI(Form.serialize(formObject)),
	   		method: 'get', 
	   		onComplete : function(resp) { //"resp" is just the XMLHttpRequest object
	     	if(resp.responseText=="false"){
	     	alert("地区和年份不能同时重复");
	     	return;
	     	}else{
	     	formObject.submit();
	     	}
	     	
	        },
	   		requestHeaders: {Accept: 'application/json'},
	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
	     	netWorkEception();
	        }
		}); 
		    
    }
       

	//保存并继续
	function saveContinue(){
		var formObject = $("detailform");
	    if(checkInput(formObject)){
		    formObject.action = "<%=request.getContextPath()%>/portal/area/saveContinue.do";
		    formObject.submit();
	    }
	}
	//保存并退出
	function saveExit(){
	    var formObject = $("detailform");
	    if(checkInput(formObject)){
		    formObject.action = "<%=request.getContextPath()%>/portal/area/save.do";
		    formObject.submit();
	    }
	}
	//返回
	function cancelSave(){
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		var url = "<%=request.getContextPath()%>/portal/area/index.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
		window.location.href = url;
	}
	function reset_a(){ 
		var formObject = $("detailform");
  		if(confirm("是否取消当前操作?"))
  		formObject.acctyear.value.trim() == "";
	}
	</script>