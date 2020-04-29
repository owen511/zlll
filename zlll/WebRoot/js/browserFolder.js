function browseFolder(path) {
	try {
		var Message = "\u8bf7\u9009\u62e9\u6587\u4ef6\u5939"; 
		var Shell = new ActiveXObject("Shell.Application"); 
		var Folder = Shell.BrowseForFolder(0, Message, 64, 17);
		//var Folder = Shell.BrowseForFolder(0,Message,0);
		if (Folder != null) {
			Folder = Folder.items();
			Folder = Folder.item();
			Folder = Folder.Path;
			if (Folder.charAt(Folder.length - 1) != "") {
			   Folder = Folder + ""; 
		    }
		    document.getElementById(path).value = Folder; 
		    return Folder; 
		}
	}catch (e) {
	   alert(e.message); 
	}
}

function SaveAs(text){
     alert(text);     
     var fileSave = new ActiveXObject("MSComDlg.CommonDialog");
     fileSave.Filter = "xls";     
     fileSave.FilterIndex = 2;            
     // 必须设置MaxFileSize. 否则出错       
     fileSave.MaxFileSize = 128;            
     fileSave.ShowSave(); 
     alert(fileSave.filename);
     document.all(text).value = fileSave.filename;
} 