
// �ۺϲ�ѯ�ű����ʼ������
function ltext_fcas_init(){

	// ���������ռ�
	Ext.lt.fcas = {
		panels:[],
		
		// ������������
		getPanels: function(panelname){
			if(panelname == null) alert("Ext.lt.fcas.getPanels() û��ָ����ȡ��������");
			panelname = panelname.toLowerCase();
			if(Ext.lt.fcas.panels[panelname] == null){
				// �����������
				eval("Ext.lt.fcas.create"+panelname.substring(0,1).toUpperCase()+panelname.substr(1)+"()");
			}
			return Ext.lt.fcas.panels[panelname];
		},
		
		// ��ʾ�ۺϲ�ѯ�����б�
		showTaskPanel:function(){
		    Ext.lt.template.showtasklist({
		        id:'fcastaskpanel',
		        title:'�ۺϲ�ѯ�����б�',
		        url:Ext.lt.encodeUrl('datas/fcastasklist.data')
		    }).show();
		},
		
		
		// ��ʾ�ۺϲ�ѯϵͳ���ý���
		showSystemconfigPanel:function(){
		    Ext.lt.template.showSystemconfig({
		        id:'fcasSystemconfig',
		        title:'�ۺϲ�ѯϵͳ����',
		        programerurl: Ext.lt.encodeUrl('datas/fcasprogramerlist.data'),
		        testerurl: Ext.lt.encodeUrl('datas/fcastesterlist.data'),
		        weblogiclisturl: Ext.lt.encodeUrl('datas/weblogiclist.data')
		    }).show();
		},
	    
		
		fcas_menu: new Ext.Panel({
            title:'�ۺϲ�ѯ',
            autoScroll:true,
            border:false,
            iconCls:'nav_fcas',
            html:'<li class=menulist><a href="#" onclick="javascript:Ext.lt.fcas.showTaskPanel();">�����б�</a></li><li class=menulist><a href="javascript:return false">�����汾</a></li><li class=menulist><a  href="#" onclick="javascript:Ext.lt.fcas.showSystemconfigPanel();">ϵͳ����</a></li>'
        })
        
	};
	
	
	
	var listnemu = Ext.lt.template.consoletemplate.items.get('listnemu');
	listnemu.insert(0,Ext.lt.fcas.fcas_menu);
	listnemu.doLayout();
	Ext.lt.fcas.fcas_menu.expand();
	
}

function showfcas(){
	alert("called showfcas")
}



