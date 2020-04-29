<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
       String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
       String actiontype = request.getParameter("actiontype");
%>
<SCRIPT LANGUAGE="JavaScript" type="text/javascript" src="<%=basePath%>/strutsui/js/editsrcmaindata.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript">
<!--
var uieditmodel = "mainsubdata";//标注编辑界面是"无来源主子单的编辑"
var actiontype = "<%=actiontype%>";
var ifmis_uipage_head = "<c:out value="${ifmis_uipage_head}"/>";
controlcurbal = false; //不控制金额
//-->
</SCRIPT>
<script>

// 将选中的数据填写到编辑区内
function mainclick(detailrow){
	//校验主子单的必填字段
	if(!addMainEditFormInput()) return;
	if(!addEditFormInput()) return;
	
	if(tdetail ==null ||tdetail.data == null || tdetail.data.length <1 ){
		return;
	}
	var selectrows = tdetail.getSelectedRow();	
	var selectrow=selectrows[0];
	if(tdetail != null && tdetail.data != null && tdetail.data.length >0 && detailObj != selectrow){
		if(addEditFormInput()){
		    detailObj=selectrow;
			var formObject = $("detailform");
            datasynchfromtable(detailObj);
			detailObj=selectrow;
		}
		else
		{
			selectrow.checked=false;
			detailObj.checked=true;
			tdetail.draw();
		}
	}
}

// 将主单和明细信息保存到后台
function saveContinue(backindex,datatype){
	if(backindex==undefined)
		backindex = false;
	//校验主子单的必填字段
	if(!addMainEditFormInput()) return;
	if(!addEditFormInput()) return;
	maindatasynchtoObj(mainVouch);
	setMainVouchPK(mainVouch);
    mainVouch.details=tdetail.data;
    if(mainVouch.details!=null&&mainVouch.details.length!=0){
        if(addEditFormInput()){
           maindatasynch();
          // alert("savedatatype:"+datatype);
           if(datatype==undefined||datatype=='tamin'){
          	   $("detailform").maindata.value = Object.toJSON(mainVouch);
           }else{
           
          	   $("detailform").maindata.value = Object.toJSON(tdetail.data);
           }
           //设置所有功能按钮不可用
		   disabledFunctionButton();
		   var url = 'save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
		   var pars = "maindata="+$("detailform").maindata.value+"&billid="+$("detailform").billid.value;
           save(url,pars,backindex);
        }
    	return false;
    }else{
        alert("请至少添加一条明细信息！");
        return false;
    }
}

function saveQuit(){
	saveContinue(true,'tamin');
}
//datatype: tmain, tdetail
function saveQuit(datatype){
	saveContinue(true,datatype);
}
function setMainVouchPK(mainVouch){
	if($("billid"))mainVouch.billid= $("billid").value;
}
//修改可用余额
function checkAMT(obj){
	if( obj.value.trim().length == 0 || obj.value == null){
		alert("金额不能为空！");
		//obj.focus();
		return false;
	}
	if(!moneyFormatToNumber(obj.value).isNumber()){
		alert("金额必须是数字！");
		//obj.focus();
		return false;
	}
	if(detailObj==null) return;
}

function setValueToMainVouch(orerowobj){
	if(orerowobj!=null)mainVouch = orerowobj;
}

</script>
<form name="detailform" id="detailform"
	action="save.do?submittype=form&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>" method="post">
	<input type="hidden" name="maindata" id="maindata" />
	<input type="hidden" name="billid" id="billid" value="<c:out value='${mainVouDTO.billid}'/>" />
	
	<c:choose>
	    <c:when test="${ifmis_uipage_head eq 'nomainedit'}">
		</c:when>
	    <c:otherwise>
	    	<div id="form_table_title_edit">
				<ul><li class="top"><div>	主单编辑区	</div></li></ul>
			</div>
			
			<div id="form_table" style="display:block;">
				<ui:maineditform formid="detailform"  pagetype = "add" parsetype="link" tableName="tmain" />
			</div>
			
	    </c:otherwise>   
	</c:choose>
	
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>	明细信息 </div>
			</li>
		</ul>
	</div>
	<!--请保留此div和a标签 -->
	<div id="containerline10">
		<ui:datatable id="tdetail" tabletype="DetailList" onclick="mainclick"	columndefine="true" showradio="true" data="detailsjson" />
	</div>
	
	<!--不要明细编辑区直接在表格中编辑
		<div id="form_table_title_edit">
			<ul><li class="top"><div>明细编辑区</div></li></ul>
		</div>
		<div id="form_table" style="display:block;">
			<ui:editform formid="detailform" pagetype="add" parsetype="link"tableName="tdetail" />
		</div>
	 -->
	 
	<div id="confirm_exit_btn">
			<c:choose>
				<c:when test="${ifmis_uipage_head ne 'nomainedit'&& actiontype eq 'add'}">
				    <input name="button1" type="button" value="增加明细栏" class="button_style" onclick="addDetail()" />
				      	<input name="button1" type="button" value="复制明细" class="button_style" onclick="copyDetail()" />
				    <input name="button2" type="button" value="删除明细栏" class="button_style" onclick="delDetail();" />
					<input name="goonbtn" type="button" value="保存并继续" class="button_style" id="saveAndOn" onclick="saveContinue(false,'tmain')"/>
					<input name="submitbtn" type="button" value="保存并退出" class="button_style" id="saveAndOut" onclick="saveQuit()"/>
				</c:when>
				 <c:when test="${ifmis_uipage_head eq 'nomainedit'&& actiontype eq 'add'}">
				 	  <input name="button1" type="button" value="增加明细栏" class="button_style" onclick="addDetailNoSrc()" />
				 	       <input name="button1" type="button" value="复制明细" class="button_style" onclick="copyDetail()" />
				     <input name="button2" type="button" value="删除明细栏" class="button_style" onclick="delDetail();" />
					<input name="goonbtn" type="button" value="保存并继续" class="button_style" id="saveAndOn" onclick="saveContinue(false,'tdetail')"/>
					<input name="submitbtn" type="button" value="保存并退出" class="button_style" id="saveAndOut" onclick="saveQuit('tdetail')"/>
				</c:when>  
			</c:choose>
			
			<c:choose>
			    <c:when test="${ifmis_uipage_head ne 'nomainedit'&& actiontype ne 'add'}">
					<input name="submitbtn" type="button" value="保存" class="button_style" id="saveAndOut" onclick="saveQuit()"/>
				</c:when>
				 <c:when test="${ifmis_uipage_head eq 'nomainedit'&& actiontype ne 'add'}">
					<input name="submitbtn" type="button" value="保存" class="button_style" id="saveAndOut" onclick="saveQuit('tdetail')"/>
				</c:when>   
			</c:choose>

		<input name="mod3" type="button" value="返回" class="button_style"onclick="backCheckSave()" />
	</div>
</form>
<script>
//begin页面状态初始化
	//对修改来说，明细列表中必然有数据，因此默认选中第一条明细，并赋给全局变量detailObj作为初始值
	if(tdetail.data.length==0)tdetail.data[0] = new Object();
	tdetail.data[0].checked=true;
	tdetail.show();
	detailObj=tdetail.data[0];
	
	datasynchfromtable(detailObj);
	
    //同步mainVouDTO到主编辑区
	var mainJson = <%= request.getAttribute("mainJson")%>;
	setValueToMainVouch(mainJson[0]);
	if(actiontype=="add"){
		setDefaultValue();
   		setMainDefaultValue();
   			
	}else{
		if("nomainedit"==ifmis_uipage_head)detailObj.billid = mainJson[0].billid;//无主编辑的列表修改，将主单的单号给子单.
		maindatasynchfromtable(mainJson[0]);
	}
	
    //给金额加千分位
	if($('detailform').amt){
   		$('detailform').amt.value = formatNumber($('detailform').amt.value,"#,###.00");
    }
    
function maindatasynch() {
	if (tdetail != null && tdetail.data != null && tdetail.data.length > 0) {
				//同步更新所有子数据发文日期
		var datas = tdetail.data;
		//主编辑区里的元素数组
		for (var i = 0; datas!=null&&i < datas.length; i++) {
			maindatasynchtoObj(datas[i]);
			/*for (var j = 0; j < maininpueleList.length; j++) {

				maindatasynchtoObj(datas[i],maininpueleList);
				eval(" var eleObj = $('detailform')." + maininpueleList[j] + ".value");
				
				var temp = maininpueleList[j].replace("main", "");
				eval("datas[i]." + temp + "= eleObj");
			}
			*/
		}
	}
	tdetail.draw();
}

//end页面状态初始化 
</script>
