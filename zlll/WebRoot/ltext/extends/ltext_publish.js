
// 自动集成模块初始化函数
function ltext_publish_init(){
    // 追加菜单
	var listnemu = Ext.lt.template.consoletemplate.items.get('listnemu');
	listnemu.insert(0,Ext.lt.publish.menu);
	listnemu.doLayout();
	Ext.lt.publish.menu.expand();
	Ext.lt.publish.showWeblogicPanel();

}



Ext.lt.publish = {
    // 菜单
    menu: new Ext.Panel({
        title:'自动部署',
        autoScroll:true,
        border:false,
        iconCls:'nav_publish',
        html:'<li class=menulist><a href="#" onclick="javascript:Ext.lt.publish.showWeblogicPanel();">自动集成</a></li><li class=menulist><a href="javascript:return false">任务列表</a></li>'
    }),
    
    showWeblogicPanel: function(){
        Ext.lt.template.consoletemplate.items.get('mainbody').add(this.weblogicList);
        this.weblogicList.show();
    },
    
    weblogicList: new Ext.grid.GridPanel({
        id: 'publistpanel',
        title:'服务器列表',
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
            {id:'name',header: '服务器名称', width: 150, sortable: true, dataIndex: 'name'},
            {id:'port', header: '端口号', width: 75, sortable: true, dataIndex: 'port'},
            {id:'taskname', header: '任务名称', width: 100, sortable: true, dataIndex: 'taskname'},
            {id:'programer', header: '开发人员', width: 75, sortable: true, dataIndex: 'programer'}
        ],
        autoExpandColumn: 'taskname',
        tbar: [ 
		    {text: '集成测试环境', handler : function(){var clickone =Ext.lt.publish.weblogicList.getSelectionModel().getSelected(); Ext.lt.publish.showPublishWindow(clickone) }, iconCls:'tbar_publish'}
		]
    }),
    
    showPublishWindow: function(data){
        if(data == null){
            alert('选择一个服务器');
            return;
        }
    
        if(data.get('svn_url') == ''){
            return;
        }
        
        Ext.Msg.prompt('地区标志', '请输入地区标志（如：fcas）:', function(btn, text){
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
	                    	Ext.Msg.alert('警告','系统错误'+rs.console);
                    	}
                    	catch(e){
	                    	Ext.Msg.alert('警告','系统错误'+response);
                    	}                    	
                    },
                    params: data.data
                });
            }
        });
    },
    
    publishWindow: new Ext.Window({
        id: 'publishWindow',
        title: '自动集成',
        hidden: true,
        layout:'fit',
        autoScroll: true,
        width:700,
        height:600,
        closeAction:'hide',
        html:'<pre id="serverconsole"></pre>',
        
        buttons: [{
                text: '关闭',
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
