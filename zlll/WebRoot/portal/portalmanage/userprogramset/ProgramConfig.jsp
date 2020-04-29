<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

  <link href="<%=request.getContextPath()%>/style/styleportal.css" rel="stylesheet" type="text/css" />
  <script>
  function netWorkEception(){
       window.status="网络连接异常!";
    }
  //新增业务系统
 function addprogram(){
 		document.getElementById("hljbjcs").style.display='none';
		document.getElementById('hljbccs').style.display='none';
 		document.getElementById('edittable').style.display='block';
 		document.getElementById('hlj').style.display='block';
 		document.getElementById('hljsave').onclick=function onclick(){saveProgram()};
   		var nodes = $A($('edittable').getElementsByTagName('tr'));
		for(i=0;i<nodes.size();i++) {
		    if(nodes[i].id.startsWith('auto')){  
		       Element.remove(nodes[i]);  
		    }  
		}
		var selectStr="<select name='ptype'>";
		selectStr= selectStr + "<option value=1>B/S</option>";
		selectStr= selectStr + "<option value=2>C/S</option>";
        selectStr= selectStr + "<option value=3>数据</option>";
		selectStr= selectStr +"</select>";
		
		//把是否为太极华清系统修改为下拉列表形式
		var selectStr2="<select name='ptjhq'>";
		selectStr2= selectStr2 + "<option value=1>太极华清系统</option>";
		selectStr2= selectStr2 + "<option value=2>龙图系统</option>";
        selectStr2= selectStr2 + "<option value=3>龙图数据系统</option>";
        selectStr2= selectStr2 + "<option value=4>一体化系统</option>";
        selectStr2= selectStr2 + "<option value=5>其他系统</option>";
        selectStr2= selectStr2 + "<option value=6>未实现系统</option>";
        selectStr2= selectStr2 + "<option value=7>ASP系统</option>";
		selectStr2= selectStr2 +"</select>";
		
		var row = "<tr id='auto'>";
		row = row+"<td colspan='6' height='25px' class='fontcolor'>&nbsp;新增业务系统信息</td>";
		row = row+"</tr>";
		
		//row = row+"</tr>";
		row = row+ "<tr id='auto'>";
		row = row+"<td class='fontcolor'>编码<font color='red'>*</font>："+"</td>"; 
		row = row+"<td colspan='2' class='fontcolor'><input type='text' name='pcode'></td>"; 
		row = row+"<td class='fontcolor'>名称<font color='red'>*</font>：</td>";
		row = row+"<td colspan='2' class='fontcolor'><input type='text' name='name'></td>";
		row = row+"</tr>";
		
		row = row+"<tr id='auto'>";
		row = row+"<td class='fontcolor'>类型<font color='red'>*</font>：</td>";
		row = row+"<td colspan='2' class='fontcolor'>"+selectStr+"</td>";
		row = row+"<td class='fontcolor'>系统类型<font color='red'>*</font>：</td>";
		row = row+"<td colspan='2' class='fontcolor'>"+selectStr2+"</td>";
		//row = row+"<td colspan='2' class='fontcolor'><input type='checkbox' name='ptjhq' value='1'></td>";
		
		row = row+"<tr id='auto'>";
		row = row+"<td  class='fontcolor'>标识符<font color='red'>*</font>：</td>";
		row = row+"<td  colspan='2' class='fontcolor'><input type='text' name='psign'></td>";
		row = row+"<td  class='fontcolor'>URL<font color='red'>*（C/S时可选填）</font>：</td>"; 
		row = row+"<td  colspan='2' class='fontcolor'><input type='text' name='purl'></td>"; 
		row = row+"</tr>";
		
		row = row+"<tr id='auto'>";
		row = row+"<td class='fontcolor'>年度参数：</td>";
		row = row+"<td colspan='2' class='fontcolor'><input type='checkbox' name='pneedyear' value='1'></td>";
		row = row+"<td class='fontcolor'>年度参数类型：</td>";
		row = row+"<td colspan='2' class='fontcolor'><select name='pyearstyle'><option value=0></option><option value=1>年度(YYYY)</option><option value=2>年度数据库字符串</option></select></td>";
		row = row+"</tr>";
		
		row = row+"<tr id='auto'>";
		row = row+"<td class='fontcolor'> 显示顺序：</td>";
		row = row+"<td colspan='2' class='fontcolor'><input type='text' name='porder'></td>";
		row = row+"<td class='fontcolor'>待办事项：</td>";
		row = row+"<td colspan='2' class='fontcolor'><input type='checkbox' name='ptask' value='1'></td>";
		row = row+"</tr>";
		
		row = row+"<tr id='auto'>";
        row = row+"<td  class='fontcolor'>应用程序地址：</td>"; 
        row = row+"<td colspan='5' class='fontcolor'><input type='text' size='50' name='appLocation' value=''></td>"; 
        row = row+"</tr>";
        
        row =row+"<tr id='auto'>";
        row = row+"<td class='fontcolor'>服务器地址：</td>";
		row = row+"<td colspan='5' class='fontcolor'><input type='text' name='phosturl' size='50'></td>";
		//row = row+"<td colspan='4' class='fontcolor'>&nbsp;</td>";
		row = row+"</tr>";
		
		row = row+"<tr id='auto'>";
		row = row+"<td class='fontcolor'>cs默认路径：</td>";
		row = row+"<td class='fontcolor' colspan='5'><input id='startpath' size='50' type='file' name='file' contentEditable='false'></td>";
		row = row+"</tr>";
		//row = row+"<tr id='auto'>";
		//row = row+"<td colspan='6' height='25px' class='fontcolor'><input type='button' value='保存' onclick='saveProgram()'/><input type='button' value='取消' onclick='reset_a()'></td>";
		//row = row+"</tr>";
        
		new Insertion.After($('placetr'),row);
    } 
    
    //保存新增业务系统
    function saveProgram(){
    	if($('ProgramForm').pcode.value.trim()==''){
	    	alert("请输入编码!");
    		return;
	    }
	    for(var l=0;l<tmain.data.length;l++){
    		if($('ProgramForm').pcode.value.trim()==tmain.data[l].pcode){
		    	alert("编码不能重复!");
	    		return;
	   		}
    	}
	    if($('ProgramForm').name.value.trim()==''){
	    	alert("请输入名称!");
    		return;
	    }
	    if($('ProgramForm').ptype.value=='1'){
	    	if($('ProgramForm').purl.value.trim()==''){
	    	   alert("请输入URL!");
    		   return;
	        }
	        else{
	    	    var url=$('ProgramForm').purl.value; 
	    	    for(i=0;i<url.length;i++){
	    	    	if(url.substring(i,i+1)=="："){
	    	       		alert("URL包含中文字符：！");
	    	       		return;
	    	       	}
	    	    } 
	    	}   	  
	    }
	    if($('ProgramForm').psign.value.trim()==''){
	    	   alert("请输入标识符!");
    		   return;
	    }
        if($('ProgramForm').pneedyear.checked){
	    	if($('ProgramForm').pyearstyle.value=='0'){
	    	   alert("请选择年度参数类型!");
    		   return;
	        }
	    }
	    
	    if($('ProgramForm').phosturl.value.trim()!=''){
	    	var hosturl=$('ProgramForm').phosturl.value; 
	    	for(i=0;i<hosturl.length;i++){
	    		if(hosturl.substring(i,i+1)=="："){
	    	       		alert("服务器地址包含中文字符：！");
	    	       		return;
	    	       	}
	    	}
	    }
	    
    	var userForm = $('ProgramForm');
    	new Ajax.Request("<%=request.getContextPath()%>/common/SaveProgram.do?random="+Math.random(), 
     	{
	   		parameters : encodeURI(Form.serialize(userForm)),
	   		method: 'get', 
	   		onComplete : saveProgramAfer,
	   		requestHeaders: {Accept: 'application/json'},
	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
	        }
		}); 
    }
    function saveProgramAfer(resp){
   			document.getElementById('hlj').style.display='none';
	   		var program = eval(resp.responseText) ;
	   		program[0].checked=true;
	   		for(i=0;i<tmain.data.length;i++){
	   		    tmain.data[i].checked=false;
	   		}
	   		tmain.appendRow(program[0]);
	   		tmain.draw();
	   		var nodes = $A($('edittable').getElementsByTagName('tr'));
			for(i=0;i<nodes.size();i++) {
			    if(nodes[i].id.startsWith('auto')){  
			       Element.remove(nodes[i]);  
			    }  
			}
    }
    
    
    //修改业务系统
    function loadProgram(){
    	document.getElementById("hljbjcs").style.display='none';
		document.getElementById('hljbccs').style.display='none';
        if(tmain!=null && tmain.data!=null && tmain.getSelectedRow()!=null && tmain.getSelectedRow().length==1){
        	document.getElementById('edittable').style.display='block';
        	document.getElementById('hlj').style.display='block';
 		    document.getElementById('hljsave').onclick=function onclick(){updateProgram()};
            var program = tmain.getSelectedRow()[0];
	   		var nodes = $A($('edittable').getElementsByTagName('tr'));
			for(i=0;i<nodes.size();i++) {
			    if(nodes[i].id.startsWith('auto')){  
			       Element.remove(nodes[i]);  
			    }  
			}
			var fchecked="" ; if(program.ptype=="1") fchecked ="selected";
			var schecked="" ; if(program.ptype=="2") schecked ="selected";
			var dchecked="" ; if(program.ptype=="3") dchecked ="selected";
			var ychecked="";  if(program.needyearparameter=="1") ychecked="checked=true";
            var tchecked="";  if(program.pendingtask=="1") tchecked="checked=true";
			//var ptjhq=""; if(program.tjhqprogram=="1") ptjhq="checked=true";
			var tjchecked="" ; if(program.tjhqprogram=="1") tjchecked ="selected";
			var ltchecked="" ; if(program.tjhqprogram=="2") ltchecked ="selected";
			var sjchecked="" ; if(program.tjhqprogram=="3") sjchecked ="selected";
			var ytchecked="" ; if(program.tjhqprogram=="4") ytchecked ="selected";
			var qtchecked="" ; if(program.tjhqprogram=="5") qtchecked ="selected";
			var wsxchecked="" ; if(program.tjhqprogram=="6") wsxchecked ="selected";
			
			var url = ""; if(program.purl!=null){url = program.purl;}
			var sign = ""; if(program.psign!=null){sign = program.psign;}
			var hosturl=""; if(program.phosturl!=null){hosturl = program.phosturl;}
			var appLocation = "";if(program.appLocation!=null){appLocation = program.appLocation;}
			var initialpath = "";if(program.pinitialpath!=null){initialpath = program.pinitialpath;}
            
			var selectStr="<select name='ptype'>";
			selectStr= selectStr + "<option value=1 "+fchecked+">B/S</option>";
			selectStr= selectStr + "<option value=2 "+schecked+">C/S</option>";
			selectStr= selectStr + "<option value=3 "+dchecked+">数据</option>";
			selectStr= selectStr +"</select>";
			//把是否为太极华清系统修改为下拉列表形式
			var selectStr2="<select name='ptjhq'>";
			selectStr2= selectStr2 + "<option value=1 "+tjchecked+">太极华清系统</option>";
			selectStr2= selectStr2 + "<option value=2 "+ltchecked+">龙图系统</option>";
        	selectStr2= selectStr2 + "<option value=3 "+sjchecked+">龙图数据系统</option>";
        	selectStr2= selectStr2 + "<option value=4 "+ytchecked+">一体化系统</option>";
        	selectStr2= selectStr2 + "<option value=5 "+qtchecked+">其他系统</option>";
        	selectStr2= selectStr2 + "<option value=6 "+wsxchecked+">未实现系统</option>";
			selectStr2= selectStr2 +"</select>";
			
			fchecked="";if(program.yearstyle=="1") fchecked ="selected";
			schecked="";if(program.yearstyle=="2") schecked ="selected";
			
			var selectStyle="<select name='pyearstyle'>";
			selectStyle= selectStyle + "<option value=0 selected></option>";
			selectStyle= selectStyle + "<option value=1 "+fchecked+">年度（YYYY）</option>";
			selectStyle= selectStyle + "<option value=2 "+schecked+">年度数据库字符串</option>";
			selectStyle= selectStyle +"</select>";
			
			var row = "<tr id='auto'>";
			row = row+"<td colspan='6'height='25px' class='fontcolor'>&nbsp;修改业务系统信息</td>";
			row = row+"</tr>";
			
			row = row+ "<tr id='auto'><input type='hidden' name='pcode' value='"+program.pcode+"'>";
			row = row+"<td class='fontcolor'>编码："+"</td>"; 
			row = row+"<td colspan='2' class='fontcolor'>"+program.pcode+"</td>"; 
			row = row+"<td class='fontcolor'>名称<font color='red'>*</font>：</td>";
			row = row+"<td colspan='2' class='fontcolor'><input type='text' name='name' value='"+program.pname+"'></td>";
			row = row+"</tr>";
			
			row = row+"<tr id='auto'>";
			row = row+"<td class='fontcolor'>类型<font color='red'>*</font>：</td>";
			row = row+"<td colspan='2' class='fontcolor'>"+selectStr+"</td>";
			row = row+"<td class='fontcolor'>系统类型<font color='red'>*</font>：</td>";
			row = row+"<td colspan='2' class='fontcolor'>"+selectStr2+"</td>";
			//row = row+"<td colspan='2' class='fontcolor'><input type='checkbox' name='ptjhq' value='1' "+ptjhq+"></td>";
			row = row+"</tr>";
			
			row = row+"<tr id='auto'>";
			row = row+"<td  class='fontcolor'>标识符<font color='red'>*</font>：</td>";
			row = row+"<td  colspan='2' class='fontcolor'><input type='text' name='psign' value='"+sign+"'></td>";
			row = row+"<td  class='fontcolor'>URL<font color='red'>*（C/S时可选填）</font>：</td>"; 
			row = row+"<td  colspan='2' class='fontcolor'><input type='text' name='purl' value='"+url+"'></td>"; 
			row = row+"</tr>";
			
			row = row+"<tr id='auto'>";
			row = row+"<td class='fontcolor'>年度参数：</td>";
			row = row+"<td colspan='2' class='fontcolor'><input type='checkbox' name='pneedyear' value='1' "+ychecked+"></td>";
			row = row+"<td class='fontcolor'>年度参数类型：</td>";
			row = row+"<td colspan='2' class='fontcolor'>"+selectStyle+"</td>";
			row = row+"</tr>";
			
			row = row+"<tr id='auto'>";
			row = row+"<td class='fontcolor'> 显示顺序：</td>";
			row = row+"<td colspan='2' class='fontcolor'><input type='text' name='porder' value='"+program.showorder+"'></td>";
			row = row+"<td class='fontcolor'>待办事项</td>";
			row = row+"<td colspan='2' class='fontcolor'><input type='checkbox' name='ptask' value='1' "+tchecked+"></td>";
			row = row+"</tr>";
			
			row = row+"<tr id='auto'>";
			row = row+"<td  class='fontcolor'>应用程序地址：</td>"; 
			row = row+"<td  colspan='5' class='fontcolor'><input type='text' size='50' name='appLocation' value='"+appLocation+"'></td>"; 
			row = row+"</tr>";
			
			row =row+"<tr id='auto'>";
			//row = row+"<td colspan='4' class='fontcolor'>&nbsp;</td>";
			row = row+"<td class='fontcolor'>服务器地址：</td>";
		    row = row+"<td colspan='5' class='fontcolor'><input type='text' size='50' name='phosturl' value='"+hosturl+"'></td>";
		    row = row+"</tr>";
		    
		    row =row+"<tr id='auto'>";
			row = row+"<td class='fontcolor'>当前默认路径：</td>";
		    row = row+"<td colspan='5' class='fontcolor'><input type='text' size='50' name='pinitialpath' value='"+initialpath+"'></td>";
		    row = row+"</tr>";
		    
		    row =row+"<tr id='auto'>";
		    row = row+"<td class='fontcolor'>cs默认路径：</td>";
			row = row+"<td class='fontcolor' colspan='5'><input size='50' id='startpath' type='file' name='file' contentEditable='false'></td>";
			row = row+"</tr>";
			//row = row+"<tr id='auto'>";
			//row = row+"<td colspan='6' height='25px' class='fontcolor'><input type='button' value='保存' onclick='updateProgram()'><input type='button' value='取消' onclick='reset_a()'></td>";
			//row = row+"</tr>";
			
			new Insertion.After($('placetr'),row);
		}else{
		   alert("请选中一个业务系统！");
		}
		
    } 
    
    //修改业务系统的保存
     function updateProgram(){
		
	    if($('ProgramForm').name.value.trim()==''){
	    	alert("请输入名称!");
    		return;
	    }
	    if($('ProgramForm').ptype.value=='1'){
	    	if($('ProgramForm').purl.value.trim()==''){
	    	   alert("请输入URL!");
    		   return;
	        }
	        else{
	    	    var url=$('ProgramForm').purl.value; 
	    	    for(i=0;i<url.length;i++){
	    	    	if(url.substring(i,i+1)=="："){
	    	       		alert("URL包含中文字符：！");
	    	       		return;
	    	       	}
	    	    } 
	    	}   	    	
	    }
	    if($('ProgramForm').psign.value.trim()==''){
	    	   alert("请输入标识符!");
    		   return;
	    }
        
        if($('ProgramForm').pneedyear.checked){
	    	if($('ProgramForm').pyearstyle.value=='0'){
	    	   alert("请选择年度参数类型!");
    		   return;
	        }
	    }
	    
	    if($('ProgramForm').phosturl.value.trim()!=''){
	    	var hosturl=$('ProgramForm').phosturl.value; 
	    	for(i=0;i<hosturl.length;i++){
	    		if(hosturl.substring(i,i+1)=="："){
	    	       		alert("服务器地址包含中文字符：！");
	    	       		return;
	    	       	}
	    	}
	    }
        var userForm = $('ProgramForm');
    	new Ajax.Request("<%=request.getContextPath()%>/common/UpdateProgram.do?random="+Math.random(), 
     	{
	   		parameters : encodeURI(Form.serialize(userForm)),
	   		method: 'get', 
	   		onComplete : UpdateProgramAfer,
	   		requestHeaders: {Accept: 'application/json'},
	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
	     	netWorkEception();
	        }
		}); 
    }
    function UpdateProgramAfer(resp){
            document.getElementById('hlj').style.display='none';
            var program=eval(resp.responseText);
	   		tmain.getSelectedRow()[0].pname=program[0].pname;
	   		tmain.getSelectedRow()[0].ptype=program[0].ptype;
	   		tmain.getSelectedRow()[0].purl=program[0].purl;
	   		tmain.getSelectedRow()[0].psign=program[0].psign;
	   		tmain.getSelectedRow()[0].needyearparameter=program[0].needyearparameter;
            tmain.getSelectedRow()[0].yearstyle=program[0].yearstyle;
	   		tmain.getSelectedRow()[0].tjhqprogram=program[0].tjhqprogram;
            tmain.getSelectedRow()[0].showorder=program[0].showorder;
	   		tmain.getSelectedRow()[0].pendingtask=program[0].pendingtask;
            tmain.getSelectedRow()[0].appLocation=program[0].appLocation;
	   		tmain.draw();
	   		var nodes = $A($('edittable').getElementsByTagName('tr'));
			for(i=0;i<nodes.size();i++) {
			    if(nodes[i].id.startsWith('auto')){  
			       Element.remove(nodes[i]);  
			    }  
			}
			
    }
    
//编辑业务系统参数
col = createColumnConfig();
col.id = "yearparameter";
col.name = "yearparameter";
col.type = "S";
col.title = "年度";
col.show = function(rownum,value,row,tdobj,datatable){
if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "parametername";
col.name = "parametername";
col.type = "S";
col.title = "参数名称";
col.show = function(rownum,value,row,tdobj,datatable){
if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "parametervalue";
col.name = "parametervalue";
col.type = "S";
col.title = "参数值";
col.show = function(rownum,value,row,tdobj,datatable){
if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "parameterorder";
col.name = "parameterorder";
col.type = "S";
col.title = "顺序";
col.show = function(rownum,value,row,tdobj,datatable){
if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;
    
    function parametermainclick(row){
    }
    function loadParameter(){
    	if(tmain!=null && tmain.data != null && tmain.getSelectedRow().length ==1){
    		$('ProgramForm').programcode.value=tmain.getSelectedRow()[0].pcode;
    		new Ajax.Request("<%=request.getContextPath()%>/common/LoadParameter.do?random="+Math.random(), 
	     	{
		   		parameters : "code="+tmain.getSelectedRow()[0].pcode,
		   		method: 'get', 
		   		onComplete : loadParameterAfer,
		   		requestHeaders: {Accept: 'application/json'},
		   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
		     	netWorkEception();
		        }
			}); 
   		}else{
   			 alert("请选中一个业务系统！");
   		}
   }
    function loadParameterAfer(resp){
    	document.getElementById("hljbjcs").style.display='none';
		document.getElementById('hljbccs').style.display='none';
		if(document.getElementById('para4')!=null)
		document.getElementById('para4').style.display='none';
    	document.getElementById('edittable').style.display='block';
   		var nodes = $A($('edittable').getElementsByTagName('tr'));
		for(i=0;i<nodes.size();i++) {
		    if(nodes[i].id.startsWith('auto')){  
		       Element.remove(nodes[i]);  
		    }  
		}
		var row ="<tr id='auto'><td colspan='6'><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
		row = row+"<tr><td width='100%' height='25px' class='fontcolor'>编辑业务系统参数</td></tr>";
		row = row+"<tr><td width='100%'>";
		row = row+"<div id='containerline4'> ";
		row = row+"<div id='tparameter_div' style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'> </div>";
		row = row+" </div>";
		row = row+"</td></tr>";
		/*
		row = row+"<tr><td width='100%' valign='top'>";
		row = row+"<table id='placeparameter' width='100%' border='0' cellspacing='0' cellpadding='0'><tr id='titletr'><td width='100%'>";
		row = row +"<input type='button' value='增加参数' onclick='addParameter()'><input type='button' value='删除参数'  onclick='deleteParameter()'>";
		row = row+"</td></tr></table>";
		row = row+"</td></tr>";
		*/
		row = row+"</table></td>";
		row = row+"</tr>";
		new Insertion.After($('placetr'),row);
		document.getElementById('hlj').style.display='none';
		document.getElementById('hljbjcs').style.display='block';
		document.getElementById("hjlzjcs").value="增加参数";
		document.getElementById("hjlsccs").value="删除参数";
		document.getElementById('hjlzjcs').onclick=function onclick(){addParameter()};
		document.getElementById('hjlsccs').onclick=function onclick(){deleteParameter()};
		document.getElementById("hljbcin").onclick=function onclick(){saveParameter()};
		var parameter = eval(resp.responseText);
		tparameter =new dataTable();
		tparameter.parent = document.getElementById('tparameter_div');
		tparameter.setTableHead(["radio","yearparameter","parametername","parametervalue","parameterorder"]);
		tparameter.data = parameter;
		tparameter.onrowclick = parametermainclick;
		tparameter.show();
	} 
		
       //增加业务参数
		function addParameter(){
		document.getElementById('edittable').style.display='block';
		document.getElementById('hljbccs').style.display='block';
        var nodes = $A($('placeparameter').getElementsByTagName('tr'));
		for(i=0;i<nodes.size();i++) {
		    if(nodes[i].id.startsWith('para')){  
		       Element.remove(nodes[i]);  
		    }  
		}
		var row="<tr id='para4'><td width='100%'><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
   		row = row+"<tr>";
   		row = row+"<td width='10%' class='fontcolor'>年度<font color='red'>*</font>：</td>"; 
		row = row+"<td class='fontcolor'><input type='text' name='year' size='4'>&nbsp;如参数和年度无关可为空</td>";
		row = row+"<td width='10%' class='fontcolor'>参数名称<font color='red'>*</font>：</td>"; 
		row = row+"<td><input type='text' name='parametername'></td>";
		row = row+"</tr>";
        row = row+"<tr><td class='fontcolor'>参数值<font color='red'>*</font>:</td>"; 
		row = row+"<td><input type='text' name='parametervalue'></td>";
		row = row+"<td class='fontcolor'>参数顺序<font color='red'>*</font>:</td>"; 
		row = row+"<td> <input type='text' name='parameterorder'></td>";
		row = row+"</tr>";
		//row = row+"<tr>";
   		//row = row+"<td colspan='4' width='10%' class='fontcolor'><input type='button' value='保存' onclick='saveParameter()'><input type='button' value='取消' onclick='reset_a()'></td>"; 
		//row = row+"</tr>";
        row = row+"</table></td></tr>";
        
		new Insertion.After($('titletr'),row);
       }
//增加参数的保存功能
	function saveParameter(){
   		if($('ProgramForm').parametername.value.trim()==''){
	    	alert("请输入参数名称!");
    		return;
	    }else{
	    	for(var i=0;i<tparameter.data.length;i++){
	    		if(tparameter.data[i].parametername.trim()==$('ProgramForm').parametername.value.trim()){
	    			alert("参数名称不可重复！");
	    			return ;
	    		}
	    	}
	    }
	    if($('ProgramForm').parametervalue.value.trim()==''){
	    	alert("请输入参数值!");
    		return;
	    }
	    if($('ProgramForm').parameterorder.value.trim()==''){
	    	alert("请输入参数顺序!");
    		return;
	    }
	    if(isNaN($('ProgramForm').parameterorder.value.trim())||$('ProgramForm').parameterorder.value.trim().length>1||$('ProgramForm').parameterorder.value.trim()=='0'){
	    	alert("参数顺序非法!");
    		return;
	    }
	    if($('ProgramForm').year.value.trim()!=''){
	    	if(isNaN($('ProgramForm').year.value.trim())){
	    	alert("年度请输入数字!");
    		return;
    		}
	    }
	    var userForm = $('ProgramForm');
    	new Ajax.Request("<%=request.getContextPath()%>/common/SaveParameter.do?random="+Math.random(), 
     	{
	   		parameters : encodeURI(Form.serialize(userForm)),
	   		method: 'get', 
	   		onComplete : showSaveParameterAfer,
	   		requestHeaders: {Accept: 'application/json'},
	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
	     	netWorkEception();
	        }
		}); 
    }
    function showAlertMeassage(resp){
 	if(resp.responseText.split(":")[0].trim()=='error'){
   			alert(resp.responseText.split(":")[1]);
   			return true;
   		}else{
   			return false;
   		}
 	}
    function showSaveParameterAfer(resp){
    	if(showAlertMeassage(resp)) return;
    	var parameter =eval(resp.responseText);
    	tparameter.data = parameter;
    	tparameter.draw();
    	$('ProgramForm').parametername.value="";
    	$('ProgramForm').parametervalue.value="";
    	$('ProgramForm').parameterorder.value="";
    	$('ProgramForm').year.value="";
    }
    
    //删除参数
    function deleteParameter(){
     if(!tparameter.getSelectedRow().length>0){alert("请选择一个参数!");return;}
     if(confirm("确定要删除这个参数吗？")){
   		if(tparameter!=null && tparameter.data!=null && tparameter.getSelectedRow().length>0){
   			new Ajax.Request("<%=request.getContextPath()%>/common/DeleteParameter.do?random="+Math.random(), 
	     	{
		   		parameters : "id="+tparameter.getSelectedRow()[0].id,
		   		method: 'get', 
		   		onComplete : deleteParameterAfter,
		   		requestHeaders: {Accept: 'application/json'},
		   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
		     	netWorkEception();
		        }
			}); 
   		}
      }
   }
   function deleteParameterAfter(resp){
   		if(showAlertMeassage(resp)) return;
    	tparameter.removeSelected();
		tparameter.show();
   }
   
   //编辑系统数据库
    col = createColumnConfig();
	col.id = "dbname";
	col.name = "dbname";
	col.type = "S";
	col.title = "数据库名称";
	col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		tdobj.innerHTML = value;
		} else {
		tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "dbstr";
	col.name = "dbstr";
	col.type = "S";
	col.title = "数据库帐号/密码";
	col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		tdobj.innerHTML = value;
		} else {
		tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "year";
	col.name = "year";
	col.type = "S";
	col.title = "年度";
	col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		tdobj.innerHTML = value;
		} else {
		tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
   
    function dbinfomainclick(row){
    	//alert(123);
    }
   
   function Dbinfoload(){
      if(tmain!=null && tmain.data != null && tmain.getSelectedRow().length ==1){
    		$('ProgramForm').programcode.value=tmain.getSelectedRow()[0].pcode;
    		new Ajax.Request("<%=request.getContextPath()%>/common/LoadDBInfo.do?random="+Math.random(), 
	     	{
		   		parameters : "code="+tmain.getSelectedRow()[0].pcode,
		   		method: 'get', 
		   		onComplete : loadPDBInfoAfer,
		   		requestHeaders: {Accept: 'application/json'},
		   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
		     	netWorkEception();
		        }
			}); 
   		}else{
   			 alert("请选中一个业务系统！");
   		}
   }
    function loadPDBInfoAfer(resp){
    	document.getElementById("hljbjcs").style.display='none';
		document.getElementById('hljbccs').style.display='none';
		if(document.getElementById('para4')!=null)
		document.getElementById('para4').style.display='none';
    	document.getElementById('edittable').style.display='block';
   		var nodes = $A($('edittable').getElementsByTagName('tr'));
		for(i=0;i<nodes.size();i++) {
		    if(nodes[i].id.startsWith('auto')){  
		       Element.remove(nodes[i]);  
		    }  
		}
		var row ="<tr id='auto'><td colspan='6'><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
		row = row+"<tr><td width='100%' height='25px' class='fontcolor'>编辑系统参数(支持多库)</td></tr>";
		row = row+"<tr><td width='100%'>";
		row = row+"<div id='containerline4'> ";
		row = row+"<div id='tdbinfo_div' style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'> </div>";
		row = row+" </div>";
		row = row+"</td></tr>";
	    /*
		row = row+"<tr><td width='100%' valign='top'>";
		row = row+"<table id='placedbinfo' width='100%' border='0' cellspacing='0' cellpadding='0'><tr id='titletr'><td width='100%'>";
		row = row +"<input type='button' value='增加库' onclick='addDBInfo()'><input type='button' value='删除库'  onclick='deleteDBInfo()'>";
		row = row+"</td></tr></table>";
		row = row+"</td></tr>"
		*/
		row = row+"</table></td>";
		row = row+"</tr>";
		new Insertion.After($('placetr'),row);
		document.getElementById('hlj').style.display='none';
		document.getElementById("hjlzjcs").value="增加库";
		document.getElementById("hjlsccs").value="删除库";
		document.getElementById('hjlzjcs').onclick=function onclick(){addDBInfo()};
		document.getElementById('hjlsccs').onclick=function onclick(){deleteDBInfo()};
		document.getElementById("hljbjcs").style.display='block';
		document.getElementById("hljbcin").onclick=function onclick(){saveDBInfo()};
		var dbinfos = eval(resp.responseText);
		tdbinfo =new dataTable();
		tdbinfo.parent = document.getElementById('tdbinfo_div');
		tdbinfo.setTableHead(["radio","dbname","dbstr","year"]);
		tdbinfo.data = dbinfos;
		tdbinfo.onrowclick = dbinfomainclick;
		tdbinfo.show();
   }
   
   //增加库
   function addDBInfo(){
   		document.getElementById('edittable').style.display='block';
   		document.getElementById('hljbccs').style.display='block';
        //var nodes = $A($('placedbinfo').getElementsByTagName('tr'));
        var nodes = $A($('placeparameter').getElementsByTagName('tr'));
		for(i=0;i<nodes.size();i++) {
		    if(nodes[i].id.startsWith('para')){  
		       Element.remove(nodes[i]);  
		    }  
		}
		var row="<tr id='para4'><td width='100%'><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
   		row = row+"<tr>";
   		row = row+"<td width='10%' class='fontcolor'>名称<font color='red'>*</font>：</td>"; 
		row = row+"<td class='fontcolor'><input type='text' name='dbname' size='20'></td>";
		row = row+"<td width='10%' class='fontcolor'>账号密码<font color='red'>*</font>：</td>"; 
		row = row+"<td><input type='text' name='dbstr'></td>";
		row = row+"</tr>";
        row = row+"<tr><td class='fontcolor'>年度<font color='red'>*</font>:</td>"; 
		row = row+"<td><input type='text' name='dbyear'></td>";
		row = row+"<td class='fontcolor'>&nbsp;</td>"; 
		row = row+"<td >&nbsp;</td>"; 
		//row = row+"<td class='fontcolor'>&nbsp;</td>"; 
		//row = row+"<td> <input type='button' value='保存' onclick='saveDBInfo()'><input type='button' value='取消' onclick='reset_a()'></td>";
		row = row+"</tr>";
        row = row+"</table></td></tr>";
        
		new Insertion.After($('titletr'),row);
   }
   
   //保存库
   function saveDBInfo(){
   		if($('ProgramForm').dbname.value.trim()==''){
	    	alert("请输入名称!");
    		return;
	    }
	    if($('ProgramForm').dbstr.value.trim()==''){
	    	alert("请输入账号密码!");
    		return;
	    }
	    if($('ProgramForm').dbyear.value.trim()==''){
	    	alert("请输入年度!");
    		return;
	    }
	    if(isNaN($('ProgramForm').dbyear.value)){
	    	alert("年度请输入数字!");
    		return;
	    }
	    var userForm = $('ProgramForm');
    	new Ajax.Request("<%=request.getContextPath()%>/common/SaveDBInfo.do?random="+Math.random(), 
     	{
	   		parameters : encodeURI(Form.serialize(userForm)),
	   		method: 'get', 
	   		onComplete : showSaveDBInfoAfer,
	   		requestHeaders: {Accept: 'application/json'},
	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
	     	netWorkEception();
	        }
		}); 
    }
    function showSaveDBInfoAfer(resp){
    	if(showAlertMeassage(resp)) return;
    	var parameter = eval(resp.responseText);
    	tdbinfo.data = parameter;
    	tdbinfo.draw();
    	$('ProgramForm').dbname.value="";
    	$('ProgramForm').dbstr.value="";
    	$('ProgramForm').dbyear.value="";
    }
    
    //删除库
    function deleteDBInfo(){
	    if(!tdbinfo.getSelectedRow().length>0){
	  	 	alert("请选择一个数据库!");
	  	 	return;
	  	 }
     if(confirm("确定要删除选中的库吗？")){
   		if(tdbinfo!=null && tdbinfo.data!=null && tdbinfo.getSelectedRow().length>0){
   			new Ajax.Request("<%=request.getContextPath()%>/common/DeleteDBInfo.do?random="+Math.random(), 
	     	{
		   		parameters : "id="+tdbinfo.getSelectedRow()[0].id,
		   		method: 'get', 
		   		onComplete : deleteDBInfoAfter,
		   		requestHeaders: {Accept: 'application/json'},
		   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
		     	netWorkEception();
		        }
			}); 
   		}
      }
   }
   function deleteDBInfoAfter(resp){
   		if(showAlertMeassage(resp)) return;
    	tdbinfo.removeSelected();
		tdbinfo.show();
   }
   //删除业务系统
   function delProgram()
   {
   		if(tmain!=null && tmain.data !=null){
			if (tmain.getSelectedRow().length==0){
			   alert("请选择要删除的业务系统！");return;
			}
		}   
		if(confirm("确定删除所选中的业务系统吗？")){
			new Ajax.Request("<%=request.getContextPath()%>/common/DeleteProgram.do?cancel=true&random="+Math.random(), 
	     	{
		   		parameters : "upcode=" + tmain.getSelectedRow()[0].pcode,
		   		method: 'get', 
		   		onComplete : deleteProgram,
		   		requestHeaders: {Accept: 'application/json'},
		   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
		        }
			}); 
		}	
   }
   function deleteProgram(resp){
  		    tmain.removeSelected();
  		    tmain.draw();
  			alert("删除成功！");
  }
    function reset_a(){ 
	   if(confirm("是否取消当前操作?"))
	   document.getElementById("edittable").style.display ="none";
	}	
	
	//新增业务系统
	function addProgram(){
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		var url = "<%=request.getContextPath()%>/common/addProgramConfig.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
		window.location.href = url;
	}
	//新增业务系统
	function editProgramParas(){
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		var selectrows = tmain.getSelectedRow();
		if(selectrows.length == 0){
			alert('请选业务系统');
			return;
		}
		var selectRow = selectrows[0];
		var code=selectRow.pcode;
		var url = "<%=request.getContextPath()%>/portal/userprogramset/showprogramparams.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&code="+code;
		
		window.location.href = url;
	}
	//修改业务系统
	function modProgram(){
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		
		var selectrows = tmain.getSelectedRow();
		if(selectrows.length == 0){
			alert('请选业务系统');
			return;
		}
		var selectRow = selectrows[0];
		var code=selectRow.pcode;
		var url = "<%=request.getContextPath()%>/portal/userprogramset/updateprogramconfig.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&code="+code;
		window.location.href = url;
	}
	function editProgramDatabase(){
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		var selectrows = tmain.getSelectedRow();
		if(selectrows.length == 0){
			alert('请选业务系统');
			return;
		}
		var selectRow = selectrows[0];
		var code= selectRow.pcode;
		var url = "<%=request.getContextPath()%>/portal/userprogramset/showprogramdb.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&code="+code;
		window.location.href = url;
	}
  </script>
  
  
  
<div id='query_t'> 
<span><span title=新增业务系统 class=add_btn onclick="addProgram()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>新增业务系统	</a></span></span>
<span><span title=修改业务系统 class=mod_btn onclick="modProgram()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>修改业务系统</a></span></span>
<span><span title=删除业务系统 class=del_btn onclick="delProgram()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>删除业务系统</a></span></span><span><span>｜</span></span>
<span><span title=编辑业务系统参数 class=isModify_btn onclick="editProgramParas()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>编辑业务系统参数</a></span></span>
<span><span title=编辑系统数据库参数 class=isModify_btn onclick="editProgramDatabase()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>编辑系统数据库参数</a></span></span>
<span><span>｜</span></span>
<span><span title=编辑系统配置文档下载 class=add_btn  onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href="<%=basePath%>portal/portalmanage/userprogramset/help.doc">编辑系统配置文档下载</a></span></span>
</div> <script>
<!--功能按钮自定义函数start-->
var tabMenufun = new Object();
<!--功能按钮自定义函数end-->
 </script>
  
  <div id="programdiv" style="height:500px;">
	<div id="" style="display:block; height:expression(this.offsetParent.style.height);">   
				    <div id="form_table_title">
					  <ul>
					    <li class="top">
					      <div>业务系统</div>
					    </li>
					    <li><div id ="tmainpaginationdiv" style="color:#000000 ; margin-right:5px; height:23px;">
							<img id='img_row2column_tmainedit_table' src='/images/done_btn/edit_style.gif' style='float:left;margin-right:5px;cursor:pointer;'
								onclick="doShowEditSimpleWithTitle('tmain','edit_table',4,this)" title='行转列' />
							 <img id='img_showNextRow_tmainedit_table' src='/images/done_btn/bottom_c.gif' title='下翻' style='float:left;cursor:pointer;margin-right:5px;' 
							 	onclick="showNextRow('tmain','edit_table',false,'null','null')"/>
							<img id='img_showBeforRow_tmainedit_table' src='/images/done_btn/top_c.gif' title='上翻' style='float:left;cursor:pointer;' 
								onclick="showBeforRow('tmain','edit_table',false,'null','null')"/>
							<script type='text/javascript' src='/js/row2column.js'></script>
							<a id='pageTagDiv' ></a></div>
					   </li>
					  </ul>
					</div>
					<!--请保留此div和a标签 -->		
					<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
					<div id="containerline20" style="display: block;">
						<div id=tmain_div style='position:relative;behavior:url(#default#userData);height:100%;width:100%;'  > </div>
						<!--						<div id='tmain_div' style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'>
						  -->
				 	</div>
	</div>
</div>
<% 
String programs=(String)request.getAttribute("programs");
%>
<script>
col = createColumnConfig();
col.id = "pname";
col.name = "pname";
col.type = "S";
col.title = "名称";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "pcode";
col.name = "pcode";
col.type = "S";
col.title = "编码";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "purl";
col.name = "purl";
col.type = "S";
col.title = "地址";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "ptype";
col.name = "ptype";
col.type = "S";
col.title = "类型";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value == 1){
		tdobj.innerHTML = "B/S";
	} else if(value == 2){
		tdobj.innerHTML = "C/S";
	}else{
		tdobj.innerHTML = "数据";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "psign";
col.name = "psign";
col.type = "S";
col.title = "标识符";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;



col = createColumnConfig();
col.id = "needyearparameter";
col.name = "needyearparameter";
col.type = "S";
col.title = "年度参数";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		if(value =="1" ){
			tdobj.innerHTML = "需要";
		} else {
			tdobj.innerHTML = "不需要";
		}
	} else {
		tdobj.innerHTML = "不需要";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

tmain =new dataTable();
tmain.parent = document.getElementById('tmain_div');  
tmain.setTableHead(["radio","pcode","pname","ptype","purl","psign","needyearparameter"]);
         tmain.data = <%=programs%>;
         tmain.checkedOnclick = true;
//tmain.onrowclick = programmainclick;
tmain.show();
//默认勾选第一行
function onloadinfor(){
	if(''==tmain.data && tmain.data.length==0){
		return ;
	}
	tmain.data[0].checked=true;
	tmain.draw();
}			
onloadinfor();
</script>
