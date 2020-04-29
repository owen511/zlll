<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<html>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/ajaxfunc.js"></script>	
<%
 String mainmenu = request.getParameter("mainmenu");
 String submenu = request.getParameter("submenu");
%>
<%
    	
    	 response.setHeader("Cache-Control","no-cache"); 
       response.setHeader("Pragma","no-cache"); 
       response.setDateHeader("Expires",0); 
  
    	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
			
%>

<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
        <link rel="stylesheet" id="ifmisfontstyle" type="text/css"/>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/calendar.css"/>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/default.css" />
<script type="text/javascript" src="<%=basePath%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/changescroll.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/calendar.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/formatNumber.js"></script>
<script type="text/vbscript" src="<%=basePath%>/js/decode_resource.vbs"></script>
<script type="text/javascript" src="<%=basePath%>/js/ua.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/ftiens4.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/datatable.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/export.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/tbajax.js"></script>
<script type="text/javascript">
var ROOT_PATH = '<%=basePath%>';
</script>
<script type="text/javascript">
var k = window.dialogArguments;
$("programstyle").href = k.$("ifmisfontstyle").href;
var detailObj=null;
function isNull(value){
    var isNull = false;
    if(value == null || value == undefined  || value == ""){
      isNull = true;
    }
    return isNull;
  }

  //������ϸ
function addDetail(){
    var row = new Object();
    if(tmain.data==null||tmain.data.length<1){
    	tmain.data = new Array();
    	row.checked = true;
    	setDefaultValue();
    	datasynchtoObj(row);
	    tmain.data[tmain.data.length] = row;    	
		tmain.show();
		enableEditFormInput();
    	return;
    } else {
    	if(!addEditFormInput()) return;
    	for(var i = 0 ;i<tmain.data.length;i++){
    		var rowobj = tmain.data[i];
    		if(rowobj.checked){
    			rowobj.checked = false;	
    		}
    	}
    	row.checked = true;
    	setDefaultValue();
    	datasynchtoObj(row);
	    tmain.data[tmain.data.length] = row;    	
		tmain.show();
    	return;
    }
  }
// ���FORM�еĿ�¼������
function  clearFormInput(isOnlyAmt){
	clearEditFormInput();
}
  

  //ɾ����ϸ
function delDetail(){
      var row = tmain.getSelectedRow();
      if(row != null){
        tmain.removeSelected();
        if(tmain.data.length > 0){
          var nextrow = tmain.data[tmain.data.length-1];
          nextrow.checked = true;
          datasynchfromtable(nextrow);
          detailObj = nextrow;
          tmain.draw();
        }
      }
      if(tmain.data.length ==0){
         disEnableEditFormInput();
      }
      tmain.show();
  }
function saveContinue(){
     var datas = tmain.data;
     if(datas.length ==0){
        alert('���������ݣ�');
        return;
     }  
	 var strjson = Object.toJSON(datas);
	 var url = "/common/jump/continue.do?";
     url = url +"&json="+strjson;
     if(!addEditFormInput()) return;
     sendAjax(url,null); 
     clearFormInput(); 
     disEnableEditFormInput();
     tmain.data = new Array();
     tmain.show();
  }  
  
function saveExit(){
     var datas = tmain.data;
     if(datas.length ==0){
        alert('���������ݣ�');
        return;
     }          
	 var strjson = Object.toJSON(datas);
     var mainmenu = document.all("hid_mainmenu").value;
     var submenu = document.all("hid_submenu").value;
     var url = "/common/jump/save.do?";
     url = url +"mainmenu="+mainmenu;
     url = url +"&submenu="+submenu;
     url = url +"&json="+strjson;     
     if(!addEditFormInput()) return;
     window.location.href = url;       
  }
  function mainclick(row){

	var formObject = $("detailform");

    datasynchfromtable(row);
	formObject.amt.value = row.amt;
	formObject.amt.defaultValue = row.amt;
	
	// ����ǰѡ���б�����FORM������
	formObject.selectedRow = row;
}
<%--����--%>
function backAll(){
var mainmenu = "<%=request.getParameter("mainmenu")%>";
var submenu = "<%=request.getParameter("submenu")%>";
window.location.href="/common/jump/list_program.do?submenu=" + submenu + "&mainmenu=" + mainmenu;
}

</script>
<body>
<form name = 'proform' id = 'proform' action="#" method="post">
	<div id="form_table_title">
	  <ul>
	    <li class="top">
	      <div>��Ŀ��Ϣ</div>
	    </li>
	  </ul>
	</div>
	<!--�뱣����div��a��ǩ -->
	<div id="containerline10"> 		
		<ui:datatable id="tmain" tabletype="MainList" data="json"  onclick = 'mainclick' showradio="true" columndefine = "true"/>
	</div>	
	
	<div id="form_table_title">
	   <ul>
	      <li class="top">
	         <div>��Ŀ��Ϣ�༭��</div>
	      </li>
	   </ul>
	</div>
    <div id="form_table">
    <ui:editform formid="proform" pagetype="add" parsetype="link"
			tableName="tmain" />
      </div>
    <div id="confirm_exit_btn">
      <input name="submit1" type="button" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" value="������ϸ" onclick="addDetail()"/>
      <input name="submit1" type="button" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" value="ɾ����ϸ" onclick="delDetail()"/>
      <input name="submit1" type="button" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" value="���沢����" onclick="saveContinue()"/>
      <input name="submit2" type="button" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" value="���沢�˳�" onclick="saveExit()" />
      <input  name="submit3" type="button" value="����"  class="button_style"  onclick="backAll()"/>
    </div>
 <input type = 'hidden' name = 'hid_mainmenu' id = 'hid_mainmenu' value = '<%=mainmenu%>' />
 <input type = 'hidden' name = 'hid_submenu' id = 'hid_submenu' value = '<%=submenu%>' />
</form> 
<script>
edited = false;
//���Ʋ�����¼��ֵ
disEnableEditFormInput();
// У��code
function check() {
	var pars = "code="+$("proform").code.value;
   	var url ="/common/jump/findProgramById.do";		

		var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: pars,
						   	 onComplete : afterOperation,
							 onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
							 	alert("����ʧ�ܣ�");
							 }
						} 
	   				);
    }
//��ˢ��ҳ���������µ���״̬
function afterOperation(resp){
  var flag = resp.responseText;
  if(flag == "false"){
     alert("�����Ѵ��ڣ�");
     $("proform").code.value = "";
     $("proform").code.focus();
  }
}

 if($("proform").code){
 	$("proform").code.onblur=check;
 }
 //��֤�������
function sigvalistartdate(){
document.getElementById("startyear").value=document.getElementById("startyear").value.replace(/\D/g,'');
}
if($("proform").startyear){
 	$("proform").startyear.onkeyup=sigvalistartdate;
 }
function sigvalienddate(){
document.getElementById("endyear").value=document.getElementById("endyear").value.replace(/\D/g,'');
}
if($("proform").endyear){
 	$("proform").endyear.onkeyup=sigvalienddate;
 }

</script>
 </body>
</html>

