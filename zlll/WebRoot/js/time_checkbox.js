//
// Copyright (c) 2006 by Conor O'Mahony.
// For enquiries, please email GubuSoft@GubuSoft.com.
// Please keep all copyright notices below.
// Original author of TreeView script is Marcelino Martins.
//
// This document includes the TreeView script.
// The TreeView script can be found at http://www.TreeView.net.
// The script is Copyright (c) 2006 by Conor O'Mahony.
//
// This configuration file is used to demonstrate how to add checkboxes to your tree.
// If your site will not display checkboxes, pick a different configuration file as 
// the example to follow and adapt.  You can find general instructions for this file 
// at www.treeview.net.  Intructions on how to add checkboxes to a tree are provided 
// in this file.
//

USETEXTLINKS = 1  
STARTALLOPEN = 0
HIGHLIGHT = 0
PRESERVESTATE = 1

ICONPATH = '../images/tree/';

// NOTE:  If you are going to set USEICONS = 1, then you will want to edit the gif 
// files and remove the white space on the right
USEICONS = 0

// In this case we want the whole tree to be built, even those branches that are 
// closed. The reason is that otherwise some form elements might not be built at 
// all before the user presses the "Get Values" button.
BUILDALL = 1


// Some auxiliary functions for the contruction of the tree follow.  You will 
// certainly want to change these functions for your own purposes.
//
// These functions are directly related with the additional JavaScript in the 
// page holding the tree (demoCheckboxLeftFrame.html), where the form handling 
// code resides.

// If you want to add checkboxes to the folder, you will have to create a function 
// similar to this one and then call it in the tree construction section below.

function insFldCheckBox(parent,label,value){
	var newObj ;
	newObj = insFld(parent, gFld(label, ""));
	newObj.prependHTML =  "<td valign=middle><input type=checkbox name=" + value + "  value ="+value+"></td>"
	return newObj ;
}
function insDocCheckBox(parent,label,value){
	var newObj ;
	newObj = insDoc(parent, gLnk("T",label, ""));
	newObj.prependHTML =  "<td valign=middle><input type=checkbox name=" + value + "  value ="+value+"></td>"
	return newObj ;
}

// The following code constructs the tree.
foldersTree = gFld("期间", "")
foldersTree.treeID = "checkboxTree";
foldersTree.iconSrc = ICONPATH + "home.gif";
foldersTree.iconSrcClosed = ICONPATH + "home.gif";

//这里第三个参数为id，请不要重复
Aux1 = insDocCheckBox(foldersTree,"00-一月","00-一月");
Aux2 = insDocCheckBox(foldersTree,"01-二月","01-二月");
Aux3 = insDocCheckBox(foldersTree,"02-三月","02-三月");
Aux4 = insDocCheckBox(foldersTree,"03-四月","03-四月");
Aux5 = insDocCheckBox(foldersTree,"04-五月","04-五月");
Aux6 = insDocCheckBox(foldersTree,"05-六月","05-六月");
Aux7 = insDocCheckBox(foldersTree,"06-七月","06-七月");
Aux8 = insDocCheckBox(foldersTree,"07-八月","07-八月");
Aux9 = insDocCheckBox(foldersTree,"08-九月","08-九月");
Aux10 = insDocCheckBox(foldersTree,"09-十月","09-十月");
Aux11 = insDocCheckBox(foldersTree,"10-十一月","10-十一月");
Aux12 = insDocCheckBox(foldersTree,"11-十二月","11-十二月");
Aux13 = insDocCheckBox(foldersTree,"12-调整期一","12-调整期一");
Aux14 = insDocCheckBox(foldersTree,"13-调整期二","13-调整期二");
Aux15 = insDocCheckBox(foldersTree,"14-调整期三","14-调整期三");
Aux16 = insDocCheckBox(foldersTree,"15-调整期四","15-调整期四");
Aux17 = insDocCheckBox(foldersTree,"16-调整期五","16-调整期五");
