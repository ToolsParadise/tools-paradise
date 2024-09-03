document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');

    if (section) {
        document.querySelectorAll('.content-section').forEach(div => div.style.display = 'none');
        const sectionDiv = document.getElementById(`${section}-section`);
        if (sectionDiv) {
            sectionDiv.style.display = 'block';
        } else {
            document.getElementById('profile-section').style.display = 'block';
        }
    } else {
        document.getElementById('profile-section').style.display = 'block';
    }
});

function openProfile() {
    document.querySelector(".profile").classList.toggle("open");
}

document.addEventListener("click", function(event) {
    if (!event.target.closest(".profile")) {
        document.querySelector(".profile").classList.remove("open");
    }
});

