const header = document.querySelector("header");
const body = document.querySelector('body');
const tarjetas = document.querySelectorAll('.tarjeta');
const proyectosTitulo = document.querySelector('.proyectos h2');
const galeria = document.querySelector('.galeria');

// Header oculto al scroll
let lastScroll = 0;
window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if(currentScroll <= 0){ header.style.top = "0"; return; }
    if(currentScroll > lastScroll){ header.style.top = "-100px"; }
    else { header.style.top = "0"; }
    lastScroll = currentScroll;
});

// Toggle galería
proyectosTitulo.addEventListener('click', (e) => {
    e.stopPropagation();
    galeria.classList.toggle('active');
});

// Expansión de tarjetas: cuadrado centrico solo imagen
tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener('click', (e) => {
        e.stopPropagation();
        if(body.classList.contains('modal-active')) return;

        const rect = tarjeta.getBoundingClientRect();
        const clone = tarjeta.cloneNode(true);
        clone.classList.add('expand-clone');

        // Solo la imagen dentro
        const img = clone.querySelector('img');
        const title = clone.querySelector('h3');
        if(title) title.remove();

        // Estilos del cuadrado centrico
        clone.style.position = 'fixed';
        clone.style.top = rect.top + 'px';
        clone.style.left = rect.left + 'px';
        clone.style.width = rect.width + 'px';
        clone.style.height = rect.width + 'px'; // cuadrado
        clone.style.margin = 0;
        clone.style.zIndex = 50;
        clone.style.transition = 'all 0.4s ease';
        clone.style.display = 'flex';
        clone.style.alignItems = 'center';
        clone.style.justifyContent = 'center';
        clone.style.borderRadius = '24px';
        clone.style.background = 'rgba(255,255,255,0.18)';
        clone.style.backdropFilter = 'blur(6px) saturate(300%) brightness(0.95)';
        clone.style.overflow = 'hidden';
        clone.style.boxSizing = 'border-box';

        if(img){
            img.style.width = '90%';
            img.style.height = '90%';
            img.style.objectFit = 'contain';
            img.style.margin = 'auto';
            img.style.display = 'block';
        }

        body.appendChild(clone);
        body.classList.add('modal-active');

        // Animación de centrado con tamaño mayor
        requestAnimationFrame(() => {
            clone.style.top = '50%';
            clone.style.left = '50%';
            clone.style.width = '60vw'; // más grande
            clone.style.height = '60vw'; // cuadrado proporcional
            clone.style.maxWidth = '600px'; // ajustar max tamaño
            clone.style.maxHeight = '600px';
            clone.style.transform = 'translate(-50%, -50%)';
        });

        // Cierre al click y abrir link
        clone.addEventListener('click', () => {
            const link = tarjeta.dataset.link;
            if(link) window.open(link, "_blank");

            // Animación de cierre
            clone.style.width = rect.width + 'px';
            clone.style.height = rect.width + 'px';
            clone.style.top = rect.top + 'px';
            clone.style.left = rect.left + 'px';
            clone.style.transform = '';
            setTimeout(() => {
                clone.remove();
                body.classList.remove('modal-active');
            }, 400);
        });
    });
});

// Cerrar expansión al click fuera
body.addEventListener('click', (e)=>{
    if(e.target===body && body.classList.contains('modal-active')){
        document.querySelectorAll('.expand-clone').forEach(t=>{
            t.remove();
        });
        body.classList.remove('modal-active');
    }
});

const autorTitulo = document.querySelector('.autor-titulo');
const autorTexto = document.querySelector('.autor-texto');

autorTitulo.addEventListener('click', (e) => {
  e.stopPropagation();
  autorTexto.classList.toggle('active');
});

// Cierre al click fuera
document.body.addEventListener('click', (e) => {
  if (!autorTexto.contains(e.target) && !autorTitulo.contains(e.target)) {
    autorTexto.classList.remove('active');
  }
});

const introTitulo = document.querySelector('.intro-titulo');
const introTexto = document.querySelector('.intro-texto');

introTitulo.addEventListener('click', (e) => {
  e.stopPropagation();
  introTexto.classList.toggle('active');
});

// opcional: cerrar si clickeas fuera
document.body.addEventListener('click', (e) => {
  if (!introTexto.contains(e.target) && !introTitulo.contains(e.target)) {
    introTexto.classList.remove('active');
  }
});

// Toggle contenido al hacer click en el título
document.querySelectorAll('.sobre-p5js h2').forEach(title => {
    title.addEventListener('click', () => {
        const contenedor = title.parentElement;
        contenedor.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const autorTitulo = document.querySelector('.sobre-autor .autor-titulo');
  const autorContenido = document.querySelector('.sobre-autor .autor-contenido');

  if (autorTitulo && autorContenido) {
    autorTitulo.addEventListener('click', () => {
      autorContenido.classList.toggle('active');
    });
  }
});
