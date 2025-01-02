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
    loadContent("header", "componets/header.html", () => {
        console.log("Header loaded successfully.");
    });

    // Observe the DOM for changes to detect `.experience` elements
    const observer = new MutationObserver(() => {
        const experiences = document.querySelectorAll(".experience");
        if (experiences.length > 0) {
            console.log("Experience elements found:", experiences.length);
            observer.disconnect(); // Stop observing once elements are found

            // Add the `hidden` class to all elements before checking visibility
            experiences.forEach((exp) => exp.classList.add("hidden"));

            // Function to check if elements are in the viewport
            const isInViewport = (element) => {
                const rect = element.getBoundingClientRect();
                return rect.top < window.innerHeight && rect.bottom >= 0;
            };

            const animateExperience = () => {
                experiences.forEach((exp) => {
                    if (isInViewport(exp)) {
                        exp.classList.add("visible");
                        exp.classList.remove("hidden");
                    }
                });
            };

            // Trigger animation on load and on scroll
            animateExperience();
            window.addEventListener("scroll", animateExperience);

            // Fallback: Ensure all elements are visible after a delay if JavaScript fails
            setTimeout(() => {
                experiences.forEach((exp) => {
                    exp.classList.remove("hidden");
                });
            }, 1000);
        }
    });

    // Start observing the body for added child nodes
    observer.observe(document.body, { childList: true, subtree: true });
});
