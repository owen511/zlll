//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.component.menu = new function () {
	this.IfmisDefaultMenu = function (menuinfo,server) {

			var setHtml = "<div id=\"window_top\" ><div id=\"top\" ><div id=\"menu\"><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr>";
			if (menuinfo.isshowmenus) {
				setHtml += "<td width=\"20px\" style=\"color:#FFFFFF;\"><img src=\"/images/done_btn/pre.gif\" style=\"cursor:pointer;\" title=\"\u5411\u524d\" onclick=\"showPre()\"/></td>";
			}
			setHtml += "<td> <div id = \"idd\" style=\"overflow:hidden; width:expression(document.body.offsetWidth-40);\"> <ul id=\"m_ul\"><li>\u2506</li> ";
			
			setHtml += menuinfo.menuinfo_tem;
			setHtml += "</ul><div id='panelDiv'>";
			setHtml += "</div>";
			setHtml += "</div></td>";
			if (menuinfo.isshowmenus) {
				setHtml += "<td width=\"20px\"><img src=\"/images/done_btn/next.gif\" style=\"cursor:pointer;\" title=\"\u5411\u540e\" onclick=\"showNext()\"/></td>";
			}
			setHtml += "</tr></table></div></div></div>";
		var retmenupanel = new Ext.Panel({id:"systemmenu",border:0,html:setHtml});
		return retmenupanel;
	};
	this.IfmisLeftMenu = function (config,server) {
	if(config.post != null && config.post != ""){
		if (Ext.getCmp("post_tem") == null) {
			new Ext.Window({title:"֪ͨ", width:700, closable :false,height:400,autoScroll:true, layout:"column", plain:true, id:"post_tem", html: "<div style='overflow:scroll;filter:alpha(opacity=90);opacity:5;'>"+config.post+"</div>", buttons:[{text:"ȷ��",width:15, handler:function () {
									Ext.getCmp("post_tem").hide();
									//Ext.lt.template.unmask();
									}}]});
		}
			
			Ext.getCmp("post_tem").show();
			//Ext.lt.template.mask();
			//Ext.getCmp("memorandum_add").lable.hide();
			//Ext.getCmp("memorandum_add").setValue(config.post);
	
	}
		    var setHtml = "<ul class=\"quickmenu_list\" style=\"background:url(../portal/images/quickmenu.gif) no-repeat right bottom;\"> ";
			config.menuinfo_tem = config.menuinfo_tem.replaceAll("��", " ");
			setHtml += config.menuinfo_tem;
			setHtml += "</ul>";
			var res=new Ext.Panel({id:"lefttreemenu",title:"��ݷ�ʽ",padding:10,weight:200,height:310,autoScroll:true, html:setHtml});
			res.on('afterlayout',function(panel,layout){
				var left=Ext.getCmp('leftbody');
				if((left.getHeight()-245)<50){
		   			panel.setHeight(50);
		   		}else{
		   			panel.setHeight(left.getHeight()-245);
		   		}
			});
		 return res;
	};
};
//begin �����������½ ���޺� 2012.08.29
/*******
 * ʱ��ĵȴ�
 * @type Number
 */
var k = 0;
var dd = 100;
var total = 6000;
var cshxxt_time=50;
var sTitle;
var bucode;
var bupassword;
//���ʵ�ַ��weblogic�û�������
var url;
var wlgCode;
var wlgPwd
/****
 * �����������¼
 * @param {} type��֧�������ʡ�����
 */
function portalhljcs(sign,bucodeT,bupasswordT){
    bucode = bucodeT;
    bupassword = bupasswordT;
	if(sign=='hljzhifu'){	
		AppCaller.callApp(sign,'hljzhifu');		
		whilezhifu();
	}
	if(sign=='hljzhangwu'){
		AppCaller.callApp(sign,'hljzhangwu');
		whilezhangwu(bucode,bupassword);
	}
	
}
//֧������
function whilezhifu(){
	sTitle = "�ƻ�����";
	k += dd;
	if(!AppCaller.setWinVisibl(sTitle,false)){
		if(k<total){
			window.setTimeout("whilezhifu();",dd);
		}
	}else{
		portalhljzhifu()
	}

}
//�������
function whilezhangwu(bucode,bupassword){
	sTitle = "�������";
	k += dd;

	if(!AppCaller.setWinVisibl(sTitle,false)){
		if(k<total){
			window.setTimeout("whilezhangwu();",dd);
		}
	}else{
		portalhljzhangwu()
	}

}

/******
 * �����������¼֧������
 */
function portalhljzhifu(){
	AppCaller.wait(3000);//��ͣ300����
	sTitle = "�ƻ�����";
	AppCaller.windowToTop(sTitle);
  	//AppCaller.wait(1500);//��ͣ300����
  	AppCaller.setWinVisibl(sTitle,true);
 	AppCaller.moveWindow(sTitle,2300,2300);
	AppCaller.simKbInput(bucode);//�����û�����
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\r');//�л�������
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput(bupassword);//��������
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle)
	AppCaller.simKbInput('\r');//�л������
	AppCaller.wait(cshxxt_time);
	//for(var i=0;cshxxtininyear<cshxxtendyear;cshxxtininyear++){
		//AppCaller.sendKeyMsg(40);
		//AppCaller.wait(cshxxt_time);
	//}
	AppCaller.windowToTop(sTitle)
	AppCaller.simKbInput('\r');//�л�����¼
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle)
	AppCaller.simKbInput('\r');//�س�
}
/***
 * �����������¼����
 */
function portalhljzhangwu(){
  	sTitle = "�������";
	AppCaller.wait(1000);
	//���ô����ʼ��״̬
	AppCaller.windowToTop(sTitle);
	AppCaller.setWinVisibl(sTitle,false);
	AppCaller.moveWindow(sTitle,2300,2300);
	////�л����û�����
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\t');//�л�������
	
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\t');//�л�������

	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\t');//�л�������

	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\t');//�л�������
	

  	//loadAppcaller();
  	AppCaller.wait(cshxxt_time);//��ͣ300����
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput(bucode);//�����û�����
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\t');//�л�������
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput(bupassword);//��������
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\t');//�л����س�
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\r');//�س�	
}

  //begin ����ϵͳ�����¼  ���޺� 2012.09.17
  function gz(urlT,bucodeT,bupasswordT,wlgCodeT,wlgPwdT){
	  url = urlT;
	  bucode = bucodeT;
	  bupassword = bupasswordT;
	  wlgCode = wlgCodeT;
	  wlgPwd = wlgPwdT;
	  window.open(url);
	  window.setTimeout(function(){ portalhljgz();},5000);	
  }
  /*******
   * ����������ϵͳ
   */
  function portalhljgz(){	
    sTitle = "�û���¼";
    var cshxxt_time = 300;
  	AppCaller.wait(cshxxt_time);
   	AppCaller.simKbInput(wlgCode);//�����û�����
  	AppCaller.wait(cshxxt_time);
  	AppCaller.simKbInput('\t');//�л�������
  	AppCaller.wait(cshxxt_time);
   	AppCaller.simKbInput(wlgPwd);//��������
   	AppCaller.wait(cshxxt_time);
  	AppCaller.simKbInput('\r');//�л�������
  	AppCaller.wait(1000);
  
  	AppCaller.simDelete(sTitle);
  	AppCaller.wait(cshxxt_time);
  	AppCaller.simKbInput(bucode);
  	AppCaller.simKbInput('\t');
  	AppCaller.wait(cshxxt_time);
  	AppCaller.simKbInput(bupassword);
  	AppCaller.simKbInput('\t');
    AppCaller.wait(cshxxt_time);
  	AppCaller.simKbInput('\t');
  	AppCaller.wait(cshxxt_time);
  	AppCaller.simKbInput('\r');
    	
  }
  //end ����ϵͳ�����¼  ���޺� 2012.09.17
//end �����������½ ���޺� 2012.08.29
