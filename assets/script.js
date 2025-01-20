function loadContent(targetSection, filePath, callback = null) {
    fetch(filePath)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(new Error(`Could not fetch ${filePath}: ${response.statusText}`));
            }
            return response.text();
        })
        .then((data) => {
            document.querySelector(targetSection).innerHTML = data;
            callback?.(); // Call callback if provided using optional chaining
        })
        .catch((error) => {
            console.error(error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    // Load header and footer dynamically
    loadContent("header", "assets/header.html", () => {
        console.log("Header loaded successfully.");
    });
    loadContent("footer", "assets/footer.html", () => {
        console.log("Footer loaded successfully.");
    });

    // Select elements to animate
    const zoomanimation = document.querySelectorAll(".zoomanimation");
    const drivinganimation = document.querySelectorAll(".driving");
    const rotateanimation = document.querySelectorAll(".rotate");
    const drivingleftanimation = document.querySelectorAll(".driving-left");

    // Add IntersectionObserver
    const observerOptions = {
        threshold: 0.05 // Trigger when 10% of the element is visible
    };

    const addAnimationClass = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    };

    const observer = new IntersectionObserver(addAnimationClass, observerOptions);

    // Observe each animation target
    [...zoomanimation, ...drivinganimation, ...rotateanimation, ...drivingleftanimation].forEach((element) => {
        observer.observe(element);
    });
});

