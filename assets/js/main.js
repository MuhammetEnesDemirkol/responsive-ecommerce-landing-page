// Ana JavaScript dosyası (mobil ve masaüstü için)

// NOT: Backend Entegrasyonu İçin Önemli Noktalar:
// 1. campaignProducts objesi API'den dinamik olarak alınacak
// 2. Ürün kartları için createProductCard fonksiyonu API'den gelen verilerle çalışacak
// 3. Tüm statik ürün yüklemeleri API endpoint'lerine bağlanacak
// 4. Arama fonksiyonu backend search API'sine bağlanacak
// 5. Kullanıcı değerlendirmeleri API'den dinamik olarak yüklenecek

// Kampanya ürünleri verisi (Backend bağlantısı sonrası kaldırılacak - örnek data)
const campaignProducts = {
  "three-for-two": [
    {
      title: "Çocuklar İçin Okuma Günlüğü",
      image: "assets/images/products/product1.jpg",
      originalPrice: "120,00 TL",
      currentPrice: "87,50 TL",
      campaign: "3 Al 2 Öde",
      stores: ["Trendyol", "Hepsiburada"],
    },
    {
      title: "Çocuklar İçin Okuma Günlüğü",
      image: "assets/images/products/product1.jpg",
      originalPrice: "120,00 TL",
      currentPrice: "87,50 TL",
      campaign: "3 Al 2 Öde",
      stores: ["Trendyol", "Hepsiburada"],
    },
    {
      title: "Günlük Planlayıcı",
      image: "assets/images/products/product1.jpg",
      originalPrice: "150,00 TL",
      currentPrice: "112,50 TL",
      campaign: "3 Al 2 Öde",
      stores: ["Trendyol"],
    },
    {
      title: "Ayraç Seti",
      image: "assets/images/products/product1.jpg",
      originalPrice: "90,00 TL",
      currentPrice: "67,50 TL",
      campaign: "3 Al 2 Öde",
      stores: ["Trendyol", "Hepsiburada"],
    },
    {
      title: "Okuma Günlüğü",
      image: "assets/images/products/product1.jpg",
      originalPrice: "100,00 TL",
      currentPrice: "75,00 TL",
      campaign: "3 Al 2 Öde",
      stores: ["Trendyol"],
    },
  ],
  "second-discount": [
    {
      title: "Çocuklar İçin Okuma Günlüğü",
      image: "assets/images/products/product1.jpg",
      originalPrice: "120,00 TL",
      currentPrice: "97,50 TL",
      campaign: "2. Ürüne 25 TL İndirim",
      stores: ["Trendyol"],
    },
    {
      title: "Çocuklar İçin Okuma Günlüğü",
      image: "assets/images/products/product1.jpg",
      originalPrice: "120,00 TL",
      currentPrice: "97,50 TL",
      campaign: "2. Ürüne 25 TL İndirim",
      stores: ["Trendyol"],
    },
    {
      title: "Günlük Planlayıcı",
      image: "assets/images/products/product1.jpg",
      originalPrice: "150,00 TL",
      currentPrice: "125,00 TL",
      campaign: "2. Ürüne 25 TL İndirim",
      stores: ["Trendyol", "Hepsiburada"],
    },
    {
      title: "Ayraç Seti",
      image: "assets/images/products/product1.jpg",
      originalPrice: "90,00 TL",
      currentPrice: "65,00 TL",
      campaign: "2. Ürüne 25 TL İndirim",
      stores: ["Trendyol"],
    },
    {
      title: "Okuma Günlüğü",
      image: "assets/images/products/product1.jpg",
      originalPrice: "100,00 TL",
      currentPrice: "75,00 TL",
      campaign: "2. Ürüne 25 TL İndirim",
      stores: ["Trendyol", "Hepsiburada"],
    },
  ],
  coupon: [
    {
      title: "Çocuklar İçin Okuma Günlüğü",
      image: "assets/images/products/product1.jpg",
      originalPrice: "120,00 TL",
      currentPrice: "97,50 TL",
      campaign: "Kupon Fırsatı",
      stores: ["Trendyol"],
    },
    {
      title: "Çocuklar İçin Okuma Günlüğü",
      image: "assets/images/products/product1.jpg",
      originalPrice: "120,00 TL",
      currentPrice: "97,50 TL",
      campaign: "Kupon Fırsatı",
      stores: ["Trendyol"],
    },
    {
      title: "Günlük Planlayıcı",
      image: "assets/images/products/product1.jpg",
      originalPrice: "150,00 TL",
      currentPrice: "125,00 TL",
      campaign: "Kupon Fırsatı",
      stores: ["Trendyol", "Hepsiburada"],
    },
    {
      title: "Ayraç Seti",
      image: "assets/images/products/product1.jpg",
      originalPrice: "90,00 TL",
      currentPrice: "65,00 TL",
      campaign: "Kupon Fırsatı",
      stores: ["Trendyol"],
    },
    {
      title: "Okuma Günlüğü",
      image: "assets/images/products/product1.jpg",
      originalPrice: "100,00 TL",
      currentPrice: "75,00 TL",
      campaign: "Kupon Fırsatı",
      stores: ["Trendyol", "Hepsiburada"],
    },
  ],
};

// Ürün kartı oluşturma fonksiyonu
// NOT: Backend entegrasyonunda product parametresi API'den gelecek
function createProductCard(product) {
  const images =
    Array.isArray(product.images) && product.images.length
      ? product.images
      : [product.image];

  const dotsHTML = images
    .map(
      (_, index) => `<span class="dot${index === 0 ? " active" : ""}"></span>`
    )
    .join("");

  const firstImage = images[0] || "assets/images/products/product1.jpg";
  const imagesJSON = JSON.stringify(images);

  const [amount, currency] = product.currentPrice
    ? product.currentPrice.split(" ")
    : ["0", "TL"];

  return `
    <div class="swiper-slide">
      <div class="product-card">
          <div class="product-image-wrapper">
            <img src="${firstImage}" data-images='${imagesJSON}' data-index="0" class="product-img" />
            <button class="image-prev">‹</button>
            <button class="image-next">›</button>
          </div>
          <div class="store-badges">
            ${
              Array.isArray(product.stores)
                ? product.stores
                    .map((store) => `<span class="store-badge">${store}</span>`)
                    .join("")
                : ""
            }
          </div>
          <div class="card-body">
            <div class="dot-pagination mb-2">
              ${dotsHTML}
            </div>
            <h5 class="card-title">${product.title || "Ürün Başlığı"}</h5>
            <div class="product-specs">
              <div class="spec-item">
                <img src="assets/images/icons/renkli.svg" alt="Renkli" />
              </div>
              <div class="spec-item">
                <img src="assets/images/icons/60-yaprak.svg" alt="60 Yaprak" />
              </div>
              <div class="spec-item">
                <img src="assets/images/icons/a5.svg" alt="A5 Boyut" />
              </div>
              <div class="spec-item vertical">
                <img src="assets/images/icons/notebook.svg" alt="Mikro Cilt" />
              </div>
            </div>
            <div class="price-box">
              <span class="store-name">${(
                product.stores?.[0] || ""
              ).toLowerCase()}</span>
              <span class="shipping">🚚 Hızlı Teslimat</span>
              <div class="price-wrapper">
                <div class="price">
                  <span class="currency">${amount}TL</span>
                </div>
                <button class="buy-button">Satın Al</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  `;
}

// Kampanya kartı oluşturma fonksiyonu
// NOT: Backend entegrasyonunda product parametresi API'den gelecek
function createCampaignProductCard(product) {
  const isDiscounted = product.originalPrice !== product.currentPrice;
  const [newPrice] = product.currentPrice.split(" ");
  const [oldPrice] = product.originalPrice.split(" ");
  const store = product.stores[0].toLowerCase();

  return `
    <div class="swiper-slide">
      <div class="campaign-card" data-store="${store}">
        <div class="campaign-badge">${product.campaign}</div>
        <div class="campaign-store">
          <img src="assets/images/logo/${store}-logo.png" alt="${store}">
        </div>

        <div class="campaign-content">
          <div class="campaign-left position-relative">
            <!-- Küçük SVG ikonu -->
            <div class="campaign-icon">
              <img src="assets/images/icons/campaign.svg" alt="İkon">
            </div>
            <!-- Asıl ürün resmi -->
            <img src="${product.image}" alt="${
    product.title
  }" class="campaign-image">
          </div>
          <div class="campaign-right">
            <div class="campaign-rating">
              <span class="rating-number">4.8</span>
              <span>⭐⭐⭐⭐⭐</span>
              <span class="rating-count">(96)</span>
            </div>
            <div class="campaign-title">${product.title}</div>
            ${
              isDiscounted
                ? `
              <div class="campaign-price-box">
                <div class="campaign-discount-text">!Son 14 günün en düşük fiyatı</div>
                <div class="campaign-prices">
                  <span class="campaign-old-price">${oldPrice} TL</span>
                  <span class="campaign-new-price">${newPrice} TL</span>
                </div>
              </div>
            `
                : `
              <div class="campaign-normal-price">${newPrice} TL</div>
            `
            }
          </div>
        </div>
      </div>
    </div>
  `;
}

// Ürün görseli için Swiper başlatma
function initProductImageSwipers() {
  document.querySelectorAll(".productImageSwiper").forEach((slider) => {
    new Swiper(slider, {
      slidesPerView: 1,
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: slider.querySelector(".swiper-pagination"),
        clickable: true,
        bulletClass: "swiper-pagination-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active",
      },
      observer: true,
      observeParents: true,
    });
  });
}

// Arama fonksiyonu
// NOT: Backend entegrasyonunda search API'sine bağlanacak
function handleSearch(query) {
  if (query.trim()) {
    // TODO: Backend search API'si ile entegre edilecek
    console.log("Arama yapılıyor:", query);
  }
}

// Demo ürün kartlarını yükler
// NOT: Backend entegrasyonunda API'den gerçek veriler alınacak
function loadProductCard(targetSelector, count = 1) {
  const container = document.querySelector(targetSelector);
  if (container) {
    let content = "";
    for (let i = 0; i < count; i++) {
      content += createProductCard({
        title: "Demo Ürün",
        images: [
          "assets/images/products/product1.jpg",
          "assets/images/products/product1b.jpg",
          "assets/images/products/product1c.jpg",
        ],
        originalPrice: "120,00 TL",
        currentPrice: "97,50 TL",
        campaign: "Demo Kampanya",
        stores: ["Trendyol"],
      });
    }
    container.innerHTML = content;
    initProductImageSwipers();
  }
}

// Demo grid ürün kartlarını yükler
// NOT: Backend entegrasyonunda API'den gerçek veriler alınacak
function loadGridProductCard(targetSelector, count = 1) {
  const container = document.querySelector(targetSelector);
  if (container) {
    let content = "";
    for (let i = 0; i < count; i++) {
      content += `<div class="col-6 col-md-4 col-lg-3">
        ${createProductCard({
          title: "Demo Ürün",
          images: [
            "assets/images/products/product1.jpg",
            "assets/images/products/product1b.jpg",
            "assets/images/products/product1c.jpg",
          ],
          originalPrice: "120,00 TL",
          currentPrice: "97,50 TL",
          campaign: "Demo Kampanya",
          stores: ["Trendyol"],
        })}
      </div>`;
    }
    container.innerHTML = content;
    initProductImageSwipers();
  }
}

// Kampanya ürünlerini yükler
// NOT: Backend entegrasyonunda API'den kampanya verileri alınacak
function loadCampaignProducts() {
  const containers = {
    "three-for-two": document.getElementById("threeForTwoProducts"),
    "second-discount": document.getElementById("secondDiscountProducts"),
    coupon: document.getElementById("couponProducts"),
  };

  Object.keys(containers).forEach((category) => {
    const container = containers[category];
    if (container) {
      container.innerHTML = campaignProducts[category]
        .map((product) => createCampaignProductCard(product))
        .join("");
    }
  });
  initSwipers();
  initProductImageSwipers();
}

// Mobil kategori ürünlerini yükler
// NOT: Backend entegrasyonunda kategori API'sinden veriler alınacak
function loadMobileProducts() {
  loadProductCard("#mobileCategoryPlannerProducts", 7);
  loadProductCard("#mobileCategoryJournalProducts", 7);
  loadProductCard("#mobileCategoryBookmarkProducts", 7);
}

// Swiper bileşenlerini başlatır
function initSwipers() {
  // Ana Slider (üst slider)
  const mainSlider = document.querySelector(".mainSwiper");
  const thumbnailSlider = document.querySelector(".thumbnailSwiper");

  let mainSwiper, thumbSwiper;

  if (thumbnailSlider) {
    thumbSwiper = new Swiper(thumbnailSlider, {
      slidesPerView: "auto",
      spaceBetween: 10,
      watchSlidesProgress: true,
      pagination: {
        el: ".thumbnailSwiper .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        381: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        570: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      },
    });
  }

  if (mainSlider) {
    mainSwiper = new Swiper(mainSlider, {
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: ".main-next",
        prevEl: ".main-prev",
      },
      pagination: {
        el: ".mainSwiper .swiper-pagination",
        clickable: true,
      },
      thumbs: {
        swiper: thumbSwiper,
      },
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        381: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
      on: {
        slideChange: function () {
          // Ana slider değiştiğinde thumbnail'ı güncelle
          if (thumbSwiper) {
            thumbSwiper.slideTo(this.realIndex);
          }
        },
      },
    });
  }

  // Campaign Swiper
  document.querySelectorAll(".campaignSwiper").forEach((campaignSlider) => {
    new Swiper(campaignSlider, {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: campaignSlider.querySelector(".category-next"),
        prevEl: campaignSlider.querySelector(".category-prev"),
      },
      pagination: {
        el: campaignSlider.querySelector(".swiper-pagination"),
        clickable: true,
      },
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      breakpoints: {
        570: {
          slidesPerView: 2,
          spaceBetween: 12,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  });

  // Category Swipers
  document.querySelectorAll(".categorySwiper").forEach((categorySlider) => {
    new Swiper(categorySlider, {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: false,
      navigation: {
        nextEl: categorySlider.querySelector(".swiper-button-next"),
        prevEl: categorySlider.querySelector(".swiper-button-prev"),
      },
      pagination: {
        el: categorySlider.querySelector(".swiper-pagination"),
        clickable: true,
      },
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        381: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
  });

  // Featured Products Swiper
  const featuredSlider = document.querySelector(".featuredSwiper");
  if (featuredSlider) {
    new Swiper(featuredSlider, {
      slidesPerView: 2,
      spaceBetween: 20,
      navigation: {
        nextEl: ".featured-next",
        prevEl: ".featured-prev",
      },
      pagination: {
        el: ".featuredSwiper .swiper-pagination",
        clickable: true,
      },
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        381: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
  }

  // Reviews Swiper
  const reviewSlider = document.querySelector(".reviewSwiper");
  if (reviewSlider) {
    new Swiper(reviewSlider, {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
      speed: 800,
      navigation: {
        nextEl: ".review-next",
        prevEl: ".review-prev",
      },
      pagination: {
        el: ".review-dots",
        clickable: true,
      },
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      breakpoints: {
        798: {
          slidesPerView: 2,
          spaceBetween: 30,
          centeredSlides: true,
        },
      },
      on: {
        beforeInit: function () {
          const slides = this.el.querySelectorAll(".swiper-slide");
          slides.forEach((slide) => {
            slide.style.opacity = "0";
            slide.style.visibility = "hidden";
          });
        },
        slideChangeTransitionStart: function () {
          const slides = this.slides;
          slides.forEach((slide) => {
            if (!slide.classList.contains("swiper-slide-visible")) {
              slide.style.opacity = "0";
              slide.style.visibility = "hidden";
              if (slide.querySelector(".review-card")) {
                slide.querySelector(".review-card").style.transform =
                  "scale(0.95)";
              }
            }
          });
        },
        slideChangeTransitionEnd: function () {
          const slides = this.slides;
          slides.forEach((slide) => {
            if (slide.classList.contains("swiper-slide-visible")) {
              slide.style.opacity = "1";
              slide.style.visibility = "visible";
              if (
                slide.classList.contains("swiper-slide-active") &&
                slide.querySelector(".review-card")
              ) {
                slide.querySelector(".review-card").style.transform =
                  "scale(1)";
              }
            }
          });
        },
      },
    });
  }
}

// Masaüstü UI işlemleri
function setupDesktopUI() {
  // Masaüstü arama fonksiyonu
  const searchInput = document.querySelector(".search-bar input");
  const searchIcon = document.querySelector(".search-icon");

  if (searchInput && searchIcon) {
    searchIcon.addEventListener("click", () => {
      searchIcon.classList.toggle("active");
      handleSearch(searchInput.value);
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchIcon.classList.add("active");
        handleSearch(searchInput.value);
      }
    });

    // Input'tan focus çıktığında active class'ı kaldır
    searchInput.addEventListener("blur", () => {
      setTimeout(() => {
        searchIcon.classList.remove("active");
      }, 200);
    });
  }
}

// Mobil UI işlemleri
function setupMobileUI() {
  // Mobil menü açma/kapama işlemleri
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenuClose = document.querySelector(".btn-close");

  if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
    mobileMenuToggle.addEventListener("click", function () {
      mobileMenu.classList.add("show");
      document.body.style.overflow = "hidden";
    });

    mobileMenuClose.addEventListener("click", function () {
      mobileMenu.classList.remove("show");
      document.body.style.overflow = "";
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !mobileMenu.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)
      ) {
        mobileMenu.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  }

  // Mobil arama çubuğu açma/kapama işlemleri
  const searchIcon = document.querySelector(".mobile-search-icon");
  const searchBar = document.querySelector(".mobile-search-bar");

  if (searchIcon && searchBar) {
    searchIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      searchBar.classList.toggle("active");
      searchIcon.classList.toggle("active");

      // Focus the search input when opening
      if (searchBar.classList.contains("active")) {
        searchBar.querySelector("input").focus();
      }
    });

    // Close search bar when clicking outside
    document.addEventListener("click", function (e) {
      if (!searchBar.contains(e.target) && !searchIcon.contains(e.target)) {
        searchBar.classList.remove("active");
        searchIcon.classList.remove("active");
      }
    });

    // Prevent search bar from closing when clicking inside it
    searchBar.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }
}

// Sayfa yüklendiğinde çalışacak işlemler
document.addEventListener("DOMContentLoaded", function () {
  // Ürünleri yükle
  loadCampaignProducts();
  loadProductCard("#featuredProducts", 7);
  loadProductCard("#categoryPlannerProducts", 7);
  loadProductCard("#categoryJournalProducts", 7);
  loadProductCard("#categoryBookmarkProducts", 7);
  loadGridProductCard("#allProducts", 8);
  loadMobileProducts();
  initSwipers();

  setupMobileUI();
  setupDesktopUI();

  // Ürün kartı hover ve buton eventleri
  document.querySelectorAll(".product-card").forEach((card) => {
    const img = card.querySelector(".product-img");
    const dots = card.querySelectorAll(".dot");
    if (!img || dots.length === 0) return;

    const images = JSON.parse(img.dataset.images || "[]");
    let currentIndex = 0;

    const updateImage = (index) => {
      img.style.opacity = "0";
      setTimeout(() => {
        img.src = images[index];
        img.style.opacity = "1";
      }, 200);
      currentIndex = index;
      dots.forEach((d, idx) => d.classList.toggle("active", idx === index));
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("mouseenter", (e) => {
        e.stopPropagation();
        updateImage(index);
      });
    });

    const prevBtn = card.querySelector(".image-prev");
    const nextBtn = card.querySelector(".image-next");

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage(currentIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        updateImage(currentIndex);
      });
    }
  });

  // Ana slider ve alt slider bağlantısı (Bootstrap carousel)
  const mainCarousel = document.getElementById("mainCarousel");
  if (mainCarousel) {
    const mainSlider = mainCarousel.querySelector(".carousel-inner");
    const thumbnails = document.querySelectorAll(".slider-thumbnail img");

    thumbnails.forEach((thumb, idx) => {
      thumb.addEventListener("click", function () {
        // Bootstrap carousel için slide'ı değiştir
        const carousel = bootstrap.Carousel.getOrCreateInstance(mainCarousel);
        carousel.to(idx);

        // Aktif thumbnail'ı güncelle
        document.querySelectorAll(".slider-thumbnail").forEach((el, i) => {
          el.classList.toggle("active", i === idx);
        });
      });
    });
  }

  // Mobilde de alt slider tıklanınca ana slider değişsin
  const mobileThumbnails = document.querySelectorAll(
    ".d-md-none .slider-thumbnail img"
  );
  if (mainCarousel && mobileThumbnails.length > 0) {
    mobileThumbnails.forEach((thumb, idx) => {
      thumb.addEventListener("click", function () {
        const carousel = bootstrap.Carousel.getOrCreateInstance(mainCarousel);
        carousel.to(idx);
        document
          .querySelectorAll(".d-md-none .slider-thumbnail")
          .forEach((el, i) => {
            el.classList.toggle("active", i === idx);
          });
      });
    });
  }
});

document.addEventListener("click", function (e) {
  const card = e.target.closest(".product-card");
  const isBuyButton = e.target.closest(".buy-button");
  const isDot = e.target.classList.contains("dot");

  if (card && !isBuyButton) {
    if (isDot) {
      e.stopPropagation(); // Burası önemli: Dot tıklamasında kart açılmasın!

      const cardBody = e.target.closest(".card-body");
      const wrapper = card.querySelector(".product-image-wrapper");
      const img = wrapper.querySelector("img.product-img");
      const dots = cardBody.querySelectorAll(".dot");
      const dotIndex = Array.from(dots).indexOf(e.target);

      if (img && img.dataset.images) {
        const images = JSON.parse(img.dataset.images);

        // Doğrudan doğru görseli ata
        img.setAttribute("src", images[dotIndex]);

        // Aktif dot'u güncelle
        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === dotIndex);
        });
      }
    } else {
      window.location.href = "product-detail.html";
    }
  }
});

document.addEventListener("click", function (e) {
  const searchButton = e.target.closest(".mobile-search-icon");
  if (searchButton) {
    const searchBar = document.querySelector(".mobile-search-bar");
    if (searchBar) {
      searchBar.classList.toggle("active");

      if (searchBar.classList.contains("active")) {
        const input = searchBar.querySelector("input");
        if (input) input.focus();
      }
    }
  }

  const searchBar = document.querySelector(".mobile-search-bar");
  if (
    searchBar &&
    !searchBar.contains(e.target) &&
    !e.target.closest(".mobile-search-icon")
  ) {
    searchBar.classList.remove("active");
  }
});
