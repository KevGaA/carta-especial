document.addEventListener('DOMContentLoaded', () => {
    
    // --- VARIABLES ---
    const siBtn = document.getElementById('siBtn');
    const noBtn = document.getElementById('btnNo');
    const toggleDarkModeButton = document.getElementById("toggleDarkMode");
    const body = document.body;

    // --- BOTÓN SÍ (Aceptación) ---
    if (siBtn) {
        siBtn.addEventListener('click', () => {
            // 1. Lanzar Confeti
            for (let i = 0; i < 50; i++) {
                crearConfeti();
            }

            // 2. Mostrar Alerta Bonita
            Swal.fire({
                title: '¡La mejor respuesta! 💖',
                text: 'Este San Valentín será mágico...',
                icon: 'success',
                confirmButtonText: '¡Estoy lista! 🌹',
                confirmButtonColor: '#e91e63',
                // Adaptamos el color de fondo de la alerta según el modo
                background: body.classList.contains('dark-mode') ? '#004a66' : '#fff',
                color: body.classList.contains('dark-mode') ? '#fff' : '#545454'
            }).then((result) => {
                // 3. Al cerrar la alerta, mostrar la carta
                if (result.isConfirmed) {
                    showSection('aceptacion');
                }
            });
        });
    }

    // --- BOTÓN NO (Huidizo) ---
    if (noBtn) {
        noBtn.addEventListener('mouseover', moverBotonNo);
        noBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita clicks accidentales en móviles
            moverBotonNo();
            Swal.fire({
                title: '😢 ¿Segura?',
                text: 'Vuelve a intentarlo... te esperaré ❤️',
                icon: 'question',
                confirmButtonText: 'Reconsiderar',
                confirmButtonColor: '#ff8fa3'
            });
        });
    }

    // --- MODO OSCURO ---
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        toggleDarkModeButton.innerHTML = '<i class="ri-moon-line"></i>';
    }

    toggleDarkModeButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        const isDark = body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
        toggleDarkModeButton.innerHTML = isDark ? '<i class="ri-moon-line"></i>' : '<i class="ri-sun-line"></i>';
    });

    // --- INICIAR LLUVIA DE CORAZONES ---
    setInterval(createHeart, 300);
});

// --- FUNCIONES ---

// Función para cambiar de sección (CORREGIDA para evitar parpadeos)
function showSection(sectionId) {
    // 1. Ocultar suavemente las otras secciones
    document.querySelectorAll(".section").forEach((section) => {
        if (section.id !== sectionId) {
            section.classList.remove("active"); // Quita opacidad
            // Espera a que termine la transición CSS (0.8s) para ocultar
            setTimeout(() => {
                if (!section.classList.contains('active')) {
                    section.style.display = 'none';
                }
            }, 800);
        }
    });

    // 2. Preparar y mostrar la nueva sección
    const target = document.getElementById(sectionId);
    
    // Aseguramos que sea visible en el DOM (display: flex) antes de animar opacidad
    target.style.display = 'flex';
    
    // Pequeño delay técnico para que el navegador aplique el display antes del fade-in
    setTimeout(() => {
        target.classList.add("active");
    }, 50);

    // 3. Lógica específica de la carta final
    if (sectionId === 'aceptacion') {
        reproducirMusica();
    }
}

function reproducirMusica() {
    const audio = document.getElementById("florAudio");
    if (audio) {
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Error de reproducción automática:", e));
    }
}

function moverBotonNo() {
    const btn = document.getElementById('btnNo');
    // Mueve el botón a una posición aleatoria segura (restamos 100px para que no salga de pantalla)
    const width = window.innerWidth - 100;
    const height = window.innerHeight - 100;
    
    const newX = Math.random() * width;
    const newY = Math.random() * height;

    btn.style.position = "fixed";
    btn.style.left = newX + "px";
    btn.style.top = newY + "px";
}

// Corazones de fondo
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-50px"; 
    heart.style.animationDuration = Math.random() * 2 + 3 + "s"; 
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

// Confeti de colores
function crearConfeti() {
    const confeti = document.createElement('div');
    confeti.style.position = 'fixed';
    confeti.style.width = '10px';
    confeti.style.height = '10px';
    confeti.style.backgroundColor = `hsl(${Math.random() * 360}deg, 100%, 50%)`;
    confeti.style.left = Math.random() * 100 + 'vw';
    confeti.style.top = '-10px';
    confeti.style.borderRadius = '50%';
    confeti.style.zIndex = '2000';
    confeti.style.animation = `caida ${Math.random() * 3 + 2}s linear`;
    document.body.appendChild(confeti);
    setTimeout(() => confeti.remove(), 5000);
}

// Estilos dinámicos para el confeti
const style = document.createElement('style');
style.textContent = `
    @keyframes caida {
        to { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);