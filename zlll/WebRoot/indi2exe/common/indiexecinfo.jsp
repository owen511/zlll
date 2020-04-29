<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<jsp:directive.page import="java.util.List" />
<jsp:directive.page import="java.util.Map" />


<script language='javascript'>

<%
	List indiList = (List) request.getAttribute("indiList");
	String cols ="" ;
	
	for (int i = 0; i < indiList.size(); i++) {
		Map cfgMap = (Map) indiList.get(i);
		cols = cols + "col = createColumnConfig();\n";
		cols = cols + "col.id = \"" + cfgMap.get("colcode") + "\";\n";
		cols = cols + "col.name = \"" + cfgMap.get("colcode") + "\";\n";
		cols = cols + "col.type = \"M\";\n";
		cols = cols + "col.title = \"" + cfgMap.get("colname") + "\";\n";
		cols = cols + "col.show = showInputMoneyFormat ;\n ";
		cols = cols + "ColumnConfig[col.id.toLowerCase()]=col;\n ";
	}	
	out.println(cols) ;	
%>


		window.focus();
		for(var col in window.opener.ColumnConfig){
			if(typeof window.opener.ColumnConfig[col].id!="undefined"&&
				typeof window.opener.ColumnConfig[col].name!="undefined"&&
				typeof window.opener.ColumnConfig[col].id!="checkbox"&&
				typeof window.opener.ColumnConfig[col].id!="radio")
				
				ColumnConfig[col]=window.opener.ColumnConfig[col];
		}
		</script>


<div id="aa" style="position: relative; overflow: auto; height: 100%;">
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					请查看单据信息
				</div>
			</li>
		</ul>
	</div>
	<div id="containerline3">
		<div id='edit_table' style='display: none; padding: 0; margin: 0;'></div>
		<div id='tmain_div'
			style='position: relative; behavior: url(#default#userData); height: expression(this .   offsetParent .   offsetHeight-22); width: 100%;'>
		</div>
	</div>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					请查看执行情况
				</div>
			</li>
		</ul>
	</div>
	<div id="containerline5">
		<div id='edit_table' style='display: none; padding: 0; margin: 0;'></div>
		<div id='tdetail_div'
			style='position: relative; behavior: url(#default#userData); height: expression(this .   offsetParent .   offsetHeight-22); width: 100%;'>
		</div>
	</div>
	<br />
	<center>
		<button onclick="exportexcel3(tmain,tdetail)" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'">
			导出EXCEL
		</button>

		<button onclick="window.close()" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'">
			关闭
		</button>
	</center>

</div>
<script>
		<% String tableType = request.getParameter("content0");%>
		var oridatatable = window.opener.<%=tableType%>;
		/**/
		var tmain =new dataTable();
		tmain.id ='tmain';
		tmain.isShowRadio = oridatatable.isShowRadio ;
		tmain.isShowCheckBox = oridatatable.isShowCheckBox ;
		tmain.isShowSerial = oridatatable.isShowSerial ;
		tmain.isCreateAmtColumn= oridatatable.isCreateAmtColumn;
		tmain.columnList = [];
		<% 
			if("tdetail".equals(tableType)){
		%>
		tmain.tabletype = 'DetailList';
		<% 
			}else{
		%>
		tmain.tabletype = 'MainList';
		<% 
			}
		%>
		tmain.parent = document.getElementById('tmain_div');
		var heads = oridatatable.getTableHead;
		var newheads = new Array();
		for(var i=0;i<heads.length;i++){
			var head = heads[i];
			if(head=="checkbox"||head=="radio"||head =="indiexec")
				continue;
			newheads[newheads.length] = head;
		}
		tmain.setTableHead(newheads);
		tmain.data = [<%=request.getParameter("content1")%>];
		tmain.display = 'block';
		tmain.mainmenu = <%=request.getParameter("mainmenu")%>;
		tmain.submenu = <%=request.getParameter("submenu")%>;
		tmain.vchtypecode = oridatatable.vchtypecode;
		tmain.showstatus = false;
		tmain.amtflag = oridatatable.amtflag;
		tmain.show();
		tmain.allflag = false ;
		<% 
			if(request.getAttribute("heads").toString().length()<3){
				out.println("alert('单据还未终审，没有执行情况。窗口将关闭！');\n");
				out.println("window.close();\n");
			}else{
		%>
		var tdetail =new dataTable();
		tdetail.id ='tdetail';
		tdetail.isShowRadio = false ;
		tdetail.isShowCheckBox = false ;
		tdetail.isShowSerial = true ;
		tdetail.isCreateAmtColumn= false;
		tdetail.columnList = [];
		tdetail.tabletype = 'DetailList';
		tdetail.parent = document.getElementById('tdetail_div');
		tdetail.setTableHead(<%=request.getAttribute("heads")%>);
		tdetail.data = <%=request.getAttribute("detaildata")%>;
		tdetail.display = 'block';
		tdetail.mainmenu = <%=request.getParameter("mainmenu")%>;
		tdetail.submenu = <%=request.getParameter("submenu")%>;
		tdetail.vchtypecode = oridatatable.vchtypecode;
		tdetail.showstatus = false;
		tdetail.amtflag = oridatatable.amtflag;
		tdetail.show();
		<% 
			}
		%>
		</script>
