const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const USER_STORAGE_KEY = "PERSONAL-OPTIONS"

// Selector
const body = document.body
const header = $('#header')
const headerNavBar = $('.nav-bar')
const headerNavList = $$('.nav-bar__item-link')
const toggleThemeBtn = $('.toggle-theme')
const themeCheckbox = document.getElementById('theme-checkbox')
const showHeaderNavBtn = $('.header__nav-show')
const hideHeaderNavBtn = $('.nav-bar__close')
const toTopBtn = $('.to-top-btn')
const sections = $$('section')
const skillsSection = $('.skills__section')
const qualificationTabBtns = $$('[data-target]')
const qualificationTabContents = $$('[data-content]')
const servicesBtns = $$('.services__option-btn')
const servicesModal = $$('.services__modal')
const servicesModalMain = $$('.services__modal-main')
const modalCloseBtns = $$('.modal__main-close')


// Swiper Portfolio
var swiper = new Swiper(".portfolio__section", {
    cssMode: true,
    slidesPerView: 1,
    loop: true,
    // autoplay: { delay: 4000 },
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
swiper = new Swiper(".testimonial__section", {
    loop: true,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 48,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,
    },
    breakpoints: {
        586: {
            slidesPerView: 2,
        }
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
                    skillProgress: '80%'
                },
                {
                    skillName: 'Sketch',
                    skillProgress: '75%'
                },
                {
                    skillName: 'Photoshop',
                    skillProgress: '75%'
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
                    skillProgress: '75%'
                },
                {
                    skillName: 'Node JS',
                    skillProgress: '70%'
                },
                {
                    skillName: 'Firebase',
                    skillProgress: '50%'
                },
                {
                    skillName: 'Python',
                    skillProgress: '60%'
                },
            ],
        },
        {
            unitIcon: '<i class="fa-regular fa-lightbulb"></i>',
            unitName: 'Marketing',
            unitExp: 'More than 2 years',
            skills: [
                {
                    skillName: 'Semrush',
                    skillProgress: '60%'
                },
                {
                    skillName: 'Conductor',
                    skillProgress: '50%'
                },
                {
                    skillName: 'Yoast',
                    skillProgress: '60%'
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

        // Toggle Dark/Light Theme
        toggleThemeBtn.onclick = (() => {
            _this.isDarkTheme = !_this.isDarkTheme
            body.classList.toggle('dark-theme', _this.isDarkTheme)
            _this.setConfig('isDarkTheme', _this.isDarkTheme)
        })

        // Show/Hide Header Navigation
        showHeaderNavBtn.onclick = (() => {
            headerNavBar.classList.add('active')
        })
        hideHeaderNavBtn.onclick = (() => {
            headerNavBar.classList.remove('active')
        })



        // Highlight header - Show to top button - Active nav-link when scroll
        window.onscroll = (() => {
            // Highlight header
            if (_this.isDarkTheme) {
                header.style.boxShadow = 'none'
            } else {
                header.style.boxShadow = window.scrollY > 0 ? '0px 1px 1px rgb(0 0 0 / 12%)' : 'none'
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
                // Highlight a navItem
                navItem.classList.remove('active')
                if (navItem.classList.contains(`nav__${currentSection}`)) {
                    navItem.classList.add('active')
                }
                // Hide Header Navigation when click in small screen
                headerNavBar.classList.remove('active')
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
                body.classList.add("modal-open")
                servicesModal[index].classList.add('active')
            }
        })
        modalCloseBtns.forEach((btn, index) => {
            btn.onclick = () => {
                body.classList.remove("modal-open")
                servicesModal[index].classList.remove('active')
            }
        })
        servicesModal.forEach(item => {
            item.onclick = ((e) => {
                body.classList.remove("modal-open")
                e.target.classList.remove('active')
            })
        })
        servicesModalMain.forEach(item => {
            item.onclick = ((event) => {
                event.stopPropagation();
            })
        })
    },
    // Handle dropdown Skill-unit
    handleDropDown: function () {
        const unitBody = $$('.unit__body')
        const skillUnits = $$('.skill__unit')

        function toggleSkill() {
            const parentUnit = this.closest('.skill__unit')
            if (parentUnit.classList.contains('active')) {
                parentUnit.classList.remove('active')
            } else {
                skillUnits.forEach(item => {
                    item.classList.remove('active')
                })
                parentUnit.classList.add('active')
            }
        }
        unitBody.forEach(unit => {
            unit.onclick = toggleSkill
        });
    },

    // Render view
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
                                <span class="skill__progress-bar" style="width:${skill.skillProgress}"></span>
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
        themeCheckbox.checked = this.isDarkTheme
    },

    start: function () {
        this.loadConfig();
        this.handleEvents();
        this.render();
        this.handleDropDown();
    },
}

app.start();