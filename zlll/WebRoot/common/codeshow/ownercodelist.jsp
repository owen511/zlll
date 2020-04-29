
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<HTML >
 <HEAD>

<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<script type="text/javascript" src="../../js/prototype.js"></script>
<script type="text/javascript" src="../../js/choose.js"></script>
<script type="text/javascript" src="../../js/changescroll.js"></script>

 </HEAD>

 <BODY  class="pop_body">


     
<div id="popPage"><div id="shenhe_title"><div id="shenhe_title_middle"></div></div>
<div id="query_t">
<div>
<span><span title="����" class="add_btn" onclick="addData()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">����</a></span></span>
<span><span title="�޸�" class="mod_btn" onclick="modifyData()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">�޸�</a></span></span>
<span><span title="ɾ��" class="del_btn" onclick="deleteData()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">ɾ��</a></span></span>
<span><span title="�ر�" class="close_btn" onclick="winclose()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">�ر�</a></span></span>
</div>
</div>

 <div id="form_table_title" >
  <ul>
    <li class="top">
      <div>������Ҫ������</div>
    </li>
  </ul>
</div>
   <form method="post" name="list">
       <!--�뱣����div��a��ǩ -->
     <div id="list" style="height:290px; width:98%;overflow-x:scroll;overflow-y:scroll;margin-left:10px;">
     <input type="hidden" name="checkmenuid" id="checkmenuid" value="<c:out value="${checkmenuid}"/>"/>
       <table  border="0"  align="center" cellspacing="1"  >
         <tr >
           <th width="10%" height="27" align="center" nowrap="nowrap"><input id="ifAll" name="allbox" type="checkbox" onclick="myCheckAll()"/></th>
           <th nowrap="nowrap" width="40%">ϵͳ����</th>
           <th nowrap="nowrap" width="20%">Ҫ�ر���</th>
           <th nowrap="nowrap" width="30%">Ҫ������</th>
         </tr>
         	<%
					java.util.List list = (java.util.List) request.getAttribute("mainListSetList");
				    if (list != null) {
					for (int row = 0; row < list.size(); row++) {
				     java.util.Map map = (java.util.Map) list.get(row);		
            %>
		<tr onclick="this.style.backgroundColor='#CBDAF2';" onmouseover="this.style.backgroundColor='#e8f4ff';" onmouseout="this.style.backgroundColor='#ffffff';">	
				
            <td nowrap="nowrap" align="center">
            	<input name="checkbox" type="checkbox" value="<%=map.get("CODE")%>"/>
             </td>
            <td nowrap="nowrap" align="center"><%=map.get("MENUNAME")%></td>
            <td nowrap="nowrap" align="left"><%=map.get("CODE")%></td>
            <td nowrap="nowrap" align="left"><%=map.get("NAME")%></td>
           
      </tr>
          <%}  }%>  
       </table>
	   <br/>
     </div>
     </form>
   </div>

 </BODY>

</HTML>
<script language="javascript">
   //�û����������ť��
   function addData(){
	   var checkmenuid = document.getElementById("checkmenuid").value;
	   var url="/common/codeShowManage/addOwnerCode.do?checkmenuid="+checkmenuid;
	   window.location.href=url;
   }
      //ɾ��ѡ�е�����
   
	function deleteData(){
	    var count = 0;
	    for(var i = 0; i < document.getElementsByName("checkbox").length; i++){
		      if(document.getElementsByName("checkbox")[i].checked)
		      count++;
		}
	   if(count==0){
		   alert("��ѡ��һ����Ҫɾ���ļ�¼��");
		   return;
		}
		    if(confirm('ȷʵҪɾ����ѡ������?')) {
            document.forms[0].action="/common/codeShowManage/delOwnerCode.do";
            document.forms[0].submit();
           
            }
            
		}
	//�޸�ѡ�е�����	
	function modifyData(){
	
		var count = 0;
	    for(var i = 0; i < document.getElementsByName("checkbox").length; i++){
		      if(document.getElementsByName("checkbox")[i].checked)
		      count++;
		}	  
		if(count>1){
		    alert("ÿ��ֻ���޸�һ����¼��");
		    return;
		}if(count==0){
		   alert("��ѡ��һ����Ҫ�޸ĵļ�¼��");
		   return;
		}
		 document.forms[0].action="/common/codeShowManage/updateOwnerCode.do";
         document.forms[0].submit();
		}	
   //��ѡ��ȫѡ�� �� ȫ��ѡ��
   function myCheckAll() {
	  for (var i = 0; i < document.getElementsByName("checkbox").length; i++) {
	   document.getElementsByName("checkbox")[i].checked = document.getElementById("ifAll").checked;
	  }
 }
   //ˢ�¸�����
   function winclose(){
    self.close(); 
   // window.opener.location.reload();   
   //window.opener.location.href=window.opener.location.href; 
}
var checkvalue = window.parent.location.href;
if('<%=request.getParameter("status")%>' == 1 || checkvalue.indexOf("delOwnerCode") != -1){
	window.opener.getsubmenu(document.list.checkmenuid.value);
}
</script>





