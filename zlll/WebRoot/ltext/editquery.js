if(Ext.lt==null) {
	alert('�����ltext_core.js');
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
		html.push("<div>�����б�</div>")
		html.push("</div>")
		html.push("<div style='height:400px;float:left;width:450px;' class='editonly'>")
	  	html.push("<div style='height:350px;width:300px;'>")
		html.push("<table border='0' cellspacing='0' cellpadding='0' style='margin:auto;margin-top:10px; margin-bottom:10px;'>")
	  	html.push("<tr>")
		html.push("<th align='left'><span></span>״̬</th>")
		html.push("<td><input type='text' class='input_nomal' /></td>")
	  	html.push("</tr>")
	  	html.push("<tr>")
		html.push("<th align='left'><span></span>����</th>")
		html.push("<td><input type='text' class='input_nomal' /></td>")
	  	html.push("</tr>")
	  	html.push("<tr>")
		html.push("<th><span></span>�Ƶ���</th>")
		html.push("<td><input type='text' class='input_nomal'/></td>")
	  	html.push("</tr>")
	  	html.push("<tr>")
		html.push("<th align='left'>ժҪ</th>")
		html.push("<td><textarea class='longtextarea' rows='5'></textarea></td>")
	 	html.push("</tr>")
	 	html.push("<tr>")
		html.push("<th align='left'><input type='checkbox' /></th>")
		html.push("<td style='font-size:14px; padding-top:3px;'>��ΪĬ�ϲ�ѯ����</td>")
	 	html.push("</tr>")
		html.push("</table>")
		html.push("</div>")
		html.push("<div class='popwhite_btnarea' style='width:100%;'>")
		html.push("<button>����</button>")
		html.push("<button>���</button>")
		html.push("<button>����</button>")
		html.push("<button>��ѯ</button>")
		html.push("<button>ȡ��</button>")
		html.push("</div>")
		html.push("</div>")
		html.push("</td>")
	   	html.push("</tr>")
	  	html.push("</table>");
	  	queryplan.innerHTML=html.join('');
	_win = new Ext.lt.window({title:"��ѯ����", w:650, h:500,close:true,pop:true,mark:true});
	_win.draw(queryplan);
	_win.show();
}