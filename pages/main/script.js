import pets from "../../assets/pets/pets.js";

const burgerBtn = document.getElementById("burger");
const nav = document.getElementById("header__nav");
const menuItems = document.querySelectorAll(".menu__link");
const bodyEl = document.body;

const sliderItems = document.querySelectorAll(".slider__item");
const buttonLeft = document.getElementById("slider-button-prev");
const buttonRight = document.getElementById("slider-button-next");

const modalWindow = document.getElementById("modalEl");
const closeBtn = document.getElementById("closeBtn");


const closeMenu = (event) => {
    if (event.target.classList.contains("menu__link")) {
        burgerBtn.classList.remove("--open")
        bodyEl.classList.remove("--hidden")
        nav.classList.remove("--open")

    }
    if (event.target.classList.contains("--open")) {
        burgerBtn.classList.remove("--open")
        bodyEl.classList.remove("--hidden")
        nav.classList.remove("--open")
    }
}

burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.toggle("--open");
    bodyEl.classList.toggle("--hidden");
    nav.classList.toggle("--open")
});

menuItems.forEach((el) => el.addEventListener("click", closeMenu));

nav.addEventListener("click", closeMenu);

for (let i = 0; i < sliderItems.length; i++) {
    sliderItems[i].addEventListener("click", () => {
        window.location.hash = "pets";
        bodyEl.classList.toggle("--hidden");
        modalWindow.classList.toggle("--open");
    })
};

const sliderState = {
    countPets: pets.length,
    prevPets: [],
    currentPets: []
}

const generateNoRepeatCard = () => {
    let rnd = Math.floor(Math.random() * sliderState.countPets);
    while (sliderState.currentPets.includes(rnd) || sliderState.prevPets.includes(rnd)) {
        rnd = Math.floor(Math.random() * sliderState.countPets);
    }
    return rnd;
}

const itemBody = document.querySelector(".slider__items");

const setRndAndNoRepeatCard = (event) => {
    const prewCollection = document.querySelector(".slider__items").cloneNode(true);

    prewCollection.children[0].classList.add("new-card");
    prewCollection.children[1].classList.add("new-card");
    prewCollection.children[2].classList.add("new-card");

    sliderItems.forEach((item, index) => {
        let rnd = generateNoRepeatCard();
        item.setAttribute("data-index", rnd);
        item.querySelector(".slider__item > img").src = pets[rnd].img;
        item.querySelector(".slider__item > img").alt = `${pets[rnd].name} Photo`;
        item.querySelector(".item_title").textContent = pets[rnd].name;
        sliderState.currentPets[index] = rnd;
        if (index === 2) { sliderState.prevPets = [...sliderState.currentPets] };
    });

    if (event?.currentTarget === buttonRight) {
        itemBody.prepend(prewCollection.children[2]);
        itemBody.prepend(prewCollection.children[1]);
        itemBody.prepend(prewCollection.children[0]);

        itemBody.classList.add("carousel-right");
        itemBody.addEventListener("animationend", () => {
            itemBody.classList.remove("carousel-right");
            const newCard = itemBody.querySelectorAll(".new-card");
            newCard.forEach(item => {
                item.remove();
            })
        });
    }
    if (event?.currentTarget === buttonLeft) {
        const cld0 = prewCollection.children[0].cloneNode(true);
        const cld1 = prewCollection.children[1].cloneNode(true);
        const cld2 = prewCollection.children[2].cloneNode(true);
        itemBody.append(cld0);
        itemBody.append(cld1);
        itemBody.append(cld2);

        itemBody.classList.add("carousel-left");
        itemBody.addEventListener("animationend", () => {
            itemBody.classList.remove("carousel-left");
            const newCard = itemBody.querySelectorAll(".new-card");
            newCard.forEach(item => {
                item.remove();
            })
        });
    }
}

setRndAndNoRepeatCard();

buttonLeft.addEventListener("click", setRndAndNoRepeatCard);
buttonRight.addEventListener("click", setRndAndNoRepeatCard);

const sliderBody = document.querySelector(".slider__items");

sliderBody.addEventListener("click", function (event) {
    if (event.target.closest(".slider__item")) {
        let indexPets = event.target.closest(".slider__item").dataset.index;
        createPopup(indexPets)
    }
});

const createPopup = (index) => {
    modalWindow.querySelector(".window__info__h3").textContent = pets[index].name;
    modalWindow.querySelector(".window__info__h5").textContent = pets[index].description;
    modalWindow.querySelector(".modal__container__window__img").src = pets[index].img;
   
    modalWindow.classList.add("--open");
}

closeBtn.addEventListener("click", () => {
    modalWindow.classList.remove("--open");
    bodyEl.classList.remove("--hidden");
});

modalWindow.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
        modalWindow.classList.remove("--open");
        bodyEl.classList.remove("--hidden");
    }
});
