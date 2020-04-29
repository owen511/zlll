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
foldersTree = gFld("�ڼ�", "")
foldersTree.treeID = "checkboxTree";
foldersTree.iconSrc = ICONPATH + "home.gif";
foldersTree.iconSrcClosed = ICONPATH + "home.gif";

//�������������Ϊid���벻Ҫ�ظ�
Aux1 = insDocCheckBox(foldersTree,"00-һ��","00-һ��");
Aux2 = insDocCheckBox(foldersTree,"01-����","01-����");
Aux3 = insDocCheckBox(foldersTree,"02-����","02-����");
Aux4 = insDocCheckBox(foldersTree,"03-����","03-����");
Aux5 = insDocCheckBox(foldersTree,"04-����","04-����");
Aux6 = insDocCheckBox(foldersTree,"05-����","05-����");
Aux7 = insDocCheckBox(foldersTree,"06-����","06-����");
Aux8 = insDocCheckBox(foldersTree,"07-����","07-����");
Aux9 = insDocCheckBox(foldersTree,"08-����","08-����");
Aux10 = insDocCheckBox(foldersTree,"09-ʮ��","09-ʮ��");
Aux11 = insDocCheckBox(foldersTree,"10-ʮһ��","10-ʮһ��");
Aux12 = insDocCheckBox(foldersTree,"11-ʮ����","11-ʮ����");
Aux13 = insDocCheckBox(foldersTree,"12-������һ","12-������һ");
Aux14 = insDocCheckBox(foldersTree,"13-�����ڶ�","13-�����ڶ�");
Aux15 = insDocCheckBox(foldersTree,"14-��������","14-��������");
Aux16 = insDocCheckBox(foldersTree,"15-��������","15-��������");
Aux17 = insDocCheckBox(foldersTree,"16-��������","16-��������");
