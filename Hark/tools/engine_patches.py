engine=engine.replace('const m=MOUTH[h.mood]||MOUTH.idle;','const m=h.sing?(Math.sin(h.t*7)>0?MOUTH.wow:MOUTH.happy):(MOUTH[h.mood]||MOUTH.idle);')
engine=engine.replace('p.sh.setAttribute("opacity",(.28-lift*.14).toFixed(2))}','p.sh.setAttribute("opacity",(.28-lift*.14).toFixed(2));if(h.run){const q=h.q||(h.q={a:h.g.querySelector(".hk-legF"),b:h.g.querySelector(".hk-legB2"),c:h.g.querySelector(".hk-legF2"),d:h.g.querySelector(".hk-legB")}),s=Math.sin(h.t*h.run)*32;q.a.setAttribute("transform",`rotate(${s.toFixed(1)},27,-14)`);q.b.setAttribute("transform",`rotate(${(-s).toFixed(1)},-8,-14)`);q.c.setAttribute("transform",`rotate(${(-s).toFixed(1)},19,-16)`);q.d.setAttribute("transform",`rotate(${s.toFixed(1)},-18,-16)`);h.y=-Math.abs(Math.sin(h.t*h.run))*8;h.idle=0}}')
assert 'h.run' in engine
engine=engine.replace('h.tx=dx/d;','h.tx=dx/d*(h.scale<0?-1:1);')
engine=engine.replace('const sleepy=h.mood==="sleep";','const sleepy=h.mood==="sleep"||h.calm;')
engine=engine.replace('if(h.mood==="idle"&&h.idle>14)h.mood="sleep";','if(h.mood==="idle"&&h.idle>14&&!h.calm)h.mood="sleep";')
engine=engine.replace('const cols=["#D7263D","#1F7A4D","#F4B942","#FFF8EC"]','const cols=["#FFFFFF","#0F5C3F","#FFE39A","#141414"]').replace('c:cols[i%4]','c:cols[i%4]')
