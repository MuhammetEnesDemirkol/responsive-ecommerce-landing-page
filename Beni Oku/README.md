# Dahiyen Web Projesi - Backend Entegrasyon Notları

## Genel Bilgi

Bu proje, Dahiyen markası için hazırlanmış bir frontend uygulamasıdır. Tüm ürün, kampanya ve kategori verileri şu anda statik olarak JavaScript dosyalarında tutulmaktadır. Backend bağlantısı yapıldığında bu verilerin dinamik olarak API'den alınması gerekmektedir.

---

## Entegrasyon Yapılacak Alanlar

### 1. Kampanya ve Ürün Verileri

- `assets/js/main.js` dosyasında `campaignProducts` ve demo ürünler statik olarak tanımlanmıştır.
- **Yapılması gereken:**
  - Tüm ürün, kampanya ve kategori verileri backend'den dinamik olarak alınmalı.
  - `loadCampaignProducts`, `loadProductCard`, `loadGridProductCard`, `loadMobileProducts` fonksiyonları backend'den veri çekmeye uygun şekilde güncellenmeli.

### 2. Ürün Detay Sayfası

- `assets/js/product-data.js` dosyasında örnek bir ürün detay objesi bulunmaktadır.
- **Yapılması gereken:**
  - Ürün detay verisi backend'den dinamik olarak alınmalı.
  - Gerekirse ürün ID'si ile detay endpoint'ine istek atılmalı.

### 3. Arama Fonksiyonu

- `main.js` içinde `handleSearch` fonksiyonu sadece konsola yazmaktadır.
- **Yapılması gereken:**
  - Arama kutusundan gelen sorgu ile backend'e istek atılmalı ve sonuçlar ekranda gösterilmeli.

### 4. Satın Al Butonları ve Mağaza Linkleri

- Satın al butonları ve mağaza linkleri şu anda sabit veya yönlendirme amaçlıdır.
- **Yapılması gereken:**
  - Gerekirse ilgili mağaza linkleri backend'den alınabilir veya yönlendirme URL'leri dinamikleştirilebilir.

### 5. Kampanya Süresi ve Sayaç

- Mobil kampanya kutusunda kalan süre statik olarak yazılmıştır.
- **Yapılması gereken:**
  - Kampanya bitiş tarihi backend'den alınmalı ve kalan süre dinamik olarak hesaplanmalı.

---

## Dikkat Edilmesi Gerekenler

- Tüm demo veriler ve örnekler, backend bağlantısı sonrası kaldırılmalı veya dinamik veri ile değiştirilmelidir.
- Frontend fonksiyonlarının çoğu, veri kaynağı değiştiğinde kolayca uyarlanabilir yapıdadır.
- Gerekli açıklamalar kodun içinde Türkçe olarak eklenmiştir.

---

## Dosya Yapısı

- `index.html` : Ana sayfa ve mobil/masaüstü tüm bölümler.
- `assets/js/main.js` : Tüm ana fonksiyonlar, veri yükleme ve Swiper başlatma.
- `assets/js/product-data.js` : Ürün detay sayfası için örnek veri.
- `assets/css/style.css` : Tüm stiller ve responsive düzenlemeler.

---

Hazırlayan: Muhammet Enes Demirkol
İletişim: www.muhammetenesdemirkol.com
