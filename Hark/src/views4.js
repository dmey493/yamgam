/* ===================== VIEWS (v3: calendar board) ===================== */
const XI=`<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="3" stroke-linecap="square"/></svg>`;
const words=(t,step)=>{let i=0;return esc(t).split(" ").map(w=>`<span class="wd" style="--d:${(i++)*(step||26)}">${w}</span>`).join(" ")};
const CHECK=`<svg viewBox="0 0 24 24"><path d="M4 12.5l5.5 5.5L20 6.5" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="square"/></svg>`;
const WK=[["#D62828","#fff"],["#0F5C3F","#fff"],["#FFC83D","#141414"],["#1B2A4E","#fff"]];
const wkStyle=n=>{const c=WK[Math.min(3,weekNo(n)-1)];return `--wk:${c[0]};--wkfg:${c[1]}`};
function countUp(root){root.querySelectorAll("[data-to]").forEach(el=>{const to=+el.dataset.to,suf=el.dataset.suf||"",t0=performance.now();if(!to){el.textContent="0"+suf;return}const f=t=>{const k=Math.min(1,(t-t0)/600),e=1-Math.pow(1-k,3);el.textContent=Math.round(to*e)+suf;if(k<1)requestAnimationFrame(f);else el.classList.add("punch")};requestAnimationFrame(f)})}
const nd=n=>{const d=new Date(START);d.setDate(d.getDate()+n-1);return d};
const dom=n=>nd(n).getDate();
const mon=n=>nd(n).toLocaleDateString(undefined,{month:"short"});
const wd=n=>nd(n).toLocaleDateString(undefined,{weekday:"short"});
const longDate=n=>nd(n).toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"});
let busy=false;
function zoom(a,b,c1,c2,done){if(matchMedia("(prefers-reduced-motion:reduce)").matches||!document.body.animate){done&&done();return}busy=true;const z=document.createElement("div");z.style.cssText="position:fixed;z-index:55;left:0;top:0;width:100vw;height:100vh;transform-origin:0 0;pointer-events:none;will-change:transform";document.body.appendChild(z);
 const tf=r=>`translate(${r.left}px,${r.top}px) scale(${r.width/innerWidth},${r.height/innerHeight})`;
 z.animate([{transform:tf(a),background:c1,borderRadius:"48px"},{transform:tf(b),background:c2,borderRadius:"0px"}],{duration:460,easing:"cubic-bezier(.55,0,.1,1)",fill:"forwards"}).onfinish=()=>{done&&done();z.animate([{opacity:1},{opacity:0}],{duration:240,fill:"forwards"}).onfinish=()=>{z.remove();busy=false}}}
const FULL=()=>({left:0,top:0,width:innerWidth,height:innerHeight});
function enterNight(n,el){if(flow&&flow.auto)clearTimeout(flow.auto);if(busy)return;if(harks[0]){harks[0].crouch=.1;harks[0].mood="happy";harks[0].moodT=1}const tile=document.querySelector(`.door[data-n="${n}"]`)||el;tile.scrollIntoView({block:"nearest"});const r=tile.getBoundingClientRect();sfx.step();buzz(12);zoom(r,FULL(),getComputedStyle(tile).backgroundColor,"#0F5C3F",()=>startNight(n))}
function leaveNight(flip){if(busy)return;const n=flow.n,ne=document.querySelector(".night"),c=ne?getComputedStyle(ne).backgroundColor:"#0F5C3F";if(flip)render.flip=n;tab="home";closeFlow();const tile=document.querySelector(`.door[data-n="${n}"]`);if(!tile)return;tile.scrollIntoView({block:"center"});const r=tile.getBoundingClientRect();zoom(FULL(),r,c,tile.classList.contains("done")?getComputedStyle(tile).getPropertyValue("--wk").trim():getComputedStyle(tile).backgroundColor,()=>{const h=harks[0];if(h&&flip)harkCheer(h)})}
const dow=n=>{const d=new Date(START);d.setDate(d.getDate()+n-1);return d.toLocaleDateString(undefined,{weekday:"short"})+" "+d.getDate()};
const weekNo=n=>Math.max(1,UNITS.filter(u=>u.f<=n).length);
function statStrip(n){return ""}
function homeView(){const d=dayNum(),cur=tonight(),pre=d<1&&!S.preview;let meta,btn;
 if(pre){meta=`Starts Sunday, November 29 · ${1-d} day${1-d===1?"":"s"} to go`;btn=`<button class="btn white" data-act="preview">Peek at night 1</button>`}
 else if(S.done[cur]){meta=cur===27?"Merry Christmas":"Tonight is done · see you tomorrow";btn=`<button class="btn white" data-act="play" data-n="${cur}">Replay tonight</button>`}
 else{meta=`${longDate(cur)}`;btn=`<button class="btn white" data-act="play" data-n="${cur}">Start tonight</button>`}
 let h=`<div class="hero"><b class="ghost">${dom(cur)}</b><h1>Hark!</h1><span class="cap">${meta}</span>${btn}<svg viewBox="-104 -124 208 140" data-act="poke" aria-label="Hark the aardvark"><g id="hark-home" transform="scale(-1,1)"></g></svg></div>${statStrip(cur)}`;
 for(let ui=0;ui<4;ui++){const u=UNITS[ui],end=ui===3?27:UNITS[ui+1].f-1;
  if(ui>0&&!(S.wk[ui]&&dayNum()>=u.f)){const ready=dayNum()>=u.f; /* weeks unwrap on their first date only, even in preview */
   h+=`<section class="wk" style="${wkStyle(u.f)}"><button class="box${ready?" ready":""}" data-act="openweek" data-w="${ui}" data-ready="${ready?1:""}" aria-label="Week ${ui+1}, ${ready?"ready to unwrap":"not open yet"}"><i class="rv"></i><i class="rh"></i><i class="bow"></i><span class="cap">Week ${ui+1} · ${mon(u.f)} ${dom(u.f)} – ${mon(end)} ${dom(end)}</span><b>${ready?"Tap to unwrap":"Opens "+wd(u.f)+", "+mon(u.f)+" "+dom(u.f)}</b></button></section>`;continue}
  h+=`<section class="wk${render.unwrap===ui?" unwrapped":""}" style="${wkStyle(u.f)}"><header><h2>${esc(u.t)}</h2><span class="cap">${mon(u.f)} ${dom(u.f)} – ${mon(end)} ${dom(end)}</span></header><div class="grid">`;
  for(let n=u.f;n<=end;n++){const dn=S.done[n],op=unlocked(n),cls=dn?"done":n===cur&&op?"now":op?"open":"";h+=`<button class="door ${cls}${n===u.f||n===27?" w":""}${dn&&render.flip===n?" flip":""}${!dn&&op&&n<dayNum()&&!S.preview?" missed":""}" style="--i:${n-u.f}" data-act="stop" data-n="${n}" aria-label="${longDate(n)}${dn?", done":""}"><b>${dom(n)}</b>${dn?CHECK:""}<span class="cap">${n===cur&&op&&!dn?"Tonight":!dn&&op&&n<dayNum()&&!S.preview?"Missed":n===27?"Christmas Day":n===u.f?wd(n)+" · "+mon(n):wd(n)}</span></button>`}
  h+="</div></section>"}
 return h}
const cardHtml=(n,x)=>`<div class="card" style="${wkStyle(n)};--i:${n}"><span class="cap">${mon(n)} ${dom(n)} · ${esc(weekOf(n).t)}</span><div class="m">${esc(x.m)}</div><div class="c">${esc(x.v)}</div></div>`;
function collectionView(){let h=`<div class="page"><h1>Cards</h1><span class="cap">${doneCount()} of 27 collected</span><div class="cards">`;NIGHTS.forEach((x,i)=>{const n=i+1;h+=S.done[n]?cardHtml(n,x):`<div class="card locked" style="${wkStyle(n)};--i:${n}" aria-label="${longDate(n)}, not opened yet"><b>${dom(n)}</b><span class="cap">${wd(n)} · ${mon(n)}</span></div>`});return h+"</div></div>"}
function extrasView(){const hasU=!!(window.umade&&umade.notifications);
 const pl=S.prayers.length?S.prayers.map((p,i)=>`<div class="row" style="padding:10px 0;border-bottom:1px solid var(--line)"><div style="flex:1;font-weight:600"><span class="cap" style="color:var(--mute)">${mon(p.n)} ${dom(p.n)}${p.ans?" · answered":""}</span><br>${esc(p.text)}</div>${p.ans?"":`<button class="btn small line" data-act="answered" data-i="${i}">Answered</button>`}</div>`).join(""):`<p class="note" style="margin:0">Anything you write in the prayer step shows up here, so you can mark it answered later.</p>`;
 return `<div class="page"><h1>Extras</h1>
 <div class="sec" style="--sc:var(--red)"><h2>Nightly reminder</h2><div class="row"><input type="time" id="rtime" value="${esc(S.remind)}" aria-label="Reminder time"><button class="btn small" data-act="remind">Set</button><button class="btn small line" data-act="unremind">Off</button></div><p class="note" id="rnote">${hasU?"Hark will nudge you at this time each night.":"Reminders switch on when Hark! runs inside Umade."}</p></div>
 <div class="sec" style="--sc:var(--blue)"><h2>Prayer log</h2>${pl}</div>
 <div class="sec" style="--sc:var(--gold)"><h2>Timeline</h2><p class="note" style="margin:0 0 4px">Swipe or drag through 2,000 years. Tap someone to meet them.</p>${timelineStrip()}</div>
 <div class="sec" style="--sc:var(--green)"><h2>Settings</h2><div class="row"><button class="btn small ${S.sound?"":"line"}" data-act="sound">Sound ${S.sound?"on":"off"}</button><button class="btn small ${S.preview?"":"line"}" data-act="togglepreview">Preview all ${S.preview?"on":"off"}</button><button class="btn small line" data-act="reset">Start over</button></div><p class="note">${NIGHTS.filter(x=>x.t).length} of 27 nights have their full teaching. The rest have the verse, hymn and prayer for now.</p></div></div>`}
const TABS=[["home","Calendar"],["coll","Cards"],["more","Extras"]];
function render(){const app=$("#app");if(flow)return;
 if(!app.firstChild)app.innerHTML=`<div class="view"></div><div class="tabs"><i class="ind"></i>${TABS.map(([k,l])=>`<button class="tab cap" data-act="tab" data-k="${k}">${l}</button>`).join("")}</div>`;
 const view=app.querySelector(".view"),sc=view.scrollTop,keep=render.keep;render.keep=false;
 view.innerHTML=tab==="home"?homeView():tab==="coll"?collectionView():extrasView();if(tab==="more")setupTimeline();
 view.className="view"+(tab==="home"?" board":"")+(keep?"":" fresh swap");if(keep)view.scrollTop=sc;else view.scrollTop=0;
 const idx=TABS.findIndex(t=>t[0]===tab);app.querySelector(".ind").style.transform=`translateX(${idx*100}%)`;app.querySelectorAll(".tab").forEach((t,i)=>t.classList.toggle("on",i===idx));
 countUp(view);render.flip=0;render.unwrap=-1;
 const g=$("#hark-home");if(g)makeHark(g,-1);
 try{if(window.umade&&umade.widget){const n=tonight();umade.widget.update({title:"Hark!",value:"Night "+n,subtitle:NIGHTS[n-1].m})}}catch(e){}}

/* ===================== NIGHT FLOW ===================== */
const STEPS=["verse","idea","teach","hymn","prayer","gift"];
const LABEL={verse:"God's word first",idea:"Tonight's big idea",teach:"The teaching",hymn:"Sing together",prayer:"Pray",gift:"Tonight's door",done:"Done"};
function startNight(n){if(!unlocked(n))return;{const w=weekNo(Math.min(n,26))-1;if(w>0&&!S.wk[w]){for(let k=1;k<=w;k++)S.wk[k]=true;save()}}flow={n,step:0,x:NIGHTS[n-1]};renderFlow()}
function closeFlow(){if(flow&&flow.cleanup)flow.cleanup();flow=null;const el=$(".night");if(el)el.remove();render()}
function sentences(par){return par.match(/[^.!?]+[.!?]+["')]*\s*/g)||[par]}
function renderFlow(){if(flow.cleanup){flow.cleanup();flow.cleanup=null}flow.tick=null;const x=flow.x,st=flow.step,name=st>=STEPS.length?"done":STEPS[st];let el=$(".night");if(!el){el=document.createElement("div");el.className="night";document.body.appendChild(el)}
 let stage="",foot=`<button class="btn" data-act="next">Continue</button>`,label=`${Math.min(st+1,6)} / 6 · ${LABEL[name]}`;
 if(name==="verse")stage=`<div class="verse">${words(x.vt||"Open your Bible and read this passage aloud together.",22)}</div><span class="cap under">${esc(x.v)}${x.vt?" · KJV":""}</span>`;
 else if(name==="idea")stage=`<div class="idea">${words(x.m,60)}</div><span class="cap under">${esc(weekOf(flow.n).s)} · ${esc(weekOf(flow.n).t)}</span>`;
 else if(name==="teach"){if(x.t){const thing=/^the /.test(x.w);label=`3 / 6 · ${thing?"The original words":"In his own words"}`;let i=0;const html=x.t.map(p=>"<p>"+sentences(p).map(s=>`<span data-i="${i++}">${esc(s)}</span>`).join("")+"</p>").join("");stage=`<div class="who"><b>${esc(x.w.charAt(0).toUpperCase()+x.w.slice(1))}</b><button class="mini" data-act="back" aria-label="Back two sentences">Back</button><button class="mini" data-act="size" aria-label="Text size">Aa</button></div><div class="read" id="read" style="--fs:${S.fs}px">${html}</div><span class="cap under">${esc(x.c)}</span>`;foot=`<button class="btn line" data-act="playpause" id="pp">Play</button><button class="btn" data-act="next">Continue</button>`}else stage=`<div class="idea" style="font-size:32px">This teaching is still being prepared.</div><p class="ptext">Tonight, read ${esc(x.v)} again and talk about the big idea together.</p>`}
 else if(name==="hymn"){const hy=HYMNS[x.h];const pick=hy.v.length>2&&flow.n%2===0?[0,2]:[0,1];stage=`<div class="hymn"><h3>${words(hy.t,50)}</h3>${pick.map((k,i)=>`<span class="cap">Verse ${k+1}</span><p style="--i:${i}">${esc(hy.v[k])}</p>`).join("")}</div>`;foot=`<button class="btn" data-act="next">We sang it</button>`}
 else if(name==="prayer"){label=`5 / 6 · ${x.pt==="Ask"?"Pray · ask":"Pray · praise"}`;stage=`<svg class="flame" viewBox="0 0 44 64" aria-hidden="true"><path d="M22 4c3 12 14 16 14 28a14 14 0 0 1-28 0c0-8 6-12 8-18 2 4 4 5 4 5 0-6 0-10 2-15z" fill="#FFC83D"/><path d="M22 24c2 6 7 8 7 14a7 7 0 0 1-14 0c0-5 5-8 7-14z" fill="#fff"/><rect x="18" y="50" width="8" height="14" fill="#fff"/></svg><div class="pprompt">${words(x.pp,40)}</div>${x.pr?`<p class="ptext">${esc(x.pr)}</p>`:""}<textarea id="pnote" placeholder="Who or what did you pray for? (optional)"></textarea>`;foot=`<button class="btn" data-act="next">Amen</button>`}
 else if(name==="gift"){const mode=x.open||(flow.n%4===0?"shake":"tap");flow.mode=mode;flow.taps=0;flow.hold=0;flow.opened=false;const hint=mode==="hold"?"Press and hold the door":mode==="shake"?"Shake it open, or tap fast":"Tap the door three times";stage=`<div class="giftbox" id="gift" data-act="gift"><div class="gstage"><div class="frame" id="frame"><div class="leaf" id="leaf"><span class="cap">${wd(flow.n)} · ${mon(flow.n)}</span><b>${dom(flow.n)}</b></div></div><svg class="ghark" viewBox="-104 -124 208 140" aria-hidden="true"><g id="harkgift"></g></svg></div><span class="cap hint">${hint}</span>${mode==="hold"?`<div class="ring"><i id="ringi"></i></div>`:""}</div>`;foot=""}
 else{label=longDate(flow.n);stage=`<div class="done"><svg class="harkbig" viewBox="-112 -150 224 170" id="harkdone" data-act="pokedone"></svg><h2>${words(flow.n<27?"Goodnight.":"Merry Christmas.",90)}</h2>${statStrip(flow.n)}</div>`;foot=`<button class="btn" data-act="finish">Back to the calendar</button>`}
 el.className="night t-"+name;
 el.innerHTML=`<div class="in"><div class="bar"><button class="x" data-act="close" aria-label="Close">${XI}</button><div class="seg">${STEPS.map((_,i)=>`<i class="${i<=st?"on":""}${i===st?" cur":""}"></i>`).join("")}</div></div><div class="step cap"><span>${label}</span>${name==="gift"||name==="done"?"":`<svg class="hk" viewBox="-104 -124 208 140" aria-hidden="true"><g id="harkstep" transform="scale(-1,1)"></g></svg>`}</div><div class="stage">${stage}</div>${foot?`<div class="foot">${foot}</div>`:""}</div>`;
 {const g=$("#harkstep");if(g){const h=makeHark(g,-1);h.calm=name==="prayer";if(name==="hymn"){h.mood="happy";h.moodT=600;h.sing=true}else if(name==="idea"){h.mood="happy";h.moodT=1.6}h.y=-70;h.air=true;h.vy=0;flow.shark=h}}
 if(name==="teach"&&x.t)setupReader();if(name==="gift")setupGift();if(name==="done"){countUp(el);const h=makeHark($("#harkdone"),1);flow.hark=h;h.mood="happy";h.moodT=4;const hd=el.querySelector(".done h2");sfx.finale((k,str,last)=>{if(!flow||flow.hark!==h)return;h.idle=0;h.mood="happy";h.moodT=1.2;h.crouch=0;h.hops=0;h.vy=last?-430:-231;h.air=true;h.sq.v=-2.5-3*str;h.ear.v=180+120*str;if(hd){hd.style.setProperty("--bs",(1.05+.1*str).toFixed(3));hd.classList.remove("beat");void hd.offsetWidth;hd.classList.add("beat")}burst(k%2?innerWidth*.86:innerWidth*.14,innerHeight*.32,Math.round(10+28*str));buzz(last?[40,30,80]:12+20*str);if(last){burst(innerWidth/2,innerHeight*.42,130);rumble(.6)}})}}
function setupReader(){const spans=[...document.querySelectorAll("#read span")];const dur=spans.map(s=>Math.max(1.1,s.textContent.trim().split(/\s+/).length/2.5));let i=-1,left=0,playing=false,lock=null;const srcs=[].concat(flow.x.audio||[]);let si=0;const audio=srcs.length?new Audio(srcs[0]):null;if(audio){audio.addEventListener("error",()=>{if(++si<srcs.length){const t=audio.currentTime||0;audio.src=srcs[si];audio.load();if(t)audio.currentTime=t;if(playing)audio.play().catch(()=>{})}})}const cues=flow.x.cues;const sync=!!(audio&&cues&&cues.length===spans.length);if(audio)audio.preload="auto";
 const show=()=>{spans.forEach((s,k)=>{s.classList.toggle("cur",k===i);s.classList.toggle("past",k<i)});if(spans[i])spans[i].scrollIntoView({block:"center",behavior:"smooth"});if(flow.shark){flow.shark.sq.v=-1.6;flow.shark.ear.v=90}const rp=$("#rpi");if(rp)rp.style.width=Math.round((i+1)/spans.length*100)+"%"};
 const set=p=>{playing=p;const b=$("#pp");if(b)b.innerHTML=p?`<span class="eq"><i></i><i></i><i></i></span>Pause`:(i>=spans.length-1&&i>=0?"Again":"Play");if(audio){p?audio.play().catch(()=>{}):audio.pause()}if(p&&navigator.wakeLock&&!lock)navigator.wakeLock.request("screen").then(l=>lock=l).catch(()=>{});if(!p&&lock){lock.release().catch(()=>{});lock=null}};
 flow.reader={toggle(){if(!playing&&i>=spans.length-1){i=-1;left=0;if(audio)audio.currentTime=0}set(!playing)},back(){i=Math.max(-1,i-2);left=0;if(sync)audio.currentTime=i<0?0:cues[i];show()}};
 flow.tick=dt=>{if(!playing)return;if(sync&&!(audio.error&&si>=srcs.length-1)){if(audio.ended){i=spans.length-1;show();set(false);sfx.toot();if(flow.shark)harkCheer(flow.shark);return}let k=-1;const t=audio.currentTime;while(k+1<cues.length&&cues[k+1]<=t)k++;if(k!==i){i=k;show()}return}left-=dt;if(left<=0){i++;if(i>=spans.length){i=spans.length-1;set(false);sfx.toot();if(flow.shark)harkCheer(flow.shark);return}left=dur[i];show()}};
 flow.cleanup=()=>{set(false);if(audio)audio.pause()}}
function rumble(k,cls){const el=$(".night .in");if(!el)return;el.style.setProperty("--amp",(3+11*k).toFixed(1)+"px");el.classList.remove("shake","quake");void el.offsetWidth;el.classList.add(cls||"shake")}
function setupGift(){const leaf=$("#leaf"),frame=$("#frame"),hk=makeHark($("#harkgift"),1);hk.tx=1;hk.ty=-.2;flow.ghark=hk;const need=()=>flow.mode==="shake"?5:3;
 const progress=()=>{flow.taps++;const k=flow.taps/need();sample("bell",.5+k*.5)||tone(180+k*220,.18,"sawtooth",.08);buzz([25+35*k,25,25+45*k]);rumble(k);leaf.style.transform=`rotateY(${-k*46}deg)`;frame.classList.remove("bump");void frame.offsetWidth;frame.classList.add("bump");const r=frame.getBoundingClientRect();burst(r.right-6,r.top+r.height/2,Math.round(8+16*k));hk.idle=0;hk.sq.v=-5;hk.ear.v=320;hk.mood="wow";hk.moodT=.7;if(flow.taps===need()-1)hk.crouch=.2;if(flow.taps>=need())openGift()};
 flow.giftTap=()=>{if(flow.opened)return;if(flow.mode!=="hold")progress()};
 let down=false,tick=0;const el=$("#gift");const dn=()=>{down=true},up=()=>{down=false};el.addEventListener("pointerdown",dn);addEventListener("pointerup",up);addEventListener("pointercancel",up);
 let lastShake=0;const mo=e=>{const a=e.accelerationIncludingGravity;if(!a||flow.opened||flow.mode!=="shake")return;const m=Math.abs(a.x||0)+Math.abs(a.y||0)+Math.abs(a.z||0);const now=Date.now();if(m>32&&now-lastShake>280){lastShake=now;progress()}};addEventListener("devicemotion",mo);
 flow.tick=dt=>{if(flow.opened||flow.mode!=="hold")return;flow.hold=Math.max(0,flow.hold+(down?dt:-dt*1.5));const k=flow.hold/1.4,r=$("#ringi");if(r)r.style.width=Math.min(100,k*100)+"%";leaf.style.transform=`rotateY(${-k*46}deg)`;frame.style.transform=down?`translate(${(Math.random()-.5)*k*12}px,${(Math.random()-.5)*k*12}px)`:"";if(down){tick+=dt;if(tick>.14){tick=0;buzz(12+k*25);sample("bell",.2+k*.4)||tone(140+k*260,.08,"sawtooth",.05);hk.sq.v=-2-k*3;hk.mood="wow";hk.moodT=.3}}if(flow.hold>=1.4)openGift()};
 flow.cleanup=()=>{removeEventListener("devicemotion",mo);removeEventListener("pointerup",up);removeEventListener("pointercancel",up)}}
function openGift(){if(flow.opened)return;flow.opened=true;flow.tick=null;const x=flow.x,n=flow.n,leaf=$("#leaf"),frame=$("#frame"),hk=flow.ghark;frame.style.animation="none";
 const r=frame.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
 // 1. Hark blows his trumpet, everything rumbles
 sfx.toot();if(hk){hk.mood="happy";hk.moodT=3;harkCheer(hk)}rumble(1,"quake");buzz([30,30,30,30,40,30,60,40,180]);if(!SFXB.sparkle)tone(70,.9,"sine",.3,0,35);
 // 2. the door is blown off its hinge
 setTimeout(()=>{leaf.classList.add("blast");const fl=document.createElement("div");fl.className="flash";document.body.appendChild(fl);setTimeout(()=>fl.remove(),600);sfx.burst();burst(cx,cy,140);setTimeout(()=>{burst(0,innerHeight*.7,50);burst(innerWidth,innerHeight*.7,50)},180)},420);
 S.done[n]=true;save();
 // 3. the card lands, Hark celebrates beside it
 setTimeout(()=>{if(!flow||flow.n!==n)return;rumble(.5);buzz(60);$(".night .step").innerHTML="<span>Behind tonight's door</span>";$(".night .stage").innerHTML=`<div class="prize"><svg class="phark" viewBox="-112 -150 224 170" aria-hidden="true" id="harkprize" data-act="pokedone"></svg>${cardHtml(n,x)}</div>`;const h=makeHark($("#harkprize"),1);flow.hark=h;setTimeout(()=>harkCheer(h),150);flow.auto=setTimeout(()=>{if(flow&&flow.n===n&&STEPS[flow.step]==="gift")nextStep()},2600)},1050)}
/* Hark carries you from one step to the next. Each step change has its own move. */
const NEXT={idea:["run",-1,"#D62828",620],teach:["page",-1,"#FFF4DC",700],hymn:["drop",0,"#FFC83D",640],prayer:["run",1,"#1B2A4E",900],gift:["run",-1,"#D62828",480]};
function transit(name,swap){const t=NEXT[name];if(!t||matchMedia("(prefers-reduced-motion:reduce)").matches||!document.body.animate){swap();return}
 busy=true;const [kind,dir,col,ms]=t,W=innerWidth,H=innerHeight;
 const c=document.createElement("div");c.className="curtain";c.style.background=col;document.body.appendChild(c);
 const r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("class","runner");r.setAttribute("viewBox","-104 -124 208 140");r.innerHTML=`<g ${dir<0?'transform="scale(-1,1)"':""}></g>`;document.body.appendChild(r);
 const h=makeHark(r.firstChild,dir<0?-1:1);h.run=name==="prayer"?13:24;h.mood="happy";h.moodT=1.5;
 const ease="cubic-bezier(.6,0,.25,1)";let ca,ra;
 if(kind==="run"){ca=c.animate([{transform:`translateX(${-dir*100}%)`},{transform:"none"}],{duration:ms,easing:ease,fill:"forwards"});
  const from=dir<0?W-40:-170,to=dir<0?-230:W+40;r.style.top=(H*.56)+"px";ra=r.animate([{transform:`translateX(${from}px)`},{transform:`translateX(${to}px)`}],{duration:ms+260,easing:"cubic-bezier(.45,0,.4,1)",fill:"forwards"})}
 else if(kind==="page"){c.style.transformOrigin="right center";ca=c.animate([{transform:"perspective(1400px) rotateY(-96deg)",filter:"brightness(.7)"},{transform:"perspective(1400px) rotateY(0deg)",filter:"brightness(1)"}],{duration:ms,easing:"cubic-bezier(.5,0,.2,1)",fill:"forwards"});
  r.style.top=(H*.7)+"px";ra=r.animate([{transform:`translateX(${W-30}px)`},{transform:"translateX(-230px)"}],{duration:ms+200,easing:"cubic-bezier(.5,0,.4,1)",fill:"forwards"})}
 else{ca=c.animate([{transform:"translateY(-100%)"},{transform:"translateY(3%)",offset:.8},{transform:"none"}],{duration:ms,easing:"cubic-bezier(.5,0,.3,1)",fill:"forwards"});
  r.style.top="0px";h.run=0;h.mood="wow";ra=r.animate([{transform:`translate(${W/2-90}px,-140px)`},{transform:`translate(${W/2-90}px,${H*.78}px)`,offset:.8},{transform:`translate(${W/2-90}px,${H+60}px)`}],{duration:ms+240,easing:"cubic-bezier(.5,0,.3,1)",fill:"forwards"})}
 let k=0;const pat=setInterval(()=>{if(!SFXB.scurry)tone(260+(k++%2)*90,.035,"square",.035)},name==="prayer"?170:85);buzz(name==="prayer"?[8,160,8,160,8,160,8]:[8,70,8,70,8,70,8,70,8]);if(!SFXB.scurry)tone(520,.35,"sine",.05,0,180);
 ca.onfinish=()=>{swap();c.remove()};
 ra.onfinish=()=>{clearInterval(pat);r.remove();busy=false}}
function nextStep(){if(busy)return;const name=STEPS[flow.step]||"done";if(name==="prayer"){const t=($("#pnote")||{}).value;if(t&&t.trim()){S.prayers.push({n:flow.n,text:t.trim(),ans:false});save()}}sfx.step();const nx=STEPS[flow.step+1]||"done";if(flow.shark){flow.shark.crouch=.12}transit(nx,()=>{flow.step++;renderFlow()})}

/* ===================== EVENTS ===================== */
document.addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(!t)return;const a=t.dataset.act;if(a==="who"){const tl=t.closest(".tlx");if(tl&&performance.now()-(tl._dragT||0)<300)return;openWho(+t.dataset.i,t);return}if(a==="whoclose"){closeWho();return}
 if(a==="tab"){tab=t.dataset.k;sfx.tap();render()}
 else if(a==="play"||a==="stop"){const n=+t.dataset.n;if(unlocked(n)){enterNight(n,t)}else{sfx.tap();t.classList.remove("nope");void t.offsetWidth;t.classList.add("nope");const h=harks[0];if(h){h.mood="wow";h.moodT=.5}}}
 else if(a==="openweek"){const w=+t.dataset.w;if(!t.dataset.ready){sfx.tap();buzz(20);t.classList.remove("nope");void t.offsetWidth;t.classList.add("nope");return}
   if(busy)return;busy=true;t.classList.add("burst");sfx.toot();buzz([30,30,30,30,60,40,140]);const vw=$(".view");vw.classList.remove("shake");void vw.offsetWidth;vw.style.setProperty("--amp","9px");vw.classList.add("quake");const r=t.getBoundingClientRect();
   setTimeout(()=>{sfx.burst();burst(r.left+r.width/2,r.top+r.height/2,120);S.wk[w]=true;save();render.keep=true;render.unwrap=w;render();busy=false;const h=harks[0];if(h)harkCheer(h)},520)}
 else if(a==="preview"){S.preview=true;save();render.keep=true;render();enterNight(1,t)}
 else if(a==="poke"){if(harks[0])harkPoke(harks[0])}
 else if(a==="pokedone"){if(flow&&flow.hark)harkPoke(flow.hark)}
 else if(a==="close"){leaveNight(false)}
 else if(a==="next"){if(flow&&STEPS[flow.step]==="hymn"){const r=t.getBoundingClientRect();burst(r.left+r.width/2,r.top,26)}nextStep()}
 else if(a==="playpause"){flow.reader&&flow.reader.toggle()}
 else if(a==="back"){flow.reader&&flow.reader.back()}
 else if(a==="size"){S.fs=S.fs>=26?18:S.fs+2;save();const r=$("#read");if(r)r.style.setProperty("--fs",S.fs+"px")}
 else if(a==="gift"){flow.giftTap&&flow.giftTap()}
 else if(a==="finish"){leaveNight(true)}
 else if(a==="sound"){S.sound=!S.sound;save();render.keep=true;render();sfx.step()}
 else if(a==="togglepreview"){S.preview=!S.preview;save();render.keep=true;render()}
 else if(a==="answered"){const p=S.prayers[+t.dataset.i];if(p){p.ans=true;save();const r=t.getBoundingClientRect();burst(r.left+r.width/2,r.top,40);sfx.burst();render.keep=true;render()}}
 else if(a==="reset"){if(t.dataset.sure){S.done={};S.prayers=[];S.preview=false;save();tab="home";render()}else{t.dataset.sure=1;t.textContent="Tap again to erase"}}
 else if(a==="remind"||a==="unremind"){const note=$("#rnote");try{if(!(window.umade&&umade.notifications)){note.textContent="Reminders switch on when Hark! runs inside Umade.";return}
   if(a==="unremind"){umade.notifications.cancel("hark-nightly");note.textContent="Reminder is off.";return}
   S.remind=$("#rtime").value||"19:45";save();Promise.resolve(umade.notifications.schedule({id:"hark-nightly",title:"Hark!",body:"Tonight's gift is waiting.",time:S.remind,days:["mon","tue","wed","thu","fri","sat","sun"]})).then(()=>{note.textContent="Set for "+S.remind+" every night."}).catch(()=>{note.textContent="Could not set the reminder. Check notification permission."})}catch(err){note.textContent="Could not set the reminder."}}
});
document.addEventListener("pointerdown",e=>{const t=e.target.closest(".btn,.door,.tab,.mini");if(!t)return;const r=t.getBoundingClientRect(),d=Math.max(r.width,r.height)*2.2,s=document.createElement("span");s.className="rip";s.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;t.appendChild(s);setTimeout(()=>s.remove(),520)},{passive:true});
render();
</script>
</body>
</html>
