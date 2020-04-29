
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@page import="gov.mof.fasp.ifmis.common.Globals"%>
<HTML >
 <HEAD>

<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<script type="text/javascript" src="../../js/prototype.js"></script>
<script type="text/javascript" src="../../js/choose.js"></script>
<script type="text/javascript" src="../../js/changescroll.js"></script>
<script type="text/javascript" src="../../js/jquery-1[1].3.1.js"></script>	

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
      <div>���ܰ�ťҳ����ʾ����</div>
    </li>
  </ul>
</div>
   <form method="post">
       <!--�뱣����div��a��ǩ -->
     <div id="list" style="height:290px; width:98%;overflow-x:scroll;overflow-y:scroll;margin-left:10px;">
       <table  border="0"  align="center" cellspacing="1"  >
         <tr >
           <th width="1%" height="27" align="center" nowrap="nowrap"><input id="ifAll" name="allbox" type="checkbox" onclick="myCheckAll()"/></th>
           <th nowrap="nowrap">��ʾ˳��</th>
           <th nowrap="nowrap" width="125"><div align="center">��ʾ����</div></th>
           <th nowrap="nowrap" width="114">�Ƿ�ɼ�</th>
           <th nowrap="nowrap" width="198"><div align="center">����HTML</div></th>
           <th nowrap="nowrap" width="151"><div align="center">JS����</div></th>
           <th nowrap="nowrap" width="151"><div align="center">����λ��</div></th>
           <th nowrap="nowrap" width="151"><div align="center">�Ҽ��˵���ʾ</div></th>
           <th nowrap="nowrap" width="151"><div align="center">����ҳǩ</div></th>
         </tr>
         <input type="hidden" name="linkname" id="linkname" value="<c:out value="${functionButtonList[0].linkName}"/>"/>
         <input type="hidden" name="scope" id="scope" value="<c:out value="${functionButtonList[0].scope}"/>"/>
       <c:forEach var="functionButton" items="${functionButtonList}" varStatus="status">
         <tr onclick="this.style.backgroundColor='#CBDAF2';" onmouseover="this.style.backgroundColor='#e8f4ff';" onmouseout="this.style.backgroundColor='#ffffff';">	
           <td nowrap="nowrap" align="center"><input name="checkbox" type="checkbox" value="<c:out value="${functionButton.itemId}"/>"/></td>
           <td nowrap="nowrap" align="center"><c:out value="${functionButton.orderNum}"/></td>
           <td nowrap="nowrap" align="left"><c:out value="${functionButton.name}"/></td>
           <td nowrap="nowrap" align="left">
           		<c:if test="${functionButton.isVisible=='1'}">
        		�ɼ�
	   			</c:if>
	    		<c:if test="${functionButton.isVisible=='0'}">
        		���ɼ�
	  			</c:if>
           </td>
           <td nowrap="nowrap" align="center" ><c:out value="${functionButton.nameThml}"/></td>
           <td nowrap="nowrap" align="center"><c:out value="${functionButton.js}"/></td>
           <td nowrap="nowrap" align="center"><c:out value="${functionButton.scope}"/></td>
           <td nowrap="nowrap" align="left">
           		<c:if test="${functionButton.rightMenu=='1'}">
        		��
	   			</c:if>
           </td>
           <td nowrap="nowrap" align="center"><c:out value="${functionButton.tabindex}"/></td>
         </tr>
       </c:forEach>
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
	   var linkname = document.getElementById("linkname").value;
	   var scope = document.getElementById("scope").value;
	   var url="/system/ui/addFunctionButtonBefore.do?linkname="+linkname+"&scope="+scope;
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
            document.forms[0].action="/system/ui/delFunctionButton.do";
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
		 document.forms[0].action="/system/ui/findOneFunctionButton.do";
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

hideUiButton(<%=Globals.IFMIS_UISET_FLAG%>);  
</script>





