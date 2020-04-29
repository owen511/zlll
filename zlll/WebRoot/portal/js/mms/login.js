// 检查命名空间
if (Ext.lt.mms == null) {
	Ext.lt.mms = {};
}
Ext.lt.mms.login = function(service, config) {
	Ext.lt.mms.login.service = service;
	var loginPanel = new Ext.Panel({
				id : 'logindds',
//				bodyStyle:'border:6px solid #666666;',
				html : '<div align="center">'
				     + '<table>'
				     + '    <tr><td style="height:240px;font-size:36px" align="center">综合管理系统</td></tr>'
				     + '    <tr><td style="height:100px;" align="center">'
				     + '        <span>用户名：<input type="text" id="userName"/>&nbsp;&nbsp;密码：<input type="password" id="passWord"/></span></br></br>'
				     + '        <span id="confirmInfo" style="display:none;">用户名或密码错误,请重新输入!</span>' 
				     + '    </td></tr>'
				     + '    <tr><td style="height:100px;" align="center">'
				     + '        <input type="button" onclick="login();" value="登录"/>&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" onclick="resetInfo();" value="重置"/>'
				     + '</td></tr>'
				     + '</table>'
				     + '</div>'
			});
	return loginPanel;
}
//重置按钮单击事件
function resetInfo(){
    //清空用户名、密码信息
    document.getElementById("userName").value="";
    document.getElementById("passWord").value="";
}
//处理登录请求
function login(){
    //用户名信息
    var userName = document.getElementById("userName").value;
    //密码信息
    var passWord = document.getElementById("passWord").value;
    //用户信息验证对象
    var userObject = new Object();
    userObject.userName = userName;
    userObject.passWord = passWord;
    //验证用户登录信息
    Ext.lt.RCP.server("loginservermms", "login", userObject,function(resp) {
        if(resp.login == 1){
            window.location = _ROOT_PATH_ + "/show/defaultmms.page";
        }else {
		    //清空用户名、密码信息
		    document.getElementById("userName").value="";
		    document.getElementById("passWord").value="";
            document.getElementById("confirmInfo").style.display="";
        }
    });
}
