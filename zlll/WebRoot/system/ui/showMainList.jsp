
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@page import="gov.mof.fasp.ifmis.common.Globals"%>
<HTML >
 <HEAD>
 <META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"> 
<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">

  <TITLE>����ҳ����ʾ����</TITLE>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<script type="text/javascript" src="../../js/prototype.js"></script>
<script type="text/javascript" src="../../js/choose.js"></script>
<script type="text/javascript" src="../../js/changescroll.js"></script>
<script type="text/javascript" src="../../js/jquery-1[1].3.1.js"></script>
 </HEAD>

 <BODY class="pop_body">


     
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
      <div>����ҳ����ʾ����</div>
    </li>
  </ul>
</div>

<form name = 'dataform' id = 'dataform' method="post">
   
<!--�뱣����div��a��ǩ -->
      <div id="list" style="height:290px; width:98%;overflow-x:scroll;overflow-y:scroll;margin-left:10px;">
      <input type="hidden" name="linkname" id="linkname" value="<c:out value="${linkname}"/>"/>
        <table  border="0"  align="center" cellspacing="1" id="tbl1" >
          <tr >
            <th nowrap="nowrap" width="44" align="center"><input name="contralCheck" id="ifAll" type="checkbox" onclick="myCheckAll();"/></th>
            <th nowrap="nowrap" width="67">��ʾ����</th>
            <th nowrap="nowrap" width="127">�ֶ���</th>
            <th nowrap="nowrap" width="160"><div align="center">��������</div></th>
            <th nowrap="nowrap" width="100"><div align="center">�Ƿ�ɼ�</div></th>
            <th nowrap="nowrap" width="100"><div align="center">�Ƿ�ɱ༭</div></th>
            <th nowrap="nowrap" width="100">����</th>
            <th nowrap="nowrap" width="100">�ֶ�����</th>
            <th nowrap="nowrap" width="100">��������</th>
          </tr>
        
            
		   	<%
					java.util.List list = (java.util.List) request.getAttribute("mainListSetList");
				    if (list != null) {
					for (int row = 0; row < list.size(); row++) {
				     java.util.Map map = (java.util.Map) list.get(row);		
            %>
		<tr onclick="this.style.backgroundColor='#CBDAF2';" onmouseover="this.style.backgroundColor='#e8f4ff';" onmouseout="this.style.backgroundColor='#ffffff';">	
				
            <td nowrap="nowrap" align="center">
            	<input name="checkbox" type="checkbox" value="<%=map.get("COLID")%>"/>
             </td>
            <td nowrap="nowrap" align="center"><%=map.get("ORDERNUM")%></td>
            <td nowrap="nowrap" align="left"><%=map.get("COLID")%></td>
            <td nowrap="nowrap" align="left"><%=map.get("COLNAME")%></td>
            <td nowrap="nowrap" align="center">
				<% String showIsVisible = (map.get("ISVISIBLE")).toString();
               Integer isVisible = Integer.valueOf(showIsVisible);
               int isVisibleToInt = isVisible.intValue();
                if(0==isVisibleToInt){
           		out.println("���ɼ�");
			   }else{
                 out.println("�ɼ�");
              }
          %>
          </td>
            <td nowrap="nowrap" align="center">
            	<% String showEdit = (map.get("ISEDIT")).toString();
	               Integer edit = Integer.valueOf(showEdit);
	               int editToInt = edit.intValue();
	                if(0==editToInt){
	           		out.println("��");
				   }else{
	                 out.println("��");
	               }
          		%>
            </td>
            <td nowrap="nowrap" align="center">
            	<% String requirement = map.get("requirement")!=null ?(map.get("requirement")).toString():"";
	                if("1".equals(requirement)){
	           		out.println("��");
				   }
          		%>
            </td>
            <td nowrap="nowrap" align="center">
            <% String show = (map.get("isSource")).toString();
               Integer in = Integer.valueOf(show);
               int i = in.intValue();
              if(0==i){
           		out.println("����Դ����");
			 }
			 if(1==i){
			 	 out.println("����Դ����");
			 }
			 if(2==i){
			 	 out.println("���ı�(���д���)");
			 }
			 if(3==i){
			 	 out.println("���");
			 }
			 if(4==i){
			 	 out.println("��ֵ");
			 }
			 if(5==i){
			 	 out.println("����(��lastupdatetime �������⴦��)");
			 }
			 if(20==i){
			 	 out.println("����(������)");
			 }
			 if(6==i){
			 	 out.println("�ַ���(�������д���)");
			 }
			 if(7==i){
			 	 out.println("�ɱ༭������(�������)");
			 }
			 if(8==i){
			 	 out.println("�ɱ༭������(ĩ�����ơ��������)");
			 }
			 if(9==i){
			 	 out.println("�ɱ༭������(��ʾһ�����������)");
			 }
			 if(10==i){
			 	 out.println("�ɱ༭������(��ʾ�������������)");
			 }
			 if(11==i){
			 	 out.println("�ɱ༭������(��ʾһ����ĩ�����ơ��������)");
			 }
			  if(12==i){
			 	 out.println("�ɱ༭������(��ʾ������ĩ�����ơ��������)");
			 }
			  if(13==i){
			 	 out.println("�ɱ༭������(������ʾ��һ�����������)");
			 }
			  if(14==i){
			 	 out.println("�ɱ༭������(������ʾ���������������)");
			 }
			  if(15==i){
			 	 out.println("�ɱ༭������(������ʾ��һ����ĩ�����ơ��������)");
			 }
			  if(16==i){
			 	 out.println("�ɱ༭������(������ʾ��������ĩ�����ơ��������)");
			 }
			 if(19==i){
			 	 out.println("�ɱ༭������(ĩ�����ơ�������ơ�˳��ϸ��)");
			 }
			  if(17==i){
				 	 out.println("���ı�");
				 }
			  if(18==i){
				 	 out.println("�����б�");
				 }
          %>
            </td>
            <% if (map.get("SHOWLEVELCONFIG") != null) {%>
            <td nowrap="nowrap" align="left"><%=map.get("SHOWLEVELCONFIG")%></td>
            <%} else { %>
             <td nowrap="nowrap" align="left">&nbsp;</td>
            <%} %>
            
      </tr>
          <%}  }%>  
   
        </table>
 
  </div>

  </form>
 
 </BODY>

</HTML>

<script language="javascript">
   function addData(){
	   var linkname = document.getElementById("linkname").value;
	   var url="/system/ui/addMainSetBefore.do?linkname="+linkname;
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
            document.forms[0].action="/system/ui/delMainListSet.do";
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
		 document.forms[0].action="/system/ui/findOneMainSet.do";
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


