<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<title>用户登录</title>
<script language="JavaScript" type="text/javascript">
	window.status="Copyright (C) 2008 Longtu Software Co.,Ltd.All rights reserved." 
	function changeStyle(){
		alert("change");
		var login = document.getElementById("login");
		//alert(login);
		//login.style.class="button_style_onmouseover";
	}
	function submitWin(){
		window.open('default1.html', '_blank','status=yes,toolbar=no,menubar=no,directories=no,resizable=yes');
        opener = null; //没有这句，关闭时有提示,ie5.5以上有效   
        window.close(); 
	}
</script>
</head>
<body style="background-color:#FFFFFF;">
<div id="login">
  <form id="form1" name="form1" method="post" action="#">
    <table width="93%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="8%" align="right" nowrap="nowrap">用户：</td>
        <td width="25%" nowrap="nowrap"><input type="text" name="account" value="gfmis" /></td>
        <td width="6%" align="right" nowrap="nowrap">密码：</td>
        <td width="25%" nowrap="nowrap"><input type="password" name="password" value="123456" /></td>
        <td width="9%" align="right" nowrap="nowrap">年份：</td>
        <td width="27%" nowrap="nowrap"><select name="year">
            <option value="1999">1999</option>
            <option value="2000">2000</option>
            <option value="2001">2001</option>
            <option value="2002">2002</option>
            <option value="2003">2003</option>
            <option value="2004">2004</option>
            <option value="2005">2005</option>
            <option value="2006">2006</option>
            <option value="2007">2007</option>
            <option value="2008" selected="selected">2008</option>
        </select></td>
      </tr>
      <tr>
        <td nowrap="nowrap">&nbsp;</td>
        <td nowrap="nowrap">&nbsp;</td>
        <td nowrap="nowrap">&nbsp;</td>
        <td nowrap="nowrap">&nbsp;</td>
        <td nowrap="nowrap"></td>
        <td nowrap="nowrap"></td>
      </tr>
      <tr>
        <td nowrap="nowrap">&nbsp;</td>
        <td nowrap="nowrap">&nbsp;</td>
        <td nowrap="nowrap">&nbsp;</td>
        <td nowrap="nowrap">&nbsp;</td>
        <td colspan="2" nowrap="nowrap"><input type="button" value="登录" id="login_button" onclick="submitWin()"/>
            <input type="reset" value="重置" id="login_button" /></td>
      </tr>
    </table>
  </form>
</div>
</body>
</html>
