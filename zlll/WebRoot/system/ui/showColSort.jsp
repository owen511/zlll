
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<HTML >
 <HEAD>
 <META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"> 
<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">

  <TITLE>�б���ʾ˳������</TITLE>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<script type="text/javascript" src="../../js/choose.js"></script>
<script type="text/javascript" src="../../js/changescroll.js"></script>

 </HEAD>

 <BODY class="pop_body">


     
<div id="popPage"><div id="shenhe_title"><div id="shenhe_title_middle"></div></div>
<div id="query_t">
<div>
<span><span title="ȷ��" class="mod_btn" onclick="setData()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">ȷ��</a></span></span>
<span><span title="�ر�" class="close_btn" onclick="winclose()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">�ر�</a></span></span>
</div>
</div>

 <div id="form_table_title" >
  <ul>
    <li class="top">
      <div>����ҳ����ʾ����</div>
    </li>
  </ul>
</div>
<input type="hidden" name="tableid" id="tableid" value="<c:out value="${tableid}"/>"/>
<input type="hidden" name="tabletype" id="tabletype" value="<c:out value="${tabletype}"/>"/>
<form name = 'dataform' id = 'dataform' method="post">
   
<!--�뱣����div��a��ǩ -->
      <div id="list" style="height:290px; width:98%;overflow-x:scroll;overflow-y:scroll;margin-left:10px;">
      
        <table  border="0"  align="center" cellspacing="1" id="tbl1" >
          <tr >
            <th nowrap="nowrap">��ʾ����</th>
            <th nowrap="nowrap">�ֶ���</th>
            <th nowrap="nowrap"><div align="center">��������</div></th>
          
          </tr>
        
            
		   	<%
					java.util.List list = (java.util.List) request.getAttribute("mainListSetList");
				    if (list != null) {
					for (int row = 0; row < list.size(); row++) {
				     java.util.Map map = (java.util.Map) list.get(row);		
            %>
		<tr onclick="this.style.backgroundColor='#CBDAF2';" onmouseover="this.style.backgroundColor='#e8f4ff';" onmouseout="this.style.backgroundColor='#ffffff';">	
            <td nowrap="nowrap" align="center"><input type="text" id="<%=map.get("COLID")%>" value="<%=map.get("ORDERNUM")%>" onfocus="this.select()"></td>
            <td nowrap="nowrap" align="left"><%=map.get("COLID")%></td>
            <td nowrap="nowrap" align="left"><%=map.get("COLNAME")%></td>
      </tr>
          <%}  }%>  
   
        </table>
 
  </div>

  </form>
 
 </BODY>

</HTML>

<script language="javascript">
   
	//�޸�ѡ�е�����	
	function setData(){	
		 var tableid = document.getElementById("tableid").value;
		 var tabletype= document.getElementById("tabletype").value;
		 var objs =document.getElementById("tbl1").getElementsByTagName("INPUT");
		 var objas = new Array();
		 for(var i=0;i<objs.length;i++) 
		 { 
		      var obja=new Array();
		      obja[0] = parseInt(objs[i].value);
		      obja[1] = objs[i].id;
		      objas[i]=obja;
		 }
		 objas.sort(compare);
		 
		 var headstring="";
		 for (var i = 0; i<objas.length; i++) {
		    headstring = headstring+objas[i][1];
		    if(i!=objas.length-1)
		         headstring= headstring+",";
		 }
		 opener.setUserDataByElementId(tableid,tabletype,headstring);
		  self.close(); 
	}	
    function compare(a,b){
       return(a[0]-b[0]);
    }
   //ˢ�¸�����
   function winclose(){
    self.close(); 
   }
</script>


