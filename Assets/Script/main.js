(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };


  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   *  search
   */
  const search = document.getElementById("search-btn");
  search.addEventListener("click", search_box);

  function search_box() {
    if (document.getElementById("search").classList.contains("search-box")) {
      document.getElementById("search").classList.remove("search-box");
    } else {
      document.getElementById("search").classList.add("search-box");
    }
  }

  /**
   * dark mode button
   */
  let Tenabled = false;
  const toggle = document.getElementById("dark-body");
  toggle.addEventListener("click", move);

  function move() {
    if ((Tenabled == true, document.body.classList.contains("dark"))) {
      Tenabled = false;
      document.getElementById("dark-button").style.transitionDuration = "0.3";
      document.getElementById("dark-button").style.left = "25%";
      document.getElementById("dark-button").style.borderColor = "grey";
      document.getElementById("dark-body").style.backgroundColor = "grey";
      document.body.classList.remove("dark");
      document.getElementById("Logo").src = "Assets/Image/Logo/Light-logo.png";
      sessionStorage.setItem("dark", 0);
    } else {
      Tenabled = true;
      document.getElementById("dark-button").style.transitionDuration = "0.3s";
      document.getElementById("dark-button").style.left = "75%";
      document.getElementById("dark-button").style.backgroundColor = "#fff";
      document.getElementById("dark-button").style.borderColor = "#3fbbc0";
      document.getElementById("dark-body").style.backgroundColor = "#3fbbc0";
      document.body.classList.add("dark");
      sessionStorage.setItem("dark", 1);
      document.getElementById("Logo").src = "Assets/Image/Logo/Dark-logo.png";
    }
  }

  window.addEventListener("load", function () {
    if (sessionStorage.getItem("dark") == 1) {
      Tenabled = true;
      document.getElementById("dark-button").style.transitionDuration = "0.3s";
      document.getElementById("dark-button").style.left = "75%";
      document.getElementById("dark-button").style.backgroundColor = "#fff";
      document.getElementById("dark-button").style.borderColor = "#3fbbc0";
      document.getElementById("dark-body").style.backgroundColor = "#3fbbc0";
      document.body.classList.add("dark");
      document.getElementById("Logo").src = "Assets/Image/Logo/Dark-logo.png";
    }
  });

  const cta = select("#cta-bb");
  cta.addEventListener("click", cta_btn);

  function cta_btn() {
    if (document.getElementById("cta").classList.contains("moo")) {
      document.getElementById("cta").classList.remove("moo");
    } else {
      document.getElementById("cta").classList.add("moo");
    }
  }

  /**
   * Navigation-Mode
   */

  let Nav = false;
  const Navbar_btn = document.getElementById("nav-body");
  Navbar_btn.addEventListener("click", nav_mode);

  function nav_mode() {
    if ((Nav == true, select("#header").classList.contains("menus"))) {
      Nav = false;
      document.getElementById("nav-button").style.transitionDuration = "0.3";
      document.getElementById("nav-button").style.left = "25%";
      document.getElementById("nav-button").style.borderColor = "grey";
      document.getElementById("nav-body").style.backgroundColor = "grey";
      select("#header").classList.remove("menus");
      sessionStorage.setItem("Mark", 0);
    } else {
      Nav = true;
      document.getElementById("nav-button").style.transitionDuration = "0.3s";
      document.getElementById("nav-button").style.left = "75%";
      document.getElementById("nav-button").style.backgroundColor = "#fff";
      document.getElementById("nav-button").style.borderColor = "#3fbbc0";
      document.getElementById("nav-body").style.backgroundColor = "#3fbbc0";
      select("#header").classList.add("menus");
      sessionStorage.setItem("Mark", 1);
    }
  }

  window.addEventListener("load", function () {
    if (sessionStorage.getItem("Mark") == 1) {
      Nav = true;
      document.getElementById("nav-button").style.transitionDuration = "0.3s";
      document.getElementById("nav-button").style.left = "75%";
      document.getElementById("nav-button").style.backgroundColor = "#fff";
      document.getElementById("nav-button").style.borderColor = "#3fbbc0";
      document.getElementById("nav-body").style.backgroundColor = "#3fbbc0";
      select("#header").classList.add("menus");
    }
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators");
  let heroCarouselItems = select("#heroCarousel .carousel-item", true);

  heroCarouselItems.forEach((item, index) => {
    index === 0
      ? (heroCarouselIndicators.innerHTML +=
          "<li data-bs-target='#heroCarousel' data-bs-slide-to='" +
          index +
          "' class='active'></li>")
      : (heroCarouselIndicators.innerHTML +=
          "<li data-bs-target='#heroCarousel' data-bs-slide-to='" +
          index +
          "'></li>");
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  /**
   * guide slider
   */
  var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: "true",
    fade: "true",
    grabCursor: "true",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-np",
      prevEl: ".swiper-button-pp",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      520: {
        slidesPerView: 2,
      },
      950: {
        slidesPerView: 3,
      },
    },
  });

  /**
   * autocar slider
   */
  var swiper = new Swiper(".slide-contents", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: "true",
    fade: "true",
    grabCursor: "true",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-b-n",
      prevEl: ".swiper-b-p",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      520: {
        slidesPerView: 2,
      },
      950: {
        slidesPerView: 3,
      },
    },
  });

  /**
   * tour slider
   */
  var swiper = new Swiper(".slide-contentss", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: "true",
    fade: "true",
    grabCursor: "true",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-b-nn",
      prevEl: ".swiper-b-pp",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      520: {
        slidesPerView: 2,
      },
      950: {
        slidesPerView: 3,
      },
    },
  });
})();
