
<%@ page contentType="text/html; charset=GBK" %>
<%@page import="java.util.ArrayList"%>
<%@page import="gov.mof.fasp.ifmis.common.Globals"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<HTML >
 <HEAD>

  <TITLE>��ѯ����ҳ����ʾ����</TITLE>
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
      <div>��ѯ����ҳ����ʾ����</div>
    </li>
  </ul>
</div>

   <form>
<!--�뱣����div��a��ǩ -->
     <div id="list"  style="height:290px; width:98%;overflow-x:scroll;overflow-y:scroll;margin-left:10px;">
	 <input type="hidden" name="linkname" id="linkname" value="<c:out value="${linkname}"/>"/>
	 <input type="hidden" name="vouchTypeCode" id="vouchTypeCode" value="<c:out value="${vouchTypeCode}"/>"/>
       <table border="0" id="tbl1" cellspacing="1"  align="center" >
         <tr >
           <th nowrap="nowrap" width="1%" align="center"><input id="ifAll"  name="allbox" type="checkbox" onclick="myCheckAll();"/></th>
           <th nowrap="nowrap" width="58">��ʾ˳��</th>
           <th nowrap="nowrap" width="120">�ֶ��� </th>
           <th nowrap="nowrap" width="150"><div align="center">��������</div></th>
           <!--wy add 20091010 ��ѯ���������¹��ܣ�����Ĭ��ֵ ���Ƿ�����������--> 
           <th nowrap="nowrap" ><div align="center">��������</div></th>  
           <th nowrap="nowrap" ><div align="center">������ƹ���</div></th>   
           <th nowrap="nowrap" ><div align="center">�Ƿ����</div></th>
           <th nowrap="nowrap" ><div align="center">���ü�������</div></th>         
           <th nowrap="nowrap" width="107"><div align="center">�Ƿ�ɼ�</div></th>
           <th nowrap="nowrap" width="103"><div align="center">��ѯ����</div></th>
           <th nowrap="nowrap" ><div align="center">Ĭ��ֵ</div></th>
           <th nowrap="nowrap" ><div align="center">��������</div></th>
           <th nowrap="nowrap" ><div align="center">�Զ��庯��</div></th>
         </tr>
         
     <c:forEach var="conditionList" items="${conditionList}" varStatus="status">
         <tr onclick="this.style.backgroundColor='#CBDAF2';" onmouseover="this.style.backgroundColor='#e8f4ff';" onmouseout="this.style.backgroundColor='#ffffff';">
           
           <td nowrap="nowrap" align="center"><input name="checkbox" type="checkbox" value="<c:out value="${conditionList.colID}"/>"/></td>
           <td nowrap="nowrap" align="center"><c:out value="${conditionList.orderNum}"/></td>
           <td nowrap="nowrap" align="left"><c:out value="${conditionList.colID}"/></td>
           <td nowrap="nowrap" align="left"><c:out value="${conditionList.colName}"/></td>
           <td nowrap="nowrap" align="left"><c:out value="${conditionList.elementfilter}"/></td> 
           <td nowrap="nowrap" align="left"><c:out value="${conditionList.inputrule}"/></td> 
           <td nowrap="nowrap" align="center">
             	<c:if test="${conditionList.isRequired=='1'}">
        		����
	   			</c:if>
	    		<c:if test="${conditionList.isRequired=='0'}">
        		�Ǳ���
	  			 </c:if>
           </td>
           <td nowrap="nowrap">
           	   <c:if test="${conditionList.showLevelConfig=='1'}">��</c:if>
           	   <c:if test="${conditionList.showLevelConfig=='0'}">��</c:if> 
		   </td>
           <td nowrap="nowrap" align="center">
	    		<c:if test="${conditionList.isVisible=='2'}"><!--wy add ���غ���Ϊ��ѯ����-->
        		����
	  			</c:if>            
             	<c:if test="${conditionList.isVisible=='1'}">
        		�ɼ�
	   			</c:if>
	    		<c:if test="${conditionList.isVisible=='0'}">
        		���ɼ�
	  			</c:if>			 
           </td>
           <td nowrap="nowrap" align="center">
	           <c:if test="${conditionList.type=='m'}">
	        		��ѡ
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='s'}">
	        		��ѡ
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='si'}">
	        		��ѡ����
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='selecti'}">
	        		��������
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='t'}">
	        		�ı�
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='dm'}">
	        		������ѡ
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='ds'}">
	        		������ѡ
		   	   </c:if>
		   	    <c:if test="${conditionList.type=='sdm'}">
	        		�����ѡ
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='sds'}">
	        		���㵥ѡ
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='inputtips'}">
	        		�Զ�������ʾ
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='d'}">
	        		����
		   	   </c:if>
		   	  <c:if test="${conditionList.type=='dym'}">
	        		����(������)
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='di'}">
	        		��������
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='ni'}">
	        		��������
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='ti'}">
	        		�ı�����
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='select'}">
	        		�����˵�
		   	   </c:if>
		   	    <c:if test="${conditionList.type=='e'}">
	        		ö������
		   	   </c:if>
		   	    <c:if test="${conditionList.type=='se'}">
	        		������Ȩ�޵�ѡ
		   	   </c:if>
		   	    <c:if test="${conditionList.type=='me'}">
	        		������Ȩ�޶�ѡ
		   	   </c:if>
		   	    <c:if test="${conditionList.type=='intree'}">
	        		�Զ��嵯����
		   	   </c:if>
		   	    <c:if test="${conditionList.type=='program_m'}">
	        		��Ŀ��ѡ������
		   	   </c:if>
           </td>
           <td nowrap="nowrap" align="left"><c:out value="${conditionList.defaultVal}"/>
           <td nowrap="nowrap" align="left"><c:out value="${conditionList.belongType}"/>
           <td nowrap="nowrap" align="left"><c:out value="${conditionList.jsFunction}"/>         
           </td>      
         </tr>
         </c:forEach>
      
        
       </table>

   
  </FORM>
  </div>
  <BR />

 </BODY>

</HTML>

<script> 
   //�û����������ť��
   function addData(){
	   var linkname = document.getElementById("linkname").value;
	   var vouchTypeCode = document.getElementById("vouchTypeCode").value;
	   var url="/system/ui/addConditionBefore.do?linkname="+linkname+"&vouchTypeCode="+vouchTypeCode;
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
            document.forms[0].action="/system/ui/delConditionList.do";
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
		 document.forms[0].action="/system/ui/findOneCondition.do";
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

