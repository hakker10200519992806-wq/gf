/* Ikki maqsad (yo'nalish): "Kali terminal" va "Python (noldan)".
   Birinchi kirishda bittasi tanlanadi; ⋮ menyudan yoki Darslar ichidan istalgan payt
   ikkinchisiga o'tish mumkin. Tanlov (S.trk) va ikkala yo'nalishdagi progress (S.l)
   xotirada saqlanadi. Darslar massivi D joyida almashtiriladi, shuning uchun qolgan
   hamma bo'lim (qidiruv, test, kartalar, "Bugungi buyruq") avtomatik moslashadi. */
(function(){
if(typeof D==='undefined'||typeof S==='undefined')return;
const isPy=c=>/^Python/i.test(c||''),ALL=D.slice(),KALI=ALL.filter(x=>!isPy(x.c));
const CATORDER=['Python','Python asoslari','Python: Tarmoq','Python: Veb xavfsizlik',
  'Python: Wi-Fi','Python: Wi-Fi — kengaytirilgan',
  'Python: Bluetooth','Python: Bluetooth — kengaytirilgan',
  'Python: Signallar (SDR)','Python: Signallar (SDR) — kengaytirilgan',
  'Python: IoT va GPS',
  'Python: Pentest asboblari','Python: Pentest qurilmalari','Python: Xavfsizlik dasturlari',
  'Python: Himoya avtomatlashtirish',
  'Python: Professional dasturchi','Python: Tezlik va integratsiya','Python: Professional yakuniy loyiha',
  'Python: GUI avtomatlashtirish','Python: Oynalarni boshqarish',
  'Python: Loyihalar','Python: Yakuniy loyiha'];
const ord=c=>{const i=CATORDER.indexOf(c);return i<0?CATORDER.length:i};
const PY=ALL.map((x,i)=>[x,i]).filter(a=>isPy(a[0].c)).sort((a,b)=>ord(a[0].c)-ord(b[0].c)||a[1]-b[1]).map(a=>a[0]);
window.PYD=PY;
const NAME={kali:'Kali terminal',py:'Python (noldan)'},TITLE={kali:'Kali Terminal Maktabi',py:'Kali: Python Maktabi'};
const cur=()=>S.trk==='py'?'py':'kali';
const sv=()=>{try{save()}catch(e){}};
function counts(){const n=new Set(D.map(x=>x.n));return S.l.filter(x=>n.has(x)).length}
/* progress: faqat joriy yo'nalish darslari bo'yicha */
window.prog=function(){const t=D.length+CH.length,n=counts()+S.c.length;$('#pb').style.width=Math.min(100,100*n/t)+'%';$('#pt').textContent=`Darslar ${counts()}/${D.length} · Mashqlar ${S.c.length}/${CH.length}`};
function apply(t){D.splice(0,D.length,...(t==='py'?PY:KALI));
try{cat='Hammasi';qry=''}catch(e){}try{Q=null;FC=null;FB=false}catch(e){}
const h=document.querySelector('.hd h1');if(h)h.textContent=TITLE[t];
document.querySelectorAll('[data-trk]').forEach(b=>b.classList.toggle('on',b.dataset.trk===t));
try{prog()}catch(e){}}
function rerender(){try{document.body.dataset.v='l'}catch(e){}const b=document.querySelector('.tabs button[data-t="l"]');b&&b.click()}
const HELLO={kali:["Zo'r tanlov! Kali terminalni birga o'rganamiz. Birinchi darsdan boshlang 🐧","Kali terminal yo'nalishi tanlandi. Men yoningizdaman!"],
py:["Ajoyib! Pythonni noldan, Kali Linux'da o'rganamiz 🐍","Python yo'nalishi tanlandi. Qadam-baqadam boramiz!"]};
function choose(t,first){if(!first&&t===cur()&&S.trk)return;S.trk=t;sv();apply(t);rerender();
try{if(window.RBX&&!RBX.hid)RBX.say(HELLO[t][first?0:1],'happy',4200)}catch(e){}}
/* Darslar ichidagi tezkor almashtirgich */
const rowHTML=()=>`<div class="trk">${['kali','py'].map(k=>`<button type="button" class="b${cur()===k?' on':''}" data-trk="${k}">${k==='py'?'🐍':'🐧'} ${NAME[k]}</button>`).join('')}</div>`;
const L0=window.lessons;
if(typeof L0==='function')window.lessons=function(){const r=L0.apply(this,arguments);try{const p=document.getElementById('pane');if(p&&!p.querySelector('.trk'))p.insertAdjacentHTML('afterbegin',rowHTML())}catch(e){}return r};
const st=document.createElement('style');
st.textContent=`.trk{display:flex;gap:8px;margin:0 0 12px;flex-wrap:wrap}.trk .b{flex:1;min-width:130px;font-weight:600}
#kmm-p .trk{margin:0 0 8px}
#trk-ov{position:fixed;inset:0;z-index:2147483000;background:rgba(6,16,29,.94);display:flex;align-items:center;justify-content:center;padding:18px;box-sizing:border-box;overflow:auto}
#trk-ov .tc{background:var(--cd,#121b2e);color:var(--tx,#e6ecf8);border:1px solid var(--ln,#26324d);border-radius:16px;max-width:460px;width:100%;padding:20px;box-sizing:border-box}
#trk-ov h2{margin:0 0 6px;font-size:21px}#trk-ov p{margin:0 0 14px;color:var(--mu,#9fb0cf);font-size:14px;line-height:1.45}
#trk-ov .opt2{display:block;width:100%;text-align:left;margin:0 0 10px;padding:14px;border-radius:12px;border:1px solid var(--ln,#26324d);background:rgba(120,150,255,.08);color:inherit;font:inherit;cursor:pointer;min-height:64px}
#trk-ov .opt2:active{background:rgba(120,150,255,.22)}#trk-ov .opt2 b{display:block;font-size:17px;margin-bottom:3px}#trk-ov .opt2 span{font-size:13px;color:var(--mu,#9fb0cf)}
#trk-ov small{display:block;color:var(--mu,#9fb0cf);font-size:12px;line-height:1.4;margin-top:4px}`;
document.head.appendChild(st);
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-trk]');if(!b)return;e.preventDefault();choose(b.dataset.trk,false)},true);
/* birinchi kirishdagi tanlov */
function overlay(){if(S.trk||document.getElementById('trk-ov'))return;const o=document.createElement('div');o.id='trk-ov';o.setAttribute('role','dialog');o.setAttribute('aria-label','Maqsadni tanlang');
o.innerHTML=`<div class="tc"><h2>Maqsadingizni tanlang</h2><p>Kali Linux'da nimani o'rganmoqchisiz? Robot ikkalasida ham yordam beradi.</p>
<button type="button" class="opt2" data-pick="kali"><b>🐧 Kali terminal bilan ishlash</b><span>Buyruqlar: fayllar, matn, tizim, tarmoq, xavfsizlik — simulyatorda sinab ko'rasiz</span></button>
<button type="button" class="opt2" data-pick="py"><b>🐍 Python (noldan)</b><span>Dasturlashni Kali Linux'da noldan boshlab, tarmoq va xavfsizlik skriptlarigacha</span></button>
<small>Keyin ⋮ menyudan yoki Darslar ichidan istalgan payt ikkinchisiga o'tishingiz mumkin — ikkalasidagi progress saqlanadi.</small></div>`;
o.addEventListener('click',e=>{const b=e.target.closest('[data-pick]');if(!b)return;o.remove();choose(b.dataset.pick,true)});document.body.appendChild(o)}
/* ⋮ menyuga "Yo'nalish" bo'limi */
let tries=0;function menu(){const pn=document.getElementById('kmm-p');if(!pn){if(tries++<40)setTimeout(menu,250);return}
if(pn.querySelector('.trk'))return;const h=document.createElement('h4');h.textContent="Yo'nalish";const d=document.createElement('div');d.innerHTML=rowHTML();pn.prepend(d.firstChild);pn.prepend(h)}
apply(cur());try{rerender()}catch(e){}
const start=()=>{overlay();menu()};document.readyState==='complete'?start():addEventListener('load',start);
})();
