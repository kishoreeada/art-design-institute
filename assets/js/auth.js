(() => {
'use strict';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const body = document.body;
const status = document.querySelector('[data-auth-status]');

const showStatus = (message, type = '') => {
  if (!status) return;
  status.textContent = message;
  status.className = `auth-status show ${type}`.trim();
  clearTimeout(showStatus.timer);
  showStatus.timer = setTimeout(() => status.classList.remove('show'), 3200);
};

const setError = (id, message, fieldId) => {
  const error = document.getElementById(id);
  const field = document.getElementById(fieldId);
  if (error) {
    error.textContent = message;
    error.classList.toggle('show', Boolean(message));
  }
  if (field) field.classList.toggle('invalid', Boolean(message));
};

const clearErrors = ids => ids.forEach(id => setError(id, '', id.replace('Err','')));
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const nameRe = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;

if (window.gsap && !reduced) {
  const tl = gsap.timeline({defaults:{ease:'power4.out'}});
  tl.to('.auth-media img',{scale:1,duration:1.15},0)
    .from('.auth-media:before',{opacity:0,scale:.97,duration:.65},'-.8')
    .from('.auth-media-index,.auth-visual-word,.auth-media-caption',
          {opacity:0,y:12,stagger:.06,duration:.45},'-.5')
    .from('.auth-top',{y:-10,opacity:0,duration:.45},'-.3')
    .from('.auth-content',{y:18,opacity:0,duration:.65},'-.3')
    .from('.auth-reveal',{y:12,opacity:0,stagger:.03,duration:.38},'-.3');

  const media=document.querySelector('.auth-media img');
  if(media){
    media.addEventListener('pointermove',e=>{
      const r=media.parentElement.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      gsap.to(media,{x:x*7,y:y*5,duration:.6,ease:'power3.out',overwrite:true});
    });
    media.parentElement.addEventListener('pointerleave',()=>{
      gsap.to(media,{x:0,y:0,duration:.7,ease:'power3.out'});
    });
  }
}else{
  body.classList.add('auth-ready');
}

window.setTimeout(()=>{
  body.classList.add('auth-ready');
  document.querySelectorAll('.auth-reveal').forEach(el=>{
    el.style.opacity='1';
    el.style.transform='none';
  });
},900);

document.querySelectorAll('.auth-input,.auth-select').forEach(field=>{
  field.addEventListener('input',()=>{
    field.classList.remove('invalid');
    const err=document.getElementById(`${field.id}Err`);
    if(err){err.textContent='';err.classList.remove('show');}
  });
  field.addEventListener('blur',()=>{
    if(field.required && !field.value.trim()) field.classList.add('invalid');
  });
});

document.querySelectorAll('[data-password-toggle]').forEach(toggle=>{
  toggle.addEventListener('click',()=>{
    const input=document.getElementById(toggle.dataset.passwordToggle);
    if(!input)return;
    const visible=input.type==='password';
    input.type=visible?'text':'password';
    toggle.setAttribute('aria-label',`${visible?'Hide':'Show'} password`);
    toggle.setAttribute('title',`${visible?'Hide':'Show'} password`);
  });
});

const signup=document.getElementById('signupForm');
if(signup){
  signup.addEventListener('submit',event=>{
    event.preventDefault();
    const submit=signup.querySelector('.auth-submit');
    const name=document.getElementById('signupName');
    const email=document.getElementById('signupEmail');
    const password=document.getElementById('signupPassword');
    const confirm=document.getElementById('signupConfirm');

    clearErrors(['signupNameErr','signupEmailErr','signupPasswordErr','signupConfirmErr']);

    let ok=true;
    if(name.value.trim().length<2 || !nameRe.test(name.value.trim())){
      setError('signupNameErr','Enter a valid full name using letters.','signupName'); ok=false;
    }
    if(!emailRe.test(email.value.trim())){
      setError('signupEmailErr','Enter a valid email address.','signupEmail'); ok=false;
    }
    if(password.value.length<6){
      setError('signupPasswordErr','Password must contain at least 6 characters.','signupPassword'); ok=false;
    }
    if(password.value!==confirm.value){
      setError('signupConfirmErr','Passwords do not match.','signupConfirm'); ok=false;
    }

    if(!ok){showStatus('Please correct the highlighted fields.','error');return;}

    if(submit)submit.disabled=true;
    showStatus('Details accepted. Opening sign in…','success');
    setTimeout(()=>{window.location.href='login.html';},450);
  });
}

const login=document.getElementById('loginForm');
if(login){
  login.addEventListener('submit',event=>{
    event.preventDefault();
    const submit=login.querySelector('.auth-submit');
    const email=document.getElementById('loginEmail');
    const password=document.getElementById('loginPassword');
    const role=document.getElementById('loginRole');

    clearErrors(['loginEmailErr','loginPasswordErr']);

    let ok=true;
    if(!emailRe.test(email.value.trim())){
      setError('loginEmailErr','Enter a valid email address.','loginEmail'); ok=false;
    }
    if(password.value.length<6){
      setError('loginPasswordErr','Password must contain at least 6 characters.','loginPassword'); ok=false;
    }

    if(!ok){showStatus('Please correct the highlighted fields.','error');return;}

    if(submit)submit.disabled=true;
    showStatus('Sign in accepted. Opening dashboard…','success');
    const baseDestination=role.value==='admin'
      ? 'dashboards/admin/index.html'
      : 'dashboards/student/index.html';
    const destination=`${baseDestination}?email=${encodeURIComponent(email.value.trim())}`;
    setTimeout(()=>{window.location.href=destination;},450);
  });
}
})();
