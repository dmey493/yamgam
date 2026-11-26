/* ===================== STATE ===================== */
const KEY="hark-v2";
let S={done:{},wk:{},prayers:[],sound:true,preview:false,remind:"19:45",fs:20};
try{const r=localStorage.getItem(KEY);if(r)S=Object.assign(S,JSON.parse(r))}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
let tab="home",flow=null;
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const dayNum=()=>{const t=new Date();t.setHours(0,0,0,0);return Math.round((t-START)/864e5)+1};
const unlocked=n=>S.preview||n===1||n<=dayNum(); /* night 1 is always open so it can be tried early */
const nightDate=n=>{const d=new Date(START);d.setDate(d.getDate()+n-1);return d.toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric"})};
const doneCount=()=>Object.keys(S.done).length;
function streak(){let last=0;for(let n=27;n>=1;n--)if(S.done[n]){last=n;break}let c=0;for(let n=last;n>=1&&S.done[n];n--)c++;return c}
function nextOpen(){for(let n=1;n<=27;n++)if(!S.done[n])return n;return 27}
function tonight(){const d=dayNum();if(S.preview)return nextOpen();return Math.max(1,Math.min(d,27))}
