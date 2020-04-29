var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",decode:function(c){var a="";var k,h,f;var j,g,e,d;var b=0;c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(b<c.length){j=this._keyStr.indexOf(c.charAt(b++));g=this._keyStr.indexOf(c.charAt(b++));e=this._keyStr.indexOf(c.charAt(b++));d=this._keyStr.indexOf(c.charAt(b++));k=(j<<2)|(g>>4);h=((g&15)<<4)|(e>>2);f=((e&3)<<6)|d;a=a+String.fromCharCode(k);if(e!=64){a=a+String.fromCharCode(h)}if(d!=64){a=a+String.fromCharCode(f)}}a=Base64._utf8_decode(a);return a},_utf8_decode:function(a){var b="";var d=0;var e=c1=c2=0;while(d<a.length){e=a.charCodeAt(d);if(e<128){b+=String.fromCharCode(e);d++}else{if((e>191)&&(e<224)){c2=a.charCodeAt(d+1);b+=String.fromCharCode(((e&31)<<6)|(c2&63));d+=2}else{c2=a.charCodeAt(d+1);c3=a.charCodeAt(d+2);b+=String.fromCharCode(((e&15)<<12)|((c2&63)<<6)|(c3&63));d+=3}}}return b}}; 
 
 //打开模式：0：打开设计器；1:直接预览报表结果；2：直接打印预览；3：直接打印;8:打开报表管理程序
function openOCX(syscode,reportid,model,param){
	var myreportexturl=Base64.decode(reportexturl);
	if(syscode=='RPT') {
		ltrptocx.openJnlpProgram(syscode,'2.3.6.2',ROOT_PATH+'/common/jre6.zip',
			 ROOT_PATH+'/longtu/report'+'?'+myreportexturl+'&reportid='+reportid+'&openModel='+model
						,myreportexturl+'&reportid='+reportid+'&openModel='+model);
	} else if(syscode=='RPT_jasper'){
		AppCaller.callApp("RPT_jasper",param+reportid+"&noreportcode");
	}
}

function clickRptType(obj){
	var rptTypeId = d.getSelected();
	var rptTypeArr = new Array();
	rptTypeArr.push(rptTypeId);
	findAllChildren(rptTypeId,rptTypeArr);  
	   
	var datas = new Array();
	for(j=0;j<rptTypeArr.length;j++){
		var tempTypeId = rptTypeArr[j];
	    for (i=0;i<rptdata.length;i++){
			if(rptdata[i].reporttypeid==tempTypeId){
				datas.push(rptdata[i]);
			}
		}
	}
	tmain.data = datas;
	tmain.show();
}
	
function findAllChildren(rptTypeId,rptTypeArr){
	for (var i=0; i<d.aNodes.length; i++) {
		if (d.aNodes[i].pid==rptTypeId){
			rptTypeArr.push(d.aNodes[i].id);
			findAllChildren(d.aNodes[i].id,rptTypeArr);
	    }
	}
}
	
function isLeaf(rptTypeId){
	for (var i=0; i<d.aNodes.length; i++) {
		if (d.aNodes[i].id==rptTypeId){
			return !d.aNodes[i]._hc;
	    }
	}
	return false;
}
        
function getCurRptTypeId(){
	return d.getSelected();
}

function getRptTypeName(rptTypeId){
	var rptTypeNode=getRptTypeNode(rptTypeId);
	if(rptTypeNode != null)
		return rptTypeNode.name;
	else
		return '';
}

function getRptTypeNode(rptTypeId){
	for (var i=0; i<d.aNodes.length; i++) {
		if (d.aNodes[i].id==rptTypeId){
			return d.aNodes[i];
	    }
	}
	return null;
}