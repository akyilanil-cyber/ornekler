'use strict';
const serviceData = {
 cilt:{title:'Cildinize ayrılan zaman.',description:'Cilt bakımı ve yosun peeling seçenekleri hakkında bilgi alın. Hangi uygulamanın size uygun olduğunu görüşmede değerlendirelim.',options:['Cilt bakımı','Yosun peeling'],note:'İşlem seçimi öncesinde cildinizin ihtiyacını ve bakım rutininizi konuşalım.',request:'Cilt bakımı'},
 kas:{title:'Bakışlarınızdaki ayrıntı.',description:'Kaş ve kirpik uygulamalarını birlikte inceleyelim. Beklediğiniz görünümü ve işlemle ilgili sorularınızı bize iletebilirsiniz.',options:['Kalıcı makyaj (PhiBrows)','İpek kirpik','Kirpik lifting'],note:'Uygulama ve bakım süreci hakkında bilgi almak için bize yazın.',request:'Kalıcı makyaj (PhiBrows)'},
 tirnak:{title:'Ellerinize küçük bir özen.',description:'Protez tırnak için düşündüğünüz formu ve modeli bize gösterin. Uygulama ayrıntılarını ve uygun saatleri birlikte netleştirelim.',options:['Protez tırnak','Model ve form seçimi'],note:'Beğendiğiniz bir modelin fotoğrafını Instagram mesajınıza ekleyebilirsiniz.',request:'Protez tırnak'},
 vucut:{title:'Önce ihtiyacınızı konuşalım.',description:'Lazer epilasyon ve bölgesel bakım seçenekleri için salonumuzdan bilgi alın. İşlem uygunluğu ve planı görüşmede değerlendirilir.',options:['Lazer epilasyon','Bölgesel bakım'],note:'Seans, süre ve uygulama ayrıntıları için kişisel değerlendirme gerekir.',request:'Lazer epilasyon'}
};
const tabs=[...document.querySelectorAll('[data-service]')];
const panel=document.getElementById('care-panel');
function selectService(key,focus=false){
 const data=serviceData[key];if(!data)return;
 tabs.forEach(tab=>{const active=tab.dataset.service===key;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus();});
 panel.setAttribute('aria-labelledby','tab-'+key);
 document.getElementById('care-name').textContent=data.title;
 document.getElementById('care-description').textContent=data.description;
 document.getElementById('care-options').replaceChildren(...data.options.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
 document.getElementById('care-note').textContent=data.note;
 document.getElementById('request-service').value=data.request;
 panel.classList.remove('changing');void panel.offsetWidth;panel.classList.add('changing');
}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectService(tab.dataset.service));tab.addEventListener('keydown',e=>{let next=i;if(['ArrowDown','ArrowRight'].includes(e.key))next=(i+1)%tabs.length;else if(['ArrowUp','ArrowLeft'].includes(e.key))next=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();selectService(tabs[next].dataset.service,true);});});
document.querySelectorAll('[data-select-service]').forEach(a=>a.addEventListener('click',()=>selectService(a.dataset.selectService)));
document.getElementById('care-contact').addEventListener('click',()=>{const active=tabs.find(t=>t.getAttribute('aria-selected')==='true');if(active)document.getElementById('request-service').value=serviceData[active.dataset.service].request;});
const menuToggle=document.querySelector('.menu-toggle'),mobileMenu=document.getElementById('mobile-menu');
function setMenu(open){menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');mobileMenu.hidden=!open;}
menuToggle.addEventListener('click',()=>setMenu(menuToggle.getAttribute('aria-expanded')!=='true'));
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobileMenu.hidden){setMenu(false);menuToggle.focus();}});
const query=matchMedia('(max-width:700px)');
function orientTabs(){document.querySelector('.care-tabs').setAttribute('aria-orientation',query.matches?'horizontal':'vertical');}
query.addEventListener('change',orientTabs);orientTabs();
matchMedia('(min-width:1001px)').addEventListener('change',e=>{if(e.matches)setMenu(false);});
const gallery=[
 {src:'assets/manikur-alani.jpg',alt:'Salonun manikür masası ve pedikür alanı',caption:'Manikür alanımız',position:'50% 54%'},
 {src:'assets/resepsiyon.jpg',alt:'ECS logolu karşılama bankosu',caption:'Karşılama alanı',position:'50% 54%'},
 {src:'assets/salon-detay.jpg',alt:'Salonun pencere kenarındaki çiçekli köşesi',caption:'Salondan bir ayrıntı',position:'50% 50%'},
 {src:'assets/tirnak-poster.jpg',video:'assets/tirnak-uygulama.mp4',alt:'French ve altın detaylı gerçek tırnak uygulaması',caption:'Tırnak uygulamasından · Video',position:'50% 35%'}
];
const galleryGrid=document.getElementById('gallery-grid');
for(const item of gallery){const button=document.createElement('button');button.type='button';button.className='gallery-item';button.setAttribute('aria-label',item.caption+(item.video?'yu izle':' fotoğrafını büyüt'));const img=document.createElement('img');img.src=item.src;img.alt=item.alt;img.width=1200;img.height=1600;img.loading='lazy';img.style.objectPosition=item.position;const frame=document.createElement('span');frame.className='gallery-frame';frame.append(img);if(item.video){const play=document.createElement('span');play.className='play-mark';play.setAttribute('aria-hidden','true');play.textContent='▶';frame.append(play);}const label=document.createElement('span');label.textContent=item.caption;button.append(frame,label);button.addEventListener('click',()=>openMedia(item));galleryGrid.append(button);}
const dialog=document.getElementById('photo-dialog'),dialogImage=document.getElementById('dialog-image'),dialogCaption=document.getElementById('dialog-caption');let video=null;
function openMedia(item){dialogCaption.textContent=item.caption;if(item.video){dialogImage.hidden=true;video=document.createElement('video');video.controls=true;video.playsInline=true;video.preload='none';video.poster=item.src;video.src=item.video;video.setAttribute('aria-label',item.alt);dialog.insertBefore(video,dialogCaption);dialog.showModal();video.play().catch(()=>{});}else{dialogImage.src=item.src;dialogImage.alt=item.alt;dialogImage.hidden=false;dialog.showModal();}}
function closeMedia(){dialog.close();}
dialog.querySelector('button').addEventListener('click',closeMedia);
dialog.addEventListener('close',()=>{if(video){video.pause();video.removeAttribute('src');video.load();video.remove();video=null;}});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeMedia();}});
const form=document.getElementById('request-form'),result=document.getElementById('message-result'),prepared=document.getElementById('prepared-message'),status=document.getElementById('copy-status');
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const name=form.elements.name.value.trim();if(!name){form.elements.name.setCustomValidity('Lütfen adınızı yazın.');form.elements.name.reportValidity();return;}const note=form.elements.note.value.trim();prepared.value='Merhaba, ben '+name+'. '+form.elements.service.value+' hakkında bilgi ve randevu almak istiyorum.'+(note?' '+note:'')+' Uygun gün ve saatlerinizi öğrenebilir miyim?';form.hidden=true;result.hidden=false;status.textContent='';document.getElementById('copy-message').focus();});
form.elements.name.addEventListener('input',()=>form.elements.name.setCustomValidity(''));
document.getElementById('edit-request').addEventListener('click',()=>{result.hidden=true;form.hidden=false;form.elements.name.focus();});
document.getElementById('copy-message').addEventListener('click',async()=>{try{if(navigator.clipboard&&isSecureContext)await navigator.clipboard.writeText(prepared.value);else{prepared.focus();prepared.select();if(!document.execCommand('copy'))throw Error('copy');}status.textContent='Kopyalandı. Instagram sohbetimize yapıştırabilirsiniz.';}catch{prepared.focus();prepared.select();status.textContent='Mesajı seçtik. Kopyalayıp Instagram sohbetimize yapıştırabilirsiniz.';}});
