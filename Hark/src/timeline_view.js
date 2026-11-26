/* ===================== TIMELINE (Extras) ===================== */
const nightsFor=p=>{const r=[];NIGHTS.forEach((x,i)=>{if(x.c&&x.c.startsWith(p.match))r.push(i+1)});return r};
const centuryOf=(y,i)=>{if(i===0)return "AD 1";const m=String(y).match(/\d{3,4}/);return m?Math.floor(+m[0]/100)*100+"s":""};
function timelineStrip(){let last="";return `<div class="tlx" id="tlx"><div class="tlrow">${PEOPLE.map((p,i)=>{const ns=nightsFor(p),x=ns.length?NIGHTS[ns[0]-1]:null,c=centuryOf(p.y,i);let era="";if(c!==last){era=`<span class="tle cap">${c}</span>`;last=c}
 return `${era}<button class="tlc" data-act="who" data-i="${i}"><b class="yr">${esc(p.y)}</b><span class="nm">${esc(p.name)}</span><span class="pl">${esc(p.place)}</span>${x?`<span class="ms">“${esc(x.m)}”</span>`:""}<span class="more cap">Meet ${p.name.startsWith("The ")?"them":esc(p.name.split(" ")[0])} →</span></button>`}).join("")}</div></div>`}
let tlLeft=0;
function setupTimeline(){const el=$("#tlx");if(!el)return;el.scrollLeft=tlLeft;let down=null;
 el.addEventListener("scroll",()=>{tlLeft=el.scrollLeft},{passive:true});
 el.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse"||e.button!==0)return;down={x:e.clientX,l:el.scrollLeft,m:0,id:e.pointerId}});
 el.addEventListener("pointermove",e=>{if(!down)return;const dx=e.clientX-down.x;down.m=Math.max(down.m,Math.abs(dx));if(down.m>5&&!el.classList.contains("drag")){el.classList.add("drag");try{el.setPointerCapture(down.id)}catch(_){}}if(down.m>5)el.scrollLeft=down.l-dx});
 const up=()=>{if(!down)return;if(down.m>5)el._dragT=performance.now();down=null;el.classList.remove("drag")};
 el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up);
 el.addEventListener("wheel",e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)&&!e.ctrlKey){const before=el.scrollLeft;el.scrollLeft+=e.deltaY;if(el.scrollLeft!==before)e.preventDefault()}},{passive:false})}
let whoOv=null;
function openWho(i,from){const p=PEOPLE[i],ns=nightsFor(p);if(whoOv)closeWho(true);sfx.step();buzz(12);
 const ov=document.createElement("div");ov.className="whov";whoOv=ov;
 ov.innerHTML=`<div class="whos" role="dialog" aria-modal="true" aria-label="${esc(p.name)}"><button class="x" data-act="whoclose" aria-label="Close">${XI}</button>
 <div class="wmap"><svg viewBox="0 0 ${MAP_W} ${MAP_H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect x="-2000" y="-2000" width="5000" height="5000" class="sea"/><path class="land" d="${MAP_LAND}"/><g class="pin"><circle class="pr" r="9"/><circle class="pd" r="4.5"/></g></svg><span class="wplace cap">${esc(p.place)}</span></div>
 <div class="wbody"><span class="cap">${esc(p.y)} · ${esc(p.life)}</span><h2>${esc(p.name)}</h2><b class="wrole">${esc(p.role)}</b><p>${esc(p.bio)}</p>${ns.length?`<div class="wn">${ns.map(n=>`<div><span class="cap">Night ${n} · ${shortDate(n)}</span><b>${esc(NIGHTS[n-1].m)}</b></div>`).join("")}</div>`:""}</div></div>`;
 document.body.appendChild(ov);ov.addEventListener("click",e=>{if(e.target===ov)closeWho()});
 const s=ov.querySelector(".whos"),sr=s.getBoundingClientRect(),r=from?from.getBoundingClientRect():sr;ov._from=from;
 const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(!reduce)s.animate([{transform:`translate(${r.left-sr.left}px,${r.top-sr.top}px) scale(${r.width/sr.width},${r.height/sr.height})`,opacity:.5},{transform:"none",opacity:1}],{duration:460,easing:"cubic-bezier(.2,.85,.25,1)"});
 ov.animate([{opacity:0},{opacity:1}],{duration:260,fill:"forwards"});
 // the map starts wide and zooms in on the place, keeping the pin the same size on screen
 const svg=ov.querySelector(".wmap svg"),pin=ov.querySelector(".pin"),box=svg.getBoundingClientRect(),ar=box.width/Math.max(1,box.height),[px,py]=p.xy;
 const W0=MAP_W,W1=330,c0=[MAP_W*.55,MAP_H*.42];
 const set=k=>{const w=W0*Math.pow(W1/W0,k),h=w/ar,cx=c0[0]+(px-c0[0])*k,cy=c0[1]+(py-c0[1])*k;svg.setAttribute("viewBox",`${(cx-w/2).toFixed(2)} ${(cy-h/2).toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)}`);pin.setAttribute("transform",`translate(${px},${py}) scale(${(w/box.width).toFixed(4)})`)};
 set(reduce?1:0);if(reduce){pin.classList.add("drop");return}
 const t0=performance.now()+380,D=1300;const go=t=>{if(whoOv!==ov)return;const k=Math.min(1,Math.max(0,(t-t0)/D)),e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;set(e);if(k<1)requestAnimationFrame(go);else{pin.classList.add("drop");sfx.tap()}};requestAnimationFrame(go)}
function closeWho(now){const ov=whoOv;if(!ov)return;whoOv=null;const s=ov.querySelector(".whos"),from=ov._from;
 if(now||!from||!from.isConnected||matchMedia("(prefers-reduced-motion: reduce)").matches){ov.remove();return}
 const sr=s.getBoundingClientRect(),r=from.getBoundingClientRect();sfx.tap();
 s.animate([{transform:"none",opacity:1},{transform:`translate(${r.left-sr.left}px,${r.top-sr.top}px) scale(${r.width/sr.width},${r.height/sr.height})`,opacity:0}],{duration:320,easing:"cubic-bezier(.5,0,.75,0)",fill:"forwards"});
 ov.animate([{opacity:1},{opacity:0}],{duration:320,fill:"forwards"}).onfinish=()=>ov.remove()}
addEventListener("keydown",e=>{if(e.key==="Escape"&&whoOv)closeWho()});
