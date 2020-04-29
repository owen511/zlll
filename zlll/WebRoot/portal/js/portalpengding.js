function maskPengdingTask(){
	if(Ext.lt.portal.component.zfcgpengding==null){
		return
	}
		var item=Ext.getCmp("mainbody").get(0).items.items[0].items.items;
		//Ext.getCmp("mainbody").getEl().mask();
		item=item.concat(Ext.getCmp("mainbody").get(0).items.items[1].items.items);
		if(Ext.lt.portal.component.zfcgpengding.havependingtask == true){
			Ext.getCmp("lefttreemenu").getEl().mask();
			for(var i=0;i<item.size();i++){
				if(item[i].pengding != true){
					var mask = item[i].getEl().mask().dom;
					mask.style.top="10px";
					//mask.style.left="10px";
				}
			}
		}
	}
maskPengdingTask();