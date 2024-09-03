function openProfile() {
    document.querySelector(".profile").classList.toggle("open");
}

document.addEventListener("click", function(event) {
    if (!event.target.closest(".profile")) {
        document.querySelector(".profile").classList.remove("open");
    }
});

const sections = document.querySelectorAll('.section');
const searchInput = document.querySelector('.search-bar input[type="search"]');
const noResultsMessage = document.getElementById('no-results-message');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let hasResults = false;

    sections.forEach((section) => {
        const title = section.querySelector('h2').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            section.style.display = 'flex';
            hasResults = true;
        } else {
            section.style.display = 'none';
        }
    });

    // Show or hide the "no results" message based on whether any sections matched
    if (hasResults) {
        noResultsMessage.style.display = 'none';
    } else {
        noResultsMessage.style.display = 'block';
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

document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.querySelector(".search-bar button[type='submit']");
 

    searchButton.addEventListener("click", function() {
        searchInput.style.display = "block";
    });

    document.addEventListener("click", function(event) {
        if (!event.target.closest(".search-bar")) {
            searchInput.style.display = "none";
        }
    });
});