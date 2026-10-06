function wk(){return document.body.dataset.wk||('bbv2-'+(document.body.dataset.week||'01'))}
function allBoxes(){return [...document.querySelectorAll('.chk input')]}
function dayBoxes(d){return [...document.querySelectorAll('#body-'+d+' .chk input')]}
function save(){const o={};allBoxes().forEach(c=>o[c.id]=c.checked);const open=[...document.querySelectorAll('.day.open')].map(x=>x.id);try{localStorage.setItem(wk(),JSON.stringify({o,open}))}catch(e){}paint()}
function load(){try{const s=JSON.parse(localStorage.getItem(wk())||'{}');const o=s.o||s;allBoxes().forEach(c=>{c.checked=!!o[c.id];const li=c.closest('li');if(li)li.classList.toggle('done',c.checked)});(s.open||[]).forEach(id=>{const e=document.getElementById(id);if(e)e.classList.add('open')})}catch(e){}if(!document.querySelector('.day.open')){const f=document.querySelector('.day');if(f)f.classList.add('open')}paint()}
function paint(){const all=allBoxes();const d=all.filter(c=>c.checked).length;const p=all.length?Math.round(d/all.length*100):0;document.querySelectorAll('#bar').forEach(b=>b.style.width=p+'%');document.querySelectorAll('#pct').forEach(e=>e.textContent=p+'% ('+d+'/'+all.length+')');document.querySelectorAll('.day').forEach(x=>{const n=x.dataset.day;const boxes=dayBoxes(n);const dd=boxes.filter(c=>c.checked).length;const pp=boxes.length?Math.round(dd/boxes.length*100):0;const b=x.querySelector('.dbar>i');if(b)b.style.width=pp+'%';const t=x.querySelector('.dpct');if(t)t.textContent=pp+'%'});const bn=document.getElementById('doneBanner');if(bn)bn.style.display=(p===100&&all.length)?'block':'none';const eb=document.getElementById('expandBtn');if(eb){const anyClosed=[...document.querySelectorAll('.day')].some(x=>!x.classList.contains('open'));eb.textContent=anyClosed?'Expand':'Collapse'}}
function toggleDay(id){document.getElementById(id).classList.toggle('open');save()}
function toggleExpandAll(){const days=[...document.querySelectorAll('.day')];const anyClosed=days.some(x=>!x.classList.contains('open'));days.forEach(x=>x.classList.toggle('open',anyClosed));save()}
function expandAll(){toggleExpandAll()}
function collapseAll(){document.querySelectorAll('.day').forEach(x=>x.classList.remove('open'));save()}
function resetWeek(){if(confirm('Reset all ticks for this week?')){localStorage.removeItem(wk());load()}}
function resetDay(n){if(confirm('Reset Day '+n+'?')){dayBoxes(n).forEach(c=>{c.checked=false;const li=c.closest('li');if(li)li.classList.remove('done')});save()}}
function copyDay(n){const el=document.getElementById('body-'+n);if(!el)return;let t='Week '+((document.body.dataset.week)||'')+' Day '+n+' tasks\n';el.querySelectorAll('.t').forEach(li=>t+='- '+li.innerText.trim().split('\n')[0]+'\n');navigator.clipboard.writeText(t).then(()=>alert('Day '+n+' copied'))}
function openDayLinks(n){document.querySelectorAll('#body-'+n+' .t-links a').forEach(a=>window.open(a.href,'_blank'))}
document.addEventListener('change',e=>{if(e.target.matches('.chk input')){e.target.closest('li').classList.toggle('done',e.target.checked);save()}});
document.addEventListener('click',e=>{const li=e.target.closest('.chk li');if(li&&!['A','INPUT','LABEL','BUTTON','SUMMARY'].includes(e.target.tagName)){const c=li.querySelector('input');c.checked=!c.checked;c.dispatchEvent(new Event('change',{bubbles:true}))}});
window.addEventListener('DOMContentLoaded',load);
