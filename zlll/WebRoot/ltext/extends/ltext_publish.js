
// �Զ�����ģ���ʼ������
function ltext_publish_init(){
    // ׷�Ӳ˵�
	var listnemu = Ext.lt.template.consoletemplate.items.get('listnemu');
	listnemu.insert(0,Ext.lt.publish.menu);
	listnemu.doLayout();
	Ext.lt.publish.menu.expand();
	Ext.lt.publish.showWeblogicPanel();

}



Ext.lt.publish = {
    // �˵�
    menu: new Ext.Panel({
        title:'�Զ�����',
        autoScroll:true,
        border:false,
        iconCls:'nav_publish',
        html:'<li class=menulist><a href="#" onclick="javascript:Ext.lt.publish.showWeblogicPanel();">�Զ�����</a></li><li class=menulist><a href="javascript:return false">�����б�</a></li>'
    }),
    
    showWeblogicPanel: function(){
        Ext.lt.template.consoletemplate.items.get('mainbody').add(this.weblogicList);
        this.weblogicList.show();
    },
    
    weblogicList: new Ext.grid.GridPanel({
        id: 'publistpanel',
        title:'�������б�',
        singleSelect:true,
        closable: true,
        store: new Ext.data.Store({
            autoLoad:true,
            url:'datas/publishweblogiclist.data', 
            reader: new Ext.data.JsonReader(
                {root: 'root'}, 
                ['name', 'port','taskname','appname','servername','programer','server','svn_url']
            )
        }),
        columns: [
            {id:'name',header: '����������', width: 150, sortable: true, dataIndex: 'name'},
            {id:'port', header: '�˿ں�', width: 75, sortable: true, dataIndex: 'port'},
            {id:'taskname', header: '��������', width: 100, sortable: true, dataIndex: 'taskname'},
            {id:'programer', header: '������Ա', width: 75, sortable: true, dataIndex: 'programer'}
        ],
        autoExpandColumn: 'taskname',
        tbar: [ 
		    {text: '���ɲ��Ի���', handler : function(){var clickone =Ext.lt.publish.weblogicList.getSelectionModel().getSelected(); Ext.lt.publish.showPublishWindow(clickone) }, iconCls:'tbar_publish'}
		]
    }),
    
    showPublishWindow: function(data){
        if(data == null){
            alert('ѡ��һ��������');
            return;
        }
    
        if(data.get('svn_url') == ''){
            return;
        }
        
        Ext.Msg.prompt('������־', '�����������־���磺fcas��:', function(btn, text){
            if (btn == 'ok'){
                data.data['prov'] = text;
                Ext.Ajax.request({
                    url: Ext.lt.encodeUrl('datas/publishweblogiclist.data!compile'),
                    success: function(response, options){
                        var rs = Ext.util.JSON.decode(response.responseText);
                        Ext.lt.publish.publishWindow.sid=rs.sid;
                        Ext.lt.publish.publishWindow.show();
                    },
                    failure: function(response, options){
                    	try{
                    		var rs = Ext.util.JSON.decode(response.responseText);
	                    	Ext.Msg.alert('����','ϵͳ����'+rs.console);
                    	}
                    	catch(e){
	                    	Ext.Msg.alert('����','ϵͳ����'+response);
                    	}                    	
                    },
                    params: data.data
                });
            }
        });
    },
    
    publishWindow: new Ext.Window({
        id: 'publishWindow',
        title: '�Զ�����',
        hidden: true,
        layout:'fit',
        autoScroll: true,
        width:700,
        height:600,
        closeAction:'hide',
        html:'<pre id="serverconsole"></pre>',
        
        buttons: [{
                text: '�ر�',
                handler: function(){
                    Ext.lt.publish.publishWindow.hide();
                }
        }],
        
        listeners:{
            'show':function(){
                Ext.getBody().mask();
                Ext.lt.publish.publishWindow.update('<pre id="serverconsole"></pre>');
                Ext.lt.publish.publishWindow.consoletask = new Ext.util.DelayedTask(function(){
                        Ext.Ajax.request({
                           url: Ext.lt.encodeUrl('datas/console.data'),
                           success: function(response, options){
                           				var rs = Ext.util.JSON.decode(response.responseText);
                           				if(!rs.finish){
                           				    Ext.lt.publish.publishWindow.consolecache += rs.console;
                           				    var p = Ext.lt.publish.publishWindow.consolecache.lastIndexOf('\n');
                           				    if(p >0){
                           				 		var n = document.createTextNode(Ext.lt.publish.publishWindow.consolecache.substring(0,p+1));
												serverconsole.appendChild(n);
  												Ext.lt.publish.publishWindow.consolecache = Ext.lt.publish.publishWindow.consolecache.substring(p+1)
                           					}
                           				    
                           					Ext.lt.publish.publishWindow.consoletask.delay(200);
                           				}
                           				else{
                           					Ext.lt.publish.publishWindow.consoletask.cancel();
                           				};
                           			},
                           params: {sid:Ext.lt.publish.publishWindow.sid}
                        });
                });

                Ext.lt.publish.publishWindow.consoletask.delay(1);
            },
            'hide':function(){Ext.lt.publish.publishWindow.consoletask.cancel();Ext.getBody().unmask();}
        }
        
    })
};
