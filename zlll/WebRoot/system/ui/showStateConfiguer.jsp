
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ page language="java" import="java.util.*" %>
<HTML >
 <HEAD>

<TITLE>ҳ���������ά��</TITLE>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<script type="text/javascript" src="../../js/prototype.js"></script>
<script type="text/javascript" src="../../js/choose.js"></script>
<script type="text/javascript" src="../../js/changescroll.js"></script>

 </HEAD>

<body  class="pop_body">
<form name="pageBasic" method="post">
<input type="hidden" id="hid" value="<c:out value="${uiConfigDTO.linkName}"/>"/>
<div id="form_table_title" style="margin-right:20px;">
  <ul>
    <li class="top">
      <div>ҳ���������ά��</div>
    </li>
  </ul>
</div>

 <div id="edit_table" style="width:98%">
		 <table width="100%" border="1">
		  <tr>
		    <th width="165" height="31">LinkName��</th>
		    <td width="229"><c:out value="${uiConfigDTO.linkName}"/></td>
		    <th width="165">VouchCode��</th>
		    <td width="633"><c:out value="${uiConfigDTO.vouchCode}"/></td>
		  </tr>
		  <tr>
		    <th width="165" height="31">��ѯ������</th>
		    <td width="229"><input type ="text" name="defquery" value = "<c:out value="${uiConfigDTO.defquery}"/>"/></td>
		    <th width="128">Ĭ��ֵ��</th>
		    <td width="633"><input type ="text" name="defvalueset" value = "<c:out value="${uiConfigDTO.defvalueset}"/>"/></td>
		  </tr>		  
		  <tr>
		    <th height="51">�Ƿ��ҳ</th>
		    <td >
		       <c:if test="${uiConfigDTO.allFlag=='1'}">
        		<select name="allFlag" id="allFlag" onchange="showOrHidden(this)">
	        	<option value="1" selected>��ҳ</option>
	        	<option value="0" >����ҳ</option>
	        	</select>
	           </c:if>
	           
	          <c:if test="${uiConfigDTO.allFlag=='0'}">
        		<select name="allFlag" id="allFlag" onchange="showOrHidden(this)">
	        	<option value="1" >��ҳ</option>
	        	<option value="0" selected>����ҳ</option>
	        	</select>
	           </c:if>
            </td>
             
			 <th width="128">ÿҳ��ʾ������</th>
		     <td width="633">
			     <div id="contralShow"  style="visibility:visible;"> 
			      <c:if test="${uiConfigDTO.defaultRows==0}">
			           <input id="defaultRows" name="defaultRows" type="text" value="2000" size="10"/>
			      </c:if>
			      
			       <c:if test="${uiConfigDTO.defaultRows!=0}">
			           <input  id="defaultRows" name="defaultRows" type="text" value="<c:out value="${uiConfigDTO.defaultRows}"/>" size="10"/>
			      </c:if>
			     </div>
		     </td>
		     
		  </tr>
		  <tr>
		   <th height="51">��λ</th>
		    <td>
        		<c:if test="${uiConfigDTO.amtFlag=='10000'}">
        		<select name="amtFlag" id="amtFlag" >
	        	<option value="10000" selected>��Ԫ</option>
	        	<option value="1" >Ԫ</option>
	        	<option value="2" >��</option>
	        	</select>
	           </c:if>
	           
	          <c:if test="${uiConfigDTO.amtFlag=='1'}">
        		<select name="amtFlag" id="amtFlag" >
	        	<option value="10000" >��Ԫ</option>
	        	<option value="1" selected>Ԫ</option>
	        	<option value="2" >��</option>
	        	</select>
	           </c:if>
	           
              <c:if test="${uiConfigDTO.amtFlag=='2'}">
        		<select name="amtFlag" id="amtFlag" >
	        	<option value="10000" >��Ԫ</option>
	        	<option value="1" >Ԫ</option>
	        	<option value="2" selected>��</option>
	        	</select>
	          </c:if>
            </td>
		   <th height="51">����ʽ</th>
		    <td>
				<input  id="orderby" name="orderby" size="20" type="text" value="<c:out value="${uiConfigDTO.orderby}"/>" size="10"/>
            </td>
		  </tr>
		  <tr>
		  	<th height="108">��ʾ��ѯ����</th>
		  	<td >
		  		<select name="queryconditiondisplay">
		  			<option value="" <c:if test="${uiConfigDTO.queryconditiondisplay=='0'}">selected</c:if>></option>
		  			<option value="2" <c:if test="${uiConfigDTO.queryconditiondisplay=='2'}">selected</c:if>>��</option>
		  			<option value="1" <c:if test="${uiConfigDTO.queryconditiondisplay=='1'}">selected</c:if>>��</option>
		  		</select>
            </td>
            <th height="112">�Զ���ϼ��У�</th>
		  	<td >
		  		<select name="usertotalflag">
		  			<option value="" <c:if test="${uiConfigDTO.usertotalflag=='0'}">selected</c:if>></option>
		  			<option value="2" <c:if test="${uiConfigDTO.usertotalflag=='2'}">selected</c:if>>��</option>
		  			<option value="1" <c:if test="${uiConfigDTO.usertotalflag=='1'}">selected</c:if>>��</option>
		  		</select>
            </td>
		  </tr>
		  <tr>
		    <th height="108">״̬��</th>
		    <td colspan="3">
     
     	<table width="200" style="border:0;" >
              <tr>
       <%
			        List allStatus = (List) request.getAttribute("allWFStatus");
			        List myStatus =  (List) request.getAttribute("myHaveWFStatus");
			    
			        int allStatusLen = allStatus.size();
			        int myStatusLen = myStatus.size();
			        if(allStatusLen==0){
			          out.println("�Բ�����û������״̬��");  
			       
			        }else{
			            for(int i=0;i<allStatusLen;i++){
			               Map allStatusOfOne = (Map) allStatus.get(i);
			               String status = allStatusOfOne.get("status").toString();
			               String name = allStatusOfOne.get("name").toString();
			               boolean show = false;
			               
			             
			               for(int j=0;j<myStatusLen;j++){
			                 Map myStatusOfOne = (Map) myStatus.get(j);	
			                 String myOneStatus = myStatusOfOne.get("status").toString();
			                 //����ѡ�е�
			                 if(myOneStatus.equals(status)){
			                    show = true;
			                           if(i%6!=0){
			                    %>
                              <td  width="13%" align='center' style="border:0;"><input  type="checkbox"  checked   name="myStatus" value="<%=status%>"/><%=name%></td>
						          <%
						             break;     
						                 }
						                 if(i%6==0){
						             %>    
						       </tr><tr> <td  width="13%" align='center' style="border:0;"><input type="checkbox"  checked   name="myStatus" value="<%=status%>"/><%=name%></td>
						             <%  
						                     if(allStatusLen==6){
						                       out.println("</tr>");
						                     }
						                     break;
						                 }
			                 }	
			              }//�ڲ�ѭ��jiehsu 
			            if(!show){
			               if(i%6!=0){
			             
			                 %>
			              <td  width="13%" align='center' style="border:0;"><input type="checkbox" name="myStatus" value="<%=status%>"/><%=name%></td>
			                <%
			                 }
			                 if(i%6==0){
			                 %>
			                   </tr><tr> <td  width="13%" align='center' style="border:0;"><input type="checkbox"  name="myStatus" value="<%=status%>"/><%=name%></td>
			                 <%
			                     if(allStatusLen==6){
			                       out.println("</tr>");
			                     }
			                 }
			            
			            }
			            
			            }//���ѭ��
			        if(allStatusLen<6){
			           out.println("</tr>");
			        }
			        if((allStatusLen!=0)&&(allStatusLen>6)){
			           out.println("</tr>");
			        }
			        
			        }
            
       %>
      </table>
			</td>
		   </tr>
   </table>
	</div>	
	<input type="hidden" name="linkname" value="<c:out value="${uiConfigDTO.linkName}"/>">
	<input type="hidden" name="defquery" value="<c:out value="${uiConfigDTO.defquery}"/>">  
	<input type="hidden" name="defvalueset" value="<c:out value="${uiConfigDTO.defvalueset}"/>">
</form>		
		
		

<div id="confirm_exit_btn">
   <input type="button" name="add" value="��ӡģ������" onclick="doprint()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
   <input type="button" name="refresh" value="ˢ�µ�ҳ����" onclick="refresh()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
   <input type="button" name="add" value="����" onclick="modifyData()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
   <input type="button" name="exit" value="����" onclick="window.close()" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
</div>
</body>
</html>
 <script type="text/javascript">
//����ά����������״̬
  function modifyData(){
     if(chenkInteger()){
           var url = "/system/ui/addPageMessage.do";
           document.forms[0].action=url;
           document.forms[0].submit();
           winclose();
     }
    
  }

  function refresh(){
           var url = "/system/ui/addPageMessage.do?mothed=refresh";
           document.forms[0].action=url;
           document.forms[0].submit();
           winclose();
		   self.opener.location.reload();
  }

  //�رմ���ˢ�¸�����
  function winclose(){
    self.close(); 
    // window.opener.location.reload();   

}

   //��������������֤ 
   function chenkInteger(){
      var inputValue = document.getElementById("defaultRows").value;
      var newRegex=/^[0-9]*[1-9][0-9]*$/;
      var result = newRegex.test(inputValue);
	  if(!result){
	     alert("ÿҳ��ʾ��������Ϊ�����������������룡");
		 return false;
	  }
	  if(inputValue>2000){
	    alert("ÿҳ��ʾ�������Ϊ2000���������趨��ʾ������")
	    return false;
	  }
	  return true;
   }
  


  //���º������ڵ�selectѡ�񲻷�ҳʱ������ÿҳ��ʾ����
    function   showOrHidden(select)   
  {   
          for(iIndex=0;iIndex<select.length;iIndex++)   
          {   
                    if(select.options[iIndex].selected)   
                    {   
                                if(select.options[iIndex].value==1)   
                                {   
                                              contralShow.style.visibility="";   
                                }   
                                else   
                                {   
                                              contralShow.style.visibility="hidden";   
                                  }     
                    }                     
          }   
  }   
  //�ĵ����غ���еĿ����Ƿ���ʾ��ҳ�����ԣ�ÿҳ�����У�
   function first(){
    var select = document.getElementById("allFlag");
    
          for(iIndex=0;iIndex<select.length;iIndex++)   
          {   
                    if(select.options[iIndex].selected)   
                    {   
                                if(select.options[iIndex].value==1)   
                                {   
                                      contralShow.style.visibility="";   
                                }   
                                else   
                                {   
                                     contralShow.style.visibility="hidden";   
                                  }     
                    }                     
          }   
  }
  //��ӡģ������
function doprint(){
  var linkName=document.getElementById("hid").value;
  window.location.href="/system/print/query.do?linkname="+linkName;
}
  window.onload = first;
</script>





