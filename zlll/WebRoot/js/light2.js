// JavaScript Document
<!--µãÁÁmenuÇ°µÄµÆ-->
	function doLight(obj) {
	    for(var i=1;i<=10;i++){
			var imgs = obj.childNodes[0];
			var now_id = imgs.id;
			if(now_id=="light"+i){
			  document.getElementById(now_id).src="../../images/buttons/blue_light.gif";
			}
			
		}
		//document.getElementById("light1").src="../images/buttons/blue_light.gif";
		
	}
	function doReset(obj) {
	    for(var i=1;i<=10;i++){
			var imgs = obj.childNodes[0];
			var now_id = imgs.id;
			if(now_id=="light"+i){
			  document.getElementById(now_id).src="../../images/buttons/white_light.gif";
			}
		}
	}