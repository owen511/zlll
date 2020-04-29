<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
       String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<SCRIPT LANGUAGE="JavaScript" type="text/javascript" src="<%=basePath%>/strutsui/js/editsrcmaindata.js"></SCRIPT>
<script>

// 处理主单点击事件，row 代表被选中的行，也就是传到页面的主单信息
function mainclick(row){

	// 获取用过单选框或复选框选中的行
	var selectrows = tmain.getSelectedRow();
	if(selectrows.length == 0){
		// 用户只在表格上点击了一下，并没有选中任何行
		return ;
	}
	
	// 由于界面上使用的是单选框，这里获取选中行
	var selectrow = selectrows[0];
	
	// 如果已经有选中行，并且追加了明细则提示用户是否要保存
	if(selectrow != mainVouch && mainVouch != null && mainVouch.details != null){
		if(confirm("是否放弃编辑？")){
			if(tdetail != null && tdetail.data != null && tdetail.data.length > 0 ){
				// 删除选中的数据
				var datas = tdetail.data;
				var money = 0.0;
				for(var i=0;i<datas.length;i++){
				    //alert(datas[i].amt);
					money += parseFloat(moneyFormatToNumber(datas[i].amt));
				}	
				// 把删除的明细中的金额退回到主单
				mainVouch.curbal = parseFloat(moneyFormatToNumber(mainVouch.curbal)) + parseFloat(money);
				clearFormInput();
				mainVouch.details = null;
				tmain.draw();
				detailObj=null;
				setDisabled(true);
			}
			tdetail.data = new Array();
			tdetail.draw();
			mainVouch= selectrow;
			mainsynch2fromtable(mainVouch);
			addDetail();
			return;
		}
		else{
			selectrow.checked=false;
			mainVouch.checked=true;
			tmain.draw();
			mainsynch2fromtable(mainVouch);
			addDetail();
			return ;
		}
	}
	
	mainVouch = selectrow;
	mainsynch2fromtable(mainVouch);
	addDetail();

}

</script>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id="queryform" name="queryform" method="post"
	action="edit.do?actiontype=add&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>">
	<ui:queryform formid="queryform" />
</form>
<div id="form_table_title">
	<ul>
		<li class="top">
			<div>
				来源信息
			</div>
		</li>
	</ul>
</div>
<!-- 这个DIV上定义了主单样式 -->
<div id="containerline4">
	<!-- 使用标签创建，onclick 使用的方法必须放之前定义过 -->
	<ui:datatable id="tmain" tabletype="MainList" data="sourcesjson"
		onclick="mainclick" showradio="true" columndefine="true" />
</div>

<div id="form_table_title_edit">
	<ul>
		<li class="top">
			<div>
				主单编辑区
			</div>
		</li>
	</ul>
</div>
<!--一行放三个查询条件-->
<form name="detailform" id="detailform"
	action="save.do?submittype=form&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<input type ="hidden" name ="maindata" id ="maindata" />
	<div id="form_table" style="display:block;">
		<%--主编辑区--%>
		<ui:maineditform formid="detailform" pagetype="add" parsetype="link"
			tableName="tmain" />
	</div>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					明细信息
				</div>
			</li>
		</ul>
	</div>
	<!--请保留此div和a标签 -->
	<div id="containerline4">
		<ui:datatable id="tdetail" tabletype="DetailList" showradio="true"
			onclick="detailclick" columndefine="true" />
	</div>
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					明细编辑区
				</div>
			</li>
		</ul>
	</div>
	<div id="form_table" style="display:block;">
		<ui:editform formid="detailform" pagetype="add" parsetype="link"
			tableName="tdetail" />
	</div>
	<div id="confirm_exit_btn">
		<input name="button1" type="button" value="增加明细栏" class="button_style"
			onclick="addDetail()" />
		<input name="button2" type="button" value="删除明细栏" class="button_style"
			onclick="delDetail();" />
		<input name="savebutton" type="button" value="保存并继续"
			class="button_style" onclick="return saveContinue()" />
		<input name="button3" type="button" value="保存并退出" class="button_style"
			onclick="return saveQuit()" />

		<input name="back" type="button" value="返回" class="button_style"
			onclick="backCheckSave()" />
	</div>
</form>
<script>
//页面加载时，将各输入框设为不可用
setDisabled(true);

//将rowObj的数据同步给主编辑区
function mainsynch2fromtable(rowObj){
	//填充主单
}
//同步主单编辑的数据到子单表中
function maindatasynch() {
	if("undefined" == typeof(maininpueleList) ||maininpueleList == null || maininpueleList.length ==0){
		return ;
	}
	var ttemp = tmain;
	if(tdetail){
		ttemp = tdetail;
	}
	if (ttemp != null && ttemp.data != null && ttemp.data.length > 0) {
				//同步更新所有子数据发文日期
		var datas = ttemp.data;	
		//主编辑区里的元素数组
		//maininpueleList;
		for (var i = 0; i < datas.length; i++) {
			for (var j = 0; j < maininpueleList.length; j++) {
			
				eval(" var eleObj = $('detailform')." + maininpueleList[j] + ".value");
				var temp = maininpueleList[j].replace("main", "");
				eval("datas[i]." + temp + "= eleObj");
			}
		}
	}
	ttemp.draw();
}
</script>

