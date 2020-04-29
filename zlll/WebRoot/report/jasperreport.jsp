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
  String rootPath = request.getContextPath();
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
	String inframe = (String)request.getParameter("inframe");
	String reportcode = (String)request.getParameter("reportcode");
	QuerySchemaSettingDTO settingDTO = (QuerySchemaSettingDTO)request.getAttribute("settingDTO");
	String allcolumns=request.getParameter("allcolumns");
	if(allcolumns==null)
	{
	    allcolumns = "";
	}
%>
<script type="text/javascript" src="<%=rootPath%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=rootPath%>/js/choose.js"></script>
<script type="text/javascript" src="<%=rootPath%>/js/changescroll.js"></script>
<script type="text/javascript" src="<%=rootPath%>/js/calendar.js"></script>
<script src="<%=rootPath%>/js/datatable.js"></script>
<script src="<%=rootPath%>/js/formatNumber.js"></script>
<script src="<%=rootPath%>/js/JQWebTableViewClass.js"></script>
<script type="text/javascript"	src="<%=rootPath%>/js/ua.js"></script>
<script type="text/javascript"	src="<%=rootPath%>/js/ftiens4.js"></script>
<script type="text/javascript">
    var ROOT_PATH = '<%=rootPath%>';
	String.prototype.trim = function(){
		return this.replace(/(^\s*)|(\s*$)/g,"");
	}
</script>
<noscript>
	A tree for site navigation will open here if you enable JavaScript in
	your browser.
</noscript>
<script>
    window.status="Copyright (C) 2008 Longtu Software Co.,Ltd.All rights reserved." 
</script>

<style type="text/css">
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
</style>
<% 
	String styleName ="stylefontS.css";	
		if(session.getAttribute("StyleName")!=null){
		    styleName = (String)session.getAttribute("StyleName");
		}
%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/calendar.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/<%=styleName %>" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
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
    //根据账套动态设置科目的过滤条件
    window.elementfilter = " acctsystypeid = " + obj.valueid;
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
    	    alert("请先选择核算单位!");
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
    obj.valueid = ""; 
 <%}
 }%> 
}
function query(){
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

        
        var str='<%=rootPath%>/jasperreport/queryReport.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&reportid='+'<%=(String)request.getAttribute("reportid")%>'+'<%=hidePara%>';
        
        str = str + getOtherParameters(getParameters());
		document.reportqueryform.action=str;
        document.reportqueryform.submit();
  }
}

//刷新查询
function toPrepareQuery(){
   
        var str='<%=rootPath%>/jasperreport/goToQuery.do?mainmenu=<c:out value="${param.mainmenu}"/>&reportid='+'<%=(String)request.getAttribute("reportid")%>'+'<%=hidePara%>';        
        
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

function getParameters()
{
        var str = "";
        var formElems = document.reportqueryform.getElementsByTagName("INPUT");
		for(var i=0;i<formElems.length;i++){
			var inptObj = formElems.item(i);
			if(inptObj.type == "text"){			    
				if(inptObj.valueid != null){	
				    //alert(inptObj.valueid.lastIndexOf(",")+"="+inptObj.valueid.length);
				    
				    if(inptObj.valueid.lastIndexOf(",")==inptObj.valueid.length-1)
				    {	

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
					    	str =str +"&"+inptObj.name+"="+inptObj.valuecode.substring(0,inptObj.valuecode.length-1);
					    }
					    str =str +"&code_"+inptObj.name+"="+inptObj.valuecode.substring(0,inptObj.valuecode.length-1);
					}else{

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
    String isbudget = (String)request.getSession().getAttribute("isbudget");
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

</script>

<% String dependjs = (String)request.getAttribute("dependjs");%>
<%=dependjs%>
<body class="mainbody" >
    <form name="reportqueryform" id="reportqueryform" action=""
			method="post">
	<div id="query_t">
			<span><span title=" 查询并导出(PDF)" class="query_btn" onclick="query()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">查询并导出(PDF)</a> </span> </span>
			<span><span title="清除条件" class="clear_btn"
				onclick="clearValue()" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
					href="#">清除条件</a> </span> </span>
			<span><span title="隐藏查询条件" class="hidden_btn"
				onclick="doQuery2(this)" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
					href="#">隐藏查询条件</a> </span><span>｜</span> </span>
			<%if(inframe==null || !inframe.equals("1")){%>
			    <span>｜</span>
			    <span><span title="关闭" class="close_btn" onclick="back()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">关闭</a> </span> </span>
			<%}%>
				
			<%
				if (settingDTO!= null && settingDTO.getIsshow() == 1)
			    {
			%>
				    <div>
				    &nbsp;&nbsp;&nbsp;
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
					<button name='schemabutton'  id='schemabutton'  class='main_lookup_input' value=''   onclick='gotoschemasetting()'>方案...</button>
					</div>
			<%
				}
			%>
	</div>
	<div id= "querylist" style="display:block;overflow:hidden">

		
			
		<%if (hasAcctsystype == null){%>
			<input type="hidden" id="acctsystype" name="acctsystype" value="<%=acctsystype%>" valueid="<%=acctsystype%>" />
		<%}%>
		
	   
			<table width="100%" border="0" cellspacing="0" cellpadding="0"  class="main_lookup_input">
				<c:forEach var="queryContrlor" items="${queryContrlors}"
					varStatus="status">
					<c:if test="${status.count %3 == 1}">
						<tr>
					</c:if>
					<td align="left"><font size=2>
						<c:out value="${queryContrlor.labelName}" /></font>
						<c:if test="${queryContrlor.ismustinput == 1}">
						    <font color="red">*</font>
						</c:if>
					</td>
					<td align="left">
						<c:out value="${queryContrlor.htmlContent}" escapeXml="false" />
					</td>
					<c:if test="${status.count %3 == 0}">
						</tr>
					</c:if>
				</c:forEach>


			</table>
		
	</div>
	</form>
	
   <div id="query_t_report" style="height:3px">
   </div>
	
    <%if(showResult != null){
    
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
    %>	
         <%=divStr%>
	        <a style="width:100%">
			<table id="jiuqitable" >
				
			</table>
			</a>
	     </div>
	
	<%}else{%>
	<table align="center" >
		<tr><td>&nbsp;</td></tr>
		<tr><td>&nbsp;</td></tr>
		<tr><td>&nbsp;</td></tr>
		<TR>
	    <TD><font color="#FFCCFF"  size="20">请选择条件进行统计！</font></TD>
      </TR>
      </table>
		<%} %>
			
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

