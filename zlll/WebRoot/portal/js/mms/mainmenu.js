// ��������ռ�
if (Ext.lt.mms == null) {
	Ext.lt.mms = {};
}
Ext.lt.mms.mainmenu = function(service, config) {
	Ext.lt.mms.mainmenu.service = service;
	var mainmenuPanel = new Ext.form.FormPanel({
				id : 'mainmenu',
				html : '<table width="100%"><tr><td>'
				+ '<div style="height:30px;"><a href="#" onclick="showBasicSubMenu();">�ճ�bugͳ��</a>&nbsp;&nbsp;&nbsp;'
				+ '<a href="#" onclick="showImpSubMenu();">�ش��������</a>&nbsp;&nbsp;&nbsp;'
				+ '<a href="#" onclick="showTasks();">����������</a>&nbsp;&nbsp;&nbsp;'
				+ '<a href="#" onclick="showTest();">�����鱨��ͳ��</a></div>'
				+ '</td><td align="right">'
				+ '<span>�û���'+config.userName+'</span>&nbsp;<span>ϵͳ���ڣ�'+config.systemDate+'</span>&nbsp;'
				+ '<a href="'+_ROOT_PATH_+'">�˳�</a>'
				+ '</td></tr></table>'
			});

	return mainmenuPanel;
}
//չʾ�ش�������ٲ˵�
function showImpSubMenu (){
    //��ȡ�Ӳ˵�����panel����
    document.getElementById("subMenuDiv").innerHTML = '<div><a href="#" onclick="showImpBugs();">�ش��������(����)</a></div></br>'
                                                    + '<div><a href="#" onclick="showImpBugsAll();">�ش��������(ȫ��)</a></div>';
    //���ú�̨�ش�������Ϣ
    Ext.lt.RCP.server("mainshowservermms", "findImpBugs", null,function(resp) {
	    //�ش�������Ϣ��ʾpanel
	    var impBugsShowPanel = impBugsShow(resp);
	    //����չʾ���������չʾpanel
	    Ext.lt.template.addPanel2CenterMain(impBugsShowPanel);
	    Ext.lt.template.showPanel2CenterMain('impBugsPanel');
    });
}
//չʾ�����鱨������
function showTest (){
    //�����Ӳ˵�����
    document.getElementById("subMenuDiv").innerHTML = '<div><a href="#" onclick="showTest();">6�·ݸ�ϵͳbugͳ��</a></div></br>'
                                                    + '<div><a href="#" onclick="showTestWorkLoad();">6�·ݲ�����Ա������ͳ��</a></div></br>'
                                                    + '<div><a href="#" onclick="showTestNoDeal();">��ϵͳδ���bug</a></div>';
    //���ú�̨���������б���Ϣ
    Ext.lt.RCP.server("mainshowservermms", "findProductBugs", null,function(resp) {
	    //���������б���Ϣ��ʾpanel
	    var productBugsShowPanel = productBugsShow(resp);
	    //����չʾ���������չʾpanel
	    Ext.lt.template.addPanel2CenterMain(productBugsShowPanel);
	    Ext.lt.template.showPanel2CenterMain('productBugsPanal');
    });
}

//չʾ����bugͳ����Ϣ�˵�
function showBasicSubMenu(){
    window.location = _ROOT_PATH_ + '/show/defaultmms.page';
}

