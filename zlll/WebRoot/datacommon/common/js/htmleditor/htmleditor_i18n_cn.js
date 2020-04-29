var HtmlEditor_i18n = {};
HtmlEditor_i18n["Bold"] = "����";
HtmlEditor_i18n["Italic"] = "б��";
HtmlEditor_i18n["Underline"] = "�»���";
HtmlEditor_i18n["StrikeThrough"] = "ɾ����";
HtmlEditor_i18n["Indent"] = "����";
HtmlEditor_i18n["Outdent"] = "��������";
HtmlEditor_i18n["InsertOrderedList"] = "���";
HtmlEditor_i18n["InsertUnOrderedList"] = "��Ŀ����";

HtmlEditor_i18n["FormatBlock"] = "������ʽ";
HtmlEditor_i18n["FontName"] = "����";
HtmlEditor_i18n["FontSize"] = "�ֺ�";

HtmlEditor_i18n["RemoveFormat"] = "�����ʽ";
HtmlEditor_i18n["ForeColor"] = "ǰ��ɫ";
HtmlEditor_i18n["BackColor"] = "����ɫ";
HtmlEditor_i18n["Insert Link"] = "��������";
HtmlEditor_i18n["UnLink"] = "ȡ������";

HtmlEditor_i18n["JustifyLeft"] = "�����";
HtmlEditor_i18n["JustifyCenter"] = "���ж���";
HtmlEditor_i18n["JustifyRight"] = "�Ҷ���";

HtmlEditor_i18n["FontSize"] = "�ֺ�";

HtmlEditor_i18n["Insert Image"] = "����ͼƬ";
HtmlEditor_i18n["Insert Emotion"] = "�������";

HtmlEditor_i18n["Insert Math Formula"] = "������ѧ��ʽ";
HtmlEditor_i18n["Upload File"] = "�����ϴ��ļ�";
HtmlEditor_i18n["Insert Table"] = "������";
HtmlEditor_i18n["Insert Special Character"] = "����ƴ���������ַ�";
HtmlEditor_i18n["Edit HTML Source Code"] = "�༭HTMLԴ����";

HtmlEditor_i18n["Formula Example"] = "��ѧ��ʽʾ��";
HtmlEditor_i18n["Width"] = "���";
HtmlEditor_i18n["Height"] = "�߶�"

HtmlEditor_i18n.get = function(text){
  var value = text;
  if(this[text]){
    value = this[text];
  }
  return value;
}

window.HtmlEditor_i18n = HtmlEditor_i18n;