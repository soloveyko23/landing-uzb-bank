(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    class MousePRLX {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true,
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            if (this.config.init) {
                const paralaxMouse = document.querySelectorAll("[data-prlx-mouse]");
                if (paralaxMouse.length) {
                    this.paralaxMouseInit(paralaxMouse);
                    this.setLogging(`Прокинувся, стежу за об'єктами: (${paralaxMouse.length})`);
                } else this.setLogging("Немає жодного обєкта. Сплю...zzZZZzZZz...");
            }
        }
        paralaxMouseInit(paralaxMouse) {
            paralaxMouse.forEach((el => {
                const paralaxMouseWrapper = el.closest("[data-prlx-mouse-wrapper]");
                const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100;
                const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100;
                const directionX = el.hasAttribute("data-prlx-dxr") ? -1 : 1;
                const directionY = el.hasAttribute("data-prlx-dyr") ? -1 : 1;
                const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50;
                let positionX = 0, positionY = 0;
                let coordXprocent = 0, coordYprocent = 0;
                setMouseParallaxStyle();
                if (paralaxMouseWrapper) mouseMoveParalax(paralaxMouseWrapper); else mouseMoveParalax();
                function setMouseParallaxStyle() {
                    const distX = coordXprocent - positionX;
                    const distY = coordYprocent - positionY;
                    positionX += distX * paramAnimation / 1e3;
                    positionY += distY * paramAnimation / 1e3;
                    el.style.cssText = `transform: translate3D(${directionX * positionX / (paramСoefficientX / 10)}%,${directionY * positionY / (paramСoefficientY / 10)}%,0);`;
                    requestAnimationFrame(setMouseParallaxStyle);
                }
                function mouseMoveParalax(wrapper = window) {
                    wrapper.addEventListener("mousemove", (function(e) {
                        const offsetTop = el.getBoundingClientRect().top + window.scrollY;
                        if (offsetTop >= window.scrollY || offsetTop + el.offsetHeight >= window.scrollY) {
                            const parallaxWidth = window.innerWidth;
                            const parallaxHeight = window.innerHeight;
                            const coordX = e.clientX - parallaxWidth / 2;
                            const coordY = e.clientY - parallaxHeight / 2;
                            coordXprocent = coordX / parallaxWidth * 100;
                            coordYprocent = coordY / parallaxHeight * 100;
                        }
                    }));
                }
            }));
        }
        setLogging(message) {
            this.config.logging ? functions_FLS(`[PRLX Mouse]: ${message}`) : null;
        }
    }
    modules_flsModules.mousePrlx = new MousePRLX({});
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
            return arr2;
        } else return Array.from(arr);
    }
    var hasPassiveEvents = false;
    if ("undefined" !== typeof window) {
        var passiveTestOptions = {
            get passive() {
                hasPassiveEvents = true;
                return;
            }
        };
        window.addEventListener("testPassive", null, passiveTestOptions);
        window.removeEventListener("testPassive", null, passiveTestOptions);
    }
    var isIosDevice = "undefined" !== typeof window && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || "MacIntel" === window.navigator.platform && window.navigator.maxTouchPoints > 1);
    var locks = [];
    var documentListenerAdded = false;
    var initialClientY = -1;
    var previousBodyOverflowSetting = void 0;
    var previousBodyPaddingRight = void 0;
    var allowTouchMove = function allowTouchMove(el) {
        return locks.some((function(lock) {
            if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) return true;
            return false;
        }));
    };
    var preventDefault = function preventDefault(rawEvent) {
        var e = rawEvent || window.event;
        if (allowTouchMove(e.target)) return true;
        if (e.touches.length > 1) return true;
        if (e.preventDefault) e.preventDefault();
        return false;
    };
    var setOverflowHidden = function setOverflowHidden(options) {
        if (void 0 === previousBodyPaddingRight) {
            var _reserveScrollBarGap = !!options && true === options.reserveScrollBarGap;
            var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;
            if (_reserveScrollBarGap && scrollBarGap > 0) {
                previousBodyPaddingRight = document.body.style.paddingRight;
                document.body.style.paddingRight = scrollBarGap + "px";
            }
        }
        if (void 0 === previousBodyOverflowSetting) {
            previousBodyOverflowSetting = document.body.style.overflow;
            document.body.style.overflow = "hidden";
        }
    };
    var restoreOverflowSetting = function restoreOverflowSetting() {
        if (void 0 !== previousBodyPaddingRight) {
            document.body.style.paddingRight = previousBodyPaddingRight;
            previousBodyPaddingRight = void 0;
        }
        if (void 0 !== previousBodyOverflowSetting) {
            document.body.style.overflow = previousBodyOverflowSetting;
            previousBodyOverflowSetting = void 0;
        }
    };
    var isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled(targetElement) {
        return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
    };
    var handleScroll = function handleScroll(event, targetElement) {
        var clientY = event.targetTouches[0].clientY - initialClientY;
        if (allowTouchMove(event.target)) return false;
        if (targetElement && 0 === targetElement.scrollTop && clientY > 0) return preventDefault(event);
        if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) return preventDefault(event);
        event.stopPropagation();
        return true;
    };
    var disableBodyScroll = function disableBodyScroll(targetElement, options) {
        if (!targetElement) {
            console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
            return;
        }
        if (locks.some((function(lock) {
            return lock.targetElement === targetElement;
        }))) return;
        var lock = {
            targetElement,
            options: options || {}
        };
        locks = [].concat(_toConsumableArray(locks), [ lock ]);
        if (isIosDevice) {
            targetElement.ontouchstart = function(event) {
                if (1 === event.targetTouches.length) initialClientY = event.targetTouches[0].clientY;
            };
            targetElement.ontouchmove = function(event) {
                if (1 === event.targetTouches.length) handleScroll(event, targetElement);
            };
            if (!documentListenerAdded) {
                document.addEventListener("touchmove", preventDefault, hasPassiveEvents ? {
                    passive: false
                } : void 0);
                documentListenerAdded = true;
            }
        } else setOverflowHidden(options);
    };
    var enableBodyScroll = function enableBodyScroll(targetElement) {
        if (!targetElement) {
            console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
            return;
        }
        locks = locks.filter((function(lock) {
            return lock.targetElement !== targetElement;
        }));
        if (isIosDevice) {
            targetElement.ontouchstart = null;
            targetElement.ontouchmove = null;
            if (documentListenerAdded && 0 === locks.length) {
                document.removeEventListener("touchmove", preventDefault, hasPassiveEvents ? {
                    passive: false
                } : void 0);
                documentListenerAdded = false;
            }
        } else if (!locks.length) restoreOverflowSetting();
    };
    class ImageCompare {
        constructor(el, settings = {}) {
            const defaults = {
                controlColor: "#FFFFFF",
                controlShadow: true,
                addCircle: false,
                addCircleBlur: true,
                showLabels: false,
                labelOptions: {
                    before: "Before",
                    after: "After",
                    onHover: false
                },
                smoothing: true,
                smoothingAmount: 100,
                hoverStart: false,
                verticalMode: false,
                startingPoint: 50,
                fluidMode: false
            };
            this.settings = Object.assign(defaults, settings);
            this.safariAgent = -1 != navigator.userAgent.indexOf("Safari") && -1 == navigator.userAgent.indexOf("Chrome");
            this.el = el;
            this.images = {};
            this.wrapper = null;
            this.control = null;
            this.arrowContainer = null;
            this.arrowAnimator = [];
            this.active = false;
            this.slideWidth = 50;
            this.lineWidth = 2;
            this.arrowCoordinates = {
                circle: [ 5, 3 ],
                standard: [ 8, 0 ]
            };
        }
        mount() {
            if (this.safariAgent) this.settings.smoothing = false;
            this._shapeContainer();
            this._getImages();
            this._buildControl();
            this._events();
        }
        _events() {
            this.el.addEventListener("mousedown", (ev => {
                this._activate(true);
                document.body.classList.add("icv__body");
                disableBodyScroll(this.el, {
                    reserveScrollBarGap: true
                });
                this._slideCompare(ev);
            }));
            this.el.addEventListener("mousemove", (ev => this.active && this._slideCompare(ev)));
            this.el.addEventListener("mouseup", (() => this._activate(false)));
            document.body.addEventListener("mouseup", (() => {
                document.body.classList.remove("icv__body");
                enableBodyScroll(this.el);
                this._activate(false);
            }));
            this.control.addEventListener("touchstart", (e => {
                this._activate(true);
                document.body.classList.add("icv__body");
                disableBodyScroll(this.el, {
                    reserveScrollBarGap: true
                });
            }));
            this.el.addEventListener("touchmove", (ev => {
                this.active && this._slideCompare(ev);
            }));
            this.el.addEventListener("touchend", (() => {
                this._activate(false);
                document.body.classList.remove("icv__body");
                enableBodyScroll(this.el);
            }));
            this.el.addEventListener("mouseenter", (() => {
                this.settings.hoverStart && this._activate(true);
                let coord = this.settings.addCircle ? this.arrowCoordinates.circle : this.arrowCoordinates.standard;
                this.arrowAnimator.forEach(((anim, i) => {
                    anim.style.cssText = `\n        ${this.settings.verticalMode ? `transform: translateY(${coord[1] * (0 === i ? 1 : -1)}px);` : `transform: translateX(${coord[1] * (0 === i ? 1 : -1)}px);`}\n        `;
                }));
            }));
            this.el.addEventListener("mouseleave", (() => {
                let coord = this.settings.addCircle ? this.arrowCoordinates.circle : this.arrowCoordinates.standard;
                this.arrowAnimator.forEach(((anim, i) => {
                    anim.style.cssText = `\n        ${this.settings.verticalMode ? `transform: translateY(${0 === i ? `${coord[0]}px` : `-${coord[0]}px`});` : `transform: translateX(${0 === i ? `${coord[0]}px` : `-${coord[0]}px`});`}\n        `;
                }));
            }));
        }
        _slideCompare(ev) {
            let bounds = this.el.getBoundingClientRect();
            let x = void 0 !== ev.touches ? ev.touches[0].clientX - bounds.left : ev.clientX - bounds.left;
            let y = void 0 !== ev.touches ? ev.touches[0].clientY - bounds.top : ev.clientY - bounds.top;
            let position = this.settings.verticalMode ? y / bounds.height * 100 : x / bounds.width * 100;
            if (position >= 0 && position <= 100) {
                this.settings.verticalMode ? this.control.style.top = `calc(${position}% - ${this.slideWidth / 2}px)` : this.control.style.left = `calc(${position}% - ${this.slideWidth / 2}px)`;
                if (this.settings.fluidMode) this.settings.verticalMode ? this.wrapper.style.clipPath = `inset(0 0 ${100 - position}% 0)` : this.wrapper.style.clipPath = `inset(0 0 0 ${position}%)`; else this.settings.verticalMode ? this.wrapper.style.height = `calc(${position}%)` : this.wrapper.style.width = `calc(${100 - position}%)`;
            }
        }
        _activate(state) {
            this.active = state;
        }
        _shapeContainer() {
            let imposter = document.createElement("div");
            let label_l = document.createElement("span");
            let label_r = document.createElement("span");
            label_l.classList.add("icv__label", "icv__label-before", "keep");
            label_r.classList.add("icv__label", "icv__label-after", "keep");
            if (this.settings.labelOptions.onHover) {
                label_l.classList.add("on-hover");
                label_r.classList.add("on-hover");
            }
            if (this.settings.verticalMode) {
                label_l.classList.add("vertical");
                label_r.classList.add("vertical");
            }
            label_l.innerHTML = this.settings.labelOptions.before || "Before";
            label_r.innerHTML = this.settings.labelOptions.after || "After";
            if (this.settings.showLabels) {
                this.el.appendChild(label_l);
                this.el.appendChild(label_r);
            }
            this.el.classList.add(`icv`, this.settings.verticalMode ? `icv__icv--vertical` : `icv__icv--horizontal`, this.settings.fluidMode ? `icv__is--fluid` : `standard`);
            imposter.classList.add("icv__imposter");
            this.el.appendChild(imposter);
        }
        _buildControl() {
            let control = document.createElement("div");
            let uiLine = document.createElement("div");
            let arrows = document.createElement("div");
            let circle = document.createElement("div");
            const arrowSize = "20";
            arrows.classList.add("icv__theme-wrapper");
            for (var idx = 0; idx <= 1; idx++) {
                let animator = document.createElement(`div`);
                let arrow = `<svg\n      height="15"\n      width="15"\n       style="\n       transform: \n       scale(${this.settings.addCircle ? .7 : 1.5})  \n       rotateZ(${0 === idx ? this.settings.verticalMode ? `-90deg` : `180deg` : this.settings.verticalMode ? `90deg` : `0deg`}); height: ${arrowSize}px; width: ${arrowSize}px;\n       \n       ${this.settings.controlShadow ? `\n       -webkit-filter: drop-shadow( 0px 3px 5px rgba(0, 0, 0, .33));\n       filter: drop-shadow( 0px ${0 === idx ? "-3px" : "3px"} 5px rgba(0, 0, 0, .33));\n       ` : ``}\n       "\n       xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 15 15">\n       <path ${this.settings.addCircle ? `fill="transparent"` : `fill="${this.settings.controlColor}"`}\n       stroke="${this.settings.controlColor}"\n       stroke-linecap="round"\n       stroke-width="${this.settings.addCircle ? 3 : 0}"\n       d="M4.5 1.9L10 7.65l-5.5 5.4"\n       />\n     </svg>`;
                animator.innerHTML += arrow;
                this.arrowAnimator.push(animator);
                arrows.appendChild(animator);
            }
            let coord = this.settings.addCircle ? this.arrowCoordinates.circle : this.arrowCoordinates.standard;
            this.arrowAnimator.forEach(((anim, i) => {
                anim.classList.add("icv__arrow-wrapper");
                anim.style.cssText = `\n      ${this.settings.verticalMode ? `transform: translateY(${0 === i ? `${coord[0]}px` : `-${coord[0]}px`});` : `transform: translateX(${0 === i ? `${coord[0]}px` : `-${coord[0]}px`});`}\n      `;
            }));
            control.classList.add("icv__control");
            control.style.cssText = `\n    ${this.settings.verticalMode ? `height` : `width `}: ${this.slideWidth}px;\n    ${this.settings.verticalMode ? `top` : `left `}: calc(${this.settings.startingPoint}% - ${this.slideWidth / 2}px);\n    ${"ontouchstart" in document.documentElement ? `` : this.settings.smoothing ? `transition: ${this.settings.smoothingAmount}ms ease-out;` : ``}\n    `;
            uiLine.classList.add("icv__control-line");
            uiLine.style.cssText = `\n      ${this.settings.verticalMode ? `height` : `width `}: ${this.lineWidth}px;\n      background: ${this.settings.controlColor};\n        ${this.settings.controlShadow ? `box-shadow: 0px 0px 15px rgba(0,0,0,0.33);` : ``}\n    `;
            let uiLine2 = uiLine.cloneNode(true);
            circle.classList.add("icv__circle");
            circle.style.cssText = `\n\n      ${this.settings.addCircleBlur && `-webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px)`};\n      \n      border: ${this.lineWidth}px solid ${this.settings.controlColor};\n      ${this.settings.controlShadow && `box-shadow: 0px 0px 15px rgba(0,0,0,0.33)`};\n    `;
            control.appendChild(uiLine);
            this.settings.addCircle && control.appendChild(circle);
            control.appendChild(arrows);
            control.appendChild(uiLine2);
            this.arrowContainer = arrows;
            this.control = control;
            this.el.appendChild(control);
        }
        _getImages() {
            let children = this.el.querySelectorAll("img, .keep");
            this.el.innerHTML = "";
            children.forEach((img => {
                this.el.appendChild(img);
            }));
            let childrenImages = [ ...children ].filter((element => "img" === element.nodeName.toLowerCase()));
            this.settings.verticalMode && childrenImages.reverse();
            for (let idx = 0; idx <= 1; idx++) {
                let child = childrenImages[idx];
                child.classList.add("icv__img");
                child.classList.add(0 === idx ? `icv__img-a` : `icv__img-b`);
                if (1 === idx) {
                    let wrapper = document.createElement("div");
                    let afterUrl = childrenImages[1].src;
                    wrapper.classList.add("icv__wrapper");
                    wrapper.style.cssText = `\n            width: ${100 - this.settings.startingPoint}%; \n            height: ${this.settings.startingPoint}%;\n\n            ${"ontouchstart" in document.documentElement ? `` : this.settings.smoothing ? `transition: ${this.settings.smoothingAmount}ms ease-out;` : ``}\n            ${this.settings.fluidMode && `background-image: url(${afterUrl}); clip-path: inset(${this.settings.verticalMode ? ` 0 0 ${100 - this.settings.startingPoint}% 0` : `0 0 0 ${this.settings.startingPoint}%`})`}\n        `;
                    wrapper.appendChild(child);
                    this.wrapper = wrapper;
                    this.el.appendChild(this.wrapper);
                }
            }
            if (this.settings.fluidMode) {
                let url = childrenImages[0].src;
                let fluidWrapper = document.createElement("div");
                fluidWrapper.classList.add("icv__fluidwrapper");
                fluidWrapper.style.cssText = `\n \n        background-image: url(${url});\n        \n      `;
                this.el.appendChild(fluidWrapper);
            }
        }
    }
    const scripts = ImageCompare;
    const openBlock = (parentSelector = "._parent-block", btnSelector = "._btn-block", contentSelector = "._content-block") => {
        const parent = document.querySelectorAll(parentSelector);
        parent.forEach((item => {
            const btn = item.querySelector(btnSelector);
            item.querySelector(contentSelector);
            btn.addEventListener("click", (e => {
                e.preventDefault();
                item.classList.toggle("open");
            }));
        }));
    };
    const script_element = document.getElementById("image-compare");
    const optionsElement = {
        controlColor: "#73c781",
        controlShadow: false,
        addCircle: true,
        addCircleBlur: true,
        showLabels: false,
        labelOptions: {
            before: "Before",
            after: "After",
            onHover: false
        },
        smoothing: true,
        smoothingAmount: 0,
        hoverStart: false,
        verticalMode: false,
        startingPoint: 50,
        fluidMode: false
    };
    new scripts(script_element, optionsElement).mount();
    const hoverOnItem = () => {
        const item = document.querySelector(".item-hover");
        const items = document.querySelectorAll(".item-hover-hovered");
        let timeoutId = null;
        const isTouchDevice = navigator.maxTouchPoints > 0;
        if (!isTouchDevice) {
            item.addEventListener("mousemove", (function(e) {
                if (!timeoutId) timeoutId = setTimeout((function() {
                    item.classList.add("_hover");
                    items.forEach((element => {
                        element.classList.add("_hovered");
                    }));
                    timeoutId = null;
                }), 50);
            }));
            item.addEventListener("mouseleave", (function() {
                clearTimeout(timeoutId);
                timeoutId = null;
                item.classList.remove("_hover");
                items.forEach((element => {
                    element.classList.remove("_hovered");
                }));
            }));
        }
        item.addEventListener("click", (e => {
            e.preventDefault();
            item.classList.toggle("_clicked");
            return false;
        }));
    };
    const hoverOnItemTwo = () => {
        const item = document.querySelector(".item-hover-2");
        const items = document.querySelectorAll(".item-hover-hovered-2");
        let timeoutId = null;
        const isTouchDevice = navigator.maxTouchPoints > 0;
        if (!isTouchDevice) {
            item.addEventListener("mousemove", (function(e) {
                if (!timeoutId) timeoutId = setTimeout((function() {
                    item.classList.add("_hover");
                    items.forEach((element => {
                        element.classList.add("_hovered");
                    }));
                    timeoutId = null;
                }), 50);
            }));
            item.addEventListener("mouseleave", (function() {
                clearTimeout(timeoutId);
                timeoutId = null;
                item.classList.remove("_hover");
                items.forEach((element => {
                    element.classList.remove("_hovered");
                }));
            }));
        }
        item.addEventListener("click", (e => {
            e.preventDefault();
            item.classList.toggle("_clicked");
            return false;
        }));
    };
    const hoverOnItemThree = () => {
        const item = document.querySelector(".item-hover-3");
        const items = document.querySelectorAll(".item-hover-hovered-3");
        let timeoutId = null;
        const isTouchDevice = navigator.maxTouchPoints > 0;
        if (!isTouchDevice) {
            item.addEventListener("mousemove", (function(e) {
                if (!timeoutId) timeoutId = setTimeout((function() {
                    item.classList.add("_hover");
                    items.forEach((element => {
                        element.classList.add("_hovered");
                    }));
                    timeoutId = null;
                }), 50);
            }));
            item.addEventListener("mouseleave", (function() {
                clearTimeout(timeoutId);
                timeoutId = null;
                item.classList.remove("_hover");
                items.forEach((element => {
                    element.classList.remove("_hovered");
                }));
            }));
        }
        item.addEventListener("click", (e => {
            e.preventDefault();
            item.classList.toggle("_clicked");
            return false;
        }));
    };
    window.onload = function() {
        gsap.from(".hero__messages .item.item-01 .item__body", {
            scrollTrigger: ".hero",
            delay: .2,
            y: 100,
            duration: .8
        });
        gsap.from(".header", {
            scrollTrigger: ".header",
            delay: .2,
            y: -200,
            duration: .8
        });
        gsap.from(".hero__messages .item.item-02 .item__body", {
            scrollTrigger: ".hero",
            delay: .3,
            y: 120,
            duration: .8
        });
        gsap.from(".hero__messages .item.item-03 .item__body", {
            scrollTrigger: ".hero",
            delay: .1,
            y: 140,
            duration: .8
        });
        gsap.from(".hero__messages .item.item-04 .item__body", {
            scrollTrigger: ".hero",
            delay: .4,
            y: 80,
            duration: .8
        });
        gsap.from(".hero__messages .item.item-05 .item__body", {
            scrollTrigger: ".hero",
            delay: .5,
            y: 180,
            duration: .8
        });
        gsap.from(".hero__image", {
            scrollTrigger: ".hero",
            delay: .2,
            y: "10rem",
            opacity: 0,
            duration: 1.2
        });
        gsap.from(".support__title", {
            scrollTrigger: ".support",
            delay: .2,
            x: "-100px",
            opacity: 0,
            duration: .8
        });
        gsap.from(".support__header-before", {
            scrollTrigger: ".support",
            delay: .2,
            opacity: 0,
            duration: .8
        });
        gsap.from(".footer__title", {
            scrollTrigger: ".footer",
            delay: .2,
            y: "100px",
            opacity: 0,
            duration: .8
        });
        gsap.from(".footer__buttons", {
            scrollTrigger: ".footer",
            delay: .2,
            opacity: 0,
            duration: .8
        });
        gsap.from(".footer__messages .item.item-01 .item__body", {
            scrollTrigger: ".footer",
            delay: .2,
            y: 200,
            duration: .8
        });
        gsap.from(".footer__messages .item.item-02 .item__body", {
            scrollTrigger: ".footer",
            delay: .2,
            y: 200,
            duration: .8
        });
        gsap.from(".support__messages .item.item-01 .item__body", {
            scrollTrigger: ".support",
            delay: .2,
            y: 200,
            opacity: 0,
            duration: .6
        });
        gsap.from(".support__messages .item.item-02 .item__body", {
            scrollTrigger: ".support",
            delay: .2,
            y: 300,
            opacity: 0,
            duration: .8
        });
        gsap.from(".support__messages .item.item-03 .item__body", {
            scrollTrigger: ".support",
            delay: .2,
            y: 400,
            opacity: 0,
            duration: 1
        });
        gsap.from(".support__images-image.img-02 img", {
            scrollTrigger: ".support",
            delay: .1,
            y: 400,
            duration: 1.5
        });
        gsap.from(".support__images-image.img-01 img", {
            scrollTrigger: ".support",
            delay: .5,
            y: 600,
            duration: 1
        });
        gsap.from(".transfer__cards", {
            scrollTrigger: ".transfer",
            delay: .5,
            y: 100,
            opacity: 0,
            duration: 1
        });
        gsap.from(".transfer__title", {
            scrollTrigger: ".transfer",
            delay: .5,
            x: -100,
            opacity: 0,
            duration: 1
        });
        gsap.from(".transfer__messages .item.item-02 .item__body", {
            scrollTrigger: ".transfer",
            delay: .5,
            scale: 0,
            opacity: 0,
            duration: .3
        });
        gsap.from(".transfer__messages .item.item-01 .item__body", {
            scrollTrigger: ".transfer",
            delay: .5,
            scale: 0,
            opacity: 0,
            duration: .5
        });
        gsap.from(".transfer__header-cards .transfer__header-card.card-01", {
            scrollTrigger: ".transfer",
            delay: .7,
            x: -100,
            opacity: 0,
            duration: 1
        });
        gsap.from(".transfer__header-cards .transfer__header-card.card-02", {
            scrollTrigger: ".transfer",
            delay: 1,
            x: 100,
            opacity: 0,
            duration: 1
        });
    };
    hoverOnItemThree();
    hoverOnItemTwo();
    hoverOnItem();
    openBlock();
    window["FLS"] = true;
    isWebp();
})();