<%@ page language="java" contentType="text/html; charset=GBK"
    pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<title>Insert title here</title>

</head>
<body>
<form action="/report/savereport.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>" method="post" enctype="multipart/form-data" name="form1" id="form1">
          <table width="100%" border="1" cellspacing="0" cellpadding="0">
            <tr>
              <td>������</td>
              <td><label for="textfield"></label>
              <input type="text" name="ID" id="ID" /></td>
            </tr>
            <tr>
              <td>��������</td>
              <td><label for="textfield"></label>
              <input type="text" name="rptname" id="rptname" /></td>
            </tr>
            <tr>
              <td>�����ļ�</td>
              <td><label for="file"></label>
              <input type="file" name="rptfile" id="rptfile" /></td>
            </tr>
      
            <tr>
              <td>��ӡ����</td>
              <td><label for="textfield"></label>
              <input type="text" name="num" id="num" onkeyup="checkData()" />  ��ֻ��ӡһ�����ɲ����ô��</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td><label for="Submit"></label>
              <input type="submit" name="Submit" value="�ύ" id="Submit" /></td>
            </tr>
          </table>
        </form>
<table width="100%" border="1" cellspacing="0" cellpadding="0">
          <tr>
            <td>������</td>
            <td>��������</td>
            <td>��ӡ����</td>
             <td colspan=2>&nbsp;</td>
          </tr>
<c:forEach var="rpt"  items="${rptlist}" >
          <tr>
            <td><c:out value="${rpt.id}"/></td>          
            
            <td><c:out value="${rpt.name}"/></td>
            <td><c:if test="${empty rpt.num}"> &nbsp; </c:if> <c:if test="${not empty rpt.num}"> <c:out value="${rpt.num}" /></c:if></td>
            
            <td><a href="/report/downloadreport.do?rptid=<c:out value="${rpt.id}"/>">����</a></td>
          </tr>
</c:forEach>

        </table>
</body>
</html>
<script type="text/javascript">
function checkData(){
 var num = document.getElementById('num').value;
 if(num!=null || num !=""){
    if(!isNumber(num)){
    
	 	alert("������������");
	 	document.getElementById('num').value="";
	 	return false;    
    }
    if(num.length>9){
    		alert("�������ݳ��ȳ���9λ��");
	 	document.getElementById('num').value="";
	 	return false;    
    }
 }
}

function isNumber(str){
	exp = /[^0-9()]/g;
	if(str.search(exp) != -1)
	{
		return false;
	}
	return true;
}
</script>