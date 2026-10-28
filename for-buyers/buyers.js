document.querySelector('#buyer-contact')?.addEventListener('submit',event=>{
 event.preventDefault();
 const status=document.querySelector('#callback-status');
 status.textContent='Отправка заявки пока не подключена. Свяжитесь с нами по телефону 8 (800) 600-31-89 или по почте info@dombilet.ru.';
 status.hidden=false;
});


const safetyItems = [...document.querySelectorAll('.buyer-safety__item')];
const safetyMobile = window.matchMedia('(max-width:700px)');
const safetyDialog = document.querySelector('#safety-dialog');
let safetyOpener;
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
 const show=()=>{if(!safetyMobile.matches){closeSafety(item);trigger.setAttribute('aria-expanded','true');}};
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
  const pinned=item.dataset.pinned==='true';closeSafety(item);item.dataset.pinned=String(!pinned);trigger.setAttribute('aria-expanded',String(!pinned));
 });
});
safetyDialog.addEventListener('close',()=>{closeSafety();if(safetyOpener){safetyOpener.focus();safetyOpener=null;}});
safetyDialog.addEventListener('click',event=>{
 const box=safetyDialog.getBoundingClientRect();
 if(event.target===safetyDialog&&(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom))safetyDialog.close();
});
safetyMobile.addEventListener('change',updateSafetyMode);updateSafetyMode();
document.addEventListener('click',event=>{if(!event.target.closest('.buyer-safety__item')&&!safetyDialog.open)closeSafety();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeSafety();});
