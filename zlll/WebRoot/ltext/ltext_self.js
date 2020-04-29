// 定义Portal命名空间
if(Ext.lt.portal==null) Ext.lt.portal = {component:{}};
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.seft = {win:null, panel:null, IfmisDefSeft:function () {
		var arr = new Array();
		//				{boxLabel : '综合查询系统',name : 'rbvert',inputValue : 2,checked : true},
		//var item=Ext.getCmp("mainbody").get(0).items.items;
		var item=Ext.lt.template.displayconfig.main;
		for (var i = 0; i < item.size(); i++) {
			if(item[i].panel!=null){
				arr.push({boxLabel:item[i].panel.getname(), name:"rbvert",inputValue:i+"",checked : item[i].show});
			}
		}
		if(arr.length==0){
			return;
		}
		if (this.win == null) {
			this.win = new Ext.Window({id:'selfwin',
			title:"\u4e2a\u6027\u5316\u8bbe\u7f6e", width:400, higth:500, closable :false, items:[new Ext.form.CheckboxGroup({xtype:"combobox", id:"self.cbox", labelStyle:"text-align: center;", itemCls:"x-check-group-alt", layout:"fit", width:600, higth:100, columns:1, items:arr})],
			buttons:[{text:"完成", handler:function () {
					var arrs=Ext.getCmp("self.cbox").getValue();
					for(var i=0;i<arrs.size();i++){
						arrs[i]=arrs[i].inputValue;
					}
					
					var objs={page:location.pathname.replace(".page", ""),main:arrs};
					Ext.lt.RCP.server("pagemanagerserver", "saveSelfPage", objs, function (resp) {
						if(resp){
							for(var i=0;i<item.size();i++){
								if(item[i].panel!=null){
									item[i].show=false;
								}
							}
							for(var i=0;i<arrs.size();i++){
								item[parseInt(arrs[i])].show=true;
							}
							
							//////////////////////////
							var arr=new Array();
					        for(var i=0;i<item.length;i++){
					        	if(item[i].panel!=null)
					        	{
					        	arr.push(item[i]);
					        	}
					        }
					        ///cfg.main=arr;
					        //
					        //
					        //debugger;
					        var mainbody=Ext.lt.template.getMainPanel().items.items[0].items.items[0];
					        for(var i=0;i<mainbody.length;i++){
					        	mainbody[i].removeAll();
					        }
					       		 var j=0;
					        	for(var i=0;i<arr.length;i++,j++){
						        			//alert("i="+i);
							        		//alert("j="+j);
							        		//cfg.main[i].panel.columnWidth=.5;
							        		arr[i].panel.style={"padding":"10px 10px 10px 10px"};
							        		arr[i].panel.doLayout();
							        		arr[i].panel.collapsible=true;
							        		if(j>1){
							        				if(arr[i-2].panel.panelheight>300){
								        				j++;
								        			}
							        			//}
								        		
							        		}
							        		//Ext.lt.template.currenttemplate.get('centermain').get('mainbody');
							        		mainbody.add(arr[i].panel);
						        		if(!arr[i].show){
						        			arr[i].panel.hide();        		
						        		}else{
						        			arr[i].panel.show();
						        		}
						        }
							Ext.getCmp("selfwin").hide();
							Ext.lt.template.unmask();
						}else{
							alert("保存失败");
						}
					});
				}},{text:"取消", handler:function () {
							Ext.getCmp("selfwin").hide();
							Ext.lt.template.unmask();
				}}]
			});
		}
		this.win.show();
		Ext.lt.template.mask();
}};

