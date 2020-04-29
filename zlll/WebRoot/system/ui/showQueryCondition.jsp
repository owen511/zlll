
<%@ page contentType="text/html; charset=GBK" %>
<%@page import="java.util.ArrayList"%>
<%@page import="gov.mof.fasp.ifmis.common.Globals"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<HTML >
 <HEAD>

  <TITLE>查询条件页面显示设置</TITLE>
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
      <div>查询条件页面显示设置</div>
    </li>
  </ul>
</div>

   <form>
<!--请保留此div和a标签 -->
     <div id="list"  style="height:290px; width:98%;overflow-x:scroll;overflow-y:scroll;margin-left:10px;">
	 <input type="hidden" name="linkname" id="linkname" value="<c:out value="${linkname}"/>"/>
	 <input type="hidden" name="vouchTypeCode" id="vouchTypeCode" value="<c:out value="${vouchTypeCode}"/>"/>
       <table border="0" id="tbl1" cellspacing="1"  align="center" >
         <tr >
           <th nowrap="nowrap" width="1%" align="center"><input id="ifAll"  name="allbox" type="checkbox" onclick="myCheckAll();"/></th>
           <th nowrap="nowrap" width="58">显示顺序</th>
           <th nowrap="nowrap" width="120">字段名 </th>
           <th nowrap="nowrap" width="150"><div align="center">中文名称</div></th>
           <!--wy add 20091010 查询条件设置新功能：增加默认值 、是否必填、级联控制--> 
           <th nowrap="nowrap" ><div align="center">过滤条件</div></th>  
           <th nowrap="nowrap" ><div align="center">输入控制规则</div></th>   
           <th nowrap="nowrap" ><div align="center">是否必填</div></th>
           <th nowrap="nowrap" ><div align="center">启用级联控制</div></th>         
           <th nowrap="nowrap" width="107"><div align="center">是否可见</div></th>
           <th nowrap="nowrap" width="103"><div align="center">查询类型</div></th>
           <th nowrap="nowrap" ><div align="center">默认值</div></th>
           <th nowrap="nowrap" ><div align="center">归属类型</div></th>
           <th nowrap="nowrap" ><div align="center">自定义函数</div></th>
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
        		必填
	   			</c:if>
	    		<c:if test="${conditionList.isRequired=='0'}">
        		非必填
	  			 </c:if>
           </td>
           <td nowrap="nowrap">
           	   <c:if test="${conditionList.showLevelConfig=='1'}">是</c:if>
           	   <c:if test="${conditionList.showLevelConfig=='0'}">否</c:if> 
		   </td>
           <td nowrap="nowrap" align="center">
	    		<c:if test="${conditionList.isVisible=='2'}"><!--wy add 隐藏和做为查询条件-->
        		隐藏
	  			</c:if>            
             	<c:if test="${conditionList.isVisible=='1'}">
        		可见
	   			</c:if>
	    		<c:if test="${conditionList.isVisible=='0'}">
        		不可见
	  			</c:if>			 
           </td>
           <td nowrap="nowrap" align="center">
	           <c:if test="${conditionList.type=='m'}">
	        		多选
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='s'}">
	        		单选
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='si'}">
	        		单选区间
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='selecti'}">
	        		下拉区间
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='t'}">
	        		文本
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='dm'}">
	        		下拉多选
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='ds'}">
	        		下拉单选
		   	   </c:if>
		   	    <c:if test="${conditionList.type=='sdm'}">
	        		单层多选
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='sds'}">
	        		单层单选
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='inputtips'}">
	        		自动下拉提示
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='d'}">
	        		日期
		   	   </c:if>
		   	  <c:if test="${conditionList.type=='dym'}">
	        		日期(含年月)
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='di'}">
	        		日期区间
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='ni'}">
	        		数字区间
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='ti'}">
	        		文本区间
		   	   </c:if>
		   	   <c:if test="${conditionList.type=='select'}">
	        		下拉菜单
		   	   </c:if>
		   	    <c:if test="${conditionList.type=='e'}">
	        		枚举类型
		   	   </c:if>
		   	    <c:if test="${conditionList.type=='se'}">
	        		无数据权限单选
		   	   </c:if>
		   	    <c:if test="${conditionList.type=='me'}">
	        		无数据权限多选
		   	   </c:if>
		   	    <c:if test="${conditionList.type=='intree'}">
	        		自定义弹出树
		   	   </c:if>
		   	    <c:if test="${conditionList.type=='program_m'}">
	        		项目多选弹出树
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
   //用户点击新增按钮后
   function addData(){
	   var linkname = document.getElementById("linkname").value;
	   var vouchTypeCode = document.getElementById("vouchTypeCode").value;
	   var url="/system/ui/addConditionBefore.do?linkname="+linkname+"&vouchTypeCode="+vouchTypeCode;
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
            document.forms[0].action="/system/ui/delConditionList.do";
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
		 document.forms[0].action="/system/ui/findOneCondition.do";
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

