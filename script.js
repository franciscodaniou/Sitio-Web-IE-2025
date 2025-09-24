
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector("header");
  const body = document.querySelector('body');
  const tarjetas = document.querySelectorAll('.tarjeta');
  const proyectosTitulo = document.querySelector('.proyectos h2');
  const galeria = document.querySelector('.galeria');
  const autorTitulo = document.querySelector('.autor-titulo');
  const autorTexto = document.querySelector('.autor-texto');
  const introTitulo = document.querySelector('.intro-titulo');
  const introTexto = document.querySelector('.intro-texto');

  
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) { 
      header.style.top = "0"; 
      return; 
    }
    if (currentScroll > lastScroll) { 
      header.style.top = "-100px"; 
    } else { 
      header.style.top = "0"; 
    }
    lastScroll = currentScroll;
  });

  
  if (proyectosTitulo && galeria) {
    proyectosTitulo.addEventListener('click', () => {
      galeria.classList.toggle('active');
      if (galeria.classList.contains('active')) {
        galeria.style.maxHeight = galeria.scrollHeight + 'px'; 
      } else {
        galeria.style.maxHeight = '0';
      }
    });
  }

  
  if (autorTitulo && autorTexto) {
    autorTitulo.addEventListener('click', (e) => {
      e.stopPropagation();
      autorTexto.classList.toggle('active');
    });

    
    body.addEventListener('click', (e) => {
      if (!autorTexto.contains(e.target) && !autorTitulo.contains(e.target)) {
        autorTexto.classList.remove('active');
      }
    });
  }

  
  if (introTitulo && introTexto) {
    introTitulo.addEventListener('click', (e) => {
      e.stopPropagation();
      introTexto.classList.toggle('active');
    });

    
    body.addEventListener('click', (e) => {
      if (!introTexto.contains(e.target) && !introTitulo.contains(e.target)) {
        introTexto.classList.remove('active');
      }
    });
  }

  
  document.querySelectorAll('.sobre-p5js h2').forEach(title => {
    title.addEventListener('click', () => {
      const contenedor = title.parentElement;
      contenedor.classList.toggle('active');
    });
  });

  
  const autorTituloSobre = document.querySelector('.sobre-autor .autor-titulo');
  const autorContenidoSobre = document.querySelector('.sobre-autor .autor-contenido');
  if (autorTituloSobre && autorContenidoSobre) {
    autorTituloSobre.addEventListener('click', () => {
      autorContenidoSobre.classList.toggle('active');
    });
  }

 
  let clonExpandido = null; 

  tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener('click', (e) => {
      e.stopPropagation();
      if (body.classList.contains('modal-active')) return; 

      const rect = tarjeta.getBoundingClientRect();
      const clone = tarjeta.cloneNode(true);
      clone.classList.add('expand-clone', 'tarjeta'); 

    
      const img = clone.querySelector('img');
      const title = clone.querySelector('h3');
      if (title) title.remove(); 

      
      clone.style.position = 'fixed';
      clone.style.top = rect.top + 'px';
      clone.style.left = rect.left + 'px';
      clone.style.width = rect.width + 'px';
      clone.style.height = rect.width + 'px'; 
      clone.style.margin = '0';
      clone.style.zIndex = '1000'; 
      clone.style.transition = 'all 0.4s ease';
      clone.style.display = 'flex';
      clone.style.alignItems = 'center';
      clone.style.justifyContent = 'center';
      clone.style.borderRadius = '34px'; 
      clone.style.background = 'rgba(255, 255, 255, 0.18)'; 
      clone.style.backdropFilter = 'blur(6px) saturate(300%) brightness(0.95)'; 
      clone.style.border = '1px solid rgba(220, 220, 220, 0.8)'; 
      clone.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.32), 0 8px 18px rgba(173, 216, 255, 0.45)'; 
      clone.style.overflow = 'visible'; 
      clone.style.boxSizing = 'border-box';
      clone.style.pointerEvents = 'auto'; 
      clone.style.cursor = 'pointer'; 
      clone.style.color = 'var(--text-color, #333)'; 

      
      if (img) {
        img.style.width = '90%';
        img.style.height = '90%';
        img.style.objectFit = 'contain';
        img.style.margin = 'auto';
        img.style.display = 'block';
        img.style.pointerEvents = 'none'; 
        img.style.borderRadius = '18px'; 
        img.style.zIndex = '2'; 
      }

      body.appendChild(clone);
      body.classList.add('modal-active');
      clonExpandido = clone;

      
      requestAnimationFrame(() => {
        clone.style.top = '50%';
        clone.style.left = '50%';
        clone.style.width = '60vw';
        clone.style.height = '60vw'; 
        clone.style.maxWidth = '600px';
        clone.style.maxHeight = '600px';
        clone.style.transform = 'translate(-50%, -50%)';
        clone.style.borderRadius = '40px'; 
        clone.style.boxShadow = '0 28px 56px rgba(0, 0, 0, 0.55), 0 0 44px rgba(173, 216, 255, 0.55)'; 
        clone.style.background = 'rgba(255, 255, 255, 0.18)'; 
        clone.style.backdropFilter = 'blur(6px) saturate(300%) brightness(1.05)'; 
        clone.style.border = '1px solid rgba(220, 220, 220, 0.8)'; 
      });

      
      body.style.overflow = 'hidden';
    });
  });

  
  function cerrarClon() {
    if (!clonExpandido) return;

    
    clonExpandido.style.width = '300px'; 
    clonExpandido.style.height = '300px';
    clonExpandido.style.top = '50%';
    clonExpandido.style.left = '50%';
    clonExpandido.style.transform = 'translate(-50%, -50%) scale(0.8)'; 
    clonExpandido.style.borderRadius = '34px'; 
    clonExpandido.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.32), 0 8px 18px rgba(173, 216, 255, 0.45)'; 

    setTimeout(() => {
      if (clonExpandido) {
        clonExpandido.remove();
        clonExpandido = null;
      }
      body.classList.remove('modal-active');
      body.style.overflow = '';
    }, 400);
  }

 
  body.addEventListener('click', (e) => {
    if (clonExpandido && clonExpandido.contains(e.target)) {
     
      const imgClon = clonExpandido.querySelector('img');
      const tarjetaFuente = Array.from(document.querySelectorAll('.tarjeta')).find(t => {
        const imgOriginal = t.querySelector('img');
        return imgClon && imgOriginal && imgClon.src === imgOriginal.src;
      });
      if (tarjetaFuente && tarjetaFuente.dataset.link) {
        window.open(tarjetaFuente.dataset.link, '_blank');
      }
      cerrarClon();
    }

  
    if (clonExpandido && !clonExpandido.contains(e.target)) {
      cerrarClon();
    }

    
  });

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && clonExpandido) {
      cerrarClon();
    }
  });
});
