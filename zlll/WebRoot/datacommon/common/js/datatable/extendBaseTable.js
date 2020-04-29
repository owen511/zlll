if (DataCommon == null) {
	var DataCommon = {}
};
DataCommon.BaseTable = function() {
	
	//获取datatable的原型对象
	this.getDataTableObj = function(){
		return this.setting.dataTable;
	};
	
	 // 重新设置大小
	this.resizeTable = function(width, height) {
		if($.isNumeric(width) && $.isNumeric(height)){
					
			this.getDataTableObj().resize(parseInt(width), parseInt(height));
		}
	};
	
	// 得到选择的数据
	this.getSelectedRows = function() {
		return  this.getRecordSetObj().query({check:1}); 
	};
	
	// 得到所有的数据大小
	this.getTotalSize = function() {
		return this.getRecordSetObj().size(); 
	};
	
	// 得到所有的数据
	this.getTableData = function() {
		return this.getRecordSetObj().toArray(); 
	};
	
	// 得到所有查询参数
	this.getParams = function() {
		return this.setting.params; 
	};
	
	// 根据选择的行号获取数据信息
	this.getRowDataByIndex = function(index) {
		return this.getRecordSetObj().query({_locationposition : line})[0];
	}; 
	
	//获取列定义
	this.getColNames = function() {
		return this.getDataTableObj().getCols();
	};
	
	//获取当前采集表的结果集对象
	this.getRecordSetObj = function(){
		return this.getDataTableObj().getRecordSet();
	};
	
	this.setKeyIds = function(ids){
		this.keyIds = ids;
	};
	
	//获取当前数据的id值
	this.getKeyIds = function(){
		return this.keyIds;
	};
	
	//获取采集表的修改标记
	this.getModifyMark = function(){
		return this.setting.modifyMark;
	};
	
	//重置采集表的修改标记
	this.resetModifyMark = function(){
		this.setting.modifyMark = false;
	}
	
	/*
	// 得到所有的编辑过的数据
	this.getEditTableData = function() {

	};
	
	// 得到所有的新增的数据
	this.getInsertTableData = function() {

	};
	
	// 得到所有的删除数据
	this.getDelTableData = function() {
		
	}; 
	*/
	
}