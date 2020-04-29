<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ page import="gov.mof.fasp.ifmis.common.Globals"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<jsp:directive.page import="gov.mof.fasp.ifmis.system.configspace.ConfigElement" />
<%
    ConfigElement configElement = (ConfigElement) request.getAttribute("UIConfigElement");
	String amtflag = "1";
	String linkname = "";
	if(configElement!=null){
	        if(null!=configElement.get("amtFlag")){
		    amtflag = configElement.get("amtFlag").toString();	        
	        }
	        if(null!=configElement.get("LINKNAME")){
		    linkname = configElement.get("LINKNAME").toString();
		}
	}
	if (request.getSession().getAttribute("amtunit") != null) {
		amtflag = (String) request.getSession().getAttribute("amtunit");
		request.getSession().removeAttribute("amtunit");
		request.getSession().setAttribute(linkname + "_amtunit", amtflag);
	} else if (configElement!=null&&request.getSession().getAttribute(
			linkname + "_amtunit") != null) {
		amtflag = (String) request.getSession().getAttribute(linkname + "_amtunit");
	}
	boolean issetunit = false;
	if(configElement!=null&&configElement.get("vouchTypeCode")!=null){
		String vouchTypeCode = configElement.get("vouchTypeCode").toString();
		if(vouchTypeCode.length()==4&&vouchTypeCode.startsWith("1")) issetunit = true;
	}
 	String amtunit = amtflag;
 	java.util.Map amtunitM = new java.util.HashMap();
 	if(amtunit!=null){
 	 	amtunitM.put(amtunit,"checked");
 	}
 	request.setAttribute("amtunitM", amtunitM);	
 	//0：平台名称；1:标题栏显示路径2标题栏显示年度、地区、路径
 	String titlename=(String)request.getSession().getAttribute("titlename");
	//地区的名称
	String titleArea = "";
	//年度
	String titleYear = (String)session.getAttribute("loginacctyear");
	java.util.Map areamap=new java.util.HashMap();
	if(null!=session.getAttribute("loginAreaInfor") && !session.getAttribute("loginAreaInfor").equals("")){
	    areamap=(java.util.Map)session.getAttribute("loginAreaInfor");
		if(areamap.containsKey("area_name")){
			titleArea=areamap.get("area_name")!=null?areamap.get("area_name").toString():"";
		}
	}
%>
    <div id="your_position">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="591"> 您的位置 <c:forEach var="menu"  items="${navigations}" >  &gt;&gt; <c:out value="${menu.name}"/></c:forEach> </td>
          <input id="hidemenuid" type='hidden' value='<c:forEach   var="menu"  items="${navigations}" begin="0" end="1"  >  &gt;&gt; <c:out value="${menu.name}"/></c:forEach>'/>
		  <input id="wholelocation" type='hidden' value='<c:forEach   var="menu"  items="${navigations}" >  &gt;&gt; <c:out value="${menu.name}"/></c:forEach>'/>
		  <td nowrap="nowrap" align="center" valign="middle">
		  <%if(issetunit){%>
		  单位:<span id="zero">	
		  <label for="u_y"><input type="radio" id="u_y" name="amtunit" onclick="saveAmtUnit()" value="1" <c:out value="${amtunitM['1']}"/>/>元</label>
		  <label for="u_h"><input type="radio" id="u_h" name="amtunit" onclick="saveAmtUnit()" value="10000" <c:out value="${amtunitM['10000']}"/>/>万元</label>
		  </span>
		  <%}%>
		  </td>
          <td align="right" valign="middle" class="navigation_right" nowrap="nowrap"></td>
          <td align="right" valign="middle" class="navigation_right_end" onclick="doHiddenAll()"><a title="全屏或还原"><img id="full_screen_img" src="<%=request.getContextPath() %>/images/actions/view-fullscreen.png" /></a></td>
          <td id="full_screen_text" align="left" valign="middle" class="navigation_right_end1" onclick="doHiddenAll()">全屏</td>
          <td align="right" valign="middle" class="navigation_right_end2"><ui:commonConfig/></td>
        </tr>
      </table>
    </div>
	<SCRIPT LANGUAGE="JavaScript">
	var titlename='<%=titlename%>';
	var titleArea='<%=titleArea%>';
	if(titlename=='1'){
		var temp=document.getElementById('hidemenuid').value.substring(5);
		document.title=temp;
	}else if(titlename=='2'&&titleArea!=""){
		var temp=document.getElementById('wholelocation').value.substring(5);
   		document.title="地区：<%=titleArea%> 年度：<%=titleYear%> 位置："+temp;
   	}
	<!--

		function saveAmtUnit(){
			if(!confirm("变更金额单位将刷新页面，所录入的相关内容将丢失，确定继续吗？")){
				if("1"=="<%=amtunit%>"){
					document.getElementById("u_y").checked = true;
				}else{
					document.getElementById("u_h").checked = true;
				}
				window.event.cancelBubble = true;
				window.event.returnValue  = false;
				return;
			}
			var oRadios = $("zero").getElementsByTagName("INPUT");
			var param = "";
			for(var i = 0; i<oRadios.length; i++){
			  if(oRadios[i].checked){
					param = "amtunit="+oRadios[i].value;
			  }
			}
			if(param==""){
				alert("请选择金额单位!");
				return;
			}
			new Ajax.Request(
				ROOT_PATH+"/common/setFontSession.do",
				{method: 'post', parameters: param, onComplete: reloadUrl,onFailure : function(resp) { 
										closediv();
									 	alert("设置金额单位失败！");
									 }}
				);
		}
		function reloadUrl(){
			location.reload(true);
		}
	//-->
   </script>