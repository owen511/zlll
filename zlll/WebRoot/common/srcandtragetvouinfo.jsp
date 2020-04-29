<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
	String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>数据来源去向</title>
		<script type='text/javascript' src='<%=request.getContextPath()%>/js/changedata.js'></script>
		<script type="text/javascript">
		var ROOT_PATH = '<%=basePath%>';
		col = createColumnConfig();
		col.id = "itemconfig";
		col.name = "itemconfig";
		col.type = "S";
		col.title = "明细";
		col.show = function(rownum,value,row,tdobj,datatable){
		     if(datatable.id=="tmain"){
			 	tdobj.innerHTML = "<div ALIGN='center'><img src='"+ROOT_PATH+"/images/actions/up.gif' alt='查询明细' onclick='querydata("+'"from"'+"," + row.vchid +",\"" + row.vchtypeid_name +"\");' /></div>";
			 	return;
		 	 } else if(datatable.id=="tdetail"){
		 	 	tdobj.innerHTML = "<div ALIGN='center'><img src='"+ROOT_PATH+"/images/actions/down.gif' alt='查询明细' onclick='querydata("+'"to"'+"," + row.vchid +",\"" + row.vchtypeid_name +"\");' /></div>";
		 	 	return;
		 	 } else if (datatable.id=="tdetail2"){
		 	 	if(value!=null&&value=="from"){
		 	 		tdobj.innerHTML = "<div ALIGN='center'><img src='"+ROOT_PATH+"/images/actions/up.gif' alt='查询明细' onclick='querydata("+'"from"'+"," + row.vchid +",\"" + row.vchtypeid_name +"\");' /></div>";
			 		return;
		 		} else {
		 			tdobj.innerHTML = "<div ALIGN='center'><img src='"+ROOT_PATH+"/images/actions/down.gif' alt='查询明细' onclick='querydata("+'"to"'+"," + row.vchid +",\"" + row.vchtypeid_name +"\");' /></div>";
		 	 		return;
		 		}
		 	 }
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		window.focus();
		</script>
	</head>

	<body class="pop_body">
		<div id ="status" style="display:none;">
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div id="vchtypeidname" >
						数据来源去向
					</div>
				</li>
			</ul>
		</div>	
		</div>
		<div id="showdata">
			<div id="shenhe_title">
				<div id="shenhe_title_middle">
					数据来源去向
				</div>
			</div>
			<div id="form_table_title">
				<ul>
					<li class="top">
						<div>
							<c:out value="${voucherDTO.name}"/>数据来源
						</div>
					</li>
				</ul>
			</div>
			<div id="containerline5">
				<ui:datatable id="tmain" tabletype="MainList" data="sourceJson" columndefine="true"/>
			</div>
			<div id="form_table_title">
				<ul>
					<li class="top">
						<div>
							<c:out value="${voucherDTO.name}"/>数据去向
						</div>
					</li>
				</ul>
			</div>
			<div id="containerline5">
				<ui:datatable id="tdetail" tabletype="DetailList" data="targetJson"  columndefine="true"/>
			</div>
			<br />
			<center>
				<button onclick="window.close()" class="button_style"
					onmouseover="this.className='OverBtn'"
					onmouseout="this.className='button_style'"
					onmousedown="this.className='down'">
					关闭窗口
				</button>
			</center>

		</div>
		<script>
		var tableHeads;
		function querydata(type,vchid,vchtypename){
			if(type=="to"){
				tableHeads = tdetail.getTableHead;
				document.getElementById("vchtypeidname").innerHTML =vchtypename+""+"去向";
			} else {
				tableHeads = tmain.getTableHead;
				document.getElementById("vchtypeidname").innerHTML =vchtypename+""+"来源";
			}
			show();
			var url = ROOT_PATH + '/commons/findtragetvouinfo.do';
			var pars = 'findtype=' + type+'&vchid='+vchid;
		   	var myAjax = new Ajax.Request(url,{method: 'post', parameters: pars,onComplete: showdata});
		}
		//显示数据
		function showdata(resp)
		{
			closeDiv();
			var json = resp.responseText.evalJSON(true);
			if(json!=null&&json.json!=null){
				eval("var obj = "+json.json);
				if(typeof(obj)=="string"){
					alert(json.error);
					return;
				}
			}
		    var d_dialog = document.getElementById('status'); 
		    var d_table = document.getElementById('tdetail2_div'); 
		    var borderdiv = document.createElement('<div id="containerline10"></div>');
			var contentdiv = document.createElement('<div id="tdetail2_div" style="height:expression(this.offsetParent.offsetHeight);width:expression(this.offsetParent.offsetWidth);"></div>');
			borderdiv.appendChild(contentdiv);
			d_dialog.appendChild(borderdiv);
		    d_dialog.style.visibility='visible';
		    d_dialog.style.display='block';
		    var tdetail2 =new dataTable();
			tdetail2.id ='tdetail2';
			tdetail2.isCreateAmtColumn= true;
			tdetail2.columnList = ['amt'];
			tdetail2.tabletype = 'MainList';
			tdetail2.parent = document.getElementById('tdetail2_div');
			tdetail2.setTableHead(tableHeads);
			tdetail2.data = [];
			if(json.json!=null){
				eval("var obj = "+json.json);
				if(typeof obj !="string")
					tdetail2.data = obj;
			}
			tdetail2.display = 'block';
			tdetail2.vchtypecode = 1001;
			tdetail2.showstatus = false;
			tdetail2.show();
			tdetail2.allflag = false ;
			
			var cancelObj = document.createElement('');
			var btndivObj = document.createElement('<div id="div_btn" ></div>');
			btndivObj.innerHTML='<center><button  class="button_style" onclick="closedata()">返回</button></center>';
			d_dialog.appendChild(btndivObj); 
			
			document.getElementById('showdata').style.display='none';
			
		}
		function closedata(){
		    var d_dialog = document.getElementById('status');
		    d_dialog.style.visibility='hidden';
		    d_dialog.style.display='none';
		    document.getElementById('showdata').style.display='block';
		}
		</script>
	 	
		<script>
		 document.getElementById('status').style.display='none';
		 tdetail.draw();
		</script>
	</body>
</html>
