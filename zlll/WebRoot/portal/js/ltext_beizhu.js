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
				//添加备忘
				Ext.lt.portal.component.beizhu.addmemorandum(Ext.lt.portal.component.beizhu.adddate);
				
				/*
				Ext.Msg.buttonText.ok="确定";
      			Ext.Msg.buttonText.cancel="取消";
      			Ext.Msg.buttonText.yes="确定";
      			Ext.Msg.buttonText.no="取消";
				
				Ext.Msg.prompt("请输入","备忘录:",function(button,text_tem){
				debugger;
				alert(button);
				if(button=='确定'){
			//	debugger;
					alert("备忘录:"+text_tem);
					var add_param = new Object();
					add_param.task = text_tem;
					alert(add_param.task);
					add_param.tasktime = Ext.lt.portal.component.beizhu.adddate;
					Ext.lt.RCP.call(Ext.lt.portal.component.beizhu.server, "addUserTask", add_param, function (resp) {
							if(resp == 1){
								alert("添加成功");
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
					if(confirm('确定要删除此条记录吗？')){
					var param = new Object();
						param.no = Ext.lt.portal.component.beizhu.bzData.getSelectionModel().getSelected().data.no;
						param.task = Ext.lt.portal.component.beizhu.bzData.getSelectionModel().getSelected().data.task;
						Ext.lt.RCP.call(Ext.lt.portal.component.beizhu.server, "deleteUserTask", param, function (resp) {
							if(resp == 1){
								alert("删除成功");
								Ext.lt.portal.component.beizhu.getmemorandum(Ext.lt.portal.component.beizhu.adddate);
								Ext.lt.portal.component.beizhu.bzDS.remove(Ext.lt.portal.component.beizhu.bzData.getSelectionModel().getSelected());
							}else{
								alert(resp);
							}
						});
					}
				}else{
					alert("请选择要删除的记录！");
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
			new Ext.Window({title:"添加备忘", width:400, closable :false,height:100, layout:"column", plain:true, id:"add_mem", items:[
								{columnWidth:1, layout:"form", border:false, items:[{id:"memorandum_add", xtype:"textfield",anchor: '100%',fieldLabel:"备忘录", name:"memorandum_add"}]}
								], buttons:[{text:"\u5b8c\u6210",width:15, handler:function () {
									var config=new Object();
									config.task=Ext.getCmp("memorandum_add").getValue();
									config.adddate = Ext.lt.portal.component.beizhu.adddate;
									if(config.task.trim().length==0){
										alert("不能为空");
										return;
									}
									if(config.task.trim().length>500){
										alert("备忘录不能超过500个字");
										return;
									}
									Ext.lt.RCP.call(Ext.lt.portal.component.beizhu.server, "addUserTask", config, function (resp) {
										if(resp == 1){
											alert("添加成功");
											Ext.lt.portal.component.beizhu.getmemorandum(Ext.lt.portal.component.beizhu.adddate);
											Ext.lt.template.unmask();
											//Ext.lt.portal.component.beizhu.bzDS.remove(Ext.lt.portal.component.beizhu.bzData.getSelectionModel().getSelected());
										}else{
											alert(resp);
										}
									});
								Ext.getCmp("add_mem").hide();
								
			}},{text:"取消",width:15, handler:function () {
									Ext.getCmp("add_mem").hide();
									Ext.lt.template.unmask();
									}}]});
		}
			Ext.getCmp("add_mem").show();
			Ext.lt.template.mask();
			Ext.getCmp("memorandum_add").setValue("");
	}
	
};

