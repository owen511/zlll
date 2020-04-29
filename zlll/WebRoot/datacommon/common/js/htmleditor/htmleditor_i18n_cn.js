var HtmlEditor_i18n = {};
HtmlEditor_i18n["Bold"] = "粗体";
HtmlEditor_i18n["Italic"] = "斜体";
HtmlEditor_i18n["Underline"] = "下划线";
HtmlEditor_i18n["StrikeThrough"] = "删除线";
HtmlEditor_i18n["Indent"] = "缩进";
HtmlEditor_i18n["Outdent"] = "减少缩进";
HtmlEditor_i18n["InsertOrderedList"] = "编号";
HtmlEditor_i18n["InsertUnOrderedList"] = "项目符号";

HtmlEditor_i18n["FormatBlock"] = "段落样式";
HtmlEditor_i18n["FontName"] = "字体";
HtmlEditor_i18n["FontSize"] = "字号";

HtmlEditor_i18n["RemoveFormat"] = "清除格式";
HtmlEditor_i18n["ForeColor"] = "前景色";
HtmlEditor_i18n["BackColor"] = "背景色";
HtmlEditor_i18n["Insert Link"] = "插入链接";
HtmlEditor_i18n["UnLink"] = "取消链接";

HtmlEditor_i18n["JustifyLeft"] = "左对齐";
HtmlEditor_i18n["JustifyCenter"] = "居中对齐";
HtmlEditor_i18n["JustifyRight"] = "右对齐";

HtmlEditor_i18n["FontSize"] = "字号";

HtmlEditor_i18n["Insert Image"] = "插入图片";
HtmlEditor_i18n["Insert Emotion"] = "插入表情";

HtmlEditor_i18n["Insert Math Formula"] = "插入数学公式";
HtmlEditor_i18n["Upload File"] = "插入上传文件";
HtmlEditor_i18n["Insert Table"] = "插入表格";
HtmlEditor_i18n["Insert Special Character"] = "插入拼音等特殊字符";
HtmlEditor_i18n["Edit HTML Source Code"] = "编辑HTML源代码";

HtmlEditor_i18n["Formula Example"] = "数学公式示例";
HtmlEditor_i18n["Width"] = "宽度";
HtmlEditor_i18n["Height"] = "高度"

HtmlEditor_i18n.get = function(text){
  var value = text;
  if(this[text]){
    value = this[text];
  }
  return value;
}

window.HtmlEditor_i18n = HtmlEditor_i18n;