String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}

var leftgather = -1;
var rightgather = -1;
var selectedtoright = -1;
var selectedtoleft = -1;

window.onload = iniGetherSelect;

function iniGetherSelect(){
	
	leftgather = document.getElementById("leftgather");
	rightgather = document.getElementById("rightgather");
	//selectedtoright = document.getElementById("selectedtoright");
	//selectedtoleft = document.getElementById("selectedtoleft");

//	selectedtoright.onclick = funselectedtoright;
	//selectedtoleft.onclick = funselectedtoleft;
}

function funselectedtoright(){
    leftgather = document.getElementById("leftgather");
    rightgather = document.getElementById("rightgather");
	var optlist = leftgather.options;
	var len = optlist.length;
	for(var i=0;i<len;i++){
		opt = optlist[i];
		if(opt.selected){
			len--;
			i--;
			rightgather.insertAdjacentElement("beforeEnd",opt);
		}
	}
}

function funselectedtoleft(){
	var optlist = rightgather.options;
	var len = optlist.length;
	for(var i=0;i<len;i++){
		opt = optlist[i];
		if(opt.selected){
			len--;
			i--;
			leftgather.insertAdjacentElement("beforeEnd",opt);
		}
	}
}

function funselectedtoup(getherlist){
	var optlist = getherlist.options
	for(var i=1;i<optlist.length;i++){
		var opt = optlist[i];
		if(opt.selected){
			opt.swapNode(optlist[i-1]);
			break;
		}
	}
}

function funselectedtodown(getherlist){
	var optlist = getherlist.options
	for(var i=optlist.length-2;i>-1;i--){
		var opt = optlist[i];
		if(opt.selected){
			opt.swapNode(optlist[i+1]);
			break;
		}
	}
}

