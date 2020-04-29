//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.component.beizhu = new function () {
	this.server = "";
	this.adddate = "";
	this.bzDS = new Ext.data.Store({reader:new Ext.data.ArrayReader({}, [{name:"no"}, {name:"task"}])});
	this.bzModel = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(), 
		{header:"\u5185\u5bb9",width:100, sortable:true, locked:false, dataIndex:"task"}
		]);
	this.bzData = new Ext.grid.GridPanel({layout:"fit",autoWidth:true,height:263 ,iconCls:"grid", border:0, store:this.bzDS, cm:this.bzModel, frame:true});
	this.bzDatafn = function (datas) {
		var loaddata = new Array();
		
		for (var i = 0; i < datas.length; i++) {
			loaddata[i] = new Array(datas[i].no, datas[i].task);
		}
		this.bzDS.loadData(loaddata);
		/**/
	};
	this.getNote = function (menuinfo,server) {
		Ext.lt.portal.component.beizhu.server=server;
		var panelheight = (document.body.clientHeight-50)/2;
		//var retmenupanel = new Ext.Panel({title:menuinfo.name,height:330, items:Ext.lt.portal.component.beizhu.bzData,tbar:[{text:"\u6dfb\u52a0", iconCls:"select", pressed:true, handler:function () {
		var retmenupanel = new Ext.Panel({title:menuinfo.name,height:panelheight, items:Ext.lt.portal.component.beizhu.bzData,tbar:[{text:"\u6dfb\u52a0", iconCls:"select", pressed:true, handler:function () {
				//alert(Ext.lt.portal.component.beizhu.adddate);
				//��ӱ���
				Ext.lt.portal.component.beizhu.addmemorandum(Ext.lt.portal.component.beizhu.adddate);
				
				/*
				Ext.Msg.buttonText.ok="ȷ��";
      			Ext.Msg.buttonText.cancel="ȡ��";
      			Ext.Msg.buttonText.yes="ȷ��";
      			Ext.Msg.buttonText.no="ȡ��";
				
				Ext.Msg.prompt("������","����¼:",function(button,text_tem){
				debugger;
				alert(button);
				if(button=='ȷ��'){
			//	debugger;
					alert("����¼:"+text_tem);
					var add_param = new Object();
					add_param.task = text_tem;
					alert(add_param.task);
					add_param.tasktime = Ext.lt.portal.component.beizhu.adddate;
					Ext.lt.RCP.call(Ext.lt.portal.component.beizhu.server, "addUserTask", add_param, function (resp) {
							if(resp == 1){
								alert("��ӳɹ�");
								Ext.lt.portal.component.beizhu.getmemorandum(Ext.lt.portal.component.beizhu.adddate);
								//Ext.lt.portal.component.beizhu.bzDS.remove(Ext.lt.portal.component.beizhu.bzData.getSelectionModel().getSelected());
							}else{
								alert(resp);
							}
						});
					}
				});*/
				
			}, scope:this}, "-", {text:"\u5220\u9664", iconCls:"select", pressed:true, handler:function () {
				if(Ext.lt.portal.component.beizhu.bzData.getSelectionModel().getSelected()){
					if(confirm('ȷ��Ҫɾ��������¼��')){
					var param = new Object();
						param.no = Ext.lt.portal.component.beizhu.bzData.getSelectionModel().getSelected().data.no;
						param.task = Ext.lt.portal.component.beizhu.bzData.getSelectionModel().getSelected().data.task;
						Ext.lt.RCP.call(Ext.lt.portal.component.beizhu.server, "deleteUserTask", param, function (resp) {
							if(resp == 1){
								alert("ɾ���ɹ�");
								Ext.lt.portal.component.beizhu.getmemorandum(Ext.lt.portal.component.beizhu.adddate);
								Ext.lt.portal.component.beizhu.bzDS.remove(Ext.lt.portal.component.beizhu.bzData.getSelectionModel().getSelected());
							}else{
								alert(resp);
							}
						});
					}
				}else{
					alert("��ѡ��Ҫɾ���ļ�¼��");
				}
			}}]});
				retmenupanel.getname = function () {
					return retmenupanel.title;
				};
				retmenupanel.on('afterlayout',function(pan){
					retmenupanel.items.items[0].setHeight(retmenupanel.getHeight()-75);
				});
			var today = new Date();
			today = today.format("Y-m-d");
			Ext.lt.portal.component.beizhu.getmemorandum(today);
			return retmenupanel;
	};
	this.getmemorandum=function(date){
		Ext.lt.portal.component.beizhu.adddate = date;
		Ext.lt.RCP.call(Ext.lt.portal.component.beizhu.server, "getMemorandum", date, function (resp) {
			Ext.lt.portal.component.beizhu.bzDatafn(resp);
		});
	};
	
	this.addmemorandum = function(date_tem) {
		if (Ext.getCmp("add_mem") == null) {
			new Ext.Window({title:"��ӱ���", width:400, closable :false,height:100, layout:"column", plain:true, id:"add_mem", items:[
								{columnWidth:1, layout:"form", border:false, items:[{id:"memorandum_add", xtype:"textfield",anchor: '100%',fieldLabel:"����¼", name:"memorandum_add"}]}
								], buttons:[{text:"\u5b8c\u6210",width:15, handler:function () {
									var config=new Object();
									config.task=Ext.getCmp("memorandum_add").getValue();
									config.adddate = Ext.lt.portal.component.beizhu.adddate;
									if(config.task.trim().length==0){
										alert("����Ϊ��");
										return;
									}
									if(config.task.trim().length>500){
										alert("����¼���ܳ���500����");
										return;
									}
									Ext.lt.RCP.call(Ext.lt.portal.component.beizhu.server, "addUserTask", config, function (resp) {
										if(resp == 1){
											alert("��ӳɹ�");
											Ext.lt.portal.component.beizhu.getmemorandum(Ext.lt.portal.component.beizhu.adddate);
											Ext.lt.template.unmask();
											//Ext.lt.portal.component.beizhu.bzDS.remove(Ext.lt.portal.component.beizhu.bzData.getSelectionModel().getSelected());
										}else{
											alert(resp);
										}
									});
								Ext.getCmp("add_mem").hide();
								
			}},{text:"ȡ��",width:15, handler:function () {
									Ext.getCmp("add_mem").hide();
									Ext.lt.template.unmask();
									}}]});
		}
			Ext.getCmp("add_mem").show();
			Ext.lt.template.mask();
			Ext.getCmp("memorandum_add").setValue("");
	}
	
};

