const cards = document.getElementsByClassName("card");
const resources = document.getElementsByClassName("moto")[0].getElementsByTagName("div")[0];

cards[0].addEventListener("click",()=>{
    window.location.href = "patient_prioritity_system.html";
})

cards[1].addEventListener("click",()=>{
    window.location.href = "resource-availability-tracker.html";
})

cards[2].addEventListener("click",()=>{
    console.log("iurhgeriu");
    window.location.href = "emergency-medical-service.html";
})

cards[3].addEventListener("click",()=>{
    window.location.href = "patient_data_tracking.html";
})

resources.addEventListener("click",()=>{
    cards[0].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
})