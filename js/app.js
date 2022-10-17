/**
 * Define Global Variables
*/
const allSections = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");
const allLinks = navList.querySelectorAll("li a");
const buttonToTop = document.querySelector("#scroll__top");
let stop;
/**
 * End Global Variables
 * Start Helper Functions
*/

// get the current section position to add active on it 
const currentSectionPosition = (ele, sectionHeight) => {
    // get the distance between the top window and each section
    let sectionTop = ele.getBoundingClientRect().top;
    // check if innerHeigth is greater than current section height minus 2/3
    return window.innerHeight >= (Math.floor(sectionTop) + sectionHeight * 2 / 3)
};

// add and remove class active form sections and links 
const removeActiveFromAll = (element) => {
    element.forEach((ele) => {
        ele.classList.remove("active")
    });
};
// add active class to the current element
const addActive = (ele) => {
    ele.classList.add('active')
};
// remove active when move the the next element
const removeActive = (ele) => {
    ele.classList.remove('active')
};
// function to return the height of navbarList automatically.
const navItmesHeight = (element) => {
    let total = 0
    document.querySelectorAll(element).forEach((ele) => {
        total += ele.offsetHeight
    })
    return total
};
/**
 * End Helper Functions
 * Begin Main Functions
*/

// build the nav
// create fragment as a container for elements so the elements are not reapeated in the page
const fragment = document.createDocumentFragment();
//  make loop on all sections 
const buildNavItems = () => {
    allSections.forEach((section) => {
        const listItem = document.createElement("li");
        const sectionId = section.id
        listItem.innerHTML = `<a class= "menu__link" href = #${sectionId}>${section.dataset.nav}</a>`
        listItem.querySelector("a").setAttribute("data-scroll", sectionId);
        // append listItems to an empty container
        fragment.appendChild(listItem);
    });
    // append links to page 
    navList.appendChild(fragment);
};
// end build nav

// add class active to both section and link at the same time when we scroll 
const addClassActive = () => {
    // Add class 'active' to section when near top of viewport
    allSections.forEach((section, i) => {
        // get the height of each section
        let sectionHeight = section.offsetHeight
        if (currentSectionPosition(section, sectionHeight)) {
            removeActiveFromAll(allSections) // remove active for all sections
            addActive(section)  // add active to current section
        } else {
            // remove active class if window smaller than the current section
            removeActive(section)
        };
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
        };
    });
};
// Scroll to anchor ID using scrollIntoView 
const onNavItemsClick = (evt) => {
    evt.preventDefault();
    let currentSection = evt.target.dataset.scroll //get current ID section from data attribute 
    if (currentSection) {
        document.getElementById(currentSection).scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
};
/**
 * End Main Functions
 * Begin Events
 */
// display the button when scroll is bigger than 1000 if else disappear the button
// display the header when scroll and stop it when not scroll for 3 seconds
const show_scrollBtn_pageHeader = () => {
    let theHeader = document.querySelector(".page__header");
    // if window is greater than 1000px the button will appear
    window.scrollY >= 1000
        ? buttonToTop.style.display = "block"
        : buttonToTop.style.display = "none"
    // ----------------------
    // display the header when scroll
    const showHeader = () => {
        if (window.innerWidth > 768) {
            theHeader.style.visibility = "visible";
            // using clearTimeout so it will not make a repeating every 3 seconds but it'll disappear header when stop scroll
            clearTimeout(stop)
            stop = setTimeout(() => {
                theHeader.style.visibility = "hidden";
                theHeader.style.Height = 0;
            }, 3000);
        } else if (window.innerWidth < 768) {
            theHeader.style.visibility = "visible";
            document.body.style.paddingTop = 70
        };
    };
    showHeader()
    window.addEventListener("resize", showHeader);
};

// when click on the button it will scroll to at the beginning of the window which is zero
const scrollToTop = () => {
    buttonToTop.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
};
// when click on the burgerMenu
const onMenuClick = () => {
    const navbar_menu = document.querySelector(".navbar__menu");
    const theMenuButton = document.querySelector("#navbar__toggler");
    // when click on the menu will add active class to pageHeader 
    theMenuButton.addEventListener("click", () => {
        const currentWidth = window.innerWidth;
        if (currentWidth < 768) {
            navbar_menu.classList.toggle("show") // to display the burgerMenu
            if (navbar_menu.classList.contains("show")) {
                // get the navbarMenu height automatically
                navbar_menu.style.height = navItmesHeight("#navbar__list li");
            } else {
                navbar_menu.style.height = 0
            };
        };
    });
    // close the menu when click at any place in the page to make it easier for users
    theMenuButton.addEventListener("blur", () => {
        navbar_menu.classList.remove("show")
        navbar_menu.style.height = 0
    });
};
// create collapsible sections 
const sectionCollapse = () => {
    for (let section of allSections) {
        // create the collapse button on each section
        let div = document.createElement("div");
        let span = document.createElement("span")
        let spanTwo = document.createElement("span")
        div.className = "collapse"
        div.append(span, spanTwo);
        section.appendChild(div); //append the collapse button to the page.
        section.style.height = "80vh"
        // when click on the collapse button it'll toggle class hide.
        div.addEventListener("click", (e) => {
            e.currentTarget.classList.toggle("hide");
            e.currentTarget.parentElement.classList.toggle("hide")
        });
    };
};
// gather all the funcitons in one place to make code more clean.
const myApp = () => {
    buildNavItems(); //create the navbar automatically.
    window.addEventListener("scroll", addClassActive);//add active class to both header and links when scroll. 
    navList.addEventListener("click", onNavItemsClick); // when click on each link it scroll to its id section. 
    window.addEventListener("scroll", show_scrollBtn_pageHeader);//show the_srollBtn and Page_header when sroll.
    scrollToTop(); //click the button to scroll to top. 
    onMenuClick();//show navbar list when click on the menu.
    sectionCollapse(); //make the section collapsible.
};
myApp()
// end coding