let firstSection = document.getElementById('section0');
let language = document.getElementsByClassName('language');
let burgerLangContainer = document.querySelector('.language--burger .language__container');
let burgerLangItems = document.querySelectorAll('.language--burger .language__item');
let burgerBtn = document.getElementsByClassName('burger__btn')[0];
let burgerNav = document.getElementsByClassName('burger__nav')[0];
let burgerMenu = document.getElementsByClassName('burger__menu')[0];
let burgerItems = document.getElementsByClassName('burger__menu-item');
let changeLang = document.querySelectorAll('.change-lang');

function faqClick() {
    let acc = document.getElementsByClassName('faq__item-top');
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener('click', function (ev) {
            if (ev.target.classList.contains('active') ||
                (acc[i].contains(ev.target) && ev.target.parentNode.classList.contains('active'))) {
                this.classList.remove('active');
                this.nextElementSibling.style.maxHeight = null;
                return
            }
            for (let item of acc) {
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.nextElementSibling.style.maxHeight = null;
                }
            }

            this.classList.add('active');

            let panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.setAttribute('style', `max-height:${panel.scrollHeight + 100}px`);
            }
        });
    }
}

function toggleBurgerMenu() {
    burgerBtn.addEventListener('click', function () {
        burgerMenu.classList.toggle('burger-opened');
        burgerBtn.classList.toggle('burger-opened');
        burgerNav.classList.toggle('burger-opened');
        burgerLangContainer.classList.toggle('burger-opened');
        for (let item of burgerItems) {
            item.classList.toggle('burger-opened');
        }
        for (let i of language) {
            i.classList.toggle('burger-opened');
        }
        for (let i of burgerLangItems) {
            i.classList.toggle('burger-opened');
        }
        document.body.classList.toggle('burger-opened');
    })
}

function langToggle() {
    for (let i of language) {
        i.addEventListener('click', function () {
            i.classList.toggle('lang-opened');
        })
    }
}

document.addEventListener('click', function (ev) {
    if (!ev.target.classList?.contains('burger-opened') &&
        !ev.target.parentNode?.classList?.contains('burger-opened')) {
        burgerMenu.classList.remove('burger-opened');
        burgerBtn.classList.remove('burger-opened');
        burgerNav.classList.remove('burger-opened');
        for (let item of burgerItems) {
            item.classList.remove('burger-opened');
        }
        for (let i of language) {
            i.classList.remove('burger-opened');
        }
        for (let i of burgerLangItems) {
            i.classList.remove('burger-opened');
        }
        document.body.classList.remove('burger-opened');
    }

    if (!ev.target.classList?.contains('language__overlay')) {
        for (let i of language) {
            i.classList.remove('lang-opened');
        }
    }
})

function langRedirect() {
    const prefLang = localStorage.getItem('preferredLang');
    const siteDefaultLang = 'ua';
    const defaultLang = 'ru';
    const url = window.location.href;
    const urlPage = url.split('/').pop();

    if (!url.includes(defaultLang) &&
        ((!prefLang && navigator.language !== siteDefaultLang) || (prefLang && prefLang !== siteDefaultLang))) {
        window.location.href = defaultLang + '/' + urlPage;
    } else if (url.includes(defaultLang) && prefLang === siteDefaultLang) {
        window.location.href = '../' + urlPage;
    }
}

function rememberLang() {
    changeLang.forEach(item => {
        item.addEventListener('click', function (ev) {
            localStorage.setItem('preferredLang', item.getAttribute('data-lang'))
        })
    })
}

document.addEventListener('DOMContentLoaded', function () {
    firstSection?.classList.add('first')
    setTimeout(() => firstSection?.classList.remove('first'), 1500)
    faqClick();
    toggleBurgerMenu();
    langToggle();
    // langRedirect();
    // rememberLang();
})
