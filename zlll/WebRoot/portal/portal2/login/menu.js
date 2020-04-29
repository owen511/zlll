
var yszxxt1_time = 1;
function yszxxt1(sign, param) {
	sTitle = "\u7528\u6237\u767b\u5f55";
	AppCaller.callApp(sign, "App");
    //循环10秒钟，找到用户登录窗口置顶后退出，10秒钟没找到直接返回
	for (var i = 0; i < 100; i++) {
		if (AppCaller.windowToTop(sTitle)) {
			break;
		}
		AppCaller.wait(100);//暂停300毫秒
		if (i == 99) {
			return;
		}
	}
	AppCaller.windowToTop(sTitle);//窗口置顶
	AppCaller.wait(yszxxt1_time);//暂停300毫秒
	AppCaller.simMouseClick(410, 130, 1, sTitle);//左键点击 单位体系下拉框
	AppCaller.wait(yszxxt1_time);
	AppCaller.simMouseClick(360, 147, 1, sTitle);//左键点击 选择空体系
	AppCaller.wait(yszxxt1_time);
	AppCaller.simMouseClick(336, 219, 1, sTitle);//左键点击 选择密码输入框
	AppCaller.wait(yszxxt1_time);
	AppCaller.simKbInput("1");//输入密码1
	AppCaller.windowToTop(sTitle);
	AppCaller.wait(yszxxt1_time);
	AppCaller.simMouseClick(310, 310, 1, sTitle);//左键点击 登录按钮
  	//alert(1111);
}
var yszxxt2_time = 1;
function yszxxt2(sign, param) {
	sTitle = "\u7528\u6237\u767b\u5f55";
	AppCaller.callApp(sign, "App");
    //AppCaller.wait(5000);//暂停300毫秒
	for (var i = 0; i < 100; i++) {
		if (AppCaller.windowToTop(sTitle)) {
			break;
		}
		AppCaller.wait(100);//暂停300毫秒
		if (i == 99) {
			return;
		}
	}
	AppCaller.windowToTop(sTitle);//窗口置顶
	AppCaller.wait(yszxxt2_time);//暂停300毫秒
	AppCaller.simMouseClick(410, 130, 1, sTitle);//左键点击 单位体系下拉框
	AppCaller.wait(yszxxt2_time);
	AppCaller.simMouseClick(360, 160, 1, sTitle);//左键点击 选择体系
	AppCaller.wait(yszxxt2_time);
	AppCaller.simMouseClick(350, 220, 1, sTitle);//左键点击 选择到密码输入框
	AppCaller.wait(yszxxt2_time);
	AppCaller.simKbInput("770104");//输入密码
	AppCaller.wait(yszxxt2_time);
	AppCaller.simMouseClick(310, 310, 1, sTitle);//左键点击 登录
}
var jzzfdw_time = 1;
function jzzfdw(sign, param) {
	sTitle1 = "\u6570\u636e\u5e93\u8fde\u63a5";
	sTitle2 = "\u5e74\u5ea6\u9009\u62e9";
	sTitle3 = "\u7528\u6237\u767b\u5f55";
	AppCaller.callApp(sign, "App");
    //循环10秒钟，找到数据库连接窗口置顶后退出，10秒钟没找到直接返回
	for (var i = 0; i < 100; i++) {
		if (AppCaller.windowToTop(sTitle1)) {
			break;
		}
		AppCaller.wait(100);//暂停300毫秒
		if (i == 99) {
			return;
		}
	}
	AppCaller.windowToTop(sTitle1);//窗口置顶
	AppCaller.wait(jzzfdw_time);//暂停300毫秒
	AppCaller.simMouseClick(160, 217, 1, sTitle1);//左键点击 确定
	AppCaller.wait(jzzfdw_time);//暂停300毫秒
	//循环10秒钟，找到选择年度窗口置顶后退出，10秒钟没找到直接返回
	for (var i = 0; i < 100; i++) {
		if (AppCaller.windowToTop(sTitle2)) {
			break;
		}
		AppCaller.wait(100);//暂停300毫秒
		if (i == 99) {
			return;
		}
	}
	AppCaller.windowToTop(sTitle2);//窗口置顶
	AppCaller.wait(jzzfdw_time);//暂停300毫秒
	AppCaller.simMouseClick(250, 60, 1, sTitle2);//左键点击 弹出年度下拉框
	AppCaller.wait(jzzfdw_time);//暂停300毫秒
	AppCaller.simMouseClick(180, 113, 1, sTitle2);//左键点击 选择2009年度 （现场5个180,125北京测试4个180,113）
	AppCaller.wait(jzzfdw_time);//暂停300毫秒
	AppCaller.simMouseClick(175, 118, 1, sTitle2);//左键点击 确定
	AppCaller.wait(jzzfdw_time);//暂停300毫秒
	
	//循环10秒钟，找到用户登录窗口置顶后退出，10秒钟没找到直接返回
	for (var i = 0; i < 100; i++) {
		if (AppCaller.windowToTop(sTitle3)) {
			break;
		}
		AppCaller.wait(100);//暂停300毫秒
		if (i == 99) {
			return;
		}
	}
	AppCaller.windowToTop(sTitle3);//窗口置顶
	AppCaller.wait(jzzfdw_time);//暂停300毫秒
	AppCaller.simMouseClick(217, 60, 1, sTitle3);//左键点击 选择用户编码输入框
	AppCaller.wait(jzzfdw_time);
	AppCaller.simKbInput("001");//输入用户编码
	AppCaller.wait(jzzfdw_time);
	AppCaller.simMouseClick(218, 93, 1, sTitle3);//左键点击 选择验证密码输入框
	AppCaller.wait(jzzfdw_time);
	AppCaller.simKbInput("1");//输入密码
	AppCaller.simMouseClick(228, 187, 1, sTitle3);//左键点击 确定
}
function cshxxt(sign, param) {
	window.open("http://192.168.3.38:7009/systemframe/login?sysapp=800&jnlp=pay");
    //window.open("http://10.88.2.15:9009/systemframe/login?sysapp=001&jnlp=platform");
	k = 0;
	whileIsTitle();
}
var k = 0;
function whileIsTitle() {
	k++;
	sTitle = "\u7528\u6237\u767b\u5f55";
	if (!AppCaller.windowToTop(sTitle)) {
		if (k != 60) {
			window.setTimeout("whileIsTitle();", 1000);
		}
	} else {
		cshxxt2();
	}
}
function cshxxt2() {
	sTitle = "\u7528\u6237\u767b\u5f55";
	AppCaller.windowToTop(sTitle);//窗口置顶
	AppCaller.wait(1000);//暂停300毫秒
	//AppCaller.simMouseClick(160, 141, 1, sTitle);//左键点击 用户名输入框
	AppCaller.simDelete(sTitle);
	AppCaller.wait(300);
	AppCaller.simKbInput("888777999");//输入用户编码
	AppCaller.wait(300);
	AppCaller.simMouseClick(160, 170, 1, sTitle);//左键点击 密码输入框
	AppCaller.wait(300);
	AppCaller.simKbInput("1");//输入密码
	AppCaller.wait(300);
	AppCaller.simMouseClick(342, 193, 1, sTitle);//左键点击 年度下拉框
	AppCaller.wait(300);
	AppCaller.simMouseClick(222, 232, 1, sTitle);//左键点击 选择2009年
	AppCaller.wait(300);
	AppCaller.simMouseClick(266, 273, 1, sTitle);//左键点击 登录
}
AppCaller.initIE();

