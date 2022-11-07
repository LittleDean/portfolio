const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const USER_STORAGE_KEY = "PERSONAL-OPTIONS"

// Selector
const body = document.body
const header = $('#header')
const headerNavList = $$('.nav-bar__item-link')
const toggleThemeBtn = $('.toggle-theme')
const themeCheckbox = document.getElementById('theme-checkbox')
const toTopBtn = $('.to-top-btn')
const sections = $$('section')
const skillsSection = $('.skills__container')
const qualificationTabBtns = $$('[data-target]')
const qualificationTabContents = $$('[data-content]')
const servicesBtns = $$('.services__option-btn')
const servicesModal = $$('.services__modal')
const modalCloseBtns = $$('.modal__main-close')


// Swiper Portfolio
var swiperPortfolio = new Swiper(".portfolio__section", {
    cssMode: true,
    slidesPerView: 1,
    // autoplay: { delay: 4000 },
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// Swiper Testimonial
var swiper = new Swiper(".testimonial__section", {
    loop: true,
    grabCursor: true,
    slidesPerView: 2,
    spaceBetween: 48,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,
    },
});

// Lắng nghe / xử lí các sự kiện (DOM Events)
const app = {
    skillUnitsData: [
        {
            unitIcon: '<i class="fa-solid fa-laptop-code"></i>',
            unitName: 'Front-end developer',
            unitExp: 'More than 4 years',
            skills: [
                {
                    skillName: 'HTML',
                    skillProgress: '90%'
                },
                {
                    skillName: 'CSS',
                    skillProgress: '80%'
                },
                {
                    skillName: 'Javascript',
                    skillProgress: '60%'
                },
                {
                    skillName: 'React',
                    skillProgress: '85%'
                },
            ],
        },
        {
            unitIcon: '<i class="uil uil-swatchbook"></i>',
            unitName: 'Designer',
            unitExp: 'More than 5 years',
            skills: [
                {
                    skillName: 'Figma',
                    skillProgress: '90%'
                },
                {
                    skillName: 'Sketch',
                    skillProgress: '85%'
                },
                {
                    skillName: 'Photoshop',
                    skillProgress: '85%'
                },
            ]
        },
        {
            unitIcon: '<i class="uil uil-server-network"></i>',
            unitName: 'Backend developer',
            unitExp: 'More than 2 years',
            skills: [
                {
                    skillName: 'PHP',
                    skillProgress: '80%'
                },
                {
                    skillName: 'Node JS',
                    skillProgress: '70%'
                },
                {
                    skillName: 'Firebase',
                    skillProgress: '90%'
                },
                {
                    skillName: 'Python',
                    skillProgress: '55%'
                },
            ],
        },
        {
            unitIcon: '<i class="fa-regular fa-lightbulb"></i>',
            unitName: 'Marketing',
            unitExp: 'More than 2 years',
            skills: [
                {
                    skillName: 'PHP',
                    skillProgress: '80%'
                },
                {
                    skillName: 'Node JS',
                    skillProgress: '70%'
                },
                {
                    skillName: 'Firebase',
                    skillProgress: '90%'
                },
                {
                    skillName: 'Python',
                    skillProgress: '55%'
                },
            ],
        },
    ],

    isDarkTheme: false,
    config: JSON.parse(localStorage.getItem(USER_STORAGE_KEY)) || {},
    setConfig: function (key, value) {
        this.config[key] = value
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this.config))
    },

    handleEvents: () => {
        const _this = app
        toggleThemeBtn.onclick = (() => {
            _this.isDarkTheme = !_this.isDarkTheme
            body.classList.toggle('dark-theme', _this.isDarkTheme)
            _this.setConfig('isDarkTheme', _this.isDarkTheme)
        })

        // Highlight header - Show to top button - Active nav-link when scroll
        window.onscroll = (() => {
            // Highlight header
            if (_this.isDarkTheme) {
                header.style.backgroundColor = window.scrollY > 0 ? 'var(--container-color)' : 'transparent';
                header.style.boxShadow = 'none'
            } else {
                header.style.boxShadow = window.scrollY > 0 ? '0px 1px 1px rgb(0 0 0 / 12%)' : 'none'
                header.style.backgroundColor = window.scrollY > 0 ? 'var(--container-color)' : 'transparent';
            }

            // Show to top button
            toTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
            // Active headerNav-item when scroll
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 100) {
                    currentSection = section.getAttribute('id')
                }
            })
            headerNavList.forEach(navItem => {
                navItem.classList.remove('active')
                if (navItem.classList.contains(`nav__${currentSection}`)) {
                    navItem.classList.add('active')
                }
            })

        })

        // Qualification Switch Tabs
        qualificationTabBtns.forEach(btn => {
            btn.onclick = function () {
                const target = $(btn.dataset.target)
                qualificationTabBtns.forEach(btn => {
                    btn.classList.remove('active')
                })
                btn.classList.add('active')
                qualificationTabContents.forEach(tabContent => {
                    tabContent.classList.remove('active')
                })
                target.classList.add('active')
            }
        })

        // Services Modal
        servicesBtns.forEach((btn, index) => {
            btn.onclick = () => {
                servicesModal[index].classList.add('active')
            }
        })
        modalCloseBtns.forEach((btn, index) => {
            btn.onclick = () => {
                servicesModal[index].classList.remove('active')
            }
        })
        servicesModal.forEach(item => {
            item.onclick = ((e) => {
                e.target.classList.remove('active')
            })
        })
    },

    // Handle dropdown Skill-unit
    handleDropDown: function () {
        const unitBody = $$('.unit__body')
        function toggleSkill() {
            this.parentElement.classList.toggle('active')
        }
        unitBody.forEach(el => {
            el.onclick = toggleSkill
        });
    },

    render: () => {
        /* =================== RENDER SKILL UNITS =================== */
        const skillUnit = app.skillUnitsData.map(unit => {
            let skillListContent = [];
            if (unit.skills) {
                skillListContent = unit.skills.map(skill => {
                    return `
                        <div class="skill-item" >
                            <div class="skill__desc">
                                <span class="skill__name">${skill.skillName}</span>
                                <span class="skill__progress-number">${skill.skillProgress}</span>
                            </div>
                            <div class="skill__progress-full">
                                <span class="skill__progress-bar"></span>
                            </div>
                        </div >`}
                )
            }
            return `
                <div class="skill__unit" >
                    <div class="unit__body">
                        <p class="unit__body-icon">
                                ${unit.unitIcon}
                        </p>
                        <div class="unit-text">
                            <h4 class="unit-name">${unit.unitName}</h4>
                            <p class="unit-exp">${unit.unitExp}</p>
                        </div>
                        <span class='dropdown-icon'><i class="fa-solid fa-chevron-down"></i></span>
                    </div>
                        <!-- =========== dropdown =========== -->
                        <div class="skill-list">
                        ${[skillListContent.join('')]}
                    </div > 
                </div> `
        })
        skillsSection.innerHTML = skillUnit.join('')
    },

    // Load User Config Exits
    loadConfig: function () {
        this.isDarkTheme = this.config.isDarkTheme;
        body.classList.toggle('dark-theme', this.isDarkTheme)
    },

    start: function () {
        this.loadConfig();

        this.handleEvents();

        this.render();

        this.handleDropDown();
        themeCheckbox.checked = this.isDarkTheme

    },
}

app.start();