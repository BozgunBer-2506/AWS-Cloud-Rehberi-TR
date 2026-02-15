# Bölüm 13: Pricing, Support and Billing

AWS'de kaynak kullanmak kadar, bu kaynakların maliyetini yönetmek ve bir sorun çıktığında kimden yardım alacağınızı bilmek de önemlidir.

---

### 1. AWS Fiyatlandırma Prensipleri

AWS genel olarak üç temel model üzerinden ücretlendirme yapar:

* **Pay-as-you-go:** Sadece kullandığın kadar öde.
* **Save when you reserve:** Uzun süreli kullanım sözü vererek (1-3 yıl) indirim al.
* **Pay less by using more:** Kullanım hacmin arttıkça birim fiyatın düşmesi (S3'te veri arttıkça GB başı fiyatın düşmesi gibi).

---

### 2. Önemli Fiyatlandırma Araçları

* **AWS Pricing Calculator:** Daha sisteminizi kurmadan, "Şu kadar EC2, şu kadar S3 ne kadar tutar?" hesabını yaptığınız web aracıdır.
* **AWS Budgets:** Harcamalarınız için bütçe sınırı koymanızı sağlar. Sınırı geçince e-posta atar.
* **AWS Cost Explorer:** Geçmiş harcamalarınızı grafiklerle analiz etmenizi ve gelecekteki faturanızı tahmin etmenizi sağlar.

---

### 3. AWS Destek Planları (Support Plans)

Bir sorun yaşadığınızda AWS'ten alacağınız yardımın hızı ve kapsamı planınıza bağlıdır:

| Plan | Özellikler |
| --- | --- |
| **Basic** | Ücretsiz. Sadece fatura ve hesap desteği. Teknik destek yok. |
| **Developer** | Teknik sorular için e-posta desteği (Mesai saatlerinde). Ucuzdur. |
| **Business** | 7/24 telefon, chat ve e-posta desteği. Tüm servisler için teknik yardım. |
| **Enterprise** | En üst seviye. Size özel **TAM** (Technical Account Manager) atanır. |

---

### 4. AWS Organizations ve Consolidated Billing

Şirketinizde birden fazla AWS hesabı varsa bunları tek bir çatı altında toplayabilirsiniz.

* **Consolidated Billing:** Tüm hesapların faturası tek bir ana hesaba gelir.
* **Volume Discounts:** Tüm hesapların toplam kullanımı birleştiği için daha yüksek indirimler kazanırsınız.

---

### 5. Örnek Senaryo: Maliyet Tasarrufu (example)

Diyelim ki `test-app-01` isimli bir uygulamanız var ve 7/24 çalışması gerekiyor:

1. **On-Demand:** Saatlik ödeme yaparsınız (En pahalısı).
2. **Reserved Instance:** 1 yıllık söz verirseniz %40-60 arası indirim alırsınız.
3. **Spot Instance:** Eğer uygulamanız kesintiye uğrayabiliyorsa (örn: analiz işleri), boştaki sunucuları %90 indirimle kullanabilirsiniz.

---

<details>
<summary>SORU: AWS servislerini denemek istiyorum ama fatura gelmesinden korkuyorum. Ne yapmalıyım?</summary>
<div class="answer-content">

Öncelikle her zaman **Free Tier Eligible** yazan kaynakları seçin. İkinci olarak mutlaka bir **AWS Budget** oluşturup 10 dolar gibi makul bir tutara alarm kurun. Son olarak, işiniz biten kaynakları (EC2, RDS vb.) mutlaka **Terminate** edin veya silin.

</div>
</details>