//����˵���ʾ����ۣ����Դ����涨���2�ָ�ʽ��ѡ����һ
var menuskin = "skin1";
//�Ƿ�����������ڵ�״̬������ʾ�˵���Ŀ����Ӧ�������ַ���
var display_url = 0;

function showmenuie5(id) {
//��ȡ��ǰ����Ҽ����º��λ�ã��ݴ˶���˵���ʾ��λ��
var rightedge = document.body.clientWidth-event.clientX;
var bottomedge = document.body.clientHeight-event.clientY;
var ie5menu = document.getElementById(id);
//��������λ�õ������ұߵĿռ�С�ڲ˵��Ŀ�ȣ��Ͷ�λ�˵��������꣨Left��Ϊ��ǰ���λ������һ���˵����
if (rightedge <ie5menu.offsetWidth)
ie5menu.style.left = document.body.scrollLeft + event.clientX - ie5menu.offsetWidth;
else
//���򣬾Ͷ�λ�˵���������Ϊ��ǰ���λ��
ie5menu.style.left = document.body.scrollLeft + event.clientX;

//��������λ�õ������±ߵĿռ�С�ڲ˵��ĸ߶ȣ��Ͷ�λ�˵��������꣨Top��Ϊ��ǰ���λ������һ���˵��߶�
if (bottomedge <ie5menu.offsetHeight)
ie5menu.style.top = document.body.scrollTop + event.clientY - ie5menu.offsetHeight;//+10;
else
//���򣬾Ͷ�λ�˵���������Ϊ��ǰ���λ��
ie5menu.style.top = document.body.scrollTop + event.clientY;//+10;
//ie5menu.style.top = ie5menu.style.top +10;
//���ò˵��ɼ�
ie5menu.style.display = "block";
ie5menu.style.visibility = "visible";
return false;
}
function hidemenuie5(id) {
	var ie5menu = document.getElementById(id);
	//���ز˵�
	//�ܼ򵥣�����visibilityΪhidden��OK��
	if (ie5menu != null) {
		ie5menu.style.display = "none";
		ie5menu.style.visibility = "hidden";
	}
}

function highlightie5() {
//��������꾭���Ĳ˵�����Ŀ

//�����꾭���Ķ�����menuitems�����������ñ���ɫ��ǰ��ɫ
//event.srcElement.className��ʾ�¼����Զ�������ƣ����������ж����ֵ�������Ҫ��
if (event.srcElement.className == "menuitems") {
event.srcElement.style.backgroundColor = "highlight";
event.srcElement.style.color = "white";

//��������Ϣ��ʾ��״̬��
//event.srcElement.url��ʾ�¼����Զ����ʾ������URL
if (display_url)
window.status = event.srcElement.url;
   }
}

function lowlightie5() {
//�ָ��˵�����Ŀ��������ʾ

if (event.srcElement.className == "menuitems") {
event.srcElement.style.backgroundColor = "";
event.srcElement.style.color = "black";
window.status = "";
   }
}

//�Ҽ������˵�������ת
function jumptoie5() {
//ת���µ�����λ��
var seltext=window.document.selection.createRange().text
if (event.srcElement.className == "menuitems") {
//������ڴ����ӵ�Ŀ�괰�ڣ������Ǹ������д�����
if (event.srcElement.getAttribute("target") != null)
window.open(event.srcElement.url, event.srcElement.getAttribute("target"));
else
//�����ڵ�ǰ���ڴ�����
window.location = event.srcElement.url;
   }
}
function fixstyle(cellnum){
var tab = document.getElementsByTagName("TABLE");
var tablen = document.getElementsByTagName("TABLE").length;
 for(var i = 0 ;i<tablen;i++){
    if(tab[i].id != null){
       for(var j=0 ;j<tab[i].children.length;j++){
          for(var m = 0 ;m<tab[i].children[j].length;m++){
            for(var n=0;n<tab[i].children[j].children[m];n++){
               tab[i].children[j].children[m].children[n].className="FixedDataColumn";
            }
          }
       }
    }
 }
//document.getElementsByTagName("TABLE")[26].children[1].children[0].children[0].className="FixedDataColumn";
//document.getElementsByTagName("TABLE")[26].children[1].children[0].children[1].className="FixedDataColumn";
//document.getElementsByTagName("TABLE")[26].children[1].children[0].children[2].className="FixedDataColumn";
}