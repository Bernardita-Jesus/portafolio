// Fotos crecientes: las dos fotos pequeñas bajo la foto principal se turnan
// cada 4 segundos (la pequeña crece y la grande se achica). Se detienen
// mientras el mouse está encima, y no se mueven si la persona pidió reducir
// el movimiento en su sistema. Los estilos están en style.css.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.fotos-crecientes').forEach((fotos) => {
    let pausa = false;
    fotos.addEventListener('mouseenter', () => { pausa = true; });
    fotos.addEventListener('mouseleave', () => { pausa = false; });
    setInterval(() => {
      if (!pausa && !document.hidden) fotos.classList.toggle('turno');
    }, 4000);
  });
})();
