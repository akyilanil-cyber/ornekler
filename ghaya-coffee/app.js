const toggle=document.querySelector('.menu-toggle'),menu=document.getElementById('mobile-menu');
function closeMenu(){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Menüyü aç')}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');menu.hidden=!open});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const box=document.getElementById('lightbox');
document.querySelectorAll('[data-photo]').forEach(b=>b.addEventListener('click',()=>{box.querySelector('img').src=b.dataset.photo;box.querySelector('img').alt=b.dataset.caption;box.querySelector('p').textContent=b.dataset.caption;box.showModal();document.body.classList.add('modal-open')}));
document.querySelectorAll('[data-policy]').forEach(b=>b.addEventListener('click',()=>{document.getElementById(b.dataset.policy).showModal();document.body.classList.add('modal-open')}));
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.dialog-close').addEventListener('click',()=>d.close());d.addEventListener('close',()=>document.body.classList.remove('modal-open'));d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.target===d&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))d.close()})});

const filters=document.querySelectorAll('[data-filter]'),picks=document.querySelectorAll('.ghaya-pick');filters.forEach(b=>b.addEventListener('click',()=>{let visible=0;filters.forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))});picks.forEach(x=>{x.hidden=b.dataset.filter!=='all'&&x.dataset.category!==b.dataset.filter;if(!x.hidden)visible++});document.querySelector('.filter-status').textContent=visible+' ürün gösteriliyor.'}));
