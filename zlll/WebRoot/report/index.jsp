<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>

<script type="text/javascript">


//20090929 jiazhitao add
function showReport(row){
	var	 eObj = event.srcElement;
	if(eObj.tagName=='DIV'||eObj.tagName=='INPUT'){ //ժҪ�ֶβ��ô򿪱��� jzy
		return;
	}
	var submenu = row.menuid;
 if(submenu && submenu == "null" ){
 	submenu="<c:out value="${param.submenu}"/>"
 }

 var url = "<%=request.getContextPath()%>/report/show_result.do?reportcode="+ row.reportcode+"&reportspec="+row.reportspec+"&submenu="+submenu;
 var windowWidth = window.screen.availwidth;
 var windowHeight = window.screen.availheight;
 window.open(url, '_blank','width='+ windowWidth + ',height='+ windowHeight +  ',status=yes,toolbar=no,menubar=no,directories=no,resizable=yes,location=no top=0,left=0,Scrollbars=yes,help:No' );

}


function clearValue(){
document.reportqueryform.reportcode.value="";
document.reportqueryform.reportname.value="";
}


function query(){
document.reportqueryform.action="<%=request.getContextPath()%>/report/index.do?mainmenu=33000"
document.reportqueryform.submit();

}
function doSave(){
	show();
	var data = tmain.data;
	var remark;
	var params="";
	for(var i=0;i<data.length;i++){
		remark = data[i].remark;
		if(remark!=null){
			params += "@"+data[i].reportid+":"+remark; 
		}
	}
		params="reportinfo="+params;
	    var url = "/report/index/savereportinfo.do";
        JQ.ajax({
       	type: "post",
       	url:url,
       	data:params,
       	complete:function(msg){
       		var result = msg.responseText;
       		if(result=="true"){
       			alert("����ɹ�");
       		}else{
           		alert("����ʧ��");
       		}
       		closeDiv();
       	}
       });
}
</script>

<div id="query_t">
	<div>
		<span><span title="��ѯ" class="query_btn" onclick="query()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">��ѯ</a> </span> </span>
		<span><span title="�����ѯ����" class="clear_btn"
			onclick="clearValue()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">�����ѯ����</a> </span> </span>
		<span><span title="���ز�ѯ����" class="hidden_btn"
			onclick="doQuery2(this)" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">���ز�ѯ����</a> </span>
		</span>
		<span><span title="�����Զ��屨������" class="save_btn"
			onclick="doSave(this)" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">�����Զ��屨������</a> </span>
		</span>
			
	</div>
</div>

<div id= "querylist" style="display:block;">
<form name="reportqueryform" id="reportqueryform"
	action=""
	method="post">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				
				<td align="left">
					�������&nbsp;
					<input name="reportcode" type="text" id="reportcode" onchange="changeData()" value='<c:out value="${rcValue}"/>'>
				</td>
				
				<td align="left">
					��������&nbsp;
					<input name="reportname" type="text" id="reportname" onchange="changeData()" value='<c:out value="${rnValue}"/>'>
				</td>
			</tr>
		</table>
</form>
</div>
<form name="applyform" id="applyform" action="#" method="post">
<div id="form_table_title">
	<ul>
		<li class="top">
			<div>
				ȫ������
			</div>
		</li>
	</ul>
</div>
<div id="containerline17">
	<!-- ʹ�ñ�ǩ������onclick ʹ�õķ��������֮ǰ����� -->
	<ui:datatable columndefine="true" tabletype="MainList" id="tmain" data="json" onclick="showReport" />
</div>
</form>