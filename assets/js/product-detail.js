// Ürün Detay Sayfası JavaScript Dosyası

// NOT: Backend Entegrasyonu İçin Önemli Noktalar:
// 1. Ürün detay bilgileri API'den dinamik olarak alınacak
// 2. Ürün görselleri API'den gelecek şekilde düzenlenecek
// 3. Ürün varyantları (renk, boyut vb.) API'den yönetilecek
// 4. Stok durumu gerçek zamanlı kontrol edilecek
// 5. Sepete ekleme işlemi backend API'si ile entegre edilecek

// Tooltip'leri aktif et
// Ürün Detay Sayfası JavaScript Dosyası

document.addEventListener("DOMContentLoaded", function () {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  initProductDetailSlider();
  handleVariantSelection();
  handleAddToCart();
});

function initProductDetailSlider() {
  const thumbsSwiper = new Swiper(".thumbsSwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  const mainSwiper = new Swiper(".mainSwiper", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: thumbsSwiper,
    },
  });
}

function handleVariantSelection() {
  const variantButtons = document.querySelectorAll(".variant-button");

  variantButtons.forEach((button) => {
    button.addEventListener("click", () => {
      variantButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

function handleAddToCart() {
  const addToCartButton = document.querySelector(".add-to-cart-button");

  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      console.log("Ürün sepete ekleniyor...");
    });
  }
}

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
