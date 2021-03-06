// preloader section js
$(window).on("load", function () {
    $(".preloader").fadeOut('slow')
});




// navigation menu-----------------------------------
(() => {
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
        navMenu = document.querySelector(".nav-menu"),
        closeNavBtn = navMenu.querySelector(".close-nav-menu");


    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);


    function showNavMenu() {
        navMenu.classList.add("open");
        bodyscrollingToggle();
    }

    function hideNavMenu() {
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyscrollingToggle();
    }


    function fadeOutEffect() {
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300)
    }

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains('link-item')) {
            if (event.target.hash !== "") {
                event.preventDefault();
                const hash = event.target.hash;
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");

                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");


                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
                if (navMenu.classList.contains("open")) {
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");

                    hideNavMenu();
                } else {
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    });
                    fadeOutEffect();
                }
                window.location.hash = hash
            }
        }
    })

})();


// about section tabs---------------------------------------

(() => {

    const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");
    tabsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");

            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");

            event.target.classList.add("active", "outer-shadow");

            aboutSection.querySelector(".tab-content.active").classList.remove("active");

            aboutSection.querySelector(target).classList.add("active");
        }
    });
})();


// portfolio fiter ana popup-----------------------------------------


function bodyscrollingToggle() {
    document.body.classList.toggle("stop-scrolling");
}


(() => {


    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),

        popup = document.querySelector(".portfolio-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

    let itemIndex, slideIndex, screenshots;

    //    fliter item
    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") &&
            !event.target.classList.contains("active")) {
            //   deactivate active
            filterContainer.querySelector(".active").classList.remove("outer-shadow", ("active"));
            // activate active
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {
                if (target === item.getAttribute("data-catagory") || target === "all") {
                    item.classList.remove("hide");
                    item.classList.add("show");
                } else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    });

    portfolioItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            // get the portfolio index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            // convert screenshot into array
            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            } else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })


    closeBtn.addEventListener("click", () => {
        popupToggle();
    })

    function popupDetails() {
        if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
            projectDetailsBtn.style.display = "block";
            return;
        }

        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-detail").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const catagroy = portfolioItems[itemIndex].getAttribute("data-catagory");
    }

    function popupToggle() {
        popup.classList.toggle("open");
        bodyscrollingToggle();
    }

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        //   ACTIVATE LOADER
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + "of" + screenshots.length;
    }

    //   next slide --------------
    nextBtn.addEventListener("click", (event) => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        popupSlideshow();
        console.log("slideIndex:" + slideIndex);
    })

    // prev slide 
    prevBtn.addEventListener("click", (event) => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 1
        } else {
            slideIndex--;
        }
        popupSlideshow();
        console.log("slideIndex:" + slideIndex);
    });
    // project details btn
    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })

    // app details
    function popupDetailsToggle() {

        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px"
        } else {
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop)
        }
    };


})();


// testimonial item -------------------------------------------------------------

(() => {

    const sliderContainer = document.querySelector(".testi-slider-container"),
        slides = sliderContainer.querySelectorAll(".testi-item"),

        slideWidth = sliderContainer.offsetWidth,
        prevBtn = document.querySelector(".testi-slider-nav .prev"),
        nextBtn = document.querySelector(".testi-slider-nav .next");
    activeSlide = sliderContainer.querySelector(".testi-item.active");
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

    slides.forEach((slide) => {
        slide.style.width = slideWidth + "px"
    });

    sliderContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener("click", () => {
        if (slideIndex === slides.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        slider();
    });

    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex === slides.length - 1;
        } else {
            slideIndex--;
        }
        slider();
    });


    function slider() {
        sliderContainer.querySelector(".testi-item.active").classList.remove("active");
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
    }


})();


// hide all sections expecxt active

(() => {
    const secitons = document.querySelectorAll(".seciton");

    secitons.forEach((seciton) => {
        if (!seciton.classList.contains("active")) {
            seciton.classList.add("hide");
        }
    });

})();


// style swicher js-------------------------------------------------------------

const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");

styleSwitcherToggler.addEventListener(("click"), () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})

window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
});

const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true")
        }
    })
}

// dark night theme -=---------------------------------------------------

const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-moon");
    dayNight.querySelector("i").classList.toggle("fa-sun");
    document.body.classList.toggle("light");
})
window.addEventListener("load", () => {
    if (document.body.classList.contains("light")) {
        dayNight.querySelector("i").classList.add("fa-sun");
    } else {
        dayNight.querySelector("i").classList.add("fa-moon");
    }
})

// wow js init 

new WOW().init();

// typed js 
new Typewriter('.typed', {
    strings: ['Web Designer', 'Frontend Developer', 'React Developer', ],
    autoStart: true,
    loop: true,

});
