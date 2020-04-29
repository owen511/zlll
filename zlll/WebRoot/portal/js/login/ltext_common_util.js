if(Ext.util==null) Ext.util={};
Ext.util.JSON = new (function(){
        this.decode = function(json){
            return eval("(" + json + ')');    
        }
   });


//函 数 名：chknameobj
//功能介绍：检查是否符合名称要求
//参数说明：要检查的字符串
//返 回 值：false:不是  true:是
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