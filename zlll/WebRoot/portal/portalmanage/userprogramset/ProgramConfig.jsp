<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

  <link href="<%=request.getContextPath()%>/style/styleportal.css" rel="stylesheet" type="text/css" />
  <script>
  function netWorkEception(){
       window.status="���������쳣!";
    }
  //����ҵ��ϵͳ
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
        selectStr= selectStr + "<option value=3>����</option>";
		selectStr= selectStr +"</select>";
		
		//���Ƿ�Ϊ̫������ϵͳ�޸�Ϊ�����б���ʽ
		var selectStr2="<select name='ptjhq'>";
		selectStr2= selectStr2 + "<option value=1>̫������ϵͳ</option>";
		selectStr2= selectStr2 + "<option value=2>��ͼϵͳ</option>";
        selectStr2= selectStr2 + "<option value=3>��ͼ����ϵͳ</option>";
        selectStr2= selectStr2 + "<option value=4>һ�廯ϵͳ</option>";
        selectStr2= selectStr2 + "<option value=5>����ϵͳ</option>";
        selectStr2= selectStr2 + "<option value=6>δʵ��ϵͳ</option>";
        selectStr2= selectStr2 + "<option value=7>ASPϵͳ</option>";
		selectStr2= selectStr2 +"</select>";
		
		var row = "<tr id='auto'>";
		row = row+"<td colspan='6' height='25px' class='fontcolor'>&nbsp;����ҵ��ϵͳ��Ϣ</td>";
		row = row+"</tr>";
		
		//row = row+"</tr>";
		row = row+ "<tr id='auto'>";
		row = row+"<td class='fontcolor'>����<font color='red'>*</font>��"+"</td>"; 
		row = row+"<td colspan='2' class='fontcolor'><input type='text' name='pcode'></td>"; 
		row = row+"<td class='fontcolor'>����<font color='red'>*</font>��</td>";
		row = row+"<td colspan='2' class='fontcolor'><input type='text' name='name'></td>";
		row = row+"</tr>";
		
		row = row+"<tr id='auto'>";
		row = row+"<td class='fontcolor'>����<font color='red'>*</font>��</td>";
		row = row+"<td colspan='2' class='fontcolor'>"+selectStr+"</td>";
		row = row+"<td class='fontcolor'>ϵͳ����<font color='red'>*</font>��</td>";
		row = row+"<td colspan='2' class='fontcolor'>"+selectStr2+"</td>";
		//row = row+"<td colspan='2' class='fontcolor'><input type='checkbox' name='ptjhq' value='1'></td>";
		
		row = row+"<tr id='auto'>";
		row = row+"<td  class='fontcolor'>��ʶ��<font color='red'>*</font>��</td>";
		row = row+"<td  colspan='2' class='fontcolor'><input type='text' name='psign'></td>";
		row = row+"<td  class='fontcolor'>URL<font color='red'>*��C/Sʱ��ѡ�</font>��</td>"; 
		row = row+"<td  colspan='2' class='fontcolor'><input type='text' name='purl'></td>"; 
		row = row+"</tr>";
		
		row = row+"<tr id='auto'>";
		row = row+"<td class='fontcolor'>��Ȳ�����</td>";
		row = row+"<td colspan='2' class='fontcolor'><input type='checkbox' name='pneedyear' value='1'></td>";
		row = row+"<td class='fontcolor'>��Ȳ������ͣ�</td>";
		row = row+"<td colspan='2' class='fontcolor'><select name='pyearstyle'><option value=0></option><option value=1>���(YYYY)</option><option value=2>������ݿ��ַ���</option></select></td>";
		row = row+"</tr>";
		
		row = row+"<tr id='auto'>";
		row = row+"<td class='fontcolor'> ��ʾ˳��</td>";
		row = row+"<td colspan='2' class='fontcolor'><input type='text' name='porder'></td>";
		row = row+"<td class='fontcolor'>�������</td>";
		row = row+"<td colspan='2' class='fontcolor'><input type='checkbox' name='ptask' value='1'></td>";
		row = row+"</tr>";
		
		row = row+"<tr id='auto'>";
        row = row+"<td  class='fontcolor'>Ӧ�ó����ַ��</td>"; 
        row = row+"<td colspan='5' class='fontcolor'><input type='text' size='50' name='appLocation' value=''></td>"; 
        row = row+"</tr>";
        
        row =row+"<tr id='auto'>";
        row = row+"<td class='fontcolor'>��������ַ��</td>";
		row = row+"<td colspan='5' class='fontcolor'><input type='text' name='phosturl' size='50'></td>";
		//row = row+"<td colspan='4' class='fontcolor'>&nbsp;</td>";
		row = row+"</tr>";
		
		row = row+"<tr id='auto'>";
		row = row+"<td class='fontcolor'>csĬ��·����</td>";
		row = row+"<td class='fontcolor' colspan='5'><input id='startpath' size='50' type='file' name='file' contentEditable='false'></td>";
		row = row+"</tr>";
		//row = row+"<tr id='auto'>";
		//row = row+"<td colspan='6' height='25px' class='fontcolor'><input type='button' value='����' onclick='saveProgram()'/><input type='button' value='ȡ��' onclick='reset_a()'></td>";
		//row = row+"</tr>";
        
		new Insertion.After($('placetr'),row);
    } 
    
    //��������ҵ��ϵͳ
    function saveProgram(){
    	if($('ProgramForm').pcode.value.trim()==''){
	    	alert("���������!");
    		return;
	    }
	    for(var l=0;l<tmain.data.length;l++){
    		if($('ProgramForm').pcode.value.trim()==tmain.data[l].pcode){
		    	alert("���벻���ظ�!");
	    		return;
	   		}
    	}
	    if($('ProgramForm').name.value.trim()==''){
	    	alert("����������!");
    		return;
	    }
	    if($('ProgramForm').ptype.value=='1'){
	    	if($('ProgramForm').purl.value.trim()==''){
	    	   alert("������URL!");
    		   return;
	        }
	        else{
	    	    var url=$('ProgramForm').purl.value; 
	    	    for(i=0;i<url.length;i++){
	    	    	if(url.substring(i,i+1)=="��"){
	    	       		alert("URL���������ַ�����");
	    	       		return;
	    	       	}
	    	    } 
	    	}   	  
	    }
	    if($('ProgramForm').psign.value.trim()==''){
	    	   alert("�������ʶ��!");
    		   return;
	    }
        if($('ProgramForm').pneedyear.checked){
	    	if($('ProgramForm').pyearstyle.value=='0'){
	    	   alert("��ѡ����Ȳ�������!");
    		   return;
	        }
	    }
	    
	    if($('ProgramForm').phosturl.value.trim()!=''){
	    	var hosturl=$('ProgramForm').phosturl.value; 
	    	for(i=0;i<hosturl.length;i++){
	    		if(hosturl.substring(i,i+1)=="��"){
	    	       		alert("��������ַ���������ַ�����");
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
    
    
    //�޸�ҵ��ϵͳ
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
			selectStr= selectStr + "<option value=3 "+dchecked+">����</option>";
			selectStr= selectStr +"</select>";
			//���Ƿ�Ϊ̫������ϵͳ�޸�Ϊ�����б���ʽ
			var selectStr2="<select name='ptjhq'>";
			selectStr2= selectStr2 + "<option value=1 "+tjchecked+">̫������ϵͳ</option>";
			selectStr2= selectStr2 + "<option value=2 "+ltchecked+">��ͼϵͳ</option>";
        	selectStr2= selectStr2 + "<option value=3 "+sjchecked+">��ͼ����ϵͳ</option>";
        	selectStr2= selectStr2 + "<option value=4 "+ytchecked+">һ�廯ϵͳ</option>";
        	selectStr2= selectStr2 + "<option value=5 "+qtchecked+">����ϵͳ</option>";
        	selectStr2= selectStr2 + "<option value=6 "+wsxchecked+">δʵ��ϵͳ</option>";
			selectStr2= selectStr2 +"</select>";
			
			fchecked="";if(program.yearstyle=="1") fchecked ="selected";
			schecked="";if(program.yearstyle=="2") schecked ="selected";
			
			var selectStyle="<select name='pyearstyle'>";
			selectStyle= selectStyle + "<option value=0 selected></option>";
			selectStyle= selectStyle + "<option value=1 "+fchecked+">��ȣ�YYYY��</option>";
			selectStyle= selectStyle + "<option value=2 "+schecked+">������ݿ��ַ���</option>";
			selectStyle= selectStyle +"</select>";
			
			var row = "<tr id='auto'>";
			row = row+"<td colspan='6'height='25px' class='fontcolor'>&nbsp;�޸�ҵ��ϵͳ��Ϣ</td>";
			row = row+"</tr>";
			
			row = row+ "<tr id='auto'><input type='hidden' name='pcode' value='"+program.pcode+"'>";
			row = row+"<td class='fontcolor'>���룺"+"</td>"; 
			row = row+"<td colspan='2' class='fontcolor'>"+program.pcode+"</td>"; 
			row = row+"<td class='fontcolor'>����<font color='red'>*</font>��</td>";
			row = row+"<td colspan='2' class='fontcolor'><input type='text' name='name' value='"+program.pname+"'></td>";
			row = row+"</tr>";
			
			row = row+"<tr id='auto'>";
			row = row+"<td class='fontcolor'>����<font color='red'>*</font>��</td>";
			row = row+"<td colspan='2' class='fontcolor'>"+selectStr+"</td>";
			row = row+"<td class='fontcolor'>ϵͳ����<font color='red'>*</font>��</td>";
			row = row+"<td colspan='2' class='fontcolor'>"+selectStr2+"</td>";
			//row = row+"<td colspan='2' class='fontcolor'><input type='checkbox' name='ptjhq' value='1' "+ptjhq+"></td>";
			row = row+"</tr>";
			
			row = row+"<tr id='auto'>";
			row = row+"<td  class='fontcolor'>��ʶ��<font color='red'>*</font>��</td>";
			row = row+"<td  colspan='2' class='fontcolor'><input type='text' name='psign' value='"+sign+"'></td>";
			row = row+"<td  class='fontcolor'>URL<font color='red'>*��C/Sʱ��ѡ�</font>��</td>"; 
			row = row+"<td  colspan='2' class='fontcolor'><input type='text' name='purl' value='"+url+"'></td>"; 
			row = row+"</tr>";
			
			row = row+"<tr id='auto'>";
			row = row+"<td class='fontcolor'>��Ȳ�����</td>";
			row = row+"<td colspan='2' class='fontcolor'><input type='checkbox' name='pneedyear' value='1' "+ychecked+"></td>";
			row = row+"<td class='fontcolor'>��Ȳ������ͣ�</td>";
			row = row+"<td colspan='2' class='fontcolor'>"+selectStyle+"</td>";
			row = row+"</tr>";
			
			row = row+"<tr id='auto'>";
			row = row+"<td class='fontcolor'> ��ʾ˳��</td>";
			row = row+"<td colspan='2' class='fontcolor'><input type='text' name='porder' value='"+program.showorder+"'></td>";
			row = row+"<td class='fontcolor'>��������</td>";
			row = row+"<td colspan='2' class='fontcolor'><input type='checkbox' name='ptask' value='1' "+tchecked+"></td>";
			row = row+"</tr>";
			
			row = row+"<tr id='auto'>";
			row = row+"<td  class='fontcolor'>Ӧ�ó����ַ��</td>"; 
			row = row+"<td  colspan='5' class='fontcolor'><input type='text' size='50' name='appLocation' value='"+appLocation+"'></td>"; 
			row = row+"</tr>";
			
			row =row+"<tr id='auto'>";
			//row = row+"<td colspan='4' class='fontcolor'>&nbsp;</td>";
			row = row+"<td class='fontcolor'>��������ַ��</td>";
		    row = row+"<td colspan='5' class='fontcolor'><input type='text' size='50' name='phosturl' value='"+hosturl+"'></td>";
		    row = row+"</tr>";
		    
		    row =row+"<tr id='auto'>";
			row = row+"<td class='fontcolor'>��ǰĬ��·����</td>";
		    row = row+"<td colspan='5' class='fontcolor'><input type='text' size='50' name='pinitialpath' value='"+initialpath+"'></td>";
		    row = row+"</tr>";
		    
		    row =row+"<tr id='auto'>";
		    row = row+"<td class='fontcolor'>csĬ��·����</td>";
			row = row+"<td class='fontcolor' colspan='5'><input size='50' id='startpath' type='file' name='file' contentEditable='false'></td>";
			row = row+"</tr>";
			//row = row+"<tr id='auto'>";
			//row = row+"<td colspan='6' height='25px' class='fontcolor'><input type='button' value='����' onclick='updateProgram()'><input type='button' value='ȡ��' onclick='reset_a()'></td>";
			//row = row+"</tr>";
			
			new Insertion.After($('placetr'),row);
		}else{
		   alert("��ѡ��һ��ҵ��ϵͳ��");
		}
		
    } 
    
    //�޸�ҵ��ϵͳ�ı���
     function updateProgram(){
		
	    if($('ProgramForm').name.value.trim()==''){
	    	alert("����������!");
    		return;
	    }
	    if($('ProgramForm').ptype.value=='1'){
	    	if($('ProgramForm').purl.value.trim()==''){
	    	   alert("������URL!");
    		   return;
	        }
	        else{
	    	    var url=$('ProgramForm').purl.value; 
	    	    for(i=0;i<url.length;i++){
	    	    	if(url.substring(i,i+1)=="��"){
	    	       		alert("URL���������ַ�����");
	    	       		return;
	    	       	}
	    	    } 
	    	}   	    	
	    }
	    if($('ProgramForm').psign.value.trim()==''){
	    	   alert("�������ʶ��!");
    		   return;
	    }
        
        if($('ProgramForm').pneedyear.checked){
	    	if($('ProgramForm').pyearstyle.value=='0'){
	    	   alert("��ѡ����Ȳ�������!");
    		   return;
	        }
	    }
	    
	    if($('ProgramForm').phosturl.value.trim()!=''){
	    	var hosturl=$('ProgramForm').phosturl.value; 
	    	for(i=0;i<hosturl.length;i++){
	    		if(hosturl.substring(i,i+1)=="��"){
	    	       		alert("��������ַ���������ַ�����");
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
    
//�༭ҵ��ϵͳ����
col = createColumnConfig();
col.id = "yearparameter";
col.name = "yearparameter";
col.type = "S";
col.title = "���";
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
col.title = "��������";
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
col.title = "����ֵ";
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
col.title = "˳��";
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
   			 alert("��ѡ��һ��ҵ��ϵͳ��");
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
		row = row+"<tr><td width='100%' height='25px' class='fontcolor'>�༭ҵ��ϵͳ����</td></tr>";
		row = row+"<tr><td width='100%'>";
		row = row+"<div id='containerline4'> ";
		row = row+"<div id='tparameter_div' style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'> </div>";
		row = row+" </div>";
		row = row+"</td></tr>";
		/*
		row = row+"<tr><td width='100%' valign='top'>";
		row = row+"<table id='placeparameter' width='100%' border='0' cellspacing='0' cellpadding='0'><tr id='titletr'><td width='100%'>";
		row = row +"<input type='button' value='���Ӳ���' onclick='addParameter()'><input type='button' value='ɾ������'  onclick='deleteParameter()'>";
		row = row+"</td></tr></table>";
		row = row+"</td></tr>";
		*/
		row = row+"</table></td>";
		row = row+"</tr>";
		new Insertion.After($('placetr'),row);
		document.getElementById('hlj').style.display='none';
		document.getElementById('hljbjcs').style.display='block';
		document.getElementById("hjlzjcs").value="���Ӳ���";
		document.getElementById("hjlsccs").value="ɾ������";
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
		
       //����ҵ�����
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
   		row = row+"<td width='10%' class='fontcolor'>���<font color='red'>*</font>��</td>"; 
		row = row+"<td class='fontcolor'><input type='text' name='year' size='4'>&nbsp;�����������޹ؿ�Ϊ��</td>";
		row = row+"<td width='10%' class='fontcolor'>��������<font color='red'>*</font>��</td>"; 
		row = row+"<td><input type='text' name='parametername'></td>";
		row = row+"</tr>";
        row = row+"<tr><td class='fontcolor'>����ֵ<font color='red'>*</font>:</td>"; 
		row = row+"<td><input type='text' name='parametervalue'></td>";
		row = row+"<td class='fontcolor'>����˳��<font color='red'>*</font>:</td>"; 
		row = row+"<td> <input type='text' name='parameterorder'></td>";
		row = row+"</tr>";
		//row = row+"<tr>";
   		//row = row+"<td colspan='4' width='10%' class='fontcolor'><input type='button' value='����' onclick='saveParameter()'><input type='button' value='ȡ��' onclick='reset_a()'></td>"; 
		//row = row+"</tr>";
        row = row+"</table></td></tr>";
        
		new Insertion.After($('titletr'),row);
       }
//���Ӳ����ı��湦��
	function saveParameter(){
   		if($('ProgramForm').parametername.value.trim()==''){
	    	alert("�������������!");
    		return;
	    }else{
	    	for(var i=0;i<tparameter.data.length;i++){
	    		if(tparameter.data[i].parametername.trim()==$('ProgramForm').parametername.value.trim()){
	    			alert("�������Ʋ����ظ���");
	    			return ;
	    		}
	    	}
	    }
	    if($('ProgramForm').parametervalue.value.trim()==''){
	    	alert("���������ֵ!");
    		return;
	    }
	    if($('ProgramForm').parameterorder.value.trim()==''){
	    	alert("���������˳��!");
    		return;
	    }
	    if(isNaN($('ProgramForm').parameterorder.value.trim())||$('ProgramForm').parameterorder.value.trim().length>1||$('ProgramForm').parameterorder.value.trim()=='0'){
	    	alert("����˳��Ƿ�!");
    		return;
	    }
	    if($('ProgramForm').year.value.trim()!=''){
	    	if(isNaN($('ProgramForm').year.value.trim())){
	    	alert("�������������!");
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
    
    //ɾ������
    function deleteParameter(){
     if(!tparameter.getSelectedRow().length>0){alert("��ѡ��һ������!");return;}
     if(confirm("ȷ��Ҫɾ�����������")){
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
   
   //�༭ϵͳ���ݿ�
    col = createColumnConfig();
	col.id = "dbname";
	col.name = "dbname";
	col.type = "S";
	col.title = "���ݿ�����";
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
	col.title = "���ݿ��ʺ�/����";
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
	col.title = "���";
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
   			 alert("��ѡ��һ��ҵ��ϵͳ��");
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
		row = row+"<tr><td width='100%' height='25px' class='fontcolor'>�༭ϵͳ����(֧�ֶ��)</td></tr>";
		row = row+"<tr><td width='100%'>";
		row = row+"<div id='containerline4'> ";
		row = row+"<div id='tdbinfo_div' style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'> </div>";
		row = row+" </div>";
		row = row+"</td></tr>";
	    /*
		row = row+"<tr><td width='100%' valign='top'>";
		row = row+"<table id='placedbinfo' width='100%' border='0' cellspacing='0' cellpadding='0'><tr id='titletr'><td width='100%'>";
		row = row +"<input type='button' value='���ӿ�' onclick='addDBInfo()'><input type='button' value='ɾ����'  onclick='deleteDBInfo()'>";
		row = row+"</td></tr></table>";
		row = row+"</td></tr>"
		*/
		row = row+"</table></td>";
		row = row+"</tr>";
		new Insertion.After($('placetr'),row);
		document.getElementById('hlj').style.display='none';
		document.getElementById("hjlzjcs").value="���ӿ�";
		document.getElementById("hjlsccs").value="ɾ����";
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
   
   //���ӿ�
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
   		row = row+"<td width='10%' class='fontcolor'>����<font color='red'>*</font>��</td>"; 
		row = row+"<td class='fontcolor'><input type='text' name='dbname' size='20'></td>";
		row = row+"<td width='10%' class='fontcolor'>�˺�����<font color='red'>*</font>��</td>"; 
		row = row+"<td><input type='text' name='dbstr'></td>";
		row = row+"</tr>";
        row = row+"<tr><td class='fontcolor'>���<font color='red'>*</font>:</td>"; 
		row = row+"<td><input type='text' name='dbyear'></td>";
		row = row+"<td class='fontcolor'>&nbsp;</td>"; 
		row = row+"<td >&nbsp;</td>"; 
		//row = row+"<td class='fontcolor'>&nbsp;</td>"; 
		//row = row+"<td> <input type='button' value='����' onclick='saveDBInfo()'><input type='button' value='ȡ��' onclick='reset_a()'></td>";
		row = row+"</tr>";
        row = row+"</table></td></tr>";
        
		new Insertion.After($('titletr'),row);
   }
   
   //�����
   function saveDBInfo(){
   		if($('ProgramForm').dbname.value.trim()==''){
	    	alert("����������!");
    		return;
	    }
	    if($('ProgramForm').dbstr.value.trim()==''){
	    	alert("�������˺�����!");
    		return;
	    }
	    if($('ProgramForm').dbyear.value.trim()==''){
	    	alert("���������!");
    		return;
	    }
	    if(isNaN($('ProgramForm').dbyear.value)){
	    	alert("�������������!");
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
    
    //ɾ����
    function deleteDBInfo(){
	    if(!tdbinfo.getSelectedRow().length>0){
	  	 	alert("��ѡ��һ�����ݿ�!");
	  	 	return;
	  	 }
     if(confirm("ȷ��Ҫɾ��ѡ�еĿ���")){
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
   //ɾ��ҵ��ϵͳ
   function delProgram()
   {
   		if(tmain!=null && tmain.data !=null){
			if (tmain.getSelectedRow().length==0){
			   alert("��ѡ��Ҫɾ����ҵ��ϵͳ��");return;
			}
		}   
		if(confirm("ȷ��ɾ����ѡ�е�ҵ��ϵͳ��")){
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
  			alert("ɾ���ɹ���");
  }
    function reset_a(){ 
	   if(confirm("�Ƿ�ȡ����ǰ����?"))
	   document.getElementById("edittable").style.display ="none";
	}	
	
	//����ҵ��ϵͳ
	function addProgram(){
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		var url = "<%=request.getContextPath()%>/common/addProgramConfig.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
		window.location.href = url;
	}
	//����ҵ��ϵͳ
	function editProgramParas(){
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		var selectrows = tmain.getSelectedRow();
		if(selectrows.length == 0){
			alert('��ѡҵ��ϵͳ');
			return;
		}
		var selectRow = selectrows[0];
		var code=selectRow.pcode;
		var url = "<%=request.getContextPath()%>/portal/userprogramset/showprogramparams.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&code="+code;
		
		window.location.href = url;
	}
	//�޸�ҵ��ϵͳ
	function modProgram(){
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		
		var selectrows = tmain.getSelectedRow();
		if(selectrows.length == 0){
			alert('��ѡҵ��ϵͳ');
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
			alert('��ѡҵ��ϵͳ');
			return;
		}
		var selectRow = selectrows[0];
		var code= selectRow.pcode;
		var url = "<%=request.getContextPath()%>/portal/userprogramset/showprogramdb.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&code="+code;
		window.location.href = url;
	}
  </script>
  
  
  
<div id='query_t'> 
<span><span title=����ҵ��ϵͳ class=add_btn onclick="addProgram()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>����ҵ��ϵͳ	</a></span></span>
<span><span title=�޸�ҵ��ϵͳ class=mod_btn onclick="modProgram()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>�޸�ҵ��ϵͳ</a></span></span>
<span><span title=ɾ��ҵ��ϵͳ class=del_btn onclick="delProgram()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>ɾ��ҵ��ϵͳ</a></span></span><span><span>��</span></span>
<span><span title=�༭ҵ��ϵͳ���� class=isModify_btn onclick="editProgramParas()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>�༭ҵ��ϵͳ����</a></span></span>
<span><span title=�༭ϵͳ���ݿ���� class=isModify_btn onclick="editProgramDatabase()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>�༭ϵͳ���ݿ����</a></span></span>
<span><span>��</span></span>
<span><span title=�༭ϵͳ�����ĵ����� class=add_btn  onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href="<%=basePath%>portal/portalmanage/userprogramset/help.doc">�༭ϵͳ�����ĵ�����</a></span></span>
</div> <script>
<!--���ܰ�ť�Զ��庯��start-->
var tabMenufun = new Object();
<!--���ܰ�ť�Զ��庯��end-->
 </script>
  
  <div id="programdiv" style="height:500px;">
	<div id="" style="display:block; height:expression(this.offsetParent.style.height);">   
				    <div id="form_table_title">
					  <ul>
					    <li class="top">
					      <div>ҵ��ϵͳ</div>
					    </li>
					    <li><div id ="tmainpaginationdiv" style="color:#000000 ; margin-right:5px; height:23px;">
							<img id='img_row2column_tmainedit_table' src='/images/done_btn/edit_style.gif' style='float:left;margin-right:5px;cursor:pointer;'
								onclick="doShowEditSimpleWithTitle('tmain','edit_table',4,this)" title='��ת��' />
							 <img id='img_showNextRow_tmainedit_table' src='/images/done_btn/bottom_c.gif' title='�·�' style='float:left;cursor:pointer;margin-right:5px;' 
							 	onclick="showNextRow('tmain','edit_table',false,'null','null')"/>
							<img id='img_showBeforRow_tmainedit_table' src='/images/done_btn/top_c.gif' title='�Ϸ�' style='float:left;cursor:pointer;' 
								onclick="showBeforRow('tmain','edit_table',false,'null','null')"/>
							<script type='text/javascript' src='/js/row2column.js'></script>
							<a id='pageTagDiv' ></a></div>
					   </li>
					  </ul>
					</div>
					<!--�뱣����div��a��ǩ -->		
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
col.title = "����";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "pcode";
col.name = "pcode";
col.type = "S";
col.title = "����";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "purl";
col.name = "purl";
col.type = "S";
col.title = "��ַ";
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
col.title = "����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value == 1){
		tdobj.innerHTML = "B/S";
	} else if(value == 2){
		tdobj.innerHTML = "C/S";
	}else{
		tdobj.innerHTML = "����";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "psign";
col.name = "psign";
col.type = "S";
col.title = "��ʶ��";
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
col.title = "��Ȳ���";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		if(value =="1" ){
			tdobj.innerHTML = "��Ҫ";
		} else {
			tdobj.innerHTML = "����Ҫ";
		}
	} else {
		tdobj.innerHTML = "����Ҫ";
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
//Ĭ�Ϲ�ѡ��һ��
function onloadinfor(){
	if(''==tmain.data && tmain.data.length==0){
		return ;
	}
	tmain.data[0].checked=true;
	tmain.draw();
}			
onloadinfor();
</script>
