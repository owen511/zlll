if (Ext.lt.message == null) {
	Ext.lt.message = {};
}

var helpPara = new Object();//查询参数

// ooo的结构为{system:,keyCode:,keyword:}
//system:系统
//keyCode:每个系统中每个章节号
//keyword:关键词
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
    		return "<a href='./portal/knowledgeBase/"+helpPara.system+".html#"+anchor+"' target='_blank'>点击这里获取更多帮助</a>";
    	}
   
}