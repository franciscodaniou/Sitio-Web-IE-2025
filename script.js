const header = document.querySelector("header");
const body = document.querySelector('body');
const tarjetas = document.querySelectorAll('.tarjeta');

// Header oculto al scroll
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if(currentScroll <= 0){ header.style.top = "0"; return; }
  if(currentScroll > lastScroll){ header.style.top = "-100px"; }
  else { header.style.top = "0"; }
  lastScroll = currentScroll;
  
});

// Expansión de tarjetas al click
tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener('click', (e) => {
        e.stopPropagation();
        if(!tarjeta.classList.contains('expand')){

            const rect = tarjeta.getBoundingClientRect();
            const originX = (e.clientX - rect.left)/rect.width*100 + '%';
            const originY = (e.clientY - rect.top)/rect.height*100 + '%';
            tarjeta.style.setProperty('--origin-x', originX);
            tarjeta.style.setProperty('--origin-y', originY);

            tarjeta.style.top = rect.top + 'px';
            tarjeta.style.left = rect.left + 'px';
            tarjeta.classList.add('expand');

            void tarjeta.offsetWidth;

            tarjeta.style.top = '50%';
            tarjeta.style.left = '50%';
            tarjeta.style.transform = 'translate(-50%,-50%) scale(3)';

            body.classList.add('modal-active');

        } else {
            const link = tarjeta.dataset.link;
            if(link) window.open(link, "_blank");
            tarjeta.classList.remove('expand');
            body.classList.remove('modal-active');
            tarjeta.style.transform = '';
            tarjeta.style.top = '';
            tarjeta.style.left = '';
        }
    });
});

document.querySelectorAll('.tarjeta').forEach(card => {
  let expanded = false;

  card.addEventListener('click', (e) => {
    e.preventDefault();
    const link = card.querySelector('a');

    if (!expanded) {
      // expandir
      card.classList.add('expand');
      expanded = true;
    } else {
      // cerrar
      card.classList.remove('expand');
      expanded = false;

      // aplicar no-hover para anular el efecto hover
      card.classList.add('no-hover');
      setTimeout(() => {
        card.classList.remove('no-hover'); // se quita tras volver al estado normal
      }, 300);

      if (link) {
        window.open(link.href, '_blank');
      }
    }
  });
});

document.querySelectorAll('.tarjeta').forEach(card => {
  let expanded = false;

  card.addEventListener('click', (e) => {
    e.preventDefault();
    const link = card.querySelector('a');

    if (!expanded) {
      // expandir
      card.classList.add('expand');
      expanded = true;
    } else {
      // cerrar
      card.classList.remove('expand');
      expanded = false;

      // aplicar no-hover para anular el efecto hover
      card.classList.add('no-hover');
      setTimeout(() => {
        card.classList.remove('no-hover'); // se quita tras volver al estado normal
      }, 300);

      if (link) {
        window.open(link.href, '_blank');
      }
    }
  });
});

// Ajuste dinámico de color de texto al hover sobre vidrio
const elementos = [header, ...tarjetas, ...document.querySelectorAll('button'), document.querySelector('.intro')];

function adjustTextColor(el){
    el.querySelectorAll('p,h1,h2,h3,button').forEach(t => t.style.color=' rgba(161, 174, 182, 0.78)');
}
function resetTextColor(el){
    el.querySelectorAll('p,h1,h2,h3,button').forEach(t => t.style.color='');
}

elementos.forEach(el=>{
    el.addEventListener('mouseenter',()=>adjustTextColor(el));
    el.addEventListener('mouseleave',()=>resetTextColor(el));
});

// Cerrar expansión al click fuera
body.addEventListener('click', (e)=>{
    if(e.target===body && body.classList.contains('modal-active')){
        document.querySelectorAll('.tarjeta.expand').forEach(t=>{
            t.classList.remove('expand');
            t.style.transform='';
            t.style.top='';
            t.style.left='';
        });
        body.classList.remove('modal-active');
    }
});
const proyectosTitulo = document.querySelector('.proyectos h2');
const galeria = document.querySelector('.galeria');

proyectosTitulo.addEventListener('click', () => {
  galeria.classList.toggle('active');
});