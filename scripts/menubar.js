const navbar = document.getElementById("menuBar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});