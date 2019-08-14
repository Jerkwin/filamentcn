/**
  Markdeep.js
  Version 1.04

  Copyright 2015-2019, Morgan McGuire, http://casual-effects.com
  All rights reserved.

  -------------------------------------------------------------

  See http://casual-effects.com/markdeep for documentation on how to
  use this script make your plain text documents render beautifully
  in web browsers.

  Markdeep was created by Morgan McGuire. It extends the work of:

   - John Gruber's original Markdown
   - Ben Hollis' Maruku Markdown dialect
   - Michel Fortin's Markdown Extras dialect
   - Ivan Sagalaev's highlight.js
   - Contributors to the above open source projects

  -------------------------------------------------------------

  You may use, extend, and redistribute this code under the terms of
  the BSD license at https://opensource.org/licenses/BSD-2-Clause.

  Contains highlight.js (https://github.com/isagalaev/highlight.js) by Ivan
  Sagalaev, which is used for code highlighting. (BSD 3-clause license)
*/
/**See http://casual-effects.com/markdeep for @license and documentation.
markdeep.min.js 1.04 (C) 2019 Morgan McGuire
highlight.min.js 9.13.1 (C) 2017 Ivan Sagalaev https://highlightjs.org/*/
(function() {
'use strict';

var MARKDEEP_FOOTER = '<div class="markdeepFooter"><i>formatted by <a href="http://casual-effects.com/markdeep" style="color:#999">Markdeep&nbsp;1.04&nbsp;&nbsp;</a></i><div style="display:inline-block;font-size:13px;font-family:\'Times New Roman\',serif;vertical-align:middle;transform:translate(-3px,-1px)rotate(135deg);">&#x2712;</div></div>';

// For minification. This is admittedly scary.
var _ = String.prototype;
_.rp = _.replace;
_.ss = _.substring;

// Regular expression version of String.indexOf
_.regexIndexOf = function(regex, startpos) {
    var i = this.ss(startpos || 0).search(regex);
    return (i >= 0) ? (i + (startpos || 0)) : i;
}

/** Enable for debugging to view character bounds in diagrams */
var DEBUG_SHOW_GRID = false;

/** Overlay the non-empty characters of the original source in diagrams */
var DEBUG_SHOW_SOURCE = DEBUG_SHOW_GRID;

/** Use to suppress passing through text in diagrams */
var DEBUG_HIDE_PASSTHROUGH = DEBUG_SHOW_SOURCE;

/** In pixels of lines in diagrams */
var STROKE_WIDTH = 2;

/** A box of these denotes a diagram */
var DIAGRAM_MARKER = '*';

// http://stackoverflow.com/questions/1877475/repeat-character-n-times
// ECMAScript 6 has a String.repeat method, but that's not available everywhere
var DIAGRAM_START = Array(5 + 1).join(DIAGRAM_MARKER);

/** attribs are optional */
function entag(tag, content, attribs) {
    return '<' + tag + (attribs ? ' ' + attribs : '') + '>' + content + '</' + tag + '>';
}

function measureFontSize(fontStack) {
    try {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        ctx.font = '10pt ' + fontStack;
        return ctx.measureText("M").width;
    } catch (e) {
        // Needed for Firefox include...iframe canvas doesn't work for some reason
        return 10;
    }
}

/*! highlight.js v9.13.1 | BSD3 License | git.io/hljslicense extended with nanoscript mode */
!function(e){var t="object"==typeof window&&window||"object"==typeof self&&self;"undefined"!=typeof exports?e(exports):t&&(t.hljs=e({}),"function"==typeof define&&define.amd&&define([],function(){return t.hljs}))}(function(e){function t(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function r(e){return e.nodeName.toLowerCase()}function a(e,t){var r=e&&e.exec(t);return r&&0===r.index}function n(e){return k.test(e)}function i(e){var t,r,a,i,s=e.className+" ";if(s+=e.parentNode?e.parentNode.className:"",r=A.exec(s))return v(r[1])?r[1]:"no-highlight";for(s=s.split(/\s+/),t=0,a=s.length;a>t;t++)if(i=s[t],n(i)||v(i))return i}function s(e){var t,r={},a=Array.prototype.slice.call(arguments,1);for(t in e)r[t]=e[t];return a.forEach(function(e){for(t in e)r[t]=e[t]}),r}function c(e){var t=[];return function a(e,n){for(var i=e.firstChild;i;i=i.nextSibling)3===i.nodeType?n+=i.nodeValue.length:1===i.nodeType&&(t.push({event:"start",offset:n,node:i}),n=a(i,n),r(i).match(/br|hr|img|input/)||t.push({event:"stop",offset:n,node:i}));return n}(e,0),t}function o(e,a,n){function i(){return e.length&&a.length?e[0].offset!==a[0].offset?e[0].offset<a[0].offset?e:a:"start"===a[0].event?e:a:e.length?e:a}function s(e){function a(e){return" "+e.nodeName+'="'+t(e.value).replace('"',"&quot;")+'"'}u+="<"+r(e)+y.map.call(e.attributes,a).join("")+">"}function c(e){u+="</"+r(e)+">"}function o(e){("start"===e.event?s:c)(e.node)}for(var l=0,u="",b=[];e.length||a.length;){var d=i();if(u+=t(n.substring(l,d[0].offset)),l=d[0].offset,d===e){b.reverse().forEach(c);do o(d.splice(0,1)[0]),d=i();while(d===e&&d.length&&d[0].offset===l);b.reverse().forEach(s)}else"start"===d[0].event?b.push(d[0].node):b.pop(),o(d.splice(0,1)[0])}return u+t(n.substr(l))}function l(e){return e.v&&!e.cached_variants&&(e.cached_variants=e.v.map(function(t){return s(e,{v:null},t)})),e.cached_variants||e.eW&&[s(e)]||[e]}function u(e){function t(e){return e&&e.source||e}function r(r,a){return new RegExp(t(r),"m"+(e.cI?"i":"")+(a?"g":""))}function a(n,i){if(!n.compiled){if(n.compiled=!0,n.k=n.k||n.bK,n.k){var s={},c=function(t,r){e.cI&&(r=r.toLowerCase()),r.split(" ").forEach(function(e){var r=e.split("|");s[r[0]]=[t,r[1]?Number(r[1]):1]})};"string"==typeof n.k?c("keyword",n.k):w(n.k).forEach(function(e){c(e,n.k[e])}),n.k=s}n.lR=r(n.l||/\w+/,!0),i&&(n.bK&&(n.b="\\b("+n.bK.split(" ").join("|")+")\\b"),n.b||(n.b=/\B|\b/),n.bR=r(n.b),n.endSameAsBegin&&(n.e=n.b),n.e||n.eW||(n.e=/\B|\b/),n.e&&(n.eR=r(n.e)),n.tE=t(n.e)||"",n.eW&&i.tE&&(n.tE+=(n.e?"|":"")+i.tE)),n.i&&(n.iR=r(n.i)),null==n.r&&(n.r=1),n.c||(n.c=[]),n.c=Array.prototype.concat.apply([],n.c.map(function(e){return l("self"===e?n:e)})),n.c.forEach(function(e){a(e,n)}),n.starts&&a(n.starts,i);var o=n.c.map(function(e){return e.bK?"\\.?("+e.b+")\\.?":e.b}).concat([n.tE,n.i]).map(t).filter(Boolean);n.t=o.length?r(o.join("|"),!0):{exec:function(){return null}}}}a(e)}function b(e,r,n,i){function s(e){return new RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"m")}function c(e,t){var r,n;for(r=0,n=t.c.length;n>r;r++)if(a(t.c[r].bR,e))return t.c[r].endSameAsBegin&&(t.c[r].eR=s(t.c[r].bR.exec(e)[0])),t.c[r]}function o(e,t){if(a(e.eR,t)){for(;e.endsParent&&e.parent;)e=e.parent;return e}return e.eW?o(e.parent,t):void 0}function l(e,t){return!n&&a(t.iR,e)}function p(e,t){var r=N.cI?t[0].toLowerCase():t[0];return e.k.hasOwnProperty(r)&&e.k[r]}function m(e,t,r,a){var n=a?"":L.classPrefix,i='<span class="'+n,s=r?"":B;return i+=e+'">',i+t+s}function g(){var e,r,a,n;if(!y.k)return t(k);for(n="",r=0,y.lR.lastIndex=0,a=y.lR.exec(k);a;)n+=t(k.substring(r,a.index)),e=p(y,a),e?(A+=e[1],n+=m(e[0],t(a[0]))):n+=t(a[0]),r=y.lR.lastIndex,a=y.lR.exec(k);return n+t(k.substr(r))}function f(){var e="string"==typeof y.sL;if(e&&!M[y.sL])return t(k);var r=e?b(y.sL,k,!0,w[y.sL]):d(k,y.sL.length?y.sL:void 0);return y.r>0&&(A+=r.r),e&&(w[y.sL]=r.top),m(r.language,r.value,!1,!0)}function _(){E+=null!=y.sL?f():g(),k=""}function h(e){E+=e.cN?m(e.cN,"",!0):"",y=Object.create(e,{parent:{value:y}})}function x(e,t){if(k+=e,null==t)return _(),0;var r=c(t,y);if(r)return r.skip?k+=t:(r.eB&&(k+=t),_(),r.rB||r.eB||(k=t)),h(r,t),r.rB?0:t.length;var a=o(y,t);if(a){var n=y;n.skip?k+=t:(n.rE||n.eE||(k+=t),_(),n.eE&&(k=t));do y.cN&&(E+=B),y.skip||y.sL||(A+=y.r),y=y.parent;while(y!==a.parent);return a.starts&&(a.endSameAsBegin&&(a.starts.eR=a.eR),h(a.starts,"")),n.rE?0:t.length}if(l(t,y))throw new Error('Illegal lexeme "'+t+'" for mode "'+(y.cN||"<unnamed>")+'"');return k+=t,t.length||1}var N=v(e);if(!N)throw new Error('Unknown language: "'+e+'"');u(N);var C,y=i||N,w={},E="";for(C=y;C!==N;C=C.parent)C.cN&&(E=m(C.cN,"",!0)+E);var k="",A=0;try{for(var S,I,T=0;;){if(y.t.lastIndex=T,S=y.t.exec(r),!S)break;I=x(r.substring(T,S.index),S[0]),T=S.index+I}for(x(r.substr(T)),C=y;C.parent;C=C.parent)C.cN&&(E+=B);return{r:A,value:E,language:e,top:y}}catch(R){if(R.message&&-1!==R.message.indexOf("Illegal"))return{r:0,value:t(r)};throw R}}function d(e,r){r=r||L.languages||w(M);var a={r:0,value:t(e)},n=a;return r.filter(v).filter(C).forEach(function(t){var r=b(t,e,!1);r.language=t,r.r>n.r&&(n=r),r.r>a.r&&(n=a,a=r)}),n.language&&(a.second_best=n),a}function p(e){return L.tabReplace||L.useBR?e.replace(S,function(e,t){return L.useBR&&"\n"===e?"<br>":L.tabReplace?t.replace(/\t/g,L.tabReplace):""}):e}function m(e,t,r){var a=t?E[t]:r,n=[e.trim()];return e.match(/\bhljs\b/)||n.push("hljs"),-1===e.indexOf(a)&&n.push(a),n.join(" ").trim()}function g(e){var t,r,a,s,l,u=i(e);n(u)||(L.useBR?(t=document.createElementNS("http://www.w3.org/1999/xhtml","div"),t.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")):t=e,l=t.textContent,a=u?b(u,l,!0):d(l),r=c(t),r.length&&(s=document.createElementNS("http://www.w3.org/1999/xhtml","div"),s.innerHTML=a.value,a.value=o(r,c(s),l)),a.value=p(a.value),e.innerHTML=a.value,e.className=m(e.className,u,a.language),e.result={language:a.language,re:a.r},a.second_best&&(e.second_best={language:a.second_best.language,re:a.second_best.r}))}function f(e){L=s(L,e)}function _(){if(!_.called){_.called=!0;var e=document.querySelectorAll("pre code");y.forEach.call(e,g)}}function h(){addEventListener("DOMContentLoaded",_,!1),addEventListener("load",_,!1)}function x(t,r){var a=M[t]=r(e);a.aliases&&a.aliases.forEach(function(e){E[e]=t})}function N(){return w(M)}function v(e){return e=(e||"").toLowerCase(),M[e]||M[E[e]]}function C(e){var t=v(e);return t&&!t.disableAutodetect}var y=[],w=Object.keys,M={},E={},k=/^(no-?highlight|plain|text)$/i,A=/\blang(?:uage)?-([\w-]+)\b/i,S=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,B="</span>",L={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0};return e.highlight=b,e.highlightAuto=d,e.fixMarkup=p,e.highlightBlock=g,e.configure=f,e.initHighlighting=_,e.initHighlightingOnLoad=h,e.registerLanguage=x,e.listLanguages=N,e.getLanguage=v,e.autoDetection=C,e.inherit=s,e.IR="[a-zA-Z]\\w*",e.UIR="[a-zA-Z_]\\w*",e.NR="\\b\\d+(\\.\\d+)?",e.CNR="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BNR="\\b(0b[01]+)",e.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BE={b:"\\\\[\\s\\S]",r:0},e.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE]},e.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE]},e.PWM={b:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},e.C=function(t,r,a){var n=e.inherit({cN:"comment",b:t,e:r,c:[]},a||{});return n.c.push(e.PWM),n.c.push({cN:"doctag",b:"(?:TODO|FIXME|NOTE|BUG|XXX):",r:0}),n},e.CLCM=e.C("//","$"),e.CBCM=e.C("/\\*","\\*/"),e.HCM=e.C("#","$"),e.NM={cN:"number",b:e.NR,r:0},e.CNM={cN:"number",b:e.CNR,r:0},e.BNM={cN:"number",b:e.BNR,r:0},e.CSSNM={cN:"number",b:e.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0},e.RM={cN:"regexp",b:/\//,e:/\/[gimuy]*/,i:/\n/,c:[e.BE,{b:/\[/,e:/\]/,r:0,c:[e.BE]}]},e.TM={cN:"title",b:e.IR,r:0},e.UTM={cN:"title",b:e.UIR,r:0},e.METHOD_GUARD={b:"\\.\\s*"+e.UIR,r:0},e.registerLanguage("armasm",function(e){return{cI:!0,aliases:["arm"],l:"\\.?"+e.IR,k:{meta:".2byte .4byte .align .ascii .asciz .balign .byte .code .data .else .end .endif .endm .endr .equ .err .exitm .extern .global .hword .if .ifdef .ifndef .include .irp .long .macro .rept .req .section .set .skip .space .text .word .arm .thumb .code16 .code32 .force_thumb .thumb_func .ltorg ALIAS ALIGN ARM AREA ASSERT ATTR CN CODE CODE16 CODE32 COMMON CP DATA DCB DCD DCDU DCDO DCFD DCFDU DCI DCQ DCQU DCW DCWU DN ELIF ELSE END ENDFUNC ENDIF ENDP ENTRY EQU EXPORT EXPORTAS EXTERN FIELD FILL FUNCTION GBLA GBLL GBLS GET GLOBAL IF IMPORT INCBIN INCLUDE INFO KEEP LCLA LCLL LCLS LTORG MACRO MAP MEND MEXIT NOFP OPT PRESERVE8 PROC QN READONLY RELOC REQUIRE REQUIRE8 RLIST FN ROUT SETA SETL SETS SN SPACE SUBT THUMB THUMBX TTL WHILE WEND ",built_in:"r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 pc lr sp ip sl sb fp a1 a2 a3 a4 v1 v2 v3 v4 v5 v6 v7 v8 f0 f1 f2 f3 f4 f5 f6 f7 p0 p1 p2 p3 p4 p5 p6 p7 p8 p9 p10 p11 p12 p13 p14 p15 c0 c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 q0 q1 q2 q3 q4 q5 q6 q7 q8 q9 q10 q11 q12 q13 q14 q15 cpsr_c cpsr_x cpsr_s cpsr_f cpsr_cx cpsr_cxs cpsr_xs cpsr_xsf cpsr_sf cpsr_cxsf spsr_c spsr_x spsr_s spsr_f spsr_cx spsr_cxs spsr_xs spsr_xsf spsr_sf spsr_cxsf s0 s1 s2 s3 s4 s5 s6 s7 s8 s9 s10 s11 s12 s13 s14 s15 s16 s17 s18 s19 s20 s21 s22 s23 s24 s25 s26 s27 s28 s29 s30 s31 d0 d1 d2 d3 d4 d5 d6 d7 d8 d9 d10 d11 d12 d13 d14 d15 d16 d17 d18 d19 d20 d21 d22 d23 d24 d25 d26 d27 d28 d29 d30 d31 {PC} {VAR} {TRUE} {FALSE} {OPT} {CONFIG} {ENDIAN} {CODESIZE} {CPU} {FPU} {ARCHITECTURE} {PCSTOREOFFSET} {ARMASM_VERSION} {INTER} {ROPI} {RWPI} {SWST} {NOSWST} . @"},c:[{cN:"keyword",b:"\\b(adc|(qd?|sh?|u[qh]?)?add(8|16)?|usada?8|(q|sh?|u[qh]?)?(as|sa)x|and|adrl?|sbc|rs[bc]|asr|b[lx]?|blx|bxj|cbn?z|tb[bh]|bic|bfc|bfi|[su]bfx|bkpt|cdp2?|clz|clrex|cmp|cmn|cpsi[ed]|cps|setend|dbg|dmb|dsb|eor|isb|it[te]{0,3}|lsl|lsr|ror|rrx|ldm(([id][ab])|f[ds])?|ldr((s|ex)?[bhd])?|movt?|mvn|mra|mar|mul|[us]mull|smul[bwt][bt]|smu[as]d|smmul|smmla|mla|umlaal|smlal?([wbt][bt]|d)|mls|smlsl?[ds]|smc|svc|sev|mia([bt]{2}|ph)?|mrr?c2?|mcrr2?|mrs|msr|orr|orn|pkh(tb|bt)|rbit|rev(16|sh)?|sel|[su]sat(16)?|nop|pop|push|rfe([id][ab])?|stm([id][ab])?|str(ex)?[bhd]?|(qd?)?sub|(sh?|q|u[qh]?)?sub(8|16)|[su]xt(a?h|a?b(16)?)|srs([id][ab])?|swpb?|swi|smi|tst|teq|wfe|wfi|yield)(eq|ne|cs|cc|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al|hs|lo)?[sptrx]?",e:"\\s"},e.C("[;@]","$",{r:0}),e.CBCM,e.QSM,{cN:"string",b:"'",e:"[^\\\\]'",r:0},{cN:"title",b:"\\|",e:"\\|",i:"\\n",r:0},{cN:"number",v:[{b:"[#$=]?0x[0-9a-f]+"},{b:"[#$=]?0b[01]+"},{b:"[#$=]\\d+"},{b:"\\b\\d+"}],r:0},{cN:"symbol",v:[{b:"^[a-z_\\.\\$][a-z0-9_\\.\\$]+"},{b:"^\\s*[a-z_\\.\\$][a-z0-9_\\.\\$]+:"},{b:"[=#]\\w+"}],r:0}]}}),e.registerLanguage("bash",function(e){var t={cN:"variable",v:[{b:/\$[\w\d#@][\w\d_]*/},{b:/\$\{(.*?)}/}]},r={cN:"string",b:/"/,e:/"/,c:[e.BE,t,{cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]}]},a={cN:"string",b:/'/,e:/'/};return{aliases:["sh","zsh"],l:/\b-?[a-z\._]+\b/,k:{keyword:"if then else elif fi for while in do done case esac function",literal:"true false",built_in:"break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",_:"-ne -eq -lt -gt -f -d -e -s -l -a"},c:[{cN:"meta",b:/^#![^\n]+sh\s*$/,r:10},{cN:"function",b:/\w[\w\d_]*\s*\(\s*\)\s*\{/,rB:!0,c:[e.inherit(e.TM,{b:/\w[\w\d_]*/})],r:0},e.HCM,r,a,t]}}),e.registerLanguage("coffeescript",function(e){var t={keyword:"in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super yield import export from as default await then unless until loop of by when and or is isnt not",literal:"true false null undefined yes no on off",built_in:"npm require console print module global window document"},r="[A-Za-z$_][0-9A-Za-z$_]*",a={cN:"subst",b:/#\{/,e:/}/,k:t},n=[e.BNM,e.inherit(e.CNM,{starts:{e:"(\\s*/)?",r:0}}),{cN:"string",v:[{b:/'''/,e:/'''/,c:[e.BE]},{b:/'/,e:/'/,c:[e.BE]},{b:/"""/,e:/"""/,c:[e.BE,a]},{b:/"/,e:/"/,c:[e.BE,a]}]},{cN:"regexp",v:[{b:"///",e:"///",c:[a,e.HCM]},{b:"//[gim]*",r:0},{b:/\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/}]},{b:"@"+r},{sL:"javascript",eB:!0,eE:!0,v:[{b:"```",e:"```"},{b:"`",e:"`"}]}];a.c=n;var i=e.inherit(e.TM,{b:r}),s="(\\(.*\\))?\\s*\\B[-=]>",c={cN:"params",b:"\\([^\\(]",rB:!0,c:[{b:/\(/,e:/\)/,k:t,c:["self"].concat(n)}]};return{aliases:["coffee","cson","iced"],k:t,i:/\/\*/,c:n.concat([e.C("###","###"),e.HCM,{cN:"function",b:"^\\s*"+r+"\\s*=\\s*"+s,e:"[-=]>",rB:!0,c:[i,c]},{b:/[:\(,=]\s*/,r:0,c:[{cN:"function",b:s,e:"[-=]>",rB:!0,c:[c]}]},{cN:"class",bK:"class",e:"$",i:/[:="\[\]]/,c:[{bK:"extends",eW:!0,i:/[:="\[\]]/,c:[i]},i]},{b:r+":",e:":",rB:!0,rE:!0,r:0}])}}),e.registerLanguage("cpp",function(e){var t={cN:"keyword",b:"\\b[a-z\\d_]*_t\\b"},r={cN:"string",v:[{b:'(u8?|U|L)?"',e:'"',i:"\\n",c:[e.BE]},{b:'(u8?|U|L)?R"\\(',e:'\\)"'},{b:"'\\\\?.",e:"'",i:"."}]},a={cN:"number",v:[{b:"\\b(0b[01']+)"},{b:"(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"},{b:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],r:0},n={cN:"meta",b:/#\s*[a-z]+\b/,e:/$/,k:{"meta-keyword":"if else elif endif define undef warning error line pragma ifdef ifndef include"},c:[{b:/\\\n/,r:0},e.inherit(r,{cN:"meta-string"}),{cN:"meta-string",b:/<[^\n>]*>/,e:/$/,i:"\\n"},e.CLCM,e.CBCM]},i=e.IR+"\\s*\\(",s={keyword:"int float while private char catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and or not",built_in:"std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",literal:"true false nullptr NULL"},c=[t,e.CLCM,e.CBCM,a,r];return{aliases:["c","cc","h","c++","h++","hpp"],k:s,i:"</",c:c.concat([n,{b:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",e:">",k:s,c:["self",t]},{b:e.IR+"::",k:s},{v:[{b:/=/,e:/;/},{b:/\(/,e:/\)/},{bK:"new throw return else",e:/;/}],k:s,c:c.concat([{b:/\(/,e:/\)/,k:s,c:c.concat(["self"]),r:0}]),r:0},{cN:"function",b:"("+e.IR+"[\\*&\\s]+)+"+i,rB:!0,e:/[{;=]/,eE:!0,k:s,i:/[^\w\s\*&]/,c:[{b:i,rB:!0,c:[e.TM],r:0},{cN:"params",b:/\(/,e:/\)/,k:s,r:0,c:[e.CLCM,e.CBCM,r,a,t,{b:/\(/,e:/\)/,k:s,r:0,c:["self",e.CLCM,e.CBCM,r,a,t]}]},e.CLCM,e.CBCM,n]},{cN:"class",bK:"class struct",e:/[{;:]/,c:[{b:/</,e:/>/,c:["self"]},e.TM]}]),exports:{preprocessor:n,strings:r,k:s}}}),e.registerLanguage("cs",function(e){var t={keyword:"abstract as base bool break byte case catch char checked const continue decimal default delegate do double enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long nameof object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual void volatile while add alias ascending async await by descending dynamic equals from get global group into join let on orderby partial remove select set value var where yield",literal:"null false true"},r={cN:"number",v:[{b:"\\b(0b[01']+)"},{b:"(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"},{b:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],r:0},a={cN:"string",b:'@"',e:'"',c:[{b:'""'}]},n=e.inherit(a,{i:/\n/}),i={cN:"subst",b:"{",e:"}",k:t},s=e.inherit(i,{i:/\n/}),c={cN:"string",b:/\$"/,e:'"',i:/\n/,c:[{b:"{{"},{b:"}}"},e.BE,s]},o={cN:"string",b:/\$@"/,e:'"',c:[{b:"{{"},{b:"}}"},{b:'""'},i]},l=e.inherit(o,{i:/\n/,c:[{b:"{{"},{b:"}}"},{b:'""'},s]});i.c=[o,c,a,e.ASM,e.QSM,r,e.CBCM],s.c=[l,c,n,e.ASM,e.QSM,r,e.inherit(e.CBCM,{i:/\n/})];var u={v:[o,c,a,e.ASM,e.QSM]},b=e.IR+"(<"+e.IR+"(\\s*,\\s*"+e.IR+")*>)?(\\[\\])?";return{aliases:["csharp","c#"],k:t,i:/::/,c:[e.C("///","$",{rB:!0,c:[{cN:"doctag",v:[{b:"///",r:0},{b:"<!--|-->"},{b:"</?",e:">"}]}]}),e.CLCM,e.CBCM,{cN:"meta",b:"#",e:"$",k:{"meta-keyword":"if else elif endif define undef warning error line region endregion pragma checksum"}},u,r,{bK:"class interface",e:/[{;=]/,i:/[^\s:,]/,c:[e.TM,e.CLCM,e.CBCM]},{bK:"namespace",e:/[{;=]/,i:/[^\s:]/,c:[e.inherit(e.TM,{b:"[a-zA-Z](\\.?\\w)*"}),e.CLCM,e.CBCM]},{cN:"meta",b:"^\\s*\\[",eB:!0,e:"\\]",eE:!0,c:[{cN:"meta-string",b:/"/,e:/"/}]},{bK:"new return throw await else",r:0},{cN:"function",b:"("+b+"\\s+)+"+e.IR+"\\s*\\(",rB:!0,e:/\s*[{;=]/,eE:!0,k:t,c:[{b:e.IR+"\\s*\\(",rB:!0,c:[e.TM],r:0},{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,k:t,r:0,c:[u,r,e.CBCM]},e.CLCM,e.CBCM]}]}}),e.registerLanguage("css",function(e){var t="[a-zA-Z-][a-zA-Z0-9_-]*",r={b:/[A-Z\_\.\-]+\s*:/,rB:!0,e:";",eW:!0,c:[{cN:"attribute",b:/\S/,e:":",eE:!0,starts:{eW:!0,eE:!0,c:[{b:/[\w-]+\(/,rB:!0,c:[{cN:"built_in",b:/[\w-]+/},{b:/\(/,e:/\)/,c:[e.ASM,e.QSM]}]},e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"number",b:"#[0-9A-Fa-f]+"},{cN:"meta",b:"!important"}]}}]};return{cI:!0,i:/[=\/|'\$]/,c:[e.CBCM,{cN:"selector-id",b:/#[A-Za-z0-9_-]+/},{cN:"selector-class",b:/\.[A-Za-z0-9_-]+/},{cN:"selector-attr",b:/\[/,e:/\]/,i:"$"},{cN:"selector-pseudo",b:/:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/},{b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{b:"@",e:"[{;]",i:/:/,c:[{cN:"keyword",b:/\w+/},{b:/\s/,eW:!0,eE:!0,r:0,c:[e.ASM,e.QSM,e.CSSNM]}]},{cN:"selector-tag",b:t,r:0},{b:"{",e:"}",i:/\S/,c:[e.CBCM,r]}]}}),e.registerLanguage("glsl",function(e){return{k:{keyword:"break continue discard do else for if return while switch case default attribute binding buffer ccw centroid centroid varying coherent column_major const cw depth_any depth_greater depth_less depth_unchanged early_fragment_tests equal_spacing flat fractional_even_spacing fractional_odd_spacing highp in index inout invariant invocations isolines layout line_strip lines lines_adjacency local_size_x local_size_y local_size_z location lowp max_vertices mediump noperspective offset origin_upper_left out packed patch pixel_center_integer point_mode points precise precision quads r11f_g11f_b10f r16 r16_snorm r16f r16i r16ui r32f r32i r32ui r8 r8_snorm r8i r8ui readonly restrict rg16 rg16_snorm rg16f rg16i rg16ui rg32f rg32i rg32ui rg8 rg8_snorm rg8i rg8ui rgb10_a2 rgb10_a2ui rgba16 rgba16_snorm rgba16f rgba16i rgba16ui rgba32f rgba32i rgba32ui rgba8 rgba8_snorm rgba8i rgba8ui row_major sample shared smooth std140 std430 stream triangle_strip triangles triangles_adjacency uniform varying vertices volatile writeonly",type:"atomic_uint bool bvec2 bvec3 bvec4 dmat2 dmat2x2 dmat2x3 dmat2x4 dmat3 dmat3x2 dmat3x3 dmat3x4 dmat4 dmat4x2 dmat4x3 dmat4x4 double dvec2 dvec3 dvec4 float iimage1D iimage1DArray iimage2D iimage2DArray iimage2DMS iimage2DMSArray iimage2DRect iimage3D iimageBufferiimageCube iimageCubeArray image1D image1DArray image2D image2DArray image2DMS image2DMSArray image2DRect image3D imageBuffer imageCube imageCubeArray int isampler1D isampler1DArray isampler2D isampler2DArray isampler2DMS isampler2DMSArray isampler2DRect isampler3D isamplerBuffer isamplerCube isamplerCubeArray ivec2 ivec3 ivec4 mat2 mat2x2 mat2x3 mat2x4 mat3 mat3x2 mat3x3 mat3x4 mat4 mat4x2 mat4x3 mat4x4 sampler1D sampler1DArray sampler1DArrayShadow sampler1DShadow sampler2D sampler2DArray sampler2DArrayShadow sampler2DMS sampler2DMSArray sampler2DRect sampler2DRectShadow sampler2DShadow sampler3D samplerBuffer samplerCube samplerCubeArray samplerCubeArrayShadow samplerCubeShadow image1D uimage1DArray uimage2D uimage2DArray uimage2DMS uimage2DMSArray uimage2DRect uimage3D uimageBuffer uimageCube uimageCubeArray uint usampler1D usampler1DArray usampler2D usampler2DArray usampler2DMS usampler2DMSArray usampler2DRect usampler3D samplerBuffer usamplerCube usamplerCubeArray uvec2 uvec3 uvec4 vec2 vec3 vec4 void",built_in:"gl_MaxAtomicCounterBindings gl_MaxAtomicCounterBufferSize gl_MaxClipDistances gl_MaxClipPlanes gl_MaxCombinedAtomicCounterBuffers gl_MaxCombinedAtomicCounters gl_MaxCombinedImageUniforms gl_MaxCombinedImageUnitsAndFragmentOutputs gl_MaxCombinedTextureImageUnits gl_MaxComputeAtomicCounterBuffers gl_MaxComputeAtomicCounters gl_MaxComputeImageUniforms gl_MaxComputeTextureImageUnits gl_MaxComputeUniformComponents gl_MaxComputeWorkGroupCount gl_MaxComputeWorkGroupSize gl_MaxDrawBuffers gl_MaxFragmentAtomicCounterBuffers gl_MaxFragmentAtomicCounters gl_MaxFragmentImageUniforms gl_MaxFragmentInputComponents gl_MaxFragmentInputVectors gl_MaxFragmentUniformComponents gl_MaxFragmentUniformVectors gl_MaxGeometryAtomicCounterBuffers gl_MaxGeometryAtomicCounters gl_MaxGeometryImageUniforms gl_MaxGeometryInputComponents gl_MaxGeometryOutputComponents gl_MaxGeometryOutputVertices gl_MaxGeometryTextureImageUnits gl_MaxGeometryTotalOutputComponents gl_MaxGeometryUniformComponents gl_MaxGeometryVaryingComponents gl_MaxImageSamples gl_MaxImageUnits gl_MaxLights gl_MaxPatchVertices gl_MaxProgramTexelOffset gl_MaxTessControlAtomicCounterBuffers gl_MaxTessControlAtomicCounters gl_MaxTessControlImageUniforms gl_MaxTessControlInputComponents gl_MaxTessControlOutputComponents gl_MaxTessControlTextureImageUnits gl_MaxTessControlTotalOutputComponents gl_MaxTessControlUniformComponents gl_MaxTessEvaluationAtomicCounterBuffers gl_MaxTessEvaluationAtomicCounters gl_MaxTessEvaluationImageUniforms gl_MaxTessEvaluationInputComponents gl_MaxTessEvaluationOutputComponents gl_MaxTessEvaluationTextureImageUnits gl_MaxTessEvaluationUniformComponents gl_MaxTessGenLevel gl_MaxTessPatchComponents gl_MaxTextureCoords gl_MaxTextureImageUnits gl_MaxTextureUnits gl_MaxVaryingComponents gl_MaxVaryingFloats gl_MaxVaryingVectors gl_MaxVertexAtomicCounterBuffers gl_MaxVertexAtomicCounters gl_MaxVertexAttribs gl_MaxVertexImageUniforms gl_MaxVertexOutputComponents gl_MaxVertexOutputVectors gl_MaxVertexTextureImageUnits gl_MaxVertexUniformComponents gl_MaxVertexUniformVectors gl_MaxViewports gl_MinProgramTexelOffset gl_BackColor gl_BackLightModelProduct gl_BackLightProduct gl_BackMaterial gl_BackSecondaryColor gl_ClipDistance gl_ClipPlane gl_ClipVertex gl_Color gl_DepthRange gl_EyePlaneQ gl_EyePlaneR gl_EyePlaneS gl_EyePlaneT gl_Fog gl_FogCoord gl_FogFragCoord gl_FragColor gl_FragCoord gl_FragData gl_FragDepth gl_FrontColor gl_FrontFacing gl_FrontLightModelProduct gl_FrontLightProduct gl_FrontMaterial gl_FrontSecondaryColor gl_GlobalInvocationID gl_InstanceID gl_InvocationID gl_Layer gl_LightModel gl_LightSource gl_LocalInvocationID gl_LocalInvocationIndex gl_ModelViewMatrix gl_ModelViewMatrixInverse gl_ModelViewMatrixInverseTranspose gl_ModelViewMatrixTranspose gl_ModelViewProjectionMatrix gl_ModelViewProjectionMatrixInverse gl_ModelViewProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixTranspose gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_Normal gl_NormalMatrix gl_NormalScale gl_NumSamples gl_NumWorkGroups gl_ObjectPlaneQ gl_ObjectPlaneR gl_ObjectPlaneS gl_ObjectPlaneT gl_PatchVerticesIn gl_Point gl_PointCoord gl_PointSize gl_Position gl_PrimitiveID gl_PrimitiveIDIn gl_ProjectionMatrix gl_ProjectionMatrixInverse gl_ProjectionMatrixInverseTranspose gl_ProjectionMatrixTranspose gl_SampleID gl_SampleMask gl_SampleMaskIn gl_SamplePosition gl_SecondaryColor gl_TessCoord gl_TessLevelInner gl_TessLevelOuter gl_TexCoord gl_TextureEnvColor gl_TextureMatrix gl_TextureMatrixInverse gl_TextureMatrixInverseTranspose gl_TextureMatrixTranspose gl_Vertex gl_VertexID gl_ViewportIndex gl_WorkGroupID gl_WorkGroupSize gl_in gl_out EmitStreamVertex EmitVertex EndPrimitive EndStreamPrimitive abs acos acosh all any asin asinh atan atanh atomicAdd atomicAnd atomicCompSwap atomicCounter atomicCounterDecrement atomicCounterIncrement atomicExchange atomicMax atomicMin atomicOr atomicXor barrier bitCount bitfieldExtract bitfieldInsert bitfieldReverse ceil clamp cos cosh cross dFdx dFdy degrees determinant distance dot equal exp exp2 faceforward findLSB findMSB floatBitsToInt floatBitsToUint floor fma fract frexp ftransform fwidth greaterThan greaterThanEqual groupMemoryBarrier imageAtomicAdd imageAtomicAnd imageAtomicCompSwap imageAtomicExchange imageAtomicMax imageAtomicMin imageAtomicOr imageAtomicXor imageLoad imageSize imageStore imulExtended intBitsToFloat interpolateAtCentroid interpolateAtOffset interpolateAtSample inverse inversesqrt isinf isnan ldexp length lessThan lessThanEqual log log2 matrixCompMult max memoryBarrier memoryBarrierAtomicCounter memoryBarrierBuffer memoryBarrierImage memoryBarrierShared min mix mod modf noise1 noise2 noise3 noise4 normalize not notEqual outerProduct packDouble2x32 packHalf2x16 packSnorm2x16 packSnorm4x8 packUnorm2x16 packUnorm4x8 pow radians reflect refract round roundEven shadow1D shadow1DLod shadow1DProj shadow1DProjLod shadow2D shadow2DLod shadow2DProj shadow2DProjLod sign sin sinh smoothstep sqrt step tan tanh texelFetch texelFetchOffset texture texture1D texture1DLod texture1DProj texture1DProjLod texture2D texture2DLod texture2DProj texture2DProjLod texture3D texture3DLod texture3DProj texture3DProjLod textureCube textureCubeLod textureGather textureGatherOffset textureGatherOffsets textureGrad textureGradOffset textureLod textureLodOffset textureOffset textureProj textureProjGrad textureProjGradOffset textureProjLod textureProjLodOffset textureProjOffset textureQueryLevels textureQueryLod textureSize transpose trunc uaddCarry uintBitsToFloat umulExtended unpackDouble2x32 unpackHalf2x16 unpackSnorm2x16 unpackSnorm4x8 unpackUnorm2x16 unpackUnorm4x8 usubBorrow",literal:"true false"},i:'"',c:[e.CLCM,e.CBCM,e.CNM,{cN:"meta",b:"#",e:"$"}]}}),e.registerLanguage("go",function(e){var t={keyword:"break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",literal:"true false iota nil",built_in:"append cap close complex copy imag len make new panic print println real recover delete"};return{aliases:["golang"],k:t,i:"</",c:[e.CLCM,e.CBCM,{cN:"string",v:[e.QSM,{b:"'",e:"[^\\\\]'"},{b:"`",e:"`"}]},{cN:"number",v:[{b:e.CNR+"[dflsi]",r:1},e.CNM]},{b:/:=/},{cN:"function",bK:"func",e:/\s*\{/,eE:!0,c:[e.TM,{cN:"params",b:/\(/,e:/\)/,k:t,i:/["']/}]}]}}),e.registerLanguage("haskell",function(e){var t={v:[e.C("--","$"),e.C("{-","-}",{c:["self"]})]},r={cN:"meta",b:"{-#",e:"#-}"},a={cN:"meta",b:"^#",e:"$"},n={cN:"type",b:"\\b[A-Z][\\w']*",r:0},i={b:"\\(",e:"\\)",i:'"',c:[r,a,{cN:"type",b:"\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"},e.inherit(e.TM,{b:"[_a-z][\\w']*"}),t]},s={b:"{",e:"}",c:i.c};return{aliases:["hs"],k:"let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",c:[{bK:"module",e:"where",k:"module where",c:[i,t],i:"\\W\\.|;"},{b:"\\bimport\\b",e:"$",k:"import qualified as hiding",c:[i,t],i:"\\W\\.|;"},{cN:"class",b:"^(\\s*)?(class|instance)\\b",e:"where",k:"class family instance where",c:[n,i,t]},{cN:"class",b:"\\b(data|(new)?type)\\b",e:"$",k:"data family type newtype deriving",c:[r,n,i,s,t]},{bK:"default",e:"$",c:[n,i,t]},{bK:"infix infixl infixr",e:"$",c:[e.CNM,t]},{b:"\\bforeign\\b",e:"$",k:"foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",c:[n,e.QSM,t]},{cN:"meta",b:"#!\\/usr\\/bin\\/env runhaskell",e:"$"},r,a,e.QSM,e.CNM,n,e.inherit(e.TM,{b:"^[_a-z][\\w']*"}),t,{b:"->|<-"}]}}),e.registerLanguage("http",function(e){var t="HTTP/[0-9\\.]+";return{aliases:["https"],i:"\\S",c:[{b:"^"+t,e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{b:"^[A-Z]+ (.*?) "+t+"$",rB:!0,e:"$",c:[{cN:"string",b:" ",e:" ",eB:!0,eE:!0},{b:t},{cN:"keyword",b:"[A-Z]+"}]},{cN:"attribute",b:"^\\w",e:": ",eE:!0,i:"\\n|\\s|=",starts:{e:"$",r:0}},{b:"\\n\\n",starts:{sL:[],eW:!0}}]}}),e.registerLanguage("java",function(e){var t="[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*",r=t+"(<"+t+"(\\s*,\\s*"+t+")*>)?",a="false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do",n="\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",i={cN:"number",b:n,r:0};return{aliases:["jsp"],k:a,i:/<\/|#/,c:[e.C("/\\*\\*","\\*/",{r:0,c:[{b:/\w+@/,r:0},{cN:"doctag",b:"@[A-Za-z]+"}]}),e.CLCM,e.CBCM,e.ASM,e.QSM,{cN:"class",bK:"class interface",e:/[{;=]/,eE:!0,k:"class interface",i:/[:"\[\]]/,c:[{bK:"extends implements"},e.UTM]},{bK:"new throw return else",r:0},{cN:"function",b:"("+r+"\\s+)+"+e.UIR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:a,c:[{b:e.UIR+"\\s*\\(",rB:!0,r:0,c:[e.UTM]},{cN:"params",b:/\(/,e:/\)/,k:a,r:0,c:[e.ASM,e.QSM,e.CNM,e.CBCM]},e.CLCM,e.CBCM]},i,{cN:"meta",b:"@[A-Za-z]+"}]}}),e.registerLanguage("javascript",function(e){var t="[A-Za-z$_][0-9A-Za-z$_]*",r={keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
},a={cN:"number",v:[{b:"\\b(0[bB][01]+)"},{b:"\\b(0[oO][0-7]+)"},{b:e.CNR}],r:0},n={cN:"subst",b:"\\$\\{",e:"\\}",k:r,c:[]},i={cN:"string",b:"`",e:"`",c:[e.BE,n]};n.c=[e.ASM,e.QSM,i,a,e.RM];var s=n.c.concat([e.CBCM,e.CLCM]);return{aliases:["js","jsx"],k:r,c:[{cN:"meta",r:10,b:/^\s*['"]use (strict|asm)['"]/},{cN:"meta",b:/^#!/,e:/$/},e.ASM,e.QSM,i,e.CLCM,e.CBCM,a,{b:/[{,]\s*/,r:0,c:[{b:t+"\\s*:",rB:!0,r:0,c:[{cN:"attr",b:t,r:0}]}]},{b:"("+e.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[e.CLCM,e.CBCM,e.RM,{cN:"function",b:"(\\(.*?\\)|"+t+")\\s*=>",rB:!0,e:"\\s*=>",c:[{cN:"params",v:[{b:t},{b:/\(\s*\)/},{b:/\(/,e:/\)/,eB:!0,eE:!0,k:r,c:s}]}]},{b:/</,e:/(\/\w+|\w+\/)>/,sL:"xml",c:[{b:/<\w+\s*\/>/,skip:!0},{b:/<\w+/,e:/(\/\w+|\w+\/)>/,skip:!0,c:[{b:/<\w+\s*\/>/,skip:!0},"self"]}]}],r:0},{cN:"function",bK:"function",e:/\{/,eE:!0,c:[e.inherit(e.TM,{b:t}),{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,c:s}],i:/\[|%/},{b:/\$[(.]/},e.METHOD_GUARD,{cN:"class",bK:"class",e:/[{;=]/,eE:!0,i:/[:"\[\]]/,c:[{bK:"extends"},e.UTM]},{bK:"constructor",e:/\{/,eE:!0}],i:/#(?!!)/}}),e.registerLanguage("json",function(e){var t={literal:"true false null"},r=[e.QSM,e.CNM],a={e:",",eW:!0,eE:!0,c:r,k:t},n={b:"{",e:"}",c:[{cN:"attr",b:/"/,e:/"/,c:[e.BE],i:"\\n"},e.inherit(a,{b:/:/})],i:"\\S"},i={b:"\\[",e:"\\]",c:[e.inherit(a)],i:"\\S"};return r.splice(r.length,0,n,i),{c:r,k:t,i:"\\S"}}),e.registerLanguage("kotlin",function(e){var t={keyword:"abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual trait volatile transient native default",built_in:"Byte Short Char Int Long Boolean Float Double Void Unit Nothing",literal:"true false null"},r={cN:"keyword",b:/\b(break|continue|return|this)\b/,starts:{c:[{cN:"symbol",b:/@\w+/}]}},a={cN:"symbol",b:e.UIR+"@"},n={cN:"subst",b:"\\${",e:"}",c:[e.ASM,e.CNM]},i={cN:"variable",b:"\\$"+e.UIR},s={cN:"string",v:[{b:'"""',e:'"""',c:[i,n]},{b:"'",e:"'",i:/\n/,c:[e.BE]},{b:'"',e:'"',i:/\n/,c:[e.BE,i,n]}]},c={cN:"meta",b:"@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*"+e.UIR+")?"},o={cN:"meta",b:"@"+e.UIR,c:[{b:/\(/,e:/\)/,c:[e.inherit(s,{cN:"meta-string"})]}]},l="\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",u={cN:"number",b:l,r:0};return{aliases:["kt"],k:t,c:[e.C("/\\*\\*","\\*/",{r:0,c:[{cN:"doctag",b:"@[A-Za-z]+"}]}),e.CLCM,e.CBCM,r,a,c,o,{cN:"function",bK:"fun",e:"[(]|$",rB:!0,eE:!0,k:t,i:/fun\s+(<.*>)?[^\s\(]+(\s+[^\s\(]+)\s*=/,r:5,c:[{b:e.UIR+"\\s*\\(",rB:!0,r:0,c:[e.UTM]},{cN:"type",b:/</,e:/>/,k:"reified",r:0},{cN:"params",b:/\(/,e:/\)/,endsParent:!0,k:t,r:0,c:[{b:/:/,e:/[=,\/]/,eW:!0,c:[{cN:"type",b:e.UIR},e.CLCM,e.CBCM],r:0},e.CLCM,e.CBCM,c,o,s,e.CNM]},e.CBCM]},{cN:"class",bK:"class interface trait",e:/[:\{(]|$/,eE:!0,i:"extends implements",c:[{bK:"public protected internal private constructor"},e.UTM,{cN:"type",b:/</,e:/>/,eB:!0,eE:!0,r:0},{cN:"type",b:/[,:]\s*/,e:/[<\(,]|$/,eB:!0,rE:!0},c,o]},s,{cN:"meta",b:"^#!/usr/bin/env",e:"$",i:"\n"},u]}}),e.registerLanguage("lisp",function(e){var t="[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*",r="\\|[^]*?\\|",a="(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|\\-)?\\d+)?",n={cN:"meta",b:"^#!",e:"$"},i={cN:"literal",b:"\\b(t{1}|nil)\\b"},s={cN:"number",v:[{b:a,r:0},{b:"#(b|B)[0-1]+(/[0-1]+)?"},{b:"#(o|O)[0-7]+(/[0-7]+)?"},{b:"#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?"},{b:"#(c|C)\\("+a+" +"+a,e:"\\)"}]},c=e.inherit(e.QSM,{i:null}),o=e.C(";","$",{r:0}),l={b:"\\*",e:"\\*"},u={cN:"symbol",b:"[:&]"+t},b={b:t,r:0},d={b:r},p={b:"\\(",e:"\\)",c:["self",i,c,s,b]},m={c:[s,c,l,u,p,b],v:[{b:"['`]\\(",e:"\\)"},{b:"\\(quote ",e:"\\)",k:{name:"quote"}},{b:"'"+r}]},g={v:[{b:"'"+t},{b:"#'"+t+"(::"+t+")*"}]},f={b:"\\(\\s*",e:"\\)"},_={eW:!0,r:0};return f.c=[{cN:"name",v:[{b:t},{b:r}]},_],_.c=[m,g,f,i,s,c,o,l,u,d,b],{i:/\S/,c:[s,n,i,c,o,m,g,f,b]}}),e.registerLanguage("lua",function(e){var t="\\[=*\\[",r="\\]=*\\]",a={b:t,e:r,c:["self"]},n=[e.C("--(?!"+t+")","$"),e.C("--"+t,r,{c:[a],r:10})];return{l:e.UIR,k:{literal:"true false nil",keyword:"and break do else elseif end for goto if in local not or repeat return then until while",built_in:"_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstringmodule next pairs pcall print rawequal rawget rawset require select setfenvsetmetatable tonumber tostring type unpack xpcall arg selfcoroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"},c:n.concat([{cN:"function",bK:"function",e:"\\)",c:[e.inherit(e.TM,{b:"([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"}),{cN:"params",b:"\\(",eW:!0,c:n}].concat(n)},e.CNM,e.ASM,e.QSM,{cN:"string",b:t,e:r,c:[a],r:5}])}}),e.registerLanguage("makefile",function(e){var t={cN:"variable",v:[{b:"\\$\\("+e.UIR+"\\)",c:[e.BE]},{b:/\$[@%<?\^\+\*]/}]},r={cN:"string",b:/"/,e:/"/,c:[e.BE,t]},a={cN:"variable",b:/\$\([\w-]+\s/,e:/\)/,k:{built_in:"subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"},c:[t]},n={b:"^"+e.UIR+"\\s*[:+?]?=",i:"\\n",rB:!0,c:[{b:"^"+e.UIR,e:"[:+?]?=",eE:!0}]},i={cN:"meta",b:/^\.PHONY:/,e:/$/,k:{"meta-keyword":".PHONY"},l:/[\.\w]+/},s={cN:"section",b:/^[^\s]+:/,e:/$/,c:[t]};return{aliases:["mk","mak"],k:"define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath",l:/[\w-]+/,c:[e.HCM,t,r,a,n,i,s]}}),e.registerLanguage("xml",function(e){var t="[A-Za-z0-9\\._:-]+",r={eW:!0,i:/</,r:0,c:[{cN:"attr",b:t,r:0},{b:/=\s*/,r:0,c:[{cN:"string",endsParent:!0,v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s"'=<>`]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist"],cI:!0,c:[{cN:"meta",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},e.C("<!--","-->",{r:10}),{b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"meta",b:/<\?xml/,e:/\?>/,r:10},{b:/<\?(php)?/,e:/\?>/,sL:"php",c:[{b:"/\\*",e:"\\*/",skip:!0},{b:'b"',e:'"',skip:!0},{b:"b'",e:"'",skip:!0},e.inherit(e.ASM,{i:null,cN:null,c:null,skip:!0}),e.inherit(e.QSM,{i:null,cN:null,c:null,skip:!0})]},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{name:"style"},c:[r],starts:{e:"</style>",rE:!0,sL:["css","xml"]}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{name:"script"},c:[r],starts:{e:"</script>",rE:!0,sL:["actionscript","javascript","handlebars","xml"]}},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"name",b:/[^\/><\s]+/,r:0},r]}]}}),e.registerLanguage("markdown",function(e){return{aliases:["md","mkdown","mkd"],c:[{cN:"section",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"quote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"^```w*s*$",e:"^```s*$"},{b:"`.+?`"},{b:"^( {4}|	)",e:"$",r:0}]},{b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].*?[\\)\\]]",rB:!0,c:[{cN:"string",b:"\\[",e:"\\]",eB:!0,rE:!0,r:0},{cN:"link",b:"\\]\\(",e:"\\)",eB:!0,eE:!0},{cN:"symbol",b:"\\]\\[",e:"\\]",eB:!0,eE:!0}],r:10},{b:/^\[[^\n]+\]:/,rB:!0,c:[{cN:"symbol",b:/\[/,e:/\]/,eB:!0,eE:!0},{cN:"link",b:/:\s*/,e:/$/,eB:!0}]}]}}),e.registerLanguage("matlab",function(e){var t="('|\\.')+",r={r:0,c:[{b:t}]};return{k:{keyword:"break case catch classdef continue else elseif end enumerated events for function global if methods otherwise parfor persistent properties return spmd switch try while",built_in:"sin sind sinh asin asind asinh cos cosd cosh acos acosd acosh tan tand tanh atan atand atan2 atanh sec secd sech asec asecd asech csc cscd csch acsc acscd acsch cot cotd coth acot acotd acoth hypot exp expm1 log log1p log10 log2 pow2 realpow reallog realsqrt sqrt nthroot nextpow2 abs angle complex conj imag real unwrap isreal cplxpair fix floor ceil round mod rem sign airy besselj bessely besselh besseli besselk beta betainc betaln ellipj ellipke erf erfc erfcx erfinv expint gamma gammainc gammaln psi legendre cross dot factor isprime primes gcd lcm rat rats perms nchoosek factorial cart2sph cart2pol pol2cart sph2cart hsv2rgb rgb2hsv zeros ones eye repmat rand randn linspace logspace freqspace meshgrid accumarray size length ndims numel disp isempty isequal isequalwithequalnans cat reshape diag blkdiag tril triu fliplr flipud flipdim rot90 find sub2ind ind2sub bsxfun ndgrid permute ipermute shiftdim circshift squeeze isscalar isvector ans eps realmax realmin pi i inf nan isnan isinf isfinite j why compan gallery hadamard hankel hilb invhilb magic pascal rosser toeplitz vander wilkinson max min nanmax nanmin mean nanmean type table readtable writetable sortrows sort figure plot plot3 scatter scatter3 cellfun legend intersect ismember procrustes hold num2cell "},i:'(//|"|#|/\\*|\\s+/\\w+)',c:[{cN:"function",bK:"function",e:"$",c:[e.UTM,{cN:"params",v:[{b:"\\(",e:"\\)"},{b:"\\[",e:"\\]"}]}]},{cN:"built_in",b:/true|false/,r:0,starts:r},{b:"[a-zA-Z][a-zA-Z_0-9]*"+t,r:0},{cN:"number",b:e.CNR,r:0,starts:r},{cN:"string",b:"'",e:"'",c:[e.BE,{b:"''"}]},{b:/\]|}|\)/,r:0,starts:r},{cN:"string",b:'"',e:'"',c:[e.BE,{b:'""'}],starts:r},e.C("^\\s*\\%\\{\\s*$","^\\s*\\%\\}\\s*$"),e.C("\\%","$")]}}),e.registerLanguage("nanoscript",function(e){var t={keyword:"∈ bitor pad joy bitxor bitand and local in if for return while mod preservingTransform|10 else continue let|2 const break not with class assert debugPrint|4 while continue or nil|2 pi nan ξ infinity true false",built_in:"frame leave|4 enter|4 init"},r={cN:"subst",b:/\{/,e:/\}/,k:t},a={cN:"string",c:[e.BE],v:[{b:/(u|r|ur)"/,e:/"/,r:10},{b:/(b|br)"/,e:/"/},{b:/(fr|rf|f)"/,e:/"/,c:[e.BE,r]},e.QSM]},n={cN:"built_in",r:2,v:[{b:/(-|─|—|━|⎯){5,}/}]},i={cN:"number",r:0,v:[{b:/[+-]?[∞επ½⅓⅔¼¾⅕⅖⅗⅘⅙⅐⅛⅑⅒`]/},{b:/#[0-7a-fA-F]+/},{b:/[+-]?(\d*\.)?\d+(%|deg|°)?/},{b:/[₀₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹]/}]},s={cN:"params",b:/\(/,e:/\)/,c:[i,a]};return r.c=[a,i],{aliases:["nanoscript"],k:t,i:/(<\/|->|\?)|=>|@|\$/,c:[n,i,a,e.CLCM,e.CBCM,{v:[{cN:"function",bK:"def"}],e:/:/,i:/[${=;\n,]/,c:[e.UTM,s,{b:/->/,eW:!0,k:"None"}]}]}}),e.registerLanguage("objectivec",function(e){var t={cN:"built_in",b:"\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"},r={keyword:"int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",literal:"false true FALSE TRUE nil YES NO NULL",built_in:"BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"},a=/[a-zA-Z@][a-zA-Z0-9_]*/,n="@interface @class @protocol @implementation";return{aliases:["mm","objc","obj-c"],k:r,l:a,i:"</",c:[t,e.CLCM,e.CBCM,e.CNM,e.QSM,{cN:"string",v:[{b:'@"',e:'"',i:"\\n",c:[e.BE]},{b:"'",e:"[^\\\\]'",i:"[^\\\\][^']"}]},{cN:"meta",b:"#",e:"$",c:[{cN:"meta-string",v:[{b:'"',e:'"'},{b:"<",e:">"}]}]},{cN:"class",b:"("+n.split(" ").join("|")+")\\b",e:"({|$)",eE:!0,k:n,l:a,c:[e.UTM]},{b:"\\."+e.UIR,r:0}]}}),e.registerLanguage("perl",function(e){var t="getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",r={cN:"subst",b:"[$@]\\{",e:"\\}",k:t},a={b:"->{",e:"}"},n={v:[{b:/\$\d/},{b:/[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/},{b:/[\$%@][^\s\w{]/,r:0}]},i=[e.BE,r,n],s=[n,e.HCM,e.C("^\\=\\w","\\=cut",{eW:!0}),a,{cN:"string",c:i,v:[{b:"q[qwxr]?\\s*\\(",e:"\\)",r:5},{b:"q[qwxr]?\\s*\\[",e:"\\]",r:5},{b:"q[qwxr]?\\s*\\{",e:"\\}",r:5},{b:"q[qwxr]?\\s*\\|",e:"\\|",r:5},{b:"q[qwxr]?\\s*\\<",e:"\\>",r:5},{b:"qw\\s+q",e:"q",r:5},{b:"'",e:"'",c:[e.BE]},{b:'"',e:'"'},{b:"`",e:"`",c:[e.BE]},{b:"{\\w+}",c:[],r:0},{b:"-?\\w+\\s*\\=\\>",c:[],r:0}]},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\/\\/|"+e.RSR+"|\\b(split|return|print|reverse|grep)\\b)\\s*",k:"split return print reverse grep",r:0,c:[e.HCM,{cN:"regexp",b:"(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",r:10},{cN:"regexp",b:"(m|qr)?/",e:"/[a-z]*",c:[e.BE],r:0}]},{cN:"function",bK:"sub",e:"(\\s*\\(.*?\\))?[;{]",eE:!0,r:5,c:[e.TM]},{b:"-\\w\\b",r:0},{b:"^__DATA__$",e:"^__END__$",sL:"mojolicious",c:[{b:"^@@.*",e:"$",cN:"comment"}]}];return r.c=s,a.c=s,{aliases:["pl","pm"],l:/[\w\.]+/,k:t,c:s}}),e.registerLanguage("php",function(e){var t={b:"\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"},r={cN:"meta",b:/<\?(php)?|\?>/},a={cN:"string",c:[e.BE,r],v:[{b:'b"',e:'"'},{b:"b'",e:"'"},e.inherit(e.ASM,{i:null}),e.inherit(e.QSM,{i:null})]},n={v:[e.BNM,e.CNM]};return{aliases:["php","php3","php4","php5","php6","php7"],cI:!0,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",c:[e.HCM,e.C("//","$",{c:[r]}),e.C("/\\*","\\*/",{c:[{cN:"doctag",b:"@[A-Za-z]+"}]}),e.C("__halt_compiler.+?;",!1,{eW:!0,k:"__halt_compiler",l:e.UIR}),{cN:"string",b:/<<<['"]?\w+['"]?$/,e:/^\w+;?$/,c:[e.BE,{cN:"subst",v:[{b:/\$\w+/},{b:/\{\$/,e:/\}/}]}]},r,{cN:"keyword",b:/\$this\b/},t,{b:/(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/},{cN:"function",bK:"function",e:/[;{]/,eE:!0,i:"\\$|\\[|%",c:[e.UTM,{cN:"params",b:"\\(",e:"\\)",c:["self",t,e.CBCM,a,n]}]},{cN:"class",bK:"class interface",e:"{",eE:!0,i:/[:\(\$"]/,c:[{bK:"extends implements"},e.UTM]},{bK:"namespace",e:";",i:/[\.']/,c:[e.UTM]},{bK:"use",e:";",c:[e.UTM]},{b:"=>"},a,n]}}),e.registerLanguage("plaintext",function(e){return{disableAutodetect:!0}}),e.registerLanguage("python",function(e){var t={keyword:"and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",built_in:"Ellipsis NotImplemented"},r={cN:"meta",b:/^(>>>|\.\.\.) /},a={cN:"subst",b:/\{/,e:/\}/,k:t,i:/#/},n={cN:"string",c:[e.BE],v:[{b:/(u|b)?r?'''/,e:/'''/,c:[e.BE,r],r:10},{b:/(u|b)?r?"""/,e:/"""/,c:[e.BE,r],r:10},{b:/(fr|rf|f)'''/,e:/'''/,c:[e.BE,r,a]},{b:/(fr|rf|f)"""/,e:/"""/,c:[e.BE,r,a]},{b:/(u|r|ur)'/,e:/'/,r:10},{b:/(u|r|ur)"/,e:/"/,r:10},{b:/(b|br)'/,e:/'/},{b:/(b|br)"/,e:/"/},{b:/(fr|rf|f)'/,e:/'/,c:[e.BE,a]},{b:/(fr|rf|f)"/,e:/"/,c:[e.BE,a]},e.ASM,e.QSM]},i={cN:"number",r:0,v:[{b:e.BNR+"[lLjJ]?"},{b:"\\b(0o[0-7]+)[lLjJ]?"},{b:e.CNR+"[lLjJ]?"}]},s={cN:"params",b:/\(/,e:/\)/,c:["self",r,i,n]};return a.c=[n,i,r],{aliases:["py","gyp","ipython"],k:t,i:/(<\/|->|\?)|=>/,c:[r,i,n,e.HCM,{v:[{cN:"function",bK:"def"},{cN:"class",bK:"class"}],e:/:/,i:/[${=;\n,]/,c:[e.UTM,s,{b:/->/,eW:!0,k:"None"}]},{cN:"meta",b:/^[\t ]*@/,e:/$/},{b:/\b(print|exec)\(/}]}}),e.registerLanguage("r",function(e){var t="([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*";return{c:[e.HCM,{b:t,l:t,k:{keyword:"function if in break next repeat else for return switch while try tryCatch stop warning require library attach detach source setMethod setGeneric setGroupGeneric setClass ...",literal:"NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10"},r:0},{cN:"number",b:"0[xX][0-9a-fA-F]+[Li]?\\b",r:0},{cN:"number",b:"\\d+(?:[eE][+\\-]?\\d*)?L\\b",r:0},{cN:"number",b:"\\d+\\.(?!\\d)(?:i\\b)?",r:0},{cN:"number",b:"\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",r:0},{cN:"number",b:"\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",r:0},{b:"`",e:"`",r:0},{cN:"string",c:[e.BE],v:[{b:'"',e:'"'},{b:"'",e:"'"}]}]}}),e.registerLanguage("ruby",function(e){var t="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",r={keyword:"and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",literal:"true false nil"},a={cN:"doctag",b:"@[A-Za-z]+"},n={b:"#<",e:">"},i=[e.C("#","$",{c:[a]}),e.C("^\\=begin","^\\=end",{c:[a],r:10}),e.C("^__END__","\\n$")],s={cN:"subst",b:"#\\{",e:"}",k:r},c={cN:"string",c:[e.BE,s],v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:/`/,e:/`/},{b:"%[qQwWx]?\\(",e:"\\)"},{b:"%[qQwWx]?\\[",e:"\\]"},{b:"%[qQwWx]?{",e:"}"},{b:"%[qQwWx]?<",e:">"},{b:"%[qQwWx]?/",e:"/"},{b:"%[qQwWx]?%",e:"%"},{b:"%[qQwWx]?-",e:"-"},{b:"%[qQwWx]?\\|",e:"\\|"},{b:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/},{b:/<<(-?)\w+$/,e:/^\s*\w+$/}]},o={cN:"params",b:"\\(",e:"\\)",endsParent:!0,k:r},l=[c,n,{cN:"class",bK:"class module",e:"$|;",i:/=/,c:[e.inherit(e.TM,{b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{b:"<\\s*",c:[{b:"("+e.IR+"::)?"+e.IR}]}].concat(i)},{cN:"function",bK:"def",e:"$|;",c:[e.inherit(e.TM,{b:t}),o].concat(i)},{b:e.IR+"::"},{cN:"symbol",b:e.UIR+"(\\!|\\?)?:",r:0},{cN:"symbol",b:":(?!\\s)",c:[c,{b:t}],r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{cN:"params",b:/\|/,e:/\|/,k:r},{b:"("+e.RSR+"|unless)\\s*",k:"unless",c:[n,{cN:"regexp",c:[e.BE,s],i:/\n/,v:[{b:"/",e:"/[a-z]*"},{b:"%r{",e:"}[a-z]*"},{b:"%r\\(",e:"\\)[a-z]*"},{b:"%r!",e:"![a-z]*"},{b:"%r\\[",e:"\\][a-z]*"}]}].concat(i),r:0}].concat(i);s.c=l,o.c=l;var u="[>?]>",b="[\\w#]+\\(\\w+\\):\\d+:\\d+>",d="(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",p=[{b:/^\s*=>/,starts:{e:"$",c:l}},{cN:"meta",b:"^("+u+"|"+b+"|"+d+")",starts:{e:"$",c:l}}];return{aliases:["rb","gemspec","podspec","thor","irb"],k:r,i:/\/\*/,c:i.concat(p).concat(l)}}),e.registerLanguage("rust",function(e){var t="([ui](8|16|32|64|128|size)|f(32|64))?",r="alignof as be box break const continue crate do else enum extern false fn for if impl in let loop match mod mut offsetof once priv proc pub pure ref return self Self sizeof static struct super trait true type typeof unsafe unsized use virtual while where yield move default",a="drop i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 str char bool Box Option Result String Vec Copy Send Sized Sync Drop Fn FnMut FnOnce ToOwned Clone Debug PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator SliceConcatExt ToString assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln! macro_rules! assert_ne! debug_assert_ne!";return{aliases:["rs"],k:{keyword:r,literal:"true false Some None Ok Err",built_in:a},l:e.IR+"!?",i:"</",c:[e.CLCM,e.C("/\\*","\\*/",{c:["self"]}),e.inherit(e.QSM,{b:/b?"/,i:null}),{cN:"string",v:[{b:/r(#*)"(.|\n)*?"\1(?!#)/},{b:/b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/}]},{cN:"symbol",b:/'[a-zA-Z_][a-zA-Z0-9_]*/},{cN:"number",v:[{b:"\\b0b([01_]+)"+t},{b:"\\b0o([0-7_]+)"+t},{b:"\\b0x([A-Fa-f0-9_]+)"+t},{b:"\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)"+t}],r:0},{cN:"function",bK:"fn",e:"(\\(|<)",eE:!0,c:[e.UTM]},{cN:"meta",b:"#\\!?\\[",e:"\\]",c:[{cN:"meta-string",b:/"/,e:/"/}]},{cN:"class",bK:"type",e:";",c:[e.inherit(e.UTM,{endsParent:!0})],i:"\\S"},{cN:"class",bK:"trait enum struct union",e:"{",c:[e.inherit(e.UTM,{endsParent:!0})],i:"[\\w\\d]"},{b:e.IR+"::",k:{built_in:a}},{b:"->"}]}}),e.registerLanguage("scheme",function(e){var t="[^\\(\\)\\[\\]\\{\\}\",'`;#|\\\\\\s]+",r="(\\-|\\+)?\\d+([./]\\d+)?",a=r+"[+\\-]"+r+"i",n={"builtin-name":"case-lambda call/cc class define-class exit-handler field import inherit init-field interface let*-values let-values let/ec mixin opt-lambda override protect provide public rename require require-for-syntax syntax syntax-case syntax-error unit/sig unless when with-syntax and begin call-with-current-continuation call-with-input-file call-with-output-file case cond define define-syntax delay do dynamic-wind else for-each if lambda let let* let-syntax letrec letrec-syntax map or syntax-rules ' * + , ,@ - ... / ; < <= = => > >= ` abs acos angle append apply asin assoc assq assv atan boolean? caar cadr call-with-input-file call-with-output-file call-with-values car cdddar cddddr cdr ceiling char->integer char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? char-downcase char-lower-case? char-numeric? char-ready? char-upcase char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? char? close-input-port close-output-port complex? cons cos current-input-port current-output-port denominator display eof-object? eq? equal? eqv? eval even? exact->inexact exact? exp expt floor force gcd imag-part inexact->exact inexact? input-port? integer->char integer? interaction-environment lcm length list list->string list->vector list-ref list-tail list? load log magnitude make-polar make-rectangular make-string make-vector max member memq memv min modulo negative? newline not null-environment null? number->string number? numerator odd? open-input-file open-output-file output-port? pair? peek-char port? positive? procedure? quasiquote quote quotient rational? rationalize read read-char real-part real? remainder reverse round scheme-report-environment set! set-car! set-cdr! sin sqrt string string->list string->number string->symbol string-append string-ci<=? string-ci<? string-ci=? string-ci>=? string-ci>? string-copy string-fill! string-length string-ref string-set! string<=? string<? string=? string>=? string>? string? substring symbol->string symbol? tan transcript-off transcript-on truncate values vector vector->list vector-fill! vector-length vector-ref vector-set! with-input-from-file with-output-to-file write write-char zero?"},i={cN:"meta",b:"^#!",e:"$"},s={cN:"literal",b:"(#t|#f|#\\\\"+t+"|#\\\\.)"},c={cN:"number",v:[{b:r,r:0},{b:a,r:0},{b:"#b[0-1]+(/[0-1]+)?"},{b:"#o[0-7]+(/[0-7]+)?"},{b:"#x[0-9a-f]+(/[0-9a-f]+)?"}]},o=e.QSM,l=[e.C(";","$",{r:0}),e.C("#\\|","\\|#")],u={b:t,r:0},b={cN:"symbol",b:"'"+t},d={eW:!0,r:0},p={v:[{b:/'/},{b:"`"}],c:[{b:"\\(",e:"\\)",c:["self",s,o,c,u,b]}]},m={cN:"name",b:t,l:t,k:n},g={b:/lambda/,eW:!0,rB:!0,c:[m,{b:/\(/,e:/\)/,endsParent:!0,c:[u]}]},f={v:[{b:"\\(",e:"\\)"},{b:"\\[",e:"\\]"}],c:[g,m,d]};return d.c=[s,c,o,u,b,p,f].concat(l),{i:/\S/,c:[i,c,o,b,p,f].concat(l)}}),e.registerLanguage("shell",function(e){return{aliases:["console"],c:[{cN:"meta",b:"^\\s{0,3}[\\w\\d\\[\\]()@-]*[>%$#]",starts:{e:"$",sL:"bash"}}]}}),e.registerLanguage("swift",function(e){var t={keyword:"#available #colorLiteral #column #else #elseif #endif #file #fileLiteral #function #if #imageLiteral #line #selector #sourceLocation _ __COLUMN__ __FILE__ __FUNCTION__ __LINE__ Any as as! as? associatedtype associativity break case catch class continue convenience default defer deinit didSet do dynamic dynamicType else enum extension fallthrough false fileprivate final for func get guard if import in indirect infix init inout internal is lazy left let mutating nil none nonmutating open operator optional override postfix precedence prefix private protocol Protocol public repeat required rethrows return right self Self set static struct subscript super switch throw throws true try try! try? Type typealias unowned var weak where while willSet",literal:"true false nil",built_in:"abs advance alignof alignofValue anyGenerator assert assertionFailure bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal fatalError filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced isUniquelyReferencedNonObjC join lazy lexicographicalCompare map max maxElement min minElement numericCast overlaps partition posix precondition preconditionFailure print println quickSort readLine reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith stride strideof strideofValue swap toString transcode underestimateCount unsafeAddressOf unsafeBitCast unsafeDowncast unsafeUnwrap unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafeMutablePointer withUnsafeMutablePointers withUnsafePointer withUnsafePointers withVaList zip"},r={cN:"type",b:"\\b[A-Z][\\wÀ-ʸ']*",r:0},a=e.C("/\\*","\\*/",{c:["self"]}),n={cN:"subst",b:/\\\(/,e:"\\)",k:t,c:[]},i={cN:"string",c:[e.BE,n],v:[{b:/"""/,e:/"""/},{b:/"/,e:/"/}]},s={cN:"number",b:"\\b([\\d_]+(\\.[\\deE_]+)?|0x[a-fA-F0-9_]+(\\.[a-fA-F0-9p_]+)?|0b[01_]+|0o[0-7_]+)\\b",r:0};return n.c=[s],{k:t,c:[i,e.CLCM,a,r,s,{cN:"function",bK:"func",e:"{",eE:!0,c:[e.inherit(e.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/}),{b:/</,e:/>/},{cN:"params",b:/\(/,e:/\)/,endsParent:!0,k:t,c:["self",s,i,e.CBCM,{b:":"}],i:/["']/}],i:/\[|%/},{cN:"class",bK:"struct protocol class extension enum",k:t,e:"\\{",eE:!0,c:[e.inherit(e.TM,{b:/[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/})]},{cN:"meta",b:"(@discardableResult|@warn_unused_result|@exported|@lazy|@noescape|@NSCopying|@NSManaged|@objc|@objcMembers|@convention|@required|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix|@autoclosure|@testable|@available|@nonobjc|@NSApplicationMain|@UIApplicationMain)"},{bK:"import",e:/$/,c:[e.CLCM,a]}]}}),e.registerLanguage("tex",function(e){var t={cN:"tag",b:/\\/,r:0,c:[{cN:"name",v:[{b:/[a-zA-Zа-яА-я]+[*]?/},{b:/[^a-zA-Zа-яА-я0-9]/}],starts:{eW:!0,r:0,c:[{cN:"string",v:[{b:/\[/,e:/\]/},{b:/\{/,e:/\}/}]},{b:/\s*=\s*/,eW:!0,r:0,c:[{cN:"number",b:/-?\d*\.?\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?/}]}]}}]};return{c:[t,{cN:"formula",c:[t],r:0,v:[{b:/\$\$/,e:/\$\$/},{b:/\$/,e:/\$/}]},e.C("%","$",{r:0})]}}),e.registerLanguage("typescript",function(e){var t="[A-Za-z$_][0-9A-Za-z$_]*",r={keyword:"in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class public private protected get set super static implements enum export import declare type namespace abstract as from extends async await",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document any number boolean string void Promise"},a={cN:"meta",b:"@"+t},n={b:"\\(",e:/\)/,k:r,c:["self",e.QSM,e.ASM,e.NM]},i={cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,k:r,c:[e.CLCM,e.CBCM,a,n]};return{aliases:["ts"],k:r,c:[{cN:"meta",b:/^\s*['"]use strict['"]/},e.ASM,e.QSM,{cN:"string",b:"`",e:"`",c:[e.BE,{cN:"subst",b:"\\$\\{",e:"\\}"}]},e.CLCM,e.CBCM,{cN:"number",v:[{b:"\\b(0[bB][01]+)"},{b:"\\b(0[oO][0-7]+)"},{b:e.CNR}],r:0},{b:"("+e.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[e.CLCM,e.CBCM,e.RM,{cN:"function",b:"(\\(.*?\\)|"+e.IR+")\\s*=>",rB:!0,e:"\\s*=>",c:[{cN:"params",v:[{b:e.IR},{b:/\(\s*\)/},{b:/\(/,e:/\)/,eB:!0,eE:!0,k:r,c:["self",e.CLCM,e.CBCM]}]}]}],r:0},{cN:"function",b:"function",e:/[\{;]/,eE:!0,k:r,c:["self",e.inherit(e.TM,{b:t}),i],i:/%/,r:0},{bK:"constructor",e:/\{/,eE:!0,c:["self",i]},{b:/module\./,k:{built_in:"module"},r:0},{bK:"module",e:/\{/,eE:!0},{bK:"interface",e:/\{/,eE:!0,k:"interface extends"},{b:/\$[(.]/},{b:"\\."+e.IR,r:0},a,n]}}),e.registerLanguage("yaml",function(e){var t="true false yes no null",r="^[ \\-]*",a="[a-zA-Z_][\\w\\-]*",n={cN:"attr",v:[{b:r+a+":"},{b:r+'"'+a+'":'},{b:r+"'"+a+"':"}]},i={cN:"template-variable",v:[{b:"{{",e:"}}"},{b:"%{",e:"}"}]},s={cN:"string",r:0,v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:/\S+/}],c:[e.BE,i]};return{cI:!0,aliases:["yml","YAML","yaml"],c:[n,{cN:"meta",b:"^---s*$",r:10},{
cN:"string",b:"[\\|>] *$",rE:!0,c:s.c,e:n.v[0].b},{b:"<%[%=-]?",e:"[%-]?%>",sL:"ruby",eB:!0,eE:!0,r:0},{cN:"type",b:"!"+e.UIR},{cN:"type",b:"!!"+e.UIR},{cN:"meta",b:"&"+e.UIR+"$"},{cN:"meta",b:"\\*"+e.UIR+"$"},{cN:"bullet",b:"^ *-",r:0},e.HCM,{bK:t,k:{literal:t}},e.CNM,s]}}),e});

// Lucida Console on Windows has capital V's that look like lower case, so don't use it
var codeFontStack = "Menlo,Consolas,monospace";
var codeFontSize  = 105.1316178 / measureFontSize(codeFontStack) + 'px';

var BODY_STYLESHEET = entag('style', 'body{max-width:680px;' +
    'margin:auto;' +
    'padding:20px;' +
    'text-align:justify;' +
    'line-height:140%; ' +
    '-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased;' +
    'color:#222;' +
    'font-family:Palatino,Georgia,"Times New Roman",serif}');

/** You can embed your own stylesheet AFTER the <script> tags in your
    file to override these defaults. */
var STYLESHEET = entag('style',
    'body{' +
    'counter-reset: h1 h2 h3 h4 h5 h6 paragraph' +
    '}' +

    // Avoid header/footer in print to PDF. See https://productforums.google.com/forum/#!topic/chrome/LBMUDtGqr-0
    '@page{margin:0;size:auto}' +

    '.md code,pre{' +
    'font-family:' + codeFontStack + ';' +
    'font-size:' + codeFontSize + ';' +
    'line-height:140%' +
    '}' +

    '.md div.title{' +
    'font-size:26px;' +
    'font-weight:800;' +
    'line-height:120%;' +
    'text-align:center' +
    '}' +

    '.md div.afterTitles{height:10px}' +

    '.md div.subtitle{' +
    'text-align:center' +
    '}' +

    '.md .image{display:inline-block}' +

    '.md img{' +
    'max-width:100%;' +
    'page-break-inside:avoid' +
    '}' +

    // Justification tends to handle URLs and code blocks poorly
    // when inside of a bullet, so disable it there
    '.md li{text-align:left;text-indent:0}' +

    // Make code blocks use 4-space tabs.
    // Set up a line number counter.
    '.md pre.listing {tab-size:4;-moz-tab-size:4;-o-tab-size:4;counter-reset:line}' +

    '.md pre.listing .linenumbers span.line:before{width:30px;margin-left:-52px;font-size:80%;text-align:right;counter-increment:line;' +
    'content:counter(line);display:inline-block;padding-right:13px;margin-right:8px;color:#ccc}' +

     // Force captions on line listings down close and then center them
    '.md div.tilde{' +
    'margin:20px 0 -10px;' +
    'text-align:center' +
    '}' +

    '.md div.imagecaption,.md div.tablecaption,.md div.listingcaption{' +
    'margin:7px 5px 12px;' +
    'text-align: justify;' +
    'font-style:bold' +
    '}' +

    '.md div.imagecaption{' +
    'margin-bottom:0' +
    '}' +

    '.md blockquote.fancyquote{' +
    'margin:25px 0 25px;' +
    'text-align:left;' +
    'line-height:160%' +
    '}' +

    '.md blockquote.fancyquote::before{' +
    'content:"\u201C";' +
    'color:#DDD;' +
    'font-family:Times New Roman;' +
    'font-size:45px;' +
    'line-height:0;' +
    'margin-right:6px;' +
    'vertical-align:-0.3em' +
    '}' +

    '.md span.fancyquote{' +
    'font-size:118%;' +
    'color:#777;' +
    'font-style:italic' +
    '}' +

    '.md span.fancyquote::after{' +
    'content:"\u201D";' +
    'font-style:normal;' +
    'color:#DDD;' +
    'font-family:Times New Roman;' +
    'font-size:45px;' +
    'line-height:0;' +
    'margin-left:6px;' +
    'vertical-align:-0.3em' +
    '}' +

    '.md blockquote.fancyquote .author{' +
    'width:100%;' +
    'margin-top:10px;' +
    'display:inline-block;' +
    'text-align:right' +
    '}' +

    '.md small{font-size:60%}' +
    '.md big{font-size:150%}' +

    '.md div.title,contents,.md .tocHeader,h1,h2,h3,h4,h5,h6,.md .shortTOC,.md .mediumTOC,.nonumberh1,.nonumberh2,.nonumberh3,.nonumberh4,.nonumberh5,.nonumberh6{' +
    'font-family:Verdana,Helvetica,Arial,sans-serif;' +
    'margin:13.4px 0 13.4px;' +
    'padding:15px 0 3px;' +
    'border-top:none;' +
    'clear:both' +
    '}' +

    '.md h1,.md h2,.md h3,.md h4,.md h5,.md h6,.md .nonumberh1,.md .nonumberh2,.md .nonumberh3,.md .nonumberh4,.md .nonumberh5,.md .nonumberh6{' +
     'page-break-after:avoid;break-after:avoid' +
    '}'+

    '.md svg.diagram{' +
    'display:block;' +
    'font-family:' + codeFontStack + ';' +
    'font-size:' + codeFontSize + ';' +
    'text-align:center;' +
    'stroke-linecap:round;' +
    'stroke-width:' + STROKE_WIDTH + 'px;'+
    'page-break-inside:avoid;' +
    'stroke:#000;' +
    'fill:#000' +
    '}' +

    '.md svg.diagram .opendot{' +
    'fill:#FFF' +
    '}' +

    '.md svg.diagram text{' +
    'stroke:none' +
    '}' +

    // printing scale and margins
    '@media print{@page{margin:1in 5mm;transform: scale(150%)}}' +

    // pagebreak hr
    '@media print{.md .pagebreak{page-break-after:always;visibility:hidden}}' +

    // Not restricted to a:link because we want things like svn URLs to have this font, which
    // makes "//" look better.
    '.md a{font-family:Georgia,Palatino,\'Times New Roman\'}' +

    '.md h1,.md .tocHeader,.md .nonumberh1{' +
    'border-bottom:3px solid;' +
    'font-size:20px;' +
    'font-weight:bold;' +
    '}' +

    '.md h1,.md .nonumberh1{' +
    'counter-reset: h2 h3 h4 h5 h6' +
    '}' +

    '.md h2,.md .nonumberh2{' +
    'counter-reset: h3 h4 h5 h6;' +
    'border-bottom:2px solid #999;' +
    'color:#555;' +
    'font-weight:bold;'+
    'font-size:18px;' +
    '}' +

    '.md h3,.md h4,.md h5,.md h6,.md .nonumberh3,.md .nonumberh4,.md .nonumberh5,.md .nonumberh6{' +
    'font-family:Helvetica,Arial,sans-serif;' +
    'color:#555;' +
    'font-size:16px;' +
    '}' +

    '.md h3{counter-reset:h4 h5 h6}' +
    '.md h4{counter-reset:h5 h6}' +
    '.md h5{counter-reset:h6}' +

    '.md div.table{' +
    'margin:16px 0 16px 0' +
    '}' +

    '.md table{' +
    'border-collapse:collapse;' +
    'line-height:140%;' +
    'page-break-inside:avoid' +
    '}' +

    '.md table.table{' +
    'margin:auto' +
    '}' +

    '.md table.calendar{' +
    'width:100%;' +
    'margin:auto;' +
    'font-size:11px;' +
    'font-family:Helvetica,Arial,sans-serif' +
    '}' +

    '.md table.calendar th{' +
    'font-size:16px' +
    '}' +

    '.md .today{' +
    'background:#ECF8FA' +
    '}' +

    '.md .calendar .parenthesized{' +
    'color:#999;' +
    '/*font-style:italic*/' +
    '}' +

    '.md div.tablecaption{' +
    'text-align:center' +
    '}' +

    '.md table.table th{' +
    'color:#FFF;' +
    'background-color:#AAA;' +
    'border:1px solid #888;' +
     // top right bottom left
    'padding:8px 15px 8px 15px' +
    '}' +

    '.md table.table td{' +
     // top right bottom left
    'padding:5px 15px 5px 15px;' +
    'border:1px solid #888' +
    '}' +

    '.md table.table tr:nth-child(even){'+
    'background:#EEE' +
    '}' +

    '.md pre.tilde{' +
    'border-top: 1px solid #CCC;' +
    'border-bottom: 1px solid #CCC;' +
    'padding: 5px 0 5px 20px;' +
    'margin:0 0 0 0;' +
    'background:#FCFCFC;' +
    'page-break-inside:avoid' +
    '}' +

    '.md a.target{width:0px;height:0px;visibility:hidden;font-size:0px;display:inline-block}' +
    '.md a:link, .md a:visited{color:#38A;text-decoration:none}' +
    '.md a:link:hover{text-decoration:underline}' +

    '.md dt{' +
    'font-weight:700' +
    '}' +

    // Remove excess space above definitions due to paragraph breaks, and add some at the bottom
    '.md dl>dd{margin-top:-8px; margin-bottom:8px}' +

     // Extra space around terse definition lists
    '.md dl>table{' +
    'margin:35px 0 30px' +
    '}' +

    '.md code{' +
    'white-space:pre-wrap;' +
    'overflow-wrap:break-word;' +
    'text-align:left;' +
    'page-break-inside:avoid' +
    '}' +

    '.md .endnote{' +
    'font-size:13px;' +
    'line-height:15px;' +
    'padding-left:10px;' +
    'text-indent:-10px' +
    '}' +

    '.md .bib{' +
    'padding-left:80px;' +
    'text-indent:-80px;' +
    'text-align:left' +
    '}' +

    '.markdeepFooter{font-size:9px;text-align:right;padding-top:80px;color:#999}' +

    '.md .mediumTOC{float:right;font-size:12px;line-height:15px;border-left:1px solid #CCC;padding-left:15px;margin:15px 0px 15px 25px}' +

    '.md .mediumTOC .level1{font-weight:600}' +

    '.md .longTOC .level1{font-weight:600;display:block;padding-top:12px;margin:0 0 -20px}' +

    '.md .shortTOC{text-align:center;font-weight:bold;margin-top:15px;font-size:14px}' +

    '.md .admonition{' +
         'position:relative;' +
         'margin:1em 0;' +
         'padding:.4rem 1rem;' +
         'border-radius:.2rem;' +
         'border-left:2.5rem solid rgba(68,138,255,.4);' +
         'background-color:rgba(68,138,255,.15);' +
     '}' +

     '.md .admonition-title{' +
         'font-weight:bold;' +
         'border-bottom:solid 1px rgba(68,138,255,.4);' +
         'padding-bottom:4px;' +
         'margin-bottom:4px;' +
         'margin-left: -1rem;' +
         'padding-left:1rem;' +
         'margin-right:-1rem;' +
         'border-color:rgba(68,138,255,.4)' +
     '}' +

    '.md .admonition.tip{' +
       'border-left:2.5rem solid rgba(50,255,90,.4);' +
       'background-color:rgba(50,255,90,.15)' +
    '}' +

    '.md .admonition.tip::before{' +
       'content:"\\24d8";' +
       'font-weight:bold;' +
       'font-size:150%;' +
       'position:relative;' +
       'top:3px;' +
       'color:rgba(26,128,46,.8);' +
       'left:-2.95rem;' +
       'display:block;' +
       'width:0;' +
       'height:0' +
     '}' +

     '.md .admonition.tip>.admonition-title{' +
       'border-color:rgba(50,255,90,.4)' +
     '}' +

     '.md .admonition.warn,.md .admonition.warning{' +
       'border-left:2.5rem solid rgba(255,145,0,.4);' +
       'background-color:rgba(255,145,0,.15)' +
     '}' +

     '.md .admonition.warn::before,.md .admonition.warning::before{' +
       'content:"\\26A0";' +
       'font-weight:bold;' +
       'font-size:150%;' +
       'position:relative;' +
       'top:2px;' +
       'color:rgba(128,73,0,.8);' +
       'left:-2.95rem;' +
       'display:block;' +
       'width:0;' +
       'height:0' +
     '}' +

     '.md .admonition.warn>.admonition-title,.md .admonition.warning>.admonition-title{' +
      'border-color:rgba(255,145,0,.4)' +
     '}' +

     '.md .admonition.error{' +
      'border-left: 2.5rem solid rgba(255,23,68,.4);'+
      'background-color:rgba(255,23,68,.15)' +
    '}' +

    '.md .admonition.error>.admonition-title{' +
      'border-color:rgba(255,23,68,.4)'+
    '}' +

    '.md .admonition.error::before{' +
    'content: "\\2612";' +
    'font-family:"Arial";' +
    'font-size:200%;' +
    'position:relative;' +
    'color:rgba(128,12,34,.8);' +
    'top:-2px;' +
    'left:-3rem;' +
    'display:block;' +
    'width:0;' +
    'height:0' +
   '}' +

   '.md .admonition p:last-child{margin-bottom:0}'  +

   '.md li.checked,.md li.unchecked{'+
    'list-style:none;'+
    'overflow:visible;'+
    'text-indent:-1.2em'+
                       '}' +

   '.md li.checked:before,.md li.unchecked:before{' +
   'content:"\\2611";' +
   'display:block;'+
   'float:left;' +
   'width:1em;' +
   'font-size:120%'+
                       '}'+

   '.md li.unchecked:before{'+
   'content:"\\2610"' +
   '}'

);

var MARKDEEP_LINE = '<!-- Markdeep: --><style class="fallback">body{visibility:hidden;white-space:pre;font-family:monospace}</style><script src="markdeep.min.js"></script><script src="https://casual-effects.com/markdeep/latest/markdeep.min.js?"></script><script>window.alreadyProcessedMarkdeep||(document.body.style.visibility="visible")</script>';

// Language options:

var CHINESE = {
    keyword: {
        table:     '表',
        figure:    '图',
        listing:   '清单',
        diagram:   '图',
        contents:  '目录',

        sec:       '章',
        section:   '节',
        subsection: '小节',

        Monday:    '星期一',
        Tuesday:   '星期二',
        Wednesday: '星期三',
        Thursday:  '星期四',
        Friday:    '星期五',
        Saturday:  '星期六',
        Sunday:    '星期天',

        January:   '1月',
        February:  '2月',
        March:     '3月',
        April:     '4月',
        May:       '5月',
        June:      '6月',
        July:      '7月',
        August:    '8月',
        September: '9月',
        October:   '10月',
        November:  '11月',
        December:  '12月',

        jan: '1月',
        feb: '2月',
        mar: '3月',
        apr: '4月',
        may: '5月',
        jun: '6月',
        jul: '7月',
        aug: '8月',
        sep: '9月',
        oct: '10月',
        nov: '11月',
        dec: '12月',

        '&ldquo;': '"',
        '&rdquo;': '"'
    }
};

var DEFAULT_OPTIONS = {
    mode:               'markdeep',
    detectMath:         true,
    //lang:               {keyword:{}}, // English
    lang:               CHINESE, //{keyword:{}}, // English
    tocStyle:           'auto',
    hideEmptyWeekends:  true,
    showLabels:         false,
    sortScheduleLists:  true,
    definitionStyle:    'auto',
    captionAbove:       {diagram: false,
                         image:   false,
                         table:   false,
                         listing: false}
};

// See http://www.i18nguy.com/unicode/language-identifiers.html for keys
var LANG_TABLE = {
    en: {keyword:{}},
    cn: CHINESE
// Awaiting localization by a native speaker:
//    es: SPANISH
//    ...
};

[].slice.call(document.getElementsByTagName('meta')).forEach(function(elt) {
    var att = elt.getAttribute('lang');
    if (att) {
        var lang = LANG_TABLE[att];
        if (lang) {
            DEFAULT_OPTIONS.lang = lang;
        }
    }
});

var max = Math.max;
var min = Math.min;
var abs = Math.abs;
var sign = Math.sign || function (x) {
    return ( +x === x ) ? ((x === 0) ? x : (x > 0) ? 1 : -1) : NaN;
};

/** Get an option, or return the corresponding value from DEFAULT_OPTIONS */
function option(key, key2) {
    if (window.markdeepOptions && (window.markdeepOptions[key] !== undefined)) {
        var val = window.markdeepOptions[key];
        if (key2) {
            val = val[key2]
            if (val !== undefined) {
                return val;
            } else {
                return DEFAULT_OPTIONS[key][key2];
            }
        } else {
            return window.markdeepOptions[key];
        }
    } else if (DEFAULT_OPTIONS[key] !== undefined) {
        if (key2) {
            return DEFAULT_OPTIONS[key][key2];
        } else {
            return DEFAULT_OPTIONS[key];
        }
    } else {
        console.warn('Illegal option: "' + key + '"');
        return undefined;
    }
}

function maybeShowLabel(url, tag) {
    if (option('showLabels')) {
        var text = ' {\u00A0' + url + '\u00A0}';
        return tag ? entag(tag, text) : text;
    } else {
        return '';
    }
}

// Returns the localized version of word, defaulting to the word itself
function keyword(word) {
    return option('lang').keyword[word] || option('lang').keyword[word.toLowerCase()] || word;
}

/** Converts <>&" to their HTML escape sequences */
function escapeHTMLEntities(str) {
    return String(str).rp(/&/g, '&amp;').rp(/</g, '&lt;').rp(/>/g, '&gt;').rp(/"/g, '&quot;');
}

/** Restores the original source string's '<' and '>' as entered in
    the document, before the browser processed it as HTML. There is no
    way in an HTML document to distinguish an entity that was entered
    as an entity. */
function unescapeHTMLEntities(str) {
    // Process &amp; last so that we don't recursively unescape
    // escaped escape sequences.
    return str.
        rp(/&lt;/g, '<').
        rp(/&gt;/g, '>').
        rp(/&quot;/g, '"').
        rp(/&#39;/g, "'").
        rp(/&ndash;/g, '\u2013').
        rp(/&mdash;/g, '---').
        rp(/&amp;/g, '&');
}

function removeHTMLTags(str) {
    return str.rp(/<.*?>/g, '');
}

/** Turn the argument into a legal URL anchor */
function mangle(text) {
    return encodeURI(text.rp(/\s/g, '').toLowerCase());
}

/** Creates a style sheet containing elements like:

  hn::before {
    content: counter(h1) "." counter(h2) "." ... counter(hn) " ";
    counter-increment: hn;
   }
*/
function sectionNumberingStylesheet() {
    var s = '';

    for (var i = 1; i <= 6; ++i) {
        s += '.md h' + i + '::before {\ncontent:';
        for (var j = 1; j <= i; ++j) {
            s += 'counter(h' + j + ') "' + ((j < i) ? '.' : ' ') + '"';
        }
        s += ';\ncounter-increment: h' + i + ';margin-right:10px}';
    }

    return entag('style', s);
}

/**
   \param node  A node from an HTML DOM

   \return A String that is a very good reconstruction of what the
   original source looked like before the browser tried to correct
   it to legal HTML.
 */
function nodeToMarkdeepSource(node, leaveEscapes) {
    var source = node.innerHTML;

    // Markdown uses <john@bar.com> e-mail syntax, which HTML parsing
    // will try to close by inserting the matching close tags at the end of the
    // document. Remove anything that looks like that and comes *after*
    // the first fallback style.
    //source = source.rp(/<style class="fallback">[\s\S]*?<\/style>/gi, '');

    // Remove artificially inserted close tags from URLs and
    source = source.rp(/<\/https?:.*>|<\/ftp:.*>|<\/[^ "\t\n>]+@[^ "\t\n>]+>/gi, '');

    // Now try to fix the URLs themselves, which will be
    // transformed like this: <http: casual-effects.com="" markdeep="">
    source = source.rp(/<(https?|ftp): (.*?)>/gi, function (match, protocol, list) {

        // Remove any quotes--they wouldn't have been legal in the URL anyway
        var s = '<' + protocol + '://' + list.rp(/=""\s/g, '/');

        if (s.ss(s.length - 3) === '=""') {
            s = s.ss(0, s.length - 3);
        }

        // Remove any lingering quotes (since they
        // wouldn't have been legal in the URL)
        s = s.rp(/"/g, '');

        return s + '>';
    });

    // Remove the "fallback" style tags
    source = source.rp(/<style class=["']fallback["']>.*?<\/style>/gmi, '');

    source = unescapeHTMLEntities(source);

    return source;
}

/** Extracts one diagram from a Markdown string.

    Returns {beforeString, diagramString, alignmentHint, afterString}
    diagramString will be empty if nothing was found. The
    DIAGRAM_MARKER is stripped from the diagramString.

    alignmentHint may be:
    floatleft
    floatright
    center
    flushleft

    diagramString does not include the marker characters.
    If there is a caption, it will appear in the afterString and not be parsed.
*/
function extractDiagram(sourceString) {
    // Returns the number of wide Unicode symbols (outside the BMP) in string s between indices
    // start and end - 1
    function unicodeSyms(s, start, end) {
        var p = start;
        for (var i = start; i < end; ++i, ++p) {
            var c = s.charCodeAt(p);
            p += (c >= 0xD800) && (c <= 0xDBFF);
        }
        return p - end;
    }

    function advance() {
        nextLineBeginning = sourceString.indexOf('\n', lineBeginning) + 1;
        wideCharacters = unicodeSyms(sourceString, lineBeginning + xMin, lineBeginning + xMax);
        textOnLeft  = textOnLeft  || /\S/.test(sourceString.ss(lineBeginning, lineBeginning + xMin));
        noRightBorder = noRightBorder || (sourceString[lineBeginning + xMax + wideCharacters] !== '*');

        // Text on the right ... if the line is not all '*'
        textOnRight = ! noRightBorder && (textOnRight || /[^ *\t\n\r]/.test(sourceString.ss(lineBeginning + xMax + wideCharacters + 1, nextLineBeginning)));
    }

    var noDiagramResult = {beforeString: sourceString, diagramString: '', alignmentHint: '', afterString: ''};

    // Search sourceString for the first rectangle of enclosed
    // DIAGRAM_MARKER characters at least DIAGRAM_START.length wide
    for (var i = sourceString.indexOf(DIAGRAM_START);
         i >= 0;
         i = sourceString.indexOf(DIAGRAM_START, i + DIAGRAM_START.length)) {

        // We found what looks like a diagram start. See if it has either a full border of
        // aligned '*' characters, or top-left-bottom borders and nothing but white space on
        // the left.

        // Look backwards to find the beginning of the line (or of the string)
        // and measure the start character relative to it
        var lineBeginning = max(0, sourceString.lastIndexOf('\n', i)) + 1;
        var xMin = i - lineBeginning;

        // Find the first non-diagram character on this line...or the end of the entire source string
        var j;
        for (j = i + DIAGRAM_START.length; sourceString[j] === DIAGRAM_MARKER; ++j) {}
        var xMax = j - lineBeginning - 1;

        // We have a potential hit. Start accumulating a result. If there was anything
        // between the newline and the diagram, move it to the after string for proper alignment.
        var result = {
            beforeString: sourceString.ss(0, lineBeginning),
            diagramString: '',
            alignmentHint: 'center',
            afterString: sourceString.ss(lineBeginning, i).rp(/[ \t]+$/, ' ')
        };

        var nextLineBeginning = 0, wideCharacters = 0;
        var textOnLeft = false, textOnRight = false;
        var noRightBorder = false;

        advance();

        // Now, see if the pattern repeats on subsequent lines
        for (var good = true, previousEnding = j; good; ) {
            // Find the next line
            lineBeginning = nextLineBeginning;
            advance();
            if (lineBeginning === 0) {
                // Hit the end of the string before the end of the pattern
                return noDiagramResult;
            }

            if (textOnLeft) {
                // Even if there is text on *both* sides
                result.alignmentHint = 'floatright';
            } else if (textOnRight) {
                result.alignmentHint = 'floatleft';
            }

            // See if there are markers at the correct locations on the next line
            if ((sourceString[lineBeginning + xMin] === DIAGRAM_MARKER) &&
                (! textOnLeft || (sourceString[lineBeginning + xMax + wideCharacters] === DIAGRAM_MARKER))) {

                // See if there's a complete line of DIAGRAM_MARKER, which would end the diagram
                var x;
                for (x = xMin; (x < xMax) && (sourceString[lineBeginning + x] === DIAGRAM_MARKER); ++x) {}

                var begin = lineBeginning + xMin;
                var end   = lineBeginning + xMax + wideCharacters;

                if (! textOnLeft) {
                    // This may be an incomplete line
                    var newlineLocation = sourceString.indexOf('\n', begin);
                    if (newlineLocation !== -1) {
                        end = Math.min(end, newlineLocation);
                    }
                }

                // Trim any excess whitespace caused by our truncation because Markdown will
                // interpret that as fixed-formatted lines
                result.afterString += sourceString.ss(previousEnding, begin).rp(/^[ \t]*[ \t]/, ' ').rp(/[ \t][ \t]*$/, ' ');
                if (x === xMax) {
                    // We found the last row. Put everything else into
                    // the afterString and return the result.

                    result.afterString += sourceString.ss(lineBeginning + xMax + 1);
                    return result;
                } else {
                    // A line of a diagram. Extract everything before
                    // the diagram line started into the string of
                    // content to be placed after the diagram in the
                    // final HTML
                    result.diagramString += sourceString.ss(begin + 1, end) + '\n';
                    previousEnding = end + 1;
                }
            } else {
                // Found an incorrectly delimited line. Abort
                // processing of this potential diagram, which is now
                // known to NOT be a diagram after all.
                good = false;
            }
        } // Iterate over verticals in the potential box
    } // Search for the start

    return noDiagramResult;
}

/**
    Find the specified delimiterRegExp used as a quote (e.g., *foo*)
    and replace it with the HTML tag and optional attributes.
*/
function replaceMatched(string, delimiterRegExp, tag, attribs) {
    var delimiter = delimiterRegExp.source;
    var flanking = '[^ \\t\\n' + delimiter + ']';
    var pattern  = '([^A-Za-z0-9])(' + delimiter + ')' +
        '(' + flanking + '.*?(\\n.+?)*?)' +
        delimiter + '(?![A-Za-z0-9])';

    return string.rp(new RegExp(pattern, 'g'),
                          '$1<' + tag + (attribs ? ' ' + attribs : '') +
                          '>$3</' + tag + '>');
}

/** Maruku ("github")-style table processing */
function replaceTables(s, protect) {
    var TABLE_ROW       = /(?:\n[ \t]*(?:(?:\|?[ \t\S]+?(?:\|[ \t\S]+?)+\|?)|\|[ \t\S]+\|)(?=\n))/.source;
    var TABLE_SEPARATOR = /\n[ \t]*(?:(?:\|? *\:?-+\:?(?: *\| *\:?-+\:?)+ *\|?|)|\|[\:-]+\|)(?=\n)/.source;
    var TABLE_CAPTION   = /\n[ \t]*\[[^\n\|]+\][ \t]*(?=\n)/.source;
    var TABLE_REGEXP    = new RegExp(TABLE_ROW + TABLE_SEPARATOR + TABLE_ROW + '+(' + TABLE_CAPTION + ')?', 'g');

    function trimTableRowEnds(row) {
        return row.trim().rp(/^\||\|$/g, '');
    }

    s = s.rp(TABLE_REGEXP, function (match) {
        // Found a table, actually parse it by rows
        var rowArray = match.split('\n');

        var result = '';

        // Skip the bogus leading row
        var startRow = (rowArray[0] === '') ? 1 : 0;

        var caption = rowArray[rowArray.length - 1].trim();

        if ((caption.length > 3) && (caption[0] === '[') && (caption[caption.length - 1] === ']')) {
            // Remove the caption from the row array
            rowArray.pop();
            caption = caption.ss(1, caption.length - 1);
        } else {
            caption = undefined;
        }

        // Parse the separator row for left/center/right-indicating colons
        var columnStyle = [];
        trimTableRowEnds(rowArray[startRow + 1]).rp(/:?-+:?/g, function (match) {
            var left = (match[0] === ':');
            var right = (match[match.length - 1] === ':');
            columnStyle.push(protect(' style="text-align:' + ((left && right) ? 'center' : (right ? 'right' : 'left')) + '"'));
        });

        var row = rowArray[startRow + 1].trim();
        var hasLeadingBar  = row[0] === '|';
        var hasTrailingBar = row[row.length - 1] === '|';

        var tag = 'th';

        for (var r = startRow; r < rowArray.length; ++r) {
            // Remove leading and trailing whitespace and column delimiters
            row = rowArray[r].trim();

            if (! hasLeadingBar && (row[0] === '|')) {
                // Empty first column
                row = '&nbsp;' + row;
            }

            if (! hasTrailingBar && (row[row.length - 1] === '|')) {
                // Empty last column
                row += '&nbsp;';
            }

            row = trimTableRowEnds(row);
            var i = 0;
            result += entag('tr', '<' + tag + columnStyle[0] + '> ' +
                            row.rp(/ *\| */g, function () {
                                ++i;
                                return ' </' + tag + '><' + tag + columnStyle[i] + '> ';
                            }) + ' </' + tag + '>') + '\n';

            // Skip the header-separator row
            if (r == startRow) {
                ++r;
                tag = 'td';
            }
        }

        result = entag('table', result, protect('class="table"'));

        if (caption) {
            caption = entag('div', caption, protect('class="tablecaption"'));
            if (option('captionAbove', 'table')) {
                result = caption + result;
            } else {
                result = '\n' + result + caption;
            }
        }

        return entag('div', result, "class='table'");
    });

    return s;
}

function replaceLists(s, protect) {
    // Identify task list bullets in a few patterns and reformat them to a standard format for
    // easier processing.
    s = s.rp(/^(\s*)(?:-\s*)?(?:\[ \]|\u2610)(\s+)/mg, '$1\u2610$2');
    s = s.rp(/^(\s*)(?:-\s*)?(?:\[x\]|\u2611)(\s+)/mg, '$1\u2611$2');

    // Identify list blocks:
    // Blank line or line ending in colon, line that starts with #., *, +, -, ☑, or ☐
    // and then any number of lines until another blank line
    var BLANK_LINES = /\n\s*\n/.source;

    // Preceding line ending in a colon

    // \u2610 is the ballot box (unchecked box) character
    var PREFIX     = /[:,]\s*\n/.source;
    var LIST_BLOCK_REGEXP =
        new RegExp('(' + PREFIX + '|' + BLANK_LINES + '|<p>\s*\n|<br/>\s*\n?)' +
                   /((?:[ \t]*(?:\d+\.|-|\+|\*|\u2611|\u2610)(?:[ \t]+.+\n(?:[ \t]*\n)?)+)+)/.source, 'gm');

    var keepGoing = true;

    var ATTRIBS = {'+': protect('class="plus"'), '-': protect('class="minus"'), '*': protect('class="asterisk"'),
                   '\u2611': protect('class="checked"'), '\u2610': protect('class="unchecked"')};
    var NUMBER_ATTRIBS = protect('class="number"');

    // Sometimes the list regexp grabs too much because subsequent lines are indented *less*
    // than the first line. So, if that case is found, re-run the regexp.
    while (keepGoing) {
        keepGoing = false;
        s = s.rp(LIST_BLOCK_REGEXP, function (match, prefix, block) {
            var result = prefix;

            // Contains {indentLevel, tag}
            var stack = [];
            var current = {indentLevel: -1};

            /* function logStack(stack) {
               var s = '[';
               stack.forEach(function(v) { s += v.indentLevel + ', '; });
               console.log(s.ss(0, s.length - 2) + ']');
               } */
            block.split('\n').forEach(function (line) {
                var trimmed     = line.rp(/^\s*/, '');

                var indentLevel = line.length - trimmed.length;

                // Add a CSS class based on the type of list bullet
                var attribs = ATTRIBS[trimmed[0]];
                var isUnordered = !! attribs; // JavaScript for: attribs !== undefined
                attribs = attribs || NUMBER_ATTRIBS;
                var isOrdered   = /^\d+\.[ \t]/.test(trimmed);
                var isBlank     = trimmed === '';
                var start       = isOrdered ? ' ' + protect('start=' + trimmed.match(/^\d+/)[0]) : '';

                if (isOrdered || isUnordered) {
                    // Add the indentation for the bullet itself
                    indentLevel += 2;
                }

                if (! current) {
                    // Went below top-level indent
                    result += '\n' + line;
                } else if (! isOrdered && ! isUnordered && (isBlank || (indentLevel >= current.indentLevel))) {
                    // Line without a marker
                    result += '\n' + current.indentChars + line;
                } else {
                    //console.log(indentLevel + ":" + line);
                    if (indentLevel !== current.indentLevel) {
                        // Enter or leave indentation level
                        if ((current.indentLevel !== -1) && (indentLevel < current.indentLevel)) {
                            while (current && (indentLevel < current.indentLevel)) {
                                stack.pop();
                                // End the current list and decrease indentation
                                result += '\n</li></' + current.tag + '>';
                                current = stack[stack.length - 1];
                            }
                        } else {
                            // Start a new list that is more indented
                            current = {indentLevel: indentLevel,
                                       tag:         isOrdered ? 'ol' : 'ul',
                                       // Subtract off the two indent characters we added above
                                       indentChars: line.ss(0, indentLevel - 2)};
                            stack.push(current);
                            result += '\n<' + current.tag + start + '>';
                        }
                    } else if (current.indentLevel !== -1) {
                        // End previous list item, if there was one
                        result += '\n</li>';
                    } // Indent level changed

                    if (current) {
                        // Add the list item
                        result += '\n' + current.indentChars + '<li ' + attribs + '>' + trimmed.rp(/^(\d+\.|-|\+|\*|\u2611|\u2610) /, '');
                    } else {
                        // Just reached something that is *less* indented than the root--
                        // copy forward and then re-process that list
                        result += '\n' + line;
                        keepGoing = true;
                    }
                }
            }); // For each line

            // Remove trailing whitespace
            result = result.replace(/\s+$/,'');

            // Finish the last item and anything else on the stack (if needed)
            for (current = stack.pop(); current; current = stack.pop()) {
                result += '</li></' + current.tag + '>';
            }

            return result + '\n\n';
        });
    } // while keep going

    return s;
}

/**
    Identifies schedule lists, which look like:

  date: title
    events

  Where date must contain a day, month, and four-number year and may
  also contain a day of the week.  Note that the date must not be
  indented and the events must be indented.

  Multiple events per date are permitted.
*/
function replaceScheduleLists(str, protect) {
    // Must open with something other than indentation or a list
    // marker.  There must be a four-digit number somewhere on the
    // line. Exclude lines that begin with an HTML tag...this will
    // avoid parsing headers that have dates in them.
    var BEGINNING = /^(?:[^\|<>\s-\+\*\d].*[12]\d{3}(?!\d).*?|(?:[12]\d{3}(?!\.).*\d.*?)|(?:\d{1,3}(?!\.).*[12]\d{3}(?!\d).*?))/.source;

    // There must be at least one more number in a date, a colon, and then some more text
    var DATE_AND_TITLE = '(' + BEGINNING + '):' + /[ \t]+([^ \t\n].*)\n/.source;

    // The body of the schedule item. It may begin with a blank line and contain
    // multiple paragraphs separated by blank lines...as long as there is indenting
    var EVENTS = /(?:[ \t]*\n)?((?:[ \t]+.+\n(?:[ \t]*\n){0,3})*)/.source;
    var ENTRY = DATE_AND_TITLE + EVENTS;

    var BLANK_LINE = '\n[ \t]*\n';
    var ENTRY_REGEXP = new RegExp(ENTRY, 'gm');

    var rowAttribs = protect('valign="top"');
    var dateTDAttribs = protect('style="width:100px;padding-right:15px" rowspan="2"');
    var eventTDAttribs = protect('style="padding-bottom:25px"');

    var DAY_NAME   = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(keyword);
    var MONTH_NAME = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].map(keyword);
    var MONTH_NAME_LIST = MONTH_NAME.join('|');
    var MONTH_FULL_NAME = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(keyword);

    // Used to mark the center of each day. Not close to midnight to avoid daylight
    // savings problems.
    var standardHour = 9;

    try {
        var scheduleNumber = 0;
        str = str.rp(new RegExp(BLANK_LINE + '(' + ENTRY + '){2,}', 'gm'),
                     function (schedule) {
                       ++scheduleNumber;
                       // Each entry has the form {date:date, title:string, text:string}
                       var entryArray = [];

                       // Now parse the schedule into individual day entries

                       var anyWeekendEvents = false;

                       schedule.rp(ENTRY_REGEXP,
                                   function (entry, date, title, events) {
                                       // Remove the day from the date (we'll reconstruct it below). This is actually unnecessary, since we
                                       // explicitly compute the value anyway and the parser is robust to extra characters, but it aides
                                       // in debugging.
                                       //
                                       // date = date.rp(/(?:(?:sun|mon|tues|wednes|thurs|fri|satur)day|(?:sun|mon|tue|wed|thu|fri|sat)\.?|(?:su|mo|tu|we|th|fr|sa)),?/gi, '');

                                       // Parse the date. The Javascript Date class's parser is useless because it
                                       // is locale dependent, so we do this with a regexp.

                                       var year = '', month = '', day = '', parenthesized = false;

                                       date = date.trim();

                                       if ((date[0] === '(') && (date.slice(-1) === ')')) {
                                           // This is a parenthesized entry
                                           date = date.slice(1, -1);
                                           parenthesized = true;
                                       }

                                       // DD MM YYYY
                                       var match = date.match(RegExp('([0123]?\\d)\\D+([01]?\\d|' + MONTH_NAME_LIST + ')\\D+([12]\\d{3})', 'i'));

                                       if (match) {
                                           day = match[1]; month = match[2]; year = match[3];
                                       } else {
                                           // YYYY MM DD
                                           match = date.match(RegExp('([12]\\d{3})\\D+([01]?\\d|' + MONTH_NAME_LIST + ')\\D+([0123]?\\d)', 'i'));
                                           if (match) {
                                               day = match[3]; month = match[2]; year = match[1];
                                           } else {
                                               // monthname day year
                                               match = date.match(RegExp('(' + MONTH_NAME_LIST + ')\\D+([0123]?\\d)\\D+([12]\\d{3})', 'i'));
                                               if (match) {
                                                   day = match[2]; month = match[1]; year = match[3];
                                               } else {
                                                   throw "Could not parse date";
                                               }
                                           }
                                       }

                                       // Reconstruct standardized date format
                                       date = day + ' ' + keyword(month) + ' ' + year;

                                       // Detect the month
                                       var monthNumber = parseInt(month) - 1;
                                       if (isNaN(monthNumber)) {
                                           monthNumber = MONTH_NAME.indexOf(month.toLowerCase());
                                       }

                                       var dateVal = new Date(Date.UTC(parseInt(year), monthNumber, parseInt(day), standardHour));
                                       // Reconstruct the day of the week
                                       var dayOfWeek = dateVal.getUTCDay();
                                       date = DAY_NAME[dayOfWeek] + '<br/>' + date;

                                       anyWeekendEvents = anyWeekendEvents || (dayOfWeek === 0) || (dayOfWeek === 6);

                                       entryArray.push({date: dateVal,
                                                        title: title,
                                                        sourceOrder: entryArray.length,
                                                        parenthesized: parenthesized,

                                                        // Don't show text if parenthesized with no body
                                                        text: parenthesized ? '' :
                                                        entag('tr',
                                                                    entag('td',
                                                                          '<a ' + protect('class="target" name="schedule' + scheduleNumber + '_' + dateVal.getUTCFullYear() + '-' + (dateVal.getUTCMonth() + 1) + '-' + dateVal.getUTCDate() + '"') + '>&nbsp;</a>' +
                                                                          date, dateTDAttribs) +
                                                                    entag('td', entag('b', title)), rowAttribs) +
                                                        entag('tr', entag('td', '\n\n' + events, eventTDAttribs), rowAttribs)});

                                       return '';
                                   });

                       // Shallow copy the entries to bypass sorting if needed
                       var sourceEntryArray = option('sortScheduleLists') ? entryArray : entryArray.slice(0);

                       // Sort by date
                       entryArray.sort(function (a, b) {
                           // Javascript's sort is not specified to be
                           // stable, so we have to preserve
                           // sourceOrder in ties.
                           var ta = a.date.getTime();
                           var tb = b.date.getTime();
                           return (ta === tb) ? (a.sourceOrder - b.sourceOrder) : (ta - tb);
                       });

                       var MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

                       // May be slightly off due to daylight savings time
                       var approximateDaySpan = (entryArray[entryArray.length - 1].date.getTime() - entryArray[0].date.getTime()) / MILLISECONDS_PER_DAY;

                       var today = new Date();
                       // Move back to midnight
                       today = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), standardHour));

                       var calendar = '';
                       // Make a calendar view with links, if suitable
                       if ((approximateDaySpan > 14) && (approximateDaySpan / entryArray.length < 16)) {
                           var DAY_HEADER_ATTRIBS = protect('colspan="2" width="14%" style="padding-top:5px;text-align:center;/*font-style:italic*/"');
                           var DATE_ATTRIBS       = protect('width="1%" height="30px" style="text-align:right;border:1px solid #EEE;border-right:none;"');
                           var FADED_ATTRIBS      = protect('width="1%" height="30px" style="color:#BBB;text-align:right;"');
                           var ENTRY_ATTRIBS      = protect('width="14%" style="border:1px solid #EEE;border-left:none;"');
                           var PARENTHESIZED_ATTRIBS = protect('class="parenthesized"');

                           // Find the first day of the first month
                           var date = entryArray[0].date;
                           var index = 0;

                           var hideWeekends = ! anyWeekendEvents && option('hideEmptyWeekends');
                           var showDate = hideWeekends ? function(date) { return (date.getUTCDay() > 0) && (date.getUTCDay() < 6);} : function() { return true; };

                           var sameDay = function (d1, d2) {
                               // Account for daylight savings time
                               return (abs(d1.getTime() - d2.getTime()) < MILLISECONDS_PER_DAY / 2);
                           }

                           // Go to the first of the month
                           date = new Date(date.getUTCFullYear(), date.getUTCMonth(), 1, standardHour);

                           while (date.getTime() < entryArray[entryArray.length - 1].date.getTime()) {

                               // Create the calendar header
                               calendar += '<table ' + protect('class="calendar"') + '>\n' +
                                   entag('tr', entag('th', MONTH_FULL_NAME[date.getUTCMonth()] + ' ' + date.getUTCFullYear(), protect('colspan="14"'))) + '<tr>';

                               (hideWeekends ? DAY_NAME.slice(1, 6) : DAY_NAME).forEach(function (name) {
                                   calendar += entag('td', name, DAY_HEADER_ATTRIBS);
                               });
                               calendar += '</tr>';

                               // Go back into the previous month to reach a Sunday. Check the time at noon
                               // to avoid problems with daylight saving time occuring early in the morning
                               while (date.getUTCDay() !== 0) {
                                   date = new Date(date.getTime() - MILLISECONDS_PER_DAY);
                               }

                               // Insert the days from the previous month
                               if (date.getDate() !== 1) {
                                   calendar += '<tr ' + rowAttribs + '>';
                                   while (date.getDate() !== 1) {
                                       if (showDate(date)) { calendar += '<td ' + FADED_ATTRIBS + '>' + date.getUTCDate() + '</td><td>&nbsp;</td>'; }
                                       date = new Date(date.getTime() + MILLISECONDS_PER_DAY);
                                   }
                               }

                               // Run until the end of the month
                               do {
                                   if (date.getUTCDay() === 0) {
                                       // Sunday, start a row
                                       calendar += '<tr ' + rowAttribs + '>';
                                   }

                                   if (showDate(date)) {
                                       var attribs = '';
                                       if (sameDay(date, today)) {
                                           attribs = protect('class="today"');
                                       }

                                       // Insert links as needed from entries
                                       var contents = '';

                                       for (var entry = entryArray[index]; entry && sameDay(entry.date, date); ++index, entry = entryArray[index]) {
                                           if (contents) { contents += '<br/>'; }
                                           if (entry.parenthesized) {
                                               // Parenthesized with no body, no need for a link
                                               contents += entag('span', entry.title, PARENTHESIZED_ATTRIBS);
                                           } else {
                                               contents += entag('a', entry.title, protect('href="#schedule' + scheduleNumber + '_' + date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate() + '"'));
                                           }
                                       }

                                       if (contents) {
                                           calendar += entag('td', entag('b', date.getUTCDate()), DATE_ATTRIBS + attribs) + entag('td', contents, ENTRY_ATTRIBS + attribs);
                                       } else {
                                           calendar += '<td ' + DATE_ATTRIBS + attribs + '></a>' + date.getUTCDate() + '</td><td ' + ENTRY_ATTRIBS + attribs + '> &nbsp; </td>';
                                       }
                                   }

                                   if (date.getUTCDay() === 6) {
                                       // Saturday, end a row
                                       calendar += '</tr>';
                                   }

                                   // Go to (approximately) the next day
                                   date = new Date(date.getTime() + MILLISECONDS_PER_DAY);
                               } while (date.getUTCDate() > 1);

                               // Finish out the week after the end of the month
                               if (date.getUTCDay() !== 0) {
                                   while (date.getUTCDay() !== 0) {
                                       if (showDate(date)) { calendar += '<td ' + FADED_ATTRIBS + '>' + date.getUTCDate() + '</td><td>&nbsp</td>'; }
                                       date = new Date(date.getTime() + MILLISECONDS_PER_DAY);
                                   }

                                   calendar += '</tr>';
                               }

                               calendar += '</table><br/>\n';

                               // Go to the first of the (new) month
                               date = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1, standardHour));

                           } // Until all days covered
                       } // if add calendar

                       // Construct the schedule
                       schedule = '';
                       sourceEntryArray.forEach(function (entry) {
                           schedule += entry.text;
                       });

                       return '\n\n' + calendar + entag('table', schedule, protect('class="schedule"')) + '\n\n';
                     });
    } catch (ignore) {
        // Maybe this wasn't a schedule after all, since we couldn't parse a date. Don't alarm
        // the user, though
    }

    return str;
}

/**
 Term
 :     description, which might be multiple
       lines and include blanks.

 Next Term

becomes

<dl>
  <dt>Term</dt>
  <dd> description, which might be multiple
       lines and include blanks.</dd>
  <dt>Next Term</dt>
</dl>

... unless it is very short, in which case it becomes a table.

*/
function replaceDefinitionLists(s, protect) {
    var TERM       = /^.+\n:(?=[ \t])/.source;

    // Definition can contain multiple paragraphs
    var DEFINITION = '(\s*\n|[: \t].+\n)+';

    s = s.rp(new RegExp('(' + TERM + DEFINITION + ')+', 'gm'),
             function (block) {

                 var list = [];

                 // Parse the block
                 var currentEntry = null;

                 block.split('\n').forEach(function (line, i) {
                     // What kind of line is this?
                     if (line.trim().length === 0) {
                         if (currentEntry) {
                             // Empty line
                             currentEntry.definition += '\n';
                         }
                     } else if (! /\s/.test(line[0]) && (line[0] !== ':')) {
                         currentEntry = {term: line, definition: ''};
                         list.push(currentEntry);
                     } else {
                         // Add the line to the current definition, stripping any single leading ':'
                         if (line[0] === ':') { line = ' ' + line.ss(1); }
                         currentEntry.definition += line + '\n';
                     }
                 });

                 var longestDefinition = 0;
                 list.forEach(function (entry) {
                     if (/\n\s*\n/.test(entry.definition.trim())) {
                         // This definition contains multiple paragraphs. Force it into long mode
                         longestDefinition = Infinity;
                     } else {
                         // Normal case
                         longestDefinition = max(longestDefinition, unescapeHTMLEntities(removeHTMLTags(entry.definition)).length);
                     }
                 });

                 var result = '';
                 var definitionStyle = option('definitionStyle');
                 if ((definitionStyle === 'short') || ((definitionStyle !== 'long') && (longestDefinition < 160))) {
                     var rowAttribs = protect('valign=top');
                     // This list has short definitions. Format it as a table
                     list.forEach(function (entry) {
                         result += entag('tr',
                                         entag('td', entag('dt', entry.term)) +
                                         entag('td', entag('dd', entag('p', entry.definition))),
                                         rowAttribs);
                     });
                     result = entag('table', result);

                 } else {
                     list.forEach(function (entry) {
                         // Leave *two* blanks at the start of a
                         // definition so that subsequent processing
                         // can detect block formatting within it.
                         result += entag('dt', entry.term) + entag('dd', entag('p', entry.definition));
                     });
                 }

                 return entag('dl', result);

             });

    return s;
}

/** Inserts a table of contents in the document and then returns
    [string, table], where the table maps strings to levels. */
function insertTableOfContents(s, protect, exposer) {

    // Gather headers for table of contents (TOC). We
    // accumulate a long and short TOC and then choose which
    // to insert at the end.
    var fullTOC = '';
    var shortTOC = '';

    // names of parent sections
    var nameStack = [];

    // headerCounter[i] is the current counter for header level (i - 1)
    var headerCounter = [0];
    var currentLevel = 0;
    var numAboveLevel1 = 0;

    var table = {};
    s = s.rp(/<h([1-6])>(.*?)<\/h\1>/gi, function (header, level, text) {
        level = parseInt(level)
        text = text.trim();

        // If becoming more nested:
        for (var i = currentLevel; i < level; ++i) {
            nameStack[i] = '';
            headerCounter[i] = 0;
        }

        // If becoming less nested:
        headerCounter.splice(level, currentLevel - level);
        nameStack.splice(level, currentLevel - level);
        currentLevel = level;

        ++headerCounter[currentLevel - 1];

        // Generate a unique name for this element
        var number = headerCounter.join('.');

        // legacy, for when toc links were based on
        // numbers instead of mangled names
        var oldname = 'toc' + number;

        var cleanText = removeHTMLTags(exposer(text)).trim().toLowerCase();

        table[cleanText] = number;

        // Remove links from the title itself
        text = text.rp(/<a\s.*>(.*?)<\/a>/g, '$1');

        nameStack[currentLevel - 1] = mangle(cleanText);

        var name = nameStack.join('/');

        // Only insert for the first three levels
        if (level <= 3) {
            // Indent and append (the Array() call generates spaces)
            fullTOC += Array(level).join('&nbsp;&nbsp;') + '<a href="#' + name + '" class="level' + level + '"><span class="tocNumber">' + number + '&nbsp; </span>' + text + '</a><br/>\n';

            if (level === 1) {
                shortTOC += ' &middot; <a href="#' + name + '">' + text + '</a>';
            } else {
                ++numAboveLevel1;
            }
        }

        return entag('a', '&nbsp;', protect('class="target" name="' + name + '"')) +
            entag('a', '&nbsp;', protect('class="target" name="' + oldname + '"')) +
            header;
    });

    if (shortTOC.length > 0) {
        // Strip the leading " &middot; "
        shortTOC = shortTOC.ss(10);
    }

    var numLevel1 = headerCounter[0];
    var numHeaders = numLevel1 + numAboveLevel1;

    // The location of the first header is indicative of the length of
    // the abstract...as well as where we insert. The first header may be accompanied by
    // <a name> tags, which we want to appear before.
    var firstHeaderLocation = s.regexIndexOf(/((<a\s+\S+>&nbsp;<\/a>)\s*)*?<h\d>/i);
    if (firstHeaderLocation === -1) { firstHeaderLocation = 0; }

    var AFTER_TITLES = '<div class="afterTitles"><\/div>';
    var insertLocation = s.indexOf(AFTER_TITLES);
    if (insertLocation === -1) {
        insertLocation = 0;
    } else {
        insertLocation += AFTER_TITLES.length;
    }

    // Which TOC style should we use?
    var tocStyle = option('tocStyle');

    var TOC = '';
    if ((tocStyle === 'auto') || (tocStyle === '')) {
        if (((numHeaders < 4) && (numLevel1 <= 1)) || (s.length < 2048)) {
            // No TOC; this document is really short
            tocStyle = 'none';
        } else if ((numLevel1 < 7) && (numHeaders / numLevel1 < 2.5)) {
            // We can use the short TOC
            tocStyle = 'short';
        } else if ((firstHeaderLocation === -1) || (firstHeaderLocation / 55 > numHeaders)) {
            // The abstract is long enough to float alongside, and there
            // are not too many levels.
            // Insert the medium-length TOC floating
            tocStyle = 'medium';
        } else {
            // This is a long table of contents or a short abstract
            // Insert a long toc...right before the first header
            tocStyle = 'long';
        }
    }

    switch (tocStyle) {
    case 'none':
    case '':
        break;

    case 'short':
        TOC = '<div class="shortTOC">' + shortTOC + '</div>';
        break;

    case 'medium':
        TOC = '<div class="mediumTOC"><center><b>' + keyword('Contents') + '</b></center><p>' + fullTOC + '</p></div>';
        break;

    case 'long':
        insertLocation = firstHeaderLocation;
        TOC = '<div class="longTOC"><div class="tocHeader">' + keyword('Contents') + '</div><p>' + fullTOC + '</p></div>';
        break;

    default:
        console.log('markdeepOptions.tocStyle = "' + tocStyle + '" specified in your document is not a legal value');
    }

    s = s.ss(0, insertLocation) + TOC + s.ss(insertLocation);

    return [s, table];
}

function escapeRegExpCharacters(str) {
    return str.rp(/([\.\[\]\(\)\*\+\?\^\$\\\{\}\|])/g, '\\$1');
}

/** Returns true if there are at least two newlines in each of the arguments */
function isolated(preSpaces, postSpaces) {
    if (preSpaces && postSpaces) {
        preSpaces  = preSpaces.match(/\n/g);
        postSpaces = postSpaces.match(/\n/g);
        return preSpaces && (preSpaces.length > 1) && postSpaces && (postSpaces.length > 1);
    } else {
        return false;
    }
}

/**
    Performs Markdeep processing on str, which must be a string or a
    DOM element.  Returns a string that is the HTML to display for the
    body. The result does not include the header: Markdeep stylesheet
    and script tags for including a math library, or the Markdeep
    signature footer.

    Optional argument elementMode defaults to true. This avoids turning a bold first word into a
    title or introducing a table of contents. Section captions are unaffected by this argument.
    Set elementMode = false if processing a whole document instead of an internal node.

 */
function markdeepToHTML(str, elementMode) {
    // Map names to the number used for end notes, in the order
    // encountered in the text.
    var endNoteTable = {}, endNoteCount = 0;

    // Reference links
    var referenceLinkTable = {};

    // In the private use area
    var PROTECT_CHARACTER = '\ue010';

    // Use base 36 for encoding numbers
    var PROTECT_RADIX     = 35;
    var protectedStringArray = [];

    // Gives 1.5M possible sequences in base 56
    var PROTECT_DIGITS    = 4;

    // Put the protect character at BOTH ends to avoid having the protected number encoding
    // look like an actual number to further markdown processing
    var PROTECT_REGEXP    = RegExp(PROTECT_CHARACTER + '[0-9a-wyz]{' + PROTECT_DIGITS + ',' + PROTECT_DIGITS + '}' + PROTECT_CHARACTER, 'g');

    /** Given an arbitrary string, returns an escaped identifier
        string to temporarily replace it with to prevent Markdeep from
        processing the contents. See expose() */
    function protect(s) {
        var i = (protectedStringArray.push(s) - 1).toString(PROTECT_RADIX);

        // Avoid the pattern "#x#", which Markdeep would interpret as a dimension eligible for
        // beautification.
        i = i.rp(/x/gi, 'z');

        // Ensure fixed length
        while (i.length < PROTECT_DIGITS) {
            i = '0' + i;
        }

        return PROTECT_CHARACTER + i + PROTECT_CHARACTER;
    }

    var exposeRan = false;
    /** Given the escaped identifier string from protect(), returns
        the orginal string. */
    function expose(i) {
        // Strip the escape character and parse, then look up in the
        // dictionary.
        var j = parseInt(i.ss(1, i.length - 1).rp(/z/g, 'x'), PROTECT_RADIX);
        exposeRan = true;
        return protectedStringArray[j];
    }

    /** First-class function to pass to String.replace to protect a
        sequence defined by a regular expression. */
    function protector(match, protectee) {
        return protect(protectee);
    }

    function protectorWithPrefix(match, prefix, protectee) {
        return prefix + protect(protectee);
    }

    // SECTION HEADERS
    // This is common code for numbered headers. No-number ATX headers are processed
    // separately
    function makeHeaderFunc(level) {
        return function (match, header) {
            return '\n\n</p>\n<a ' + protect('class="target" name="' + mangle(removeHTMLTags(header.rp(PROTECT_REGEXP, expose))) + '"') +
                '>&nbsp;</a>' + entag('h' + level, header) + '\n<p>\n\n';
        }
    }

    if (elementMode === undefined) {
        elementMode = true;
    }

    if (str.innerHTML !== undefined) {
        str = str.innerHTML;
    }

    // Prefix a newline so that blocks beginning at the top of the
    // document are processed correctly
    str = '\n\n' + str;

    // Replace pre-formatted script tags that are used to protect
    // less-than signs, e.g., in std::vector<Value>
    str = str.rp(/<script\s+type\s*=\s*['"]preformatted['"]\s*>([\s\S]*?)<\/script>/gi, '$1');

    function replaceDiagrams(str) {
        var result = extractDiagram(str);
        if (result.diagramString) {
            var CAPTION_REGEXP = /^\n*[ \t]*\[[^\n]+\][ \t]*(?=\n)/;
            result.afterString = result.afterString.rp(CAPTION_REGEXP, function (caption) {
                // Strip whitespace and enclosing brackets from the caption
                caption = caption.trim();
                caption = caption.ss(1, caption.length - 1);

                result.caption = entag('center', entag('div', caption, protect('class="imagecaption"')));
                return '';
            });

            var diagramSVG = diagramToSVG(result.diagramString, result.alignmentHint);
            var captionAbove = option('captionAbove', 'diagram')

            return result.beforeString +
                (result.caption && captionAbove ? result.caption : '') +
                diagramSVG +
                (result.caption && ! captionAbove ? result.caption : '') + '\n' +
                replaceDiagrams(result.afterString);
        } else {
            return str;
        }
    }

    // CODE FENCES, with styles. Do this before other processing so that their code is
    // protected from further Markdown processing
    var stylizeFence = function (cssClass, symbol) {
        var pattern = new RegExp('\n([ \\t]*)' + symbol + '{3,}([ \\t]*\\S*)([ \\t]+.+)?\n([\\s\\S]+?)\n\\1' + symbol + '{3,}[ \t]*\n([ \\t]*\\[.+(?:\n.+){0,3}\\])?', 'g');

        str = str.rp(pattern, function(match, indent, lang, cssSubClass, sourceCode, caption) {
            if (caption) {
                caption = caption.trim();
                caption = '<div ' + protect('class="listingcaption ' + cssClass + '"') + '>' + caption.ss(1, caption.length - 1) + '</div>\n';
            }
            // Remove the block's own indentation from each line of sourceCode
            sourceCode = sourceCode.rp(new RegExp('(^|\n)' + indent, 'g'), '$1');

            var captionAbove = option('captionAbove', 'listing')
            var nextSourceCode, nextLang, nextCssSubClass;
            var body = '';

            // Process multiple-listing blocks
            do {
                nextSourceCode = nextLang = nextCssSubClass = undefined;
                sourceCode = sourceCode.rp(new RegExp('\\n([ \\t]*)' + symbol + '{3,}([ \\t]*\\S+)([ \\t]+.+)?\n([\\s\\S]*)'),
                                           function (match, indent, lang, cssSubClass, everythingElse) {
                                               nextLang = lang;
                                               nextCssSubClass = cssSubClass;
                                               nextSourceCode = everythingElse;
                                               return '';
                                           });

                // Highlight and append this block
                lang = lang ? lang.trim() : undefined;
                var result;
                if (lang === 'none') {
                    result = hljs.highlightAuto(sourceCode, []);
                } else if (lang === undefined) {
                    result = hljs.highlightAuto(sourceCode);
                } else {
                    try {
                        result = hljs.highlight(lang, sourceCode, true);
                    } catch (e) {
                        // Some unknown language specified. Force to no formatting.
                        result = hljs.highlightAuto(sourceCode, []);
                    }
                }

                var highlighted = result.value;

                // Mark each line as a span to support line numbers
                highlighted = highlighted.rp(/^(.*)$/gm, entag('span', '$1', 'class="line"'));

                if (cssSubClass) {
                    highlighted = entag('div', highlighted, 'class="' + cssSubClass + '"');
                }

                body += highlighted;

                // Advance the next nested block
                sourceCode = nextSourceCode;
                lang = nextLang;
                cssSubClass = nextCssSubClass;
            } while (sourceCode);

            // Insert paragraph close/open tags, since browsers force them anyway around pre tags
            // We need the indent in case this is a code block inside a list that is indented.
            return '\n' + indent + '</p>' + (caption && captionAbove ? caption : '') +
                protect(entag('pre', entag('code', body), 'class="listing ' + cssClass + '"')) +
                (caption && ! captionAbove ? caption : '') + '<p>\n';
        });
    };

    stylizeFence('tilde', '~');
    stylizeFence('backtick', '`');

    // Protect raw <CODE> content
    str = str.rp(/(<code\b.*?<\/code>)/gi, protector);

    // Remove XML/HTML COMMENTS
    str = str.rp(/<!--\s[\s\S]+?\s-->/g, '');

    str = replaceDiagrams(str);

    // Protect SVG blocks (including the ones we just inserted)
    str = str.rp(/<svg( .*?)?>([\s\S]*?)<\/svg>/gi, function (match, attribs, body) {
        return '<svg' + protect(attribs) + '>' + protect(body) + '</svg>';
    });

    // Protect STYLE blocks
    str = str.rp(/<style>([\s\S]*?)<\/style>/gi, function (match, body) {
        return entag('style', protect(body));
    });

    // Protect the very special case of img tags with newlines and
    // breaks in them AND mismatched angle brackets. This happens for
    // Gravizo graphs.
    str = str.rp(/<img\s+src=(["'])[\s\S]*?\1\s*>/gi, function (match, quote) {
        // Strip the "<img " and ">", and then protect the interior:
        return "<img " + protect(match.ss(5, match.length - 1)) + ">";
    });

    // INLINE CODE: Surrounded in back ticks on a single line.  Do this before any other
    // processing to protect code blocks from further interference. Don't process back ticks
    // inside of code fences. Allow a single newline, but not wrapping further because that
    // might just pick up quotes used as other punctuation across lines. Explicitly exclude
    // cases where the second quote immediately preceeds a number, e.g., "the old `97"
    str = str.rp(/(`)(.+?(?:\n.+?)?)`(?!\d)/g, entag('code', '$2'));

    // CODE: Escape angle brackets inside code blocks (including the ones we just introduced),
    // and then protect the blocks themselves
    str = str.rp(/(<code(?: .*?)?>)([\s\S]*?)<\/code>/gi, function (match, open, inlineCode) {
        return protect(open + escapeHTMLEntities(inlineCode) + '</code>');
    });

    // PRE: Protect pre blocks
    str = str.rp(/(<pre\b[\s\S]*?<\/pre>)/gi, protector);

    // Protect raw HTML attributes from processing
    str = str.rp(/(<\w[^ \n<>]*?[ \t]+)(.*?)(?=\/?>)/g, protectorWithPrefix);

    // End of processing literal blocks
    /////////////////////////////////////////////////////////////////////////////

    // Temporarily hide $$ MathJax LaTeX blocks from Markdown processing (this must
    // come before single $ block detection below)
    str = str.rp(/(\$\$[\s\S]+?\$\$)/g, protector);

    // Convert LaTeX $ ... $ to MathJax, but verify that this
    // actually looks like math and not just dollar
    // signs. Don't rp double-dollar signs. Do this only
    // outside of protected blocks.

    // Also allow LaTeX of the form $...$ if the close tag is not US$ or Can$
    // and there are spaces outside of the dollar signs.
    //
    // Test: " $3 or US$2 and 3$, $x$ $y + \n 2x$ or ($z$) $k$. or $2 or $2".match(pattern) =
    // ["$x$", "$y +  2x$", "$z$", "$k$"];
    str = str.rp(/((?:[^\w\d]))\$(\S(?:[^\$]*?\S(?!US|Can))??)\$(?![\w\d])/g, '$1\\($2\\)');

    //
    // Literally: find a non-dollar sign, non-number followed
    // by a dollar sign and a space.  Then, find any number of
    // characters until the same pattern reversed, allowing
    // one punctuation character before the final space. We're
    // trying to exclude things like Canadian 1$ and US $1
    // triggering math mode.

    str = str.rp(/((?:[^\w\d]))\$([ \t][^\$]+?[ \t])\$(?![\w\d])/g, '$1\\($2\\)');

    // Temporarily hide MathJax LaTeX blocks from Markdown processing
    str = str.rp(/(\\\([\s\S]+?\\\))/g, protector);
    str = str.rp(/(\\begin\{equation\}[\s\S]*?\\end\{equation\})/g, protector);
    str = str.rp(/(\\begin\{eqnarray\}[\s\S]*?\\end\{eqnarray\})/g, protector);
    str = str.rp(/(\\begin\{equation\*\}[\s\S]*?\\end\{equation\*\})/g, protector);

    // HEADERS
    //
    // We consume leading and trailing whitespace to avoid creating an extra paragraph tag
    // around the header itself.

    // Setext-style H1: Text with ======== right under it
    str = str.rp(/(?:^|\s*\n)(.+?)\n[ \t]*={3,}[ \t]*\n/g, makeHeaderFunc(1));

    // Setext-style H2: Text with -------- right under it
    str = str.rp(/(?:^|\s*\n)(.+?)\n[ \t]*-{3,}[ \t]*\n/g, makeHeaderFunc(2));

    // ATX-style headers:
    //
    //  # Foo #
    //  # Foo
    //  (# Bar)
    //
    // If note that '#' in the title are only stripped if they appear at the end, in
    // order to allow headers with # in the title.

    for (var i = 6; i > 0; --i) {
        str = str.rp(new RegExp(/^\s*/.source + '#{' + i + ',' + i +'}(?:[ \t])([^\n]+?)#*[ \t]*\n', 'gm'),
                 makeHeaderFunc(i));

        // No-number headers
        str = str.rp(new RegExp(/^\s*/.source + '\\(#{' + i + ',' + i +'}\\)(?:[ \t])([^\n]+?)\\(?#*\\)?\\n[ \t]*\n', 'gm'),
                     '\n</p>\n' + entag('div', '$1', protect('class="nonumberh' + i + '"')) + '\n<p>\n\n');
    }

    // HORIZONTAL RULE: * * *, - - -, _ _ _
    str = str.rp(/\n[ \t]*((\*|-|_)[ \t]*){3,}[ \t]*\n/g, '\n<hr/>\n');

    // PAGE BREAK or HORIZONTAL RULE: +++++
    str = str.rp(/\n[ \t]*\+{5,}[ \t]*\n/g, '\n<hr ' + protect('class="pagebreak"') + '/>\n');

    // ADMONITION: !!! (class) (title)\n body
    str = str.rp(/^!!![ \t]*([^\s"'><&\:]*)\:?(.*)\n([ \t]{3,}.*\s*\n)*/gm, function (match, cssClass, title) {
        // Have to extract the body by splitting match because the regex doesn't capture the body correctly in the multi-line case
        match = match.trim();
        return '\n\n' + entag('div', ((title ? entag('div', title, protect('class="admonition-title"')) + '\n' : '') + match.ss(match.indexOf('\n'))).trim(), protect('class="admonition ' + cssClass.toLowerCase().trim() + '"')) + '\n\n';
    });

    // FANCY QUOTE in a blockquote:
    // > " .... "
    // >    -- Foo

    var FANCY_QUOTE = protect('class="fancyquote"');
    str = str.rp(/\n>[ \t]*"(.*(?:\n>.*)*)"[ \t]*(?:\n>[ \t]*)?(\n>[ \t]{2,}\S.*)?\n/g,
                 function (match, quote, author) {
                     return entag('blockquote',
                                  entag('span',
                                        quote.rp(/\n>/g, '\n'),
                                        FANCY_QUOTE) +
                                  (author ? entag('span',
                                                  author.rp(/\n>/g, '\n'),
                                                  protect('class="author"')) : ''),
                                  FANCY_QUOTE);
                });

    // BLOCKQUOTE: > in front of a series of lines
    // Process iteratively to support nested blockquotes
    var foundBlockquote = false;
    do {
        foundBlockquote = false;
        str = str.rp(/(?:\n>.*){2,}/g, function (match) {
            // Strip the leading '>'
            foundBlockquote = true;
            return entag('blockquote', match.rp(/\n>/g, '\n'));
        });
    } while (foundBlockquote);

    // FOOTNOTES/ENDNOTES: [^symbolic name]. Disallow spaces in footnote names to
    // make parsing unambiguous
    str = str.rp(/\s*\[\^(\S+)\](?!:)/g, function (match, symbolicName) {
        symbolicName = symbolicName.toLowerCase().trim();

        if (! (symbolicName in endNoteTable)) {
            ++endNoteCount;
            endNoteTable[symbolicName] = endNoteCount;
        }

        return '<sup><a ' + protect('href="#endnote-' + symbolicName + '"') +
            '>' + endNoteTable[symbolicName] + '</a></sup>';
    });

    // CITATIONS: [#symbolicname]
    // The reference: (don't use \S+ because it can grab trailing punctuation)
    str = str.rp(/\[#([^\)\(\[\]\.#\s]+)\](?!:)/g, function (match, symbolicName) {
        symbolicName = symbolicName.trim();
        return '[<a ' + protect('href="#citation-' + symbolicName.toLowerCase() + '"') +
            '>' + symbolicName + '</a>]';
    });

    // The bibliography entry:
    str = str.rp(/\n\[#(\S+)\]:[ \t]+((?:[ \t]*\S[^\n]*\n?)*)/g, function (match, symbolicName, entry) {
        symbolicName = symbolicName.trim();
        return '<div ' + protect('class="bib"') + '>[<a ' + protect('class="target" name="citation-' + symbolicName.toLowerCase() + '"') +
            '>&nbsp;</a><b>' + symbolicName + '</b>] ' + entry + '</div>';
    });

    // TABLES: line with | over line containing only | and -
    // (process before reference links to avoid ambiguity on the captions)
    str = replaceTables(str, protect);

    // REFERENCE-LINK TABLE: [foo]: http://foo.com
    // (must come before reference images and reference links in processing)
    str = str.rp(/^\[([^\^#].*?)\]:(.*?)$/gm, function (match, symbolicName, url) {
        referenceLinkTable[symbolicName.toLowerCase().trim()] = {link: url.trim(), used: false};
        return '';
    });

    // E-MAIL ADDRESS: <foo@bar.baz> or foo@bar.baz
    str = str.rp(/(?:<|(?!<)\b)(\S+@(\S+\.)+?\S{2,}?)(?:$|>|(?=<)|(?=\s)(?!>))/g, function (match, addr) {
        return '<a ' + protect('href="mailto:' + addr + '"') + '>' + addr + '</a>';
    });

    // Common code for formatting images
    var formatImage = function (ignore, url, attribs) {
        attribs = attribs || '';
        var img;
        var hash;

        // Detect videos
        if (/\.(mp4|m4v|avi|mpg|mov|webm)$/i.test(url)) {
            // This is video. Any attributes provided will override the defaults given here
            img = '<video ' + protect('class="markdeep" src="' + url + '"' + attribs + ' width="480px" controls="true"') + '/>';
        } else if (/\.(mp3|mp2|ogg|wav|m4a|aac|flac)$/i.test(url)) {
            img = '<audio ' + protect('class="markdeep" controls ' + attribs + '><source src="' + url + '">') + '</audio>';
        } else if (hash = url.match(/^https:\/\/(?:www\.)?(?:youtube\.com\/\S*?v=|youtu\.be\/)([\w\d-]+)(&.*)?$/i)) {
            // Youtube video
            img = '<iframe ' + protect('class="markdeep" src="https://www.youtube.com/embed/' + hash[1] + '"' + attribs + ' width="480px" height="300px" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen') + '></iframe>';
        } else if (hash = url.match(/^https:\/\/(?:www\.)?vimeo.com\/\S*?\/([\w\d-]+)$/i)) {
            // Vimeo video
            img = '<iframe ' + protect('class="markdeep" src="https://player.vimeo.com/video/' + hash[1] + '"' + attribs + ' width="480px" height="300px" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen') + '></iframe>';
        } else {
            // Image (trailing space is needed in case attribs must be quoted by the
            // browser...without the space, the browser will put the closing slash in the
            // quotes.)
            img = '<img ' + protect('class="markdeep" src="' + url + '"' + attribs) + ' />';

            // Check for width or height (or max-width and max-height). If they exist,
            // link this to the full-size image as well. The current code ALWAYS makes
            // this link.
            //if (/\b(width|height)\b/i.test(attribs)) {
            img = entag('a ', img, protect('href="' + url + '" target="_blank"'));
            //}
        }

        return img;
    };

    // Reformat equation links that have brackets: eqn [foo] --> eqn \ref{foo} so that
    // mathjax can process them.
    str = str.rp(/\b(equation|eqn\.|eq\.)\s*\[([^\s\]]+)\]/gi, function (match, eq, label) {
        return eq + ' \\ref{' + label + '}';
    });

    // Reformat figure links that have subfigure labels in parentheses, to avoid them being
    // processed as links
    str = str.rp(/\b(figure|fig\.|table|tbl\.|listing|lst\.)\s*\[([^\s\]]+)\](?=\()/gi, function (match) {
        return match + '<span/>';
    });

    // Process links before images so that captions can contain links

    // Detect gravizo URLs inside of markdown images and protect them,
    // which will cause them to be parsed sort-of reasonably. This is
    // a really special case needed to handle the newlines and potential
    // nested parentheses. Use the pattern from http://blog.stevenlevithan.com/archives/regex-recursion
    // (could be extended to multiple nested parens if needed)
    str = str.rp(/\(http:\/\/g.gravizo.com\/(.*g)\?((?:[^\(\)]|\([^\(\)]*\))*)\)/gi, function(match, protocol, url) {
        return "(http://g.gravizo.com/" + protocol + "?" + encodeURIComponent(url) + ")";
    });

    // HYPERLINKS: [text](url attribs)
    str = str.rp(/(^|[^!])\[([^\[\]]+?)\]\(("?)([^<>\s"]+?)\3(\s+[^\)]*?)?\)/g, function (match, pre, text, maybeQuote, url, attribs) {
        attribs = attribs || '';
        return pre + '<a ' + protect('href="' + url + '"' + attribs) + '>' + text + '</a>' + maybeShowLabel(url);
    });

    // EMPTY HYPERLINKS: [](url)
    str = str.rp(/(^|[^!])\[[ \t]*?\]\(("?)([^<>\s"]+?)\2\)/g, function (match, pre, maybeQuote, url) {
        return pre + '<a ' + protect('href="' + url + '"') + '>' + url + '</a>';
    });

    // REFERENCE IMAGE: ![...][ref attribs]
    // Rewrite as a regular image for further processing below
    str = str.rp(/(!\[(?:[\s\S]+?)?\])\[("?)([^"<>\s]+?)\2(\s[^\]]*?)?\]/g, function (match, caption, maybeQuote, symbolicName, attribs) {
        symbolicName = symbolicName.toLowerCase().trim();
        var t = referenceLinkTable[symbolicName];
        if (! t) {
            console.log("Reference image '" + symbolicName + "' never defined");
            return '?';
        } else {
            t.used = true;
            var s = caption + '(' + t.link + (t.attribs || '') + ')';
            return s;
        }
    });

    // IMAGE GRID: Rewrite rows and grids of images into a grid
    var imageGridAttribs = protect('width="100%"');
    var imageGridRowAttribs = protect('valign="top"');
    str = str.rp(/(?:\n(?:[ \t]*!\[[^\n]*?\]\(("?)[^<>\s]+?(?:[^\n\)]*?)?\)){2,}[ \t]*)+\n/g, function (match) {
        var table = '';

        // Break into rows:
        match = match.split('\n');

        // Parse each row:
        match.forEach(function(row) {
            row = row.trim();
            if (row) {
                // Parse each image
                table += entag('tr', row.rp(/[ \t]*!\[[^\n]*?\]\([^\)\s]+([^\)]*?)?\)/g, function(image, attribs) {
                    //if (! /width|height/i.test(attribs) {
                        // Add a bogus "width" attribute to force the images to be hyperlinked to their
                        // full-resolution versions
                    //}
                    return entag('td', '\n\n'+ image + '\n\n');
                }), imageGridRowAttribs);
            }
        });

        return '\n' + entag('table', table, imageGridAttribs) + '\n';
    });

    // SIMPLE IMAGE: ![](url attribs)
    str = str.rp(/(\s*)!\[\]\(("?)([^"<>\s]+?)\2(\s[^\)]*?)?\)(\s*)/g, function (match, preSpaces, maybeQuote, url, attribs, postSpaces) {
        var img = formatImage(match, url, attribs);

        if (isolated(preSpaces, postSpaces)) {
            // In a block by itself: center
            img = entag('center', img);
        }

        return preSpaces + img + postSpaces;
    });

    // Explicit loop so that the output will be re-processed, preserving spaces between blocks.
    // Note that there is intentionally no global flag on the first regexp since we only want
    // to process the first occurance.
    var loop = true;
    var imageCaptionAbove = option('captionAbove', 'image');
    while (loop) {
        loop = false;

        // CAPTIONED IMAGE: ![caption](url attribs)
        str = str.rp(/(\s*)!\[([\s\S]+?)?\]\(("?)([^"<>\s]+?)\3(\s[^\)]*?)?\)(\s*)/, function (match, preSpaces, caption, maybeQuote, url, attribs, postSpaces) {

            loop = true;
            var divStyle = '';
            var iso = isolated(preSpaces, postSpaces);

            // Only floating images get their size attributes moved to the whole box
            if (attribs && ! iso) {
                // Move any width *attribute* specification to the box itself
                attribs = attribs.rp(/((?:max-)?width)\s*:\s*[^;'"]*/g, function (attribMatch, attrib) {
                    divStyle = attribMatch + ';';
                    return attrib + ':100%';
                });

                // Move any width *style* specification to the box itself
                attribs = attribs.rp(/((?:max-)?width)\s*=\s*('\S+?'|"\S+?")/g, function (attribMatch, attrib, expr) {
                    // Strip the quotes
                    divStyle = attrib + ':' + expr.ss(1, expr.length - 1) + ';';
                    return 'style="' + attrib + ':100%" ';
                });
            }

            var img = formatImage(match, url, attribs);

            if (iso) {
                // In its own block: center
                preSpaces += '<center>';
                postSpaces = '</center>' + postSpaces;
            } else {
                // Embedded: float
                divStyle += 'float:right;margin:4px 0px 0px 25px;'
            }

            caption = entag('div', caption + maybeShowLabel(url), protect('class="imagecaption"'));
            return preSpaces +
                entag('div', (imageCaptionAbove ? caption : '') + img + (! imageCaptionAbove ? caption : ''), protect('class="image" style="' + divStyle + '"')) +
                postSpaces;
        });
    } // while replacements made

    // Process these after links, so that URLs with underscores and tildes are protected.

    // STRONG: Must run before italic, since they use the
    // same symbols. **b** __b__
    str = replaceMatched(str, /\*\*/, 'strong', protect('class="asterisk"'));
    str = replaceMatched(str, /__/, 'strong', protect('class="underscore"'));

    // EM (ITALICS): *i* _i_
    str = replaceMatched(str, /\*/, 'em', protect('class="asterisk"'));
    str = replaceMatched(str, /_/, 'em', protect('class="underscore"'));

    // STRIKETHROUGH: ~~text~~
    str = str.rp(/\~\~([^~].*?)\~\~/g, entag('del', '$1'));

    // SMART DOUBLE QUOTES: "a -> localized &ldquo;   z"  -> localized &rdquo;
    // Allow situations such as "foo"==>"bar" and foo:"bar", but not 3' 9"
    str = str.rp(/(^|[ \t->])(")(?=\w)/gm, '$1' + keyword('&ldquo;'));
    str = str.rp(/([A-Za-z\.,:;\?!=<])(")(?=$|\W)/gm, '$1' + keyword('&rdquo;'));

    // ARROWS:
    str = str.rp(/(\s|^)<==(\s)/g, '$1\u21D0$2');
    str = str.rp(/(\s|^)->(\s)/g, '$1&rarr;$2');
    // (this requires having removed HTML comments first)
    str = str.rp(/(\s|^)-->(\s)/g, '$1&xrarr;$2');
    str = str.rp(/(\s|^)==>(\s)/g, '$1\u21D2$2');
    str = str.rp(/(\s|^)<-(\s)/g, '$1&larr;$2');
    str = str.rp(/(\s|^)<--(\s)/g, '$1&xlarr;$2');
    str = str.rp(/(\s|^)<==>(\s)/g, '$1\u21D4$2');
    str = str.rp(/(\s|^)<->(\s)/g, '$1\u2194$2');

    // EM DASH: ---
    // (exclude things that look like table delimiters!)
    str = str.rp(/([^-!\:\|])---([^->\:\|])/g, '$1&mdash;$2');

    // other EM DASH: -- (we don't support en dash...it is too short and looks like a minus)
    // (exclude things that look like table delimiters!)
    str = str.rp(/([^-!\:\|])--([^->\:\|])/g, '$1&mdash;$2');

    // NUMBER x NUMBER:
    str = str.rp(/(\d+\s?)x(\s?\d+)/g, '$1&times;$2');

    // MINUS: -4 or 2 - 1
    str = str.rp(/([\s\(\[<\|])-(\d)/g, '$1&minus;$2');
    str = str.rp(/(\d) - (\d)/g, '$1 &minus; $2');

    // EXPONENTS: ^1 ^-1 (no decimal places allowed)
    str = str.rp(/\^([-+]?\d+)\b/g, '<sup>$1</sup>');

    // PAGE BREAK:
    str = str.rp(/(^|\s|\b)\\(pagebreak|newpage)(\b|\s|$)/gi, protect('<div style="page-break-after:always"> </div>\n'))

    // SCHEDULE LISTS: date : title followed by indented content
    str = replaceScheduleLists(str, protect);

    // DEFINITION LISTS: Word followed by a colon list
    // Use <dl><dt>term</dt><dd>definition</dd></dl>
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
    //
    // Process these before lists so that lists within definition lists
    // work correctly
    str = replaceDefinitionLists(str, protect);

    // LISTS: lines with -, +, *, or number.
    str = replaceLists(str, protect);

    // DEGREE: ##-degree
    str = str.rp(/(\d+?)[ \t-]degree(?:s?)/g, '$1&deg;');

    // PARAGRAPH: Newline, any amount of space, newline...as long as there isn't already
    // a paragraph break there.
    str = str.rp(/(?:<p>)?\n\s*\n+(?!<\/p>)/gi,
                 function(match) { return (/^<p>/i.test(match)) ? match : '\n\n</p><p>\n\n';});

    // Remove empty paragraphs (mostly avoided by the above, but some can still occur)
    str = str.rp(/<p>[\s\n]*<\/p>/gi, '');

    // REFERENCE LINK
    str = str.rp(/(^|[^!])\[([^\[\]]+?)\]\[(.*?)\]/g, function (match, pre, text, symbolicName) {
        // Empty symbolic name is replaced by the text
        if (! symbolicName.trim()) {
            symbolicName = text;
        }

        symbolicName = symbolicName.toLowerCase().trim();
        var t = referenceLinkTable[symbolicName];
        if (! t) {
            console.log("Reference link '" + symbolicName + "' never defined");
            return '?';
        } else {
            t.used = true;
            return pre + '<a ' + protect('href="' + t.link + '"') + '>' + text + '</a>';
        }
    });

    // FOOTNOTES/ENDNOTES
    str = str.rp(/\n\[\^(\S+)\]: ((?:.+?\n?)*)/g, function (match, symbolicName, note) {
        symbolicName = symbolicName.toLowerCase().trim();
        if (symbolicName in endNoteTable) {
            return '\n<div ' + protect('class="endnote"') + '><a ' +
                protect('class="target" name="endnote-' + symbolicName + '"') +
                '>&nbsp;</a><sup>' + endNoteTable[symbolicName] + '</sup> ' + note + '</div>';
        } else {
            return "\n";
        }
    });

    // SECTION LINKS: XXX section, XXX subsection.
    // Do this by rediscovering the headers and then recursively
    // searching for links to them. Process after other
    // forms of links to avoid ambiguity.

    var allHeaders = str.match(/<h([1-6])>(.*?)<\/h\1>/gi);
    if (allHeaders) {
        allHeaders.forEach(function (header) {
            header = removeHTMLTags(header.ss(4, header.length - 5)).trim();
            var link = '<a ' + protect('href="#' + mangle(header) + '"') + '>';

            var sectionExp = '(' + keyword('section') + '|' + keyword('subsection') + ')';
            var headerExp = '(\\b' + escapeRegExpCharacters(header) + ')';

            // Search for links to this section
            str = str.rp(RegExp(headerExp + '\\s+' + sectionExp, 'gi'), link + "$1</a> $2");
            str = str.rp(RegExp(sectionExp + '\\s+' + headerExp, 'gi'), '$1 ' + link + "$2</a>");
        });
    }

    // TABLE, LISTING, and FIGURE LABEL NUMBERING: Figure [symbol]:  Table [symbol]:  Listing [symbol]: Diagram [symbols]:

    // This data structure maps caption types [by localized name] to a count of how many of
    // that type of object exist.
    var refCounter = {};

    // refTable['type_symbolicName'] = {number: number to link to, used: bool}
    var refTable = {};

    str = str.rp(RegExp(/($|>)\s*/.source + '(' + keyword('figure') + '|' + keyword('table') + '|' + keyword('listing') + '|' + keyword('diagram') + ')' + /\s*\[(.+?)\]:/.source, 'gim'), function (match, prefix, _type, _ref) {
        var type = _type.toLowerCase();
        // Increment the counter
        var count = refCounter[type] = (refCounter[type] | 0) + 1;
        var ref = type + '_' + mangle(_ref.toLowerCase().trim());

        // Store the reference number
        refTable[ref] = {number: count, used: false, source: type + ' [' + _ref + ']'};

        return prefix +
               entag('a', '&nbsp;', protect('class="target" name="' + ref + '"')) + entag('b', type[0].toUpperCase() + type.ss(1) + '&nbsp;' + count + ':', protect('style="font-style:normal;"')) +
               maybeShowLabel(_ref);
    });

    // FIGURE, TABLE, DIAGRAM, and LISTING references:
    // (must come after figure/table/listing processing, obviously)
    str = str.rp(RegExp('[\\b|\s]*(fig\\.|tbl\\.|lst\\.|' + keyword('figure') + '|' + keyword('table') + '|' + keyword('listing') + '|' + keyword('diagram') + ')\\s*\\[([^\\s\\]]+)\\]', 'gi'), function (match, _type, _ref) {
        // Fix abbreviations
        var type = _type.toLowerCase();
        switch (type) {
        case 'fig.': type = keyword('figure').toLowerCase(); break;
        case 'tbl.': type = keyword('table').toLowerCase(); break;
        case 'lst.': type = keyword('listing').toLowerCase(); break;
        }

        // Clean up the reference
        var ref = type + '_' + mangle(_ref.toLowerCase().trim());
        var t = refTable[ref];

        if (t) {
            t.used = true;
            return '<a ' + protect('href="#' + ref + '"') + '>' + _type + '&nbsp;' + t.number + maybeShowLabel(_ref) + '</a>';
        } else {
            console.log("Reference to undefined '" + type + " [" + _ref + "]'");
            return _type + ' ?';
        }
    });
//console.log(refTable)
    // URL: <http://baz> or http://baz
    // Must be detected after [link]() processing
    str = str.rp(/(?:<|(?!<)\b)(\w{3,6}:\/\/.+?)(?:$|>|(?=<)|(?=\s|\u00A0)(?!<))/g, function (match, url) {
        var extra = '';
        if (url[url.length - 1] == '.') {
            // Accidentally sucked in a period at the end of a sentence
            url = url.ss(0, url.length - 1);
            extra = '.';
        }
        // svn and perforce URLs are not hyperlinked. All others (http/https/ftp/mailto/tel, etc. are)
        return '<a ' + ((url[0] !== 's' && url[0] !== 'p') ? protect('href="' + url + '" class="url"') : '') + '>' + url + '</a>' + extra;
    });

    if (! elementMode) {
        var TITLE_PATTERN = /^\s*(?:<\/p><p>)?\s*<strong.*?>([^ \t\*].*?[^ \t\*])<\/strong>(?:<\/p>)?[ \t]*\n/.source;

        var ALL_SUBTITLES_PATTERN = /([ {4,}\t][ \t]*\S.*\n)*/.source;

        // Detect a bold first line and make it into a title; detect indented lines
        // below it and make them subtitles
        str = str.rp(
            new RegExp(TITLE_PATTERN + ALL_SUBTITLES_PATTERN, 'g'),
            function (match, title) {
                title = title.trim();

                // rp + RegExp won't give us the full list of
                // subtitles, only the last one. So, we have to
                // re-process match.
                var subtitles = match.ss(match.indexOf('\n', match.indexOf('</strong>')));
                subtitles = subtitles ? subtitles.rp(/[ \t]*(\S.*?)\n/g, '<div class="subtitle"> $1 </div>\n') : '';

                // Remove all tags from the title when inside the <TITLE> tag, as well
                // as unicode characters that don't render well in tabs and window bars.
                // These regexps look like they are full of spaces but are actually various
                // unicode space characters. http://jkorpela.fi/chars/spaces.html
                title = removeHTMLTags(title).replace(/[     ]/g, '').replace(/[         　]/g, ' ');

                return entag('title', title) + maybeShowLabel(window.location.href, 'center') +
                    '<div class="title"> ' + title +
                    ' </div>\n' + subtitles + '<div class="afterTitles"></div>\n';
            });
    } // if ! noTitles

    // Remove any bogus leading close-paragraph tag inserted by our extra newlines
    str = str.rp(/^\s*<\/p>/, '');

    // If not in element mode and not an INSERT child, maybe add a TOC
    if (! elementMode) {// && ! myURLParse[2]) {
        var temp = insertTableOfContents(str, protect, function (text) {return text.rp(PROTECT_REGEXP, expose)});
        str = temp[0];
        var toc = temp[1];
        // SECTION LINKS: Replace sec. [X], section [X], subsection [X]
        str = str.rp(RegExp('[\\b|\s]*(' + keyword('sec') + '\\.|' + keyword('section') + '|' + keyword('subsection') + ')\\s*\\[(.+?)\\]', 'gi'),
                    function (match, prefix, ref) {
                        var link = toc[ref.toLowerCase().trim()];
                        if (link) {
                            return prefix + '  <a ' + protect('href="#toc' + link + '"') + '>' + link + '</a>';
                        } else {
                            return prefix + ' ?';
                        }
                    });
    }

    // Expose all protected values. We may need to do this
    // recursively, because pre and code blocks can be nested.
    var maxIterations = 50;

    exposeRan = true;
    while ((str.indexOf(PROTECT_CHARACTER) + 1) && exposeRan && (maxIterations > 0)) {
        exposeRan = false;
        str = str.rp(PROTECT_REGEXP, expose);
        --maxIterations;
    }

    if (maxIterations <= 0) { console.log('WARNING: Ran out of iterations while expanding protected substrings'); }

    // Warn about unused references
    Object.keys(referenceLinkTable).forEach(function (key) {
        if (! referenceLinkTable[key].used) {
            console.log("Reference link '[" + key + "]' is defined but never used");
        }
    });

    Object.keys(refTable).forEach(function (key) {
        if (! refTable[key].used) {
            console.log("'" + refTable[key].source + "' is never referenced");
        }
    });

    return '<span class="md">' + entag('p', str) + '</span>';
}

/** Workaround for IE11 */
function strToArray(s) {
    if (Array.from) {
        return Array.from(s);
    } else {
        var a = [];
        for (var i = 0; i < s.length; ++i) {
            a[i] = s[i];
        }
        return a;
    }
}

/**
   Adds whitespace at the end of each line of str, so that all lines have equal length in
   unicode characters (which is not the same as JavaScript characters when high-index/escape
   characters are present).
*/
function equalizeLineLengths(str) {
    var lineArray = str.split('\n');

    if ((lineArray.length > 0) && (lineArray[lineArray.length - 1] === '')) {
        // Remove the empty last line generated by split on a trailing newline
        lineArray.pop();
    }

    var longest = 0;
    lineArray.forEach(function(line) {
        longest = max(longest, strToArray(line).length);
    });

    // Worst case spaces needed for equalizing lengths
    // http://stackoverflow.com/questions/1877475/repeat-character-n-times
    var spaces = Array(longest + 1).join(' ');

    var result = '';
    lineArray.forEach(function(line) {
        // Append the needed number of spaces onto each line, and
        // reconstruct the output with newlines
        result += line + spaces.ss(strToArray(line).length) + '\n';
    });

    return result;
}

/** Finds the longest common whitespace prefix of all non-empty lines
    and then removes it */
function removeLeadingSpace(str) {
    var lineArray = str.split('\n');

    var minimum = Infinity;
    lineArray.forEach(function (line) {
        if (line.trim() !== '') {
            // This is a non-empty line
            var spaceArray = line.match(/^([ \t]*)/);
            if (spaceArray) {
                minimum = min(minimum, spaceArray[0].length);
            }
        }
    });

    if (minimum === 0) {
        // No leading space
        return str;
    }

    var result = '';
    lineArray.forEach(function(line) {
        // Strip the common spaces
        result += line.ss(minimum) + '\n';
    });

    return result;
}

/** Returns true if this character is a "letter" under the ASCII definition */
function isASCIILetter(c) {
    var code = c.charCodeAt(0);
    return ((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122));
}

/** Converts diagramString, which is a Markdeep diagram without the surrounding asterisks, to
    SVG (HTML). Lines may have ragged lengths.

    alignmentHint is the float alignment desired for the SVG tag,
    which can be 'floatleft', 'floatright', or ''
 */
function diagramToSVG(diagramString, alignmentHint) {
    // Clean up diagramString if line endings are ragged
    diagramString = equalizeLineLengths(diagramString);

    // Temporarily replace 'o' that is surrounded by other text
    // with another character to avoid processing it as a point
    // decoration. This will be replaced in the final svg and is
    // faster than checking each neighborhood each time.
    var HIDE_O = '\ue004';
    diagramString = diagramString.rp(/([a-zA-Z]{2})o/g, '$1' + HIDE_O);
    diagramString = diagramString.rp(/o([a-zA-Z]{2})/g, HIDE_O + '$1');
    diagramString = diagramString.rp(/([a-zA-Z\ue004])o([a-zA-Z\ue004])/g, '$1' + HIDE_O + '$2');

    /** Pixels per character */
    var SCALE   = 8;

    /** Multiply Y coordinates by this when generating the final SVG
        result to account for the aspect ratio of text files. This
        MUST be 2 */
    var ASPECT = 2;

    var DIAGONAL_ANGLE = Math.atan(1.0 / ASPECT) * 180 / Math.PI;

    var EPSILON = 1e-6;

    // The order of the following is based on rotation angles
    // and is used for ArrowSet.toSVG
    var ARROW_HEAD_CHARACTERS            = '>v<^';
    var POINT_CHARACTERS                 = 'o*';
    var JUMP_CHARACTERS                  = '()';
    var UNDIRECTED_VERTEX_CHARACTERS     = "+";
    var VERTEX_CHARACTERS                = UNDIRECTED_VERTEX_CHARACTERS + ".'";

    // GRAY[i] is the Unicode block character for (i+1)/4 level gray
    var GRAY_CHARACTERS = '\u2591\u2592\u2593\u2594\u2589';

    // TRI[i] is a right-triangle rotated by 90*i
    var TRI_CHARACTERS  = '\u25E2\u25E3\u25E4\u25E5';

    var DECORATION_CHARACTERS            = ARROW_HEAD_CHARACTERS + POINT_CHARACTERS + JUMP_CHARACTERS + GRAY_CHARACTERS + TRI_CHARACTERS;

    function isUndirectedVertex(c) { return UNDIRECTED_VERTEX_CHARACTERS.indexOf(c) + 1; }
    function isVertex(c)           { return VERTEX_CHARACTERS.indexOf(c) !== -1; }
    function isTopVertex(c)        { return isUndirectedVertex(c) || (c === '.'); }
    function isBottomVertex(c)     { return isUndirectedVertex(c) || (c === "'"); }
    function isVertexOrLeftDecoration(c){ return isVertex(c) || (c === '<') || isPoint(c); }
    function isVertexOrRightDecoration(c){return isVertex(c) || (c === '>') || isPoint(c); }
    function isArrowHead(c)        { return ARROW_HEAD_CHARACTERS.indexOf(c) + 1; }
    function isGray(c)             { return GRAY_CHARACTERS.indexOf(c) + 1; }
    function isTri(c)              { return TRI_CHARACTERS.indexOf(c) + 1; }

    // "D" = Diagonal slash (/), "B" = diagonal Backslash (\)
    // Characters that may appear anywhere on a solid line
    function isSolidHLine(c)       { return (c === '-') || isUndirectedVertex(c) || isJump(c); }
    function isSolidVLineOrJumpOrPoint(c) { return isSolidVLine(c) || isJump(c) || isPoint(c); }
    function isSolidVLine(c)       { return (c === '|') || isUndirectedVertex(c); }
    function isSolidDLine(c)       { return (c === '/') || isUndirectedVertex(c) }
    function isSolidBLine(c)       { return (c === '\\') || isUndirectedVertex(c); }
    function isJump(c)             { return JUMP_CHARACTERS.indexOf(c) + 1; }
    function isPoint(c)            { return POINT_CHARACTERS.indexOf(c) + 1; }
    function isDecoration(c)       { return DECORATION_CHARACTERS.indexOf(c) + 1; }
    function isEmpty(c)            { return c === ' '; }

    ///////////////////////////////////////////////////////////////////////////////
    // Math library

    /** Invoke as new Vec2(v) to clone or new Vec2(x, y) to create from coordinates.
        Can also invoke without new for brevity. */
    function Vec2(x, y) {
        // Detect when being run without new
        if (! (this instanceof Vec2)) { return new Vec2(x, y); }

        if (y === undefined) {
            if (x === undefined) { x = y = 0; }
            else if (x instanceof Vec2) { y = x.y; x = x.x; }
            else { console.error("Vec2 requires one Vec2 or (x, y) as an argument"); }
        }
        this.x = x;
        this.y = y;
        Object.seal(this);
    }

    /** Returns an SVG representation */
    Vec2.prototype.toString = Vec2.prototype.toSVG =
        function () { return '' + (this.x * SCALE) + ',' + (this.y * SCALE * ASPECT) + ' '; };

    /** Converts a "rectangular" string defined by newlines into 2D
        array of characters. Grids are immutable. */
    function makeGrid(str) {
        /** Returns ' ' for out of bounds values */
        var grid = function(x, y) {
            if (y === undefined) {
                if (x instanceof Vec2) { y = x.y; x = x.x; }
                else { console.error('grid requires either a Vec2 or (x, y)'); }
            }

            return ((x >= 0) && (x < grid.width) && (y >= 0) && (y < grid.height)) ?
                str[y * (grid.width + 1) + x] : ' ';
        };

        // Elements are true when consumed
        grid._used   = [];

        grid.height  = str.split('\n').length;
        if (str[str.length - 1] === '\n') { --grid.height; }

        // Convert the string to an array to better handle greater-than 16-bit unicode
        // characters, which JavaScript does not process correctly with indices. Do this after
        // the above string processing.
        str = strToArray(str);
        grid.width = str.indexOf('\n');

        /** Mark this location. Takes a Vec2 or (x, y) */
        grid.setUsed = function (x, y) {
            if (y === undefined) {
                if (x instanceof Vec2) { y = x.y; x = x.x; }
                else { console.error('grid requires either a Vec2 or (x, y)'); }
            }
            if ((x >= 0) && (x < grid.width) && (y >= 0) && (y < grid.height)) {
                // Match the source string indexing
                grid._used[y * (grid.width + 1) + x] = true;
            }
        };

        grid.isUsed = function (x, y) {
            if (y === undefined) {
                if (x instanceof Vec2) { y = x.y; x = x.x; }
                else { console.error('grid requires either a Vec2 or (x, y)'); }
            }
            return (this._used[y * (this.width + 1) + x] === true);
        };

        /** Returns true if there is a solid vertical line passing through (x, y) */
        grid.isSolidVLineAt = function (x, y) {
            if (y === undefined) { y = x.x; x = x.x; }

            var up = grid(x, y - 1);
            var c  = grid(x, y);
            var dn = grid(x, y + 1);

            var uprt = grid(x + 1, y - 1);
            var uplt = grid(x - 1, y - 1);

            if (isSolidVLine(c)) {
                // Looks like a vertical line...does it continue?
                return (isTopVertex(up)    || (up === '^') || isSolidVLine(up) || isJump(up) ||
                        isBottomVertex(dn) || (dn === 'v') || isSolidVLine(dn) || isJump(dn) ||
                        isPoint(up) || isPoint(dn) || (grid(x, y - 1) === '_') || (uplt === '_') ||
                        (uprt === '_') ||

                        // Special case of 1-high vertical on two curved corners
                        ((isTopVertex(uplt) || isTopVertex(uprt)) &&
                         (isBottomVertex(grid(x - 1, y + 1)) || isBottomVertex(grid(x + 1, y + 1)))));

            } else if (isTopVertex(c) || (c === '^')) {
                // May be the top of a vertical line
                return isSolidVLine(dn) || (isJump(dn) && (c !== '.'));
            } else if (isBottomVertex(c) || (c === 'v')) {
                return isSolidVLine(up) || (isJump(up) && (c !== "'"));
            } else if (isPoint(c)) {
                return isSolidVLine(up) || isSolidVLine(dn);
            }

            return false;
        };

        /** Returns true if there is a solid middle (---) horizontal line
            passing through (x, y). Ignores underscores. */
        grid.isSolidHLineAt = function (x, y) {
            if (y === undefined) { y = x.x; x = x.x; }

            var ltlt = grid(x - 2, y);
            var lt   = grid(x - 1, y);
            var c    = grid(x + 0, y);
            var rt   = grid(x + 1, y);
            var rtrt = grid(x + 2, y);

            if (isSolidHLine(c) || (isSolidHLine(lt) && isJump(c))) {
                // Looks like a horizontal line...does it continue? We need three in a row.
                if (isSolidHLine(lt)) {
                    return isSolidHLine(rt) || isVertexOrRightDecoration(rt) ||
                        isSolidHLine(ltlt) || isVertexOrLeftDecoration(ltlt);
                } else if (isVertexOrLeftDecoration(lt)) {
                    return isSolidHLine(rt);
                } else {
                    return isSolidHLine(rt) && (isSolidHLine(rtrt) || isVertexOrRightDecoration(rtrt));
                }

            } else if (c === '<') {
                return isSolidHLine(rt) && isSolidHLine(rtrt)

            } else if (c === '>') {
                return isSolidHLine(lt) && isSolidHLine(ltlt);

            } else if (isVertex(c)) {
                return ((isSolidHLine(lt) && isSolidHLine(ltlt)) ||
                        (isSolidHLine(rt) && isSolidHLine(rtrt)));
            }

            return false;
        };

        /** Returns true if there is a solid backslash line passing through (x, y) */
        grid.isSolidBLineAt = function (x, y) {
            if (y === undefined) { y = x.x; x = x.x; }
            var c = grid(x, y);
            var lt = grid(x - 1, y - 1);
            var rt = grid(x + 1, y + 1);

            if (c === '\\') {
                // Looks like a diagonal line...does it continue? We need two in a row.
                return (isSolidBLine(rt) || isBottomVertex(rt) || isPoint(rt) || (rt === 'v') ||
                        isSolidBLine(lt) || isTopVertex(lt) || isPoint(lt) || (lt === '^') ||
                        (grid(x, y - 1) === '/') || (grid(x, y + 1) === '/') || (rt === '_') || (lt === '_'));
            } else if (c === '.') {
                return (rt === '\\');
            } else if (c === "'") {
                return (lt === '\\');
            } else if (c === '^') {
                return rt === '\\';
            } else if (c === 'v') {
                return lt === '\\';
            } else if (isVertex(c) || isPoint(c) || (c === '|')) {
                return isSolidBLine(lt) || isSolidBLine(rt);
            }
        };

        /** Returns true if there is a solid diagonal line passing through (x, y) */
        grid.isSolidDLineAt = function (x, y) {
            if (y === undefined) { y = x.x; x = x.x; }

            var c = grid(x, y);
            var lt = grid(x - 1, y + 1);
            var rt = grid(x + 1, y - 1);

            if (c === '/' && ((grid(x, y - 1) === '\\') || (grid(x, y + 1) === '\\'))) {
                // Special case of tiny hexagon corner
                return true;
            } else if (isSolidDLine(c)) {
                // Looks like a diagonal line...does it continue? We need two in a row.
                return (isSolidDLine(rt) || isTopVertex(rt) || isPoint(rt) || (rt === '^') || (rt === '_') ||
                        isSolidDLine(lt) || isBottomVertex(lt) || isPoint(lt) || (lt === 'v') || (lt === '_'));
            } else if (c === '.') {
                return (lt === '/');
            } else if (c === "'") {
                return (rt === '/');
            } else if (c === '^') {
                return lt === '/';
            } else if (c === 'v') {
                return rt === '/';
            } else if (isVertex(c) || isPoint(c) || (c === '|')) {
                return isSolidDLine(lt) || isSolidDLine(rt);
            }
            return false;
        };

        grid.toString = function () { return str; };

        return Object.freeze(grid);
    }

    /** A 1D curve. If C is specified, the result is a bezier with
        that as the tangent control point */
    function Path(A, B, C, D, dashed) {
        if (! ((A instanceof Vec2) && (B instanceof Vec2))) {
            console.error('Path constructor requires at least two Vec2s');
        }
        this.A = A;
        this.B = B;
        if (C) {
            this.C = C;
            if (D) {
                this.D = D;
            } else {
                this.D = C;
            }
        }

        this.dashed = dashed || false;

        Object.freeze(this);
    }

    var _ = Path.prototype;
    _.isVertical = function () {
        return this.B.x === this.A.x;
    };

    _.isHorizontal = function () {
        return this.B.y === this.A.y;
    };

    /** Diagonal lines look like: / See also backDiagonal */
    _.isDiagonal = function () {
        var dx = this.B.x - this.A.x;
        var dy = this.B.y - this.A.y;
        return (abs(dy + dx) < EPSILON);
    };

    _.isBackDiagonal = function () {
        var dx = this.B.x - this.A.x;
        var dy = this.B.y - this.A.y;
        return (abs(dy - dx) < EPSILON);
    };

    _.isCurved = function () {
        return this.C !== undefined;
    };

    /** Does this path have any end at (x, y) */
    _.endsAt = function (x, y) {
        if (y === undefined) { y = x.y; x = x.x; }
        return ((this.A.x === x) && (this.A.y === y)) ||
            ((this.B.x === x) && (this.B.y === y));
    };

    /** Does this path have an up end at (x, y) */
    _.upEndsAt = function (x, y) {
        if (y === undefined) { y = x.y; x = x.x; }
        return this.isVertical() && (this.A.x === x) && (min(this.A.y, this.B.y) === y);
    };

    /** Does this path have an up end at (x, y) */
    _.diagonalUpEndsAt = function (x, y) {
        if (! this.isDiagonal()) { return false; }
        if (y === undefined) { y = x.y; x = x.x; }
        if (this.A.y < this.B.y) {
            return (this.A.x === x) && (this.A.y === y);
        } else {
            return (this.B.x === x) && (this.B.y === y);
        }
    };

    /** Does this path have a down end at (x, y) */
    _.diagonalDownEndsAt = function (x, y) {
        if (! this.isDiagonal()) { return false; }
        if (y === undefined) { y = x.y; x = x.x; }
        if (this.B.y < this.A.y) {
            return (this.A.x === x) && (this.A.y === y);
        } else {
            return (this.B.x === x) && (this.B.y === y);
        }
    };

    /** Does this path have an up end at (x, y) */
    _.backDiagonalUpEndsAt = function (x, y) {
        if (! this.isBackDiagonal()) { return false; }
        if (y === undefined) { y = x.y; x = x.x; }
        if (this.A.y < this.B.y) {
            return (this.A.x === x) && (this.A.y === y);
        } else {
            return (this.B.x === x) && (this.B.y === y);
        }
    };

    /** Does this path have a down end at (x, y) */
    _.backDiagonalDownEndsAt = function (x, y) {
        if (! this.isBackDiagonal()) { return false; }
        if (y === undefined) { y = x.y; x = x.x; }
        if (this.B.y < this.A.y) {
            return (this.A.x === x) && (this.A.y === y);
        } else {
            return (this.B.x === x) && (this.B.y === y);
        }
    };

    /** Does this path have a down end at (x, y) */
    _.downEndsAt = function (x, y) {
        if (y === undefined) { y = x.y; x = x.x; }
        return this.isVertical() && (this.A.x === x) && (max(this.A.y, this.B.y) === y);
    };

    /** Does this path have a left end at (x, y) */
    _.leftEndsAt = function (x, y) {
        if (y === undefined) { y = x.y; x = x.x; }
        return this.isHorizontal() && (this.A.y === y) && (min(this.A.x, this.B.x) === x);
    };

    /** Does this path have a right end at (x, y) */
    _.rightEndsAt = function (x, y) {
        if (y === undefined) { y = x.y; x = x.x; }
        return this.isHorizontal() && (this.A.y === y) && (max(this.A.x, this.B.x) === x);
    };

    _.verticalPassesThrough = function (x, y) {
        if (y === undefined) { y = x.y; x = x.x; }
        return this.isVertical() &&
            (this.A.x === x) &&
            (min(this.A.y, this.B.y) <= y) &&
            (max(this.A.y, this.B.y) >= y);
    }

    _.horizontalPassesThrough = function (x, y) {
        if (y === undefined) { y = x.y; x = x.x; }
        return this.isHorizontal() &&
            (this.A.y === y) &&
            (min(this.A.x, this.B.x) <= x) &&
            (max(this.A.x, this.B.x) >= x);
    }

    /** Returns a string suitable for inclusion in an SVG tag */
    _.toSVG = function () {
        var svg = '<path d="M ' + this.A;

        if (this.isCurved()) {
            svg += 'C ' + this.C + this.D + this.B;
        } else {
            svg += 'L ' + this.B;
        }
        svg += '" style="fill:none;"';
        if (this.dashed) {
            svg += ' stroke-dasharray="3,6"';
        }
        svg += '/>';
        return svg;
    };

    /** A group of 1D curves. This was designed so that all of the
        methods can later be implemented in O(1) time, but it
        currently uses O(n) implementations for source code
        simplicity. */
    function PathSet() {
        this._pathArray = [];
    }

    var PS = PathSet.prototype;
    PS.insert = function (path) {
        this._pathArray.push(path);
    };

    /** Returns a new method that returns true if method(x, y)
        returns true on any element of _pathAray */
    function makeFilterAny(method) {
        return function(x, y) {
            for (var i = 0; i < this._pathArray.length; ++i) {
                if (method.call(this._pathArray[i], x, y)) { return true; }
            }
            // Fall through: return undefined == false
        }
    }

    // True if an up line ends at these coordinates. Recall that the
    // variable _ is bound to the Path prototype still.
    PS.upEndsAt                = makeFilterAny(_.upEndsAt);
    PS.diagonalUpEndsAt        = makeFilterAny(_.diagonalUpEndsAt);
    PS.backDiagonalUpEndsAt    = makeFilterAny(_.backDiagonalUpEndsAt);
    PS.diagonalDownEndsAt      = makeFilterAny(_.diagonalDownEndsAt);
    PS.backDiagonalDownEndsAt  = makeFilterAny(_.backDiagonalDownEndsAt);
    PS.downEndsAt              = makeFilterAny(_.downEndsAt);
    PS.leftEndsAt              = makeFilterAny(_.leftEndsAt);
    PS.rightEndsAt             = makeFilterAny(_.rightEndsAt);
    PS.endsAt                  = makeFilterAny(_.endsAt);
    PS.verticalPassesThrough   = makeFilterAny(_.verticalPassesThrough);
    PS.horizontalPassesThrough = makeFilterAny(_.horizontalPassesThrough);

    /** Returns an SVG string */
    PS.toSVG = function () {
        var svg = '';
        for (var i = 0; i < this._pathArray.length; ++i) {
            svg += this._pathArray[i].toSVG() + '\n';
        }
        return svg;
    };

    function DecorationSet() {
        this._decorationArray = [];
    }

    var DS = DecorationSet.prototype;

    /** insert(x, y, type, <angle>)
        insert(vec, type, <angle>)

        angle is the angle in degrees to rotate the result */
    DS.insert = function(x, y, type, angle) {
        if (type === undefined) { type = y; y = x.y; x = x.x; }

        if (! isDecoration(type)) {
            console.error('Illegal decoration character: ' + type);
        }
        var d = {C: Vec2(x, y), type: type, angle:angle || 0};

        // Put arrows at the front and points at the back so that
        // arrows always draw under points

        if (isPoint(type)) {
            this._decorationArray.push(d);
        } else {
            this._decorationArray.unshift(d);
        }
    };

    DS.toSVG = function () {
        var svg = '';
        for (var i = 0; i < this._decorationArray.length; ++i) {
            var decoration = this._decorationArray[i];
            var C = decoration.C;

            if (isJump(decoration.type)) {
                // Slide jumps
                var dx = (decoration.type === ')') ? +0.75 : -0.75;
                var up  = Vec2(C.x, C.y - 0.5);
                var dn  = Vec2(C.x, C.y + 0.5);
                var cup = Vec2(C.x + dx, C.y - 0.5);
                var cdn = Vec2(C.x + dx, C.y + 0.5);

                svg += '<path d="M ' + dn + ' C ' + cdn + cup + up + '" style="fill:none;"/>';

            } else if (isPoint(decoration.type)) {

                svg += '<circle cx="' + (C.x * SCALE) + '" cy="' + (C.y * SCALE * ASPECT) +
                       '" r="' + (SCALE - STROKE_WIDTH) + '" class="' + ((decoration.type === '*') ? 'closed' : 'open') + 'dot"/>';
            } else if (isGray(decoration.type)) {

                var shade = Math.round((3 - GRAY_CHARACTERS.indexOf(decoration.type)) * 63.75);
                svg += '<rect x="' + ((C.x - 0.5) * SCALE) + '" y="' + ((C.y - 0.5) * SCALE * ASPECT) + '" width="' + SCALE + '" height="' + (SCALE * ASPECT) + '" stroke=none fill="rgb(' + shade + ',' + shade + ',' + shade +')"/>';

            } else if (isTri(decoration.type)) {
                // 30-60-90 triangle
                var index = TRI_CHARACTERS.indexOf(decoration.type);
                var xs  = 0.5 - (index & 1);
                var ys  = 0.5 - (index >> 1);
                xs *= sign(ys);
                var tip = Vec2(C.x + xs, C.y - ys);
                var up  = Vec2(C.x + xs, C.y + ys);
                var dn  = Vec2(C.x - xs, C.y + ys);
                svg += '<polygon points="' + tip + up + dn + '" style="stroke:none"/>\n';
            } else { // Arrow head
                var tip = Vec2(C.x + 1, C.y);
                var up =  Vec2(C.x - 0.5, C.y - 0.35);
                var dn =  Vec2(C.x - 0.5, C.y + 0.35);
                svg += '<polygon points="' + tip + up + dn +
                    '"  style="stroke:none" transform="rotate(' + decoration.angle + ',' + C + ')"/>\n';
            }
        }
        return svg;
    };

    ////////////////////////////////////////////////////////////////////////////

    function findPaths(grid, pathSet) {
        // Does the line from A to B contain at least one c?
        function lineContains(A, B, c) {
            var dx = sign(B.x - A.x);
            var dy = sign(B.y - A.y);
            var x, y;

            for (x = A.x, y = A.y; (x !== B.x) || (y !== B.y); x += dx, y += dy) {
                if (grid(x, y) === c) { return true; }
            }

            // Last point
            return (grid(x, y) === c);
        }

        // Find all solid vertical lines. Iterate horizontally
        // so that we never hit the same line twice
        for (var x = 0; x < grid.width; ++x) {
            for (var y = 0; y < grid.height; ++y) {
                if (grid.isSolidVLineAt(x, y)) {
                    // This character begins a vertical line...now, find the end
                    var A = Vec2(x, y);
                    do  { grid.setUsed(x, y); ++y; } while (grid.isSolidVLineAt(x, y));
                    var B = Vec2(x, y - 1);

                    var up = grid(A);
                    var upup = grid(A.x, A.y - 1);

                    if (! isVertex(up) && ((upup === '-') || (upup === '_') || (grid(A.x - 1, A.y - 1) === '_') ||
                                           (grid(A.x + 1, A.y - 1) === '_') ||
                                           isBottomVertex(upup)) || isJump(upup)) {
                        // Stretch up to almost reach the line above (if there is a decoration,
                        // it will finish the gap)
                        A.y -= 0.5;
                    }

                    var dn = grid(B);
                    var dndn = grid(B.x, B.y + 1);
                    if (! isVertex(dn) && ((dndn === '-') || isTopVertex(dndn)) || isJump(dndn) ||
                        (grid(B.x - 1, B.y) === '_') || (grid(B.x + 1, B.y) === '_')) {
                        // Stretch down to almost reach the line below
                        B.y += 0.5;
                    }

                    // Don't insert degenerate lines
                    if ((A.x !== B.x) || (A.y !== B.y)) {
                        pathSet.insert(new Path(A, B));
                    }

                    // Continue the search from the end value y+1
                }

                // Some very special patterns for the short lines needed on
                // circuit diagrams. Only invoke these if not also on a curve
                //      _  _
                //    -'    '-
                else if ((grid(x, y) === "'") &&
                    (((grid(x - 1, y) === '-') && (grid(x + 1, y - 1) === '_') &&
                     ! isSolidVLineOrJumpOrPoint(grid(x - 1, y - 1))) ||
                     ((grid(x - 1, y - 1) === '_') && (grid(x + 1, y) === '-') &&
                     ! isSolidVLineOrJumpOrPoint(grid(x + 1, y - 1))))) {
                    pathSet.insert(new Path(Vec2(x, y - 0.5), Vec2(x, y)));
                }

                //    _.-  -._
                else if ((grid(x, y) === '.') &&
                         (((grid(x - 1, y) === '_') && (grid(x + 1, y) === '-') &&
                           ! isSolidVLineOrJumpOrPoint(grid(x + 1, y + 1))) ||
                          ((grid(x - 1, y) === '-') && (grid(x + 1, y) === '_') &&
                           ! isSolidVLineOrJumpOrPoint(grid(x - 1, y + 1))))) {
                    pathSet.insert(new Path(Vec2(x, y), Vec2(x, y + 0.5)));
                }

            } // y
        } // x

        // Find all solid horizontal lines
        for (var y = 0; y < grid.height; ++y) {
            for (var x = 0; x < grid.width; ++x) {
                if (grid.isSolidHLineAt(x, y)) {
                    // Begins a line...find the end
                    var A = Vec2(x, y);
                    do { grid.setUsed(x, y); ++x; } while (grid.isSolidHLineAt(x, y));
                    var B = Vec2(x - 1, y);

                    // Detect curves and shorten the edge
                    if ( ! isVertex(grid(A.x - 1, A.y)) &&
                         ((isTopVertex(grid(A)) && isSolidVLineOrJumpOrPoint(grid(A.x - 1, A.y + 1))) ||
                          (isBottomVertex(grid(A)) && isSolidVLineOrJumpOrPoint(grid(A.x - 1, A.y - 1))))) {
                        ++A.x;
                    }

                    if ( ! isVertex(grid(B.x + 1, B.y)) &&
                         ((isTopVertex(grid(B)) && isSolidVLineOrJumpOrPoint(grid(B.x + 1, B.y + 1))) ||
                          (isBottomVertex(grid(B)) && isSolidVLineOrJumpOrPoint(grid(B.x + 1, B.y - 1))))) {
                        --B.x;
                    }

                    // Don't insert degenerate lines
                    if ((A.x !== B.x) || (A.y !== B.y)) {
                        pathSet.insert(new Path(A, B));
                    }
                    // Continue the search from the end x+1
                }
            }
        } // y

        // Find all solid left-to-right downward diagonal lines (BACK DIAGONAL)
        for (var i = -grid.height; i < grid.width; ++i) {
            for (var x = i, y = 0; y < grid.height; ++y, ++x) {
                if (grid.isSolidBLineAt(x, y)) {
                    // Begins a line...find the end
                    var A = Vec2(x, y);
                    do { ++x; ++y; } while (grid.isSolidBLineAt(x, y));
                    var B = Vec2(x - 1, y - 1);

                    // Ensure that the entire line wasn't just vertices
                    if (lineContains(A, B, '\\')) {
                        for (var j = A.x; j <= B.x; ++j) {
                            grid.setUsed(j, A.y + (j - A.x));
                        }

                        var top = grid(A);
                        var up = grid(A.x, A.y - 1);
                        var uplt = grid(A.x - 1, A.y - 1);
                        if ((up === '/') || (uplt === '_') || (up === '_') ||
                            (! isVertex(top)  &&
                             (isSolidHLine(uplt) || isSolidVLine(uplt)))) {
                            // Continue half a cell more to connect for:
                            //  ___   ___
                            //  \        \    /      ----     |
                            //   \        \   \        ^      |^
                            A.x -= 0.5; A.y -= 0.5;
                        } else if (isPoint(uplt)) {
                            // Continue 1/4 cell more to connect for:
                            //
                            //  o
                            //   ^
                            //    \
                            A.x -= 0.25; A.y -= 0.25;
                        }

                        var bottom = grid(B);
                        var dnrt = grid(B.x + 1, B.y + 1);
                        if ((grid(B.x, B.y + 1) === '/') || (grid(B.x + 1, B.y) === '_') ||
                            (grid(B.x - 1, B.y) === '_') ||
                            (! isVertex(grid(B)) &&
                             (isSolidHLine(dnrt) || isSolidVLine(dnrt)))) {
                            // Continue half a cell more to connect for:
                            //                       \      \ |
                            //  \       \     \       v      v|
                            //   \__   __\    /      ----     |

                            B.x += 0.5; B.y += 0.5;
                        } else if (isPoint(dnrt)) {
                            // Continue 1/4 cell more to connect for:
                            //
                            //    \
                            //     v
                            //      o

                            B.x += 0.25; B.y += 0.25;
                        }

                        pathSet.insert(new Path(A, B));
                        // Continue the search from the end x+1,y+1
                    } // lineContains
                }
            }
        } // i

        // Find all solid left-to-right upward diagonal lines (DIAGONAL)
        for (var i = -grid.height; i < grid.width; ++i) {
            for (var x = i, y = grid.height - 1; y >= 0; --y, ++x) {
                if (grid.isSolidDLineAt(x, y)) {
                    // Begins a line...find the end
                    var A = Vec2(x, y);
                    do { ++x; --y; } while (grid.isSolidDLineAt(x, y));
                    var B = Vec2(x - 1, y + 1);

                    if (lineContains(A, B, '/')) {
                        // This is definitely a line. Commit the characters on it
                        for (var j = A.x; j <= B.x; ++j) {
                            grid.setUsed(j, A.y - (j - A.x));
                        }

                        var up = grid(B.x, B.y - 1);
                        var uprt = grid(B.x + 1, B.y - 1);
                        var bottom = grid(B);
                        if ((up === '\\') || (up === '_') || (uprt === '_') ||
                            (! isVertex(grid(B)) &&
                             (isSolidHLine(uprt) || isSolidVLine(uprt)))) {

                            // Continue half a cell more to connect at:
                            //     __   __  ---     |
                            //    /      /   ^     ^|
                            //   /      /   /     / |

                            B.x += 0.5; B.y -= 0.5;
                        } else if (isPoint(uprt)) {

                            // Continue 1/4 cell more to connect at:
                            //
                            //       o
                            //      ^
                            //     /

                            B.x += 0.25; B.y -= 0.25;
                        }

                        var dnlt = grid(A.x - 1, A.y + 1);
                        var top = grid(A);
                        if ((grid(A.x, A.y + 1) === '\\') || (grid(A.x - 1, A.y) === '_') || (grid(A.x + 1, A.y) === '_') ||
                            (! isVertex(grid(A)) &&
                             (isSolidHLine(dnlt) || isSolidVLine(dnlt)))) {

                            // Continue half a cell more to connect at:
                            //               /     \ |
                            //    /  /      v       v|
                            // __/  /__   ----       |

                            A.x -= 0.5; A.y += 0.5;
                        } else if (isPoint(dnlt)) {

                            // Continue 1/4 cell more to connect at:
                            //
                            //       /
                            //      v
                            //     o

                            A.x -= 0.25; A.y += 0.25;
                        }
                        pathSet.insert(new Path(A, B));

                        // Continue the search from the end x+1,y-1
                    } // lineContains
                }
            }
        } // y

        // Now look for curved corners. The syntax constraints require
        // that these can always be identified by looking at three
        // horizontally-adjacent characters.
        for (var y = 0; y < grid.height; ++y) {
            for (var x = 0; x < grid.width; ++x) {
                var c = grid(x, y);

                // Note that because of undirected vertices, the
                // following cases are not exclusive
                if (isTopVertex(c)) {
                    // -.
                    //   |
                    if (isSolidHLine(grid(x - 1, y)) && isSolidVLine(grid(x + 1, y + 1))) {
                        grid.setUsed(x - 1, y); grid.setUsed(x, y); grid.setUsed(x + 1, y + 1);
                        pathSet.insert(new Path(Vec2(x - 1, y), Vec2(x + 1, y + 1),
                                                Vec2(x + 1.1, y), Vec2(x + 1, y + 1)));
                    }

                    //  .-
                    // |
                    if (isSolidHLine(grid(x + 1, y)) && isSolidVLine(grid(x - 1, y + 1))) {
                        grid.setUsed(x - 1, y + 1); grid.setUsed(x, y); grid.setUsed(x + 1, y);
                        pathSet.insert(new Path(Vec2(x + 1, y), Vec2(x - 1, y + 1),
                                                Vec2(x - 1.1, y), Vec2(x - 1, y + 1)));
                    }
                }

                // Special case patterns:
                //   .  .   .  .
                //  (  o     )  o
                //   '  .   '  '
                if (((c === ')') || isPoint(c)) && (grid(x - 1, y - 1) === '.') && (grid(x - 1, y + 1) === "\'")) {
                    grid.setUsed(x, y); grid.setUsed(x - 1, y - 1); grid.setUsed(x - 1, y + 1);
                    pathSet.insert(new Path(Vec2(x - 2, y - 1), Vec2(x - 2, y + 1),
                                            Vec2(x + 0.6, y - 1), Vec2(x + 0.6, y + 1)));
                }

                if (((c === '(') || isPoint(c)) && (grid(x + 1, y - 1) === '.') && (grid(x + 1, y + 1) === "\'")) {
                    grid.setUsed(x, y); grid.setUsed(x + 1, y - 1); grid.setUsed(x + 1, y + 1);
                    pathSet.insert(new Path(Vec2(x + 2, y - 1), Vec2(x + 2, y + 1),
                                            Vec2(x - 0.6, y - 1), Vec2(x - 0.6, y + 1)));
                }

                if (isBottomVertex(c)) {
                    //   |
                    // -'
                    if (isSolidHLine(grid(x - 1, y)) && isSolidVLine(grid(x + 1, y - 1))) {
                        grid.setUsed(x - 1, y); grid.setUsed(x, y); grid.setUsed(x + 1, y - 1);
                        pathSet.insert(new Path(Vec2(x - 1, y), Vec2(x + 1, y - 1),
                                                Vec2(x + 1.1, y), Vec2(x + 1, y - 1)));
                    }

                    // |
                    //  '-
                    if (isSolidHLine(grid(x + 1, y)) && isSolidVLine(grid(x - 1, y - 1))) {
                        grid.setUsed(x - 1, y - 1); grid.setUsed(x, y); grid.setUsed(x + 1, y);
                        pathSet.insert(new Path(Vec2(x + 1, y), Vec2(x - 1, y - 1),
                                                Vec2(x - 1.1, y), Vec2(x - 1, y - 1)));
                    }
                }

            } // for x
        } // for y

        // Find low horizontal lines marked with underscores. These
        // are so simple compared to the other cases that we process
        // them directly here without a helper function. Process these
        // from top to bottom and left to right so that we can read
        // them in a single sweep.
        //
        // Exclude the special case of double underscores going right
        // into an ASCII character, which could be a source code
        // identifier such as __FILE__ embedded in the diagram.
        for (var y = 0; y < grid.height; ++y) {
            for (var x = 0; x < grid.width - 2; ++x) {
                var lt = grid(x - 1, y);

                if ((grid(x, y) === '_') && (grid(x + 1, y) === '_') &&
                    (! isASCIILetter(grid(x + 2, y)) || (lt === '_')) &&
                    (! isASCIILetter(lt) || (grid(x + 2, y) === '_'))) {

                    var ltlt = grid(x - 2, y);
                    var A = Vec2(x - 0.5, y + 0.5);

                    if ((lt === '|') || (grid(x - 1, y + 1) === '|') ||
                        (lt === '.') || (grid(x - 1, y + 1) === "'")) {
                        // Extend to meet adjacent vertical
                        A.x -= 0.5;

                        // Very special case of overrunning into the side of a curve,
                        // needed for logic gate diagrams
                        if ((lt === '.') &&
                            ((ltlt === '-') ||
                             (ltlt === '.')) &&
                            (grid(x - 2, y + 1) === '(')) {
                            A.x -= 0.5;
                        }
                    } else if (lt === '/') {
                        A.x -= 1.0;
                    }

                    // Detect overrun of a tight double curve
                    if ((lt === '(') && (ltlt === '(') &&
                        (grid(x, y + 1) === "'") && (grid(x, y - 1) === '.')) {
                        A.x += 0.5;
                    }
                    lt = ltlt = undefined;

                    do { grid.setUsed(x, y); ++x; } while (grid(x, y) === '_');

                    var B = Vec2(x - 0.5, y + 0.5);
                    var c = grid(x, y);
                    var rt = grid(x + 1, y);
                    var dn = grid(x, y + 1);

                    if ((c === '|') || (dn === '|') || (c === '.') || (dn === "'")) {
                        // Extend to meet adjacent vertical
                        B.x += 0.5;

                        // Very special case of overrunning into the side of a curve,
                        // needed for logic gate diagrams
                        if ((c === '.') &&
                            ((rt === '-') || (rt === '.')) &&
                            (grid(x + 1, y + 1) === ')')) {
                            B.x += 0.5;
                        }
                    } else if ((c === '\\')) {
                        B.x += 1.0;
                    }

                    // Detect overrun of a tight double curve
                    if ((c === ')') && (rt === ')') && (grid(x - 1, y + 1) === "'") && (grid(x - 1, y - 1) === '.')) {
                        B.x += -0.5;
                    }

                    pathSet.insert(new Path(A, B));
                }
            } // for x
        } // for y
    } // findPaths

    function findDecorations(grid, pathSet, decorationSet) {
        function isEmptyOrVertex(c) { return (c === ' ') || /[^a-zA-Z0-9]|[ov]/.test(c); }
        function isLetter(c) { var x = c.toUpperCase().charCodeAt(0); return (x > 64) && (x < 91); }

        /** Is the point in the center of these values on a line? Allow points that are vertically
            adjacent but not horizontally--they wouldn't fit anyway, and might be text. */
        function onLine(up, dn, lt, rt) {
            return ((isEmptyOrVertex(dn) || isPoint(dn)) &&
                    (isEmptyOrVertex(up) || isPoint(up)) &&
                    isEmptyOrVertex(rt) &&
                    isEmptyOrVertex(lt));
        }

        for (var x = 0; x < grid.width; ++x) {
            for (var j = 0; j < grid.height; ++j) {
                var c = grid(x, j);
                var y = j;

                if (isJump(c)) {

                    // Ensure that this is really a jump and not a stray character
                    if (pathSet.downEndsAt(x, y - 0.5) &&
                        pathSet.upEndsAt(x, y + 0.5)) {
                        decorationSet.insert(x, y, c);
                        grid.setUsed(x, y);
                    }

                } else if (isPoint(c)) {
                    var up = grid(x, y - 1);
                    var dn = grid(x, y + 1);
                    var lt = grid(x - 1, y);
                    var rt = grid(x + 1, y);
                    var llt = grid(x - 2, y);
                    var rrt = grid(x + 2, y);

                    if (pathSet.rightEndsAt(x - 1, y) ||   // Must be at the end of a line...
                        pathSet.leftEndsAt(x + 1, y) ||    // or completely isolated NSEW
                        pathSet.downEndsAt(x, y - 1) ||
                        pathSet.upEndsAt(x, y + 1) ||

                        pathSet.upEndsAt(x, y) ||    // For points on vertical lines
                        pathSet.downEndsAt(x, y) ||  // that are surrounded by other characters

                        onLine(up, dn, lt, rt)) {

                        decorationSet.insert(x, y, c);
                        grid.setUsed(x, y);
                    }
                } else if (isGray(c)) {
                    decorationSet.insert(x, y, c);
                    grid.setUsed(x, y);
                } else if (isTri(c)) {
                    decorationSet.insert(x, y, c);
                    grid.setUsed(x, y);
                } else { // Arrow heads

                    // If we find one, ensure that it is really an
                    // arrow head and not a stray character by looking
                    // for a connecting line.
                    var dx = 0;
                    if ((c === '>') && (pathSet.rightEndsAt(x, y) ||
                                        pathSet.horizontalPassesThrough(x, y))) {
                        if (isPoint(grid(x + 1, y))) {
                            // Back up if connecting to a point so as to not
                            // overlap it
                            dx = -0.5;
                        }
                        decorationSet.insert(x + dx, y, '>', 0);
                        grid.setUsed(x, y);
                    } else if ((c === '<') && (pathSet.leftEndsAt(x, y) ||
                                               pathSet.horizontalPassesThrough(x, y))) {
                        if (isPoint(grid(x - 1, y))) {
                            // Back up if connecting to a point so as to not
                            // overlap it
                            dx = 0.5;
                        }
                        decorationSet.insert(x + dx, y, '>', 180);
                        grid.setUsed(x, y);
                    } else if (c === '^') {
                        // Because of the aspect ratio, we need to look
                        // in two slots for the end of the previous line
                        if (pathSet.upEndsAt(x, y - 0.5)) {
                            decorationSet.insert(x, y - 0.5, '>', 270);
                            grid.setUsed(x, y);
                        } else if (pathSet.upEndsAt(x, y)) {
                            decorationSet.insert(x, y, '>', 270);
                            grid.setUsed(x, y);
                        } else if (pathSet.diagonalUpEndsAt(x + 0.5, y - 0.5)) {
                            decorationSet.insert(x + 0.5, y - 0.5, '>', 270 + DIAGONAL_ANGLE);
                            grid.setUsed(x, y);
                        } else if (pathSet.diagonalUpEndsAt(x + 0.25, y - 0.25)) {
                            decorationSet.insert(x + 0.25, y - 0.25, '>', 270 + DIAGONAL_ANGLE);
                            grid.setUsed(x, y);
                        } else if (pathSet.diagonalUpEndsAt(x, y)) {
                            decorationSet.insert(x, y, '>', 270 + DIAGONAL_ANGLE);
                            grid.setUsed(x, y);
                        } else if (pathSet.backDiagonalUpEndsAt(x, y)) {
                            decorationSet.insert(x, y, c, 270 - DIAGONAL_ANGLE);
                            grid.setUsed(x, y);
                        } else if (pathSet.backDiagonalUpEndsAt(x - 0.5, y - 0.5)) {
                            decorationSet.insert(x - 0.5, y - 0.5, c, 270 - DIAGONAL_ANGLE);
                            grid.setUsed(x, y);
                        } else if (pathSet.backDiagonalUpEndsAt(x - 0.25, y - 0.25)) {
                            decorationSet.insert(x - 0.25, y - 0.25, c, 270 - DIAGONAL_ANGLE);
                            grid.setUsed(x, y);
                        } else if (pathSet.verticalPassesThrough(x, y)) {
                            // Only try this if all others failed
                            decorationSet.insert(x, y - 0.5, '>', 270);
                            grid.setUsed(x, y);
                        }
                    } else if (c === 'v') {
                        if (pathSet.downEndsAt(x, y + 0.5)) {
                            decorationSet.insert(x, y + 0.5, '>', 90);
                            grid.setUsed(x, y);
                        } else if (pathSet.downEndsAt(x, y)) {
                            decorationSet.insert(x, y, '>', 90);
                            grid.setUsed(x, y);
                        } else if (pathSet.diagonalDownEndsAt(x, y)) {
                            decorationSet.insert(x, y, '>', 90 + DIAGONAL_ANGLE);
                            grid.setUsed(x, y);
                        } else if (pathSet.diagonalDownEndsAt(x - 0.5, y + 0.5)) {
                            decorationSet.insert(x - 0.5, y + 0.5, '>', 90 + DIAGONAL_ANGLE);
                            grid.setUsed(x, y);
                        } else if (pathSet.diagonalDownEndsAt(x - 0.25, y + 0.25)) {
                            decorationSet.insert(x - 0.25, y + 0.25, '>', 90 + DIAGONAL_ANGLE);
                            grid.setUsed(x, y);
                        } else if (pathSet.backDiagonalDownEndsAt(x, y)) {
                            decorationSet.insert(x, y, '>', 90 - DIAGONAL_ANGLE);
                            grid.setUsed(x, y);
                        } else if (pathSet.backDiagonalDownEndsAt(x + 0.5, y + 0.5)) {
                            decorationSet.insert(x + 0.5, y + 0.5, '>', 90 - DIAGONAL_ANGLE);
                            grid.setUsed(x, y);
                        } else if (pathSet.backDiagonalDownEndsAt(x + 0.25, y + 0.25)) {
                            decorationSet.insert(x + 0.25, y + 0.25, '>', 90 - DIAGONAL_ANGLE);
                            grid.setUsed(x, y);
                        } else if (pathSet.verticalPassesThrough(x, y)) {
                            // Only try this if all others failed
                            decorationSet.insert(x, y + 0.5, '>', 90);
                            grid.setUsed(x, y);
                        }
                    } // arrow heads
                } // decoration type
            } // y
        } // x
    } // findArrowHeads

    var grid = makeGrid(diagramString);

    var pathSet = new PathSet();
    var decorationSet = new DecorationSet();

    findPaths(grid, pathSet);
    findDecorations(grid, pathSet, decorationSet);

    var svg = '<svg class="diagram" xmlns="http://www.w3.org/2000/svg" version="1.1" height="' +
        ((grid.height + 1) * SCALE * ASPECT) + '" width="' + ((grid.width + 1) * SCALE) + '"';

    if (alignmentHint === 'floatleft') {
        svg += ' style="float:left;margin:15px 30px 15px 0;"';
    } else if (alignmentHint === 'floatright') {
        svg += ' style="float:right;margin:15px 0 15px 30px;"';
    } else if (alignmentHint === 'center') {
        svg += ' style="margin:0 auto 0 auto;"';
    }

    svg += '><g transform="translate(' + Vec2(1, 1) + ')">\n';

    if (DEBUG_SHOW_GRID) {
        svg += '<g style="opacity:0.1">\n';
        for (var x = 0; x < grid.width; ++x) {
            for (var y = 0; y < grid.height; ++y) {
                svg += '<rect x="' + ((x - 0.5) * SCALE + 1) + '" + y="' + ((y - 0.5) * SCALE * ASPECT + 2) + '" width="' + (SCALE - 2) + '" height="' + (SCALE * ASPECT - 2) + '" style="fill:';
                if (grid.isUsed(x, y)) {
                    svg += 'red;';
                } else if (grid(x, y) === ' ') {
                    svg += 'gray;opacity:0.05';
                } else {
                    svg += 'blue;';
                }
                svg += '"/>\n';
            }
        }
        svg += '</g>\n';
    }

    svg += pathSet.toSVG();
    svg += decorationSet.toSVG();

    // Convert any remaining characters
    if (! DEBUG_HIDE_PASSTHROUGH) {
        svg += '<g transform="translate(0,0)">';
        for (var y = 0; y < grid.height; ++y) {
            for (var x = 0; x < grid.width; ++x) {
                var c = grid(x, y);
                if (/[\u2B22\u2B21]/.test(c)) {
                    // Enlarge hexagons so that they fill a grid
                    svg += '<text text-anchor="middle" x="' + (x * SCALE) + '" y="' + (4 + y * SCALE * ASPECT) + '" style="font-size:20.5px">' + escapeHTMLEntities(c) +  '</text>';
                } else if ((c !== ' ') && ! grid.isUsed(x, y)) {
                    svg += '<text text-anchor="middle" x="' + (x * SCALE) + '" y="' + (4 + y * SCALE * ASPECT) + '">' + escapeHTMLEntities(c) +  '</text>';
                } // if
            } // y
        } // x
        svg += '</g>';
    }

    if (DEBUG_SHOW_SOURCE) {
        // Offset the characters a little for easier viewing
        svg += '<g transform="translate(2,2)">\n';
        for (var x = 0; x < grid.width; ++x) {
            for (var y = 0; y < grid.height; ++y) {
                var c = grid(x, y);
                if (c !== ' ') {
                    svg += '<text text-anchor="middle" x="' + (x * SCALE) + '" y="' + (4 + y * SCALE * ASPECT) + '" style="fill:#F00;font-family:Menlo,monospace;font-size:12px;text-align:center">' + escapeHTMLEntities(c) +  '</text>';
                } // if
            } // y
        } // x
        svg += '</g>';
    } // if

    svg += '</g></svg>';

    svg = svg.rp(new RegExp(HIDE_O, 'g'), 'o');

    return svg;
}

/* xcode.min.js modified */
var HIGHLIGHT_STYLESHEET =
        "<style>.hljs{display:block;overflow-x:auto;padding:0.5em;background:#fff;color:#000;-webkit-text-size-adjust:none}"+
        ".hljs-comment{color:#006a00}" +
        ".hljs-keyword{color:#02E}" +
        ".hljs-literal,.nginx .hljs-title{color:#aa0d91}" +
        ".method,.hljs-list .hljs-title,.hljs-tag .hljs-title,.setting .hljs-value,.hljs-winutils,.tex .hljs-command,.http .hljs-title,.hljs-request,.hljs-status,.hljs-name{color:#008}" +
        ".hljs-envvar,.tex .hljs-special{color:#660}" +
        ".hljs-string{color:#c41a16}" +
        ".hljs-tag .hljs-value,.hljs-cdata,.hljs-filter .hljs-argument,.hljs-attr_selector,.apache .hljs-cbracket,.hljs-date,.hljs-regexp{color:#080}" +
        ".hljs-sub .hljs-identifier,.hljs-pi,.hljs-tag,.hljs-tag .hljs-keyword,.hljs-decorator,.ini .hljs-title,.hljs-shebang,.hljs-prompt,.hljs-hexcolor,.hljs-rule .hljs-value,.hljs-symbol,.hljs-symbol .hljs-string,.hljs-number,.css .hljs-function,.hljs-function .hljs-title,.coffeescript .hljs-attribute{color:#A0C}" +
        ".hljs-function .hljs-title{font-weight:bold;color:#000}" +
        ".hljs-class .hljs-title,.smalltalk .hljs-class,.hljs-type,.hljs-typename,.hljs-tag .hljs-attribute,.hljs-doctype,.hljs-class .hljs-id,.hljs-built_in,.setting,.hljs-params,.clojure .hljs-attribute{color:#5c2699}" +
        ".hljs-variable{color:#3f6e74}" +
        ".css .hljs-tag,.hljs-rule .hljs-property,.hljs-pseudo,.hljs-subst{color:#000}" +
        ".css .hljs-class,.css .hljs-id{color:#9b703f}" +
        ".hljs-value .hljs-important{color:#ff7700;font-weight:bold}" +
        ".hljs-rule .hljs-keyword{color:#c5af75}" +
        ".hljs-annotation,.apache .hljs-sqbracket,.nginx .hljs-built_in{color:#9b859d}" +
        ".hljs-preprocessor,.hljs-preprocessor *,.hljs-pragma{color:#643820}" +
        ".tex .hljs-formula{background-color:#eee;font-style:italic}" +
        ".diff .hljs-header,.hljs-chunk{color:#808080;font-weight:bold}" +
        ".diff .hljs-change{background-color:#bccff9}" +
        ".hljs-addition{background-color:#baeeba}" +
        ".hljs-deletion{background-color:#ffc8bd}" +
        ".hljs-comment .hljs-doctag{font-weight:bold}" +
        ".method .hljs-id{color:#000}</style>";

function isMarkdeepScriptName(str) { return str.search(/markdeep\S*?\.js$/i) !== -1; }
function toArray(list) { return Array.prototype.slice.call(list); }

// Intentionally uninitialized global variable used to detect
// recursive invocations
if (! window.alreadyProcessedMarkdeep) {
    window.alreadyProcessedMarkdeep = true;

    // Detect the noformat argument to the URL
    var noformat = (window.location.href.search(/\?.*noformat.*/i) !== -1);

    // Export relevant methods
    window.markdeep = Object.freeze({
        format:               markdeepToHTML,
        formatDiagram:        diagramToSVG,
        stylesheet:           function() {
            return STYLESHEET + sectionNumberingStylesheet() + HIGHLIGHT_STYLESHEET;
        }
    });

    var MATHJAX_CONFIG ='<script type="text/x-mathjax-config">MathJax.Hub.Config({ TeX: { equationNumbers: {autoNumber: "AMS"} } });</script>' +
        '<span style="display:none">' +
        // Custom definitions (NC == \newcommand)
        '$$NC{\\n}{\\hat{n}}NC{\\thetai}{\\theta_\\mathrm{i}}NC{\\thetao}{\\theta_\\mathrm{o}}NC{\\d}[1]{\\mathrm{d}#1}NC{\\w}{\\hat{\\omega}}NC{\\wi}{\\w_\\mathrm{i}}NC{\\wo}{\\w_\\mathrm{o}}NC{\\wh}{\\w_\\mathrm{h}}NC{\\Li}{L_\\mathrm{i}}NC{\\Lo}{L_\\mathrm{o}}NC{\\Le}{L_\\mathrm{e}}NC{\\Lr}{L_\\mathrm{r}}NC{\\Lt}{L_\\mathrm{t}}NC{\\O}{\\mathrm{O}}NC{\\degrees}{{^{\\large\\circ}}}NC{\\T}{\\mathsf{T}}NC{\\mathset}[1]{\\mathbb{#1}}NC{\\Real}{\\mathset{R}}NC{\\Integer}{\\mathset{Z}}NC{\\Boolean}{\\mathset{B}}NC{\\Complex}{\\mathset{C}}NC{\\un}[1]{\\,\\mathrm{#1}}$$\n'.rp(/NC/g, '\\newcommand') +
        '</span>\n'
    var MATHJAX_URL = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML'

    function loadMathJax() {
        // Dynamically load mathjax
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = MATHJAX_URL;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    function needsMathJax(html) {
        // Need MathJax if $$ ... $$, \( ... \), or \begin{
        return option('detectMath') &&
            ((html.search(/(?:\$\$[\s\S]+\$\$)|(?:\\begin{)/m) !== -1) ||
             (html.search(/\\\(.*\\\)/) !== -1));
    }

    var mode = option('mode');
    switch (mode) {
    case 'script':
        // Nothing to do
        return;

    case 'html':
    case 'doxygen':
        toArray(document.getElementsByClassName('diagram')).concat(toArray(document.getElementsByTagName('diagram'))).forEach(
            function (element) {
                var src = unescapeHTMLEntities(element.innerHTML);
                // Remove the first and last string (which probably
                // had the pre or diagram tag as part of them) if they are
                // empty except for whitespace.
                src = src.rp(/(:?^[ \t]*\n)|(:?\n[ \t]*)$/g, '');

                if (mode === 'doxygen') {
                    // Undo Doxygen's &ndash and &mdash, which are impossible to
                    // detect once the browser has parsed the document
                    src = src.rp(new RegExp('\u2013', 'g'), '--');
                    src = src.rp(new RegExp('\u2014', 'g'), '---');

                    // Undo Doxygen's links within the diagram because they throw off spacing
                    src = src.rp(/<a class="el" .*>(.*)<\/a>/g, '$1');
                }
                element.outerHTML = '<center class="md">' + diagramToSVG(removeLeadingSpace(src), '') + '</center>';
            });

        var anyNeedsMathJax = false;
        toArray(document.getElementsByClassName('markdeep')).concat(toArray(document.getElementsByTagName('markdeep'))).forEach(
            function (src) {
                var dst = document.createElement('div');
                var html = markdeepToHTML(removeLeadingSpace(unescapeHTMLEntities(src.innerHTML)), true);
                anyNeedsMathJax = anyNeedsMathJax || needsMathJax(html);
                dst.innerHTML = html;
                src.parentNode.replaceChild(dst, src);
            });

        // Include our stylesheet even if there are no MARKDEEP tags, but do not include the BODY_STYLESHEET.
        document.head.innerHTML = window.markdeep.stylesheet() + document.head.innerHTML + (anyNeedsMathJax ? MATHJAX_CONFIG : '');
        loadMathJax();
        return;
    }

    // The following is Morgan's massive hack for allowing browsers to
    // directly parse Markdown from what appears to be a text file, but is
    // actually an intentionally malformed HTML file.

    // In order to be able to show what source files look like, the
    // noformat argument may be supplied.

    if (! noformat) {
        // Remove any recursive references to this script so that we don't trigger the cost of
        // recursive *loading*. (The alreadyProcessedMarkdeep variable will prevent recursive
        // *execution*.) We allow other scripts to pass through.
        toArray(document.getElementsByTagName('script')).forEach(function(node) {
            if (isMarkdeepScriptName(node.src)) {
                node.parentNode.removeChild(node);
            }
        });

        // Hide the body while formatting
        document.body.style.visibility = 'hidden';
    }

    var source = nodeToMarkdeepSource(document.body);

    if (noformat) {
        // Abort processing.
        source = source.rp(/<!-- Markdeep:.+$/gm, '') + MARKDEEP_LINE;

        // Escape the <> (not ampersand) that we just added
        source = source.rp(/</g, '&lt;').rp(/>/g, '&gt;');

        // Replace the Markdeep line itself so that ?noformat examples have a valid line to copy
        document.body.innerHTML = entag('pre', source);

        var fallbackNodes = document.getElementsByClassName('fallback');
        for (var i = 0; i < fallbackNodes.length; ++i) {
            fallbackNodes[i].remove();
        }

        return;
    }

    var markdeepProcessor = function() {
        // Recompute the source text from the current version of the document
        var source = nodeToMarkdeepSource(document.body);
        var markdeepHTML = markdeepToHTML(source, false);

        // console.log(markdeepHTML); // Final processed source

        var needMathJax = needsMathJax(markdeepHTML);
        if (needMathJax) {
            markdeepHTML = MATHJAX_CONFIG + markdeepHTML;
        }

        markdeepHTML += MARKDEEP_FOOTER;

        // Replace the document. If using MathJax, include the custom Markdeep definitions
        var longDocument = source.length > 1000;
        var head = BODY_STYLESHEET + STYLESHEET + sectionNumberingStylesheet() + HIGHLIGHT_STYLESHEET;
        if (longDocument) {
            // Add more spacing before the title in a long document
            head += entag('style', 'div.title { padding-top: 40px; } div.afterTitles { height: 15px; }');
        }

        if (window.location.href.search(/\?.*export.*/i) !== -1) {
            // Export mode
            var text = '<meta charset="UTF-8"><meta http-equiv="content-type" content="text/html;charset=UTF-8">' + head + document.head.innerHTML + markdeepHTML;
            if (needMathJax) {
                // Dynamically load mathjax
                text += '<script src="' + MATHJAX_URL +'"></script>';
            }
            document.body.innerHTML = entag('pre', escapeHTMLEntities(text));
        } else {
            document.head.innerHTML = '<meta charset="UTF-8"><meta http-equiv="content-type" content="text/html;charset=UTF-8">' + head + document.head.innerHTML;
            document.body.innerHTML = markdeepHTML;
            if (needMathJax) { loadMathJax(); }
        }

        document.body.style.visibility = 'visible';

        var hashIndex = window.location.href.indexOf('#');
        if (hashIndex > -1) {
            // Scroll to the target; needed when loading is too fast (ironically)
            setTimeout(function () {
                var anchor = document.getElementsByName(window.location.href.substring(hashIndex + 1));
                if (anchor.length > 0) { anchor[0].scrollIntoView(); }
                if (window.markdeepOptions) (window.markdeepOptions.onLoad || Math.cos)();
            }, 100);
        } else if (window.markdeepOptions && window.markdeepOptions.onLoad) {
            // Wait for the DOM to update
            setTimeout(window.markdeepOptions.onLoad, 100);
        }

    };

    ///////////// INSERT command processing
    // Helper function for use by children
    function sendContentsToMyParent() {
        // console.log(location.pathname + " sent message to parent");
        // Send the document contents after the childFrame replaced itself
        // (not the source variable captured when this function was defined!)
        parent.postMessage(myID + '=' + document.body.innerHTML, '*');
    }

    // Strip the filename from the url, if there is one (and it is a string)
    function removeFilename(url) {
        return url && url.ss(0, url.lastIndexOf('/') + 1);
    }

    var myURLParse = /([^?]+)(?:\?id=(inc\d+)&p=([^&]+))?/.exec(location.href);

    var myBase = removeFilename(myURLParse[1]);
    var myID = myURLParse[2];
    var parentBase = removeFilename(myURLParse[3] && decodeURIComponent(myURLParse[3]));
    var childFrameStyle = 'display:none';
    var includeCounter = 0;
    var IAmAChild = myID; // !== undefined
    var IAmAParent = false;
    var numIncludeChildrenLeft = 0;

    var messageCallback = function (event) {
        // Parse the message. Ensure that it is for the Markdeep/include.js system.
        var childID = false;
        var childBody = event.data.substring && event.data.replace(/^(inc\d+)=/, function (match, a) {
            childID = a;
            return '';
        });

        if (childID) {
            // This message event was for the Markdeep/include.js system

            //console.log(location.href + ' received a message from child ' + childID);

            // Replace the corresponding node's contents
            var childFrame = document.getElementById(childID);
            childFrame.outerHTML = '\n' + childBody + '\n';

            --numIncludeChildrenLeft;

            //console.log(window.location.pathname, 'numIncludeChildrenLeft = ' + numIncludeChildrenLeft);

            if (numIncludeChildrenLeft <= 0) {
                if (IAmAChild) {
                    //console.log("Intermediate node " + location.pathname + " sending to parent");
                    sendContentsToMyParent();
                } else {
                    // The entire document is complete, so run the markdeep processor
                    // as soon as the document has recovered from our replacements
                    setTimeout(markdeepProcessor, 1);
                }
            }
        }
    };

    source = source.rp(/(?:^|\s)\(insert[ \t]+(\S+\.\S*)[ \t]+here\)\s/g, function(match, src) {
        if (numIncludeChildrenLeft === 0) {
            // This is the first child observed. Prepare to receive messages from the
            // embedded children.
            IAmAParent = true;
            addEventListener("message", messageCallback);
        }

        ++numIncludeChildrenLeft;
        //console.log(window.location.pathname, 'numIncludeChildrenLeft = ' + numIncludeChildrenLeft);

        // Replace this tag with a frame that loads the document.  Once loaded, it will
        // send a message with its contents for use as a replacement.
        var childID = 'inc' + (++includeCounter);
        return '<iframe src="' + src + '?id=' + childID + '&p=' + encodeURIComponent(myBase) +
            '" id="' + childID + '" style="' + childFrameStyle + '" content="text/html;charset=UTF-8"></iframe>';
    });

    // console.log("after insert: "+ source);

    if (IAmAParent) {
        // I'm waiting on children, so don't run the full processor yet,
        // but do substitute the iframe code so that it can launch.
        document.body.innerHTML = source;
    } else if (IAmAChild) {
        // I'm a child and not a parent, so trigger the send now
        // console.log("Leaf node " + location.pathname + " sending to parent");
        sendContentsToMyParent();
    } else {
        // No includes. Run markdeep processing after the rest of this file parses
        // console.log("non-parent, non-child Parent scheduling markdeepProcessor");
        setTimeout(markdeepProcessor, 1);
    }
}

})();
