const trust = () => {
  class SliderCarousel {
    constructor({
      main,
      wrap,
      next,
      prev,
      position = 0,
      slidesToShow = 3,
      infinity = false,
      responsive = [],
    }) {
      if (!main || !wrap) {
        console.warn("slider-carousle: Необходимо 2 селектора - main. wrap");
      }
      this.main = document.querySelector(main);
      this.wrap = document.querySelector(wrap);
      this.slides = document.querySelector(wrap).children;
      this.next = document.querySelector(next);
      this.prev = document.querySelector(prev);
      this.options = {
        position,
        slidesToShow,
        widthSlide: Math.floor(100 / slidesToShow),
        infinity,
      };
      this.responsive = responsive;
    }

    init() {
      this.addGloClass();
      this.addStyle();
      if (this.prev && this.next) {
        this.controlSlider();
      } else {
        this.addArrow();
        this.controlSlider();
      }
      if (this.responsive) {
        this.responseInit();
      }
    }

    addGloClass() {
      this.main.classList.add("glo-slider");
      this.wrap.classList.add("glo-slider-wrap");
      for (const item of this.slides) {
        item.classList.add("glo-slider-item");
      }
    }

    addStyle() {
      let style = document.getElementById("sliderCarusel-style");

      if (!style) {
        style = document.createElement("style");
        style.id = "sliderCarusel-style";
      }

      style.textContent = `
        .glo-slider{
            overflow:hidden !important;
            text-align: center;
        }
        .glo-slider-wrap{
            display: flex !important;
            transition: transform 0.5s !important;
            will-change: transform !important;
        }
        .glo-slider-item {
            flex: 0 0 ${this.options.widthSlide}% !important;
            margin: auto 0 !important; 
            display: flex !important;
            align-items: center !important;
            justify-content: center;           
        }

        .glo-slider-prev,
        .glo-slider-next {
            margin: 10px;
            border: 20px solid transparent;
            background: transparent; 
            cursor: pointer;
            outline: none;           
        }
        .glo-slider-next {
            border-left-color: #19b5fe;
        }
        .glo-slider-prev {
            border-right-color: #19b5fe;
        }
         .glo-slider-prev:focus, .glo-slider-next:focus {
            background: transparent; 
        }

          .glo-slider-prev:hover, .glo-slider-next:hover {
            background: transparent; 
        }
    `;
      document.head.append(style);
    }

    controlSlider() {
      this.prev.addEventListener("click", this.prevSlider.bind(this));
      this.next.addEventListener("click", this.nextSlider.bind(this));
    }

    prevSlider() {
      if (this.options.position === 0) {
        this.options.position =
          this.slides.length + 1 - this.options.slidesToShow;
      }

      if (this.options.position > 0) {
        --this.options.position;

        this.wrap.style.transform = `translateX(-${
          this.options.position * this.options.widthSlide
        }%)`;
      }
    }
    nextSlider() {
      console.log(this.slides.length);
      console.log("toShow", this.options.slidesToShow);
      if (
        this.options.infinity ||
        this.options.position < this.slides.length - this.options.slidesToShow
      ) {
        ++this.options.position;

        if (
          this.options.position >
          this.slides.length - this.options.slidesToShow
        ) {
          this.options.position = 0;
        }
        this.wrap.style.transform = `translateX(-${
          this.options.position * this.options.widthSlide
        }%)`;
      }
    }

    addArrow() {
      const arrowWrap = document.createElement("div");
      arrowWrap.className = "arrow-wrap";
      this.prev = document.createElement("button");
      this.next = document.createElement("button");
      this.prev.className = "glo-slider-prev";
      this.next.className = "glo-slider-next";
      this.main.append(arrowWrap);
      arrowWrap.append(this.prev);
      arrowWrap.append(this.next);
    }

    responseInit() {
      const slidesToShowDefault = this.options.slidesToShow;
      const allResponse = this.responsive.map(item => item.breakpoint);
      const maxResponse = Math.max(...allResponse);

      const checkResponse = () => {
        const widthWindow = document.documentElement.clientWidth;
        if (widthWindow < maxResponse) {
          for (let i = 0; i < allResponse.length; i++) {
            if (widthWindow < allResponse[i]) {
              this.options.slidesToShow = this.responsive[i].slidesToShow;
              this.options.widthSlide = Math.floor(
                100 / this.options.slidesToShow
              );
              this.addStyle();
            }
          }
        } else {
          this.slidesToShow = slidesToShowDefault;
          this.options.widthSlide = Math.floor(100 / this.options.slidesToShow);
          this.addStyle();
        }
      };

      checkResponse();

      window.addEventListener("resize", checkResponse);
    }
  }

  const carousel = new SliderCarousel({
    main: ".companies-wrapper",
    wrap: ".companies-hor",
    slidesToShow: 3,
    infinity: true,
    responsive: [
      {
        breakpoint: 1024,
        slidesToShow: 3,
      },
      {
        breakpoint: 768,
        slidesToShow: 2,
      },
      {
        breakpoint: 576,
        slidesToShow: 1,
      },
    ],
  });

  carousel.init();
};

export default trust;
