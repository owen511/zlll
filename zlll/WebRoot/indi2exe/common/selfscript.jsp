<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import="gov.mof.fasp.systemset.bo.SystemSetBO"%>
<%@ page import="gov.mof.fasp.systemset.dto.SystemSetDTO"%>
<%@ page import="gov.mof.fasp.ifmis.common.ServiceFactory"%>
<%
	response.setHeader("Cache-Control","no-cache"); 
	response.setHeader("Pragma","no-cache"); 
    response.setDateHeader("Expires",0); 
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort() + path;
    Map urlMap = (Map) request.getSession().getAttribute("WorkPanel");
	String realpath  = (String)request.getAttribute("realpath");
	Map map = null;
	if (urlMap != null && urlMap.containsKey(realpath)) {
		map = (Map)urlMap.get(realpath);
	}
	if (map != null) {
		out.println("<script>");
		String leftdiv = (String)map.get("leftdiv");
		String topdiv = (String)map.get("topdiv");
		out.println("var workpaneltag = true;");
		out.println("if ($(\"left_tree\") != null)\n");
		out.println("document.getElementById(\"left_tree\").style.display=\""+leftdiv+"\";\n");
		out.println("if ($(\"window_top\") != null)\n");
		out.println("document.getElementById(\"window_top\").style.height=\""+topdiv+"\";\n");
		out.println("</script>");
	}
%>
<script type="text/javascript" src="<%=basePath%>/indi2exe/js/changedata.js"></script>
<script type="text/javascript">
	var userid = "<%= gov.mof.fasp.sec.util.SecureUtil.getCurrentUser().getUserid() %>";
   	var basePath = '<%= basePath %>' ;
   	var linkName = "<%= request.getAttribute("LINKNAME") %>" ;
   	var printConfig = <%= request.getAttribute("PRINTCONFIG") %> ;   
   	
   	function print() {
    	printL(printConfig, linkName, getDate()) ;
   	}
  
   	//20091209  通过billid参数进行打印
   	function printBPara() {
      	printM(printConfig, linkName, getDate()) ;
   	}
   
    //20100824  通过reportId参数进行打印
   	function printById(reportId) {
      	printRById(printConfig, linkName, reportId) ;
   	}
   
   	//20111203 通过billid参数进行打印 并记录打印日志表，并更新打印次数，打印状态，及打印日期（只记录第一次）
   	function printBParaAsLog(tablename) {
   	  	printBPara() ;
   	  	savePrintLogNoWF(tablename);
   	}
   	
   	// 打印日志 - 不走工作流
	function savePrintLogNoWF(tablename) {
		var url = '<%=basePath%>/bank/DirectPayDaily/print/saveprintlognowf.do';
		var selectRows = tmain.getSelectedRow();
		var pars = 'tablename='+tablename+'&maindata=' + selectRows.toJSON()+'&isCancel=false&vchtypeid=<c:out value="${vchtypeid}"/>';
		show();
		var myAjax = new Ajax.Request(url,
				   	{
						method: 'post',
					   	parameters: pars,
					   	asynchronous :false,
					   	onComplete : afterPrintLog,
						onFailure : function(resp) { 
							closeDiv();   
						 	alert("打印日志记录失败！");
						}
					} 
   				);
	}

	//打印日志后续操作 - 不走工作流
	function afterPrintLog(resp){
		if (resp.responseText == "") {
			closeDiv();  
			return;
		}
    	var json = resp.responseText.evalJSON(true); 
    	if (json.statuCode != null && json.statuCode == 100 && json.warnmsg != null && json.warnmsg != "") {
    		alert(json.warnmsg);
    		closeDiv();  
    	}
    	var apps = json.vous;
    	var selectrows = tmain.getSelectedRow();   
    	for(var i = 0; i < apps.size(); i++) {
    		for(var j = 0; j < selectrows.length; j++){
    			if (apps[i].billid == selectrows[j].billid) {
    				selectrows[j].generalprintcount = apps[i].generalprintcount;
    				selectrows[j].generalprintstatus = apps[i].generalprintstatus;
    				selectrows[j].generalprintstatus_code = apps[i].generalprintstatus_code;
    				selectrows[j].generalprintstatus_name = apps[i].generalprintstatus_name;
    				selectrows[j].generalprinttime = apps[i].generalprinttime;
    			}
    		}
    	}
    	tmain.draw();
  		closeDiv();   
	}
</script>
<%
	out.println("<script>");
	String serialname;
	if (null == (serialname=(String)session.getAttribute("serialname")) || "".equals(serialname))
		serialname = "4eb92380ca95bf7351cf6c7cc435864f94730d00";
	out.println("var serialname = '" + serialname + "';");
	String dataSourceTableName = (null == (dataSourceTableName=(String)request.getAttribute("dataSourceTableName")) 
	        						? "" : dataSourceTableName);
	out.println("var dataSourceTableName = '" + dataSourceTableName + "';");
	out.println("</script>");
%>
<%
	out.println("<script>");
	out.println("col = createColumnConfig();");
	out.println("col.id = \"ltinspectstatus\";");
	out.println("col.name =\"ltinspectstatus\";");
	out.println("col.type =\"S\";");
	out.println("col.title = \"预警标志\";");
	out.println("col.show = function(rownum,value,row,tdobj,datatable){");
	SystemSetBO systemSetBO = (SystemSetBO) ServiceFactory.getBean("fasp.systemset.systemSetBO");
	SystemSetDTO systemSetDTO = (SystemSetDTO) systemSetBO.findSystemSetByCode("ltinspect_bulbtype");
	SystemSetDTO bulbconfig = null;
	try {
		bulbconfig = (SystemSetDTO) systemSetBO.findSystemSetByCode("inspect_bulbconfig");
	} catch (Exception ex) {
	}
	if (bulbconfig == null || "".equals(bulbconfig)) {
	    out.println("if(row['controltypecode'] == null || row['controltypecode'] == '' || row['controltypecode'] == 'null'){");
	    out.println("tdobj.innerHTML = \"<img src='/pay/image/0.gif' alt='通过'/>\";");
	    out.println("}else if(row['controltypecode'] == 0){");
	    out.println("tdobj.innerHTML = \"<img src='/pay/image/0.gif' alt='通过'/>\";");
	    out.println("}else if(row['controltypecode'] == 1){");
	    out.println("tdobj.innerHTML = \"<img src='/pay/image/2.gif' alt='违规'/>\";");
	    out.println("}else if(row['controltypecode'] == 2){");
	    out.println("tdobj.innerHTML = \"<img src='/pay/image/1.gif' alt='存疑'/>\";");
	    out.println("}else if(row['controltypecode'] == 3){");
	    out.println("tdobj.innerHTML = \"<img src='/pay/image/1.gif' alt='提醒'/>\";}");
	} else {
	    String[] configs = bulbconfig.getParamdata().split(";");
	    Map configmap = new HashMap();
	    for(int i = 0; i < configs.length; i++) {
	    	String[] bulbsconfig = configs[i].split(":");
	      	Map bulbmap = new HashMap();
	      	String[] bulbs = bulbsconfig[1].split(",");
	      	for(int j = 0; j < bulbs.length; j++) {
	        	String[] bulb = bulbs[j].split("\\|");
	        	bulbmap.put(bulb[0], bulb[1]);
	      	}
	      	configmap.put(bulbsconfig[0], bulbmap);
	    }
	    out.println("if(row['controltypecode'] == null || row['controltypecode'] == '' || row['controltypecode'] == 'null'){");
    	out.println("tdobj.innerHTML = \"<img src='/pay/image/0.gif' />\";}");
	    String ltinspect_bulbtype = systemSetDTO.getParamdata();
		if ("0".equals(ltinspect_bulbtype)) {
	    	Map map1 = (Map) configmap.get("rulelevel");
	        Iterator it = map1.entrySet().iterator();
	        while (it.hasNext()) {
	        	Map.Entry entry = (Map.Entry)it.next();
	        	out.println("else if(row['controltypecode'] == " + entry.getKey() + "){");
	        	out.println("tdobj.innerHTML = \"<img src='/pay/image/newimage/" + entry.getValue() + "' />\";");
	        	out.println("}");
	     	}
		} else if ("1".equals(ltinspect_bulbtype)) {
	    	Map map2 = (Map)configmap.get("controltype");          
	        Iterator it = map2.entrySet().iterator();
	        while(it.hasNext()){
	        	Map.Entry entry = (Map.Entry)it.next();
	        	out.println("else if(row['controltypecode'] == " + entry.getKey() + "){");
	        	out.println("tdobj.innerHTML = \"<img src='/pay/image/newimage/" + entry.getValue() + "' />\";");
	        	out.println("}");
	        }
		}
	}
	out.println("}");
  	out.println("ColumnConfig[col.id.toLowerCase()]=col;");
  	out.println("</script>");
%>