document.querySelector('#buyer-contact')?.addEventListener('submit',event=>{
 event.preventDefault();
 const status=document.querySelector('#callback-status');
 status.textContent='Отправка заявки пока не подключена. Свяжитесь с нами по телефону 8 (800) 600-31-89 или по почте info@dombilet.ru.';
 status.hidden=false;
});


const safetyItems = [...document.querySelectorAll('.buyer-safety__item')];
const safetyMobile = window.matchMedia('(max-width:700px)');
const safetyDialog = document.querySelector('#safety-dialog');
const safetyHeader = document.querySelector('.top-header__wrapper');
let safetyOpener;
let safetyTooltipFrame = 0;

function positionSafetyTooltip(item) {
 const trigger = item.querySelector('button');
 const tooltip = item.querySelector('.buyer-safety__tooltip');
 const body = tooltip.querySelector('p');
 const anchor = trigger.getBoundingClientRect();
 const viewport = document.documentElement;
 const edge = 16;
 const gap = 12;
 const above = anchor.top - (safetyHeader?.offsetHeight ?? 0) - edge - gap;
 const below = viewport.clientHeight - anchor.bottom - edge - gap;
 const padding = tooltip.offsetHeight - body.offsetHeight;
 const height = body.scrollHeight + padding;
 const prefersBelow = !!item.closest('.buyer-safety__row');
 const preferredSpace = prefersBelow ? below : above;
 const otherSpace = prefersBelow ? above : below;
 const usePreferred = preferredSpace >= height || preferredSpace >= otherSpace;
 const opensBelow = usePreferred === prefersBelow;
 const space = opensBelow ? below : above;
 const width = tooltip.offsetWidth;
 const center = (anchor.left + anchor.right) / 2;
 const left = Math.max(edge, Math.min(center - width / 2, viewport.clientWidth - width - edge));
 const arrow = Math.max(edge, Math.min(center - left, width - edge));

 tooltip.dataset.side = opensBelow ? 'below' : 'above';
 tooltip.style.setProperty('--safety-tooltip-left', `${left - item.getBoundingClientRect().left}px`);
 tooltip.style.setProperty('--safety-tooltip-arrow', `${arrow}px`);
 tooltip.style.setProperty('--safety-tooltip-body-limit', space >= height ? 'none' : `${Math.max(0, space - padding)}px`);
}

function refreshSafetyTooltip() {
 if (safetyMobile.matches || safetyTooltipFrame) return;
 const item = safetyItems.find(card => card.querySelector('button').getAttribute('aria-expanded') === 'true');
 if (!item) return;
 safetyTooltipFrame = requestAnimationFrame(() => {
  safetyTooltipFrame = 0;
  const trigger = item.querySelector('button');
  if (trigger.getAttribute('aria-expanded') !== 'true' || safetyMobile.matches) return;
  const bounds = trigger.getBoundingClientRect();
  if (bounds.bottom <= (safetyHeader?.offsetHeight ?? 0) || bounds.top >= document.documentElement.clientHeight) {
   closeSafety();
   return;
  }
  positionSafetyTooltip(item);
 });
}

function closeSafety(except) {
 safetyItems.forEach(item => {if(item !== except){item.dataset.pinned='false';item.querySelector('button').setAttribute('aria-expanded','false');}});
}
function updateSafetyMode(){
 closeSafety();
 if(safetyDialog.open)safetyDialog.close();
 safetyItems.forEach(item=>{
  const trigger=item.querySelector('button');
  if(safetyMobile.matches)trigger.setAttribute('aria-haspopup','dialog');
  else trigger.removeAttribute('aria-haspopup');
 });
}
safetyItems.forEach(item => {
 const trigger=item.querySelector('button');
 const show=()=>{if(!safetyMobile.matches){closeSafety(item);positionSafetyTooltip(item);trigger.setAttribute('aria-expanded','true');}};
 item.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')show();});
 item.addEventListener('pointerleave',()=>{if(item.dataset.pinned!=='true'&&!item.contains(document.activeElement))trigger.setAttribute('aria-expanded','false');});
 trigger.addEventListener('focus',show);
 item.addEventListener('focusout',event=>{if(!safetyMobile.matches&&!item.contains(event.relatedTarget)){item.dataset.pinned='false';trigger.setAttribute('aria-expanded','false');}});
 trigger.addEventListener('click',()=>{
  if(safetyMobile.matches){
   closeSafety();safetyOpener=trigger;
   safetyDialog.querySelector('h3').textContent=trigger.querySelector('span:nth-child(2)').textContent;
   safetyDialog.querySelector('p').textContent=item.querySelector('.buyer-safety__tooltip p').textContent;
   trigger.setAttribute('aria-expanded','true');safetyDialog.showModal();return;
  }
  const pinned=item.dataset.pinned==='true';
  if(!pinned)show();
  item.dataset.pinned=String(!pinned);
  trigger.setAttribute('aria-expanded',String(!pinned));
 });
});
safetyDialog.addEventListener('close',()=>{closeSafety();if(safetyOpener){safetyOpener.focus();safetyOpener=null;}});
safetyDialog.addEventListener('click',event=>{
 const box=safetyDialog.getBoundingClientRect();
 if(event.target===safetyDialog&&(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom))safetyDialog.close();
});
safetyMobile.addEventListener('change',updateSafetyMode);updateSafetyMode();
window.addEventListener('scroll',refreshSafetyTooltip,{passive:true});
window.addEventListener('resize',refreshSafetyTooltip);
document.addEventListener('click',event=>{if(!event.target.closest('.buyer-safety__item')&&!safetyDialog.open)closeSafety();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeSafety();});
