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
})

const animation = document.querySelectorAll('.experience');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            animation.classList.add('experience');
            return;
        }
        animation.classList.remove('experience');
    });
});
animation.forEach((element)=>observer.observe(element));
// observer.observe(document.querySelector('.experience-wrapper'));