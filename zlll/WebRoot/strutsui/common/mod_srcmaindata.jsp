<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
       String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<SCRIPT LANGUAGE="JavaScript" type="text/javascript" src="<%=basePath%>/strutsui/js/editsrcmaindata.js"></SCRIPT>
<div id="form_table_title">
	<ul>
		<li class="top">
			<div>
				指标来源信息
			</div>
		</li>
	</ul>
</div>
<!-- 这个DIV上定义了主单样式 -->
<div id="containerline6">
	<!-- 使用标签创建，onclick 使用的方法必须放之前定义过 -->
	<ui:datatable id="tmain" tabletype="MainList" data="sourcesjson"
		showradio="true" columndefine="true" />
</div>
<!--一行放三个查询条件-->
<form name="detailform" id="detailform"
	action="save.do?submittype=form&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<input type="hidden" name="maindata" id="maindata" />
	<input type="hidden" name="billid" id="billid" value="<c:out value='${mainVouDTO.billid}'/>" />
	<input type="hidden"name="billcode" id="billcode" value="<c:out value='${mainVouDTO.billcode}'/>" />
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					指标主单编辑区
				</div>
			</li>
		</ul>
	</div>
	<div id="form_table" style="display:block;">
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
		<ui:datatable id="tdetail" tabletype="DetailList" onclick="detailclick"
			showradio="true" data="detailsjson" columndefine="true" />
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
	<ui:editform formid="detailform" pagetype="add" parsetype="link" tableName="tdetail" />
	</div>
	<div id="confirm_exit_btn">
		<input name="button1" type="button" value="增加明细栏" class="button_style"
			onclick="addDetail()" />
		<input name="button2" type="button" value="删除明细栏" class="button_style"
			onclick="delDetail();" />
		<input name="savebutton" type="button" value="保存" class="button_style"
			onclick="return saveQuit()" />
		<input name="mod3" type="button" value="返回" class="button_style"
			onclick="backCheckSave()" />
	</div>
</form>
<!--有函数重写所以必面放在这个位置-->
<SCRIPT LANGUAGE="JavaScript" type="text/javascript" src="<%=basePath%>/strutsui/js/editsrcmaindata.js"></SCRIPT>
<script>
//begin页面状态初始化
    
    //默认页面加载即选中来源数据
    tmain.selectedallrows(true);
	var selectrows = tmain.getSelectedRow();
	var selectrow = selectrows[0];
	
	mainVouch = selectrow;
	
	//对修改来说，明细列表中必然有数据，因此默认选中第一条明细，并赋给全局变量detailObj作为初始值
	tdetail.data[0].checked=true;
	tdetail.show();
	detailObj=tdetail.data[0];

	datasynchfromtable(detailObj);
	detailamtDefault=detailObj.amt;
	
	//同步mainVouDTO到主编辑区
	var mainJson = <%= request.getAttribute("mainJson")%>;
   	maindatasynchfromtable(mainJson[0]);
	//给金额加千分位
	if($('detailform').amt){
   		$('detailform').amt.value = formatNumber($('detailform').amt.value,"#,###.00");
    }
//end页面状态初始化 
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

