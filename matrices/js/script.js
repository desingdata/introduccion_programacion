// ============================================================
//  THEME TOGGLE
// ============================================================
const themeBtn = document.getElementById('themeBtn');
const html = document.documentElement;

// Persist theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ============================================================
//  HAMBURGER / DRAWER
// ============================================================
const hamburger = document.getElementById('hamburger');
const navDrawer = document.getElementById('navDrawer');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  navDrawer.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

// Close drawer on link click
document.querySelectorAll('.drawer-link').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navDrawer.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close drawer on outside click
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navDrawer.contains(e.target)) {
    hamburger.classList.remove('open');
    navDrawer.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ============================================================
//  SCROLL TO TOP
// ============================================================
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ============================================================
//  DATOS GLOBALES DEL PROYECTO
// ============================================================
const estudiantes = ["Ana", "Luis", "María", "Pedro"];
const materias = ["Matemáticas", "Python", "Inglés"];

let calificaciones = [
  [85, 92, 78],
  [70, 88, 95],
  [90, 75, 83],
  [60, 80, 72],
];

// ============================================================
//  FUNCIONES DE OPERACIONES
// ============================================================
function accesoElemento(fila, col) { return calificaciones[fila][col]; }

function modificarNota(fila, col, nuevaNota) { calificaciones[fila][col] = nuevaNota; }

function promedioEstudiante(fila) {
  const suma = calificaciones[fila].reduce((a, b) => a + b, 0);
  return suma / calificaciones[fila].length;
}

function promedioMateria(col) {
  let suma = 0;
  for (let i = 0; i < calificaciones.length; i++) suma += calificaciones[i][col];
  return suma / calificaciones.length;
}

function notaMaxima() {
  let max = calificaciones[0][0], filMax = 0, colMax = 0;
  for (let i = 0; i < calificaciones.length; i++)
    for (let j = 0; j < calificaciones[i].length; j++)
      if (calificaciones[i][j] > max) { max = calificaciones[i][j]; filMax = i; colMax = j; }
  return { max, fil: filMax, col: colMax };
}

function crearIdentidad(n) {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );
}

// ============================================================
//  HELPERS DE RENDERIZADO
// ============================================================
function codeBlock(code) {
  return `<div class="code-block">
    <div class="code-header">
      <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
      <span class="code-lang">JAVASCRIPT</span>
    </div>
    <pre>${code}</pre>
  </div>`;
}

function outputBox(id, content = '') {
  return `<div class="output-box">
    <div class="output-header">OUTPUT</div>
    <div class="output-content" id="${id}">${content}</div>
  </div>`;
}

function definition(def) {
  return `<div class="definition"><p>${def}</p></div>`;
}

function renderMatrizBase(highlight = null, rowHL = null, colHL = null) {
  let html = '<div class="matrix-visual">';
  html += '<span class="matrix-bracket">[</span><div><div class="matrix-grid">';
  for (let i = 0; i < calificaciones.length; i++) {
    html += '<div class="matrix-row">';
    for (let j = 0; j < calificaciones[i].length; j++) {
      let cls = 'matrix-cell';
      if (highlight && highlight[0] === i && highlight[1] === j) cls += ' highlight';
      else if (rowHL === i) cls += ' row-hl';
      else if (colHL === j) cls += ' col-hl';
      html += `<div class="${cls}">${calificaciones[i][j]}</div>`;
    }
    html += '</div>';
  }
  html += '</div></div><span class="matrix-bracket">]</span></div>';
  return html;
}

// ============================================================
//  SECCIONES
// ============================================================
const sections = [
  {
    id: 'sec-02', num: '02', title: 'Declaración e Inicialización', concept: 'ARRAY 2D',
    def: `Una <strong>matriz</strong> es un array de arrays. Cada elemento del array externo es una fila, y cada elemento del array interno es una columna. Se accede con dos índices: <strong>matriz[fila][columna]</strong>. Los índices comienzan en <strong>0</strong>.`,
    code: `<span class="cm">// Array externo = filas (estudiantes)</span>
<span class="cm">// Array interno = columnas (materias)</span>
<span class="kw">const</span> <span class="var">calificaciones</span> = [
  [<span class="num">85</span>, <span class="num">92</span>, <span class="num">78</span>],  <span class="cm">// fila 0 → Ana</span>
  [<span class="num">70</span>, <span class="num">88</span>, <span class="num">95</span>],  <span class="cm">// fila 1 → Luis</span>
  [<span class="num">90</span>, <span class="num">75</span>, <span class="num">83</span>],  <span class="cm">// fila 2 → María</span>
  [<span class="num">60</span>, <span class="num">80</span>, <span class="num">72</span>],  <span class="cm">// fila 3 → Pedro</span>
];
<span class="var">calificaciones</span>.length;      <span class="cm">// 4 filas</span>
<span class="var">calificaciones</span>[<span class="num">0</span>].length;   <span class="cm">// 3 columnas</span>`,
    render: () => {
      const out = document.getElementById('out-02');
      if (out) out.innerHTML = renderMatrizBase() +
        `<div class="matrix-label">${calificaciones.length} filas × ${calificaciones[0].length} columnas</div>`;
    },
    outputId: 'out-02', full: false
  },
  {
    id: 'sec-03', num: '03', title: 'Acceso a Elementos', concept: 'INDEXACIÓN',
    def: `Se accede a una celda usando <strong>dos índices</strong>: el primero selecciona la <strong>fila</strong> y el segundo la <strong>columna</strong>. <strong>calificaciones[1][2]</strong> → fila 1 (Luis), columna 2 (Inglés).`,
    code: `<span class="cm">// Acceso: matriz[fila][columna]</span>
<span class="kw">const</span> <span class="var">nota</span> = <span class="var">calificaciones</span>[<span class="num">1</span>][<span class="num">2</span>];
<span class="cm">// fila 1 = Luis, columna 2 = Inglés → 95</span>

<span class="kw">function</span> <span class="fn">accesoElemento</span>(<span class="var">fila</span>, <span class="var">col</span>) {
  <span class="kw">return</span> <span class="var">calificaciones</span>[<span class="var">fila</span>][<span class="var">col</span>];
}
<span class="fn">console</span>.log(<span class="fn">accesoElemento</span>(<span class="num">0</span>, <span class="num">1</span>));  <span class="cm">// 92 (Ana, Python)</span>`,
    render: () => {
      const out = document.getElementById('out-03');
      if (!out) return;
      out.innerHTML = renderMatrizBase([1, 2]);
      out.innerHTML += `<br><span style="color:var(--muted);font-size:.78rem">calificaciones[1][2] = </span><span style="color:var(--accent);font-weight:700">${calificaciones[1][2]}</span>`;
    },
    outputId: 'out-03', full: false,
    extra: () => `
      <div class="controls" style="margin-top:14px">
        <label>Fila</label><input type="number" id="acc-fil" value="0" min="0" max="3">
        <label>Columna</label><input type="number" id="acc-col" value="1" min="0" max="2">
        <button class="btn" onclick="doAcceso()">Acceder</button>
      </div>
      <div id="acc-result" style="margin-top:10px;font-family:var(--mono);font-size:.82rem;color:var(--accent)"></div>`
  },
  {
    id: 'sec-04', num: '04', title: 'Recorrido (Traversal)', concept: 'BUCLES ANIDADOS',
    def: `Para visitar <strong>todos los elementos</strong> se usan bucles anidados: el <strong>externo</strong> recorre filas y el <strong>interno</strong> recorre columnas. Complejidad: O(filas × columnas).`,
    code: `<span class="cm">// Bucle externo → filas (i)</span>
<span class="cm">// Bucle interno → columnas (j)</span>
<span class="kw">for</span> (<span class="kw">let</span> <span class="var">i</span> = <span class="num">0</span>; <span class="var">i</span> &lt; <span class="var">calificaciones</span>.length; <span class="var">i</span>++) {
  <span class="kw">for</span> (<span class="kw">let</span> <span class="var">j</span> = <span class="num">0</span>; <span class="var">j</span> &lt; <span class="var">calificaciones</span>[<span class="var">i</span>].length; <span class="var">j</span>++) {
    <span class="fn">console</span>.log(
      <span class="var">estudiantes</span>[<span class="var">i</span>], <span class="var">materias</span>[<span class="var">j</span>],
      <span class="var">calificaciones</span>[<span class="var">i</span>][<span class="var">j</span>]
    );
  }
}`,
    render: () => {
      const out = document.getElementById('out-04');
      if (!out) return;
      let html = '<div class="table-wrapper"><table><thead><tr><th>Estudiante</th>';
      materias.forEach(m => html += `<th>${m}</th>`);
      html += '</tr></thead><tbody>';
      calificaciones.forEach((fila, i) => {
        html += `<tr><td>${estudiantes[i]}</td>`;
        fila.forEach(n => html += `<td class="num-cell">${n}</td>`);
        html += '</tr>';
      });
      html += '</tbody></table></div>';
      out.innerHTML = html;
    },
    outputId: 'out-04', full: true
  },
  {
    id: 'sec-05', num: '05', title: 'Modificación de Elementos', concept: 'ASIGNACIÓN',
    def: `Para <strong>actualizar</strong> una celda se usa asignación directa: <strong>matriz[fila][columna] = nuevoValor</strong>. Los arrays en JS son mutables, el cambio afecta el array original.`,
    code: `<span class="kw">function</span> <span class="fn">modificarNota</span>(<span class="var">fila</span>, <span class="var">col</span>, <span class="var">nuevaNota</span>) {
  <span class="cm">// Asignación directa a la celda</span>
  <span class="var">calificaciones</span>[<span class="var">fila</span>][<span class="var">col</span>] = <span class="var">nuevaNota</span>;
}
<span class="cm">// Luis (fila 1) mejoró Inglés (col 2)</span>
<span class="fn">modificarNota</span>(<span class="num">1</span>, <span class="num">2</span>, <span class="num">98</span>);
<span class="fn">console</span>.log(<span class="var">calificaciones</span>[<span class="num">1</span>][<span class="num">2</span>]); <span class="cm">// 98</span>`,
    render: () => {
      const out = document.getElementById('out-05');
      if (!out) return;
      out.innerHTML = renderMatrizBase([1, 2]);
      out.innerHTML += `<br><span style="color:var(--muted);font-size:.78rem">calificaciones[1][2] = </span><span style="color:var(--accent2);font-weight:700">${calificaciones[1][2]}</span>`;
    },
    outputId: 'out-05', full: false,
    extra: () => `
      <div class="controls" style="margin-top:14px">
        <label>Fila</label><input type="number" id="mod-fil" value="1" min="0" max="${calificaciones.length - 1}">
        <label>Col</label><input type="number" id="mod-col" value="2" min="0" max="2">
        <label>Nota</label><input type="number" id="mod-val" value="98" min="0" max="100">
        <button class="btn red" onclick="doModificar()">Modificar</button>
      </div>
      <div id="mod-result" style="margin-top:10px;font-family:var(--mono);font-size:.8rem;color:var(--accent2)"></div>`
  },
  {
    id: 'sec-06', num: '06', title: 'Operaciones por Fila', concept: 'REDUCE / FILA',
    def: `Recorrer <strong>una fila completa</strong> para calcular un resultado. <strong>Array.reduce()</strong> acumula todos los valores de la fila en un único resultado (la suma, en este caso).`,
    code: `<span class="kw">function</span> <span class="fn">promedioEstudiante</span>(<span class="var">fila</span>) {
  <span class="kw">const</span> <span class="var">suma</span> = <span class="var">calificaciones</span>[<span class="var">fila</span>]
    .reduce((<span class="var">acc</span>, <span class="var">val</span>) =&gt; <span class="var">acc</span> + <span class="var">val</span>, <span class="num">0</span>);
  <span class="kw">return</span> <span class="var">suma</span> / <span class="var">calificaciones</span>[<span class="var">fila</span>].length;
}
<span class="fn">promedioEstudiante</span>(<span class="num">0</span>); <span class="cm">// Ana → 85.0</span>
<span class="fn">promedioEstudiante</span>(<span class="num">2</span>); <span class="cm">// María → 82.7</span>`,
    render: () => {
      const out = document.getElementById('out-06');
      if (!out) return;
      let html = '';
      calificaciones.forEach((_, i) => {
        const p = promedioEstudiante(i);
        html += `<div style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;font-family:var(--mono);font-size:.76rem;margin-bottom:5px">
            <span style="color:var(--text)">${estudiantes[i]}</span>
            <span style="color:var(--accent3)">${p.toFixed(1)}</span>
          </div>
          <div style="background:var(--surface);border-radius:4px;height:6px;overflow:hidden;border:1px solid var(--border)">
            <div style="width:${p.toFixed(0)}%;height:100%;background:var(--accent3);border-radius:4px;transition:width .6s ease"></div>
          </div>
        </div>`;
      });
      out.innerHTML = html;
    },
    outputId: 'out-06', full: false
  },
  {
    id: 'sec-07', num: '07', title: 'Operaciones por Columna', concept: 'COLUMNA FIJA',
    def: `Recorrer <strong>una columna</strong> fijando el índice de columna y variando el de fila. No existe <strong>columna[j]</strong> directamente: hay que acceder a <strong>calificaciones[i][j]</strong> en cada iteración.`,
    code: `<span class="kw">function</span> <span class="fn">promedioMateria</span>(<span class="var">col</span>) {
  <span class="kw">let</span> <span class="var">suma</span> = <span class="num">0</span>;
  <span class="kw">for</span> (<span class="kw">let</span> <span class="var">i</span> = <span class="num">0</span>; <span class="var">i</span> &lt; <span class="var">calificaciones</span>.length; <span class="var">i</span>++) {
    <span class="var">suma</span> += <span class="var">calificaciones</span>[<span class="var">i</span>][<span class="var">col</span>]; <span class="cm">// col fija</span>
  }
  <span class="kw">return</span> <span class="var">suma</span> / <span class="var">calificaciones</span>.length;
}
<span class="fn">promedioMateria</span>(<span class="num">0</span>); <span class="cm">// Matemáticas</span>`,
    render: () => {
      const out = document.getElementById('out-07');
      if (!out) return;
      let html = '<div style="display:flex;gap:14px;flex-wrap:wrap">';
      materias.forEach((m, j) => {
        const p = promedioMateria(j);
        html += `<div style="text-align:center;flex:1;min-width:90px">
          <div style="font-family:var(--mono);font-size:1.8rem;font-weight:700;color:var(--accent2)">${p.toFixed(1)}</div>
          <div style="font-size:.76rem;color:var(--muted);margin-top:4px">${m}</div>
        </div>`;
      });
      html += '</div>';
      out.innerHTML = html;
    },
    outputId: 'out-07', full: false
  },
  {
    id: 'sec-08', num: '08', title: 'Búsqueda en la Matriz', concept: 'VALOR MÁXIMO',
    def: `Recorrer todos los elementos con bucles anidados para <strong>localizar</strong> un valor específico. Se guarda el mayor encontrado y la posición <strong>[fila][columna]</strong> donde se ubica.`,
    code: `<span class="kw">function</span> <span class="fn">notaMaxima</span>() {
  <span class="kw">let</span> <span class="var">max</span> = <span class="var">calificaciones</span>[<span class="num">0</span>][<span class="num">0</span>];
  <span class="kw">let</span> <span class="var">filMax</span> = <span class="num">0</span>, <span class="var">colMax</span> = <span class="num">0</span>;
  <span class="kw">for</span> (<span class="kw">let</span> <span class="var">i</span> = <span class="num">0</span>; <span class="var">i</span> &lt; <span class="var">calificaciones</span>.length; <span class="var">i</span>++) {
    <span class="kw">for</span> (<span class="kw">let</span> <span class="var">j</span> = <span class="num">0</span>; <span class="var">j</span> &lt; <span class="var">calificaciones</span>[<span class="var">i</span>].length; <span class="var">j</span>++) {
      <span class="kw">if</span> (<span class="var">calificaciones</span>[<span class="var">i</span>][<span class="var">j</span>] &gt; <span class="var">max</span>) {
        <span class="var">max</span> = <span class="var">calificaciones</span>[<span class="var">i</span>][<span class="var">j</span>];
        <span class="var">filMax</span> = <span class="var">i</span>; <span class="var">colMax</span> = <span class="var">j</span>;
      }
    }
  }
  <span class="kw">return</span> { <span class="var">max</span>, <span class="var">fil</span>: <span class="var">filMax</span>, <span class="var">col</span>: <span class="var">colMax</span> };
}`,
    render: () => {
      const out = document.getElementById('out-08');
      if (!out) return;
      const r = notaMaxima();
      out.innerHTML = renderMatrizBase([r.fil, r.col]);
      out.innerHTML += `<br><span style="font-family:var(--mono);font-size:.78rem;color:var(--muted)">
        Máximo: </span><strong style="color:var(--accent)">${r.max}</strong>
        <span style="color:var(--muted);font-size:.73rem"> → ${estudiantes[r.fil]}, ${materias[r.col]}</span>`;
    },
    outputId: 'out-08', full: false
  },
  {
    id: 'sec-09', num: '09', title: 'Agregar una Fila — push()', concept: 'PUSH',
    def: `<strong>push()</strong> inserta un nuevo array al final de la matriz, añadiendo una fila completa. El tamaño de la matriz crece dinámicamente; no hace falta declarar el tamaño de antemano.`,
    code: `<span class="kw">const</span> <span class="var">nuevoEstudiante</span> = <span class="str">"Carlos"</span>;
<span class="kw">const</span> <span class="var">nuevasNotas</span> = [<span class="num">77</span>, <span class="num">84</span>, <span class="num">91</span>];

<span class="var">estudiantes</span>.push(<span class="var">nuevoEstudiante</span>);
<span class="var">calificaciones</span>.push(<span class="var">nuevasNotas</span>);

<span class="fn">console</span>.log(<span class="var">calificaciones</span>.length); <span class="cm">// 5</span>`,
    render: () => {
      const out = document.getElementById('out-09');
      if (!out) return;
      out.innerHTML = `<span style="font-family:var(--mono);font-size:.8rem">
        Filas actuales: <span style="color:var(--accent)">${calificaciones.length}</span><br><br>
        ${estudiantes.map((e, i) => `<span style="color:var(--muted)">[${i}]</span> <span style="color:var(--text)">${e}</span> → <span style="color:var(--accent3)">[${calificaciones[i].join(', ')}]</span>`).join('<br>')}
      </span>`;
    },
    outputId: 'out-09', full: false,
    extra: () => `
      <div class="controls" style="margin-top:14px;flex-wrap:wrap">
        <input type="text" id="push-name" placeholder="Nombre" style="width:100px">
        <input type="number" id="push-n1" placeholder="Mat" min="0" max="100" style="width:58px">
        <input type="number" id="push-n2" placeholder="Py" min="0" max="100" style="width:58px">
        <input type="number" id="push-n3" placeholder="Ing" min="0" max="100" style="width:58px">
        <button class="btn blue" onclick="doPush()">Push</button>
      </div>`
  },
  {
    id: 'sec-10', num: '10', title: 'Array.from — Comprensión', concept: 'ARRAY.FROM',
    def: `<strong>Array.from({ length: n }, fn)</strong> es el equivalente en JS de la comprensión de listas de Python. Genera una matriz completa en <strong>una sola expresión</strong>, ideal para matrices con patrón.`,
    code: `<span class="kw">function</span> <span class="fn">crearIdentidad</span>(<span class="var">n</span>) {
  <span class="kw">return</span> Array.<span class="fn">from</span>({ length: <span class="var">n</span> }, (<span class="var">_</span>, <span class="var">i</span>) =>
    Array.<span class="fn">from</span>({ length: <span class="var">n</span> }, (<span class="var">_</span>, <span class="var">j</span>) =>
      <span class="var">i</span> === <span class="var">j</span> ? <span class="num">1</span> : <span class="num">0</span>
    )
  );
}
<span class="fn">crearIdentidad</span>(<span class="num">4</span>); <span class="cm">// [[1,0,0,0],...]</span>`,
    render: () => {
      const out = document.getElementById('out-10');
      if (!out) return;
      const id = crearIdentidad(4);
      let html = '<div class="identity-grid">';
      id.forEach(fila => {
        fila.forEach(v => { html += `<div class="id-cell ${v === 1 ? 'one' : 'zero'}">${v}</div>`; });
      });
      html += '</div>';
      out.innerHTML = html;
    },
    outputId: 'out-10', full: false
  },
  {
    id: 'sec-11', num: '11', title: 'Reporte Final — Función Principal', concept: 'INTEGRACIÓN',
    def: `La <strong>función principal</strong> integra todas las operaciones anteriores y produce la salida final. Equivale al <strong>main()</strong> de lenguajes como C o Python — el punto de entrada del programa.`,
    code: `<span class="kw">function</span> <span class="fn">reporteFinal</span>() {
  <span class="kw">return</span> <span class="var">calificaciones</span>.<span class="fn">map</span>((<span class="var">fila</span>, <span class="var">i</span>) => ({
    nombre  : <span class="var">estudiantes</span>[<span class="var">i</span>],
    notas   : <span class="var">fila</span>,
    promedio: <span class="fn">promedioEstudiante</span>(<span class="var">i</span>).<span class="fn">toFixed</span>(<span class="num">1</span>)
  }));
}`,
    render: () => {
      const out = document.getElementById('out-11');
      if (!out) return;
      const data = calificaciones.map((fila, i) => ({
        nombre: estudiantes[i], notas: fila, promedio: promedioEstudiante(i).toFixed(1)
      }));
      let html = '<div class="table-wrapper"><table><thead><tr><th>Estudiante</th>';
      materias.forEach(m => html += `<th>${m}</th>`);
      html += '<th>Promedio</th></tr></thead><tbody>';
      data.forEach(r => {
        html += `<tr><td>${r.nombre}</td>`;
        r.notas.forEach(n => html += `<td class="num-cell">${n}</td>`);
        html += `<td class="prom">${r.promedio}</td></tr>`;
      });
      html += '</tbody></table></div>';
      out.innerHTML = html;
    },
    outputId: 'out-11', full: true
  }
];

// ============================================================
//  RENDER DE SECCIONES
// ============================================================
function renderSections() {
  const app = document.getElementById('app');
  let html = '';

  sections.forEach(s => {
    const bodyClass = s.full ? 'section-body full' : 'section-body';
    html += `
    <section class="section" id="${s.id}">
      <div class="section-header">
        <span class="section-num">SECCIÓN ${s.num}</span>
        <span class="section-title">${s.title}</span>
        <span class="concept-tag">${s.concept}</span>
      </div>
      <div class="${bodyClass}">
        <div>
          ${definition(s.def)}
          ${codeBlock(s.code)}
          ${s.extra ? s.extra() : ''}
        </div>
        ${s.full ? '' : '<div>'}
          ${outputBox(s.outputId)}
        ${s.full ? '' : '</div>'}
      </div>
    </section>`;
  });

  html += `
  <section class="section" id="resumen">
    <div class="section-header">
      <span class="section-num">RESUMEN</span>
      <span class="section-title">Conceptos Cubiertos</span>
    </div>
    <div class="section-body full" style="padding:24px">
      <div class="summary-grid" id="summary"></div>
    </div>
  </section>`;

  app.innerHTML = html;
}

function renderSummary() {
  const items = [
    { n: '02', t: 'Declaración', d: 'Crear e inicializar un array 2D' },
    { n: '03', t: 'Acceso [i][j]', d: 'Leer celda con dos índices' },
    { n: '04', t: 'Recorrido', d: 'Bucles anidados para iterar todo' },
    { n: '05', t: 'Modificación', d: 'Actualizar una celda específica' },
    { n: '06', t: 'Op. por Fila', d: 'reduce() para promedio de fila' },
    { n: '07', t: 'Op. por Columna', d: 'Columna fija, fila variable' },
    { n: '08', t: 'Búsqueda', d: 'Localizar valor máximo/mínimo' },
    { n: '09', t: 'push()', d: 'Agregar nueva fila dinámicamente' },
    { n: '10', t: 'Array.from', d: 'Crear matrices con expresión' },
    { n: '11', t: 'Función Principal', d: 'Integración en un reporte final' },
  ];
  const el = document.getElementById('summary');
  if (!el) return;
  el.innerHTML = items.map(x => `
    <div class="summary-card">
      <div class="num-badge">SECCIÓN ${x.n}</div>
      <h4>${x.t}</h4>
      <p>${x.d}</p>
    </div>`).join('');
}

// ============================================================
//  HANDLERS INTERACTIVOS
// ============================================================
function doAcceso() {
  const fil = +document.getElementById('acc-fil').value;
  const col = +document.getElementById('acc-col').value;
  const res = document.getElementById('acc-result');
  if (fil >= calificaciones.length || col >= calificaciones[0].length) {
    res.innerHTML = `<span style="color:var(--accent2)">⚠ Índice fuera de rango</span>`; return;
  }
  res.innerHTML = `calificaciones[${fil}][${col}] = <strong style="color:var(--accent)">${accesoElemento(fil, col)}</strong>
    <span style="color:var(--muted)"> → ${estudiantes[fil]}, ${materias[col]}</span>`;
  const out = document.getElementById('out-03');
  if (out) out.innerHTML = renderMatrizBase([fil, col]) +
    `<br><span style="color:var(--muted);font-size:.78rem">calificaciones[${fil}][${col}] = </span><span style="color:var(--accent);font-weight:700">${accesoElemento(fil, col)}</span>`;
}

function doModificar() {
  const fil = +document.getElementById('mod-fil').value;
  const col = +document.getElementById('mod-col').value;
  const val = +document.getElementById('mod-val').value;
  if (fil >= calificaciones.length || col >= calificaciones[0].length) return;
  const old = calificaciones[fil][col];
  modificarNota(fil, col, val);
  const res = document.getElementById('mod-result');
  res.innerHTML = `calificaciones[${fil}][${col}]: <span style="text-decoration:line-through;color:var(--muted)">${old}</span> → <strong style="color:var(--accent2)">${val}</strong>`;
  const out = document.getElementById('out-05');
  if (out) out.innerHTML = renderMatrizBase([fil, col]) +
    `<br><span style="color:var(--muted);font-size:.78rem">calificaciones[${fil}][${col}] = </span><span style="color:var(--accent2);font-weight:700">${val}</span>`;
  sections.find(s => s.num === '11')?.render();
  sections.find(s => s.num === '06')?.render();
  sections.find(s => s.num === '07')?.render();
  sections.find(s => s.num === '08')?.render();
}

function doPush() {
  const name = document.getElementById('push-name').value.trim();
  const n1 = +document.getElementById('push-n1').value;
  const n2 = +document.getElementById('push-n2').value;
  const n3 = +document.getElementById('push-n3').value;
  if (!name) return;
  estudiantes.push(name);
  calificaciones.push([n1, n2, n3]);
  const mfil = document.getElementById('mod-fil');
  const afil = document.getElementById('acc-fil');
  if (mfil) mfil.max = calificaciones.length - 1;
  if (afil) afil.max = calificaciones.length - 1;
  sections.find(s => s.num === '09')?.render();
  sections.find(s => s.num === '11')?.render();
  sections.find(s => s.num === '04')?.render();
  document.getElementById('push-name').value = '';
}

// ============================================================
//  INIT
// ============================================================
renderSections();
sections.forEach(s => s.render && s.render());
renderSummary();