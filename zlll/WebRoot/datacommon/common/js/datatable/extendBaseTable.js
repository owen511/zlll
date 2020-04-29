if (DataCommon == null) {
	var DataCommon = {}
};
DataCommon.BaseTable = function() {
	
	//��ȡdatatable��ԭ�Ͷ���
	this.getDataTableObj = function(){
		return this.setting.dataTable;
	};
	
	 // �������ô�С
	this.resizeTable = function(width, height) {
		if($.isNumeric(width) && $.isNumeric(height)){
					
			this.getDataTableObj().resize(parseInt(width), parseInt(height));
		}
	};
	
	// �õ�ѡ�������
	this.getSelectedRows = function() {
		return  this.getRecordSetObj().query({check:1}); 
	};
	
	// �õ����е����ݴ�С
	this.getTotalSize = function() {
		return this.getRecordSetObj().size(); 
	};
	
	// �õ����е�����
	this.getTableData = function() {
		return this.getRecordSetObj().toArray(); 
	};
	
	// �õ����в�ѯ����
	this.getParams = function() {
		return this.setting.params; 
	};
	
	// ����ѡ����кŻ�ȡ������Ϣ
	this.getRowDataByIndex = function(index) {
		return this.getRecordSetObj().query({_locationposition : line})[0];
	}; 
	
	//��ȡ�ж���
	this.getColNames = function() {
		return this.getDataTableObj().getCols();
	};
	
	//��ȡ��ǰ�ɼ���Ľ��������
	this.getRecordSetObj = function(){
		return this.getDataTableObj().getRecordSet();
	};
	
	this.setKeyIds = function(ids){
		this.keyIds = ids;
	};
	
	//��ȡ��ǰ���ݵ�idֵ
	this.getKeyIds = function(){
		return this.keyIds;
	};
	
	//��ȡ�ɼ�����޸ı��
	this.getModifyMark = function(){
		return this.setting.modifyMark;
	};
	
	//���òɼ�����޸ı��
	this.resetModifyMark = function(){
		this.setting.modifyMark = false;
	}
	
	/*
	// �õ����еı༭��������
	this.getEditTableData = function() {

	};
	
	// �õ����е�����������
	this.getInsertTableData = function() {

	};
	
	// �õ����е�ɾ������
	this.getDelTableData = function() {
		
	}; 
	*/
	
}