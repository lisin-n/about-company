// Static preview forms redirect customers to the live support team.
document.addEventListener('submit',event=>{const form=event.target;if(form.id!=='corp')return;event.preventDefault();event.stopImmediatePropagation();let note=form.querySelector('.local-form-note');if(!note){note=document.createElement('p');note.className='local-form-note';note.style.cssText='font-size:14px;line-height:1.6;margin-top:16px';note.textContent='Для отправки заявки позвоните 8 (800) 600-31-89 или напишите info@dombilet.ru.';form.append(note);}},true);

// Touch uses native momentum scrolling; mouse/pen dragging works in mobile previews too.
const homeCardTrack = document.querySelector('.dom-cards');
if (homeCardTrack) {
  // Match the lift to each description as it wraps or the font loads.
  const descriptionObserver = new ResizeObserver(entries => {
    for (const { target, contentRect } of entries) {
      target.parentElement.style.setProperty('--card-description-height', `${contentRect.height}px`);
    }
  });
  homeCardTrack.querySelectorAll('.dom-card-panel p').forEach(description => {
    descriptionObserver.observe(description);
  });

  const mobileCards = matchMedia('(max-width:767px)');
  const cardDialog = document.querySelector('#home-card-dialog');
  const dialogTitle = cardDialog.querySelector('h3');
  const dialogDescription = cardDialog.querySelector('p');
  let dialogOpener;

  homeCardTrack.querySelectorAll('.dom-card-info').forEach(button => {
    button.addEventListener('click', () => {
      const panel = button.closest('.dom-card').querySelector('.dom-card-panel');
      dialogTitle.textContent = panel.querySelector('h2').innerText;
      dialogDescription.textContent = panel.querySelector('p').textContent;
      dialogOpener = button;
      cardDialog.showModal();
    });
  });
  cardDialog.addEventListener('click', event => {
    if (event.target !== cardDialog) return;
    const { left, right, top, bottom } = cardDialog.getBoundingClientRect();
    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) {
      cardDialog.close();
    }
  });
  cardDialog.addEventListener('close', () => {
    if (mobileCards.matches) dialogOpener?.focus({ preventScroll: true });
    dialogOpener = null;
  });
  mobileCards.addEventListener('change', () => {
    if (!mobileCards.matches && cardDialog.open) cardDialog.close();
  });

  let drag = null;
  let suppressCardClick = false;
  homeCardTrack.addEventListener('dragstart', event => {
    if (mobileCards.matches) event.preventDefault();
  });
  homeCardTrack.addEventListener('touchstart', event => event.stopPropagation(), {passive:true});
  homeCardTrack.addEventListener('touchmove', event => event.stopPropagation(), {passive:true});
  homeCardTrack.addEventListener('pointerdown', event => {
    if (!mobileCards.matches || event.pointerType === 'touch' || event.button !== 0) return;
    suppressCardClick = false;
    drag = {id:event.pointerId, x:event.clientX, scroll:homeCardTrack.scrollLeft, moved:false};
  });
  homeCardTrack.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    const distance = event.clientX - drag.x;
    if (!drag.moved && Math.abs(distance) < 6) return;
    if (!drag.moved) {
      drag.moved = true;
      homeCardTrack.setPointerCapture(event.pointerId);
      homeCardTrack.classList.add('is-dragging');
    }
    event.preventDefault();
    homeCardTrack.scrollLeft = drag.scroll - distance;
  });
  const finishCardDrag = event => {
    if (!drag || drag.id !== event.pointerId) return;
    suppressCardClick = drag.moved;
    drag = null;
    homeCardTrack.classList.remove('is-dragging');
    if (homeCardTrack.hasPointerCapture(event.pointerId)) homeCardTrack.releasePointerCapture(event.pointerId);
  };
  homeCardTrack.addEventListener('pointerup', finishCardDrag);
  homeCardTrack.addEventListener('pointercancel', finishCardDrag);
  homeCardTrack.addEventListener('lostpointercapture', finishCardDrag);
  homeCardTrack.addEventListener('click', event => {
    if (!suppressCardClick || event.detail === 0) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    suppressCardClick = false;
  }, true);
}
