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
  //��������
 function addArea(){
    var submenuid = '<c:out value="${param.submenu}"/>';
	var mainmenu = '<c:out value="${param.mainmenu}"/>';
	var url = "<%=request.getContextPath()%>/portal/area/addArea.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	window.location.href = url;
 }
     //�޸ĵ���
   
function mod(){

     var selectRow=new Array();
     var id=tmain.getSelectedRow()[0].id;
     var name=tmain.getSelectedRow()[0].name;
     var url=tmain.getSelectedRow()[0].url;
     var code=tmain.getSelectedRow()[0].code;
     var year=tmain.getSelectedRow()[0].year;
     var inditext=tmain.getSelectedRow()[0].inditext;
     var remark=tmain.getSelectedRow()[0].remark;
     $('mainListForm').action="<%=request.getContextPath() %>/portal/area/Update.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&id="+id+"&name="+name+"&code="+code+"&year="+year+"&url="+url+"&inditext="+inditext+"&remark="+remark+"";
     $('mainListForm').submit();

} 
    
    //�޸ĵ����ı���
function updateArea(){
		
	    if($('AreaForm').name.value.trim()==''){
	    	alert("����������!");
    		return;
	    }
	    if($('AreaForm').url.value.trim()!=''){
	    	var hosturl=$('AreaForm').url.value; 
	    	for(i=0;i<hosturl.length;i++){
	    		if(hosturl.substring(i,i+1)=="��"){
	    	       		alert("��������ַ���������ַ�����");
	    	       		return;
	    	       	}
	    	}
	    }else{
	    	alert("�������������ַ!");
	    	return ;
	    }
	    if($('AreaForm').code.value.trim()==''){
	    	alert("�����������ʶ");
    		return;
	    }
	    if($('AreaForm').year.value.trim()==''){
	    	alert("��������ݣ�");
	    	return;
	    }
	    if($('AreaForm').inditext.value.trim()==''){
	    	alert("����������Դ��");
	    	return;
	    }
	    if(selCodeAndYear(document.getElementById("areaId").value))return ;
        var userForm = $('AreaForm');
    	new Ajax.Request("<%=request.getContextPath()%>/portal/area/UpdateArea.do?random="+Math.random(), 
     	{
	   		parameters : encodeURI(Form.serialize(userForm)),
	   		method: 'get', 
	   		onComplete : UpdateAreaAfer,
	   		requestHeaders: {Accept: 'application/json'},
	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
	     	netWorkEception();
	        }
		}); 
    }
    function UpdateAreaAfer(resp){
            var area=eval(resp.responseText);
	   		tmain.getSelectedRow()[0].name=area[0].name;
	   		tmain.getSelectedRow()[0].url=area[0].url;
	   		tmain.getSelectedRow()[0].code=area[0].code;
	   		tmain.getSelectedRow()[0].year=area[0].year;
	   		tmain.getSelectedRow()[0].inditext=area[0].inditext;
	   		tmain.draw();
	   		var nodes = $A($('edittable').getElementsByTagName('tr'));
			for(i=0;i<nodes.size();i++) {
			    if(nodes[i].id.startsWith('auto')){  
			       Element.remove(nodes[i]);  
			    }  
			}
			
    }
    
   //ɾ������
   function delArea()
   {
   		if(tmain!=null && tmain.data !=null){
			if (tmain.getSelectedRow().length==0){
			   alert("��ѡ��Ҫɾ���ĵ�����");return;
			}
		}   
		if(confirm("ȷ��ɾ����ѡ�еĵ�����")){
			new Ajax.Request("<%=request.getContextPath()%>/portal/area/DeleteArea.do?cancel=true&random="+Math.random(), 
	     	{	
		   		parameters : "id=" + tmain.getSelectedRow()[0].id,
		   		method: 'get', 
		   		onComplete : deleteArea,
		   		requestHeaders: {Accept: 'application/json'},
		   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
		        }
			}); 
		}	
   }
   function deleteArea(resp){
  		    tmain.removeSelected();
  		    tmain.draw();
  			alert("ɾ���ɹ���");
  }	
  
   function reset_a()
	{ 
   if(confirm("�Ƿ�ȡ����ǰ����?"))
   document.getElementById("edittable").style.display ="none";
	}
  </script>
  
  <div id='query_t'> 
<span><span title=�������� class=add_btn onclick="addArea()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>��������</a></span></span>
<span><span title=�޸ĵ��� class=mod_btn onclick="mod()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>�޸ĵ���</a></span></span>
<span><span title=ɾ������ class=del_btn onclick="delArea()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>ɾ������</a></span></span>
</div> <script>
<!--���ܰ�ť�Զ��庯��start-->
var tabMenufun = new Object();
<!--���ܰ�ť�Զ��庯��end-->
 </script>
  
   <div>
	<form name="mainListForm" id="mainListForm" action="#" method="post">
		<input name="selectedbillids" id="selectedbillids" type="hidden"
			value="">
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>������Ϣ</div>
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
	 	</div>
	</form>
</div>
<% 
String areas=(String)request.getAttribute("areas");
%>
<script>
col = createColumnConfig();
col.id = "name";
col.name = "name";
col.type = "S";
col.title = "����";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "id";
col.name = "id";
col.type = "S";
col.title = "����";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "code";
col.name = "code";
col.type = "S";
col.title = "������ʶ";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "year";
col.name = "year";
col.type = "S";
col.title = "���";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "url";
col.name = "url";
col.type = "S";
col.title = "��ַ";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "inditext";
col.name = "inditext";
col.type = "S";
col.title = "����Դ";
ColumnConfig[col.id.toLowerCase()]=col;

col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}

tmain =new dataTable();
tmain.parent = document.getElementById('tmain_div');  
tmain.setTableHead(["radio","id","year","code","name","url","inditext"]);
         tmain.data = <%=areas%>;
//tmain.onrowclick = areamainclick;
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
