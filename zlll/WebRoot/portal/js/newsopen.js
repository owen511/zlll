if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}

Ext.lt.portal.component.news = new function () {
	this.getNews = function (postinfo,server) {
		var titlename = postinfo.name;
	    var panelheight = (document.body.clientHeight-54)/2-19;
		var postlist = postinfo.postList;			
		
		var divHight = panelheight - 33; 
		var setHtml = [];//  �����ַ���
		setHtml.push("<div style=\"height:"+divHight+"px;overflow:auto;padding:'5 0 0 10';background: url(/portal/images/bg_02.gif) repeat-x left top;\">"); //����һ����Ϊ220px��overflow��������������ݳ���ָ���Ŀ�Ⱥ͸߶�֮����ι���auto ���ڱ���ʱ�������ݲŻᱻ���л���ʾ��������� padding��ʵ�����ڱ߾࣬������Ҫ��ʾ�����ݺ���Χ�ı߿�֮��ľ��롣
		setHtml.push("<table border='0' width=95% cellpadding='0' cellspacing='0' style='font-size:12px;'>");//����һ�����
		if(null == postlist || postlist.size()<1){
			setHtml.push("<tr><td style=\"height:23px; font-size='12'\" >");
			setHtml.push("<img src=\"../portal/images/news.gif\"/>");
			setHtml.push("����Ϣ��");
			setHtml.push("</td></tr>");
		}else{
			for(var i=0;i<postlist.size();i++){
				setHtml.push('<tr title='+postlist[i].posttitle+'>');
				setHtml.push('<th width="width:100%" height="26" align="left" valign="bottom"  scope="col" style="background-image:url('+_ROOT_PATH_+'/portal/images/line_30.gif);background-repeat: no-repeat;background-position:bottom;">');
				setHtml.push('<div class="STYLE12" style="width:80%;float:left;padding-bottom:4px;">');
				setHtml.push('<div style="float:left;margin-left:3px;width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-top:3px;" >');
				setHtml.push("["+titlename+"] <a class='gg' href=\"javascript:Ext.lt.portal.component.news.preview('"+postlist[i].id+"','"+postlist[i].fileid+"')\">"+postlist[i].posttitle+"</a>");
				setHtml.push('</div></div>');
				var createtime = postlist[i].createtime;
				createtime = createtime.substring(0,11);
				setHtml.push('<div class="STYLE12" style="float:right;padding-top:2px;">'+createtime+'</div></th></tr>');
			} 
		}
		setHtml.push("</table>");
	    setHtml.push("</div>");
	    
		var retmenupanel = new Ext.Panel({
			title:titlename,
			panelheight:divHight,
			height:panelheight,
			//baseCls:'g-panel',
			html:setHtml.join('')
		});
		retmenupanel.getname=function(){
			return retmenupanel.title;
		}
		return retmenupanel;
	};
	    
	//Ԥ��
	this.preview=function(id,postfileid){
		var ieHeight = 600;
		if(Sys.ie == '6.0'){
	      ieHeight += 50;
	    }
    	var url = _ROOT_PATH_+"/portal/portal2/login/hlj_preview.jsp?id="+id+"&type="+2;
    	window.open(url,'window',"Height="+ieHeight+",Width=600px,scrollbars=yes,status=no,resizable=0;");  
    }
};