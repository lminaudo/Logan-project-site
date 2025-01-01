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
    loadContent("header", "/componets/header.html")
    loadContent("head", "/componets/head.html")
})
