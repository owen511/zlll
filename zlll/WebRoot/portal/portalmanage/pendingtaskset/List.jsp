<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<link href="<%=request.getContextPath()%>/style/styleportal.css"
	rel="stylesheet" type="text/css" />
<script type="text/javascript">
<!--
function init(){
	$('topnum').value = 0;
}
function selectMutlElememt(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,checkflag,elementfilter,organtype){
    //wy add 20090923
    /** ganhua 20080304 在打开选择窗口前回调一个方法做某些事情
	  * 如：设置过滤条件，检查联动的其它控件是否选择值
	  * 
	**/
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	window.checkflag = checkflag;
	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";;
	var notReturn = true;
    try{
        notReturn = eval(func);
	}catch(e){
		//不成功,不管它,当没有实现该方法
	}
	if(notReturn == false)
	{
		return;
	}
	var elementfilter = "";
	if(window.elementfilter){
		elementfilter = window.elementfilter;
	}

	var refererurl = ""+window.location.href;
	
	var url = ROOT_PATH+"/common/tree/openTree.do?organtype="+organtype+"&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode
		+"&vchfieldcode="+vchfieldcode+"&elementfilter="+elementfilter
		+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var result = window.showModalDialog(url,window,"dialogHeight:500px;dialogWidth: 325px;resizable: No; status: No; help:No;");
    //清楚窗体的过滤条件 ganhua 20090509
	if(window.elementfilter);
	{
		window.elementfilter = null;
	}
	if(result != null){
	    if(typeof(result)!="string"){
			if(backinput == null){
				backinput = $(vchfieldcode);
			}
			backinput.value = result.value;
			backinput.valueid = result.id;
			backinput.isleaf= result.isleaf;
			backinput.valuecode = result.valuecode;
		}
	}
	else
	{
	    if(backinput != null){
	        backinput.value = "";
			backinput.valueid = null;
			backinput.valuecode = "";
	    } 
	 }
}
//-->
</script>

<div id='query_t'>
	<span><span title=查询 class=query_btn onclick=query()
		onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>查询</a>
	</span> </span>
</div>
<div id="querylist" style="display: block;">
	<form>
		<div>
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td nowrap="nowrap" width="120px">
						指标管理处室
					</td>
					<td nowrap="nowrap" align="left">
						<input id="bdgmanagedivision" name="bdgmanagedivision" value="" valueid="" valuecode=""
							type=text class=text_pop style="width: 100px" readonly
							onclick='selectMutlElememt(46000000,46000011,"5001","bdgmanagedivision",this,false,"","bdgmanagedivision");' />
						<button
							onclick='selectMutlElememt(46000000,46000011,"5001","bdgmanagedivision",this.form.bdgmanagedivision,false,"","bdgmanagedivision");null'></button>
						<img align=middle src='/images/done_btn/clear_qry2.gif'
							onclick='clearInput(document.getElementById("bdgmanagedivision"));'>

					</td>
				</tr>
			</table>
		</div>
		<div id="managerdiv">
			<table width='100%' border='0' cellspacing='0' cellpadding='0'>
				<tr>
					<td width='30%' valign="top">
						<div id="form_table_title">
							<ul>
								<li class="top">
									<div>
										管理者列表
									</div>
								</li>
							</ul>
						</div>
						<div id='containerline15'>
							<div id='tgroup_div'
								style='position: relative; height: expression(this .             offsetParent .             offsetHeight); width: 100%;'>
							</div>
						</div>
					</td>
					<td width='40%'>
						<div id="form_table_title">
							<ul>
								<li class="top">
									<div>
										员工列表
									</div>
								</li>
							</ul>
						</div>
						<div id='containerline15'>
							<div id='tnuser_div'
								style='position: relative; height: expression(this . offsetParent . offsetHeight); width: 100%;'>
							</div>
						</div>
					</td>
				</tr>
	
				
			</table>
			<div id="confirm_exit_btn">
		<input name="submit2" type="button" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" value="保存" onclick="modifyUnifedGroupUser()" />
		<input name="submit3" type="button" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" value="返回" onclick="back()" />
	</div>
		</div>
	</form>
</div>
<script>
col = createColumnConfig();
col.id = "usercode";
col.name = "usercode";
col.type = "S";
col.title = "用户编码";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "name";
col.name = "name";
col.type = "S";
col.title = "姓名";
ColumnConfig[col.id.toLowerCase()]=col;


col = createColumnConfig();
col.id = "departmentname";
col.name = "departmentname";
col.type = "S";
col.title = "部门";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "usercodes";
col.name = "usercodes";
col.type = "S";
col.title = "用户编码组";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}	
}
ColumnConfig[col.id.toLowerCase()]=col;


col.id = "usercode";
col.name = "usercode";
col.type = "S";
col.title = "用户编码";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}	
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "name";
col.name = "name";
col.type = "S";
col.title = "姓名";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}	
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "departmentname";
col.name = "departmentname";
col.type = "S";
col.title = "部门";
col.show = function(rownum,value,row,tdobj,datatable){
if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

//显示用户和业务系统
function userSelect(users){
    	if(users!=null){
		    if(tnuser!=null && tnuser.data != null){
				users = users.split(",");		
				for(i=0;i<users.length;i++){
					for(j=0;j<tnuser.data.length;j++){
						if(users[i]==tnuser.data[j].usercode){
							tnuser.data[j].checked=true;
						}
					}
				}
				tnuser.draw();
			}
		}
    }
    var selrow=null;
    function selOrderRow(){
        var table = document.getElementById("tgroup_div_dataTable");
    	var inp=table.getElementsByTagName("input");
    	
    	for(var i=0;i<tgroup.data.length;i++){
			if(tgroup.data[i]==selrow){
				inp[i].checked=true;
			}else{
				inp[i].checked=false;
			}
		}
    }
    function groupmainclick(row){
    	if(selrow!=null&&row!=selrow){
    		var boo=false;
	    	var rows = tnuser.getSelectedRow();
			if(rows.length>0){
				if(selrow.usercodes==null||selrow.usercodes.length==0){
					boo=true;
				}else {
					if(selrow.usercodes.split(',').length!=rows.length){
						boo=true;
					}else{
						var usercodes=selrow.usercodes+",";
						for(i = 0 ;i<rows.length;i++){
							usercodes=usercodes.replace(rows[i].usercode+",",'');
						}
						if(usercodes.length>0){
							boo=true;
						}else{
							boo=false;
						}
					}
				}
			}else{
				if(selrow.usercodes==null||selrow.usercodes.length==0){
					boo=false;
				}else{
					boo=true;
				}
			}
			if(boo){
	    		if(confirm("之前操作是否保存?")){
		    		row.checked=false;
	    			selrow.checked=true;
	    			modifyUnifedGroupUser();
	    			selOrderRow();
	    			return;
	    		}
    		}
    	}
    	selrow=row;
    	tnuser.selectedallrows(false);
    	if(row.checked){
			var users = row.usercodes;
			if(users!=null && users.length>0){
				userSelect(users);
			}else{
			    if(tnuser!=null && tnuser.data != null){
					for(j=0;j<tnuser.data.length;j++){
						tnuser.data[j].checked=false;
					}
					tnuser.draw();
			    }	
			}
		}
    }
  	tgroup=new dataTable();
	tgroup.parent =document.getElementById('tgroup_div');
	tgroup.setTableHead(["radio","usercode","name","departmentname"]);
	tgroup.data ="";
	tgroup.onrowclick =groupmainclick;
	tgroup.checkedOnclick = true;
	tgroup.show();

	tnuser =new dataTable();
	tnuser.parent = document.getElementById('tnuser_div');
	tnuser.setTableHead(["checkbox","usercode","name","departmentname"]);
	tnuser.data =""; 
	tnuser.show();
			
	//分配用户业务系统		
    function showCreateUPAfter(resp){
  			tgroup.getSelectedRow()[0].usercodes = usercodes;
  			selrow=null;
  			alert("分配成功！");
  	}
     var usercodes="";	
    function modifyUnifedGroupUser(){
		if(tgroup!=null && tgroup.data !=null){
			if (tgroup.getSelectedRow().length==0){
			   alert("请选择管理人员！");return;
			}
		}   
		var rows = tnuser.getSelectedRow();
		usercodes="";
		for(i = 0 ;i<rows.length;i++){
			if(i>0){
				usercodes = usercodes +",";
			}
			usercodes = usercodes + rows[i].usercode;
		}
		new Ajax.Request("<%=request.getContextPath()%>/portal/portalpendingtask/saveUsermanage.do?random="+Math.random(), 
     	{
	   		parameters : "managecode=" + tgroup.getSelectedRow()[0].usercode+"&usercode=" + usercodes,
	   		method: 'get', 
	   		onComplete : showCreateUPAfter,
	   		requestHeaders: {Accept: 'application/json'},
	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
	        }
		}); 	
  }
  //取消用户业务系统
  function cancelUnifedUserProgram(){
		if(tgroup!=null && tgroup.data !=null){
			if (tgroup.getSelectedRow().length==0){
			   alert("请选择管理者！");return;
			}
		}   
		if(confirm("确定取消部门管理全部下属？")){
			new Ajax.Request("<%=request.getContextPath()%>/portal/portalpendingtask/cleanUsermanage.do?cancel=true&random="+Math.random(), 
	     	{
		   		parameters : "managecode=" + tgroup.getSelectedRow()[0].usercode,
		   		method: 'get', 
		   		onComplete : showCancelUPAfter,
		   		requestHeaders: {Accept: 'application/json'},
		   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
		        }
			}); 
		}	
  }
  function showCancelUPAfter(resp){
  		    tgroup.getSelectedRow()[0].usercodes = '';
  			for(i=0;i<tnuser.data.length;i++){
	   		   tnuser.data[i].checked=false;
	   		}
	   		tnuser.draw();
	   		selrow=null;
  			alert("取消成功！");
  }	
  //begin 楚艳红 2012.10.30 返回
function back(){

			var url = "<%=request.getContextPath()%>/portal/portalpendingtask/index.do?isMenu=yes&mainmenu=42000000&submenu=42000110";
			window.location.href = url;
}
//end 楚艳红 2012.10.30 返回
  function query(){
  	var valuecode=document.getElementById("bdgmanagedivision").valueid;
  		if(valuecode==""){alert("请选择处室");return ;}
    	new Ajax.Request("<%=request.getContextPath()%>/portal/portalpendingtask/queryUsersmanage.do?random="+Math.random(), 
     	{
	   		parameters : "organtype=bdgmanagedivision&organid=" + valuecode+"&organname="+document.getElementById("bdgmanagedivision").value,
	   		method: 'post', 
	   		onComplete : queryAffter,
	   		requestHeaders: {Accept: 'application/json'},
	   		onFailure : function(resp) {
	        }
		});
  }
  //保存用户分组
    function queryAffter(res){
  		tgroup.data= eval(res.responseText);;
  		tgroup.show();
  		
  		tnuser.data= eval(res.responseText);;
  		tnuser.show();
    }
</script>