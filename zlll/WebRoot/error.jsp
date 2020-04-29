<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK" %>
<%@ page isErrorPage="true" %>
<%@ page import="org.apache.struts.Globals" %>

<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>

<html:html>
    <head>
        <title>������ʾ</title>
        <meta http-equiv="Content-Type" content="text/html; charset=GBK"/>
        <html:base/>
        <link rel="stylesheet" href="<%=request.getContextPath()%>/style/common.css" type="text/css"/>
        <link rel="stylesheet" href="<%=request.getContextPath()%>/style/main.css" type="text/css"/>
    </head>
    
    <body>    	
        <div class="error_1">
            
            <h2 class="red"><img src="<%=request.getContextPath()%>/images/ball_stop.gif" align="absmiddle">ϵͳ����!�����γ������ƵĴ�����Ϣ��������ϵͳ����Ա��ϵ��лл��</h2>
            
            <h2 class="red"><html:errors/></h2>
            
            <!-- ������ -->
            <div align="center">
                <input type="button" value=" ���� " onclick="javascript:history.back();">
            </div>
        </div>
        <p/>
        <hr size="1" color="#ff0000"/>
        <div class="error_2">
            <html:errors/>
            <logic:present name="ERROR">
            <ul>
                <logic:iterate id="error" name="ERROR">
                    <li><bean:write name="error"/></li>
                </logic:iterate>
            </ul>
        	</logic:present>
            <logic:present name="<%=Globals.EXCEPTION_KEY%>">
                <p style="font-size:12px"><bean:write name="<%=Globals.EXCEPTION_KEY%>" property="message"/></p>
            </logic:present>
            
            <logic:messagesNotPresent>
                :-( δ�����쳣��Ϣ
            </logic:messagesNotPresent>
            
            <logic:present name="exception">
                <br/>������ϢΪ��<%= exception.getMessage() %><br/>
                    <%-- Un-comment the following lines to display the stack trace --%>
                ������ϸ��Ϣ(��������Ա����)��</br>
                <PRE><font color="red">
                <%=exception.toString()%>
                </font></PRE>
            </logic:present>
        </div>
    </body>
</html:html>
