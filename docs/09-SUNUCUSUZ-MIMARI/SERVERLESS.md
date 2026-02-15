# Bölüm 09: Sunucusuz (Serverless) Mimari 

**Serverless**, fiziksel veya sanal bir sunucunun (EC2 gibi) olmadığı anlamına gelmez. Sadece bu sunucuların yönetimi tamamen AWS'e aittir. Siz sadece kodunuzu yazarsınız, AWS o kodu çalıştırır ve iş bittiğinde her şeyi kapatır.

---

### 1. AWS Lambda - "Fonksiyonel Bilişim"

**Lambda**, Serverless dünyasının en önemli servisidir. Bir "olay" (event) olduğunda tetiklenen küçük kod parçalarıdır.

* **Sunucu Yönetimi Yok:** İşletim sistemi güncellemesi, RAM ayarı veya sunucu bakımı ile uğraşmazsınız.
* **Otomatik Ölçekleme:** Aynı anda 1 kişi de gelse 10.000 kişi de gelse AWS o kadar "fonksiyon" kopyası oluşturur.
* **Sadece Çalıştığı Kadar Öde:** Sunucu 7/24 açık kalmaz. Kodun çalışma süresi (milisaniye bazında) kadar ödeme yaparsınız.

---

### 2. API Gateway - "Uygulama Kapısı"

Lambda fonksiyonlarını internete açmak için bir kapıya ihtiyacınız vardır.

* **Görevi:** Kullanıcıdan gelen HTTP isteklerini alır ve doğru Lambda fonksiyonuna yönlendirir.
* **Özellikleri:** Yetkilendirme (Authentication), trafik sınırlama (Throttling) ve API versiyonlama işlemlerini yapar.

---

### 3. Serverless Avantajları ve Dezavantajları

| Özellik | **Avantajı** | **Dezavantajı** |
| --- | --- | --- |
| **Maliyet** | Sadece kullanım bazlı. | Sürekli yüksek trafik varsa pahalı olabilir. |
| **Yönetim** | Sıfır sunucu yönetimi. | Kontrol tamamen AWS'dedir. |
| **Hız** | Hızlı geliştirme (Agility). | **Cold Start:** Uzun süre kullanılmayan kodun ilk çalışması biraz yavaş olabilir. |

---

### 4. Örnek Senaryo: Dosya İşleme (example)

1. Bir kullanıcı `test-bucket-01` isimli **S3** klasörüne bir dosya yükler.
2. Bu yükleme işlemi bir tetikleyici (trigger) oluşturur.
3. **Lambda** fonksiyonu uyanır, dosyayı işler (örn: boyutlandırır).
4. İşlem bittikten sonra Lambda kendini kapatır.

---

### 5. Diğer Serverless Servisleri

* **Amazon SNS (Simple Notification Service):** E-posta veya SMS göndermek için kullanılır.
* **Amazon SQS (Simple Queue Service):** Sistemler arası mesaj kuyruğu oluşturur.
* **Amazon EventBridge:** Servislerin birbiriyle konuşmasını sağlayan merkezi bir olay otobüsüdür.

---

<details>
<summary>SORU: Ne zaman EC2 yerine Lambda kullanmalıyım?</summary>
<div class="answer-content">

Eğer uygulamanız 7/24 yoğun bir işlem yapıyorsa **EC2** daha mantıklı olabilir. Ancak kısa süreli işler, belirli zamanlarda çalışan raporlar veya sadece bir dosya yüklendiğinde çalışan işler için **Lambda** çok daha ucuz ve kolaydır.

</div>
</details>