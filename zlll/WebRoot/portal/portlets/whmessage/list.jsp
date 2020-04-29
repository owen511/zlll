<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
    String path = request.getContextPath();
			String basePath = request.getScheme() + "://"
					+ request.getServerName() + ":" + request.getServerPort()
					+ path;
			String code = "";
			String aimsareaid = "";
			String aimsarea = "";
			String currentPage = request.getAttribute("currentPage") + "";
			if (null != request.getAttribute("aimsarea")
					&& !request.getAttribute("aimsarea").equals("")) {
				aimsarea = request.getAttribute("aimsarea") + "";
			}
			if (null != request.getAttribute("aimsareaid")
					&& !request.getAttribute("aimsareaid").equals("")) {
				aimsareaid = request.getAttribute("aimsareaid") + "";
			}
			if (null != request.getAttribute("code")
					&& !request.getAttribute("code").equals("")) {
				code = request.getAttribute("code") + "";
			}
%>
<div id='query_t'>
	<span><span title=查询 class=query_btn onclick=query()
		onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>查询</a>
	</span>
	</span>
	<span><span title=清除查询条件 class=clear_btn
		onclick="clearAll();" onmouseover=doChangBg(this)
		onmouseout=doReturn(this)><a href=#>清除查询条件</a>
	</span>
	</span>
	<span><span title=隐藏查询条件 class=hidden_btn onclick=doQuery2(this)
		onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>隐藏查询条件</a>
	</span>
	</span><span><span>｜</span>
	</span>
	<span><span title=新增 class=add_btn onclick=add()
		onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>新增</a>
	</span>
	</span>
	<span><span title=修改 class=mod_btn onclick=mod()
		onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>修改</a>
	</span>
	</span>
	<span><span title=删除 class=del_btn onclick=del()
		onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>删除</a>
	</span>
	</span><span><span>｜</span>
	</span>

</div>

<form name="form1" id="form1" action="" method="post">
	<div id=querylist style='display: block;'>
		<table width=97% border=0 cellspacing=0 cellpadding=0>
			<tr>
				<td>
					消息内容
				</td>
				<td>
					<input type="text" class="inputst" style="width: 150px;"
						id="contents" name="contents" value="" />
				</td>
				<td>
					&nbsp;&nbsp;消息所属用户组
				</td>
				<td>
					<input type="text" id="gcodesnames" name="gcodesnames"
						onclick="clickOn();" value="" style="width: 150px;" />
					<button style='margin-left: 1px;' onclick='clickOn();'></button>
					<img align=middle
						src='<%=basePath%>/images/done_btn/clear_qry2.gif'
						onclick="clearinput();" />
					<input type="hidden" id="gcodes" name="gcodes" value="" />
				</td>
				<td>
					&nbsp;&nbsp;消息所属日期
				</td>
				<td>
					<input type="text" class="inputst" id="starttimes"
						name="starttimes"
						onclick="return showCalendar('starttimes', '%Y-%m-%d', null, true);"
						readonly value="" style="width: 100px;" />
					<img src="/images/calendar/date.gif" alt="选择日期"
						onclick="return showCalendar('starttimes', '%Y-%m-%d', null, true);"
						style="cursor: hand; border: 0; position: relative; top: 5px; *top: 3px;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
					至
					<input type="text" id="endtimes" name="endtimes" class="inputst"
						onclick="return showCalendar('endtimes', '%Y-%m-%d', null, true);"
						readonly value="" style="width: 100px;" />
					<img src="/images/calendar/date.gif" alt="选择日期"
						onclick="return showCalendar('endtimes', '%Y-%m-%d', null, true);"
						style="cursor: hand; border: 0; position: relative; top: 5px; *top: 3px;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
			</tr>
		</table>
	</div>
</form>
<form id="queryform"
	action="<%=request.getContextPath()%>/portal/message/messagequery.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<ui:queryform formid="queryform" />
</form>
<div>
<ui:menufunction divid="query_t"></ui:menufunction>
	<form name="mainListForm" id="mainListForm" action="#" method="post">
		<input name="selectedbillids" id="selectedbillids" type="hidden"
			value="">

		<!--请保留此div和a标签 -->
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						消息查询
					</div>
				</li>
				<li>
					<ui:row2column dataid="tmain" showdivname="edit_table"
						columnNum="4" />
				</li>
			</ul>
		</div>
		<div id='edit_table' style='display: none; padding: 0; margin: 0;'></div>
		<div id="containerline20" style="display: block;">
			<ui:datatable columndefine="true" id="tmain" tabletype="MainList"
				data="json" showcheckbox="true" />
		</div>
	</form>
</div>
<form id="queryform"
	action="<%=request.getContextPath()%>/portal/message/messagequery.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	
</form>
<script type="text/javascript">
function query(){
    var mainmenu='<%=request.getParameter("mainmenu")%>';
        var submenu= <%=request.getParameter("submenu")%>;
    var formObject = $("form1");
    if(trim($('endtimes').value)!=''&&trim($('starttimes').value)!=''){        
        if(trim($('starttimes').value)>trim($('endtimes').value)){
            alert('消息生效日期查询条件的结束时间不能小于开始时间!');
            return;
        }
    }
    formObject.action = "<%=request.getContextPath()%>/portal/message/messagequery.do?mainmenu="+mainmenu+"&submenu="+submenu;
    formObject.submit();
}
function mod(){
    var selRow = tmain.getSelectedRow();
      if(tmain.getSelectedRow()==null||selRow.length==0){
          alert("至少选择一个消息进行修改!");
          return false;
      }else if(selRow.length>1){
          alert("只能选择一个消息进行修改!");
          return false;
      }else{
      var id = selRow[0].msid;
    var mainmenu='<%=request.getParameter("mainmenu")%>';
    var submenu= <%=request.getParameter("submenu")%>;
    var url="<%=basePath%>/portal/message/turnToMod.do?mainmenu="+mainmenu+"&submenu="+submenu+"&msid="+id;    
    window.location.href = url;
    }
    
}
function add(){
    var mainmenu='<%=request.getParameter("mainmenu")%>';
        var submenu= <%=request.getParameter("submenu")%>;
    var url="<%=basePath%>/portal/message/turnToAdd.do?mainmenu="+mainmenu+"&submenu="+submenu;    
    window.location.href = url;
}

function del(){
    if(tmain!=null && tmain.data !=null){
            if (tmain.getSelectedRow().length==0){
               alert("请选择进行删除操作的消息!");return;
            }
        } 
        var submenu = '<c:out value="${param.submenu}"/>';
        var mainmenu = '<c:out value="${param.mainmenu}"/>';
        var index="";
        var selRow = tmain.getSelectedRow();
        for(var i= 0;i<selRow.length;i++){
            index = index+","+selRow[i].msid;        
        }  
        if(confirm("确定删除所选中的消息吗？")){
        var url="<%=basePath%>/portal/message/del.do?msid="+index+"&mainmenu="+mainmenu+"&submenu="+submenu;
        window.location.href = url;
        }
}
function clearinput(){
    document.getElementById("gcodes").value="";
    document.getElementById("gcodesnames").value="";
}
function DisableF5(){   
        var d_url=document.location.href;
           with (event){   
         if (keyCode==116 || (ctrlKey && keyCode==82)){  
            var mainmenu='<%=request.getParameter("mainmenu")%>';
        var submenu= <%=request.getParameter("submenu")%>;
            window.location="<%=request.getContextPath()%>/portal/message/messagequery.do?mainmenu="+mainmenu+"&submenu="+submenu;
            event.keyCode = 0;   
               event.cancelBubble = true;   
               return false;   
             }   
           }   
} 
document.onkeydown = DisableF5;


function clickOn(){
    var myDialog = new Object();
    var treemenujson=<%=request.getAttribute("treemenujson1")%>;
    var ckvalue =  document.getElementById("gcodes").value;
    myDialog.treemenujson = treemenujson;
    myDialog.ckvalue = ckvalue;
    var ieHeight = 400;
    var ieWidth =400;

    if(Sys.ie == '6.0') //IE7情况,在IE6的情况下加50px 
    {
      ieHeight += 50;
    }
    var result = window.showModalDialog("<%=request.getContextPath()%>/portal/portlets/whmessage/queryRight.jsp",myDialog,"dialogHeight:"+ieHeight+"px;dialogWidth: 325px;resizable: No; status: No;help:No;");
    var value=[], valueid=[];
    var projectname = document.getElementById("gcodesnames");
    if(result){
    if(typeof result == "string"){
        document.getElementById("gcodesnames").value=document.getElementById("gcodesnames").value;  
        document.getElementById("gcodes").value=document.getElementById("gcodes").value; 
    }else{
    for(var pro in result) {
        var _resultObj = result[pro];
        if(typeof _resultObj != "object")continue;
        value.push(_resultObj.name,";");
        valueid.push(_resultObj.itemid,";");
    }
    document.getElementById("gcodesnames").value=value.join("");  
    document.getElementById("gcodes").value=valueid.join(""); 
    } 
    }else{
        document.getElementById("gcodesnames").value=document.getElementById("gcodesnames").value;  
        document.getElementById("gcodes").value=document.getElementById("gcodes").value; 
    }
}
window.onload = function(){
    var contents = '<%=request.getAttribute("contents")%>';
    var gcodes = '<%=request.getAttribute("gcodes")%>';
    var gcodesnames = '<%=request.getAttribute("gcodesnames")%>';
    var starttimes = '<%=request.getAttribute("starttimes")%>';
    var endtimes = '<%=request.getAttribute("endtimes")%>';
    if("null"==contents){
        contents = "";
    }
    if("null"==gcodes){
        gcodes = "";
    }
    if("null"==gcodesnames){
        gcodesnames = "";
    }
    if("null"==starttimes){
        starttimes = "";
    }
    if("null"==endtimes){
        endtimes = "";
    }
    document.getElementById("contents").value=contents;
    document.getElementById("gcodes").value=gcodes;
    document.getElementById("gcodesnames").value=gcodesnames;
    document.getElementById("starttimes").value=starttimes;
    document.getElementById("endtimes").value=endtimes;
}
function clearAll(){
	document.getElementById("contents").value="";
	document.getElementById("gcodes").value="";
	document.getElementById("gcodesnames").value="";
	document.getElementById("starttimes").value="";
	document.getElementById("endtimes").value="";
}
</script>
