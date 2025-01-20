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
    const drivinganimation = document.querySelectorAll(".driving");
    const rotateanimation = document.querySelectorAll(".rotate");
    const drivingleftanimation = document.querySelectorAll(".driving-left");


    const isInViewport = (element, threshold = 0) => {
        if (!element) return false; // Ensure the element exists
        
        const rect = element.getBoundingClientRect();
        
        // Include a threshold for partial visibility
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      
        return (
          rect.top + threshold < windowHeight && // Top edge is visible with threshold
          rect.bottom - threshold >= 0 &&       // Bottom edge is visible with threshold
          rect.left + threshold < windowWidth && // Left edge is visible with threshold
          rect.right - threshold >= 0            // Right edge is visible with threshold
        );
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
    const animateDriving = () => {
        drivinganimation.forEach((project) => {
            if (isInViewport(project)) {
                project.classList.add("visible");
            }
            else{
                project.classList.add("visible");
                project.classList.remove("visible");
            }
        });
    };

    const animateDrivingLeft = () => {
        drivingleftanimation.forEach((project) => {
            if (isInViewport(project)) {
                project.classList.add("visible");
            }
            else{
                project.classList.add("visible");
                project.classList.remove("visible");
            }
        });
    };

    const animateRotation = () => {
        rotateanimation.forEach((project) => {
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
    animateDriving();
    animateRotation();
    animateDrivingLeft();
    window.addEventListener("scroll", () => {
        animateProjects();
        animateDriving();
        animateDrivingLeft();
        animateRotation();
    });
});
