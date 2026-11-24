'use strict';
(() => {
  const panels = {
    emtp: { title: 'Titulación EMTP', path: './paneles/emtp.html', filename: 'Dashboard_EMTP_Los_Lagos_Egresados2025_Titulos2026.html', caption: 'Egresados 2025 · Títulos 2026 · Corte 16/10/2026' },
    ado: { title: 'Autorizaciones docentes', path: './paneles/ado.html', filename: 'Dashboard_ADO_Los_Lagos_2025_2026_Actualizado.html', caption: 'Procesos 2025 y 2026 · Corte MINEDUC 16/10/2026' },
    pie: { title: 'Programa de Integración Escolar', path: './paneles/pie.html', filename: 'Dashboard_PIE_Los_Lagos_2026.html', caption: 'PIE 2026 · Resumen del Excel · Última actualización registrada: 14/07/2026' },
    matricula: { title: 'Establecimientos y matrícula', path: './paneles/matricula.html', filename: 'Dashboard_Establecimientos_Matricula_Los_Lagos_2026_Buscador_RBD.html', caption: 'CEM 30/04/2026: 878 RBD con matrícula positiva · SEREMI 17/08/2026: 874 RBD · Buscador directo por RBD · DEPROV y provincia administrativa diferenciados' },
    evaluacion: { title: 'Evaluación y desarrollo profesional docente', path: './paneles/evaluacion-docente.html', filename: 'Dashboard_Evaluacion_Desarrollo_Profesional_Docente_Los_Lagos.html', caption: 'Portafolio 2025 · ECEP 2024–2025 · SIGE abril 2026 · Reconocimiento julio 2025 · Poblaciones independientes' },
    asistencia: { title: 'Asistencia escolar 2022–2025', path: './paneles/asistencia.html', filename: 'Dashboard_Asistencia_Escolar_Los_Lagos_2022_2025.html', caption: 'Serie 2022–2025 · Vista inicial anual 2025 · Registros disponibles: cobertura parcial por niveles y cursos' },
    convivencia: { title: 'Convivencia y bienestar educativo', path: './paneles/convivencia-bienestar.html', filename: 'Dashboard_Convivencia_Bienestar_Los_Lagos.html', caption: 'IDPS 2025 e historia · SIE ene–sep 2025–2026, preliminar · Avisos SEREMI al 22/10/2026 · Fuentes independientes' },
    trayectorias: { title: 'Trayectorias educativas 2026', path: './paneles/trayectorias.html', filename: 'Observatorio_Trayectorias_Educativas_Los_Lagos_2026_v2.html', caption: '3.er reporte 2026 · Corte SIGE 30/09/2026 · Educación General y EPJA: universos separados · Asistencia, permanencia y revinculación' }
  };
  const $ = id => document.getElementById(id);
  const viewer = $('viewer');
  const home = $('main');
  const loaded = new Set();
  const pending = new Set();
  let current = null;
  let loadTimer;
  let homeScroll = 0;
  const nf = new Intl.NumberFormat('es-CL');
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function drawSummary(summary) {
    for (const id of Object.keys(panels)) {
      const data = summary[id];
      const max = Math.max(1, ...data.provinces.map(x => x.value));
      $(id + '-chart').innerHTML = data.provinces.map(x => '<div class="chart-row"><span>' + escape(x.name) + '</span><span class="chart-rail" aria-hidden="true"><i style="width:' + (100 * x.value / max).toFixed(2) + '%"></i></span><b>' + nf.format(x.value) + '</b></div>').join('');
      $(id + '-total').textContent = nf.format(data.total);
    }
    $('emtp-graduates').textContent = nf.format(summary.emtp.graduates);
    $('ado-schools').textContent = nf.format(summary.ado.schools);
    $('pie-students').textContent = nf.format(summary.pie.students);
    $('pie-schools').textContent = nf.format(summary.pie.schools);
    $('matricula-schools').textContent = nf.format(summary.matricula.schools);
    $('matricula-cem-schools').textContent = nf.format(summary.matricula.cem_schools);
    $('matricula-courses').textContent = nf.format(summary.matricula.courses);
    $('evaluacion-ecep').textContent = nf.format(summary.evaluacion.ecep_2025);
    $('evaluacion-primary').textContent = nf.format(summary.evaluacion.primary_jobs_2026);
    $('convivencia-previous').textContent = nf.format(summary.convivencia.previous_comparable);
    $('convivencia-convivencia').textContent = nf.format(summary.convivencia.convivencia_2026);
    $('asistencia-schools').textContent = nf.format(summary.asistencia.schools);
    $('asistencia-rate').textContent = new Intl.NumberFormat('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(summary.asistencia.rate) + ' %';
  }

  function loadingState() {
    $('viewer-loading').hidden = !current || loaded.has(current);
    $('viewer-error').hidden = true;
    clearTimeout(loadTimer);
    if (current && !loaded.has(current)) {
      loadTimer = setTimeout(() => {
        if (current && !loaded.has(current)) {
          $('viewer-loading').hidden = true;
          $('viewer-error').hidden = false;
        }
      }, 25000);
    }
  }

  function loadPanel(id, force = false) {
    const frame = $('frame-' + id);
    if (force) {
      loaded.delete(id);
      pending.delete(id);
    }
    if (!loaded.has(id) && !pending.has(id)) {
      pending.add(id);
      frame.src = panels[id].path;
    }
    loadingState();
  }

  function showPanel(id) {
    const firstOpen = !current;
    if (firstOpen) homeScroll = window.scrollY;
    current = id;
    document.body.classList.add('in-viewer');
    home.hidden = true;
    viewer.hidden = false;
    for (const key of Object.keys(panels)) {
      const selected = key === id;
      $('panel-' + key).hidden = !selected;
      $('tab-' + key).setAttribute('aria-selected', String(selected));
      $('tab-' + key).setAttribute('tabindex', selected ? '0' : '-1');
    }
    $('open-original').href = panels[id].path;
    $('fallback-original').href = panels[id].path;
    $('download-original').href = panels[id].path;
    $('download-original').download = panels[id].filename;
    $('viewer-caption-text').textContent = panels[id].caption;
    document.title = panels[id].title + ' · Observatorio Educativo Los Lagos';
    $('announcement').textContent = 'Dashboard seleccionado: ' + panels[id].title;
    window.scrollTo(0, 0);
    if (firstOpen) $('tab-' + id).focus({ preventScroll: true });
    $('tab-' + id).scrollIntoView({ block: 'nearest', inline: 'nearest' });
    loadPanel(id);
  }

  function exitExpanded() {
    document.body.classList.remove('viewer-maximized');
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
    updateFullscreenButton();
  }

  function showHome(anchor) {
    const wasInViewer = Boolean(current);
    current = null;
    clearTimeout(loadTimer);
    document.body.classList.remove('in-viewer');
    exitExpanded();
    viewer.hidden = true;
    home.hidden = false;
    document.title = 'Observatorio Educativo · Los Lagos';
    if (wasInViewer) {
      if (!anchor || anchor === 'inicio') {
        window.scrollTo({ top: homeScroll, behavior: 'instant' });
        home.focus({ preventScroll: true });
      } else {
        $(anchor)?.scrollIntoView({ behavior: 'instant' });
      }
    } else if (anchor === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function route() {
    const id = window.location.hash.slice(1);
    if (Object.hasOwn(panels, id)) showPanel(id);
    else showHome(id);
  }

  function updateFullscreenButton() {
    const expanded = Boolean(document.fullscreenElement || document.body.classList.contains('viewer-maximized'));
    const button = $('fullscreen');
    const label = expanded ? 'Reducir el visor' : 'Ampliar el visor';
    button.title = label;
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-pressed', String(expanded));
    button.querySelector('span').textContent = expanded ? 'Reducir' : 'Ampliar';
  }

  $('fullscreen').addEventListener('click', async () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
      else if (document.body.classList.contains('viewer-maximized')) document.body.classList.remove('viewer-maximized');
      else if (viewer.requestFullscreen) await viewer.requestFullscreen();
      else document.body.classList.add('viewer-maximized');
    } catch {
      document.body.classList.toggle('viewer-maximized');
    }
    updateFullscreenButton();
  });
  document.addEventListener('fullscreenchange', updateFullscreenButton);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.body.classList.contains('viewer-maximized')) exitExpanded();
  });

  for (const id of Object.keys(panels)) {
    const frame = $('frame-' + id);
    frame.addEventListener('load', () => {
      if (!pending.has(id) || !frame.getAttribute('src')) return;
      // Same-origin panels let us confirm that their actual content was received.
      try {
        if (frame.contentDocument?.URL === 'about:blank') return;
        if (!frame.contentDocument?.querySelector('h1')) throw new Error('Panel not available');
      } catch {
        if (current === id) {
          clearTimeout(loadTimer);
          $('viewer-loading').hidden = true;
          $('viewer-error').hidden = false;
        }
        pending.delete(id);
        return;
      }
      loaded.add(id);
      pending.delete(id);
      if (current === id) loadingState();
    });
    frame.addEventListener('error', () => {
      pending.delete(id);
      if (current === id) {
        clearTimeout(loadTimer);
        $('viewer-loading').hidden = true;
        $('viewer-error').hidden = false;
      }
    });
  }
  $('retry-panel').addEventListener('click', () => { if (current) loadPanel(current, true); });
  document.querySelector('.viewer-switch').addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const ids = Object.keys(panels);
    const index = ids.indexOf(current);
    const id = event.key === 'Home' ? ids[0] : event.key === 'End' ? ids.at(-1) : ids[(index + (event.key === 'ArrowRight' ? 1 : -1) + ids.length) % ids.length];
    window.location.hash = id;
    $('tab-' + id).focus();
  });
  window.addEventListener('hashchange', route);
  fetch('./summary.json').then(response => {
    if (!response.ok) throw new Error('Summary unavailable');
    return response.json();
  }).then(drawSummary).catch(() => {
    // The complete dashboards remain accessible if their overview cannot load.
    for (const id of Object.keys(panels)) $(id + '-chart').textContent = 'Explore el detalle territorial en el dashboard.';
  });
  updateFullscreenButton();
  route();
})();
