// Dinamik Ürün Detay Sayfası JavaScript Dosyası

// NOT: Backend Entegrasyonu İçin Önemli Noktalar:
// 1. Ürün detayları API'den dinamik olarak yüklenecek
// 2. Slider görselleri API'den alınacak
// 3. Varyant seçenekleri API'den dinamik olarak güncellenecek
// 4. Stok bilgisi gerçek zamanlı kontrol edilecek
// 5. Fiyat bilgisi seçilen varyanta göre API'den güncellenecek

// Ana slider ve küçük resimler slider'ı başlatma
function initSwipers() {
  // Küçük resimler slider'ı
  const thumbsSwiper = new Swiper(".product-thumbs-slider", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      0: {
        slidesPerView: 3,
      },
      576: {
        slidesPerView: 4,
      },
    },
  });

  // Ana slider
  const mainSwiper = new Swiper(".product-main-slider", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: thumbsSwiper,
    },
    on: {
      slideChange: function () {
        const activeIndex = this.activeIndex;
        if (thumbsSwiper) {
          thumbsSwiper.slideTo(activeIndex);
          updateActiveThumbnail(activeIndex);
        }
      },
    },
  });

  // Küçük resimlere tıklama olayı
  const thumbnails = document.querySelectorAll(
    ".product-thumbs-slider .swiper-slide"
  );
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      if (mainSwiper) {
        mainSwiper.slideTo(index);
      }
    });
  });

  return { mainSwiper, thumbsSwiper };
}

// Aktif küçük resmi güncelleme
function updateActiveThumbnail(index) {
  const thumbnails = document.querySelectorAll(
    ".product-thumbs-slider .swiper-slide"
  );
  thumbnails.forEach((thumb, i) => {
    if (i === index) {
      thumb.classList.add("active");
    } else {
      thumb.classList.remove("active");
    }
  });
}

// Varyant seçimi işlemleri
function handleVariantSelection() {
  const variantButtons = document.querySelectorAll(".variant-button");

  variantButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      // Aktif varyantı güncelle
      variantButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const variantId = button.dataset.variantId;
      // TODO: API'den varyant detaylarını al
      // await getVariantDetails(variantId);

      // TODO: Stok durumunu kontrol et
      // await checkStock(variantId);

      // TODO: Fiyatı güncelle
      // await updatePrice(variantId);
    });
  });
}

// Sepete ekleme işlemi
async function handleAddToCart() {
  const addToCartButton = document.querySelector(".add-to-cart-button");

  if (addToCartButton) {
    addToCartButton.addEventListener("click", async () => {
      const selectedVariant = document.querySelector(".variant-button.active");
      const quantity = document.querySelector(".quantity-input").value;

      if (!selectedVariant) {
        alert("Lütfen bir varyant seçin");
        return;
      }

      // TODO: Sepete ekleme API isteği
      // const response = await addToCartAPI({
      //   variantId: selectedVariant.dataset.variantId,
      //   quantity: quantity
      // });

      console.log("Ürün sepete ekleniyor...");
    });
  }
}

// Sayfa yüklendiğinde
document.addEventListener("DOMContentLoaded", () => {
  const p = productData;

  document.getElementById("product-title").textContent = p.name;
  document.getElementById("product-description").innerHTML = p.description;

  // Satıcılar için HTML oluştur
  function createSellerHTML(seller) {
    // Mağaza logoları
    const logos = {
      kitapkolik: "assets/images/logo/kitapkolik-logo.png",
      trendyol: "assets/images/logo/trendyol-logo.png",
      hepsiburada: "assets/images/logo/hepsiburada-logo.png",
      whatsapp: "assets/images/icons/whatsapp.svg",
    };
    const logo = logos[seller.name.toLowerCase()] || "";
    return `
      <div class="purchase-option" data-store="${seller.name.toLowerCase()}">
        <div class="store-logo" style="position:absolute;top:-18px;left:20px;background:white;padding:2px 8px;border-radius:8px;z-index:2;">
          <img src="${logo}" alt="${
      seller.name
    }" style="height:22px;max-width:60px;object-fit:contain;" />
        </div>
        <div class="purchase-info">
          <div class="price">${seller.price} TL</div>
          <div class="delivery-options">
            ${(seller.badges || [])
              .map((badge) => `<div class="option">${badge}</div>`)
              .join("")}
          </div>
          <button class="btn-purchase" data-store="${seller.name.toLowerCase()}">Satın Al</button>
        </div>
      </div>
    `;
  }

  // Masaüstü satın alma seçenekleri
  const desktopSellerContainer = document.getElementById("product-sellers");
  let desktopSellersHTML = "";
  p.sellers.forEach((seller) => {
    desktopSellersHTML += createSellerHTML(seller);
  });
  desktopSellerContainer.innerHTML = desktopSellersHTML;

  // Mobil satın alma seçenekleri
  const mobileSellerContainer = document.getElementById(
    "mobile-product-sellers"
  );
  let mobileSellersHTML = "";
  p.sellers.forEach((seller) => {
    mobileSellersHTML += createSellerHTML(seller);
  });
  mobileSellerContainer.innerHTML = mobileSellersHTML;

  // Özellikler
  const featureGrid = document.getElementById("product-features");
  Object.entries(p.features).forEach(([key, value]) => {
    const item = document.createElement("div");
    item.className = "spec-item";
    item.innerHTML = `<div class="spec-label">${key}</div><div class="spec-value">${value}</div>`;
    featureGrid.appendChild(item);
  });

  // Swiper HTML içeriği oluştur
  const galleryWrapper = document.getElementById("gallery-wrapper");
  const thumbsWrapper = document.getElementById("thumbs-wrapper");

  p.images.forEach((img) => {
    // Ana slider
    const mainSlide = document.createElement("div");
    mainSlide.className = "swiper-slide";
    mainSlide.innerHTML = `<img src="${img}" class="img-fluid rounded-3" />`;
    galleryWrapper.appendChild(mainSlide);

    // Thumbs slider
    const thumbSlide = document.createElement("div");
    thumbSlide.className = "swiper-slide";
    thumbSlide.innerHTML = `<img src="${img}" class="img-fluid rounded-3" />`;
    thumbsWrapper.appendChild(thumbSlide);
  });

  const { mainSwiper, thumbsSwiper } = initSwipers();
  handleVariantSelection();
  handleAddToCart();
});
