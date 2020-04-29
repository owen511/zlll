<%@ page contentType="text/html; charset=GBK"%>
<HTML>
   <META   http-equiv=Content-Type   content="text/html;   charset=GBK">   
   <META   HTTP-EQUIV="Pragma"   CONTENT="no-cache">   
   <META   HTTP-EQUIV="Cache-Control"   CONTENT="no-cache">
   <META HTTP-EQUIV="Expires" CONTENT="0">
	<%
	%>
<HEAD>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/browserFolder.js"></script>
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
      var mydir = document.getElementById("mydir").value;
	  var tvalue = document.getElementById("myfile").value;	  
	  
	  if(tvalue == ""){
	    alert("请输入文件名！");
	    document.getElementById("myfile").focus();	    
	    return;
	  }
	  var mypath = mydir+ tvalue;
	  var cobj = document.getElementById("isopen");
	  var cvalue = 0;
	  if(cobj.checked){
	     cvalue=1;
	  }
	  
	  var ccheckobj = document.getElementById("ischecked");
	  var ccheck = 0;
	  if(ccheckobj.checked){
	     ccheck=1;
	  }
	  var value = mypath+","+cvalue+","+ccheck;
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
                 
                 <td width='15%' align = 'right'>文件保存目录:</td>                
                 <td width="65%" align = 'left'>D:/
                     <input type=hidden name="mydir" id = mydir>                 
                     <script>
                        document.all("mydir").value = "D:\/";
                     </script>
                 </td>
                 <td width="10%">&nbsp;</td>                                               
               </tr>
               
               <tr>
                 <td width="10%">&nbsp;</td>                 
                 <td width='15%' align = 'right'>文件名称:</td>                
                 <td width="65%" align = 'left'>
                     <input type=text name="myfile" id = myfile style="width:150px;">       
                     <script>
                        document.all("myfile").value = "未命名.xls";
                     </script>                               
                 </td>
                 <td width="10%">&nbsp;</td>                                               
               </tr>               
               <tr>
                 <td width="10%">&nbsp;</td>
                 <td width='15%' align = 'right'>是否打开:</td>
                 <td width="65%" align = 'left'>                                 
                     <input type=checkbox name="isopen" id = 'isopen'/>
                 </td>
                 <td width="10%">&nbsp;</td>                                               
               </tr>
               <tr>
                 <td width="10%">&nbsp;</td>
                 <td width='15%' align = 'right'>是否导出勾选项:</td>
                 <td width="65%" align = 'left'>                                 
                     <input type=checkbox name="'ischecked'" id = 'ischecked'/>
                 </td>
                 <td width="10%">&nbsp;</td>                                               
               </tr>               
               <tr><td colspan = 3>&nbsp;</td></tr>               
            </table>

			<table border=0 width='100%'>
				<tr>
					<td width="20%">
						&nbsp;
					</td>
					<td width="30%" align='center'>
						<INPUT type="button" onclick="ok()" class="button_style"
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
					<td width="20%">
						&nbsp;
					</td>
				</tr>
			</table>


		</div>

	</BODY>
</HTML>
