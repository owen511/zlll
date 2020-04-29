//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.component.iframe = new function () {
	

	this.IfmisDefIframe = function (config,server) {
		
		var hhh = 552;
		var panelheight = 330;
		var divheight = 303;
		var res = "";
		var setHtml = []; 
		if(null==config.url||config.url==""){
			setHtml.push("<div id=\"default_center\">");
			setHtml.push("<div id=\"kuang\">");
			setHtml.push("<div class=\"kuang_bg\" style=\"z-index:10; position:absolute; background:#B1BDDA; height:396px; width:626px;filter:alpha(opacity=60);-moz-opacity:0.6;\"></div>");
			setHtml.push("<div class=\"kuang_main\" style=\"z-index:100; position:absolute; background:#FFF; height:370px; width:600px; margin:10px; background-image:url(../images/bg/heilongjiang_daiban.gif); background-position:center center; background-repeat:repeat-x; background-attachment:fixed; text-align:center; border:3px #3C64B5 double;\">");
			setHtml.push("<p class=\"kuang_title\" style=\"color:#3059A8; text-align:center; font-size:25px; font-weight:bold; height:80px; line-height:80px; border-bottom:1px #B3B3B3 inset;margin-left:30px; margin-right:30px; margin-bottom:30px; margin-top:10px;\">重新指定业务程序地址</p>");
			setHtml.push("<div style=\"overflow-y:auto; height:190px;\">");
			setHtml.push("<table border=\"0\" width=\"88%\" class=\"peizhi_table\" height=\"190px\" >");
    		 var v= config.menus;   
		     for(var i = 0;i<=v.length-1;i++){
		     	var initpath = "";
		     	setHtml.push("<tr style=\"height:35px; line-height:35px; font-size:14px; color:#333;\">");
		  		var v1= v[i];
		  		if(v1.initialpath!=null && v1.initialpath !=""&&v1.initialpath!="null"){
		  			initpath = v1.initialpath;
		     	}
				setHtml.push("<td nowrap='nowrap' width='170' align='left'>"+v1.name+"</td>");
		        setHtml.push("<td nowrap='nowrap' width='60%' align='left'><input type='file' style='height:23px;' size='30' id='"+v1.sign+"'/></td>");
				setHtml.push("<td nowrap='nowrap'><button onclick='regedit("+v1.tjhqprogram+",\""+v1.sign+"\")' style=\"line-height:23px; height:23px; border:0; width:50px; background-image:url(../images/bg/peizhi_btn.gif); background-repeat:repeat-x; background-position:left center; border:1px #3059A8 solid;\">确定</button></td>");
				setHtml.push("</tr>");
				setHtml.push("<tr>");
				setHtml.push("<td nowrap='nowrap' width='170' align='left'>默认路径：</td>");
		        setHtml.push("<td nowrap='nowrap' width='60%' align='left'><input type='text' style='height:19px;' readonly size='30' value='"+initpath+"'></td>");
				setHtml.push("<td nowrap='nowrap'></td>");
				setHtml.push("</tr>");
			}
		setHtml.push("</table>");

		setHtml.push("</div>");
		setHtml.push("<div id='confirm_exit_btn'>");
		setHtml.push("<p align='right'><input name='submit3' type='button' value='返回' onclick='cancel()' /></p>");
		setHtml.push("</div>");
		setHtml.push("</div>");
		setHtml.push("</div>");

		setHtml.push("</div>  ");
		setHtml.push("<div><p align=\"center\"></p></div>");
		setHtml.push("</div>");

		res = new Ext.Panel({title:config.end_name,tools:tools,pp:10,panelheight:hhh,height:hhh,border:false,html:setHtml.join('')});
		}else{
		    //构造form表单提交参数
		    setHtml.push('<div>');
		    setHtml.push('<iframe width=100% height=100% name="iframeShow" id="iframeShow"></iframe>');
		    setHtml.push('<form id="programForm" name="programForm" method="post" action="' + config.init_url + '" target="iframeShow" style="display:none;">');
		    setHtml.push('<input type="hidden" name="uid" value="' + config.uid + '"/>');
		    setHtml.push('<input type="hidden" name="sid" value="' + config.sid + '"/>');
		    setHtml.push('<input type="hidden" name="year" value="' + config.year + '"/>');
		    for (var i = 0; i < config.program.parameters.length; i++){
		        var parameter = config.program.parameters[i];
		        setHtml.push('<input type="hidden" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
		    }
		    setHtml.push('</form>');
		    setHtml.push('</div>');
			res = new Ext.Panel({title:config.end_name,tools:tools,panelheight:hhh,height:hhh,border:false,html:setHtml.join('')});
		}
		res.getname=function(){
			return res.title;
		}
		res.on('afterlayout',function(panel,layout){
				var mainbody=Ext.getCmp('mainbody');
		   		panel.setHeight(mainbody.getHeight()-4);
		   		panel.panelheight = mainbody.getHeight()-4;
		   		if(panel.pp==10){
		   			var kuang = document.getElementById("kuang");
					var allH =mainbody.getHeight()-4;
					var allW =mainbody.getWidth()-4;
					kuang.style.marginLeft = (allW - 626)/2;
					kuang.style.marginTop = (allH - 396)/2 ;
		   		}
		   		//提交form表单
		   		if(document.getElementById("programForm")){
		   		    document.getElementById("programForm").submit();
		   		}
			});
		return res;
	}
	this.deploy = function () {
		this.show = function (com,fn) {
			if (Ext.getCmp("iframe_deploy") == null) {
				new Ext.Window({title:"默认窗口配置", width:700, height:400, layout:"column", plain:true, id:"iframe_deploy", items:[
						{columnWidth:0.5, layout:"form", border:false, items:[{id:"iframe_deploy_name", xtype:"textfield", fieldLabel:"栏目名称", name:"name"}]}, 
						{columnWidth:0.5, layout:"form", border:false, items:[{id:"iframe_deploy_index", xtype:"textfield", fieldLabel:"连接地址", name:"page"}]}
						], buttons:[{text:"\u5b8c\u6210", handler:function () {
							var config=new Object();
							config.name=Ext.getCmp("iframe_deploy_name").getValue();
							config.url=Ext.getCmp("iframe_deploy_index").getValue();
							fn(config,"ifr");
						Ext.getCmp("iframe_deploy").hide();
				}}]});
			}
			Ext.getCmp("iframe_deploy").show();
			Ext.getCmp("iframe_deploy_name").setValue("");
			Ext.getCmp("iframe_deploy_index").setValue("");
		};
	};
};
	function regedit(programtype,sign){
      var value = document.getElementById(sign).value;
      if(value.trim()==''){
            alert("请选择地址!");
            return;
      }
        //判断是否是华清预算编制单位版(efmdiv)或财政供养单位版(dfczdiv)      
        if(1==programtype && sign!='efmdiv' && sign!='dfczdiv'){
        var i = value.lastIndexOf("\\");
        t = value.split("\\");
        var location = '';
	        for(i=0;i<t.size()-2;i++){
	            location = location + t[i] +"\\"
	        }
            AppCaller.registryExeApp(sign,value,location);
            alert('操作成功');
      }else{
            AppCaller.registryExeApp(sign,value,'');
            alert('操作成功');
      }
  };
   //begin 楚艳红 2012.11.5 业务程序地址管理加返回按钮
	function cancel(){
		
		var url = _ROOT_PATH_+"/login/default.page";
		window.location.href = url;
	}
	//end 楚艳红 2012.11.5 业务程序地址管理加返回按钮

