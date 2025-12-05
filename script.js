document.addEventListener('DOMContentLoaded', () => {

    // --- tsParticles, Cursor, and Scroll Reveal (No Changes) ---
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
    const spotlight = document.querySelector('.spotlight');
    window.addEventListener('mousemove', (e) => {
        spotlight.style.left = `${e.clientX}px`;
        spotlight.style.top = `${e.clientY}px`;
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.1 });
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    // --- MODAL, TABS, AND CAROUSEL LOGIC ---
    const clickableCards = document.querySelectorAll('.project-card');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // Function to initialize a carousel
    const initCarousel = (carouselElement) => {
        const carouselInner = carouselElement.querySelector('.carousel-inner');
        if (!carouselInner) return;
        const items = carouselElement.querySelectorAll('.carousel-item');
        const nextBtn = carouselElement.querySelector('.next');
        const prevBtn = carouselElement.querySelector('.prev');
        let currentIndex = 0;

        const showSlide = (index) => {
            carouselInner.style.transform = `translateX(-${index * 100}%)`;
        };
        
        if(nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % items.length;
                showSlide(currentIndex);
            });
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                showSlide(currentIndex);
            });
        }
        showSlide(0);
    };

    // Function to initialize tabs within a modal
    const initTabs = (modalContent) => {
        const tabNav = modalContent.querySelector('.tab-nav');
        if (!tabNav) return;

        const tabLinks = tabNav.querySelectorAll('.tab-link');
        const tabContents = modalContent.querySelectorAll('.tab-content');

        tabLinks.forEach(link => {
            link.addEventListener('click', () => {
                tabLinks.forEach(l => l.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                link.classList.add('active');
                const tabId = link.getAttribute('data-tab');
                const activeContent = document.getElementById(tabId);
                activeContent.classList.add('active');

                const carousel = activeContent.querySelector('.carousel');
                if (carousel) {
                    initCarousel(carousel);
                }
            });
        });
    };

    // Main function to open the modal
    const openModal = (modalId) => {
        document.querySelectorAll('.project-detail').forEach(detail => detail.classList.add('hidden'));
        const detailToShow = document.getElementById(modalId);

        if (detailToShow) {
            detailToShow.classList.remove('hidden');
            modalOverlay.classList.remove('hidden');

            initTabs(detailToShow);
            const defaultActiveContent = detailToShow.querySelector('.tab-content.active');
            if (defaultActiveContent) {
                 const carousel = defaultActiveContent.querySelector('.carousel');
                if (carousel) {
                    initCarousel(carousel);
                }
            } else {
                const carousel = detailToShow.querySelector('.carousel');
                if (carousel) {
                    initCarousel(carousel);
                }
            }
        }
    };

    // --- Event Listeners ---
    const closeModal = () => modalOverlay.classList.add('hidden');
    clickableCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-project') || card.getAttribute('data-service');
            if (modalId) openModal(modalId);
        });
    });
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) closeModal();
    });
});
