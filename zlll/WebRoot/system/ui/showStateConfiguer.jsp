
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ page language="java" import="java.util.*" %>
<HTML >
 <HEAD>

<TITLE>页面基础配置维护</TITLE>
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
      <div>页面基础配置维护</div>
    </li>
  </ul>
</div>

 <div id="edit_table" style="width:98%">
		 <table width="100%" border="1">
		  <tr>
		    <th width="165" height="31">LinkName：</th>
		    <td width="229"><c:out value="${uiConfigDTO.linkName}"/></td>
		    <th width="165">VouchCode：</th>
		    <td width="633"><c:out value="${uiConfigDTO.vouchCode}"/></td>
		  </tr>
		  <tr>
		    <th width="165" height="31">查询条件：</th>
		    <td width="229"><input type ="text" name="defquery" value = "<c:out value="${uiConfigDTO.defquery}"/>"/></td>
		    <th width="128">默认值：</th>
		    <td width="633"><input type ="text" name="defvalueset" value = "<c:out value="${uiConfigDTO.defvalueset}"/>"/></td>
		  </tr>		  
		  <tr>
		    <th height="51">是否分页</th>
		    <td >
		       <c:if test="${uiConfigDTO.allFlag=='1'}">
        		<select name="allFlag" id="allFlag" onchange="showOrHidden(this)">
	        	<option value="1" selected>分页</option>
	        	<option value="0" >不分页</option>
	        	</select>
	           </c:if>
	           
	          <c:if test="${uiConfigDTO.allFlag=='0'}">
        		<select name="allFlag" id="allFlag" onchange="showOrHidden(this)">
	        	<option value="1" >分页</option>
	        	<option value="0" selected>不分页</option>
	        	</select>
	           </c:if>
            </td>
             
			 <th width="128">每页显示行数：</th>
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
		   <th height="51">金额单位</th>
		    <td>
        		<c:if test="${uiConfigDTO.amtFlag=='10000'}">
        		<select name="amtFlag" id="amtFlag" >
	        	<option value="10000" selected>万元</option>
	        	<option value="1" >元</option>
	        	<option value="2" >无</option>
	        	</select>
	           </c:if>
	           
	          <c:if test="${uiConfigDTO.amtFlag=='1'}">
        		<select name="amtFlag" id="amtFlag" >
	        	<option value="10000" >万元</option>
	        	<option value="1" selected>元</option>
	        	<option value="2" >无</option>
	        	</select>
	           </c:if>
	           
              <c:if test="${uiConfigDTO.amtFlag=='2'}">
        		<select name="amtFlag" id="amtFlag" >
	        	<option value="10000" >万元</option>
	        	<option value="1" >元</option>
	        	<option value="2" selected>无</option>
	        	</select>
	          </c:if>
            </td>
		   <th height="51">排序方式</th>
		    <td>
				<input  id="orderby" name="orderby" size="20" type="text" value="<c:out value="${uiConfigDTO.orderby}"/>" size="10"/>
            </td>
		  </tr>
		  <tr>
		  	<th height="108">显示查询区：</th>
		  	<td >
		  		<select name="queryconditiondisplay">
		  			<option value="" <c:if test="${uiConfigDTO.queryconditiondisplay=='0'}">selected</c:if>></option>
		  			<option value="2" <c:if test="${uiConfigDTO.queryconditiondisplay=='2'}">selected</c:if>>是</option>
		  			<option value="1" <c:if test="${uiConfigDTO.queryconditiondisplay=='1'}">selected</c:if>>否</option>
		  		</select>
            </td>
            <th height="112">自定义合计列：</th>
		  	<td >
		  		<select name="usertotalflag">
		  			<option value="" <c:if test="${uiConfigDTO.usertotalflag=='0'}">selected</c:if>></option>
		  			<option value="2" <c:if test="${uiConfigDTO.usertotalflag=='2'}">selected</c:if>>是</option>
		  			<option value="1" <c:if test="${uiConfigDTO.usertotalflag=='1'}">selected</c:if>>否</option>
		  		</select>
            </td>
		  </tr>
		  <tr>
		    <th height="108">状态：</th>
		    <td colspan="3">
     
     	<table width="200" style="border:0;" >
              <tr>
       <%
			        List allStatus = (List) request.getAttribute("allWFStatus");
			        List myStatus =  (List) request.getAttribute("myHaveWFStatus");
			    
			        int allStatusLen = allStatus.size();
			        int myStatusLen = myStatus.size();
			        if(allStatusLen==0){
			          out.println("对不起，您没有配置状态！");  
			       
			        }else{
			            for(int i=0;i<allStatusLen;i++){
			               Map allStatusOfOne = (Map) allStatus.get(i);
			               String status = allStatusOfOne.get("status").toString();
			               String name = allStatusOfOne.get("name").toString();
			               boolean show = false;
			               
			             
			               for(int j=0;j<myStatusLen;j++){
			                 Map myStatusOfOne = (Map) myStatus.get(j);	
			                 String myOneStatus = myStatusOfOne.get("status").toString();
			                 //控制选中的
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
			              }//内层循环jiehsu 
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
			            
			            }//外层循环
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
   <input type="button" name="add" value="打印模板配置" onclick="doprint()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
   <input type="button" name="refresh" value="刷新当页配置" onclick="refresh()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
   <input type="button" name="add" value="保存" onclick="modifyData()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
   <input type="button" name="exit" value="返回" onclick="window.close()" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
</div>
</body>
</html>
 <script type="text/javascript">
//用于维护工作流的状态
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

  //关闭窗口刷新父窗口
  function winclose(){
    self.close(); 
    // window.opener.location.reload();   

}

   //输入正整数的验证 
   function chenkInteger(){
      var inputValue = document.getElementById("defaultRows").value;
      var newRegex=/^[0-9]*[1-9][0-9]*$/;
      var result = newRegex.test(inputValue);
	  if(!result){
	     alert("每页显示行数必须为正整数，请重新输入！");
		 return false;
	  }
	  if(inputValue>2000){
	    alert("每页显示条数最大为2000，请重新设定显示条数！")
	    return false;
	  }
	  return true;
   }
  


  //以下函数用于当select选择不分页时，隐藏每页显示多少
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
  //文档加载后进行的控制是否显示分页的属性（每页多少行）
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
  //打印模板设置
function doprint(){
  var linkName=document.getElementById("hid").value;
  window.location.href="/system/print/query.do?linkname="+linkName;
}
  window.onload = first;
</script>





