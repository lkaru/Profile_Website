  const navbar = document.getElementById("menubar");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        navbar.classList.add("shrink");
      } else {
        navbar.classList.remove("shrink");
      }
    });