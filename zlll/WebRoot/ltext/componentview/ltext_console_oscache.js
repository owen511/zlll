Ext.lt.console.component.oscache=new function(){
	this.datads = new Ext.data.Store({
		reader:new Ext.data.ArrayReader({}, [{name:"name"}, {name:"cv"}])
	});
	this.sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	this.model = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(), 
		this.sm, 
		{header:"缓存名称", width:200, sortable:true,menuDisabled:true, locked:false, dataIndex:"name"}, 
		{header:"缓存大小",  width:200, sortable:true,menuDisabled:true, locked:false, dataIndex:"cv",renderer:function(value){return value+" KB";}}]);
	this.panel = new Ext.grid.GridPanel({
				title:"OS缓存管理",
				layout:"fit",
				iconCls:"grid", 
				border:0, 
				store:this.datads, 
				cm:this.model, 
				viewConfig: {forceFit:true},   
				sm:this.sm, 
				frame:true,
				tbar:[{
					text:"清理缓存",
					iconCls:"cancel", 
					pressed:true, 
					handler:function () {
						var selectrow = Ext.lt.console.component.oscache.panel.getSelectionModel().selections.items;
						var arr=new Array();
						for(var i=0;i<selectrow.length;i++){
							arr.push(selectrow[i].data.name);
						}
						Ext.lt.RCP.server("framework_cache", "osclear",  [arr] , function (resp) {
							if(resp=="true"){
								Ext.lt.console.component.oscache.loaddate();
							}
						},function(){
							alert("清理缓存失败！");
						});
				}, scope:this},"-",
				{
					text:"更新",
					iconCls:"cancel", 
					pressed:true, 
					handler:function(){Ext.lt.console.component.oscache.loaddate();}, scope:this}]
			});
	this.loaddate=function(){
		Ext.lt.RCP.server("framework_cache", "osload",  null , function (reps) {
				var loaddata = new Array();
				for (var i = 0; i < reps.length; i++) {
					loaddata.push([reps[i][0],reps[i][1]]);
				}
				Ext.lt.console.component.oscache.datads.loadData(loaddata);
				Ext.lt.console.component.oscache.panel.doLayout();
			});
	}
	this.show=function(){
		Ext.lt.console.component.oscache.loaddate();
		return Ext.lt.console.component.oscache.panel;
	};
}