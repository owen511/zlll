if(Ext.util==null) Ext.util={};
Ext.util.JSON = new (function(){
        this.decode = function(json){
            return eval("(" + json + ')');    
        }
   });


//�� �� ����chknameobj
//���ܽ��ܣ�����Ƿ��������Ҫ��
//����˵����Ҫ�����ַ���
//�� �� ֵ��false:����  true:��
function chknameobj(checkStr) {
	var forbidStr = "`~!@#$%^&*+=|\\{}[];:,<>?/\"";  	
	for (i = 0; i < checkStr.length; i++) {
		ch = checkStr.charAt(i);
		if (forbidStr.indexOf(ch) >= 0){
			return false;
		} 
	}
	return true;
}