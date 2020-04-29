<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
  <%   
  response.setHeader("Cache-Control",   "Public");    
  %>   

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
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/calendar.css"/>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/default.css" />
<script type="text/javascript" src="<%=basePath%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/datatable.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/changescroll.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/calendar.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/formatNumber.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/ua.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/ftiens4.js"></script>
<script type="text/javascript">
var ROOT_PATH = '<%=basePath%>';
</script>
<script type="text/javascript">
  function isNull(value){
    var isNull = false;
    if(value == null || value == undefined  || value == ""){
      isNull = true;
    }
    return isNull;
  }

  //清楚checked状态  
  function clearRowCheckedStatus(){
     var rows = tmain.data;
     var row = null;
     for(var i = 0 ;i < rows.length;i++){
        row = rows[i];
        row.checked = false;
     }
  }
  //给值
  function toValue(formObject,row){
  datasynchtoObj(row);
  }
  function onclickrow(row){
    var formObject=$("proform");
    getValue(formObject,row); 
  }
  
  function saveExit(){
     var datas = tmain.data;
	 var strjson = Object.toJSON(datas);	          
     var mainmenu = document.all("hid_mainmenu").value;
     var submenu = document.all("hid_submenu").value;
     var url = "/common/jump/doupdate.do?";
     url = url +"mainmenu="+mainmenu;
     url = url +"&submenu="+submenu;
     url = url +"&json="+strjson;     
     if(!addEditFormInput()) return;
     window.location.href = url;       
  }
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
	      <div>项目信息</div>
	    </li>
	  </ul>
	</div>
	<!--请保留此div和a标签 -->
	<div id="containerline10"> 		
		<ui:datatable id="tmain" tabletype="MainList" data="json" onclick = 'onclickrow' showradio="true" columndefine = "true"/>
	</div>	
	<div id="form_table_title">
	   <ul>
	      <li class="top">
	         <div>项目信息编辑区</div>
	      </li>
	   </ul>
	</div>
    <div id="edit_table">
      <ui:editform formid="proform" pagetype="mod" parsetype="link"
			tableName="tmain" />
    </div>
    <div id="confirm_exit_btn">
      <input name="submit2" type="button" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" value="保存并退出" onclick="saveExit()" />
      <input  name="submit3" type="button" value="返回"  class="button_style"  onclick="backAll()"/>
    </div>
 <input type = 'hidden' name = 'hid_mainmenu' id = 'hid_mainmenu' value = '<%=mainmenu%>' />
 <input type = 'hidden' name = 'hid_submenu' id = 'hid_submenu' value = '<%=submenu%>' />
</form> 
 </body>
 <script type="text/javascript">
   clearRowCheckedStatus();
   var row = tmain.data[0];
   var formObject=$("proform");
   datasynchfromtable(row);
   row.checked = true;
   tmain.show();
 </script>

