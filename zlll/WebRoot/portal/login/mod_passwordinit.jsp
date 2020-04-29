<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ page import="gov.mof.fasp.ca.user.UserDTO"%>
<%@ page import="gov.mof.fasp.sec.util.SecureUtil"%>
<%@ page import="gov.mof.fasp.dic.IDictionaryService"%>
<%@ page import="gov.mof.framework.util.DBUtil"%>
<%@ page import="gov.mof.fasp.dic.elementcode.dto.CommonElementDTO"%>
<%@ page import="gov.mof.fasp.systemset.bo.SystemSetBO"%>
<%@ page import="gov.mof.fasp.systemset.dto.SystemSetDTO"%>
<%@ page import="gov.mof.fasp.ifmis.common.ServiceFactory"%>

<%
String basePath = request.getScheme() + "://"
+ request.getServerName() + ":" + request.getServerPort()
+ request.getContextPath();
String ui_logo_area = "";
String commonCode = "";
String validate = request.getParameter("validate");
//��ȡ��ǰ�û�
UserDTO userDTO = SecureUtil.getCurrentUser();

//��ȡ��λ����
IDictionaryService dicService = (IDictionaryService) DBUtil.getBeanByName("fasp.dic.dictionaryService");
if(userDTO.getOrgantype()!=null&&userDTO.getOrganid()!=null&&!userDTO.getOrgantype().equals("")&&!userDTO.getOrganid().equals("")){
    CommonElementDTO commonElementDTO = dicService.findElementInfo(userDTO.getOrgantype(), userDTO.getOrganid().intValue());
    if(commonElementDTO!=null&&commonElementDTO.Code()!=null){
        commonCode = commonElementDTO.Code();
    }
}
//��ȡ������ʶ�����������ģ��޸�������Ҫ������֤
SystemSetBO systemSetBO = (SystemSetBO) ServiceFactory.getBean("fasp.systemset.systemSetBO");
SystemSetDTO systemSetDTO = null;
        try{
            systemSetDTO = (SystemSetDTO)systemSetBO.findSystemSetByCode("ui_logo");
            if(systemSetDTO!=null){
                if(systemSetDTO.getParamdata()!=null){
                    ui_logo_area = systemSetDTO.getParamdata();
                    
                }else{
                    ui_logo_area ="";
                }
            }else{
                    ui_logo_area ="";
            }
        }catch(Exception e) {
                ui_logo_area ="";
        }
        
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<base target="_self"/>


 <head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<meta http-equiv="X-UA-Compatible" content="IE=7" />
 <OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar" 
    CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB" codebase="<%=basePath%>/common/flyie.cab#version=1,0,0,0" VIEWASTEXT>
     <PARAM NAME="ToolBar" VALUE="0"/>
     <PARAM NAME="StatusBar" VALUE="1"/>
     <PARAM NAME="MenuBar" VALUE="0"/>     
</OBJECT>


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
  <!-- Code for browser detection. DO NOT REMOVE.             -->
  <script type="text/javascript" src="<%=basePath%>/js/ua.js"></script>

  <!-- Infrastructure code for the TreeView. DO NOT REMOVE.   -->
  <script src="<%=basePath%>/js/ftiens4.js"></script>
  <script type="text/javascript">
    var Sid ="";
    function Loadfrm(){
        var aParams;
        aParams = document.location.search.substr(1).toLowerCase().split('=');
        Sid=aParams[1];
    }
    function generateQueryString() {
      var recheck ="";
      for (var i = 0; i < document.forms[0].elements.length; i++) {
        var e = document.forms[0].elements[i];
        if (e.type == "radio"&&e.checked) {
             recheck = e.value;
        }       
      }
      return recheck;
     }
    function checkValue(){
    
        var id =Sid ;
        if(id != null){
            window.opener.document.getElementById(id).value=generateQueryString();
            self.close();   
        } else {
            alert("ҳ����󣺴���idΪ�գ�");
        }       
    }   
$=function(id){return document.getElementById(id);}
function mc(){var _i=$("uploadfile");_i.click();}
function mm(){$("puf").value=(document.f1.uf.value);}
window.onload=function(){
}



function resizewindow(w,h){
    window.resizeTo(w,h);
    //alert(window.opener.screenLeft);
    //alert(window.opener.screenTop);
    //window.moveTo(window.opener.screenLeft+window.opener.document.body.clientWidth/2-200,window.opener.screenTop+window.opener.document.body.clientHeight/2-150);
}

function modpwd(){

    var commonCode_tem = Trim(document.form1.commonCode.value);
    var ui_logo_area_tem = Trim(document.form1.ui_logo_area.value);
    if(document.form1.oldpwd==null||document.form1.oldpwd.value==""){   
    
        alert("����дԭ����");
        return false;
    }
    if(document.form1.newpwd==null||document.form1.newpwd.value==""){
        alert("����д������");
        return false;
    }
    
    if(document.form1.newpwd.value.length<6){
        alert("���볤������6λ");
        document.form1.newpwd.value ="";
        document.form1.newpwd1.value ="";
        return false;
    }
    if(document.form1.newpwd.value.length>16){
        alert("���볤�Ȳ��ܴ���16λ");
        document.form1.newpwd.value ="";
        document.form1.newpwd1.value ="";
        return false;
    }
    if(document.form1.newpwd1==null||document.form1.newpwd1.value==""){
        alert("����дȷ������");
        return false;
    }
    
    if(document.form1.newpwd1.value != document.form1.newpwd.value){
        alert("��������������벻һ��");
        return false;
    }
    
    if(ui_logo_area_tem == 'chongqing'){
            var password = document.form1.newpwd.value;
            var reg = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{2,})$/; 
            var r = reg.test(password);
        if(!r){
            alert("�����������ֺ���ĸ��ɵ�����!");
            document.form1.newpwd.value ="";
            document.form1.newpwd1.value ="";
            password = document.form1.newpwd.focus();
            return false;
        }   
    }
    var card = document.form1.cardcode.value;
    if(null==card||card==""){
        alert("���֤�Ų���Ϊ��!");
        return false;
    }
    if(!(card.length==15||card.length==18)){
        alert("���֤��Ϊ15λ��18λ!");
        return false;
    }
    if(card.indexOf("x")!=-1&&card.indexOf("x")!=(card.length-1)){
        alert("���֤��ֻ�����һλ������ĸ'x'!");        
        return false;
    }
    document.form1.submit();
}

//window.attachEvent("onbeforeunload",function(){alert("���޸����룡")});

function Trim(TRIM_VALUE){
    if(TRIM_VALUE.length < 1){
        return"";
    }
    TRIM_VALUE = RTrim(TRIM_VALUE);
    TRIM_VALUE = LTrim(TRIM_VALUE);
    if(TRIM_VALUE==""){
        return "";
    }
    else{
        return TRIM_VALUE;
    }
} //End Function

function RTrim(VALUE){
    var w_space = String.fromCharCode(32);
    var v_length = VALUE.length;
    var strTemp = "";
    if(v_length < 0){
        return"";
    }
    var iTemp = v_length -1;

    while(iTemp > -1){
        if(VALUE.charAt(iTemp) == w_space){
        }
        else{
            strTemp = VALUE.substring(0,iTemp +1);
            break;
        }
        iTemp = iTemp-1;

    } //End While
    return strTemp;

} //End Function

function LTrim(VALUE){
    var w_space = String.fromCharCode(32);
    if(v_length < 1){
        return"";
    }
    var v_length = VALUE.length;
    var strTemp = "";
    var iTemp = 0;

    while(iTemp < v_length){
        if(VALUE.charAt(iTemp) == w_space){
            }
            else{
                strTemp = VALUE.substring(iTemp,v_length);
                break;
        }
        iTemp = iTemp + 1;
    } //End While
    return strTemp;
}
function closeWindow(){
    parent.window.location.href="<%=basePath%>/logout.page";
    window.parent.closeDiv();
}
  </script>
    

  <TITLE>�޸�����</TITLE>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />

<link href="<%=basePath%>/style/stylefontS.css" rel="stylesheet" type="text/css" />
 </head>

<body class="pop_body" onload="resizewindow(400,280)" style="overflow:hidden;">
    <div id="popPage">
        <div id="shenhe_title">
            <div id="shenhe_title_middle"><%if("password".equals(validate)){%>������ʼ������<%} %> </div>
        </div>
        <div id="pop_inner2" style="overflow:hidden;height: 250px;">
        <br/>
            <div id="table_list_title">
                <ul><li class="top">
                    <div>�����޸�<%if("chongqing".equals(ui_logo_area)){%><font color="red" size="1">(��������6-16����ĸ��������ɣ�����ȫ������)</font><%} %> </div>
                </li></ul>
            </div>
            <div id="edit_table" style="padding-left:0;">
                <form name="form1" id="form1" action="<%=request.getContextPath()%>/template/commons/modifyInit.do" method="post">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <th>������<span><font color="red">*</font></span></th>
                            <td style="width:80%;" ><input style="width:70%;" type="password" name="oldpwd" /></td>
                        </tr>
                        <tr>
                            <th>������<span><font color="red">*</font></span></th>
                            <td style="width:80%;"><input style="width:70%;" type="password" name="newpwd" /></td>
                        </tr>
                        <tr>
                            <th>ȷ������<span><font color="red">*</font></span></th>
                            <td style="width:80%;"><input style="width:70%;" type="password" name="newpwd1" /></td>
                        </tr>
                        <tr>
                            <th>���֤��<span><font color="red">*</font></span></th>
                            <td style="width:80%;"><input style="width:70%;" maxlength="18" type="cardcode" name="cardcode" /></td>     
                        </tr>
                        <tr>
                            <td align="center" style="color:red;height:50px;"colspan="8" >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;������ʹ�õ��ǳ�ʼ�����룬Ϊ�˱�֤�������ݰ�ȫ�����������<br/>���á���������ʱ����Ҫ׼ȷ�����������֤���룬������֤������<br/>��������8891404��
                            </td>
                        </tr>
                    </table>
                    <input type="hidden" name="ui_logo_area" value ="<%=ui_logo_area %>">
                    <input type="hidden" name="commonCode" value ="<%=commonCode %>">
                </form>
                <center>
                <!-- �����ʽ��ͼƬ�����⣬��ʱ���ε������ʽ onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" -->
                <input type="button" class="button_style" value="ȷ��" onclick="modpwd()"/>
                <input type="button" class="button_style" value="�˳�" onclick="closeWindow()"/>
            	</center>
            </div>
        </div>
    </div>
</body>
</html>
