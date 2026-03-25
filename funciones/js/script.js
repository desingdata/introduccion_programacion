// Hamburguesa: alterna clase "open" para mostrar/ocultar menú en móvil
const ham = document.getElementById('hamburger'), nav = document.getElementById('navLinks');
ham.addEventListener('click', () => { ham.classList.toggle('open'); nav.classList.toggle('open') });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { ham.classList.remove('open'); nav.classList.remove('open') }));

// Temas: cambia data-theme en <html> → redefine variables CSS globales
document.querySelectorAll('.theme-btn').forEach(b => {
    b.addEventListener('click', () => {
        document.documentElement.setAttribute('data-theme', b.dataset.t);
        document.querySelectorAll('.theme-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
    });
});

// Demo parámetro por defecto
function demoHola() { const f = (n = "mundo") => `¡Hola, ${n}!`; const v = document.getElementById('p-nombre').value.trim(); document.getElementById('r-hola').textContent = f(v || undefined) }

// Demo calculadora (función con retorno)
function demoCalc() {
    const calc = (a, op, b) => ({ '+': a + b, '-': a - b, '*': a * b, '/': b ? a / b : "÷0", '%': a % b, '**': a ** b }[op]);
    const a = parseFloat(document.getElementById('c-a').value), b = parseFloat(document.getElementById('c-b').value), op = document.getElementById('c-op').value, el = document.getElementById('r-calc');
    if (isNaN(a) || isNaN(b)) { el.textContent = "⚠ Números válidos"; return }
    el.textContent = `${a} ${op} ${b}  =  ${calc(a, op, b)}`;
}

// Demo factorial (función recursiva)
function demoFactorial() {
    const f = n => n <= 1 ? 1 : n * f(n - 1);
    const n = parseInt(document.getElementById('f-n').value), el = document.getElementById('r-factorial');
    if (isNaN(n) || n < 0 || n > 15) { el.textContent = "⚠ Entre 0 y 15"; el.classList.add('error'); return }
    el.classList.remove('error');
    const p = Array.from({ length: n }, (_, i) => i + 1).join(' × ') || '1';
    el.textContent = `${n}! = ${p} = ${f(n)}`;
}

// Demo closure (variable capturada en el ámbito padre)
const cont = (() => { let c = 0; return a => { if (a === 'reset') c = 0; else if (a === '+5') c += 5; else c++; return c } })();
function demoClosure(a) { document.getElementById('r-closure').textContent = `Contador: ${cont(a)}` }

// Editor en vivo: intercepta console.log para mostrar output
function ejecutar() {
    const codigo = document.getElementById('editor').value, el = document.getElementById('r-editor'), salida = [];
    const orig = console.log;
    console.log = (...a) => salida.push(a.map(x => typeof x === 'object' ? JSON.stringify(x, null, 2) : String(x)).join(' '));
    try { new Function(codigo)(); el.textContent = salida.length ? salida.join('\n') : '(sin salida)'; el.classList.remove('error') }
    catch (e) { el.textContent = '❌ ' + e.message; el.classList.add('error') }
    finally { console.log = orig }
}

// Copiar al portapapeles
function copiar(btn) { navigator.clipboard.writeText(btn.nextElementSibling.textContent).then(() => { btn.textContent = '✓ Copiado'; setTimeout(() => btn.textContent = 'Copiar', 2000) }) }