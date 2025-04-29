// Mobil ürün görseli geçiş fonksiyonları
document.addEventListener("DOMContentLoaded", function () {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const imageWrapper = card.querySelector(".product-image-wrapper");
    const images = imageWrapper.querySelectorAll("img");
    const prevBtn = imageWrapper.querySelector(".image-prev");
    const nextBtn = imageWrapper.querySelector(".image-next");
    const dots = imageWrapper.querySelectorAll(".dot");

    let currentImageIndex = 0;

    // Görsel değiştirme fonksiyonu
    function changeImage(index) {
      images.forEach((img) => (img.style.display = "none"));
      dots.forEach((dot) => dot.classList.remove("active"));

      images[index].style.display = "block";
      dots[index].classList.add("active");
      currentImageIndex = index;
    }

    // İlk görseli göster
    changeImage(0);

    // Önceki buton tıklama
    prevBtn.addEventListener("click", () => {
      let newIndex = currentImageIndex - 1;
      if (newIndex < 0) newIndex = images.length - 1;
      changeImage(newIndex);
    });

    // Sonraki buton tıklama
    nextBtn.addEventListener("click", () => {
      let newIndex = currentImageIndex + 1;
      if (newIndex >= images.length) newIndex = 0;
      changeImage(newIndex);
    });

    // Nokta tıklamaları
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => changeImage(index));
    });

    // Dokunmatik kaydırma
    let touchStartX = 0;
    let touchEndX = 0;

    imageWrapper.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    imageWrapper.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Sağa kaydırma
          let newIndex = currentImageIndex + 1;
          if (newIndex >= images.length) newIndex = 0;
          changeImage(newIndex);
        } else {
          // Sola kaydırma
          let newIndex = currentImageIndex - 1;
          if (newIndex < 0) newIndex = images.length - 1;
          changeImage(newIndex);
        }
      }
    }
  });
});
