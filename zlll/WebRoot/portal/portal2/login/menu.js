
var yszxxt1_time = 1;
function yszxxt1(sign, param) {
	sTitle = "\u7528\u6237\u767b\u5f55";
	AppCaller.callApp(sign, "App");
    //ѭ��10���ӣ��ҵ��û���¼�����ö����˳���10����û�ҵ�ֱ�ӷ���
	for (var i = 0; i < 100; i++) {
		if (AppCaller.windowToTop(sTitle)) {
			break;
		}
		AppCaller.wait(100);//��ͣ300����
		if (i == 99) {
			return;
		}
	}
	AppCaller.windowToTop(sTitle);//�����ö�
	AppCaller.wait(yszxxt1_time);//��ͣ300����
	AppCaller.simMouseClick(410, 130, 1, sTitle);//������ ��λ��ϵ������
	AppCaller.wait(yszxxt1_time);
	AppCaller.simMouseClick(360, 147, 1, sTitle);//������ ѡ�����ϵ
	AppCaller.wait(yszxxt1_time);
	AppCaller.simMouseClick(336, 219, 1, sTitle);//������ ѡ�����������
	AppCaller.wait(yszxxt1_time);
	AppCaller.simKbInput("1");//��������1
	AppCaller.windowToTop(sTitle);
	AppCaller.wait(yszxxt1_time);
	AppCaller.simMouseClick(310, 310, 1, sTitle);//������ ��¼��ť
  	//alert(1111);
}
var yszxxt2_time = 1;
function yszxxt2(sign, param) {
	sTitle = "\u7528\u6237\u767b\u5f55";
	AppCaller.callApp(sign, "App");
    //AppCaller.wait(5000);//��ͣ300����
	for (var i = 0; i < 100; i++) {
		if (AppCaller.windowToTop(sTitle)) {
			break;
		}
		AppCaller.wait(100);//��ͣ300����
		if (i == 99) {
			return;
		}
	}
	AppCaller.windowToTop(sTitle);//�����ö�
	AppCaller.wait(yszxxt2_time);//��ͣ300����
	AppCaller.simMouseClick(410, 130, 1, sTitle);//������ ��λ��ϵ������
	AppCaller.wait(yszxxt2_time);
	AppCaller.simMouseClick(360, 160, 1, sTitle);//������ ѡ����ϵ
	AppCaller.wait(yszxxt2_time);
	AppCaller.simMouseClick(350, 220, 1, sTitle);//������ ѡ�����������
	AppCaller.wait(yszxxt2_time);
	AppCaller.simKbInput("770104");//��������
	AppCaller.wait(yszxxt2_time);
	AppCaller.simMouseClick(310, 310, 1, sTitle);//������ ��¼
}
var jzzfdw_time = 1;
function jzzfdw(sign, param) {
	sTitle1 = "\u6570\u636e\u5e93\u8fde\u63a5";
	sTitle2 = "\u5e74\u5ea6\u9009\u62e9";
	sTitle3 = "\u7528\u6237\u767b\u5f55";
	AppCaller.callApp(sign, "App");
    //ѭ��10���ӣ��ҵ����ݿ����Ӵ����ö����˳���10����û�ҵ�ֱ�ӷ���
	for (var i = 0; i < 100; i++) {
		if (AppCaller.windowToTop(sTitle1)) {
			break;
		}
		AppCaller.wait(100);//��ͣ300����
		if (i == 99) {
			return;
		}
	}
	AppCaller.windowToTop(sTitle1);//�����ö�
	AppCaller.wait(jzzfdw_time);//��ͣ300����
	AppCaller.simMouseClick(160, 217, 1, sTitle1);//������ ȷ��
	AppCaller.wait(jzzfdw_time);//��ͣ300����
	//ѭ��10���ӣ��ҵ�ѡ����ȴ����ö����˳���10����û�ҵ�ֱ�ӷ���
	for (var i = 0; i < 100; i++) {
		if (AppCaller.windowToTop(sTitle2)) {
			break;
		}
		AppCaller.wait(100);//��ͣ300����
		if (i == 99) {
			return;
		}
	}
	AppCaller.windowToTop(sTitle2);//�����ö�
	AppCaller.wait(jzzfdw_time);//��ͣ300����
	AppCaller.simMouseClick(250, 60, 1, sTitle2);//������ �������������
	AppCaller.wait(jzzfdw_time);//��ͣ300����
	AppCaller.simMouseClick(180, 113, 1, sTitle2);//������ ѡ��2009��� ���ֳ�5��180,125��������4��180,113��
	AppCaller.wait(jzzfdw_time);//��ͣ300����
	AppCaller.simMouseClick(175, 118, 1, sTitle2);//������ ȷ��
	AppCaller.wait(jzzfdw_time);//��ͣ300����
	
	//ѭ��10���ӣ��ҵ��û���¼�����ö����˳���10����û�ҵ�ֱ�ӷ���
	for (var i = 0; i < 100; i++) {
		if (AppCaller.windowToTop(sTitle3)) {
			break;
		}
		AppCaller.wait(100);//��ͣ300����
		if (i == 99) {
			return;
		}
	}
	AppCaller.windowToTop(sTitle3);//�����ö�
	AppCaller.wait(jzzfdw_time);//��ͣ300����
	AppCaller.simMouseClick(217, 60, 1, sTitle3);//������ ѡ���û����������
	AppCaller.wait(jzzfdw_time);
	AppCaller.simKbInput("001");//�����û�����
	AppCaller.wait(jzzfdw_time);
	AppCaller.simMouseClick(218, 93, 1, sTitle3);//������ ѡ����֤���������
	AppCaller.wait(jzzfdw_time);
	AppCaller.simKbInput("1");//��������
	AppCaller.simMouseClick(228, 187, 1, sTitle3);//������ ȷ��
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
	AppCaller.windowToTop(sTitle);//�����ö�
	AppCaller.wait(1000);//��ͣ300����
	//AppCaller.simMouseClick(160, 141, 1, sTitle);//������ �û��������
	AppCaller.simDelete(sTitle);
	AppCaller.wait(300);
	AppCaller.simKbInput("888777999");//�����û�����
	AppCaller.wait(300);
	AppCaller.simMouseClick(160, 170, 1, sTitle);//������ ���������
	AppCaller.wait(300);
	AppCaller.simKbInput("1");//��������
	AppCaller.wait(300);
	AppCaller.simMouseClick(342, 193, 1, sTitle);//������ ���������
	AppCaller.wait(300);
	AppCaller.simMouseClick(222, 232, 1, sTitle);//������ ѡ��2009��
	AppCaller.wait(300);
	AppCaller.simMouseClick(266, 273, 1, sTitle);//������ ��¼
}
AppCaller.initIE();

