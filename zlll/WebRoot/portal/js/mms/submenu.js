// 检查命名空间
if (Ext.lt.mms == null) {
	Ext.lt.mms = {};
}
/*子菜单信息*/
Ext.lt.mms.submenu = function(service, config) {
	Ext.lt.mms.submenu.service = service;
	var submenuPanel = new Ext.Panel({
				id : 'submenu',
				border:false,
				width:200,
				html : '<div id="subMenuDiv">'
				      +'<div><a href="#" onclick="showBasicBugs();">基本bug统计(本人)</a></div></br>'
				      +'<div><a href="#" onclick="showBasicBugsAll();">基本bug统计(全部)</a></div></br>'
				      +'<div><a href="#" onclick="showBbBugs();">工作任务安排(本人)</a></div></br>'
				      +'<div><a href="#" onclick="showBbBugsAll();">工作任务安排(全部)</a></div></br>'
				      +'<div><a href="#" onclick="showAcBugs();">AC需求统计(本人)</a></div></br>'
				      +'<div><a href="#" onclick="showAcBugsAll();">AC需求统计(全部)</a></div>'
				      +'</div>'
			});
	return submenuPanel;
}
/*菜单说明*/
Ext.lt.mms.submenudesc = function(service, config) {
	Ext.lt.mms.submenudesc.service = service;
	var submenudescPanel = new Ext.Panel({
				id : 'submenu3',
				border:false,
				title:'说明',
				html : '<div>'
				      +'<span>基本bug信息统计除BB(部门内部任务)和CC(现场需求)外的所有bug信息</span>'
				      +'</div>'
			});
	return submenudescPanel;
}
//刷新页面展示基本bug统计信息
function showBasicBugs(){
    window.location = _ROOT_PATH_ + '/show/defaultmms.page';
}
//BB需求bug信息显示
function showBbBugs(){
    //调用后台BB需求信息
    Ext.lt.RCP.server("mainshowservermms", "findBbBugs", null,function(resp) {
	    //BB需求显示panel
	    var bbBugsShowPanel = bbBugsShow(resp);
	    //往主展示区域中添加展示panel
	    Ext.lt.template.addPanel2CenterMain(bbBugsShowPanel);
	    Ext.lt.template.showPanel2CenterMain('bbBugsPanel');
    });
}
//AC需求bug信息显示
function showAcBugs(){
    //调用后台AC需求信息
    Ext.lt.RCP.server("mainshowservermms", "findAcBugs", null,function(resp) {
	    //AC需求显示panel
	    var acBugsShowPanel = acBugsShow(resp);
	    //往主展示区域中添加展示panel
	    Ext.lt.template.addPanel2CenterMain(acBugsShowPanel);
	    Ext.lt.template.showPanel2CenterMain('acBugsPanel');
    });
}
//P1级bug统计
function showImpBugs(){
    //调用后台重大问题信息
    Ext.lt.RCP.server("mainshowservermms", "findImpBugs", null,function(resp) {
	    //重大问题信息显示panel
	    var impBugsShowPanel = impBugsShow(resp);
	    //往主展示区域中添加展示panel
	    Ext.lt.template.addPanel2CenterMain(impBugsShowPanel);
	    Ext.lt.template.showPanel2CenterMain('impBugsPanel');
    });
}
//基本bug统计信息（全部）
function showBasicBugsAll(){
    //调用后台重大问题信息
    Ext.lt.RCP.server("mainshowservermms", "findBasicBugsAll", null,function(resp) {
	    //重大问题信息显示panel
	    var basicBugsAllShowPanel = basicBugsAllShow(resp);
	    //往主展示区域中添加展示panel
	    Ext.lt.template.addPanel2CenterMain(basicBugsAllShowPanel);
	    Ext.lt.template.showPanel2CenterMain('basicBugsAllPanel');
    });
}
//基本bug统计信息（全部）
function showAcBugsAll(){
    //调用后台重大问题信息
    Ext.lt.RCP.server("mainshowservermms", "findAcBugsAll", null,function(resp) {
	    //重大问题信息显示panel
	    var acBugsAllShowPanel = acBugsAllShow(resp);
	    //往主展示区域中添加展示panel
	    Ext.lt.template.addPanel2CenterMain(acBugsAllShowPanel);
	    Ext.lt.template.showPanel2CenterMain('acBugsAllPanel');
    });
}
//BB工作任务安排统计信息（全部）
function showBbBugsAll(){
    //调用后台重大问题信息
    Ext.lt.RCP.server("mainshowservermms", "findBbBugsAll", null,function(resp) {
	    //重大问题信息显示panel
	    var bbBugsAllShowPanel = bbBugsAllShow(resp);
	    //往主展示区域中添加展示panel
	    Ext.lt.template.addPanel2CenterMain(bbBugsAllShowPanel);
	    Ext.lt.template.showPanel2CenterMain('bbBugsAllPanel');
    });
}
//P1级bug统计
function showImpBugsAll(){
    //调用后台重大问题信息
    Ext.lt.RCP.server("mainshowservermms", "findImpBugsAll", null,function(resp) {
	    //重大问题信息显示panel
	    var impBugsAllShowPanel = impBugsAllShow(resp);
	    //往主展示区域中添加展示panel
	    Ext.lt.template.addPanel2CenterMain(impBugsAllShowPanel);
	    Ext.lt.template.showPanel2CenterMain('impBugsAllPanel');
    });
}
//展示工作任务列表信息-去向
function showTasksFrom (){
    //调用后台工作任务列表信息
    Ext.lt.RCP.server("mainshowservermms", "findTasksFrom", null,function(resp) {
	    //工作任务列表信息显示panel
	    var tasksFromShowPanel = tasksFromShow(resp);
	    //往主展示区域中添加展示panel
	    Ext.lt.template.addPanel2CenterMain(tasksFromShowPanel);
	    Ext.lt.template.showPanel2CenterMain('tasksFromPanel');
    });
}
//展示测试人员工作量统计
function showTestWorkLoad (){
    //调用后台测试人员工作量统计信息
    Ext.lt.RCP.server("mainshowservermms", "findTestWorkLoad", null,function(resp) {
	    //工作任务列表信息显示panel
	    var testWorkLoadShowPanel = testWorkLoadShow(resp);
	    //往主展示区域中添加展示panel
	    Ext.lt.template.addPanel2CenterMain(testWorkLoadShowPanel);
	    Ext.lt.template.showPanel2CenterMain('testWorkLoadPanal');
    });
}
//展示测试人员提交bug未处理
function showTestNoDeal (){
    //调用后台测试人员提交bug未处理
    Ext.lt.RCP.server("mainshowservermms", "findTestNoDeal", null,function(resp) {
	    //工作任务列表信息显示panel
	    var testNoDealShowPanel = testNoDealShow(resp);
	    //往主展示区域中添加展示panel
	    Ext.lt.template.addPanel2CenterMain(testNoDealShowPanel);
	    Ext.lt.template.showPanel2CenterMain('testNoDealPanal');
    });
}
