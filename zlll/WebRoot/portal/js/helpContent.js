if (Ext.lt.message == null) {
	Ext.lt.message = {};
}

var helpPara = new Object();//��ѯ����

// ooo�ĽṹΪ{system:,keyCode:,keyword:}
//system:ϵͳ
//keyCode:ÿ��ϵͳ��ÿ���½ں�
//keyword:�ؼ���
Ext.lt.message.assistfn=function(msg,obj){		
		if(obj==null){    		
	 		return "";
    	}else{
    		helpPara.system=obj.system;
			helpPara.keycode=obj.keycode;
			helpPara.keyword=obj.keyword;
			//debugger;
			var anchor = Ext.lt.RCP.asynserver('helpInfoCommonService', 'getHelpInfo',helpPara);
			//debugger;
    		return "<a href='./portal/knowledgeBase/"+helpPara.system+".html#"+anchor+"' target='_blank'>��������ȡ�������</a>";
    	}
   
}