
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@page import="gov.mof.fasp.ifmis.common.Globals"%>

<HTML >
 <HEAD>

  <TITLE>子单页面显示设置</TITLE>
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

 <div id="form_table_title" style="margin-right:20px;">
  <ul>
    <li class="top">
      <div>子单页面显示设置</div>
    </li>
  </ul>
</div>
<form method="post"> 
   
<!--请保留此div和a标签 -->
   <div id="list"  style="height:290px; width:98%;overflow-x:scroll;overflow-y:scroll;margin-left:10px;">
   <table width="93%"  border="0" align="center" cellspacing="1" >
     <tr >
       <th width="1%"  height="27" align="center" nowrap="nowrap"><input id="ifAll"  name="contralCheck" type="checkbox" onclick="myCheckAll();"/></th>
       <th nowrap="nowrap" width="62">显示顺序</th>
       <th nowrap="nowrap" width="67">编码</th>
       <th nowrap="nowrap" width="82">显示名称</th>
       <th nowrap="nowrap" width="84">是否可见</th>
       <th nowrap="nowrap" width="130">是否可编辑</th>
       <th nowrap="nowrap" width="100">必填</th>
       <th nowrap="nowrap" width="136">字段性质</th>
       <th nowrap="nowrap" width="100">级联控制</th>
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
        		可见
	   </c:if>
	    <c:if test="${detailSet.isVisible=='0'}">
        	 不可见
	   </c:if>
       </td>
       <td nowrap="nowrap" align="center">
	       	<c:if test="${detailSet.isEdit=='0'}">
	        		否
		    </c:if>
	        <c:if test="${detailSet.isEdit=='1'}">
	        		是
		    </c:if>	
       </td>
       <td nowrap="nowrap" align="center">
	       <c:if test="${detailSet.requirement=='1'}">
	        		是
		   </c:if>	
       </td>
       <td nowrap="nowrap" align="center">
       	<c:if test="${detailSet.isSource=='0'}">
        		无来源数据
	    </c:if>
       <c:if test="${detailSet.isSource=='1'}">
        		有来源数据
	    </c:if>	
	    
	    <c:if test="${detailSet.isSource=='2'}">
        		 大文本(折行处理)
	    </c:if>	
	    
	    <c:if test="${detailSet.isSource=='3'}">
        		金额
	    </c:if>	
	    
	    <c:if test="${detailSet.isSource=='4'}">
        		数值
	    </c:if>	
	    
	    <c:if test="${detailSet.isSource=='5'}">
        		 日期(对lastupdatetime 进行特殊处理)
	    </c:if>	
	    
	   <c:if test="${detailSet.isSource=='20'}">
        		 日期(含年月)
	   </c:if>	
	    
	    <c:if test="${detailSet.isSource=='6'}">
        		字符串(不做折行处理)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='7'}">
        		字符串(不做折行处理)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='8'}">
        		可编辑弹出树(末级控制、输入控制)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='9'}">
        		可编辑弹出树(显示一级、输入控制)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='10'}">
        		可编辑弹出树(显示二级、输入控制)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='11'}">
        		可编辑弹出树(显示一级、末级控制、输入控制)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='12'}">
        		可编辑弹出树(显示二级、末级控制、输入控制)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='13'}">
        		可编辑弹出树(控制显示至一级、输入控制)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='14'}">
        		可编辑弹出树(控制显示至二级、输入控制)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='15'}">
        		可编辑弹出树(控制显示至一级、末级控制、输入控制)
	    </c:if>	
	     <c:if test="${detailSet.isSource=='16'}">
        		可编辑弹出树(控制显示至二级、末级控制、输入控制)
	    </c:if>	
	    <c:if test="${detailSet.isSource=='19'}">
        		可编辑弹出树(末级控制、输入控制、顺向细化)
	    </c:if>
	    <c:if test="${detailSet.isSource=='17'}">
        		大文本
	    </c:if>	
	    <c:if test="${detailSet.isSource=='18'}">
        		下拉列表
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
   //用户点击新增按钮后
   function addData(){
	   var linkname = document.getElementById("linkname").value;
	   var url="/system/ui/addDetailSetBefore.do?linkname="+linkname+"&type="+detailNum;
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
		   alert("请选择需要删除的记录！");
		   return;
		}
		    if(confirm('确实要删除所选单据吗?')) {
            document.forms[0].action="/system/ui/delDetailSet.do";
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
		 document.forms[0].action="/system/ui/findOneDetailSet.do";
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
    //window.opener.location.reload();   
   //window.opener.location.href=window.opener.location.href; 

}
  
hideUiButton(<%=Globals.IFMIS_UISET_FLAG%>);    
		
</script>




