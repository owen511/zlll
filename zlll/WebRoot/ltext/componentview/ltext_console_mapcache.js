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
		{header:"�������",  sortable:true,menuDisabled:true, hidden :true, locked:false, dataIndex:"id"}, 
		{header:"��������",  width:300, sortable:true,menuDisabled:true, locked:false, dataIndex:"name"}, 
		{header:"�����С",  width:200, sortable:true,menuDisabled:true, locked:false, dataIndex:"cv",renderer:function(value){return value+" KB";}},
		{header:"ʹ��Ƶ��",  sortable:true,menuDisabled:true, locked:false, dataIndex:"busy"},
		{header:"��ʼʱ��",  width:150, sortable:true,menuDisabled:true, locked:false, dataIndex:"start" ,renderer:function(value){return Ext.util.Format.date(new Date(value),'Y-m-d  h:i:s'); }}
		]);
	this.panel = new Ext.grid.GridPanel({
				title:"ϵͳ�������",
				layout:"fit",
				iconCls:"grid", 
				border:0, 
				store:this.datads, 
				cm:this.model,
				view : new Ext.grid.GroupingView({
				    groupByText : '���ݱ��з���',
    			    showGroupsText : '�Ƿ���÷�����ʾ',
    				groupTextTpl : '{text}(<b><font color=red>{[values.rs.length]}</font></b> {[values.rs.length > 1 ? "��" : "��"]})'
				}),
			   stripeRows : true,
				viewConfig: {forceFit:true},
				sm:this.sm, 
				frame:true,
				tbar:[{
					text:"������",
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
							alert("������ʧ�ܣ�");
						});
				}, scope:this},"-",
				{
					text:"����",
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