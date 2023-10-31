import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import less from 'highlight.js/lib/languages/less';
import bash from 'highlight.js/lib/languages/bash';
import ini from 'highlight.js/lib/languages/ini';
import java from 'highlight.js/lib/languages/java';
import lua from 'highlight.js/lib/languages/lua';
import perl from 'highlight.js/lib/languages/perl';
import php from 'highlight.js/lib/languages/php';
import powershell from 'highlight.js/lib/languages/powershell';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import vbnet from 'highlight.js/lib/languages/vbnet';
import vbscript from 'highlight.js/lib/languages/vbscript';
import groovy from 'highlight.js/lib/languages/groovy';
import xml from 'highlight.js/lib/languages/xml';
import ruby from 'highlight.js/lib/languages/ruby';
import go from 'highlight.js/lib/languages/go';
import markdown from 'highlight.js/lib/languages/markdown';

//Assembly,BatchFile,C#,CSS,HTML,INIFile,Java,JScript,Lua,MSIL,Pascal,Perl,PHP,PowerShell,Python,SQL,VB.NET,VBScript,XAML,XML
//"java,xml,sql,jscript,groovy,css,cpp,c#,pythonvb,perl,php,ruby,delphi"
//"选择语言...,HTML,CSS,JavaScript,PHP,Python,Java,C#,C,C++,Golang,Bash,SQL,XML,Swift,Scala,Ruby,Perl,Perl 6,Lua,Yaml"
//"javascript,php,java,python,css,html,ruby"
//"Javascript,HTML/XML,Java,C/C++/Objectiv-C,Ruby,C#,CSS,Delphi,Erlang,Groovy,JavaFX,Perl,PHP,PowerShell,Python,Scala,SQL,VB,AS3,Bash,ColdFusion,Diff,Plain,Sass"
const languages = {
  bash,
  c,
  cpp,
  csharp,
  css,
  scss,
  less,
  ini,
  groovy,
  go,
  java,
  javascript,
  lua,
  markdown,
  perl,
  php,
  powershell,
  python,
  ruby,
  sql,
  vbnet,
  vbscript,
  xml,
};
Object.keys(languages).forEach((lang) => [
  hljs.registerLanguage(lang, languages[lang]),
]);
window.hljs = hljs;
export default function highlight(code, lang) {
  if (lang && languages[lang]) {
    return hljs.highlight(lang, code).value;
  }
  return hljs.highlightAuto(code).value;
}
