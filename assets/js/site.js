(function () {
'use strict';
const toggle=document.querySelector('.nav-toggle'), nav=document.getElementById('site-nav');
if(toggle&&nav){document.documentElement.classList.add('has-menu');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Close':'Menu';});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu';toggle.focus();}});}
document.querySelectorAll('.print-button').forEach(b=>b.addEventListener('click',()=>window.print()));
document.querySelectorAll('.signup-form,.contact-form').forEach(form=>form.addEventListener('submit',async e=>{
e.preventDefault();const button=form.querySelector('button'),status=form.querySelector('.form-status'),contact=form.classList.contains('contact-form');button.disabled=true;status.textContent='Submitting…';
try{const response=await fetch(contact?'/':form.action,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json'},body:new URLSearchParams(new FormData(form)).toString(),signal:AbortSignal.timeout(20000)});
if(contact){if(!response.ok)throw new Error('Your message could not be submitted. Please try again or email mail@capitalandfreedom.com.');}
else{const data=await response.json().catch(()=>({}));if(!response.ok||!data.ok)throw new Error(data.message||'Signup is temporarily unavailable. Please try again later. You can still use all the free tools.');if(data.pending){status.textContent=data.message;form.reset();return;}}
window.location.href='/thank-you?type='+(contact?'contact':'newsletter');
}catch(err){status.textContent=err.name==='TimeoutError'?'This is taking longer than expected. Please try again in a moment.':err.message;}finally{button.disabled=false;}
}));
const message=document.getElementById('submission-message');if(message){const type=new URLSearchParams(window.location.search).get('type');if(type==='contact')message.textContent='Thank you. Your message has been submitted.';if(type==='newsletter')message.textContent='Thank you for subscribing. If a confirmation email arrives, please confirm your address. You can start learning below.';}
})();
