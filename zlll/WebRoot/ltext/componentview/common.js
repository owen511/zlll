//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.component.common = new function () {
//	new Ext.lt.portal.util().createScript("style/heilongjiang_logo.css", "style/heilongjiang_logo.css");
	this.IfmisDefaultTitle = function (config) {
		return new Ext.Panel({id:"systemtitle", html:"<div id=\"window_top\"><div id=\"top\"> " + "  <div id=\"logo\"> " + "    <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"> " + "      <tr> " + "        <th rowspan=\"2\" nowrap=\"nowrap\"></th> " + "        <td  nowrap=\"nowrap\"> " + "        <div><a title=\"\u9000\u51fa\" href=\"./logout.do\"><img src=\"./images/actions/exit.gif\" width=\"16\" height=\"16\" border=\"0\"/> \u9000\u51fa </a></div><div class=\"w_gang\"></div> " + "          <div><a title=\"\u8fd4\u56de\u9996\u9875\" href=\"./common/index.do\"><img src=\"./images/actions/house.gif\" width=\"16\" height=\"16\" /> \u9996\u9875</a></div><div class=\"w_gang\"></div> " + "          <div><img src=\"./images/actions/font_size.gif\" width=\"16\" height=\"16\" border=\"0\" title=\"\u5b57\u53f7\" /><a href=\"#\" onclick=\"setFont('l')\">\u5927</a><a href=\"#\" onclick=\"setFont('m')\"> \u4e2d</a><a href=\"#\" onclick=\"setFont('s')\"> \u5c0f</a></div><div class=\"w_gang\"></div>" + "          <div class=\"w_head\"></div> " + "            </td> " + "        <td width=\"6\" nowrap=\"nowrap\" class=\"w_right\">&nbsp;</td> " + "      </tr> " + "      <tr> " + "        <td nowrap=\"nowrap\"  class=\"welcomeA\">\u5e74\u5ea6:2010 <input type=\"button\" onclick=\"tezs()\" value=\"123123123123123\"/>" + "        \u7528\u6237:Admin " + "        \u65e5\u671f: " + "         <span id=cdate>2010-10-01</span></td> " + "        <td nowrap=\"nowrap\">&nbsp;</td> " + "      </tr> " + "    </table> " + "  </div> " + " </div></div> "});
	};
	this.deploy = function () {
		this.show = function (com,fn) {
			if (Ext.getCmp("common_deploy") == null) {
				new Ext.Window({title:"默认窗口配置", width:700, height:400, layout:"column", plain:true, id:"common_deploy", items:[
						{columnWidth:0.5, layout:"form", border:false, items:[{id:"common_deploy_name", xtype:"textfield", fieldLabel:"栏目名称", name:"name"}]}, 
						{columnWidth:0.5, layout:"form", border:false, items:[{id:"common_deploy_index", xtype:"textfield", fieldLabel:"首页连接地址", name:"page"}]}
						], buttons:[{text:"\u5b8c\u6210", handler:function () {
							var config=new Object();
							config.name=Ext.getCmp("common_deploy_name").getValue();
							config.index=Ext.getCmp("common_deploy_index").getValue();
							fn(config,"defaultlogoservice");
						Ext.getCmp("common_deploy").hide();
				}}]});
			}
			Ext.getCmp("common_deploy").show();
			Ext.getCmp("common_deploy_name").setValue("");
			Ext.getCmp("common_deploy_index").setValue("");
		};
	};
};

