// ��������ռ�
if(Ext.fasp.ui==null) Ext.fasp.ui={}
Ext.fasp.ui.pagination=Ext.lt.createComponent(function(_page,_rs){
	var p=Ext.lt.clone(_page);
	p.rs=_rs;
	p.allflag=1;
	function _draw(p,obj){
		if(obj==null) return;
		var html=[];
		html.push('<table cellSpacing=0 cellPadding=0 border=0 width=100%><tr><td width=100% align=right>');
		html.push('<TABLE id="paginationtbl" cellSpacing=0 cellPadding=0 border=0><TBODY><TR>');
		//�Ŵ���ʱ������
		//html.push('<TD align="center" width="50" nowrap="nowrap"><a href="#"> <img id="tmainzoomicon"src='+ROOT_PATH+'"/images/done_btn/zoomin.gif"alt="�Ŵ�" border="0" height="20" width="20" align="absmiddle" /></a></TD>');
		html.push('<TD align="center" nowrap="nowrap"><a >��ҳ</a> <a >��ҳ</a> <a >��ҳ</a> <a >ĩҳ</a>��</td>');
		html.push('<td>�� '+p.totalrows+' ��,<a style="font: black">ÿҳ</a><input id="setpage_size" title=\'����ÿҳ������\' ');
		html.push(' size="4" /><a style="font: black">��</a>,<a></a></td>');
		html.push('<td align="right"><input id="page" type="text" style="width: 30px; height: 18px; border: 1px #CCC solid; line-height: 18px; text-align: center;" size="3" /><button class="jumppage" >��ת</button></td></tr></table>');
		html.push('</td></tr></table>');		
		obj.innerHTML=html.join("");
		//obj.style.align ='right';
		_initInfo(p,obj);
	}
	function _initInfo(p,obj){
		//p.currpage ��ǰҳ��
		//p.totalpages ��ҳ��
		//p.totalrows  ������
		//p.rows ÿҳ����
		p.currpage=p.currpage<0?1:p.currpage;
		p.totalpages=p.totalpages<0?1:p.totalpages;
		p.totalrows=p.totalrows<0?1:p.totalrows;
		p.rows=p.rows<0?20:p.rows;
		
		if(p.totalrows%p.rows==0){
			p.totalpages=p.totalrows/p.rows
		}else{
			try {
				p.totalpages=floor(p.totalrows/p.rows)+1;
			} catch (e) {
			}
		}

		var as=obj.getElementsByTagName('A');
		//��ҳ
		_previousPage(p,as,obj);
		_nextPage(p,as,obj);
		as[6].innerHTML=' �� '+p.currpage+' / '+p.totalpages+' ҳ';
		var inputs=obj.getElementsByTagName('input');
		_sizePage(p,inputs[0],obj);
		_runToPage(p,inputs[1],obj)
		obj.getElementsByTagName('button')[0].onclick=function(){
			p.send(obj);
		}
	}
	function _sizePage(p,i,obj){
		i.value=p.rows;
		i.onblur=function(){
		   	var oPagesize = this.value;
			if (Ext.lt.util.checkNumber(this.value,1,p.totalrows)) {
		        alert("������һ����Чֵ��Ϊÿҳ������");
				this.value = p.rows;
		        return false;
		    }
			p.rows = oPagesize;
			return true;
		}
		i.onkeyup=function(e){
			 if (event.keyCode == 13) {
			 	if(this.onblur())p.send(obj);
			 }
		}
	}
	function _runToPage(p,i,obj){
		i.value=p.currpage;
		i.onblur=function(){
			if (Ext.lt.util.checkNumber(this.value,1,p.totalpages)!=0) {
		        alert("������һ����Чֵ��ΪҪ��ת��ҳ����");
				this.value = p.currpage;
		        return false;
		    }
		    p.currpage = this.value;
		    return true;
		}
		i.onkeyup=function(e){
			 if (event.keyCode == 13) {
			 	if(this.onblur())p.send(obj);
			 }
		}
	}
	function _previousPage(p,as,obj){
		if(p.currpage != 1 ? (p.totalpages > 1) : false){
			as[0].href='#';
			as[1].href='#';
			as[0].onclick=function(){
				p.currpage=1;
				p.send(obj);
			};
			as[1].onclick=function(){
				p.currpage=p.currpage-1;
				p.send(obj);
			};
		}
		
	}
	function _nextPage(p,as,obj){
		if( p.currpage <p.totalpages){
			as[3].href='#';
			as[2].href='#';
			as[3].onclick=function(){
				p.currpage=p.totalpages;
				p.send(obj);
			};
			as[2].onclick=function(){
				p.currpage=p.currpage+1;
				p.send(obj);
			};
		}
	}
	function _toPage(p,obj){
		if($("#queryform")!=null){
			if($("#queryform")[0]!=null && $("#queryform")[0].dosubmit!=null){
				oldtopage(p,obj);
			}
		}
		Ext.lt.message.send('querybtn','submit',p);
	}
	function oldtopage(p,obj){
		if(document.getElementById("advancedQueryForm")!=null&&document.getElementById("advancedQueryForm").advancedQuery!=null&&document.getElementById("advancedQueryForm").advancedQuery.value=="advancedQuery"){
			var formObj = document.getElementById("advancedQueryForm");
			formObj.ad_allflag.value = 0;
			formObj.ad_currpage.value = p.currpage;
			formObj.ad_rows.value = p.rows;
			formObj.ad_totalpages.value = p.totalpages;
			formObj.ad_totalrows.value = p.totalrows;
			//���Լ���ҳ�����ر���
			try{
		        doprivateQuery(formObj);
			}catch(e){
				//���ɹ�,������,��û��ʵ�ָ÷���
			}
			//��ҳʱ����������� 20090915 kim
			var val = "wfstat";
			var uri = window.location.search;
			var re = new RegExp("" +val+ "\=([^\&\?]*)", "ig");
			var wfstat = ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
			if(wfstat!=null){
				if(formObj.action.indexOf("?")!=-1){
					formObj.action = formObj.action +"&wfstat="+wfstat;
				}else {
					formObj.action = formObj.action +"?wfstat="+wfstat;					
				}
			}
	       	query();
	       	return;        	
		} else if(document.getElementById("queryform")!=null){
	      		var formObj = document.getElementById("queryform");
			formObj.allflag.value = 0;
			formObj.currpage.value = p.currpage;
			formObj.rows.value =p.rows;
			formObj.totalpages.value = p.totalpages;
			formObj.totalrows.value = p.totalrows;;
			//���Լ���ҳ�����ر���
			try{
		        doprivateSimQuery(formObj);
			}catch(e){
				//���ɹ�,������,��û��ʵ�ָ÷���
			}
			//��ҳʱ����������� 20090915 kim
			var val = "wfstat";
			var uri = window.location.search;
			var re = new RegExp("" +val+ "\=([^\&\?]*)", "ig");
			var wfstat = ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
			if(wfstat!=null){
				if(formObj.action.indexOf("?")!=-1){
					formObj.action = formObj.action +"&wfstat="+wfstat;
				}else {
					formObj.action = formObj.action +"?wfstat="+wfstat;					
				}
			}
	       	formObj.dosubmit(p,obj);
	       	return;
	    }
	}
	p.send=function(obj){
		_toPage(this,obj);
	}
	p.draw=function(obj){
		if(obj==null){
			obj=document.getElementById("paginationdiv");
		}
		if(typeof(obj)=='string'){
			obj=document.getElementById(obj);
		}
		_draw(this,obj);
	}
	p.resize=function(){}
	return p;
})