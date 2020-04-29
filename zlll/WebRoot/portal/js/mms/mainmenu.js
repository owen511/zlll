// 检查命名空间
if (Ext.lt.mms == null) {
	Ext.lt.mms = {};
}
Ext.lt.mms.mainmenu = function(service, config) {
	Ext.lt.mms.mainmenu.service = service;
	var mainmenuPanel = new Ext.form.FormPanel({
				id : 'mainmenu',
				html : '<table width="100%"><tr><td>'
				+ '<div style="height:30px;"><a href="#" onclick="showBasicSubMenu();">日常bug统计</a>&nbsp;&nbsp;&nbsp;'
				+ '<a href="#" onclick="showImpSubMenu();">重大问题跟踪</a>&nbsp;&nbsp;&nbsp;'
				+ '<a href="#" onclick="showTasks();">工作任务安排</a>&nbsp;&nbsp;&nbsp;'
				+ '<a href="#" onclick="showTest();">测试组报表统计</a></div>'
				+ '</td><td align="right">'
				+ '<span>用户：'+config.userName+'</span>&nbsp;<span>系统日期：'+config.systemDate+'</span>&nbsp;'
				+ '<a href="'+_ROOT_PATH_+'">退出</a>'
				+ '</td></tr></table>'
			});

	return mainmenuPanel;
}
//展示重大问题跟踪菜单
function showImpSubMenu (){
    //获取子菜单区域panel对象
    document.getElementById("subMenuDiv").innerHTML = '<div><a href="#" onclick="showImpBugs();">重大问题跟踪(本人)</a></div></br>'
                                                    + '<div><a href="#" onclick="showImpBugsAll();">重大问题跟踪(全部)</a></div>';
    //调用后台重大问题信息
    Ext.lt.RCP.server("mainshowservermms", "findImpBugs", null,function(resp) {
	    //重大问题信息显示panel
	    var impBugsShowPanel = impBugsShow(resp);
	    //往主展示区域中添加展示panel
	    Ext.lt.template.addPanel2CenterMain(impBugsShowPanel);
	    Ext.lt.template.showPanel2CenterMain('impBugsPanel');
    });
}
//展示测试组报表数据
function showTest (){
    //设置子菜单数据
    document.getElementById("subMenuDiv").innerHTML = '<div><a href="#" onclick="showTest();">6月份各系统bug统计</a></div></br>'
                                                    + '<div><a href="#" onclick="showTestWorkLoad();">6月份测试人员工作量统计</a></div></br>'
                                                    + '<div><a href="#" onclick="showTestNoDeal();">各系统未解决bug</a></div>';
    //调用后台工作任务列表信息
    Ext.lt.RCP.server("mainshowservermms", "findProductBugs", null,function(resp) {
	    //工作任务列表信息显示panel
	    var productBugsShowPanel = productBugsShow(resp);
	    //往主展示区域中添加展示panel
	    Ext.lt.template.addPanel2CenterMain(productBugsShowPanel);
	    Ext.lt.template.showPanel2CenterMain('productBugsPanal');
    });
}

//展示基本bug统计信息菜单
function showBasicSubMenu(){
    window.location = _ROOT_PATH_ + '/show/defaultmms.page';
}

