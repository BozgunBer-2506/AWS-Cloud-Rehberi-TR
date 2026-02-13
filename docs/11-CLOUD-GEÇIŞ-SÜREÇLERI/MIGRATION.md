# Bölüm 11: Migration ve Transfer (Cloud'a Geçiş)

Elinizde hali hazırda çalışan bir veri merkezi (On-premise) veya devasa veriler varsa, bunları AWS'e taşımak sadece "kopyala-yapıştır" ile olmaz. AWS, verinin boyutuna ve türüne göre farklı taşıma yolları sunar.

---

### 1. AWS Snow Family - Fiziksel Taşıma

İnternet üzerinden gönderilemeyecek kadar büyük veriler (Terabaytlarca veya Petabaytlarca) için AWS size fiziksel bir cihaz gönderir.

* **AWS Snowcone:** En küçük üye. 8 TB veri taşır. Çantaya sığar.
* **AWS Snowball Edge:** Orta boy. Onlarca TB veri için kullanılır. Çok dayanıklı bir bavul gibidir.
* **AWS Snowmobile:** Devasa kamyon. Exabyte seviyesindeki verileri taşımak için veri merkezinizin kapısına yanaşır.

> **Neden Fiziksel?** 100 PB veriyi standart bir internet hızıyla yüklemek onlarca yıl sürebilir. Snowball ile bu süre haftalara iner.

---

### 2. AWS Storage Gateway

Kendi yerel merkezinizdeki sunucular ile AWS bulut depolama alanı (**S3**) arasında köprü kurar. Verileriniz yereldeymiş gibi görünür ama arka planda buluta yedeklenir.

---

### 3. AWS Database Migration Service (DMS)

Veritabanlarını taşımak için kullanılır. En büyük özelliği: **Zero Downtime**.

* Taşıma sırasında ana veritabanınız çalışmaya devam eder.
* Veriler kopyalanırken oluşan değişiklikleri de takip eder ve hedef veritabanına yansıtır.

---

### 4. Migration Evaluator ve Application Discovery Service

Taşınmaya başlamadan önce kullanılır:

* **Evaluator:** "Benim bu sistemim buluta geçerse ne kadar tutar?" sorusuna cevap verir.
* **Discovery Service:** Yerel merkezinizdeki sunucuların birbirine nasıl bağlı olduğunu haritalandırır.

---

### 5. Taşıma Stratejileri (6 R)

Öğrencinin bilmesi gereken temel stratejiler:

1. **Re-host (Lift and Shift):** Hiçbir şeyi değiştirmeden aynen taşı.
2. **Re-platform:** Küçük optimizasyonlar yaparak taşı.
3. **Re-factor:** Buluta tam uyumlu olması için kodu yeniden yaz.
4. **Repurchase:** Farklı bir ürüne geç (SaaS).
5. **Retain:** Şimdilik dokunma, yerinde kalsın.
6. **Retire:** Artık işe yaramıyor, kapat gitsin.

---

<details>
<summary>SORU: Verilerimi AWS'e taşırken internetim koparsa ne olur?</summary>
<div class="answer-content">

Eğer veriniz çok büyükse internet üzerinden taşımak yerine **AWS Snowball** tercih etmelisiniz. Eğer internet kullanıyorsanız, **AWS DataSync** servisi kopan bağlantıları yönetir ve sadece eksik kalan kısımları tamamlayarak güvenli taşıma sağlar.

</div>
</details>