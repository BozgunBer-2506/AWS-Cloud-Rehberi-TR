# Bölüm 14: Infrastructure as Code (IaC) - Kodla Altyapı Yönetimi

AWS üzerinde yüzlerce sunucuyu, ağı ve veritabanını konsola girip elle oluşturmak imkansızdır. **IaC**, altyapımızı tıpkı bir yazılım kodu gibi (Python veya JSON/YAML gibi) tanımlamamıza olanak tanır.

---

### 1. Neden IaC Kullanıyoruz? (Temel Avantajlar)

* **Hız ve Ölçeklenebilirlik:** 100 tane VPC (Sanal Ağ) oluşturmanız gerekirse, bunu konsolda yapmak saatler sürer. IaC ile bir saniyede oluşturursunuz.
* **Versiyon Kontrolü:** Altyapı kodunuzu **GitHub** gibi yerlerde saklayabilirsiniz. Kim, ne zaman, hangi ayarı değiştirmiş görebilirsiniz.
* **Hata Payının Azalması:** İnsan hata yapar, kod yapmaz. Bir ayarı bir yerde unutup güvenliği tehlikeye atma riskiniz azalır.
* **Drift Detection (Sapma Tespiti):** Eğer birisi konsola girip gizlice bir sunucunun ayarını değiştirirse, IaC araçları bunu fark eder ve orijinal güvenli haline geri döndürür.

---

### 2. AWS'in Ana IaC Servisleri

#### A) AWS CloudFormation

AWS'in kendi yerleşik servisidir.

* **Template:** Altyapınızı YAML veya JSON formatında bir dökümana yazarsınız.
* **Stack:** CloudFormation bu dökümanı okur ve kaynakları bir "yığın" (stack) olarak oluşturur. Stack'i sildiğinizde, ona bağlı her şey (sunucu, disk, ip) otomatik temizlenir.

#### B) AWS CDK (Cloud Development Kit)

* **Yazılımcı Dostu:** YAML yazmak yerine bildiğiniz programlama dillerini (TypeScript, Python, Java) kullanırsınız.
* **Mantık Kurma:** Kodunuzun içinde `if` (eğer) veya `for` (döngü) kullanarak çok karmaşık altyapılar kurabilirsiniz.

---

### 3. Üçüncü Parti Araç: Terraform

AWS dışında en çok kullanılan araçtır.

* **Cloud-Agnostic:** Aynı dili kullanarak hem AWS, hem Azure hem de Google Cloud yönetebilirsiniz.
* **State File:** Terraform, altyapınızın son halini bir dosyada saklar. Bir değişiklik yaptığınızda sadece değişen kısımları günceller.

---

### 4. Örnek Bir IaC Şablonu (CloudFormation - YAML)

Aşağıdaki kod, AWS üzerinde otomatik olarak bir S3 klasörü (bucket) oluşturur:

```yaml
Resources:
  MyProductionBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: baris-ozgun-pro-bucket-2026
      AccessControl: Private
      Tags:
        - Key: Environment
          Value: Production

```

---

### 5. Önemli Terimler

* **Provisioning:** Kaynakları (sunucu, db vb.) hazırlayıp hazır hale getirmek.
* **Idempotency:** Kodunuzu kaç kere çalıştırırsanız çalıştırın, eğer bir değişiklik yoksa sistemde hiçbir şey bozulmaz, her zaman aynı sonucu alırsınız.
* **Automated Rollback:** Eğer kurulum sırasında bir hata oluşursa, CloudFormation o ana kadar yaptığı her şeyi otomatik olarak siler ve sistemi güvenli eski haline döndürür.

---

<details>
<summary>SORU: "Infrastructure as Code" ile "Scripting" arasındaki fark nedir?</summary>
<div class="answer-content">

**Scripting** (örn: Bash veya Python script), sisteme "şu adımı yap, sonra bu adımı yap" der. Eğer bir adımda hata olursa sistem yarım kalabilir.
**IaC** (örn: Terraform/CloudFormation) ise sisteme "Sonucun şu olmasını istiyorum" der (Declarative). AWS arka planda o sonuca ulaşmak için ne gerekiyorsa kendisi yapar.

</div>
</details>