// =============================
// GESTIÓN DEL MENÚ HAMBURGUESA
// =============================
// Controla la apertura/cierre del menú móvil

function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const ham  = document.getElementById('hamburger');
  menu.classList.toggle('open');
  ham.classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// Cierra el menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
  const nav  = document.querySelector('nav');
  const menu = document.getElementById('mobileMenu');
  if (!nav.contains(e.target)) menu.classList.remove('open');
});

// ==============================
// GESTIÓN DEL TEMA DE COLORES
// ==============================
// Cambia el atributo data-theme en <html> para aplicar la paleta correspondiente

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  // Actualizar estado visual del botón activo
  ['dark','light','ocean','forest','sunset'].forEach(t => {
    document.getElementById('t-' + t)?.classList.remove('active');
  });
  document.getElementById('t-' + theme)?.classList.add('active');

  // Guardar preferencia en localStorage
  localStorage.setItem('preferredTheme', theme);

  // Cerrar el dropdown
  document.getElementById('themeMenu').classList.remove('open');
}

function toggleThemeMenu() {
  document.getElementById('themeMenu').classList.toggle('open');
}

// Cerrar dropdown de tema al hacer clic fuera
document.addEventListener('click', (e) => {
  const dropdown = document.querySelector('.theme-dropdown');
  if (!dropdown.contains(e.target)) {
    document.getElementById('themeMenu').classList.remove('open');
  }
});

// Cargar tema guardado al iniciar
const savedTheme = localStorage.getItem('preferredTheme');
if (savedTheme) setTheme(savedTheme);

// ==============================
// PLAYGROUND — EJECUTOR DE BUCLES
// ==============================
// Genera y ejecuta bucles dinámicamente según la selección del usuario

function runLoop() {
  const type  = document.getElementById('loopType').value;
  const limit = Math.min(50, Math.max(1, parseInt(document.getElementById('loopLimit').value) || 10));
  const out   = document.getElementById('pgOutput');
  let results = [];

  try {
    if (type === 'for') {
      // Bucle for clásico: itera de 0 a limit-1
      for (let i = 0; i < limit; i++) {
        results.push(`i = ${i}`);
      }
      results.push(`--- Total: ${limit} iteraciones ---`);

    } else if (type === 'while') {
      // Bucle while: continúa mientras i < limit
      let i = 0;
      while (i < limit) {
        results.push(`while: i = ${i}`);
        i++;
      }

    } else if (type === 'dowhile') {
      // do...while: ejecuta al menos una vez, luego verifica
      let i = 0;
      do {
        results.push(`do: i = ${i}`);
        i++;
      } while (i < limit);

    } else if (type === 'forof') {
      // for...of: recorre los valores de un array generado
      const arr = Array.from({length: limit}, (_, k) => `item_${k}`);
      for (const item of arr) {
        results.push(`valor: ${item}`);
      }

    } else if (type === 'fizz') {
      // FizzBuzz: clásico ejercicio con condiciones dentro de un bucle
      for (let i = 1; i <= limit; i++) {
        if (i % 15 === 0)      results.push(`${i} → FizzBuzz`);
        else if (i % 3 === 0)  results.push(`${i} → Fizz`);
        else if (i % 5 === 0)  results.push(`${i} → Buzz`);
        else                   results.push(`${i}`);
      }

    } else if (type === 'tabla') {
      // Tabla de multiplicar usando for
      for (let i = 1; i <= 10; i++) {
        results.push(`${limit} × ${i} = ${limit * i}`);
      }

    } else if (type === 'sumar') {
      // Sumar elementos con un bucle acumulador
      const arr = Array.from({length: limit}, (_, k) => k + 1);
      let suma = 0;
      for (const num of arr) {
        suma += num; // acumular la suma en cada iteración
      }
      results.push(`Array: [1, 2, ..., ${limit}]`);
      results.push(`Suma total: ${suma}`);
      results.push(`Fórmula: n*(n+1)/2 = ${limit*(limit+1)/2}`);
    }

    // Mostrar resultados en el output
    out.innerHTML = results.map(r => `<div>${r}</div>`).join('');

  } catch (err) {
    // Mostrar errores en rojo
    out.innerHTML = `<div class="err">Error: ${err.message}</div>`;
  }
}

// Ejecutar por defecto al cargar
runLoop();

// ==============================
// QUIZ INTERACTIVO
// ==============================
// Preguntas y lógica de evaluación sobre bucles

const questions = [
  {
    q: "¿Cuál es el propósito principal de un bucle en programación?",
    opts: ["Declarar variables", "Repetir un bloque de código", "Crear funciones", "Definir clases"],
    ans: 1,
    exp: "✅ Un bucle permite ejecutar repetidamente un bloque de código mientras se cumpla una condición."
  },
  {
    q: "¿Qué instrucción detiene un bucle inmediatamente?",
    opts: ["continue", "stop", "break", "exit"],
    ans: 2,
    exp: "✅ `break` termina el bucle de inmediato, sin importar si la condición sigue siendo verdadera."
  },
  {
    q: "¿Qué diferencia tiene `do...while` vs `while`?",
    opts: [
      "do...while es más rápido",
      "do...while ejecuta el bloque al menos una vez",
      "while puede repetirse infinitamente",
      "No hay diferencia"
    ],
    ans: 1,
    exp: "✅ do...while verifica la condición al FINAL, por lo que siempre ejecuta el cuerpo al menos una vez."
  },
  {
    q: "¿Cuál es la instrucción para saltar a la siguiente iteración?",
    opts: ["break", "skip", "next", "continue"],
    ans: 3,
    exp: "✅ `continue` salta el resto del cuerpo del bucle actual y avanza a la siguiente iteración."
  },
  {
    q: "¿Qué bucle usarías para recorrer las propiedades de un objeto en JS?",
    opts: ["for clásico", "while", "for...in", "do...while"],
    ans: 2,
    exp: "✅ `for...in` itera sobre las claves (propiedades) de un objeto JavaScript."
  },
  {
    q: "¿Qué sucede en un bucle infinito?",
    opts: [
      "Se ejecuta exactamente 100 veces",
      "La condición nunca se vuelve falsa y el programa se congela",
      "El programa salta el bucle automáticamente",
      "Se produce un error de sintaxis"
    ],
    ans: 1,
    exp: "✅ Un bucle infinito ocurre cuando la condición siempre es verdadera, causando que el programa deje de responder."
  }
];

let currentQ = 0;
let score    = 0;
let answered = new Array(questions.length).fill(false);

// Renderiza la pregunta actual en el DOM
function renderQuiz() {
  const q   = questions[currentQ];
  const doc = document.getElementById('quizQuestion');
  const ops = document.getElementById('quizOpts');
  const fb  = document.getElementById('quizFeedback');
  const sc  = document.getElementById('quizScore');

  doc.textContent = `Pregunta ${currentQ + 1}/${questions.length}: ${q.q}`;
  fb.textContent  = '';
  sc.textContent  = `Puntuación: ${score}/${questions.length}`;

  ops.innerHTML = q.opts.map((opt, i) =>
    `<button class="quiz-opt" onclick="answerQ(${i})">${opt}</button>`
  ).join('');

  // Si ya fue respondida, restaurar estado visual
  if (answered[currentQ] !== false) {
    const btns = ops.querySelectorAll('.quiz-opt');
    btns.forEach((b, i) => {
      if (i === q.ans) b.classList.add('correct');
      else if (i === answered[currentQ]) b.classList.add('wrong');
      b.disabled = true;
    });
    fb.textContent = q.exp;
  }
}

// Procesa la respuesta del usuario
function answerQ(idx) {
  if (answered[currentQ] !== false) return; // ya respondida

  const q    = questions[currentQ];
  const btns = document.querySelectorAll('.quiz-opt');
  const fb   = document.getElementById('quizFeedback');

  answered[currentQ] = idx;

  // Marcar correcta e incorrecta visualmente
  btns.forEach((b, i) => {
    if (i === q.ans) b.classList.add('correct');
    else if (i === idx) b.classList.add('wrong');
    b.disabled = true;
  });

  // Incrementar puntaje si es correcto
  if (idx === q.ans) score++;
  fb.textContent = q.exp;

  document.getElementById('quizScore').textContent = `Puntuación: ${score}/${questions.length}`;
}

function nextQ() {
  if (currentQ < questions.length - 1) { currentQ++; renderQuiz(); }
}

function prevQ() {
  if (currentQ > 0) { currentQ--; renderQuiz(); }
}

// Inicializar quiz al cargar la página
renderQuiz();