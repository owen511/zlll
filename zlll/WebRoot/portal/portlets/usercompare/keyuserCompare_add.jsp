<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<% String  str = (String)request.getAttribute("str");%>
<script type="text/javascript" src="<%=request.getContextPath()%>/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/ltext_core.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/choose.js"></script>
<script type="text/javascript">

  function init(){
	$('topnum').value = 0;
  }
  
  function saveQuit(){ 
  var bumenuname = document.detailform.bumenuname;
	if(!LenthCheck(bumenuname)) return false;
	document.detailform.action = "/portal/keyuserCompare/save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
	
	document.detailform.submit(); 
  }
  function LenthCheck(item){
  	var str = item.value;
	if(str.trim()==""){
		alert('业务系统菜单名称输入不能为空！');
		return false;
	}

	return true;
  }

function  addcontinue(){
    var bumenuname = document.detailform.bumenuname;
	if(!LenthCheck(bumenuname)) return false;
    document.detailform.action = "/portal/keyuserCompare/savecontinue.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
	
	document.detailform.submit(); 
	}
  function backCheckSave(){
		window.location.href("<%=request.getContextPath()%>/portal/keyuserCompare/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
  }
  function clearOranid(){
		var formObject = $("form1");
		
	}
</script>

<body onload='init()'> 
<div>
    <form name="detailform" id="detailform" action="#" method="post" >
    <input type="hidden" id="maindata" name="maindata" value=""/>
    <input type="hidden" id="optype" name="optype" value="add"/>
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						单点登录用户对照-新增
					</div>
				</li>
			</ul>
		</div>
		<!-- 请保留此div和a标签  -->
		<div id="edit_table">
		   <table id ="edittable" width="100%" border="0" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
      		          <tr> 
                           <th class = 'thwidth'><div align=left>系统类型<span>*</span></div></th>
              <td nowrap=nowrap  colspan="0"  align="left">
              <select style="width:120px;" class="text_popmin" id="bumenutype" name="bumenutype" onchange="changeopt(this.value)">
			  	<option value=6>未实现系统</option>
		        <option value=2>龙图系统</option>
                <option value=3>龙图数据系统</option>
                <option value=4>一体化系统</option>
                <option value=5>其他系统</option>
                <option value=1>太极华清系统</option>
                <option value=7>ASP系统</option>
                
		       </select></td>
			  
               <th class = 'thwidth'><div align=left>业务系统菜单名称<span>*</span></div></th>
                 <td nowrap=nowrap  colspan="0"  width = "500">
             		<select  style="width:120px;" name= bumenuname id=bumenuname onchange="changeopt1(this.value)">
					<c:forEach items="${organTypeMap}" var="entry">
						<option value="<c:out value='${entry.value}' />"   >
							<c:out value="${entry.value}" />
						</option>
					</c:forEach>
				</select></td>
				

          </tr>
          <tr>
           <th class = 'thwidth'><div align=left>业务系统菜单标识<span>*</span></div></th>
                 <td nowrap=nowrap  colspan="0"  width = "500">
             		<select  style="width:120px;" name= bumenusign id=bumenusign >
					<c:forEach items="${organTypeMap1}" var="entry1">
						<option value="<c:out value='${entry1.value}' />"   >
							<c:out value="${entry1.value}" />
						</option>
					</c:forEach>
				</select></td>
            <th class = 'thwidth'><div align=left>是否启用<span>*</span></div></th>
             <td nowrap=nowrap  colspan="0"  align="left">
			  <select style="width:120px;"  class="text_popmin" id="isuse" name="isuse">
			  	<option value="1">启用</option>
			  	<option value="0">停用</option>
			  </select>
             </td> 
           
          </tr>
      </table>
      <div id="confirm_exit_btn"> 
		<input type="button" id="saveAndOut" name="save"  value="保存并退出" onclick="javascript:saveQuit()" class="button_style">
		<input type="button" id="saveAndOut" name="save"  value="继续新增" onclick="javascript:addcontinue()" class="button_style">
		<input type="button" name="cancel"  value="返回" onclick="backCheckSave()" class="button_style">	
     </div> 
   </div>
  </form>
 </div>
</body>
<script type="text/javascript">
var name = <%=str%>;
var objSelect = eval(name);
function changeopt(type){
	var obj=document.getElementById('bumenuname');//普通
	var obj2 = document.getElementById('bumenusign');
	obj.options.length=0;
	obj2.options.length=0;
		for(var i=0;i<objSelect.length;i++){		
			if(objSelect[i].TJHQPROGRAM==type){
			    //创建下拉信息对象
				var opt=document.createElement('option');
				var opt2  = document.createElement('option');
				opt.value=objSelect[i].NAME;
				opt2.value = objSelect[i].SIGN;
				opt2.innerText = objSelect[i].SIGN;
				opt.innerText=objSelect[i].NAME;
				//把下拉信息对象追加到下拉列表对象中
				obj.appendChild(opt);
				obj2.appendChild(opt2);
			}
		}
}
function changeopt1(bumenuname){
	var obj3=document.getElementById('bumenusign');//普通
   	obj3.options.length=0;
		for(var i=0;i<objSelect.length;i++){
				if(objSelect[i].NAME == bumenuname){
			    //创建下拉信息对象
			    var opt3=document.createElement('option');
				opt3.value=objSelect[i].SIGN;
				opt3.innerText=objSelect[i].SIGN;
				//把下拉信息对象追加到下拉列表对象中
				obj3.appendChild(opt3);
			}
		}
}
 
</script>