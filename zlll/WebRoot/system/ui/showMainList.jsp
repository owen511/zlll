
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@page import="gov.mof.fasp.ifmis.common.Globals"%>
<HTML >
 <HEAD>
 <META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"> 
<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">

  <TITLE>主单页面显示设置</TITLE>
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
<span><span title="新增" class="add_btn" onclick="addData()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">新增</a></span></span>
<span><span title="修改" class="mod_btn" onclick="modifyData()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">修改</a></span></span>
<span><span title="删除" class="del_btn" onclick="deleteData()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">删除</a></span></span>
<span><span title="关闭" class="close_btn" onclick="winclose()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">关闭</a></span></span>
</div>
</div>

 <div id="form_table_title" >
  <ul>
    <li class="top">
      <div>主单页面显示设置</div>
    </li>
  </ul>
</div>

<form name = 'dataform' id = 'dataform' method="post">
   
<!--请保留此div和a标签 -->
      <div id="list" style="height:290px; width:98%;overflow-x:scroll;overflow-y:scroll;margin-left:10px;">
      <input type="hidden" name="linkname" id="linkname" value="<c:out value="${linkname}"/>"/>
        <table  border="0"  align="center" cellspacing="1" id="tbl1" >
          <tr >
            <th nowrap="nowrap" width="44" align="center"><input name="contralCheck" id="ifAll" type="checkbox" onclick="myCheckAll();"/></th>
            <th nowrap="nowrap" width="67">显示次序</th>
            <th nowrap="nowrap" width="127">字段名</th>
            <th nowrap="nowrap" width="160"><div align="center">中文名称</div></th>
            <th nowrap="nowrap" width="100"><div align="center">是否可见</div></th>
            <th nowrap="nowrap" width="100"><div align="center">是否可编辑</div></th>
            <th nowrap="nowrap" width="100">必填</th>
            <th nowrap="nowrap" width="100">字段性质</th>
            <th nowrap="nowrap" width="100">级联控制</th>
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
           		out.println("不可见");
			   }else{
                 out.println("可见");
              }
          %>
          </td>
            <td nowrap="nowrap" align="center">
            	<% String showEdit = (map.get("ISEDIT")).toString();
	               Integer edit = Integer.valueOf(showEdit);
	               int editToInt = edit.intValue();
	                if(0==editToInt){
	           		out.println("否");
				   }else{
	                 out.println("是");
	               }
          		%>
            </td>
            <td nowrap="nowrap" align="center">
            	<% String requirement = map.get("requirement")!=null ?(map.get("requirement")).toString():"";
	                if("1".equals(requirement)){
	           		out.println("是");
				   }
          		%>
            </td>
            <td nowrap="nowrap" align="center">
            <% String show = (map.get("isSource")).toString();
               Integer in = Integer.valueOf(show);
               int i = in.intValue();
              if(0==i){
           		out.println("无来源数据");
			 }
			 if(1==i){
			 	 out.println("有来源数据");
			 }
			 if(2==i){
			 	 out.println("大文本(折行处理)");
			 }
			 if(3==i){
			 	 out.println("金额");
			 }
			 if(4==i){
			 	 out.println("数值");
			 }
			 if(5==i){
			 	 out.println("日期(对lastupdatetime 进行特殊处理)");
			 }
			 if(20==i){
			 	 out.println("日期(含年月)");
			 }
			 if(6==i){
			 	 out.println("字符串(不做折行处理)");
			 }
			 if(7==i){
			 	 out.println("可编辑弹出树(输入控制)");
			 }
			 if(8==i){
			 	 out.println("可编辑弹出树(末级控制、输入控制)");
			 }
			 if(9==i){
			 	 out.println("可编辑弹出树(显示一级、输入控制)");
			 }
			 if(10==i){
			 	 out.println("可编辑弹出树(显示二级、输入控制)");
			 }
			 if(11==i){
			 	 out.println("可编辑弹出树(显示一级、末级控制、输入控制)");
			 }
			  if(12==i){
			 	 out.println("可编辑弹出树(显示二级、末级控制、输入控制)");
			 }
			  if(13==i){
			 	 out.println("可编辑弹出树(控制显示至一级、输入控制)");
			 }
			  if(14==i){
			 	 out.println("可编辑弹出树(控制显示至二级、输入控制)");
			 }
			  if(15==i){
			 	 out.println("可编辑弹出树(控制显示至一级、末级控制、输入控制)");
			 }
			  if(16==i){
			 	 out.println("可编辑弹出树(控制显示至二级、末级控制、输入控制)");
			 }
			 if(19==i){
			 	 out.println("可编辑弹出树(末级控制、输入控制、顺向细化)");
			 }
			  if(17==i){
				 	 out.println("大文本");
				 }
			  if(18==i){
				 	 out.println("下拉列表");
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
            document.forms[0].action="/system/ui/delMainListSet.do";
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
		 document.forms[0].action="/system/ui/findOneMainSet.do";
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


