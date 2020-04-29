<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ page import="java.util.List"%>
<%
	response.setHeader("Cache-Control","no-cache"); 
	response.setHeader("Pragma","no-cache"); 
	response.setDateHeader("Expires",0); 
	String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ request.getContextPath();
	String path = request.getServerName();
	//地区
	List arealist = (List)request.getAttribute("arealist");
	//年度
	String yearlist = (String)request.getAttribute("yearlist");
	//登录失败返回的错误信息
	String message = request.getAttribute("errorMessage")!=null?(String)request.getAttribute("errorMessage"):"";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<meta http-equiv="X-UA-Compatible" content="IE=7" />
<title>用户登录</title>
<head>
<script type="text/javascript">
var _ROOT_PATH_ = '<%=basePath%>';
var path = '<%=path%>';
var yearlist = eval('<%=yearlist%>');
</script>
<style>
    #login_button {
	border: 0px;
	text-align: center;
	padding-top: 3px;
	width: 70px;
	height: 20px;
	background-image: url(../../images/buttons/login_button.gif);
    }
</style>
<script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
<script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
<script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
<script language="JavaScript" type="text/javascript">
	//window.status="Copyright&copy; 2008 Longtu Software Co.,Ltd.All rights reserved." 
	var _cuntry = "";
	var _year = "";
	//选中cookies中存的默认值
	function onloadCook(){
		try{
			var cook=document.cookie;
			if(cook.indexOf('loginname')!=-1){
				document.forms[0].username.value=cook.split('loginname=')[1].split(';')[0];
			}
			if(cook.indexOf('cuntry')!=-1){
				_cuntry = cook.split('cuntry=')[1].split(';')[0]
			}
			if(cook.indexOf('loginyear')!=-1){
				_year = cook.split('loginyear=')[1].split(';')[0]
			}
			if(cook.indexOf('province')!=-1){
				document.forms[0].province.value=cook.split('province=')[1].split(';')[0];
				selectcuntry(document.forms[0].province.value);
			}
			
		}catch(e){}	
	}
	
	//回车登录
	function onkeyEnter(e){
		var keynum
		var keychar
		var numcheck
		if(window.event) // IE
		  {
		  keynum = e.keyCode
		  }
		else if(e.which) // Netscape/Firefox/Opera
		  {
		  keynum = e.which
		  }
		if(keynum==13){
			subWin()
		}
	}
	
	//选择市州创建区县
	function selectcuntry(province){
	   var cuntry = document.getElementById('cuntry');//县
	   if( cuntry==null){
			return;
	   }
	   cuntry.options.length=0;
	   <% for(int i = 0;i < arealist.size();i ++){ 
       		java.util.Map map = (java.util.Map)arealist.get(i);
       		if(map.get("levelno")!=null&&!"1".equals(map.get("levelno").toString())){
	   %>
			   var superitemid = '<%=map.get("superitemid")%>';
			   if(province==superitemid){
				    //创建下拉信息对象
					var opt=document.createElement('option');
					opt.value='<%=map.get("govid")%>';
					opt.innerText='<%=map.get("name")%>';
					if(_cuntry!=""&&opt.value==_cuntry){
						opt.selected = true;
					}
					//把下拉信息对象追加到下拉列表对象中
					cuntry.appendChild(opt);
			   }
	   <%}}%>
	   if(cuntry.value!=""){
	    	selectYear(cuntry.value);
	   }
	}
	
	//根据财政地区创建year下拉框
	function selectYear(govid){
	    var yaerObj = document.getElementById('year');//县
	    if(yaerObj == null){
		 	return;
	    }
	    yaerObj.options.length=0;
	    for(var i = 0;i < yearlist.length;i ++){
	    	var obj = yearlist[i];
	    	if(obj.govid!=null&&obj.govid == govid){
	    		var opt=document.createElement('option');
					opt.value=obj.year;
					opt.innerText=obj.year;
					if(obj.year==_year){
						opt.selected = true;
					}
					yaerObj.appendChild(opt);
	    	}
	    }
	}
</script>
</head>
<body style="background-color:#FFFFFF;" onkeypress="onkeyEnter(event)" onload="onloadCook();">
<div style="margin-top:12%; background-image:url(<%=request.getContextPath()%>/images/bg/font.gif); background-repeat:no-repeat; background-position:left; height:50px; "></div>
<div id="login1" style="display:block; background-image:url(<%=request.getContextPath()%>/images/bg/ifmis_login_bg.gif); background-repeat:no-repeat;height:221px; width:100%; margin-top:2%; background-position:left; font-size:14px;">
  <form id="form1" name="form1" autocomplete="off" method="post" action="" >
    <table width="93%" border="0" cellspacing="0" cellpadding="0" style ="width:60%; display:block; margin-top:140px; margin-left:20%;">
      <tr>
      <!-- -请不要添加默认的用户和密码  -->
      <% String isportalca = "false";//(String)session.getAttribute("isportalca");
         String issuccess = "";//(String)session.getAttribute("isSuccess");
         String iscaloginfail="";//(String)session.getAttribute("iscaloginfail");
         if(isportalca.equalsIgnoreCase("false")||(iscaloginfail.equals("false")&&issuccess!=null&&isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("false"))){
	    %>
        <td width="8%" align="right" nowrap="nowrap"><font color="#ffffff">用户编号：</font></td>
        <td nowrap="nowrap"><input type="text" name="username" value=""  style="width:80px"/></td>
        <td width="7%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">密码：</font></td>
        <td  nowrap="nowrap"><input type="password" name="password" value="" style="width:80px"/></td>
        <% }%>
        <td width="8%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">省/市/州：</font></td>
        <td width="" nowrap="nowrap">
	        <select name="province" id="province" style="width:80px"  onchange="selectcuntry(this.value)">  
	        <% for(int i = 0;i < arealist.size();i ++){ 
	        		java.util.Map map = (java.util.Map)arealist.get(i);
	        		if(map.get("levelno")!=null&&"1".equals(map.get("levelno").toString())){
	        %>
	        <option value='<%=map.get("govid") %>'><%=map.get("name") %></option>
	        <%}} %>   
	        </select>
        </td>
        <td width="8%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">区/县：</font></td>
        <td width="" nowrap="nowrap">
	        <select name="cuntry" id="cuntry" style="width:80px" onchange="selectYear(this.value)">      
	        </select>
        </td>
        <td width="10%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">财政年度：</font></td>
        <td  nowrap="nowrap">
	        <select name="year" id="year" style="width:70px;">   
	        </select>
        </td>
        <%if((isportalca.equalsIgnoreCase("true")&&issuccess==null)||(isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("true"))||(isportalca.equalsIgnoreCase("true")&&iscaloginfail.equals("true")&&issuccess.equals("false"))){%>
        <td colspan="2" nowrap="nowrap">
       		<input type="hidden" id="signed_data" name="signed_data"/>
        	<input type="button" value="认证" id="login_button" onclick="doDataProcess()"/>
        </td>
        <%}%>
      </tr>
      <%if(isportalca.equalsIgnoreCase("true")&&issuccess==null ||(isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("true"))||(isportalca.equalsIgnoreCase("true")&&iscaloginfail.equals("true")&&issuccess.equals("false"))){ %>  
      <tr>
        <td nowrap="nowrap" colspan="4">&nbsp;<input type="hidden" name="screenwidth"></td>
      </tr>
      <%}else{ %>
        <tr>
           <td nowrap="nowrap" colspan="6">&nbsp;<input type="hidden" name="screenwidth"></td>
        </tr>
      <%} %>  
      <tr>
        <td colspan="7"  nowrap="nowrap" valign="bottom" align="center">&nbsp;<font color="red" id="errorssage"><%= message%></font></td>
        <% 
        if(isportalca.equalsIgnoreCase("false")||(iscaloginfail.equals("false")&&issuccess!=null&&isportalca.equalsIgnoreCase("true")&&issuccess.equalsIgnoreCase("false"))){ %>
        <td colspan="3" nowrap="nowrap">
        <input type="button" value="登录" id="login_button" onclick="subWin();"/>
        <input type="button" value="重置" id="login_button" onclick="resetLogin();"/>
        </td>
        <%}%>
        <input type="hidden" id="fontFile" name="fontFile"/>
      </tr>
    </table>
  </form>
</div>
 <form id="multiAreaForm" name="multiAreaForm" method="post" action="">
	 <input type="hidden" id="username" name="username"/>
     <input type="hidden" id="year" name="year"/>
	 <input type="hidden" id="password" name="password"/>
	 <input type="hidden" id="area" name="area"/>
	 <input type="hidden" id="area_name" name="area_name"/>
	 <input type="hidden" id="screenwidth" name="screenwidth"/>
	 <input type="hidden" id="mainUrl" name="mainUrl"/> 
	 <input type="hidden" id="signed_data" name="signed_data"/>
	 <input type="hidden" id="DSign_Content" name="DSign_Content"/>
	 <input type="hidden" id="province" name="province"/>
	 <input type="hidden" id="county" name="DSign_Content"/>
 </form>
</body>
<script language="JavaScript" type="text/javascript">
	var loginFlag = false;
	selectcuntry(document.getElementById("province").value);
	document.all("screenwidth").value= window.screen.width;
	try{
	   document.forms['form1'].username.focus();
	}catch(e){}
	
	//跳转
	function loginarea(datasource,serveraddress){
		var form = document.forms[0];
        var multiAreaForm = document.getElementById("multiAreaForm");
        //表单提交地址
        multiAreaForm.action = serveraddress;
        //用户编码
        multiAreaForm.username.value = form.username.value;
        //密码
        multiAreaForm.password.value = form.password.value;
        //地区标识 
        try{
        	var areaname = "";
            if(form.province!=null){
		        for(var z=0;z<form.province.length;z++){
					if(form.province[z].selected==true){
						areaname = form.province[z].text;
						break;
					}	
			    }	
	        }
	        if(form.cuntry!=null){
		        for(var z=0;z<form.cuntry.length;z++){
					if(form.cuntry[z].selected==true){
						var cuntryname = form.cuntry[z].text;
						if(cuntryname.indexOf(areaname)==-1){
							areaname += cuntryname;
						}else{
							areaname = cuntryname;
						}
						break;
					}
			    }	
	        }
       	    multiAreaForm.area_name.value = areaname;
        }catch(e){}
		//财政年度
		multiAreaForm.year.value = datasource;
		//用于控制菜单宽度
		multiAreaForm.screenwidth.value = window.screen.width;
		//当前服务地址，用户退出系统操作
		multiAreaForm.mainUrl.value = _ROOT_PATH_;
		//提交表单
		multiAreaForm.submit();
	}
	
	//登录
	function dologin(){
		if(loginFlag){
			return;
		}
		loginFlag = true;
		//表单对象
		var form=document.forms[0];
		var username = form.username.value;
	    //username = encodeURI(username);
		var config = new Object(); 
		config.username = username;
		config.password = form.password.value;
		config.province = form.province.value;
		config.cuntry = form.cuntry.value;
		config.year = form.year.value;
		//当前服务地址
		config.url = path;
		Ext.lt.RCP.server("loginserver", "login",  config, function (resp) {
			if(resp.errormessage!=""){
             	document.getElementById("errorssage").innerHTML=resp.errormessage;
             	loginFlag = false;
            }else{
             	var datasource = resp.datasource;
             	var serveraddress = resp.serveraddress;
             	loginarea(datasource,serveraddress);
            }
            document.forms[0].password.value = "";
		},function(){});
	}
	
	//登录时存入cookie默认值
	function subWin(){
		try{
			document.getElementById("errorssage").innerHTML="";
			var cook=document.cookie;
			var date=new Date();
			var expireDays=10*365;
			date.setTime(date.getTime()+expireDays*24*3600*1000);
			//cookie中存用户名
			newcook = 'loginname='+document.forms[0].username.value+";expires="+unescape(date.toGMTString())+';';
			//cookie中存年份
			var loginyear = document.forms[0].year.value;
			//cookie中存财政
			var province = document.forms[0].province.value;
			var cuntry = document.forms[0].cuntry.value;
			newcook1 = 'province='+province+";expires="+unescape(date.toGMTString())+';';
			newcook2 = 'cuntry='+cuntry+";expires="+unescape(date.toGMTString())+';';
			newcook3 = 'loginyear='+loginyear+";expires="+unescape(date.toGMTString())+';';
			document.cookie = newcook;
			document.cookie = newcook1;
			document.cookie = newcook2;
			document.cookie = newcook3;
		}catch(e){}
		dologin();
	}
	
	//重置
	function resetLogin(){
		document.forms[0].username.value = "";
		document.forms[0].password.value = "";
		document.getElementById("errorssage").innerHTML="";
	}
</script>
