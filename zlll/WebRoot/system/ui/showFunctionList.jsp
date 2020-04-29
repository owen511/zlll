
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
<span><span title="新增" class="add_btn" onclick="addData()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">新增</a></span></span>
<span><span title="修改" class="mod_btn" onclick="modifyData()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">修改</a></span></span>
<span><span title="删除" class="del_btn" onclick="deleteData()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">删除</a></span></span>
<span><span title="关闭" class="close_btn" onclick="winclose()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">关闭</a></span></span>
</div>
</div>

 <div id="form_table_title" >
  <ul>
    <li class="top">
      <div>功能按钮页面显示设置</div>
    </li>
  </ul>
</div>
   <form method="post">
       <!--请保留此div和a标签 -->
     <div id="list" style="height:290px; width:98%;overflow-x:scroll;overflow-y:scroll;margin-left:10px;">
       <table  border="0"  align="center" cellspacing="1"  >
         <tr >
           <th width="1%" height="27" align="center" nowrap="nowrap"><input id="ifAll" name="allbox" type="checkbox" onclick="myCheckAll()"/></th>
           <th nowrap="nowrap">显示顺序</th>
           <th nowrap="nowrap" width="125"><div align="center">显示名称</div></th>
           <th nowrap="nowrap" width="114">是否可见</th>
           <th nowrap="nowrap" width="198"><div align="center">属性HTML</div></th>
           <th nowrap="nowrap" width="151"><div align="center">JS配置</div></th>
           <th nowrap="nowrap" width="151"><div align="center">所属位置</div></th>
           <th nowrap="nowrap" width="151"><div align="center">右键菜单显示</div></th>
           <th nowrap="nowrap" width="151"><div align="center">归属页签</div></th>
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
        		可见
	   			</c:if>
	    		<c:if test="${functionButton.isVisible=='0'}">
        		不可见
	  			</c:if>
           </td>
           <td nowrap="nowrap" align="center" ><c:out value="${functionButton.nameThml}"/></td>
           <td nowrap="nowrap" align="center"><c:out value="${functionButton.js}"/></td>
           <td nowrap="nowrap" align="center"><c:out value="${functionButton.scope}"/></td>
           <td nowrap="nowrap" align="left">
           		<c:if test="${functionButton.rightMenu=='1'}">
        		是
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
   //用户点击新增按钮后
   function addData(){
	   var linkname = document.getElementById("linkname").value;
	   var scope = document.getElementById("scope").value;
	   var url="/system/ui/addFunctionButtonBefore.do?linkname="+linkname+"&scope="+scope;
	   window.location.href=url;
   }
      //删除选中的数据
   
	function deleteData(){
	    var count = 0;
	    for(var i = 0; i < document.getElementsByName("checkbox").length; i++){
		      if(document.getElementsByName("checkbox")[i].checked)
		      count++;
		}
	   if(count==0){
		   alert("请选择一条需要删除的记录！");
		   return;
		}
		    if(confirm('确实要删除所选单据吗?')) {
            document.forms[0].action="/system/ui/delFunctionButton.do";
            document.forms[0].submit();
            }
		}
	//修改选中的数据	
	function modifyData(){
	
		var count = 0;
	    for(var i = 0; i < document.getElementsByName("checkbox").length; i++){
		      if(document.getElementsByName("checkbox")[i].checked)
		      count++;
		}	  
		if(count>1){
		    alert("每次只能修改一条记录！");
		    return;
		}if(count==0){
		   alert("请选择一条需要修改的记录！");
		   return;
		}
		 document.forms[0].action="/system/ui/findOneFunctionButton.do";
         document.forms[0].submit();
		}	
   //复选框全选中 或 全不选中
   function myCheckAll() {
	  for (var i = 0; i < document.getElementsByName("checkbox").length; i++) {
	   document.getElementsByName("checkbox")[i].checked = document.getElementById("ifAll").checked;
	  }
 }
   //刷新父窗口
   function winclose(){
    self.close(); 
   // window.opener.location.reload();   
   //window.opener.location.href=window.opener.location.href; 

}

hideUiButton(<%=Globals.IFMIS_UISET_FLAG%>);  
</script>





