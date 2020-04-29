<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ page import="gov.mof.fasp.ifmis.portal.portalmanage.userprogramset.dto.ProgramInfo" %>
<%
	ProgramInfo programInfo=(ProgramInfo)request.getAttribute("programInfo");

%>
<div>
    <form name="detailform" id="detailform" action="#" method="post" >
    <input type="hidden" id="maindata" name="maindata" value=""/>
    <input type="hidden" id="optype" name="optype" value="add"/>
		<div id="form_table_title" >
			<ul>
				<li class="top">
					<div>
						修改业务系统
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
		      <th class = 'thwidth'><div align=left>编码<span>*</span></div></th>
		      <td nowrap=nowrap  colspan="1"  align="left">
		      	 <input type='text' name='pcode' value='<c:out value="${programInfo.code}"/>' contentEditable='false'>
		      	 
			  </td> 
		      <th class = 'thwidth'><div align=left>名称<span>*</span></div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		   	 	 <input type='text' name='name' value='<c:out value="${programInfo.name}"/>'>
		   	  </td>
		   	   <th class = 'thwidth'><div align=left>标识符 <span>*</span></div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		      	  <input type='text' name='psign' value='<c:out value="${programInfo.sign}"/>'>
		   	  </td>
		   </tr> 
		    <tr> 
		      <th class = 'thwidth'><div align=left>类型<span>*</span></div></th>
		      <td nowrap=nowrap  colspan="1"  align="left">
		     	  <select name='ptype' id='ptype'><option value=1>B/S</option><option value=2>C/S</option><option value=3>数据</option></select>
			  </td> 
		      <th class = 'thwidth'><div align=left>系统类型<span>*</span></div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
				  <select name='ptjhq' id='ptjhq'>
					  <option value=1>太极华清系统</option>
					  <option value=2>龙图系统</option>
			          <option value=3>龙图数据系统</option>
			          <option value=4>一体化系统</option>
			          <option value=5>其他系统</option>
			          <option value=6>未实现系统</option>
			          <option value=7>ASP系统</option>
				  </select>
		      </td> 
		      <th class = 'thwidth'><div align=left> URL<span>（C/S可选填）</span></div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		      	  <input type='text' name='purl' value='<c:out value="${programInfo.url}"/>'>
		   	  </td>
		   </tr> 
		   <tr> 
		      <th class = 'thwidth'><div align="left">年度参数</div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
			  	  <input type='checkbox' name='pneedyear' value='0' id='pneedyear' onclick="changepneedyear(this)"/>		 	
			  </td>
		      <th class = 'thwidth'><div align="left">年度参数类型</div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
				  <select name='pyearstyle' id='pyearstyle'><option value=0></option><option value=1>年度(YYYY)</option><option value=2>年度数据库字符串</option></select>
		      </td>
		      <th class = 'thwidth'><div align="left">显示顺序</div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		      	  
		      	  <input type='text' name='porder' id="porder" value='<c:out value="${programInfo.showorder}"/>'>
		      </td>
          </tr> 
          <tr> 
		      <th class = 'thwidth'><div align="left">待办事项</div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		      	<input type='checkbox' name='ptask' value='0' id='ptask' onclick="changeptask(this)"/></td>
		 	  </td>
		      <th class = 'thwidth'><div align="left">应用程序地址</div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
				<input type='text' size='30' name='appLocation' value='<c:out value="${programInfo.appLocation}"/>'>		     
			  </td>
		      <th class = 'thwidth'><div align="left">服务器地址</div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		      	<input type='text' name='phosturl' size='30' value='<c:out value="${programInfo.hosturl}"/>'>
		      </td>
          </tr> 
           <tr> 
           	  <th class = 'thwidth'><div align=left>打开方式</div></th>
		      <td nowrap=nowrap  colspan="1"  align="left">
		     	  <select name='opentype' ><option value=1>新窗口</option><option value=2>当前窗口</option></select>
			  </td> 
		      <th class = 'thwidth'><div align="left">cs默认路径</div></th>
		      <td nowrap=nowrap colspan="3"  align="left">
		      	<input id='startpath' size='50' type='file' name='file'  contentEditable='false' value=''>
		 	  </td>
           <tr> 
              <th class = 'thwidth'><div align=left> webservice验证</div></th>
		      <td nowrap=nowrap colspan="1"  align="left">
		      	  <input type='text' name='checkurl' id = 'checkurl' value='<c:out value="${programInfo.webservice}"/>'>
		      	  <input type="button" id="check" name="check"  value="验证" onclick="Check()" class="button_style" >
		   	  </td>
           	  <th class = 'thwidth'><div align="left">当前默认路径</div></th>
		      <td nowrap=nowrap colspan="3"  align="left">
		      	<c:out value="${programInfo.initialpath}"/>
		 	  </td>
		 	 
          </tr> 
      </table> 
    </div> 
	<input name=submenu id=submenu type="hidden"
		value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden"
		value="<c:out value='${param.mainmenu}'/>" />
	<div id="confirm_exit_btn">
		<input type="button" id="saveAndOut" name="save"  value="保存并返回" onclick="saveExit()" class="button_style" >
		<input type="button" id="cancel"   name="cancel"  value="返回" onclick="cancelSave()" class="button_style">	
	</div>
</form>
<script type="text/javascript">
	function checkInput(formObject){
		
		if(formObject.pcode.value.trim() == ""){
			alert("请输入编码!");
			return false;
		}
		if(formObject.name.value.trim() == ""){
			alert("请输入名称!");
			return false;
		}
		if(formObject.psign.value.trim() == ""){
			alert("请输入标识符!");
			return false;
		}
		if(formObject.ptype.value.trim()=='1' && formObject.purl.value.trim() == ""){
			alert("请输入URL!");
			return false;
		}
		//等等。。
	    return true;
	}
	//保存并继续
	function saveContinue(){
		var formObject = $("detailform");
	    if(checkInput(formObject)){
		    formObject.action = "<%=request.getContextPath()%>/common/saveContinue.do";
		    formObject.submit();
	    }
	}
	//保存并退出
	function saveExit(){
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
	    var formObject = $("detailform");
	    if(checkInput(formObject)){
	    	var url = "<%=request.getContextPath()%>/portal/userprogramset/updateprogramconfigset.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
		    formObject.action = url;
		    formObject.submit();
	    }
	}
	//返回
	function cancelSave(){
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		var url = "<%=request.getContextPath()%>/common/loadProgramConfig.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
		window.location.href = url;
	}
	function changepneedyear(obj){
		if(obj.checked==true){
			obj.value=1;
		}else{
			obj.value=0;
		}
		
	}
	function changeptask(obj){
		if(obj.checked==true){
			obj.value=1;
		}else{
			obj.value=0;
		}		
	}
	//初始化
	function onloadParam(){
		var ptype = document.getElementById('ptype');
		var ptjhq = document.getElementById('ptjhq');
		var pneedyear = document.getElementById('pneedyear');
		var pyearstyle = document.getElementById('pyearstyle');
		var ptask = document.getElementById('ptask');
		
		var ptypeval='<c:out value="${programInfo.type}"/>';
		var ptjhqval='<c:out value="${programInfo.tjhqprogram}"/>';
		var pneedyearval='<c:out value="${programInfo.needyearparameter}"/>';
		var pyearstyleval='<c:out value="${programInfo.yearstyle}"/>';
		var ptaskval='<c:out value="${programInfo.pendingtask}"/>';
		var opentypeval = '<c:out value="${programInfo.opentype}"/>';
		if(opentypeval=="2"){
			document.getElementById('opentype').value = opentypeval;
		}
		//alert(ptypeval+'@'+ptypeval+'@'+ptjhqval+'@'+pneedyearval+'@'+ptaskval+'@');
		ptype.value=ptypeval;
		ptjhq.value=ptjhqval;
		if(pneedyearval=='1'){
			pneedyear.checked=true;
		}
		pneedyear.value=pneedyearval;
		
		pyearstyle.value=pyearstyleval;
		
		if(ptaskval=='1'){
			ptask.checked=true;
		}
		ptask.value=ptaskval;
	}
	onloadParam();
	
	//begin 2012.11.22 楚艳红  编辑业务系统增加检测webservice功能
function Check(){
	var formObject = $("detailform"); 
	var checkurl = document.detailform.checkurl.value;
	new Ajax.Request("<%=request.getContextPath()%>/common/progaramcheck.do?random="+Math.random(), 
     	{
	   		parameters :  "mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&checkurl="+checkurl+"",
	   		method: 'get', 
	   		onComplete : function(resp) { 
	     	
	     	if(resp.responseText=="true"){
	     	alert("验证通过");
	     	return;
	     	}else{
	     	alert("验证不通过");
	     	return;
	     	}
	     	
	        },
	   		requestHeaders: {Accept: 'application/json'},
	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
	     	netWorkEception();
	        }
		}); 
	}
	//end 2012.11.22 楚艳红  编辑业务系统增加检测webservice功能
	
	</script>