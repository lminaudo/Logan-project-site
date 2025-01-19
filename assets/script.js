function loadContent(targetSection, filePath, callback = null) {
    fetch(filePath)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Could not fetch ${filePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then((data) => {
            document.querySelector(targetSection).innerHTML = data;
            if (callback) callback(); // Call the callback if provided
        })
        .catch((error) => {
            console.error(error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    // Load header dynamically
    loadContent("header", "assets/header.html", () => {
        console.log("Header loaded successfully.");
    });
    loadContent("footer", "assets/footer.html", () => {
        console.log("Footer loaded successfully.");
    });

    const zoomanimation = document.querySelectorAll(".zoomanimation");

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
    };

    const animateProjects = () => {
        zoomanimation.forEach((project) => {
            if (isInViewport(project)) {
                project.classList.add("visible");
            }
            else{
             project.classList.add("visible");
                project.classList.remove("visible");
            }
        });
    };

    animateProjects();
    window.addEventListener("scroll", animateProjects);
});
