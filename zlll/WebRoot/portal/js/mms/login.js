// ��������ռ�
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
				     + '    <tr><td style="height:240px;font-size:36px" align="center">�ۺϹ���ϵͳ</td></tr>'
				     + '    <tr><td style="height:100px;" align="center">'
				     + '        <span>�û�����<input type="text" id="userName"/>&nbsp;&nbsp;���룺<input type="password" id="passWord"/></span></br></br>'
				     + '        <span id="confirmInfo" style="display:none;">�û������������,����������!</span>' 
				     + '    </td></tr>'
				     + '    <tr><td style="height:100px;" align="center">'
				     + '        <input type="button" onclick="login();" value="��¼"/>&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" onclick="resetInfo();" value="����"/>'
				     + '</td></tr>'
				     + '</table>'
				     + '</div>'
			});
	return loginPanel;
}
//���ð�ť�����¼�
function resetInfo(){
    //����û�����������Ϣ
    document.getElementById("userName").value="";
    document.getElementById("passWord").value="";
}
//�����¼����
function login(){
    //�û�����Ϣ
    var userName = document.getElementById("userName").value;
    //������Ϣ
    var passWord = document.getElementById("passWord").value;
    //�û���Ϣ��֤����
    var userObject = new Object();
    userObject.userName = userName;
    userObject.passWord = passWord;
    //��֤�û���¼��Ϣ
    Ext.lt.RCP.server("loginservermms", "login", userObject,function(resp) {
        if(resp.login == 1){
            window.location = _ROOT_PATH_ + "/show/defaultmms.page";
        }else {
		    //����û�����������Ϣ
		    document.getElementById("userName").value="";
		    document.getElementById("passWord").value="";
            document.getElementById("confirmInfo").style.display="";
        }
    });
}
