<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
var selectblank_loaded = true; //�Ƿ����JS�ļ���ʶ�����ļ���+��_loaded �� ��ʶ����ֹ�ظ�����
var bdgagency = null;
function fillDetail(detailObj){ 
    datasynchtoObj(detailObj);
}
//��дdatasynch()

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

//����������Ϣ
function selectBlank(gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	if(mainVouch == null){
		alert("��ѡ����Դ��Ϣ��");
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