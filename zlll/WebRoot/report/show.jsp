<%@page language="java" import="java.util.*,"
	contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ page import="com.jiuqi.grid.GridData"%>
<%@ page import="com.jiuqi.ezReport.report.Report"%>
<%@ page import="com.jiuqi.ezReport.report.PrintTemplets"%>
<%@ page import="gov.mof.fasp.ifmis.report.common.dto.HtmlQueryReportDTO"%>
<%@ page import="gov.mof.fasp.ifmis.report.common.dto.QuerySchemaSettingDTO"%>
<%
  //response.setHeader("Cache-Control","no-cache"); 
  //response.setHeader("Pragma","no-cache"); 
  //response.setDateHeader("Expires",0); 
    String dependjs = (String)request.getAttribute("dependjs");
    String submenu = request.getParameter("submenu");
		String mainmenu = request.getParameter("mainmenu");
  String rootPath = request.getContextPath();
	com.jiuqi.ezReport.output.HTMLReportGenerator htmlRptgen = (com.jiuqi.ezReport.output.HTMLReportGenerator) request
			.getAttribute("htmlRptgen");
	GridData gd = (GridData) request.getAttribute("gd");
	String showResult = (String) request.getAttribute("showResult");
	String hidePara = (String) request.getAttribute("hidePara");
	if(hidePara==null){
		hidePara = "";
	}
	Report report = (Report) request.getAttribute("report");
	PrintTemplets items = report.getPrintTemplets();
	String acctsystype = (String)request.getSession().getAttribute("acctsystype");
	if(acctsystype == null)
	{
		acctsystype = "";
	}
	Object hasAcctsystype = request.getAttribute("hasAcctsystype");
	ArrayList hideList = (ArrayList)request.getAttribute("hideList");
	String inframe = (String)request.getParameter("inframe");
	String reportcode = (String)request.getParameter("reportcode");
	
	QuerySchemaSettingDTO settingDTO = (QuerySchemaSettingDTO)request.getAttribute("settingDTO");
	
	String allcolumns=request.getParameter("allcolumns");
	if(allcolumns==null)
	{
	    allcolumns = "";
	}
	String styleName ="stylefontS.css";	
		if(session.getAttribute("StyleName")!=null){
		    styleName = (String)session.getAttribute("StyleName");
		}
		
   String isbudget = (String)request.getSession().getAttribute("isbudget");

	String ifshowtree = request.getAttribute("ifshowtree").toString();
	String elementname = "";
	String elementcode = "";
	String elementvalue = "";
	String treedispaly = "none";
	if(ifshowtree.equals("1")){//要显示树形查询条件
		elementname = request.getAttribute("elementname").toString();
		elementcode = request.getAttribute("elementcode").toString();
		if(request.getAttribute("elementvalue")!=null)
			elementvalue = request.getAttribute("elementvalue").toString();
		treedispaly = "block";
	}
	//组合树是否显示标识 
	String isuniontree = request.getAttribute("isuniontree").toString();
	
	String addremark = (String)request.getAttribute("addremark");
	
%>
<link rel="stylesheet" type="text/css" href="<%=rootPath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=rootPath%>/style/<%=styleName %>" />
<link rel="stylesheet" type="text/css" href="<%=rootPath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<link rel="stylesheet" type="text/css" href="<%=rootPath%>/style/calendar.css"/>
<link type="text/css" rel="stylesheet"	href="<%=rootPath%>/style/jquery.autocomplete.css" />
<script type="text/javascript" src="<%=rootPath%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=rootPath%>/js/jquery-1[1].3.1.js"></script>	
<script type="text/javascript" src="<%=rootPath%>/js/jquery.autocomplete.js"></script>
<script type="text/javascript" src="<%=rootPath%>/ltext/ltext_core.js"></script>
<script type="text/javascript" src="<%=rootPath%>/js/choose.js"></script>
<script type="text/javascript" src="<%=rootPath%>/js/loadOcx.js"></script>

<script>var ROOT_PATH = '<%=rootPath%>';</script>
<script type="text/javascript" src="<%=rootPath%>/js/calendar.js"></script>

<script type="text/javascript"	src="<%=rootPath%>/js/ua.js"></script>
<script type="text/javascript"	src="<%=rootPath%>/js/ftiens4.js"></script>
<script type="text/javascript"	src="<%=rootPath%>/report/MzTreeView12_1.js"></script>
<script type="text/javascript"	src="<%=rootPath%>/report/jsframework.js"></script>
<%=dependjs%>

<script type="text/javascript">
  //系统报表组件是否允许自动安装
 var rptOcxIsAuto ='<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_RPTOCXAUTO%>';
//reportcode为方便报表挂载到业务系统下，项目树过滤条件
var reportcode= "<%=request.getParameter("reportcode")%>";
window.status = "<c:out value="${showstatus}"/>";
var elementcode = '<%=elementcode%>';
var elementvalue = '<%=elementvalue%>';
var ifshowtree = '<%=ifshowtree%>';
function selectElememtByUrl(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,url){
	var selvalue = backinput.value;
	if(elementfilter == "" || elementfilter == null){
		//var elementfilter = "";
		if(window.elementfilter){
			elementfilter = window.elementfilter;
		}else{
			elementfilter = "";
		}
	}else{
		elementfilter = getQueryStr(elementfilter); //wy add 配置界面设置过滤条件
	}
	if("program"==vchfieldcode&&vchtypecode.charAt(0)!='6'){
		//indi_SelectElementTreeForEditWithFieldCTRL(mainmenu,submenu,vchtypecode,vchfieldcode,backinput, null, selvalue, "0", "link", "0", elementfilter, "",true)
		program_selecttree(backinput);
		return;
	}
	//wy add 20090923
	var selvalue = backinput.value;
    /** ganhua 20080304 在打开选择窗口前回调一个方法做某些事情
	  * 如：设置过滤条件，检查联动的其它控件是否选择值
	  * 
	**/
	var func = "callBeforeOpenSingleElementTree_"+vchfieldcode+"(window)";
	var notReturn = true;
    try{
        notReturn = eval(func);
	}catch(e){
		//不成功,不管它,当没有实现该方法
	}
	if(notReturn == false)
	{
		return;
	}
	var elementfilter = "";
	if(window.elementfilter){
		elementfilter = window.elementfilter;
	}
	
	var params = "";
	// 处理只能选择末级
	if(backinput.OnlySelectBottom){
		params += "&onlyselectbottom=true";
	}
	// 处理受控范围限制
	if(backinput.scopelimit){
		var t = eval(backinput.scopelimit);
		if(typeof(t) == "object" && t.objecttype == "datatable"){
		    var selectRows = t.getSelectedRow();
		    if(selectRows.length>0){
		    	var row = selectRows[0];
		    	limitcode = row[vchfieldcode+"_code"];
		    	params += "&limitcode="+limitcode;
		    }
		}
	}
	var refererurl = ""+window.location.href;
	if(url == undefined){
		url = ROOT_PATH+"/common/elementtree.do?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode
			  +"&elementfilter="+elementfilter+"&selvalue="+selvalue
		      +params+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	}else{
		url = ROOT_PATH+url+"?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode
			  +"&elementfilter="+elementfilter+"&selvalue="+selvalue
		      +params+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	}
	//var result = window.showModalDialog(url,window,'dialogHeight:450px;dialogWidth: 320px;resizable: No; status: No;');
	var result = window.showModalDialog(url,window,'dialogHeight:450px;dialogWidth: 320px;resizable: No; status: No; help:No');
	//var result = window.open(url, 'newWindow','dialogWidth=400px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
    //清楚窗体的过滤条件 ganhua 20090509
	if(window.elementfilter);
	{
		window.elementfilter = null;
	}
	// zhangjusuo 20090602 弹出窗口前不存在任何值
	//if(result != null){ //确定： 有选项 ； 取消
		if(result != null){  //取消
			if(typeof(result) =="object"){
				if(backinput == null){
				   backinput = $(vchfieldcode);
				}
				backinput.value = result.value;
				backinput.valueid = result.id;
				backinput.valuecode = result.code;
			}
		}
	//}
	else  //确定： 没有选中选项（没有输入控制）
	{
	    if(backinput != null){
	        backinput.value = "";
		    backinput.valueid = null;
	    } 
	 }
}
    
	String.prototype.trim = function(){
		return this.replace(/(^\s*)|(\s*$)/g,"");
	}
//报表项目树默认为列表级次树	
var programtreetype = "0" ;
</script>
<noscript>
	A tree for site navigation will open here if you enable JavaScript in
	your browser.
</noscript>


<style type="text/css">
      <%
      out.println(htmlRptgen.getCellStyles()); 
      %>
      

#query_t_report {
	width: 97%;
    font-size: 12px;
	margin-bottom: 10px;
	margin-left: 10px;
	margin-right: 10px;
	padding-bottom: 8px;
	padding-top: 10px;
	border-top: #818181 1px solid;
	overflow: hidden;
}

#query_t span.newwindow_btn {
   display:block;
   float:left;
   /*width:14px;*/
   height:20px;
   background-image:url(<%=rootPath%>/images/actions/look.gif);
   background-repeat:no-repeat;
   background-position:left;   
   padding-left:18px;
   padding-right:3px;
}

</style>



<style type="text/css">

a {
	text-decoration: underline;
	color: #0000ff;
}
a:visited {
	color: #0000ff;
	text-decoration: underline;
}

a:active {
	color: #0000ff;
	text-decoration: underline;
}

a:hover {
	color: #0000ff;
	text-decoration: underline;
}



</style>
<script type="text/javascript">
var acctsystypeOldValue="";

//如果有科目多选时,打开窗口之前回调
function callBeforeOpenMultElementTree_account(window)
{
   
    var obj=document.getElementById("acctsystype");
    if(obj)
    {
        if(obj.value == "")
        {
           alert("请先选择账套!");
           obj.focus();
           return false;
        }
    }else{
        alert("还没有定义账套作为查询条件!");
        return false;
    }
    var obj2=document.getElementById("hsagency");
    var hsagencyfilter = "";
    if(obj2&&obj2.valueid){
    	hsagencyfilter = " and (hsagency in ("+obj2.valueid+") or hsagency is null)";
    }
    //根据账套动态设置科目的过滤条件
    window.elementfilter = " acctsystypeid = " + obj.valueid+hsagencyfilter;
    return true;
}

//打开帐套选择框时回调
function callBeforeOpenSingleElementTree_acctsystype(window)
{
    var obj=document.getElementById("acctsystype");
    acctsystypeOldValue = obj.valueid;
    window.elementfilter = " isbudget <> 1 " ;
    return true;
}

//打开核算单位单择框时回调
function callBeforeOpenSingleElementTree_hsagency(window)
{

    var obj=document.getElementById("acctsystype");
    acctsystypeOldValue = obj.valueid;
    if(obj.valueid)
    {
    	window.elementfilter = " itemid in(select hsagency from t_fmacctagency t where t.acctsystypeid="+obj.valueid+") " ;

    }
    return true;
}

//打开核算单位多择框时回调
function callBeforeOpenMultElementTree_hsagency(window)
{

    var obj=document.getElementById("acctsystype");
    acctsystypeOldValue = obj.valueid;
    if(obj.valueid)
    {
    	window.elementfilter = " itemid in(select hsagency from t_fmacctagency t where t.acctsystypeid="+obj.valueid+") " ;

    }
    return true;
}

//关闭弹出选择帐套窗体后调用
function callByElementTreeBeforeClose_acctsystype(iwindow)
{
    
    var acctsystypeNewValue = "";
    if(iwindow.returnValue)
    {
       acctsystypeNewValue = iwindow.returnValue.id;
    }else{
       acctsystypeNewValue = "";
    }
    if(acctsystypeNewValue != acctsystypeOldValue)
    {
    	var obj=document.getElementById("account");
    	obj.value = "";
    	obj.valueid="";
    	obj.valuecode = ""; 	
    }
    
}

//打开自定义科目多择框时回调
function callBeforeOpenMultElementTree_calaccount(window)
{
   
    var where=" 1=1 ";
    var obj=document.getElementById("acctsystype");
    if(obj)
    {
        if(obj.value == "")
        {
           alert("请先选择账套!");
           obj.focus();
           return false;
        }
        
        where += " and acctsystype = " + obj.valueid;
    }else{
        alert("还没有定义账套作为查询条件!");
        return false;
    }

    obj=document.getElementById("hsagency");
    if(obj)
    {   
        if(obj.value && obj.valueid)
        {
    	    where += " and hsagency = " + obj.valueid;
    	}else{
    	    alert("请先选择核算单位!");
            return false; 
    	}
    }
    
    window.elementfilter = where;
    //alert(where);
    return true;
}

//打开自定义部门多择框时回调
function callBeforeOpenMultElementTree_caldepart(window)
{
   
    var where=" 1=1 ";
    var obj=document.getElementById("acctsystype");
    if(obj)
    {
        if(obj.value == "")
        {
           alert("请先选择账套!");
           obj.focus();
           return false;
        }
        
        where += " and acctsystype = " + obj.valueid;
    }else{
        alert("还没有定义账套作为查询条件!");
        return false;
    }

    obj=document.getElementById("hsagency");
    if(obj)
    {   
        if(obj.value && obj.valueid)
        {
    	    where += " and hsagency = " + obj.valueid;
    	}else{
    	    alert("请先选择核算单位!");
            return false; 
    	}
    }
    
    window.elementfilter = where;
    //alert(where);
    return true;
}


//打开自定义项目多择框时回调
function callBeforeOpenMultElementTree_calprogram(window)
{
   
    var where=" 1=1 ";
    var obj;

    obj=document.getElementById("hsagency");
    if(obj)
    {   
        if(obj.value && obj.valueid)
        {
    	    where += " and hsagency = " + obj.valueid;
    	}else{
    	    alert("请先选择核算单位!");
            return false; 
    	}
    }
    
    window.elementfilter = where;
    //alert(where);
    return true;
}

//打开往来单位多择框时回调
function callBeforeOpenMultElementTree_calagency(window)
{
   
    var where=" 1=1 ";
    var obj;

    obj=document.getElementById("hsagency");
    if(obj)
    {   
        if(obj.value && obj.valueid)
        {
    	    where += " and hsagency = " + obj.valueid;
    	}else{
    	    //alert("请先选择核算单位!");
            return false; 
    	}
    }
    
    window.elementfilter = where;
    //alert(where);
    return true;
}

//打开经费拨出多择框时回调
function callBeforeOpenMultElementTree_calpayagency(window)
{
   
    var where=" 1=1 ";
    var obj;

    obj=document.getElementById("hsagency");
    if(obj)
    {   
        if(obj.value && obj.valueid)
        {
    	    where += " and hsagency = " + obj.valueid;
    	}else{
    	    alert("请先选择核算单位!");
            return false; 
    	}
    }
    
    window.elementfilter = where;
    //alert(where);
    return true;
}

function clearValue(){
<%
  List contrlors=(List)request.getAttribute("queryContrlors");
  for(int i=0;i<contrlors.size();i++){
     HtmlQueryReportDTO hqrDTO=(HtmlQueryReportDTO)contrlors.get(i);
     if(hqrDTO.getControlType().intValue()!=2){
     %>
    var obj=document.getElementById('<%=hqrDTO.getLabelId()%>');
    obj.value="";
    //jiazhiyu 2012-08-13解决BUG 45954 清除查询条件时候判断如果没有valueid和valuecode则不赋空值，避免造成产生隐藏参数的时候将日期值清空导致台无法获取.
    if(typeof(obj.valueid) != "undefined"){
    	obj.valueid = "";
    }
    if(typeof(obj.valuecode) != "undefined"){
    	obj.valuecode="";//ganhua 2010-07-26 清除编码，弹出窗口是根据编码来勾选中的
    }
 <%}
 }%> 
}
function query(params){
   var count=0;
   var result;
   //查询controltype为4和5的
<%int countType=0;
  List queryContrlors=(List)request.getAttribute("queryContrlors");
  for(int i=0;i<queryContrlors.size();i++){
     HtmlQueryReportDTO hqrDTO=(HtmlQueryReportDTO)queryContrlors.get(i);
%>
     var obj=document.getElementById('<%=hqrDTO.getLabelId()%>');
<%
     if(hqrDTO.getControlType().intValue()==4){
        countType++;  
%>
     result = checkDate(obj);
     if(result == 0)
     {
        return;
     }
     count=count+result;
<%    
     }else if(hqrDTO.getControlType().intValue()==5){
        countType++;
%>
     result = checkNum(obj);
     if(result == 0)
     {
        return;
     }
     count=count+result;
<%    
     }else if((hqrDTO.getControlType().intValue()==3 || hqrDTO.getControlType().intValue()==6) && hqrDTO.getIsmustinput() == 1 ){
        countType++;
%>     
     result = checkNull(obj,"<%=hqrDTO.getLabelName()%>");
     if(result == 0)
     {
        return;
     }
     count=count+result;
<%
     }
  }
%>
   if(count==<%=countType%>){
        //ganhua 20081110 提交前要转换为id传给报表
        var str='<%=rootPath%>/report/query_result.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&reportid='+'<%=(String)request.getAttribute("reportid")%>'+'&addremark=<c:out value="${param.addremark}"/>'+'<%=hidePara%>';
        if(typeof params!= "undefined")
        	str += "&"+params;
        generateHiddenParameters();
		document.reportqueryform.action=str;
        document.reportqueryform.submit();
        show();
  }
}

function uniontree(){
	 var url='<%=rootPath%>/report/uniontreeconfig.do?mainmenu=<c:out value="${param.mainmenu}"/>&reportid='+'<%=(String)request.getAttribute("reportid")%>';  
	 var top = (screen.height-500)/2;
	 var left = (screen.width-400)/2;
	 window.open(url, '_blank','width=400,height=500,top='+top+',left='+left+',status=no,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no,help:No');
	// window.showModalDialog(url,window,'dialogHeight:500px;dialogWidth: 400px;resizable: No; status: No;help:No;');
}

function openWindow(){
	
	 
	 var str='<%=rootPath%>/report/show_result.do?mainmenu=<c:out value="${param.mainmenu}"/>&reportid='+'<%=(String)request.getAttribute("reportid")%>'+'<%=hidePara%>';        
        
        //str = str + getOtherParameters(getParameters());//不要取其它方案的参数
        
        
        
        str += "&reportcode="+"<%=reportcode%>";
		//处理帐套
		str += "&acctsystype="+"<%=acctsystype%>";
		
		//str += "&inframe="+"<%=inframe%>";
        
        var schemaid ="0";
		if(document.getElementById("schemaid"))
		{
			schemaid = document.getElementById("schemaid").value;
		}
		
		str =str +"&schemaid="+schemaid;
		
		str =str +"&allcolumns=<%=allcolumns%>";
        str = str + "&fromjsp=1";
	 window.open(str, '_blank','width='+screen.width+',height='+screen.height+',top='+0+',left='+0+',status=yes,toolbar=no,menubar=no,directories=no,resizable=yes,Scrollbars=yes,help:No');
}

//刷新查询
function toPrepareQuery(){
   
        var str='<%=rootPath%>/report/show_result.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&reportid='+'<%=(String)request.getAttribute("reportid")%>'+'<%=hidePara%>';        
        
        //str = str + getOtherParameters(getParameters());//不要取其它方案的参数
        
        
        
        str += "&reportcode="+"<%=reportcode%>";
		//处理帐套
		str += "&acctsystype="+"<%=acctsystype%>";
		
		str += "&inframe="+"<%=inframe%>";
        
        var schemaid ="0";
		if(document.getElementById("schemaid"))
		{
			schemaid = document.getElementById("schemaid").value;
		}
		
		str =str +"&schemaid="+schemaid;
		
		str =str +"&allcolumns=<%=allcolumns%>";
        str = str + "&fromjsp=1";
        
        window.location.href = str;
        
		//document.reportqueryform.action=str;
        //document.reportqueryform.submit();
}

function back(){
	window.close();
}
function hasThunderAgent(){
	var d = null;
	try {
		d = new ActiveXObject("ThunderServer.Agent.1");
	} catch (e) {
		try {
			d = new ActiveXObject("ThunderAgent.Agent");
		} catch (e) {
			try {
				d = new ActiveXObject("ThunderAgent.webThunder.1");
			} catch (e) {
				d = null;
			}
		}
	}
	if(d!=null){
	   if(!confirm("你机器安装了讯雷下载软件，下载的文件可能会被共享，请屏蔽讯雷网页监控或者选择[使用IE下载]!是否继续下载?")){
			return "false";  
	   };
       return "&ThunderAgent=ThunderAgent";
	}
	return "";
}
function generateHiddenParameters()
{
        
        var str = "";
        
        //请空隐藏内容
        var divobj=document.getElementById("hidden_para");
        divobj.innerHTML="";
        
        var formElems = document.reportqueryform.getElementsByTagName("INPUT");
		for(var i=0;i<formElems.length;i++){
			var inptObj = formElems.item(i);
			if(inptObj.type == "text"){			    
				if(inptObj.valueid != null){				    			    
				    if(inptObj.valueid.lastIndexOf(",")==inptObj.valueid.length-1)
				    {	//多选

				        if(!inptObj.valuecode)
				        {
				            inptObj.valuecode = inptObj.valueid;
				        }

				        if(inptObj.getvaluetype !=null && inptObj.getvaluetype==0)
				        {	
				            //取id        
					    	str =str +"<input type=hidden name="+inptObj.name+"  value='"+inptObj.valueid.substring(0,inptObj.valueid.length-1)+"' \/>";
					    	str =str +"<input type=hidden name=hidden_"+inptObj.name+"  value='"+inptObj.valueid.substring(0,inptObj.valueid.length-1)+"' \/>";
					    }else{
					        //取code
					    	str =str +"<input type=hidden name="+inptObj.name+"  value='"+inptObj.valuecode+"' \/>";
					    	str =str +"<input type=hidden name=hidden_"+inptObj.name+"  value='"+inptObj.valuecode+"' \/>";
					    }

					    str =str +"<input type=hidden name=code_"+inptObj.name+"  value='"+inptObj.valuecode+"' \/>";
					}else{
                        //单选
					    if(!inptObj.valuecode)
				        {
				            inptObj.valuecode = inptObj.valueid;
				        }

					    if(inptObj.getvaluetype !=null && inptObj.getvaluetype==0)
				        {	        
					    	str =str +"<input type=hidden name="+inptObj.name+"  value='"+inptObj.valueid+"' \/>";
					    	str =str +"<input type=hidden name=hidden_"+inptObj.name+"  value='"+inptObj.valueid+"' \/>";
					    }else{
					    	str =str +"<input type=hidden name="+inptObj.name+"  value='"+inptObj.valuecode+"' \/>";
					    	str =str +"<input type=hidden name=hidden_"+inptObj.name+"  value='"+inptObj.valuecode+"' \/>";
					    }	
					    str =str +"<input type=hidden name=code_"+inptObj.name+"  value='"+inptObj.valuecode+"' \/>";				    
					}
					
					str =str +"<input type=hidden name=show_"+inptObj.name+"  value='"+inptObj.value+"' \/>";
				}else{
				    str =str +"<input type=hidden name="+inptObj.name+"  value='"+inptObj.value+"' \/>";
				    str =str +"<input type=hidden name=hidden_"+inptObj.name+"  value='"+inptObj.value+"' \/>";
				}
			}
		}
		
		
		str += "<input type=hidden name=reportcode value='"+"<%=reportcode%>"+"' \/>";
		//处理帐套
		str += "<input type=hidden name=acctsystype value='"+"<%=acctsystype%>"+"' \/>";
		
		str += "<input type=hidden name=inframe value='"+"<%=inframe%>"+"' \/>";
	
		
		
		var schemaid ="0";
		if(document.getElementById("schemaid"))
		{
			schemaid = document.getElementById("schemaid").value;
		}
		
		str =str +"<input type=hidden name=schemaid value='"+schemaid+"' \/>";
		
		str =str +"<input type=hidden name=allcolumns value='<%=allcolumns%>"+"' \/>";
	    formElems = document.reportqueryform.getElementsByTagName("SELECT");
		for(var i=0;i<formElems.length;i++){
			var inptObj = formElems.item(i);
            str =str +"<input type=hidden name="+inptObj.name+" value='"+inptObj.value+"' \/>";
		}
		
		
		//添加隐藏参数
		divobj.innerHTML=str;
		//alert(divobj.innerHTML);

}


function getParameters()
{
        var str = "";
        var formElems = document.reportqueryform.getElementsByTagName("INPUT");
		for(var i=0;i<formElems.length;i++){
			var inptObj = formElems.item(i);
			if(inptObj.type == "hidden"&&inptObj.className=='hidden'){
				str = str+"&"+inptObj.name+"="+inptObj.value;
			}
			if(inptObj.type == "text"){			    
				if(inptObj.valueid != null){	
				    //alert(inptObj.valueid.lastIndexOf(",")+"="+inptObj.valueid.length);
				    
				    if(inptObj.valueid.lastIndexOf(",")==inptObj.valueid.length-1)
				    {	//多选

				        if(!inptObj.valuecode)
				        {
				            inptObj.valuecode = inptObj.valueid;
				        }

				        if(inptObj.getvaluetype !=null && inptObj.getvaluetype==0)
				        {	
				            //取id        
					    	str =str +"&"+inptObj.name+"="+inptObj.valueid.substring(0,inptObj.valueid.length-1);
					    }else{
					        //取code
					    	str =str +"&"+inptObj.name+"="+inptObj.valuecode;
					    }
					    str =str +"&code_"+inptObj.name+"="+inptObj.valuecode;
					}else{
                        //单选
					    if(!inptObj.valuecode)
				        {
				            inptObj.valuecode = inptObj.valueid;
				        }

					    if(inptObj.getvaluetype !=null && inptObj.getvaluetype==0)
				        {	        
					    	str =str +"&"+inptObj.name+"="+inptObj.valueid;
					    }else{
					    	str =str +"&"+inptObj.name+"="+inptObj.valuecode;
					    }	
					    str =str +"&code_"+inptObj.name+"="+inptObj.valuecode;				    
					}
					
					str =str +"&show_"+inptObj.name+"="+inptObj.value;
				}else{
				    str =str +"&"+inptObj.name+"="+inptObj.value;
				}
			}
		}
		
		
		str += "&reportcode="+"<%=reportcode%>";
		//处理帐套
		str += "&acctsystype="+"<%=acctsystype%>";
		
		str += "&inframe="+"<%=inframe%>";
	
		
		
		var schemaid ="0";
		if(document.getElementById("schemaid"))
		{
			schemaid = document.getElementById("schemaid").value;
		}
		
		str =str +"&schemaid="+schemaid;
		
		str =str +"&allcolumns=<%=allcolumns%>";
		
<%	
    
	if(isbudget!=null && isbudget.equals("0"))
	{
%>
		str =str +'&hsagency='+'<%=(String) request.getSession().getAttribute("hsagency")%>';            		
<%
	}
%>
		
		return str;
}
function getOtherParameters(str)
{

		var formElems = document.reportqueryform.getElementsByTagName("SELECT");
		for(var i=0;i<formElems.length;i++){
			var inptObj = formElems.item(i);
            str =str +"&"+inptObj.name+"="+inptObj.value;
		}
		
		return str;
}
function print(){
	<% if(hideList.size()>0){
		String hideCondition = ((HtmlQueryReportDTO)hideList.get(0)).getLabelName();
	 %>
	 	var values = $('<%=hideCondition%>').value;
	 	if(values==undefined)
	 		values = "";
		var hidstr = window.showModalDialog("remark.jsp?value="+values,window,'dialogHeight:300px;dialogWidth: 400px;resizable: No; status: No;help:No;');
		//先暂时只支持输入一个值
		if(hidstr==undefined)
		return;
		$('<%=hideCondition%>').value=hidstr;
		<%}%>
        var url='<%=rootPath%>/report/print.do?mainmenu=<c:out value="${param.mainmenu}"/>&reportid='+'<%=(String)request.getAttribute("reportid")%>'+'<%=hidePara%>';
            
            var pars="";
            pars = pars + getOtherParameters(getParameters());

            var selectPrintTemplateUrl='<%=rootPath%>/report/selectPrintTemplate.do?mainmenu=<c:out value="${param.mainmenu}"/>&reportid='+'<%=(String)request.getAttribute("reportid")%>';
            
		    if(<%=items.size() == 0%>) {
		    	 //alert("11");
		         //actionFrm.location = pars;
		    } else {
		    	  //alert("22");
		        var ret = window.showModalDialog(selectPrintTemplateUrl,parent,"dialogWidth:400px;dialogHeight:300px;scroll:0;resizable:1;status:0;help:0;center:1");
		        //alert(ret);
		        if(ret != null) {
		          if(ret[0] == -1) {
		             //actionFrm.location = pars;
		          } else {
		             pars = pars+"&printTemplet="+ret[0]+"&printView="+ret[1];
		          } 
		        }
		  	}
		  	
		  	var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: pars,
						   	 onComplete: function (resp){						   	    
						   	    var json = eval("("+resp.responseText+")");                             
								var WebPrinter = Ext.lt.ifmis.activex.loadJQReportOcx();
								if(json.templetIndex ==""){
									WebPrinter.Preview(json.griddata);
								}else{	
								    if(json.useCWPage=="true")
								    {						
										WebPrinter.UseCWPage = true;
									}else{
									    WebPrinter.UseCWPage = false;
									}

									if(json.msgCols!=null)
									{								
										WebPrinter.CWMsgCol = json.msgCols;
									}
									if(json.sumCols!=null)
									{
										WebPrinter.CWSumCols =json.sumCols;
									}

									if(json.copyCols!=null)
									{
										WebPrinter.CWCopyCols =json.copyCols;
									}
									WebPrinter.PreviewEx(json.griddata,json.templetdata);
								}			 					   	 	
							 },
						   	 onFailure : function(resp){
						   	 	alert("打印失败！");
						   	 },
						   	 asynchronous: true
					    }  
			);

}
//报表超链接页面导出时把url中条件拼上
var urlCondtion = window.parent.location.search;
urlCondtion = urlCondtion.substring(1,urlCondtion.length);
function exportExcel(){
	var agent = hasThunderAgent();
	if(agent=="false")return;
	var url='<%=rootPath%>/report/exportExcel_result.do?mainmenu=<c:out value="${param.mainmenu}"/>&reportid='+'<%=(String)request.getAttribute("reportid")%>'+'<%=hidePara%>'+agent;
	if(elementcode && elementvalue){
		url +=  "&"+elementcode+"="+elementvalue;
	}
	if(urlCondtion){
		url += "&"+urlCondtion;
	}
	generateHiddenParameters();
	document.reportqueryform.action=url;
	document.reportqueryform.submit();
	document.getElementById("hidden_para").innerHTML="";
}
function exportDBF(){
	var agent = hasThunderAgent();
	if(agent=="false")return;
	var url='<%=rootPath%>/report/exportDBF.do?mainmenu=<c:out value="${param.mainmenu}"/>&reportid='+'<%=(String)request.getAttribute("reportid")%>'+'<%=hidePara%>'+agent;
	if(elementcode && elementvalue){
		url +=  "&"+elementcode+"="+elementvalue;
	}
	generateHiddenParameters();
	document.reportqueryform.action=url;
	document.reportqueryform.submit();
	document.getElementById("hidden_para").innerHTML="";
}
</script>
<script type="text/javascript">
       function checkDate(obj){
           var str=obj.value;
           if(str==null||str==""){
             return 1;
           }else{
            var r = str.match(/^(\d{1,4})-(\d{1,2})-(\d{1,2})$/);
           if(!(r==null)){
             return 1;       
           }else{
             alert("您输入的日期格式不对,请输入正确的格式!(例如:2008-08-08)");
             obj.focus();
             return 0;
           }
          }   
       }
       function checkNum(obj){
         var str=obj.value;
         if(str==null){
             return 1;
           }
         if(isNaN(str)){
           alert("您输入值不能含有字符,请输入正确的值!");
           obj.focus();
           return 0;
         }else{
           return 1;
         }
       }
       function checkNull(obj,objName){
         var str=obj.value;
         if(str == null || str == ""){
           alert(objName+"不能为空!");
           obj.focus();
           return 0;
         }else{
           return 1;
         }
       }
</script>
<script type="text/javascript">
       function onwinload(){
               if(typeof(testdiv)=="undefined") return;
               if(testdiv==null) return;
               //window.cobj=new JiuQiWebTableView(testdiv,"","<%=request.getContextPath()%>/images/jiuqi");//实例化WEBGRID对象
               window.cobj=new JiuQiWebTableView(testdiv);//实例化WEBGRID对象
               cobj.lockColHead=<%=gd.getScrollTopCol()%>;//设置锁定列数
               cobj.lockRowHead=<%=gd.getScrollTopRow()%>;//设置锁定行数
               cobj.attachOverTable(jiuqitable);//附加现成表
               cobj.mainTableHome.isReadOnly=true;//设置它只读
               cobj.mainTableHome.createLockTableHead();
               cobj.setDesignMode(false);//设置非设计模式
       }
</script>
<script type="text/javascript">
	function gotoschemasetting(){
		var url='<%=rootPath%>/report/schemasetting.do';
		<% 
			if (settingDTO!= null && settingDTO.getIsshow() == 1 
			&& settingDTO.getLinkurl() != null )
		    {
		%>
		url = '<%=settingDTO.getLinkurl()%>';
		<%  }  %>
		url = url + '?reportid='+'<%=(String)request.getAttribute("reportid")%>'+'<%=hidePara%>';;
		window.showModalDialog(url,window,'dialogHeight:600px;dialogWidth: 800px;resizable: No; status: No;help:No;');
	}
function doQuery2(queryButton) {
    var querydiv = document.getElementById("querylist");
    if (querydiv.style.display == "block") {
        querydiv.style.display = "none";
        queryButton.innerHTML = "显示查询条件";
        queryButton.title = '显示查询条件';
		queryButton.style.backgroundImage='url(/images/done_btn/visible.gif)';
    } else {
        querydiv.style.display = "block";
        queryButton.innerHTML = "隐藏查询条件";
        queryButton.title = '隐藏查询条件';
		queryButton.style.backgroundImage='url(/images/done_btn/hidden_query.gif)';
    }
}
</script>
<style> 
.resizeDivClass 
{ 
position:relative; 
background-color:#CCCCCC; 
width:2; 
z-index:1; 
left:expression(this.parentElement.offsetWidth-1); 
cursor:e-resize; 
} 
</style> 
<script language=javascript> 
function MouseDownToResize(obj){
    obj.mouseDownX=event.clientX; 
    obj.pareneTdW=obj.parentElement.offsetWidth; 
    obj.pareneTableW=theObjTable.offsetWidth; 
    obj.setCapture(); 
} 
function MouseMoveToResize(obj){ 
    if(!obj.mouseDownX) return false; 
    var newWidth=obj.pareneTdW*1+event.clientX*1-obj.mouseDownX; 
    if(newWidth<380&&newWidth>200){ 
        obj.parentElement.style.width = newWidth; 
        obj.style.width=newWidth;
        $('main_tree').style.width=newWidth;
    } 
} 
function MouseUpToResize(obj){ 
    obj.releaseCapture(); 
    obj.mouseDownX=0; 
} 
</script> 

<head>
</head>
<body class="mainbody" >
    <form name="reportqueryform" id="reportqueryform" action=""
			method="post" >
	<%	
    
	if(isbudget!=null && isbudget.equals("0"))
	{
%>
		<input type=hidden name=hsagency value='<%=(String) request.getSession().getAttribute("hsagency")%>' valueid='<%=(String) request.getSession().getAttribute("hsagency")%>' />            		
<%
	}
%>
	<!--隐藏的属性,每次查询前该区域的隐藏参数都要清楚掉重新构造，一般的隐藏参数不要放在其区域-->
	<div id="hidden_para" style="display:none;">
	    <input name='mytest' type='hidden' value='1'/> 
	</div>
	<input type="hidden" name="reportid" valueid="<%=(String)request.getAttribute("reportid") %>" /><!-- 报表id将来可能成为逻辑表的数据项 -->
	
	<div id="query_t">
			<span><span title="查询" class="query_btn" onclick="query()" style="cursor:hand;"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)">查询</span> </span>
			<span><span title="清除条件" class="clear_btn" style="cursor:hand;"
				onclick="clearValue()" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"> 
				清除条件</span> </span>
			<span><span title="隐藏条件" class="hidden_btn" style="cursor:hand;"
				onclick="doQuery2(this)" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)">
				隐藏条件</span></span><span>｜</span> 
			<%if(isuniontree.equals("1")){%>
			<span><span title="组合树" class="personnelView_btn" style="cursor:hand;"
				onclick="uniontree(this)" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)">
				组合树</span></span><span>｜</span> 	
			<%}%>
			<span><span title="导出Excel" class="Excel_btn" style="cursor:hand;"
				onclick="exportExcel()" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)">导出Excel</span> </span><span>｜</span>
		    <span><span title="导出DBF" class="Excel_btn" style="cursor:hand;"
				onclick="exportDBF()" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)">导出DBF</span> </span><span>｜</span>
			<%if("true".equals(addremark)){%>
			<span><span title="添加备注" class="mod_btn" style="cursor:hand;"
				onclick="addDescription()" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)">添加备注</span> </span><span>｜</span>
			<%}%>
			<span><span title="打印" class="print_btn" onclick="print()" style="cursor:hand;"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)">打印</span></span>
				<span>｜</span>
			
			<span><span title="新窗口" class="newwindow_btn" onclick="openWindow()" style="cursor:hand;"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)">新窗口</span>
			</span>
			 <%  if(inframe==null || !inframe.equals("1")){ %>
			    <span>｜</span>
			    <span><span title="关闭" class="close_btn" onclick="back()" style="cursor:hand;"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)">关闭</span> </span>
			<%}  %>
				
			<%
				if (settingDTO!= null && settingDTO.getIsshow() == 1)
			    {
			%>
				    <div>
					<select id="schemaid" name="schemaid" onchange="toPrepareQuery();">
					    <option value="0">默认查询方案</option>					    
						<c:forEach var="schema" items="${schemas}" varStatus="status">
						    <option value="<c:out value="${schema.schemaid}" />">
						            <c:if test="${schemaid != null && schema.schemaid== schemaid }">
						                selected="selected"
						            </c:if>
						            <c:if test="${schemaid == null}">
								        <c:if test="${schema.isdefault == 1}">
								               selected="selected"
								        </c:if>	
							        </c:if>
						            	
						       <c:out value="${schema.schemaname}" />
						    </option>
						</c:forEach>
					</select>
					<button name='schemabutton'  id='schemabutton'  class='main_lookup_input' value='...'   onclick='gotoschemasetting()'>...</button>
					</div>
			<%
				}
			%>
			<% if(request.getAttribute("menuFunction")!=null){
					out.print(request.getAttribute("menuFunction"));
				}
			 %>
	</div>
	<ui:menufunction divid="query_report"></ui:menufunction>	
	<div id= "querylist" style="display:block;">
		<%if (hasAcctsystype == null){%>
			<input type="hidden" id="acctsystype" name="acctsystype" value="<%=acctsystype%>" valueid="<%=acctsystype%>" />
		<%}%>
			<table width="97%" border="0" cellspacing="0" cellpadding="0"  >
				<c:forEach var="queryContrlor" items="${queryContrlors}"
					varStatus="status">
					<c:if test="${status.count %3 == 1}">
						<tr>
					</c:if>
					<td nowrap="nowrap" align="left"><font style="font-size:14px;">
						<c:out value="${queryContrlor.labelName}" /></font>
						<c:if test="${queryContrlor.ismustinput == 1}">
						    <font color="red">*</font>
						</c:if>
					</td>
					<td  nowrap="nowrap" align="left">
						<c:out value="${queryContrlor.htmlContent}" escapeXml="false" />
					</td>
					<c:if test="${status.count %3 == 0}">
						</tr>
					</c:if>
				</c:forEach>
			</table>
		<% for(int i=0;i<hideList.size();i++){
			HtmlQueryReportDTO hidCondition = (HtmlQueryReportDTO)hideList.get(i);
		 %>
		 <%=hidCondition.getHtmlContent() %>
		 <%} %>
	</div>
	
	</form>
	
   <div id="query_t_report" style="height:3px;">
   </div>
   <% if(ifshowtree.equals("1")){ %>
	<div >
		<table id=theObjTable STYLE="table-layout:fixed" border="0px"  > 
			<tr>
				<td id='treetd' width="202px" valign="top" style='display: <%=treedispaly %>'  >
					<div id="form_table_title" 
						onmousedown="MouseDownToResize(this);" onmousemove="MouseMoveToResize(this);" onmouseup="MouseUpToResize(this); " 
					 	style="white-space:nowrap;width:202px;position: relative;float: left;margin-left:0px;cursor:e-resize;z-index: 1;">
						<ul>
								<li class="top">
									<div><%=elementname %>树</div>
								</li>
								<li style="background:url(../ifmis_images/actions/resize.gif) no-repeat right center;float:right;width:20px; height:23px;">
								</li>
						</ul>
					</div>
					<%if(!isuniontree.equals("1")){%>
					<div id="pop_search" style="padding-bottom: 2px ;border-left:1px #8BA3DA solid;">
						<input id="searchcontent" type="text" class="popPage_input" style="width:135px"  onpropertychange="clearCodes()"  onkeydown="javascript:if(window.event.keyCode==13){search()}"/>
						<input id="searchbutton" type="button" onclick="javascript:search()" value="查询" class="button_style" style="width:40px" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
					</div>
					<%} %>
					<div id="main_tree" style="width：200px;  float:left;white-space:nowrap;height: 550px; overflow: scroll; border: #8BA3DA 1px solid;z-index: 999;cursor:inherit">
				   	</div>
				</td>
				<%if(showResult != null){%>
				<td id='datatd' width="*" valign="top" style="overflow: auto;" >
				<div style="overflow: auto;">
				    <a style="width:97%">
						<table id="jiuqitable"
							width='<%=htmlRptgen.getTableWidth()%>'
							height='<%=htmlRptgen.getTableHeight()%>' border=0
							cellspacing=1  
							class='<%=gd.getDataClass()%>'>
							<%=htmlRptgen.generate()%>
						</table>
					</a>
				</td>
				<%}else{ %>
				<td id='datatd' width="*" valign="top" >&nbsp;</td>
				<%} %>
				</div>
			</tr>
		</table>
	  </div> <%}else{ 
	   if(showResult != null){
	   String divStr="";
         if(hidePara.equals(""))
         {
	         if(inframe!=null && inframe.equals("1"))
	         {
	            divStr="<div align='left' id='testdiv1' style='margin-left:10px;'>"; 	            
	         }else{
	            divStr="<div align='left' id='testdiv1' style='margin-left:10px;width:expression(document.body.offsetWidth-document.body.leftMargin-document.body.rightMargin-10);height:expression(parseInt(document.body.offsetHeight)-parseInt(document.body.topMargin)-parseInt(document.body.bottomMargin)-150);overflow:auto'>";
	         }            
         }else{
             if(inframe!=null && inframe.equals("1"))
	         {
	            divStr="<div align='left' id='testdiv1' style='margin-left:10px;'>"; 
	         }else{
	            divStr="<div align='left' id='testdiv1' style='margin-left:10px;width:expression(document.body.offsetWidth-document.body.leftMargin-document.body.rightMargin-10);height:expression(parseInt(document.body.offsetHeight)-parseInt(document.body.topMargin)-parseInt(document.body.bottomMargin)-50);overflow:auto'>";
	            
	         }             
         }
	 
	 %> <%=divStr%>
	        <a style="width:97%">
			<table id="jiuqitable"
				width='<%=htmlRptgen.getTableWidth()%>'
				height='<%=htmlRptgen.getTableHeight()%>' border=0
				cellspacing=1  
				class='<%=gd.getDataClass()%>'>
				<%=htmlRptgen.generate()%>
			</table>
			</a>
	     </div>
	<%}else{%>
	 <table align="center" >
				<tr><td>&nbsp;</td></tr>
				<tr><td>&nbsp;</td></tr>
				<tr><td>&nbsp;</td></tr>
				<TR>
			    <TD><div id="unQueryInfo" sytle="height:300"><font color="#FFCCFF"  size="20">请选择条件进行统计！</font></div></TD>
		        </TR>
		        <tr style="height:300px"><td style="height:300px">&nbsp;</td></tr>

		      </table>
	<%}} %>
    <div>
	    <table>
	            <tr height=1 style="display:none">
				<td>
					<IFrame name="actionFrm">
					</IFrame>
				</td>
	            </tr>
	    </table>
    </div>
</body>

<script type="text/javascript">
<!--
/*
function show(){
	var sel = document.getElementsByTagName("select");
	for(i=0;i<sel.length;i++){
		sel[i].disabled=true;
	}
    var d_mask=document.getElementById('mask');
    var d_dialog = document.getElementById('LoadStatus'); 
    d_mask.style.width = document.body.offsetWidth -20 ;
    d_mask.style.height=document.body.offsetHeight-20; 
    d_dialog.style.top = 250;
    d_dialog.style.left =document.body.clientWidth / 2 -175;
    d_mask.style.visibility='visible';
    d_dialog.style.visibility='visible';
 	d_dialog.style.display='block';
}*/
//-->
</script>
<script language="javascript" type="text/javascript">
try{
	var maindata={};
	maindata["-1_account"] = "text:<%=elementname%>;";
	<%
	java.util.List l1 = null;
	if(ifshowtree.equals("1"))
		l1  =(java.util.List) request.getAttribute("ELEMENTDATA");
	if(l1!=null){
	for (int i = 0; i < l1.size(); i++) {
		Map map=(Map)l1.get(i);
	%>
	if("<%=map.get("superitemid")%>"=="0"){
		maindata["account_<%=map.get("itemid")%>"] = "text:<%=map.get("code")%>-<%=map.get("name")%>;url:javascript:changefunccat(\"<%=map.get("itemid")%>\");"
	}else{
		maindata["<%=map.get("superitemid")%>_<%=map.get("itemid")%>"] = "text:<%=map.get("code")%>-<%=map.get("name")%>;url:javascript:changefunccat(\"<%=map.get("itemid")%>\");"
	}
	<%
		}
	}
	//System.out.println("alert(1);");
	String uniontreejson = (String) request.getAttribute("uniontreejson");
	if(uniontreejson!=null){
		out.println("maindata[\"-1_0\"] = \"text:组合导航树;\";");
		out.println("maindata = "+uniontreejson+";");
	}
	%>
 <% if(ifshowtree.equals("1")){ %>
	window.onload = function(){
		Using("System.Web.UI.WebControls.MzTreeView");
		maintree = new MzTreeView();
		maintree.dataSource = maindata;
		maintree.autoSort=false;
		maintree.useCheckbox=false;
		maintree.canOperate=true;
		$("main_tree").innerHTML=maintree.render();
		maintree.expandLevel(1);
		$('main_tree').style.width='200px';
	}
 <% } %>
 }catch(e){}
//左侧树查询方法
function changefunccat(id){
	var params = "";
	if(typeof id!= "undefined" &&typeof elementcode!= "undefined")
       params = elementcode+"="+id;
 	query(params);
}

function uniontreenodeclick(params){
	query(params);
}
//配置功能按钮信息
JQ(function($){
	if($("#query_report").length>0){
		$("#query_report").hide();
		$("#query_t").append($("#query_report").html());
	}
	var schemaid=<%=request.getParameter("schemaid")%>;
	if(schemaid){
		JQ("#schemaid").val(schemaid);
	}
});
function addDescription(){
	if(JQ("#unQueryInfo").length>0){
		alert("请先进行报表查询，再添加备注。");
		return;
	}
	var reportid="<%=(String)request.getAttribute("reportid") %>";
	var description = JQ.ajax({
			type:"post",
			url: "/report/editrptdescription.do",
			data: "methodtype=query&reportid="+reportid,
			async: false
		}).responseText;
	description = window.showModalDialog("remark.jsp",description,'dialogHeight:300px;dialogWidth: 400px;resizable: No; status: No;help:No;');
	if(typeof description=="undefined"){
		return;
	}
	var info=JQ.ajax({
			type:"post",
			url: "/report/editrptdescription.do",
			data: "methodtype=save&reportid="+reportid+"&description="+description,
			async: false
		}).responseText;
	alert(info);
}
</script>








