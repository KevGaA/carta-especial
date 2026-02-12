document.addEventListener('DOMContentLoaded', () => {
    
    // --- VARIABLES ---
    const siBtn = document.getElementById('siBtn');
    const noBtn = document.getElementById('btnNo');
    const toggleDarkModeButton = document.getElementById("toggleDarkMode");
    const body = document.body;
    
    // Variables para lectura interactiva
    const carta = document.querySelector('.carta');
    let indiceParrafo = 0; // Controla qué párrafo toca mostrar

    // --- LÓGICA DEL CANDADO ---
    const inputs = document.querySelectorAll('.code-input');
    const unlockBtn = document.getElementById('unlockBtn');
    const errorMsg = document.getElementById('errorMsg');
    const PASSWORD = '120224'; // <--- CONTRASEÑA SOLICITADA

    inputs.forEach((input, index) => {
        // Al escribir
        input.addEventListener('input', (e) => {
            if (e.target.value.length > 1) {
                e.target.value = e.target.value.slice(0, 1);
            }
            if (e.target.value.length === 1) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            }
        });

        // Al borrar
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '') {
                if (index > 0) {
                    inputs[index - 1].focus();
                }
            }
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    });

    if (unlockBtn) {
        unlockBtn.addEventListener('click', checkPassword);
    }

    function checkPassword() {
        let code = '';
        inputs.forEach(input => code += input.value);

        if (code === PASSWORD) {
            Swal.fire({
                title: '¡Clave Correcta! 🔓',
                text: 'Bienvenida mi amor...',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                showSection('inicio');
            });
        } else {
            const container = document.querySelector('.lock-container');
            container.classList.add('shake');
            errorMsg.style.opacity = '1';
            setTimeout(() => {
                container.classList.remove('shake');
            }, 500);
        }
    }

    // --- BOTÓN SÍ ---
    if (siBtn) {
        siBtn.addEventListener('click', () => {
            for (let i = 0; i < 50; i++) {
                crearConfeti();
            }

            Swal.fire({
                title: '¡La mejor respuesta! 💖',
                text: 'Este San Valentín será mágico...',
                icon: 'success',
                confirmButtonText: '¡Estoy lista! 🌹',
                confirmButtonColor: '#e91e63',
                background: body.classList.contains('dark-mode') ? '#004a66' : '#fff',
                color: body.classList.contains('dark-mode') ? '#fff' : '#545454'
            }).then((result) => {
                if (result.isConfirmed) {
                    showSection('aceptacion');
                }
            });
        });
    }

    // --- BOTÓN NO ---
    if (noBtn) {
        noBtn.addEventListener('mouseover', moverBotonNo);
        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
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

    // --- LECTURA INTERACTIVA (TAP TO READ) ---
    if (carta) {
        carta.addEventListener('click', () => {
            const parrafos = document.querySelectorAll('.carta .texto');
            
            // Si todavía quedan párrafos por mostrar
            if (indiceParrafo < parrafos.length) {
                // Mostrar el siguiente
                parrafos[indiceParrafo].classList.add('visible');
                
                // Hacer scroll suave hacia el nuevo párrafo para que no se pierda
                parrafos[indiceParrafo].scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                indiceParrafo++;
            }
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

    setInterval(createHeart, 300);
});

// --- FUNCIONES AUXILIARES ---

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach((section) => {
        if (section.id !== sectionId) {
            section.classList.remove("active");
            setTimeout(() => {
                if (!section.classList.contains('active')) {
                    section.style.display = 'none';
                }
            }, 800);
        }
    });

    const target = document.getElementById(sectionId);
    target.style.display = 'flex';
    setTimeout(() => {
        target.classList.add("active");
    }, 50);

    if (sectionId === 'aceptacion') {
        reproducirMusica();
        // Iniciar la lectura automática del primer párrafo tras 1.5s
        setTimeout(() => {
            const primerParrafo = document.querySelector('.carta .texto');
            if (primerParrafo && !primerParrafo.classList.contains('visible')) {
                // Simulamos un click para activar la lógica y el índice
                document.querySelector('.carta').click();
            }
        }, 1500);
    }
}

function reproducirMusica() {
    const audio = document.getElementById("florAudio");
    if (audio) {
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Error audio:", e));
    }
}

function moverBotonNo() {
    const btn = document.getElementById('btnNo');
    const width = window.innerWidth - 100;
    const height = window.innerHeight - 100;
    const newX = Math.random() * width;
    const newY = Math.random() * height;
    btn.style.position = "fixed";
    btn.style.left = newX + "px";
    btn.style.top = newY + "px";
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-50px"; 
    heart.style.animationDuration = Math.random() * 2 + 3 + "s"; 
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

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

const style = document.createElement('style');
style.textContent = `
    @keyframes caida {
        to { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);