<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
var selectblank_loaded = true; //是否加载JS文件标识：以文件名+“_loaded ” 标识，防止重复加载
var bdgagency = null;
function fillDetail(detailObj){ 
    datasynchtoObj(detailObj);
}
//重写datasynch()

function datasynch(){
	if(detailObj==null) return;
	fillDetail(detailObj);
	tdetail.draw()

}


function changeData(){
	if(detailObj==null) return;
	fillDetail(detailObj);
	tdetail.draw();
}

//设置银行信息
function selectBlank(gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	if(mainVouch == null){
		alert("请选择来源信息！");
		return;
	}
	bdgagency = detailObj.bdgagency;
	if(bdgagency==null){
		bdgagency = "<c:out value="${sessionScope.currentuseragency.itemid}"/>";
	}
	if(bdgagency==null) return;
	selectPayee(bdgagency,gatheringbankacctname,gatheringbankacctcode,gatheringbankname);
	changeData();
}