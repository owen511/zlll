<%
  String ltirServer = request.getServerName();
  String ltirPort = request.getServerPort()+"";
  String ltirContextPath = request.getContextPath();
  String ltirFullContextPath = "http://"+ltirServer+":"+ltirPort+ltirContextPath;
%>
<script type="text/javascript">
//页面中放置ocx对象
document.write("<object classid=\"CLSID:E1D2CA62-FA6D-40F0-9680-DBC40A067C8F\" codebase=\"<%=ltirFullContextPath%>/common/webstart.cab#version=1,0,0,0\" width=\"0\" height=\"0\" title=\"a\" id=\"ltirocx\" name=\"ltirocx\"></object>");

//----------------------------------
//套打ocx调用函数
//
//jrid:         数据ID参数    e.x  表t_payvch的billid    多个ID用英文逗号分开         e.x.    10000,10001,10002
//printid:      模板ID   对应t_rptmanager的reportid
//worker:       打印方式　两中方式：值为viewer时弹出打印查看器   值为printer直接打印    注意：直接打印时页面设置和打印份数设置在打印查看器中设置,默认值：模板页面设置　　1份 
//----------------------------------
function rpt_JasperPrint(jrid,printid,worker){
   var ltir_ocxObj=document.getElementById("ltirocx");
   var ltir_rtp_name='ltrpt_jasper';
   var ltir_jnlp_version='2.3.2.0';
   var ltir_thisserverbase='<%=ltirFullContextPath%>';
   var ltir_jre_url=ltir_thisserverbase+'/common/jre6.zip';
   var ltir_jnlpbase=ltir_thisserverbase+'/ltrptapp/ltir/jasper/jnlp';
   var ltir_printurl=ltir_thisserverbase+'/servlet/ltrpt/JasperSqlServlet';
   var ltir_server_jnlp_url=ltir_thisserverbase+'/servlet/ltrpt/MakeJasperJnlpServlet';
   var ltir_ocx_jnlp_url=ltir_server_jnlp_url+'?jrid='+jrid+'&printid='+printid+'&worker='+worker+'&jnlpbase='+ltir_jnlpbase+'&printurl='+ltir_printurl;
   var ltir_run_param=jrid+' '+printid+' '+worker+' '+ltir_printurl;
   ltir_ocxObj.openJnlpProgram(ltir_rtp_name,ltir_jnlp_version,ltir_jre_url,ltir_ocx_jnlp_url,ltir_run_param);
}
</script>

