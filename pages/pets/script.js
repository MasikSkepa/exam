import pets from "../../assets/pets/pets.js";

const burgerBtn = document.getElementById("burger");
const nav = document.getElementById("header__nav");
const menuItems = document.querySelectorAll('.menu__link');
const bodyEl = document.body;

const sliderItems = document.querySelectorAll(".cards__items");

const buttonFirst = document.getElementById('first-button');
const buttonRight = document.getElementById('next-button');
const buttonLeft = document.getElementById('prev-button');
const buttonLast = document.getElementById('last-button');
const currentPage = document.getElementById('current-page');

const modalWindow = document.getElementById("modalEl");
const closeBtn = document.getElementById("closeBtn");

const closeMenu = (event) => {
    if (event.target.classList.contains('menu__link')) {
        burgerBtn.classList.remove('--open')
        bodyEl.classList.remove('--hidden')
        nav.classList.remove('--open')

    }
    if (event.target.classList.contains('--open')) {
        burgerBtn.classList.remove('--open')
        bodyEl.classList.remove('--hidden')
        nav.classList.remove('--open')
    }
}
//Open/close menu
burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.toggle("--open");
    bodyEl.classList.toggle("--hidden");
    nav.classList.toggle("--open")
});

//Close menu
menuItems.forEach((el) => el.addEventListener('click', closeMenu));
nav.addEventListener('click', closeMenu);

for (let i = 0; i < sliderItems.length; i++) {
    sliderItems[i].addEventListener("click", () => {
        window.location.hash = "pets";
        bodyEl.classList.toggle("--hidden");
        modalWindow.classList.toggle("--open");
    })
};

const shuffle = (array) => {
    let shaffleArray = [...array];
    for (let i = shaffleArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shaffleArray[i], shaffleArray[j]] = [shaffleArray[j], shaffleArray[i]];
    }
    return shaffleArray;
}

const create48ItemsPets = () => {
    let pets48 = [];
    for (let i = 0; i < 6; i++) {
        pets48.push(...shuffle(pets));
    }
    return pets48;
}

const rnd48Pets = create48ItemsPets();

const sliderState = {
    currentPage: 1,
    countItems: 8,
}

const getActualCollection = () => {
    let countItems;
    let actualCollection;
    if (window.innerWidth < 768) {
        countItems = 3;
        actualCollection = Array.from(document.querySelectorAll('.cards__item')).slice(0, 3);
    } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        countItems = 6;
        actualCollection = Array.from(document.querySelectorAll('.cards__item')).slice(0, 6);
    } else if (window.innerWidth >= 1280) {
        countItems = 8;
        actualCollection = document.querySelectorAll('.cards__item');
    }
    sliderState.countItems = countItems;
    return actualCollection;
}

const setCard = (currentPage, countItems, actualCollection = getActualCollection()) => {
    actualCollection.forEach((item, index) => {
        let index48Arr;
        currentPage <= 1 ? index48Arr = index : index48Arr = (currentPage - 1) * countItems + index;
        item.setAttribute('data-index', index48Arr);
        item.querySelector('.cards__item > img').src = rnd48Pets[index48Arr].img;
        item.querySelector('.cards__item > img').alt = rnd48Pets[index48Arr].name + " Photo";
        item.querySelector('.item_title').textContent = rnd48Pets[index48Arr].name;
    });
}

setCard(sliderState.currentPage, sliderState.countItems);

const remoteVisiblePagination = () => {
    currentPage.textContent = sliderState.currentPage;
    setCard(sliderState.currentPage, sliderState.countItems);
    if (sliderState.currentPage === 1) {
        buttonLast.classList.remove('--disabled');
        buttonLast.disabled = false;

        buttonRight.classList.remove('--disabled');
        buttonRight.disabled = false;

        buttonFirst.classList.add('--disabled');
        buttonFirst.disabled = true;

        buttonLeft.classList.add('--disabled');
        buttonLeft.disabled = true;
    } else if (sliderState.currentPage > 1 && sliderState.currentPage < Math.ceil(rnd48Pets.length / sliderState.countItems)) {
        buttonFirst.classList.remove('--disabled');
        buttonFirst.disabled = false;

        buttonLeft.classList.remove('--disabled');
        buttonLeft.disabled = false;

        buttonLast.classList.remove('--disabled');
        buttonLast.disabled = false;

        buttonRight.classList.remove('--disabled');
        buttonRight.disabled = false;
    } else if (sliderState.currentPage >= Math.ceil(rnd48Pets.length / sliderState.countItems)) {
        buttonFirst.classList.remove('--disabled');
        buttonFirst.disabled = false;

        buttonLeft.classList.remove('--disabled');
        buttonLeft.disabled = false

        buttonLast.classList.add('--disabled');
        buttonLast.disabled = true;

        buttonRight.classList.add('--disabled');
        buttonRight.disabled = true;
    }
}

buttonFirst.addEventListener("click", () => {
    sliderState.currentPage = 1;
    remoteVisiblePagination();
});

buttonRight.addEventListener("click", () => {
    sliderState.currentPage++;
    remoteVisiblePagination();
});

buttonLeft.addEventListener("click", () => {
    sliderState.currentPage--;
    remoteVisiblePagination();
});

buttonLast.addEventListener("click", () => {
    sliderState.currentPage = Math.ceil(rnd48Pets.length / sliderState.countItems);
    remoteVisiblePagination();
});

//обновить страницы при изменении экрана
const resizeMedia = [
    window.matchMedia('(max-width: 767px)'),
    window.matchMedia('(max-width: 1279px)'),
    window.matchMedia('(min-width: 767px)'),
    window.matchMedia('(min-width: 1279px)')]

resizeMedia.forEach((item) => {
    item.addListener((e) => {
        if (e.matches) {
            sliderState.currentPage = 1;
            let actualCollection = getActualCollection();
            setCard(1, sliderState.countItems, actualCollection);
            remoteVisiblePagination();
        }
    })
})

for (let i = 0; i < sliderItems.length; i++) {
    sliderItems[i].addEventListener("click", () => {
        window.location.hash = "pets";
        bodyEl.classList.toggle("--hidden");
        modalWindow.classList.toggle("--open");
    })
};

const sliderBody = document.querySelector(".cards__items");

sliderBody.addEventListener("click", function (event) {
    if (event.target.closest(".cards__item")) {
        console.log(event.target.closest(".cards__item"))
        let indexPets = event.target.closest(".cards__item").dataset.index;
        createPopup(indexPets);
    }
});

const createPopup = (index) => {
    modalWindow.querySelector(".window__info__h3").textContent = rnd48Pets[index].name;
    modalWindow.querySelector(".window__info__h5").textContent = rnd48Pets[index].description;
    modalWindow.querySelector(".modal__container__window__img").src = rnd48Pets[index].img;
    
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