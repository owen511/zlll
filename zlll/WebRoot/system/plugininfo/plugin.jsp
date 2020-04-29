<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Map hm = new HashMap();
List pluginList = (List)request.getAttribute("pluginList");
%>
<script type="text/javascript">
function updateAll()
{	
	var tmp;
	var pluginCode=null;
	var pluginUsed=null;
	  	<%
		for(int i=0;i<pluginList.size();i++)
		{	hm=(Map)pluginList.get(i);			
		%>
		pluginCode='<%=hm.get("PLUGINCODE")%>';
		pluginUsed='<%=hm.get("ISUSED")%>';
		tmp=document.getElementById(pluginCode).checked?'1':'0';
		if(tmp!=pluginUsed){
			show();
			update_plugin(pluginCode,tmp);
		}	
	<%} %>
}

function update_plugin(code,value){
	var url = '<%=request.getContextPath()%>/system/updateplugininfo.do?';
	var parm='code='+code+'&value='+value;
    var myAjax = new Ajax.Request(
    url, {
        method: 'post',
        parameters: parm,
        onComplete: showR
    });
}
function showR() {
	closeDiv();
}
</script>
  <div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					系统管理启用控件检测设置
				</div>
			</li>
		</ul>
	</div>
	<div id="" style="display:block;">
	<table class="main_table_98" cellspacing="0" cellpadding="1" style="margin-left:10px;width:98%;">
		<tr>
	    <td class="main_table_title" width="50"><div align="center">序号</div></td>
	    <td class="main_table_title"><div align="center">控件文件名</div></td>
	    <td class="main_table_title"><div align="center">控件名称</div></td>
	    <td class="main_table_title"><div align="center">提示</div></td>
	    <td class="main_table_title" colspan="2"><div align="center">设置</div></td>
	  	</tr>
	  	<%
		for(int i=0;i<pluginList.size();i++)
		{		
			hm=(Map)pluginList.get(i);
		%>
		<tr style="text-align:left">
		    <td class="main_table_title_letter"><div align="center"><%=i+1 %></div></td>
		     <td class="main_table_title_letter">
		    <%=hm.get("PLUGINCODE") %>
		    </td>
		    <td class="main_table_title_letter"><%=hm.get("PLUGINNAME") %></td>
		    <td class="main_table_title_letter"><%=hm.get("REMARK") %>
		    </td>
		    <td class="main_table_title_letter"><div align="center">开启<input type="radio" id="<%=hm.get("PLUGINCODE") %>" name="radiobutton<%=hm.get("PLUGINCODE") %>" value="1" <%=hm.get("ISUSED").toString().equals("1")?"checked=\"checked\"":"" %> /></div></td>
		    <td class="main_table_title_letter"><div align="center">关闭<input type="radio" id="<%=hm.get("PLUGINCODE") %>" name="radiobutton<%=hm.get("PLUGINCODE") %>" value="0" <%=hm.get("ISUSED").toString().equals("0")?"checked=\"checked\"":"" %> /></div></td>
		    </tr>
		<%} %>
	</table>
	</div>
	<br/>
<div id="confirm_exit_btn">
		<input id ="updatevalue_button" name="mod3" type="button" value="保存修改" class="button_style"
			onclick="updateAll();" />
		<input type="hidden" ></input>
		<input type="hidden" ></input>
	</div>

