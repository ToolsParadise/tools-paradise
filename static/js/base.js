function openProfile() {
    document.querySelector(".profile").classList.toggle("open");
}

document.addEventListener("click", function(event) {
    if (!event.target.closest(".profile")) {
        document.querySelector(".profile").classList.remove("open");
    }
});

document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        showOverlay(this.getAttribute('data-content'));
    });
});

function showOverlay(contentId) {
    const overlay = document.getElementById('overlay');
    const overlayText = document.getElementById('overlay-text');
    const contentElement = document.getElementById(`${contentId}-content`);

    if (contentElement) {
        overlayText.innerHTML = contentElement.innerHTML;
        document.body.style.overflow = 'hidden';
        overlay.classList.add('show-overlay');
    }
}

function closeOverlay() {
    document.querySelector('.wrapper').classList.remove('fade-out');
    document.getElementById('overlay').classList.remove('show-overlay');
    document.body.style.overflow = 'scroll';
}

