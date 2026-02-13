# Bölüm 10: Monitoring ve Governance (İzleme ve Yönetim)

Sistem canlıya geçtikten sonra en önemli şey görünürlüktür. Bu bölümde "Sistemde neler oluyor?" ve "Kim, hangi değişikliği yaptı?" sorularına odaklanıyoruz.

---

### 1. Amazon CloudWatch - Performans İzleme

**CloudWatch**, AWS kaynaklarınızın "sağlık durumunu" izler.

* **Metrics:** CPU, RAM (ajan ile), Disk ve Network verilerini sayısal olarak tutar.
* **Alarms:** Belirlediğiniz eşik değerleri aşılınca tetiklenir (Örn: CPU > %80 ise haber ver).
* **Dashboards:** Tüm metrikleri tek bir ekranda görselleştirir.

---

### 2. AWS CloudTrail - Aktivite Denetimi

**CloudTrail**, hesabınızda yapılan her API çağrısını (her işlemi) kaydeder.

* **Görevi:** Güvenlik ve denetimdir. "Bu sunucuyu dün gece kim sildi?" sorusunun cevabı buradadır.
* **Kayıt:** Yapılan işlemin zamanını, yapan kullanıcıyı ve IP adresini günlüğe kaydeder.

---

### 3. AWS Trusted Advisor - Otomatik Danışman

AWS'in sizin için çalışan sanal bir danışmanıdır. Hesabınızı şu 5 kategoride tarar:

1. **Maliyet:** Boşta duran veya az kullanılan kaynakları bularak para tasarrufu sağlar.
2. **Güvenlik:** İnternete açık portları veya açık S3 bucket'larını raporlar.
3. **Performans:** Kaynakların limitlerini ve hızını kontrol eder.
4. **Hata Toleransı:** Yedeklemesi olmayan kritik sistemleri uyarır.
5. **Servis Limitleri:** AWS limitlerine yaklaşıp yaklaşmadığınızı söyler.

---

### 4. AWS Budgets - Fatura Kontrolü

Fatura şoklarını engellemek için kullanılan araçtır.

* **Örnek:** Aylık harcama `10 USD` değerine ulaştığında `example@mail.com` adresine uyarı gönderilmesini sağlar.

---

### 5. Özet Karşılaştırma Tablosu

| Servis | Odak Noktası | Ana Soru |
| --- | --- | --- |
| **CloudWatch** | Performans | Sistem ne kadar hızlı çalışıyor? |
| **CloudTrail** | Güvenlik / Denetim | Kim, ne zaman, hangi işlemi yaptı? |
| **AWS Config** | Konfigürasyon | Kaynağın ayarları zamanla nasıl değişti? |

---

<details>
<summary>SORU: Sunucumdaki hata kayıtlarını (Error Logs) nasıl görebilirim?</summary>
<div class="answer-content">

**CloudWatch Logs** servisini kullanmalısınız. Sunucunuzdaki uygulama loglarını CloudWatch'a göndererek, sunucuya tek tek girmeden tüm hataları merkezi bir panelden aratabilir ve filtreleyebilirsiniz.

</div>
</details>