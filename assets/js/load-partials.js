document.addEventListener("DOMContentLoaded", function () {
  fetch("components/navbar.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("navbar-placeholder").innerHTML = html;

      // Navbar tamamen yüklendikten sonra main.js'i tekrar import etmeliyiz
      const script = document.createElement("script");
      script.src = "main.js";
      script.onload = function () {
        if (typeof setupMobileUI === "function") {
          setupMobileUI();
        }
      };
      document.body.appendChild(script);
    });
});
