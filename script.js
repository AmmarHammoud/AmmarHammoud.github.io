// ========== script.js (Final Version) ==========

document.addEventListener('DOMContentLoaded', () => {

    // --- tsParticles BACKGROUND (No Changes) ---
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        interactivity: { events: { onHover: { enable: true, mode: "repulse" }, resize: true }, modes: { repulse: { distance: 100, duration: 0.4 } } },
        particles: {
            color: { value: "#8b5cf6" },
            links: { color: "#3b82f6", distance: 150, enable: true, opacity: 0.2, width: 1 },
            collisions: { enable: true },
            move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 1, straight: false },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } }
        },
        detectRetina: true
    });

    // --- CURSOR SPOTLIGHT (No Changes) ---
    const spotlight = document.querySelector('.spotlight');
    window.addEventListener('mousemove', (e) => {
        spotlight.style.left = `${e.clientX}px`;
        spotlight.style.top = `${e.clientY}px`;
    });

    // --- SCROLL REVEAL (No Changes) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    // --- NEW: MODAL LOGIC ---
    const projectCards = document.querySelectorAll('.project-card');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // Function to open the modal
    const openModal = (projectId) => {
        // Hide all project details first
        document.querySelectorAll('.project-detail').forEach(detail => detail.classList.add('hidden'));
        
        // Show the specific project detail
        const projectToShow = document.getElementById(projectId);
        if (projectToShow) {
            projectToShow.classList.remove('hidden');
            modalOverlay.classList.remove('hidden');
        }
    };

    // Function to close the modal
    const closeModal = () => {
        modalOverlay.classList.add('hidden');
    };

    // Add event listeners to each project card
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openModal(projectId);
        });
    });

    // Add event listeners for closing the modal
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        // Only close if the click is on the overlay itself, not the content
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

});
