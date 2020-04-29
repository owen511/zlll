var dt = null;
var mainmenu = null;
var submenu = null;
var agencys = null;
var tables = null;
function showbackup_list(config,service){
	mainmenu = config.mainmenu;
	submenu = config.submenu;
	agencys = config.agencys;
	tables = config.tables;
	//模拟数据
	var sb = new StringBuffer();
	sb.append("<div style=\"height:10px;\"></div>");
	sb.append("<div id=\"exit_btn_div\">");
	sb.append("<button id=\"exit_btn\" type=\"button\" class=\"button_style\">返回</button>");
	sb.append("</div>");
	sb.append("<div style=\"height:10px;\"></div>");
	sb.append("<div id=\"form_table_title\">");
	sb.append("<ul><li class=\"top\"><div>备份信息</div></li></ul>");
	sb.append("</div>");
	sb.append("<div id=\"containerline20_d\" layout=\"{w:{fit:true},h:{fit:-70}}\">");
	sb.append("<div id='edit_table_div' style=\"width:100%;height:500px;\" layout=\"{w:{fit:true},h:{fit:true}}\"></div>");
	sb.append("</div>");
	
	document.getElementById("template_main").innerHTML = sb.toString();
	
//	Ext.lt.message.hook("layout","endlayout",function(){
//		window.setTimeout(function(){
//			document.getElementById('containerline20_d').style.height = document.getElementById("template_main").offsetHeight-90+'px';
//			document.getElementById('containerline20_d').style.width = document.getElementById("template_main").offsetWidth-20+'px';
//			document.getElementById('edit_table_div').style.height = document.getElementById("template_main").offsetHeight-90+'px';
//			document.getElementById('edit_table_div').style.width = document.getElementById("template_main").offsetWidth-20+'px';
//			if(dt != null){
//				dt.resize(document.getElementById('edit_table_div').offsetWidth,document.getElementById('edit_table_div').offsetHeight);
//			}
//		},100)
//	});
	
//	document.getElementById("main").attachEvent('onresize', function(){
//		setTimeout(function(){
//			var h = document.getElementById("template_main").offsetHeight;
//			var w = document.getElementById("template_main").offsetWidth;
////			document.getElementById('containerline20_d').style.height = (h-64)+'px';
////			document.getElementById('edit_table_div').style.height = (h-64)+'px';
////			document.getElementById('containerline20_d').style.width = (w-10)+'px';
////			document.getElementById('edit_table_div').style.width = (w-10)+'px';
//			if(dt != null){
////				dt.resize(document.getElementById('edit_table_div').offsetWidth,document.getElementById('edit_table_div').offsetHeight);
//			}
//		},100);
//	});
	
	document.getElementById("exit_btn").onclick = function(){
		var params = {};
		params["productType"] = config.productType;
		params["backupType"] = config.backupType;
		
		jumpTo("/datacommon/backupcompare/backup.page?mainmenu="+mainmenu+"&submenu="+submenu,"post",params);
	}
	
	if(!config.success){
		alert(config.msg);
		return;
	}
	
	//构造datatable
	dt = new Ext.lt.datatable(config.data);
	dt.setCols(config.headTitle);
	var hideList = config.hideList;
	for(var i = 0;i<hideList.length;i++){
		var col = hideList[i];
		dt.setHiddenColumn(col);
	}
	dt.setClassName("dttheme_budget");
	dt.setAlign("left");
	dt.mousedrag(false);
	dt.setHiddenColumn("EMPTY");
	dt.setAllowClock(false);
	dt.setAllowcustom(false);
	dt.setLayout();
	//绘制表格
	dt.draw(edit_table_div);
}