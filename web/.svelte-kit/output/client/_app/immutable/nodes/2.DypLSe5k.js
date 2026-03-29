import{w as Ne,z as rt,G as Ke,bl as Lt,q as Dt,E as Tt,B as Vt,L as Ht,N as Et,C as Bt,bm as Ot,y as It,T as Ft,W as ht,x as Xe,A as Zt,b1 as qt,bn as Wt,D as gt,bo as ft,aD as Re,bp as Rt,b as st,au as Ut,p as Ae,X as N,m as p,s as b,Y as q,g as d,n as f,t as S,j as c,k as Se,ax as fe,a1 as A,o as L,l as w,bq as it,br as u,e as Ue,ay as $,i,bs as jt,bt as h,b9 as Ze,b8 as he,bu as Ee,aj as V,bv as we,az as je,a as Gt,Z as Yt,a0 as Jt}from"../chunks/BwFKXdka.js";import{b as oe,e as Ie,s as Me,c as Fe,a as qe,f as pt,g as Ve,d as Kt}from"../chunks/BqrTOiUk.js";import{c as Nt}from"../chunks/CLJRjzbj.js";import{i as Xt}from"../chunks/CTSx9P0x.js";import"../chunks/BhCvGAEV.js";function v(a,e,n,r,s){var o;Ne&&rt();var l=(o=e.$$slots)==null?void 0:o[n],t=!1;l===!0&&(l=e.children,t=!0),l===void 0||l(a,t?()=>r:r)}function Qt(a,e,n,r,s,l){let t=Ne;Ne&&rt();var o=null;Ne&&Ke.nodeType===Lt&&(o=Ke,rt());var m=Ne?Ke:a,_=new Vt(m,!1);Dt(()=>{const M=e()||null;var y=Et;if(M===null){_.ensure(null,null);return}return _.ensure(M,x=>{if(M){if(o=Ne?o:Ht(M,y),Bt(o,o),r){Ne&&Ot(M)&&o.append(document.createComment(""));var P=Ne?It(o):o.appendChild(Ft());Ne&&(P===null?ht(!1):Xe(P)),r(o,P)}Zt.nodes.end=o,x.before(o)}Ne&&Xe(x)}),()=>{}},Tt),qt(()=>{}),t&&(ht(!0),Xe(m))}function He(a,e,n=e){var r=new WeakSet;Wt(a,"input",async s=>{gt&&a.type==="checkbox"&&ft();var l=s?a.defaultValue:a.value;if(l=Qe(a)?et(l):l,n(l),Re!==null&&r.add(Re),await Rt(),l!==(l=e())){var t=a.selectionStart,o=a.selectionEnd,m=a.value.length;if(a.value=l??"",o!==null){var _=a.value.length;t===o&&o===m&&_>m?(a.selectionStart=_,a.selectionEnd=_):(a.selectionStart=t,a.selectionEnd=Math.min(o,_))}}}),(Ne&&a.defaultValue!==a.value||st(e)==null&&a.value)&&(n(Qe(a)?et(a.value):a.value),Re!==null&&r.add(Re)),Ut(()=>{gt&&a.type==="checkbox"&&ft();var s=e();if(a===document.activeElement){var l=Re;if(r.has(l))return}Qe(a)&&s===et(a.value)||a.type==="date"&&!s&&!a.value||s!==a.value&&(a.value=s??"")})}function Qe(a){var e=a.type;return e==="number"||e==="range"}function et(a){return a===""?null:+a}var ea=it('<path fill="none" stroke-linecap="round" opacity="0.2" class="arc-glow svelte-1emoo3r"></path>'),ta=it('<g class="arc-group svelte-1emoo3r"><path fill="none" stroke-linecap="round"></path><!></g>'),aa=w('<span class="ring-text svelte-1emoo3r"> </span>'),na=w('<span class="ring-subtext svelte-1emoo3r"> </span>'),oa=w('<div role="img"><svg class="ring-svg svelte-1emoo3r"><circle fill="none" stroke="var(--c-surface-container)" class="svelte-1emoo3r"></circle><!></svg> <div class="ring-center svelte-1emoo3r"><!> <!></div></div>');function ra(a,e){Ae(e,!0);let n=N(e,"segments",19,()=>[]),r=N(e,"currentIndex",3,0),s=N(e,"centerText",3,""),l=N(e,"centerSubtext",3,""),t=N(e,"size",3,120),o=N(e,"class",3,""),m=fe(!1);const _=12,M=(t()-_)/2;function y(F,T,R,te){const de=(te-90)*Math.PI/180;return{x:F+R*Math.cos(de),y:T+R*Math.sin(de)}}function x(F,T,R,te,de){const ze=y(F,T,R,de),Ce=y(F,T,R,te),me=de-te<=180?0:1;return`M ${ze.x} ${ze.y} A ${R} ${R} 0 ${me} 0 ${Ce.x} ${Ce.y}`}const P=A(()=>n().length),z=A(()=>360/d(P)),C=A(()=>n().map((F,T)=>{const R=T*d(z),te=R+d(z)-2;return{...F,path:x(t()/2,t()/2,M,R,te),isCurrent:T===r()}}));var D=oa(),I=p(D),J=p(I);oe(J,"stroke-width",_);var ie=b(J);Ie(ie,17,()=>d(C),Fe,(F,T)=>{var R=ta(),te=p(R);let de;var ze=b(te);{var Ce=me=>{var ae=ea();oe(ae,"stroke-width",_+8),S(()=>{oe(ae,"d",d(T).path),oe(ae,"stroke",d(T).color)}),c(me,ae)};q(ze,me=>{d(T).isCurrent&&!d(m)&&me(Ce)})}f(R),S(()=>{oe(te,"d",d(T).path),oe(te,"stroke",d(T).color),oe(te,"stroke-width",d(T).isCurrent&&!d(m)?_+4:_),de=Me(te,0,"arc svelte-1emoo3r",null,de,{"arc--active":d(T).isCurrent})}),c(F,R)}),f(I);var xe=b(I,2),W=p(xe);{var ee=F=>{var T=aa(),R=p(T,!0);f(T),S(()=>L(R,s())),c(F,T)};q(W,F=>{s()&&F(ee)})}var Pe=b(W,2);{var We=F=>{var T=na(),R=p(T,!0);f(T),S(()=>L(R,l())),c(F,T)};q(Pe,F=>{l()&&F(We)})}f(xe),f(D),S(()=>{Me(D,1,`segmented-ring ${o()??""}`,"svelte-1emoo3r"),qe(D,`--ring-size: ${t()??""}px`),oe(D,"aria-label",s()||"Progress ring"),oe(I,"width",t()),oe(I,"height",t()),oe(I,"viewBox",`0 0 ${t()??""} ${t()??""}`),oe(J,"cx",t()/2),oe(J,"cy",t()/2),oe(J,"r",M)}),c(a,D),Se()}function sa(a,e){let n=N(e,"segments",3,28),r=N(e,"currentSegment",3,1),s=N(e,"phase",3,"follicular");N(e,"dayOfPhase",3,1);let l=N(e,"centerText",3,""),t=N(e,"centerSubtext",3,"");const o={menstrual:"#D4737A",follicular:"#E5A855",ovulation:"#5BA876",luteal:"#6B7FC4"},m=A(()=>o[s()]||o.follicular),_=A(()=>M=>M<r()?d(m):M===r()?d(m):"#E8E0F0");ra(a,{get segments(){return n()},get currentSegment(){return r()},get segmentColor(){return d(_)},get glowColor(){return d(m)},get centerText(){return l()},get centerSubtext(){return t()}})}/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 */const la={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var ca=it("<svg><!><!></svg>");function g(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]),r=u(n,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);Ae(e,!1);let s=N(e,"name",8,void 0),l=N(e,"color",8,"currentColor"),t=N(e,"size",8,24),o=N(e,"strokeWidth",8,2),m=N(e,"absoluteStrokeWidth",8,!1),_=N(e,"iconNode",24,()=>[]);const M=(...z)=>z.filter((C,D,I)=>!!C&&I.indexOf(C)===D).join(" ");Xt();var y=ca();pt(y,(z,C)=>({...la,...r,width:t(),height:t(),stroke:l(),"stroke-width":z,class:C}),[()=>(Ue(m()),Ue(o()),Ue(t()),st(()=>m()?Number(o())*24/Number(t()):o())),()=>(Ue(s()),Ue(n),st(()=>M("lucide-icon","lucide",s()?`lucide-${s()}`:"",n.class)))]);var x=p(y);Ie(x,1,_,Fe,(z,C)=>{var D=A(()=>jt(d(C),2));let I=()=>d(D)[0],J=()=>d(D)[1];var ie=$(),xe=i(ie);Qt(xe,I,!0,(W,ee)=>{pt(W,()=>({...J()}))}),c(z,ie)});var P=b(x);v(P,e,"default",{}),f(y),c(a,y),Se()}function ia(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]];g(a,h({name:"activity"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function da(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M8 3 4 7l4 4"}],["path",{d:"M4 7h16"}],["path",{d:"m16 21 4-4-4-4"}],["path",{d:"M20 17H4"}]];g(a,h({name:"arrow-left-right"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function $a(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];g(a,h({name:"arrow-left"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function ua(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];g(a,h({name:"arrow-right"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function va(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{cx:"12",cy:"8",r:"6"}]];g(a,h({name:"award"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function ha(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M9 12h.01"}],["path",{d:"M15 12h.01"}],["path",{d:"M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"}],["path",{d:"M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"}]];g(a,h({name:"baby"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function ga(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"}]];g(a,h({name:"bell"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function fa(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"m17 17-5 5V12l-5 5"}],["path",{d:"m2 2 20 20"}],["path",{d:"M14.5 9.5 17 7l-5-5v4.5"}]];g(a,h({name:"bluetooth-off"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function pa(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"m7 7 10 10-5 5V2l5 5L7 17"}]];g(a,h({name:"bluetooth"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function ma(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M12 7v14"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}]];g(a,h({name:"book-open"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function _a(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"}],["path",{d:"m9 10 2 2 4-4"}]];g(a,h({name:"bookmark-check"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function ya(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"}]];g(a,h({name:"bookmark"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Ge(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"}],["path",{d:"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"}],["path",{d:"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18"}]];g(a,h({name:"brain"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function ba(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2"}]];g(a,h({name:"briefcase"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Na(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"m9 16 2 2 4-4"}]];g(a,h({name:"calendar-check"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Ma(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"}],["path",{d:"M16 2v4"}],["path",{d:"M8 2v4"}],["path",{d:"M3 10h5"}],["path",{d:"M17.5 17.5 16 16.3V14"}],["circle",{cx:"16",cy:"16",r:"6"}]];g(a,h({name:"calendar-clock"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function xa(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}]];g(a,h({name:"calendar"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function za(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"}],["circle",{cx:"12",cy:"13",r:"3"}]];g(a,h({name:"camera"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Pa(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]];g(a,h({name:"chart-column"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function ka(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M20 6 9 17l-5-5"}]];g(a,h({name:"check"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function wa(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"m6 9 6 6 6-6"}]];g(a,h({name:"chevron-down"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Aa(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"m15 18-6-6 6-6"}]];g(a,h({name:"chevron-left"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Sa(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"m9 18 6-6-6-6"}]];g(a,h({name:"chevron-right"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Ca(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"m18 15-6-6-6 6"}]];g(a,h({name:"chevron-up"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function La(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];g(a,h({name:"circle-alert"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Da(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];g(a,h({name:"circle-check"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Ta(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]];g(a,h({name:"circle-help"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Va(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]];g(a,h({name:"circle-plus"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Ha(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]];g(a,h({name:"circle-x"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Ea(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}]];g(a,h({name:"circle"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function mt(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"M12 11h4"}],["path",{d:"M12 16h4"}],["path",{d:"M8 11h.01"}],["path",{d:"M8 16h.01"}]];g(a,h({name:"clipboard-list"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Ba(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M10 2v2"}],["path",{d:"M14 2v2"}],["path",{d:"M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"}],["path",{d:"M6 2v2"}]];g(a,h({name:"coffee"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Oa(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"}],["circle",{cx:"12",cy:"12",r:"10"}]];g(a,h({name:"compass"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Ia(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M16 2v2"}],["path",{d:"M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"}],["path",{d:"M8 2v2"}],["circle",{cx:"12",cy:"11",r:"3"}],["rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}]];g(a,h({name:"contact"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Fa(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];g(a,h({name:"copy"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Za(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z"}]];g(a,h({name:"cross"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function qa(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5v14a9 3 0 0 0 18 0V5"}]];g(a,h({name:"cylinder"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Wa(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5"}],["path",{d:"M3 12A9 3 0 0 0 21 12"}]];g(a,h({name:"database"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Ra(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["polyline",{points:"7 10 12 15 17 10"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3"}]];g(a,h({name:"download"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Ua(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"}]];g(a,h({name:"droplet"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function lt(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"}]];g(a,h({name:"droplets"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function ja(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];g(a,h({name:"eye-off"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Ga(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];g(a,h({name:"eye"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Ya(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 9H8"}],["path",{d:"M16 13H8"}],["path",{d:"M16 17H8"}]];g(a,h({name:"file-text"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Ja(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}],["line",{x1:"4",x2:"4",y1:"22",y2:"15"}]];g(a,h({name:"flag"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Ka(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"}]];g(a,h({name:"flame"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Xa(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"}],["path",{d:"M6.453 15h11.094"}],["path",{d:"M8.5 2h7"}]];g(a,h({name:"flask-conical"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Qa(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"}]];g(a,h({name:"funnel"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function en(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1"}],["path",{d:"M12 8v13"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"}]];g(a,h({name:"gift"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function tn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]];g(a,h({name:"globe"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function an(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["circle",{cx:"9",cy:"12",r:"1"}],["circle",{cx:"9",cy:"5",r:"1"}],["circle",{cx:"9",cy:"19",r:"1"}],["circle",{cx:"15",cy:"12",r:"1"}],["circle",{cx:"15",cy:"5",r:"1"}],["circle",{cx:"15",cy:"19",r:"1"}]];g(a,h({name:"grip-vertical"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function nn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"}],["path",{d:"M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"}],["path",{d:"M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"}],["path",{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"}]];g(a,h({name:"hand"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function on(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}],["path",{d:"M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"}]];g(a,h({name:"heart-pulse"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function ct(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}]];g(a,h({name:"heart"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function rn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M12 6v4"}],["path",{d:"M14 14h-4"}],["path",{d:"M14 18h-4"}],["path",{d:"M14 8h-4"}],["path",{d:"M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"}],["path",{d:"M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"}]];g(a,h({name:"hospital"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function sn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}]];g(a,h({name:"house"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function ln(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["circle",{cx:"9",cy:"9",r:"2"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}]];g(a,h({name:"image"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function cn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];g(a,h({name:"info"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function dn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M10 8h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M14 8h.01"}],["path",{d:"M16 12h.01"}],["path",{d:"M18 8h.01"}],["path",{d:"M6 8h.01"}],["path",{d:"M7 16h10"}],["path",{d:"M8 12h.01"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}]];g(a,h({name:"keyboard"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function $n(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"}],["path",{d:"M9 18h6"}],["path",{d:"M10 22h4"}]];g(a,h({name:"lightbulb"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function un(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12"}]];g(a,h({name:"link-2"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function vn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]];g(a,h({name:"link"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function hn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M12 2v4"}],["path",{d:"m16.2 7.8 2.9-2.9"}],["path",{d:"M18 12h4"}],["path",{d:"m16.2 16.2 2.9 2.9"}],["path",{d:"M12 18v4"}],["path",{d:"m4.9 19.1 2.9-2.9"}],["path",{d:"M2 12h4"}],["path",{d:"m4.9 4.9 2.9 2.9"}]];g(a,h({name:"loader"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function gn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];g(a,h({name:"lock"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function fn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["circle",{cx:"12",cy:"10",r:"3"}]];g(a,h({name:"map-pin"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function pn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]];g(a,h({name:"menu"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function mn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}]];g(a,h({name:"message-circle"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function _n(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}]];g(a,h({name:"message-square"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function yn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["line",{x1:"2",x2:"22",y1:"2",y2:"22"}],["path",{d:"M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"}],["path",{d:"M5 10v2a7 7 0 0 0 12 5"}],["path",{d:"M15 9.34V5a3 3 0 0 0-5.68-1.33"}],["path",{d:"M9 9v3a3 3 0 0 0 5.12 2.12"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22"}]];g(a,h({name:"mic-off"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function bn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22"}]];g(a,h({name:"mic"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Nn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M6 18h8"}],["path",{d:"M3 22h18"}],["path",{d:"M14 22a7 7 0 1 0 0-14h-1"}],["path",{d:"M9 14h2"}],["path",{d:"M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"}],["path",{d:"M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"}]];g(a,h({name:"microscope"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Mn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M8 2h8"}],["path",{d:"M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"}],["path",{d:"M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0"}]];g(a,h({name:"milk"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function xn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M5 12h14"}]];g(a,h({name:"minus"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function zn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"}]];g(a,h({name:"moon"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Pn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"}],["path",{d:"M12 22V12"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["path",{d:"m7.5 4.27 9 5.15"}]];g(a,h({name:"package"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function kn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M5.8 11.3 2 22l10.7-3.79"}],["path",{d:"M4 3h.01"}],["path",{d:"M22 8h.01"}],["path",{d:"M15 2h.01"}],["path",{d:"M22 20h.01"}],["path",{d:"m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"}],["path",{d:"m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"}],["path",{d:"m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"}],["path",{d:"M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"}]];g(a,h({name:"party-popper"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function wn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}]];g(a,h({name:"pause"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function An(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"}],["path",{d:"m8 6 2-2"}],["path",{d:"m18 16 2-2"}],["path",{d:"m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];g(a,h({name:"pencil-ruler"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Sn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];g(a,h({name:"pencil"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Cn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}],["path",{d:"M14.05 2a9 9 0 0 1 8 7.94"}],["path",{d:"M14.05 6A5 5 0 0 1 18 10"}]];g(a,h({name:"phone-call"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Ln(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}]];g(a,h({name:"phone"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Dn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"}],["path",{d:"m8.5 8.5 7 7"}]];g(a,h({name:"pill"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Tn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["polygon",{points:"6 3 20 12 6 21 6 3"}]];g(a,h({name:"play"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Vn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];g(a,h({name:"plus"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Hn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1"}]];g(a,h({name:"printer"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function En(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];g(a,h({name:"refresh-cw"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Bn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"}],["path",{d:"m14.5 12.5 2-2"}],["path",{d:"m11.5 9.5 2-2"}],["path",{d:"m8.5 6.5 2-2"}],["path",{d:"m17.5 15.5 2-2"}]];g(a,h({name:"ruler"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function On(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"}],["path",{d:"m21.854 2.147-10.94 10.939"}]];g(a,h({name:"send"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function In(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{cx:"12",cy:"12",r:"3"}]];g(a,h({name:"settings"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Fn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["circle",{cx:"18",cy:"5",r:"3"}],["circle",{cx:"6",cy:"12",r:"3"}],["circle",{cx:"18",cy:"19",r:"3"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49"}]];g(a,h({name:"share-2"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Zn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M12 8v4"}],["path",{d:"M12 16h.01"}]];g(a,h({name:"shield-alert"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function qn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];g(a,h({name:"shield-check"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Wn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]];g(a,h({name:"shield"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Rn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9"}]];g(a,h({name:"smile"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Un(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"m10 20-1.25-2.5L6 18"}],["path",{d:"M10 4 8.75 6.5 6 6"}],["path",{d:"m14 20 1.25-2.5L18 18"}],["path",{d:"m14 4 1.25 2.5L18 6"}],["path",{d:"m17 21-3-6h-4"}],["path",{d:"m17 3-3 6 1.5 3"}],["path",{d:"M2 12h6.5L10 9"}],["path",{d:"m20 10-1.5 2 1.5 2"}],["path",{d:"M22 12h-6.5L14 15"}],["path",{d:"m4 10 1.5 2L4 14"}],["path",{d:"m7 21 3-6-1.5-3"}],["path",{d:"m7 3 3 6h4"}]];g(a,h({name:"snowflake"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function jn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"}],["path",{d:"M20 3v4"}],["path",{d:"M22 5h-4"}],["path",{d:"M4 17v2"}],["path",{d:"M5 18H3"}]];g(a,h({name:"sparkles"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Gn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]];g(a,h({name:"square"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Yn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]];g(a,h({name:"star"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Jn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M11 2v2"}],["path",{d:"M5 2v2"}],["path",{d:"M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"}],["path",{d:"M8 15a6 6 0 0 0 12 0v-3"}],["circle",{cx:"20",cy:"10",r:"2"}]];g(a,h({name:"stethoscope"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Kn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.9 4.9 1.4 1.4"}],["path",{d:"m17.7 17.7 1.4 1.4"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.3 17.7-1.4 1.4"}],["path",{d:"m19.1 4.9-1.4 1.4"}]];g(a,h({name:"sun-moon"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Xn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];g(a,h({name:"sun"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Qn(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"m18 2 4 4"}],["path",{d:"m17 7 3-3"}],["path",{d:"M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"}],["path",{d:"m9 11 4 4"}],["path",{d:"m5 19-3 3"}],["path",{d:"m14 4 6 6"}]];g(a,h({name:"syringe"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function eo(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"6"}],["circle",{cx:"12",cy:"12",r:"2"}]];g(a,h({name:"target"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function Mt(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"}]];g(a,h({name:"thermometer"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function to(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M7 10v12"}],["path",{d:"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"}]];g(a,h({name:"thumbs-up"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function ao(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["line",{x1:"10",x2:"14",y1:"2",y2:"2"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11"}],["circle",{cx:"12",cy:"14",r:"8"}]];g(a,h({name:"timer"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function no(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18"}],["path",{d:"M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"}]];g(a,h({name:"toilet"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function _t(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]];g(a,h({name:"trash-2"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function oo(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["polyline",{points:"22 17 13.5 8.5 8.5 13.5 2 7"}],["polyline",{points:"16 17 22 17 22 11"}]];g(a,h({name:"trending-down"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function ro(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17"}],["polyline",{points:"16 7 22 7 22 13"}]];g(a,h({name:"trending-up"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function so(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];g(a,h({name:"triangle-alert"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function lo(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["polyline",{points:"4 7 4 4 20 4 20 7"}],["line",{x1:"9",x2:"15",y1:"20",y2:"20"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20"}]];g(a,h({name:"type"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function co(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["polyline",{points:"17 8 12 3 7 8"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15"}]];g(a,h({name:"upload"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function io(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{cx:"9",cy:"7",r:"4"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11"}]];g(a,h({name:"user-plus"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function $o(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];g(a,h({name:"user"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function uo(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{cx:"9",cy:"7",r:"4"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75"}]];g(a,h({name:"users"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function vo(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"}],["path",{d:"M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"}],["path",{d:"m2.1 21.8 6.4-6.3"}],["path",{d:"m19 5-7 7"}]];g(a,h({name:"utensils-crossed"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function ho(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"}],["path",{d:"M7 2v20"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"}]];g(a,h({name:"utensils"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function go(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{d:"M16 9a5 5 0 0 1 0 6"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728"}]];g(a,h({name:"volume-2"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function fo(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}]];g(a,h({name:"waves"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function po(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2"}]];g(a,h({name:"wind"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function mo(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];g(a,h({name:"x"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function _o(a,e){const n=u(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.500.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const r=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]];g(a,h({name:"zap"},()=>n,{get iconNode(){return r},children:(s,l)=>{var t=$(),o=i(t);v(o,e,"default",{}),c(s,t)},$$slots:{default:!0}}))}function ce(a,e){const n={activity:ia,"alert-circle":La,"alert-triangle":so,"arrow-left":$a,"arrow-left-right":da,"arrow-right":ua,award:va,baby:ha,"bar-chart":Pa,bell:ga,bluetooth:pa,"bluetooth-off":fa,"book-open":ma,bookmark:ya,"bookmark-check":_a,briefcase:ba,calendar:xa,"calendar-check":Na,"calendar-clock":Ma,camera:za,check:ka,"check-circle":Da,"chevron-down":wa,"chevron-left":Aa,"chevron-right":Sa,"chevron-up":Ca,circle:Ea,clipboard:mt,"clipboard-list":mt,clock:Clock,coffee:Ba,compass:Oa,contact:Ia,copy:Fa,cross:Za,cylinder:qa,database:Wa,download:Ra,droplet:Ua,droplets:lt,eye:Ga,"eye-off":ja,"file-text":Ya,flag:Ja,flame:Ka,"flask-conical":Xa,funnel:Qa,gift:en,globe:tn,"grip-vertical":an,hand:nn,heart:ct,"heart-pulse":on,"help-circle":Ta,home:sn,hospital:rn,image:ln,info:cn,keyboard:dn,lightbulb:$n,link:vn,"link-2":un,loader:hn,lock:gn,"map-pin":fn,menu:pn,"message-circle":mn,"message-square":_n,mic:bn,"mic-off":yn,microscope:Nn,milk:Mn,minus:xn,moon:zn,package:Pn,"party-popper":kn,pause:wn,pencil:Sn,"pencil-ruler":An,phone:Ln,"phone-call":Cn,pill:Dn,play:Tn,plus:Vn,"plus-circle":Va,printer:Hn,"refresh-cw":En,ruler:Bn,send:On,settings:In,"share-2":Fn,shield:Wn,"shield-alert":Zn,"shield-check":qn,smile:Rn,snowflake:Un,sparkles:jn,square:Gn,star:Yn,stethoscope:Jn,sun:Xn,"sun-moon":Kn,syringe:Qn,target:eo,thermometer:Mt,"thumbs-up":to,timer:ao,toilet:no,trash:_t,"trash-2":_t,"trending-down":oo,"trending-up":ro,type:lo,upload:co,user:$o,"user-plus":io,users:uo,utensils:ho,"utensils-crossed":vo,"volume-2":go,waves:fo,wind:po,x:mo,"x-circle":Ha,zap:_o};let r=N(e,"size",3,20),s=N(e,"color",3,"currentColor"),l=N(e,"strokeWidth",3,1.75),t=N(e,"class",3,"");const o=A(()=>n[e.name]);var m=$(),_=i(m);{var M=y=>{var x=$(),P=i(x);Nt(P,()=>d(o),(z,C)=>{C(z,{get size(){return r()},get color(){return s()},get"stroke-width"(){return l()},get class(){return`icon-inline ${t()??""}`}})}),c(y,x)};q(_,y=>{d(o)&&y(M)})}c(a,m)}var yo=w('<span class="pebble-spinner svelte-ci6yf5" aria-hidden="true"></span>'),bo=w('<span class="pebble-label svelte-ci6yf5"> </span>'),No=w("<button><!> <!></button>");function Oe(a,e){Ae(e,!0);const n={luna:"#D4678A",aura:"#E8A87C",sienna:"#3c684b",alma:"#7BA7A7",nova:"#6366F1",aida:"#8B5CF6"};let r=N(e,"brand",3,"luna"),s=N(e,"label",3,""),l=N(e,"icon",3,null),t=N(e,"size",3,"md"),o=N(e,"variant",3,"primary"),m=N(e,"disabled",3,!1),_=N(e,"loading",3,!1),M=N(e,"onclick",3,null),y=N(e,"class",3,"");const x=A(()=>n[r()]??n.luna),P={sm:14,md:16,lg:18}[t()]??16;var z=No();let C;var D=p(z);{var I=W=>{var ee=yo();c(W,ee)},J=W=>{ce(W,{get name(){return l()},get size(){return P}})};q(D,W=>{_()?W(I):l()&&W(J,1)})}var ie=b(D,2);{var xe=W=>{var ee=bo(),Pe=p(ee,!0);f(ee),S(()=>L(Pe,s())),c(W,ee)};q(ie,W=>{s()&&W(xe)})}f(z),S(()=>{C=Me(z,1,`pebble-btn pebble-btn--${t()??""} pebble-btn--${o()??""} ${y()??""}`,"svelte-ci6yf5",C,{"pebble-btn--loading":_()}),z.disabled=m()||_(),qe(z,`--pebble-brand: ${d(x)??""}`)}),he("click",z,function(...W){var ee;(ee=M())==null||ee.apply(this,W)}),c(a,z),Se()}Ze(["click"]);var Mo=w("<button><!> <span> </span></button>"),xo=w('<div class="symptom-grid svelte-1qfrkf6"></div> <!>',1);function zo(a,e){Ae(e,!0);let n=N(e,"onLog",3,()=>{});const r=[{id:"cramp",label:"Cramp",icon:ct},{id:"bloating",label:"Bloating",icon:lt},{id:"fatigue",label:"Fatigue",icon:Ge},{id:"headache",label:"Headache",icon:Ge},{id:"breast_tenderness",label:"Breast tenderness",icon:ct},{id:"backache",label:"Backache",icon:Ge},{id:"acne",label:"Acne",icon:lt},{id:"cravings",label:"Cravings",icon:Ge}];let s=fe(Ee([]));function l(y){d(s).includes(y)?V(s,d(s).filter(x=>x!==y),!0):V(s,[...d(s),y],!0)}function t(){n()({symptoms:d(s),date:new Date().toISOString().split("T")[0]}),V(s,[],!0)}var o=xo(),m=i(o);Ie(m,21,()=>r,Fe,(y,x)=>{var P=Mo();let z;var C=p(P);Nt(C,()=>d(x).icon,(J,ie)=>{ie(J,{size:16})});var D=b(C,2),I=p(D,!0);f(D),f(P),S(J=>{z=Me(P,1,"symptom-chip svelte-1qfrkf6",null,z,J),L(I,d(x).label)},[()=>({selected:d(s).includes(d(x).id)})]),he("click",P,()=>l(d(x).id)),c(y,P)}),f(m);var _=b(m,2);{var M=y=>{Oe(y,{variant:"primary",size:"md",onclick:t,children:(x,P)=>{we();var z=je();S(()=>L(z,`Log ${d(s).length??""} symptom${d(s).length>1?"s":""}`)),c(x,z)},$$slots:{default:!0}})};q(_,y=>{d(s).length>0&&y(M)})}c(a,o),Se()}Ze(["click"]);var Po=w('<div class="temp-input svelte-znung8"><div class="input-row svelte-znung8"><!> <input type="number" step="0.01" min="35" max="40" placeholder="36.5" class="svelte-znung8"/> <span class="unit svelte-znung8">°C</span></div> <div class="time-row svelte-znung8"><label for="temp-time" class="svelte-znung8">Time:</label> <input id="temp-time" type="time" class="svelte-znung8"/></div> <!></div>');function ko(a,e){Ae(e,!0);let n=N(e,"onLog",3,()=>{}),r=fe(""),s=fe(Ee(new Date().toTimeString().slice(0,5)));function l(){d(r)&&(n()({temperature:parseFloat(d(r)),time:d(s),date:new Date().toISOString().split("T")[0]}),V(r,""))}var t=Po(),o=p(t),m=p(o);Mt(m,{size:24,color:"var(--luna-primary)"});var _=b(m,2);Ve(_),we(2),f(o);var M=b(o,2),y=b(p(M),2);Ve(y),f(M);var x=b(M,2);{let P=A(()=>!d(r));Oe(x,{variant:"primary",size:"md",onclick:l,get disabled(){return d(P)},children:(z,C)=>{we();var D=je("Log Temperature");c(z,D)},$$slots:{default:!0}})}f(t),He(_,()=>d(r),P=>V(r,P)),He(y,()=>d(s),P=>V(s,P)),c(a,t),Se()}var wo=w('<div role="status" aria-live="polite"><div class="empathy-icon svelte-k4baxj"><!></div> <p class="empathy-text svelte-k4baxj"> </p> <button class="empathy-close svelte-k4baxj" aria-label="Dismiss"><!></button></div>');function yt(a,e){Ae(e,!0);let n=N(e,"message",3,null),r=N(e,"onDismiss",3,()=>{}),s=N(e,"class",3,""),l=fe(!0);function t(){V(l,!1),r()()}var o=$(),m=i(o);{var _=M=>{var y=wo();let x;var P=p(y),z=p(P);{let ie=A(()=>n().icon||"heart");ce(z,{get name(){return d(ie)},size:20})}f(P);var C=b(P,2),D=p(C,!0);f(C);var I=b(C,2),J=p(I);ce(J,{name:"x",size:16}),f(I),f(y),S(()=>{x=Me(y,1,`empathy-banner ${s()??""}`,"svelte-k4baxj",x,{"empathy-banner--celebration":n().category==="celebration"}),L(D,n().fallback||n().key)}),he("click",I,t),c(M,y)};q(m,M=>{d(l)&&n()&&M(_)})}c(a,o),Se()}Ze(["click"]);var Ao=w('<p class="promo-title svelte-oeozq2"> </p>'),So=w('<p class="promo-body svelte-oeozq2"> </p>'),Co=w('<button class="promo-close svelte-oeozq2" aria-label="Dismiss"><!></button>'),Lo=w('<div role="status" aria-live="polite"><div class="promo-icon svelte-oeozq2"><!></div> <div class="promo-content svelte-oeozq2"><!> <!> <!></div> <!></div>');function tt(a,e){Ae(e,!0);let n=N(e,"targetApp",3,""),r=N(e,"targetColor",3,"#3c684b"),s=N(e,"icon",3,"heart"),l=N(e,"title",3,""),t=N(e,"body",3,""),o=N(e,"ctaLabel",3,"Learn more"),m=N(e,"ctaHref",3,""),_=N(e,"dismissible",3,!0),M=N(e,"ondismiss",3,()=>{}),y=N(e,"onaction",3,()=>{}),x=N(e,"class",3,""),P=fe(!0);const z={luna:"luna",aura:"aura",sienna:"sienna",alma:"alma",nova:"nova",aida:"aida"},C=A(()=>z[n().toLowerCase()]??"luna");function D(){V(P,!1),M()()}function I(){m()&&window.open(m(),"_blank","noopener"),y()()}var J=$(),ie=i(J);{var xe=W=>{var ee=Lo(),Pe=p(ee),We=p(Pe);ce(We,{get name(){return s()},size:24}),f(Pe);var F=b(Pe,2),T=p(F);{var R=ae=>{var $e=Ao(),Le=p($e,!0);f($e),S(()=>L(Le,l())),c(ae,$e)};q(T,ae=>{l()&&ae(R)})}var te=b(T,2);{var de=ae=>{var $e=So(),Le=p($e,!0);f($e),S(()=>L(Le,t())),c(ae,$e)};q(te,ae=>{t()&&ae(de)})}var ze=b(te,2);Oe(ze,{get brand(){return d(C)},get label(){return o()},variant:"primary",size:"sm",icon:"arrow-right",onclick:I}),f(F);var Ce=b(F,2);{var me=ae=>{var $e=Co(),Le=p($e);ce(Le,{name:"x",size:16}),f($e),he("click",$e,D),c(ae,$e)};q(Ce,ae=>{_()&&ae(me)})}f(ee),S(()=>{Me(ee,1,`cross-promo-card ${x()??""}`,"svelte-oeozq2"),qe(ee,`--promo-color: ${r()??""}`)}),c(W,ee)};q(ie,W=>{d(P)&&W(xe)})}c(a,J),Se()}Ze(["click"]);var Do=w('<div class="badge-expanded svelte-1710v6o"><span class="badge-icon svelte-1710v6o"><!></span> <div class="badge-content svelte-1710v6o"><p class="badge-title svelte-1710v6o">Private & Encrypted</p> <p class="badge-desc svelte-1710v6o">Your data is protected with AES-256-GCM encryption and Argon2id key derivation (64MB RAM, 3 iterations). Only you have access to your personal information.</p></div></div>'),To=w('<span class="badge-compact svelte-1710v6o"><!> <span>Private & Encrypted</span></span>'),Vo=w("<div><!></div>");function Ho(a,e){let n=N(e,"expanded",3,!1),r=N(e,"class",3,"");var s=Vo(),l=p(s);{var t=m=>{var _=Do(),M=p(_),y=p(M);ce(y,{name:"shield-check",size:18}),f(M),we(2),f(_),c(m,_)},o=m=>{var _=To(),M=p(_);ce(M,{name:"shield-check",size:14}),we(2),f(_),c(m,_)};q(l,m=>{n()?m(t):m(o,-1)})}f(s),S(()=>Me(s,1,`privacy-badge ${r()??""}`,"svelte-1710v6o")),c(a,s)}var Eo=w('<footer class="medical-disclaimer svelte-gx1e31" role="contentinfo"><div class="disclaimer-icon svelte-gx1e31"><!></div> <p class="disclaimer-text svelte-gx1e31">This information does not replace professional medical advice. Always consult a qualified healthcare provider for medical concerns.</p></footer>');function Bo(a){var e=Eo(),n=p(e),r=p(n);ce(r,{name:"info",size:14}),f(n),we(2),f(e),c(a,e)}var Oo=w('<span class="pebble-label svelte-tj96p3"> </span>'),Io=w('<button><span class="pebble-icon svelte-tj96p3"><!></span> <!></button>');function Ye(a,e){let n=N(e,"icon",3,"plus"),r=N(e,"label",3,""),s=N(e,"color",3,"#3c684b"),l=N(e,"active",3,!1),t=N(e,"onclick",3,null),o=N(e,"class",3,"");var m=Io();let _;var M=p(m),y=p(M);ce(y,{get name(){return n()},size:24}),f(M);var x=b(M,2);{var P=z=>{var C=Oo(),D=p(C,!0);f(C),S(()=>L(D,r())),c(z,C)};q(x,z=>{r()&&z(P)})}f(m),S(()=>{_=Me(m,1,`pebble-action ${o()??""}`,"svelte-tj96p3",_,{"pebble-action--active":l()}),qe(m,`--action-color: ${s()??""}`),oe(m,"aria-pressed",l())}),he("click",m,function(...z){var C;(C=t())==null||C.apply(this,z)}),c(a,m)}Ze(["click"]);var Fo=w('<a role="tab"><span class="tab-icon svelte-1lgda09"><!></span> <span class="tab-label svelte-1lgda09"> </span></a>'),Zo=w('<nav role="tablist" aria-label="Main navigation"></nav>');function qo(a,e){Ae(e,!0);const n={luna:"#D4678A",aura:"#E8A87C",sienna:"#3c684b",alma:"#7BA7A7",nova:"#6366F1",aida:"#8B5CF6"};let r=N(e,"tabs",19,()=>[]),s=N(e,"activeIndex",3,0),l=N(e,"brand",3,"luna"),t=N(e,"class",3,"");const o=A(()=>n[l()]??n.luna);var m=Zo();Ie(m,21,()=>r().slice(0,5),Fe,(_,M,y)=>{var x=Fo();let P;var z=p(x),C=p(z);ce(C,{get name(){return d(M).icon},size:20}),f(z);var D=b(z,2),I=p(D,!0);f(D),f(x),S(()=>{oe(x,"href",d(M).href),P=Me(x,1,"tab-item svelte-1lgda09",null,P,{"tab-item--active":y===s()}),oe(x,"aria-selected",y===s()),oe(x,"aria-label",d(M).label),L(I,d(M).label)}),c(_,x)}),f(m),S(()=>{Me(m,1,`tab-bar ${t()??""}`,"svelte-1lgda09"),qe(m,`--tab-brand: ${d(o)??""}`)}),c(a,m),Se()}const xt="luna_data",at={cycleLength:28,periodLength:5,lastPeriodDate:null},nt={period:[],symptoms:[],temperature:[],mood:[]};function Be(){if(typeof localStorage>"u")return{settings:at,log:nt};try{const a=localStorage.getItem(xt);return a?JSON.parse(a):{settings:at,log:nt}}catch{return{settings:at,log:nt}}}function zt(a){typeof localStorage>"u"||localStorage.setItem(xt,JSON.stringify(a))}function Wo(a){const e=Be();return e.settings={...e.settings,...a},zt(e),e.settings}function ot(a,e){const n=Be();return n.log[a]||(n.log[a]=[]),n.log[a].push({date:new Date().toISOString().split("T")[0],...e}),zt(n),n.log}function bt(a,e=28){if(!a)return null;const n=new Date(a),r=new Date(n);return r.setDate(r.getDate()+e),r.toISOString().split("T")[0]}function Ro(a,e=28,n=new Date){if(!a)return{phase:"unknown",dayOfPhase:0,fertileStart:null,fertileEnd:null};const r=new Date(a),s=new Date(n),l=s-r,t=Math.floor(l/(1e3*60*60*24)),o=t%e,m=t+1,_=Math.floor(e/2)-5,M=Math.floor(e/2);let y,x;o<0?(y="menstrual",x=o+e):o<5?(y="menstrual",x=o+1):o<_?(y="follicular",x=o-4):o<=M?(y="ovulation",x=o-_+1):(y="luteal",x=o-M+1);const P=new Date(r);P.setDate(P.getDate()+_);const z=new Date(r);return z.setDate(z.getDate()+M),{phase:y,dayOfPhase:x,dayOfCycle:m,cycleLength:e,fertileStart:P.toISOString().split("T")[0],fertileEnd:z.toISOString().split("T")[0],nextPeriod:bt(a,e),daysUntilNextPeriod:Math.ceil((new Date(bt(a,e))-s)/(1e3*60*60*24))}}function Uo(a){const e={menstrual:"#D4737A",follicular:"#E5A855",ovulation:"#5BA876",luteal:"#6B7FC4",unknown:"#9D7BC9"};return e[a]||e.unknown}function jo(a,e){const n=new Date(a,e,1),s=new Date(a,e+1,0).getDate(),l=n.getDay(),t=[];for(let m=0;m<l;m++){const _=new Date(a,e,-l+m+1);t.push({date:_.toISOString().split("T")[0],day:_.getDate(),currentMonth:!1})}for(let m=1;m<=s;m++){const _=new Date(a,e,m);t.push({date:_.toISOString().split("T")[0],day:m,currentMonth:!0})}const o=42-t.length;for(let m=1;m<=o;m++){const _=new Date(a,e+1,m);t.push({date:_.toISOString().split("T")[0],day:_.getDate(),currentMonth:!1})}return t}function Go(a){if(!a.period||a.period.length<2)return null;const e=a.period.map(r=>new Date(r.date)).sort((r,s)=>r-s);let n=0;for(let r=1;r<e.length;r++)n+=(e[r]-e[r-1])/(1e3*60*60*24);return Math.round(n/(e.length-1))}function Yo(a){if(!a.period||a.period.length===0)return null;const e=a.period.filter(n=>n.flow).map(n=>n.flow);return e.length===0?null:Math.round(e.reduce((n,r)=>n+r,0)/e.length)}var Jo=w('<div class="onboarding svelte-1uha8ag"><!> <div class="setup-form svelte-1uha8ag"><label class="svelte-1uha8ag"><span class="svelte-1uha8ag"> </span> <input type="date" class="svelte-1uha8ag"/></label> <label class="svelte-1uha8ag"><span class="svelte-1uha8ag"> </span> <input type="number" min="21" max="35" class="svelte-1uha8ag"/></label> <!></div></div>'),Ko=w('<p class="next-period svelte-1uha8ag"> </p>'),Xo=w('<div class="today-view svelte-1uha8ag"><div class="ring-container svelte-1uha8ag"><!></div> <!> <div class="phase-info svelte-1uha8ag"><span class="phase-badge svelte-1uha8ag"> </span> <span class="day-counter svelte-1uha8ag"> </span></div> <!> <div class="quick-actions svelte-1uha8ag"><!> <!> <!> <!></div> <div class="promo-section svelte-1uha8ag"><!></div></div>'),Qo=w('<div class="day-header svelte-1uha8ag"> </div>'),er=w("<div><span> </span></div>"),tr=w('<div class="calendar-view svelte-1uha8ag"><div class="calendar-header svelte-1uha8ag"><button class="svelte-1uha8ag"><!></button> <h2 class="svelte-1uha8ag"> </h2> <button class="svelte-1uha8ag"><!></button></div> <div class="calendar-grid svelte-1uha8ag"><!> <!></div></div>'),ar=w('<div class="stat-card svelte-1uha8ag"><span class="stat-label svelte-1uha8ag"> </span> <span class="stat-value svelte-1uha8ag"> </span></div>'),nr=w('<div class="stat-card svelte-1uha8ag"><span class="stat-label svelte-1uha8ag"> </span> <span class="stat-value svelte-1uha8ag"> </span></div>'),or=w('<p class="no-data svelte-1uha8ag"> </p>'),rr=w('<div class="insights-view svelte-1uha8ag"><h2 class="svelte-1uha8ag"> </h2> <!> <!> <!> <div class="promo-section svelte-1uha8ag"><!> <!></div></div>'),sr=w('<h3 class="svelte-1uha8ag"> </h3> <!>',1),lr=w('<h3 class="svelte-1uha8ag"> </h3> <!>',1),cr=w('<h3 class="svelte-1uha8ag"> </h3> <!>',1),ir=w('<div class="modal-overlay svelte-1uha8ag"><div class="modal svelte-1uha8ag"><!> <button class="close-btn svelte-1uha8ag"><!></button></div></div>'),dr=w('<div class="modal-overlay svelte-1uha8ag"><div class="modal settings-modal svelte-1uha8ag"><h3 class="svelte-1uha8ag"> </h3> <label class="svelte-1uha8ag"><span class="svelte-1uha8ag"> </span> <input type="date" class="svelte-1uha8ag"/></label> <label class="svelte-1uha8ag"><span class="svelte-1uha8ag"> </span> <input type="number" min="21" max="35" class="svelte-1uha8ag"/></label> <label class="svelte-1uha8ag"><span class="svelte-1uha8ag"> </span> <input type="number" min="1" max="10" class="svelte-1uha8ag"/></label> <!> <button class="close-btn svelte-1uha8ag"><!></button></div></div>'),$r=w('<div class="app svelte-1uha8ag"><header class="svelte-1uha8ag"><h1 class="svelte-1uha8ag">Luna</h1> <button class="icon-btn svelte-1uha8ag"><!></button></header> <main class="svelte-1uha8ag"><!></main> <!> <footer class="svelte-1uha8ag"><!> <!></footer></div> <!> <!>',1);function pr(a,e){Ae(e,!0);const n=()=>Jt(Kt,"$_",r),[r,s]=Yt();let l=fe(Ee({settings:{cycleLength:28,periodLength:5,lastPeriodDate:null},log:{period:[],symptoms:[],temperature:[],mood:[]}})),t=fe("today"),o=fe(!1),m=fe(null),_=fe(Ee({phase:"follicular",dayOfPhase:1,dayOfCycle:1,daysUntilNextPeriod:14})),M=fe(Ee(new Date)),y=fe(Ee({cycleLength:28,periodLength:5,lastPeriodDate:""}));function x(){V(_,Ro(d(l).settings.lastPeriodDate,d(l).settings.cycleLength),!0)}function P(){ot("period",{date:new Date().toISOString().split("T")[0],flow:d(l).settings.periodLength}),V(l,Be(),!0),x(),V(m,null)}function z(U){ot("symptoms",U),V(l,Be(),!0),V(m,null)}function C(U){ot("temperature",U),V(l,Be(),!0),V(m,null)}function D(){Wo({cycleLength:parseInt(d(y).cycleLength),periodLength:parseInt(d(y).periodLength),lastPeriodDate:d(y).lastPeriodDate||null}),V(l,Be(),!0),x(),V(o,!1)}function I(){V(y,{cycleLength:d(l).settings.cycleLength,periodLength:d(l).settings.periodLength,lastPeriodDate:d(l).settings.lastPeriodDate||""},!0),V(o,!0)}Gt(()=>{d(l).settings.lastPeriodDate&&x()});const J=A(()=>jo(d(M).getFullYear(),d(M).getMonth())),ie=A(()=>d(M).toLocaleString("en",{month:"long",year:"numeric"}));function xe(){V(M,new Date(d(M).getFullYear(),d(M).getMonth()-1,1),!0)}function W(){V(M,new Date(d(M).getFullYear(),d(M).getMonth()+1,1),!0)}const ee=A(()=>n()("messages."+d(_).phase)),Pe=A(()=>n()("phases."+d(_).phase)),We=A(()=>Uo(d(_).phase)),F=A(()=>Go(d(l).log)),T=A(()=>Yo(d(l).log));var R=$r(),te=i(R),de=p(te),ze=b(p(de),2),Ce=p(ze);ce(Ce,{name:"settings",size:20}),f(ze),f(de);var me=b(de,2),ae=p(me);{var $e=U=>{var ne=Jo(),ue=p(ne);{let B=A(()=>n()("app.tagline"));yt(ue,{get message(){return d(B)},brand:"luna"})}var _e=b(ue,2),ke=p(_e),ye=p(ke),re=p(ye,!0);f(ye);var K=b(ye,2);Ve(K),f(ke);var X=b(ke,2),H=p(X),j=p(H,!0);f(H);var O=b(H,2);Ve(O),f(X);var Q=b(X,2);Oe(Q,{variant:"primary",size:"lg",onclick:D,children:(B,G)=>{we();var pe=je();S(se=>L(pe,se),[()=>n()("settings.save")]),c(B,pe)},$$slots:{default:!0}}),f(_e),f(ne),S((B,G)=>{L(re,B),L(j,G)},[()=>n()("settings.lastPeriod"),()=>n()("settings.cycleLength")]),He(K,()=>d(y).lastPeriodDate,B=>d(y).lastPeriodDate=B),He(O,()=>d(y).cycleLength,B=>d(y).cycleLength=B),c(U,ne)},Le=U=>{var ne=$(),ue=i(ne);{var _e=re=>{var K=Xo(),X=p(K),H=p(X);{let Y=A(()=>d(_).dayOfCycle.toString()),Te=A(()=>n()("cycle.ofCycle"));sa(H,{segments:28,get currentSegment(){return d(_).dayOfPhase},get phase(){return d(_).phase},get centerText(){return d(Y)},get centerSubtext(){return d(Te)}})}f(X);var j=b(X,2);yt(j,{get message(){return d(ee)},brand:"luna"});var O=b(j,2),Q=p(O),B=p(Q,!0);f(Q);var G=b(Q,2),pe=p(G,!0);f(G),f(O);var se=b(O,2);{var be=Y=>{var Te=Ko(),Je=p(Te,!0);f(Te),S(Ct=>L(Je,Ct),[()=>n()("cycle.periodExpected",{values:{days:d(_).daysUntilNextPeriod}})]),c(Y,Te)};q(se,Y=>{d(_).daysUntilNextPeriod>0&&Y(be)})}var ge=b(se,2),E=p(ge);{let Y=A(()=>n()("logging.period"));Ye(E,{icon:"droplets",get label(){return d(Y)},brand:"luna",onclick:()=>V(m,"period")})}var k=b(E,2);{let Y=A(()=>n()("logging.symptoms"));Ye(k,{icon:"heart",get label(){return d(Y)},brand:"luna",onclick:()=>V(m,"symptoms")})}var Z=b(k,2);{let Y=A(()=>n()("logging.temperature"));Ye(Z,{icon:"thermometer",get label(){return d(Y)},brand:"luna",onclick:()=>V(m,"temperature")})}var le=b(Z,2);{let Y=A(()=>n()("logging.mood"));Ye(le,{icon:"brain",get label(){return d(Y)},brand:"luna",onclick:()=>V(m,"mood")})}f(ge);var ve=b(ge,2),De=p(ve);{let Y=A(()=>n()("promo.ttcTitle")),Te=A(()=>n()("promo.ttcBody")),Je=A(()=>n()("promo.auraCTA"));tt(De,{targetApp:"aura",get title(){return d(Y)},get body(){return d(Te)},get ctaText(){return d(Je)}})}f(ve),f(K),S(Y=>{qe(Q,`background: ${d(We)??""}`),L(B,d(Pe)),L(pe,Y)},[()=>n()("cycle.day",{values:{day:d(_).dayOfPhase}})]),c(re,K)},ke=re=>{var K=tr(),X=p(K),H=p(X),j=p(H);ce(j,{name:"chevron-left",size:20}),f(H);var O=b(H,2),Q=p(O,!0);f(O);var B=b(O,2),G=p(B);ce(G,{name:"chevron-right",size:20}),f(B),f(X);var pe=b(X,2),se=p(pe);Ie(se,16,()=>["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Fe,(ge,E)=>{var k=Qo(),Z=p(k,!0);f(k),S(()=>L(Z,E)),c(ge,k)});var be=b(se,2);Ie(be,17,()=>d(J),Fe,(ge,E)=>{var k=er();let Z;var le=p(k),ve=p(le,!0);f(le),f(k),S(De=>{Z=Me(k,1,"calendar-day svelte-1uha8ag",null,Z,De),L(ve,d(E).day)},[()=>({"other-month":!d(E).currentMonth,today:d(E).date===new Date().toISOString().split("T")[0]})]),c(ge,k)}),f(pe),f(K),S(()=>L(Q,d(ie))),he("click",H,xe),he("click",B,W),c(re,K)},ye=re=>{var K=rr(),X=p(K),H=p(X,!0);f(X);var j=b(X,2);{var O=E=>{var k=ar(),Z=p(k),le=p(Z,!0);f(Z);var ve=b(Z,2),De=p(ve);f(ve),f(k),S(Y=>{L(le,Y),L(De,`${d(F)??""} days`)},[()=>n()("insights.avgCycle")]),c(E,k)};q(j,E=>{d(F)&&E(O)})}var Q=b(j,2);{var B=E=>{var k=nr(),Z=p(k),le=p(Z,!0);f(Z);var ve=b(Z,2),De=p(ve);f(ve),f(k),S(Y=>{L(le,Y),L(De,`${d(T)??""} days`)},[()=>n()("insights.avgPeriod")]),c(E,k)};q(Q,E=>{d(T)&&E(B)})}var G=b(Q,2);{var pe=E=>{var k=or(),Z=p(k,!0);f(k),S(le=>L(Z,le),[()=>n()("insights.noData")]),c(E,k)};q(G,E=>{!d(F)&&!d(T)&&E(pe)})}var se=b(G,2),be=p(se);{let E=A(()=>n()("promo.follicularTitle")),k=A(()=>n()("promo.follicularBody")),Z=A(()=>n()("promo.novaCTA"));tt(be,{targetApp:"nova",get title(){return d(E)},get body(){return d(k)},get ctaText(){return d(Z)}})}var ge=b(be,2);{let E=A(()=>n()("promo.almaTitle")),k=A(()=>n()("promo.almaBody")),Z=A(()=>n()("promo.almaCTA"));tt(ge,{targetApp:"alma",get title(){return d(E)},get body(){return d(k)},get ctaText(){return d(Z)}})}f(se),f(K),S(E=>L(H,E),[()=>n()("insights.title")]),c(re,K)};q(ue,re=>{d(t)==="today"?re(_e):d(t)==="calendar"?re(ke,1):d(t)==="insights"&&re(ye,2)})}c(U,ne)};q(ae,U=>{d(l).settings.lastPeriodDate?U(Le,-1):U($e)})}f(me);var dt=b(me,2);{var Pt=U=>{{let ne=A(()=>[{id:"today",label:"Today",icon:"home"},{id:"calendar",label:n()("calendar.title"),icon:"calendar"},{id:"insights",label:n()("calendar.insights"),icon:"chart"}]);qo(U,{get tabs(){return d(ne)},get activeTab(){return d(t)},onchange:ue=>V(t,ue,!0),brand:"luna"})}};q(dt,U=>{d(l).settings.lastPeriodDate&&U(Pt)})}var $t=b(dt,2),ut=p($t);Ho(ut,{});var kt=b(ut,2);Bo(kt),f($t),f(te);var vt=b(te,2);{var wt=U=>{var ne=ir(),ue=p(ne),_e=p(ue);{var ke=H=>{var j=sr(),O=i(j),Q=p(O,!0);f(O);var B=b(O,2);Oe(B,{variant:"primary",size:"lg",onclick:P,children:(G,pe)=>{we();var se=je();S(be=>L(se,be),[()=>n()("logging.logPeriod")]),c(G,se)},$$slots:{default:!0}}),S(G=>L(Q,G),[()=>n()("logging.logPeriod")]),c(H,j)},ye=H=>{var j=lr(),O=i(j),Q=p(O,!0);f(O);var B=b(O,2);zo(B,{onLog:z}),S(G=>L(Q,G),[()=>n()("logging.logSymptoms")]),c(H,j)},re=H=>{var j=cr(),O=i(j),Q=p(O,!0);f(O);var B=b(O,2);ko(B,{onLog:C}),S(G=>L(Q,G),[()=>n()("logging.logTemperature")]),c(H,j)};q(_e,H=>{d(m)==="period"?H(ke):d(m)==="symptoms"?H(ye,1):d(m)==="temperature"&&H(re,2)})}var K=b(_e,2),X=p(K);ce(X,{name:"x",size:20}),f(K),f(ue),f(ne),he("click",ne,()=>V(m,null)),he("click",ue,H=>H.stopPropagation()),he("click",K,()=>V(m,null)),c(U,ne)};q(vt,U=>{d(m)&&U(wt)})}var At=b(vt,2);{var St=U=>{var ne=dr(),ue=p(ne),_e=p(ue),ke=p(_e,!0);f(_e);var ye=b(_e,2),re=p(ye),K=p(re,!0);f(re);var X=b(re,2);Ve(X),f(ye);var H=b(ye,2),j=p(H),O=p(j,!0);f(j);var Q=b(j,2);Ve(Q),f(H);var B=b(H,2),G=p(B),pe=p(G,!0);f(G);var se=b(G,2);Ve(se),f(B);var be=b(B,2);Oe(be,{variant:"primary",size:"md",onclick:D,children:(k,Z)=>{we();var le=je();S(ve=>L(le,ve),[()=>n()("settings.save")]),c(k,le)},$$slots:{default:!0}});var ge=b(be,2),E=p(ge);ce(E,{name:"x",size:20}),f(ge),f(ue),f(ne),S((k,Z,le,ve)=>{L(ke,k),L(K,Z),L(O,le),L(pe,ve)},[()=>n()("settings.title"),()=>n()("settings.lastPeriod"),()=>n()("settings.cycleLength"),()=>n()("settings.periodLength")]),he("click",ne,()=>V(o,!1)),he("click",ue,k=>k.stopPropagation()),He(X,()=>d(y).lastPeriodDate,k=>d(y).lastPeriodDate=k),He(Q,()=>d(y).cycleLength,k=>d(y).cycleLength=k),He(se,()=>d(y).periodLength,k=>d(y).periodLength=k),he("click",ge,()=>V(o,!1)),c(U,ne)};q(At,U=>{d(o)&&U(St)})}he("click",ze,I),c(a,R),Se(),s()}Ze(["click"]);export{pr as component};
