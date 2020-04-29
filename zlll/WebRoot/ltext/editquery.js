if(Ext.lt==null) {
	alert('请加载ltext_core.js');
}
function queryplan() {
	var _win = null;
	var queryplan = document.createElement('div')
	queryplan.style.height = 200;
	queryplan.style.width = 200;
		var html=[];
		html.push("<table width='600px' class='foot' border='0' cellSpacing='0' cellPadding='0'>")
	   	html.push("<tr>")
		html.push("<td>")
		html.push("<div style='height:450px;width:150px;float:left;background:#e0f7ff;'>")
		html.push("<div>方案列表</div>")
		html.push("</div>")
		html.push("<div style='height:400px;float:left;width:450px;' class='editonly'>")
	  	html.push("<div style='height:350px;width:300px;'>")
		html.push("<table border='0' cellspacing='0' cellpadding='0' style='margin:auto;margin-top:10px; margin-bottom:10px;'>")
	  	html.push("<tr>")
		html.push("<th align='left'><span></span>状态</th>")
		html.push("<td><input type='text' class='input_nomal' /></td>")
	  	html.push("</tr>")
	  	html.push("<tr>")
		html.push("<th align='left'><span></span>编码</th>")
		html.push("<td><input type='text' class='input_nomal' /></td>")
	  	html.push("</tr>")
	  	html.push("<tr>")
		html.push("<th><span></span>制单人</th>")
		html.push("<td><input type='text' class='input_nomal'/></td>")
	  	html.push("</tr>")
	  	html.push("<tr>")
		html.push("<th align='left'>摘要</th>")
		html.push("<td><textarea class='longtextarea' rows='5'></textarea></td>")
	 	html.push("</tr>")
	 	html.push("<tr>")
		html.push("<th align='left'><input type='checkbox' /></th>")
		html.push("<td style='font-size:14px; padding-top:3px;'>设为默认查询方案</td>")
	 	html.push("</tr>")
		html.push("</table>")
		html.push("</div>")
		html.push("<div class='popwhite_btnarea' style='width:100%;'>")
		html.push("<button>保存</button>")
		html.push("<button>另存</button>")
		html.push("<button>重置</button>")
		html.push("<button>查询</button>")
		html.push("<button>取消</button>")
		html.push("</div>")
		html.push("</div>")
		html.push("</td>")
	   	html.push("</tr>")
	  	html.push("</table>");
	  	queryplan.innerHTML=html.join('');
	_win = new Ext.lt.window({title:"查询方案", w:650, h:500,close:true,pop:true,mark:true});
	_win.draw(queryplan);
	_win.show();
}