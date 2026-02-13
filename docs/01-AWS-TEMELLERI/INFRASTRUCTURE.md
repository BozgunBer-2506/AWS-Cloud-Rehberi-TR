# Bölüm 01: AWS Giriş ve Global Infrastructure

**AWS (Amazon Web Services)**, dünyanın en gelişmiş **Cloud Computing** platformudur. Bir öğrenci olarak bilmen gereken ilk şey, **Cloud**'un aslında "başka birinin bilgisayarlarını kiralama hizmeti" olduğudur. Ancak AWS bunu, dünya ölçeğinde devasa bir altyapıyla yapar.

---

### 1. Cloud Bilişimin 5 Temel Özelliği
Öğrenci olarak "Neden her şirket **Cloud**'a geçiyor?" diye sorarsan, cevabı şu 5 maddededir:

* **On-demand Self-service:** Kimseye sormadan, bir tıkla sunucu açabilirsin.
* **Broad Network Access:** Dünyanın her yerinden, her cihazla erişebilirsin.
* **Resource Pooling:** Devasa kaynaklar havuzundan ihtiyacın olanı alırsın.
* **Rapid Elasticity:** Trafiğin artarsa saniyeler içinde 1 sunucudan 1000 sunucuya çıkabilirsin.
* **Measured Service:** Tıpkı elektrik faturası gibi, ne kadar kullanırsan o kadar ödersin.

---

### 2. AWS Global Infrastructure: Dünyayı Nasıl Parselliyoruz?

AWS'in gücünü anlamak için şu hiyerarşiyi bilmen gerekir:

#### A. Regions (Bölgeler)
AWS dünyayı **Region** adını verdiği izole coğrafi alanlara ayırır.
* **Örnek:** `eu-central-1` (Frankfurt), `us-east-1` (N. Virginia).
* **Strateji:** Verilerini kullanıcına en yakın **Region**'da tutmalısın. Türkiye'den bir uygulama yapıyorsan, genellikle Frankfurt seçilir.



#### B. Availability Zones (AZ)
Her **Region**, en az 3 adet (bazen daha fazla) **AZ**'den oluşur.
* **Fiziksel Ayrım:** Her **AZ**, birbirinden kilometrelerce uzakta, farklı enerji ve internet hattı kullanan bir veya daha fazla veri merkezidir.
* **Fault Tolerance:** Bir **AZ**'de sorun çıkarsa, diğer **AZ**'deki sunucun çalışmaya devam eder. Bu yüzden sistemlerimizi her zaman **Multi-AZ** üzerine kurarız.



#### C. Edge Locations
Bunlar veri merkezi değildir, sadece "cache" (önbellek) noktalarıdır.
* **Örnek:** Bir video izlendiğinde, veri ana merkezden değil, kullanıcıya en yakın **Edge Location** noktasından gelir. Buna **CDN (Content Delivery Network)** diyoruz.

---

### 3. AWS Shared Responsibility Model (Paylaşılan Sorumluluk Modeli)

Bu, **Cloud** dünyasindeki en kritik güvenlik kavramıdır:

1. **AWS'in Sorumluluğu (Security OF the Cloud):** Fiziksel sunucular, kablolar, klimalar ve binaların güvenliği.
2. **Senin Sorumluluğun (Security IN the Cloud):** İşletim sistemi güncellemeleri, veritabanı şifreleri, kullanıcı yetkileri ve verinin kendisi.

> **Öğrenci Notu:** AWS binanın kapısını korur, ama evin içindeki kasanın anahtarını (şifreleri) açıkta bırakırsan bu senin sorumluluğundadır.

---

<details>
<summary>SORU: Neden kendi sunucumuzu kurmak yerine Cloud kullanıyoruz?</summary>
<div class="answer-content">

Kendi sunucunu kurduğunda donanım arızasıyla, elektrik kesintisiyle ve başlangıç maliyetiyle uğraşırsın. **Cloud**'da ise saniyeler içinde bir sunucu kiralayıp işin bitince kapatabilirsin. Bu bize müthiş bir **Agility** (Çeviklik) sağlar. Eğer kullanıcı sayın aniden artarsa, sistemini saniyeler içinde büyütebilirsin; buna da **Scalability** (Ölçeklenebilirlik) diyoruz.

</div>
</details>