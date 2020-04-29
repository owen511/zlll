<%@ page contentType="text/html; charset=GBK"%>
<HTML>
   <META   http-equiv=Content-Type   content="text/html;   charset=GBK">   
   <META   HTTP-EQUIV="Pragma"   CONTENT="no-cache">   
   <META   HTTP-EQUIV="Cache-Control"   CONTENT="no-cache">
   <META HTTP-EQUIV="Expires" CONTENT="0">
	<%
	
	 	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
			//字体相关
		String styleName ="stylefontS.css";	
		if(session.getAttribute("StyleName")!=null){
		    styleName = (String)session.getAttribute("StyleName");
		}
	%>
<HEAD>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/browserFolder.js"></script>
<link href="<%=request.getContextPath()%>/style/default.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName %>" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
	
<STYLE>
    TD {
      font-size: 10pt; 
      font-family: verdana,helvetica; 
      text-decoration: none;
      white-space:nowrap;}
    A {
      text-decoration: none;
      color: black;}
</STYLE>

<script language="JavaScript">   
  
  function ok(){
	  var cobj = document.getElementById("isopen");
	  var isopen = 0;
	 //if(cobj.checked){
	 //   isopen=1;
	 // }
	  
	  var ccheckobj = document.getElementById("ischecked");
	  var issave = 1;
	 // if(ccheckobj.checked){
	 //   issave=1;
	 // }
	  var value = isopen+","+issave;
	  window.returnValue = value;  
	  window.close();
  }
</script> 
<TITLE>弹出选择框</TITLE>

	</head>
	<BODY class="pop_body">

		<div id="popPage">
            <table  width = '100%'>
               <tr><td colspan = 3>&nbsp;</td></tr>
               <tr>
                 <td width="10%">&nbsp;</td>
                 
                 <td width='15%' align = 'right'>&nbsp;</td>                
               <td width="65%" align = 'left'>&nbsp;</td>
                 <td width="10%">&nbsp;</td>                                               
               </tr>
               
               <tr>
                 <td colspan="4"><div align="center">默认为只打开不保存</div></td>                 
               </tr>   
               <tr>
                 <td>&nbsp;</td>
                 <td>&nbsp;</td>
                 <td>&nbsp;</td>
                 <td>&nbsp;</td>                                               
               </tr>
               <tr><td colspan = 3>&nbsp;</td></tr>               
            </table>

<table border=0 width='100%'>
				<tr>
					<td width="20%">&nbsp;
						
					</td>
					<td width="30%" align='center'>
						<INPUT type="button" onClick="ok()" class="button_style"
							onmouseover="this.className='OverBtn'"
							onmouseout="this.className='button_style'"
							onmousedown="this.className='down'" value="确定" />
					</td>
					<td width="30%" align='center'>
						<INPUT type="button" class="button_style"
							onmouseover="this.className='OverBtn'"
							onmouseout="this.className='button_style'"
							onmousedown="this.className='down'"
							onclick="javascript:window.close()" value="取消" />
					</td>
					<td width="20%">&nbsp;
						
					</td>
				</tr>
			</table>


		</div>

	</BODY>
</HTML>
