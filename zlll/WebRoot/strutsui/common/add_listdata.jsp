<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id=queryform
	action="edit.do?actiontype=add&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<ui:queryform formid="queryform" />
</form>
<form id="advancedQueryForm" name="advancedQueryForm" 
action="edit.do?actiontype=add&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>" method="post">   
	   <ui:advancedqueryform formid="advancedQueryForm" />
</form>
<div>
<form name="mainListForm" id="mainListForm" action="save.do?submittype=form&mainmenu=<c:out value='${param.mainmenu}'/>&submenu=<c:out value='${param.submenu}'/>" method="post">
<input type ="hidden" name ="maindata" id ="maindata" />
<input name="selectedbillids" id="selectedbillids" type="hidden"/>
<div id="form_table_title">
  <ul>
    <li class="top">
      <div>凭证信息</div>
    </li>
  </ul>
</div>
<!--请保留此div和a标签 -->
<div id="containerline10">
	<ui:datatable id="tmain" tabletype="MainList" data="json" display="line" showcheckbox = "true"  columndefine="true"/>
</div>
<div id="confirm_exit_btn">      
    <input type="button" name="save" value="保存" class="button_style" onclick="saveDetail();"/>    
    <input name="reset" type="button" value="返回" class="button_style" onclick="backIndex()" />
</div>
</form>