//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}

Ext.lt.portal.component.gonggao = new function () {
	this.getGongGao = function (postinfo,server) { //定义一个函数，里面的参数为server，menuinfo是菜单的各种信息。没有公告相应的类？？？？？
	    var panelheight = (document.body.clientHeight-54)/2+19;
		var postlist = postinfo.postList;			
		var titlename = postinfo.name;
		var divHight = panelheight - 33; 
		var setHtml = [];//  定义字符串
		setHtml.push("<div style=\"height:"+divHight+"px;overflow:auto;padding:'5 0 0 10';background: url(/portal/images/bg_02.gif) repeat-x left top;\">"); //输入一个高为220px，overflow溢出，当对象内容超过指定的宽度和高度之后如何管理，auto 是在必需时对象内容才会被裁切或显示横向滚动条 padding其实就是内边距，就是所要显示的内容和周围的边框之间的距离。
		setHtml.push("<table border='0' width=95% cellpadding='0' cellspacing='0' style='font-color:red;font-size:12px;'>");//输入一个表格
		if(null == postlist || postlist.size()<1){
			setHtml.push("<tr><td style=\"height:23px; font-size='12'\" >");
			setHtml.push("<img src=\"../portal/images/news.gif\"/>");
			setHtml.push("无公告！");
			setHtml.push("</td></tr>");
		}else{
			for(var i=0;i<postlist.size();i++){
				setHtml.push('<tr title='+postlist[i].posttitle+'>');
				setHtml.push('<th width="width:100%" height="26" align="left" valign="bottom"  scope="col" style="background-image:url('+_ROOT_PATH_+'/portal/images/line_30.gif);background-repeat: no-repeat;background-position:bottom;">');
				setHtml.push('<div class="STYLE12" style="width:70%;float:left;padding-bottom:4px;">');
				setHtml.push('<div style="float:left;margin-left:3px;width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-top:3px;" >');
				setHtml.push("["+titlename+"] <a class='gg' href=\"javascript:Ext.lt.portal.component.gonggao.preview('"+postlist[i].id+"','"+postlist[i].fileid+"')\">"+postlist[i].posttitle+"</a>");
				setHtml.push('</div></div>');
				var createtime = postlist[i].createtime;
				createtime = createtime.substring(0,11);
				setHtml.push('<div class="STYLE12" style="float:right;padding-top:2px;">'+createtime+'</div></th></tr>');
			} 
		}	
		
		setHtml.push("</table>");
	    setHtml.push("</div>");
		//var retmenupanel = new Ext.Panel({title:postinfo.name,panelheight:330,height:330, html:setHtml.join('')});
		var retmenupanel = new Ext.Panel({title:postinfo.name,panelheight:divHight,height:panelheight, html:setHtml.join('')});
		retmenupanel.getname=function(){
			return retmenupanel.title;
		}
		return retmenupanel;
	};
	this.gonggaoshow=function(post,postfileid,postfiledisplay){
		var conHtml=[];
		conHtml.push("<table>");
		conHtml.push("<tr><td style=\"font-size='16'\">");
		if(post == "undefined"){
			post = "";
		}
	    conHtml.push(post);
		if(postfiledisplay==1){
			conHtml.push("<img src=\""+_ROOT_PATH_+"/postimage.do?path="+postfileid +"\"/>");
		}
		conHtml.push("</td></tr>");
		conHtml.push("</table>");
        var win=new Ext.Window({ title: "公告内容", height: 500, width: 600,autoScroll:true,  maximizable:true, minimizable:true, buttons:[{text:"OK",handler:function(){win.close();}}], html: conHtml.join('') });
        win.show();
        //Ext.QuickTips.init();//提示初始化
	};
	    
	//预览
	this.preview=function(id,postfileid){
		var ieHeight = 600;
		if(Sys.ie == '6.0'){
	      ieHeight += 50;
	    }
    	var url = _ROOT_PATH_+"/portal/portal2/login/hlj_preview.jsp?id="+id+"&type="+1;
    	window.open(url,'window',"Height="+ieHeight+",Width=600px,scrollbars=yes,status=no,resizable=0;");  
    }
};