Ext.lt.console.component.install=new function(){
	this.datads = new Ext.data.Store({
		reader:new Ext.data.ArrayReader({}, [{name:"name"}, {name:"cv"}, {name:"clazz"}])
	});
	this.sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	this.model = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(), 
		this.sm, 
		{header:"ϵͳ����", width:3, sortable:false,menuDisabled:true, locked:false, dataIndex:"name"}, 
		{header:"��ǰ�汾", width:3, sortable:false,menuDisabled:true, locked:false, dataIndex:"cv"}]);
	this.panel = new Ext.grid.GridPanel({
				title:"ϵͳ����",
				layout:"fit",
				iconCls:"grid", 
				border:0, 
				store:this.datads, 
				cm:this.model, 
				viewConfig: {forceFit:true},   
				sm:this.sm, 
				frame:true,
				tbar:[{
					text:"����",
					iconCls:"cancel", 
					pressed:true, 
					handler:function () {
						Ext.lt.console.component.install.interval=true;
						var selectrow = Ext.lt.console.component.install.panel.getSelectionModel().selections.items;
						var arr=new Array();
						for(var i=0;i<selectrow.length;i++){
							arr.push(selectrow[i].data.clazz);
						}
						if(arr.length==0){alert("��ѡ������ģ��!");return;}
						Ext.lt.template.mask('ϵͳ�����У����Ժ�...','x-mask-loading');
						Ext.lt.console.component.install.loadInfo();
						Ext.lt.RCP.server("consoleinstallservice", "installConfig",  [arr] , function (resp) {
							if(resp=="true"){
								Ext.lt.console.component.install.loaddate();
							}else if(resp=="false"){
							}else{
								Ext.lt.console.component.install.showInfo(resp);
								Ext.lt.console.component.install.interval=false;
								Ext.lt.template.unmask();
							}
						},function(){
							Ext.Msg.alert('��ʾ', '�������!');
							Ext.lt.template.unmask();
							Ext.lt.console.component.install.interval=false;
						});
				}, scope:this}
				,'-',{text:"˵��",
					iconCls:"cancel", 
					pressed:true, 
					handler:function () {
						Ext.Msg.alert('��ʾ', '����������Ȩ������ʱ������ݿ��û���������<font color="red">ϵͳȨ��</font>��</br>create any table</br>create any sequence</br>create any view');
					}
				}]
			});
	this.loaddate=function(){
		Ext.lt.RCP.server("consoleinstallservice", "load",  null , function (reps) {
				var loaddata = new Array();
				for (var i = 0; i < reps.length; i++) {
					loaddata.push([reps[i].name,reps[i].cv, reps[i].clazz]);
				}
				Ext.lt.console.component.install.datads.loadData(loaddata);
				Ext.lt.console.component.install.panel.doLayout();
			});
	}
	this.interval=true;
	this.loadInfo=function(){
			Ext.lt.RCP.server("consoleinstallservice", "readInfo",  null , function (resp) {
					if(resp.value){
						Ext.lt.console.component.install.showInfo(resp.value);
					}
					if(resp.end=="true"){
						alert("������ɣ�");
						Ext.lt.console.component.install.interval=false;
					}
			},function(){
				this.interval=false;
			});
			if(this.interval){
				window.setTimeout("Ext.lt.console.component.install.loadInfo()",10);
			}
			
	}
	this.showInfo=function(resp){
		Ext.lt.template.mask();
		if(Ext.getCmp("install_info")==null){
			new Ext.Window({
			   title: '������Ϣ',
			   id:"install_info",
			   html: "<div id='install_infodiv' sytle='width:700px,height:300px,overflow:scroll,filter:alpha(opacity=50);opacity:5;'></div>",
			   width:800,
			   height: 400,
			   closable:false,
			   autoScroll:true,
			   buttonAlign:"center",
			   buttons:[{text:"ȷ��", handler:function (button,win) {
				   Ext.lt.template.unmask();
				   Ext.lt.console.component.install.interval=false;
				   Ext.getCmp("install_info").close();
			}},{text:"���Ƶ�������", handler:function (button,win) {
					new Ext.lt.util.setText(document.getElementById("install_infodiv").innerText);
			}}]});
		}
		Ext.getCmp("install_info").show();
		if(resp instanceof Array){
			document.getElementById("install_infodiv").insertAdjacentText("beforeEnd", resp.join('').replace(/<br>/g,'\n'));
		}else{
			document.getElementById("install_infodiv").insertAdjacentText("beforeEnd", resp.replace(/<br>/g,'\n'));
		}
	}
	this.showInstall=function(){
		Ext.lt.console.component.install.loaddate();
		return Ext.lt.console.component.install.panel;
	};
}