<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@page import="com.longtu.framework.cache.CacheManager"%>
<%
CacheManager.getCache().clearEntry();
%>
<script>
alert("ˢ�»���ɹ�");
window.opener=null;
window.close();
</script>