<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<div>
      <table id="edit_table" width="100%"  style="margin:auto">
		  <tr>
		    <th><span>*</span><label>���������ַ</label>:</th>
		    <td><input type="text" id="macaddress" value="" size="25"/>  <a href="javascript:macaddress.value='<%=gov.mof.fasp.ifmis.system.license.util.MacAddressUtil.getMacAddress()%>';void(0);">��ȡ����������ַ</a></td>  
		  </tr>
       </table>
</div>
