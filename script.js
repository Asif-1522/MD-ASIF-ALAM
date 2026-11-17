/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    setTimeout(() => {

        loader.style.display = "none";

    }, 600);

});

/* ==========================================
   DARK / LIGHT MODE
========================================== */

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const icon = themeToggle.querySelector("i");

    if(document.body.classList.contains("light")){

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    }else{

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});

/* ==========================================
   TYPING ANIMATION
========================================== */

const words = [

    "Data Analyst",

    "Python Developer",

    "SQL Enthusiast",

    "Power BI Learner",

    "Excel Expert"

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect(){

    const currentWord = words[wordIndex];

    if(!deleting){

        typing.textContent =
            currentWord.substring(0,charIndex++);

        if(charIndex > currentWord.length){

            deleting = true;

            setTimeout(typeEffect,1200);

            return;

        }

    }else{

        typing.textContent =
            currentWord.substring(0,charIndex--);

        if(charIndex < 0){

            deleting = false;

            wordIndex++;

            if(wordIndex >= words.length){

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect,deleting ? 50 : 100);

}

typeEffect();

/* ==========================================
   BACK TO TOP
========================================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 500){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

/* ==========================================
   SMOOTH ACTIVE NAVIGATION
========================================== */

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        if(pageYOffset>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});

/* ==========================================
   MOBILE MENU
========================================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinksContainer = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinksContainer.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinksContainer.classList.remove("show");
    });
});

/* ==========================================
   REMEMBER THEME
========================================== */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light");

    const icon = themeToggle.querySelector("i");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
}

themeToggle.addEventListener("click", () => {

    if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }

});

/* ==========================================
   NAVBAR SHADOW
========================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.25)";

    } else {

        header.style.boxShadow = "none";

    }

});

/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(
    ".section-title,.about-container,.skill-card,.project-card,.timeline-item,.education-card,.certificate-card,.contact-container"
);

function revealOnScroll() {

    const trigger = window.innerHeight * 0.85;

    revealElements.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < trigger) {

            item.style.opacity = "1";
            item.style.transform = "translateY(0)";

        }

    });

}

revealElements.forEach(item => {

    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = "all .7s ease";

});

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ==========================================
   CONTACT FORM
========================================== */

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Thank you! Your message has been received.");

    contactForm.reset();

});

/* ==========================================
   BUTTON RIPPLE EFFECT
========================================== */

document.querySelectorAll(".btn").forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=this.getBoundingClientRect();

        ripple.style.left=(e.clientX-rect.left)+"px";
        ripple.style.top=(e.clientY-rect.top)+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});

/* ==========================================
   CURRENT YEAR
========================================== */

const yearElement=document.getElementById("year");

if(yearElement){

    yearElement.textContent=new Date().getFullYear();

}

/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log(
"%cWelcome to Asif Reja's Portfolio!",
"color:#06b6d4;font-size:18px;font-weight:bold;"
);