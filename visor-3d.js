// Visor 3D de los proyectos (maceta, caja MIDI): arrastrar el modelo lo gira
// sin detener la animación. Un clic (o toque) sin arrastrar lo pausa: se
// detienen la animación y el giro automático. Otro clic lo vuelve a mover;
// si no, tras 4 segundos sin interacción vuelve a animarse solo.
(function () {
  const ESPERA = 4000;      // ms sin interacción antes de reanudar
  const MOVIMIENTO = 6;     // px: más que esto ya es arrastrar, no clic
  document.querySelectorAll('.modelos-3d model-viewer').forEach((visor) => {
    let temporizador = null;
    let inicio = null;
    const reanudar = () => {
      temporizador = null;
      visor.play();          // si el modelo no tiene animación, no hace nada
      visor.autoRotate = true;
    };
    const esperarYReanudar = () => {
      clearTimeout(temporizador);
      temporizador = setTimeout(reanudar, ESPERA);
    };
    visor.addEventListener('pointerdown', (e) => {
      inicio = { x: e.clientX, y: e.clientY };
    });
    visor.addEventListener('pointerup', (e) => {
      if (!inicio) return;
      const movio = Math.hypot(e.clientX - inicio.x, e.clientY - inicio.y) > MOVIMIENTO;
      inicio = null;
      if (movio) return;            // fue un arrastre: solo se giró
      if (temporizador) {           // clic estando en pausa: vuelve a moverse al tiro
        clearTimeout(temporizador);
        reanudar();
        return;
      }
      visor.pause();                // clic estando en movimiento: pausa
      visor.autoRotate = false;
      esperarYReanudar();
    });
    // Si está en pausa y la persona sigue girando o acercando, se reinicia la espera
    visor.addEventListener('camera-change', (e) => {
      if (e.detail.source === 'user-interaction' && temporizador) esperarYReanudar();
    });
  });
})();
