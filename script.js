/* TRIP TRAVEL — comportamiento compartido */

/* menú móvil */
document.querySelectorAll(".nav-toggle").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const nav=btn.closest(".site-header").querySelector(".main-nav");
    nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", nav.classList.contains("open"));
  });
});

/* marca la página activa en el menú */
(function(){
  const here=location.pathname.split("/").pop()||"index.html";
  document.querySelectorAll(".main-nav a").forEach(a=>{
    if(a.getAttribute("href")===here) a.classList.add("active");
  });
})();

/* filtros de destinos (tours.html) */
document.querySelectorAll(".filters").forEach(group=>{
  const buttons=group.querySelectorAll("button");
  const cards=document.querySelectorAll("[data-cat]");
  buttons.forEach(b=>b.addEventListener("click",()=>{
    buttons.forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    const cat=b.dataset.filter;
    cards.forEach(c=>{
      c.style.display = (cat==="todos" || c.dataset.cat===cat) ? "" : "none";
    });
  }));
});

/* formulario de contacto -> arma mensaje de WhatsApp */
const waForm=document.getElementById("contactForm");
if(waForm){
  waForm.addEventListener("submit",e=>{
    e.preventDefault();
    const d=new FormData(waForm);
    const msg=`Hola TRIP Travel, soy ${d.get("nombre")||"—"}.\n`+
      `Interés: ${d.get("servicio")||"—"}\n`+
      `Mensaje: ${d.get("mensaje")||"—"}\n`+
      `Contacto: ${d.get("contacto")||"—"}`;
    const waNumber = document.body.dataset.wa || "51954021718";
    window.location.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  });
}

/* revelado suave de la franja de confianza / pasos (una sola vez, sutil) */
const io=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){ en.target.classList.add("in-view"); io.unobserve(en.target); }
  });
},{threshold:.2});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));


/* Medios resilientes: fallback fotográfico si una URL externa deja de funcionar. */
(function(){
  const fallbackImages = [
    "https://images.pexels.com/videos/4361882/archaeological-site-beautiful-view-clouds-machu-picchu-4361882.jpeg?auto=compress&dpr=1&h=750&w=1260",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  ];
  document.querySelectorAll('img[data-img-fallback="true"]').forEach(img=>{
    let attempts=0;
    const retry=()=>{
      if(attempts < fallbackImages.length){
        const next=fallbackImages[attempts++];
        if(img.src===next){retry();return;}
        img.src=next;return;
      }
      img.classList.add('image-unavailable');
      img.removeAttribute('src');
    };
    img.addEventListener('error',retry);
    if(img.complete && img.naturalWidth===0) retry();
  });
  document.querySelectorAll('video').forEach(video=>{
    video.addEventListener('error',()=>video.classList.add('video-unavailable'));
  });
})();
