<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui-budget.tld" prefix="bui"%>
<%
	String path = request.getContextPath();
%>
<link rel="stylesheet" type="text/css" href="<%=path%>/budget/common/style/global.css" />
<link href="../style/plugin.css" rel="stylesheet" type="text/css"/>
<style type="text/css">
<!--
body{
  padding:10px;
  margin:0px;
}

*{
  font-size:12px;
}


-->
</style>
<script type="text/javascript" src="/budget/common/js/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="/budget/common/js/dialog/dialog.js"></script>
<script type="text/javascript" src="/budget/common/js/htmleditor/htmleditor.js"></script>
<script type="text/javascript">
<!--
$(document).ready(function(){
  $("#colorTable td").mouseover(function(){
    var bc = $(this).attr("bgcolor");
    $("#ColorPreview").css("background-color",bc);
  });
  $("#colorTable td").click(function(){
    var bc = $(this).attr("bgcolor");
    $("#ColorHex").val(bc);
    $("#SelectedColor").css("background-color",bc);
  });
});

function createLink(){

  var url = $('#link_url').val();
  var target = $("#link_target").val();
  window.dialog.context.execCommand("CreateLink",false,url);
  
  window.dialog.close();
}
-->
</script>
<body>
<fieldset>
  <p>
    <label>链接</label><br />
    <input type="text" id="link_url" value="http://" style="width:200px;" />
  </p>
</fieldset>
<p>
    <button type="button" id="" onclick="createLink()">确定</button>
    <button type="button" onclick="window.dialog.close()">取消</button>
</p>
</body>
</html>