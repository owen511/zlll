Ext.lt.console.component.mapcache=new function(){
	this.datads = new Ext.data.GroupingStore({
		reader:new Ext.data.ArrayReader({}, [{name:"id"},{name:"name"}, {name:"cv"},{name:'busy'},{name:'start'}]),
		sortInfo : {field : 'busy',direction : "ASC"},
		groupField : 'id'
	});
	this.sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	this.model = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(), 
		this.sm, 
		{header:"缓存对象",  sortable:true,menuDisabled:true, hidden :true, locked:false, dataIndex:"id"}, 
		{header:"缓存名称",  width:300, sortable:true,menuDisabled:true, locked:false, dataIndex:"name"}, 
		{header:"缓存大小",  width:200, sortable:true,menuDisabled:true, locked:false, dataIndex:"cv",renderer:function(value){return value+" KB";}},
		{header:"使用频率",  sortable:true,menuDisabled:true, locked:false, dataIndex:"busy"},
		{header:"开始时间",  width:150, sortable:true,menuDisabled:true, locked:false, dataIndex:"start" ,renderer:function(value){return Ext.util.Format.date(new Date(value),'Y-m-d  h:i:s'); }}
		]);
	this.panel = new Ext.grid.GridPanel({
				title:"系统缓存管理",
				layout:"fit",
				iconCls:"grid", 
				border:0, 
				store:this.datads, 
				cm:this.model,
				view : new Ext.grid.GroupingView({
				    groupByText : '根据本列分组',
    			    showGroupsText : '是否采用分组显示',
    				groupTextTpl : '{text}(<b><font color=red>{[values.rs.length]}</font></b> {[values.rs.length > 1 ? "个" : "个"]})'
				}),
			   stripeRows : true,
				viewConfig: {forceFit:true},
				sm:this.sm, 
				frame:true,
				tbar:[{
					text:"清理缓存",
					iconCls:"cancel", 
					pressed:true, 
					handler:function () {
						var selectrow = Ext.lt.console.component.mapcache.panel.getSelectionModel().selections.items;
						var obj={};
						for(var i=0;i<selectrow.length;i++){
							if(obj[selectrow[i].data.id]==null)obj[selectrow[i].data.id]=[];
							obj[selectrow[i].data.id].push(selectrow[i].data.name);
						}
						Ext.lt.RCP.server("framework_cache", "mapclear",  obj , function (resp) {
							if(resp=="true"){
								Ext.lt.console.component.mapcache.loaddate();
							}
						},function(){
							alert("清理缓存失败！");
						});
				}, scope:this},"-",
				{
					text:"更新",
					iconCls:"cancel", 
					pressed:true, 
					handler:function(){Ext.lt.console.component.mapcache.loaddate();}, scope:this}]
			});
	this.loaddate=function(){
		Ext.lt.RCP.server("framework_cache", "mapload",  null , function (reps) {
				var loaddata = new Array();
				for (var i = 0; i < reps.length; i++) {
					loaddata.push([reps[i][0],reps[i][1],reps[i][2],reps[i][3],reps[i][4]]);
				}
				Ext.lt.console.component.mapcache.datads.loadData(loaddata);
				Ext.lt.console.component.mapcache.panel.doLayout();
			});
	}
	this.show=function(){
		Ext.lt.console.component.mapcache.loaddate();
		return Ext.lt.console.component.mapcache.panel;
	};
}