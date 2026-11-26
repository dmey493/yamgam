/* ===================== SOUND + FX ===================== */
let AC=null;
function tone(f,d,type,vol,when,slide){if(!S.sound)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime+(when||0);o.type=type||"triangle";o.frequency.setValueAtTime(f,t);if(slide)o.frequency.exponentialRampToValueAtTime(slide,t+d);g.gain.setValueAtTime(vol||.12,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d)}catch(e){}}
/* Festive sounds made in ElevenLabs (audio/sfx-*.mp3). Tried next to the page first, then the repo on GitHub.
   If a file has not loaded, the old synth beep plays instead. */
const SFX_BASES=["audio/","https://raw.githubusercontent.com/dmey493/yamgam/hark/Hark/audio/"],SFXB={};let sfxOn=false,finaleSrc=null;
function sfxLoad(){if(sfxOn)return;sfxOn=true;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)()}catch(e){return}
 ["bell","scurry","sparkle","finale"].forEach(n=>{const go=i=>{if(i>=SFX_BASES.length)return;fetch(SFX_BASES[i]+"sfx-"+n+".mp3").then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()}).then(b=>new Promise((ok,no)=>AC.decodeAudioData(b,ok,no))).then(buf=>{SFXB[n]=buf}).catch(()=>go(i+1))};go(0)})}
function sample(n,vol){if(!S.sound)return null;sfxLoad();const b=SFXB[n];if(!b||!AC)return null;try{if(AC.state==="suspended")AC.resume();const src=AC.createBufferSource(),g=AC.createGain();src.buffer=b;g.gain.value=vol||1;src.connect(g);g.connect(AC.destination);src.start();return src}catch(e){return null}}
const sfx={tap:()=>{sample("bell",.55)||tone(520,.07,"square",.05)},
 step:()=>{sample("scurry",.9)||(tone(660,.1),tone(880,.14,"triangle",.1,.08))},
 toot:()=>{sample("bell",.8)||(tone(392,.12,"sawtooth",.07),tone(523,.12,"sawtooth",.07,.12),tone(784,.3,"sawtooth",.08,.24))},
 burst:()=>{sample("sparkle")||([523,659,784,1047,1319].forEach((f,i)=>tone(f,.35,"triangle",.11,i*.07)),tone(90,.25,"sine",.25,0,40))},
 finale:()=>{sfx.hush();finaleSrc=sample("finale",.85);if(!finaleSrc)sfx.burst()},
 hush:()=>{if(finaleSrc){try{finaleSrc.stop()}catch(e){}finaleSrc=null}}};
sfxLoad();
const buzz=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};
const fx=$("#fx"),cx=fx.getContext("2d");let bits=[];
function sizeFx(){fx.width=innerWidth*devicePixelRatio;fx.height=innerHeight*devicePixelRatio}sizeFx();addEventListener("resize",sizeFx);
function burst(x,y,n){const cols=["#D7263D","#1F7A4D","#F4B942","#FFF8EC"];for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,sp=4+Math.random()*11;bits.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-6,r:Math.random()*6,vr:(Math.random()-.5)*.5,s:7+Math.random()*9,c:cols[i%4],k:i%3,life:1})}}
function star(c,s){c.beginPath();for(let i=0;i<10;i++){const r=i%2?s*.45:s,a=i*Math.PI/5;c.lineTo(Math.cos(a)*r,Math.sin(a)*r)}c.closePath();c.fill()}
function drawFx(){cx.clearRect(0,0,fx.width,fx.height);if(!bits.length)return;cx.save();cx.scale(devicePixelRatio,devicePixelRatio);bits=bits.filter(b=>b.life>0&&b.y<innerHeight+40);for(const b of bits){b.vy+=.42;b.vx*=.985;b.x+=b.vx;b.y+=b.vy;b.r+=b.vr;b.life-=.008;cx.save();cx.translate(b.x,b.y);cx.rotate(b.r);cx.globalAlpha=Math.min(1,b.life*2);cx.fillStyle=b.c;if(b.k===0)star(cx,b.s);else if(b.k===1)cx.fillRect(-b.s/2,-b.s/3,b.s,b.s*.66);else{cx.beginPath();cx.ellipse(0,0,b.s*.8,b.s*.4,0,0,7);cx.fill()}cx.restore()}cx.restore()}

/* ===================== HARK THE AARDVARK =====================
CHARACTER BRIEF
Role:        companion and cheerleader on the path and at the end of each night
Personality: eager, gentle, a bit proud of his trumpet nose
Base shape:  circle (friendly), stretched into one long snout
Silhouette:  very long snout + tall upright ears + Santa hat between them
Proportions: head about the size of the body, short legs, long tapering tail
Palette:     main #C9937A, light #EBC9B4, line #4A2F2A, accent berry #D7263D
Line:        3px dark brown, round joins
Moves by:    little hops, because the snout leads and the body bounces after
Reacts to:   poke, your finger (looks), finishing a night (cheer), being left alone (dozes)
*/
const HARK_SVG=`<ellipse class="hk-sh" cx="0" cy="2" rx="46" ry="7" fill="#000" opacity=".28"/>
<g class="hk-root"><g class="hk-tail1"><path d="M-30,-30 q-22,-4 -34,10" fill="none" stroke="#4A2F2A" stroke-width="15" stroke-linecap="round"/><path d="M-30,-30 q-22,-4 -34,10" fill="none" stroke="#C9937A" stroke-width="10" stroke-linecap="round"/>
<g class="hk-tail2"><path d="M-64,-20 q-12,10 -22,2" fill="none" stroke="#4A2F2A" stroke-width="10" stroke-linecap="round"/><path d="M-64,-20 q-12,10 -22,2" fill="none" stroke="#C9937A" stroke-width="5.5" stroke-linecap="round"/><circle cx="-86" cy="-18" r="4.5" fill="#F4B942" stroke="#4A2F2A" stroke-width="2"/></g>
<circle cx="-44" cy="-31" r="4" fill="#D7263D" stroke="#4A2F2A" stroke-width="2"/><circle cx="-57" cy="-25" r="4" fill="#1F7A4D" stroke="#4A2F2A" stroke-width="2"/></g>
<g class="hk-legB"><rect x="-26" y="-18" width="15" height="20" rx="7" fill="#B07E66" stroke="#4A2F2A" stroke-width="3"/></g>
<g class="hk-legF2"><rect x="12" y="-18" width="15" height="20" rx="7" fill="#B07E66" stroke="#4A2F2A" stroke-width="3"/></g>
<g class="hk-body"><ellipse cx="0" cy="-34" rx="36" ry="25" fill="#C9937A" stroke="#4A2F2A" stroke-width="3"/><ellipse cx="2" cy="-26" rx="22" ry="13" fill="#EBC9B4"/>
<g class="hk-legB2"><rect x="-16" y="-16" width="15" height="19" rx="7" fill="#C9937A" stroke="#4A2F2A" stroke-width="3"/></g>
<g class="hk-legF"><rect x="20" y="-16" width="15" height="19" rx="7" fill="#C9937A" stroke="#4A2F2A" stroke-width="3"/></g>
<g class="hk-head">
<g class="hk-earL"><path d="M18,-74 q-12,-34 4,-44 q10,14 8,42 z" fill="#B07E66" stroke="#4A2F2A" stroke-width="3" stroke-linejoin="round"/></g>
<path d="M22,-88 q8,-30 30,-24 q-4,12 2,22 z" fill="#D7263D" stroke="#4A2F2A" stroke-width="3" stroke-linejoin="round"/><circle cx="54" cy="-112" r="6" fill="#FFF8EC" stroke="#4A2F2A" stroke-width="3"/>
<g class="hk-earR"><path d="M38,-76 q-4,-36 14,-42 q8,16 2,42 z" fill="#C9937A" stroke="#4A2F2A" stroke-width="3" stroke-linejoin="round"/><path d="M42,-80 q-1,-22 9,-29 q3,12 0,28 z" fill="#EBC9B4"/></g>
<path d="M12,-60 a22,22 0 0 1 40,-12 q26,6 46,26 q8,9 -1,16 q-9,6 -18,-2 q-18,-12 -36,-8 a22,22 0 0 1 -31,-20 z" fill="#C9937A" stroke="#4A2F2A" stroke-width="3" stroke-linejoin="round"/>
<path d="M19,-86 q14,-8 30,-2 l2,8 q-16,-6 -30,2 z" fill="#FFF8EC" stroke="#4A2F2A" stroke-width="3" stroke-linejoin="round"/>
<ellipse cx="95" cy="-37" rx="5" ry="6" fill="#4A2F2A"/>
<g class="hk-eye"><circle cx="42" cy="-62" r="8" fill="#fff" stroke="#4A2F2A" stroke-width="2.5"/><g class="hk-pup"><circle cx="43" cy="-62" r="4.2" fill="#4A2F2A"/><circle cx="44.5" cy="-63.5" r="1.4" fill="#fff"/></g></g>
<path class="hk-lid" d="M34,-62 q8,7 16,0" fill="none" stroke="#4A2F2A" stroke-width="3" stroke-linecap="round" style="display:none"/>
<circle class="hk-cheek" cx="54" cy="-50" r="5" fill="#E98A7B" opacity=".7"/>
<path class="hk-mouth" d="M62,-40 q8,6 16,2" fill="none" stroke="#4A2F2A" stroke-width="2.5" stroke-linecap="round"/>
</g>
<path d="M4,-56 q14,10 30,6 l-2,10 q-16,4 -30,-6 z" fill="#D7263D" stroke="#4A2F2A" stroke-width="3" stroke-linejoin="round"/>
<g class="hk-scarf"><path d="M8,-48 l-4,22 l10,-2 l4,-18 z" fill="#D7263D" stroke="#4A2F2A" stroke-width="3" stroke-linejoin="round"/><path d="M5,-32 l10,-2" stroke="#FFF8EC" stroke-width="3"/></g>
</g></g>`;
const harks=[];
function makeHark(g,scale){g.innerHTML=HARK_SVG;const q=c=>g.querySelector(c);const h={g,scale:scale||1,t:Math.random()*9,blink:2,lid:0,mood:"idle",moodT:0,idle:0,y:0,vy:0,crouch:0,air:false,sq:{x:0,v:0},ear:{x:0,v:0},tail:{x:0,v:0},tail2:{x:0,v:0},scarf:{x:0,v:0},look:{x:0,y:0},tx:0,ty:0,p:{root:q(".hk-root"),body:q(".hk-body"),head:q(".hk-head"),earL:q(".hk-earL"),earR:q(".hk-earR"),t1:q(".hk-tail1"),t2:q(".hk-tail2"),pup:q(".hk-pup"),eye:q(".hk-eye"),lid:q(".hk-lid"),mouth:q(".hk-mouth"),scarf:q(".hk-scarf"),sh:q(".hk-sh"),legF:q(".hk-legF")}};harks.push(h);return h}
const spring=(o,target,k,d,dt)=>{o.v+=(target-o.x)*k*dt;o.v*=Math.exp(-d*dt);o.x+=o.v*dt};
function harkPoke(h){h.idle=0;h.sq.v=-5;h.mood="wow";h.moodT=.5;h.ear.v=260;sfx.toot();buzz(20)}
function harkCheer(h){h.idle=0;h.mood="happy";h.moodT=2.4;h.crouch=.14;h.hops=2}
const MOUTH={idle:"M62,-40 q8,6 16,2",happy:"M60,-42 q10,12 20,3",wow:"M66,-40 a4,4 0 1 0 8,0 a4,4 0 1 0 -8,0",sleep:"M64,-39 q6,2 12,0"};
function stepHark(h,dt){h.t+=dt;h.idle+=dt;if(h.moodT>0){h.moodT-=dt;if(h.moodT<=0)h.mood=h.mood==="wow"?"happy":"idle",h.moodT=h.mood==="happy"?1.2:0}
 if(h.mood==="idle"&&h.idle>14)h.mood="sleep";
 // jump with anticipation, stretch, squash
 let crouchS=0;if(h.crouch>0){h.crouch-=dt;crouchS=.2;if(h.crouch<=0){h.vy=-330;h.air=true}}
 if(h.air){h.vy+=1100*dt;h.y+=h.vy*dt;if(h.y>=0){h.y=0;h.air=false;h.sq.v=-4.2;h.ear.v=200;if(h.hops>1){h.hops--;h.crouch=.1}}}
 spring(h.sq,0,160,9,dt);const stretch=h.air?Math.min(.13,Math.abs(h.vy)/2600):0;const sy=1+h.sq.x*.12-crouchS+stretch+Math.sin(h.t*2.1)*.018,sx=1+(1-sy)*.7;
 const sleepy=h.mood==="sleep";
 spring(h.ear,sleepy?-22:(h.mood==="happy"?10:0)+Math.sin(h.t*1.3)*3,130,6,dt);
 spring(h.tail,Math.sin(h.t*(h.mood==="happy"?9:2.3))*(h.mood==="happy"?14:6)-h.vy*.02,120,6,dt);spring(h.tail2,h.tail.x*1.4,110,5,dt);spring(h.scarf,-h.vy*.05+Math.sin(h.t*1.7)*3,90,5,dt);
 h.look.x+=(h.tx-h.look.x)*Math.min(1,dt*8);h.look.y+=(h.ty-h.look.y)*Math.min(1,dt*8);
 h.blink-=dt;if(h.blink<=0){h.lid=.13;h.blink=1.5+Math.random()*3}if(h.lid>0)h.lid-=dt;
 const closed=sleepy||h.lid>0||h.mood==="happy"&&h.moodT>1.6;
 const p=h.p;p.root.setAttribute("transform",`translate(0,${h.y.toFixed(1)})`);
 p.body.setAttribute("transform",`translate(0,0) scale(${sx.toFixed(3)},${sy.toFixed(3)})`);
 p.head.setAttribute("transform",`rotate(${(h.look.y*5+(sleepy?10:0)+h.sq.x*3).toFixed(1)},22,-52)`);
 p.earL.setAttribute("transform",`rotate(${(h.ear.x-4).toFixed(1)},22,-76)`);p.earR.setAttribute("transform",`rotate(${(h.ear.x*.8+3).toFixed(1)},42,-78)`);
 p.t1.setAttribute("transform",`rotate(${h.tail.x.toFixed(1)},-30,-30)`);p.t2.setAttribute("transform",`rotate(${h.tail2.x.toFixed(1)},-64,-20)`);
 p.scarf.setAttribute("transform",`rotate(${h.scarf.x.toFixed(1)},10,-48)`);
 p.pup.setAttribute("transform",`translate(${(h.look.x*3).toFixed(1)},${(h.look.y*2.5).toFixed(1)})`);
 p.eye.style.display=closed?"none":"";p.lid.style.display=closed?"":"none";
 const m=MOUTH[h.mood]||MOUTH.idle;if(p.mouth.getAttribute("d")!==m)p.mouth.setAttribute("d",m);
 p.legF.setAttribute("transform",h.mood==="happy"&&!h.air?`rotate(${(Math.sin(h.t*14)*18-20).toFixed(1)},27,-14)`:"");
 const lift=Math.min(1,-h.y/90);p.sh.setAttribute("rx",(46-lift*16).toFixed(1));p.sh.setAttribute("opacity",(.28-lift*.14).toFixed(2))}
addEventListener("pointermove",e=>{for(const h of harks){const r=h.g.getBoundingClientRect();const dx=e.clientX-(r.left+r.width*.6),dy=e.clientY-(r.top+r.height*.4),d=Math.hypot(dx,dy)||1;h.tx=dx/d;h.ty=dy/d;if(h.mood==="sleep"){h.mood="wow";h.moodT=.4;h.idle=0}}},{passive:true});
let lastT=0;function loop(ts){const dt=Math.min(.033,(ts-lastT)/1000||0);lastT=ts;if(!document.hidden){for(let i=harks.length-1;i>=0;i--){if(!harks[i].g.isConnected)harks.splice(i,1);else stepHark(harks[i],dt)}drawFx();if(flow&&flow.tick)flow.tick(dt)}requestAnimationFrame(loop)}requestAnimationFrame(loop);

