<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<script type='text/javascript' src='<%=basePath%>js/zapatec.js'></script>
<SCRIPT type='text/javascript' src="<%=basePath%>js/tree.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript">
<!--
var mainsub = false;//��ע�б�ҳ���Ƿ����� true:�� false :��
//-->
var lawstatus;
col = createColumnConfig();
col.id = "fileid"
col.name = "fileid";
col.type = "S";
col.title = "������";
col.show = function(rownum,value,row,tdobj,datatable){
     eval("var code = row.fileid_code");
     eval("var name = row.fileid_name");
     if(value==null){
	     tdobj.innerHTML="";
	  }else{
         filepath=row.fileid;
         if(filepath!=null&&filepath!=""&&code!="undefined"){
            var tips="�����������";
            var url = ROOT_PATH+'/bds/policy/openfile.jsp?fileid='+filepath;
            var showname=code+"-"+name;
		    tdobj.innerHTML = "<a style='color:blue;text-decoration:underline' href="+url+"  title="+tips+">"+showname+"</a>";
		 }	   
     }
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = 'billid';
col.name = 'billid';col.type = 'I';
col.title = '���߱���';
ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = 'type';
col.name = 'type';
col.type = 'S';
col.title = '���߷���';
col.show = showElement;
ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = 'title';
col.name = 'title';
col.type = 'S';
col.title = '����';
col.show = function(rownum,value,row,tdobj,datatable){     
            var tips="�鿴";
            var url = ROOT_PATH+'/bds/policy/preview.do?billid='+row.billid;
		    tdobj.innerHTML = "<a style='color:blue;text-decoration:underline'  href='#' onclick='javascript:window.open(\""+url+"\")'  title="+tips+">"+row.title+"</a>";
 }
ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = 'fbwh';
col.name = 'fbwh';
col.type = 'S';
col.title = '�����ĺ�';
ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = 'name';
col.name = 'name';
col.type = 'S';
col.title = '���߱�׼����';
ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = 'status';
col.name = 'status';
col.type = 'S';
col.title = '����״̬';
col.show = showElement;
ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = 'userid';
col.name = 'userid';
col.type = 'S';
col.title = '������';
col.show = showElement;
ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = 'keywords';
col.name = 'keywords';
col.type = 'S';
col.title = '�ؼ���';
ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = 'pubdate';
col.name = 'pubdate';col.type = 'D';
col.title = '��������';
ColumnConfig[col.id.toLowerCase()]=col;
</SCRIPT>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id=queryform
	action="index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&<c:out value="${DEFAULTURLPARAMETER}"/>"
	method="post">
	<ui:queryform formid="queryform" />
</form>

<form name="mainListForm" id="mainListForm" action="#" method="post">
	<input name="selectedbillids" id="selectedbillids" type="hidden" value=""/>
	<input type ="hidden" name ="maindata" id ="maindata" />
	<div id="form_table_title">
		<ul>
			<li class="top"><div>��������Ϣ</div></li>
			<li>
				<ui:row2column dataid="tmain" showdivname="edit_table"
					columnNum="4" drawDetail="false" tdetailName="tdetail"
					tdetailShowDivName="edit_table_tdetail"/>
			</li>
		</ul>
	</div>
	<div id="sub_tree">
	<table align='top' width="100%" border="0" >
	 <tr>
	    <td width="25%" valign="top">
	        <fieldset class="sub_field"><legend class="sub_legend" >�����нṹ��</legend>
	        <div style="overflow:auto; width: 100%; height: 484px">
				<div id="inacct_tree" style="margin-left:10px;"><span id="loading">���ڼ�����.....</span></div>
			</div>
			</fieldset>
	    </td>
	    <td width="75%">
			<!--�뱣����div��a��ǩ -->
			<div id="containerline20_d">
			<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
				<ui:datatable id="tmain" tabletype="MainList" data="json" showcheckbox="true" useThisHead="tempHeadHtml" createAmtColumn="true" sumColumnList='<%=(String)request.getAttribute("sumColumnList")%>'/>
			</div>	
			
		 </td>
	</tr>
	</table>
	</div>	
</form>
<script type="text/javascript">
<!--
	  var factorid;
	//��ʾ��֯������
	   var accttreeJson = <c:out value="${elementtree}" escapexml="false"/>;
	   function tree_select(){
			var node = this;
			node_=node;
			superid= node.data.superid;
			id = node.data.id;
			factorid=id;
			urlmenuparameter+="&superid="+id;
			new Ajax.Request("<%=request.getContextPath()%>/bds/policy/getchlidren.do?random="+Math.random(), 
			{
				parameters : '&superid='+superid+"&id="+id,
				method: 'get', 
				onComplete : refreashDatetable,
				requestHeaders: {Accept: 'application/json'},
				onFailure : function(resp) {
				   alert("�����쳣");
				}
		  }); 
		} 
		//�첽ˢ��������ʾ��
		function refreashDatetable(resp){
			Element.show('tmain_div');
			var json = eval(resp.responseText);
			tmain.data = json;
			tmain.show();
		}	
	window.onload= function(){
       var inaccttree = new Zapatec.Tree({
                            parent: "inacct_tree",
                           	source: accttreeJson,
                            sourceType: "json",
                            expandOnLabelClick: false,
                            highlightSelectedNode: true,
                            eventListeners:{
                                    'select': tree_select
                                }
                        });
       inaccttree.expandToLevel(1);
       document.getElementById("loading").style.display = "none";
}

//ɾ����������
function deleteFile(){
     if(hasChecked()){
		if(confirm('ȷ��Ҫɾ����ѡ���߸�����?')) {
			var selectRow=new Array();
			for(var i=0;i<tmain.getSelectedRow().length;i++){
				selectRow[i]=tmain.getSelectedRow()[i].billid;				
			}
			
			var pars = '&selectedbillids='+selectRow;
			var url = 'deleteFile.do?mainmenu=<c:out value="${param.mainmenu}"/>'+pars+'&submenu=<c:out value="${param.submenu}"/>&'+urlmenuparameter;
		
			showdiv();			
		   document.mainListForm.action=url;
		   document.mainListForm.submit();          
		}   
     }else{
        alert("��ѡ��Ҫɾ��������������Ϣ��");
     }
}


//�鿴����
function openFileContent(){
   if(tmain.getSelectedRow().length==0){
	   alert("��ѡ��1����¼��Ȼ��[�鿴����]!");
	   return false;	 
	}
	if(tmain.getSelectedRow().length>1){
	   alert("��ѡ��1����¼��Ȼ��[�鿴����]!");
	   return false;
	}
	if(tmain.getSelectedRow().length==1){
		var selectedRow=tmain.getSelectedRow();
		var filepath=selectedRow[0].fileid;
		var url = ROOT_PATH+'/bds/policy/openfile.jsp?fileid='+filepath;
		if(filepath==null||filepath=="0"||filepath=="")
		{
		    alert("�õ��ݻ�û���ϴ�������");
		    return;
		}
		//obj.target="_blank"; 
		//obj.target=""; 
        //obj.href = url;
        //obj.click(); 
        window.location=url;
	}else{
		alert("������ѡ��1����¼��Ȼ��[�鿴����]!");
		return false;
	}
}

//Ԥ�����߷�������
function preview(){
    
	if(hasChecked()){
       if(tmain.getSelectedRow().length>1){
          alert("��ѡ��һ���������Ԥ��!");
       }else{
             var selectedRow=tmain.getSelectedRow();
       		 var fileid=selectedRow[0].fileid;
       		 var billid=selectedRow[0].billid;
       		 var url;
       		 if(fileid!=null&fileid!=""){
                 url = "<%=request.getContextPath()%>/bds/policy/preview.do?billid="+billid+"&fileid="+fileid
              }else{
                 url = "<%=request.getContextPath()%>/bds/policy/preview.do?billid="+billid;
              } 
   			 //window.open(url,'window',"Width=700px;Height=550px;status=no;resizable=0;");  
   			 //  window.open(url, "window", "dialogHeight:800px;dialogWidth: 600px;resizable: No; status: No;help:No;");
   			 window.open(url, "window", "dialogHeight:800px;dialogWidth: 600px;resizable: No; status: No;help:No;");
   			  
   			// window.open(url,'window',"fullscreen=1;scroll=yes;status=no;resizable=0;"); 
       }
     }else{
       alert("��ѡ��ҪԤ��������!");
     }
}

//��ʾ�����Ĳ�
	if(typeof(showdiv)=="undefined")showdiv = function (){};
	//���ش����Ĳ�
	if(typeof(closediv)=="undefined")closediv = function (){};

//���淢��
function issueState(){
   lawstatus="1";
   changeState();
}

//��������
function cancelState(){
   lawstatus="2";
   changeState();
}

//����ָ�
function restoreState(){
  lawstatus="3";
  changeState();
}

function changeState(){
    if(hasChecked()){
       if(tmain.getSelectedRow().length>1){
          alert("��ѡ��һ�����߷����¼!");
       }else{
             var state="";
             if(lawstatus=='1') state="����";
             if(lawstatus=='2') state="����";
             if(lawstatus=='3') state="�ָ�";
             if(confirm("ȷ��Ҫ"+state+"��")){
                showdiv();
			    var selectedRow=tmain.getSelectedRow();
       		    var billid=selectedRow[0].billid;
       		    url='/bds/policy/changeState.do';
		  	    var reulst = 'billid='+billid+'&state='+lawstatus+'&'+urlmenuparameter;
		        var myAjax = new Ajax.Request(url,
						   	{
							   	 method: 'post',
							   	 parameters: reulst,
							   	 onComplete : showResponses,
							   	 onFailure : function(resp) {
						    closediv();
							alert(state+"ʧ�ܣ�");
							return;
						}
							} 
		   				); 
		    
		  }else{
		  closediv();
		  }
            
       }
     }else{
       alert("��ѡ��ҪԤ��������!");
     }
}

//�ص�����
function showResponses(resp){
	var json = resp.responseText;
	if(json == "true"){
	  alert("ִ�гɹ�")
	window.location.href="/bds/policy/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
	}else{
	  closediv();
	 alert("ִ��ʧ��,���鷨��״̬��");
	 return;
	}
}
tmain._checkHeaderOperation = function(el, x) {
	    if(el.tagName!="th" && el.tagName!="TH") return;
	    var prev, next, left, right, l, r,leftwidth;
	    leftwidth = 0;
	    if(document.getElementById("left_tree"))
	    	leftwidth = document.getElementById("left_tree").offsetWidth;
	    if(document.getElementById("switchBar"))
	    	leftwidth =  leftwidth+document.getElementById("switchBar").offsetWidth; 
		prev = el.previousSibling;
		next = el.nextSibling;
		//left = getLeftPos(el)-leftwidth;
		left = getLeftPos(el)-leftwidth - document.getElementById("sub_tree").offsetWidth;
		right = left + el.offsetWidth;
		l = x - left+10;
		r = right - x-15;
        //alert("l:"+l+";r:"+r);
		if ((l < 3) && (prev)) {
		    //alert("l:"+l+";r:"+r);
		    //alert("left:"+left+";right:"+right+";el.offsetWidth:"+el.offsetWidth);\
		    //alert("l:"+l);
		    if(el.className=="FixedDataColumn") {
		    el.parentNode.style.cursor = 'default';
		    return};
		    if(this.columnConfig[el.cellIndex].id=="radio" || this.columnConfig[el.cellIndex].id=="checkbox")
		        return;
			el.parentNode.style.cursor = 'e-resize';
			this._headerOper         = COL_HEAD_EDGE;
			this._headerData         = [prev, prev.offsetWidth - 5, x, el.parentNode.offsetWidth];
			
		} else if (r < 5) {
		    //alert(r);
		    //alert("l:"+l+";r:"+r);
		    //alert("left:"+left+";right:"+right+";el.offsetWidth:"+el.offsetWidth);
			el.parentNode.style.cursor = 'e-resize';
			this._headerOper         = COL_HEAD_EDGE;
			this._headerData         = [el, el.offsetWidth - 5, x, el.parentNode.offsetWidth];
		}else {
			el.parentNode.style.cursor = 'default';
			this._headerOper         = COL_HEAD_OVER;
			this._headerData         = [el, el.offsetLeft, x, getLeftPos(el), el.cellIndex];
		}	
    }
	
tmain.show();
-->
</script>	


