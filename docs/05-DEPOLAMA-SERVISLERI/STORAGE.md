# Bölüm 05: Cloud Depolama Çözümleri (S3 ve EBS)

Veriyi sadece üretmek yetmez, onu doğru yerde, doğru maliyetle ve güvenle saklamak gerekir. AWS'de iki temel depolama felsefesi vardır: Object Storage (S3) ve Block Storage (EBS).

---

### 1. Amazon S3 (Simple Storage Service) - Object Storage

S3, Cloud dünyasının dipsiz kuyusu gibidir. Dosyalarınızı (resim, video, yedekleme dosyaları) **Bucket** (Kova) adı verilen klasör benzeri yapılarda saklarsınız.

* **Sınırsız Kapasite:** Bir dosya boyutu 5 TB olabilir, ancak toplamda saklayabileceğiniz veri miktarının sınırı yoktur.
* **Durability (Dayanıklılık):** AWS, S3 için **%99.999999999** (11 adet 9) dayanıklılık sözü verir. Bu, bir dosyanızı kaybetme ihtimalinizin neredeyse imkansız olduğu anlamına gelir.
* **Global Erişim:** Her dosyanın (eğer izin verirseniz) kendine ait bir URL adresi olur.



### S3 Storage Classes (Maliyet Tasarrufu)
Veriye ne kadar sık erişiyorsanız, o kadar ödersiniz. Akıllı bir mimar şu sınıfları kullanır:
1. **S3 Standard:** Sık erişilen veriler için (Web sitesi görselleri).
2. **S3 Intelligent-Tiering:** AWS'in kullanım alışkanlığınıza göre otomatik yer değiştirdiği sınıf.
3. **S3 Glacier:** Arşiv verileri için. Çok ucuzdur ama veriyi geri çekmek zaman alır (Dakikalar veya saatler).

---

### 2. Amazon EBS (Elastic Block Store) - Block Storage

EBS, bir EC2 sunucusuna taktığınız **Sanal Hard Disk**'tir.

* **Sunucuya Özel:** S3 gibi internetten erişilemez, sadece bağlı olduğu EC2 sunucusu içinden bir disk gibi görülür.
* **Performans:** İşletim sistemi kurmak, veritabanı çalıştırmak gibi yüksek hız (IOPS) gerektiren işler için kullanılır.
* **Snapshot (Yedekleme):** Diskin o anki halinin yedeğini alıp başka bir bölgede yeni bir disk oluşturabilirsiniz.



---

### 3. EFS (Elastic File System) - Network Storage

EBS'in en büyük kısıtlaması aynı anda sadece bir sunucuya bağlanabilmesidir.
* **EFS farkı:** Bir **Ağ Sürücüsü** gibidir. Yüzlerce EC2 sunucusu aynı anda aynı EFS diskine bağlanıp dosya okuyup yazabilir.

---

### 4. Özet Karşılaştırma

| Özellik | **S3 (Object)** | **EBS (Block)** | **EFS (Network)** |
| :--- | :--- | :--- | :--- |
| **Kullanım Amacı** | Statik dosyalar, yedekler | İşletim sistemi, Veritabanı | Ortak dosya paylaşımı |
| **Erişim** | HTTP / URL üzerinden | Sadece bağlı olduğu EC2 | Çoklu EC2 bağlantısı |
| **Ölçekleme** | Otomatik (Sonsuz) | Manuel (Boyut artırılır) | Otomatik |

---

<details>
<summary>SORU: Neden resimleri veritabanında değil de S3'te saklamalıyım?</summary>
<div class="answer-content">

Veritabanında (SQL/NoSQL) büyük dosyalar saklamak hem performansı düşürür hem de maliyeti artırır. Profesyonel yapıda resim **S3**'e yüklenir, veritabanında ise sadece o resmin S3 üzerindeki linki (URL) tutulur.

</div>
</details>