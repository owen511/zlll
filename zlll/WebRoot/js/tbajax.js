/*  
 *��װAJAX
 *author:constantine
 */
function Tbajax(url,jsonstr) {
	//�������˷���ֵ
	this.respText=null;
	//ajax���͵�url
	this.url = url;
	//����������͵�����:���ж������Ҫ���ݣ����Է�װ��һ�������У�תΪ�ַ�����ȡ������
	this.jsonstr = this.treatjsonstr(jsonstr);
	//����ajax����
	this.request = this.createrequest();
	//���͵���������
	this.doajax();
}
//����ajax����
Tbajax.prototype.createrequest = function () {
	var request=false;
	try {
		request = new XMLHttpRequest();
	}
	catch (trymicrosoft) {
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (othermicrosoft) {
			try {
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (failed) {
				request = false;
			}
		}
	}
	if (!request) {
		alert("Error initializing XMLHttpRequest!");
	}
	return request;
};
//��������������͵�����
Tbajax.prototype.treatjsonstr = function (jsonstr) {
	return this.customescape(jsonstr);
};
//�滻�����ַ�
Tbajax.prototype.customescape = function (prastr) {
	prastr = prastr.replace(/%/g, "%25");
	prastr = prastr.replace(/\+/g, "%2B");
	prastr = prastr.replace(/\//g, "%2F");
	prastr = prastr.replace(/\?/g, "%3F");
	prastr = prastr.replace(/#/g, "%23");
	prastr = prastr.replace(/&/g, "%26");
	prastr = prastr.replace(/=/g, "%3D");
	prastr = prastr.replace(/ /g, "%20");
	return prastr;
};
//ajax����
Tbajax.prototype.doajax=function (){
	this.request.open("POST", this.url, false);
	this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
	this.request.send("jsonstr=" + this.jsonstr);
	this.ajaxback();
};
//ajax����ֵ��ֵ
Tbajax.prototype.ajaxback=function () {
	if (this.request.readyState == 4) {
		if (this.request.status == 200) {
			this.respText = this.request.responseText;
		}
	}
};
