// Local navigation; ticket services stay on dombilet.ru.
const style=document.createElement('style');
style.textContent='#sm-menu-content:not([hidden]){display:block;position:fixed;inset:0 auto 0 0;width:min(380px,90vw);overflow:auto;background:white;padding:32px;z-index:10000;box-shadow:0 0 0 100vmax #0008}#sm-menu-content .local-close{position:absolute;right:16px;top:12px;font-size:30px;background:none;cursor:pointer}.sm-trigger{cursor:pointer}';
document.head.append(style);
const menu=document.querySelector('#sm-menu-content');
function close(){if(menu)menu.hidden=true;document.querySelectorAll('.popup_show').forEach(p=>p.classList.remove('popup_show'));document.documentElement.classList.remove('popup-show','lock');}
if(menu){const b=document.createElement('button');b.className='local-close';b.textContent='×';b.setAttribute('aria-label','Закрыть меню');b.onclick=close;menu.prepend(b);}
document.querySelectorAll('.sm-trigger').forEach(b=>{b.setAttribute('role','button');b.setAttribute('tabindex','0');b.setAttribute('aria-label','Открыть меню');const open=()=>{menu.hidden=false;document.documentElement.classList.add('lock');};b.onclick=open;b.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}};});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
document.addEventListener('click',e=>{const t=e.target.closest('[data-popup]');if(t){const p=document.querySelector(t.dataset.popup);if(p){e.preventDefault();p.classList.add('popup_show');document.documentElement.classList.add('popup-show','lock');p.querySelector('input')?.focus();}}if(e.target.closest('[data-close]')||e.target.classList.contains('popup'))close();});
document.querySelectorAll('.search-form__item').forEach(f=>{f.action='https://dombilet.ru/afisha/';f.method='get';});
// Reserve the real height of the fixed white bar at every breakpoint.
const headerBar=document.querySelector('.js-header-wrapper');
const headerSpace=document.querySelector('.js-top-header');
if(headerBar&&headerSpace){
  const syncHeaderHeight=()=>{headerSpace.style.minHeight=`${headerBar.getBoundingClientRect().height}px`;};
  new ResizeObserver(syncHeaderHeight).observe(headerBar);
  syncHeaderHeight();
  document.fonts.ready.then(syncHeaderHeight);
}
const headerStyle=document.createElement('style');
headerStyle.textContent='.top-header__wrapper{box-shadow:0 0 .3125rem rgba(0,0,0,.5)}';
document.head.append(headerStyle);
// Match the original header: hide downward, reveal upward or after a pause.
if(headerSpace){
  const scrollStart=Number(headerSpace.dataset.scroll)||1;
  const revealDelay=Number(headerSpace.dataset.scrollShow)||500;
  const revealOnScroll=headerSpace.hasAttribute('data-scroll-show');
  let previousScroll=0;
  let revealTimer;
  const updateScrollHeader=()=>{
    const position=window.scrollY;
    clearTimeout(revealTimer);
    if(position>=scrollStart){
      headerSpace.classList.add('_header-scroll');
      if(revealOnScroll){
        headerSpace.classList.toggle('_header-show',position<=previousScroll);
        revealTimer=setTimeout(()=>headerSpace.classList.add('_header-show'),revealDelay);
      }
    }else{
      headerSpace.classList.remove('_header-scroll','_header-show');
    }
    previousScroll=Math.max(0,position);
  };
  window.addEventListener('scroll',updateScrollHeader,{passive:true});
  updateScrollHeader();
}
// Source cards follow a true circle. On mobile its top arc is an endless carousel.
const sourceOrbit=document.querySelector('.source-fan__sources');
if(sourceOrbit){
  const originals=Array.from(sourceOrbit.querySelectorAll('.source-fan__card'));
  const copies=Array.from({length:5},()=>originals.map(card=>{
    const copy=card.cloneNode(true);
    copy.dataset.orbitCopy='';
    copy.setAttribute('aria-hidden','true');
    sourceOrbit.append(copy);
    return copy;
  })).flat();
  const allCards=[...originals,...copies];
  const mobileOrbit=matchMedia('(max-width:900px)');
  const reducedMotion=matchMedia('(prefers-reduced-motion:reduce)');
  const orbitControl=document.createElement('button');
  orbitControl.type='button';orbitControl.className='source-orbit-control';
  sourceOrbit.after(orbitControl);
  let userPaused=false,visible=false,frame=0,lastTime=0,phase=6;
  const updateLabel=()=>{orbitControl.textContent=userPaused?'Продолжить движение':'Остановить движение';orbitControl.setAttribute('aria-pressed',String(userPaused));};
  updateLabel();
  const renderOrbit=()=>{
    const width=sourceOrbit.clientWidth;
    const mobile=mobileOrbit.matches;
    const cardWidth=originals[0].offsetWidth;
    const cardHeight=originals[0].offsetHeight;
    const orbitStep=360/allCards.length;
    // Keep a small physical gap at the inner edge of the curved row.
    const radius=mobile?(cardWidth+10)/(2*Math.sin(Math.PI/allCards.length))+cardHeight/2:width*.95;
    const desktopStep=(cardWidth+8)/(radius-cardHeight/2)*180/Math.PI;
    const centerY=radius+(mobile?111:115);
    allCards.forEach((card,index)=>{
      if(!mobile&&index>=originals.length)return;
      const degrees=mobile?-90+index*orbitStep-phase:-90+(index-2)*desktopStep;
      const angle=degrees*Math.PI/180;
      card.style.opacity='1';
      const x=width/2+radius*Math.cos(angle);
      const y=centerY+radius*Math.sin(angle);
      // Tangent orientation follows the circle instead of arbitrary card tilts.
      card.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%) rotate(${degrees+90}deg)`;
    });
  };
  const animate=time=>{
    if(lastTime)phase=(phase+Math.min(time-lastTime,64)*.006)%360;
    lastTime=time;renderOrbit();frame=requestAnimationFrame(animate);
  };
  const syncOrbit=()=>{
    cancelAnimationFrame(frame);lastTime=0;renderOrbit();
    orbitControl.hidden=reducedMotion.matches;
    if(mobileOrbit.matches&&!reducedMotion.matches&&!userPaused&&visible&&!document.hidden)frame=requestAnimationFrame(animate);
  };
  orbitControl.addEventListener('click',()=>{userPaused=!userPaused;updateLabel();syncOrbit();});
  new ResizeObserver(syncOrbit).observe(sourceOrbit);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncOrbit();},{rootMargin:'100px'}).observe(sourceOrbit);
  mobileOrbit.addEventListener('change',syncOrbit);
  reducedMotion.addEventListener('change',syncOrbit);
  document.addEventListener('visibilitychange',syncOrbit);
  document.fonts.ready.then(syncOrbit);
  syncOrbit();
}

