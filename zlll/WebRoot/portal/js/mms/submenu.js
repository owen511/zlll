// ��������ռ�
if (Ext.lt.mms == null) {
	Ext.lt.mms = {};
}
/*�Ӳ˵���Ϣ*/
Ext.lt.mms.submenu = function(service, config) {
	Ext.lt.mms.submenu.service = service;
	var submenuPanel = new Ext.Panel({
				id : 'submenu',
				border:false,
				width:200,
				html : '<div id="subMenuDiv">'
				      +'<div><a href="#" onclick="showBasicBugs();">����bugͳ��(����)</a></div></br>'
				      +'<div><a href="#" onclick="showBasicBugsAll();">����bugͳ��(ȫ��)</a></div></br>'
				      +'<div><a href="#" onclick="showBbBugs();">����������(����)</a></div></br>'
				      +'<div><a href="#" onclick="showBbBugsAll();">����������(ȫ��)</a></div></br>'
				      +'<div><a href="#" onclick="showAcBugs();">AC����ͳ��(����)</a></div></br>'
				      +'<div><a href="#" onclick="showAcBugsAll();">AC����ͳ��(ȫ��)</a></div>'
				      +'</div>'
			});
	return submenuPanel;
}
/*�˵�˵��*/
Ext.lt.mms.submenudesc = function(service, config) {
	Ext.lt.mms.submenudesc.service = service;
	var submenudescPanel = new Ext.Panel({
				id : 'submenu3',
				border:false,
				title:'˵��',
				html : '<div>'
				      +'<span>����bug��Ϣͳ�Ƴ�BB(�����ڲ�����)��CC(�ֳ�����)�������bug��Ϣ</span>'
				      +'</div>'
			});
	return submenudescPanel;
}
//ˢ��ҳ��չʾ����bugͳ����Ϣ
function showBasicBugs(){
    window.location = _ROOT_PATH_ + '/show/defaultmms.page';
}
//BB����bug��Ϣ��ʾ
function showBbBugs(){
    //���ú�̨BB������Ϣ
    Ext.lt.RCP.server("mainshowservermms", "findBbBugs", null,function(resp) {
	    //BB������ʾpanel
	    var bbBugsShowPanel = bbBugsShow(resp);
	    //����չʾ���������չʾpanel
	    Ext.lt.template.addPanel2CenterMain(bbBugsShowPanel);
	    Ext.lt.template.showPanel2CenterMain('bbBugsPanel');
    });
}
//AC����bug��Ϣ��ʾ
function showAcBugs(){
    //���ú�̨AC������Ϣ
    Ext.lt.RCP.server("mainshowservermms", "findAcBugs", null,function(resp) {
	    //AC������ʾpanel
	    var acBugsShowPanel = acBugsShow(resp);
	    //����չʾ���������չʾpanel
	    Ext.lt.template.addPanel2CenterMain(acBugsShowPanel);
	    Ext.lt.template.showPanel2CenterMain('acBugsPanel');
    });
}
//P1��bugͳ��
function showImpBugs(){
    //���ú�̨�ش�������Ϣ
    Ext.lt.RCP.server("mainshowservermms", "findImpBugs", null,function(resp) {
	    //�ش�������Ϣ��ʾpanel
	    var impBugsShowPanel = impBugsShow(resp);
	    //����չʾ���������չʾpanel
	    Ext.lt.template.addPanel2CenterMain(impBugsShowPanel);
	    Ext.lt.template.showPanel2CenterMain('impBugsPanel');
    });
}
//����bugͳ����Ϣ��ȫ����
function showBasicBugsAll(){
    //���ú�̨�ش�������Ϣ
    Ext.lt.RCP.server("mainshowservermms", "findBasicBugsAll", null,function(resp) {
	    //�ش�������Ϣ��ʾpanel
	    var basicBugsAllShowPanel = basicBugsAllShow(resp);
	    //����չʾ���������չʾpanel
	    Ext.lt.template.addPanel2CenterMain(basicBugsAllShowPanel);
	    Ext.lt.template.showPanel2CenterMain('basicBugsAllPanel');
    });
}
//����bugͳ����Ϣ��ȫ����
function showAcBugsAll(){
    //���ú�̨�ش�������Ϣ
    Ext.lt.RCP.server("mainshowservermms", "findAcBugsAll", null,function(resp) {
	    //�ش�������Ϣ��ʾpanel
	    var acBugsAllShowPanel = acBugsAllShow(resp);
	    //����չʾ���������չʾpanel
	    Ext.lt.template.addPanel2CenterMain(acBugsAllShowPanel);
	    Ext.lt.template.showPanel2CenterMain('acBugsAllPanel');
    });
}
//BB����������ͳ����Ϣ��ȫ����
function showBbBugsAll(){
    //���ú�̨�ش�������Ϣ
    Ext.lt.RCP.server("mainshowservermms", "findBbBugsAll", null,function(resp) {
	    //�ش�������Ϣ��ʾpanel
	    var bbBugsAllShowPanel = bbBugsAllShow(resp);
	    //����չʾ���������չʾpanel
	    Ext.lt.template.addPanel2CenterMain(bbBugsAllShowPanel);
	    Ext.lt.template.showPanel2CenterMain('bbBugsAllPanel');
    });
}
//P1��bugͳ��
function showImpBugsAll(){
    //���ú�̨�ش�������Ϣ
    Ext.lt.RCP.server("mainshowservermms", "findImpBugsAll", null,function(resp) {
	    //�ش�������Ϣ��ʾpanel
	    var impBugsAllShowPanel = impBugsAllShow(resp);
	    //����չʾ���������չʾpanel
	    Ext.lt.template.addPanel2CenterMain(impBugsAllShowPanel);
	    Ext.lt.template.showPanel2CenterMain('impBugsAllPanel');
    });
}
//չʾ���������б���Ϣ-ȥ��
function showTasksFrom (){
    //���ú�̨���������б���Ϣ
    Ext.lt.RCP.server("mainshowservermms", "findTasksFrom", null,function(resp) {
	    //���������б���Ϣ��ʾpanel
	    var tasksFromShowPanel = tasksFromShow(resp);
	    //����չʾ���������չʾpanel
	    Ext.lt.template.addPanel2CenterMain(tasksFromShowPanel);
	    Ext.lt.template.showPanel2CenterMain('tasksFromPanel');
    });
}
//չʾ������Ա������ͳ��
function showTestWorkLoad (){
    //���ú�̨������Ա������ͳ����Ϣ
    Ext.lt.RCP.server("mainshowservermms", "findTestWorkLoad", null,function(resp) {
	    //���������б���Ϣ��ʾpanel
	    var testWorkLoadShowPanel = testWorkLoadShow(resp);
	    //����չʾ���������չʾpanel
	    Ext.lt.template.addPanel2CenterMain(testWorkLoadShowPanel);
	    Ext.lt.template.showPanel2CenterMain('testWorkLoadPanal');
    });
}
//չʾ������Ա�ύbugδ����
function showTestNoDeal (){
    //���ú�̨������Ա�ύbugδ����
    Ext.lt.RCP.server("mainshowservermms", "findTestNoDeal", null,function(resp) {
	    //���������б���Ϣ��ʾpanel
	    var testNoDealShowPanel = testNoDealShow(resp);
	    //����չʾ���������չʾpanel
	    Ext.lt.template.addPanel2CenterMain(testNoDealShowPanel);
	    Ext.lt.template.showPanel2CenterMain('testNoDealPanal');
    });
}
