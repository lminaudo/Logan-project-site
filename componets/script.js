function loadContent(targetSection, filePath){
    fetch(filePath)
        .then((response)=>{
            if(!response.ok){
                throw new Error(`Could not fetch ${filePath}: ${response.statusText}`);

            }
            return response.text();
        })
        .then((data) =>{
            document.querySelector(targetSection).innerHTML = data;
        })
        .catch((error)=>{
            console.error(error);
        })
}
document.addEventListener("DOMContentLoaded", ()=>{
    loadContent("header", "componets/header.html")

    const experiences = document.querySelectorAll(".experience");

    // Add the `hidden` class to all elements before checking visibility
    experiences.forEach((exp) => exp.classList.add("hidden"));

    // Check if elements are in the viewport
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
});
