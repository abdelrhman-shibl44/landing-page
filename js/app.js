/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/
const allSections = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");
const allLinks = navList.querySelectorAll("li a")

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// function check if window.innerHeight is Greater than sections
function hi(ele, sectionHeight) {
    // get the distance between the top window and each section
    let sectionTop = ele.getBoundingClientRect().top
    // return if the height of the window is greater than each section plus the height of it 
    // and we will multiply ----------------------------------------------------------????
    return window.innerHeight >= (Math.floor(sectionTop) + sectionHeight * 2 / 3)
}

// add and remove class active form sections and links 
const removeActiveFromAll = (element) => {
    element.forEach((ele) => {
        ele.classList.remove("active")
    })
}
// add active class to the current element
const addActive = (ele) => {
    ele.classList.add('active')
}
const removeActive = (ele) => {
    ele.classList.remove('active')
}
// remove active when move the the next element
/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
// create fragment as a container for elements so the elements are not reapeated in the page
let frag = document.createDocumentFragment()
// first thing i will make loop on all sections 
const buildNavItems = () => {
    allSections.forEach((section) => {
        let listItem = document.createElement("li");
        let link = document.createElement("a");
        link.className = "menu__link";
        link.setAttribute('href', section.id);
        link.innerText = `${section.dataset.nav}`;
        // append links to listItems
        listItem.appendChild(link);
        // append listItems to an empty container
        frag.appendChild(listItem);
    })
    // append links to page 
    navList.appendChild(frag);
}
buildNavItems();
// add class active  to both section and link at the same time we scroll 
const addClassActive = () => {
    // Add class 'active' to section when near top of viewport
    allSections.forEach((section, i) => {
        // get the height of each section
        let sectionHeight = section.offsetHeight
        if (hi(section, sectionHeight)) {
            // remove active for all sections 
            removeActiveFromAll(allSections)
            // add active to current section
            addActive(section)
        } else {
            // remove active class if window smaller than the current section
            removeActive(section)
        }
        // ------------------------------------
        // add active to links 
        let allLinks = navList.querySelectorAll("li a")
        if (section.classList.contains("active")) {
            // remove active from all links before add to the current one
            removeActiveFromAll(allLinks)
            // add active class to the current link with current section
            addActive(allLinks[i])
        } else {
            // remove active class when move to the next section
            removeActive(allLinks[i])
        }
    })
}
window.addEventListener("scroll", addClassActive)
// Scroll to anchor ID using scrollTO event
navList.querySelectorAll("li a").forEach((li) => {
    li.addEventListener("click", (evt) => {
        evt.preventDefault()
        let currentSection = document.getElementById(evt.target.getAttribute("href"))
        window.scrollTo({
            top: currentSection.offsetTop - navList.offsetHeight,
            behavior: "smooth"
        })
    })
})

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 

// Scroll to section on link click

// Set sections as active




// reset responsive based on navHeight on mobile 
const resetContentView = () => {
    window.innerWidth < 678
        ? document.body.style.paddingTop = navList.offsetHeight
        : document.body.style.paddingTop = 0
}
window.onresize = () => {
    resetContentView()
}
resetContentView()

// maket the button to top 
let buttonToTop = document.querySelector("#scroll__top");
let theHeader = document.querySelector(".page__header");
let stop;
// display the button when scroll is bigger than 1000 if else disappear the button
const displayButtonAndHeader = () => {
    window.scrollY >= 1000
        ? buttonToTop.style.display = "block"
        : buttonToTop.style.display = "none"
    // ----------------------
    // display the header when scroll
    theHeader.style.visibility = "visible";
    // clearTimeout so it will not make a repeating every 3 seconds but it'll disappear it when stop scroll
    clearTimeout(stop)
    stop = setTimeout(() => {
        theHeader.style.visibility = "hidden"
    }, 3000)
}
window.addEventListener("scroll", displayButtonAndHeader)
// when click on the button it will scroll to at the beginning of the window which is zero
const scrollToTop = () => {
    buttonToTop.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
}
scrollToTop();
// end coding 