(function(){
'use strict';
const root=document.getElementById('quiz');if(!root||!window.CF_CHECKS)return;
const kind=root.dataset.kind,select=document.getElementById('quiz-language'),result=document.getElementById('quiz-result'),signup=document.getElementById('check-signup');
const count=kind==='scorecard'?25:6,answers=Array(count).fill(null);let current=0,complete=false,exportText='';
const esc=s=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
function words(){return [window.CF_CHECKS.data[kind][select.value],window.CF_CHECKS.ui[select.value]];}
function language(){root.lang=result.lang=select.value==='hi'?'hi-Latn':'en';}
function render(){language();const [c,u]=words(),options=kind==='scorecard'?c.options:c.options[current],area=kind==='scorecard'?c.areas[Math.floor(current/5)]:'';
root.innerHTML=`<div class="quiz-card"><p class="eyebrow">${kind==='scorecard'?u.question:u.reflection} ${current+1} ${u.of} ${count}</p><progress max="${count}" value="${current+1}" aria-label="${u.question}"></progress>${area?`<p class="quiz-area">${esc(area)}</p>`:''}<fieldset><legend tabindex="-1">${esc(c.questions[current])}</legend><div class="answer-options">${options.map((o,i)=>`<label><input type="radio" name="answer" value="${i}" ${answers[current]===i?'checked':''}><span>${esc(o)}</span></label>`).join('')}</div></fieldset><div class="quiz-actions"><button type="button" class="btn btn-ghost" id="quiz-back" ${current===0?'disabled':''}>${u.back}</button><button type="button" class="btn" id="quiz-next" ${answers[current]===null?'disabled':''}>${current===count-1?u.finish:u.next}</button></div><p class="small" style="margin:20px 0 0">${kind==='scorecard'?u.hint:u.exit}</p></div>`;
root.querySelectorAll('input').forEach(input=>input.addEventListener('change',()=>{answers[current]=Number(input.value);document.getElementById('quiz-next').disabled=false;}));
document.getElementById('quiz-back').addEventListener('click',()=>{current--;render();root.querySelector('legend').focus();});
document.getElementById('quiz-next').addEventListener('click',()=>{if(answers[current]===null)return;if(current===count-1){complete=true;showResult();}else{current++;render();root.querySelector('legend').focus();}});
}
function showResult(){language();const[c,u]=words();let body='',resource='',rows=[],summary='';
if(kind==='scorecard'){
 const scores=Array.from({length:5},(_,i)=>answers.slice(i*5,i*5+5).reduce((s,a)=>s+a+1,0)),total=scores.reduce((s,a)=>s+a,0),band=total<50?0:total<75?1:total<100?2:3,low=Math.min(...scores),weak=scores.indexOf(low),ties=scores.filter(s=>s===low).length,allStrong=total===125;
 rows=scores.map((s,i)=>`${c.areas[i]}: ${s}/25`);summary=`${c.bands[band]}\n${total}/125\n${c.bandDescriptions[band]}`;
 resource=['/money-map','/money-date','/notes/before-investing','/money-reset','/money-date'][weak];
 body=`<p class="eyebrow">${u.heading}</p><h2>${esc(c.bands[band])}</h2><p class="score-total">${total}<span> / 125</span></p><p>${esc(c.bandDescriptions[band])}</p><h3>${u.summary}</h3><dl class="score-list">${scores.map((s,i)=>`<div><dt>${esc(c.areas[i])}</dt><dd>${s} / 25</dd></div>`).join('')}</dl><div class="note"><p class="small">${u.attention}</p>${allStrong?'':`<h3>${esc(c.areas[weak])}</h3>`}<p>${esc(allStrong?c.allStrong:c.tasks[weak])}</p>${ties>1&&!allStrong?`<p class="small">${u.tie}</p>`:''}</div><p class="small">${u.scoreExplain}</p>`;
 exportText=['Capital & Freedom | '+u.heading,summary,...rows,u.attention+': '+(allStrong?c.allStrong:c.tasks[weak]),u.scoreExplain].join('\n\n');
}else{
 const scores=Array(4).fill(0);answers.forEach(a=>scores[a]++);const high=Math.max(...scores),top=scores.map((v,i)=>v===high?i:-1).filter(i=>i>=0);resource=top.length>1?'/assets/downloads/money-reset-workbook.pdf':['/assets/downloads/money-reset-workbook.pdf','/assets/downloads/money-reset-workbook.pdf','/money-map','/money-date'][top[0]];
 body=`<p class="eyebrow">${u.heading}</p><h2>${u.resetTitle}</h2>${top.length>1?`<p>${u.resetTie}</p>`:''}${top.map(i=>`<div class="note"><h3>${esc(c.areas[i])}</h3><p>${esc(c.tasks[i])}</p></div>`).join('')}<p class="small">${u.resetExplain}</p>`;
 exportText=['Capital & Freedom | Money Reset',...top.map(i=>c.areas[i]+'\n'+c.tasks[i]),u.resetExplain].join('\n\n');
}
root.hidden=true;result.hidden=false;signup.hidden=false;
result.innerHTML=body+`<div class="btn-row"><a class="btn" href="${resource}">${u.resource}</a><button type="button" class="text-button" id="result-download">${u.download}</button><button type="button" class="text-button" id="result-print">${u.print}</button><button type="button" class="text-button" id="quiz-restart">${u.restart}</button></div><p class="small" style="margin-top:20px">${u.signup}</p>`;
signup.querySelector('select[name="language"]').value=select.value==='hi'?'hinglish':'english';
document.getElementById('result-print').addEventListener('click',()=>window.print());
document.getElementById('result-download').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([exportText],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`capital-and-freedom-${kind}-result.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
document.getElementById('quiz-restart').addEventListener('click',()=>{answers.fill(null);current=0;complete=false;result.hidden=true;signup.hidden=true;root.hidden=false;exportText='';render();root.querySelector('legend').focus();});result.focus({preventScroll:true});result.scrollIntoView({block:"start",behavior:"instant"});
}
select.addEventListener('change',()=>complete?showResult():render());render();
})();
