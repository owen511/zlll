
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@page import="gov.mof.fasp.ifmis.common.Globals"%>

<HTML >
 <HEAD>

  <TITLE>�ӵ�ҳ����ʾ����</TITLE>
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

 <div id="form_table_title" style="margin-right:20px;">
  <ul>
    <li class="top">
      <div>�ӵ�ҳ����ʾ����</div>
    </li>
  </ul>
</div>
<form method="post"> 
   
<!--�뱣����div��a��ǩ -->
   <div id="list"  style="height:290px; width:98%;overflow-x:scroll;overflow-y:scroll;margin-left:10px;">
   <table width="93%"  border="0" align="center" cellspacing="1" >
     <tr >
       <th width="1%"  height="27" align="center" nowrap="nowrap"><input id="ifAll"  name="contralCheck" type="checkbox" onclick="myCheckAll();"/></th>
       <th nowrap="nowrap" width="62">��ʾ˳��</th>
       <th nowrap="nowrap" width="67">����</th>
       <th nowrap="nowrap" width="82">��ʾ����</th>
       <th nowrap="nowrap" width="84">�Ƿ�ɼ�</th>
       <th nowrap="nowrap" width="130">�Ƿ�ɱ༭</th>
       <th nowrap="nowrap" width="100">����</th>
       <th nowrap="nowrap" width="136">�ֶ�����</th>
       <th nowrap="nowrap" width="100">��������</th>
     </tr>
    <c:forEach var="detailSet" items="${DetailListSetList}" varStatus="status">
     <tr onclick="this.style.backgroundColor='#CBDAF2';" onmouseover="this.style.backgroundColor='#e8f4ff';" onmouseout="this.style.backgroundColor='#ffffff';">
       <input type="hidden" name="linkname" id="linkname" value="<c:out value="${detailSet.linkName}"/>"/>	
       <td nowrap="nowrap" align="center"><input name="checkbox" type="checkbox" value="<c:out value="${detailSet.colID}"/>" /></td>
       <td nowrap="nowrap" align="center"><c:out value="${detailSet.orderNum}"/></td>
       <td nowrap="nowrap" align="left"><c:out value="${detailSet.colID}"/></td>
       <td nowrap="nowrap" align="left"><c:out value="${detailSet.colName}"/></td>
       <td nowrap="nowrap" align="center">
       	<c:if test="${detailSet.isVisible=='1'}">
        		�ɼ�
	   </c:if>
	    <c:if test="${detailSet.isVisible=='0'}">
        	 ���ɼ�
	   </c:if>
       </td>
       <td nowrap="nowrap" align="center">
	       	<c:if test="${detailSet.isEdit=='0'}">
	        		��
		    </c:if>
	        <c:if test="${detailSet.isEdit=='1'}">
	        		��
		    </c:if>	
       </td>
       <td nowrap="nowrap" align="center">
	       <c:if test="${detailSet.requirement=='1'}">
	        		��
		   </c:if>	
       </td>
       <td nowrap="nowrap" align="center">
       	<c:if test="${detailSet.isSource=='0'}">
        		����Դ����
	    </c:if>
       <c:if test="${detailSet.isSource=='1'}">
        		����Դ����
	    </c:if>	
	    
	    <c:if test="${detailSet.isSource=='2'}">
        		 ���ı�(���д���)
	    </c:if>	
	    
	    <c:if test="${detailSet.isSource=='3'}">
        		���
	    </c:if>	
	    
	    <c:if test="${detailSet.isSource=='4'}">
        		��ֵ
	    </c:if>	
	    
	    <c:if test="${detailSet.isSource=='5'}">
        		 ����(��lastupdatetime �������⴦��)
	    </c:if>	
	    
	   <c:if test="${detailSet.isSource=='20'}">
        		 ����(������)
	   </c:if>	
	    
	    <c:if test="${detailSet.isSource=='6'}">
        		�ַ���(�������д���)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='7'}">
        		�ַ���(�������д���)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='8'}">
        		�ɱ༭������(ĩ�����ơ��������)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='9'}">
        		�ɱ༭������(��ʾһ�����������)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='10'}">
        		�ɱ༭������(��ʾ�������������)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='11'}">
        		�ɱ༭������(��ʾһ����ĩ�����ơ��������)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='12'}">
        		�ɱ༭������(��ʾ������ĩ�����ơ��������)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='13'}">
        		�ɱ༭������(������ʾ��һ�����������)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='14'}">
        		�ɱ༭������(������ʾ���������������)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='15'}">
        		�ɱ༭������(������ʾ��һ����ĩ�����ơ��������)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='16'}">
        		�ɱ༭������(������ʾ��������ĩ�����ơ��������)
	    </c:if>	
	    <c:if test="${detailSet.isSource=='19'}">
        		�ɱ༭������(ĩ�����ơ�������ơ�˳��ϸ��)
	    </c:if>
	    <c:if test="${detailSet.isSource=='17'}">
        		���ı�
	    </c:if>	
	    <c:if test="${detailSet.isSource=='18'}">
        		�����б�
	    </c:if>	
       </td>
       <td nowrap="nowrap" align="left"><c:out value="${detailSet.showlevelconfig}"/></td>
     </tr>
    </c:forEach>
   </table>
   </div>
   <input type="hidden" name="type" id="type" value="<c:out value='${type}'/>"/>
   </FORM>
  </div>

 </BODY>

</HTML>
<script language="javascript">
   var detailNum = '<c:out value="${type}"/>';
   //�û����������ť��
   function addData(){
	   var linkname = document.getElementById("linkname").value;
	   var url="/system/ui/addDetailSetBefore.do?linkname="+linkname+"&type="+detailNum;
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
		   alert("��ѡ����Ҫɾ���ļ�¼��");
		   return;
		}
		    if(confirm('ȷʵҪɾ����ѡ������?')) {
            document.forms[0].action="/system/ui/delDetailSet.do";
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
		 document.forms[0].action="/system/ui/findOneDetailSet.do";
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
    //window.opener.location.reload();   
   //window.opener.location.href=window.opener.location.href; 

}
  
hideUiButton(<%=Globals.IFMIS_UISET_FLAG%>);    
		
</script>




