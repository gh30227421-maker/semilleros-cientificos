document.addEventListener('DOMContentLoaded', () => {
    console.log('🧪 Semillero Científico: Script inicializado correctamente.');

    // ==========================================================================
    // THEME TOGGLE (DARK / LIGHT MODE)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    }

    // Toggle theme function
    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        console.log(`🌓 Tema cambiado a: ${newTheme}`);
    };

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }


    // ==========================================================================
    // MODAL AND SMOOTH SCROLL LOGIC
    // ==========================================================================
    const modalOverlay = document.getElementById('registro-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    // Open modal or scroll depending on target
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            if (targetId === '#registro' || targetId === '#registro-modal') {
                e.preventDefault();
                if (modalOverlay) {
                    modalOverlay.classList.add('active');
                }
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Close modal logic
    if (closeModalBtn && modalOverlay) {
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        // Close when clicking outside the card
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    // ==========================================================================
    // REGISTRATION FORM SUBMISSION
    // ==========================================================================
    const regForm = document.getElementById('registration-form');
    const formMsg = document.getElementById('form-message');

    if (regForm && formMsg) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const cedula = document.getElementById('cedula').value.trim();
            const edad = document.getElementById('edad').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const email = document.getElementById('email').value.trim();
            const tipoMiembro = document.getElementById('tipo_miembro').value;

            if (!nombre || !apellido || !cedula || !edad || !telefono || !email || !tipoMiembro) {
                formMsg.className = 'form-message error';
                formMsg.textContent = '❌ Por favor, rellena todos los campos obligatorios.';
                return;
            }

            // Simulate API request submission
            const submitButton = regForm.querySelector('.btn-submit');
            const originalBtnText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Enviando...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>';

            setTimeout(() => {
                // Restore button
                submitButton.disabled = false;
                submitButton.innerHTML = originalBtnText;

                // Show success message
                formMsg.className = 'form-message success';
                formMsg.innerHTML = `🎉 <strong>¡Registro exitoso, ${nombre} ${apellido}!</strong><br>Recibimos tu solicitud como <em>${tipoMiembro}</em>. Te contactaremos en <u>${email}</u> o al <u>${telefono}</u>.`;
                
                // Clear fields
                regForm.reset();

                // Auto hide message after 6 seconds
                setTimeout(() => {
                    formMsg.className = 'form-message';
                    formMsg.textContent = '';
                }, 6000);
            }, 1500);
        });
    }

    // ==========================================
    // RENDER NOTICIAS RECIENTES (Mock Data)
    // ==========================================
    const noticiasData = [
        {
            title: "Nuevo Laboratorio de Robótica Inaugurado",
            date: "15 Jun 2026",
            description: "El Ministerio habilita un nuevo espacio tecnológico con impresoras 3D y brazos robóticos para nuestros estudiantes.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400&h=250"
        },
        {
            title: "Semilleros en la Feria Internacional de Ciencia",
            date: "02 Jun 2026",
            description: "Jóvenes investigadores presentan prototipos de energías renovables ante expertos internacionales, destacando el talento nacional.",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400&h=250"
        },
        {
            title: "Abiertas las Inscripciones para Talleres de Programación",
            date: "28 May 2026",
            description: "Inicia el ciclo de formación intensiva en Python y Desarrollo Web. Cupos limitados para aspirantes de todo el país.",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400&h=250"
        }
    ];

    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        let newsHTML = '';
        noticiasData.forEach(noticia => {
            newsHTML += `
                <div class="news-card">
                    <img src="${noticia.image}" alt="${noticia.title}" class="news-image">
                    <div class="news-content">
                        <span class="news-date"><i class="fa-regular fa-calendar"></i> ${noticia.date}</span>
                        <h3>${noticia.title}</h3>
                        <p>${noticia.description}</p>
                        <a href="#" class="news-link">Leer más <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            `;
        });
        newsContainer.innerHTML = newsHTML;
    }

    // ==========================================================================
    // MOBILE MENU
    // ==========================================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        const navItems = navLinksContainer.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if(icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
});
